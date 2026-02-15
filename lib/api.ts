const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface WorkOrderRaw {
  id?: string | null;
  description: string;
  date?: string | null;
  unit?: string | null;
  source_text?: string | null;
  issue?: string | null;
}

export interface UploadResponse {
  filename: string;
  format: string;
  work_orders: WorkOrderRaw[];
}

export interface CategorizedOrder {
  description: string;
  category: string;
  date?: string | null;
  unit?: string | null;
  raw_id?: string | null;
}

export interface SummaryResult {
  counts: Record<string, number>;
  patterns: string[];
  red_flags: string[];
}

export interface DiagnosticSection {
  title: string;
  metrics: Record<string, unknown>;
  red_flags: string[];
  note?: string | null;
}

export interface ExecutiveSummary {
  whats_working: string[];
  needs_watching: string[];
  immediate_actions: string[];
  top_3_risks_noi: string[];
  top_3_risks_reputation: string[];
  top_3_system_failures: string[];
  action_list: string[];
}

export interface DiagnosticSummary {
  executive_summary: ExecutiveSummary;
  volume_velocity: DiagnosticSection;
  response_sla: DiagnosticSection;
  completion_throughput: DiagnosticSection;
  open_risk_profile: DiagnosticSection;
  repeat_chronic: DiagnosticSection;
  make_ready: DiagnosticSection;
  vendor_performance: DiagnosticSection;
  cost_diagnostics: DiagnosticSection;
  superintendent_performance: DiagnosticSection;
  resident_satisfaction: DiagnosticSection;
  reputation_risk: DiagnosticSection;
  fraud_indicators: DiagnosticSection;
  forward_looking_risk: DiagnosticSection;
}

export interface ProcessResponse {
  categorized: CategorizedOrder[];
  summary: SummaryResult;
  diagnostic: DiagnosticSummary;
}

export async function uploadFile(file: File): Promise<UploadResponse> {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch(`${API_URL}/upload`, {
    method: "POST",
    body: form,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || "Upload failed");
  }
  return res.json();
}

export async function processOrders(
  workOrders: WorkOrderRaw[],
  startDate: string,
  endDate: string
): Promise<ProcessResponse> {
  const res = await fetch(`${API_URL}/process`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      work_orders: workOrders,
      start_date: startDate,
      end_date: endDate,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || "Process failed");
  }
  return res.json();
}
