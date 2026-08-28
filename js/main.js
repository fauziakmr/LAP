/* ============================================================
   LAP — prototype front-end. Fully client-side, no backend.
   Everything here (catalogue, "Style AI", delivery timer) is
   simulated for demo purposes.
============================================================ */

/* ---------- SILHOUETTE LINE ART ---------- */
const SIL = {
  tee: `<path d="M20 14 L8 22 L14 30 L20 26 L20 54 L44 54 L44 26 L50 30 L56 22 L44 14 L38 18 L26 18 Z"/>`,
  hoodie: `<path d="M22 12 L10 22 L15 30 L20 26 L20 54 L44 54 L44 26 L49 30 L54 22 L42 12 L38 15 Q32 20 26 15 Z"/><circle cx="32" cy="18" r="4"/>`,
  jacket: `<path d="M20 13 L9 21 L15 30 L20 25 L20 55 L28 55 L28 34 L32 30 L36 34 L36 55 L44 55 L44 25 L49 30 L55 21 L44 13 L38 17 L32 22 L26 17 Z"/><line x1="32" y1="22" x2="32" y2="55"/>`,
  dress: `<path d="M24 12 L14 20 L19 27 L24 23 L21 58 L43 58 L40 23 L45 27 L50 20 L40 12 L36 16 L28 16 Z"/>`,
  trousers: `<path d="M18 10 L46 10 L47 22 L38 58 L32 58 L32 30 L28 58 L22 58 L17 22 Z"/>`,
  sneaker: `<path d="M8 44 Q8 36 18 34 L26 30 Q30 28 34 30 L44 36 Q52 37 56 42 L56 48 L8 48 Z"/><path d="M18 34 L18 44 M26 30 L28 40 M34 30 L36 40"/>`,
  bag: `<path d="M14 24 L50 24 L47 56 L17 56 Z"/><path d="M22 24 L22 16 Q22 10 32 10 Q42 10 42 16 L42 24"/>`,
  cap: `<path d="M12 36 Q12 18 32 18 Q52 18 52 36 L54 38 L10 38 Z"/><path d="M32 18 L32 34"/><path d="M40 37 Q48 37 54 32 L58 34 Q52 42 40 41 Z"/>`
};

function silhouetteSVG(key, stroke){
  const body = SIL[key] || SIL.tee;
  return `<svg viewBox="0 0 64 64" fill="none" stroke="${stroke}" stroke-width="2.1" stroke-linejoin="round" stroke-linecap="round">${body}</svg>`;
}

function contrastStroke(hex){
  const c = hex.replace('#','');
  const r = parseInt(c.substr(0,2),16), g = parseInt(c.substr(2,2),16), b = parseInt(c.substr(4,2),16);
  const lum = (0.299*r + 0.587*g + 0.114*b) / 255;
  return lum > 0.62 ? '#1F1D18' : '#F6F1E7';
}

