import { useState } from "react";
import { PerchTerminalApp } from "./components/PerchTerminalApp";
import { PerchTerminalAppLight } from "./components/PerchTerminalAppLight";

export default function App() {
  const [mode, setMode] = useState<"dark" | "light">("dark");

  return (
    <div style={{ position: "relative" }}>
      <div style={{
        position: "fixed", top: 10, right: 10, zIndex: 100,
        display: "flex", gap: 0,
        border: "1px solid rgba(196,80,0,0.3)",
        overflow: "hidden",
        borderRadius: 4,
      }}>
        {(["dark", "light"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            style={{
              padding: "4px 10px",
              fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
              border: "none", cursor: "pointer",
              background: mode === m ? "#C45000" : "rgba(0,0,0,0.6)",
              color: mode === m ? "#fff" : "#C45000",
              transition: "background 180ms ease, color 180ms ease",
            }}
          >{m}</button>
        ))}
      </div>
      {mode === "dark" ? <PerchTerminalApp /> : <PerchTerminalAppLight />}
    </div>
  );
}
