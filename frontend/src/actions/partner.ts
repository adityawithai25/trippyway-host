"use server";

import { createClient } from "@/lib/supabase/server";

export type PartnerApplicationResult =
  | { success: true; message?: string }
  | { success: false; error: string };

export async function submitPartnerApplication(
  formData: FormData
): Promise<PartnerApplicationResult> {
  try {
    // Extract form data
    formData.get("businessName");
    formData.get("businessType");
    formData.get("contactPerson");
    formData.get("email");
    formData.get("phone");
    formData.get("location");
    formData.get("city");
    formData.get("state");
    formData.get("description");
    formData.get("experience");

    const data = {
      businessName: formData.get("businessName") as string,
      businessType: formData.get("businessType") as string,
      contactPerson: formData.get("contactPerson") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      location: formData.get("location") as string,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      description: formData.get("description") as string,
      experience: formData.get("experience") as string,
    };

    // Use the data variable
    void data;

    // TODO: Integrate with your backend/database
    // Example: Save to Supabase or your API
    // const supabase = await createClient()
    // const { error } = await supabase.from('partner_applications').insert(data)

    // For now, simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Optional: Send email notification
    // await sendPartnerApplicationEmail(data)

    return {
      success: true,
      message:
        "Application submitted successfully. We will review and get back to you within 2-3 business days.",
    };
  } catch (error) {
    console.error("Partner application error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to submit application. Please try again.",
    };
  }
}

export async function submitHeroForm(
  formData: FormData
): Promise<PartnerApplicationResult> {
  try {
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string | null;

    if (!name || !phone) {
      return {
        success: false,
        error: "Name and phone are required",
      };
    }

    // Validate phone number format
    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    if (!phoneRegex.test(phone) || phone.replace(/\D/g, "").length < 10) {
      return {
        success: false,
        error: "Please enter a valid phone number",
      };
    }

    // Validate email if provided
    if (email && email.trim() !== "") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return {
          success: false,
          error: "Please enter a valid email address",
        };
      }
    }

    const supabase = await createClient();

    // Insert into partner_lead_forms table
    const { error } = await supabase.from("partner_lead_forms").insert({
      name: name.trim(),
      phone: phone.trim(),
      email: email && email.trim() !== "" ? email.trim() : null,
      source: "hero_form",
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return {
        success: false,
        error: "Failed to submit your information. Please try again.",
      };
    }

    return {
      success: true,
      message: "Thank you! We will contact you soon.",
    };
  } catch (error) {
    console.error("Hero form submission error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to submit. Please try again.",
    };
  }
}
