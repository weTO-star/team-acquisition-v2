(function () {
  var BOT_EMAIL = "w-todison@t-acquisition.com";
  var companyLineEn = "Team Acquisition is a registered company in Madagascar, not an individual freelancer.";
  var companyLineFr = "Team Acquisition est une entreprise enregistree a Madagascar, pas un freelance individuel.";

  var qa = [
    { keys: ["real company", "registered", "company"], en: "Yes. Team Acquisition is a legally registered Malagasy company and we issue compliant invoices and contracts.", fr: "Oui. Team Acquisition est une entreprise malgache legalement enregistree et nous emettons des factures et contrats conformes." },
    { keys: ["nda", "non disclosure"], en: "Yes, we sign NDAs before sensitive data exchange.", fr: "Oui, nous signons des NDA avant tout echange de donnees sensibles." },
    { keys: ["how much", "cost", "pricing"], en: "Prospect model is performance-driven: Team Acquisition captures 25% of total mandate value from the 50% upfront signature fee.", fr: "Le modele prospect est base sur la performance: Team Acquisition capte 25% de la valeur totale du mandat via les 50% d'acompte a la signature." },
    { keys: ["how fast", "start"], en: "We can launch in 2 weeks after mandate signature.", fr: "Nous pouvons demarrer en 2 semaines apres signature du mandat." },
    { keys: ["markets", "countries", "where"], en: "Primary markets: France, Belgium, Switzerland, Luxembourg, and Germany.", fr: "Marches principaux: France, Belgique, Suisse, Luxembourg et Allemagne." },
    { keys: ["tools", "stack", "salesforce", "apollo"], en: "We use a Silicon Valley-grade stack: Salesforce, Apollo, LinkedIn Sales Navigator and modern outbound tooling.", fr: "Nous utilisons une stack de niveau Silicon Valley: Salesforce, Apollo, LinkedIn Sales Navigator et outils outbound modernes." },
    { keys: ["visit office", "office"], en: "Yes, by appointment in Antananarivo.", fr: "Oui, sur rendez-vous a Antananarivo." },
    { keys: ["languages", "sdr speak"], en: "Our SDR team speaks French, English, and basic German.", fr: "Notre equipe SDR parle francais, anglais et allemand de base." },
    { keys: ["legal structure", "sarl", "sas"], en: "Legal structure: Malagasy SARL/SAS-equivalent with full compliance.", fr: "Structure legale: equivalent SARL/SAS malgache avec conformite complete." },
    { keys: ["exit horizon", "exit"], en: "Target horizon is 3-5 years, or dividend-first strategy depending on investor profile.", fr: "Horizon vise 3-5 ans, ou strategie dividendes selon le profil investisseur." },
    { keys: ["equity protected", "shareholder"], en: "Equity protection via shareholder agreement and right of first refusal.", fr: "Protection de l'equity via pacte d'actionnaires et droit de preemption." },
    { keys: ["tax dividends", "withholding"], en: "Dividend withholding is generally 20%, potentially reduced by treaty.", fr: "La retenue sur dividendes est generalement de 20%, potentiellement reduite selon convention fiscale." },
    { keys: ["audit company", "audit"], en: "Yes, annual external audit is possible and company books are auditable.", fr: "Oui, audit externe annuel possible et comptabilite auditable." },
    { keys: ["10k", "minimum invest"], en: "Minimum investor ticket is EUR 24,700 in co-investment format.", fr: "Le ticket minimum investisseur est de 24 700 EUR en format co-investissement." },
    { keys: ["buyback"], en: "A buyback clause is negotiable after 3 years.", fr: "Une clause de rachat est negociable apres 3 ans." },
    { keys: ["daily operations", "manage"], en: "Daily operations are managed by CEO Wells Todison with the Sales Ops pilot.", fr: "Les operations quotidiennes sont pilotees par le CEO Wells Todison avec le Sales Ops pilot." },
    { keys: ["slow down", "mandates slow"], en: "A 3-month security provision is designed to protect salaries and continuity.", fr: "Une provision de securite de 3 mois est prevue pour proteger salaires et continuite." },
    { keys: ["vat", "0%"], en: "Service exports are positioned under 0% VAT treatment in the Malagasy framework.", fr: "Les exportations de services sont positionnees sous regime TVA 0% dans le cadre malgache." },
    { keys: ["launch", "june", "july"], en: "Industrial launch target is June/July 2026.", fr: "Le lancement industriel cible est Juin/Juillet 2026." }
  ];

  function isFrench(text) {
    return /bonjour|salut|investisseur|entreprise|mandat|combien|tarif|france|belgique|suisse|luxembourg|allemagne|pouvez|societe|freelance|oui|non/i.test(text);
  }

  function answer(question, lang) {
    var q = question.toLowerCase();
    var hit = qa.find(function (item) { return item.keys.some(function (k) { return q.includes(k); }); });
    if (hit) return (lang === "fr" ? hit.fr : hit.en) + " " + (lang === "fr" ? companyLineFr : companyLineEn);
    return lang === "fr"
      ? "Je vais vous connecter a notre equipe: " + BOT_EMAIL + ". " + companyLineFr
      : "I will connect you with our team: " + BOT_EMAIL + ". " + companyLineEn;
  }

  function subtlePing() {
    try {
      var Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      var ctx = new Ctx();
      var o = ctx.createOscillator();
      var g = ctx.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(660, ctx.currentTime);
      g.gain.setValueAtTime(0.0001, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.02, ctx.currentTime + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      o.stop(ctx.currentTime + 0.26);
    } catch (e) {}
  }

  var wrap = document.createElement("div");
  wrap.innerHTML =
    '<button id="ta-chat-toggle" class="ta-chat-toggle" aria-label="Open chat">💬</button>' +
    '<div id="ta-chat-welcome" class="ta-chat-welcome"></div>' +
    '<section id="ta-chat-box" class="ta-chat-box">' +
    '<header class="ta-chat-header">Team Acquisition Assistant</header>' +
    '<div id="ta-chat-log" class="ta-chat-log"></div>' +
    '<div class="ta-chat-input-row">' +
    '<input id="ta-chat-input" type="text" placeholder="Ask a question..." />' +
    '<button id="ta-chat-send">Send</button>' +
    "</div></section>";
  document.body.appendChild(wrap);

  var toggle = document.getElementById("ta-chat-toggle");
  var welcome = document.getElementById("ta-chat-welcome");
  var box = document.getElementById("ta-chat-box");
  var sendBtn = document.getElementById("ta-chat-send");
  var input = document.getElementById("ta-chat-input");
  var log = document.getElementById("ta-chat-log");
  var navLang = navigator.language && navigator.language.toLowerCase().startsWith("fr") ? "fr" : "en";

  function addLine(text, who) {
    var p = document.createElement("p");
    p.className = "ta-line ta-" + who;
    p.innerHTML = "<strong>" + (who === "bot" ? "TA" : "You") + ":</strong> " + text;
    log.appendChild(p);
    log.scrollTop = log.scrollHeight;
  }

  addLine(navLang === "fr" ? "Bonjour. Team Acquisition est une entreprise enregistree. Comment puis-je aider?" : "Welcome. Team Acquisition is a registered company. How can I help?", "bot");

  toggle.addEventListener("click", function () {
    box.classList.toggle("open");
    welcome.classList.remove("show");
  });

  function submitMsg() {
    var q = (input.value || "").trim();
    if (!q) return;
    var lang = isFrench(q) ? "fr" : navLang;
    addLine(q, "user");
    addLine(answer(q, lang), "bot");
    input.value = "";
  }
  sendBtn.addEventListener("click", submitMsg);
  input.addEventListener("keydown", function (e) { if (e.key === "Enter") submitMsg(); });

  function getWelcomeMessage() {
    var lang = document.documentElement.lang === "fr" ? "fr" : "en";
    return lang === "fr"
      ? "Bonjour ! Comment puis-je accompagner votre strategie d'acquisition aujourd'hui ?"
      : "Hello! How can I assist your acquisition strategy today?";
  }

  window.setTimeout(function () {
    welcome.textContent = getWelcomeMessage();
    subtlePing();
    welcome.classList.add("show");
  }, 120000);
})();
