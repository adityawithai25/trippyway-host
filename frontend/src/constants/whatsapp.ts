/**
 * WhatsApp Contact Configuration
 * Reads WhatsApp business number from environment variables
 * Add NEXT_PUBLIC_WHATSAPP_NUMBER to your .env file
 */

// WhatsApp Business Number (with country code, no + or spaces)
// Example: For +91 9876543210, use "919876543210"
// Reads from environment variable: NEXT_PUBLIC_WHATSAPP_NUMBER
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919250294508";

// Default greeting message when WhatsApp opens
export const WHATSAPP_DEFAULT_MESSAGE = "Hello! I'd like to get expert advice for my travel plans.";

// Button text
export const WHATSAPP_BUTTON_TEXT = "Get Expert Travel Plan";
export const WHATSAPP_BUTTON_SUBTITLE = "Talk to our travel experts";

/**
 * Generates WhatsApp link with pre-filled message
 * @param message - Custom message (optional, uses default if not provided)
 * @returns WhatsApp web link
 */
export function getWhatsAppLink(message?: string): string {
  const msg = encodeURIComponent(message || WHATSAPP_DEFAULT_MESSAGE);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}
