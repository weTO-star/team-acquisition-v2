(function () {
  var langKey = "ta_lang";
  var themeKey = "ta_theme";
  var page = document.body.getAttribute("data-page") || "index";

  var translations = {
    index: {
      en: {
        nav_partner: "Partner",
        nav_investor: "Investor",
        nav_login: "Login",
        brand_sub: "Strategic Growth Platform",
        hero_title: "Team Acquisition",
        hero_sub: "A sales strike force. Two ways to join.",
        card_partner_title: "Become a partner",
        card_partner_desc: "You are a European company? We build strategic outbound momentum and secure exclusive B2B opportunities.",
        card_partner_cta: "Become a partner →",
        card_investor_title: "Become an investor",
        card_investor_desc: "Looking for accelerated returns and equity exposure in a structured industrialization project?",
        card_investor_cta: "Become an investor →",
        footer_company: "Team Acquisition | Registered company in Madagascar"
      },
      fr: {
        nav_partner: "Partenaire",
        nav_investor: "Investisseur",
        nav_login: "Connexion",
        brand_sub: "Plateforme de croissance strategique",
        hero_title: "Team Acquisition",
        hero_sub: "Une strike force commerciale. Deux facons de nous rejoindre.",
        card_partner_title: "Devenir partenaire",
        card_partner_desc: "Vous etes une entreprise europeenne ? Nous accelerons votre outbound strategique et ouvrons des opportunites B2B exclusives.",
        card_partner_cta: "Devenir partenaire →",
        card_investor_title: "Devenir investisseur",
        card_investor_desc: "Vous cherchez un rendement accelere et une exposition en equity sur un projet d'industrialisation structure ?",
        card_investor_cta: "Devenir investisseur →",
        footer_company: "Team Acquisition | Entreprise enregistree a Madagascar"
      }
    },
    partenaire: {
      en: {
        nav_home: "Home",
        nav_investor: "Investors",
        nav_login: "Login",
        brand_sub: "Partner Platform",
        badge_1: "Premium",
        badge_2: "Company",
        badge_3: "Strategic Strike Force",
        hero_title: "Join an Elite Strategic Sales Strike Force",
        hero_sub: "Team Acquisition is a registered company in Madagascar. Becoming a partner means becoming a premium client with a formal contract after project validation.",
        model_title: "Fixed + Variable engagement model",
        model_desc: "Our model aligns our interests with your growth. We combine a solid strategic base (Fixed) with performance-driven incentives (Variable), ensuring a win-win partnership focused on tangible ROI.",
        hero_cta_primary: "Start partner discussion",
        hero_cta_secondary: "Explore activation journey",
        journey_title: "The Strategic Activation Journey",
        j1_title: "Strategy Alignment",
        j1_desc: "We structure your business scope, targeting criteria, and strategic priorities for precision execution.",
        j2_title: "Lead Generation Activation",
        j2_desc: "We activate a premium outbound engine powered by qualified data and executive-grade messaging.",
        j3_title: "Strategic Sales Strike",
        j3_desc: "Disciplined multichannel campaigns convert key accounts into high-value decision conversations.",
        j4_title: "Shared Growth & Success",
        j4_desc: "Continuous optimization transforms acquisition into a durable, measurable growth advantage.",
        sec_illus_title: "Data + Human Precision",
        sec_illus_desc: "Technology and human expertise combine to deliver strategic consistency, clarity, and control.",
        form_title: "Partner Application",
        f_name: "Full name",
        f_company: "Company name",
        f_email: "Professional email",
        f_phone: "Phone number",
        f_need: "Main objective",
        f_need_opt0: "Select",
        f_need_opt1: "Strategic growth acceleration",
        f_need_opt2: "European market expansion",
        f_need_opt3: "Sales strike force setup",
        f_target: "Describe your target clients",
        f_consent_company: "I understand Team Acquisition is a company, not a freelancer.",
        f_consent_gdpr: "I consent to data processing (GDPR compliant).",
        f_submit: "Send my request - strategic consultation",
        footer_company: "Team Acquisition | Registered company in Madagascar",
        sitemap_home: "Home",
        sitemap_partner: "Partner",
        sitemap_investors: "Investors",
        sitemap_login: "Login"
      },
      fr: {
        nav_home: "Accueil",
        nav_investor: "Investisseurs",
        nav_login: "Connexion",
        brand_sub: "Plateforme Partenaire",
        badge_1: "Premium",
        badge_2: "Entreprise",
        badge_3: "Force de frappe stratégique",
        hero_title: "Rejoignez une force commerciale stratégique d'élite",
        hero_sub: "Team Acquisition est une entreprise enregistrée à Madagascar. Devenir partenaire signifie devenir un client premium et, après validation du projet, un contrat formel encadre la collaboration.",
        model_title: "Modèle d'engagement Fixed + Variable",
        model_desc: "Notre modèle aligne nos intérêts avec votre croissance. Nous combinons une base stratégique solide (Fixed) avec des incitations orientées performance (Variable), afin de créer un partenariat gagnant-gagnant centré sur un ROI tangible.",
        hero_cta_primary: "Démarrer une discussion partenaire",
        hero_cta_secondary: "Explorer le parcours d'activation",
        journey_title: "Parcours Partenaire - Exécution Continue",
        j1_title: "Alignement Stratégique",
        j1_desc: "Nous structurons le cadrage business, les critères de ciblage et les priorités d'acquisition.",
        j2_title: "Activation Lead Generation",
        j2_desc: "Nous activons un moteur outbound premium, alimenté par une data qualifiée et un messaging de haut niveau.",
        j3_title: "Sales Strike Orchestrée",
        j3_desc: "Des campagnes multicanales disciplinées transforment les comptes cibles en conversations décisionnelles.",
        j4_title: "Croissance Partagée",
        j4_desc: "L'optimisation continue transforme l'acquisition en avantage durable et mesurable.",
        sec_illus_title: "Data + Human Precision",
        sec_illus_desc: "Technologie et expertise humaine s'alignent pour une exécution stratégique rigoureuse et fiable.",
        form_title: "Demande de partenariat",
        f_name: "Nom complet",
        f_company: "Entreprise",
        f_email: "Email professionnel",
        f_phone: "Téléphone",
        f_need: "Objectif principal",
        f_need_opt0: "Sélectionner",
        f_need_opt1: "Accélération stratégique",
        f_need_opt2: "Expansion européenne",
        f_need_opt3: "Mise en place d'une strike force commerciale",
        f_target: "Décrivez vos clients cibles",
        f_consent_company: "Je comprends que Team Acquisition est une entreprise, et non un freelance.",
        f_consent_gdpr: "Je consens au traitement des données (conformité RGPD).",
        f_submit: "Envoyer ma demande - consultation stratégique",
        footer_company: "Team Acquisition | Entreprise enregistrée à Madagascar",
        sitemap_home: "Accueil",
        sitemap_partner: "Partenaire",
        sitemap_investors: "Investisseurs",
        sitemap_login: "Connexion"
      }
    },
    investors: {
      en: {
        nav_home: "Home",
        nav_partner: "Partner",
        nav_login: "Login",
        brand_sub: "Investor Platform",
        b1: "Premium",
        b2: "Company",
        b3: "ROI-Focused",
        hero_title: "Co-Invest in Sales Outsourcing Industrialization",
        hero_sub: "Team Acquisition is a registered legal entity in Madagascar, opening strategic investment access with structured governance and data-backed operations.",
        hero_cta_1: "Request due-diligence package",
        hero_cta_2: "Schedule a strategic call",
        op_title: "Why This Opportunity",
        op_a: "Strong market demand from European B2B operators seeking efficient growth execution.",
        op_b: "Industrial operating model designed for repeatability, control, and measurable outcomes.",
        op_c: "Infrastructure and talent strategy focused on durable margin performance.",
        sec_title: "Governance & Security",
        sec_desc: "Company-level governance, legal documentation, auditable books, and structured investor communication are core to the platform.",
        form_title: "Investor Expression of Interest",
        f_name: "Full name",
        f_email: "Email",
        f_phone: "Phone",
        f_type: "Investor type",
        f_type_0: "Select",
        f_type_1: "Angel",
        f_type_2: "Fund",
        f_type_3: "Family office",
        f_type_4: "Other",
        f_amount: "Investment range",
        f_amount_0: "Select",
        f_amount_1: "EUR24,700",
        f_amount_2: "EUR49,400",
        f_amount_3: "Custom amount",
        f_msg: "Message",
        f_consent: "I consent to data processing and understand Team Acquisition is a company, not a freelancer.",
        f_submit: "Request due-diligence package",
        footer_company: "Team Acquisition | Registered Malagasy company"
      },
      fr: {
        nav_home: "Accueil",
        nav_partner: "Partenaire",
        nav_login: "Connexion",
        brand_sub: "Plateforme Investisseur",
        b1: "Premium",
        b2: "Entreprise",
        b3: "Oriente ROI",
        hero_title: "Co-investissez dans l'industrialisation du sales outsourcing",
        hero_sub: "Team Acquisition est une entite legale enregistree a Madagascar, ouvrant un acces investisseur structure avec gouvernance et operations pilotees par la data.",
        hero_cta_1: "Demander le package de due diligence",
        hero_cta_2: "Planifier un appel strategique",
        op_title: "Pourquoi cette opportunite",
        op_a: "Forte demande des operateurs B2B europeens pour une execution de croissance efficace.",
        op_b: "Modele industriel concu pour la repetition, le controle et des resultats mesurables.",
        op_c: "Infrastructure et strategie talent centrees sur une marge durable.",
        sec_title: "Gouvernance & Securite",
        sec_desc: "Gouvernance d'entreprise, documents legaux, comptabilite auditable et communication investisseur structuree.",
        form_title: "Manifestation d'interet investisseur",
        f_name: "Nom complet",
        f_email: "Email",
        f_phone: "Telephone",
        f_type: "Type d'investisseur",
        f_type_0: "Selectionner",
        f_type_1: "Business Angel",
        f_type_2: "Fonds",
        f_type_3: "Family office",
        f_type_4: "Autre",
        f_amount: "Montant d'investissement",
        f_amount_0: "Selectionner",
        f_amount_1: "24 700 EUR",
        f_amount_2: "49 400 EUR",
        f_amount_3: "Montant personnalise",
        f_msg: "Message",
        f_consent: "Je consens au traitement des donnees et je comprends que Team Acquisition est une entreprise, pas un freelance.",
        f_submit: "Demander le package de due diligence",
        footer_company: "Team Acquisition | Entreprise malgache enregistree"
      }
    },
    login: {
      en: {
        nav_home: "Home",
        nav_partner: "Partner",
        nav_investor: "Investor",
        brand_sub: "Partner Access",
        hero_title: "Partner Login",
        hero_sub: "Secure access to your strategic workspace.",
        f_email: "Email",
        f_password: "Password",
        remember: "Remember me",
        forgot: "Forgot password?",
        login_btn: "Partner Access",
        linkedin_btn: "Login with LinkedIn",
        create_btn: "Create an account",
        footer_company: "Team Acquisition | Registered company in Madagascar"
      },
      fr: {
        nav_home: "Accueil",
        nav_partner: "Partenaire",
        nav_investor: "Investisseur",
        brand_sub: "Acces Partenaire",
        hero_title: "Connexion Partenaire",
        hero_sub: "Acces securise a votre espace strategique.",
        f_email: "Email",
        f_password: "Mot de passe",
        remember: "Se souvenir de moi",
        forgot: "Mot de passe oublie ?",
        login_btn: "Acces Partenaire",
        linkedin_btn: "Connexion avec LinkedIn",
        create_btn: "Creer un compte",
        footer_company: "Team Acquisition | Entreprise enregistree a Madagascar"
      }
    }
  };

  function getLang() {
    return localStorage.getItem(langKey) || "en";
  }
  function setLang(lang) {
    localStorage.setItem(langKey, lang);
    applyTranslations(lang);
  }

  function getTheme() {
    return localStorage.getItem(themeKey) || "dark";
  }
  function setTheme(theme) {
    localStorage.setItem(themeKey, theme);
    document.documentElement.setAttribute("data-theme", theme);
    var tBtn = document.getElementById("themeToggle");
    if (tBtn) tBtn.textContent = theme === "dark" ? "Dark 🌙" : "Light ☀️";
  }

  function applyTranslations(lang) {
    var dict = (translations[page] && translations[page][lang]) || {};
    document.documentElement.lang = lang;
    var nodes = document.querySelectorAll("[data-i18n]");
    nodes.forEach(function (node) {
      var key = node.getAttribute("data-i18n");
      if (dict[key]) node.textContent = dict[key];
    });
    var placeholders = document.querySelectorAll("[data-i18n-placeholder]");
    placeholders.forEach(function (node) {
      var key = node.getAttribute("data-i18n-placeholder");
      if (dict[key]) node.setAttribute("placeholder", dict[key]);
    });
    var lBtn = document.getElementById("langToggle");
    if (lBtn) lBtn.textContent = lang === "en" ? "EN / FR" : "FR / EN";
  }

  function initStarfield() {
    var canvas = document.getElementById("starfield");
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    var stars = [];
    var width = 0;
    var height = 0;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      stars = Array.from({ length: Math.max(80, Math.floor((width * height) / 14000)) }, function () {
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.35 + 0.3,
          s: Math.random() * 0.25 + 0.08
        };
      });
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      var isLight = document.documentElement.getAttribute("data-theme") === "light";
      ctx.fillStyle = isLight ? "rgba(10,37,74,0.45)" : "rgba(212,175,55,0.65)";

      for (var i = 0; i < stars.length; i++) {
        var st = stars[i];
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
        ctx.fill();
        st.y += st.s;
        st.x += Math.sin(st.y * 0.003) * 0.08;
        if (st.y > height + 3) st.y = -2;
        if (st.x > width + 3) st.x = -2;
      }
      requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    draw();
  }

  function initReveal() {
    var targets = Array.prototype.slice.call(document.querySelectorAll("main section, .card"));
    targets.forEach(function (el) { el.classList.add("reveal-on-scroll"); });
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    targets.forEach(function (el) { obs.observe(el); });
  }

  function initCookie() {
    var key = "ta_cookie_choice";
    if (localStorage.getItem(key)) return;
    var banner = document.createElement("div");
    banner.className = "cookie-banner";
    banner.innerHTML =
      '<p data-i18n-cookie>Cookies are used for experience and analytics.</p>' +
      '<div class="cookie-actions">' +
      '<button type="button" class="btn btn-primary cookie-accept">Accept</button>' +
      '<button type="button" class="btn btn-secondary cookie-decline">Decline</button>' +
      "</div>";
    document.body.appendChild(banner);
    banner.querySelector(".cookie-accept").addEventListener("click", function () {
      localStorage.setItem(key, "accepted");
      banner.remove();
    });
    banner.querySelector(".cookie-decline").addEventListener("click", function () {
      localStorage.setItem(key, "declined");
      banner.remove();
    });
  }

  function initToggles() {
    var lang = getLang();
    var theme = getTheme();
    setTheme(theme);
    applyTranslations(lang);

    var lBtn = document.getElementById("langToggle");
    if (lBtn) {
      lBtn.addEventListener("click", function () {
        setLang(getLang() === "en" ? "fr" : "en");
      });
    }
    var tBtn = document.getElementById("themeToggle");
    if (tBtn) {
      tBtn.addEventListener("click", function () {
        setTheme(getTheme() === "dark" ? "light" : "dark");
      });
    }
  }

  function initMisc() {
    var y = document.getElementById("year");
    if (y) y.textContent = String(new Date().getFullYear());
    document.body.classList.add("page-ready");
  }

  initStarfield();
  initToggles();
  initReveal();
  initCookie();
  initMisc();
})();
