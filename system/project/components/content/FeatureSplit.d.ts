import * as React from "react";

export interface FeatureSplitProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title?: React.ReactNode;
  body?: React.ReactNode;
  /** Primary CTA label; omit for no button. */
  ctaLabel?: string;
  onCta?: () => void;
  /** Flip which side the media sits on (alternate per section). */
  reverse?: boolean;
  /** Media node (screenshot, PreviewCard, image-slot). Falls back to children. */
  media?: React.ReactNode;
  gap?: number;
  children?: React.ReactNode;
}

/**
 * FeatureSplit — alternating two-column text + media block.
 */
export declare function FeatureSplit(props: FeatureSplitProps): React.JSX.Element;
