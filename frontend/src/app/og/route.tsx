import { ImageResponse } from "next/og";
import { OgImage } from "@/components/og-image";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Dynamic params
    const title =
      searchParams.get("title") || "TrippyWay - Your Travel Companion";
    const description =
      searchParams.get("description") ||
      "Plan, customise, and book hyper-personalised India trips with local expertise.";

    // Construct logo URL
    const logoUrl = new URL("/logo.png", request.url).toString();

    // Load fonts
    // Inter Bold (700)
    const interBold = await fetch(
      new URL(
        "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZs.woff",
        request.url
      )
    ).then((res) => res.arrayBuffer());

    // Inter Medium (500) or Regular (400) for description/badge
    const interRegular = await fetch(
      new URL(
        "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6YMZs.woff",
        request.url
      )
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
      <OgImage title={title} description={description} logoSrc={logoUrl} />,
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: interBold,
            style: "normal",
            weight: 700,
          },
          {
            name: "Inter",
            data: interRegular,
            style: "normal",
            weight: 400,
          },
        ],
      }
    );
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : "Unknown error";
    console.log(`${errorMessage}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
