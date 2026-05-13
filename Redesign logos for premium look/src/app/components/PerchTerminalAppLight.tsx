"use client";

import { useState, useRef } from "react";
import { PerchTerminalLogo } from "./PerchTerminalLogo";
import { PerchGlyph } from "./PerchFavicon";

type TabId = "chat" | "terminal" | "account";
type ChatMode = "ask" | "plan" | "agents";

type Message =
  | { id: string; kind: "text"; role: "user" | "assistant"; text: string }
  | { id: string; kind: "workbook-preview"; fileName: string; sheets: number }
  | { id: string; kind: "agent-run-trace"; state: "completed"; headline: string; steps: { id: string; label: string; status: "completed" | "running" | "failed" }[] }
  | { id: string; kind: "plan"; title: string; goal: string; workbookType: string; selectedSheets: string[]; agentsToRun: string[]; requestedOutputs: string[]; proposeAgentic?: boolean; steps: { id: string; label: string; detail: string }[] };

const MOCK_THREADS = [
  { id: "t1", title: "Q3 Revenue Analysis", time: "14:22" },
  { id: "t2", title: "Vendor Invoice Audit", time: "11:08" },
  { id: "t3", title: "Sales Pipeline Model", time: "Mon" },
];

const MOCK_MESSAGES: Message[] = [
  { id: "m1", kind: "text", role: "user", text: "Analyze the Q3 revenue workbook and flag any anomalies." },
  {
    id: "m2", kind: "agent-run-trace", state: "completed", headline: "Workbook analyst — completed",
    steps: [
      { id: "s1", label: "Load workbook sheets", status: "completed" },
      { id: "s2", label: "Profile column types and distributions", status: "completed" },
      { id: "s3", label: "Detect anomalies and outliers", status: "completed" },
      { id: "s4", label: "Generate summary charts", status: "completed" },
      { id: "s5", label: "Build artifact and save PDF", status: "completed" },
    ],
  },
  { id: "m3", kind: "text", role: "assistant", text: "I found 3 revenue anomalies in July — a sudden 40% dip on the 14th–16th that doesn't correlate with any public holiday. Two outlier transactions in the Enterprise segment exceed 3σ from the monthly mean. Full charts are in Terminal." },
  { id: "m4", kind: "text", role: "user", text: "What caused the July dip?" },
  { id: "m5", kind: "text", role: "assistant", text: "Based on the transaction-level data in Sheet 3, the July 14–16 dip is driven by a gap in invoice processing — 47 invoices that were generated but not pushed to the payment gateway. This appears to be a batch job failure rather than an actual revenue loss." },
  { id: "m6", kind: "text", role: "user", text: "Run a full analysis on this workbook." },
  {
    id: "m7", kind: "plan",
    title: "Q3 Revenue Workbook — Analyst Run",
    goal: "Proposed analyst run from workbook preview.",
    workbookType: "sales_revenue",
    selectedSheets: ["Revenue", "Summary", "Enterprise"],
    agentsToRun: ["workbook_analyst", "anomaly_detector", "chart_builder"],
    requestedOutputs: ["artifact", "pdf_report", "dashboard"],
    proposeAgentic: true,
    steps: [
      { id: "p1", label: "Profile all sheets", detail: "Scan Revenue, Summary, Enterprise — row counts, column types, nulls." },
      { id: "p2", label: "Detect anomalies", detail: "Flag outliers beyond 3σ and gap periods in the July revenue series." },
      { id: "p3", label: "Generate charts", detail: "Monthly trend, segment breakdown, anomaly overlay." },
      { id: "p4", label: "Build analyst report", detail: "Compile insights, charts, and a plain-language summary into a PDF artifact." },
    ],
  },
];

