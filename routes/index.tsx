import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { categories, jobs, type Job } from "@/data/jobs";
import { DAILY_COUNT, getDailyJobs, getDayKey } from "@/lib/daily-jobs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Micky Store — Daily Jobs & MB Payouts" },
      {
        name: "description",
        content:
          "Five random Micky Store jobs every day, paid in MB. Claim your shift, track your balance, browse the full catalogue of 119 jobs.",
      },
      { property: "og:title", content: "Micky Store — Daily Jobs & MB Payouts" },
      {
        property: "og:description",
        content: "Five random jobs a day, from LizzyOS missions to big league contracts. Claim them and earn MB.",
      },
    ],
  }),
  component: MickyStore,
});

const STORAGE_KEY = "micky-store-claimed-v1";

function MickyStore() {
  const [claimed, setClaimed] = useState<number[]>([]);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string>("all");
  const [showAll, setShowAll] = useState(false);
  const [dayKey, setDayKey] = useState<string | null>(null);

  useEffect(() => {
    setDayKey(getDayKey());
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setClaimed(JSON.parse(saved));
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = (id: number) => {
    setClaimed((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  const daily = useMemo(() => (dayKey ? getDailyJobs(dayKey) : []), [dayKey]);
  const dailyIds = useMemo(() => new Set(daily.map((j) => j.id)), [daily]);

  const earned = useMemo(
    () => jobs.filter((j) => claimed.includes(j.id)).reduce((sum, j) => sum + j.pay, 0),
    [claimed],
  );
  const dailyPot = daily.reduce((sum, j) => sum + j.pay, 0);
  const dailyDone = daily.filter((j) => claimed.includes(j.id)).length;

  const catalogue = jobs.filter((j) => {
    const matchesCat = active === "all" || j.category === active;
    const matchesQuery = j.title.toLowerCase().includes(query.trim().toLowerCase());
    return matchesCat && matchesQuery;
  });

  const prettyDate = dayKey
    ? new Date(`${dayKey}T00:00:00`).toLocaleDateString(undefined, {
        weekday: "long",
        day: "numeric",
        month: "long",
      })
    : "";

  return (
    <main className="min-h-screen">
      <header
        className="border-b border-border px-4 py-12"
        style={{ backgroundImage: "var(--gradient-hero)" }}
      >
        <div className="mx-auto max-w-5xl">
          <Badge className="mb-4 bg-gold text-gold-foreground hover:bg-gold">Now hiring 💼</Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Micky Store — Daily Shift</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            {DAILY_COUNT} random jobs are picked for you every day. Do them, claim them, get paid in MB.
            New jobs at midnight.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Stat label="MB earned (all time)" value={`${earned} MB`} />
            <Stat label="Today's pot" value={`${dailyPot} MB`} />
            <Stat label="Today's progress" value={`${dailyDone} / ${DAILY_COUNT}`} />
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-2xl font-bold">Today's jobs</h2>
          <p className="text-sm text-muted-foreground">{prettyDate}</p>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {daily.map((job) => (
            <JobCard key={job.id} job={job} claimed={claimed.includes(job.id)} onToggle={toggle} />
          ))}
          {daily.length === 0 && (
            <p className="text-muted-foreground">Picking today's jobs…</p>
          )}
        </div>

        {dailyDone === DAILY_COUNT && daily.length > 0 && (
          <p className="mt-4 rounded-xl border border-secondary bg-secondary/50 px-4 py-3 text-sm font-semibold text-secondary-foreground">
            🎉 Full shift complete — {dailyPot} MB earned today. Come back tomorrow for 5 new jobs.
          </p>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
          <div>
            <h2 className="text-xl font-bold">Full job catalogue</h2>
            <p className="text-sm text-muted-foreground">
              All {jobs.length} jobs and their MB prices — only today's 5 pay out.
            </p>
          </div>
          <Button variant="outline" onClick={() => setShowAll((s) => !s)}>
            {showAll ? "Hide catalogue" : "Browse all jobs"}
          </Button>
        </div>

        {showAll && (
          <>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search jobs…"
                className="sm:max-w-xs"
                aria-label="Search jobs"
              />
              {claimed.length > 0 && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setClaimed([]);
                    localStorage.removeItem(STORAGE_KEY);
                  }}
                >
                  Reset payslip
                </Button>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <FilterChip label="All jobs" activeKey={active} value="all" onClick={setActive} />
              {categories.map((c) => (
                <FilterChip key={c.key} label={c.name} activeKey={active} value={c.key} onClick={setActive} />
              ))}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {catalogue.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  claimed={claimed.includes(job.id)}
                  onToggle={toggle}
                  locked={!dailyIds.has(job.id)}
                />
              ))}
            </div>

            {catalogue.length === 0 && (
              <p className="mt-10 text-center text-muted-foreground">No jobs match that search.</p>
            )}
          </>
        )}
      </section>
    </main>
  );
}

function JobCard({
  job,
  claimed,
  onToggle,
  locked = false,
}: {
  job: Job;
  claimed: boolean;
  onToggle: (id: number) => void;
  locked?: boolean;
}) {
  return (
    <Card
      className={`flex flex-row items-center justify-between gap-4 p-4 transition-colors ${
        claimed ? "border-secondary bg-secondary/40" : ""
      } ${locked ? "opacity-70" : ""}`}
    >
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">Job #{job.id}</p>
        <h3 className="text-base font-semibold leading-snug">{job.title}</h3>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-2">
        <span className="font-display text-lg font-bold text-primary">{job.pay} MB</span>
        {locked ? (
          <span className="text-xs text-muted-foreground">Not today</span>
        ) : (
          <Button size="sm" variant={claimed ? "secondary" : "default"} onClick={() => onToggle(job.id)}>
            {claimed ? "Claimed ✓" : "Claim"}
          </Button>
        )}
      </div>
    </Card>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card px-4 py-3" style={{ boxShadow: "var(--shadow-soft)" }}>
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="font-display text-xl font-bold">{value}</p>
    </div>
  );
}

function FilterChip({
  label,
  value,
  activeKey,
  onClick,
}: {
  label: string;
  value: string;
  activeKey: string;
  onClick: (v: string) => void;
}) {
  return (
    <Button
      size="sm"
      variant={activeKey === value ? "default" : "outline"}
      onClick={() => onClick(value)}
      className="rounded-full"
    >
      {label}
    </Button>
  );
}
