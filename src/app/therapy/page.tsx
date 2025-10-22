import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";

export const metadata: Metadata = {
  title: "Therapy with Lumina",
  description:
    "Discover Lumina's therapy services, from individual support to tailored programs for modern teams."
};

export default function TherapyPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <h1 className="text-3xl font-semibold text-brand-charcoal">Therapy, reimagined for work-life flow</h1>
        <p className="text-brand-charcoal/70">
          Our licensed therapists combine clinical expertise with a deep understanding of distributed teams, hybrid schedules, and the realities of modern work.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        <Card title="1:1 video sessions" description="Flexible 45-minute sessions designed around your schedule." />
        <Card title="Team workshops" description="Interactive experiences that teach grounding techniques and resilience." />
        <Card title="On-demand micro-support" description="Text-based nudges and check-ins to keep calm close at hand." />
      </div>

      <Card
        title="How it works"
        description="A simple pathway to the right support"
        className="space-y-6"
      >
        <ol className="list-decimal space-y-3 pl-5 text-sm">
          <li>Complete the stress check or schedule a discovery call with our care team.</li>
          <li>We match you with a therapist who aligns with your goals, identity, and communication style.</li>
          <li>Track progress together in the Lumina dashboard with gentle follow-ups and resources.</li>
        </ol>
        <Button variant="secondary" href="#">
          Book a session (coming soon)
        </Button>
      </Card>
    </div>
  );
}
