"use client";

import { Button } from "@/components/ui/button";
import { Heart, Share2 } from "lucide-react";

interface InteractiveButtonsProps {
  isLiked: boolean;
  onLike: () => void;
  onShare: () => void;
}

export function InteractiveButtons({
  isLiked,
  onLike,
  onShare,
}: InteractiveButtonsProps) {
  return (
    <div className="absolute top-6 right-6 flex gap-2 z-10">
      <Button
        variant="secondary"
        size="icon"
        onClick={onLike}
        className="bg-white/90 hover:bg-white backdrop-blur-sm rounded-full w-12 h-12 shadow-lg"
      >
        <Heart
          className={`w-5 h-5 transition-all ${
            isLiked ? "fill-red-500 text-red-500" : "text-foreground"
          }`}
        />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        onClick={onShare}
        className="bg-white/90 hover:bg-white backdrop-blur-sm rounded-full w-12 h-12 shadow-lg"
      >
        <Share2 className="w-5 h-5 text-foreground" />
      </Button>
    </div>
  );
}

