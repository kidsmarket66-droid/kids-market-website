/**
 * manager.js — KidsMarket Manager Page
 * Handles: product listing, filtering (age/gender/category), search, pagination, delete
 *
 * Firebase replacement:
 *   import { ClothService } from '/shared/js/firebase/firestore.service.js';
 *   state.allProducts = await ClothService.getAll();
 *   await ClothService.delete(id);
 */
// firebase_config.js uses compat style → db is available as window.db
// firebase_config.js must be loaded via <script> tag before this file.
// ─── Mock Data ────────────────────────────────────────────────────────────────
const MOCK_PRODUCTS = [
  { id: '1',  name: 'Yellow Knit Sweater',    category: 'tops',       age: 'kids',     gender: 'unisex', price: 34.00, originalPrice: null,  emoji: '🧶', bg: '#f0e0a0' },
  { id: '2',  name: 'Classic Denim Overalls', category: 'bottoms',    age: 'kids',     gender: 'boys',   price: 42.50, originalPrice: null,  emoji: '👖', bg: '#c8a87a' },
  { id: '3',  name: 'Polka Dot Summer Dress', category: 'dresses',    age: 'kids',     gender: 'girls',  price: 28.00, originalPrice: 35.00, emoji: '👗', bg: '#f0c8d8' },
  { id: '4',  name: 'Rainbow Play Sneakers',  category: 'footwear',   age: 'kids',     gender: 'unisex', price: 45.00, originalPrice: null,  emoji: '👟', bg: '#d0d0d0' },
  { id: '5',  name: 'Flannel Check Shirt',    category: 'tops',       age: 'children', gender: 'boys',   price: 28.00, originalPrice: null,  emoji: '🧥', bg: '#c8a0a0' },
  { id: '6',  name: 'Cargo Adventure Shorts', category: 'bottoms',    age: 'children', gender: 'boys',   price: 22.00, originalPrice: 32.00, emoji: '🩳', bg: '#b8c8a0' },
  { id: '7',  name: 'Green Rain Jacket',      category: 'outerwear',  age: 'kids',     gender: 'unisex', price: 49.00, originalPrice: null,  emoji: '🧤', bg: '#c8d8b0' },
  { id: '8',  name: 'Canvas Low Sneakers',    category: 'footwear',   age: 'children', gender: 'unisex', price: 29.00, originalPrice: null,  emoji: '👟', bg: '#e0e0d0' },
  { id: '9',  name: 'Floral Summer Dress',    category: 'dresses',    age: 'children', gender: 'girls',  price: 36.00, originalPrice: null,  emoji: '🌸', bg: '#f8d0e8' },
  { id: '10', name: 'Soft Pyjama Set',        category: 'sleepwear',  age: 'kids',     gender: 'unisex', price: 26.00, originalPrice: null,  emoji: '🌙', bg: '#c8c0e0' },
  { id: '11', name: 'Dino Print Hoodie',      category: 'tops',       age: 'kids',     gender: 'boys',   price: 36.00, originalPrice: null,  emoji: '🦕', bg: '#c0e0c8' },
  { id: '12', name: 'Sage Knit Cardigan',     category: 'tops',       age: 'kids',     gender: 'unisex', price: 38.00, originalPrice: null,  emoji: '🧸', bg: '#d4e8d4' },
];

// ─── Config ───────────────────────────────────────────────────────────────────
const ITEMS_PER_PAGE = 8;

// ─── State ────────────────────────────────────────────────────────────────────
const state = {
  allProducts:      [],
  filteredProducts: [],
  currentAge:       'all',
  currentGender:    'all',
  currentCategory:  'all',
  currentPage:      1,
  searchQuery:      '',
  deleteTargetId:   null,
};

// ─── Utils ────────────────────────────────────────────────────────────────────
const fmt = (n) => `₪${n.toFixed(2)}`;

function debounce(fn, delay = 300) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); };
}

// ─── Filter + Search ──────────────────────────────────────────────────────────
function applyFilters() {
  let result = [...state.allProducts];

  if (state.currentAge !== 'all')
    result = result.filter(p => p.age === state.currentAge);

  if (state.currentGender !== 'all')
    result = result.filter(p =>
      Array.isArray(p.gender)
        ? p.gender.includes(state.currentGender)
        : p.gender === state.currentGender
    );

  if (state.currentCategory !== 'all')
    result = result.filter(p => p.category === state.currentCategory);

  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    result = result.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }

  state.filteredProducts = result;
  state.currentPage = 1;
  renderPage();
}

// ─── Render ───────────────────────────────────────────────────────────────────
function renderPage() {
  const grid       = document.getElementById('products-grid');
  const emptyState = document.getElementById('empty-state');

  const total      = state.filteredProducts.length;
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  const start      = (state.currentPage - 1) * ITEMS_PER_PAGE;
  const pageItems  = state.filteredProducts.slice(start, start + ITEMS_PER_PAGE);

  if (total === 0) {
    grid.innerHTML = '';
    emptyState.style.display = 'flex';
  } else {
    emptyState.style.display = 'none';
    grid.innerHTML = '';
    const frag = document.createDocumentFragment();
    pageItems.forEach((p, i) => frag.appendChild(createCard(p, i)));
    grid.appendChild(frag);
  }

  renderPagination(totalPages);
}

