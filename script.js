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
    item.addEventListener('click', () => {
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


/* scroll header
============================================================= */
function initScrollHeader() {
  const header = document.querySelector('.mmj-header');
  const wrap   = document.querySelector('.mmj-header-wrap');

  if (!header || !wrap) return;

  function onScroll() {
    const y = window.scrollY;

    header.classList.toggle('scrolled', y > 10);
    wrap.classList.toggle('scrolled', y > 10);

    header.classList.toggle('scrolled-deep', y > 300);
    wrap.classList.toggle('scrolled-deep', y > 300);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}


/* mega menu (state selector)
============================================================= */
function initMegaMenu() {
  const trigger  = document.querySelector('.has-dropdown a');
  const megaMenu = document.querySelector('.mmj-mega-menu');

  if (!trigger || !megaMenu) return;

  let closeTimer;

  const open  = () => { clearTimeout(closeTimer); megaMenu.classList.add('show'); trigger.setAttribute('aria-expanded', 'true'); };
  const close = () => { closeTimer = setTimeout(() => { megaMenu.classList.remove('show'); trigger.setAttribute('aria-expanded', 'false'); }, 150); };

  trigger.addEventListener('mouseenter', open);
  trigger.parentElement.addEventListener('mouseleave', close);
  megaMenu.addEventListener('mouseenter', () => clearTimeout(closeTimer));
  megaMenu.addEventListener('mouseleave', () => { megaMenu.classList.remove('show'); trigger.setAttribute('aria-expanded', 'false'); });
}