/* ---------- CATALOGUE ---------- */
const PRODUCTS = [
  {id:1, name:'Boxy Oversized Tee', brand:'Kolkata Thread Co.', brandType:'Homegrown', category:'Tops', price:1499, bg:'#3B3A36', sil:'tee', tags:['tee','oversized','black','minimal','everyday','relaxed','streetwear']},
  {id:2, name:'Ribbed Longline Tee', brand:'Noor Studio', brandType:'Homegrown', category:'Tops', price:1299, bg:'#D9A5A0', sil:'tee', tags:['tee','fitted','pink','minimal','everyday']},
  {id:3, name:'Heavyweight Graphic Tee', brand:'Gali No. 9', brandType:'Homegrown', category:'Tops', price:1799, bg:'#C97B63', sil:'tee', tags:['tee','streetwear','oversized','graphic','relaxed']},
  {id:4, name:'Zip Hoodie', brand:'Wolfpack Denim', brandType:'Homegrown', category:'Outerwear', price:2999, bg:'#3B3A36', sil:'hoodie', tags:['hoodie','streetwear','oversized','relaxed','everyday']},
  {id:5, name:'Cropped Hoodie', brand:'Ombre Atelier', brandType:'Homegrown', category:'Outerwear', price:2599, bg:'#A9B4C0', sil:'hoodie', tags:['hoodie','fitted','minimal','boho']},
  {id:6, name:'Utility Overshirt', brand:'Fifth Street', brandType:'Homegrown', category:'Outerwear', price:3299, bg:'#8C7B6B', sil:'jacket', tags:['jacket','streetwear','relaxed','everyday']},
  {id:7, name:'Wide-Leg Denim', brand:'Wolfpack Denim', brandType:'Homegrown', category:'Bottoms', price:2799, bg:'#A9B4C0', sil:'trousers', tags:['denim','trousers','relaxed','streetwear','everyday']},
  {id:8, name:'Tailored Trouser', brand:'Fifth Street', brandType:'Homegrown', category:'Bottoms', price:2399, bg:'#D8CBB8', sil:'trousers', tags:['trousers','fitted','minimal','event','date night']},
  {id:9, name:'Chunky Retro Sneaker', brand:'Northstar Athletics', brandType:'Homegrown', category:'Footwear', price:3999, bg:'#E3D5C0', sil:'sneaker', tags:['sneaker','streetwear','relaxed','everyday']},
  {id:10, name:'Canvas Slip-On', brand:'Gali No. 9', brandType:'Homegrown', category:'Footwear', price:1999, bg:'#B5C4B1', sil:'sneaker', tags:['sneaker','minimal','everyday']},
  {id:11, name:'Structured Tote', brand:'Noor Studio', brandType:'Homegrown', category:'Accessories', price:2199, bg:'#C97B63', sil:'bag', tags:['bag','minimal','everyday','date night']},
  {id:12, name:'Corduroy Cap', brand:'Gali No. 9', brandType:'Homegrown', category:'Accessories', price:899, bg:'#8C7B6B', sil:'cap', tags:['cap','streetwear','everyday']},

  {id:13, name:'Merino Crewneck', brand:'Hemlock & Co.', brandType:'International', category:'Tops', price:4499, bg:'#D8CBB8', sil:'tee', tags:['tee','minimal','fitted','date night','event']},
  {id:14, name:'Silk Slip Dress', brand:'Maison Aria', brandType:'International', category:'Tops', price:6999, bg:'#D9A5A0', sil:'dress', tags:['dress','fitted','date night','event','minimal']},
  {id:15, name:'Boucle Midi Dress', brand:'Maison Aria', brandType:'International', category:'Tops', price:7499, bg:'#B5C4B1', sil:'dress', tags:['dress','boho','event','relaxed']},
  {id:16, name:'Waxed Field Jacket', brand:'Northmoor', brandType:'International', category:'Outerwear', price:8999, bg:'#3B3A36', sil:'jacket', tags:['jacket','streetwear','relaxed','everyday']},
  {id:17, name:'Tailored Blazer', brand:'Hemlock & Co.', brandType:'International', category:'Outerwear', price:9499, bg:'#3B3A36', sil:'jacket', tags:['jacket','fitted','event','date night','minimal']},
  {id:18, name:'Straight Cut Denim', brand:'Rue Marchand', brandType:'International', category:'Bottoms', price:5299, bg:'#A9B4C0', sil:'trousers', tags:['denim','trousers','minimal','everyday']},
  {id:19, name:'Pleated Wide Trouser', brand:'Maison Aria', brandType:'International', category:'Bottoms', price:6299, bg:'#D8CBB8', sil:'trousers', tags:['trousers','fitted','event','minimal']},
  {id:20, name:'Leather Court Sneaker', brand:'Rue Marchand', brandType:'International', category:'Footwear', price:8499, bg:'#E3D5C0', sil:'sneaker', tags:['sneaker','minimal','everyday','date night']},
  {id:21, name:'Suede Chelsea Boot', brand:'Northmoor', brandType:'International', category:'Footwear', price:10999, bg:'#8C7B6B', sil:'sneaker', tags:['sneaker','event','date night','fitted']},
  {id:22, name:'Woven Leather Tote', brand:'Rue Marchand', brandType:'International', category:'Accessories', price:9999, bg:'#C97B63', sil:'bag', tags:['bag','event','date night','minimal']},
  {id:23, name:'Wool Beret', brand:'Maison Aria', brandType:'International', category:'Accessories', price:2799, bg:'#D9A5A0', sil:'cap', tags:['cap','boho','date night']},
];

const SIZES_APPAREL = ['XS','S','M','L','XL'];
const SIZES_SHOE = ['UK6','UK7','UK8','UK9','UK10'];

function sizesFor(p){ return p.category === 'Footwear' ? SIZES_SHOE : SIZES_APPAREL; }

/* ---------- STATE ---------- */
let cart = []; // {id, size, qty}
let currentFilter = 'all';
let currentCategory = 'all';
let currentSearch = '';
let quizAnswers = {occasion:null, vibe:null, fit:null};
let timerInterval = null;

