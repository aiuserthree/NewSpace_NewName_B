import React from "react";
import { Icon } from "../media/Icon.jsx";

const TONES = {
  info: { bg: "var(--surface-card)", border: "1px solid var(--border-divider)", iconColor: "var(--text-tertiary)", defaultIcon: "info" },
  accent: { bg: "var(--surface-wash)", border: "1px solid transparent", iconColor: "var(--accent)", defaultIcon: "info" },
  success: { bg: "var(--surface-wash)", border: "1px solid transparent", iconColor: "var(--accent)", defaultIcon: "circle-check" },
};

/**
 * Notice — inline callout / alert (e.g. "이미 신청하신 분입니다"). Warm-palette
 * tones only; the accent/success tones sit on a marigold wash with an orange
 * icon rather than a coloured left-border. Optional title, action and close.
 */
export function Notice({ tone = "info", title, children, icon, action, onClose, style, ...rest }) {
  const t = TONES[tone] || TONES.info;
  const iconName = icon || t.defaultIcon;
  return (
    <div
      role="status"
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        padding: "16px 18px",
        background: t.bg,
        border: t.border,
        borderRadius: "var(--radius-2xl)",
        ...style,
      }}
      {...rest}
    >
      {iconName ? (
        <span style={{ color: t.iconColor, display: "inline-flex", marginTop: 1 }}>
          <Icon name={iconName} size={20} />
        </span>
      ) : null}
      <div style={{ flex: "1 1 auto", minWidth: 0, display: "flex", flexDirection: "column", gap: 4 }}>
        {title ? (
          <strong style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-body)", fontWeight: 600, letterSpacing: "0.015em", color: "var(--text-primary)" }}>
            {title}
          </strong>
        ) : null}
        {children ? (
          <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-caption)", lineHeight: 1.5, letterSpacing: "0.015em", color: "var(--text-secondary)" }}>
            {children}
          </div>
        ) : null}
        {action ? <div style={{ marginTop: 8 }}>{action}</div> : null}
      </div>
      {onClose ? (
        <button
          onClick={onClose}
          aria-label="닫기"
          style={{ background: "none", border: "none", padding: 2, cursor: "pointer", color: "var(--text-tertiary)", display: "inline-flex", flex: "0 0 auto" }}
        >
          <Icon name="x" size={18} />
        </button>
      ) : null}
    </div>
  );
}
