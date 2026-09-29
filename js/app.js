/**
 * Akshaya Campus Navigator Application Coordinator
 * Glues together map engine, shortest-path router, location pages,
 * directory explorer, and top navigation controls.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Services
  const router = new CampusRouter();

  // App State
  let startLocation = LOCATIONS.find(l => l.id === 101); // Default: Main Gate (#101)
  let destinationLocation = LOCATIONS.find(l => l.id === 25); // Default: Auditorium (#25)
  let activeSidebarMode = "route"; // "route" or "directory"
  let currentActiveCategory = "all";
  let searchFilterText = "";

  // 1. Initialize Map Engine
  const mapEngine = new CampusMapEngine("mapContainer", {
    onLocationSelect: (loc) => {
      locationDrawer.show(loc);
    },
    onRouteRequested: (fromLoc, toLoc) => {
      if (fromLoc) setOrigin(fromLoc);
      if (toLoc) setDestination(toLoc);
      switchToRouteMode();
      calculateAndDisplayRoute();
    }
  });

  // 2. Initialize Location Detail Views (Modal & Full Catalog)
  const locationDrawer = new LocationView("locationPageModal", "catalogViewContainer", {
    onNavigateTo: (loc) => {
      setDestination(loc);
      switchToRouteMode();
      calculateAndDisplayRoute();
    },
    onSetOrigin: (loc) => {
      setOrigin(loc);
      switchToRouteMode();
      calculateAndDisplayRoute();
    },
    onFocusMap: (id) => {
      mapEngine.focusLocation(id);
    }
  });

  // UI Element References
  const searchInput = document.getElementById("searchInput");
  const searchResultsDropdown = document.getElementById("searchResultsDropdown");
  const fromSelect = document.getElementById("fromSelect");
  const toSelect = document.getElementById("toSelect");
  const btnSwapRoute = document.getElementById("btnSwapRoute");
  const btnFindRoute = document.getElementById("btnFindRoute");
  const btnClearRoute = document.getElementById("btnClearRoute");
  const btnSimulateWalk = document.getElementById("btnSimulateWalk");
  const routeDistText = document.getElementById("routeDistText");
  const routeTimeText = document.getElementById("routeTimeText");
  const turnDirectionsList = document.getElementById("turnDirectionsList");

  const routePlannerSection = document.getElementById("routePlannerSection");
  const directorySection = document.getElementById("directorySection");
  const panelModeTitle = document.getElementById("panelModeTitle");
  const btnToggleSidebarTab = document.getElementById("btnToggleSidebarTab");
  const categoryChipsContainer = document.getElementById("categoryChips");
  const directoryListContainer = document.getElementById("directoryList");

  // Top Nav Buttons
  const navTabMap = document.getElementById("navTabMap");
  const navTabRoute = document.getElementById("navTabRoute");
  const navTabPages = document.getElementById("navTabPages");

  // Map Controls
  document.getElementById("btnZoomIn").addEventListener("click", () => mapEngine.zoom(1.2));
  document.getElementById("btnZoomOut").addEventListener("click", () => mapEngine.zoom(0.8));
  document.getElementById("btnFitCampus").addEventListener("click", () => mapEngine.fitWholeCampus());

  // Top Nav View Switcher
  navTabMap.addEventListener("click", () => {
    setActiveNavTab("map");
    locationDrawer.hideCatalog();
    mapEngine.fitWholeCampus();
  });

  navTabRoute.addEventListener("click", () => {
    setActiveNavTab("route");
    locationDrawer.hideCatalog();
    switchToRouteMode();
    calculateAndDisplayRoute();
  });

  navTabPages.addEventListener("click", () => {
    setActiveNavTab("pages");
    locationDrawer.showCatalog();
  });

  function setActiveNavTab(tabName) {
    [navTabMap, navTabRoute, navTabPages].forEach(btn => btn.classList.remove("active"));
    if (tabName === "map") navTabMap.classList.add("active");
    if (tabName === "route") navTabRoute.classList.add("active");
    if (tabName === "pages") navTabPages.classList.add("active");
  }

  // Sidebar Mode Switcher (Route Planner vs Directory)
  function switchToRouteMode() {
    activeSidebarMode = "route";
    routePlannerSection.classList.remove("hidden");
    directorySection.classList.add("hidden");
    panelModeTitle.innerHTML = "🧭 Campus Routing";
    btnToggleSidebarTab.textContent = "Switch to Directory";
  }

  function switchToDirectoryMode() {
    activeSidebarMode = "directory";
    routePlannerSection.classList.add("hidden");
    directorySection.classList.remove("hidden");
    panelModeTitle.innerHTML = "🏛️ Campus Directory";
    btnToggleSidebarTab.textContent = "Switch to Routing";
    renderDirectoryList();
  }

  btnToggleSidebarTab.addEventListener("click", () => {
    if (activeSidebarMode === "route") {
      switchToDirectoryMode();
    } else {
      switchToRouteMode();
    }
  });

  // Populate Location Dropdowns
  function populateLocationSelects() {
    const sorted = [...LOCATIONS].sort((a, b) => a.id - b.id);
    const optionsHtml = sorted.map(loc => `
      <option value="${loc.id}">
        #${loc.id} ${loc.shortName || loc.name}
      </option>
    `).join("");

    fromSelect.innerHTML = optionsHtml;
    toSelect.innerHTML = optionsHtml;

    fromSelect.value = startLocation ? startLocation.id : 101;
    toSelect.value = destinationLocation ? destinationLocation.id : 25;
  }

  // Populate Category Filter Chips
  function renderCategoryChips() {
    categoryChipsContainer.innerHTML = Object.values(CATEGORIES).map(cat => `
      <button class="filter-chip ${currentActiveCategory === cat.id ? 'active' : ''}" data-cat="${cat.id}">
        <span>${cat.icon}</span>
        <span>${cat.label}</span>
      </button>
    `).join("");

    categoryChipsContainer.querySelectorAll(".filter-chip").forEach(btn => {
      btn.addEventListener("click", () => {
        currentActiveCategory = btn.getAttribute("data-cat");
        renderCategoryChips();
        renderDirectoryList();
      });
    });
  }

  // Populate Directory List
  function renderDirectoryList() {
    const filtered = LOCATIONS.filter(loc => {
      const matchCat = currentActiveCategory === "all" || loc.category === currentActiveCategory;
      const matchSearch = searchFilterText === "" ||
        loc.name.toLowerCase().includes(searchFilterText.toLowerCase()) ||
        (loc.departments || []).some(d => d.toLowerCase().includes(searchFilterText.toLowerCase())) ||
        loc.block.toLowerCase().includes(searchFilterText.toLowerCase()) ||
        String(loc.id) === searchFilterText.trim();
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      directoryListContainer.innerHTML = `
        <div style="padding: 24px; text-align: center; color: #9ca3af; font-size: 12px;">
          <p style="font-size: 20px; margin-bottom: 6px;">🔍</p>
          <p>No locations match "${searchFilterText}".</p>
        </div>
      `;
      return;
    }

    directoryListContainer.innerHTML = filtered.map(loc => `
      <div class="loc-card" data-id="${loc.id}">
        <div class="loc-card-badge">${loc.id}</div>
        <div class="loc-card-info">
          <div class="loc-card-name">${loc.name}</div>
          <div class="loc-card-block">${loc.block}</div>
        </div>
        <div class="loc-card-actions">
          <button class="btn-icon-sm btn-card-details" data-id="${loc.id}" title="Open Full Page">📖</button>
          <button class="btn-icon-sm btn-card-route" data-id="${loc.id}" title="Get Directions">📍</button>
        </div>
      </div>
    `).join("");

    directoryListContainer.querySelectorAll(".loc-card").forEach(card => {
      card.addEventListener("click", (e) => {
        if (e.target.closest(".btn-card-details") || e.target.closest(".btn-card-route")) return;
        const id = parseInt(card.getAttribute("data-id"));
        const loc = LOCATIONS.find(l => l.id === id);
        if (loc) {
          mapEngine.focusLocation(id);
        }
      });
    });

    directoryListContainer.querySelectorAll(".btn-card-details").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = parseInt(btn.getAttribute("data-id"));
        const loc = LOCATIONS.find(l => l.id === id);
        if (loc) locationDrawer.show(loc);
      });
    });

    directoryListContainer.querySelectorAll(".btn-card-route").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = parseInt(btn.getAttribute("data-id"));
        const loc = LOCATIONS.find(l => l.id === id);
        if (loc) {
          setDestination(loc);
          switchToRouteMode();
          calculateAndDisplayRoute();
        }
      });
    });
  }

  // Search Autocomplete Handler
  searchInput.addEventListener("input", (e) => {
    searchFilterText = e.target.value.trim();
    if (activeSidebarMode === "directory") renderDirectoryList();

    if (searchFilterText.length > 0) {
      const matches = LOCATIONS.filter(l => 
        l.name.toLowerCase().includes(searchFilterText.toLowerCase()) ||
        String(l.id) === searchFilterText ||
        l.block.toLowerCase().includes(searchFilterText.toLowerCase()) ||
        (l.departments || []).some(d => d.toLowerCase().includes(searchFilterText.toLowerCase()))
      ).slice(0, 6);

      if (matches.length > 0) {
        searchResultsDropdown.innerHTML = matches.map(m => `
          <div class="search-dropdown-item" data-id="${m.id}">
            <div>
              <span style="font-weight: 800; color: #38bdf8; margin-right: 6px;">#${m.id}</span>
              <span style="color: #fff;">${m.name}</span>
            </div>
            <span style="font-size: 10px; color: #9ca3af;">${m.block}</span>
          </div>
        `).join("");
        searchResultsDropdown.classList.remove("hidden");

        searchResultsDropdown.querySelectorAll(".search-dropdown-item").forEach(item => {
          item.addEventListener("click", () => {
            const id = parseInt(item.getAttribute("data-id"));
            const loc = LOCATIONS.find(l => l.id === id);
            if (loc) {
              searchInput.value = loc.name;
              searchResultsDropdown.classList.add("hidden");
              mapEngine.focusLocation(id);
              locationDrawer.show(loc);
            }
          });
        });
      } else {
        searchResultsDropdown.classList.add("hidden");
      }
    } else {
      searchResultsDropdown.classList.add("hidden");
    }
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest("#searchWrapper")) {
      searchResultsDropdown.classList.add("hidden");
    }
  });

  // Origin & Destination Helpers
  function setOrigin(loc) {
    startLocation = loc;
    fromSelect.value = loc.id;
  }

  function setDestination(loc) {
    destinationLocation = loc;
    toSelect.value = loc.id;
  }

  fromSelect.addEventListener("change", (e) => {
    const id = parseInt(e.target.value);
    startLocation = LOCATIONS.find(l => l.id === id);
    calculateAndDisplayRoute();
  });

  toSelect.addEventListener("change", (e) => {
    const id = parseInt(e.target.value);
    destinationLocation = LOCATIONS.find(l => l.id === id);
    calculateAndDisplayRoute();
  });

  // Reverse / Swap Route
  btnSwapRoute.addEventListener("click", () => {
    const temp = startLocation;
    startLocation = destinationLocation;
    destinationLocation = temp;
    fromSelect.value = startLocation.id;
    toSelect.value = destinationLocation.id;
    calculateAndDisplayRoute();
  });

  // Calculate & Display Route
  function calculateAndDisplayRoute() {
    if (!startLocation || !destinationLocation) return;

    const startNode = startLocation.entranceNode || router.findNearestNode(startLocation.coords);
    const endNode = destinationLocation.entranceNode || router.findNearestNode(destinationLocation.coords);

    const result = router.findShortestPath(startNode, endNode);
    if (!result) {
      alert("No direct pedestrian path found between these locations.");
      return;
    }

    mapEngine.renderRoute(result, startLocation, destinationLocation);

    routeDistText.textContent = `${result.totalDistance} meters`;
    routeTimeText.textContent = `~${result.walkingMinutes} min walk`;

    turnDirectionsList.innerHTML = result.steps.map((step, idx) => `
      <div class="turn-step-card" data-step="${idx}">
        <span class="step-num">${idx + 1}</span>
        <div class="step-text">
          <div class="step-instruction">${step.instruction}</div>
          <div class="step-road">${step.road}</div>
        </div>
      </div>
    `).join("");

    btnSimulateWalk.disabled = false;
  }

  btnFindRoute.addEventListener("click", calculateAndDisplayRoute);

  btnClearRoute.addEventListener("click", () => {
    mapEngine.clearRoute();
    routeDistText.textContent = "0 meters";
    routeTimeText.textContent = "0 min walk";
    turnDirectionsList.innerHTML = `
      <div style="padding: 24px; text-align: center; color: #9ca3af; font-size: 12px;">
        Select your start point and destination above, then click Find Shortest Path.
      </div>
    `;
    btnSimulateWalk.disabled = true;
  });

  // Walk Simulation
  btnSimulateWalk.addEventListener("click", () => {
    btnSimulateWalk.classList.add("active");
    btnSimulateWalk.innerHTML = "<span>🚶</span><span>Simulating...</span>";

    mapEngine.startWalkSimulation((currentStepIdx, isFinished) => {
      turnDirectionsList.querySelectorAll(".turn-step-card").forEach((card, idx) => {
        if (idx === currentStepIdx) {
          card.classList.add("active");
          card.scrollIntoView({ behavior: "smooth", block: "nearest" });
        } else {
          card.classList.remove("active");
        }
      });

      if (isFinished) {
        btnSimulateWalk.classList.remove("active");
        btnSimulateWalk.innerHTML = "<span>🚶</span><span>Walk Finished!</span>";
        setTimeout(() => {
          btnSimulateWalk.innerHTML = "<span>🚶</span><span>Simulate Walk</span>";
        }, 2000);
      }
    });
  });

  // Preset Route Buttons
  document.querySelectorAll(".preset-route-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const fromId = parseInt(btn.getAttribute("data-from"));
      const toId = parseInt(btn.getAttribute("data-to"));
      startLocation = LOCATIONS.find(l => l.id === fromId);
      destinationLocation = LOCATIONS.find(l => l.id === toId);
      fromSelect.value = fromId;
      toSelect.value = toId;
      switchToRouteMode();
      calculateAndDisplayRoute();
    });
  });

  // URL Hash Deep Linking
  function handleUrlHash() {
    const hash = window.location.hash;
    if (hash.startsWith("#location=")) {
      const id = parseInt(hash.replace("#location=", ""));
      const loc = LOCATIONS.find(l => l.id === id);
      if (loc) {
        mapEngine.focusLocation(id);
        locationDrawer.show(loc);
      }
    } else if (hash.startsWith("#route=")) {
      const parts = hash.replace("#route=", "").split(",");
      if (parts.length === 2) {
        const fromId = parseInt(parts[0]);
        const toId = parseInt(parts[1]);
        const f = LOCATIONS.find(l => l.id === fromId);
        const t = LOCATIONS.find(l => l.id === toId);
        if (f && t) {
          startLocation = f;
          destinationLocation = t;
          fromSelect.value = f.id;
          toSelect.value = t.id;
          switchToRouteMode();
          calculateAndDisplayRoute();
        }
      }
    }
  }

  // Initial App Boot
  populateLocationSelects();
  renderCategoryChips();
  renderDirectoryList();
  calculateAndDisplayRoute(); // Initial preview route: Main Gate to Auditorium
  handleUrlHash();
  window.addEventListener("hashchange", handleUrlHash);
});
