import * as React from "react";

export interface PreviewCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Rotation in degrees for the floating "tilted card" hero arrangement. */
  tilt?: number;
  /** Add 16px inner padding around the media. Default false (full-bleed). */
  padded?: boolean;
  children?: React.ReactNode;
}

/**
 * PreviewCard — white, softly-shadowed frame for a product screenshot.
 */
export declare function PreviewCard(props: PreviewCardProps): React.JSX.Element;
