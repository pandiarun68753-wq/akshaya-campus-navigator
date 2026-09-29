/**
 * Akshaya Institutions Campus Navigation Dataset
 * Accurate catalog of all 31 numbered locations and amenities from the official campus plan.
 * Akshaya College of Engineering & Technology | Akshaya College of Arts & Science
 * Kinathukadavu, Coimbatore - 642109
 */

const CAMPUS_INFO = {
  name: "Akshaya Institutions",
  tagline: "College of Engineering & Technology | College of Arts & Science",
  accreditation: "An Autonomous Institution | NAAC 'A' Grade | Approved by AICTE & Affiliated to Anna University / Bharathiar University",
  address: "Bagavathipalayam Road, Kinathukadavu, Coimbatore, Tamil Nadu - 642109",
  website: "https://acetcbe.edu.in",
  emergencyContact: "+91 4259 242570",
  securityGateContact: "+91 94899 92255"
};

const CATEGORIES = {
  ALL: { id: "all", label: "All Places", icon: "🏛️" },
  ACADEMICS: { id: "academics", label: "Academic Blocks", icon: "🎓" },
  ADMIN: { id: "admin", label: "Administration", icon: "🏢" },
  HOSTELS: { id: "hostels", label: "Hostels & Living", icon: "🛏️" },
  SPORTS: { id: "sports", label: "Sports & Grounds", icon: "⚽" },
  DINING: { id: "dining", label: "Dining & Food", icon: "🍽️" },
  AMENITIES: { id: "amenities", label: "Amenities & Utilities", icon: "⚡" },
  PARKING: { id: "parking", label: "Parking & Gates", icon: "🅿️" }
};

