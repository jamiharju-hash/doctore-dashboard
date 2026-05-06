import { DatabaseZap, Gauge, ShieldCheck, Zap } from "lucide-react";
import { HeroTerminal } from "@/components/HeroTerminal";
import { MetricCard } from "@/components/MetricCard";

export default function HomePage() {
  return (
    <main>
      <HeroTerminal />
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-8 max-w-3xl">
          <p className="metric-label">Product thesis</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-5xl">The edge is not the pick. It is the system.</h2>
          <p className="mt-5 text-base leading-7 text-white/62">
            Doctore AI turns model-market dislocations into clear execution signals with bankroll protection, timing discipline, and B2B-ready data infrastructure.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard label="Positive EV" value="Model vs market" helper="Flag only opportunities where expected value clears threshold." icon={<Gauge size={20} />} />
          <MetricCard label="Risk layer" value="Fractional Kelly" helper="Convert edge into stake sizing with drawdown-aware caps." icon={<ShieldCheck size={20} />} />
          <MetricCard label="Speed" value="Real-time feed" helper="Surface actionable signals before prices fully correct." icon={<Zap size={20} />} />
          <MetricCard label="B2B" value="Data API" helper="Odds ingestion, historical model data and white-label Kelly logic." icon={<DatabaseZap size={20} />} />
        </div>
      </section>
    </main>
  );
}
