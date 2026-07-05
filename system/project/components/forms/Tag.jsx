import React from "react";
import { Icon } from "../media/Icon.jsx";

function toneStyle(tone) {
  switch (tone) {
    case "accent": // e.g. 필수 — orange-tinted
      return { background: "rgba(250, 93, 0, 0.10)", color: "var(--accent)", border: "1px solid transparent" };
    case "solid": // filled orange
      return { background: "var(--accent)", color: "var(--text-on-accent)", border: "1px solid transparent" };
    case "wash": // atmospheric marigold
      return { background: "var(--surface-wash)", color: "var(--color-ironwood)", border: "1px solid transparent" };
    case "outline":
      return { background: "transparent", color: "var(--text-secondary)", border: "1px solid var(--border-input)" };
    case "neutral": // e.g. 선택
    default:
      return { background: "var(--surface-page)", color: "var(--text-secondary)", border: "1px solid var(--border-divider)" };
  }
}

/**
 * Tag — pill label (999px radius). Use for "필수 / 선택" markers, status chips,
 * and category labels. Tones stay within the warm palette; `accent`/`solid`
 * carry the orange.
 */
export function Tag({ children, tone = "neutral", size = "md", icon, style, ...rest }) {
  const t = toneStyle(tone);
  const sm = size === "sm";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: sm ? 4 : 6,
        padding: sm ? "3px 10px" : "5px 14px",
        fontFamily: "var(--font-sans)",
        fontSize: sm ? "12px" : "var(--text-caption)",
        fontWeight: 600,
        letterSpacing: "0.015em",
        lineHeight: 1.2,
        borderRadius: "var(--radius-tags)",
        whiteSpace: "nowrap",
        ...t,
        ...style,
      }}
      {...rest}
    >
      {icon ? <Icon name={icon} size={sm ? 12 : 14} /> : null}
      {children}
    </span>
  );
}
