/**
 * children.js — KidsMarket Gallery/Children Page (5–16)
 * Handles: Firebase load, filtering, sorting, search, pagination, wishlist, modal
 */

// ─── Config ───────────────────────────────────────────────────────────────────
const ITEMS_PER_PAGE = 8;

// ─── State ────────────────────────────────────────────────────────────────────
const state = {
  allProducts:      [],
  filteredProducts: [],
  currentFilter:    'all',     // gender: all | male | female | unisex
  currentCategory:  'all',     // category dropdown
  currentSort:      'default',
  currentPage:      1,
  searchQuery:      '',
  wishlist:         new Set(JSON.parse(localStorage.getItem('km_wishlist') || '[]')),
};

// ─── Utils ────────────────────────────────────────────────────────────────────
const fmt = (n) => `₪${Number(n).toFixed(2)}`;

function saveWishlist() {
  localStorage.setItem('km_wishlist', JSON.stringify([...state.wishlist]));
}

function updateWishlistBadge() {
  const badge = document.getElementById('wishlist-count');
  if (!badge) return;
  const count = state.wishlist.size;
  badge.textContent = count;
  badge.classList.toggle('visible', count > 0);
}

function debounce(fn, delay = 300) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); };
}

// ─── Filter + Sort + Search ───────────────────────────────────────────────────
function applyFilters() {
  let result = [...state.allProducts];

  // 1. Gender filter
  if (state.currentFilter !== 'all') {
    result = result.filter(p => {
      if (Array.isArray(p.gender)) return p.gender.includes(state.currentFilter);
      return p.gender === state.currentFilter;
    });
  }

  // 2. Category filter
  if (state.currentCategory !== 'all') {
    result = result.filter(p => p.category === state.currentCategory);
  }

  // 3. Search
  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    result = result.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }

  // 4. Sort
  switch (state.currentSort) {
    case 'price-asc':  result.sort((a, b) => a.price - b.price); break;
    case 'price-desc': result.sort((a, b) => b.price - a.price); break;
    case 'name-asc':   result.sort((a, b) => a.name.localeCompare(b.name)); break;
    case 'name-desc':  result.sort((a, b) => b.name.localeCompare(a.name)); break;
    case 'new':
      result.sort((a, b) => {
        const aDate = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(0);
        const bDate = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(0);
        return bDate - aDate;
      });
      break;
    default: break;
  }

  state.filteredProducts = result;
  state.currentPage = 1;
  renderPage();
}

