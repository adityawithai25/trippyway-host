"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { submitHeroForm } from "@/actions/partner";

const heroFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[\d\s\+\-\(\)]+$/, "Please enter a valid phone number"),
  email: z
    .union([
      z.string().email("Please enter a valid email address"),
      z.literal(""),
    ])
    .optional(),
});

type HeroFormData = z.infer<typeof heroFormSchema>;

export function HeroForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset,
  } = useForm<HeroFormData>({
    resolver: zodResolver(heroFormSchema),
    mode: "onChange",
  });

  const name = watch("name");
  const phone = watch("phone");
  const isFormValid =
    isValid && name && phone && name.trim() !== "" && phone.trim() !== "";

  async function onSubmit(data: HeroFormData) {
    setSubmitError(null);
    setSubmitMessage(null);
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("phone", data.phone);
    if (data.email && data.email.trim() !== "") {
      formData.append("email", data.email);
    }

    const result = await submitHeroForm(formData);

    if (result.success) {
      setSubmitMessage(
        result.message || "Thank you! We will contact you soon."
      );
      reset();
    } else {
      setSubmitError(result.error);
    }

    setIsSubmitting(false);
  }

  return (
    <div className="lg:sticky lg:top-20 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
      <div className="bg-white/80 backdrop-blur-md rounded-xl border border-blue-200 shadow-xl p-4 md:p-5 max-w-sm mx-auto lg:max-w-none">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-1 font-paytone-one">
          Get Started Today
        </h2>
        <p className="text-xs text-slate-600 mb-4">
          Fill in your details and we'll get back to you
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-xs font-medium">
              Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              disabled={isSubmitting}
              {...register("name")}
              aria-invalid={errors.name ? "true" : "false"}
              className={`h-9 text-sm ${errors.name ? "border-red-500" : ""}`}
            />
            {errors.name && (
              <p className="text-xs text-red-600 mt-0.5">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="phone" className="text-xs font-medium">
              Phone <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+91 98765 43210"
              disabled={isSubmitting}
              {...register("phone")}
              aria-invalid={errors.phone ? "true" : "false"}
              className={`h-9 text-sm ${errors.phone ? "border-red-500" : ""}`}
            />
            {errors.phone && (
              <p className="text-xs text-red-600 mt-0.5">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs font-medium">
              Email <span className="text-gray-400 text-xs">(optional)</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              disabled={isSubmitting}
              {...register("email")}
              aria-invalid={errors.email ? "true" : "false"}
              className={`h-9 text-sm ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && (
              <p className="text-xs text-red-600 mt-0.5">
                {errors.email.message}
              </p>
            )}
          </div>

          {submitMessage && (
            <div className="p-2 bg-green-50 border border-green-200 rounded-lg text-xs text-green-800">
              {submitMessage}
            </div>
          )}

          {submitError && (
            <div className="p-2 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800">
              {submitError}
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting || !isFormValid}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm py-2 h-9 rounded-lg transition-all duration-[250ms] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>

          <Button
            type="button"
            variant="outline"
            asChild
            className="w-full bg-transparent border-purple-600 text-purple-600 hover:bg-purple-50 font-medium text-sm py-2 h-9 rounded-lg transition-all duration-[250ms]"
          >
            <Link href="/30-min">Want to Discuss</Link>
          </Button>
        </form>
      </div>
    </div>
  );
}
