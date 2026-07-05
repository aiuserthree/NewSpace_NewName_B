import React from "react";

/**
 * HeroWash — the decorative flowing warm gradient behind hero content. A soft
 * wash of orange / marigold / peach as blurred organic blobs, low opacity, so it
 * suggests warmth and motion without ever competing with text. Absolutely
 * positioned; place it inside a `position: relative` hero with content above it.
 */
export function HeroWash({ intensity = 1, style, ...rest }) {
  const a = Math.max(0, Math.min(1, intensity));
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          position: "absolute",
          top: "-15%",
          left: "50%",
          width: "min(1100px, 120%)",
          height: "120%",
          transform: "translateX(-50%)",
          background:
            "radial-gradient(42% 55% at 32% 38%, rgba(250, 93, 0, " + 0.28 * a + ") 0%, rgba(250,93,0,0) 70%)," +
            "radial-gradient(46% 60% at 70% 32%, rgba(254, 227, 181, " + 0.85 * a + ") 0%, rgba(254,227,181,0) 72%)," +
            "radial-gradient(50% 60% at 55% 72%, rgba(255, 173, 122, " + 0.45 * a + ") 0%, rgba(255,173,122,0) 70%)",
          filter: "blur(28px)",
        }}
      />
    </div>
  );
}
