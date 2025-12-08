import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-gray-200/80",
        "relative overflow-hidden",
        "before:absolute before:inset-0",
        "before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent",
        "before:translate-x-[-100%]",
        "before:animate-[shimmer_2s_linear_infinite]",
        className
      )}
      style={{
        backgroundSize: "200% 100%",
      }}
      {...props}
    />
  )
}

export { Skeleton }
