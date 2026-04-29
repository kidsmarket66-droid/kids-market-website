/**
 * add-piece-of-cloth.js — KidsMarket Add New Item Page
 * Requires in HTML before this script:
 *   firebase-app-compat.js
 *   firebase-firestore-compat.js
 *   firebase.config.js  (which calls firebase.initializeApp and exposes window.db)
 */

// ─── Cloudinary Config ────────────────────────────────────────────────────────
const CLOUD_NAME    = 'dbjhap3ga';   // ← replace with your Cloudinary cloud name
const UPLOAD_PRESET = 'kids_market';        // ← replace with your upload preset name

// ─── Form State ───────────────────────────────────────────────────────────────
const formData = {
  name:          '',
  description:   '',
  age:           null,
  gender:        [],
  sizes:         [],
  category:      null,
  price:         '',
  originalPrice: '',
  photoFile:     null,
};

// ─── DOM Refs ─────────────────────────────────────────────────────────────────
const nameInput          = document.getElementById('item-name');
const descInput          = document.getElementById('item-description');
const priceInput         = document.getElementById('item-price');
const originalPriceInput = document.getElementById('item-original-price');
const photoInput         = document.getElementById('photo-input');
const uploadPlaceholder  = document.getElementById('upload-placeholder');
const uploadPreview      = document.getElementById('upload-preview');
const previewImg         = document.getElementById('preview-img');
const removePhotoBtn     = document.getElementById('remove-photo');
const saveBtn            = document.getElementById('btn-save');
const toast              = document.getElementById('toast');

// ─── Cloudinary Upload ────────────────────────────────────────────────────────
async function uploadPhoto(file) {
  const data = new FormData();
  data.append('file',           file);
  data.append('upload_preset',  UPLOAD_PRESET);
  data.append('folder',         'kids-market');

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: 'POST', body: data }
  );

  if (!res.ok) throw new Error('Photo upload failed');

  const json = await res.json();
  return json.secure_url;
}

// ─── Validation ───────────────────────────────────────────────────────────────
function showError(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg;
}

function clearErrors() {
  ['name-error', 'age-error', 'gender-error', 'size-error', 'category-error', 'price-error', 'photo-error']
    .forEach(id => showError(id, ''));
}

function validate() {
  clearErrors();
  let valid = true;

  if (!formData.name.trim()) {
    showError('name-error', 'Item name is required.');
    valid = false;
  }
  if (!formData.age) {
    showError('age-error', 'Please select an age range.');
    valid = false;
  }
  if (formData.gender.length === 0) {
    showError('gender-error', 'Please select at least one gender.');
    valid = false;
  }
  if (formData.sizes.length === 0) {
    showError('size-error', 'Please select at least one size.');
    valid = false;
  }
  if (!formData.category) {
    showError('category-error', 'Please select a category.');
    valid = false;
  }
  if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) {
    showError('price-error', 'Please enter a valid price.');
    valid = false;
  }
  if (!formData.photoFile) {
    showError('photo-error', 'Please upload a photo.');
    valid = false;
  }

  return valid;
}

// ─── Photo Handling ───────────────────────────────────────────────────────────
function handlePhoto(file) {
  if (!file || !file.type.startsWith('image/')) {
    showError('photo-error', 'Please upload a valid image file.');
    return;
  }
  formData.photoFile = file;
  const reader = new FileReader();
  reader.onload = (e) => {
    previewImg.src = e.target.result;
    uploadPlaceholder.style.display = 'none';
    uploadPreview.style.display     = 'block';
    showError('photo-error', '');
  };
  reader.readAsDataURL(file);
}

function removePhoto() {
  formData.photoFile        = null;
  previewImg.src            = '';
  photoInput.value          = '';
  uploadPreview.style.display    = 'none';
  uploadPlaceholder.style.display = 'flex';
}

