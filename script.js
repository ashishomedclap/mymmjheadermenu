// state data — all supported states with landing page urls
const STATE_DATA = [
  {
    name: "Arizona",
    url: "https://mymmjdoctor.com/medical-marijuana-card-arizona/",
  },
  {
    name: "Arkansas",
    url: "https://mymmjdoctor.com/medical-marijuana-card-arkansas/",
  },
  {
    name: "California",
    url: "https://mymmjdoctor.com/medical-marijuana-card-california/",
  },
  {
    name: "Connecticut",
    url: "https://mymmjdoctor.com/medical-marijuana-card-connecticut/",
  },
  {
    name: "Delaware",
    url: "https://mymmjdoctor.com/medical-marijuana-card-delaware/",
  },
  {
    name: "Florida",
    url: "https://mymmjdoctor.com/medical-marijuana-card-florida/",
  },
  {
    name: "Georgia",
    url: "https://mymmjdoctor.com/medical-marijuana-card-georgia/",
  },
  {
    name: "Illinois",
    url: "https://mymmjdoctor.com/medical-marijuana-card-illinois/",
  },
  {
    name: "Iowa",
    url: "https://mymmjdoctor.com/medical-marijuana-card-iowa/",
  },
  {
    name: "Louisiana",
    url: "https://mymmjdoctor.com/medical-marijuana-card-louisiana/",
  },
  {
    name: "Maine",
    url: "https://mymmjdoctor.com/medical-marijuana-card-maine/",
  },
  {
    name: "Maryland",
    url: "https://mymmjdoctor.com/medical-marijuana-card-maryland/",
  },
  {
    name: "Massachusetts",
    url: "https://mymmjdoctor.com/medical-marijuana-card-massachusetts/",
  },
  {
    name: "Michigan",
    url: "https://mymmjdoctor.com/medical-marijuana-card-michigan/",
  },
  {
    name: "Minnesota",
    url: "https://mymmjdoctor.com/medical-marijuana-card-minnesota/",
  },
  {
    name: "Missouri",
    url: "https://mymmjdoctor.com/medical-marijuana-card-missouri/",
  },
  {
    name: "Montana",
    url: "https://mymmjdoctor.com/medical-marijuana-card-montana/",
  },
  {
    name: "Nevada",
    url: "https://mymmjdoctor.com/medical-marijuana-card-nevada/",
  },
  {
    name: "New Jersey",
    url: "https://mymmjdoctor.com/medical-marijuana-card-new-jersey/",
  },
  {
    name: "New Mexico",
    url: "https://mymmjdoctor.com/medical-marijuana-card-new-mexico/",
  },
  {
    name: "New York",
    url: "https://mymmjdoctor.com/medical-marijuana-card-new-york/",
  },
  {
    name: "North Dakota",
    url: "https://mymmjdoctor.com/medical-marijuana-card-north-dakota/",
  },
  {
    name: "Ohio",
    url: "https://mymmjdoctor.com/medical-marijuana-card-ohio/",
  },
  {
    name: "Oklahoma",
    url: "https://mymmjdoctor.com/medical-marijuana-card-oklahoma/",
  },
  {
    name: "Pennsylvania",
    url: "https://mymmjdoctor.com/medical-marijuana-card-pennsylvania/",
  },
  {
    name: "Texas",
    url: "https://mymmjdoctor.com/medical-marijuana-card-texas/",
  },
  {
    name: "Vermont",
    url: "https://mymmjdoctor.com/medical-marijuana-card-vermont/",
  },
  {
    name: "Virginia",
    url: "https://mymmjdoctor.com/medical-marijuana-card-virginia/",
  },
  {
    name: "Washington DC",
    url: "https://mymmjdoctor.com/medical-marijuana-card-washington-dc/",
  },
  {
    name: "West Virginia",
    url: "https://mymmjdoctor.com/medical-marijuana-card-west-virginia/",
  },
];

