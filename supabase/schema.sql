-- =====================================================
-- Ciel Fortune — Supabase DB Schema v2
-- =====================================================
-- 実行方法: Supabase Dashboard > SQL Editor にこのファイルを貼り付けて実行

-- 1. ユーザープロフィール（Supabase Auth を拡張）
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  display_name text,
  birthday date,
  zodiac_sign text,
  line_user_id text unique,
  stripe_customer_id text unique,
  subscription_status text default 'free' check (subscription_status in ('free', 'premium', 'cancelled')),
  subscription_period_end timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. 占い結果の保存
create table if not exists public.readings (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  fortune_slug text not null,
  fortune_type text not null check (fortune_type in ('free', 'paid', 'premium')),
  input_data jsonb default '{}',
  result_text text not null,
  created_at timestamptz default now()
);

-- 3. 単発購入の記録
create table if not exists public.purchases (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  fortune_slug text not null,
  amount integer not null default 300,
  currency text not null default 'jpy',
  stripe_payment_intent_id text unique,
  status text default 'pending' check (status in ('pending', 'completed', 'failed', 'refunded')),
  reading_id uuid references public.readings(id),
  created_at timestamptz default now()
);

-- 4. 週間占い配信（LINE用）
create table if not exists public.weekly_fortunes (
  id uuid default gen_random_uuid() primary key,
  fortune_slug text not null,
  week_start date not null,
  content_text text not null,
  sent_at timestamptz,
  created_at timestamptz default now(),
  unique(fortune_slug, week_start)
);

-- 5. 占いマスターデータ（8種類）
create table if not exists public.fortunes_master (
  slug text primary key,
  name text not null,
  name_en text not null,
  region text not null,
  region_en text not null,
  emoji text not null,
  category text not null default 'love',
  love_point text,
  short_description text,
  misa_story text,
  input_type text not null check (input_type in ('zodiac', 'birthday', 'free', 'card-draw')),
  is_active boolean default true,
  sort_order integer default 0,
  created_at timestamptz default now()
);

-- 6. チャット履歴（Misa相談用）
create table if not exists public.chat_sessions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  fortune_slug text,
  status text default 'active' check (status in ('active', 'closed')),
  created_at timestamptz default now()
);

create table if not exists public.chat_messages (
  id uuid default gen_random_uuid() primary key,
  session_id uuid references public.chat_sessions(id) on delete cascade not null,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamptz default now()
);

-- =====================================================
-- RLS (Row Level Security) ポリシー
-- =====================================================

alter table public.profiles enable row level security;
alter table public.readings enable row level security;
alter table public.purchases enable row level security;
alter table public.weekly_fortunes enable row level security;
alter table public.fortunes_master enable row level security;
alter table public.chat_sessions enable row level security;
alter table public.chat_messages enable row level security;

-- profiles: 自分のデータのみ読み書き可能
create policy "Users can view own profile"
  on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- readings: 自分の鑑定結果のみ
create policy "Users can view own readings"
  on public.readings for select using (auth.uid() = user_id);
create policy "Users can insert own readings"
  on public.readings for insert with check (auth.uid() = user_id);

-- purchases: 自分の購入のみ
create policy "Users can view own purchases"
  on public.purchases for select using (auth.uid() = user_id);
create policy "Users can insert own purchases"
  on public.purchases for insert with check (auth.uid() = user_id);

-- weekly_fortunes: 全員閲覧可（配信コンテンツ）
create policy "Anyone can view weekly fortunes"
  on public.weekly_fortunes for select using (true);

-- fortunes_master: 全員閲覧可
create policy "Anyone can view fortune master"
  on public.fortunes_master for select using (true);

-- chat: 自分のセッション/メッセージのみ
create policy "Users can view own chat sessions"
  on public.chat_sessions for select using (auth.uid() = user_id);
create policy "Users can create chat sessions"
  on public.chat_sessions for insert with check (auth.uid() = user_id);
create policy "Users can view own messages"
  on public.chat_messages for select
  using (exists (
    select 1 from public.chat_sessions
    where chat_sessions.id = chat_messages.session_id
    and chat_sessions.user_id = auth.uid()
  ));
create policy "Users can insert own messages"
  on public.chat_messages for insert
  with check (exists (
    select 1 from public.chat_sessions
    where chat_sessions.id = chat_messages.session_id
    and chat_sessions.user_id = auth.uid()
  ));

-- =====================================================
-- トリガー: updated_at の自動更新
-- =====================================================
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger on_profiles_updated
  before update on public.profiles
  for each row execute function public.handle_updated_at();

-- =====================================================
-- トリガー: 新規ユーザー → profiles 自動作成
-- =====================================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''));
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =====================================================
-- インデックス
-- =====================================================
create index if not exists idx_readings_user_id on public.readings(user_id);
create index if not exists idx_readings_fortune_slug on public.readings(fortune_slug);
create index if not exists idx_purchases_user_id on public.purchases(user_id);
create index if not exists idx_purchases_stripe_pi on public.purchases(stripe_payment_intent_id);
create index if not exists idx_chat_messages_session on public.chat_messages(session_id);
create index if not exists idx_weekly_fortunes_week on public.weekly_fortunes(week_start);
