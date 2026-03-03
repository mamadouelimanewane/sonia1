/* ==========================================================================
   SooWigs Luxury Hair — JavaScript
   ========================================================================== */

const PRODUCTS = [
  { id: 1, name: "Brown Girl — Caramel Silk Lace", price: 155000, img: "https://images.unsplash.com/photo-1595475884196-27382d8c3639?q=80&w=400" },
  { id: 2, name: "Balayage Collection — Honey Blend", price: 185000, img: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=400" },
  { id: 3, name: "Raw Indian Bodywave — 24 inch", price: 95000, img: "https://images.unsplash.com/photo-1595475884196-27382d8c3639?q=80&w=400" },
  { id: 4, name: "Vietnamese Virgin Straight — Bob 12\"", price: 75000, img: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=400" },
];

let cart = [];

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  grid.innerHTML = PRODUCTS.map(p => `
    <div class="product-card">
      <img src="${p.img}" class="product-img" alt="${p.name}">
      <div class="product-info">
        <h3>${p.name}</h3>
        <p class="product-price">${p.price.toLocaleString()} FCFA</p>
        <button class="btn btn-primary" style="margin-top:10px; padding:10px 20px;" onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    </div>
  `).join('');
}

function addToCart(id) {
  const p = PRODUCTS.find(x => x.id === id);
  cart.push(p);
  updateCartUI();
  openCart();
}

function updateCartUI() {
  document.getElementById('cartCount').textContent = cart.length;
  const body = document.getElementById('cartBody');
  const footer = document.getElementById('cartFooter');

  if (cart.length === 0) {
    body.innerHTML = "<p>Your cart is empty.</p>";
    footer.style.display = 'none';
  } else {
    body.innerHTML = cart.map(item => `
      <div style="display:flex; gap:10px; margin-bottom:15px; border-bottom:1px solid #eee; padding-bottom:10px;">
        <img src="${item.img}" style="width:50px; height:50px; object-fit:cover;">
        <div>
          <p style="font-weight:600; font-size:0.9rem;">${item.name}</p>
          <p style="color:var(--primary)">${item.price.toLocaleString()} FCFA</p>
        </div>
      </div>
    `).join('');
    footer.style.display = 'block';
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('cartTotal').textContent = total.toLocaleString() + " FCFA";
  }
}

function openCart() {
  document.getElementById('cartDrawer').classList.add('active');
  document.getElementById('cartOverlay').classList.add('active');
}

function closeCart() {
  document.getElementById('cartDrawer').classList.remove('active');
  document.getElementById('cartOverlay').classList.remove('active');
}

let activeResProductId = null;

function openReservation(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  activeResProductId = id;

  const caution = Math.round(p.price * 0.3);
  document.getElementById('reservationOverlay').classList.add('active');

  // Update modal content
  const modal = document.querySelector('.reservation-modal');
  modal.innerHTML = `
    <button class="reservation-close" onclick="closeReservation()">✕</button>
    <h2 style="font-family:var(--font-heading); color:var(--primary); margin-bottom:10px;">Custom Wig Construction</h2>
    <p style="font-size:0.9rem; color:var(--text-light); margin-bottom:20px;">Get a wig perfectly fitted to your head measurements.</p>
    
    <div style="background:var(--accent); padding:15px; border-radius:10px; margin-bottom:20px; display:flex; gap:15px; align-items:center;">
        <img src="${p.img}" style="width:60px; height:60px; object-fit:cover; border-radius:5px;">
        <div>
            <p style="font-weight:600; font-size:0.9rem;">${p.name}</p>
            <p style="color:var(--primary); font-weight:700;">Deposit (30%): ${caution.toLocaleString()} FCFA</p>
        </div>
    </div>

    <form id="resForm" onsubmit="submitReservation(event)">
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:20px;">
        <input type="text" placeholder="First Name" required style="padding:10px; border:1px solid #ddd; border-radius:5px;">
        <input type="text" placeholder="Last Name" required style="padding:10px; border:1px solid #ddd; border-radius:5px;">
        <input type="tel" placeholder="WhatsApp Number" required style="padding:10px; border:1px solid #ddd; border-radius:5px; grid-column:span 2;">
      </div>
      
      <p style="font-weight:600; margin-bottom:10px; font-size:0.8rem; text-transform:uppercase;">Measurements (Inches)</p>
      <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; margin-bottom:25px;">
        <input type="number" step="0.1" placeholder="Circumf." required style="padding:8px; border:1px solid #ddd;">
        <input type="number" step="0.1" placeholder="Front-Nape" required style="padding:8px; border:1px solid #ddd;">
        <input type="number" step="0.1" placeholder="Ear-Ear" required style="padding:8px; border:1px solid #ddd;">
      </div>

      <button type="submit" class="btn btn-primary btn-full" style="width:100%">Confirm & Pay Deposit</button>
    </form>
  `;
}

function submitReservation(e) {
  e.preventDefault();
  alert("Merci ! Votre demande de construction personnalisée a été envoyée. Nous vous contacterons sur WhatsApp pour le règlement de l'acompte.");
  closeReservation();
}

function closeReservation() {
  document.getElementById('reservationOverlay').classList.remove('active');
}

window.onload = () => {
  renderProducts();
};
