"use client";

import { useState } from "react";
import { Fortune } from "@/data/fortunes";

// Mercator projection: convert lat/lng to SVG x/y
function project(lat: number, lng: number): [number, number] {
  const x = (lng + 180) * (1000 / 360);
  const latRad = (lat * Math.PI) / 180;
  const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
  const y = 500 / 2 - (500 * mercN) / (2 * Math.PI);
  return [x, y];
}

// Simplified world map outline paths (major continents)
const continentPaths = [
  // North America
  "M140,90 L170,70 L200,65 L240,72 L260,90 L270,110 L265,130 L250,150 L230,170 L200,180 L180,178 L165,175 L145,165 L135,150 L125,130 L130,110 Z",
  // South America
  "M220,195 L240,190 L260,195 L275,210 L280,240 L278,270 L270,300 L260,330 L245,350 L230,360 L225,340 L220,310 L210,280 L205,250 L208,220 Z",
  // Europe
  "M440,65 L460,60 L490,55 L520,60 L530,72 L525,88 L515,100 L500,108 L480,105 L460,100 L445,95 L435,82 Z",
  // Africa
  "M445,120 L470,115 L500,118 L530,125 L545,145 L555,170 L558,200 L550,230 L535,260 L520,280 L500,290 L480,285 L460,270 L445,245 L438,220 L432,190 L435,160 L440,140 Z",
  // Asia
  "M540,40 L580,35 L640,38 L700,42 L750,55 L780,70 L800,90 L810,110 L790,130 L760,140 L720,145 L680,140 L640,135 L600,125 L570,110 L550,95 L535,78 L530,60 Z",
  // India / SE Asia
  "M640,140 L660,145 L680,155 L690,175 L685,195 L670,200 L650,195 L635,180 L630,160 Z",
  // SE Asia islands
  "M720,160 L740,155 L760,165 L770,180 L765,195 L745,200 L725,190 L715,175 Z",
  // Australia
  "M740,260 L770,250 L810,255 L835,270 L840,290 L830,310 L810,320 L780,318 L755,305 L740,285 Z",
];

export default function WorldMap({
  fortunes,
  activeCategory,
}: {
  fortunes: Fortune[];
  activeCategory: string;
}) {
  const [tooltip, setTooltip] = useState<{
    fortune: Fortune;
    x: number;
    y: number;
  } | null>(null);

  const filtered =
    activeCategory === "all"
      ? fortunes
      : fortunes.filter((f) => f.category === activeCategory);

  const filteredSlugs = new Set(filtered.map((f) => f.slug));

  return (
    <div className="relative w-full max-w-[1200px] mx-auto">
      <svg
        viewBox="0 0 1000 500"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Continent outlines */}
        {continentPaths.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="#c4a265"
            strokeWidth="0.5"
            opacity="0.15"
          />
        ))}

        {/* Fortune dots */}
        {fortunes.map((fortune) => {
          const [x, y] = project(fortune.lat, fortune.lng);
          const isActive = filteredSlugs.has(fortune.slug);

          return (
            <g key={fortune.slug}>
              {/* Pulse ring for active */}
              {isActive && (
                <circle
                  cx={x}
                  cy={y}
                  r="6"
                  fill="none"
                  stroke="#c4a265"
                  strokeWidth="0.5"
                  opacity="0.3"
                >
                  <animate
                    attributeName="r"
                    values="3;8"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.3;0"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
              {/* Main dot */}
              <circle
                cx={x}
                cy={y}
                r="3"
                fill={isActive ? "#c4a265" : "#c4a265"}
                opacity={isActive ? 0.8 : 0.12}
                className="cursor-pointer transition-opacity duration-500"
                onMouseEnter={(e) => {
                  const rect = (
                    e.target as SVGElement
                  ).closest("svg")!.getBoundingClientRect();
                  const px = ((x / 1000) * rect.width);
                  const py = ((y / 500) * rect.height);
                  setTooltip({ fortune, x: px, y: py });
                }}
                onMouseLeave={() => setTooltip(null)}
              />
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute z-20 pointer-events-none px-4 py-2.5 bg-[#141425] border border-[#c4a265]/20 rounded text-xs whitespace-nowrap"
          style={{
            left: tooltip.x,
            top: tooltip.y - 48,
            transform: "translateX(-50%)",
          }}
        >
          <span className="text-[#c4a265]">
            {tooltip.fortune.country}
            {tooltip.fortune.city ? `(${tooltip.fortune.city})` : ""}
          </span>
          <span className="text-[#e8e4df]/50 ml-2">{tooltip.fortune.name}</span>
        </div>
      )}
    </div>
  );
}
