/**
 * gallery.js — KidsMarket Gallery Page
 * Handles: trending products render, wishlist, Firebase data loading
 *
 * In full project, Firebase services come from:
 *   import { ClothService } from '/shared/js/firebase/firestore.service.js';
 *
 * For now, uses mock data so the page works standalone.
 */
import { db } from '/shared/js/firebase/firebase.config.js';
import { collection, query, orderBy, limit, getDocs } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';
// ─── Mock data (replace with Firebase call) ─────────────────────────────────
const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Organic Cotton Overalls',
    category: 'Baby (0–4)',
    categorySlug: 'kids',
    price: 32.00,
    originalPrice: 48.00,
    badge: 'sale',
    image: null,
    color: '#c8daf7',
  },
  {
    id: '2',
    name: 'Rainproof Parka',
    category: 'Kids (5–16)',
    categorySlug: 'children',
    price: 54.00,
    originalPrice: null,
    badge: null,
    image: null,
    color: '#fde8b0',
  },
  {
    id: '3',
    name: 'Retro Runner Sneakers',
    category: 'Footwear',
    categorySlug: 'kids',
    price: 42.00,
    originalPrice: null,
    badge: 'new',
    image: null,
    color: '#ffd5d5',
  },
  {
    id: '4',
    name: 'Sage Knit Cardigan',
    category: 'Baby (0–4)',
    categorySlug: 'kids',
    price: 38.00,
    originalPrice: null,
    badge: null,
    image: null,
    color: '#d4edda',
  },
];

// ─── State ────────────────────────────────────────────────────────────────────
const state = {
  wishlist: new Set(JSON.parse(localStorage.getItem('km_wishlist') || '[]')),
};

// ─── Utils ───────────────────────────────────────────────────────────────────
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function formatPrice(n) {
  return `$${n.toFixed(2)}`;
}

function saveWishlist() {
  localStorage.setItem('km_wishlist', JSON.stringify([...state.wishlist]));
}

function updateWishlistCount() {
  const count = state.wishlist.size;
  const badge = $('#wishlist-count');
  if (!badge) return;
  badge.textContent = count;
  badge.classList.toggle('visible', count > 0);
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function createProductCard(product, index) {
  const isWishlisted = state.wishlist.has(product.id);

  const card = document.createElement('article');
  card.className = 'product-card';
  card.style.animationDelay = `${index * 0.07}s`;
  card.dataset.productId = product.id;

  // Badge HTML
  const badgeHTML = product.badge
    ? `<span class="product-card__badge product-card__badge--${product.badge}">${product.badge}</span>`
    : '';

  // Price HTML
  const priceHTML = product.originalPrice
    ? `<span class="product-card__price">${formatPrice(product.price)}</span>
       <span class="product-card__original">${formatPrice(product.originalPrice)}</span>`
    : `<span class="product-card__price">${formatPrice(product.price)}</span>`;

  // Image or placeholder
  const imageHTML = product.image
    ? `<img class="product-card__image" src="${product.image}" alt="${product.name}" loading="lazy" />`
    : `<div class="product-card__image-placeholder" style="background:${product.color}80;">
         <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="${product.color}" stroke-width="1.5">
           <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.55 2.22l.79 5.66A5 5 0 007 16v6h10v-6a5 5 0 004.14-4.66l.79-5.66a2 2 0 00-1.55-2.22z"/>
         </svg>
       </div>`;

  card.innerHTML = `
    <div class="product-card__image-wrap">
      ${imageHTML}
      ${badgeHTML}
      <button class="product-card__wishlist ${isWishlisted ? 'active' : ''}"
              aria-label="Add to wishlist"
              data-id="${product.id}">
        <svg width="16" height="16" viewBox="0 0 24 24"
             fill="${isWishlisted ? 'currentColor' : 'none'}"
             stroke="currentColor" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </button>
    </div>
    <div class="product-card__info">
      <p class="product-card__category">${product.category}</p>
      <h3 class="product-card__name">${product.name}</h3>
      <div class="product-card__pricing">${priceHTML}</div>
    </div>
  `;

  // Wishlist toggle
  const wishBtn = card.querySelector('.product-card__wishlist');
  wishBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id, wishBtn);
  });

  // Navigate to product (future)
  card.addEventListener('click', () => {
    console.log('Navigate to product:', product.id);
    // window.location.href = `/pages/product/${product.id}/`;
  });

  return card;
}

function toggleWishlist(id, btn) {
  const svg = btn.querySelector('svg');
  if (state.wishlist.has(id)) {
    state.wishlist.delete(id);
    btn.classList.remove('active');
    svg.setAttribute('fill', 'none');
  } else {
    state.wishlist.add(id);
    btn.classList.add('active');
    svg.setAttribute('fill', 'currentColor');
  }
  saveWishlist();
  updateWishlistCount();

  // Micro-animation
  btn.animate(
    [{ transform: 'scale(1)' }, { transform: 'scale(1.35)' }, { transform: 'scale(1)' }],
    { duration: 280, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }
  );
}

// ─── Render Products ─────────────────────────────────────────────────────────
async function renderTrendingProducts() {
  const grid = $('#products-grid');
  if (!grid) return;

  // Show skeletons — already in HTML, just wait a moment to simulate fetch
  await new Promise(r => setTimeout(r, 600));

  // ── In real project, replace above with: ──────────────────────────────────
  // import { ClothService } from '/shared/js/firebase/firestore.service.js';
  // const products = await ClothService.getTrending(4);
  // ─────────────────────────────────────────────────────────────────────────

  const q    = query(collection(db, 'clothes'), orderBy('createdAt', 'desc'), limit(4));
  const snap = await getDocs(q);
  const products = snap.docs.map(d => ({ id: d.id, ...d.data() }));

  // Clear skeletons
  grid.innerHTML = '';

  if (!products.length) {
    grid.innerHTML = '<p class="empty-state">No products found.</p>';
    return;
  }

  const fragment = document.createDocumentFragment();
  products.forEach((product, i) => {
    fragment.appendChild(createProductCard(product, i));
  });
  grid.appendChild(fragment);
}

// ─── Init ─────────────────────────────────────────────────────────────────────
function init() {
  updateWishlistCount();
  renderTrendingProducts();

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', init);

// ─── Firebase integration stub ───────────────────────────────────────────────
// When Firebase is connected, replace MOCK_PRODUCTS fetch with:
//
// import { db } from '/shared/js/firebase/firebase.config.js';
// import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
//
// async function fetchTrending(count = 4) {
//   const q = query(collection(db, 'clothes'), orderBy('createdAt', 'desc'), limit(count));
//   const snap = await getDocs(q);
//   return snap.docs.map(d => ({ id: d.id, ...d.data() }));
// }
