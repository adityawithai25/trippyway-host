"use client";

import { useState } from "react";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ChevronDown, ChevronUp } from "lucide-react";
import { getActivityIcon } from "@/constants/package-details";

interface Activity {
  time: string;
  title: string;
  description: string;
  icon: string;
  highlight?: boolean;
}

interface Day {
  day: string;
  title: string;
  activities: Activity[];
}

interface ItinerarySectionProps {
  itinerary: Day[];
}

export function ItinerarySection({ itinerary }: ItinerarySectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayedDays = isExpanded ? itinerary : itinerary.slice(0, 1);

  return (
    <Card className="shadow-sm border border-border/50 hover:shadow-md transition-shadow py-4">
      <CardContent className="">
        <h2 className="text-xl font-semibold mb-4 text-emerald-800">
          Detailed Itinerary
        </h2>
        <div className="space-y-5">
          {displayedDays.map((day, dayIdx) => (
            <div key={dayIdx}>
              <div className="mb-3">
                <Badge
                  variant="secondary"
                  className="text-xs mb-1.5 bg-emerald-100 text-emerald-800"
                >
                  {day.day}
                </Badge>
                <h3 className="text-lg font-semibold">{day.title}</h3>
              </div>
              <div className="relative pl-6 md:pl-8 space-y-4">
                <div className="absolute left-[11px] top-0 bottom-0 w-0.5 bg-border" />

                {day.activities.map((activity, actIdx) => {
                  const ActivityIcon = getActivityIcon(activity.icon);
                  return (
                    <div key={actIdx} className="relative">
                      <div
                        className={`absolute left-[-24px] md:left-[-32px] w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center ${
                          activity.highlight
                            ? "bg-emerald-600 text-white shadow-md"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {React.createElement(ActivityIcon, { className: "w-3 h-3" })}
                      </div>

                      <div
                        className={`p-3 rounded-lg border transition-all ${
                          activity.highlight
                            ? "border-emerald-300 bg-emerald-50/50 hover:bg-emerald-50"
                            : "border-border/50 bg-card hover:bg-muted/30"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm font-medium text-muted-foreground">
                                {activity.time}
                              </span>
                              {activity.highlight && (
                                <Badge variant="default" className="text-xs">
                                  Highlight
                                </Badge>
                              )}
                            </div>
                            <h4 className="font-semibold">{activity.title}</h4>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {activity.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        {itinerary.length > 1 && (
          <div className="mt-6 flex justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 border-emerald-200"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-1" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-1" />
                  View Full Itinerary
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

