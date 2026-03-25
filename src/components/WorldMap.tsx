"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { Fortune, regionColors, regionLabels, Region } from "@/data/fortunes";
import { categories } from "@/data/fortunes";

const geoUrl =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const legendRegions: Region[] = [
  "europe",
  "asia",
  "middle-east-africa",
  "americas",
  "oceania",
];

export default function WorldMap({
  fortunes,
  activeCategory,
}: {
  fortunes: Fortune[];
  activeCategory: string;
}) {
  const router = useRouter();
  const [tooltip, setTooltip] = useState<Fortune | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const handleMouseEnter = useCallback(
    (fortune: Fortune, e: React.MouseEvent) => {
      const container = (e.target as HTMLElement).closest(
        "[data-map-container]"
      );
      if (!container) return;
      const rect = container.getBoundingClientRect();
      setTooltipPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setTooltip(fortune);
    },
    []
  );

  const handleClick = useCallback(
    (fortune: Fortune) => {
      router.push(`/fortunes/${fortune.slug}`);
    },
    [router]
  );

  const isActive = (f: Fortune) =>
    activeCategory === "all" || f.category === activeCategory;

  const getCategoryLabel = (f: Fortune) =>
    categories.find((c) => c.id === f.category)?.label ?? "";

  return (
    <div className="relative" data-map-container>
      <ComposableMap
        projection="geoNaturalEarth1"
        projectionConfig={{ scale: 155, center: [10, 10] }}
        width={980}
        height={480}
        style={{
          width: "100%",
          height: "auto",
          maxWidth: "1100px",
          display: "block",
          margin: "0 auto",
        }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="rgba(184, 150, 62, 0.06)"
                stroke="rgba(184, 150, 62, 0.2)"
                strokeWidth={0.4}
                style={{
                  default: { outline: "none" },
                  hover: {
                    outline: "none",
                    fill: "rgba(184, 150, 62, 0.12)",
                  },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>

        {fortunes.map((fortune) => {
          const active = isActive(fortune);
          const color = regionColors[fortune.region];

          return (
            <Marker
              key={fortune.slug}
              coordinates={[fortune.lng, fortune.lat]}
              onMouseEnter={(e) =>
                handleMouseEnter(fortune, e as unknown as React.MouseEvent)
              }
              onMouseLeave={() => setTooltip(null)}
              onClick={() => handleClick(fortune)}
              style={{ cursor: "pointer" }}
            >
              {/* Glow ring */}
              <circle
                r={12}
                fill={color}
                opacity={active ? 0.06 : 0.02}
              />
              {/* Main dot */}
              <circle
                r={4.5}
                fill={color}
                opacity={active ? 0.85 : 0.12}
                stroke={color}
                strokeWidth={active ? 1 : 0}
                strokeOpacity={0.3}
              >
                {active && (
                  <animate
                    attributeName="r"
                    values="4.5;5.5;4.5"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                )}
              </circle>
              {/* Tap target */}
              <circle r={15} fill="transparent" />
            </Marker>
          );
        })}
      </ComposableMap>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute z-30 pointer-events-none px-5 py-3.5 rounded-md"
          style={{
            left: tooltipPos.x,
            top: tooltipPos.y - 80,
            transform: "translateX(-50%)",
            background: "rgba(8, 8, 17, 0.95)",
            border: "1px solid rgba(184, 150, 62, 0.3)",
          }}
        >
          <p
            className="text-sm font-medium"
            style={{ color: regionColors[tooltip.region] }}
          >
            {tooltip.country}
            {tooltip.city ? ` / ${tooltip.city}` : ""}
          </p>
          <p className="text-[15px] text-[#e8e4df] mt-1">{tooltip.name}</p>
          <p className="text-[11px] text-[#e8e4df]/30 mt-1.5">
            {getCategoryLabel(tooltip)}
          </p>
          <p className="text-[10px] text-[#e8e4df]/20 mt-1.5">
            クリックして詳細を見る
          </p>
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-8">
        {legendRegions.map((region) => (
          <div key={region} className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: regionColors[region] }}
            />
            <span className="text-xs text-[#e8e4df]/30">
              {regionLabels[region]}
            </span>
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-[#e8e4df]/20 mt-4 tracking-wider">
        現在60カ国の占いを収録
      </p>
    </div>
  );
}