// analytics stub — logs to console for future integration
const Analytics = {
  track(event, data = {}) {
    console.debug("[Analytics]", event, data);
  },
};

// dom references populated after domcontentloaded
let DOM = {};

// resolve and cache all needed dom elements
function resolveDom() {
  DOM = {
    siteHeader: document.getElementById("siteHeader"),
    siteWrap: document.getElementById("siteWrap"),
    menuToggle: document.getElementById("menuToggle"),
    mobileMenu: document.getElementById("mobileMenu"),
    mobileCTABtn: document.getElementById("mobileCTABtn"),
    stateToggle: document.getElementById("stateToggle"),
    stateLabel: document.getElementById("stateLabel"),
    stateDropdown: document.getElementById("stateDropdown"),
    stateSelector: document.getElementById("stateSelector"),
    stateGrid: document.getElementById("stateGrid"),
    mobileStateGrid: document.getElementById("mobileStateGrid"),
    mobileSearch: document.getElementById("mobileStateSearch"),
    // mobile contact icons element — hidden when menu opens
    mobileContactIcons: document.getElementById("mobileContactIcons"),
    navItems: document.querySelectorAll(".nav-list > li"),
    accordionItems: document.querySelectorAll("[data-accordion]"),
    btnPrimary: document.getElementById("btnPrimary"),
  };
}

// localstorage key for persisting the selected state
const LS_KEY = "mmj_selected_state";
let statesRendered = false;

// build and inject state anchor elements into desktop and mobile grids
function renderStateLinks() {
  if (statesRendered) return;
  statesRendered = true;

  // safely read previously saved state from localstorage
  const saved = (() => {
    try {
      return localStorage.getItem(LS_KEY);
    } catch {
      return null;
    }
  })();

  // factory: create a single state link element
  function buildLink(state) {
    const a = document.createElement("a");
    a.className = "state-link";
    a.href = state.url;
    a.textContent = state.name;
    a.setAttribute("role", "option");
    if (saved && state.name === saved) a.classList.add("is-saved");

    // save selection to localstorage and update button label on click
    a.addEventListener("click", () => {
      try {
        localStorage.setItem(LS_KEY, state.name);
      } catch {
        // ignore private mode storage errors
      }
      Analytics.track("state_selected", { state: state.name });
      if (DOM.stateLabel) DOM.stateLabel.textContent = state.name.toUpperCase();
    });

    return a;
  }

  // populate desktop dropdown grid
  if (DOM.stateGrid) {
    const noResult = document.createElement("span");
    noResult.className = "state-no-results";
    noResult.textContent = "No states found.";
    DOM.stateGrid.appendChild(noResult);
    STATE_DATA.forEach((s) => DOM.stateGrid.appendChild(buildLink(s)));
  }

  // populate mobile drawer grid
  if (DOM.mobileStateGrid) {
    const noResult = document.createElement("span");
    noResult.className = "state-no-results";
    noResult.textContent = "No states found.";
    DOM.mobileStateGrid.appendChild(noResult);
    STATE_DATA.forEach((s) => DOM.mobileStateGrid.appendChild(buildLink(s)));
  }

  // restore saved state label on page load
  if (saved && DOM.stateLabel) DOM.stateLabel.textContent = saved.toUpperCase();
}

// defer state rendering to browser idle time for faster initial paint
function preloadStates() {
  "requestIdleCallback" in window
    ? requestIdleCallback(renderStateLinks)
    : setTimeout(renderStateLinks, 300);
}

// filter state links by matching query text against names
function filterStateLinks(query, grid) {
  const val = query.toLowerCase().trim();
  const links = grid.querySelectorAll(".state-link");
  const noRes = grid.querySelector(".state-no-results");
  let anyShown = false;

  links.forEach((link) => {
    const match = link.textContent.toLowerCase().includes(val);
    link.style.display = match ? "flex" : "none";
    if (match) anyShown = true;
  });

  // toggle empty-state message visibility
  if (noRes) noRes.classList.toggle("is-visible", !anyShown);
}

