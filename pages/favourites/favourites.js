/**
 * favourites.js — KidsMarket Favourites Page
 * Reads wishlist IDs from localStorage, fetches products from Firestore,
 * renders cards and allows removal.
 */

const fmt = (n) => `$${Number(n).toFixed(2)}`;

// ─── Wishlist helpers ────────────────────────────────────────────────────────
function getIds() {
  return JSON.parse(localStorage.getItem('km_wishlist') || '[]');
}

function removeId(id) {
  const updated = getIds().filter(i => i !== id);
  localStorage.setItem('km_wishlist', JSON.stringify(updated));
  return updated;
}

function updateBadge(count) {
  const badge = document.getElementById('wishlist-count');
  if (!badge) return;
  badge.textContent = count;
  badge.classList.toggle('visible', count > 0);
}

function updateSubtitle(count) {
  const el = document.getElementById('fav-count');
  if (el) el.textContent = `${count} saved item${count !== 1 ? 's' : ''}`;
}

// ─── Fetch from Firestore ────────────────────────────────────────────────────
async function fetchByIds(ids) {
  if (!ids.length) return [];

  // Firestore 'in' supports up to 30 items per query
  const results = [];
  for (let i = 0; i < ids.length; i += 30) {
    const chunk = ids.slice(i, i + 30);
    const snap  = await db.collection('clothes')
      .where(firebase.firestore.FieldPath.documentId(), 'in', chunk)
      .get();
    snap.docs.forEach(d => results.push({ id: d.id, ...d.data() }));
  }
  return results;
}

// ─── Card ────────────────────────────────────────────────────────────────────
function createCard(product, index) {
  const card = document.createElement('article');
  card.className = 'product-card';
  card.style.animationDelay = `${index * 0.06}s`;
  card.dataset.id = product.id;

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
      <button class="product-card__wishlist active" aria-label="Remove from favourites" data-id="${product.id}">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
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
    handleRemove(product.id, card);
  });

  return card;
}

function handleRemove(id, card) {
  const btn = card.querySelector('.product-card__wishlist');
  btn.animate(
    [{ transform: 'scale(1)' }, { transform: 'scale(1.35)' }, { transform: 'scale(1)' }],
    { duration: 280, easing: 'ease' }
  );

  card.style.transition = 'opacity 0.3s, transform 0.3s';
  card.style.opacity    = '0';
  card.style.transform  = 'scale(0.9)';

  setTimeout(() => {
    card.remove();
    const remaining = removeId(id);
    updateBadge(remaining.length);
    updateSubtitle(remaining.length);

    const grid = document.getElementById('favourites-grid');
    if (!grid || grid.children.length === 0) showEmpty();
  }, 300);
}

// ─── Empty state ─────────────────────────────────────────────────────────────
function showEmpty() {
  const grid = document.getElementById('favourites-grid');
  if (grid) grid.style.display = 'none';
  const empty = document.getElementById('empty-state');
  if (empty) empty.style.display = 'flex';
}

// ─── Init ────────────────────────────────────────────────────────────────────
async function init() {
  const ids = getIds();
  updateBadge(ids.length);

  const grid = document.getElementById('favourites-grid');

  if (!ids.length) {
    grid.innerHTML = '';
    showEmpty();
    updateSubtitle(0);
    return;
  }

  try {
    const products = await fetchByIds(ids);
    grid.innerHTML = '';

    if (!products.length) {
      showEmpty();
      updateSubtitle(0);
      return;
    }

    updateSubtitle(products.length);
    const frag = document.createDocumentFragment();
    products.forEach((p, i) => frag.appendChild(createCard(p, i)));
    grid.appendChild(frag);
  } catch (err) {
    grid.innerHTML = '<p class="load-error">Failed to load favourites.</p>';
    console.error('favourites init:', err);
  }
}

document.addEventListener('DOMContentLoaded', init);
