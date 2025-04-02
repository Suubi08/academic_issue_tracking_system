import { cn } from "../../utils/utils"

const badgeVariants = (variant) => {
  const baseClasses =
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"

  const variantClasses = {
    default: "border-transparent bg-blue-500 text-white hover:bg-blue-400",
    secondary: "border-transparent bg-yellow-500 text-black hover:bg-yellow-400",
    destructive: "border-transparent bg-red-500 text-white hover:bg-red-400",
    outline: "border-2 border-gray-500 text-gray-500",
  }

  return `${baseClasses} ${variantClasses[variant] || variantClasses.default}`
}

function Badge({ className, variant = "default", ...props }) {
  return <div className={cn(badgeVariants(variant), className)} {...props} />
}

export { Badge, badgeVariants }

