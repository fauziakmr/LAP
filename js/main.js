'use strict';

/**
 * LAP — demo/waitlist site
 * No backend. No payment handling. No login.
 * Forms POST (via fetch) to FORM_ENDPOINT if configured, else fall back
 * to localStorage so the demo still "works" before you wire a real
 * endpoint. See README.md for how to connect a real form service.
 */

// ---- CONFIG -----------------------------------------------------------
// Replace with your own Formspree / Getform / basin endpoint before launch.
// Leaving this empty is safe — the site falls back to local storage only.
const FORM_ENDPOINT = '';

// ---- DEMO DATA (static, no external image hosting = no broken links) --
const PRODUCTS = [
  { name: 'Oversized Wash Tee', brand: 'DEMO LABEL 01', price: '₹1,299', hue: 'linear-gradient(160deg,#2b2b2d,#0B0B0C)' },
  { name: 'Wide Cargo Pant', brand: 'DEMO LABEL 02', price: '₹2,199', hue: 'linear-gradient(160deg,#4a4038,#1c1815)' },
  { name: 'Boxy Zip Hoodie', brand: 'DEMO LABEL 03', price: '₹2,899', hue: 'linear-gradient(160deg,#5c1f17,#1a0a08)' },
  { name: 'Panelled Sneaker', brand: 'DEMO LABEL 04', price: '₹3,499', hue: 'linear-gradient(160deg,#3a4a3f,#101410)' }
  ];

const DROPS = [
    'Monsoon layering, sorted',
    'Desk-to-dinner in one fit',
    '3 ways to wear one jacket',
    'Festive, not filmy',
    'Sneakers that earn their price',
    'Cold start office fits'
  ];

// ---- helpers ------------------------------------------------------------
function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text; // textContent only — never innerHTML with dynamic data
  return node;
}

function isValidEmail(value) {
    // Simple, deliberately conservative client-side check.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

async function submitToEndpoint(payload) {
    if (!FORM_ENDPOINT) {
          // No backend configured yet — store locally so the demo still works.
      const key = 'lap_demo_submissions';
          const existing = JSON.parse(localStorage.getItem(key) || '[]');
          existing.push({ ...payload, ts: new Date().toISOString() });
          localStorage.setItem(key, JSON.stringify(existing));
          return { ok: true, local: true };
    }
    const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload)
    });
    return { ok: res.ok, local: false };
}

function setStatus(node, message, type) {
    node.textContent = message;
    node.className = 'form-status' + (type ? ' ' + type : '');
}

function wireForm(formId, statusId, extraFields) {
    const form = document.getElementById(formId);
    const status = document.getElementById(statusId);
    if (!form) return;

  form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const emailInput = form.querySelector('input[type="email"]');
        const email = emailInput.value.trim();

                            if (!isValidEmail(email)) {
                                    setStatus(status, 'Enter a real email address.', 'error');
                                    emailInput.focus();
                                    return;
                            }

                            const payload = { email, form: formId };
        if (extraFields) {
                extraFields.forEach((fieldId) => {
                          const fieldEl = form.querySelector('#' + fieldId);
                          if (fieldEl) {
                                      const val = fieldEl.value.trim();
                                      if (fieldEl.hasAttribute('required') && !val) {
                                                    setStatus(status, 'Fill in every required field.', 'error');
                                                    fieldEl.focus();
                                                    throw new Error('validation-stop'); // caught below
                                      }
                                      payload[fieldId] = val;
                          }
                });
        }

                            const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;

                            try {
                                    const result = await submitToEndpoint(payload);
                                    if (result.ok) {
                                              setStatus(status, "You're on the list. We'll email you when it's real.", 'success');
                                              form.reset();
                                    } else {
                                              setStatus(status, 'Something went wrong — try again in a moment.', 'error');
                                    }
                            } catch (err) {
                                    if (err.message !== 'validation-stop') {
                                              setStatus(status, 'Something went wrong — try again in a moment.', 'error');
                                    }
                            } finally {
                                    submitBtn.disabled = false;
                            }
  });
}

// ---- render demo product grid -------------------------------------------
function renderProducts() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;
    PRODUCTS.forEach((p) => {
          const card = el('div', 'product-card');

                         const swatch = el('div', 'product-swatch');
          swatch.style.background = p.hue;

                         const info = el('div', 'product-info');
          info.appendChild(el('p', 'product-name', p.name));
          info.appendChild(el('p', 'product-brand', p.brand));
          info.appendChild(el('p', 'product-price', p.price));

                         const cta = el('button', 'product-cta', 'Add to Bag');
          cta.type = 'button';
          cta.addEventListener('click', () => openModal());
          info.appendChild(cta);

                         card.appendChild(swatch);
          card.appendChild(info);
          grid.appendChild(card);
    });
}

// ---- render reels-style drop strip --------------------------------------
function renderDrops() {
    const strip = document.getElementById('dropsStrip');
    if (!strip) return;
    DROPS.forEach((label, i) => {
          const card = el('div', 'drop-card');
          const hues = [
                  'linear-gradient(160deg,#233d2b,#0B0B0C)',
                  'linear-gradient(160deg,#3d2323,#0B0B0C)',
                  'linear-gradient(160deg,#23283d,#0B0B0C)',
                  'linear-gradient(160deg,#3d3823,#0B0B0C)',
                  'linear-gradient(160deg,#2c233d,#0B0B0C)',
                  'linear-gradient(160deg,#233d3a,#0B0B0C)'
                ];
          card.style.background = hues[i % hues.length];
          card.appendChild(el('span', 'drop-tag', label));
          strip.appendChild(card);
    });
}

// ---- compare slider -------------------------------------------------------
function wireCompareSlider() {
    const range = document.getElementById('compareRange');
    const real = document.getElementById('compareReal');
    const handle = document.getElementById('compareHandle');
    if (!range || !real || !handle) return;

  function update() {
        const val = range.value; // 0-100
      real.style.clipPath = `inset(0 0 0 ${val}%)`;
        handle.style.left = val + '%';
  }
    range.addEventListener('input', update);
    update();
}

// ---- modal ------------------------------------------------------------
function openModal() {
    const overlay = document.getElementById('modalOverlay');
    overlay.hidden = false;
    const firstInput = overlay.querySelector('input');
    if (firstInput) firstInput.focus();
    document.addEventListener('keydown', onModalKeydown);
}
function closeModal() {
    const overlay = document.getElementById('modalOverlay');
    overlay.hidden = true;
    document.removeEventListener('keydown', onModalKeydown);
}
function onModalKeydown(e) {
    if (e.key === 'Escape') closeModal();
}

// ---- init ---------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderDrops();
    wireCompareSlider();

                            document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('modalOverlay').addEventListener('click', (e) => {
          if (e.target.id === 'modalOverlay') closeModal();
    });

                            wireForm('waitlistForm', 'waitlistStatus');
    wireForm('modalForm', 'modalStatus');
    wireForm('feedbackForm', 'feedbackStatus', ['fb-message']);
});