// ─── Render Page ──────────────────────────────────────────────────────────────
function renderPage() {
  const grid       = document.getElementById('products-grid');
  const emptyState = document.getElementById('empty-state');
  const countEl    = document.getElementById('products-count');

  const total      = state.filteredProducts.length;
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  const start      = (state.currentPage - 1) * ITEMS_PER_PAGE;
  const pageItems  = state.filteredProducts.slice(start, start + ITEMS_PER_PAGE);

  countEl.textContent = window.t ? window.t('products.showing', { n: total }) : `Showing ${total} products`;

  if (total === 0) {
    grid.innerHTML = '';
    emptyState.style.display = 'flex';
  } else {
    emptyState.style.display = 'none';
    grid.innerHTML = '';
    const frag = document.createDocumentFragment();
    pageItems.forEach((product, i) => frag.appendChild(createCard(product, i)));
    grid.appendChild(frag);
  }

  renderPagination(totalPages);
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function createCard(product, index) {
  const isWished = state.wishlist.has(product.id);
  const card     = document.createElement('article');
  card.className = 'product-card';
  card.style.animationDelay = `${index * 0.06}s`;

  const badgeHTML = product.badge
    ? `<span class="product-card__badge product-card__badge--${product.badge}">${product.badge}</span>`
    : '';

  const priceHTML = product.originalPrice
    ? `<span class="product-card__price">${fmt(product.price)}</span>
       <span class="product-card__original">${fmt(product.originalPrice)}</span>`
    : `<span class="product-card__price">${fmt(product.price)}</span>`;

  card.innerHTML = `
    <div class="product-card__image-wrap">
      ${product.photoURL
        ? `<img class="product-card__image" src="${product.photoURL}" alt="${product.name}" loading="lazy"/>`
        : `<div class="product-card__placeholder">
             <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#c0c8d8" stroke-width="1.2">
               <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.55 2.22l.79 5.66A5 5 0 007 16v6h10v-6a5 5 0 004.14-4.66l.79-5.66a2 2 0 00-1.55-2.22z"/>
             </svg>
           </div>`}
      ${badgeHTML}
      <button class="product-card__wishlist ${isWished ? 'active' : ''}" aria-label="Wishlist">
        <svg width="16" height="16" viewBox="0 0 24 24"
             fill="${isWished ? 'currentColor' : 'none'}"
             stroke="currentColor" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </button>
    </div>
    <div class="product-card__info">
      <p class="product-card__category">${product.category || ''}</p>
      <h3 class="product-card__name">${product.name || ''}</h3>
      <div class="product-card__pricing">${priceHTML}</div>
    </div>
  `;

  card.querySelector('.product-card__wishlist').addEventListener('click', (e) => {
    e.stopPropagation();
    toggleWishlist(product.id, e.currentTarget);
  });

  card.addEventListener('click', () => openModal(product));

  return card;
}

function showToast(message, type) {
  let toast = document.getElementById('wl-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'wl-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.className = `wl-toast wl-toast--${type} wl-toast--visible`;
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('wl-toast--visible'), 2200);
}

function toggleWishlist(id, btn) {
  const svg   = btn.querySelector('svg');
  const added = !state.wishlist.has(id);
  if (added) {
    state.wishlist.add(id);
    btn.classList.add('active');
    svg.setAttribute('fill', 'currentColor');
  } else {
    state.wishlist.delete(id);
    btn.classList.remove('active');
    svg.setAttribute('fill', 'none');
  }
  saveWishlist();
  updateWishlistBadge();
  btn.animate(
    [{ transform: 'scale(1)' }, { transform: 'scale(1.4)' }, { transform: 'scale(1)' }],
    { duration: 280, easing: 'ease' }
  );
  const msg = window.t
    ? window.t(added ? 'wishlist.added' : 'wishlist.removed')
    : (added ? 'Added to favourites' : 'Removed from favourites');
  showToast(msg, added ? 'add' : 'remove');
}

// ─── Pagination ───────────────────────────────────────────────────────────────
function renderPagination(totalPages) {
  const pageNumbers = document.getElementById('page-numbers');
  const prevBtn     = document.getElementById('prev-btn');
  const nextBtn     = document.getElementById('next-btn');

  pageNumbers.innerHTML = '';
  prevBtn.disabled = state.currentPage === 1;
  nextBtn.disabled = state.currentPage === totalPages || totalPages === 0;

  if (totalPages <= 1) return;

  buildPageRange(state.currentPage, totalPages).forEach(p => {
    const btn = document.createElement('button');
    if (p === '...') {
      btn.className   = 'page-btn page-btn--dots';
      btn.textContent = '...';
      btn.disabled    = true;
    } else {
      btn.className   = `page-btn ${p === state.currentPage ? 'page-btn--active' : ''}`;
      btn.textContent = p;
      btn.addEventListener('click', () => goToPage(p));
    }
    pageNumbers.appendChild(btn);
  });
}

function buildPageRange(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 3) return [1, 2, 3, '...', total];
  if (current >= total - 2) return [1, '...', total - 2, total - 1, total];
  return [1, '...', current - 1, current, current + 1, '...', total];
}

