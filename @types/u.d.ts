import React from "react";

type UButtonProps = {
  append?: boolean;
  block?: boolean;
  children?: React.ReactNode;
  color: string;
  disabled?: boolean;
  icon?: string;
  onClick?: () => void;
  prepend?: boolean;
  style?: string;
  submit?: string | boolean;
  type: string;
}

export interface UModalParams {
  actions: React.ReactElement[]
  children: React.ReactNode;
  open: boolean;

}
