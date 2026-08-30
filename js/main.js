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

/* ---------- PRODUCT PHOTOGRAPHY ----------
   Freely-licensed (Unsplash) editorial/flat-lay fashion photography —
   generic stock shots, not the brands' own product photography. Used
   here as visual stand-ins on this concept prototype. ---------- */
const IMG_BASE = 'https://images.unsplash.com';
function productImg(p, w){ return `${IMG_BASE}${p.img}?auto=format&fit=crop&w=${w||800}&q=75`; }

/* ---------- CATALOGUE ----------
   Real brand names used for demo/curation flavor on this concept
   prototype — LAP has no affiliation with these brands. ---------- */
const PRODUCTS = [
  {id:1, name:'Overdyed Boxy Tee', brand:'Bonkers Corner', brandType:'Homegrown', category:'Tops', price:1299, bg:'#3B3A36', sil:'tee', img:'/photo-1689044611227-3267fabaf76a', tags:['tee','oversized','black','minimal','everyday','relaxed','streetwear']},
  {id:2, name:'Washed Zip Hoodie', brand:'Bonkers Corner', brandType:'Homegrown', category:'Outerwear', price:2799, bg:'#3B3A36', sil:'hoodie', img:'/photo-1564557287817-3785e38ec1f5', tags:['hoodie','streetwear','oversized','relaxed','everyday']},
  {id:3, name:'Desi Grunge Graphic Tee', brand:'Veirdo', brandType:'Homegrown', category:'Tops', price:1199, bg:'#C97B63', sil:'tee', img:'/photo-1576871337674-ce7245cdc53c', tags:['tee','streetwear','oversized','graphic','relaxed']},
  {id:4, name:'Cargo Utility Pants', brand:'Veirdo', brandType:'Homegrown', category:'Bottoms', price:1799, bg:'#A9B4C0', sil:'trousers', img:'/photo-1718252540558-7b383b52642e', tags:['cargo','trousers','streetwear','relaxed','everyday']},
  {id:5, name:'Textured Knit Polo', brand:'Snitch', brandType:'Homegrown', category:'Tops', price:1499, bg:'#D8CBB8', sil:'tee', img:'/photo-1625910513413-c23b8bb81cba', tags:['polo','knit','fitted','minimal','date night','office']},
  {id:6, name:'Slim Fit Chinos', brand:'Snitch', brandType:'Homegrown', category:'Bottoms', price:1699, bg:'#A9B4C0', sil:'trousers', img:'/photo-1746591847545-33d872de8411', tags:['trousers','fitted','minimal','everyday','event','office']},
  {id:7, name:'Anime Oversized Tee', brand:'The Souled Store', brandType:'Homegrown', category:'Tops', price:899, bg:'#3B3A36', sil:'tee', img:'/photo-1576871337650-d711e9c0470b', tags:['tee','graphic','oversized','streetwear','everyday']},
  {id:8, name:'Graphic Print Sweatshirt', brand:'Bewakoof', brandType:'Homegrown', category:'Outerwear', price:1399, bg:'#D9A5A0', sil:'hoodie', img:'/photo-1609873814058-a8928924184a', tags:['sweatshirt','graphic','relaxed','everyday']},
  {id:9, name:'Skate Cargo Shorts', brand:'Six5Six Street', brandType:'Homegrown', category:'Bottoms', price:1599, bg:'#8C7B6B', sil:'trousers', img:'/photo-1742472471415-d07eb913371d', tags:['cargo','shorts','streetwear','relaxed','everyday']},
  {id:10, name:'Original Print Crop Tee', brand:'CommonGround', brandType:'Homegrown', category:'Tops', price:999, bg:'#D9A5A0', sil:'tee', img:'/photo-1602100685024-c052aed5975a', tags:['tee','crop','fitted','graphic','everyday']},
  {id:11, name:'Limited Drop Varsity Jacket', brand:'Back Alley Bodega', brandType:'Homegrown', category:'Outerwear', price:3499, bg:'#3B3A36', sil:'jacket', img:'/photo-1682354163828-d1d56c380431', tags:['jacket','streetwear','oversized','event']},
  {id:12, name:'Canvas Low-Top Sneaker', brand:'Bonkers Corner', brandType:'Homegrown', category:'Footwear', price:2499, bg:'#E3D5C0', sil:'sneaker', img:'/photo-1560769629-975ec94e6a86', tags:['sneaker','minimal','everyday','streetwear']},
  {id:13, name:'Canvas Tote Bag', brand:'Veirdo', brandType:'Homegrown', category:'Accessories', price:1299, bg:'#C97B63', sil:'bag', img:'/photo-1687433207116-14081c5c716c', tags:['bag','everyday','minimal']},

  {id:14, name:'Camo Shark Full-Zip Hoodie', brand:'BAPE', brandType:'International', category:'Outerwear', price:4999, bg:'#3B3A36', sil:'hoodie', img:'/photo-1578768079052-aa76e52ff62e', tags:['hoodie','streetwear','graphic','oversized','event']},
  {id:15, name:'Ape Head Sneaker', brand:'BAPE', brandType:'International', category:'Footwear', price:5999, bg:'#E3D5C0', sil:'sneaker', img:'/photo-1564518125914-014ebd5f0346', tags:['sneaker','streetwear','event','date night']},
  {id:16, name:'Graphic Motorcycle Tee', brand:'Neighborhood', brandType:'International', category:'Tops', price:2499, bg:'#8C7B6B', sil:'tee', img:'/photo-1724161172970-04b9819f6181', tags:['tee','graphic','streetwear','relaxed']},
  {id:17, name:'Military Cargo Trousers', brand:'WTAPS', brandType:'International', category:'Bottoms', price:3999, bg:'#8C7B6B', sil:'trousers', img:'/photo-1746591847547-200f313178c9', tags:['cargo','trousers','streetwear','relaxed']},
  {id:18, name:'Heart Logo Tee', brand:'Comme des Garçons PLAY', brandType:'International', category:'Tops', price:3499, bg:'#D8CBB8', sil:'tee', img:'/photo-1714144069905-f9bd839184af', tags:['tee','minimal','graphic','date night','event']},
  {id:19, name:'Punk Deconstructed Jacket', brand:'Undercover', brandType:'International', category:'Outerwear', price:5499, bg:'#3B3A36', sil:'jacket', img:'/photo-1663374723561-885d23959717', tags:['jacket','event','date night','boho']},
  {id:20, name:'Color-Block Sweatshirt', brand:'Ader Error', brandType:'International', category:'Outerwear', price:3799, bg:'#A9B4C0', sil:'hoodie', img:'/photo-1601754664414-aa3e4f42e6d4', tags:['sweatshirt','minimal','graphic','everyday']},
  {id:21, name:'Typography Tech Jacket', brand:'thisisneverthat', brandType:'International', category:'Outerwear', price:3299, bg:'#8C7B6B', sil:'jacket', img:'/photo-1771310972847-dbda0c860cab', tags:['jacket','streetwear','relaxed','everyday']},
  {id:22, name:'Y2K Oversized Denim', brand:'We11done', brandType:'International', category:'Bottoms', price:3599, bg:'#A9B4C0', sil:'trousers', img:'/photo-1746399565178-4ff950f81b45', tags:['denim','trousers','oversized','streetwear']},
  {id:23, name:'Asymmetric Knit Top', brand:'Andersson Bell', brandType:'International', category:'Tops', price:2999, bg:'#D9A5A0', sil:'tee', img:'/photo-1625910513394-ea511bed44ca', tags:['knit','fitted','minimal','date night','event','office']},
  {id:24, name:'8-Ball Graphic Tee', brand:'Stüssy', brandType:'International', category:'Tops', price:1999, bg:'#3B3A36', sil:'tee', img:'/photo-1544441892-715e8df46144', tags:['tee','graphic','streetwear','relaxed','everyday']},
  {id:25, name:'Detroit Chore Jacket', brand:'Carhartt WIP', brandType:'International', category:'Outerwear', price:3199, bg:'#8C7B6B', sil:'jacket', img:'/photo-1771310961705-c8b34eddbe9e', tags:['jacket','streetwear','relaxed','everyday']},
  {id:26, name:'Classic Logo Cap', brand:'Stüssy', brandType:'International', category:'Accessories', price:1499, bg:'#D8CBB8', sil:'cap', img:'/photo-1622445272054-ef281b3b8639', tags:['cap','streetwear','everyday']},

  /* ---- WOMEN'S EDIT ---- brand names used for demo/curation flavor;
     LAP has no affiliation with these brands. Photography verified
     free-to-use editorial/product shots with no visible competing
     logos or branding on the garments. ---- */
  {id:27, name:'Floral Wrap Midi Dress', brand:'Global Desi', brandType:'Homegrown', category:'Dresses', price:1799, bg:'#D9A5A0', sil:'dress', dept:'Women', img:'/photo-1583316174775-bd6dc0e9f298', tags:['dress','fitted','date night','event','relaxed']},
  {id:28, name:'Block-Print Kurta Set', brand:'W for Woman', brandType:'Homegrown', category:'Ethnic', price:1999, bg:'#C97B63', sil:'dress', dept:'Women', img:'/photo-1741847639057-b51a25d42892', tags:['ethnic','kurta','relaxed','everyday','festive']},
  {id:29, name:'High-Rise Straight Jeans', brand:'Only', brandType:'International', category:'Bottoms', price:1999, bg:'#A9B4C0', sil:'trousers', dept:'Women', img:'/photo-1475178626620-a4d074967452', tags:['denim','trousers','fitted','everyday','minimal','office']},
  {id:30, name:'Pleated Satin Blouse', brand:'Vero Moda', brandType:'International', category:'Tops', price:1599, bg:'#D8CBB8', sil:'tee', dept:'Women', img:'/photo-1546102597-4ac3be10560e', tags:['top','blouse','fitted','minimal','date night','event','office']},
  {id:31, name:'Strappy Block Heels', brand:'Mochi', brandType:'Homegrown', category:'Footwear', price:1799, bg:'#E3D5C0', sil:'sneaker', dept:'Women', img:'/photo-1457972899686-77aec5e247ce', tags:['heels','event','date night']},
  {id:32, name:'Gold-Plated Drop Earrings', brand:'Accessorize', brandType:'International', category:'Accessories', price:799, bg:'#D8CBB8', sil:'bag', dept:'Women', img:'/photo-1758995115682-1452a1a9e35b', tags:['jewellery','minimal','date night','event','festive']},
  {id:33, name:'Zari-Embroidered Saree', brand:'Biba', brandType:'Homegrown', category:'Ethnic', price:2999, bg:'#C97B63', sil:'dress', dept:'Women', img:'/photo-1769500804057-ca1391bf4617', tags:['ethnic','saree','festive','event']},
  {id:34, name:'Matching Denim Co-ord Set', brand:'Newme', brandType:'Homegrown', category:'Co-ords', price:2299, bg:'#A9B4C0', sil:'jacket', dept:'Women', img:'/photo-1756865271059-af17c35f368d', tags:['denim','co-ord','streetwear','everyday','relaxed']},
  {id:35, name:'Classic White Sneaker', brand:'Forever New', brandType:'International', category:'Footwear', price:2199, bg:'#E3D5C0', sil:'sneaker', dept:'Women', img:'/photo-1535463861654-838685c8e158', tags:['sneaker','minimal','everyday']},
  {id:36, name:'Structured Blazer', brand:'Mango', brandType:'International', category:'Outerwear', price:2799, bg:'#D9A5A0', sil:'jacket', dept:'Women', img:'/photo-1571513722275-4b41940f54b8', tags:['blazer','fitted','minimal','event','everyday','office']},
];

