(function () {
  function byId(id) { return document.getElementById(id); }

  function formatEUR(value) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value);
  }

  function initProspectCalc() {
    const leads = byId("leads");
    const conv = byId("conversion");
    const mandate = byId("mandate");
    const leadsV = byId("leadsValue");
    const convV = byId("conversionValue");
    const mandateV = byId("mandateValue");
    const output = byId("estimatedRevenue");
    const taOutput = byId("teamAcqRevenue");
    if (!leads || !conv || !mandate || !output || !taOutput) return;

    function render() {
      const l = Number(leads.value);
      const c = Number(conv.value) / 100;
      const m = Number(mandate.value);
      const est = l * c * m;
      const teamNow = est * 0.25;
      leadsV.textContent = String(l);
      convV.textContent = String(conv.value) + "%";
      mandateV.textContent = Number(mandate.value).toLocaleString();
      output.textContent = formatEUR(est);
      taOutput.textContent = formatEUR(teamNow);
    }
    [leads, conv, mandate].forEach((el) => el.addEventListener("input", render));
    render();
  }

  function validateCheckbox(form, id, message) {
    const box = form.querySelector("#" + id);
    if (!box || box.checked) return true;
    alert(message);
    return false;
  }

  async function submitForm(form, type) {
    const status = form.querySelector(".form-status");
    if (status) status.textContent = "Sending...";

    const formData = Object.fromEntries(new FormData(form).entries());
    const payload = { type: type, data: formData };
    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed");
    if (status) status.textContent = "Request sent. Our company team will contact you shortly.";
    form.reset();
  }

  function bindForms() {
    const prospect = byId("prospectForm");
    if (prospect) {
      prospect.addEventListener("submit", async function (e) {
        e.preventDefault();
        if (!validateCheckbox(prospect, "companyConsent", "Please confirm company status and consent.")) return;
        try { await submitForm(prospect, "prospect"); } catch (err) { alert("Submission error. Please email w-todison@t-acquisition.com"); }
      });
    }
    const investor = byId("investorForm");
    if (investor) {
      investor.addEventListener("submit", async function (e) {
        e.preventDefault();
        if (!validateCheckbox(investor, "gdprInvestor", "Please consent before submitting.")) return;
        try { await submitForm(investor, "investor"); } catch (err) { alert("Submission error. Please email w-todison@t-acquisition.com"); }
      });
    }
  }

  initProspectCalc();
  bindForms();
})();
