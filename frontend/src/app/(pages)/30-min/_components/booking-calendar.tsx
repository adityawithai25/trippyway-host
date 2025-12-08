"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

interface BookingCalendarProps {
  calLink?: string;
}

export default function BookingCalendar({
  calLink = "aditya-dubey-tw/15min", // Updated to use slug format (username/event)
}: BookingCalendarProps) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({});
      cal("ui", {
        styles: { branding: { brandColor: "#065f46" } },
        cssVarsPerTheme: {
          light: {
            "cal-brand": "#065f46",
            "cal-brand-text": "var(--primary-foreground)",
            "cal-text": "var(--foreground)",
            "cal-text-emphasis": "var(--foreground)",
            "cal-border-subtle": "var(--border)",
            "cal-border": "var(--border)",
            "cal-border-emphasis": "var(--ring)",
            "cal-bg": "var(--background)",
            "cal-bg-emphasis": "var(--muted)",
            "cal-bg-subtle": "var(--card)",
          },
          dark: {
            "cal-brand": "#065f46",
            "cal-brand-text": "var(--primary-foreground)",
            "cal-text": "var(--foreground)",
            "cal-text-emphasis": "var(--foreground)",
            "cal-border-subtle": "var(--border)",
            "cal-border": "var(--border)",
            "cal-border-emphasis": "var(--ring)",
            "cal-bg": "var(--background)",
            "cal-bg-emphasis": "var(--muted)",
            "cal-bg-subtle": "var(--card)",
          },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
        theme: "light",
      });
    })();
  }, []);

  return (
    <div className="w-full h-full min-h-[600px] bg-background rounded-lg overflow-hidden">
      <Cal
        calLink={calLink}
        style={{
          width: "100%",
          height: "100%",
          minHeight: "600px",
          margin: "0 auto",
        }}
        config={{ layout: "month_view" }}
      />
    </div>
  );
}