/* ---------- RENDER HELPERS ---------- */
function money(n){ return '₹' + n.toLocaleString('en-IN'); }

function productCard(p){
  const stroke = contrastStroke(p.bg);
  const tagClass = p.brandType === 'International' ? 'intl' : 'home';
  return `
  <div class="product-card" data-id="${p.id}">
    <div class="product-art" style="background:${p.bg}">
      <span class="product-tag ${tagClass}">${p.brandType}</span>
      ${silhouetteSVG(p.sil, stroke)}
      <span class="product-nofilter">No filter</span>
    </div>
    <div class="product-info">
      <div class="p-brand">${p.brand}</div>
      <div class="p-name">${p.name}</div>
      <div class="p-price">${money(p.price)}</div>
    </div>
  </div>`;
}

function renderGrid(containerId, list){
  const el = document.getElementById(containerId);
  if(!el) return;
  el.innerHTML = list.map(productCard).join('') || '';
  el.querySelectorAll('.product-card').forEach(card=>{
    card.addEventListener('click', ()=>openPDP(parseInt(card.dataset.id)));
  });
}

/* ---------- VIEW NAV ---------- */
function showView(name){
  document.querySelectorAll('.view').forEach(v=>v.hidden = true);
  document.getElementById('view-' + name).hidden = false;
  window.scrollTo({top:0, behavior:'instant'});
  closeDrawer();
  closeStyleModal();
}

document.addEventListener('click', (e)=>{
  const navEl = e.target.closest('[data-nav]');
  if(!navEl) return;
  e.preventDefault();
  const nav = navEl.dataset.nav;
  if(nav === 'style'){ openStyleModal(); return; }
  if(nav === 'shop'){
    currentFilter = navEl.dataset.filter || 'all';
    currentCategory = 'all';
    currentSearch = '';
    document.getElementById('searchInput').value = '';
    renderShop();
  }
  showView(nav === 'style' ? 'home' : nav);
});

/* ---------- HOME ---------- */
function renderHome(){
  renderGrid('grid-homegrown', PRODUCTS.filter(p=>p.brandType==='Homegrown').slice(0,8));
  renderGrid('grid-international', PRODUCTS.filter(p=>p.brandType==='International').slice(0,8));
}

/* ---------- SHOP / SEARCH RESULTS ---------- */
function matchesSearch(p, q){
  if(!q) return true;
  q = q.toLowerCase();
  return p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) ||
         p.category.toLowerCase().includes(q) || p.tags.some(t=>t.includes(q));
}

function renderShop(){
  let list = PRODUCTS.filter(p=>{
    const byBrand = currentFilter === 'all' || p.brandType === currentFilter;
    const byCat = currentCategory === 'all' || p.category === currentCategory;
    const bySearch = matchesSearch(p, currentSearch);
    return byBrand && byCat && bySearch;
  });

  document.querySelectorAll('#shopFilters .chip').forEach(c=>{
    c.classList.toggle('active', c.dataset.cat === currentCategory);
  });

  const eyebrow = document.getElementById('shopEyebrow');
  const title = document.getElementById('shopTitle');
  if(currentSearch){
    eyebrow.textContent = 'Search results';
    title.textContent = `“${currentSearch}”`;
  } else if(currentFilter !== 'all'){
    eyebrow.textContent = 'Shop';
    title.textContent = currentFilter + ' Edit';
  } else {
    eyebrow.textContent = 'Shop';
    title.textContent = 'All pieces';
  }
  document.getElementById('shopResultCount').textContent =
    `${list.length} piece${list.length===1?'':'s'} — curated, not padded`;

  renderGrid('grid-shop', list);
  document.getElementById('shopEmpty').hidden = list.length > 0;
  document.getElementById('grid-shop').style.display = list.length ? 'grid' : 'none';
}

document.getElementById('shopFilters').addEventListener('click', (e)=>{
  const chip = e.target.closest('.chip');
  if(!chip) return;
  currentCategory = chip.dataset.cat;
  renderShop();
});

/* ---------- SEARCH ---------- */
const searchInput = document.getElementById('searchInput');
const searchDrop = document.getElementById('searchDrop');
const searchClear = document.getElementById('searchClear');

