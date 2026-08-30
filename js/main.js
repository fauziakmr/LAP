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
   prototype — LAP has no affiliation with these brands. Curated
   toward a 2026 editorial / Instagram-discovery point of view:
   oversized and wide-leg silhouettes, real independent/D2C Indian
   labels beyond the obvious five, and global reference brands —
   deliberately NOT a "Myntra with fewer products" catalogue. ---- */
const PRODUCTS = [
  /* ---- HOMEGROWN — Instagram-first / independent Indian labels ---- */
  {id:1, name:'Oversized Utility Jacket', brand:'Garuda SS', brandType:'Homegrown', category:'Outerwear', price:4499, bg:'#2B2A27', sil:'jacket', img:'/photo-1462430638866-7ad892655344', tags:['jacket','oversized','streetwear','tokyo','relaxed','everyday','techwear']},
  {id:2, name:'Boxy Graphic Tee', brand:'Huemn', brandType:'Homegrown', category:'Tops', price:1599, bg:'#2B2A27', sil:'tee', img:'/photo-1689044611227-3267fabaf76a', tags:['tee','oversized','graphic','streetwear','everyday','clean','tokyo']},
  {id:3, name:'Relaxed Wide-Leg Denim', brand:'Freakins', brandType:'Homegrown', category:'Bottoms', price:2299, bg:'#A9B4C0', sil:'trousers', img:'/photo-1608370946545-7d93571b5593', tags:['denim','wide-leg','relaxed','everyday','clean','minimal','off-duty']},
  {id:4, name:'Unisex Camp Collar Shirt', brand:'Bluorng', brandType:'Homegrown', category:'Tops', price:1999, bg:'#D8CBB8', sil:'tee', img:'/photo-1739652398636-80c7ea73291e', tags:['shirt','relaxed','everyday','office','clean']},
  {id:5, name:'Reworked Denim Trucker', brand:'Almost Gods', brandType:'Homegrown', category:'Outerwear', price:3799, bg:'#8C7B6B', sil:'jacket', img:'/photo-1600574691453-499962cc0611', tags:['jacket','upcycled','streetwear','relaxed','everyday']},
  {id:6, name:'Panel Carpenter Trousers', brand:'The Pant Project', brandType:'Homegrown', category:'Bottoms', price:2599, bg:'#8C7B6B', sil:'trousers', img:'/photo-1746591847547-200f313178c9', tags:['trousers','utility','relaxed','streetwear','everyday']},
  {id:7, name:'Tie-Dye Boxy Shirt', brand:'NorBlack NorWhite', brandType:'Homegrown', category:'Tops', price:2299, bg:'#C97B63', sil:'tee', img:'/photo-1638627433693-604671edcf66', tags:['shirt','tie-dye','streetwear','desi','festive','relaxed','boho']},
  {id:8, name:'Deconstructed Panel Trousers', brand:'Dhruv Kapoor', brandType:'Homegrown', category:'Bottoms', price:3999, bg:'#D8CBB8', sil:'trousers', img:'/photo-1762793193633-c26f3d34e710', tags:['trousers','tailored','event','office','statement']},
  {id:9, name:'Structured Two-Way Blazer', brand:'Two Point Two', brandType:'Homegrown', category:'Outerwear', price:3499, bg:'#D8CBB8', sil:'jacket', img:'/photo-1748620754982-0b343a1f7784', tags:['blazer','tailored','office','event','minimal']},
  {id:10, name:'Ribbed Seamless Top', brand:'Kica', brandType:'Homegrown', category:'Tops', price:1299, bg:'#D9A5A0', sil:'tee', img:'/photo-1592712148824-334083584cc1', tags:['top','fitted','minimal','everyday','clean']},
  {id:11, name:'Gender-Fluid Utility Overshirt', brand:'BISKIT', brandType:'Homegrown', category:'Outerwear', price:2799, bg:'#8C7B6B', sil:'jacket', img:'/photo-1775443600272-3b66002f3771', tags:['overshirt','utility','relaxed','streetwear']},
  {id:12, name:'Original Print Graphic Tee', brand:'CommonGround', brandType:'Homegrown', category:'Tops', price:1199, bg:'#2B2A27', sil:'tee', img:'/photo-1600871149968-44ccafa3b32a', tags:['tee','graphic','streetwear','everyday','clean']},
  {id:13, name:'Desi Grunge Graphic Tee', brand:'Veirdo', brandType:'Homegrown', category:'Tops', price:1299, bg:'#C97B63', sil:'tee', img:'/photo-1721637686340-de9f8cebda5a', tags:['tee','graphic','indie sleaze','streetwear','nostalgia']},
  {id:14, name:'Canvas Shoulder Bag', brand:'Bluorng', brandType:'Homegrown', category:'Accessories', price:1699, bg:'#8C7B6B', sil:'bag', img:'/photo-1559563458-527698bf5295', tags:['bag','everyday','minimal','streetwear','tokyo']},
  {id:15, name:'Retro Low-Top Sneaker', brand:'CommonGround', brandType:'Homegrown', category:'Footwear', price:2599, bg:'#E3D5C0', sil:'sneaker', img:'/photo-1560769629-975ec94e6a86', tags:['sneaker','retro','everyday','streetwear','off-duty']},

  /* ---- INTERNATIONAL — Tokyo/Seoul streetwear + Western editorial-minimal reference labels ---- */
  {id:16, name:'Camo Shark Full-Zip Hoodie', brand:'BAPE', brandType:'International', category:'Outerwear', price:4999, bg:'#2B2A27', sil:'hoodie', img:'/photo-1578768079052-aa76e52ff62e', tags:['hoodie','streetwear','graphic','oversized','tokyo','event']},
  {id:17, name:'Ape Head Low-Top Sneaker', brand:'BAPE', brandType:'International', category:'Footwear', price:5999, bg:'#E3D5C0', sil:'sneaker', img:'/photo-1564518125914-014ebd5f0346', tags:['sneaker','streetwear','tokyo','event']},
  {id:18, name:'Military Panel Cargo Trousers', brand:'WTAPS', brandType:'International', category:'Bottoms', price:3999, bg:'#8C7B6B', sil:'trousers', img:'/photo-1594035795072-3fcd236b7d83', tags:['cargo','trousers','streetwear','relaxed','tokyo']},
  {id:19, name:'Heart Logo Boxy Tee', brand:'Comme des Garçons PLAY', brandType:'International', category:'Tops', price:3499, bg:'#D8CBB8', sil:'tee', img:'/photo-1594035795435-be3b09601d40', tags:['tee','minimal','graphic','tokyo','date night']},
  {id:20, name:'Deconstructed Oversized Jacket', brand:'Undercover', brandType:'International', category:'Outerwear', price:5499, bg:'#2B2A27', sil:'jacket', img:'/photo-1663374723561-885d23959717', tags:['jacket','oversized','event','statement','tokyo','indie sleaze']},
  {id:21, name:'Color-Block Boxy Sweatshirt', brand:'Ader Error', brandType:'International', category:'Outerwear', price:3799, bg:'#A9B4C0', sil:'hoodie', img:'/photo-1601754664414-aa3e4f42e6d4', tags:['sweatshirt','minimal','graphic','everyday','seoul']},
  {id:22, name:'Typography Tech Overshirt', brand:'thisisneverthat', brandType:'International', category:'Outerwear', price:3299, bg:'#8C7B6B', sil:'jacket', img:'/photo-1771310972847-dbda0c860cab', tags:['overshirt','streetwear','relaxed','seoul','everyday']},
  {id:23, name:'Barrel-Leg Washed Denim', brand:'We11done', brandType:'International', category:'Bottoms', price:3599, bg:'#A9B4C0', sil:'trousers', img:'/photo-1746399565178-4ff950f81b45', tags:['denim','barrel-leg','streetwear','seoul','everyday']},
  {id:24, name:'Asymmetric Knit Top', brand:'Andersson Bell', brandType:'International', category:'Tops', price:2999, bg:'#D9A5A0', sil:'tee', img:'/photo-1625910513394-ea511bed44ca', tags:['knit','fitted','minimal','seoul','date night','office']},
  {id:25, name:'8-Ball Graphic Tee', brand:'Stüssy', brandType:'International', category:'Tops', price:1999, bg:'#2B2A27', sil:'tee', img:'/photo-1721637635502-b0abaaa75edb', tags:['tee','graphic','streetwear','everyday','indie sleaze','nostalgia']},
  {id:26, name:'Detroit Chore Jacket', brand:'Carhartt WIP', brandType:'International', category:'Outerwear', price:3199, bg:'#8C7B6B', sil:'jacket', img:'/photo-1608976198709-5e70a09b9ff0', tags:['jacket','chore','streetwear','everyday','off-duty']},
  {id:27, name:'Structured Mini Shoulder Bag', brand:'JW PEI', brandType:'International', category:'Accessories', price:3299, bg:'#D9A5A0', sil:'bag', img:'/photo-1585488574745-5186ef0f1ddf', tags:['bag','structured','date night','event','minimal','office']},
  {id:28, name:'Relaxed Straight Trousers', brand:'COS', brandType:'International', category:'Bottoms', price:4499, bg:'#D8CBB8', sil:'trousers', img:'/photo-1627130697816-4d71dbfe6a5b', tags:['trousers','minimal','office','clean','relaxed']},
  {id:29, name:'Ribbed Baby Tee', brand:'Sporty & Rich', brandType:'International', category:'Tops', price:2199, bg:'#E3D5C0', sil:'tee', img:'/photo-1780566758129-3ec3b2f3b204', tags:['tee','fitted','minimal','clean','everyday','office']},
  {id:30, name:'Canvas Tote', brand:'Baggu', brandType:'International', category:'Accessories', price:1899, bg:'#C97B63', sil:'bag', img:'/photo-1612902456551-333ac5afa26e', tags:['bag','everyday','minimal','canvas','off-duty']},
  {id:31, name:'Retro Court Sneaker', brand:'Charles & Keith', brandType:'International', category:'Footwear', price:2999, bg:'#E3D5C0', sil:'sneaker', img:'/photo-1535463861654-838685c8e158', tags:['sneaker','minimal','everyday','retro','clean']},

  /* ---- WOMEN'S EDIT / DESI REMIX — real brand names used for demo/curation
     flavor on this concept prototype; LAP has no affiliation with these
     labels. Photography is licensed editorial street-style, not the
     brands' own product photography. ---- */
  {id:32, name:'Draped Sari-Inspired Midi Dress', brand:'Raw Mango', brandType:'Homegrown', category:'Dresses', price:4299, bg:'#C97B63', sil:'dress', dept:'Women', img:'/photo-1769275061786-c33ab1a284c8', tags:['ethnic','dress','drape','festive','event','desi','boho']},
  {id:33, name:'Wide-Leg Kurta Set', brand:'House of Masaba', brandType:'Homegrown', category:'Ethnic', price:2999, bg:'#C97B63', sil:'dress', dept:'Women', img:'/photo-1768478701507-24b1c8de2df0', tags:['ethnic','kurta','wide-leg','desi','everyday','festive','boho']},
  {id:34, name:'Bandhani Print Boxy Shirt', brand:'NorBlack NorWhite', brandType:'Homegrown', category:'Tops', price:2199, bg:'#C97B63', sil:'tee', dept:'Women', img:'/photo-1765796513352-a52bcd0c1329', tags:['shirt','desi','print','relaxed','everyday']},
  {id:35, name:'Silver Statement Jhumka Earrings', brand:'Studio Metallurgy', brandType:'Homegrown', category:'Accessories', price:899, bg:'#D8CBB8', sil:'bag', dept:'Women', img:'/photo-1535632787350-4e68ef0ac584', tags:['jewellery','silver','minimal','date night','desi']},
  {id:36, name:'Structured Slip Midi Dress', brand:'Reformation', brandType:'International', category:'Dresses', price:3799, bg:'#D9A5A0', sil:'dress', dept:'Women', img:'/photo-1601677083135-5b8c8affad82', tags:['dress','slip','fitted','date night','minimal','event']},
  {id:37, name:'Asymmetric Draped Dress', brand:'GANNI', brandType:'International', category:'Dresses', price:3299, bg:'#A9B4C0', sil:'dress', dept:'Women', img:'/photo-1692633190293-1295e9b68c63', tags:['dress','asymmetric','event','date night','statement']},
  {id:38, name:'High-Rise Wide-Leg Jeans', brand:'Damson Madder', brandType:'International', category:'Bottoms', price:2799, bg:'#A9B4C0', sil:'trousers', dept:'Women', img:'/photo-1610241532145-96771e5088e8', tags:['denim','wide-leg','everyday','minimal','clean']},
  {id:39, name:'Structured Blazer', brand:'Aritzia', brandType:'International', category:'Outerwear', price:3999, bg:'#D9A5A0', sil:'jacket', dept:'Women', img:'/photo-1761661769192-e2315b08717a', tags:['blazer','tailored','office','event','statement']},
  {id:40, name:'Ballet Flats', brand:'Charles & Keith', brandType:'International', category:'Footwear', price:2299, bg:'#E3D5C0', sil:'sneaker', dept:'Women', img:'/photo-1457972899686-77aec5e247ce', tags:['flats','minimal','date night','office','everyday']},
  {id:41, name:'Low-Rise Jean — Y2K Revival', brand:'We11done', brandType:'International', category:'Bottoms', price:2999, bg:'#3B3A36', sil:'trousers', dept:'Women', img:'/photo-1787527969253-94c4caf4415f', tags:['denim','skinny','indie sleaze','nostalgia','y2k']},
];

