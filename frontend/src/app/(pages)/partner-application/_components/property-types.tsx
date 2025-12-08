import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PROPERTY_TYPES } from "@/constants/partner-data";
import { Building2 } from "lucide-react";
import Image from "next/image";

export default function PropertyTypesSection() {
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white">
      <div className="container mx-auto max-sm:px-4 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-6 md:mb-8 space-y-2">
          <Badge
            variant="outline"
            className="mb-1 px-3 py-1.5 border-purple-200 bg-purple-50 text-purple-700 text-sm"
          >
            <Building2 className="w-3.5 h-3.5 mr-1.5" />
            All Business Types Welcome
          </Badge>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight font-paytone-one">
            Every Type of Travel Business{" "}
            <span className="text-purple-600">Welcome</span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto font-inter">
            Whether you run a hotel, homestay, or tour company, our platform is built to help your business succeed.
          </p>
        </div>

        {/* Property Types Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROPERTY_TYPES.map((type, index) => (
            <Card
              key={type.id}
              className="group relative overflow-hidden py-0 transition-all duration-250 hover:shadow-lg cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={type.image}
                  alt={type.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-purple-900/60 via-purple-900/20 to-transparent transition-all duration-250" />

                {/* Icon Badge */}
                <div className="absolute top-3 right-3 w-9 h-9 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:bg-white/30 transition-all duration-[250ms]">
                  <type.icon className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-lg md:text-xl font-bold mb-1 font-paytone-one group-hover:text-purple-200 transition-colors duration-[250ms]">
                  {type.name}
                </h3>
                <p className="text-sm text-white/90 leading-relaxed">
                  {type.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom Message */}
        <div className="mt-6 text-center space-y-1">
          <p className="text-gray-600 text-sm font-medium">
            Don't see your business type?{" "}
            <span className="text-purple-700 font-semibold">
              We're open to all travel-related businesses!
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