// wire mobile state search input to filter function
function initStateSearch() {
  if (!DOM.mobileSearch || !DOM.mobileStateGrid) return;

  DOM.mobileSearch.addEventListener("input", () =>
    filterStateLinks(DOM.mobileSearch.value, DOM.mobileStateGrid),
  );
  // stop events bubbling up to accordion toggle
  DOM.mobileSearch.addEventListener("click", (e) => e.stopPropagation());
  DOM.mobileSearch.addEventListener("keydown", (e) => e.stopPropagation());
}

// raf-throttled scroll handler — toggles is-scrolled class past 10px
let scrollTicking = false;

function updateScrollState() {
  const y = window.scrollY;
  DOM.siteHeader.classList.toggle("is-scrolled", y > 10);
  DOM.siteWrap.classList.toggle("is-scrolled", y > 10);
}

function initScrollHandler() {
  window.addEventListener(
    "scroll",
    () => {
      if (!scrollTicking) {
        requestAnimationFrame(() => {
          updateScrollState();
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    },
    { passive: true },
  );

  // set correct initial state on load
  updateScrollState();
}

// open mobile drawer and animate items in with gsap stagger
function openMobileMenu() {
  DOM.mobileMenu.classList.add("is-open");
  DOM.menuToggle.classList.add("is-open");
  DOM.menuToggle.setAttribute("aria-expanded", "true");
  DOM.menuToggle.setAttribute("aria-label", "Close menu");
  DOM.mobileMenu.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  // menu-open class triggers css rule that hides mobile contact icons
  document.body.classList.add("menu-open");

  // slide-in animation for accordion rows
  if (typeof gsap !== "undefined") {
    gsap.fromTo(
      ".mobile-item",
      { opacity: 0, x: -16 },
      {
        opacity: 1,
        x: 0,
        duration: 0.26,
        stagger: 0.05,
        ease: "power2.out",
        delay: 0.04,
      },
    );
  }

  Analytics.track("mobile_menu_toggled", { state: "open" });
}

// close mobile drawer and restore body scroll
function closeMobileMenu() {
  DOM.mobileMenu.classList.remove("is-open");
  DOM.menuToggle.classList.remove("is-open");
  DOM.menuToggle.setAttribute("aria-expanded", "false");
  DOM.menuToggle.setAttribute("aria-label", "Open menu");
  DOM.mobileMenu.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  // removing menu-open class re-shows mobile contact icons via css
  document.body.classList.remove("menu-open");
  Analytics.track("mobile_menu_toggled", { state: "close" });
}

// toggle mobile drawer on hamburger click
function initHamburger() {
  DOM.menuToggle?.addEventListener("click", () => {
    DOM.mobileMenu.classList.contains("is-open")
      ? closeMobileMenu()
      : openMobileMenu();
  });
}

// mobile accordion: one open section at a time with gsap animation
function initMobileAccordion() {
  DOM.accordionItems.forEach((item) => {
    const submenu = item.nextElementSibling;

    function toggle() {
      const isOpen = submenu.classList.toggle("is-open");
      item.classList.toggle("is-expanded", isOpen);

      // animate submenu links sliding in from top
      if (isOpen && typeof gsap !== "undefined") {
        gsap.fromTo(
          submenu.querySelectorAll("a, .state-link"),
          { opacity: 0, y: -5 },
          {
            opacity: 1,
            y: 0,
            duration: 0.2,
            stagger: 0.03,
            ease: "power2.out",
          },
        );
      }
    }

    // close any other open section before toggling this one
    item.addEventListener("click", () => {
      document.querySelectorAll(".mobile-submenu.is-open").forEach((s) => {
        if (s !== submenu) {
          s.classList.remove("is-open");
          s.previousElementSibling?.classList.remove("is-expanded");
        }
      });
      toggle();
    });

    // keyboard: enter or space toggles the accordion
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        item.click();
      }
    });
  });
}

