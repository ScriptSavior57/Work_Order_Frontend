"use client";

import type { SummaryResult } from "@/lib/api";

interface ResultsSummaryProps {
  summary: SummaryResult;
}

export default function ResultsSummary({ summary }: ResultsSummaryProps) {
  const { counts, patterns, red_flags } = summary;
  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <section
        style={{
          background: "var(--surface)",
          borderRadius: 8,
          padding: 16,
          border: "1px solid var(--border)",
        }}
      >
        <h3 style={{ margin: "0 0 12px", fontSize: 16 }}>Counts by category</h3>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {Object.entries(counts).map(([cat, n]) => (
            <span
              key={cat}
              style={{
                padding: "6px 12px",
                background: "var(--bg)",
                borderRadius: 6,
                border: "1px solid var(--border)",
              }}
            >
              <strong>{cat}</strong>: {n}
            </span>
          ))}
          {total > 0 && (
            <span style={{ color: "var(--muted)", alignSelf: "center" }}>
              Total: {total}
            </span>
          )}
        </div>
      </section>

      {patterns.length > 0 && (
        <section
          style={{
            background: "var(--surface)",
            borderRadius: 8,
            padding: 16,
            border: "1px solid var(--border)",
          }}
        >
          <h3 style={{ margin: "0 0 12px", fontSize: 16 }}>Patterns</h3>
          <ul style={{ margin: 0, paddingLeft: 20, color: "var(--muted)", fontSize: 14 }}>
            {patterns.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </section>
      )}

      {red_flags.length > 0 && (
        <section
          style={{
            background: "rgba(248,81,73,0.1)",
            borderRadius: 8,
            padding: 16,
            border: "1px solid var(--danger)",
          }}
        >
          <h3 style={{ margin: "0 0 12px", fontSize: 16, color: "var(--danger)" }}>
            Red flags
          </h3>
          <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14 }}>
            {red_flags.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
