"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";

type Locale = "en" | "fr";

type BusinessInput = {
  industry: string;
  annualRevenue: number;
  teamSize: number;
  leadToCloseRate: number;
  avgDealSize: number;
};

type IpEnrichmentPayload = {
  companyName: string | null;
  industry: string | null;
  headcount: number | null;
  source: "clearbit" | "6sense" | "albacross" | "unknown";
  enrichedAt: string | null;
};

type SessionCaptureEvent = {
  sessionId: string;
  durationSeconds: number;
  pagesViewed: string[];
  timestamp: string;
};

const copy = {
  en: {
    title: "B2B Growth ROI Calculator",
    subtitle: "Estimate your outbound upside in under 2 minutes.",
    step1: "Step 1: Business Inputs",
    step2: "Step 2: Strategic Analysis",
    step3: "Step 3: Unlock Full Results",
    loading: "Loading Strategic Analysis...",
    partialTitle: "Partial Strategic Snapshot",
    fullTitle: "Unlock Full Growth Blueprint",
    cta: "Open LinkedIn Message to Wells",
    submit: "Get My Full Report",
  },
  fr: {
    title: "Calculateur ROI Croissance B2B",
    subtitle: "Estimez votre potentiel outbound en moins de 2 minutes.",
    step1: "Etape 1 : Donnees business",
    step2: "Etape 2 : Analyse strategique",
    step3: "Etape 3 : Debloquer le rapport complet",
    loading: "Chargement de l'analyse strategique...",
    partialTitle: "Apercu strategique partiel",
    fullTitle: "Debloquez le plan complet de croissance",
    cta: "Ouvrir un message LinkedIn pour Wells",
    submit: "Recevoir mon rapport complet",
  },
} as const;

const defaultInput: BusinessInput = {
  industry: "SaaS",
  annualRevenue: 1_000_000,
  teamSize: 5,
  leadToCloseRate: 12,
  avgDealSize: 8000,
};

function computeRoi(data: BusinessInput) {
  const baselineLeadsPerMonth = Math.max(15, data.teamSize * 12);
  const optimizedLeadsPerMonth = baselineLeadsPerMonth * 1.85;
  const additionalClosedDealsMonthly =
    (optimizedLeadsPerMonth - baselineLeadsPerMonth) * (data.leadToCloseRate / 100);
  const additionalRevenueAnnual = additionalClosedDealsMonthly * data.avgDealSize * 12;
  const estimatedProgramCost = Math.max(25000, data.teamSize * 6000);
  const netGain = additionalRevenueAnnual - estimatedProgramCost;
  const roiPercent = estimatedProgramCost > 0 ? (netGain / estimatedProgramCost) * 100 : 0;

  return {
    baselineLeadsPerMonth: Math.round(baselineLeadsPerMonth),
    optimizedLeadsPerMonth: Math.round(optimizedLeadsPerMonth),
    additionalRevenueAnnual: Math.round(additionalRevenueAnnual),
    estimatedProgramCost: Math.round(estimatedProgramCost),
    netGain: Math.round(netGain),
    roiPercent: Math.round(roiPercent),
  };
}

