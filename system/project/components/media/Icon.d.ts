import * as React from "react";

export type IconName =
  | "arrow-left" | "arrow-right" | "calendar" | "calendar-check" | "chart-pie"
  | "check" | "check-check" | "chevron-down" | "chevron-right" | "church"
  | "circle-check" | "clock" | "heart" | "info" | "lock" | "map-pin"
  | "pencil" | "phone" | "plus" | "receipt" | "sparkles" | "square-pen"
  | "user" | "users" | "vote" | "x";

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, "name" | "color"> {
  /** Which glyph to render. */
  name: IconName;
  /** Square size in px. Harvest uses 48 for feature icons, 16–24 inline. Default 24. */
  size?: number;
  /** Stroke weight. Default 2 (Lucide standard). */
  strokeWidth?: number;
  /** Stroke color. Defaults to currentColor so it inherits text color. */
  color?: string;
  /** Accessible label; when set the icon is exposed to AT, otherwise aria-hidden. */
  title?: string;
}

/**
 * Icon — a single-color outline glyph from the curated Lucide set.
 * Stroke follows `currentColor` by default.
 */
export declare function Icon(props: IconProps): React.JSX.Element | null;

/** All icon names bundled in this build. */
export declare const ICON_NAMES: IconName[];
