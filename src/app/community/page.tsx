import type { Metadata } from "next";
import { Card } from "@/components/Card";

export const metadata: Metadata = {
  title: "Lumina+ Community",
  description:
    "Learn about Lumina+, the private community for peers to share mindful practices and receive gentle support."
};

export default function CommunityPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <h1 className="text-3xl font-semibold text-brand-charcoal">Lumina+ Community</h1>
        <p className="text-brand-charcoal/70">
          A private, caring space where members deepen their wellbeing practice with expert-led sessions and peer support.
        </p>
      </header>

      <Card title="What's coming" className="space-y-4">
        <ul className="list-disc space-y-2 pl-5 text-sm text-brand-charcoal/80">
          <li>Weekly live circles with Lumina therapists and coaches.</li>
          <li>Guided audio practices tailored to your stress profile.</li>
          <li>Peer accountability pods to keep wellbeing goals approachable.</li>
          <li>Curated resource library spanning mindfulness, movement, and resilience.</li>
        </ul>
        <p className="text-sm text-brand-charcoal/70">
          Lumina+ opens soon. Join the waitlist to be the first to know when membership is available.
        </p>
      </Card>
    </div>
  );
}
