import React from "react";
import { Icon } from "../media/Icon.jsx";

/**
 * StepIndicator — compact numbered progress for the flow (정보 입력 → 이름 제출).
 * Completed steps fill orange with a check; the current step is outlined orange;
 * upcoming steps are muted.
 */
export function StepIndicator({ steps = [], current = 0, style, ...rest }) {
  return (
    <ol
      style={{ display: "flex", alignItems: "center", gap: 0, listStyle: "none", margin: 0, padding: 0, ...style }}
      {...rest}
    >
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        const circleStyle = done
          ? { background: "var(--accent)", border: "1px solid var(--accent)", color: "var(--text-on-accent)" }
          : active
            ? { background: "var(--surface-card)", border: "2px solid var(--accent)", color: "var(--accent)" }
            : { background: "var(--surface-card)", border: "1px solid var(--border-input)", color: "var(--text-disabled)" };
        return (
          <li key={i} style={{ display: "flex", alignItems: "center", gap: 10, flex: i < steps.length - 1 ? "1 1 auto" : "0 0 auto" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 10, flex: "0 0 auto" }}>
              <span
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "var(--radius-full)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-sans)",
                  fontSize: 13,
                  fontWeight: 700,
                  ...circleStyle,
                }}
              >
                {done ? <Icon name="check" size={16} /> : i + 1}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "var(--text-caption)",
                  fontWeight: active ? 600 : 500,
                  letterSpacing: "0.015em",
                  color: active ? "var(--text-primary)" : done ? "var(--text-secondary)" : "var(--text-disabled)",
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </span>
            </span>
            {i < steps.length - 1 ? (
              <span style={{ flex: "1 1 auto", height: 1, minWidth: 24, background: done ? "var(--accent)" : "var(--border-divider)", margin: "0 12px" }} />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
