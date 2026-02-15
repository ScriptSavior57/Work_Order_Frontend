"use client";

import type { CategorizedOrder } from "@/lib/api";

interface WorkOrderTableProps {
  orders: CategorizedOrder[];
}

export default function WorkOrderTable({ orders }: WorkOrderTableProps) {
  if (orders.length === 0) return null;

  return (
    <div
      style={{
        overflowX: "auto",
        border: "1px solid var(--border)",
        borderRadius: 8,
        background: "var(--surface)",
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
        <thead>
          <tr style={{ borderBottom: "1px solid var(--border)" }}>
            <th style={{ textAlign: "left", padding: "12px 16px", color: "var(--muted)" }}>
              Description
            </th>
            <th style={{ textAlign: "left", padding: "12px 16px", color: "var(--muted)" }}>
              Category
            </th>
            <th style={{ textAlign: "left", padding: "12px 16px", color: "var(--muted)" }}>
              Date
            </th>
            <th style={{ textAlign: "left", padding: "12px 16px", color: "var(--muted)" }}>
              Unit
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o, i) => (
            <tr
              key={i}
              style={{
                borderBottom: "1px solid var(--border)",
              }}
            >
              <td style={{ padding: "12px 16px", maxWidth: 320 }}>{o.description}</td>
              <td style={{ padding: "12px 16px" }}>{o.category}</td>
              <td style={{ padding: "12px 16px", color: "var(--muted)" }}>
                {o.date ?? "—"}
              </td>
              <td style={{ padding: "12px 16px", color: "var(--muted)" }}>
                {o.unit ?? "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
