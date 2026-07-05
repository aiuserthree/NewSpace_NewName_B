import React from "react";
import { Icon } from "../media/Icon.jsx";
import { TextLink } from "../actions/TextLink.jsx";

/**
 * FeatureCard — three-up highlight card: dark 48px icon, heading, body, optional
 * orange link. Depth comes from a warm-glow shadow, not from contrast.
 */
export function FeatureCard({
  icon,
  title,
  body,
  linkText,
  href = "#",
  surface = "card",
  elevated = true,
  style,
  children,
  ...rest
}) {
  const bg = surface === "canvas" ? "var(--surface-page)" : "var(--surface-card)";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        background: bg,
        borderRadius: "var(--radius-cards)",
        padding: "40px 32px",
        boxShadow: elevated ? "var(--shadow-card)" : "none",
        ...style,
      }}
      {...rest}
    >
      {icon ? (
        <span style={{ color: "var(--text-primary)", display: "inline-flex" }}>
          {typeof icon === "string" ? <Icon name={icon} size={44} strokeWidth={1.75} /> : icon}
        </span>
      ) : null}
      {title ? (
        <h3
          style={{
            margin: 0,
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-heading-sm)",
            fontWeight: 600,
            letterSpacing: "0.3px",
            color: "var(--text-primary)",
          }}
        >
          {title}
        </h3>
      ) : null}
      {body ? (
        <p
          style={{
            margin: 0,
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-body)",
            lineHeight: 1.55,
            letterSpacing: "0.015em",
            color: "var(--text-secondary)",
          }}
        >
          {body}
        </p>
      ) : null}
      {children}
      {linkText ? (
        <div style={{ marginTop: 4 }}>
          <TextLink href={href}>{linkText}</TextLink>
        </div>
      ) : null}
    </div>
  );
}
