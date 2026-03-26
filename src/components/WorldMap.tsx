"use client";

import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { Fortune, regionColors, regionLabels, Region } from "@/data/fortunes";

const GEO_URL = "/countries-110m.json";

const legendRegions: { region: Region; color: string; label: string }[] = [
  { region: "europe", color: regionColors.europe, label: regionLabels.europe },
  { region: "asia", color: regionColors.asia, label: regionLabels.asia },
  { region: "middle-east-africa", color: regionColors["middle-east-africa"], label: regionLabels["middle-east-africa"] },
  { region: "americas", color: regionColors.americas, label: regionLabels.americas },
  { region: "oceania", color: regionColors.oceania, label: regionLabels.oceania },
];

export default function WorldMap({
  fortunes,
  activeCategory,
}: {
  fortunes: Fortune[];
  activeCategory: string;
}) {
  const [hovered, setHovered] = useState<Fortune | null>(null);

  const isActive = (f: Fortune) =>
    activeCategory === "all" || f.category === activeCategory;

  return (
    <div style={{ width: "100%", maxWidth: 1100, margin: "0 auto", position: "relative" }}>
      <ComposableMap
        projection="geoNaturalEarth1"
        projectionConfig={{ scale: 160, center: [10, 15] }}
        width={900}
        height={440}
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="rgba(184,150,62,0.07)"
                stroke="rgba(184,150,62,0.2)"
                strokeWidth={0.4}
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none", fill: "rgba(184,150,62,0.13)" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>

        {fortunes.map((f) => {
          const active = isActive(f);
          const color = regionColors[f.region];
          return (
            <Marker key={f.slug} coordinates={[f.lng, f.lat]}>
              <circle
                r={active ? 5 : 3}
                fill={color}
                opacity={active ? 0.9 : 0.12}
                style={{ cursor: "pointer", transition: "all 0.3s" }}
                onMouseEnter={() => setHovered(f)}
                onMouseLeave={() => setHovered(null)}
              />
              <circle
                r={14}
                fill="transparent"
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setHovered(f)}
                onMouseLeave={() => setHovered(null)}
              />
            </Marker>
          );
        })}
      </ComposableMap>

      {/* Tooltip — fixed position top-right of map */}
      {hovered && (
        <div
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            background: "rgba(8,8,17,0.95)",
            border: "1px solid var(--border-mid)",
            borderRadius: 8,
            padding: "20px 24px",
            minWidth: 200,
            maxWidth: 280,
            zIndex: 10,
            pointerEvents: "none",
          }}
        >
          <div style={{ fontSize: 12, color: "var(--text-muted)", letterSpacing: "0.05em" }}>
            {hovered.country}
            {hovered.city ? ` / ${hovered.city}` : ""}
          </div>
          <div
            style={{
              fontSize: 20,
              color: "var(--gold-light)",
              marginTop: 8,
              fontFamily: "'Shippori Mincho B1', serif",
            }}
          >
            {hovered.name}
          </div>
          <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 10, lineHeight: 1.6 }}>
            {hovered.shortDescription}
          </div>
        </div>
      )}

      {/* Legend */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 24,
          marginTop: 24,
          flexWrap: "wrap",
        }}
      >
        {legendRegions.map((r) => (
          <div key={r.region} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: r.color }} />
            <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{r.label}</span>
          </div>
        ))}
      </div>
      <p style={{ textAlign: "center", fontSize: 14, color: "var(--text-muted)", marginTop: 16 }}>
        現在60カ国の占いを収録
      </p>
    </div>
  );
}
