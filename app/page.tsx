"use client";

import { useCallback, useState } from "react";
import FileUpload from "@/components/FileUpload";
import DateRangePicker from "@/components/DateRangePicker";
import ResultsSummary from "@/components/ResultsSummary";
import WorkOrderTable from "@/components/WorkOrderTable";
import {
  uploadFile,
  processOrders,
  type WorkOrderRaw,
  type ProcessResponse,
} from "@/lib/api";

function defaultDateRange() {
  const end = new Date();
  const start = new Date(end);
  start.setMonth(start.getMonth() - 1);
  return {
    start: start.toISOString().slice(0, 10),
    end: end.toISOString().slice(0, 10),
  };
}

export default function Home() {
  const { start: defStart, end: defEnd } = defaultDateRange();
  const [startDate, setStartDate] = useState(defStart);
  const [endDate, setEndDate] = useState(defEnd);
  const [workOrders, setWorkOrders] = useState<WorkOrderRaw[]>([]);
  const [result, setResult] = useState<ProcessResponse | null>(null);
  const [processing, setProcessing] = useState(false);
  const [processError, setProcessError] = useState<string | null>(null);

  const handleUpload = useCallback(async (file: File) => {
    const data = await uploadFile(file);
    setWorkOrders(data.work_orders);
    setResult(null);
    setProcessError(null);
  }, []);

  const handleProcess = useCallback(async () => {
    if (workOrders.length === 0) return;
    setProcessing(true);
    setProcessError(null);
    try {
      const data = await processOrders(workOrders, startDate, endDate);
      setResult(data);
    } catch (e) {
      setProcessError(e instanceof Error ? e.message : "Process failed");
    } finally {
      setProcessing(false);
    }
  }, [workOrders, startDate, endDate]);

  return (
    <main
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: 32,
        minHeight: "100vh",
      }}
    >
      <h1 style={{ marginBottom: 8, fontSize: 28 }}>Work Order Auditor</h1>
      <p style={{ color: "var(--muted)", marginBottom: 24 }}>
        Upload a work order report (Ridgewood PDF or Entrata Excel), set a date range, then run the audit.
      </p>

      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, marginBottom: 12 }}>1. Upload report</h2>
        <FileUpload onUpload={handleUpload} disabled={processing} />
        {workOrders.length > 0 && (
          <p style={{ marginTop: 8, color: "var(--success)", fontSize: 14 }}>
            Loaded {workOrders.length} work order(s).
          </p>
        )}
      </section>

      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, marginBottom: 12 }}>2. Date range</h2>
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onStartChange={setStartDate}
          onEndChange={setEndDate}
          disabled={processing}
        />
      </section>

      <section style={{ marginBottom: 24 }}>
        <button
          onClick={handleProcess}
          disabled={workOrders.length === 0 || processing}
          style={{
            padding: "10px 20px",
            borderRadius: 6,
            border: "none",
            background: workOrders.length === 0 || processing ? "var(--border)" : "var(--accent)",
            color: "var(--bg)",
            cursor: workOrders.length === 0 || processing ? "not-allowed" : "pointer",
            fontWeight: 600,
          }}
        >
          {processing ? "Processing…" : "Run audit"}
        </button>
        {processError && (
          <p style={{ marginTop: 8, color: "var(--danger)", fontSize: 14 }}>
            {processError}
          </p>
        )}
      </section>

      {result && (
        <>
          <h2 style={{ fontSize: 18, marginBottom: 12 }}>Summary</h2>
          <ResultsSummary summary={result.summary} />
          <h2 style={{ fontSize: 18, marginTop: 24, marginBottom: 12 }}>
            Categorized work orders
          </h2>
          <WorkOrderTable orders={result.categorized} />
        </>
      )}
    </main>
  );
}
