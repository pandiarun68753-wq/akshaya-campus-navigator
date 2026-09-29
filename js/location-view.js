/**
 * Comprehensive Location Pages Component
 * Provides both dedicated individual location modals and a full-campus catalog view.
 */

class LocationView {
  constructor(modalContainerId, catalogContainerId, options = {}) {
    this.modalContainer = document.getElementById(modalContainerId);
    this.catalogContainer = document.getElementById(catalogContainerId);
    this.options = Object.assign({
      onNavigateTo: null,
      onSetOrigin: null,
      onFocusMap: null
    }, options);

    this.currentLocation = null;
    this.activeCatalogCategory = "all";
    this.initCatalog();
  }

  show(loc) {
    this.currentLocation = loc;
    this.renderModal();
    this.modalContainer.classList.add("active");
  }

  hide() {
    this.modalContainer.classList.remove("active");
    this.currentLocation = null;
  }

  renderModal() {
    if (!this.currentLocation) return;
    const loc = this.currentLocation;

    // Floor guide HTML
    const floorRows = (loc.floorGuide || []).map(f => `
      <div class="floor-row">
        <span class="floor-name">${f.floor}</span>
        <span class="floor-details">${f.details}</span>
      </div>
    `).join("");

    // Departments HTML
    const deptsHtml = (loc.departments || []).map(d => `
      <span class="pill-item" style="border-color: #38bdf8; color: #e0f2fe;">
        <span>🎓</span>
        <span>${d}</span>
      </span>
    `).join("");

    // Facilities HTML
    const facilitiesHtml = (loc.facilities || []).map(fac => `
      <span class="pill-item">
        <span>⚡</span>
        <span>${fac}</span>
      </span>
    `).join("");

    // Accessibility HTML
    const a11yHtml = (loc.accessibility || []).map(a => `
      <span class="pill-item" style="border-color: #059669; color: #a7f3d0;">
        <span>♿</span>
        <span>${a}</span>
      </span>
    `).join("");

    this.modalContainer.innerHTML = `
      <div class="modal-content-card">
        <!-- Modal Header -->
        <div class="modal-header">
          <div class="modal-title-row">
            <div class="modal-bldg-num">${loc.id}</div>
            <div>
              <div style="font-size: 11px; text-transform: uppercase; font-weight: 700; color: #38bdf8; margin-bottom: 2px;">
                ${loc.college}
              </div>
              <h2 class="modal-bldg-name">${loc.name}</h2>
              <p class="modal-bldg-block">📍 ${loc.block}</p>
            </div>
          </div>
          <button id="btnCloseModal" class="btn-close-modal" title="Close">✕</button>
        </div>

        <!-- Modal Body Content -->
        <div class="modal-body">
          <!-- Action Buttons Bar -->
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button id="btnModalRouteTo" class="btn-primary" style="flex: 1; min-width: 140px; padding: 10px 14px; font-size: 13px;">
              <span>📍 Directions To Here</span>
            </button>
            <button id="btnModalRouteFrom" class="btn-secondary" style="flex: 1; min-width: 140px; padding: 10px 14px; font-size: 13px;">
              <span>🚩 Start Route From Here</span>
            </button>
            <button id="btnModalFocusMap" class="btn-secondary" style="padding: 10px 14px; font-size: 13px;">
              <span>🎯 Center Map</span>
            </button>
            <button id="btnModalCopyLink" class="btn-secondary" style="padding: 10px 14px; font-size: 13px;">
              <span>🔗 Share</span>
            </button>
          </div>

          <!-- Overview Section -->
          <div>
            <div class="modal-section-title">
              <span>🏛️ Overview & Purpose</span>
            </div>
            <div class="modal-box">
              ${loc.description}
            </div>
          </div>

          <!-- Floor Directory Section -->
          ${loc.floorGuide && loc.floorGuide.length > 0 ? `
            <div>
              <div class="modal-section-title">
                <span>🏢 Floor-by-Floor Directory</span>
              </div>
              <div class="modal-box" style="padding: 6px 14px;">
                ${floorRows}
              </div>
            </div>
          ` : ''}

          <!-- Departments Section -->
          ${loc.departments && loc.departments.length > 0 ? `
            <div>
              <div class="modal-section-title">
                <span>📚 Departments & Academic Laboratories</span>
              </div>
              <div class="pills-grid">
                ${deptsHtml}
              </div>
            </div>
          ` : ''}

          <!-- Facilities Section -->
          ${loc.facilities && loc.facilities.length > 0 ? `
            <div>
              <div class="modal-section-title">
                <span>🛠️ Infrastructure & Amenities</span>
              </div>
              <div class="pills-grid">
                ${facilitiesHtml}
              </div>
            </div>
          ` : ''}

          <!-- Accessibility Section -->
          ${loc.accessibility && loc.accessibility.length > 0 ? `
            <div>
              <div class="modal-section-title">
                <span>♿ Inclusivity & Accessibility</span>
              </div>
              <div class="pills-grid">
                ${a11yHtml}
              </div>
            </div>
          ` : ''}

          <!-- Timings & Contact -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px;">
            <div class="modal-box">
              <span style="font-weight: 700; color: #38bdf8; display: block; margin-bottom: 2px;">⏰ Operating Hours</span>
              <span style="font-size: 12px; color: #cbd5e1;">${loc.hours || '08:45 AM - 05:00 PM (Mon - Sat)'}</span>
            </div>
            <div class="modal-box">
              <span style="font-weight: 700; color: #38bdf8; display: block; margin-bottom: 2px;">📞 Contact Information</span>
              <span style="font-size: 12px; color: #cbd5e1;">${loc.contact || 'campus.info@acetcbe.edu.in'}</span>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="modal-footer">
          <span style="font-size: 11px; color: #9ca3af;">Akshaya Institutions • Campus Navigator</span>
          <button id="btnModalCloseBottom" class="btn-secondary" style="padding: 6px 14px;">Close Page</button>
        </div>
      </div>
    `;

    // Attach Event Listeners
    document.getElementById("btnCloseModal").addEventListener("click", () => this.hide());
    document.getElementById("btnModalCloseBottom").addEventListener("click", () => this.hide());

    this.modalContainer.onclick = (e) => {
      if (e.target === this.modalContainer) this.hide();
    };

    document.getElementById("btnModalRouteTo").addEventListener("click", () => {
      if (this.options.onNavigateTo) this.options.onNavigateTo(loc);
      this.hide();
    });

    document.getElementById("btnModalRouteFrom").addEventListener("click", () => {
      if (this.options.onSetOrigin) this.options.onSetOrigin(loc);
      this.hide();
    });

    document.getElementById("btnModalFocusMap").addEventListener("click", () => {
      if (this.options.onFocusMap) this.options.onFocusMap(loc.id);
      this.hide();
    });

    document.getElementById("btnModalCopyLink").addEventListener("click", () => {
      const shareUrl = `${window.location.origin}${window.location.pathname}#location=${loc.id}`;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(shareUrl).then(() => {
          alert(`Direct location link copied:\n${shareUrl}`);
        }).catch(() => {
          prompt("Direct location URL:", shareUrl);
        });
      } else {
        prompt("Direct location URL:", shareUrl);
      }
    });
  }

  // ============================================
  // ALL LOCATION PAGES CATALOG VIEW (FULL SCREEN)
  // ============================================
  initCatalog() {
    if (!this.catalogContainer) return;
    this.renderCatalog();
  }

  showCatalog() {
    if (this.catalogContainer) {
      this.catalogContainer.classList.remove("hidden");
      this.renderCatalog();
    }
  }

  hideCatalog() {
    if (this.catalogContainer) {
      this.catalogContainer.classList.add("hidden");
    }
  }

  renderCatalog() {
    if (!this.catalogContainer) return;

    const categoriesList = Object.values(CATEGORIES);
    const chipsHtml = categoriesList.map(cat => `
      <button class="filter-chip catalog-filter-chip ${this.activeCatalogCategory === cat.id ? 'active' : ''}" data-cat="${cat.id}">
        <span>${cat.icon}</span>
        <span>${cat.label}</span>
      </button>
    `).join("");

    const filtered = LOCATIONS.filter(l => 
      this.activeCatalogCategory === "all" || l.category === this.activeCatalogCategory
    );

    const cardsHtml = filtered.map(loc => `
      <div class="catalog-card">
        <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 10px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div class="loc-card-badge" style="width: 38px; height: 38px; font-size: 15px;">${loc.id}</div>
            <div>
              <h3 style="font-size: 14px; font-weight: 700; color: #fff; line-height: 1.2;">${loc.name}</h3>
              <span style="font-size: 10px; color: #38bdf8; font-weight: 600;">${loc.block}</span>
            </div>
          </div>
        </div>

        <p style="font-size: 12px; color: #9ca3af; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
          ${loc.description}
        </p>

        <div style="margin-top: auto; display: flex; gap: 6px; pt: 8px; border-top: 1px solid rgba(255,255,255,0.06);">
          <button class="btn-primary btn-catalog-view" data-id="${loc.id}" style="padding: 6px 12px; font-size: 11px;">
            <span>📖 Full Page</span>
          </button>
          <button class="btn-secondary btn-catalog-route" data-id="${loc.id}" style="padding: 6px 12px; font-size: 11px;">
            <span>📍 Route Here</span>
          </button>
        </div>
      </div>
    `).join("");

    this.catalogContainer.innerHTML = `
      <div class="catalog-header">
        <div>
          <h2 style="font-size: 16px; font-weight: 800; color: #fff;">🏛️ Campus Location Directory & Floor Pages</h2>
          <p style="font-size: 11px; color: #9ca3af;">Explore all 37 campus blocks, academic labs, sports facilities, and amenities</p>
        </div>
        <button id="btnCloseCatalog" class="btn-secondary" style="padding: 6px 14px; font-weight: 700;">
          ✕ Back to Map
        </button>
      </div>

      <div style="padding: 10px 24px; background: var(--bg-surface); border-bottom: 1px solid var(--border-medium); display: flex; gap: 6px; overflow-x: auto;">
        ${chipsHtml}
      </div>

      <div class="catalog-grid">
        ${cardsHtml}
      </div>
    `;

    // Attach listeners in catalog
    document.getElementById("btnCloseCatalog").addEventListener("click", () => this.hideCatalog());

    this.catalogContainer.querySelectorAll(".catalog-filter-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        this.activeCatalogCategory = chip.getAttribute("data-cat");
        this.renderCatalog();
      });
    });

    this.catalogContainer.querySelectorAll(".btn-catalog-view").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = parseInt(btn.getAttribute("data-id"));
        const loc = LOCATIONS.find(l => l.id === id);
        if (loc) {
          this.show(loc);
        }
      });
    });

    this.catalogContainer.querySelectorAll(".btn-catalog-route").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = parseInt(btn.getAttribute("data-id"));
        const loc = LOCATIONS.find(l => l.id === id);
        if (loc) {
          this.hideCatalog();
          if (this.options.onNavigateTo) this.options.onNavigateTo(loc);
        }
      });
    });
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { LocationView };
}