searchInput.addEventListener('input', ()=>{
  const q = searchInput.value.trim();
  searchClear.classList.toggle('show', q.length>0);
  if(!q){ searchDrop.classList.remove('show'); return; }
  const results = PRODUCTS.filter(p=>matchesSearch(p,q)).slice(0,5);
  if(results.length === 0){
    searchDrop.innerHTML = `<div class="search-drop-empty">No matches for “${q}” — that's intentional, LAP won't pad results. Try “tee”, “denim”, or “sneaker”.</div>`;
  } else {
    searchDrop.innerHTML = results.map(p=>`
      <div class="search-drop-item" data-id="${p.id}">
        <div class="search-drop-swatch" style="background:${p.bg}"></div>
        <div>
          <div class="search-drop-name">${p.name}</div>
          <div class="search-drop-meta">${p.brand} · ${money(p.price)}</div>
        </div>
      </div>`).join('') + `<div class="search-drop-footer" id="seeAllResults">See all results for “${q}” →</div>`;
  }
  searchDrop.classList.add('show');
});

searchDrop.addEventListener('click', (e)=>{
  const item = e.target.closest('.search-drop-item');
  const seeAll = e.target.closest('#seeAllResults');
  if(item){ openPDP(parseInt(item.dataset.id)); searchDrop.classList.remove('show'); return; }
  if(seeAll){ commitSearch(); }
});

searchInput.addEventListener('keydown', (e)=>{ if(e.key === 'Enter') commitSearch(); });

function commitSearch(){
  currentSearch = searchInput.value.trim();
  currentFilter = 'all';
  currentCategory = 'all';
  searchDrop.classList.remove('show');
  renderShop();
  showView('shop');
}

searchClear.addEventListener('click', ()=>{
  searchInput.value=''; searchClear.classList.remove('show'); searchDrop.classList.remove('show');
});

document.addEventListener('click', (e)=>{
  if(!e.target.closest('.search-wrap')) searchDrop.classList.remove('show');
});

/* ---------- PDP ---------- */
function openPDP(id){
  const p = PRODUCTS.find(x=>x.id===id);
  if(!p) return;
  const stroke = contrastStroke(p.bg);
  const related = PRODUCTS.filter(x=>x.id!==p.id && x.category===p.category).slice(0,3);
  const sizes = sizesFor(p);

  document.getElementById('pdpWrap').innerHTML = `
    <div style="grid-column:1/-1">
      <a href="#" class="back-link" id="pdpBack">← Back</a>
    </div>
    <div class="pdp-media">
      <div class="pdp-art" style="background:${p.bg}">
        <span class="product-tag ${p.brandType==='International'?'intl':'home'}" style="position:absolute;top:14px;left:14px;">${p.brandType}</span>
        ${silhouetteSVG(p.sil, stroke)}
      </div>
      <div class="pdp-thumbs">
        ${[0,1,2].map(i=>`<div class="pdp-thumb ${i===0?'active':''}" style="background:${p.bg}"></div>`).join('')}
      </div>
    </div>
    <div class="pdp-info">
      <div class="p-brand-row"><span class="p-brand">${p.brand}</span></div>
      <h1>${p.name}</h1>
      <div class="pdp-price">${money(p.price)}</div>
      <div class="no-filter-badge">● Shot unedited, on a real body — what you see is what arrives</div>
      <p class="pdp-desc">Part of LAP's curated ${p.category.toLowerCase()} edit. Fit notes from our team: true to size, ${p.tags.includes('relaxed') || p.tags.includes('oversized') ? 'runs relaxed through the body' : 'sits close through the body'} — size down if you prefer a fitted look.</p>

      <div class="size-row" id="sizeRow">
        ${sizes.map((s,i)=>`<div class="size-opt" data-size="${s}">${s}</div>`).join('')}
      </div>

      <div class="pdp-actions">
        <button class="btn btn-primary full" id="addToBagBtn">Add to bag</button>
      </div>

      <div class="tad-box">
        <h4>🚪 Try‑At‑Door eligible</h4>
        <p>Arrives in ~10 minutes to serviceable pincodes. Your rider waits at the door while you try it on — keep it or hand it straight back, no pickup request needed.</p>
      </div>

      <div class="complete-look">
        <h3>Complete the look</h3>
        <div class="product-grid" id="pdpRelated"></div>
      </div>
    </div>
  `;

  document.getElementById('pdpBack').addEventListener('click', (e)=>{ e.preventDefault(); showView('shop'); });

  let selectedSize = null;
  document.querySelectorAll('#sizeRow .size-opt').forEach(opt=>{
    opt.addEventListener('click', ()=>{
      document.querySelectorAll('#sizeRow .size-opt').forEach(o=>o.classList.remove('active'));
      opt.classList.add('active');
      selectedSize = opt.dataset.size;
    });
  });

  document.getElementById('addToBagBtn').addEventListener('click', ()=>{
    if(!selectedSize){
      const row = document.getElementById('sizeRow');
      row.style.animation = 'none'; void row.offsetWidth; row.style.outline = '2px solid var(--return)'; row.style.borderRadius='10px';
      setTimeout(()=>{ row.style.outline='none'; }, 900);
      return;
    }
    addToCart(p.id, selectedSize);
    openCart();
  });

  renderGrid('pdpRelated', related);
  showView('pdp');
}

