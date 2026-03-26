"use client";

import { matrixPurposes, matrixCategories, matrixData } from "@/data/fortunes";

function Cell({ value }: { value: number }) {
  if (value === 2)
    return <span style={{ fontSize: 20, color: "var(--gold)" }}>&#9678;</span>;
  if (value === 1)
    return <span style={{ fontSize: 18, color: "var(--gold-dim)" }}>&#9675;</span>;
  if (value === 0.5)
    return <span style={{ fontSize: 16, color: "var(--text-muted)", opacity: 0.5 }}>&#9651;</span>;
  return <span />;
}

export default function CompatibilityMatrix() {
  return (
    <div className="hide-scrollbar" style={{ overflowX: "auto", maxWidth: 1000, margin: "0 auto" }}>
      <table
        style={{
          width: "100%",
          minWidth: 700,
          borderCollapse: "separate",
          borderSpacing: 0,
          fontSize: 15,
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                position: "sticky",
                left: 0,
                zIndex: 2,
                background: "var(--bg-dark)",
                padding: "14px 16px",
                textAlign: "left",
                borderBottom: "1px solid var(--border-thin)",
              }}
            />
            {matrixPurposes.map((p) => (
              <th
                key={p}
                style={{
                  fontFamily: "'Noto Sans JP', sans-serif",
                  fontWeight: 400,
                  fontSize: 14,
                  color: "var(--gold-light)",
                  padding: "14px 12px",
                  textAlign: "center",
                  borderBottom: "1px solid var(--border-thin)",
                }}
              >
                {p}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {matrixCategories.map((cat, rowIdx) => (
            <tr key={cat}>
              <td
                style={{
                  position: "sticky",
                  left: 0,
                  zIndex: 2,
                  background: "var(--bg-dark)",
                  fontSize: 15,
                  color: "var(--text-light)",
                  padding: "14px 16px",
                  textAlign: "left",
                  whiteSpace: "nowrap",
                  borderBottom: "1px solid var(--border-thin)",
                }}
              >
                {cat}
              </td>
              {matrixData[rowIdx].map((val, colIdx) => (
                <td
                  key={colIdx}
                  style={{
                    textAlign: "center",
                    padding: 12,
                    borderBottom: "1px solid rgba(184,150,62,0.06)",
                  }}
                >
                  <Cell value={val} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
