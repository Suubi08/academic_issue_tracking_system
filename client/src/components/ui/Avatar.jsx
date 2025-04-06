"use client"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cn } from "../../utils/utils" // Assuming you have a utility function to combine classes

const Avatar = ({ className, ...props }) => (
  <AvatarPrimitive.Root
    className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
    {...props}
  />
)

const AvatarImage = ({ className, ...props }) => (
  <AvatarPrimitive.Image className={cn("aspect-square h-full w-full", className)} {...props} />
)

const AvatarFallback = ({ className, ...props }) => (
  <AvatarPrimitive.Fallback
    className={cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className)}
    {...props}
  />
)

export { Avatar, AvatarImage, AvatarFallback }