const SIZES_APPAREL = ['XS','S','M','L','XL'];
const SIZES_SHOE = ['UK6','UK7','UK8','UK9','UK10'];

function sizesFor(p){ return p.category === 'Footwear' ? SIZES_SHOE : SIZES_APPAREL; }

/* ---------- STATE ---------- */
let cart = []; // {id, size, qty}
let currentFilter = 'all';
let currentCategory = 'all';
let currentSearch = '';
let quizAnswers = {occasion:null, vibe:null};
let measurements = {heightCm:null, weightKg:null};
let timerInterval = null;

/* ---------- RENDER HELPERS ---------- */
function money(n){ return '₹' + n.toLocaleString('en-IN'); }

function productCard(p){
  const tagClass = p.brandType === 'International' ? 'intl' : 'home';
  return `
  <div class="product-card" data-id="${p.id}">
    <div class="product-art" style="background:${p.bg}">
      <span class="product-tag ${tagClass}">${p.brandType}</span>
      <img class="product-photo" src="${productImg(p,800)}" alt="${p.name} — ${p.brand}" loading="lazy">
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
  if(nav === 'style'){ openStyleModal(); document.getElementById('mainNav').classList.remove('mobile-open'); return; }
  if(nav === 'shop'){
    currentFilter = navEl.dataset.filter || 'all';
    currentCategory = 'all';
    currentSearch = '';
    document.getElementById('searchInput').value = '';
    renderShop();
  }
  document.getElementById('mainNav').classList.remove('mobile-open');
  showView(nav === 'style' ? 'home' : nav);
});

document.getElementById('menuBtn').addEventListener('click', ()=>{
  document.getElementById('mainNav').classList.toggle('mobile-open');
});

/* ---------- HOME ---------- */
function renderHome(){
  renderGrid('grid-women', PRODUCTS.filter(p=>p.dept==='Women').slice(0,8));
  renderGrid('grid-homegrown', PRODUCTS.filter(p=>p.brandType==='Homegrown').slice(0,8));
  renderGrid('grid-international', PRODUCTS.filter(p=>p.brandType==='International').slice(0,8));
  renderGrid('grid-office', PRODUCTS.filter(p=>p.tags.includes('office')).slice(0,8));
  const brandCount = new Set(PRODUCTS.map(p=>p.brand)).size;
  const pieceCountEl = document.getElementById('statPieces');
  const brandCountEl = document.getElementById('statBrands');
  if(pieceCountEl) pieceCountEl.textContent = PRODUCTS.length;
  if(brandCountEl) brandCountEl.textContent = brandCount;
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
    const byBrand = currentFilter === 'all' || p.brandType === currentFilter ||
      (currentFilter === 'Women' && p.dept === 'Women') ||
      (currentFilter === 'Office' && p.tags.includes('office'));
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
  const related = PRODUCTS.filter(x=>x.id!==p.id && x.category===p.category).slice(0,3);
  const sizes = sizesFor(p);

  document.getElementById('pdpWrap').innerHTML = `
    <div style="grid-column:1/-1">
      <a href="#" class="back-link" id="pdpBack">← Back</a>
    </div>
    <div class="pdp-media">
      <div class="pdp-art" style="background:${p.bg}">
        <span class="product-tag ${p.brandType==='International'?'intl':'home'}" style="position:absolute;top:14px;left:14px;">${p.brandType}</span>
        <img class="product-photo" src="${productImg(p,1000)}" alt="${p.name} — ${p.brand}">
      </div>
      <div class="pdp-thumbs">
        ${[0,1,2].map(i=>`<div class="pdp-thumb ${i===0?'active':''}" style="background:${p.bg}"><img src="${productImg(p,140)}" alt=""></div>`).join('')}
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
    return `
    <div class="drawer-item">
      <div class="drawer-item-art" style="background:${p.bg}"><img src="${productImg(p,140)}" alt=""></div>
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
    checkQuizComplete();
  });
});

const heightInput = document.getElementById('heightInput');
const weightInput = document.getElementById('weightInput');
[heightInput, weightInput].forEach(el=>{
  if(!el) return;
  el.addEventListener('input', ()=>{
    measurements.heightCm = parseFloat(heightInput.value) || null;
    measurements.weightKg = parseFloat(weightInput.value) || null;
    checkQuizComplete();
  });
});

function checkQuizComplete(){
  const allSet = quizAnswers.occasion && quizAnswers.vibe &&
    measurements.heightCm > 0 && measurements.weightKg > 0;
  document.getElementById('revealEdit').disabled = !allSet;
}

/* ---------- Rules-based body-type calculator ----------
   Deterministic BMI + height banding mapped to a fit + colour-note
   recommendation. This is NOT a real AI / computer-vision model —
   just simple, transparent rule-matching, disclosed below. ---------- */
function computeBodyProfile(heightCm, weightKg){
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  let fitRec, buildNote;
  if(bmi < 18.5){
    fitRec = 'fitted';
    buildNote = 'On a leaner frame, fitted and tailored pieces tend to define your shape best — very oversized cuts can swallow it.';
  } else if(bmi < 25){
    fitRec = 'relaxed';
    buildNote = 'Your proportions carry both fitted and relaxed cuts well — we\'re leaning relaxed here for everyday ease.';
  } else {
    fitRec = 'relaxed';
    buildNote = 'Relaxed, structured pieces (a chore jacket, a straight-leg trouser) skim rather than cling — comfortable without losing shape.';
  }

  let heightNote;
  if(heightCm < 160){
    heightNote = 'At your height, a higher waistline and a cropped or ankle-length hem will read taller and elongate the leg line.';
  } else if(heightCm <= 172){
    heightNote = 'That\'s an average frame to dress — most proportions on LAP will sit true to how they\'re shown.';
  } else {
    heightNote = 'With a taller frame, oversized and longline pieces will hang the way they\'re actually designed to.';
  }

  const colorNotes = {
    minimal: 'Stick to a tight, monochrome palette — black, ink, and stone — for a clean, elongating line.',
    streetwear: 'One contrast colour-block against a relaxed silhouette reads intentional, not busy.',
    boho: 'Warm, earthy tones — rust, olive, terracotta — suit relaxed, flowing fits best.',
    office: 'Keep the base tailored and neutral — navy, ink, camel — then let one accessory (a belt, a bold shoe, statement jewellery) do the personality, rather than the whole outfit.'
  };

  return {
    bmi: Math.round(bmi * 10) / 10,
    fitRec,
    label: `${heightCm < 160 ? 'Petite' : heightCm <= 172 ? 'Average-height' : 'Tall'} frame`,
    note: `${buildNote} ${heightNote}`,
    colorNote: colorNotes[quizAnswers.vibe] || 'Neutral tones work as a base — add one accent piece for personality.'
  };
}

document.getElementById('revealEdit').addEventListener('click', ()=>{
  const profile = computeBodyProfile(measurements.heightCm, measurements.weightKg);
  const wanted = [quizAnswers.occasion, quizAnswers.vibe, profile.fitRec];
  const scored = PRODUCTS.map(p=>{
    const score = wanted.reduce((s,w)=> s + (p.tags.includes(w) ? 1 : 0), 0);
    return {p, score};
  }).sort((a,b)=>b.score-a.score);
  const top = scored.slice(0,4).map(s=>s.p);
  renderGrid('styleResultGrid', top);
  const noteEl = document.getElementById('bodyProfileNote');
  if(noteEl){
    noteEl.innerHTML = `<strong>${profile.label} · recommending ${profile.fitRec} fits</strong><br>${profile.note}<br>${profile.colorNote}`;
  }
  document.getElementById('styleQuiz').hidden = true;
  document.getElementById('styleResult').hidden = false;
  document.getElementById('styleHeading').textContent = 'Your edit is ready';
});

document.getElementById('restartQuiz').addEventListener('click', ()=>{
  quizAnswers = {occasion:null, vibe:null};
  measurements = {heightCm:null, weightKg:null};
  if(heightInput) heightInput.value = '';
  if(weightInput) weightInput.value = '';
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

/* ---------- WAITLIST ----------
   Wired to Formspree. NOTE for the LAP team: replace FORMSPREE_ENDPOINT
   below with your real form endpoint from formspree.io (free — sign up
   with the email you want submissions delivered to, e.g.
   fauzia.kmr@gmail.com, then paste the "https://formspree.io/f/xxxxxxxx"
   URL it gives you). Until that's done, submissions are saved locally
   in this browser only, as a working demo. ---------- */
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

document.querySelectorAll('.waitlist-form').forEach(form=>{
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const msgEl = form.querySelector('.waitlist-msg');
    const data = new FormData(form);
    const email = (data.get('email') || '').toString().trim();
    if(!email || !email.includes('@')){
      if(msgEl){ msgEl.textContent = 'Enter a valid email.'; msgEl.className = 'waitlist-msg error'; }
      return;
    }
    const originalLabel = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Joining…';
    try{
      if(FORMSPREE_ENDPOINT.includes('YOUR_FORM_ID')){
        // Endpoint not configured yet — save locally so the demo still works end-to-end.
        const saved = JSON.parse(localStorage.getItem('lap_waitlist') || '[]');
        saved.push({name:data.get('name')||'', email, at:new Date().toISOString()});
        localStorage.setItem('lap_waitlist', JSON.stringify(saved));
      } else {
        await fetch(FORMSPREE_ENDPOINT, {
          method:'POST',
          headers:{'Accept':'application/json'},
          body:data
        });
      }
      form.reset();
      if(msgEl){ msgEl.textContent = "You're on the list — we'll email you the moment LAP goes live."; msgEl.className = 'waitlist-msg success'; }
    } catch(err){
      if(msgEl){ msgEl.textContent = "Couldn't submit right now — please try again in a moment."; msgEl.className = 'waitlist-msg error'; }
    } finally{
      btn.disabled = false;
      btn.textContent = originalLabel;
    }
  });
});

/* ---------- INIT ---------- */
renderHome();
renderShop();
updateCartCount();
renderDrawer();
resetTimer();
