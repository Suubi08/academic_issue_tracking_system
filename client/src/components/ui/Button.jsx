import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../utils/utils"; // Utility function for combining class names

const Button = ({ className, variant = "default", size = "default", asChild = false, ...props }) => {
  const Comp = asChild ? Slot : "button";

  // Define base styles for the button
  const baseStyles = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  // Define variant styles (default, destructive, outline, etc.)
  const variantStyles = {
    default: "bg-blue-500 text-white hover:bg-blue-400",
    destructive: "bg-red-500 text-white hover:bg-red-400",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-100 hover:text-gray-700",
    secondary: "bg-green-500 text-white hover:bg-green-400",
    ghost: "hover:bg-gray-100 hover:text-gray-700",
    link: "text-blue-500 underline-offset-4 hover:underline",
  };

  // Define size styles (default, sm, lg, etc.)
  const sizeStyles = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  };

  // Combine base styles, variant, size, and any additional custom classes
  const buttonClass = cn(
    baseStyles,
    variantStyles[variant] || variantStyles.default, // Default to "default" if no variant is provided
    sizeStyles[size] || sizeStyles.default, // Default to "default" size if not provided
    className // Allow custom class names to be passed in
  );

  return <Comp className={buttonClass} {...props} />;
};

export { Button };