const SIZES_APPAREL = ['XS','S','M','L','XL'];
const SIZES_SHOE = ['UK6','UK7','UK8','UK9','UK10'];

function sizesFor(p){ return p.category === 'Footwear' ? SIZES_SHOE : SIZES_APPAREL; }

/* ---------- AESTHETIC EDITS + SHOP THE LOOK ----------
   Hand-curated by product id — not algorithmic, not tag-scored.
   This is the "we already did the scrolling for you" promise made
   literal: a human (well, this prototype's author) picked exactly
   these pieces for exactly this vibe. ---------- */
const CURATED_EDITS = {
  'tokyo-after-dark': [1,20,18,14,17,2],
  'off-duty': [26,3,30,15,12],
  '9-5-good': [39,28,29,27,40],
  'clean-fit': [10,38,35,31,29],
  'indie-sleaze': [13,25,41,20],
  'desi-remix': [33,34,32,35,7],
  'date-night': [36,37,35,27,40]
};
const EDIT_LABELS = {
  'tokyo-after-dark': 'Tokyo After Dark',
  'off-duty': 'Off-Duty',
  '9-5-good': '9–5, But Make It Good',
  'clean-fit': 'The Clean Fit',
  'indie-sleaze': 'Indie Sleaze',
  'desi-remix': 'Desi Remix',
  'date-night': 'Date Night, Decoded'
};
const LOOKS = [
  {key:'tokyo-minimal', label:'Look 01 — Tokyo Minimal', ids:[1,2,18,17], heroId:1},
  {key:'friday-office', label:'Look 02 — Friday Office', ids:[39,29,28,40], heroId:39},
  {key:'off-duty-look', label:'Look 03 — Off-Duty', ids:[26,12,3,15], heroId:26},
  {key:'date-night-look', label:'Look 04 — Date Night, Decoded', ids:[36,35,27,40], heroId:36}
];
const CATEGORY_LABEL = {Outerwear:'Jacket', Tops:'Top', Bottoms:'Bottom', Footwear:'Shoes', Accessories:'Bag', Dresses:'Dress', Ethnic:'Ethnic', 'Co-ords':'Co-ord'};

