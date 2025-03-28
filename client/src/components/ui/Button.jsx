import React from "react";
import { cn } from "../../utils/utils"; // Adjust path if needed

const Button = ({ 
  variant = "default", 
  size = "default", 
  className = "", 
  children, 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors";
  
  const variantStyles = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    destructive: "bg-red-500 text-white hover:bg-red-600",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-100",
  };

  const sizeStyles = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
  };

  return (
    <button 
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