// desktop mega dropdowns: hover with delay + full keyboard nav
function initDesktopDropdowns() {
  DOM.navItems.forEach((li) => {
    const trigger = li.querySelector(".nav-trigger");
    const panel = li.querySelector(".dropdown-panel");
    if (!trigger || !panel) return;

    let timer = null;

    function open() {
      panel.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
      // stagger-animate dropdown items into view
      if (typeof gsap !== "undefined") {
        gsap.fromTo(
          panel.querySelectorAll(".dropdown-item"),
          { opacity: 0, y: 8 },
          {
            opacity: 1,
            y: 0,
            duration: 0.24,
            stagger: 0.04,
            ease: "power2.out",
            clearProps: "all",
          },
        );
      }
    }

    function close() {
      panel.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
    }

    // small delays prevent accidental open/close on fast mouse movements
    li.addEventListener("mouseenter", () => {
      clearTimeout(timer);
      timer = setTimeout(open, 140);
    });
    li.addEventListener("mouseleave", () => {
      clearTimeout(timer);
      timer = setTimeout(close, 180);
    });
    panel.addEventListener("mouseenter", () => clearTimeout(timer));
    panel.addEventListener("mouseleave", () => {
      timer = setTimeout(close, 180);
    });

    // keyboard: enter/space toggles, arrow-down opens and focuses first item
    trigger.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        trigger.getAttribute("aria-expanded") === "true" ? close() : open();
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        open();
        panel.querySelector(".dropdown-item")?.focus();
      }
      if (e.key === "Escape") {
        close();
        trigger.focus();
      }
    });

    // keyboard: arrow keys navigate between panel items
    panel.addEventListener("keydown", (e) => {
      const items = [...panel.querySelectorAll(".dropdown-item")];
      const idx = items.indexOf(document.activeElement);
      if (e.key === "ArrowDown" && idx < items.length - 1) {
        e.preventDefault();
        items[idx + 1].focus();
      }
      if (e.key === "ArrowUp" && idx > 0) {
        e.preventDefault();
        items[idx - 1].focus();
      }
      if (e.key === "Escape") {
        close();
        trigger.focus();
      }
    });
  });
}

// state selector: hover delay + keyboard navigation
function initStateSelector() {
  if (!DOM.stateToggle || !DOM.stateDropdown) return;
  let timer = null;

  function open() {
    DOM.stateDropdown.classList.add("is-open");
    DOM.stateToggle.setAttribute("aria-expanded", "true");
    // slide-in state links from the left
    if (typeof gsap !== "undefined") {
      gsap.fromTo(
        DOM.stateDropdown.querySelectorAll(".state-link"),
        { opacity: 0, x: -6 },
        {
          opacity: 1,
          x: 0,
          duration: 0.22,
          stagger: 0.016,
          ease: "power1.out",
        },
      );
    }
  }

  function close() {
    DOM.stateDropdown.classList.remove("is-open");
    DOM.stateToggle.setAttribute("aria-expanded", "false");
  }

  // hover with delay to avoid accidental triggers
  DOM.stateToggle.addEventListener("mouseenter", () => {
    clearTimeout(timer);
    timer = setTimeout(open, 140);
  });
  DOM.stateSelector?.addEventListener("mouseleave", () => {
    clearTimeout(timer);
    timer = setTimeout(close, 180);
  });
  DOM.stateDropdown.addEventListener("mouseenter", () => clearTimeout(timer));
  DOM.stateDropdown.addEventListener("mouseleave", () => {
    timer = setTimeout(close, 180);
  });

  // click toggles dropdown
  DOM.stateToggle.addEventListener("click", () =>
    DOM.stateDropdown.classList.contains("is-open") ? close() : open(),
  );

  // keyboard: arrow-down opens and focuses first link
  DOM.stateToggle.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      open();
      DOM.stateDropdown.querySelector(".state-link")?.focus();
    }
    if (e.key === "Escape") {
      close();
    }
  });

  // keyboard: arrow keys navigate visible state links
  DOM.stateDropdown.addEventListener("keydown", (e) => {
    const links = [
      ...DOM.stateDropdown.querySelectorAll('.state-link:not([style*="none"])'),
    ];
    const idx = links.indexOf(document.activeElement);
    if (e.key === "ArrowDown" && idx < links.length - 1) {
      e.preventDefault();
      links[idx + 1].focus();
    }
    if (e.key === "ArrowUp" && idx > 0) {
      e.preventDefault();
      links[idx - 1].focus();
    }
    if (e.key === "Escape") {
      close();
      DOM.stateToggle.focus();
    }
  });
}

