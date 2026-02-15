"use client";

import { useEffect, useState } from "react";

const STEPS = [
  "Preparing work orders…",
  "Categorizing with AI (Plumbing, Electrical, Heat, Other)…",
  "Building summary and red flags…",
];

interface ProcessingStatusProps {
  active: boolean;
}

export default function ProcessingStatus({ active }: ProcessingStatusProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (!active) return;
    setStepIndex(0);
    setPercent(0);
    const stepInterval = setInterval(() => {
      setStepIndex((i) => (i + 1) % STEPS.length);
    }, 3200);
    const percentInterval = setInterval(() => {
      setPercent((p) => (p >= 90 ? 90 : p + 4));
    }, 400);
    return () => {
      clearInterval(stepInterval);
      clearInterval(percentInterval);
    };
  }, [active]);

  useEffect(() => {
    if (!active && percent > 0) {
      setPercent(100);
      const t = setTimeout(() => setPercent(0), 400);
      return () => clearTimeout(t);
    }
  }, [active, percent]);

  if (!active && percent === 0) return null;

  return (
    <div
      style={{
        marginTop: 16,
        padding: 16,
        background: "var(--surface)",
        borderRadius: 8,
        border: "1px solid var(--border)",
      }}
    >
      <p style={{ margin: "0 0 12px", fontSize: 14, color: "var(--muted)" }}>
        {active ? STEPS[stepIndex] : "Complete."}
      </p>
      <div
        style={{
          height: 8,
          borderRadius: 4,
          background: "var(--bg)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${percent}%`,
            background: "var(--accent)",
            borderRadius: 4,
            transition: "width 0.3s ease",
          }}
        />
      </div>
      <p style={{ margin: "8px 0 0", fontSize: 12, color: "var(--muted)" }}>
        {percent}%
      </p>
    </div>
  );
}
