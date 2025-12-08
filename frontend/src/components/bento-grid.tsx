import { ReactNode } from "react";
import Link, { LinkProps } from "next/link";

import { cn } from "@/lib/utils";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  href?: LinkProps["href"];
  onClick?: () => void;
}

export const BentoCard = ({
  children,
  className,
  href,
  onClick,
}: BentoCardProps) => {
  const Component = href ? Link : ("div" as React.ElementType);
  return (
    <Component
      {...(href && { href })}
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-3xl border bg-card sm:p-6 p-4 text-card-foreground shadow-sm transition-all hover:shadow-md",
        "flex flex-col",
        className
      )}
    >
      {children}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
    </Component>
  );
};

export const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2",
        className
      )}
    >
      {children}
    </div>
  );
};
