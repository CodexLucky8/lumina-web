import type { Metadata } from "next";
import { Card } from "@/components/Card";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Review the Lumina terms that govern your use of our wellbeing platform."
};

export default function TermsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold text-brand-charcoal">Terms of Service</h1>
      <Card className="space-y-4 text-sm text-brand-charcoal/80">
        <p>
          By using Lumina you agree to engage with our services responsibly and respect the confidentiality of shared community insights.
        </p>
        <p>
          Lumina provides wellbeing guidance and therapy access but is not a substitute for emergency medical services. If you or someone you know is in crisis, contact local emergency services immediately.
        </p>
        <p>
          Access to Lumina may require a company subscription or individual membership. Fees are billed according to your contract or chosen plan and renew automatically unless cancelled.
        </p>
        <p>
          These terms may evolve as we expand features. We will notify members at least 30 days prior to material updates. Continued use after the effective date signifies acceptance.
        </p>
      </Card>
    </div>
  );
}
