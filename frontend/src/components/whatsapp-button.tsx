"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { getWhatsAppLink, WHATSAPP_BUTTON_TEXT, WHATSAPP_BUTTON_SUBTITLE } from "@/constants/whatsapp";

/**
 * Floating WhatsApp Contact Button
 * Appears on all pages with smooth animations
 * Allows users to directly contact travel experts
 */
export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Show button after a brief delay for smooth entrance
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Auto-collapse after 5 seconds when expanded
  useEffect(() => {
    if (isExpanded) {
      const timer = setTimeout(() => {
        setIsExpanded(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isExpanded]);

  const handleClick = () => {
    window.open(getWhatsAppLink(), "_blank", "noopener,noreferrer");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
        >
          {/* Expanded Info Card */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-2xl p-4 max-w-[280px] border border-gray-100"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-900">TrippyWay</p>
                      <div className="flex items-center gap-1.5">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <p className="text-xs text-gray-500">Online now</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  {WHATSAPP_BUTTON_SUBTITLE}. Get personalized recommendations instantly!
                </p>
                <button
                  onClick={handleClick}
                  className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg py-2.5 px-4 font-medium text-sm hover:from-emerald-600 hover:to-green-700 transition-all duration-200 hover:shadow-lg"
                >
                  Start Chat on WhatsApp
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main WhatsApp Button */}
          <motion.button
            onClick={() => {
              if (!isExpanded) {
                setIsExpanded(true);
              } else {
                handleClick();
              }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-full shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 overflow-hidden"
            aria-label={WHATSAPP_BUTTON_TEXT}
          >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Content */}
            <div className="relative flex items-center gap-3 px-5 py-4">
              {/* Icon with pulse animation */}
              <div className="relative">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                  className="absolute inset-0 bg-white/30 rounded-full blur-md"
                />
                <MessageCircle className="w-6 h-6 relative z-10" />
              </div>

              {/* Text - Hidden on mobile */}
              <div className="hidden sm:block text-left">
                <p className="font-semibold text-sm leading-tight">
                  {WHATSAPP_BUTTON_TEXT}
                </p>
                <p className="text-xs text-white/90">
                  {WHATSAPP_BUTTON_SUBTITLE}
                </p>
              </div>
            </div>

            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: ["-100%", "200%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            />
          </motion.button>

          {/* Notification Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5, type: "spring" }}
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg"
          >
            1
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
