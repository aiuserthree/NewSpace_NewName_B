import React from "react";

/**
 * LogoCircle — round white badge for a third-party app logo (integration row).
 * Logos are literal brand marks — the one place external colour enters the
 * system. Pass an <img>, letter, or Icon as children.
 */
export function LogoCircle({ size = 48, children, label, style, ...rest }) {
  return (
    <div
      title={label}
      aria-label={label}
      style={{
        width: size,
        height: size,
        borderRadius: "var(--radius-full)",
        background: "var(--surface-card)",
        boxShadow: "var(--shadow-sm)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        flex: "0 0 auto",
        fontFamily: "var(--font-sans)",
        fontWeight: 700,
        color: "var(--text-secondary)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
