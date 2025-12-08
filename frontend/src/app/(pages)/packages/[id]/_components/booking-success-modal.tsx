"use client";

import { CheckCircle2, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BookingSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  tripTitle: string;
}

export function BookingSuccessModal({
  isOpen,
  onClose,
  tripTitle,
}: BookingSuccessModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-card rounded-3xl shadow-2xl max-w-md w-full p-8 relative border-2 border-primary/20">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-8 h-8 text-yellow-400 fill-yellow-400" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Booking Initiated!</h2>
            <p className="text-muted-foreground mb-6">
              Your booking request for{" "}
              <span className="font-semibold text-primary">{tripTitle}</span>{" "}
              has been initiated. We&apos;re redirecting you to WhatsApp to complete
              your booking.
            </p>

            <div className="flex gap-3">
              <Button onClick={onClose} variant="outline" className="flex-1">
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
