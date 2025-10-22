import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";

export const metadata: Metadata = {
  title: "Feel lighter at work",
  description:
    "Lumina brings a calming approach to stress management with guided assessments, tailored therapy, and a supportive community."
};

const valueProps = [
  {
    title: "Personalized insights",
    description:
      "Run science-backed assessments that translate your stressors into clear guidance and practical next steps."
  },
  {
    title: "Human support",
    description:
      "Connect with licensed therapists who understand the realities of modern work and remote collaboration."
  },
  {
    title: "Ongoing momentum",
    description:
      "Track your wellbeing over time with a dashboard designed to celebrate micro-wins and highlight trends."
  }
];

export default function Page() {
  return (
    <div className="space-y-16">
      <section className="grid gap-10 rounded-3xl bg-white/80 p-10 text-center shadow-sm md:grid-cols-2 md:text-left">
        <div className="space-y-6">
          <p className="inline-flex items-center rounded-full bg-brand-sunshine/60 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-brand-charcoal">
            For teams that want to thrive
          </p>
          <h1 className="text-3xl font-semibold text-brand-charcoal sm:text-4xl md:text-5xl">
            Bring calm, clarity, and care to your team's wellbeing
          </h1>
          <p className="text-base text-brand-charcoal/80">
            Lumina weaves proactive check-ins, empathetic therapy, and a supportive community into your employees' daily rhythms.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:justify-start">
            <Button href="/assessments/stress-check">Take the stress check</Button>
            <Button href="/therapy" variant="secondary">
              Explore therapy options
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Card
            title="Your wellbeing snapshot"
            description="A glimpse of how Lumina visualizes team health"
            className="max-w-sm text-left"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Average stress</span>
                <span className="font-semibold text-brand-charcoal">24 / 50</span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-brand-sunshine/40">
                <div className="h-full w-2/3 rounded-full bg-brand-charcoal" />
              </div>
              <p className="text-xs text-brand-charcoal/70">
                Keep momentum with weekly check-ins, nudges, and calming micro-practices tailored to your team's energy.
              </p>
            </div>
          </Card>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {valueProps.map((prop) => (
          <Card key={prop.title} title={prop.title} description={prop.description} />
        ))}
      </section>

      <section className="rounded-3xl bg-brand-charcoal px-8 py-12 text-center text-white shadow-sm">
        <h2 className="text-2xl font-semibold">Ready to bring Lumina to your workplace?</h2>
        <p className="mt-4 text-sm text-white/80">
          Get in touch to craft a wellbeing program that meets your team where they are.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Button href="mailto:hello@lumina.com" variant="secondary">
            Talk with us
          </Button>
          <Button href="/community" variant="ghost">
            Discover Lumina+
          </Button>
        </div>
      </section>
    </div>
  );
}
