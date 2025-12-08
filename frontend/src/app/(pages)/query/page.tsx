import { redirect } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { buildWhatsAppEnquiryUrl, getWhatsAppNumber } from "@/lib/whatsapp";

async function QueryRedirect({
  searchParams,
}: {
  searchParams: Promise<{
    destination?: string;
    startDate?: string;
    endDate?: string;
    budget?: string;
    peopleCount?: string;
  }>;
}) {
  const params = await searchParams;
  const whatsappUrl = buildWhatsAppEnquiryUrl(params);
  redirect(whatsappUrl);
  return null;
}

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{
    destination?: string;
    startDate?: string;
    endDate?: string;
    budget?: string;
    peopleCount?: string;
  }>;
}) {
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${getWhatsAppNumber()}&text=`;

  return (
    <Suspense
      fallback={
        <div className="max-w-6xl mx-auto pt-24 min-h-[60vh] flex flex-col items-center justify-center gap-6">
          <p>Preparing your WhatsApp message...</p>
        </div>
      }
    >
      <QueryRedirect searchParams={searchParams} />
      <div className="max-w-6xl mx-auto pt-24 min-h-[60vh] flex flex-col items-center justify-center gap-6">
        <p>
          If you were not redirected automatically, use the button below to open
          WhatsApp with your trip details.
        </p>

        <Button asChild>
          <Link
            href={whatsappUrl}
            className="bg-primary text-white px-4 py-2 rounded-md"
          >
            Send Enquiry
          </Link>
        </Button>
      </div>
    </Suspense>
  );
}
