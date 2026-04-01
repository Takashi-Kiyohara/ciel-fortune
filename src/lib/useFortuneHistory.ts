"use client";
import { useState, useEffect, useCallback } from "react";

export type FortuneRecord = {
  slug: string;
  title: string;
  date: string; // ISO string
  zodiac?: string;
  birthday?: string;
  type: "free" | "detailed";
};

const STORAGE_KEY = "ciel-fortune-history";
const MAX_RECORDS = 50;

function loadHistory(): FortuneRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveHistory(records: FortuneRecord[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records.slice(0, MAX_RECORDS)));
  } catch {
    // storage full — silently ignore
  }
}

export function useFortuneHistory() {
  const [history, setHistory] = useState<FortuneRecord[]>([]);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  const addRecord = useCallback((record: Omit<FortuneRecord, "date">) => {
    setHistory((prev) => {
      const newRecord: FortuneRecord = { ...record, date: new Date().toISOString() };
      const updated = [newRecord, ...prev.filter(
        (r) => !(r.slug === record.slug && r.type === record.type && r.date === newRecord.date)
      )].slice(0, MAX_RECORDS);
      saveHistory(updated);
      return updated;
    });
  }, []);

  const getBySlug = useCallback(
    (slug: string) => history.filter((r) => r.slug === slug),
    [history]
  );

  return { history, addRecord, getBySlug };
}