export function PerchTerminalAppLight() {
  const [tab, setTab] = useState<TabId>("chat");
  const [hoverTab, setHoverTab] = useState<TabId | null>(null);
  const [avatarHover, setAvatarHover] = useState(false);
  const [composerFocus, setComposerFocus] = useState(false);
  const [sendHover, setSendHover] = useState(false);
  const [activeThreadId, setActiveThreadId] = useState("t1");
  const [chatMode, setChatMode] = useState<ChatMode>("ask");
  const [input, setInput] = useState("");
  const [contextOpen, setContextOpen] = useState(false);
  const [threads, setThreads] = useState(MOCK_THREADS);
  const [hoverThreadId, setHoverThreadId] = useState<string | null>(null);
  const [railHover, setRailHover] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const activeThread = threads.find((t) => t.id === activeThreadId) ?? threads[0];

  const stepBadge = (status: string) => {
    if (status === "completed") return { char: "✓", color: "#3a8a2a" };
    if (status === "failed") return { char: "✗", color: "#a4351a" };
    if (status === "running") return { char: "•", color: "#C45000" };
    return { char: "·", color: "#A0988F" };
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      background: "#F2EDE6",
      fontFamily: "'Inter', system-ui, sans-serif",
      color: "#1A1816",
      overflow: "hidden",
    }}>
      {/* Header */}
      <header style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        height: 44,
        borderBottom: "1px solid #D8D2CA",
        flexShrink: 0,
        background: "#F2EDE6",
      }}>
        <PerchTerminalLogo variant="light" />
        <div style={{ display: "flex", gap: 2 }}>
          {(["chat", "terminal", "account"] as TabId[]).map((id) => {
            const isActive = tab === id;
            const isHover = hoverTab === id;
            return (
              <button
                key={id}
                onClick={() => setTab(id)}
                onMouseEnter={() => setHoverTab(id)}
                onMouseLeave={() => setHoverTab(null)}
                style={{
                  position: "relative",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px 12px 6px",
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: isActive || isHover ? "0.14em" : "0.12em",
                  textTransform: "uppercase",
                  color: isActive ? "#C45000" : isHover ? "#C45000" : "#A09890",
                  transition: "color 220ms cubic-bezier(0.22, 1, 0.36, 1), letter-spacing 260ms cubic-bezier(0.22, 1, 0.36, 1)",
                  overflow: "hidden",
                }}
              >
                <span style={{ position: "relative", zIndex: 1, color: isActive ? "#C45000" : isHover ? "#C45000" : "#A09890", transition: "color 220ms cubic-bezier(0.22, 1, 0.36, 1)" }}>{id}</span>
                <span
                  aria-hidden
                  style={{
                    position: "absolute",
                    left: 12, right: 12, bottom: 0, height: 2,
                    background: "#C45000",
                    transform: isActive ? "scaleX(1)" : isHover ? "scaleX(0.4)" : "scaleX(0)",
                    transformOrigin: "center",
                    opacity: isActive ? 1 : isHover ? 0.75 : 0,
                    transition: "transform 320ms cubic-bezier(0.22, 1, 0.36, 1), opacity 220ms ease",
                  }}
                />
              </button>
            );
          })}
        </div>
        <div style={{ width: 120, display: "flex", justifyContent: "flex-end", gap: 8, alignItems: "center" }}>
          <div
            onMouseEnter={() => setAvatarHover(true)}
            onMouseLeave={() => setAvatarHover(false)}
            style={{
              width: 24, height: 24, borderRadius: "50%",
              background: "#C45000",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 10, fontWeight: 600, color: "#fff",
              cursor: "pointer",
              boxShadow: avatarHover
                ? "0 0 0 1px #F2EDE6, 0 0 0 2px rgba(196,80,0,0.5), 0 0 12px rgba(196,80,0,0.25)"
                : "0 0 0 0 rgba(196,80,0,0)",
              transform: avatarHover ? "scale(1.06)" : "scale(1)",
              transition: "transform 240ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 240ms ease",
            }}
          >H</div>
        </div>
      </header>

      {/* Body */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Thread Rail */}
        <div
          onMouseEnter={() => setRailHover(true)}
          onMouseLeave={() => { setRailHover(false); setHoverThreadId(null); }}
          style={{
            width: railHover ? 196 : 32,
            borderRight: "1px solid #D8D2CA",
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
            overflow: "hidden",
            transition: "width 280ms cubic-bezier(0.22, 1, 0.36, 1)",
            background: "#EDE8E0",
          }}
        >
          <div style={{ flex: 1, overflowY: "auto" }}>
            {threads.map((t, i) => {
              const isActive = t.id === activeThreadId;
              const isHover = hoverThreadId === t.id && !isActive;
              const idx = String(i + 1).padStart(2, "0");
              return (
                <div
                  key={t.id}
                  onClick={() => setActiveThreadId(t.id)}
                  onMouseEnter={() => setHoverThreadId(t.id)}
                  onMouseLeave={() => setHoverThreadId(null)}
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: railHover ? "7px 12px 9px" : "7px 0 9px",
                    cursor: "pointer",
                    background: "none",
                    borderBottom: "1px solid #DDD8D0",
                    overflow: "hidden",
                    transition: "padding 280ms cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  <span style={{
                    fontSize: 9,
                    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                    fontVariantNumeric: "tabular-nums",
                    letterSpacing: "0.08em",
                    color: isActive ? "#C45000" : isHover ? "#C45000" : "#B0A8A0",
                    flexShrink: 0,
                    width: 32,
                    textAlign: "center",
                    transition: "color 220ms ease",
                  }}>{idx}</span>

                  <span style={{
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: isActive || isHover ? "0.14em" : "0.12em",
                    textTransform: "uppercase",
                    color: isActive ? "#C45000" : isHover ? "#C45000" : "#8A8480",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    flex: 1,
                    minWidth: 0,
                    opacity: railHover ? 1 : 0,
                    transition: "color 220ms cubic-bezier(0.22, 1, 0.36, 1), letter-spacing 260ms cubic-bezier(0.22, 1, 0.36, 1), opacity 200ms ease",
                  }}>{t.title}</span>
                  <span style={{
                    fontSize: 9,
                    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                    fontVariantNumeric: "tabular-nums",
                    letterSpacing: "0.06em",
                    color: isActive ? "#C45000" : "#B0A8A0",
                    textTransform: "uppercase",
                    flexShrink: 0,
                    marginLeft: 8,
                    marginRight: 12,
                    opacity: railHover ? 1 : 0,
                    transition: "color 220ms ease, opacity 200ms ease",
                  }}>{t.time}</span>

                  <span
                    aria-hidden
                    style={{
                      position: "absolute",
                      left: railHover ? 12 : 6,
                      right: railHover ? 12 : 6,
                      bottom: 0,
                      height: 2,
                      background: "#C45000",
                      transform: isActive ? "scaleX(1)" : isHover ? "scaleX(0.4)" : "scaleX(0)",
                      transformOrigin: "center",
                      opacity: isActive ? 1 : isHover ? 0.75 : 0,
                      transition: "transform 320ms cubic-bezier(0.22, 1, 0.36, 1), opacity 220ms ease, left 280ms cubic-bezier(0.22, 1, 0.36, 1), right 280ms cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  />
                </div>
              );
            })}
          </div>
          <div style={{ borderTop: "1px solid #D8D2CA", flexShrink: 0 }}>
            <button
              onClick={() => {
                const newId = `t${Date.now()}`;
                setThreads((prev) => [...prev, { id: newId, title: "New chat", time: "now" }]);
                setActiveThreadId(newId);
              }}
              style={{
                width: "100%",
                height: 36,
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#B0A8A0",
                fontSize: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: railHover ? "flex-start" : "center",
                paddingLeft: railHover ? 12 : 0,
                transition: "color 180ms ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#C45000"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#B0A8A0"; }}
            >+</button>
          </div>
        </div>

        {/* Main chat area */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Project header */}
          <div style={{
            padding: "8px 20px",
            borderBottom: "1px solid #D8D2CA",
            display: "flex",
            alignItems: "baseline",
            gap: 10,
            flexShrink: 0,
            background: "#F2EDE6",
          }}>
            <span style={{ fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "#A09890" }}>Project</span>
            <span style={{ fontSize: 13, fontWeight: 500, color: "#1A1816" }}>{activeThread?.title ?? "Main thread"}</span>
            <span style={{ fontSize: 11, color: "#B0A8A0", marginLeft: 4 }}>3 files · 2 reports · 14k PT</span>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 10, background: "#F2EDE6" }}>
            {MOCK_MESSAGES.map((m) => {
              if (m.kind === "text" && m.role === "user") {
                return (
                  <div key={m.id} style={{
                    background: "rgba(196,80,0,0.06)",
                    borderBottom: "1px solid rgba(196,80,0,0.1)",
                    padding: "16px 20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    margin: "0 -20px",
                  }}>
                    <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#C45000", marginBottom: 8 }}>You</span>
                    <span style={{ fontSize: 14, color: "#1A1816", lineHeight: 1.55 }}>{m.text}</span>
                  </div>
                );
              }

              if (m.kind === "text" && m.role === "assistant") {
                return (
                  <div key={m.id} style={{
                    background: "rgba(0,0,0,0.03)",
                    borderBottom: "1px solid rgba(0,0,0,0.07)",
                    padding: "16px 20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    margin: "0 -20px",
                  }}>
                    <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#C45000", marginBottom: 8, display: "block" }}>Saffron</span>
                    <span style={{ fontSize: 14, color: "#3A3530", lineHeight: 1.6 }}>{m.text}</span>
                  </div>
                );
              }

              if (m.kind === "agent-run-trace") {
                return (
                  <div key={m.id} style={{
                    background: "rgba(0,0,0,0.03)",
                    borderBottom: "1px solid rgba(0,0,0,0.07)",
                    padding: "16px 20px",
                    margin: "0 -20px",
                  }}>
                    <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#C45000", display: "block", marginBottom: 10 }}>Saffron</span>
                    <strong style={{ fontSize: 12, color: "#3a8a2a", display: "block", marginBottom: 8 }}>{m.headline}</strong>
                    <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 4 }}>
                      {m.steps.map((step) => {
                        const { char, color } = stepBadge(step.status);
                        return (
                          <li key={step.id} style={{ display: "grid", gridTemplateColumns: "16px 1fr", gap: 8, fontSize: 12, alignItems: "baseline" }}>
                            <span style={{ color, fontFamily: "monospace", textAlign: "center" }}>{char}</span>
                            <span style={{ color: "#6A6460" }}>{step.label}</span>
                          </li>
                        );
                      })}
                    </ol>
                    <div style={{ marginTop: 12, display: "flex", gap: 12, alignItems: "center" }}>
                      <button style={{ background: "none", border: "none", padding: 0, fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C45000", cursor: "pointer" }}>Open in Terminal →</button>
                      <span style={{ width: 1, height: 10, background: "#C8C2BA" }} />
                      <button
                        onMouseEnter={(e) => { e.currentTarget.style.color = "#C45000"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = "#A09890"; }}
                        style={{ background: "none", border: "none", padding: 0, fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#A09890", cursor: "pointer", transition: "color 180ms ease" }}
                      >View run details</button>
                    </div>
                  </div>
                );
              }

              if (m.kind === "plan") {
                return (
                  <div key={m.id} style={{
                    background: "rgba(0,0,0,0.03)",
                    borderBottom: "1px solid rgba(0,0,0,0.07)",
                    padding: "16px 20px",
                    margin: "0 -20px",
                  }}>
                    <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#C45000", display: "block", marginBottom: 10 }}>Saffron</span>

                    <p style={{ margin: "0 0 2px", fontSize: 14, fontWeight: 600, color: "#1A1816", letterSpacing: "-0.01em" }}>{m.title}</p>
                    <p style={{ margin: "0 0 14px", fontSize: 12, color: "#A09890" }}>{m.goal}</p>

                    <div style={{ paddingTop: 4 }}>
                      {m.steps.map((step, i) => {
                        const status = i === 0 ? "done" : i === 1 ? "running" : "pending";
                        const isLast = i === m.steps.length - 1;
                        return (
                          <div key={step.id} style={{ display: "flex", gap: 14, alignItems: "stretch" }}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: 16 }}>
                              <span style={{
                                fontSize: 10,
                                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                                fontVariantNumeric: "tabular-nums",
                                color: status === "done" ? "#3a8a2a" : status === "running" ? "#C45000" : "#C0BAB4",
                                lineHeight: 1, paddingTop: 2,
                              }}>{status === "done" ? "✓" : String(i + 1)}</span>
                              {!isLast && (
                                <div style={{
                                  flex: 1, width: 1, margin: "4px 0",
                                  background: status === "done"
                                    ? "#3a8a2a"
                                    : status === "running"
                                    ? "linear-gradient(180deg, #C45000 40%, #D8D2CA 100%)"
                                    : "#D8D2CA",
                                  minHeight: 24,
                                }} />
                              )}
                            </div>
                            <div style={{ paddingBottom: isLast ? 0 : 14, paddingTop: 1, flex: 1 }}>
                              <span style={{
                                fontSize: 12, fontWeight: 600, display: "block", marginBottom: 2,
                                color: status === "done" ? "#B0A8A0" : status === "running" ? "#1A1816" : "#C0BAB4",
                                textDecoration: status === "done" ? "line-through" : "none",
                              }}>{step.label}</span>
                              <span style={{ fontSize: 11, lineHeight: 1.5, color: status === "running" ? "#8A8480" : "#C8C2BA" }}>{step.detail}</span>
                              {status === "running" && (
                                <span style={{ fontSize: 9, fontFamily: "'JetBrains Mono', ui-monospace, monospace", color: "#C45000", letterSpacing: "0.08em", display: "block", marginTop: 4 }}>running…</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 9, fontFamily: "'JetBrains Mono', ui-monospace, monospace", color: "#C0BAB4", letterSpacing: "0.04em" }}>
                        {m.selectedSheets.join(" · ")} · {m.agentsToRun.length} agents
                      </span>
                      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                        <button style={{ background: "none", border: "none", padding: 0, fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C45000", cursor: "pointer" }}>
                          {m.proposeAgentic ? "Start agents →" : "Execute →"}
                        </button>
                        <span style={{ width: 1, height: 10, background: "#C8C2BA" }} />
                        <button
                          onMouseEnter={(e) => { e.currentTarget.style.color = "#C45000"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = "#A09890"; }}
                          style={{ background: "none", border: "none", padding: 0, fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#A09890", cursor: "pointer", transition: "color 180ms ease" }}
                        >Edit plan</button>
                        <span style={{ width: 1, height: 10, background: "#C8C2BA" }} />
                        <button
                          onMouseEnter={(e) => { e.currentTarget.style.color = "#C45000"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = "#A09890"; }}
                          style={{ background: "none", border: "none", padding: 0, fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#A09890", cursor: "pointer", transition: "color 180ms ease" }}
                        >Cancel</button>
                      </div>
                    </div>
                  </div>
                );
              }

              return null;
            })}
            {/* Thinking indicator */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 20px",
              margin: "0 -20px",
              borderBottom: "1px solid rgba(0,0,0,0.07)",
            }}>
              <PerchGlyph product="terminal" size={14} />
              <style>{`
                @keyframes perch-thinking-light {
                  0%, 80%, 100% { opacity: 0.2; transform: translateY(0); }
                  40% { opacity: 1; transform: translateY(-2px); }
                }
              `}</style>
              {[0, 1, 2].map((i) => (
                <span key={i} style={{
                  width: 3, height: 3,
                  borderRadius: "50%",
                  background: "#C45000",
                  display: "inline-block",
                  animation: `perch-thinking-light 1.2s ease-in-out ${i * 0.2}s infinite`,
                }} />
              ))}
              <span style={{ fontSize: 10, color: "#B0A8A0", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500 }}>Thinking</span>
            </div>

            <div ref={bottomRef} />
          </div>

          {/* Composer */}
          <footer style={{
            borderTop: "1px solid #D8D2CA",
            padding: "14px 16px 16px",
            flexShrink: 0,
            background: "#F2EDE6",
          }}>
            {/* Context panel */}
            {contextOpen && (() => {
              const segments = [
                { label: "Active source", tokens: 6, color: "#C45000" },
                { label: "Recent chat",   tokens: 4, color: "#8A3800" },
                { label: "Artifacts",     tokens: 2, color: "#E07828" },
                { label: "Thread summary",tokens: 1, color: "#4A2000" },
                { label: "Memory",        tokens: 1, color: "#F0A060" },
                { label: "System",        tokens: 1, color: "#C8A080" },
              ];
              const used = segments.reduce((s, x) => s + x.tokens, 0);
              const total = 200;
              const usedPct = (used / total) * 100;
              return (
                <div style={{
                  background: "#EDE8E0",
                  border: "1px solid #D8D2CA",
                  padding: "14px 16px",
                  marginBottom: 10,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
                    <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#A09890" }}>Context window</span>
                    <span style={{ fontSize: 9, fontFamily: "'JetBrains Mono', ui-monospace, monospace", color: "#C45000", letterSpacing: "0.06em" }}>
                      {used}k <span style={{ color: "#B0A8A0" }}>/ {total}k</span>
                    </span>
                  </div>

                  <div style={{ position: "relative", height: 6, background: "#D8D2CA", marginBottom: 12, display: "flex", overflow: "hidden" }}>
                    {segments.map((seg) => (
                      <div
                        key={seg.label}
                        style={{
                          height: "100%",
                          width: `${(seg.tokens / total) * 100}%`,
                          background: seg.color,
                          borderRight: "1px solid #EDE8E0",
                          flexShrink: 0,
                        }}
                      />
                    ))}
                    <div style={{ flex: 1, background: "transparent" }} />
                    <div style={{ position: "absolute", left: `${usedPct}%`, top: 0, bottom: 0, width: 1, background: "#B0A8A0" }} />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6px 0" }}>
                    {segments.map((seg) => (
                      <div key={seg.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <span style={{ width: 6, height: 6, background: seg.color, flexShrink: 0 }} />
                        <span style={{ fontSize: 9, color: "#8A8480", letterSpacing: "0.04em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{seg.label}</span>
                        <span style={{ fontSize: 9, fontFamily: "'JetBrains Mono', ui-monospace, monospace", color: "#A09890", marginLeft: "auto", paddingRight: 12 }}>{seg.tokens}k</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Unified composer surface */}
            <div style={{
              position: "relative",
              background: "#EDE8E0",
              border: `1px solid ${composerFocus ? "rgba(196,80,0,0.5)" : "#D0CAC2"}`,
              borderRadius: 12,
              boxShadow: composerFocus
                ? "0 0 0 3px rgba(196,80,0,0.07)"
                : "none",
              transition: "border-color 220ms ease, box-shadow 240ms ease",
              overflow: "hidden",
            }}>
              <textarea
                rows={2}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onFocus={() => setComposerFocus(true)}
                onBlur={() => setComposerFocus(false)}
                placeholder={
                  chatMode === "agents"
                    ? "Run tools against the current file or selected source…"
                    : chatMode === "plan"
                      ? "Draft a structured plan — execution only after you approve in Agents…"
                      : "Ask about uploads, worksheets, Terminal artifacts, or what to do next…"
                }
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  padding: "14px 16px 8px",
                  fontSize: 13,
                  color: "#1A1816",
                  resize: "none",
                  fontFamily: "inherit",
                  outline: "none",
                  lineHeight: 1.55,
                  letterSpacing: "-0.005em",
                  caretColor: "#C45000",
                  display: "block",
                }}
              />

              {/* Inline control bar */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 8px 8px 10px" }}>
                {[
                  { title: "Upload file", icon: (
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M6.5 8.5V2.5M4 5l2.5-2.5L9 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square"/>
                      <path d="M2 10.5h9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square"/>
                    </svg>
                  )},
                  { title: "Open folder", icon: (
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M1.5 4.5h10v6h-10zM1.5 4.5V3h3l1 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" strokeLinejoin="miter"/>
                    </svg>
                  )},
                ].map(({ title, icon }) => (
                  <button
                    key={title}
                    title={title}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#C45000"; e.currentTarget.style.borderColor = "rgba(196,80,0,0.4)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "#A09890"; e.currentTarget.style.borderColor = "#C8C2BA"; }}
                    style={{
                      width: 26, height: 26,
                      background: "transparent",
                      border: "1px solid #C8C2BA",
                      borderRadius: 7,
                      cursor: "pointer",
                      color: "#A09890",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "color 180ms ease, border-color 180ms ease",
                      flexShrink: 0,
                    }}
                  >{icon}</button>
                ))}

                <select
                  value={chatMode}
                  onChange={(e) => setChatMode(e.target.value as ChatMode)}
                  style={{
                    background: "transparent", border: "none", outline: "none",
                    fontSize: 10, color: "#C45000", cursor: "pointer", fontFamily: "inherit",
                    fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase",
                    padding: "0 4px",
                  }}
                >
                  <option value="ask">Ask</option>
                  <option value="plan">Plan</option>
                  <option value="agents">Agents</option>
                </select>

                <span style={{ width: 1, height: 12, background: "#D0CAC2" }} />

                <span style={{ fontSize: 10, color: "#A09890", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase" }}>Saffron</span>

                <button
                  onClick={() => setContextOpen((v) => !v)}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#C45000"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "#A09890"; }}
                  style={{
                    marginLeft: "auto",
                    background: "none", border: "none",
                    fontSize: 10, color: "#A09890", cursor: "pointer",
                    padding: "0 4px",
                    letterSpacing: "0.06em",
                    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                    fontVariantNumeric: "tabular-nums",
                    transition: "color 180ms ease",
                  }}
                >
                  14k / 200k {contextOpen ? "▴" : "▾"}
                </button>

                <button
                  disabled={!input.trim()}
                  onMouseEnter={() => setSendHover(true)}
                  onMouseLeave={() => setSendHover(false)}
                  style={{
                    background: "none",
                    border: "none",
                    padding: "0 4px",
                    cursor: input.trim() ? "pointer" : "default",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: input.trim()
                      ? sendHover ? "#FF6A1A" : "#C45000"
                      : "#C0BAB4",
                    transition: "color 180ms ease",
                    flexShrink: 0,
                  }}
                >Send ↵</button>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
