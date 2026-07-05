import React from "react";

/**
 * PreviewCard — white container that frames a product screenshot as floating
 * social proof. 16px radius, warm shadow; optional slight tilt for the hero
 * "floating cards" arrangement.
 */
export function PreviewCard({ children, tilt = 0, padded = false, style, ...rest }) {
  return (
    <div
      style={{
        background: "var(--surface-card)",
        borderRadius: "var(--radius-images)",
        boxShadow: "var(--shadow-lg)",
        overflow: "hidden",
        padding: padded ? 16 : 0,
        transform: tilt ? `rotate(${tilt}deg)` : undefined,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
