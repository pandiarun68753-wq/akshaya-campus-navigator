/**
 * High-Precision Vector SVG Campus Map Engine
 * Replicates the Akshaya Institutional Campus Plan with high-contrast text,
 * interactive building selection, pan/zoom, dynamic route animation, and walk simulation.
 */

class CampusMapEngine {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.options = Object.assign({
      onLocationSelect: null,
      onRouteRequested: null
    }, options);

    this.currentScale = 0.95;
    this.panX = 0;
    this.panY = 0;
    this.isPanning = false;
    this.hasDragged = false;
    this.startX = 0;
    this.startY = 0;

    this.selectedLocationId = null;
    this.activeRoute = null;
    this.simulationTimer = null;
    this.walkerMarker = null;

    this.init();
  }

  init() {
    this.createSVG();
    this.setupEventListeners();
    // Smooth frame to center campus
    setTimeout(() => this.fitWholeCampus(), 50);
  }

  createSVG() {
    this.container.innerHTML = `
      <div class="map-viewport">
        <!-- Floating Compass Overlay -->
        <div style="position: absolute; top: 16px; right: 16px; z-index: 20; pointer-events: none; display: flex; flex-direction: column; align-items: center;">
          <div style="width: 54px; height: 54px; border-radius: 50%; background: rgba(17, 24, 39, 0.85); backdrop-filter: blur(8px); border: 1px solid rgba(55, 65, 81, 0.8); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.5);">
            <svg viewBox="0 0 100 100" style="width: 44px; height: 44px;">
              <polygon points="50,10 58,45 50,38" fill="#ef4444" />
              <polygon points="50,10 42,45 50,38" fill="#dc2626" />
              <polygon points="50,90 58,55 50,62" fill="#94a3b8" />
              <polygon points="50,90 42,55 50,62" fill="#64748b" />
              <polygon points="10,50 45,42 38,50" fill="#94a3b8" />
              <polygon points="10,50 45,58 38,50" fill="#64748b" />
              <polygon points="90,50 55,42 62,50" fill="#94a3b8" />
              <polygon points="90,50 55,58 62,50" fill="#64748b" />
              <circle cx="50" cy="50" r="4" fill="#38bdf8" />
              <text x="50" y="8" font-size="9" font-weight="900" fill="#ef4444" text-anchor="middle">N</text>
              <text x="96" y="53" font-size="8" font-weight="700" fill="#cbd5e1" text-anchor="middle">E</text>
              <text x="50" y="99" font-size="8" font-weight="700" fill="#cbd5e1" text-anchor="middle">S</text>
              <text x="4" y="53" font-size="8" font-weight="700" fill="#cbd5e1" text-anchor="middle">W</text>
            </svg>
          </div>
          <span style="font-size: 9px; color: #94a3b8; font-weight: 700; margin-top: 3px;">NORTH</span>
        </div>

        <!-- Campus Plan Title On Map -->
        <div style="position: absolute; top: 16px; left: 16px; z-index: 20; pointer-events: none; background: rgba(17, 24, 39, 0.9); backdrop-filter: blur(8px); border: 1px solid rgba(55, 65, 81, 0.8); border-radius: 12px; padding: 10px 16px; box-shadow: 0 4px 16px rgba(0,0,0,0.5);">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="width: 8px; height: 8px; border-radius: 50%; background: #10b981; box-shadow: 0 0 8px #10b981;"></span>
            <span style="font-size: 13px; font-weight: 800; color: #fff; letter-spacing: 0.5px;">AKSHAYA INSTITUTIONS</span>
          </div>
          <p style="font-size: 10px; color: #38bdf8; font-weight: 700; text-transform: uppercase; margin-top: 1px;">Institutional Campus Plan</p>
          <p style="font-size: 9px; color: #9ca3af;">Autonomous | Kinathukadavu, Coimbatore</p>
        </div>

        <!-- SVG Map Root -->
        <svg id="campusSvg" viewBox="0 0 900 1150" preserveAspectRatio="xMidYMid meet">
          <defs>
            <!-- Drop Shadow for Buildings -->
            <filter id="bldgShadow" x="-15%" y="-15%" width="130%" height="130%">
              <feDropShadow dx="3" dy="5" stdDeviation="4" flood-color="#020617" flood-opacity="0.75" />
            </filter>

            <!-- Route Glow -->
            <filter id="routeGlowFilter" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <!-- Gradients -->
            <linearGradient id="academicBlue" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#1e40af" />
              <stop offset="100%" stop-color="#1e3a8a" />
            </linearGradient>

            <linearGradient id="adminIndigo" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#3730a3" />
              <stop offset="100%" stop-color="#1e1b4b" />
            </linearGradient>

            <linearGradient id="courtTerracotta" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#ea580c" />
              <stop offset="100%" stop-color="#c2410c" />
            </linearGradient>

            <linearGradient id="groundBrown" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#b45309" />
              <stop offset="100%" stop-color="#78350f" />
            </linearGradient>

            <linearGradient id="lawnGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#15803d" />
              <stop offset="100%" stop-color="#064e3b" />
            </linearGradient>
          </defs>

          <!-- Stage Group (Transformed by pan and zoom) -->
          <g id="mapStage">
            <!-- Background Ground -->
            <rect x="0" y="0" width="900" height="1150" fill="#080e1a" />

            <!-- Outer Campus Boundary Fence -->
            <polygon points="40,480 340,380 430,60 520,60 490,380 820,720 820,1020 490,1050 120,1020 20,760" 
              fill="#0f172a" stroke="#1e293b" stroke-width="2.5" stroke-dasharray="10,6" />

            <!-- Landscaped Lawns & Vegetation -->
            <g id="landscapingLayer">
              <!-- Entrance Parkway Trees -->
              <rect x="365" y="150" width="50" height="210" rx="10" fill="#064e3b" opacity="0.45" />
              <g fill="#10b981" opacity="0.8">
                <circle cx="390" cy="170" r="12" /><circle cx="390" cy="210" r="14" />
                <circle cx="390" cy="250" r="13" /><circle cx="390" cy="290" r="15" />
                <circle cx="390" cy="330" r="12" />
              </g>

              <!-- Central Admin Lawn Roundabout -->
              <path d="M 435,550 Q 535,550 545,615 Q 535,690 435,690 Z" fill="url(#lawnGrad)" opacity="0.9" />
              <circle cx="490" cy="620" r="18" fill="#0284c7" stroke="#38bdf8" stroke-width="2.5" />
              <text x="490" y="624" font-size="8" fill="#ffffff" font-weight="bold" text-anchor="middle">FOUNTAIN</text>

              <!-- Green Patch near Power House -->
              <rect x="270" y="410" width="55" height="42" rx="4" fill="#064e3b" opacity="0.65" />
            </g>

            <!-- Campus Roadways Network -->
            <g id="roadsLayer" stroke-linecap="round" stroke-linejoin="round">
              <!-- Outer Road Borders (curbs) -->
              <path d="M 465,65 L 490,380" stroke="#475569" stroke-width="40" fill="none" />
              <path d="M 490,380 L 435,400 L 220,460" stroke="#475569" stroke-width="32" fill="none" />
              <path d="M 435,400 L 440,460 L 525,620 L 465,780" stroke="#475569" stroke-width="32" fill="none" />
              <path d="M 220,460 L 155,600 L 155,780" stroke="#475569" stroke-width="28" fill="none" />
              <path d="M 155,780 L 465,780" stroke="#475569" stroke-width="30" fill="none" />
              <path d="M 220,460 L 440,460" stroke="#475569" stroke-width="24" fill="none" />
              <path d="M 465,780 L 750,780" stroke="#475569" stroke-width="30" fill="none" />
              <path d="M 590,780 L 590,960" stroke="#475569" stroke-width="26" fill="none" />
              <path d="M 465,780 L 445,960 L 500,960" stroke="#475569" stroke-width="28" fill="none" />
              <path d="M 445,960 L 220,960 L 220,890" stroke="#475569" stroke-width="24" fill="none" />

              <!-- Inner Road Asphalt -->
              <path d="M 465,65 L 490,380" stroke="#1e293b" stroke-width="34" fill="none" />
              <path d="M 490,380 L 435,400 L 220,460" stroke="#1e293b" stroke-width="26" fill="none" />
              <path d="M 435,400 L 440,460 L 525,620 L 465,780" stroke="#1e293b" stroke-width="26" fill="none" />
              <path d="M 220,460 L 155,600 L 155,780" stroke="#1e293b" stroke-width="22" fill="none" />
              <path d="M 155,780 L 465,780" stroke="#1e293b" stroke-width="24" fill="none" />
              <path d="M 220,460 L 440,460" stroke="#1e293b" stroke-width="18" fill="none" />
              <path d="M 465,780 L 750,780" stroke="#1e293b" stroke-width="24" fill="none" />
              <path d="M 590,780 L 590,960" stroke="#1e293b" stroke-width="20" fill="none" />
              <path d="M 465,780 L 445,960 L 500,960" stroke="#1e293b" stroke-width="22" fill="none" />
              <path d="M 445,960 L 220,960 L 220,890" stroke="#1e293b" stroke-width="18" fill="none" />

              <!-- Courtyard Walkways -->
              <path d="M 435,620 L 260,620" stroke="#334155" stroke-width="16" fill="none" />
              <path d="M 305,535 L 305,745" stroke="#334155" stroke-width="16" fill="none" />

              <!-- Road Center White Lines -->
              <path d="M 465,75 L 490,370" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="10,8" fill="none" opacity="0.6" />
              <path d="M 440,460 L 525,620 L 465,780" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="10,8" fill="none" opacity="0.6" />

              <!-- Direction Flow Arrows (Matching the Original Board) -->
              <g stroke="#38bdf8" stroke-width="2.5" fill="none" opacity="0.85">
                <path d="M 462,140 L 467,155 L 472,140" />
                <path d="M 470,240 L 475,255 L 480,240" />
                <path d="M 478,335 L 483,350 L 488,335" />
                <path d="M 500,535 L 506,550 L 512,535" />
                <path d="M 515,675 L 509,690 L 503,675" />
                <path d="M 415,615 L 400,620 L 415,625" />
                <path d="M 158,540 L 153,555 L 148,540" />
                <path d="M 158,700 L 153,715 L 148,700" />
                <path d="M 360,775 L 375,780 L 360,785" />
              </g>
            </g>

            <!-- Parking & Main Gate -->
            <g id="parkingLayer">
              <!-- 101: Main Gate & Security -->
              <g id="loc-101" class="bldg-group" data-id="101" filter="url(#bldgShadow)">
                <rect x="420" y="80" width="75" height="32" rx="6" fill="#047857" stroke="#34d399" stroke-width="2" />
                <circle cx="434" cy="96" r="10" fill="#065f46" stroke="#6ee7b7" stroke-width="1.5" />
                <text x="434" y="100" font-size="9" font-weight="900" fill="#ffffff" text-anchor="middle">101</text>
                <text x="466" y="99" font-size="10" font-weight="800" fill="#ffffff">MAIN GATE</text>
              </g>

              <!-- 102: Two Wheeler Parking -->
              <g id="loc-102" class="bldg-group" data-id="102">
                <rect x="500" y="160" width="48" height="95" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="4,3" />
                <circle cx="524" cy="182" r="11" fill="#0284c7" />
                <text x="524" y="186" font-size="11" text-anchor="middle">🏍️</text>
                <text x="524" y="206" font-size="9" fill="#38bdf8" font-weight="800" text-anchor="middle">2-WHEELER</text>
                <text x="524" y="218" font-size="8" fill="#94a3b8" font-weight="600" text-anchor="middle">PARKING</text>
              </g>

              <!-- 103: Four Wheeler Parking -->
              <g id="loc-103" class="bldg-group" data-id="103">
                <rect x="515" y="275" width="52" height="90" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="4,3" />
                <circle cx="541" cy="298" r="11" fill="#0284c7" />
                <text x="541" y="302" font-size="11" text-anchor="middle">🚗</text>
                <text x="541" y="322" font-size="9" fill="#38bdf8" font-weight="800" text-anchor="middle">CAR / 4-W</text>
                <text x="541" y="334" font-size="8" fill="#94a3b8" font-weight="600" text-anchor="middle">PARKING</text>
              </g>

              <!-- 104: Campus Temple -->
              <g id="loc-104" class="bldg-group" data-id="104">
                <circle cx="480" cy="570" r="16" fill="#b45309" stroke="#fde047" stroke-width="2" />
                <text x="480" y="575" font-size="13" text-anchor="middle">🛕</text>
                <text x="480" y="596" font-size="9" fill="#fde047" font-weight="800" text-anchor="middle">TEMPLE</text>
              </g>

              <!-- 105: Campus ATM -->
              <g id="loc-105" class="bldg-group" data-id="105">
                <rect x="530" y="740" width="30" height="22" rx="4" fill="#0369a1" stroke="#38bdf8" stroke-width="1.5" />
                <text x="545" y="754" font-size="9" fill="#ffffff" font-weight="800" text-anchor="middle">ATM</text>
              </g>

              <!-- 106: Cafeteria -->
              <g id="loc-106" class="bldg-group" data-id="106">
                <rect x="500" y="715" width="32" height="26" rx="5" fill="#b45309" stroke="#fbbf24" stroke-width="1.5" />
                <text x="516" y="732" font-size="12" text-anchor="middle">☕</text>
              </g>
            </g>

            <!-- Sports Courts & Fields -->
            <g id="sportsLayer">
              <!-- 26: Ball Badminton Court -->
              <g id="loc-26" class="bldg-group" data-id="26" filter="url(#bldgShadow)">
                <rect x="290" y="415" width="90" height="46" rx="4" fill="url(#courtTerracotta)" stroke="#fed7aa" stroke-width="1.5" />
                <line x1="335" y1="415" x2="335" y2="461" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="3,3" />
                <circle cx="335" cy="438" r="12" fill="#111827" stroke="#fdba74" stroke-width="1.5" />
                <text x="335" y="442" font-size="11" font-weight="900" fill="#ffffff" text-anchor="middle">26</text>
                <text x="335" y="474" font-size="9" fill="#fdba74" font-weight="700" text-anchor="middle">Ball Badminton</text>
              </g>

              <!-- 27: Volleyball Court -->
              <g id="loc-27" class="bldg-group" data-id="27" filter="url(#bldgShadow)">
                <rect x="45" y="490" width="90" height="56" rx="4" fill="url(#courtTerracotta)" stroke="#fed7aa" stroke-width="1.5" />
                <line x1="90" y1="490" x2="90" y2="546" stroke="#ffffff" stroke-width="1.5" />
                <circle cx="90" cy="518" r="12" fill="#111827" stroke="#fdba74" stroke-width="1.5" />
                <text x="90" y="522" font-size="11" font-weight="900" fill="#ffffff" text-anchor="middle">27</text>
                <text x="90" y="560" font-size="9" fill="#fdba74" font-weight="700" text-anchor="middle">Volleyball Court</text>
              </g>

              <!-- 28: Kabaddi Court -->
              <g id="loc-28" class="bldg-group" data-id="28" filter="url(#bldgShadow)">
                <rect x="50" y="570" width="85" height="54" rx="4" fill="url(#courtTerracotta)" stroke="#fed7aa" stroke-width="1.5" />
                <line x1="92" y1="570" x2="92" y2="624" stroke="#ffffff" stroke-width="1" />
                <circle cx="92" cy="597" r="12" fill="#111827" stroke="#fdba74" stroke-width="1.5" />
                <text x="92" y="601" font-size="11" font-weight="900" fill="#ffffff" text-anchor="middle">28</text>
                <text x="92" y="638" font-size="9" fill="#fdba74" font-weight="700" text-anchor="middle">Kabaddi Court</text>
              </g>

              <!-- 29: Cricket Nets -->
              <g id="loc-29" class="bldg-group" data-id="29" filter="url(#bldgShadow)">
                <rect x="60" y="650" width="75" height="66" rx="4" fill="#15803d" stroke="#86efac" stroke-width="1.5" />
                <line x1="85" y1="650" x2="85" y2="716" stroke="#fde047" stroke-width="2" />
                <line x1="110" y1="650" x2="110" y2="716" stroke="#fde047" stroke-width="2" />
                <circle cx="97" cy="683" r="12" fill="#111827" stroke="#86efac" stroke-width="1.5" />
                <text x="97" y="687" font-size="11" font-weight="900" fill="#ffffff" text-anchor="middle">29</text>
                <text x="97" y="728" font-size="9" fill="#86efac" font-weight="700" text-anchor="middle">Cricket Nets</text>
              </g>

              <!-- 30: Basketball Court (Inside Central Quadrangle) -->
              <g id="loc-30" class="bldg-group" data-id="30">
                <rect x="235" y="595" width="58" height="90" rx="4" fill="#0284c7" stroke="#ffffff" stroke-width="1.5" />
                <line x1="235" y1="640" x2="293" y2="640" stroke="#ffffff" stroke-width="1.5" />
                <circle cx="264" cy="640" r="12" fill="none" stroke="#ffffff" stroke-width="1.5" />
                <circle cx="264" cy="640" r="12" fill="#111827" stroke="#38bdf8" stroke-width="1.5" />
                <text x="264" y="644" font-size="11" font-weight="900" fill="#38bdf8" text-anchor="middle">30</text>
                <text x="264" y="698" font-size="9" fill="#7dd3fc" font-weight="800" text-anchor="middle">Basketball</text>
              </g>

              <!-- 31: Playground -->
              <g id="loc-31" class="bldg-group" data-id="31" filter="url(#bldgShadow)">
                <rect x="265" y="815" width="145" height="90" rx="24" fill="url(#groundBrown)" stroke="#fde68a" stroke-width="2.5" />
                <rect x="273" y="823" width="129" height="74" rx="18" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="8,5" opacity="0.7" />
                <circle cx="337" cy="860" r="15" fill="#111827" stroke="#fde68a" stroke-width="2" />
                <text x="337" y="865" font-size="13" font-weight="900" fill="#ffffff" text-anchor="middle">31</text>
                <text x="337" y="888" font-size="11" fill="#fef08a" font-weight="800" text-anchor="middle">PLAYGROUND</text>
              </g>
            </g>

            <!-- Buildings Layer -->
            <g id="buildingsLayer">
              <!-- 19: Power House -->
              <g id="loc-19" class="bldg-group" data-id="19" filter="url(#bldgShadow)">
                <rect x="180" y="405" width="80" height="38" rx="4" fill="#1e3a8a" stroke="#60a5fa" stroke-width="1.5" />
                <circle cx="220" cy="424" r="11" fill="#0f172a" stroke="#60a5fa" stroke-width="1.5" />
                <text x="220" y="428" font-size="10" font-weight="900" fill="#93c5fd" text-anchor="middle">19</text>
                <text x="220" y="455" font-size="9" fill="#93c5fd" font-weight="700" text-anchor="middle">Power House</text>
              </g>

              <!-- 20: Transformer -->
              <g id="loc-20" class="bldg-group" data-id="20">
                <rect x="370" y="380" width="34" height="25" rx="3" fill="#7f1d1d" stroke="#f87171" stroke-width="1.5" />
                <text x="387" y="396" font-size="9" font-weight="900" fill="#fecaca" text-anchor="middle">20</text>
                <text x="387" y="413" font-size="8" fill="#f87171" font-weight="700" text-anchor="middle">⚡ TR</text>
              </g>

              <!-- 15: Akshaya Thalir Pre-incubation -->
              <g id="loc-15" class="bldg-group" data-id="15" filter="url(#bldgShadow)">
                <rect x="145" y="455" width="115" height="28" rx="4" fill="#1e3a8a" stroke="#60a5fa" stroke-width="1.5" />
                <circle cx="202" cy="469" r="10" fill="#0f172a" stroke="#60a5fa" stroke-width="1.5" />
                <text x="202" y="473" font-size="9" font-weight="900" fill="#93c5fd" text-anchor="middle">15</text>
                <text x="202" y="493" font-size="8.5" fill="#bae6fd" font-weight="700" text-anchor="middle">Thalir Pre-incubation</text>
              </g>

              <!-- CENTRAL QUADRANGLE BUILDINGS -->
              <!-- 8: D Block (Science & Humanities) -->
              <g id="loc-8" class="bldg-group" data-id="8" filter="url(#bldgShadow)">
                <rect x="250" y="500" width="120" height="26" fill="url(#academicBlue)" stroke="#93c5fd" stroke-width="1.5" />
                <circle cx="310" cy="513" r="10" fill="#0f172a" stroke="#93c5fd" stroke-width="1.5" />
                <text x="310" y="517" font-size="10" font-weight="900" fill="#ffffff" text-anchor="middle">8</text>
                <text x="310" y="536" font-size="8.5" fill="#e2e8f0" font-weight="700" text-anchor="middle">D Block (S&H)</text>
              </g>

              <!-- 7: C Block (CSE Clusters) -->
              <g id="loc-7" class="bldg-group" data-id="7">
                <rect x="250" y="526" width="115" height="26" fill="#1e40af" stroke="#60a5fa" stroke-width="1.5" />
                <circle cx="307" cy="539" r="10" fill="#0f172a" stroke="#60a5fa" stroke-width="1.5" />
                <text x="307" y="543" font-size="10" font-weight="900" fill="#ffffff" text-anchor="middle">7</text>
                <text x="307" y="562" font-size="8.5" fill="#93c5fd" font-weight="700" text-anchor="middle">C Block (CSE)</text>
              </g>

              <!-- 9: Store room -->
              <g id="loc-9" class="bldg-group" data-id="9">
                <rect x="372" y="500" width="26" height="24" fill="#1e3a8a" stroke="#93c5fd" stroke-width="1.2" />
                <text x="385" y="516" font-size="9" font-weight="900" fill="#ffffff" text-anchor="middle">9</text>
              </g>

              <!-- 10: Office room -->
              <g id="loc-10" class="bldg-group" data-id="10">
                <rect x="372" y="525" width="26" height="25" fill="#1e3a8a" stroke="#93c5fd" stroke-width="1.2" />
                <text x="385" y="541" font-size="9" font-weight="900" fill="#ffffff" text-anchor="middle">10</text>
              </g>

              <!-- 16: Recreation Center -->
              <g id="loc-16" class="bldg-group" data-id="16">
                <rect x="180" y="500" width="32" height="38" fill="#1e3a8a" stroke="#93c5fd" stroke-width="1.5" />
                <text x="196" y="522" font-size="10" font-weight="900" fill="#ffffff" text-anchor="middle">16</text>
                <text x="196" y="546" font-size="8" fill="#cbd5e1" font-weight="700" text-anchor="middle">Rec Center</text>
              </g>

              <!-- 21: GYM -->
              <g id="loc-21" class="bldg-group" data-id="21">
                <rect x="215" y="540" width="26" height="26" fill="#047857" stroke="#34d399" stroke-width="1.5" />
                <text x="228" y="556" font-size="9" font-weight="900" fill="#ffffff" text-anchor="middle">21</text>
                <text x="228" y="574" font-size="7.5" fill="#a7f3d0" font-weight="800" text-anchor="middle">GYM</text>
              </g>

              <!-- 17: Akshaya College of Arts & Science -->
              <g id="loc-17" class="bldg-group" data-id="17" filter="url(#bldgShadow)">
                <rect x="175" y="545" width="36" height="155" fill="url(#adminIndigo)" stroke="#c7d2fe" stroke-width="2" />
                <circle cx="193" cy="622" r="13" fill="#0f172a" stroke="#c7d2fe" stroke-width="2" />
                <text x="193" y="627" font-size="12" font-weight="900" fill="#ffffff" text-anchor="middle">17</text>
                <text x="193" y="648" font-size="9" fill="#e0e7ff" font-weight="800" text-anchor="middle">Arts & Science</text>
              </g>

              <!-- 18: Principal (Arts & Science) -->
              <g id="loc-18" class="bldg-group" data-id="18">
                <rect x="210" y="730" width="32" height="30" fill="#4338ca" stroke="#c7d2fe" stroke-width="1.5" />
                <text x="226" y="749" font-size="10" font-weight="900" fill="#ffffff" text-anchor="middle">18</text>
                <text x="226" y="770" font-size="8" fill="#e0e7ff" font-weight="700" text-anchor="middle">Principal AS</text>
              </g>

              <!-- 5: A Block (ECE, Library) -->
              <g id="loc-5" class="bldg-group" data-id="5" filter="url(#bldgShadow)">
                <rect x="240" y="725" width="160" height="36" fill="url(#academicBlue)" stroke="#93c5fd" stroke-width="2" />
                <circle cx="320" cy="743" r="13" fill="#0f172a" stroke="#93c5fd" stroke-width="2" />
                <text x="320" y="748" font-size="12" font-weight="900" fill="#ffffff" text-anchor="middle">5</text>
                <text x="320" y="758" font-size="9.5" fill="#f8fafc" font-weight="800" text-anchor="middle">A Block (ECE, Library)</text>
              </g>

              <!-- 6: B Block (CSE Clusters) -->
              <g id="loc-6" class="bldg-group" data-id="6">
                <rect x="330" y="580" width="36" height="125" fill="#1e40af" stroke="#60a5fa" stroke-width="1.5" />
                <circle cx="348" cy="642" r="11" fill="#0f172a" stroke="#60a5fa" stroke-width="1.5" />
                <text x="348" y="646" font-size="10" font-weight="900" fill="#ffffff" text-anchor="middle">6</text>
                <text x="348" y="663" font-size="8.5" fill="#93c5fd" font-weight="700" text-anchor="middle">B Block (CSE)</text>
              </g>

              <!-- 4: Main Block -->
              <g id="loc-4" class="bldg-group" data-id="4" filter="url(#bldgShadow)">
                <polygon points="395,550 440,550 445,620 440,690 395,690" fill="url(#adminIndigo)" stroke="#c7d2fe" stroke-width="2.5" />
                <circle cx="417" cy="625" r="15" fill="#0f172a" stroke="#c7d2fe" stroke-width="2" />
                <text x="417" y="630" font-size="13" font-weight="900" fill="#ffffff" text-anchor="middle">4</text>
                <text x="417" y="648" font-size="9.5" fill="#ffffff" font-weight="800" text-anchor="middle">MAIN BLOCK</text>
              </g>

              <!-- 1: Managing Trustee -->
              <g id="loc-1" class="bldg-group" data-id="1">
                <circle cx="417" cy="570" r="10" fill="#f59e0b" stroke="#ffffff" stroke-width="1.5" />
                <text x="417" y="574" font-size="9" font-weight="900" fill="#000" text-anchor="middle">1</text>
                <text x="417" y="587" font-size="8" fill="#fde68a" font-weight="800" text-anchor="middle">Trustee</text>
              </g>

              <!-- 2: CEO Office -->
              <g id="loc-2" class="bldg-group" data-id="2">
                <circle cx="417" cy="598" r="10" fill="#38bdf8" stroke="#ffffff" stroke-width="1.5" />
                <text x="417" y="602" font-size="9" font-weight="900" fill="#000" text-anchor="middle">2</text>
                <text x="417" y="612" font-size="8" fill="#bae6fd" font-weight="800" text-anchor="middle">CEO</text>
              </g>

              <!-- 3: Principal ACET -->
              <g id="loc-3" class="bldg-group" data-id="3">
                <circle cx="417" cy="665" r="10" fill="#34d399" stroke="#ffffff" stroke-width="1.5" />
                <text x="417" y="669" font-size="9" font-weight="900" fill="#000" text-anchor="middle">3</text>
                <text x="417" y="682" font-size="8" fill="#a7f3d0" font-weight="800" text-anchor="middle">Principal</text>
              </g>

              <!-- SOUTHERN COMPLEX -->
              <!-- 11: E Block (Heavy Engineering) -->
              <g id="loc-11" class="bldg-group" data-id="11" filter="url(#bldgShadow)">
                <rect x="420" y="805" width="60" height="150" rx="6" fill="url(#academicBlue)" stroke="#93c5fd" stroke-width="2.5" />
                <circle cx="450" cy="880" r="15" fill="#0f172a" stroke="#93c5fd" stroke-width="2" />
                <text x="450" y="885" font-size="13" font-weight="900" fill="#ffffff" text-anchor="middle">11</text>
                <text x="450" y="904" font-size="10" fill="#ffffff" font-weight="800" text-anchor="middle">E BLOCK</text>
                <text x="450" y="916" font-size="8" fill="#93c5fd" font-weight="700" text-anchor="middle">MECH/CIVIL/EEE</text>
              </g>

              <!-- 12: Training Centre -->
              <g id="loc-12" class="bldg-group" data-id="12" filter="url(#bldgShadow)">
                <rect x="310" y="915" width="100" height="32" rx="4" fill="#1e40af" stroke="#60a5fa" stroke-width="1.5" />
                <circle cx="360" cy="931" r="10" fill="#0f172a" stroke="#60a5fa" stroke-width="1.5" />
                <text x="360" y="935" font-size="10" font-weight="900" fill="#ffffff" text-anchor="middle">12</text>
                <text x="360" y="944" font-size="8" fill="#bfdbfe" font-weight="700" text-anchor="middle">Training Centre</text>
              </g>

              <!-- 13: Workshop -->
              <g id="loc-13" class="bldg-group" data-id="13" filter="url(#bldgShadow)">
                <rect x="310" y="952" width="100" height="34" rx="4" fill="#1e3a8a" stroke="#60a5fa" stroke-width="1.5" />
                <circle cx="360" cy="969" r="10" fill="#0f172a" stroke="#60a5fa" stroke-width="1.5" />
                <text x="360" y="973" font-size="10" font-weight="900" fill="#ffffff" text-anchor="middle">13</text>
                <text x="360" y="983" font-size="8" fill="#bfdbfe" font-weight="700" text-anchor="middle">Central Workshop</text>
              </g>

              <!-- 14: Centres of Excellence -->
              <g id="loc-14" class="bldg-group" data-id="14" filter="url(#bldgShadow)">
                <rect x="475" y="945" width="50" height="32" rx="4" fill="#1e3a8a" stroke="#93c5fd" stroke-width="1.5" />
                <circle cx="500" cy="961" r="10" fill="#0f172a" stroke="#93c5fd" stroke-width="1.5" />
                <text x="500" y="965" font-size="9" font-weight="900" fill="#ffffff" text-anchor="middle">14</text>
                <text x="500" y="975" font-size="8" fill="#bfdbfe" font-weight="700" text-anchor="middle">COE</text>
              </g>

              <!-- 22: Boys Hostel -->
              <g id="loc-22" class="bldg-group" data-id="22" filter="url(#bldgShadow)">
                <polygon points="175,850 250,850 250,970 160,970 160,920 175,920" fill="#1e3a8a" stroke="#60a5fa" stroke-width="2.5" />
                <circle cx="212" cy="910" r="14" fill="#0f172a" stroke="#60a5fa" stroke-width="2" />
                <text x="212" y="915" font-size="12" font-weight="900" fill="#ffffff" text-anchor="middle">22</text>
                <text x="212" y="934" font-size="9.5" fill="#ffffff" font-weight="800" text-anchor="middle">BOYS HOSTEL</text>
              </g>

              <!-- EASTERN COMPLEX -->
              <!-- 24: Food Court & Amenities -->
              <g id="loc-24" class="bldg-group" data-id="24" filter="url(#bldgShadow)">
                <rect x="545" y="760" width="75" height="95" rx="6" fill="#0369a1" stroke="#38bdf8" stroke-width="2.5" />
                <circle cx="582" cy="808" r="14" fill="#0f172a" stroke="#38bdf8" stroke-width="2" />
                <text x="582" y="813" font-size="12" font-weight="900" fill="#ffffff" text-anchor="middle">24</text>
                <text x="582" y="830" font-size="9.5" fill="#ffffff" font-weight="800" text-anchor="middle">FOOD COURT</text>
                <text x="582" y="842" font-size="8" fill="#bae6fd" font-weight="600" text-anchor="middle">& Central Dining</text>
              </g>

              <!-- 23: Girls Hostel -->
              <g id="loc-23" class="bldg-group" data-id="23" filter="url(#bldgShadow)">
                <rect x="625" y="760" width="145" height="54" rx="6" fill="#1e3a8a" stroke="#60a5fa" stroke-width="2.5" />
                <circle cx="697" cy="787" r="14" fill="#0f172a" stroke="#60a5fa" stroke-width="2" />
                <text x="697" y="792" font-size="12" font-weight="900" fill="#ffffff" text-anchor="middle">23</text>
                <text x="697" y="810" font-size="10" fill="#ffffff" font-weight="800" text-anchor="middle">GIRLS HOSTEL</text>
              </g>

              <!-- 25: Auditorium -->
              <g id="loc-25" class="bldg-group" data-id="25" filter="url(#bldgShadow)">
                <rect x="565" y="870" width="180" height="90" rx="6" fill="#1e3a8a" stroke="#93c5fd" stroke-width="2.5" />
                <circle cx="655" cy="915" r="16" fill="#0f172a" stroke="#93c5fd" stroke-width="2.5" />
                <text x="655" y="920" font-size="14" font-weight="900" fill="#ffffff" text-anchor="middle">25</text>
                <text x="655" y="940" font-size="11" fill="#ffffff" font-weight="800" text-anchor="middle">AUDITORIUM</text>
                <text x="655" y="952" font-size="8.5" fill="#93c5fd" font-weight="600" text-anchor="middle">1500+ Seating</text>
              </g>
            </g>

            <!-- Dynamic Route Overlay Layer -->
            <g id="routeLayer">
              <path id="routeGlow" d="" fill="none" stroke="#38bdf8" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" opacity="0.45" filter="url(#routeGlowFilter)" />
              <path id="routeLine" d="" fill="none" stroke="#0ea5e9" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
              <g id="routePins"></g>
              <g id="walkerMarker" style="display: none;">
                <circle cx="0" cy="0" r="12" fill="#38bdf8" stroke="#ffffff" stroke-width="3" />
                <circle cx="0" cy="0" r="18" fill="none" stroke="#38bdf8" stroke-width="2" class="animate-ping" />
                <text x="0" y="4" font-size="10" font-weight="bold" fill="#0f172a" text-anchor="middle">🚶</text>
              </g>
            </g>

            <!-- Selection Highlight Ring -->
            <g id="pinHighlightLayer"></g>
          </g>
        </svg>

        <!-- Floating Quick Action Card -->
        <div id="bldgQuickCard" class="hidden">
          <div id="quickCardBadge" class="quick-card-badge"></div>
          <div class="quick-card-content">
            <h3 id="quickCardTitle" class="quick-card-title"></h3>
            <p id="quickCardDesc" class="quick-card-desc"></p>
          </div>
          <div class="quick-card-actions">
            <button id="btnQuickRouteFrom" class="btn-quick-action btn-route-from" title="Start route here">
              <span>🚩 From Here</span>
            </button>
            <button id="btnQuickRouteTo" class="btn-quick-action btn-route-to" title="Navigate here">
              <span>📍 To Here</span>
            </button>
            <button id="btnQuickDetails" class="btn-quick-action btn-details" title="Open full location page">
              <span>📖 Details</span>
            </button>
            <button id="btnQuickClose" style="background: none; border: none; color: #9ca3af; font-size: 16px; cursor: pointer; padding: 4px;" title="Close">
              ✕
            </button>
          </div>
        </div>

        <!-- Tooltip -->
        <div id="mapTooltip" style="position: absolute; display: none; pointer-events: none; z-index: 35; background: rgba(17, 24, 39, 0.95); border: 1px solid #38bdf8; border-radius: 8px; padding: 6px 12px; color: #fff; font-size: 11px; box-shadow: 0 4px 16px rgba(0,0,0,0.6); white-space: nowrap;">
        </div>
      </div>
    `;

    this.svg = document.getElementById("campusSvg");
    this.stage = document.getElementById("mapStage");
    this.routeLine = document.getElementById("routeLine");
    this.routeGlow = document.getElementById("routeGlow");
    this.routePins = document.getElementById("routePins");
    this.walkerMarker = document.getElementById("walkerMarker");
    this.pinHighlightLayer = document.getElementById("pinHighlightLayer");
    this.tooltip = document.getElementById("mapTooltip");

    // Quick Card Elements
    this.quickCard = document.getElementById("bldgQuickCard");
    this.quickCardBadge = document.getElementById("quickCardBadge");
    this.quickCardTitle = document.getElementById("quickCardTitle");
    this.quickCardDesc = document.getElementById("quickCardDesc");
  }

  setupEventListeners() {
    const viewport = this.container.querySelector(".map-viewport");

    // Pan with mouse drag
    viewport.addEventListener("mousedown", (e) => {
      if (e.target.closest("#bldgQuickCard")) return;
      this.isPanning = true;
      this.hasDragged = false;
      this.startX = e.clientX - this.panX;
      this.startY = e.clientY - this.panY;
    });

    window.addEventListener("mousemove", (e) => {
      if (!this.isPanning) return;
      const dx = Math.abs(e.clientX - (this.startX + this.panX));
      const dy = Math.abs(e.clientY - (this.startY + this.panY));
      if (dx > 4 || dy > 4) {
        this.hasDragged = true;
      }
      this.panX = e.clientX - this.startX;
      this.panY = e.clientY - this.startY;
      this.updateTransform();
    });

    window.addEventListener("mouseup", () => {
      this.isPanning = false;
    });

    // Zoom with mouse wheel
    viewport.addEventListener("wheel", (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.15 : 0.88;
      this.zoom(zoomFactor, e.clientX, e.clientY);
    }, { passive: false });

    // Touch support (mobile pan and pinch)
    let initialTouchDist = 0;
    viewport.addEventListener("touchstart", (e) => {
      if (e.touches.length === 1) {
        this.isPanning = true;
        this.hasDragged = false;
        this.startX = e.touches[0].clientX - this.panX;
        this.startY = e.touches[0].clientY - this.panY;
      } else if (e.touches.length === 2) {
        this.isPanning = false;
        initialTouchDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    });

    viewport.addEventListener("touchmove", (e) => {
      if (e.touches.length === 1 && this.isPanning) {
        this.hasDragged = true;
        this.panX = e.touches[0].clientX - this.startX;
        this.panY = e.touches[0].clientY - this.startY;
        this.updateTransform();
      } else if (e.touches.length === 2) {
        const currentDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const factor = currentDist / (initialTouchDist || currentDist);
        if (Math.abs(factor - 1) > 0.04) {
          this.zoom(factor > 1 ? 1.05 : 0.95);
          initialTouchDist = currentDist;
        }
      }
    });

    viewport.addEventListener("touchend", () => {
      this.isPanning = false;
    });

    // Building Click Handler
    this.stage.addEventListener("click", (e) => {
      if (this.hasDragged) return; // Ignore drag end click
      const bldg = e.target.closest(".bldg-group");
      if (!bldg) return;
      const id = parseInt(bldg.getAttribute("data-id"));
      this.selectLocation(id, true);
    });

    // Building Tooltips on Hover
    this.stage.addEventListener("mousemove", (e) => {
      const bldg = e.target.closest(".bldg-group");
      if (bldg) {
        const id = parseInt(bldg.getAttribute("data-id"));
        const loc = LOCATIONS.find(l => l.id === id);
        if (loc) {
          this.showTooltip(e.clientX, e.clientY, loc);
          return;
        }
      }
      this.hideTooltip();
    });

    this.stage.addEventListener("mouseleave", () => {
      this.hideTooltip();
    });

    // Quick Card Buttons
    document.getElementById("btnQuickClose").addEventListener("click", () => {
      this.hideQuickCard();
    });

    document.getElementById("btnQuickRouteTo").addEventListener("click", () => {
      if (this.selectedLocationId && this.options.onRouteRequested) {
        const loc = LOCATIONS.find(l => l.id === this.selectedLocationId);
        this.options.onRouteRequested(null, loc);
      }
    });

    document.getElementById("btnQuickRouteFrom").addEventListener("click", () => {
      if (this.selectedLocationId && this.options.onRouteRequested) {
        const loc = LOCATIONS.find(l => l.id === this.selectedLocationId);
        this.options.onRouteRequested(loc, null);
      }
    });

    document.getElementById("btnQuickDetails").addEventListener("click", () => {
      if (this.selectedLocationId && this.options.onLocationSelect) {
        const loc = LOCATIONS.find(l => l.id === this.selectedLocationId);
        this.options.onLocationSelect(loc);
      }
    });
  }

  updateTransform() {
    this.stage.setAttribute("transform", `translate(${this.panX}, ${this.panY}) scale(${this.currentScale})`);
  }

  zoom(factor, clientX = null, clientY = null) {
    const newScale = Math.min(Math.max(this.currentScale * factor, 0.5), 3.5);
    if (clientX !== null && clientY !== null) {
      const rect = this.svg.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        const offsetX = clientX - rect.left;
        const offsetY = clientY - rect.top;
        this.panX = offsetX - (offsetX - this.panX) * (newScale / this.currentScale);
        this.panY = offsetY - (offsetY - this.panY) * (newScale / this.currentScale);
      }
    }
    this.currentScale = newScale;
    this.updateTransform();
  }

  fitWholeCampus() {
    const rect = this.svg.getBoundingClientRect();
    const w = rect.width || 800;
    const h = rect.height || 700;

    this.currentScale = Math.min(w / 950, h / 1150) * 0.95;
    if (this.currentScale < 0.6) this.currentScale = 0.6;
    if (this.currentScale > 1.2) this.currentScale = 1.0;

    this.panX = (w - 900 * this.currentScale) / 2;
    this.panY = (h - 1100 * this.currentScale) / 2 + 10;
    this.updateTransform();
  }

  resetView() {
    this.fitWholeCampus();
  }

  showTooltip(clientX, clientY, loc) {
    const rect = this.container.getBoundingClientRect();
    this.tooltip.innerHTML = `
      <div style="font-weight: 800; color: #38bdf8;">#${loc.id} ${loc.shortName || loc.name}</div>
      <div style="color: #cbd5e1; font-size: 10px;">${loc.block}</div>
    `;
    this.tooltip.style.left = `${clientX - rect.left + 15}px`;
    this.tooltip.style.top = `${clientY - rect.top - 10}px`;
    this.tooltip.style.display = "block";
  }

  hideTooltip() {
    this.tooltip.style.display = "none";
  }

  selectLocation(id, showQuickCard = true) {
    this.selectedLocationId = id;
    const loc = LOCATIONS.find(l => l.id === id);
    if (!loc) return;

    // Highlight animated ring on map
    this.pinHighlightLayer.innerHTML = `
      <g transform="translate(${loc.coords.x}, ${loc.coords.y})">
        <circle cx="0" cy="0" r="24" fill="none" stroke="#38bdf8" stroke-width="3" opacity="0.9">
          <animate attributeName="r" values="16;28;16" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="0" cy="0" r="18" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4,3" />
      </g>
    `;

    if (showQuickCard) {
      this.showQuickCard(loc);
    }
  }

  showQuickCard(loc) {
    this.quickCardBadge.textContent = loc.id;
    this.quickCardTitle.textContent = loc.name;
    this.quickCardDesc.textContent = `${loc.block} • ${loc.college}`;
    this.quickCard.classList.remove("hidden");
  }

  hideQuickCard() {
    this.quickCard.classList.add("hidden");
  }

  focusLocation(id) {
    const loc = LOCATIONS.find(l => l.id === id);
    if (!loc) return;
    this.selectLocation(id, true);

    const rect = this.svg.getBoundingClientRect();
    const cx = (rect.width || 800) / 2;
    const cy = (rect.height || 700) / 2;
    const targetScale = 1.5;

    this.currentScale = targetScale;
    this.panX = cx - loc.coords.x * targetScale;
    this.panY = cy - loc.coords.y * targetScale;
    this.updateTransform();
  }

  renderRoute(routeData, startLoc, endLoc) {
    this.activeRoute = routeData;
    this.stopWalkSimulation();

    if (!routeData || !routeData.points || routeData.points.length === 0) {
      this.clearRoute();
      return;
    }

    const d = routeData.points.reduce((acc, pt, idx) => {
      return idx === 0 ? `M ${pt.x},${pt.y}` : `${acc} L ${pt.x},${pt.y}`;
    }, "");

    this.routeLine.setAttribute("d", d);
    this.routeGlow.setAttribute("d", d);

    const startPt = routeData.points[0];
    const endPt = routeData.points[routeData.points.length - 1];

    this.routePins.innerHTML = `
      <!-- Start Pin -->
      <g transform="translate(${startPt.x}, ${startPt.y})">
        <circle cx="0" cy="0" r="15" fill="#10b981" stroke="#ffffff" stroke-width="2.5" />
        <text x="0" y="4" font-size="10" font-weight="900" fill="#ffffff" text-anchor="middle">A</text>
        <rect x="-35" y="-30" width="70" height="18" rx="4" fill="#047857" />
        <text x="0" y="-18" font-size="8.5" font-weight="800" fill="#ffffff" text-anchor="middle">START</text>
      </g>
      <!-- End Pin -->
      <g transform="translate(${endPt.x}, ${endPt.y})">
        <circle cx="0" cy="0" r="15" fill="#ef4444" stroke="#ffffff" stroke-width="2.5" />
        <text x="0" y="4" font-size="10" font-weight="900" fill="#ffffff" text-anchor="middle">B</text>
        <rect x="-42" y="-30" width="84" height="18" rx="4" fill="#b91c1c" />
        <text x="0" y="-18" font-size="8.5" font-weight="800" fill="#ffffff" text-anchor="middle">DESTINATION</text>
      </g>
    `;

    this.fitPoints(routeData.points);
  }

  clearRoute() {
    this.activeRoute = null;
    this.stopWalkSimulation();
    this.routeLine.setAttribute("d", "");
    this.routeGlow.setAttribute("d", "");
    this.routePins.innerHTML = "";
    this.walkerMarker.style.display = "none";
  }

  fitPoints(points) {
    if (!points || points.length === 0) return;
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    points.forEach(p => {
      minX = Math.min(minX, p.x);
      maxX = Math.max(maxX, p.x);
      minY = Math.min(minY, p.y);
      maxY = Math.max(maxY, p.y);
    });

    const midX = (minX + maxX) / 2;
    const midY = (minY + maxY) / 2;
    const spanX = Math.max(maxX - minX, 150);
    const spanY = Math.max(maxY - minY, 150);

    const rect = this.svg.getBoundingClientRect();
    const w = rect.width || 800;
    const h = rect.height || 700;

    const scaleX = (w * 0.65) / spanX;
    const scaleY = (h * 0.65) / spanY;
    const targetScale = Math.min(Math.max(Math.min(scaleX, scaleY), 0.7), 2.0);

    this.currentScale = targetScale;
    this.panX = w / 2 - midX * targetScale;
    this.panY = h / 2 - midY * targetScale;
    this.updateTransform();
  }

  startWalkSimulation(onStepUpdate = null) {
    if (!this.activeRoute || !this.activeRoute.points || this.activeRoute.points.length < 2) return;

    this.stopWalkSimulation();
    this.walkerMarker.style.display = "block";

    const pts = this.activeRoute.points;
    let currentSegment = 0;
    let progress = 0;
    const speed = 0.04;

    this.simulationTimer = setInterval(() => {
      if (currentSegment >= pts.length - 1) {
        this.stopWalkSimulation();
        if (onStepUpdate) onStepUpdate(pts.length - 1, true);
        return;
      }

      const p1 = pts[currentSegment];
      const p2 = pts[currentSegment + 1];

      progress += speed;
      if (progress >= 1) {
        progress = 0;
        currentSegment++;
        if (onStepUpdate) onStepUpdate(currentSegment, false);
      }

      const curX = p1.x + (p2.x - p1.x) * progress;
      const curY = p1.y + (p2.y - p1.y) * progress;

      this.walkerMarker.setAttribute("transform", `translate(${curX}, ${curY})`);
    }, 40);
  }

  stopWalkSimulation() {
    if (this.simulationTimer) {
      clearInterval(this.simulationTimer);
      this.simulationTimer = null;
    }
    if (this.walkerMarker) {
      this.walkerMarker.style.display = "none";
    }
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CampusMapEngine };
}
