import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Newsletter() {
  return (
    <section id="contact" className="py-24 bg-primary relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white blur-3xl" />
        <div className="absolute top-1/2 right-0 w-64 h-64 rounded-full bg-secondary blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold font-paytone-one text-white">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Subscribe to our newsletter to get the latest updates, exclusive
            deals, and travel inspiration delivered straight to your inbox.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email address"
            className="bg-white/10 border-white/20 text-white placeholder:text-white/60 h-12"
          />
          <Button size="lg" variant="secondary" className="h-12 px-8 font-bold">
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  );
}
