import React from "react";
import { Icon } from "../media/Icon.jsx";

const SIZES = {
  sm: { fontSize: "var(--text-caption)", padding: "8px 16px", gap: 6, icon: 16, minH: 36 },
  md: { fontSize: "var(--text-body)", padding: "12px 24px", gap: 8, icon: 18, minH: 44 },
  lg: { fontSize: "17px", padding: "15px 30px", gap: 8, icon: 20, minH: 52 },
};

function variantStyle(variant, { hover, active, disabled }) {
  if (variant === "secondary") {
    return {
      background: active ? "var(--surface-page)" : "var(--surface-card)",
      color: "var(--text-primary)",
      border: `1px solid ${hover ? "var(--text-primary)" : "var(--border-input)"}`,
      boxShadow: disabled ? "none" : "var(--shadow-sm)",
    };
  }
  if (variant === "ghost") {
    return {
      background: hover ? "rgba(250, 93, 0, 0.08)" : "transparent",
      color: active ? "var(--accent-active)" : "var(--accent)",
      border: "1px solid transparent",
      boxShadow: "none",
    };
  }
  // primary
  return {
    background: active ? "var(--accent-active)" : hover ? "var(--accent-hover)" : "var(--accent)",
    color: "var(--text-on-accent)",
    border: "1px solid transparent",
    boxShadow: disabled ? "none" : "var(--shadow-sm)",
  };
}

/**
 * Button — the system's primary interactive element. `primary` is the single
 * orange CTA; `secondary` is a bordered white button; `ghost` is a low-emphasis
 * text-weight action.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled = false,
  type = "button",
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const s = SIZES[size] || SIZES.md;
  const v = variantStyle(variant, { hover: hover && !disabled, active: active && !disabled, disabled });

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      style={{
        display: fullWidth ? "flex" : "inline-flex",
        width: fullWidth ? "100%" : undefined,
        alignItems: "center",
        justifyContent: "center",
        gap: s.gap,
        minHeight: s.minH,
        padding: s.padding,
        fontFamily: "var(--font-sans)",
        fontSize: s.fontSize,
        fontWeight: variant === "ghost" ? 500 : 600,
        letterSpacing: "0.015em",
        lineHeight: 1,
        borderRadius: "var(--radius-buttons)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.55 : 1,
        transition: "background 140ms ease, border-color 140ms ease, box-shadow 140ms ease",
        outline: "none",
        WebkitTapHighlightColor: "transparent",
        ...v,
        ...style,
      }}
      {...rest}
    >
      {leftIcon ? <Icon name={leftIcon} size={s.icon} /> : null}
      {children != null ? <span>{children}</span> : null}
      {rightIcon ? <Icon name={rightIcon} size={s.icon} /> : null}
    </button>
  );
}