export default function ROICalculator() {
  const [locale, setLocale] = useState<Locale>("en");
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [input, setInput] = useState<BusinessInput>(defaultInput);
  const [email, setEmail] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [pagesViewed, setPagesViewed] = useState<string[]>(["Home", "SDR Hub Madagascar"]);
  const [ipEnrichmentData, setIpEnrichmentData] = useState<IpEnrichmentPayload>({
    companyName: null,
    industry: null,
    headcount: null,
    source: "unknown",
    enrichedAt: null,
  });

  const resultsRef = useRef<HTMLDivElement | null>(null);
  const sessionStartRef = useRef<number>(Date.now());
  const sessionIdRef = useRef<string>(crypto.randomUUID());
  const roi = useMemo(() => computeRoi(input), [input]);
  const t = copy[locale];

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      const event: SessionCaptureEvent = {
        sessionId: sessionIdRef.current,
        durationSeconds: Math.round((Date.now() - sessionStartRef.current) / 1000),
        pagesViewed,
        timestamp: new Date().toISOString(),
      };
      // Placeholder for analytics endpoint dispatch
      console.info("session_capture", event);
    }, 15000);

    return () => window.clearInterval(intervalId);
  }, [pagesViewed]);

  useEffect(() => {
    // Placeholder for future IP enrichment API response mapping.
    const mockEnrichmentTimer = window.setTimeout(() => {
      setIpEnrichmentData({
        companyName: "Prospect Company",
        industry: input.industry,
        headcount: input.teamSize * 10,
        source: "unknown",
        enrichedAt: new Date().toISOString(),
      });
    }, 2000);

    return () => window.clearTimeout(mockEnrichmentTimer);
  }, [input.industry, input.teamSize]);

  useEffect(() => {
    if (step !== 3 || !resultsRef.current) return;

    gsap.fromTo(
      resultsRef.current.querySelectorAll(".result-card"),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power2.out",
      }
    );
  }, [step]);

  const launchAnalysis = () => {
    setLoadingAnalysis(true);
    setStep(2);
    window.setTimeout(() => {
      setLoadingAnalysis(false);
      setStep(3);
    }, 2000);
  };

  const onSubmitLead = () => {
    const payload = {
      sessionId: sessionIdRef.current,
      email,
      linkedinUrl,
      input,
      roi,
      pagesViewed,
      ipEnrichmentData,
      submittedAt: new Date().toISOString(),
    };

    // Placeholder: post to Next.js API route / Symfony webhook relay
    console.info("lead_submission", payload);
  };

  const linkedinPrefilledMessage = encodeURIComponent(
    `Hi Wells, I just calculated a potential $${roi.additionalRevenueAnnual.toLocaleString()} growth on your site. ` +
      `I'd like to discuss a tailored outbound strategy for ${input.industry}.`
  );
  const linkedinDmUrl = `https://www.linkedin.com/in/wells-todison/?message=${linkedinPrefilledMessage}`;

  return (
    <section className="mx-auto max-w-5xl rounded-3xl border border-yellow-500/40 bg-zinc-950 p-8 text-zinc-100 shadow-[0_0_50px_rgba(212,175,55,0.12)]">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-yellow-200">{t.title}</h2>
          <p className="mt-2 text-zinc-300">{t.subtitle}</p>
        </div>
        <button
          type="button"
          onClick={() => setLocale(locale === "en" ? "fr" : "en")}
          className="rounded-full border border-yellow-500/50 px-4 py-2 text-sm text-yellow-200"
        >
          {locale === "en" ? "FR" : "EN"}
        </button>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">{t.step1}</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <input
              className="rounded-xl border border-transparent bg-zinc-900 p-3 outline-none ring-1 ring-yellow-600/40 focus:ring-yellow-300"
              value={input.industry}
              onChange={(e) => setInput((prev) => ({ ...prev, industry: e.target.value }))}
              placeholder="Industry"
            />
            <input
              className="rounded-xl border border-transparent bg-zinc-900 p-3 outline-none ring-1 ring-yellow-600/40 focus:ring-yellow-300"
              type="number"
              value={input.annualRevenue}
              onChange={(e) =>
                setInput((prev) => ({ ...prev, annualRevenue: Number(e.target.value) || 0 }))
              }
              placeholder="Annual Revenue"
            />
            <input
              className="rounded-xl border border-transparent bg-zinc-900 p-3 outline-none ring-1 ring-yellow-600/40 focus:ring-yellow-300"
              type="number"
              value={input.teamSize}
              onChange={(e) =>
                setInput((prev) => ({ ...prev, teamSize: Number(e.target.value) || 0 }))
              }
              placeholder="Team Size"
            />
            <input
              className="rounded-xl border border-transparent bg-zinc-900 p-3 outline-none ring-1 ring-yellow-600/40 focus:ring-yellow-300"
              type="number"
              value={input.leadToCloseRate}
              onChange={(e) =>
                setInput((prev) => ({ ...prev, leadToCloseRate: Number(e.target.value) || 0 }))
              }
              placeholder="Lead to Close Rate (%)"
            />
          </div>

          <button
            type="button"
            onClick={launchAnalysis}
            className="rounded-xl bg-gradient-to-r from-yellow-600 via-yellow-200 to-yellow-600 px-5 py-3 font-semibold text-zinc-900"
          >
            Run Strategic Analysis
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="rounded-2xl border border-yellow-500/40 bg-zinc-900/60 p-8 text-center">
          <p className="animate-pulse text-lg text-yellow-100">{t.loading}</p>
          {loadingAnalysis && <div className="mx-auto mt-4 h-2 w-48 rounded-full bg-yellow-500/40" />}
        </div>
      )}

      {step === 3 && (
        <div ref={resultsRef} className="space-y-6">
          <div className="result-card rounded-2xl border border-yellow-500/30 bg-zinc-900/70 p-5">
            <h3 className="text-xl text-yellow-200">{t.partialTitle}</h3>
            <p className="mt-2 text-zinc-300">
              Estimated annual growth opportunity:{" "}
              <span className="font-semibold text-yellow-100">
                ${roi.additionalRevenueAnnual.toLocaleString()}
              </span>
            </p>
            <p className="mt-1 text-zinc-400">
              Net gain after delivery cost: ${roi.netGain.toLocaleString()} ({roi.roiPercent}% ROI)
            </p>
          </div>

          <div className="result-card rounded-2xl border border-yellow-500/30 bg-zinc-900/70 p-5">
            <h3 className="text-xl text-yellow-200">{t.fullTitle}</h3>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <input
                className="rounded-xl border border-transparent bg-zinc-800 p-3 outline-none ring-1 ring-yellow-600/40 focus:ring-yellow-300"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <input
                className="rounded-xl border border-transparent bg-zinc-800 p-3 outline-none ring-1 ring-yellow-600/40 focus:ring-yellow-300"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                placeholder="LinkedIn Profile URL"
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onSubmitLead}
                className="rounded-xl bg-gradient-to-r from-yellow-600 via-yellow-200 to-yellow-600 px-5 py-3 font-semibold text-zinc-900"
              >
                {t.submit}
              </button>
              <a
                href={linkedinDmUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-yellow-400/60 px-5 py-3 font-medium text-yellow-100"
              >
                {t.cta}
              </a>
            </div>
          </div>

          <div className="result-card rounded-2xl border border-yellow-500/30 bg-zinc-900/70 p-5">
            <p className="text-sm text-zinc-400">Prepared IP enrichment payload:</p>
            <pre className="mt-2 overflow-x-auto text-xs text-zinc-300">
              {JSON.stringify(ipEnrichmentData, null, 2)}
            </pre>
            <button
              type="button"
              onClick={() => setPagesViewed((prev) => [...prev, "Services / SDR Hub Madagascar"])}
              className="mt-3 rounded-lg border border-yellow-600/60 px-4 py-2 text-xs text-yellow-200"
            >
              Track "SDR Hub Madagascar" View
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
