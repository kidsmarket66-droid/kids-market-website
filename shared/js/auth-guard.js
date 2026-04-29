/**
 * auth-guard.js — KidsMarket route protection
 *
 * Load AFTER firebase-app-compat.js and firebase.config.js, BEFORE page script.
 *
 * Any signed-in user:
 *   <script src="/shared/js/auth-guard.js"></script>
 *
 * Admin only:
 *   <script src="/shared/js/auth-guard.js" data-admin="true"></script>
 */
(function () {
  const ADMIN_EMAILS = [
    'faresayman12316@gmail.com',
    'kids.market66@gmail.com',
  ];

  // Capture before async callbacks clear currentScript
  const thisScript = document.currentScript;
  const adminOnly  = thisScript && thisScript.dataset.admin === 'true';

  // Hide the page immediately to prevent flash of protected content
  document.documentElement.style.visibility = 'hidden';

  firebase.auth().onAuthStateChanged(function (user) {
    if (!user) {
      document.documentElement.style.visibility = 'visible';
      window.location.replace(
        '/kids-market-website/pages/auth/?r=' + encodeURIComponent(window.location.href)
      );
      return;
    }

    if (adminOnly && !ADMIN_EMAILS.includes(user.email)) {
      document.documentElement.style.visibility = 'visible';
      window.location.replace('/kids-market-website/pages/gallery/');
      return;
    }

    // Authorised — reveal page and expose user globally
    document.documentElement.style.visibility = 'visible';
    window.currentUser = user;

    // Inject user chip into navbar once DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { injectChip(user); });
    } else {
      injectChip(user);
    }
  });

  // ── User chip (avatar + sign-out) ────────────────────────────────────────
  function injectChip(user) {
    const navbar = document.querySelector('.navbar');
    if (!navbar || navbar.querySelector('.auth-chip')) return;

    // Inject styles once
    if (!document.getElementById('_auth_chip_css')) {
      const s = document.createElement('style');
      s.id = '_auth_chip_css';
      s.textContent = `
        .auth-chip{display:flex;align-items:center;gap:.5rem;flex-shrink:0}
        .auth-chip__avatar{width:30px;height:30px;border-radius:50%;object-fit:cover;border:2px solid #e8eaf0}
        .auth-chip__initial{width:30px;height:30px;border-radius:50%;background:#2d6cdf;color:#fff;font-size:.8rem;font-weight:800;display:flex;align-items:center;justify-content:center;font-family:'Nunito',sans-serif}
        .auth-chip__signout{font-size:.75rem;font-weight:700;color:#6b7280;background:none;border:none;cursor:pointer;padding:.3rem .6rem;border-radius:6px;transition:color .2s,background .2s;font-family:'Nunito',sans-serif;white-space:nowrap}
        .auth-chip__signout:hover{color:#e74c3c;background:rgba(231,76,60,.08)}
      `;
      document.head.appendChild(s);
    }

    const chip = document.createElement('div');
    chip.className = 'auth-chip';

    const initial = (user.displayName || user.email || '?')[0].toUpperCase();
    const pic = document.createElement(user.photoURL ? 'img' : 'div');
    if (user.photoURL) {
      pic.src       = user.photoURL;
      pic.className = 'auth-chip__avatar';
      pic.alt       = user.displayName || '';
    } else {
      pic.className   = 'auth-chip__initial';
      pic.textContent = initial;
    }

    const btn = document.createElement('button');
    btn.className   = 'auth-chip__signout';
    btn.textContent = (window.t ? window.t('nav.signOut') : 'Sign out');
    btn.addEventListener('click', function () {
      firebase.auth().signOut().then(function () {
        window.location.href = '/kids-market-website/pages/auth/';
      });
    });

    chip.appendChild(pic);
    chip.appendChild(btn);

    // Insert before wishlist link / navbar__right, or at end
    const anchor = navbar.querySelector('.navbar__right') || navbar.querySelector('.navbar__wishlist');
    if (anchor) navbar.insertBefore(chip, anchor);
    else        navbar.appendChild(chip);
  }
})();
