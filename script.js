/**
 * header.js
 * Project: My MMJ Doctor — Header System
 * Structure:
 *   - initHamburger
 *   - initMobileMenu
 *   - initScrollHeader
 *   - initMegaMenu
 */

document.addEventListener('DOMContentLoaded', () => {
  initHamburger();
  initMobileMenu();
  initScrollHeader();
  initMegaMenu();
});


/* hamburger toggle
============================================================= */
function initHamburger() {
  const ham = document.getElementById('mmjHam');
  const mob = document.getElementById('mmjMob');

  if (!ham || !mob) return;

  ham.addEventListener('click', () => {
    const isOpen = mob.classList.toggle('open');
    ham.classList.toggle('open', isOpen);
    ham.setAttribute('aria-expanded', isOpen);
    mob.setAttribute('aria-hidden', !isOpen);
  });
}


/* mobile submenu toggle
============================================================= */
function initMobileMenu() {
  const items = document.querySelectorAll('.mmj-mob-item');

  items.forEach((item) => {
    item.addEventListener('click', (e) => {
      /* #4 — guard: don't toggle if a link inside was clicked */
      if (e.target.tagName === 'A') return;

      const targetId = item.dataset.toggle;
      const sub = document.getElementById(targetId);
      if (!sub) return;

      const isOpen = sub.classList.contains('open');

      /* close all open subs */
      document.querySelectorAll('.mmj-mob-sub.open').forEach((s) => s.classList.remove('open'));
      document.querySelectorAll('.mmj-mob-item.expanded').forEach((i) => i.classList.remove('expanded'));

      /* open clicked if it was closed */
      if (!isOpen) {
        sub.classList.add('open');
        item.classList.add('expanded');
      }
    });
  });
}


/* scroll header — throttled with rAF
============================================================= */
function initScrollHeader() {
  const header = document.querySelector('.mmj-header');
  const wrap   = document.querySelector('.mmj-header-wrap');

  if (!header || !wrap) return;

  let ticking = false;

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const y = window.scrollY;

        header.classList.toggle('scrolled', y > 10);
        wrap.classList.toggle('scrolled', y > 10);

        header.classList.toggle('scrolled-deep', y > 300);
        wrap.classList.toggle('scrolled-deep', y > 300);

        ticking = false;
      });

      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}


/* mega menu — scalable, keyboard accessible
============================================================= */
function initMegaMenu() {
  /* loop all dropdowns, not just first */
  const triggers = document.querySelectorAll('.has-dropdown > a');

  triggers.forEach((trigger) => {
    const megaMenu = document.getElementById(trigger.dataset.target);
    if (!megaMenu) return;

    let closeTimer;

    const open = () => {
      clearTimeout(closeTimer);
      megaMenu.classList.add('show');
      trigger.setAttribute('aria-expanded', 'true');
    };

    const close = () => {
      closeTimer = setTimeout(() => {
        megaMenu.classList.remove('show');
        trigger.setAttribute('aria-expanded', 'false');
      }, 150);
    };

    /* mouse */
    trigger.addEventListener('mouseenter', open);

    /* use .closest() for stable mouseleave — avoids fast-cursor flicker */
    const parent = trigger.closest('.has-dropdown');
    parent.addEventListener('mouseleave', close);

    megaMenu.addEventListener('mouseenter', () => clearTimeout(closeTimer));
    megaMenu.addEventListener('mouseleave', close);

    /* keyboard: focus / blur */
    trigger.addEventListener('focus', open);
    trigger.addEventListener('blur', close);

    /* keyboard: Enter / Space toggles */
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        megaMenu.classList.toggle('show');
        trigger.setAttribute('aria-expanded', megaMenu.classList.contains('show'));
      }
    });
  });

  /* Escape key closes all open mega menus */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.mmj-mega-menu.show').forEach((menu) => {
        menu.classList.remove('show');
      });
      document.querySelectorAll('.has-dropdown > a').forEach((t) => {
        t.setAttribute('aria-expanded', 'false');
      });
    }
  });

  /* click outside closes all open mega menus */
  document.addEventListener('click', (e) => {
    document.querySelectorAll('.mmj-mega-menu.show').forEach((menu) => {
      const wrapper = menu.closest('.mmj-states-menu-wrapper');
      if (wrapper && !wrapper.contains(e.target)) {
        menu.classList.remove('show');
        const t = wrapper.querySelector('.has-dropdown > a');
        if (t) t.setAttribute('aria-expanded', 'false');
      }
    });
  });
}