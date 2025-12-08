"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useRef } from "react";
import { Star, Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitReview } from "@/actions/reviews";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ReviewFormProps {
  tripId: string;
  isAuthenticated: boolean;
}

const authenticatedSchema = z.object({
  stars: z.number().min(1, "Please select a rating").max(5),
  review_comment: z
    .string()
    .min(10, "Review must be at least 10 characters")
    .max(1000, "Review must be less than 1000 characters"),
  images: z
    .array(z.instanceof(File))
    .max(5, "Maximum 5 images allowed")
    .optional(),
});

const unauthenticatedSchema = authenticatedSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
});

const createReviewSchema = (isAuthenticated: boolean) => {
  return isAuthenticated ? authenticatedSchema : unauthenticatedSchema;
};

type AuthenticatedFormValues = z.infer<typeof authenticatedSchema>;
type UnauthenticatedFormValues = z.infer<typeof unauthenticatedSchema>;
type ReviewFormValues = AuthenticatedFormValues | UnauthenticatedFormValues;

export function ReviewForm({ tripId, isAuthenticated }: ReviewFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const schema = createReviewSchema(isAuthenticated);
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      stars: 0,
      review_comment: "",
      images: [],
      ...(isAuthenticated ? {} : { name: "" }),
    },
  });

  const selectedStars = form.watch("stars");
  const selectedImages = form.watch("images") || [];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Limit to 5 images total
    const currentImages = form.getValues("images") || [];
    const totalImages = currentImages.length + files.length;
    if (totalImages > 5) {
      setError("Maximum 5 images allowed");
      return;
    }

    // Validate file types and sizes
    const validFiles: File[] = [];
    const previews: string[] = [];

    files.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        setError("Only image files are allowed");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setError("Image size must be less than 5MB");
        return;
      }
      validFiles.push(file);
      previews.push(URL.createObjectURL(file));
    });

    if (validFiles.length > 0) {
      form.setValue("images", [...currentImages, ...validFiles]);
      setPreviewImages([...previewImages, ...previews]);
      setError(null);
    }
  };

  const removeImage = (index: number) => {
    const currentImages = form.getValues("images") || [];
    const newImages = currentImages.filter((_, i) => i !== index);
    form.setValue("images", newImages);

    // Remove preview
    const newPreviews = [...previewImages];
    URL.revokeObjectURL(newPreviews[index]);
    newPreviews.splice(index, 1);
    setPreviewImages(newPreviews);
  };

  const onSubmit = async (data: ReviewFormValues) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append("trip_id", tripId);
      formData.append("stars", data.stars.toString());
      formData.append("review_comment", data.review_comment);

      if (!isAuthenticated && "name" in data) {
        const nameValue = (data as { name?: string }).name;
        if (nameValue) {
          formData.append("name", nameValue);
        }
      }

      // Append images
      if (data.images && data.images.length > 0) {
        data.images.forEach((image) => {
          formData.append("images", image);
        });
      }

      const result = await submitReview(formData);

      if (result.success) {
        setSuccess(true);
        form.reset();
        setPreviewImages([]);
        router.refresh();
        // Reset form after 2 seconds
        setTimeout(() => {
          setSuccess(false);
        }, 2000);
      } else {
        setError(result.error || "Failed to submit review");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Name field (only for unauthenticated users) */}
          {!isAuthenticated && (
            <FormField
              control={form.control as any}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your name"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Star Rating */}
          <FormField
            control={form.control}
            name="stars"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => field.onChange(star)}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`w-6 h-6 transition-colors ${
                            star <= selectedStars
                              ? "text-emerald-600 fill-emerald-600"
                              : "text-gray-300 fill-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Review Comment */}
          <FormField
            control={form.control}
            name="review_comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Review</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Share your experience..."
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image Upload */}
          <FormField
            control={form.control}
            name="images"
            render={() => (
              <FormItem>
                <FormLabel>Images (Optional, max 5)</FormLabel>
                <FormControl>
                  <div className="space-y-4">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full"
                    >
                      <Upload className="w-4 h-4" />
                      Upload Images
                    </Button>

                    {/* Image Previews */}
                    {previewImages.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {previewImages.map((preview, index) => (
                          <div
                            key={index}
                            className="relative group aspect-square rounded-lg overflow-hidden border border-border"
                          >
                            <Image
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-2 right-2 bg-destructive text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Error Message */}
          {error && (
            <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="text-sm text-emerald-600 bg-emerald-50 p-3 rounded-md">
              Review submitted successfully!
            </div>
          )}

          {/* Submit Button */}
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Review"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