function curatedProducts(key){
  if(key === 'under-2000') return PRODUCTS.filter(p=>p.price<2000).sort((a,b)=>a.price-b.price).slice(0,8);
  if(CURATED_EDITS[key]) return CURATED_EDITS[key].map(id=>PRODUCTS.find(p=>p.id===id)).filter(Boolean);
  const look = LOOKS.find(l=>l.key===key);
  if(look) return look.ids.map(id=>PRODUCTS.find(p=>p.id===id)).filter(Boolean);
  return [];
}

function curatedLabel(key){
  if(key === 'under-2000') return 'Under ₹2,000';
  if(EDIT_LABELS[key]) return EDIT_LABELS[key];
  const look = LOOKS.find(l=>l.key===key);
  return look ? look.label : 'The Edit';
}

function lookCard(look){
  const items = look.ids.map(id=>PRODUCTS.find(p=>p.id===id)).filter(Boolean);
  const total = items.reduce((s,p)=>s+p.price,0);
  const heroP = PRODUCTS.find(p=>p.id===look.heroId) || items[0];
  return `
  <div class="look-card">
    <div class="look-hero"><img src="${productImg(heroP,900)}" alt="${look.label}" loading="lazy"></div>
    <div class="look-info">
      <p class="eyebrow">Shop the look</p>
      <h3>${look.label}</h3>
      <ul class="look-items">
        ${items.map(p=>`<li><span class="look-item-tag">${CATEGORY_LABEL[p.category]||p.category}</span><span class="look-item-name">${p.name}</span><span class="look-item-price">${money(p.price)}</span></li>`).join('')}
      </ul>
      <div class="look-total"><span>Total</span><strong>${money(total)}</strong></div>
      <button class="btn btn-primary full" data-nav="shop" data-edit="${look.key}">Shop the look →</button>
    </div>
  </div>`;
}

