import React from "react";
import { cn } from "../../utils/utils";

const Select = ({ className, children, ...props }) => (
  <select className={cn("rounded-md border px-3 py-2 text-sm", className)} {...props}>
    {children}
  </select>
);

const SelectGroup = ({ children }) => (
  <optgroup>{children}</optgroup>
);

const SelectValue = ({ children }) => (
  <option>{children}</option>
);

const SelectTrigger = ({ children, ...props }) => (
  <div className="flex items-center justify-between">
    {children}
  </div>
);

const SelectScrollUpButton = () => (
  <button className="p-1">↑</button>
);

const SelectScrollDownButton = () => (
  <button className="p-1">↓</button>
);

const SelectContent = ({ children }) => (
  <div className="relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md">
    {children}
  </div>
);

const SelectLabel = ({ children, className }) => (
  <label className={cn("text-sm font-semibold", className)}>{children}</label>
);

const SelectItem = ({ children, ...props }) => (
  <option className="cursor-pointer text-sm" {...props}>
    {children}
  </option>
);

const SelectSeparator = () => (
  <div className="my-1 h-px bg-muted" />
);

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
