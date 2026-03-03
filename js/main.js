/* ==========================================================================
   SooWigs Luxury Hair — JavaScript
   ========================================================================== */

const PRODUCTS = [
  // HAIR / WIGS
  { id: 1, category: "Hair", name: "Brown Girl — Caramel Silk Lace", price: 155000, img: "https://images.unsplash.com/photo-1595475884196-27382d8c3639?q=80&w=400" },
  { id: 2, category: "Hair", name: "Balayage Collection — Honey Blend", price: 185000, img: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=400" },
  { id: 3, category: "Hair", name: "Raw Indian Bodywave — 24 inch", price: 95000, img: "https://images.unsplash.com/photo-1595475884196-27382d8c3639?q=80&w=400" },

  // BAGS
  { id: 5, category: "Bags", name: "Croco Luxury Tote — Emerald", price: 65000, img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=400" },
  { id: 6, category: "Bags", name: "Night Out Clutch — Gold", price: 45000, img: "https://images.unsplash.com/photo-1566150905458-1bf1fd113f0d?q=80&w=400" },

  // LINGERIE
  { id: 7, category: "Lingerie", name: "Silk & Lace Set — Crimson", price: 35000, img: "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?q=80&w=400" },

  // BEAUTY / MAKEUP
  { id: 8, category: "Beauty", name: "Melanin Glow — Foundation Palette", price: 25000, img: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?q=80&w=400" }
];

let cart = [];
let activeResStep = 1;
let activeResProductId = null;

function renderProducts(filter = 'All') {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  const filtered = filter === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);

  grid.innerHTML = filtered.map(p => `
    <div class="product-card" data-category="${p.category}">
      <span class="category-badge">${p.category}</span>
      <img src="${p.img}" class="product-img" alt="${p.name}">
      <div class="product-info">
        <h3>${p.name}</h3>
        <p class="product-price">${p.price.toLocaleString()} FCFA</p>
        <div style="display:flex; gap:5px; margin-top:10px;">
          <button class="btn btn-primary" style="padding:10px 15px; font-size:0.8rem; flex:1;" onclick="addToCart(${p.id})">Add to Cart</button>
          ${p.category === 'Hair' ? `<button class="btn btn-outline" style="padding:10px 15px; font-size:0.8rem; margin-left:0; flex:1;" onclick="openReservation(${p.id})">Custom Fit</button>` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

// CART LOGIC
function addToCart(id) {
  const p = PRODUCTS.find(x => x.id === id);
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
    body.innerHTML = "<p style='text-align:center; padding:40px 0;'>Your cart is empty.</p>";
    if (footer) footer.style.display = 'none';
  } else {
    body.innerHTML = cart.map((item, index) => `
      <div style="display:flex; gap:15px; margin-bottom:15px; border-bottom:1px solid #eee; padding-bottom:10px; align-items:center;">
        <img src="${item.img}" style="width:60px; height:60px; object-fit:cover; border-radius:5px;">
        <div style="flex:1">
          <p style="font-weight:600; font-size:0.9rem; margin:0;">${item.name}</p>
          <p style="color:var(--primary); font-weight:700; margin:0;">${item.price.toLocaleString()} FCFA</p>
        </div>
        <button onclick="removeFromCart(${index})" style="background:none; border:none; cursor:pointer; color:#ccc;">✕</button>
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

// RESERVATION / CUSTOM FIT LOGIC
function openReservation(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  activeResProductId = id;
  activeResStep = 1;
  document.getElementById('reservationOverlay').classList.add('active');
  renderReservationModal();
}

function renderReservationModal() {
  const p = PRODUCTS.find(x => x.id === activeResProductId);
  const modal = document.querySelector('.reservation-modal');
  const deposit = Math.round(p.price * 0.3);

  let content = `
    <button class="reservation-close" onclick="closeReservation()">✕</button>
    <div class="res-header">
        <h2 style="font-family:var(--font-heading); color:var(--primary); margin-bottom:5px;">Construction Sur Mesure</h2>
        <div class="steps-indicator">
            <span class="${activeResStep === 1 ? 'active' : ''}">1. Contact</span>
            <span class="${activeResStep === 2 ? 'active' : ''}">2. Mesures</span>
        </div>
    </div>
  `;

  if (activeResStep === 1) {
    content += `
      <p style="font-size:0.9rem; color:var(--text-light); margin-bottom:20px;">Veuillez remplir vos informations pour la réservation.</p>
      <form id="resFormStep1" onsubmit="nextStep(event)">
        <div class="form-grid">
            <div class="input-group">
                <label>Prénom</label>
                <input type="text" id="res_fname" placeholder="Ex: Amina" required>
            </div>
            <div class="input-group">
                <label>Nom</label>
                <input type="text" id="res_lname" placeholder="Ex: Diop" required>
            </div>
            <div class="input-group full">
                <label>Numéro WhatsApp</label>
                <input type="tel" id="res_whatsapp" placeholder="+221 ..." required>
            </div>
            <div class="input-group full">
                <label>Adresse de Livraison (Dakar)</label>
                <input type="text" id="res_address" placeholder="Quartier, Rue..." required>
            </div>
        </div>
        <div class="res-summary">
            <span>Acompte à prévoir (30%):</span>
            <strong>${deposit.toLocaleString()} FCFA</strong>
        </div>
        <button type="submit" class="btn btn-primary btn-full">Suivant : Mesures ✂️</button>
      </form>
    `;
  } else {
    content += `
      <p style="font-size:0.9rem; color:var(--text-light); margin-bottom:15px;">Étape 2 : Mesures en pouces (Inches)</p>
      <div class="measure-guide">
         <div class="guide-item">
            <img src="https://via.placeholder.com/100x100?text=Circumf" alt="Circumference">
            <p>1. Circonférence</p>
         </div>
         <div class="guide-item">
            <img src="https://via.placeholder.com/100x100?text=Ear-Ear" alt="Ear to Ear">
            <p>2. Oreille à Oreille</p>
         </div>
      </div>
      <form id="resFormStep2" onsubmit="submitReservation(event)">
        <div class="form-grid-3">
            <div class="input-group">
                <label>1. Tour de tête</label>
                <input type="number" step="0.1" id="m_circum" placeholder="Ex: 22.5" required>
            </div>
            <div class="input-group">
                <label>2. Frontal-Nuque</label>
                <input type="number" step="0.1" id="m_nape" placeholder="Ex: 14.5" required>
            </div>
            <div class="input-group">
                <label>3. Oreille-Oreille</label>
                <input type="number" step="0.1" id="m_ear" placeholder="Ex: 12.0" required>
            </div>
        </div>
        <button type="button" class="btn btn-outline btn-full" onclick="prevStep()" style="margin:10px 0; width:100%;">Retour</button>
        <button type="submit" class="btn btn-primary btn-full" style="width:100%">Confirmer la Commande</button>
      </form>
    `;
  }

  modal.innerHTML = content;
}

function nextStep(e) {
  if (e) e.preventDefault();
  activeResStep = 2;
  renderReservationModal();
}

function prevStep() {
  activeResStep = 1;
  renderReservationModal();
}

function submitReservation(e) {
  e.preventDefault();
  const p = PRODUCTS.find(x => x.id === activeResProductId);
  const name = document.getElementById('res_fname') ? document.getElementById('res_fname').value : "Client";

  alert(`Merci ${name} ! Votre demande pour "${p.name}" a été enregistrée.\n\nNous vous contacterons sur WhatsApp pour valider l'acompte de ${(p.price * 0.3).toLocaleString()} FCFA.`);
  closeReservation();
}

function closeReservation() {
  document.getElementById('reservationOverlay').classList.remove('active');
}

function setActiveFilter(btn, filter) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderProducts(filter);
}

window.onload = () => {
  renderProducts();
  updateCartUI();
};

