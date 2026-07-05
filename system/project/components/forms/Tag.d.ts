import * as React from "react";
import type { IconName } from "../media/Icon";

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Colour tone. accent/solid carry the orange; the rest are warm neutrals. */
  tone?: "neutral" | "accent" | "solid" | "wash" | "outline";
  size?: "sm" | "md";
  /** Optional leading icon. */
  icon?: IconName;
  children?: React.ReactNode;
}

/**
 * Tag — pill label (999px). "필수" = accent, "선택" = neutral, plus solid/wash/outline tones.
 */
export declare function Tag(props: TagProps): React.JSX.Element;
