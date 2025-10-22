import type { Metadata } from "next";
import { Card } from "@/components/Card";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Understand how Lumina protects your personal information and assessment data."
};

export default function PrivacyPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold text-brand-charcoal">Privacy Policy</h1>
      <Card className="space-y-4 text-sm text-brand-charcoal/80">
        <p>
          Lumina is committed to keeping your wellbeing journey private. We store assessment results locally in your browser by default and use encrypted services when you opt into therapist support.
        </p>
        <p>
          We never sell or share personal data with advertisers. Aggregated, anonymized insights may be used to improve Lumina's programs and coaching materials.
        </p>
        <p>
          For enterprise deployments, we sign data processing agreements and comply with regional privacy regulations including GDPR, CCPA, and HIPAA-ready safeguards.
        </p>
        <p>
          Questions? Contact privacy@lumina.com and we will respond within two business days.
        </p>
      </Card>
    </div>
  );
}
