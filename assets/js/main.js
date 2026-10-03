// ==========================================================================
// Sharma Enterprises - Three Sixty Luxury D2C Application Engine
// Master Carpenter Ramcharan Sharma & Sons • Est. 1998, Kirti Nagar, Delhi
// ==========================================================================

// Global Application State
let currentCategory = 'all';
let currentSearchQuery = '';
let currentWoodFilter = 'all';
let currentSort = 'featured';
let currentLanguage = 'en'; // Default: English
let isReadyQuickShipOnly = false;
let cartItems = [];
let wishlistSet = new Set(['prod-living-sofa', 'prod-dining-table']);

// Carpenter Contact Information
const CARPENTER_CONFIG = {
  name: "Master Ramcharan Sharma (उस्ताद जी)",
  supervisor: "Rohit Sharma (Site Visits)",
  phone: "+919876543210",
  altPhone: "+919812345678",
  whatsappNumber: "919876543210",
  shopName: "Sharma Enterprises - Master Carpenter Atelier",
  address: "Plot 42, Gali No. 3, Lakkar Mandi, Kirti Nagar Industrial Area, New Delhi - 110015"
};

// Announcement Ticker Messages
const TICKER_MESSAGES = {
  en: [
    "Bespoke Solid CP Teak & Sheesham Furniture • Direct Workshop Pricing • Free Delhi NCR Measurement",
    "Pre-Polish Inspection Welcome • Inspect Your Raw Wood Frame at Our Kirti Nagar Karkhana",
    "10-Year Written Letterhead Warranty • No Showroom Markups • Genuine Mortise & Tenon Craft"
  ],
  hi: [
    "100% असली सीजन्ड सागवान व शीशम • सीधा वर्कशॉप रेट • दिल्ली NCR में फ्री नाप व सलाह",
    "पॉलिश से पहले कच्चा ढांचा देखने की खुली छूट • कीर्ति नगर लक्कड़ मंडी वर्कशॉप",
    "10 साल की आधिकारिक लिखित वारंटी • चूल-कब्जे (Mortise & Tenon) की मजबूत जोड़ाई"
  ]
};
let currentTickerIndex = 0;
let tickerTimer = null;

