import * as React from "react";
import type { IconName } from "../media/Icon";

export interface FeatureCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Icon name or a custom node (rendered at 44px dark). */
  icon?: IconName | React.ReactNode;
  title?: React.ReactNode;
  body?: React.ReactNode;
  /** Orange "learn more" link text; omit for no link. */
  linkText?: string;
  href?: string;
  /** "card" = white surface (default) · "canvas" = cream (depth from shadow only). */
  surface?: "card" | "canvas";
  /** Warm-glow shadow. Default true. */
  elevated?: boolean;
  children?: React.ReactNode;
}

/**
 * FeatureCard — icon + heading + body + optional orange link; warm-glow elevation.
 */
export declare function FeatureCard(props: FeatureCardProps): React.JSX.Element;
