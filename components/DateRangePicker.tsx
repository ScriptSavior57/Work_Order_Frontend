"use client";

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onStartChange: (v: string) => void;
  onEndChange: (v: string) => void;
  disabled?: boolean;
}

export default function DateRangePicker({
  startDate,
  endDate,
  onStartChange,
  onEndChange,
  disabled,
}: DateRangePickerProps) {
  return (
    <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
      <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ color: "var(--muted)", fontSize: 14 }}>From</span>
        <input
          type="date"
          value={startDate}
          onChange={(e) => onStartChange(e.target.value)}
          disabled={disabled}
          style={{
            padding: "8px 12px",
            borderRadius: 6,
            border: "1px solid var(--border)",
            background: "var(--surface)",
            color: "var(--text)",
          }}
        />
      </label>
      <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ color: "var(--muted)", fontSize: 14 }}>To</span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => onEndChange(e.target.value)}
          disabled={disabled}
          style={{
            padding: "8px 12px",
            borderRadius: 6,
            border: "1px solid var(--border)",
            background: "var(--surface)",
            color: "var(--text)",
          }}
        />
      </label>
    </div>
  );
}