// Bilingual Dictionaries for Full-Page Dynamic Switching
const PAGE_TRANSLATIONS = {
  en: {
    langBtnText: "🌐 हिन्दी",
    topPhone: "📞 Sharma Ji: +91 98765 43210",
    brandTitle: "SHARMA ENTERPRISES",
    brandSub: "BESPOKE SOLID WOOD CRAFT",
    headerConsult: "📐 Free Measurement",
    navAll: "All Furniture",
    navLiving: "Living",
    navDining: "Dining",
    navBedroom: "Bedroom",
    navMandir: "Mandir & Swings",
    navBespoke: "Bespoke Atelier",
    navStory: "Our Story",
    heroBadge: "THE BESPOKE COLLECTION",
    heroTitle: "Handcrafted Solid Wood Living",
    heroDesc: "Crafted from seasoned CP Teak and pure Indian Sheesham timber. Built by artisan woodworkers to your room's exact inches.",
    heroBtnExplore: "Explore All Pieces ↓",
    heroBtnBook: "Request Home Inching",
    catPillAll: "All Pieces (100+)",
    catPillLiving: "🛋️ Living & Sofas",
    catPillDining: "🪑 Dining Tables",
    catPillBedroom: "🛏️ Beds & Wardrobes",
    catPillMandir: "🛕 Temple Mandirs",
    catPillBalcony: "🌿 Teak Swings",
    catPillDoors: "⛩️ Carved Doors",
    catPillStudy: "💼 Executive Desks",
    readyLabel: "Ready in 7–12 Days",
    searchPlaceholder: "Search furniture...",
    woodAll: "Wood: All Species",
    woodTeak: "CP Teak (सागवान)",
    woodSheesham: "Pure Sheesham (शीशम)",
    woodOak: "White Oak (ओक)",
    sortFeatured: "Sort by: Featured",
    sortPriceLow: "Price: Low to High",
    sortPriceHigh: "Price: High to Low",
    sortRating: "Highest Rated",
    bespokeTag: "BESPOKE ATELIER",
    bespokeTitle: "Your Vision, Handcrafted to Perfection",
    bespokeDesc: "Have a reference photograph from Pinterest, Architectural Digest, or an architect layout? Sharma Enterprises crafts bespoke custom solid wood furniture from seasoned CP Teak and Indian Sheesham logs—crafted to your room's exact inches.",
    bespokeBtn: "Share Reference on WhatsApp →",
    processSubhead: "THE ATELIER PROCESS",
    processTitle: "How We Handcraft Your Piece",
    processDesc: "Uncompromising transparency from raw timber log selection to final in-home white-glove placement.",
    pricingSubhead: "TRANSPARENT WORKSHOP PRICING",
    pricingTitle: "Raw Material & Craftsmanship Rates",
    pricingDesc: "No showroom markups or middlemen commissions. We charge transparent timber footage + artisan wages.",
    bookSubhead: "ZERO-CHARGE SERVICE",
    bookTitle: "Book Free In-Home Measurement & Consultation",
    bookDesc: "Rohit or our senior carpenter will visit your residence anywhere in Delhi NCR. We measure your room inches, verify doorway clearances, and bring solid wood blocks & polish swatches. 100% free with zero obligation.",
    bookBtnSubmit: "Request Free Carpenter Visit (Zero Charge)",
    reviewsSubhead: "VOICE OF SATISFACTION",
    reviewsTitle: "Crafted for Discerning Homes",
    reviewsDesc: "Authentic feedback from real families who visited our Kirti Nagar workshop",
    faqSubhead: "TRANSPARENCY",
    faqTitle: "Frequently Asked Questions",
    cartDrawerTitle: "Inquiry Bag",
    cartSubtotalLabel: "Estimated Total:",
    cartCheckoutBtn: "Send Inquiry to Sharma Ji via WhatsApp",
    cartEmpty: "Your inquiry bag is empty. Add pieces to send a direct WhatsApp inquiry.",
    toastAdded: "added to inquiries!",
    toastLang: "Language switched to English"
  },
  hi: {
    langBtnText: "🌐 English",
    topPhone: "📞 शर्मा जी: +91 98765 43210",
    brandTitle: "शर्मा एंटरप्राइजेज",
    brandSub: "मास्टर कारपेंटर व सॉलिड वुड क्राफ्ट",
    headerConsult: "📐 फ्री नाप बुक करें",
    navAll: "सभी फर्नीचर",
    navLiving: "लिविंग रूम",
    navDining: "डाइनिंग",
    navBedroom: "बेडरूम",
    navMandir: "मंदिर व झूले",
    navBespoke: "कस्टम आर्डर",
    navStory: "हमारी कहानी",
    heroBadge: "पारंपरिक कारपेंटरी धरोहर",
    heroTitle: "सॉलिड वुड फर्नीचर, आपके सटीक नाप अनुसार",
    heroDesc: "100% असली सीजन्ड सागवान और देसी शीशम की लकड़ी से तैयार। बिना किसी शोरूम कमीशन के सीधे वर्कशॉप रेट पर।",
    heroBtnExplore: "सारा फर्नीचर देखें ↓",
    heroBtnBook: "घर पर नाप बुक करें",
    catPillAll: "सभी डिजाइन (100+)",
    catPillLiving: "🛋️ सोफा व लिविंग",
    catPillDining: "🪑 डाइनिंग टेबल",
    catPillBedroom: "🛏️ बेड व अलमारी",
    catPillMandir: "🛕 पूजा मंदिर",
    catPillBalcony: "🌿 लकड़ी के झूले",
    catPillDoors: "⛩️ नक्काशीदार दरवाजे",
    catPillStudy: "💼 स्टडी टेबल",
    readyLabel: "7–12 दिन में तैयार",
    searchPlaceholder: "फर्नीचर खोजें...",
    woodAll: "सभी लकड़ियां (Wood Species)",
    woodTeak: "सागवान (CP Teak)",
    woodSheesham: "देसी शीशम (Sheesham)",
    woodOak: "सफेद ओक (White Oak)",
    sortFeatured: "खास पसंदीदा डिजाइन",
    sortPriceLow: "कीमत: कम से ज्यादा",
    sortPriceHigh: "कीमत: ज्यादा से कम",
    sortRating: "उच्चतम रेटिंग",
    bespokeTag: "कस्टम कारपेंटरी सर्विस",
    bespokeTitle: "आपकी पसंद, हमारी बेजोड़ कारीगरी",
    bespokeDesc: "Pinterest या Instagram की कोई भी फोटो शर्मा जी के व्हाट्सएप पर भेजें। हम लकड़ी का सटीक नाप और 2 घंटे में पारदर्शी कोटेशन देंगे।",
    bespokeBtn: "व्हाट्सएप पर फोटो शेयर करें →",
    processSubhead: "कारीगरी का तरीका",
    processTitle: "हम आपका फर्नीचर कैसे तैयार करते हैं",
    processDesc: "लकड़ी चुनने से लेकर घर पर फिटिंग तक पूरी पारदर्शिता। पॉलिश से पहले कच्चा ढांचा देखने की खुली छूट।",
    pricingSubhead: "कारपेंटर रेट लिस्ट",
    pricingTitle: "लकड़ी व मजदूरी की पारदर्शी दरें",
    pricingDesc: "शोरूम का कोई 50% मुनाफा नहीं। सीधे लकड़ी की लागत और कारीगर की मजदूरी।",
    bookSubhead: "जीरो-चार्ज सर्विस",
    bookTitle: "घर पर कारपेंटर नाप व सलाह बुक करें",
    bookDesc: "रोहित या सीनियर कारपेंटर आपके घर आकर कमरे का सटीक नाप लेंगे, लकड़ी के सैंपल दिखाएंगे और तुरंत एस्टीमेट देंगे। कोई विजिट चार्ज नहीं!",
    bookBtnSubmit: "कारपेंटर विज़िट रिक्वेस्ट भेजें (फ्री सर्विस)",
    reviewsSubhead: "ग्राहकों का अनुभव",
    reviewsTitle: "संतुष्ट परिवारों की जुबानी",
    reviewsDesc: "उन परिवारों के विचार जिन्होंने कीर्ति नगर वर्कशॉप आकर अपना फर्नीचर बनवाया",
    faqSubhead: "ईमानदार जवाब",
    faqTitle: "अक्सर पूछे जाने वाले सवाल (FAQs)",
    cartDrawerTitle: "चुनी गई फर्नीचर सूची",
    cartSubtotalLabel: "अनुमानित कुल:",
    cartCheckoutBtn: "शर्मा जी को व्हाट्सएप पर भेजें",
    cartEmpty: "आपकी लिस्ट खाली है। फर्नीचर चुनें या कस्टम आर्डर दें।",
    toastAdded: "सूची में जोड़ा गया!",
    toastLang: "भाषा हिन्दी में बदल दी गई है"
  }
};

