const qs = (selector) => document.querySelector(selector);
const qsa = (selector) => Array.from(document.querySelectorAll(selector));

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function calculateROI({ leadGoal, closeRate, contractValue }) {
  const improvedCloseRate = closeRate * 1.35;
  const baselineMonthlyRevenue = leadGoal * (closeRate / 100) * contractValue;
  const optimizedMonthlyRevenue = leadGoal * (improvedCloseRate / 100) * contractValue;
  const annualGrowth = (optimizedMonthlyRevenue - baselineMonthlyRevenue) * 12;

  return {
    baselineMonthlyRevenue: Math.round(baselineMonthlyRevenue),
    optimizedMonthlyRevenue: Math.round(optimizedMonthlyRevenue),
    annualGrowth: Math.round(annualGrowth),
  };
}

function setupRevealOnScroll() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  qsa(".reveal").forEach((section) => observer.observe(section));
}

function setupSmoothScrollButtons() {
  qsa("[data-scroll]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.getAttribute("data-scroll");
      if (!target) return;
      const section = qs(target);
      if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function setupROICalculator() {
  const form = qs("#roi-form");
  const loader = qs("#analysis-loader");
  const results = qs("#roi-results");
  const baselineEl = qs("#baselineRevenue");
  const optimizedEl = qs("#optimizedRevenue");
  const annualEl = qs("#annualGrowth");
  const linkedinBtn = qs("#linkedinDynamicBtn");
  const leadGoalRange = qs("#leadGoalRange");
  const closeRateRange = qs("#closeRateRange");
  const contractRange = qs("#contractRange");
  const leadGoalValue = qs("#leadGoalValue");
  const closeRateValue = qs("#closeRateValue");
  const contractValueEl = qs("#contractValue");

  let latestRoi = { annualGrowth: 0 };

  const syncSliderValues = () => {
    if (leadGoalValue && leadGoalRange) leadGoalValue.textContent = leadGoalRange.value;
    if (closeRateValue && closeRateRange) closeRateValue.textContent = closeRateRange.value;
    if (contractValueEl && contractRange) {
      contractValueEl.textContent = Number(contractRange.value).toLocaleString();
    }
  };

  [leadGoalRange, closeRateRange, contractRange].forEach((el) => {
    el?.addEventListener("input", syncSliderValues);
  });
  syncSliderValues();

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const leadGoal = Number(leadGoalRange?.value || 0);
    const closeRate = Number(closeRateRange?.value || 0);
    const contractValue = Number(contractRange?.value || 0);

    const roi = calculateROI({ leadGoal, closeRate, contractValue });
    latestRoi = roi;

    loader?.classList.remove("hidden");
    results?.classList.add("hidden");

    window.setTimeout(() => {
      loader?.classList.add("hidden");
      results?.classList.remove("hidden");
      if (baselineEl) baselineEl.textContent = formatCurrency(roi.baselineMonthlyRevenue);
      if (optimizedEl) optimizedEl.textContent = formatCurrency(roi.optimizedMonthlyRevenue);
      if (annualEl) annualEl.textContent = formatCurrency(roi.annualGrowth);

      const prefilledMessage = encodeURIComponent(
        `Hi Wells, I just calculated a potential ${formatCurrency(roi.annualGrowth)} annual growth on t-acquisition.com.`
      );
      if (linkedinBtn) {
        linkedinBtn.href = `https://www.linkedin.com/in/wells-todison/?message=${prefilledMessage}`;
      }
    }, 2000);
  });

  qs("#lead-capture-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = qs("#leadEmail")?.value || "";

    const leadPayload = {
      source: "roi-calculator",
      email,
      roi: latestRoi,
      timestamp: new Date().toISOString(),
    };

    console.info("lead-capture-ready", leadPayload);
    window.alert("Your premium growth report request is captured. Our team will contact you shortly.");
  });
}

function setupAppointmentForm() {
  const form = qs("#appointment-form");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(form).entries());
    payload.timestamp = new Date().toISOString();
    console.info("appointment-ready", payload);
    window.alert("Executive consultation request received.");
    form.reset();
  });
}

function setupStaticMetadata() {
  const year = qs("#year");
  if (year) year.textContent = String(new Date().getFullYear());
}

setupRevealOnScroll();
setupSmoothScrollButtons();
setupROICalculator();
setupAppointmentForm();
setupStaticMetadata();
