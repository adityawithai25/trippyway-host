"use client";

import * as React from "react";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateRangePickerProps {
  startDate?: Date | null;
  endDate?: Date | null;
  onDateChange: (startDate: Date | null, endDate: Date | null) => void;
  className?: string;
  placeholder?: string;
}

export function DateRangePicker({
  startDate,
  endDate,
  onDateChange,
  className,
  placeholder = "Select travel dates",
}: DateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: startDate || undefined,
    to: endDate || undefined,
  });

  const handleSelect = (range: DateRange | undefined) => {
    setDate(range);
    onDateChange(range?.from || null, range?.to || null);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDate(undefined);
    onDateChange(null, null);
  };

  const hasDate = date?.from || date?.to;

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal border-2 border-gray-200 hover:border-gray-300 rounded-xl h-12 px-4",
              !hasDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
            {date?.from ? (
              date.to ? (
                <span className="truncate">
                  {format(date.from, "LLL dd")} - {format(date.to, "LLL dd, y")}
                </span>
              ) : (
                <span className="truncate">{format(date.from, "LLL dd, y")}</span>
              )
            ) : (
              <span className="truncate">{placeholder}</span>
            )}
            {hasDate && (
              <X
                className="ml-auto h-4 w-4 shrink-0 opacity-50 hover:opacity-100"
                onClick={handleClear}
              />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

// Compact version for mobile
interface CompactDateRangePickerProps {
  startDate?: Date | null;
  endDate?: Date | null;
  onDateChange: (startDate: Date | null, endDate: Date | null) => void;
}

export function CompactDateRangePicker({
  startDate,
  endDate,
  onDateChange,
}: CompactDateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: startDate || undefined,
    to: endDate || undefined,
  });

  const handleSelect = (range: DateRange | undefined) => {
    setDate(range);
    onDateChange(range?.from || null, range?.to || null);
  };

  const hasDate = date?.from || date?.to;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-9 border-2 rounded-lg text-xs",
            !hasDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-1.5 h-3.5 w-3.5" />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "MMM dd")} - {format(date.to, "MMM dd")}
              </>
            ) : (
              format(date.from, "MMM dd, yyyy")
            )
          ) : (
            <span>Dates</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={handleSelect}
          numberOfMonths={1}
          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
        />
      </PopoverContent>
    </Popover>
  );
}