// ==========================================================================
// Application Initialization
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  renderCatalog();
  setupFilterEvents();
  setupBookingForm();
  setupCartDrawer();
  setupFaqAccordion();
  setupQuickActions();
  startTickerRotation();
});

// ==========================================================================
// Ticker Rotation System
// ==========================================================================
function startTickerRotation() {
  if (tickerTimer) clearInterval(tickerTimer);
  tickerTimer = setInterval(() => {
    cycleTicker(1);
  }, 6000);
}

function cycleTicker(direction) {
  const list = TICKER_MESSAGES[currentLanguage] || TICKER_MESSAGES.en;
  currentTickerIndex = (currentTickerIndex + direction + list.length) % list.length;
  const el = document.getElementById("announcement-text");
  if (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(4px)';
    el.style.transition = 'all 0.25s ease';
    setTimeout(() => {
      el.textContent = list[currentTickerIndex];
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 250);
  }
}

// ==========================================================================
// Catalog Rendering & Filtering (Three Sixty Borderless Minimalist Cards)
// ==========================================================================
function renderCatalog() {
  const container = document.getElementById("products-container");
  if (!container) return;

  // Filter products
  let filtered = FURNITURE_PRODUCTS.filter(p => {
    // Category match
    const matchCategory = currentCategory === 'all' || p.category === currentCategory;

    // Search match
    const query = currentSearchQuery.toLowerCase().trim();
    const matchSearch = !query || 
      p.name.toLowerCase().includes(query) || 
      p.hindiName.toLowerCase().includes(query) || 
      p.woodType.toLowerCase().includes(query) ||
      p.shortDesc.toLowerCase().includes(query);

    // Wood match
    const matchWood = currentWoodFilter === 'all' || 
      (currentWoodFilter === 'teak' && p.woodType.toLowerCase().includes('teak')) ||
      (currentWoodFilter === 'sheesham' && p.woodType.toLowerCase().includes('sheesham')) ||
      (currentWoodFilter === 'oak' && p.woodType.toLowerCase().includes('oak'));

    // Ready quick-ship filter
    const matchReady = !isReadyQuickShipOnly || 
      (p.leadTime && (p.leadTime.includes('7') || p.leadTime.includes('10') || p.leadTime.includes('12')));

    return matchCategory && matchSearch && matchWood && matchReady;
  });

  // Sort
  if (currentSort === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentSort === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (currentSort === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  // Update count indicator
  const countEl = document.getElementById("catalog-result-count");
  if (countEl) {
    countEl.textContent = currentLanguage === 'hi' 
      ? `${filtered.length} हस्तनिर्मित डिजाइन उपलब्ध`
      : `${filtered.length} Handcrafted Pieces Available`;
  }

  // Empty state
  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 70px 20px;">
        <span style="font-size: 3rem; display: inline-block; margin-bottom: 12px;">🪵</span>
        <h3 style="font-family: var(--font-serif); font-size: 1.5rem; margin-bottom: 8px;">
          ${currentLanguage === 'hi' ? 'कोई फर्नीचर डिज़ाइन नहीं मिला' : 'No Matching Designs Found'}
        </h3>
        <p style="color: var(--text-muted); max-width: 480px; margin: 0 auto 20px; font-size: 0.92rem;">
          ${currentLanguage === 'hi' 
            ? 'आप हमारे उस्ताद जी से सीधे व्हाट्सएप पर अपनी पसंद का कोई भी कस्टम डिज़ाइन बनवा सकते हैं।'
            : 'You can directly share your reference photograph or sketch with Sharma Ji on WhatsApp for a custom build.'}
        </p>
        <button onclick="resetFilters()" style="background: var(--text-primary); color: white; border: none; padding: 10px 24px; border-radius: var(--rounded-pill); cursor: pointer; font-size: 0.82rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em;">
          ${currentLanguage === 'hi' ? 'सारे डिज़ाइन देखें' : 'View All Designs'}
        </button>
      </div>
    `;
    return;
  }

  // Render cards in Three Sixty borderless minimalist luxury format
  const isEn = currentLanguage === 'en';
  container.innerHTML = filtered.map(item => {
    const isWishlisted = wishlistSet.has(item.id);
    const whatsappText = encodeURIComponent(
      isEn 
        ? `Hello Sharma Ji, I am inquiring about this bespoke design from your Three Sixty style catalog:\n\n*${item.name}*\nRate: ₹${item.price.toLocaleString('en-IN')}\nTimber: ${item.woodType}\nDimensions: ${item.dimensions}\n\nPlease share wood availability, unpolished frame inspection timeline, and custom sizing options.`
        : `नमस्ते शर्मा जी, मुझे आपकी वेबसाइट पर यह फर्नीचर पसंद आया है:\n\n*${item.name} (${item.hindiName})*\nमूल्य: ₹${item.price.toLocaleString('en-IN')}\nलकड़ी: ${item.woodType}\nसाइज: ${item.dimensions}\n\nकृपया मुझे इसकी लकड़ी की उपलब्धता और डिलीवरी समय के बारे में जानकारी दें।`
    );
    const whatsappLink = `https://wa.me/${CARPENTER_CONFIG.whatsappNumber}?text=${whatsappText}`;

    return `
      <div class="product-card" data-id="${item.id}">
        <div class="product-thumb-container">
          <img src="${item.image}" alt="${item.name}" class="product-thumb" loading="lazy">
          <span class="product-badge">${item.badge}</span>
          <div class="product-hover-actions">
            <button class="btn-card-quickview" onclick="openQuickView('${item.id}')">
              ${isEn ? 'Inspect' : 'जानकारी'}
            </button>
            <a href="${whatsappLink}" target="_blank" rel="noopener noreferrer" class="btn-card-wa">
              💬 WhatsApp
            </a>
          </div>
        </div>

        <div class="product-details">
          <div class="product-header-row">
            <h3 class="product-name" onclick="openQuickView('${item.id}')" style="cursor: pointer;">${item.name}</h3>
            <span class="product-rating">${item.rating} <span class="star-icon">★</span></span>
          </div>

          <div class="product-price-row">
            <span class="product-mrp-price">MRP ₹ ${item.price.toLocaleString('en-IN')}</span>
            <span class="product-strike-price">₹ ${item.mrp.toLocaleString('en-IN')}</span>
            <span class="product-discount-tag">${item.discount}</span>
          </div>

          <div class="product-specs-subline">
            <span>${item.woodType.split('(')[0]}</span> • <span>${item.dimensions.split('|')[0]}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ==========================================================================
// Category Pills & Filters
// ==========================================================================
function filterByCat(cat) {
  currentCategory = cat;
  document.querySelectorAll(".category-pill").forEach(pill => {
    pill.classList.toggle("active", pill.dataset.cat === cat);
  });
  renderCatalog();
  const section = document.getElementById("catalog-section");
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

function toggleStockFilter(checkbox) {
  isReadyQuickShipOnly = checkbox.checked;
  renderCatalog();
}

function resetFilters() {
  currentCategory = 'all';
  currentSearchQuery = '';
  currentWoodFilter = 'all';
  currentSort = 'featured';
  isReadyQuickShipOnly = false;

  const searchInput = document.getElementById("catalog-search");
  if (searchInput) searchInput.value = '';

  const woodSelect = document.getElementById("wood-filter-select");
  if (woodSelect) woodSelect.value = 'all';

  const sortSelect = document.getElementById("catalog-sort");
  if (sortSelect) sortSelect.value = 'featured';

  const stockToggle = document.getElementById("stock-only-toggle");
  if (stockToggle) stockToggle.checked = false;

  document.querySelectorAll(".category-pill").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.cat === 'all');
  });

  renderCatalog();
}

function setupFilterEvents() {
  // Category pills
  document.querySelectorAll(".category-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      document.querySelectorAll(".category-pill").forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      currentCategory = pill.dataset.cat;
      renderCatalog();
    });
  });

  // Search input
  const searchInput = document.getElementById("catalog-search");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearchQuery = e.target.value;
      renderCatalog();
    });
  }

  // Wood filter
  const woodSelect = document.getElementById("wood-filter-select");
  if (woodSelect) {
    woodSelect.addEventListener("change", (e) => {
      currentWoodFilter = e.target.value;
      renderCatalog();
    });
  }

  // Sort dropdown
  const sortSelect = document.getElementById("catalog-sort");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      currentSort = e.target.value;
      renderCatalog();
    });
  }
}

// ==========================================================================
// Wishlist System
// ==========================================================================
function toggleWishlist(productId, btn) {
  if (wishlistSet.has(productId)) {
    wishlistSet.delete(productId);
    btn.textContent = '♡';
    btn.style.color = 'var(--text-primary)';
    showToast(currentLanguage === 'hi' ? 'विशलिस्ट से हटाया गया' : 'Removed from private wishlist');
  } else {
    wishlistSet.add(productId);
    btn.textContent = '♥';
    btn.style.color = '#DC2626';
    showToast(currentLanguage === 'hi' ? '❤️ विशलिस्ट में सहेजा गया' : '❤️ Saved to your private wishlist');
  }
  const countBadge = document.getElementById("wishlist-count");
  if (countBadge) countBadge.textContent = wishlistSet.size;
}

// ==========================================================================
// Quick View Modal
// ==========================================================================
function openQuickView(productId) {
  const item = FURNITURE_PRODUCTS.find(p => p.id === productId);
  if (!item) return;

  const modal = document.getElementById("quick-view-modal");
  const modalBody = document.getElementById("quick-view-body");
  if (!modal || !modalBody) return;

  const isEn = currentLanguage === 'en';
  const whatsappText = encodeURIComponent(
    isEn
      ? `Hello Sharma Ji, I am inspecting *${item.name}* (Price: ₹${item.price.toLocaleString('en-IN')}). Can we discuss custom room sizing and schedule an inspection of raw unpolished timber?`
      : `नमस्ते शर्मा जी, मुझे आपकी वर्कशॉप का *${item.name}* (₹${item.price.toLocaleString('en-IN')}) पसंद आया है। क्या हम कमरे के नाप अनुसार बात कर सकते हैं?`
  );

  modalBody.innerHTML = `
    <div class="modal-content-grid">
      <div class="modal-thumb-wrap">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="modal-info-wrap">
        <div style="display: flex; gap: 8px; margin-bottom: 10px; flex-wrap: wrap;">
          <span class="product-badge" style="position: static;">${item.badge}</span>
          <span style="background: var(--bg-page); border: 1px solid var(--border-subtle); padding: 4px 10px; font-size: 0.72rem; font-weight: 700; color: var(--gold-dark);">${item.woodType}</span>
        </div>
        <h2 style="font-family: var(--font-serif); font-size: 1.8rem; font-weight: 400; margin-bottom: 4px; line-height: 1.2;">${item.name}</h2>
        <p style="color: var(--text-muted); font-size: 0.88rem; font-weight: 600; margin-bottom: 16px;">${item.hindiName}</p>

        <div style="display: flex; align-items: baseline; gap: 10px; margin-bottom: 16px;">
          <span style="font-size: 1.4rem; font-weight: 800; color: var(--text-primary);">MRP ₹${item.price.toLocaleString('en-IN')}</span>
          <span style="font-size: 0.95rem; color: var(--text-muted); text-decoration: line-through;">₹${item.mrp.toLocaleString('en-IN')}</span>
          <span style="font-size: 0.82rem; font-weight: 700; color: var(--gold-badge);">${item.discount} (Workshop Direct)</span>
        </div>

        <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 18px;">
          ${item.shortDesc}
        </p>

        <div style="background: var(--bg-page); padding: 14px; border: 1px solid var(--border-subtle); margin-bottom: 20px;">
          <h4 style="font-size: 0.76rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-primary); margin-bottom: 8px;">
            ${isEn ? 'Atelier Specifications & Craftsmanship:' : 'कारीगरी की खासियत:'}
          </h4>
          <ul style="padding-left: 18px; font-size: 0.82rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            ${item.features.map(f => `<li>${f}</li>`).join('')}
          </ul>
        </div>

        <div class="modal-actions-row">
          <a href="https://wa.me/${CARPENTER_CONFIG.whatsappNumber}?text=${whatsappText}" target="_blank" class="btn-hero-primary modal-btn-wa">
            💬 ${isEn ? 'Inquire on WhatsApp' : 'व्हाट्सएप पर बात करें'}
          </a>
          <a href="#booking-section" onclick="closeModal()" class="btn-hero-primary modal-btn-book">
            📐 ${isEn ? 'Book Free Visit' : 'फ्री नाप बुक करें'}
          </a>
        </div>
      </div>
    </div>
  `;

  modal.classList.add("open");
}

function closeModal() {
  const modal = document.getElementById("quick-view-modal");
  if (modal) modal.classList.remove("open");
}

// ==========================================================================
// Cart System & Inquiry Drawer
// ==========================================================================
function addToCart(productId) {
  const product = FURNITURE_PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = cartItems.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cartItems.push({
      ...product,
      qty: 1
    });
  }

  updateCartUI();
  const t = PAGE_TRANSLATIONS[currentLanguage];
  showToast(`✅ "${product.name}" ${t.toastAdded}`);
}

function updateCartUI() {
  const countBadge = document.getElementById("cart-count-badge");
  const listContainer = document.getElementById("cart-items-container");
  const subtotalEl = document.getElementById("cart-subtotal");
  const t = PAGE_TRANSLATIONS[currentLanguage];

  const totalQty = cartItems.reduce((sum, item) => sum + item.qty, 0);
  if (countBadge) countBadge.textContent = totalQty;

  if (!listContainer) return;

  if (cartItems.length === 0) {
    listContainer.innerHTML = `
      <div style="text-align: center; padding: 50px 10px; color: var(--text-muted);">
        <span style="font-size: 2.5rem; display: block; margin-bottom: 12px;">🪵</span>
        <p style="font-size: 0.88rem;">${t.cartEmpty}</p>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = "₹0";
    return;
  }

  let subtotal = 0;
  listContainer.innerHTML = cartItems.map(item => {
    const itemTotal = item.price * item.qty;
    subtotal += itemTotal;

    return `
      <div class="cart-item-row" style="display: flex; gap: 14px; padding: 14px 0; border-bottom: 1px solid var(--border-subtle); align-items: center;">
        <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; background: #F1ECE3;">
        <div style="flex: 1;">
          <h4 style="font-size: 0.86rem; font-weight: 600; margin-bottom: 3px;">${item.name}</h4>
          <span style="font-size: 0.74rem; color: var(--text-muted); display: block; margin-bottom: 6px;">${item.woodType.split('(')[0]}</span>
          <div style="display: flex; align-items: center; gap: 8px;">
            <button onclick="changeQty('${item.id}', -1)" style="width: 24px; height: 24px; border: 1px solid var(--border-subtle); background: white; cursor: pointer;">-</button>
            <span style="font-weight: 700; font-size: 0.82rem;">${item.qty}</span>
            <button onclick="changeQty('${item.id}', 1)" style="width: 24px; height: 24px; border: 1px solid var(--border-subtle); background: white; cursor: pointer;">+</button>
          </div>
        </div>
        <div style="text-align: right;">
          <div style="font-weight: 700; font-size: 0.88rem;">₹${itemTotal.toLocaleString('en-IN')}</div>
          <button onclick="removeFromCart('${item.id}')" style="background: none; border: none; color: #DC2626; font-size: 0.74rem; cursor: pointer; margin-top: 6px; padding: 0;">
            ${currentLanguage === 'en' ? 'Remove' : 'हटाएं'}
          </button>
        </div>
      </div>
    `;
  }).join('');

  if (subtotalEl) {
    subtotalEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
  }
}

function changeQty(productId, delta) {
  const item = cartItems.find(i => i.id === productId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cartItems = cartItems.filter(i => i.id !== productId);
  }
  updateCartUI();
}

function removeFromCart(productId) {
  cartItems = cartItems.filter(i => i.id !== productId);
  updateCartUI();
}

function setupCartDrawer() {
  const openBtn = document.getElementById("cart-trigger-btn");
  const closeBtn = document.getElementById("cart-close-btn");
  const drawer = document.getElementById("cart-drawer");
  const checkoutBtn = document.getElementById("btn-cart-checkout");

  if (openBtn && drawer) {
    openBtn.addEventListener("click", () => drawer.classList.add("open"));
  }
  if (closeBtn && drawer) {
    closeBtn.addEventListener("click", () => drawer.classList.remove("open"));
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (cartItems.length === 0) {
        showToast(currentLanguage === 'en' ? "⚠️ Please select furniture designs first!" : "⚠️ कृपया पहले फर्नीचर डिज़ाइन चुनें!");
        return;
      }

      const isEn = currentLanguage === 'en';
      let itemListText = cartItems.map((item, idx) => 
        `${idx + 1}. *${item.name}* (${isEn ? 'Qty' : 'मात्रा'}: ${item.qty}) - ₹${(item.price * item.qty).toLocaleString('en-IN')}`
      ).join('\n');

      const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

      const msg = encodeURIComponent(
        isEn
          ? `Hello Sharma Ji, I would like to request an estimate for the following bespoke pieces from your Three Sixty style catalog:\n\n` +
            `${itemListText}\n\n` +
            `*Estimated Workshop Total:* ₹${total.toLocaleString('en-IN')}\n\n` +
            `Can we discuss timber selection and arrange a home measurement visit?`
          : `नमस्ते शर्मा जी, मुझे आपकी कीर्ति नगर वर्कशॉप से निम्नलिखित फर्नीचर के लिए कोटेशन चाहिए:\n\n` +
            `${itemListText}\n\n` +
            `*कुल अनुमानित राशि:* ₹${total.toLocaleString('en-IN')}\n\n` +
            `क्या हम लकड़ी चुनने और घर पर नाप लेने का समय तय कर सकते हैं?`
      );

      window.open(`https://wa.me/${CARPENTER_CONFIG.whatsappNumber}?text=${msg}`, '_blank');
    });
  }
}

