"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Mail,
  Phone,
  MapPin,
  Upload,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { submitPartnerApplication } from "@/actions/partner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const partnerApplicationSchema = z.object({
  businessName: z
    .string()
    .min(2, "Business name must be at least 2 characters")
    .max(100, "Business name must be less than 100 characters"),
  businessType: z
    .string()
    .min(1, "Please select a business type")
    .refine(
      (val) =>
        [
          "hotel",
          "homestay",
          "resort",
          "tour-operator",
          "activity-provider",
          "travel-agent",
        ].includes(val),
      {
        message: "Please select a valid business type",
      }
    ),
  contactPerson: z
    .string()
    .min(2, "Contact person name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[\d\s\+\-\(\)]+$/, "Please enter a valid phone number"),
  location: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address must be less than 200 characters"),
  city: z
    .string()
    .min(2, "City name must be at least 2 characters")
    .max(50, "City name must be less than 50 characters"),
  state: z
    .string()
    .min(2, "State name must be at least 2 characters")
    .max(50, "State name must be less than 50 characters"),
  description: z
    .string()
    .min(50, "Description must be at least 50 characters")
    .max(1000, "Description must be less than 1000 characters"),
  experience: z
    .string()
    .min(1, "Please enter years of experience")
    .regex(/^\d+$/, "Please enter a valid number"),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

type PartnerApplicationFormData = z.infer<typeof partnerApplicationSchema>;

function SubmitConfirmation({ email }: { email: string }) {
  const router = useRouter();
  return (
    <div className="space-y-6 text-center py-8">
      <div className="w-20 h-20 rounded-full bg-purple-100 border-4 border-purple-200 flex items-center justify-center mx-auto">
        <CheckCircle2 className="w-10 h-10 text-purple-700" />
      </div>
      <div>
        <h2 className="text-3xl font-black mb-4 text-purple-900">
          Application Submitted!
        </h2>
        <p className="text-lg text-muted-foreground mb-6">
          Thank you for applying to become a TrippyWay partner. Our team will
          review your application and get back to you within 2-3 business days.
        </p>
        <p className="text-sm text-muted-foreground mb-6">
          Check your email{" "}
          <span className="font-semibold text-foreground">{email}</span> for
          confirmation.
        </p>
        <Button
          onClick={() => router.push("/")}
          className="bg-purple-800 hover:bg-purple-900"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
}

export default function PartnerApplicationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const form = useForm<PartnerApplicationFormData>({
    resolver: zodResolver(partnerApplicationSchema),
    mode: "onChange",
    defaultValues: {
      businessName: "",
      businessType: undefined,
      contactPerson: "",
      email: "",
      phone: "",
      location: "",
      city: "",
      state: "",
      description: "",
      experience: "",
      agreeToTerms: false,
    },
  });

  async function onSubmit(data: PartnerApplicationFormData) {
    setError(null);

    const formData = new FormData();
    formData.append("businessName", data.businessName);
    formData.append("businessType", data.businessType);
    formData.append("contactPerson", data.contactPerson);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("location", data.location);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("description", data.description);
    formData.append("experience", data.experience);

    const result = await submitPartnerApplication(formData);

    if (result.success) {
      setSubmittedEmail(data.email);
      setSubmitted(true);
    } else {
      setError(result.error);
    }
  }

  if (submitted) {
    return <SubmitConfirmation email={submittedEmail} />;
  }

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {error && (
          <div className="p-4 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-md border border-red-200 dark:border-red-800 mb-6">
            {error}
          </div>
        )}

        {/* Business Information */}
        <div className="space-y-5">
          <h3 className="text-xl font-bold flex items-center gap-2 mb-4 text-purple-900">
            <div className="w-1.5 h-6 bg-purple-600 rounded-full" />
            Business Information
          </h3>

          <div className="grid md:grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="businessName"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium">
                    Business Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your Hotel/Business Name"
                      disabled={isSubmitting}
                      className="h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="businessType"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium">
                    Business Type <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger className="h-11! w-full">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-60 overflow-y-auto z-100">
                      <SelectItem value="hotel">Hotel</SelectItem>
                      <SelectItem value="homestay">Homestay</SelectItem>
                      <SelectItem value="resort">Resort</SelectItem>
                      <SelectItem value="tour-operator">
                        Tour Operator
                      </SelectItem>
                      <SelectItem value="activity-provider">
                        Activity Provider
                      </SelectItem>
                      <SelectItem value="travel-agent">Travel Agent</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium">
                  Business Description <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about your business, what makes you unique, and why travelers should choose you..."
                    rows={4}
                    disabled={isSubmitting}
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-xs text-muted-foreground">
                  Minimum 50 characters. Describe your business and what makes
                  it special.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Contact Information */}
        <div className="space-y-5">
          <h3 className="text-xl font-bold flex items-center gap-2 mb-4 text-purple-900">
            <div className="w-1.5 h-6 bg-purple-600 rounded-full" />
            Contact Information
          </h3>

          <div className="grid md:grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="contactPerson"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium">
                    Contact Person <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Full Name"
                      disabled={isSubmitting}
                      className="h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium">
                    Email Address <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
                      <Input
                        type="email"
                        placeholder="contact@yourbusiness.com"
                        className="pl-10 h-11"
                        disabled={isSubmitting}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium">
                    Phone Number <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
                      <Input
                        type="tel"
                        placeholder="+91 98765 43210"
                        className="pl-10 h-11"
                        disabled={isSubmitting}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium">
                    Years in Business <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="e.g., 5"
                      disabled={isSubmitting}
                      className="h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-muted-foreground">
                    Enter number of years you&apos;ve been in business
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Location Information */}
        <div className="space-y-5">
          <h3 className="text-xl font-bold flex items-center gap-2 mb-4 text-purple-900">
            <div className="w-1.5 h-6 bg-purple-600 rounded-full" />
            Location
          </h3>

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium">
                  Full Address <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
                    <Input
                      placeholder="Street address, landmark"
                      className="pl-10 h-11"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid md:grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium">
                    City <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Manali, Goa"
                      disabled={isSubmitting}
                      className="h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium">
                    State <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Himachal Pradesh"
                      disabled={isSubmitting}
                      className="h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Terms */}
        <FormField
          control={form.control}
          name="agreeToTerms"
          render={({ field }) => (
            <FormItem>
              <div className="block p-4 rounded-lg bg-muted/30 border border-border/50">
                <div className="flex items-start gap-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isSubmitting}
                      className="mt-0.5"
                    />
                  </FormControl>
                  <div className="flex-1 pt-0">
                    <FormLabel className="text-sm leading-relaxed cursor-pointer font-normal block">
                      I agree to TrippyWay&apos;s{" "}
                      <a
                        href="/terms-condition"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary font-semibold hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Terms & Conditions
                      </a>{" "}
                      and{" "}
                      <a
                        href="/terms-condition"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary font-semibold hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Partner Agreement
                      </a>
                      . I confirm that all information provided is accurate and
                      I have the authority to represent this business.
                    </FormLabel>
                  </div>
                </div>
              </div>
              <FormMessage className="mt-2" />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            size="lg"
            className="w-full bg-purple-800 hover:bg-purple-900 text-white font-semibold text-base h-12 shadow-lg hover:shadow-xl active:scale-[0.98] transition-all duration-[250ms]"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5 mr-2" />
                Submit Application
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
