

import React from "react";
import { cn } from "../../utils/utils";

const Label = ({ className, ...props }) => (
  <label className={cn("text-sm font-medium", className)} {...props} />
);

export default Label;