// ==========================================================================
// Booking Carpenter Home Measurement Form
// ==========================================================================
function setupBookingForm() {
  const form = document.getElementById("carpenter-booking-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("book-name")?.value || "Customer";
    const phone = document.getElementById("book-phone")?.value || "";
    const address = document.getElementById("book-address")?.value || "";
    const furnitureType = document.getElementById("book-furniture-type")?.value || "Custom Work";
    const preferredDate = document.getElementById("book-date")?.value || "As soon as possible";
    const notes = document.getElementById("book-notes")?.value || "Measurement required";

    const isEn = currentLanguage === 'en';
    showToast(isEn ? "✅ Request Sent! Rohit or Sharma Ji will call you shortly." : "✅ अनुरोध प्राप्त हुआ! रोहित जी या शर्मा जी जल्द ही संपर्क करेंगे।");

    // Direct WhatsApp message with full details to Sharma Ji
    const waMsg = encodeURIComponent(
      isEn
        ? `Hello Sharma Ji, I would like to book a Free In-Home Measurement & Timber Sample Visit:\n\n` +
          `*Name:* ${name}\n` +
          `*Phone:* ${phone}\n` +
          `*Address / Area:* ${address}\n` +
          `*Furniture Work:* ${furnitureType}\n` +
          `*Preferred Visit Time:* ${preferredDate}\n` +
          `*Notes / Requirements:* ${notes}\n\n` +
          `Please confirm when Rohit or senior carpenter can visit our home.`
        : `नमस्ते शर्मा जी, मैंने घर पर नाप (Home Measurement) व लकड़ी सैंपल दिखाने के लिए रिक्वेस्ट भेजी है:\n\n` +
          `*नाम:* ${name}\n` +
          `*फोन:* ${phone}\n` +
          `*घर का पता / इलाका:* ${address}\n` +
          `*फर्नीचर काम:* ${furnitureType}\n` +
          `*पसंदीदा तारीख/समय:* ${preferredDate}\n` +
          `*नोट्स:* ${notes}\n\n` +
          `कृपया पुष्टि करें कि रोहित जी या कारपेंटर किस समय पहुंचेंगे।`
    );

    setTimeout(() => {
      window.open(`https://wa.me/${CARPENTER_CONFIG.whatsappNumber}?text=${waMsg}`, '_blank');
    }, 1200);

    form.reset();
  });
}

