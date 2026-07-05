import * as React from "react";

export interface StepIndicatorProps extends React.HTMLAttributes<HTMLOListElement> {
  /** Step labels in order. */
  steps: string[];
  /** Zero-based index of the current step. */
  current?: number;
}

/**
 * StepIndicator — numbered progress for the 2-step flow; completed = orange check, current = outlined orange.
 */
export declare function StepIndicator(props: StepIndicatorProps): React.JSX.Element;
