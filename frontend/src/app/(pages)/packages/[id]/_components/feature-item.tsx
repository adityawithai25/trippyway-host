import React from "react";
import { getFeatureIcon } from "@/constants/package-details";

interface FeatureItemProps {
  feature: string | { title: string; description: string };
  type: "included" | "excluded";
}

export const FeatureItem = ({ feature, type }: FeatureItemProps) => {
  const title = typeof feature === "string" ? feature : feature.title;
  const description = typeof feature === "string" ? null : feature.description;
  
  const iconClasses =
    type === "included"
      ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
      : "bg-rose-100 text-rose-600 border border-rose-200";

  // Get icon component reference
  const IconComponent = getFeatureIcon(title, type);

  return (
    <div className="flex items-start gap-2.5 rounded-xl border border-border/50 bg-card/80 p-3 hover:shadow-sm transition-shadow">
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-xl ${iconClasses} shrink-0`}
      >
        {React.createElement(IconComponent, { className: "h-4 w-4" })}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs md:text-sm font-semibold leading-snug text-foreground mb-0.5">
          {title}
        </p>
        {description && (
          <p className="text-xs text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};