function renderLooks(){
  const el = document.getElementById('looks-grid');
  if(!el) return;
  el.innerHTML = LOOKS.map(lookCard).join('');
}

/* ---------- STATE ---------- */
let cart = []; // {id, size, qty}
let currentFilter = 'all';
let currentCategory = 'all';
let currentSearch = '';
let currentEdit = null;
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
    currentCategory = 'all';
    currentSearch = '';
    document.getElementById('searchInput').value = '';
    if(navEl.dataset.edit){
      currentEdit = navEl.dataset.edit;
      currentFilter = 'all';
    } else if(navEl.dataset.brand){
      currentEdit = null;
      currentFilter = 'all';
      currentSearch = navEl.dataset.brand;
      document.getElementById('searchInput').value = navEl.dataset.brand;
    } else {
      currentEdit = null;
      currentFilter = navEl.dataset.filter || 'all';
    }
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
  let list;
  if(currentEdit){
    list = curatedProducts(currentEdit);
  } else {
    list = PRODUCTS.filter(p=>{
      const byBrand = currentFilter === 'all' || p.brandType === currentFilter ||
        (currentFilter === 'Women' && p.dept === 'Women') ||
        (currentFilter === 'Office' && p.tags.includes('office'));
      const byCat = currentCategory === 'all' || p.category === currentCategory;
      const bySearch = matchesSearch(p, currentSearch);
      return byBrand && byCat && bySearch;
    });
  }

  document.querySelectorAll('#shopFilters .chip').forEach(c=>{
    c.classList.toggle('active', c.dataset.cat === currentCategory);
  });

  const eyebrow = document.getElementById('shopEyebrow');
  const title = document.getElementById('shopTitle');
  if(currentEdit){
    eyebrow.textContent = 'The Edit';
    title.textContent = curatedLabel(currentEdit);
  } else if(currentSearch){
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
  currentEdit = null;
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
    searchDrop.innerHTML = `<div class="search-drop-empty">No matches for “${q}” — that's intentional, LAP won't pad results. Try describing the vibe: “date night”, “under 2000”, or “streetwear”.</div>`;
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
  currentEdit = null;
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

/* ---------- CONVERSATIONAL SEARCH PROMPTS ----------
   Rotates the search placeholder through aesthetic/occasion-led
   prompts instead of a static "Search products..." — the copy is
   what makes it feel conversational, matchesSearch() underneath is
   unchanged. ---------- */
const SEARCH_PROMPTS = [
  'What are you looking for?',
  'I need a first-day-at-work outfit',
  'Something like this',
  'I want Tokyo streetwear',
  'Something under ₹2,000',
  'I have a date tonight',
  'I want to look expensive',
  "I don't know what I want"
];
let searchPromptIdx = 0;
setInterval(()=>{
  if(document.activeElement === searchInput || searchInput.value) return;
  searchPromptIdx = (searchPromptIdx + 1) % SEARCH_PROMPTS.length;
  searchInput.placeholder = SEARCH_PROMPTS[searchPromptIdx];
}, 3200);

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
    // Reveal the next question only after this one is answered —
    // makes the same rule-based quiz feel like a stepped conversation.
    if(group.dataset.key === 'occasion'){
      document.getElementById('quizVibe').hidden = false;
    }
    if(group.dataset.key === 'vibe'){
      document.getElementById('quizFinal').hidden = false;
    }
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
  document.getElementById('styleHeading').textContent = "Here's what we'd put you in";
});

document.getElementById('restartQuiz').addEventListener('click', ()=>{
  quizAnswers = {occasion:null, vibe:null};
  measurements = {heightCm:null, weightKg:null};
  if(heightInput) heightInput.value = '';
  if(weightInput) weightInput.value = '';
  document.querySelectorAll('.quiz-opts button').forEach(b=>b.classList.remove('active'));
  document.getElementById('revealEdit').disabled = true;
  document.getElementById('quizVibe').hidden = true;
  document.getElementById('quizFinal').hidden = true;
  document.getElementById('styleQuiz').hidden = false;
  document.getElementById('styleResult').hidden = true;
  document.getElementById('styleHeading').textContent = 'What are we dressing you for?';
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
renderLooks();
renderShop();
updateCartCount();
renderDrawer();
resetTimer();