function goToPage(page) {
  state.currentPage = page;
  renderPage();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── Product Modal ────────────────────────────────────────────────────────────
function openModal(product) {
  const backdrop = document.getElementById('product-modal-backdrop');
  const photo    = document.getElementById('modal-photo');
  const noPhoto  = document.getElementById('modal-no-photo');

  // Photo
  if (product.photoURL) {
    photo.src             = product.photoURL;
    photo.style.display   = 'block';
    noPhoto.style.display = 'none';
  } else {
    photo.style.display   = 'none';
    noPhoto.style.display = 'flex';
  }

  // Category & name
  document.getElementById('modal-category').textContent = product.category || '';
  document.getElementById('modal-name').textContent     = product.name     || '';

  // Age
  const ageMap = { kids: 'Kids (0–4)', children: 'Children (5–16)' };
  document.getElementById('modal-age').textContent = ageMap[product.age] || product.age || '—';

  // Gender
  const genderMap = { male: 'Boys', female: 'Girls', unisex: 'Unisex' };
  const genders = Array.isArray(product.gender)
    ? product.gender.map(g => genderMap[g] || g).join(', ')
    : genderMap[product.gender] || product.gender || '—';
  document.getElementById('modal-gender').textContent = genders;

  // Sizes
  const sizesEl = document.getElementById('modal-sizes');
  sizesEl.innerHTML = '';
  const sizes = Array.isArray(product.sizes) ? product.sizes : [];
  sizes.forEach(s => {
    const tag       = document.createElement('span');
    tag.className   = 'product-modal__size-tag';
    tag.textContent = s;
    sizesEl.appendChild(tag);
  });

  // Pricing
  const pricingEl = document.getElementById('modal-pricing');
  if (product.originalPrice) {
    const discount = Math.round((1 - product.price / product.originalPrice) * 100);
    pricingEl.innerHTML = `
      <span class="price">${fmt(product.price)}</span>
      <span class="original">${fmt(product.originalPrice)}</span>
      <span class="discount">-${discount}%</span>
    `;
  } else {
    pricingEl.innerHTML = `<span class="price">${fmt(product.price)}</span>`;
  }

  // Description
  const descRow = document.getElementById('modal-desc-row');
  const descEl  = document.getElementById('modal-description');
  if (product.description) {
    descEl.textContent    = product.description;
    descRow.style.display = 'flex';
  } else {
    descRow.style.display = 'none';
  }

  backdrop.style.display       = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('product-modal-backdrop').style.display = 'none';
  document.body.style.overflow = '';
}

// ─── Optional auth (chip for signed-in, sign-in link for guests) ──────────────
function initOptionalAuth() {
  firebase.auth().onAuthStateChanged(function (user) {
    window.currentUser = user || null;
    const navbar = document.querySelector('.navbar');
    if (!navbar || navbar.querySelector('.auth-chip') || navbar.querySelector('.auth-signin-link')) return;

    if (user) {
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
      const chip    = document.createElement('div');
      chip.className = 'auth-chip';
      const initial  = (user.displayName || user.email || '?')[0].toUpperCase();
      const pic = user.photoURL ? Object.assign(document.createElement('img'), {
        src: user.photoURL, className: 'auth-chip__avatar', alt: user.displayName || ''
      }) : Object.assign(document.createElement('div'), {
        className: 'auth-chip__initial', textContent: initial
      });
      const btn = document.createElement('button');
      btn.className   = 'auth-chip__signout';
      btn.textContent = window.t ? window.t('nav.signOut') : 'Sign out';
      btn.addEventListener('click', () =>
        firebase.auth().signOut().then(() => { window.location.href = '/kids-market-website/pages/auth/'; })
      );
      chip.appendChild(pic);
      chip.appendChild(btn);
      const anchor = navbar.querySelector('.navbar__right') || navbar.querySelector('.navbar__wishlist');
      if (anchor) navbar.insertBefore(chip, anchor); else navbar.appendChild(chip);
    } else {
      const link = document.createElement('a');
      link.className = 'auth-signin-link';
      link.href      = '/kids-market-website/pages/auth/?r=' + encodeURIComponent(window.location.href);
      link.textContent = window.t ? window.t('nav.signIn') : 'Sign In';
      link.style.cssText = "font-size:.82rem;font-weight:700;color:#2d6cdf;text-decoration:none;padding:.35rem .75rem;border:1.5px solid #2d6cdf;border-radius:8px;white-space:nowrap;font-family:'Nunito',sans-serif";
      const anchor = navbar.querySelector('.navbar__right') || navbar.querySelector('.navbar__wishlist');
      if (anchor) navbar.insertBefore(link, anchor); else navbar.appendChild(link);
    }
  });
}

// ─── Init ─────────────────────────────────────────────────────────────────────
async function init() {
  initOptionalAuth();
  updateWishlistBadge();

  // Gender filter tabs
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('filter-tab--active'));
      tab.classList.add('filter-tab--active');
      state.currentFilter = tab.dataset.filter;
      applyFilters();
    });
  });

  // Category dropdown
  document.getElementById('category-select').addEventListener('change', (e) => {
    state.currentCategory = e.target.value;
    applyFilters();
  });

  // Sort dropdown
  document.getElementById('sort-select').addEventListener('change', (e) => {
    state.currentSort = e.target.value;
    applyFilters();
  });

  // Search
  document.getElementById('search-input').addEventListener('input', debounce((e) => {
    state.searchQuery = e.target.value.trim();
    applyFilters();
  }));

  // Pagination
  document.getElementById('prev-btn').addEventListener('click', () => goToPage(state.currentPage - 1));
  document.getElementById('next-btn').addEventListener('click', () => goToPage(state.currentPage + 1));

  // Modal close
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('product-modal-backdrop').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Load from Firebase — children only
  try {
    const snap = await db.collection('clothes').where('age', '==', 'children').get();
    state.allProducts = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error('Firebase load error:', err);
    state.allProducts = [];
  }

  applyFilters();
}

document.addEventListener('DOMContentLoaded', init);
