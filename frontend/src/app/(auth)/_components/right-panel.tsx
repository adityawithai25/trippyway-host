import Image from "next/image";
import { cn } from "@/lib/utils";
export default function RightPanel({ className }: { className?: string }) {
  return (
    <div
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1504851149312-7a075b496cc7?q=80&w=810&auto=format&fit=crop')`,
        backgroundSize: "cover",
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
      }}
      className={cn(
        "bg-gray-900 dark:bg-black p-8 md:p-12 flex flex-col justify-between relative overflow-hidden",
        className
      )}
    >
      {/* Background Pattern - Travel Theme */}
      <div className="absolute inset-0 opacity-30">
        <svg
          className="w-full h-full"
          viewBox="0 0 400 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Wavy travel paths */}
          <path
            d="M0 450 Q80 380 160 420 T320 400 T400 420"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-emerald-400"
            fill="none"
          />
          <path
            d="M0 480 Q100 420 200 460 T400 450"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-emerald-400"
            fill="none"
          />
          <path
            d="M0 510 Q120 450 240 490 T400 480"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-emerald-400"
            fill="none"
          />
          <path
            d="M0 540 Q90 480 180 520 T360 500 T400 510"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-emerald-400"
            fill="none"
          />
          {/* Glowing dots */}
          <circle
            cx="60"
            cy="440"
            r="2.5"
            fill="currentColor"
            className="text-emerald-400"
          >
            <animate
              attributeName="opacity"
              values="0.3;1;0.3"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            cx="140"
            cy="400"
            r="2"
            fill="currentColor"
            className="text-emerald-400"
          >
            <animate
              attributeName="opacity"
              values="0.3;1;0.3"
              dur="2.5s"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            cx="220"
            cy="440"
            r="2.5"
            fill="currentColor"
            className="text-emerald-400"
          >
            <animate
              attributeName="opacity"
              values="0.3;1;0.3"
              dur="2.2s"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            cx="300"
            cy="420"
            r="2"
            fill="currentColor"
            className="text-emerald-400"
          >
            <animate
              attributeName="opacity"
              values="0.3;1;0.3"
              dur="2.8s"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            cx="180"
            cy="480"
            r="2"
            fill="currentColor"
            className="text-emerald-400"
          >
            <animate
              attributeName="opacity"
              values="0.3;1;0.3"
              dur="2.3s"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            cx="260"
            cy="470"
            r="2.5"
            fill="currentColor"
            className="text-emerald-400"
          >
            <animate
              attributeName="opacity"
              values="0.3;1;0.3"
              dur="2.6s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-6">
          <Image
            src="/logo.png"
            alt="TrippyWay Logo"
            width={64}
            height={64}
            className="h-10 sm:h-12 w-auto "
          />
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Transform your travel experience has never been{" "}
          <span className="font-extrabold">easier.</span>
        </h2>
      </div>

      <div className="relative z-10 space-y-6">
        <h3 className="text-lg font-bold text-white mb-2">Questions?</h3>
        <p className="text-gray-300 text-sm">
          Reach us at{" "}
          <a
            href="mailto:support@trippyway.com"
            className="underline hover:text-white transition-colors"
          >
            support@trippyway.com
          </a>
        </p>
      </div>
    </div>
  );
}
