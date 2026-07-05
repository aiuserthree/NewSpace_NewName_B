import React from "react";
import { Button } from "../actions/Button.jsx";

/**
 * FeatureSplit — alternating two-column block: heading + body (+ optional CTA)
 * on one side, media (screenshot / illustration / image slot) on the other.
 * Set `reverse` to flip sides for section-to-section rhythm.
 */
export function FeatureSplit({
  eyebrow,
  title,
  body,
  ctaLabel,
  onCta,
  reverse = false,
  media,
  gap = 48,
  style,
  children,
  ...rest
}) {
  const text = (
    <div style={{ flex: "1 1 0", minWidth: 0, display: "flex", flexDirection: "column", gap: 18, justifyContent: "center" }}>
      {eyebrow ? (
        <span style={{ fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--accent)" }}>
          {eyebrow}
        </span>
      ) : null}
      {title ? (
        <h2 style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "var(--text-title)", lineHeight: "var(--leading-title)", fontWeight: 500, letterSpacing: "0.4px", color: "var(--text-primary)" }}>
          {title}
        </h2>
      ) : null}
      {body ? (
        <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "17px", lineHeight: 1.6, letterSpacing: "0.015em", color: "var(--text-secondary)" }}>
          {body}
        </p>
      ) : null}
      {ctaLabel ? (
        <div style={{ marginTop: 6 }}>
          <Button variant="primary" rightIcon="arrow-right" onClick={onCta}>{ctaLabel}</Button>
        </div>
      ) : null}
    </div>
  );

  const mediaNode = (
    <div style={{ flex: "1 1 0", minWidth: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {media || children}
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        gap,
        alignItems: "stretch",
        flexDirection: reverse ? "row-reverse" : "row",
        ...style,
      }}
      {...rest}
    >
      {text}
      {mediaNode}
    </div>
  );
}