// ==========================================================================
// FAQ Accordion
// ==========================================================================
function setupFaqAccordion() {
  document.querySelectorAll(".faq-question").forEach(q => {
    q.addEventListener("click", () => {
      const item = q.parentElement;
      const isActive = item.classList.contains("active");

      document.querySelectorAll(".faq-item").forEach(it => it.classList.remove("active"));
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
}

// ==========================================================================
// Quick Actions & Dynamic Page Language Switching
// ==========================================================================
function applyPageLanguage(lang) {
  document.documentElement.lang = lang;
  const t = PAGE_TRANSLATIONS[lang];
  if (!t) return;

  // Toggle button text
  const langBtn = document.getElementById("lang-toggle-btn");
  if (langBtn) langBtn.innerHTML = t.langBtnText;

  // Announcement ticker
  cycleTicker(0);

  // Phone top bar
  const phoneEl = document.querySelector(".top-bar-phone span");
  if (phoneEl) phoneEl.textContent = t.topPhone;

  // Brand Titles
  const brandTitleEl = document.querySelector(".brand-title");
  if (brandTitleEl) brandTitleEl.textContent = t.brandTitle;
  const brandSubEl = document.querySelector(".brand-sub");
  if (brandSubEl) brandSubEl.textContent = t.brandSub;

  const headerConsult = document.querySelector(".btn-header-consult");
  if (headerConsult) headerConsult.textContent = t.headerConsult;

  // Navigation Links
  const navLinks = document.querySelectorAll("#nav-menu-list .nav-link");
  if (navLinks.length >= 7) {
    navLinks[0].textContent = t.navAll;
    navLinks[1].textContent = t.navLiving;
    navLinks[2].textContent = t.navDining;
    navLinks[3].textContent = t.navBedroom;
    navLinks[4].textContent = t.navMandir;
    navLinks[5].textContent = t.navBespoke;
    navLinks[6].textContent = t.navStory;
  }

  // Hero Section
  const heroBadge = document.querySelector(".collection-hero-badge");
  if (heroBadge) heroBadge.textContent = t.heroBadge;
  const heroTitle = document.querySelector(".collection-hero-title");
  if (heroTitle) heroTitle.textContent = t.heroTitle;
  const heroDesc = document.querySelector(".collection-hero-desc");
  if (heroDesc) heroDesc.textContent = t.heroDesc;
  const heroBtnExplore = document.querySelector(".btn-hero-primary");
  if (heroBtnExplore) heroBtnExplore.textContent = t.heroBtnExplore;
  const heroBtnBook = document.querySelector(".btn-hero-outline");
  if (heroBtnBook) heroBtnBook.textContent = t.heroBtnBook;

  // Category Pills
  const pillKeys = [
    t.catPillAll, t.catPillLiving, t.catPillDining, t.catPillBedroom,
    t.catPillMandir, t.catPillBalcony, t.catPillDoors, t.catPillStudy
  ];
  document.querySelectorAll(".category-pill").forEach((pill, idx) => {
    if (pillKeys[idx]) pill.textContent = pillKeys[idx];
  });

  // Ready switch label
  const readyLabel = document.querySelector(".stock-toggle-label span:last-child");
  if (readyLabel) readyLabel.textContent = t.readyLabel;

  // Search input
  const searchInput = document.getElementById("catalog-search");
  if (searchInput) searchInput.placeholder = t.searchPlaceholder;

  // Bespoke section
  const bespokeTag = document.querySelector(".bespoke-tag");
  if (bespokeTag) bespokeTag.textContent = t.bespokeTag;
  const bespokeTitle = document.querySelector(".bespoke-title");
  if (bespokeTitle) bespokeTitle.textContent = t.bespokeTitle;
  const bespokeDesc = document.querySelector(".bespoke-desc");
  if (bespokeDesc) bespokeDesc.textContent = t.bespokeDesc;
  const bespokeBtn = document.querySelector(".btn-bespoke-wa");
  if (bespokeBtn) bespokeBtn.textContent = t.bespokeBtn;

  // Process Section
  const procSection = document.getElementById("process-section");
  if (procSection) {
    const sub = procSection.querySelector(".section-subhead");
    if (sub) sub.textContent = t.processSubhead;
    const tit = procSection.querySelector(".section-title");
    if (tit) tit.textContent = t.processTitle;
    const des = procSection.querySelector(".section-desc");
    if (des) des.textContent = t.processDesc;
  }

  // Pricing Section
  const priceSection = document.getElementById("pricing-section");
  if (priceSection) {
    const sub = priceSection.querySelector(".section-subhead");
    if (sub) sub.textContent = t.pricingSubhead;
    const tit = priceSection.querySelector(".section-title");
    if (tit) tit.textContent = t.pricingTitle;
    const des = priceSection.querySelector(".section-desc");
    if (des) des.textContent = t.pricingDesc;
  }

  // Booking Form Section
  const bookingBox = document.querySelector(".booking-box");
  if (bookingBox) {
    const sub = bookingBox.querySelector(".section-subhead");
    if (sub) sub.textContent = t.bookSubhead;
    const tit = bookingBox.querySelector(".section-title");
    if (tit) tit.textContent = t.bookTitle;
    const des = bookingBox.querySelector(".section-desc");
    if (des) des.textContent = t.bookDesc;
    const submitBtn = bookingBox.querySelector(".btn-book-submit > span:first-child");
    if (submitBtn) submitBtn.textContent = t.bookBtnSubmit;
  }

  // Reviews Header
  const reviewsHead = document.querySelector(".reviews-section .section-head");
  if (reviewsHead) {
    const sub = reviewsHead.querySelector(".section-subhead");
    if (sub) sub.textContent = t.reviewsSubhead;
    const tit = reviewsHead.querySelector(".section-title");
    if (tit) tit.textContent = t.reviewsTitle;
    const des = reviewsHead.querySelector(".section-desc");
    if (des) des.textContent = t.reviewsDesc;
  }

  // FAQ Header
  const faqHead = document.querySelector(".faq-section .section-head");
  if (faqHead) {
    const sub = faqHead.querySelector(".section-subhead");
    if (sub) sub.textContent = t.faqSubhead;
    const tit = faqHead.querySelector(".section-title");
    if (tit) tit.textContent = t.faqTitle;
  }

  // Cart Drawer
  const cartHead = document.querySelector(".cart-header h3");
  if (cartHead) cartHead.textContent = t.cartDrawerTitle;

  const cartSubtotalLabel = document.querySelector(".cart-subtotal-row span:first-child");
  if (cartSubtotalLabel) cartSubtotalLabel.textContent = t.cartSubtotalLabel;

  const cartBtn = document.querySelector(".btn-checkout-whatsapp span");
  if (cartBtn) cartBtn.textContent = t.cartCheckoutBtn;
}

function setupQuickActions() {
  // Language toggle button
  const langBtn = document.getElementById("lang-toggle-btn");
  if (langBtn) {
    langBtn.innerHTML = currentLanguage === 'en' ? '🌐 हिन्दी' : '🌐 English';
    langBtn.addEventListener("click", () => {
      currentLanguage = currentLanguage === 'hi' ? 'en' : 'hi';
      applyPageLanguage(currentLanguage);
      renderCatalog();
      updateCartUI();
      showToast(PAGE_TRANSLATIONS[currentLanguage].toastLang);
    });
  }

  // Mobile menu toggle
  const mobileToggle = document.getElementById("mobile-menu-toggle");
  const navMenu = document.getElementById("nav-menu-list");
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle("mobile-open");
      mobileToggle.innerHTML = isOpen ? "✕" : "☰";
    });

    // Close when clicking any menu link
    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("mobile-open");
        if (mobileToggle) mobileToggle.innerHTML = "☰";
      });
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (navMenu.classList.contains("mobile-open") && !navMenu.contains(e.target) && e.target !== mobileToggle) {
        navMenu.classList.remove("mobile-open");
        if (mobileToggle) mobileToggle.innerHTML = "☰";
      }
    });
  }
}

function showToast(message) {
  let toast = document.getElementById("app-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "app-toast";
    toast.className = "toast-msg";
    document.body.appendChild(toast);
  }

  toast.innerHTML = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}