/* ---------- CART ---------- */
function addToCart(id, size){
  const existing = cart.find(c=>c.id===id && c.size===size);
  if(existing){ existing.qty++; } else { cart.push({id, size, qty:1}); }
  updateCartCount();
  renderDrawer();
}

function removeFromCart(idx){
  cart.splice(idx,1);
  updateCartCount();
  renderDrawer();
}

function updateCartCount(){
  const count = cart.reduce((s,c)=>s+c.qty,0);
  document.getElementById('cartCount').textContent = count;
}

function renderDrawer(){
  const itemsEl = document.getElementById('drawerItems');
  const footerEl = document.getElementById('drawerFooter');
  const etaEl = document.getElementById('drawerEta');

  if(cart.length === 0){
    itemsEl.innerHTML = `<div class="drawer-empty">Your bag is empty.<br>Add something from the edit — there isn't much to sift through.</div>`;
    footerEl.hidden = true;
    etaEl.hidden = true;
    return;
  }

  etaEl.hidden = false;
  etaEl.textContent = '● Arriving in ~9 minutes to 560034';

  let subtotal = 0;
  itemsEl.innerHTML = cart.map((c,idx)=>{
    const p = PRODUCTS.find(x=>x.id===c.id);
    subtotal += p.price * c.qty;
    const stroke = contrastStroke(p.bg);
    return `
    <div class="drawer-item">
      <div class="drawer-item-art" style="background:${p.bg}">${silhouetteSVG(p.sil, stroke)}</div>
      <div class="drawer-item-info">
        <div class="p-brand">${p.brand}</div>
        <div class="p-name">${p.name}</div>
        <div class="drawer-item-meta">
          <span>Size ${c.size} · Qty ${c.qty}</span>
          <span>${money(p.price*c.qty)}</span>
        </div>
        <div class="drawer-item-meta"><span></span><span class="drawer-remove" data-idx="${idx}">Remove</span></div>
      </div>
    </div>`;
  }).join('');

  itemsEl.querySelectorAll('.drawer-remove').forEach(btn=>{
    btn.addEventListener('click', ()=>removeFromCart(parseInt(btn.dataset.idx)));
  });

  document.getElementById('drawerSubtotal').textContent = money(subtotal);
  footerEl.hidden = false;
}

function openCart(){
  document.getElementById('cartDrawer').classList.add('show');
  document.getElementById('drawerOverlay').classList.add('show');
}
function closeDrawer(){
  document.getElementById('cartDrawer').classList.remove('show');
  document.getElementById('drawerOverlay').classList.remove('show');
}
document.getElementById('cartBtn').addEventListener('click', openCart);
document.getElementById('closeCart').addEventListener('click', closeDrawer);
document.getElementById('drawerOverlay').addEventListener('click', closeDrawer);

document.getElementById('checkoutBtn').addEventListener('click', ()=>{
  closeDrawer();
  showView('how');
  resetTimer();
});

/* ---------- STYLE AI MODAL ---------- */
function openStyleModal(){
  document.getElementById('styleModal').classList.add('show');
  document.getElementById('styleOverlay').classList.add('show');
}
function closeStyleModal(){
  document.getElementById('styleModal').classList.remove('show');
  document.getElementById('styleOverlay').classList.remove('show');
}
document.getElementById('closeStyle').addEventListener('click', closeStyleModal);
document.getElementById('styleOverlay').addEventListener('click', closeStyleModal);
document.getElementById('openStyleFromHome').addEventListener('click', openStyleModal);

document.querySelectorAll('.quiz-opts').forEach(group=>{
  group.addEventListener('click', (e)=>{
    const btn = e.target.closest('button');
    if(!btn) return;
    group.querySelectorAll('button').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    quizAnswers[group.dataset.key] = btn.dataset.val.toLowerCase();
    const allSet = quizAnswers.occasion && quizAnswers.vibe && quizAnswers.fit;
    document.getElementById('revealEdit').disabled = !allSet;
  });
});

