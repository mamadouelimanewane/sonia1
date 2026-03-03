/* ==========================================================================
   SooWigs Luxury Lifestyle — Dakar Premium Catalog
   ========================================================================== */

const PRODUCTS = [
  // CHEVELURE / MECHES
  {
    id: 1,
    category: "Chevelure",
    name: "Pure Indian Raw — Lisse Soyeux",
    price: 185000,
    img: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 2,
    category: "Chevelure",
    name: "Vietnamese Super Double Drawn",
    price: 245000,
    img: "https://images.unsplash.com/photo-1595152431003-7cb7f5bc6572?q=80&w=600&auto=format&fit=crop"
  },

  // LINGERIE
  {
    id: 7,
    category: "Lingerie",
    name: "Ensemble Soie — Rouge Crimson",
    price: 45000,
    img: "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?q=80&w=600&auto=format&fit=crop"
  },

  // ROBES
  {
    id: 10,
    category: "Robes",
    name: "Robe de Gala — Satin Noir",
    price: 125000,
    img: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=600&auto=format&fit=crop"
  },

  // ACCESSOIRES / SACS
  {
    id: 5,
    category: "Accessoires",
    name: "Sac Safari Croco — Émeraude",
    price: 85000,
    img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 11,
    category: "Accessoires",
    name: "Parure de Bijoux — Or 18K Style",
    price: 55000,
    img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop"
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
                <button class="btn btn-outline-small" onclick="addToCart(${p.id})">Ajouter au panier</button>
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
                <p style="font-family:var(--font-heading); font-size:1.5rem; margin-bottom:10px;">Votre panier est vide.</p>
                <p style="color:#999; font-size:0.9rem;">Commencez à parcourir nos collections d'exception.</p>
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
