/**
 * Build WhatsApp URL for trip enquiry
 * @param params - Trip enquiry parameters
 * @returns WhatsApp URL string
 */
export function buildWhatsAppEnquiryUrl(params: {
  destination?: string;
  startDate?: string;
  endDate?: string;
  budget?: string;
  peopleCount?: string;
}): string {
  const {
    destination = "",
    startDate = "",
    endDate = "",
    budget = "",
    peopleCount = "",
  } = params;

  const rawMessage = `
    Hey i want to book a trip to ${destination} from ${startDate} to ${endDate} for ${peopleCount} people.

    Details below:

  - Destination: ${destination}
  - Start Date: ${startDate}
  - End Date: ${endDate}
  - Budget: ${budget}
  - People: ${peopleCount}
    `.trim();

  const encodedMessage = encodeURIComponent(rawMessage);
  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+919876543210";

  return `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;
}

/**
 * Get WhatsApp number from environment variable
 * @returns WhatsApp number string
 */
export function getWhatsAppNumber(): string {
  return process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+919876543210";
}


