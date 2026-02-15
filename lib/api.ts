const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface WorkOrderRaw {
  id?: string | null;
  description: string;
  date?: string | null;
  unit?: string | null;
  source_text?: string | null;
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

export interface ProcessResponse {
  categorized: CategorizedOrder[];
  summary: SummaryResult;
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
