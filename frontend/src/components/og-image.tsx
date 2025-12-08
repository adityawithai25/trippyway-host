export type OgImageProps = {
  title: string;
  description?: string;
  logoSrc?: string;
};

export function OgImage({ title, description }: OgImageProps) {
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        backgroundColor: "white",
        padding: "60px 60px",
        position: "relative",
      }}
    >
      {/* Background Image - 100% opacity */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          zIndex: 0,
          opacity: 0.9,
        }}
      >
        {/* Background Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=1740&auto=format&fit=crop"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          alt="Background"
        />
      </div>

      {/* Content Layer */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          width: "100%",
          zIndex: 10,
        }}
      >
        {/* Top Section: Badge */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 16px",
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "9999px",
              gap: "8px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#10b981", // emerald-500
              }}
            />
            <span
              style={{
                fontSize: 16,
                fontWeight: 400,
                color: "#374151", // gray-700
                letterSpacing: "-0.01em",
              }}
            >
              TrippyWay
            </span>
          </div>
        </div>

        {/* Middle Section: Main Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "48px",
            maxWidth: "900px",
          }}
        >
          <h1
            style={{
              fontSize: 80,
              fontWeight: 700,
              color: "#111827", // gray-900
              lineHeight: 0.95,
              margin: 0,
              letterSpacing: "-0.04em",
              textTransform: "uppercase",
              textShadow:
                "0 4px 30px rgba(255,255,255,0.95), 0 2px 10px rgba(0,0,0,0.3)", // Strong white shadow for contrast
            }}
          >
            {title}
          </h1>

          {description && (
            <p
              style={{
                fontSize: 32,
                color: "#111827", // Darker for better contrast
                lineHeight: 1.4,
                margin: 0,
                fontWeight: 500,
                letterSpacing: "-0.02em",
                textShadow:
                  "0 2px 20px rgba(255,255,255,0.9), 0 1px 5px rgba(0,0,0,0.2)", // Enhanced shadow
              }}
            >
              {description}
            </p>
          )}
        </div>

        {/* Bottom Section: URL/Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: "#111827",
              textShadow:
                "0 2px 15px rgba(255,255,255,0.9), 0 1px 5px rgba(0,0,0,0.2)",
            }}
          >
            trippyway.in
          </span>
        </div>
      </div>
    </div>
  );
}
