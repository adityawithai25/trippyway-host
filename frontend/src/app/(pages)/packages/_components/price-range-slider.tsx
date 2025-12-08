"use client";

import * as React from "react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface PriceRangeSliderProps {
  minPrice: number;
  maxPrice: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  className?: string;
  currency?: string;
}

export function PriceRangeSlider({
  minPrice = 0,
  maxPrice = 50000,
  value,
  onChange,
  className,
  currency = "₹",
}: PriceRangeSliderProps) {
  const formatPrice = (price: number) => {
    if (price >= 100000) return `${currency}${(price / 100000).toFixed(1)}L`;
    if (price >= 1000) return `${currency}${(price / 1000).toFixed(0)}k`;
    return `${currency}${price}`;
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Price Range Display */}
      <div className="flex items-center justify-between text-sm font-semibold">
        <span className="text-gray-700">{formatPrice(value[0])}</span>
        <span className="text-gray-400">—</span>
        <span className="text-gray-700">{formatPrice(value[1])}</span>
      </div>

      {/* Slider */}
      <Slider
        min={minPrice}
        max={maxPrice}
        step={1000}
        value={value}
        onValueChange={(val) => onChange(val as [number, number])}
        className="py-4"
      />

      {/* Min/Max Labels */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>{formatPrice(minPrice)}</span>
        <span>{formatPrice(maxPrice)}</span>
      </div>
    </div>
  );
}

// Compact version with preset buttons
interface CompactPriceRangeProps {
  value: [number, number];
  onChange: (value: [number, number]) => void;
  presets?: PricePreset[];
}

interface PricePreset {
  label: string;
  value: [number, number];
}

const DEFAULT_PRESETS: PricePreset[] = [
  { label: "Budget", value: [0, 10000] },
  { label: "Mid-Range", value: [10000, 25000] },
  { label: "Premium", value: [25000, 50000] },
  { label: "Luxury", value: [50000, 100000] },
];

export function CompactPriceRange({
  value,
  onChange,
  presets = DEFAULT_PRESETS,
}: CompactPriceRangeProps) {
  const isPresetSelected = (preset: PricePreset) => {
    return value[0] === preset.value[0] && value[1] === preset.value[1];
  };

  const formatPrice = (price: number) => {
    if (price >= 100000) return `₹${(price / 100000).toFixed(1)}L`;
    if (price >= 1000) return `₹${(price / 1000).toFixed(0)}k`;
    return `₹${price}`;
  };

  return (
    <div className="space-y-3">
      {/* Preset Buttons */}
      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => {
          const selected = isPresetSelected(preset);
          return (
            <button
              key={preset.label}
              onClick={() => onChange(preset.value)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-all border-2",
                selected
                  ? "bg-primary text-white border-primary shadow-md"
                  : "bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              )}
            >
              {preset.label}
            </button>
          );
        })}
      </div>

      {/* Current Range Display */}
      {!presets.some((p) => isPresetSelected(p)) && (
        <div className="text-xs text-gray-600 font-medium text-center">
          {formatPrice(value[0])} - {formatPrice(value[1])}
        </div>
      )}
    </div>
  );
}

// Price range with custom inputs
interface PriceRangeWithInputsProps {
  minPrice: number;
  maxPrice: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

export function PriceRangeWithInputs({
  minPrice = 0,
  maxPrice = 100000,
  value,
  onChange,
}: PriceRangeWithInputsProps) {
  const [min, setMin] = React.useState(value[0]);
  const [max, setMax] = React.useState(value[1]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value) || minPrice;
    const clampedMin = Math.max(minPrice, Math.min(val, value[1] - 1000));
    setMin(clampedMin);
    onChange([clampedMin, value[1]]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value) || maxPrice;
    const clampedMax = Math.min(maxPrice, Math.max(val, value[0] + 1000));
    setMax(clampedMax);
    onChange([value[0], clampedMax]);
  };

  return (
    <div className="space-y-4">
      {/* Input Fields */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-gray-600 font-medium mb-1 block">
            Min Price
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
              ₹
            </span>
            <input
              type="number"
              value={min}
              onChange={handleMinChange}
              min={minPrice}
              max={value[1] - 1000}
              className="w-full pl-7 pr-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
        <div>
          <label className="text-xs text-gray-600 font-medium mb-1 block">
            Max Price
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
              ₹
            </span>
            <input
              type="number"
              value={max}
              onChange={handleMaxChange}
              min={value[0] + 1000}
              max={maxPrice}
              className="w-full pl-7 pr-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
      </div>

      {/* Slider */}
      <Slider
        min={minPrice}
        max={maxPrice}
        step={1000}
        value={value}
        onValueChange={(val) => {
          const newValue = val as [number, number];
          setMin(newValue[0]);
          setMax(newValue[1]);
          onChange(newValue);
        }}
        className="py-2"
      />
    </div>
  );
}
