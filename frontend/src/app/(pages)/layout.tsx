import Footer from "@/components/footer";
import Header from "@/components/header";
import { OnboardingDialog } from "@/components/onboarding-dialog";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <OnboardingDialog />
    </>
  );
}
