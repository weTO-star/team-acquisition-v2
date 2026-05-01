"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";

type Locale = "en" | "fr";
type Step = 1 | 2 | 3;

type ROIInputs = {
  monthlyLeadGoal: number;
  currentCloseRate: number;
  averageContractValue: number;
};

type IntentCapturePayload = {
  sessionId: string;
  pagesViewed: string[];
  durationSeconds: number;
  ipEnrichment: {
    companyName: string | null;
    industry: string | null;
    headcount: number | null;
    source: "clearbit" | "6sense" | "albacross" | "unknown";
  };
};

const TRANSLATIONS = {
  en: {
    title: "Presidential B2B ROI Engine",
    subtitle: "Model your high-ticket acquisition upside with surgical precision.",
    stepInput: "Step 1 - Strategic Inputs",
    stepLoading: "Step 2 - Strategic Analysis",
    stepUnlock: "Step 3 - Unlock Full Intelligence",
    leadGoal: "Monthly Lead Goal",
    closeRate: "Current Close Rate (%)",
    acv: "Average Contract Value ($)",
    run: "Run Analysis",
    loading: "Loading Strategic Analysis...",
    partial: "Projected Revenue Growth",
    unlock: "Enter Email + LinkedIn Profile URL to unlock full report",
    email: "Business Email",
    linkedin: "LinkedIn Profile URL",
    submit: "Unlock My Gold Report",
    discuss: "Discuss this ROI with Wells on LinkedIn",
    proofTitle: "Proof of Excellence",
    founder: "Founder: Wells Todison",
    company: "TEAM Acquisition",
  },
  fr: {
    title: "Moteur ROI B2B Presidentiel",
    subtitle: "Modelez votre croissance high-ticket avec une precision chirurgicale.",
    stepInput: "Etape 1 - Inputs strategiques",
    stepLoading: "Etape 2 - Analyse strategique",
    stepUnlock: "Etape 3 - Debloquer l'intelligence complete",
    leadGoal: "Objectif mensuel de leads",
    closeRate: "Taux de closing actuel (%)",
    acv: "Valeur moyenne du contrat ($)",
    run: "Lancer l'analyse",
    loading: "Chargement de l'analyse strategique...",
    partial: "Projection de croissance de revenu",
    unlock: "Entrez Email + URL LinkedIn pour debloquer le rapport complet",
    email: "Email professionnel",
    linkedin: "URL du profil LinkedIn",
    submit: "Debloquer mon rapport Gold",
    discuss: "Discuter ce ROI avec Wells sur LinkedIn",
    proofTitle: "Preuve d'excellence",
    founder: "Fondateur : Wells Todison",
    company: "TEAM Acquisition",
  },
} as const;

const defaultInputs: ROIInputs = {
  monthlyLeadGoal: 60,
  currentCloseRate: 12,
  averageContractValue: 15000,
};

function computeGrowthProjection(inputs: ROIInputs) {
  const improvedCloseRate = inputs.currentCloseRate * 1.35;
  const baselineMonthlyRevenue =
    inputs.monthlyLeadGoal * (inputs.currentCloseRate / 100) * inputs.averageContractValue;
  const optimizedMonthlyRevenue =
    inputs.monthlyLeadGoal * (improvedCloseRate / 100) * inputs.averageContractValue;
  const monthlyLift = optimizedMonthlyRevenue - baselineMonthlyRevenue;
  const annualGrowth = monthlyLift * 12;

  return {
    improvedCloseRate: Math.round(improvedCloseRate * 100) / 100,
    baselineMonthlyRevenue: Math.round(baselineMonthlyRevenue),
    optimizedMonthlyRevenue: Math.round(optimizedMonthlyRevenue),
    annualGrowth: Math.round(annualGrowth),
  };
}

