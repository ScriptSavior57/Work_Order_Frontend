"use client";

import type { DiagnosticSection, DiagnosticSummary } from "@/lib/api";

function SectionBlock({ section }: { section: DiagnosticSection }) {
  const hasMetrics = section.metrics && Object.keys(section.metrics).length > 0;
  return (
    <section
      style={{
        background: "var(--surface)",
        borderRadius: 8,
        padding: 16,
        border: "1px solid var(--border)",
      }}
    >
      <h3 style={{ margin: "0 0 12px", fontSize: 16 }}>{section.title}</h3>
      {section.note && (
        <p style={{ color: "var(--muted)", fontSize: 13, marginBottom: 12 }}>
          {section.note}
        </p>
      )}
      {hasMetrics && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 12 }}>
          {Object.entries(section.metrics).map(([k, v]) => (
            <span
              key={k}
              style={{
                padding: "6px 10px",
                background: "var(--bg)",
                borderRadius: 6,
                fontSize: 13,
                border: "1px solid var(--border)",
              }}
            >
              <strong>
                {k.replace(/_/g, " ")}:
              </strong>{" "}
              {Array.isArray(v) ? v.join(", ") : String(v)}
            </span>
          ))}
        </div>
      )}
      {section.red_flags.length > 0 && (
        <ul
          style={{
            margin: 0,
            paddingLeft: 20,
            fontSize: 14,
            color: "var(--danger)",
          }}
        >
          {section.red_flags.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

interface DiagnosticReportProps {
  diagnostic: DiagnosticSummary;
}

export default function DiagnosticReport({ diagnostic }: DiagnosticReportProps) {
  const exec = diagnostic.executive_summary;
  const sections: DiagnosticSection[] = [
    diagnostic.volume_velocity,
    diagnostic.response_sla,
    diagnostic.completion_throughput,
    diagnostic.open_risk_profile,
    diagnostic.repeat_chronic,
    diagnostic.make_ready,
    diagnostic.vendor_performance,
    diagnostic.cost_diagnostics,
    diagnostic.superintendent_performance,
    diagnostic.resident_satisfaction,
    diagnostic.reputation_risk,
    diagnostic.fraud_indicators,
    diagnostic.forward_looking_risk,
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <section
        style={{
          background: "linear-gradient(135deg, var(--surface) 0%, var(--bg) 100%)",
          borderRadius: 8,
          padding: 20,
          border: "2px solid var(--accent)",
        }}
      >
        <h2 style={{ margin: "0 0 16px", fontSize: 20 }}>
          Executive Summary
        </h2>
        {exec.whats_working.length > 0 && (
          <div style={{ marginBottom: 12 }}>
            <h4 style={{ margin: "0 0 6px", fontSize: 14, color: "var(--success)" }}>
              What&apos;s working
            </h4>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14 }}>
              {exec.whats_working.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        )}
        {exec.needs_watching.length > 0 && (
          <div style={{ marginBottom: 12 }}>
            <h4 style={{ margin: "0 0 6px", fontSize: 14, color: "var(--warn)" }}>
              Needs watching
            </h4>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14 }}>
              {exec.needs_watching.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        )}
        {exec.immediate_actions.length > 0 && (
          <div style={{ marginBottom: 12 }}>
            <h4 style={{ margin: "0 0 6px", fontSize: 14, color: "var(--danger)" }}>
              Immediate actions
            </h4>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14 }}>
              {exec.immediate_actions.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        )}
        {exec.top_3_risks_noi.length > 0 && (
          <div style={{ marginBottom: 12 }}>
            <h4 style={{ margin: "0 0 6px", fontSize: 14 }}>Top 3 risks to NOI</h4>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14 }}>
              {exec.top_3_risks_noi.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        )}
        {exec.top_3_risks_reputation.length > 0 && (
          <div style={{ marginBottom: 12 }}>
            <h4 style={{ margin: "0 0 6px", fontSize: 14 }}>Top 3 reputation risks</h4>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14 }}>
              {exec.top_3_risks_reputation.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        )}
        {exec.top_3_system_failures.length > 0 && (
          <div style={{ marginBottom: 12 }}>
            <h4 style={{ margin: "0 0 6px", fontSize: 14 }}>System gaps</h4>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, color: "var(--muted)" }}>
              {exec.top_3_system_failures.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        )}
        {exec.action_list.length > 0 && (
          <div>
            <h4 style={{ margin: "0 0 6px", fontSize: 14 }}>Action list</h4>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14 }}>
              {exec.action_list.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <h3 style={{ fontSize: 18, marginBottom: 8 }}>Diagnostic sections</h3>
      {sections.map((sec, i) => (
        <SectionBlock key={i} section={sec} />
      ))}
    </div>
  );
}
