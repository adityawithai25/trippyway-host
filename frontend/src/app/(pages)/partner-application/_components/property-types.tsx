import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PROPERTY_TYPES } from "@/constants/partner-data";
import { Building2 } from "lucide-react";
import Image from "next/image";

export default function PropertyTypesSection() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-white">
      <div className="container mx-auto max-sm:px-4  max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 space-y-4">
          <Badge
            variant="outline"
            className="mb-2 px-3 py-1.5 border-purple-200 bg-purple-50 text-purple-700"
          >
            <Building2 className="w-3.5 h-3.5 mr-2" />
            All Business Types Welcome
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight font-paytone-one">
            Every Type of Travel Business{" "}
            <span className="text-purple-600">Welcome</span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto font-inter leading-relaxed">
            Whether you run a hotel, homestay, or tour company, our platform is
            built to help your business succeed.
          </p>
        </div>

        {/* Property Types Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROPERTY_TYPES.map((type, index) => (
            <Card
              key={type.id}
              className="group relative overflow-hidden py-0   transition-all duration-250 hover:shadow-xl cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={type.image}
                  alt={type.name}
                  fill
                  className="object-fill group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-purple-900/50 via-purple-900/10 to-transparent  transition-all duration-250" />

                {/* Icon Badge */}
                <div className="absolute top-4 right-4 w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:bg-white/30 transition-all duration-[250ms]">
                  <type.icon className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2 font-paytone-one group-hover:text-purple-200 transition-colors duration-[250ms]">
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
        <div className="mt-12 text-center space-y-4">
          <p className="text-gray-600 text-base font-medium">
            Don't see your business type?{" "}
            <span className="text-purple-700 font-semibold">
              We're open to all travel-related businesses!
            </span>
          </p>
          <p className="text-sm text-gray-500">
            Contact us to discuss how we can support your specific needs
          </p>
        </div>
      </div>
    </section>
  );
}