const LOCATIONS = [
  // --- Administration (1-3) ---
  {
    id: 1,
    name: "Managing Trustee, Chairman & Secretary Office",
    shortName: "Trustee & Chairman Office",
    category: "admin",
    college: "Akshaya Institutions",
    block: "Main Administrative Wing (Ground Floor)",
    coords: { x: 425, y: 585 },
    entranceNode: "N_ADMIN_ENTRY",
    icon: "briefcase",
    description: "The executive governing office of Akshaya Institutions, overseeing institutional leadership, strategic planning, trust management, and institutional governance.",
    departments: ["Board of Trustees", "Secretariat", "Executive Administration"],
    floorGuide: [
      { floor: "Ground Floor", details: "Managing Trustee Chamber, Chairman & Secretary Boardroom, Executive Visitor Lounge" }
    ],
    facilities: ["Air Conditioned", "High-Speed Wi-Fi", "Conference Facility", "Visitor Waiting Hall"],
    accessibility: ["Wheelchair Accessible via East Ramp", "Elevator Access nearby"],
    hours: "09:00 AM - 05:30 PM (Mon - Sat)",
    contact: "chairman@acetcbe.edu.in | +91 4259 242571"
  },
  {
    id: 2,
    name: "Chief Executive Officer (CEO) Office",
    shortName: "CEO Office",
    category: "admin",
    college: "Akshaya Institutions",
    block: "Main Administrative Wing (1st Floor)",
    coords: { x: 425, y: 615 },
    entranceNode: "N_ADMIN_ENTRY",
    icon: "award",
    description: "Office of the Chief Executive Officer directing academic operations, industry tie-ups, institutional growth initiatives, and overall campus development.",
    departments: ["Institutional Development", "Corporate Relations", "Strategic Operations"],
    floorGuide: [
      { floor: "First Floor", details: "CEO Chamber, Corporate Relations Office, Meeting Suite" }
    ],
    facilities: ["Air Conditioned", "Meeting Room", "Video Conferencing"],
    accessibility: ["Accessible via Main Block Elevator"],
    hours: "09:00 AM - 05:30 PM (Mon - Sat)",
    contact: "ceo@acetcbe.edu.in | +91 4259 242572"
  },
  {
    id: 3,
    name: "Principal (Engineering & Technology)",
    shortName: "Principal ACET",
    category: "admin",
    college: "Akshaya College of Engineering & Technology",
    block: "Main Block (Ground Floor)",
    coords: { x: 425, y: 645 },
    entranceNode: "N_ADMIN_ENTRY",
    icon: "user-check",
    description: "Office of the Principal of Akshaya College of Engineering and Technology (Autonomous). Heads all academic, engineering faculty, examination cell, and research bodies.",
    departments: ["Academic Head", "Autonomous Examination Cell", "Faculty Coordination", "Research Council"],
    floorGuide: [
      { floor: "Ground Floor", details: "Principal's Cabin, Dean Academic Office, Confidential Section, Meeting Room" }
    ],
    facilities: ["Air Conditioned", "Student Grievance Counter", "Visitor Lounge"],
    accessibility: ["Wheelchair Ramp at East Portico", "Elevator Access"],
    hours: "08:45 AM - 05:00 PM (Mon - Sat)",
    contact: "principal@acetcbe.edu.in | +91 4259 242570"
  },

  // --- Engineering Academic Blocks (4-10) ---
  {
    id: 4,
    name: "Main Block",
    shortName: "Main Block (Engineering)",
    category: "academics",
    college: "Akshaya College of Engineering & Technology",
    block: "Central Quadrangle - East Wing",
    coords: { x: 395, y: 610 },
    entranceNode: "N_ADMIN_ENTRY",
    icon: "building",
    description: "The primary landmark building of ACET with grand east portico facing the central lawn roundabout. Houses institution leadership, admissions, accounts office, server room, and central conference halls.",
    departments: ["Admissions & Accounts", "Examination Cell", "HR & Establishment", "Board Room"],
    floorGuide: [
      { floor: "Ground Floor", details: "Reception, Admissions Helpdesk, Cash & Accounts, Principal ACET Cabin" },
      { floor: "First Floor", details: "CEO Office, Controller of Examinations (COE), Board Room" },
      { floor: "Second Floor", details: "Central Server Room, IQAC Cell, Academic Deanery" }
    ],
    facilities: ["Elevator", "RO Purified Water", "Central Reception", "Restrooms on all floors", "Wi-Fi Campus"],
    accessibility: ["Step-free ramp entry at main portico", "Modern passenger elevator"],
    hours: "08:30 AM - 06:00 PM",
    contact: "info@acetcbe.edu.in | +91 4259 242570"
  },
  {
    id: 5,
    name: "A Block (ECE, Library)",
    shortName: "A Block - ECE & Central Library",
    category: "academics",
    college: "Akshaya College of Engineering & Technology",
    block: "Central Quadrangle - South Wing",
    coords: { x: 300, y: 735 },
    entranceNode: "N_QUAD_S",
    icon: "book-open",
    description: "South wing of the quadrangle housing the Department of Electronics & Communication Engineering (ECE) and the expansive Central Air-Conditioned Library & Digital Information Resource Centre.",
    departments: [
      "Electronics & Communication Engineering (ECE)",
      "Central Library & Digital Knowledge Centre",
      "VLSI & Embedded Systems Laboratory",
      "Digital Signal Processing Lab",
      "Communication & Microwave Lab"
    ],
    floorGuide: [
      { floor: "Ground Floor", details: "Central Circulation Library, Reading Hall, Periodicals Section, Digital E-Library" },
      { floor: "First Floor", details: "ECE Department Office, HOD Cabin, Faculty Rooms, Microwave & Optical Lab" },
      { floor: "Second Floor", details: "VLSI Design Lab, Embedded Systems Lab, Smart Classrooms" }
    ],
    facilities: ["40,000+ Books & Journals", "IEEE Digital Explore Access", "Air Conditioned Reading Halls", "Elevator"],
    accessibility: ["Ramp at South Entry", "Elevator to all upper floors"],
    hours: "Library: 08:00 AM - 07:00 PM | ECE Dept: 08:45 AM - 05:00 PM",
    contact: "library@acetcbe.edu.in | hodece@acetcbe.edu.in"
  },
  {
    id: 6,
    name: "B Block (CSE Clusters)",
    shortName: "B Block - CSE Clusters",
    category: "academics",
    college: "Akshaya College of Engineering & Technology",
    block: "Central Quadrangle - Inner East Wing",
    coords: { x: 345, y: 650 },
    entranceNode: "N_COURTYARD",
    icon: "cpu",
    description: "Dedicated Computer Science & Engineering computing wing. Houses high-performance GPU server clusters, AI/ML laboratories, cloud computing lab, and multimedia workstations.",
    departments: [
      "Computer Science & Engineering (CSE)",
      "Artificial Intelligence & Machine Learning (AI & ML)",
      "Advanced Computing Lab",
      "Cloud & Virtualization Lab"
    ],
    floorGuide: [
      { floor: "Ground Floor", details: "Computing Cluster Lab 1 & 2, Data Structures Lab, Python Programming Lab" },
      { floor: "First Floor", details: "AI & ML GPU Computing Lab, Cyber Security Lab, HOD CSE Cabin" },
      { floor: "Second Floor", details: "Software Development Incubator, Project Workstations" }
    ],
    facilities: ["Gigabit Ethernet", "UPS Backup", "Centralized Air Conditioning", "Interactive Smart Boards"],
    accessibility: ["Connected to Main Block elevator via 1st & 2nd floor cross corridors"],
    hours: "08:30 AM - 06:30 PM",
    contact: "hodcse@acetcbe.edu.in"
  },
  {
    id: 7,
    name: "C Block (CSE Clusters)",
    shortName: "C Block - CSE Labs",
    category: "academics",
    college: "Akshaya College of Engineering & Technology",
    block: "Central Quadrangle - North Inner Wing",
    coords: { x: 285, y: 555 },
    entranceNode: "N_COURTYARD",
    icon: "terminal",
    description: "Specialized computing and software engineering laboratories supporting full-stack development, database engineering, mobile app development, and open-source computing.",
    departments: [
      "Computer Science & Business Systems (CSBS)",
      "Information Technology / Software Engineering",
      "Database & Web Engineering Labs",
      "Mobile App Development Lab"
    ],
    floorGuide: [
      { floor: "Ground Floor", details: "Web Technologies Lab, Linux Open Source Lab" },
      { floor: "First Floor", details: "Database Management Lab, Mobile Application Testing Lab" },
      { floor: "Second Floor", details: "Seminar Hall C, Faculty Cabins" }
    ],
    facilities: ["High-speed LAN", "Dual Monitor Setup in Labs", "Air Conditioned"],
    accessibility: ["Corridor connection from North corridor and Courtyard walkway"],
    hours: "08:30 AM - 05:30 PM",
    contact: "cseclusters@acetcbe.edu.in"
  },
  {
    id: 8,
    name: "D Block (Science & Humanities)",
    shortName: "D Block - Science & Humanities",
    category: "academics",
    college: "Akshaya College of Engineering & Technology",
    block: "Central Quadrangle - North Wing",
    coords: { x: 285, y: 515 },
    entranceNode: "N_QUAD_NW",
    icon: "atom",
    description: "Academic block for first-year engineering students and foundational Science & Humanities studies. Houses physics labs, chemistry labs, English communication labs, and lecture halls.",
    departments: [
      "Department of Mathematics",
      "Department of Physics",
      "Department of Chemistry",
      "Department of English & Foreign Languages",
      "Engineering Physics & Chemistry Labs"
    ],
    floorGuide: [
      { floor: "Ground Floor", details: "Engineering Physics Lab, Engineering Chemistry Lab, Lab Store" },
      { floor: "First Floor", details: "Language Communication Skills Lab, HOD S&H Cabin, Faculty Rooms" },
      { floor: "Second Floor", details: "Lecture Theatres for First Year Engineering Sections" }
    ],
    facilities: ["Fume Hoods & Safety Showers", "Language Audio Booths", "Digital Projectors"],
    accessibility: ["Wide corridors, Ground floor lab access, Stairwells with safety railings"],
    hours: "08:45 AM - 05:00 PM",
    contact: "hodsh@acetcbe.edu.in"
  },
  {
    id: 9,
    name: "Store Room",
    shortName: "Central Store",
    category: "amenities",
    college: "Akshaya Institutions",
    block: "Central Quadrangle - Northeast Corner",
    coords: { x: 375, y: 515 },
    entranceNode: "N_QUAD_NE",
    icon: "archive",
    description: "Central institutional inventory, stationery store, laboratory consumables, exam stationary reserves, and maintenance equipment storage.",
    departments: ["Central Purchase & Stores", "Stationery Distribution"],
    floorGuide: [
      { floor: "Ground Floor", details: "Material Receipt Counter, Stationery Issuance, Lab Consumable Storage" }
    ],
    facilities: ["Loading bay access from North ring road", "Fire suppression equipped"],
    accessibility: ["Ground level access"],
    hours: "09:00 AM - 05:00 PM",
    contact: "stores@acetcbe.edu.in"
  },
  {
    id: 10,
    name: "Office Room",
    shortName: "Administrative Office",
    category: "admin",
    college: "Akshaya Institutions",
    block: "Central Quadrangle - Northeast Corner",
    coords: { x: 380, y: 535 },
    entranceNode: "N_QUAD_NE",
    icon: "file-text",
    description: "Administrative support operations handling student records, scholarship desks, bus route passes, Anna University affiliations, and student certificates.",
    departments: ["Student Affairs Section", "Scholarship & Welfare Section", "Transport Management Desk"],
    floorGuide: [
      { floor: "Ground Floor", details: "Student Service Counters, Bus Pass Desk, Bonafide & Certificate Dispatch" }
    ],
    facilities: ["Queue Management System", "Student Help Counter"],
    accessibility: ["Direct ground floor entrance from Quad Northeast walkway"],
    hours: "08:45 AM - 05:15 PM",
    contact: "office@acetcbe.edu.in | +91 4259 242570"
  },

  // --- Southern Engineering & Technical Blocks (11-16) ---
  {
    id: 11,
    name: "E Block (CIVIL, MECH, EEE, MECHT)",
    shortName: "E Block - Heavy Engineering",
    category: "academics",
    college: "Akshaya College of Engineering & Technology",
    block: "South Campus - East of Playground",
    coords: { x: 460, y: 865 },
    entranceNode: "N_E_BLOCK_ENTRY",
    icon: "tool",
    description: "Major multi-storey engineering block housing core engineering departments: Mechanical Engineering, Civil Engineering, Electrical & Electronics Engineering (EEE), and Mechatronics Engineering (MECHT).",
    departments: [
      "Mechanical Engineering",
      "Civil Engineering",
      "Electrical & Electronics Engineering (EEE)",
      "Mechatronics Engineering (MECHT)",
      "Strength of Materials Lab",
      "Electrical Machines & Power Electronics Lab",
      "Robotics & Automation Lab",
      "Surveying & CAD/CAM Labs"
    ],
    floorGuide: [
      { floor: "Ground Floor", details: "Civil Engg Labs: Concrete Testing, Soil Mechanics; EEE Power Systems Lab" },
      { floor: "First Floor", details: "Mechanical Engg HOD Cabin, CAD/CAM Laboratory, Mechatronics Robotics Suite" },
      { floor: "Second Floor", details: "EEE HOD Cabin, Electrical Machines Lab, Smart Power Electronics Lab" },
      { floor: "Third Floor", details: "Civil HOD Cabin, Environmental Engg Lab, Drawing Halls" }
    ],
    facilities: ["Heavy machinery test beds", "Industrial 3-Phase power", "Robotics workstations", "CAD Workstations"],
    accessibility: ["Ground floor access with vehicle drop-off", "Spacious stairwells"],
    hours: "08:30 AM - 05:30 PM",
    contact: "hodeee@acetcbe.edu.in | hodmech@acetcbe.edu.in | hodcivil@acetcbe.edu.in"
  },
  {
    id: 12,
    name: "Training Centre",
    shortName: "Training & Placement Centre",
    category: "academics",
    college: "Akshaya Institutions",
    block: "South Campus - South of Playground",
    coords: { x: 355, y: 925 },
    entranceNode: "N_SOUTH_RD",
    icon: "briefcase",
    description: "Central training facility for student career progression, mock interviews, corporate aptitude training, soft skills enhancement, and placement interview drives.",
    departments: ["Centre for Corporate Relations & Placement", "Career Development Cell (CDC)", "Aptitude & Soft Skills Cell"],
    floorGuide: [
      { floor: "Ground Floor", details: "Placement Officer Cabin, Corporate Interview Cubicles, Online Assessment Computer Lab" }
    ],
    facilities: ["100+ Online Assessment Terminals", "Mock Interview Rooms", "Group Discussion Suites"],
    accessibility: ["Ground floor step-free entrance"],
    hours: "08:30 AM - 06:00 PM",
    contact: "placement@acetcbe.edu.in | +91 94899 92260"
  },
  {
    id: 13,
    name: "Workshop",
    shortName: "Central Engineering Workshop",
    category: "academics",
    college: "Akshaya College of Engineering & Technology",
    block: "South Campus - South of Training Centre",
    coords: { x: 355, y: 960 },
    entranceNode: "N_SOUTH_RD",
    icon: "settings",
    description: "State-of-the-art manufacturing workshop equipped with CNC machines, lathes, milling machines, welding booths, carpentry, fitting, and foundry shops.",
    departments: [
      "Machine Shop (Lathes, Shapers, Milling)",
      "Foundry & Welding Shop",
      "Fitting & Sheet Metal Shop",
      "Carpentry & Smithy Shop",
      "Special Machines Lab"
    ],
    floorGuide: [
      { floor: "Ground Floor", details: "Open industrial bays with CNC machining centre, lathe bays, welding bays, tool crib" }
    ],
    facilities: ["Industrial crane", "CNC Turning Centre", "Arc & TIG/MIG Welding", "Comprehensive safety gear"],
    accessibility: ["Ground level vehicle access and wide sliding doors"],
    hours: "08:30 AM - 05:00 PM",
    contact: "workshop@acetcbe.edu.in"
  },
  {
    id: 14,
    name: "Centres of Excellence",
    shortName: "Centres of Excellence (CoE)",
    category: "academics",
    college: "Akshaya Institutions",
    block: "South Campus - Southeast of E Block",
    coords: { x: 495, y: 955 },
    entranceNode: "N_COE_ENTRY",
    icon: "zap",
    description: "Industry-collaborated advanced technology centres fostering real-world product engineering, IoT research, renewable energy testbeds, and drone technology.",
    departments: [
      "IoT & Embedded Innovations CoE",
      "Electric Vehicle (EV) & Battery Tech CoE",
      "Industrial Automation & PLC CoE",
      "Renewable Energy & Solar Testing Cell"
    ],
    floorGuide: [
      { floor: "Ground Floor", details: "Industry Testing Rigs, Prototype Assembly Line, Research Scholar Workspaces" }
    ],
    facilities: ["3D Printers", "Oscilloscopes & Spectrum Analyzers", "Solar Simulation Test Kits"],
    accessibility: ["Ground floor direct entry"],
    hours: "09:00 AM - 06:00 PM",
    contact: "coe@acetcbe.edu.in"
  },
  {
    id: 15,
    name: "Akshaya Thalir Pre-incubation",
    shortName: "Akshaya Thalir Incubator",
    category: "academics",
    college: "Akshaya Institutions",
    block: "Northwest Area - South of Power House",
    coords: { x: 215, y: 470 },
    entranceNode: "N_QUAD_NW",
    icon: "trending-up",
    description: "Akshaya Thalir Innovation & Pre-Incubation Centre (MSME & Startup India approved). Mentors student entrepreneurs, funds seed prototypes, and handles patent filings.",
    departments: [
      "Startup Pre-Incubation Cell",
      "Intellectual Property Rights (IPR) Cell",
      "MSME Business Incubator",
      "Entrepreneurship Development Cell (EDC)"
    ],
    floorGuide: [
      { floor: "Ground Floor", details: "Co-working Space, Ideation Zone, Pitch Presentation Room, Patent Advisory Desk" }
    ],
    facilities: ["High-speed Wi-Fi", "Co-working Hot Desks", "Conference Table", "Prototype Fabrication Lab"],
    accessibility: ["Ground floor entry with paved pathway"],
    hours: "09:00 AM - 06:00 PM",
    contact: "thalir@acetcbe.edu.in"
  },
  {
    id: 16,
    name: "Recreation Center",
    shortName: "Student Recreation Center",
    category: "amenities",
    college: "Akshaya Institutions",
    block: "Central Quadrangle - Northwest Corner",
    coords: { x: 195, y: 520 },
    entranceNode: "N_QUAD_NW",
    icon: "smile",
    description: "Student leisure and recreational hub equipped with indoor table tennis, carrom, chess boards, music room, and student club meeting spaces.",
    departments: ["Fine Arts Club", "Music & Cultural Club", "Indoor Games Club"],
    floorGuide: [
      { floor: "Ground Floor", details: "Indoor Games Hall, Cultural Club Rehearsal Room, Student Activity Lounge" }
    ],
    facilities: ["Table Tennis Tables", "Carrom Boards", "Acoustic Music Space"],
    accessibility: ["Ground floor entry"],
    hours: "04:30 PM - 07:30 PM",
    contact: "studentaffairs@acetcbe.edu.in"
  },

  // --- Arts & Science College (17-18) ---
  {
    id: 17,
    name: "Akshaya College of Arts & Science",
    shortName: "Arts & Science Block",
    category: "academics",
    college: "Akshaya College of Arts & Science",
    block: "Central Quadrangle - West Wing",
    coords: { x: 185, y: 635 },
    entranceNode: "N_QUAD_W",
    icon: "book",
    description: "Spacious west wing of the quadrangle dedicated to Akshaya College of Arts & Science. Delivers undergraduate and postgraduate degrees in Commerce, Management, Computer Applications, and Science.",
    departments: [
      "B.Com (Professional Accounting, Computer Applications, General)",
      "B.B.A (Business Administration)",
      "B.C.A (Computer Applications)",
      "B.Sc (Computer Science, Information Technology, Data Science)",
      "B.A (English Literature)",
      "Arts & Science Computer Laboratories"
    ],
    floorGuide: [
      { floor: "Ground Floor", details: "Principal's Office, Arts & Science Office, Commerce Dept Classrooms" },
      { floor: "First Floor", details: "BCA & CS Computer Labs, Management Studies Classrooms, Faculty Rooms" },
      { floor: "Second Floor", details: "Science Labs, Seminar Hall, Literature & Language Classrooms" }
    ],
    facilities: ["Digital Classrooms", "Dedicated Computer Lab", "Seminar Hall", "Elevator Access"],
    accessibility: ["West corridor ramp access", "Elevator equipped"],
    hours: "08:45 AM - 04:30 PM",
    contact: "acas@acetcbe.edu.in | +91 4259 242580"
  },
  {
    id: 18,
    name: "Principal (Arts & Science)",
    shortName: "Principal ACAS",
    category: "admin",
    college: "Akshaya College of Arts & Science",
    block: "Central Quadrangle - Southwest Wing (Ground Floor)",
    coords: { x: 220, y: 745 },
    entranceNode: "N_QUAD_S",
    icon: "user",
    description: "Office of the Principal of Akshaya College of Arts & Science. Directs faculty governance, university examinations, student admissions, and extracurricular programs.",
    departments: ["Arts & Science Directorate", "Bharathiar University Exam Cell", "Staff Room"],
    floorGuide: [
      { floor: "Ground Floor", details: "Principal Cabin, ACAS Administrative Office, Parent Interaction Room" }
    ],
    facilities: ["Air Conditioned", "Student Counseling Desk"],
    accessibility: ["Ramp entry from South Quad avenue"],
    hours: "08:45 AM - 04:45 PM",
    contact: "acasprincipal@acetcbe.edu.in | +91 4259 242581"
  },

  // --- Common Areas & Utilities (19-25) ---
  {
    id: 19,
    name: "Power House",
    shortName: "Power House & Diesel Generators",
    category: "amenities",
    college: "Akshaya Institutions",
    block: "Northwest Campus - North of Pre-incubation",
    coords: { x: 215, y: 415 },
    entranceNode: "N_NORTH_BEND",
    icon: "zap",
    description: "Institutional captive power generation station housing heavy duty Cummins/Kirloskar sound-proof diesel generator sets providing 24x7 uninterrupted power to the campus.",
    departments: ["Electrical Maintenance Division", "Campus Energy Management"],
    floorGuide: [
      { floor: "Ground Floor", details: "High-Capacity Diesel Generators, Central LT Distribution Panels, Fuel Storage" }
    ],
    facilities: ["Sound-attenuated enclosure", "Automated Mains Failure (AMF) panels", "Fire safety systems"],
    accessibility: ["Service road access (Authorized Personnel Only)"],
    hours: "24 Hours / 7 Days Active",
    contact: "maintenance@acetcbe.edu.in"
  },
  {
    id: 20,
    name: "Transformer",
    shortName: "Electrical Substation & Transformer",
    category: "amenities",
    college: "Akshaya Institutions",
    block: "North Junction - Entry Boulevard Bend",
    coords: { x: 385, y: 390 },
    entranceNode: "N_NORTH_BEND",
    icon: "activity",
    description: "High-tension 11kV electrical step-down substation and oil-cooled transformer unit managed in coordination with TANGEDCO.",
    departments: ["High Voltage Substation", "Campus Earthing Grid"],
    floorGuide: [
      { floor: "Outdoor Yard", details: "Step-Down Transformer, HT Circuit Breaker, Lightning Arrester" }
    ],
    facilities: ["Fenced high-voltage security enclosure", "Danger Zone signage"],
    accessibility: ["Restricted electrical yard"],
    hours: "Restricted Access",
    contact: "maintenance@acetcbe.edu.in"
  },
  {
    id: 21,
    name: "GYM",
    shortName: "Campus Gymnasium & Fitness Centre",
    category: "sports",
    college: "Akshaya Institutions",
    block: "Central Quadrangle - Northwest Inner Courtyard",
    coords: { x: 225, y: 560 },
    entranceNode: "N_COURTYARD",
    icon: "heart",
    description: "Modern health and fitness gymnasium with certified fitness trainers, multi-station gyms, free weights, treadmills, ellipticals, and shower facilities for students and residential hostellers.",
    departments: ["Physical Education Department", "Fitness & Health Club"],
    floorGuide: [
      { floor: "Ground Floor", details: "Strength Training Section, Cardio Zone, Free Weights Area, Locker Rooms" }
    ],
    facilities: ["Multi-Gym Stations", "Treadmills & Spin Bikes", "Rubberized Anti-Slip Flooring", "Locker Room"],
    accessibility: ["Direct ground-floor entrance from Courtyard"],
    hours: "Morning: 06:00 AM - 08:00 AM | Evening: 04:30 PM - 07:30 PM",
    contact: "sports@acetcbe.edu.in"
  },
  {
    id: 22,
    name: "Boys Hostel",
    shortName: "Boys Hostel Complex",
    category: "hostels",
    college: "Akshaya Institutions",
    block: "Southwest Campus - Behind Workshop",
    coords: { x: 220, y: 890 },
    entranceNode: "N_BOYS_HOSTEL_ENTRY",
    icon: "home",
    description: "Expansive multi-wing residential complex for male students featuring well-ventilated shared rooms, study halls, dedicated dining hall, recreation lounge, and round-the-clock warden supervision.",
    departments: ["Hostel Administration", "Chief Warden Office", "Hostel Mess Section"],
    floorGuide: [
      { floor: "Ground Floor", details: "Warden Office, Guest Rooms, Dining Hall, First Aid Room" },
      { floor: "First & Second Floors", details: "Student Living Rooms, Study Rooms, RO Water Points, Washrooms" }
    ],
    facilities: ["24/7 Security & CCTV", "High-speed Wi-Fi", "RO Drinking Water", "Solar Water Heaters", "Indoor Sports"],
    accessibility: ["Ground floor access, Paved approach road"],
    hours: "Open 24/7 for Resident Students (Gate Close: 08:00 PM)",
    contact: "wardenboys@acetcbe.edu.in | +91 94899 92265"
  },
  {
    id: 23,
    name: "Girls Hostel",
    shortName: "Girls Hostel Complex",
    category: "hostels",
    college: "Akshaya Institutions",
    block: "East Campus - East of Food Court",
    coords: { x: 670, y: 790 },
    entranceNode: "N_GIRLS_HOSTEL_ENTRY",
    icon: "shield",
    description: "Highly secure, serene, and comfortable residential complex for female students with biometric security entry, round-the-clock female wardens, attached dining hall, solar water heating, and medical care.",
    departments: ["Girls Hostel Administration", "Residential Lady Warden Office"],
    floorGuide: [
      { floor: "Ground Floor", details: "Biometric Security Desk, Lady Warden Cabin, Visitor Waiting Lounge, Mess Hall" },
      { floor: "Upper Floors", details: "Student Accommodations, Reading Halls, Wi-Fi Zones, Solar Hot Water Showers" }
    ],
    facilities: ["Biometric Access", "24/7 Lady Security Guard", "RO Water Stations", "Reading Lounge", "Health Dispensary"],
    accessibility: ["Gated ramp entrance, Ground floor accommodations available"],
    hours: "Open 24/7 for Residents (Curfew: 06:30 PM)",
    contact: "wardengirls@acetcbe.edu.in | +91 94899 92268"
  },
  {
    id: 24,
    name: "Food Court & Amenities, Dining Hall & Kitchen",
    shortName: "Food Court & Central Mess",
    category: "dining",
    college: "Akshaya Institutions",
    block: "East Campus - North of Auditorium",
    coords: { x: 575, y: 795 },
    entranceNode: "N_FOOD_COURT_ENTRY",
    icon: "coffee",
    description: "Spacious multi-cuisine food court, student cafeteria, and central hygienic mechanized kitchen serving nutritious South & North Indian vegetarian and non-vegetarian meals, fresh juices, and bakery snacks.",
    departments: ["Central Mess Management", "Cafeteria & Juice Bar", "Stationery & Xeroxing Store"],
    floorGuide: [
      { floor: "Ground Floor", details: "Student & Staff Dining Hall (Seating 800+), Snack & Juice Counter, Live Cooking Counters" },
      { floor: "First Floor", details: "Executive Dining Hall for Guests, Stationery & Photocopying Centre" }
    ],
    facilities: ["Mechanized Steam Cooking", "RO Water Dispensers", "Handwash Areas", "UPI & Cashless Payments"],
    accessibility: ["Wide step-free entrance from East Avenue"],
    hours: "07:30 AM - 08:30 PM Daily",
    contact: "foodcourt@acetcbe.edu.in"
  },
  {
    id: 25,
    name: "Auditorium",
    shortName: "Centenary Auditorium & Convention Centre",
    category: "academics",
    college: "Akshaya Institutions",
    block: "Southeast Campus - South of Food Court",
    coords: { x: 645, y: 915 },
    entranceNode: "N_AUDITORIUM_ENTRY",
    icon: "tv",
    description: "Grand air-conditioned indoor auditorium with 1,500+ seating capacity, line-array acoustics, motorized stage curtains, green rooms, and digital LED projection systems for convocations, symposiums, and cultural fests.",
    departments: ["Events & Convention Management", "Audio-Visual Media Cell"],
    floorGuide: [
      { floor: "Ground Floor", details: "Main Seating Arena, Stage, VIP Green Rooms, Backstage Control Room, Foyer" },
      { floor: "Balcony", details: "Upper Balcony Seating, Sound & Lighting Control Booth" }
    ],
    facilities: ["Surround Sound Acoustics", "Central Air Conditioning", "VIP Holding Suites", "Emergency Fire Exits"],
    accessibility: ["Double door wheelchair ramps at both sides of grand entrance"],
    hours: "Event-based scheduling (08:00 AM - 09:00 PM)",
    contact: "auditorium@acetcbe.edu.in"
  },

  // --- Sports & Grounds (26-31) ---
  {
    id: 26,
    name: "Ball Badminton Court",
    shortName: "Ball Badminton Court",
    category: "sports",
    college: "Akshaya Institutions",
    block: "North Campus - Next to Power House",
    coords: { x: 335, y: 435 },
    entranceNode: "N_NORTH_BEND",
    icon: "disc",
    description: "Standard clay outdoor ball badminton court with night floodlighting, tournament net fixtures, and spectator benches.",
    departments: ["Physical Education & Sports Board"],
    floorGuide: [
      { floor: "Outdoor Court", details: "Standard 24m x 12m regulation court with boundary markings and referee stand" }
    ],
    facilities: ["Floodlights for evening matches", "Seating gallery"],
    accessibility: ["Adjacent to North ring road"],
    hours: "06:00 AM - 08:00 AM | 04:30 PM - 07:00 PM",
    contact: "sports@acetcbe.edu.in"
  },
  {
    id: 27,
    name: "Volleyball Court",
    shortName: "Volleyball Court",
    category: "sports",
    college: "Akshaya Institutions",
    block: "West Perimeter - North of Kabaddi Court",
    coords: { x: 105, y: 520 },
    entranceNode: "N_WEST_RD",
    icon: "target",
    description: "Regulation outdoor volleyball court featuring anti-skid sand/clay surface, adjustable tournament posts, and high-intensity LED illumination.",
    departments: ["Physical Education - Ball Games"],
    floorGuide: [
      { floor: "Outdoor Court", details: "18m x 9m regulation volleyball court with attack line markings" }
    ],
    facilities: ["LED floodlights", "Netting backdrops"],
    accessibility: ["Directly accessible from West avenue"],
    hours: "06:00 AM - 08:00 AM | 04:30 PM - 07:00 PM",
    contact: "sports@acetcbe.edu.in"
  },
  {
    id: 28,
    name: "Kabaddi Court",
    shortName: "Kabaddi Court",
    category: "sports",
    college: "Akshaya Institutions",
    block: "West Perimeter - Between Volleyball & Cricket",
    coords: { x: 110, y: 590 },
    entranceNode: "N_WEST_RD",
    icon: "users",
    description: "Standard regulation clay kabaddi court with professional baulk and bonus lines, hosting inter-collegiate tournaments and daily training sessions.",
    departments: ["Physical Education - Indigenous Sports"],
    floorGuide: [
      { floor: "Outdoor Court", details: "13m x 10m regulation court with lobby, baulk line, and bonus line markings" }
    ],
    facilities: ["Soft clay cushioned bed", "Floodlit training area"],
    accessibility: ["Paved track access from West avenue"],
    hours: "06:00 AM - 08:00 AM | 04:30 PM - 07:00 PM",
    contact: "sports@acetcbe.edu.in"
  },
  {
    id: 29,
    name: "Cricket Nets",
    shortName: "Cricket Practice Nets",
    category: "sports",
    college: "Akshaya Institutions",
    block: "West Perimeter - South of Kabaddi Court",
    coords: { x: 115, y: 670 },
    entranceNode: "N_WEST_RD",
    icon: "crosshair",
    description: "Dedicated twin turf and concrete cricket practice pitches enclosed with heavy-duty safety netting for bowling and batting drills.",
    departments: ["Physical Education - Cricket Division"],
    floorGuide: [
      { floor: "Practice Facility", details: "Twin 22-yard batting pitches with protective side and roof mesh netting" }
    ],
    facilities: ["Bowling machine facility", "Twin practice tracks", "Night floodlighting"],
    accessibility: ["West road connection"],
    hours: "06:00 AM - 08:30 AM | 04:00 PM - 07:00 PM",
    contact: "sports@acetcbe.edu.in"
  },
  {
    id: 30,
    name: "Basketball Court",
    shortName: "Central Basketball Court",
    category: "sports",
    college: "Akshaya Institutions",
    block: "Central Quadrangle Courtyard",
    coords: { x: 260, y: 635 },
    entranceNode: "N_COURTYARD",
    icon: "dribbble",
    description: "Vibrant all-weather acrylic-surfaced floodlit basketball court situated at the heart of the central academic quadrangle with acrylic backboards and breakaway hoops.",
    departments: ["Physical Education - Basketball Academy"],
    floorGuide: [
      { floor: "Open Courtyard", details: "28m x 15m full regulation court with three-point lines and spectator viewing corridors" }
    ],
    facilities: ["Acrylic synthetic surface", "Night floodlights", "Viewing galleries from 1st & 2nd floor quadrangle"],
    accessibility: ["Courtyard ground walkways"],
    hours: "06:00 AM - 08:00 AM | 04:30 PM - 07:30 PM",
    contact: "sports@acetcbe.edu.in"
  },
  {
    id: 31,
    name: "Playground",
    shortName: "Main Athletic Ground & Stadium",
    category: "sports",
    college: "Akshaya Institutions",
    block: "South Campus - Between Quadrangle and Workshop",
    coords: { x: 335, y: 840 },
    entranceNode: "N_PLAYGROUND_ENTRY",
    icon: "flag",
    description: "Expansive multi-purpose outdoor sports stadium featuring a standard 400-meter athletic running track, full-sized football/soccer pitch, cricket match outfield, and spectator pavilions.",
    departments: ["Physical Education & Athletics"],
    floorGuide: [
      { floor: "Ground Field", details: "400m 6-lane athletic track, natural grass football pitch, shot-put & long-jump pits" }
    ],
    facilities: ["Spectator pavilion", "Sports equipment room", "High-mast floodlights"],
    accessibility: ["Paved roads flanking the playground on East, West, and South"],
    hours: "05:30 AM - 08:30 AM | 04:00 PM - 07:30 PM",
    contact: "sports@acetcbe.edu.in"
  },

  // --- Crucial Campus Landmarks & Icons ---
  {
    id: 101,
    name: "Main Entrance & Security Gate",
    shortName: "Main Entrance Gate",
    category: "parking",
    college: "Akshaya Institutions",
    block: "North Campus Entrance",
    coords: { x: 450, y: 120 },
    entranceNode: "N_GATE",
    icon: "shield",
    description: "Official gateway to Akshaya Institutions with 24/7 security outpost, visitor pass issuance, automated boom barrier, and vehicle inspection.",
    departments: ["Campus Security Operations", "Visitor Management Desk"],
    floorGuide: [{ floor: "Ground Level", details: "Security Cabin, Visitor Verification Desk, RFID Vehicle Scanning" }],
    facilities: ["24/7 Security", "CCTV Surveillance", "Visitor Parking Pass Desk"],
    accessibility: ["Level ground access"],
    hours: "24 Hours / 7 Days",
    contact: "security@acetcbe.edu.in | +91 94899 92255"
  },
  {
    id: 102,
    name: "Two Wheeler Parking",
    shortName: "Two Wheeler Parking",
    category: "parking",
    college: "Akshaya Institutions",
    block: "North Entrance Avenue (East Side)",
    coords: { x: 485, y: 220 },
    entranceNode: "N_PARKING_2W",
    icon: "navigation",
    description: "Dedicated shaded parking bays for student, faculty, and visitor two-wheelers with marked slots and security monitoring.",
    departments: ["Campus Transport & Parking Management"],
    floorGuide: [{ floor: "Outdoor Bays", details: "Numbered bike parking rows with dedicated student and staff bays" }],
    facilities: ["Shaded bays", "CCTV coverage", "Helmet lock stations"],
    accessibility: ["Directly on entry boulevard"],
    hours: "07:00 AM - 08:00 PM",
    contact: "security@acetcbe.edu.in"
  },
  {
    id: 103,
    name: "Four Wheeler Parking",
    shortName: "Four Wheeler Parking",
    category: "parking",
    college: "Akshaya Institutions",
    block: "North Entrance Avenue (East Side)",
    coords: { x: 505, y: 310 },
    entranceNode: "N_PARKING_4W",
    icon: "truck",
    description: "Designated car parking bays for faculty, management, trustees, official institutional guests, and visitors.",
    departments: ["Campus Transport & Parking Management"],
    floorGuide: [{ floor: "Outdoor Bays", details: "Spacious parking lanes with reverse parking indicators and tree shade" }],
    facilities: ["EV Charging Points nearby", "Security Surveillance"],
    accessibility: ["Direct road connectivity"],
    hours: "07:00 AM - 08:00 PM",
    contact: "security@acetcbe.edu.in"
  },
  {
    id: 104,
    name: "Campus Temple",
    shortName: "Sri Vinayagar & Saraswati Temple",
    category: "amenities",
    college: "Akshaya Institutions",
    block: "Central Lawn - Front of Main Block",
    coords: { x: 470, y: 575 },
    entranceNode: "N_ADMIN_CIRCLE",
    icon: "star",
    description: "Peaceful sacred campus shrine dedicated to Sri Vinayagar (Lord Ganesha) and Goddess Saraswati, blessed with lush landscaping and serene water surroundings.",
    departments: ["Campus Cultural & Religious Welfare"],
    floorGuide: [{ floor: "Ground", details: "Traditional Gopuram Sanctum, Meditation Verandah" }],
    facilities: ["Peaceful landscaped ambiance", "Footwear racks", "Floral garden"],
    accessibility: ["Garden walkway ramp"],
    hours: "06:00 AM - 07:00 PM Daily",
    contact: "office@acetcbe.edu.in"
  },
  {
    id: 105,
    name: "Campus ATM",
    shortName: "24/7 ATM Counter",
    category: "amenities",
    college: "Akshaya Institutions",
    block: "Amenities Hub - Near Food Court",
    coords: { x: 540, y: 745 },
    entranceNode: "N_FOOD_COURT_ENTRY",
    icon: "dollar-sign",
    description: "24/7 automated teller machine providing cash withdrawal, debit card services, balance inquiries, and fast fund transfers for all banks.",
    departments: ["Nationalized Bank ATM Franchise"],
    floorGuide: [{ floor: "Ground Floor", details: "Air-conditioned secure ATM kiosk" }],
    facilities: ["24x7 CCTV", "Cardless Cash Withdrawal Support", "Security Guard"],
    accessibility: ["Level ramp entry"],
    hours: "24 Hours / 7 Days",
    contact: "accounts@acetcbe.edu.in"
  },
  {
    id: 106,
    name: "Cafeteria & Juice Bar",
    shortName: "Cafeteria",
    category: "dining",
    college: "Akshaya Institutions",
    block: "Between Main Block & Food Court",
    coords: { x: 505, y: 710 },
    entranceNode: "N_QUAD_SE",
    icon: "coffee",
    description: "Quick refreshment kiosk offering fresh cold pressed juices, tea, coffee, bakery treats, sandwiches, and ice creams between study hours.",
    departments: ["Student Refreshment Amenities"],
    floorGuide: [{ floor: "Ground Floor", details: "Open-air counter with umbrella seating tables" }],
    facilities: ["Outdoor shaded patio seating", "Digital UPI payments"],
    accessibility: ["Step-free courtyard level"],
    hours: "08:30 AM - 06:30 PM",
    contact: "foodcourt@acetcbe.edu.in"
  }
];

// Export for module or global window scope
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CAMPUS_INFO, CATEGORIES, LOCATIONS };
}
