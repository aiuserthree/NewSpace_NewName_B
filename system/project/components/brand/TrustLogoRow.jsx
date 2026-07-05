import React from "react";

/**
 * TrustLogoRow — grayscale partner-logo strip under a small uppercase label
 * ("TRUSTED BY 70,000+ COMPANIES"). Logos render in ink grayscale at reduced
 * opacity so the orange accent stays the only chromatic focal point. The number
 * in the label may carry orange.
 *
 * No real partner marks ship here, so string entries render as ghosted wordmarks.
 */
export function TrustLogoRow({ label, logos = [], style, ...rest }) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24, ...style }}
      {...rest}
    >
      {label ? (
        <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-caption)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-secondary)" }}>
          {label}
        </span>
      ) : null}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 40, opacity: 0.7 }}>
        {logos.map((l, i) => (
          <span
            key={i}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "-0.01em",
              color: "var(--text-primary)",
              filter: "grayscale(1)",
            }}
          >
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}
