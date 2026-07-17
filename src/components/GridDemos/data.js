/* ============================================================
   Photon Grid — Demo datasets & custom cell renderers
   Framework-agnostic vanilla helpers. Each demo's build() returns
   { columns, data, options } for a PhotonGrid GridCore instance.
   Renderers return HTML strings (assigned by the grid via innerHTML).
   ============================================================ */

/* ---------- deterministic PRNG so data is stable per reload ---------- */
function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function pick(rng, arr) { return arr[Math.floor(rng() * arr.length)]; }
function between(rng, a, b) { return a + rng() * (b - a); }
function intBetween(rng, a, b) { return Math.floor(between(rng, a, b + 1)); }

/* ---------- formatting ---------- */
var usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
var usd2 = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 });
function compact(n) {
  if (n >= 1e12) return (n / 1e12).toFixed(2) + "T";
  if (n >= 1e9) return (n / 1e9).toFixed(2) + "B";
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(1) + "K";
  return String(n);
}
function esc(s) {
  return String(s).replace(/[&<>"]/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
  });
}

/* ---------- shared render helpers (return HTML strings) ---------- */
var AVATAR_COLORS = ["#2563eb","#7c3aed","#db2777","#059669","#d97706","#0891b2","#dc2626","#4f46e5","#0d9488","#c026d3"];
function initials(name) {
  var p = name.trim().split(/\s+/);
  return ((p[0] || "")[0] || "") + ((p[1] || "")[0] || "");
}
function colorFor(name) {
  var h = 0; for (var i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}
function avatar(name) {
  return '<span class="pg-avatar" style="background:' + colorFor(name) + '">' + esc(initials(name).toUpperCase()) + "</span>";
}
function nameStack(main, sub) {
  return '<span class="pg-stack"><span class="pg-stack__main">' + esc(main) +
    '</span><span class="pg-stack__sub">' + esc(sub) + "</span></span>";
}
function personCell(name, sub) {
  return '<span class="pg-cell">' + avatar(name) + nameStack(name, sub) + "</span>";
}
function flag(code, label) {
  return '<span class="pg-cell"><img class="pg-flag" loading="lazy" src="https://flagcdn.com/32x24/' +
    code + '.png" srcset="https://flagcdn.com/64x48/' + code + '.png 2x" width="22" height="16" alt="">' +
    '<span>' + esc(label) + "</span></span>";
}
function badge(text, kind, plain) {
  return '<span class="pg-badge pg-badge--' + kind + (plain ? " pg-badge--plain" : "") + '">' + esc(text) + "</span>";
}
function stars(n) {
  var out = "";
  for (var i = 1; i <= 5; i++) out += i <= n ? "★" : '<span class="off">★</span>';
  return '<span class="pg-stars" title="' + n + '/5">' + out + "</span>";
}
function money(v, cents) {
  return '<span class="pg-num">' + (cents ? usd2 : usd).format(v) + "</span>";
}
function change(pct) {
  var up = pct >= 0;
  return '<span class="pg-change pg-change--' + (up ? "up" : "down") + '">' +
    (up ? "▲" : "▼") + " " + Math.abs(pct).toFixed(2) + "%</span>";
}
function sparkline(vals, up) {
  var max = Math.max.apply(null, vals), min = Math.min.apply(null, vals), range = max - min || 1;
  var bars = vals.map(function (v) {
    var h = 15 + ((v - min) / range) * 85;
    return '<i style="height:' + h.toFixed(0) + '%"></i>';
  }).join("");
  return '<span class="pg-spark pg-spark--' + (up ? "up" : "down") + '">' + bars + "</span>";
}
function progress(pct) {
  var cls = pct >= 100 ? " is-done" : pct < 34 ? " is-low" : "";
  return '<span class="pg-progress"><span class="pg-progress__track">' +
    '<span class="pg-progress__bar' + cls + '" style="width:' + Math.min(100, pct) + '%"></span>' +
    '</span><span class="pg-progress__val">' + pct + "%</span></span>";
}
function idCell(v) { return '<span class="pg-idcell">' + esc(v) + "</span>"; }

/* ---------- data pools ---------- */
var FIRST = ["John","Sarah","Michael","Emma","David","Olivia","James","Sophia","Daniel","Ava","William","Mia","Ethan","Isabella","Liam","Charlotte","Noah","Amelia","Lucas","Harper","Mason","Ella","Logan","Aria","Henry","Grace","Leo","Chloe","Owen","Zoe"];
var LAST = ["Smith","Johnson","Brown","Wilson","Miller","Taylor","Anderson","Thomas","Moore","Martin","Lee","Walker","Hall","Young","King","Wright","Green","Baker","Adams","Nelson","Carter","Mitchell","Perez","Roberts","Turner","Phillips","Campbell","Parker","Evans","Reed"];
var COUNTRIES = [["United States","us"],["United Kingdom","gb"],["Canada","ca"],["Germany","de"],["France","fr"],["Spain","es"],["Italy","it"],["Japan","jp"],["Australia","au"],["Brazil","br"],["India","in"],["Netherlands","nl"],["Sweden","se"],["Singapore","sg"],["Ireland","ie"],["Mexico","mx"]];

function fullName(rng) { return pick(rng, FIRST) + " " + pick(rng, LAST); }
function emailFor(name) { return name.toLowerCase().replace(/\s+/g, ".") + "@photongrid.dev"; }

/* ============================================================
   DEMO 1 — Employees (HR directory)
   ============================================================ */
function buildEmployees() {
  var rng = mulberry32(101);
  var DEPTS = [["Engineering","blue"],["Finance","green"],["Marketing","purple"],["Sales","amber"],["Design","pink"],["Operations","cyan"],["People","slate"]];
  var TITLES = { Engineering:["Frontend Engineer","Backend Engineer","Staff Engineer","DevOps Engineer"], Finance:["Analyst","Controller","Accountant"], Marketing:["Content Lead","SEO Specialist","Brand Manager"], Sales:["Account Executive","SDR","Sales Lead"], Design:["Product Designer","UX Researcher","Design Lead"], Operations:["Ops Manager","Coordinator"], People:["Recruiter","HRBP"] };
  var rows = [];
  for (var i = 1; i <= 220; i++) {
    var name = fullName(rng);
    var dept = pick(rng, DEPTS);
    var country = pick(rng, COUNTRIES);
    rows.push({
      id: i, name: name, email: emailFor(name),
      country: country[0], countryCode: country[1],
      department: dept[0], departmentKind: dept[1],
      title: pick(rng, TITLES[dept[0]]),
      rating: intBetween(rng, 2, 5),
      salary: intBetween(rng, 52, 190) * 1000,
      active: rng() > 0.22
    });
  }
  var columns = [
    { field: "id", header: "#", colId: "id", width: 64, configurable: false, renderer: function (p) { return idCell(p.value); } },
    { field: "name", header: "Employee", colId: "emp", flex: 2, minWidth: 240, renderer: function (p) { return personCell(p.data.name, p.data.email); } },
    { field: "country", header: "Country", colId: "country", width: 190, renderer: function (p) { return flag(p.data.countryCode, p.data.country); } },
    { field: "department", header: "Department", colId: "dept", width: 160, renderer: function (p) { return badge(p.data.department, p.data.departmentKind); } },
    { field: "title", header: "Role", colId: "title", flex: 1, minWidth: 170 },
    { field: "rating", header: "Rating", colId: "rating", width: 130, renderer: function (p) { return stars(p.value); } },
    { field: "salary", header: "Salary", colId: "salary", width: 130, renderer: function (p) { return money(p.value); } },
    { field: "active", header: "Status", colId: "active", width: 130, renderer: function (p) { return p.value ? badge("Active", "green") : badge("Inactive", "slate"); } }
  ];
  return { columns: columns, data: rows };
}

/* ============================================================
   DEMO 2 — Finance (stock watchlist)
   ============================================================ */
function buildFinance() {
  var rng = mulberry32(202);
  var STOCKS = [
    ["AAPL","Apple Inc.","#111827"],["MSFT","Microsoft Corp.","#2563eb"],["GOOGL","Alphabet Inc.","#ea4335"],
    ["AMZN","Amazon.com Inc.","#f59e0b"],["NVDA","NVIDIA Corp.","#16a34a"],["META","Meta Platforms","#1877f2"],
    ["TSLA","Tesla Inc.","#dc2626"],["NFLX","Netflix Inc.","#e50914"],["AMD","Adv. Micro Devices","#111827"],
    ["INTC","Intel Corp.","#0071c5"],["ADBE","Adobe Inc.","#ff0000"],["CRM","Salesforce","#00a1e0"],
    ["ORCL","Oracle Corp.","#c74634"],["PYPL","PayPal Holdings","#003087"],["UBER","Uber Tech.","#111827"],
    ["SHOP","Shopify Inc.","#96bf48"],["SQ","Block Inc.","#111827"],["SNOW","Snowflake Inc.","#29b5e8"],
    ["COIN","Coinbase","#0052ff"],["ABNB","Airbnb Inc.","#ff5a5f"]
  ];
  var RATINGS = [["Strong Buy","green"],["Buy","blue"],["Hold","amber"],["Sell","red"]];
  var rows = STOCKS.map(function (s, i) {
    var price = between(rng, 40, 620);
    var pct = between(rng, -6, 7);
    var up = pct >= 0;
    var trend = [];
    var base = price * (1 - pct / 100);
    for (var k = 0; k < 16; k++) trend.push(base * (1 + between(rng, -0.03, 0.035) + (up ? k * 0.004 : -k * 0.004)));
    var rating = pick(rng, RATINGS);
    return {
      id: i + 1, symbol: s[0], company: s[1], color: s[2],
      price: price, change: pct, trend: trend, up: up,
      marketCap: intBetween(rng, 8, 3200) * 1e9,
      volume: intBetween(rng, 5, 190) * 1e6,
      rating: rating[0], ratingKind: rating[1]
    };
  });
  function ticker(row) {
    return '<span class="pg-cell"><span class="pg-ticker" style="background:' + row.color + '">' + esc(row.symbol.slice(0, 4)) + "</span>" +
      nameStack(row.symbol, row.company) + "</span>";
  }
  var columns = [
    { field: "symbol", header: "Symbol", colId: "sym", flex: 1.6, minWidth: 210, renderer: function (p) { return ticker(p.data); } },
    { field: "price", header: "Price", colId: "price", width: 120, renderer: function (p) { return money(p.value, true); } },
    { field: "change", header: "Change", colId: "chg", width: 120, renderer: function (p) { return change(p.value); } },
    { field: "trend", header: "30D Trend", colId: "trend", width: 130, sortable: false, renderer: function (p) { return sparkline(p.data.trend, p.data.up); } },
    { field: "marketCap", header: "Market Cap", colId: "cap", width: 130, renderer: function (p) { return '<span class="pg-num">$' + compact(p.value) + "</span>"; } },
    { field: "volume", header: "Volume", colId: "vol", width: 120, renderer: function (p) { return '<span class="pg-num pg-num--muted">' + compact(p.value) + "</span>"; } },
    { field: "rating", header: "Analyst", colId: "rating", width: 140, renderer: function (p) { return badge(p.data.rating, p.data.ratingKind); } }
  ];
  return { columns: columns, data: rows, options: { rowHeight: 52 } };
}

/* ============================================================
   DEMO 3 — Orders (e-commerce)
   ============================================================ */
function buildOrders() {
  var rng = mulberry32(303);
  var PRODUCTS = ["Wireless Headphones","Mechanical Keyboard","4K Monitor","USB-C Hub","Ergonomic Chair","Standing Desk","Webcam Pro","Laptop Stand","Noise-Cancel Buds","Smart Watch","Portable SSD","Desk Lamp","Graphics Tablet","Bluetooth Speaker","Docking Station"];
  var STATUS = [["Delivered","green"],["Shipped","blue"],["Processing","amber"],["Pending","slate"],["Cancelled","red"]];
  var PAY = [["VISA","#1a1f71"],["MC","#eb001b"],["AMEX","#2e77bc"],["PayPal","#003087"]];
  var rows = [];
  for (var i = 1; i <= 180; i++) {
    var name = fullName(rng);
    var st = pick(rng, STATUS);
    var pay = pick(rng, PAY);
    var prog = st[0] === "Delivered" ? 100 : st[0] === "Shipped" ? intBetween(rng, 55, 90) : st[0] === "Processing" ? intBetween(rng, 25, 55) : st[0] === "Cancelled" ? 0 : intBetween(rng, 5, 25);
    var d = new Date(2026, intBetween(rng, 0, 6), intBetween(rng, 1, 28));
    rows.push({
      id: "#" + (10000 + i), customer: name, email: emailFor(name),
      product: pick(rng, PRODUCTS), qty: intBetween(rng, 1, 5),
      date: d.toISOString().slice(0, 10),
      payment: pay[0], payColor: pay[1],
      status: st[0], statusKind: st[1], progress: prog,
      total: intBetween(rng, 29, 899)
    });
  }
  function payCell(row) {
    return '<span class="pg-pay"><span class="pg-pay__mark" style="background:' + row.payColor + '">' + esc(row.payment) + "</span></span>";
  }
  var columns = [
    { field: "id", header: "Order", colId: "oid", width: 110, renderer: function (p) { return '<span class="pg-idcell">' + esc(p.value) + "</span>"; } },
    { field: "customer", header: "Customer", colId: "cust", flex: 1.6, minWidth: 230, renderer: function (p) { return personCell(p.data.customer, p.data.email); } },
    { field: "product", header: "Product", colId: "prod", flex: 1.4, minWidth: 190, renderer: function (p) { return nameStack(p.data.product, "Qty: " + p.data.qty); } },
    { field: "date", header: "Date", colId: "date", width: 130, renderer: function (p) { return '<span class="pg-num--muted">' + esc(p.value) + "</span>"; } },
    { field: "payment", header: "Payment", colId: "pay", width: 120, sortable: false, renderer: function (p) { return payCell(p.data); } },
    { field: "status", header: "Status", colId: "status", width: 150, renderer: function (p) { return badge(p.data.status, p.data.statusKind); } },
    { field: "progress", header: "Fulfillment", colId: "prog", width: 180, sortable: false, renderer: function (p) { return progress(p.data.progress); } },
    { field: "total", header: "Total", colId: "total", width: 120, renderer: function (p) { return money(p.value); } }
  ];
  return { columns: columns, data: rows };
}

/* ============================================================
   DEMO 4 — Projects (task tracker)
   ============================================================ */
function buildProjects() {
  var rng = mulberry32(404);
  var NAMES = ["Website Redesign","Mobile App v2","API Migration","Data Warehouse","Design System","Onboarding Flow","Billing Revamp","Search Overhaul","Analytics Suite","Checkout 2.0","Auth Service","Infra Upgrade","Marketing Site","Partner Portal","Reporting Engine","Notification Hub"];
  var COLORS = ["#2563eb","#7c3aed","#db2777","#059669","#d97706","#0891b2","#dc2626","#4f46e5"];
  var PRIORITY = [["Critical","red"],["High","amber"],["Medium","blue"],["Low","slate"]];
  var STATUS = [["On Track","green"],["At Risk","amber"],["Blocked","red"],["Done","blue"]];
  var rows = [];
  for (var i = 0; i < NAMES.length; i++) {
    var owner = fullName(rng);
    var pr = pick(rng, PRIORITY);
    var team = [];
    var teamSize = intBetween(rng, 2, 6);
    for (var t = 0; t < teamSize; t++) team.push(fullName(rng));
    var st = pick(rng, STATUS);
    var prog = st[0] === "Done" ? 100 : intBetween(rng, 8, 95);
    var d = new Date(2026, intBetween(rng, 6, 11), intBetween(rng, 1, 28));
    rows.push({
      id: i + 1, name: NAMES[i], color: COLORS[i % COLORS.length],
      owner: owner, ownerEmail: emailFor(owner),
      priority: pr[0], priorityKind: pr[1],
      progress: prog, team: team,
      due: d.toISOString().slice(0, 10),
      status: st[0], statusKind: st[1]
    });
  }
  function projectCell(row) {
    return '<span class="pg-cell"><span class="pg-dot-lg" style="background:' + row.color + '"></span>' +
      '<span class="pg-stack__main">' + esc(row.name) + "</span></span>";
  }
  function teamCell(names) {
    var shown = names.slice(0, 4);
    var html = shown.map(function (n) { return avatar(n); }).join("");
    if (names.length > 4) html += '<span class="pg-team__more">+' + (names.length - 4) + "</span>";
    return '<span class="pg-team">' + html + "</span>";
  }
  var columns = [
    { field: "name", header: "Project", colId: "pname", flex: 1.6, minWidth: 230, renderer: function (p) { return projectCell(p.data); } },
    { field: "owner", header: "Owner", colId: "owner", flex: 1.3, minWidth: 210, renderer: function (p) { return personCell(p.data.owner, p.data.ownerEmail); } },
    { field: "priority", header: "Priority", colId: "prio", width: 130, renderer: function (p) { return badge(p.data.priority, p.data.priorityKind); } },
    { field: "progress", header: "Progress", colId: "prog", width: 190, sortable: false, renderer: function (p) { return progress(p.data.progress); } },
    { field: "team", header: "Team", colId: "team", width: 150, sortable: false, renderer: function (p) { return teamCell(p.data.team); } },
    { field: "due", header: "Due Date", colId: "due", width: 130, renderer: function (p) { return '<span class="pg-num--muted">' + esc(p.value) + "</span>"; } },
    { field: "status", header: "Status", colId: "status", width: 140, renderer: function (p) { return badge(p.data.status, p.data.statusKind); } }
  ];
  return { columns: columns, data: rows, options: { rowHeight: 54 } };
}

/* ============================================================
   Demo registry (metadata + build fn, with precomputed counts)
   ============================================================ */
export var DEMOS = [
  { id: "employees", title: "Employees", glyph: "👥", desc: "HR directory with avatars, country flags, department badges & star ratings.", c1: "#3b82f6", c2: "#8b5cf6", build: buildEmployees },
  { id: "finance", title: "Finance", glyph: "📈", desc: "Stock watchlist with ticker chips, colored change % and trend sparklines.", c1: "#10b981", c2: "#0ea5e9", build: buildFinance },
  { id: "orders", title: "Orders", glyph: "🛒", desc: "E-commerce orders with payment marks, status pills & fulfillment progress.", c1: "#f59e0b", c2: "#ef4444", build: buildOrders },
  { id: "projects", title: "Projects", glyph: "🗂️", desc: "Project tracker with priority, progress bars and stacked team avatars.", c1: "#8b5cf6", c2: "#ec4899", build: buildProjects }
];

// Precompute row/column counts once for the preview cards.
DEMOS.forEach(function (d) {
  var built = d.build();
  d.rows = built.data.length;
  d.cols = built.columns.length;
});