// ─── Save ─────────────────────────────────────────────────────────────────────
async function handleSave() {
  if (!validate()) return;

  saveBtn.disabled    = true;
  saveBtn.textContent = 'Saving...';

  try {
    // Step 1: upload photo to Cloudinary
    const photoURL = await uploadPhoto(formData.photoFile);

    // Step 2: save document to Firestore
    await db.collection('clothes').add({
      name:          formData.name.trim(),
      description:   formData.description.trim(),
      age:           formData.age,
      gender:        formData.gender,
      sizes:         formData.sizes,
      category:      formData.category,
      price:         Number(formData.price),
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
      photoURL,
      createdAt:     new Date(),
    });

    showToast();
    setTimeout(() => resetForm(), 1800);

  } catch (err) {
    console.error('Save error:', err);
    saveBtn.disabled    = false;
    saveBtn.textContent = 'Save Item';
    showError('photo-error', 'Something went wrong. Please try again.');
  }
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function showToast() {
  toast.style.display = 'flex';
  setTimeout(() => { toast.style.display = 'none'; }, 3000);
}

// ─── Reset Form ───────────────────────────────────────────────────────────────
function resetForm() {
  formData.name          = '';
  formData.description   = '';
  formData.age           = null;
  formData.gender        = [];
  formData.sizes         = [];
  formData.category      = null;
  formData.price         = '';
  formData.originalPrice = '';
  formData.photoFile     = null;

  nameInput.value          = '';
  descInput.value          = '';
  priceInput.value         = '';
  originalPriceInput.value = '';

  document.querySelectorAll('input[name="age"]').forEach(r => r.checked = false);
  document.querySelectorAll('input[name="gender"]').forEach(c => c.checked = false);
  document.querySelectorAll('.size-chip--active').forEach(c => c.classList.remove('size-chip--active'));
  document.querySelectorAll('.category-chip--active').forEach(c => c.classList.remove('category-chip--active'));

  removePhoto();
  saveBtn.disabled    = false;
  saveBtn.textContent = 'Save Item';
  clearErrors();
}

// ─── Init ─────────────────────────────────────────────────────────────────────
function init() {

  // Text inputs
  nameInput.addEventListener('input',          (e) => { formData.name = e.target.value; });
  descInput.addEventListener('input',          (e) => { formData.description = e.target.value; });
  priceInput.addEventListener('input',         (e) => { formData.price = e.target.value; });
  originalPriceInput.addEventListener('input', (e) => { formData.originalPrice = e.target.value; });

  // Age — radio single select
  document.querySelectorAll('input[name="age"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      formData.age = e.target.value;
      showError('age-error', '');
    });
  });

  // Gender — checkbox multi select
  document.querySelectorAll('input[name="gender"]').forEach(cb => {
    cb.addEventListener('change', () => {
      formData.gender = [...document.querySelectorAll('input[name="gender"]:checked')]
        .map(c => c.value);
      showError('gender-error', '');
    });
  });

  // Sizes — chips multi select
  document.getElementById('size-group').addEventListener('click', (e) => {
    const chip = e.target.closest('.size-chip');
    if (!chip) return;
    e.preventDefault();
    e.stopPropagation();
    chip.classList.toggle('size-chip--active');
    formData.sizes = [...document.getElementById('size-group')
      .querySelectorAll('.size-chip--active')]
      .map(c => c.dataset.size);
    showError('size-error', '');
  });

  // Category — chips single select
  document.getElementById('category-group').addEventListener('click', (e) => {
    const chip = e.target.closest('.category-chip');
    if (!chip) return;
    e.preventDefault();
    e.stopPropagation();
    const wasActive = chip.classList.contains('category-chip--active');
    document.getElementById('category-group')
      .querySelectorAll('.category-chip--active')
      .forEach(c => c.classList.remove('category-chip--active'));
    if (!wasActive) {
      chip.classList.add('category-chip--active');
      formData.category = chip.dataset.category;
    } else {
      formData.category = null;
    }
    showError('category-error', '');
  });


  // File input change
  photoInput.addEventListener('change', (e) => {
    if (e.target.files[0]) handlePhoto(e.target.files[0]);
  });

  // Drag & drop
  const uploadZone = document.getElementById('upload-zone');

  uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.classList.add('drag-over');
  });

  uploadZone.addEventListener('dragleave', () => {
    uploadZone.classList.remove('drag-over');
  });

  uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadZone.classList.remove('drag-over');
    if (e.dataTransfer.files[0]) handlePhoto(e.dataTransfer.files[0]);
  });

  // Remove photo button
  removePhotoBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    removePhoto();
  });

  // Save button
  saveBtn.addEventListener('click', handleSave);
}

document.addEventListener('DOMContentLoaded', init);