function createCard(product, index) {
  const card = document.createElement('article');
  card.className = 'product-card';
  card.style.animationDelay = `${index * 0.055}s`;

  const badgeHTML = product.gender !== 'unisex' ? '' :
    `<span class="product-card__badge">UNISEX</span>`;

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
      </div>
    <div class="product-card__info">
      <p class="product-card__category">${product.category}</p>
      <h3 class="product-card__name">${product.name}</h3>
      <div class="product-card__footer">
        <div class="product-card__pricing">${priceHTML}</div>
        <button class="product-card__delete" aria-label="Delete product" data-id="${product.id}">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
            <path d="M10 11v6M14 11v6"/>
            <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
          </svg>
        </button>
      </div>
    </div>
  `;

  card.querySelector('.product-card__delete').addEventListener('click', (e) => {
    e.stopPropagation();
    openDeleteModal(product.id);
  });

  card.addEventListener('click', () => openModal(product));

  return card;
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
      btn.className = 'page-btn page-btn--dots';
      btn.textContent = '...';
      btn.disabled = true;
    } else {
      btn.className = `page-btn ${p === state.currentPage ? 'page-btn--active' : ''}`;
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

// ─── Product Detail Modal ─────────────────────────────────────────────────────
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
    const tag     = document.createElement('span');
    tag.className = 'product-modal__size-tag';
    tag.textContent = s;
    sizesEl.appendChild(tag);
  });

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

function closeDetailModal() {
  document.getElementById('product-modal-backdrop').style.display = 'none';
  document.body.style.overflow = '';
}

// ─── Delete Modal ─────────────────────────────────────────────────────────────
function openDeleteModal(id) {
  state.deleteTargetId = id;
  document.getElementById('modal-backdrop').style.display = 'flex';
}

function closeDeleteModal() {
  state.deleteTargetId = null;
  document.getElementById('modal-backdrop').style.display = 'none';
}

async function confirmDelete() {
  const id = state.deleteTargetId;
  if (!id) return;

  // ── Firebase replacement: ─────────────────────────────────────────────────
  // await ClothService.delete(id);
  // ─────────────────────────────────────────────────────────────────────────

  // Mock: remove from local array
  await window.db.collection('clothes').doc(id).delete();
  state.allProducts = state.allProducts.filter(p => p.id !== id);
  closeDeleteModal();
  applyFilters();
}

// ─── Init ─────────────────────────────────────────────────────────────────────
async function init() {

  // Age filter chips
  document.getElementById('age-filters').addEventListener('click', (e) => {
    const chip = e.target.closest('.filter-chip');
    if (!chip) return;
    document.querySelectorAll('#age-filters .filter-chip').forEach(c => c.classList.remove('filter-chip--active'));
    chip.classList.add('filter-chip--active');
    state.currentAge = chip.dataset.age;
    applyFilters();
  });

  // Gender filter chips
  document.getElementById('gender-filters').addEventListener('click', (e) => {
    const chip = e.target.closest('.filter-chip');
    if (!chip) return;
    document.querySelectorAll('#gender-filters .filter-chip').forEach(c => c.classList.remove('filter-chip--active'));
    chip.classList.add('filter-chip--active');
    state.currentGender = chip.dataset.gender;
    applyFilters();
  });

  // Category dropdown
  document.getElementById('category-select').addEventListener('change', (e) => {
    state.currentCategory = e.target.value;
    applyFilters();
  });

  // Search
  document.getElementById('search-input').addEventListener('input', debounce((e) => {
    state.searchQuery = e.target.value.trim();
    applyFilters();
  }));

  // Pagination arrows
  document.getElementById('prev-btn').addEventListener('click', () => goToPage(state.currentPage - 1));
  document.getElementById('next-btn').addEventListener('click', () => goToPage(state.currentPage + 1));

  // Detail modal
  document.getElementById('modal-detail-close').addEventListener('click', closeDetailModal);
  document.getElementById('product-modal-backdrop').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeDetailModal();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDetailModal(); });

  // Delete modal
  document.getElementById('modal-cancel').addEventListener('click', closeDeleteModal);
  document.getElementById('modal-confirm').addEventListener('click', confirmDelete);
  document.getElementById('modal-backdrop').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeDeleteModal();
  });

  // Load products
  await new Promise(r => setTimeout(r, 500));

  // ── Firebase replacement: ─────────────────────────────────────────────────
  // import { ClothService } from '/shared/js/firebase/firestore.service.js';
  // state.allProducts = await ClothService.getAll();
  // ─────────────────────────────────────────────────────────────────────────

  const snap = await window.db.collection('clothes').get();
  state.allProducts = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  applyFilters();
}

document.addEventListener('DOMContentLoaded', init);