document.getElementById('revealEdit').addEventListener('click', ()=>{
  const wanted = [quizAnswers.occasion, quizAnswers.vibe, quizAnswers.fit];
  const scored = PRODUCTS.map(p=>{
    const score = wanted.reduce((s,w)=> s + (p.tags.includes(w) ? 1 : 0), 0);
    return {p, score};
  }).sort((a,b)=>b.score-a.score);
  const top = scored.slice(0,3).map(s=>s.p);
  renderGrid('styleResultGrid', top);
  document.getElementById('styleQuiz').hidden = true;
  document.getElementById('styleResult').hidden = false;
  document.getElementById('styleHeading').textContent = 'Your edit is ready';
});

document.getElementById('restartQuiz').addEventListener('click', ()=>{
  quizAnswers = {occasion:null, vibe:null, fit:null};
  document.querySelectorAll('.quiz-opts button').forEach(b=>b.classList.remove('active'));
  document.getElementById('revealEdit').disabled = true;
  document.getElementById('styleQuiz').hidden = false;
  document.getElementById('styleResult').hidden = true;
  document.getElementById('styleHeading').textContent = 'Build your edit';
});

/* ---------- TRY-AT-DOOR TIMER DEMO ---------- */
const timerStageEl = document.getElementById('timerStage');
const timerDisplayEl = document.getElementById('timerDisplay');
const timerCaptionEl = document.getElementById('timerCaption');
const timerActionsEl = document.getElementById('timerActions');
const timerDecisionEl = document.getElementById('timerDecision');
const timerResultEl = document.getElementById('timerResult');
const timerAdvanceBtn = document.getElementById('timerAdvance');

function fmt(sec){
  const m = Math.floor(sec/60), s = sec%60;
  return `${m}:${s.toString().padStart(2,'0')}`;
}

function resetTimer(){
  clearInterval(timerInterval);
  timerStageEl.textContent = 'Stage: Order placed';
  timerDisplayEl.textContent = '10:00';
  timerCaptionEl.textContent = 'Tap "Simulate delivery" to walk through it.';
  timerActionsEl.hidden = false;
  timerDecisionEl.hidden = true;
  timerResultEl.hidden = true;
  timerAdvanceBtn.textContent = 'Simulate delivery →';
}

timerAdvanceBtn.addEventListener('click', ()=>{
  timerStageEl.textContent = 'Stage: Arrived — try it on';
  timerCaptionEl.textContent = 'Your rider is waiting. Try it on, then decide.';
  timerActionsEl.hidden = true;
  timerDecisionEl.hidden = false;

  let secondsLeft = 600; // 10:00
  timerDisplayEl.textContent = fmt(secondsLeft);
  clearInterval(timerInterval);
  timerInterval = setInterval(()=>{
    secondsLeft -= 10; // sped up for demo purposes
    if(secondsLeft <= 0){
      secondsLeft = 0;
      clearInterval(timerInterval);
      timerCaptionEl.textContent = "Still deciding? Take your time — we don't rush you off the clock.";
    }
    timerDisplayEl.textContent = fmt(secondsLeft);
  }, 220);
});

function finishTimer(kind){
  clearInterval(timerInterval);
  timerDecisionEl.hidden = true;
  timerResultEl.hidden = false;
  if(kind==='keep'){
    timerResultEl.className = 'timer-result keep';
    timerResultEl.textContent = 'Kept ✓ — charged, no further action needed.';
  } else {
    timerResultEl.className = 'timer-result return';
    timerResultEl.textContent = 'Returned ✓ — handed back at the door. Refund initiated instantly.';
  }
  timerStageEl.textContent = 'Stage: Decision complete';
  const retryBtn = document.createElement('button');
  retryBtn.className = 'btn btn-ghost';
  retryBtn.style.marginTop = '14px';
  retryBtn.textContent = 'Try it again';
  retryBtn.addEventListener('click', ()=>{ retryBtn.remove(); resetTimer(); });
  timerResultEl.after(retryBtn);
}

document.getElementById('btnKeep').addEventListener('click', ()=>finishTimer('keep'));
document.getElementById('btnReturn').addEventListener('click', ()=>finishTimer('return'));

/* ---------- INIT ---------- */
renderHome();
renderShop();
updateCartCount();
renderDrawer();
resetTimer();
