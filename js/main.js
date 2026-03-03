/* ==========================================================================
   SooWigs Luxury Lifestyle — Dakar Premium Catalog
   ========================================================================== */

const PRODUCTS = [
  // HAIR / LUXURY WIGS
  {
    id: 1,
    category: "Hair",
    name: "Pure Indian Raw — Bone Straight",
    price: 185000,
    img: "https://images.unsplash.com/photo-1595475884196-27382d8c3639?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 2,
    category: "Hair",
    name: "Vietnamese Super Double Drawn",
    price: 225000,
    img: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 3,
    category: "Hair",
    name: "Closure 5x5 HD Lace — 18 inch",
    price: 95000,
    img: "https://images.unsplash.com/photo-1595475884196-27382d8c3639?q=80&w=600&auto=format&fit=crop"
  },

  // BAGS / MAROQUINERIE
  {
    id: 5,
    category: "Bags",
    name: "Safari Croco Tote Bag",
    price: 85000,
    img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 6,
    category: "Bags",
    name: "Almadies Night Clutch",
    price: 65000,
    img: "https://images.unsplash.com/photo-1566150905458-1bf1fd113f0d?q=80&w=600&auto=format&fit=crop"
  },

  // SHOES
  {
    id: 9,
    category: "Shoes",
    name: "Luxury Silk Stiletto — Gold",
    price: 75000,
    img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=600&auto=format&fit=crop"
  },

  // BEAUTY
  {
    id: 8,
    category: "Beauty",
    name: "Melanin Glow Foundation",
    price: 35000,
    img: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?q=80&w=600&auto=format&fit=crop"
  }
];

let cart = [];
let activeCategory = 'All';

function renderProducts(filter = 'All') {
  activeCategory = filter;
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  const filtered = filter === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);

  grid.innerHTML = filtered.map(p => `
        <div class="product-card">
            <div class="product-img-wrapper">
                <img src="${p.img}" alt="${p.name}">
                <button class="quick-add" onclick="addToCart(${p.id})">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                        <line x1="3" y1="6" x2="21" y2="6"/>
                        <path d="M16 10a4 4 0 0 1-8 0"/>
                    </svg>
                </button>
            </div>
            <div class="product-info">
                <p class="product-category">${p.category}</p>
                <h3 class="product-name">${p.name}</h3>
                <p class="product-price">${p.price.toLocaleString()} FCFA</p>
                <button class="btn btn-outline-small" onclick="addToCart(${p.id})">Add to cart</button>
            </div>
        </div>
    `).join('');
}

// CART LOGIC
function addToCart(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  cart.push(p);
  updateCartUI();
  openCart();
}

function updateCartUI() {
  const count = document.getElementById('cartCount');
  if (count) count.textContent = cart.length;

  const body = document.getElementById('cartBody');
  const footer = document.getElementById('cartFooter');
  if (!body) return;

  if (cart.length === 0) {
    body.innerHTML = `
            <div style="text-align:center; padding:100px 0;">
                <p style="font-family:var(--font-heading); font-size:1.5rem; margin-bottom:10px;">Your cart is empty.</p>
                <p style="color:#999; font-size:0.9rem;">Start browsing our collections.</p>
            </div>`;
    if (footer) footer.style.display = 'none';
  } else {
    body.innerHTML = cart.map((item, index) => `
            <div style="display:flex; gap:20px; margin-bottom:25px; align-items:center;">
                <img src="${item.img}" style="width:100px; height:130px; object-fit:cover;">
                <div style="flex:1">
                    <p style="font-size:0.75rem; color:var(--gold); text-transform:uppercase;">${item.category}</p>
                    <p style="font-family:var(--font-heading); font-size:1.1rem; margin-bottom:5px;">${item.name}</p>
                    <p style="font-weight:600;">${item.price.toLocaleString()} FCFA</p>
                </div>
                <button onclick="removeFromCart(${index})" style="background:none; border:none; cursor:pointer; color:#999;">✕</button>
            </div>
        `).join('');
    if (footer) footer.style.display = 'block';
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const totalEl = document.getElementById('cartTotal');
    if (totalEl) totalEl.textContent = total.toLocaleString() + " FCFA";
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

function openCart() {
  document.getElementById('cartDrawer').classList.add('active');
  document.getElementById('cartOverlay').classList.add('active');
}

function closeCart() {
  document.getElementById('cartDrawer').classList.remove('active');
  document.getElementById('cartOverlay').classList.remove('active');
}

// NAVIGATION FILTERS
function setActiveFilter(btn, filter) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderProducts(filter);
}

// CUSTOM ORDER MODAL (PREMIUM)
function openReservation(id) {
  const overlay = document.getElementById('reservationOverlay');
  if (overlay) overlay.classList.add('active');
}

function closeReservation() {
  const overlay = document.getElementById('reservationOverlay');
  if (overlay) overlay.classList.remove('active');
}

window.onload = () => {
  renderProducts();
  updateCartUI();
};