// close open panels when user clicks outside their containers
function initOutsideClick() {
  document.addEventListener("click", (e) => {
    // close mobile drawer on outside click
    if (
      DOM.mobileMenu?.classList.contains("is-open") &&
      !e.target.closest("#siteHeader")
    ) {
      closeMobileMenu();
    }
    // close state dropdown on outside click
    if (
      DOM.stateDropdown?.classList.contains("is-open") &&
      !e.target.closest("#stateSelector")
    ) {
      DOM.stateDropdown.classList.remove("is-open");
      DOM.stateToggle?.setAttribute("aria-expanded", "false");
    }
    // close nav dropdowns on outside click
    if (!e.target.closest(".nav-list > li")) {
      document
        .querySelectorAll(".dropdown-panel.is-open")
        .forEach((p) => p.classList.remove("is-open"));
      document
        .querySelectorAll('.nav-trigger[aria-expanded="true"]')
        .forEach((t) => t.setAttribute("aria-expanded", "false"));
    }
  });
}

// close mobile drawer on leftward swipe gesture
function initSwipeClose() {
  let startX = 0,
    startY = 0;

  DOM.mobileMenu?.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    },
    { passive: true },
  );

  // close if horizontal swipe > 50px and not a vertical scroll
  DOM.mobileMenu?.addEventListener(
    "touchend",
    (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      const dy = Math.abs(e.changedTouches[0].clientY - startY);
      if (dx < -50 && dy < 60) {
        closeMobileMenu();
        Analytics.track("mobile_menu_swipe_close");
      }
    },
    { passive: true },
  );
}

// entrance animation: logo, nav, and actions fade in on load
function initEntrance() {
  if (typeof gsap === "undefined") return;

  gsap
    .timeline({ defaults: { ease: "power2.out" } })
    .fromTo(
      ".site-logo",
      { opacity: 0, x: -18 },
      { opacity: 1, x: 0, duration: 0.45 },
    )
    .fromTo(
      ".nav-trigger",
      { opacity: 0, y: -8 },
      { opacity: 1, y: 0, duration: 0.35, stagger: 0.07 },
      "-=.28",
    )
    .fromTo(
      ".header-actions",
      { opacity: 0, x: 18 },
      { opacity: 1, x: 0, duration: 0.4 },
      "-=.3",
    )
    .fromTo(
      ".top-bar",
      { opacity: 0, y: -4 },
      { opacity: 1, y: 0, duration: 0.35 },
      "<",
    );
}

// track cta button clicks via analytics stub
function initCtaTracking() {
  DOM.btnPrimary?.addEventListener("click", () =>
    Analytics.track("cta_start_evaluation_clicked"),
  );
}

// bootstrap all modules once dom is ready
document.addEventListener("DOMContentLoaded", () => {
  resolveDom();
  if (!DOM.siteHeader) return;

  preloadStates();
  initStateSearch();
  initScrollHandler();
  initHamburger();
  initMobileAccordion();
  initDesktopDropdowns();
  initStateSelector();
  initOutsideClick();
  initSwipeClose();
  initEntrance();
  initCtaTracking();
});