export default function ROICalculator() {
  const [locale, setLocale] = useState<Locale>("en");
  const [step, setStep] = useState<Step>(1);
  const [inputs, setInputs] = useState<ROIInputs>(defaultInputs);
  const [email, setEmail] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [pagesViewed, setPagesViewed] = useState<string[]>(["Home", "SDR Hub Madagascar"]);
  const [intentData, setIntentData] = useState<IntentCapturePayload>({
    sessionId: crypto.randomUUID(),
    pagesViewed: ["Home"],
    durationSeconds: 0,
    ipEnrichment: {
      companyName: null,
      industry: null,
      headcount: null,
      source: "unknown",
    },
  });

  const startTime = useRef<number>(Date.now());
  const resultsContainerRef = useRef<HTMLDivElement | null>(null);
  const t = TRANSLATIONS[locale];
  const result = useMemo(() => computeGrowthProjection(inputs), [inputs]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const durationSeconds = Math.round((Date.now() - startTime.current) / 1000);
      setIntentData((prev) => ({
        ...prev,
        pagesViewed,
        durationSeconds,
      }));
    }, 10000);

    return () => window.clearInterval(timer);
  }, [pagesViewed]);

  useEffect(() => {
    if (step !== 3 || !resultsContainerRef.current) return;

    gsap.fromTo(
      resultsContainerRef.current.querySelectorAll(".gold-card"),
      { opacity: 0, y: 30, filter: "blur(6px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.9,
        stagger: 0.16,
        ease: "power3.out",
      }
    );
  }, [step]);

  const runAnalysis = () => {
    setStep(2);
    window.setTimeout(() => {
      setStep(3);
      setPagesViewed((prev) => [...prev, "ROI Calculator Result"]);
    }, 2200);
  };

  const submitLead = () => {
    const payload = {
      email,
      linkedinUrl,
      inputs,
      projection: result,
      intentData,
      capturedAt: new Date().toISOString(),
    };
    // Next step: POST to /api/leads/capture
    console.info("lead_capture_payload", payload);
  };

  const prefilledMessage = encodeURIComponent(
    `Hi Wells, I just modeled a projected annual growth of $${result.annualGrowth.toLocaleString()} using your ROI engine. ` +
      `I'd like to discuss a focused acquisition strategy with TEAM Acquisition.`
  );
  const discussWithWellsUrl = `https://www.linkedin.com/in/wells-todison/?message=${prefilledMessage}`;

  return (
    <section className="mx-auto max-w-6xl rounded-3xl bg-[#050505] p-8 text-zinc-100 shadow-[0_0_70px_rgba(212,175,55,0.18)]">
      <div className="rounded-3xl border border-transparent bg-gradient-to-r from-yellow-600 via-yellow-200 to-yellow-600 p-[1px]">
        <div className="rounded-3xl bg-[#050505] p-7">
          <div className="mb-7 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-semibold text-yellow-200">{t.title}</h2>
              <p className="mt-2 text-zinc-300">{t.subtitle}</p>
            </div>
            <button
              type="button"
              onClick={() => setLocale((prev) => (prev === "en" ? "fr" : "en"))}
              className="rounded-full border border-yellow-400/50 px-4 py-2 text-sm font-medium text-yellow-100 transition hover:bg-yellow-500/10"
            >
              {locale === "en" ? "FR" : "EN"}
            </button>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <h3 className="text-lg text-yellow-100">{t.stepInput}</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <input
                    className="rounded-xl border border-yellow-500/30 bg-zinc-900/70 p-3 outline-none ring-1 ring-yellow-600/20 focus:ring-yellow-300"
                    type="number"
                    value={inputs.monthlyLeadGoal}
                    onChange={(e) =>
                      setInputs((prev) => ({ ...prev, monthlyLeadGoal: Number(e.target.value) || 0 }))
                    }
                    placeholder={t.leadGoal}
                  />
                  <input
                    className="rounded-xl border border-yellow-500/30 bg-zinc-900/70 p-3 outline-none ring-1 ring-yellow-600/20 focus:ring-yellow-300"
                    type="number"
                    value={inputs.currentCloseRate}
                    onChange={(e) =>
                      setInputs((prev) => ({ ...prev, currentCloseRate: Number(e.target.value) || 0 }))
                    }
                    placeholder={t.closeRate}
                  />
                  <input
                    className="rounded-xl border border-yellow-500/30 bg-zinc-900/70 p-3 outline-none ring-1 ring-yellow-600/20 focus:ring-yellow-300"
                    type="number"
                    value={inputs.averageContractValue}
                    onChange={(e) =>
                      setInputs((prev) => ({
                        ...prev,
                        averageContractValue: Number(e.target.value) || 0,
                      }))
                    }
                    placeholder={t.acv}
                  />
                </div>

                <button
                  type="button"
                  onClick={runAnalysis}
                  className="rounded-xl bg-gradient-to-r from-yellow-600 via-yellow-200 to-yellow-600 px-6 py-3 font-semibold text-zinc-900"
                >
                  {t.run}
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl border border-yellow-500/30 bg-zinc-900/60 p-10 text-center"
              >
                <h3 className="text-lg text-yellow-100">{t.stepLoading}</h3>
                <p className="mt-3 animate-pulse text-zinc-300">{t.loading}</p>
                <div className="mx-auto mt-5 h-2 w-56 rounded-full bg-gradient-to-r from-yellow-700 via-yellow-300 to-yellow-700" />
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                ref={resultsContainerRef}
                className="space-y-6"
              >
                <div className="gold-card rounded-2xl border border-yellow-500/30 bg-zinc-900/70 p-6">
                  <h3 className="text-xl text-yellow-200">{t.partial}</h3>
                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-zinc-400">Baseline / Month</p>
                      <p className="mt-1 text-2xl font-semibold text-zinc-100">
                        ${result.baselineMonthlyRevenue.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-zinc-400">Optimized / Month</p>
                      <p className="mt-1 text-2xl font-semibold text-yellow-100">
                        ${result.optimizedMonthlyRevenue.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-zinc-400">Annual Growth</p>
                      <p className="mt-1 text-2xl font-semibold text-yellow-200">
                        ${result.annualGrowth.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="gold-card rounded-2xl border border-yellow-500/30 bg-zinc-900/70 p-6">
                  <p className="text-yellow-100">{t.unlock}</p>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.email}
                      className="rounded-xl border border-yellow-500/30 bg-zinc-900 p-3 outline-none ring-1 ring-yellow-600/20 focus:ring-yellow-300"
                    />
                    <input
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      placeholder={t.linkedin}
                      className="rounded-xl border border-yellow-500/30 bg-zinc-900 p-3 outline-none ring-1 ring-yellow-600/20 focus:ring-yellow-300"
                    />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={submitLead}
                      className="rounded-xl bg-gradient-to-r from-yellow-600 via-yellow-200 to-yellow-600 px-5 py-3 font-semibold text-zinc-900"
                    >
                      {t.submit}
                    </button>
                    <a
                      href={discussWithWellsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl border border-yellow-400/60 px-5 py-3 font-medium text-yellow-100"
                    >
                      {t.discuss}
                    </a>
                  </div>
                </div>

                <div className="gold-card rounded-2xl border border-yellow-500/30 bg-zinc-900/70 p-6">
                  <h4 className="text-lg text-yellow-200">{t.proofTitle}</h4>
                  <div className="mt-3 grid gap-3 md:grid-cols-2">
                    <a
                      href="https://www.linkedin.com/in/wells-todison"
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl border border-yellow-600/30 bg-zinc-900/70 p-4 transition hover:border-yellow-300/60"
                    >
                      <p className="font-medium text-zinc-100">{t.founder}</p>
                      <p className="mt-1 text-sm text-zinc-400">LinkedIn reference and authority profile</p>
                    </a>
                    <a
                      href="https://www.linkedin.com/company/team-acquisition/"
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl border border-yellow-600/30 bg-zinc-900/70 p-4 transition hover:border-yellow-300/60"
                    >
                      <p className="font-medium text-zinc-100">{t.company}</p>
                      <p className="mt-1 text-sm text-zinc-400">Company social proof and activity feed</p>
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
