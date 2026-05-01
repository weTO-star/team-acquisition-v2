(function () {
  function initReveal() {
    var targets = Array.prototype.slice.call(document.querySelectorAll("main section, .gateway-card, .card"));
    targets.forEach(function (el) {
      el.classList.add("reveal-on-scroll");
    });

    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    targets.forEach(function (el) { obs.observe(el); });
  }

  function initCookieBanner() {
    var key = "ta_cookie_choice";
    if (localStorage.getItem(key)) return;

    var banner = document.createElement("div");
    banner.className = "cookie-banner";
    banner.innerHTML =
      '<p>We use cookies to improve your experience and analytics.</p>' +
      '<div class="cookie-actions">' +
      '<button type="button" class="btn btn-gold cookie-accept">Accept</button>' +
      '<button type="button" class="btn btn-outline cookie-decline">Decline</button>' +
      "</div>";
    document.body.appendChild(banner);

    function save(choice) {
      localStorage.setItem(key, choice);
      banner.remove();
    }
    banner.querySelector(".cookie-accept").addEventListener("click", function () { save("accepted"); });
    banner.querySelector(".cookie-decline").addEventListener("click", function () { save("declined"); });
  }

  initReveal();
  initCookieBanner();
})();
