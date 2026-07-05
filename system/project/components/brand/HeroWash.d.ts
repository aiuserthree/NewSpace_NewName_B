import * as React from "react";

export interface HeroWashProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 0–1 opacity multiplier for the wash. Default 1. */
  intensity?: number;
}

/**
 * HeroWash — decorative flowing orange/marigold/peach gradient behind hero content.
 * Absolutely positioned; place inside a relative hero with content stacked above.
 */
export declare function HeroWash(props: HeroWashProps): React.JSX.Element;
