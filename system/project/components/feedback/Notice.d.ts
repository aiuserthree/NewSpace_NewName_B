import * as React from "react";
import type { IconName } from "../media/Icon";

export interface NoticeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** info = neutral card · accent = marigold wash + orange icon · success = wash + check. */
  tone?: "info" | "accent" | "success";
  title?: React.ReactNode;
  /** Override the tone's default icon. */
  icon?: IconName;
  /** Optional action node (e.g. a Button) below the body. */
  action?: React.ReactNode;
  /** Show a close (×) button. */
  onClose?: () => void;
  children?: React.ReactNode;
}

/**
 * Notice — inline callout / alert for duplicate-submission, completion, and info messages.
 */
export declare function Notice(props: NoticeProps): React.JSX.Element;
