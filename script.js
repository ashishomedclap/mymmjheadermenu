document.addEventListener('DOMContentLoaded', function () {

    // ── Hamburger ──────────────────────────────────────────
    var ham = document.getElementById('mmjHam');
    var mob = document.getElementById('mmjMob');
    if (ham && mob) {
        ham.addEventListener('click', function () {
            ham.classList.toggle('open');
            mob.classList.toggle('open');
        });
    }

    // ── Mobile submenu toggle ──────────────────────────────
    window.mmjToggle = function (el) {
        var sub = el.nextElementSibling;
        var isOpen = sub.classList.contains('open');
        document.querySelectorAll('.mmj-mob-sub.open').forEach(function (s) { s.classList.remove('open'); });
        document.querySelectorAll('.mmj-mob-item.expanded').forEach(function (i) { i.classList.remove('expanded'); });
        if (!isOpen) { sub.classList.add('open'); el.classList.add('expanded'); }
    };

    // ── Scroll header ──────────────────────────────────────
    const header = document.querySelector('.mmj-header');
    const wrap = document.querySelector('.mmj-header-wrap');

    if (header && wrap) {
        function onScroll() {
            if (window.scrollY > 10) {
                header.classList.add('scrolled');
                wrap.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
                wrap.classList.remove('scrolled');
            }
            if (window.scrollY > 300) {
                header.classList.add('scrolled-deep');
                wrap.classList.add('scrolled-deep');
            } else {
                header.classList.remove('scrolled-deep');
                wrap.classList.remove('scrolled-deep');
            }
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    // ── Mega menu hover ────────────────────────────────────
    const trigger = document.querySelector('.has-dropdown a');
    const megaMenu = document.querySelector('.mega-menu');

    if (trigger && megaMenu) {
        let timeout;

        trigger.addEventListener('mouseenter', () => {
            clearTimeout(timeout);
            megaMenu.classList.add('show');
        });

        trigger.parentElement.addEventListener('mouseleave', () => {
            timeout = setTimeout(() => {
                megaMenu.classList.remove('show');
            }, 150);
        });

        megaMenu.addEventListener('mouseenter', () => {
            clearTimeout(timeout);
        });

        megaMenu.addEventListener('mouseleave', () => {
            megaMenu.classList.remove('show');
        });
    }

});