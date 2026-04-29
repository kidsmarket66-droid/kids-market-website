/**
 * gallery.js — KidsMarket Gallery Page
 * Handles: trending products render, wishlist, Firebase data loading
 *
 * In full project, Firebase services come from:
 *   import { ClothService } from '/shared/js/firebase/firestore.service.js';
 *
 * For now, uses mock data so the page works standalone.
 */
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
  const imageHTML = product.photoURL
    ? `<img class="product-card__image" src="${product.photoURL}" alt="${product.name}" loading="lazy" />`
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

  card.addEventListener('click', () => openModal(product));

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

// ─── Modal ───────────────────────────────────────────────────────────────────
function openModal(product) {
  const backdrop = document.getElementById('product-modal-backdrop');
  const photo    = document.getElementById('modal-photo');
  const noPhoto  = document.getElementById('modal-no-photo');

  if (product.photoURL) {
    photo.src             = product.photoURL;
    photo.style.display   = 'block';
    noPhoto.style.display = 'none';
  } else {
    photo.style.display   = 'none';
    noPhoto.style.display = 'flex';
  }

  document.getElementById('modal-category').textContent = product.category || '';
  document.getElementById('modal-name').textContent     = product.name     || '';

  const ageMap = { kids: 'Kids (0–4)', children: 'Children (5–16)' };
  document.getElementById('modal-age').textContent = ageMap[product.age] || product.age || '—';

  const genderMap = { male: 'Boys', female: 'Girls', unisex: 'Unisex' };
  const genders = Array.isArray(product.gender)
    ? product.gender.map(g => genderMap[g] || g).join(', ')
    : genderMap[product.gender] || product.gender || '—';
  document.getElementById('modal-gender').textContent = genders;

  const sizesEl = document.getElementById('modal-sizes');
  sizesEl.innerHTML = '';
  (Array.isArray(product.sizes) ? product.sizes : []).forEach(s => {
    const tag       = document.createElement('span');
    tag.className   = 'product-modal__size-tag';
    tag.textContent = s;
    sizesEl.appendChild(tag);
  });

  const pricingEl = document.getElementById('modal-pricing');
  if (product.originalPrice) {
    const discount = Math.round((1 - product.price / product.originalPrice) * 100);
    pricingEl.innerHTML = `
      <span class="price">${formatPrice(product.price)}</span>
      <span class="original">${formatPrice(product.originalPrice)}</span>
      <span class="discount">-${discount}%</span>
    `;
  } else {
    pricingEl.innerHTML = `<span class="price">${formatPrice(product.price)}</span>`;
  }

  const descRow = document.getElementById('modal-desc-row');
  const descEl  = document.getElementById('modal-description');
  if (product.description) {
    descEl.textContent    = product.description;
    descRow.style.display = 'flex';
  } else {
    descRow.style.display = 'none';
  }

  backdrop.style.display        = 'flex';
  document.body.style.overflow  = 'hidden';
}

function closeModal() {
  document.getElementById('product-modal-backdrop').style.display = 'none';
  document.body.style.overflow = '';
}

// ─── Render Products ─────────────────────────────────────────────────────────
async function renderTrendingProducts() {
  const grid = $('#products-grid');
  if (!grid) return;

  try {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const snap = await window.db
      .collection('clothes')
      .where('createdAt', '>=', sevenDaysAgo)
      .orderBy('createdAt', 'desc')
      .get();

    const products = snap.docs.map(d => ({ id: d.id, ...d.data() }));

    grid.innerHTML = '';

    if (!products.length) {
      grid.innerHTML = '<p class="empty-state">No new arrivals in the last 7 days.</p>';
      return;
    }

    const fragment = document.createDocumentFragment();
    products.forEach((product, i) => {
      fragment.appendChild(createProductCard(product, i));
    });
    grid.appendChild(fragment);
  } catch (err) {
    grid.innerHTML = '<p class="empty-state">Failed to load products.</p>';
    console.error('renderTrendingProducts:', err);
  }
}

// ─── Init ─────────────────────────────────────────────────────────────────────
function init() {
  updateWishlistCount();
  renderTrendingProducts();

  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('product-modal-backdrop').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

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

