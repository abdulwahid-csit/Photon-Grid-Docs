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
  for (var i = 1; i <= 100000; i++) {
    var name = fullName(rng);
    var dept = pick(rng, DEPTS);
    var country = pick(rng, COUNTRIES);
    rows.push({
  id: i,
  employeeId: "EMP-" + String(i).padStart(5, "0"),

  name: name,
  email: emailFor(name),
  phone: "+1 " + intBetween(rng,100,999) + "-" + intBetween(rng,100,999) + "-" + intBetween(rng,1000,9999),

  country: country[0],
  countryCode: country[1],

  city: pick(rng, ["New York","London","Berlin","Toronto","Sydney","Dubai","Tokyo","Paris","Madrid","Rome"]),
  timezone: pick(rng, ["UTC","UTC+1","UTC+3","UTC+5","UTC-5","UTC-8"]),

  department: dept[0],
  departmentKind: dept[1],

  title: pick(rng, TITLES[dept[0]]),

  manager: fullName(rng),

  team: pick(rng, [
    "Phoenix",
    "Atlas",
    "Nova",
    "Velocity",
    "Quantum",
    "Orion"
  ]),

  office: pick(rng, [
    "HQ",
    "East",
    "West",
    "North",
    "Remote"
  ]),

  employmentType: pick(rng, [
    "Full Time",
    "Part Time",
    "Contract"
  ]),

  experience: intBetween(rng,1,15),

  projects: intBetween(rng,1,18),

  tasks: intBetween(rng,10,280),

  completed: intBetween(rng,10,250),

  rating: intBetween(rng,2,5),

  salary: intBetween(rng,52,190) * 1000,

  bonus: intBetween(rng,3,30) * 1000,

  vacation: intBetween(rng,0,28),

  sickLeaves: intBetween(rng,0,8),

  performance: pick(rng,[
    "Excellent",
    "Good",
    "Average",
    "Needs Improvement"
  ]),

  lastReview: "2025-" +
      String(intBetween(rng,1,12)).padStart(2,"0") +
      "-" +
      String(intBetween(rng,1,28)).padStart(2,"0"),

  joined: (2016 + intBetween(rng,0,8)) +
      "-" +
      String(intBetween(rng,1,12)).padStart(2,"0") +
      "-" +
      String(intBetween(rng,1,28)).padStart(2,"0"),

  remote: rng() > .5,

  active: rng() > .22
});
  }
const columns = [

{ field:"id", header:"#", width:70 },

{ field:"employeeId", header:"EMP ID", width:120 },

{
    field:"name",
    header:"Employee",
    colId:"emp",
    flex:2,
    minWidth:260,
    renderer:{
        display:function(p){
            const wrapper=document.createElement("div");
            wrapper.className="employee-cell";

            const avatar=(p.row.id%70)+1;

            wrapper.innerHTML=`
                <img
                    class="employee-avatar"
                    src="https://i.pravatar.cc/80?img=${avatar}"
                    alt="${p.value}"
                />

                <div class="employee-info">
                    <div class="employee-name">${p.value}</div>
                    <div class="employee-email">${p.row.email}</div>
                </div>
            `;

            return wrapper;
        }
    }
},

{ field:"email", header:"Email", width:240 },

{ field:"phone", header:"Phone", width:170 },

{
    field:"country",
    header:"Country",
    width:180,
    groupable: true,
    renderer:{
        display:function(p){
            const wrapper=document.createElement("div");
            wrapper.className="country-cell";

            wrapper.innerHTML=`
                <img
                    class="country-flag"
                    src="https://flagcdn.com/w40/${p.row.countryCode.toLowerCase()}.png"
                    alt="${p.row.country}"
                />

                <span>${p.row.country}</span>
            `;

            return wrapper;
        }
    }
},

{ field:"city", header:"City", width:140, groupable: true, },

{ field:"timezone", header:"Timezone", width:110 },

{
    field:"department",
    header:"Department",
    groupable: true,
    width:170,
    renderer:{
        display:function(p){
            const badge=document.createElement("span");
            badge.className="dept-badge dept-"+p.row.departmentKind;
            badge.textContent=p.row.department;
            return badge;
        }
    }
},

{ field:"title", header:"Job Title", width:220, groupable: true, },

{ field:"manager", header:"Manager", width:180, groupable: true, },

{ field:"team", header:"Team", width:150, groupable: true, },

{ field:"office", header:"Office", width:120, groupable: true, },

{ field:"employmentType", header:"Employment", width:150, groupable: true, },

{ field:"experience", header:"Experience", width:120 },

{ field:"projects", header:"Projects", width:110, groupable: true, },

{ field:"tasks", header:"Tasks", width:90 },

{ field:"completed", header:"Completed", width:110, groupable: true, },

{
    field:"rating",
    header:"Rating",
    groupable: true,
    width:130,
    renderer:{
        display:function(p){
            const el=document.createElement("div");
            el.className="rating-cell";
            el.innerHTML=
                "★".repeat(p.value)+
                `<span class="rating-empty">${"★".repeat(5-p.value)}</span>`;
            return el;
        }
    }
},

{
    field:"salary",
    header:"Salary",
    width:140,
    type: 'number',
    aggFunc: 'sum',
    renderer:{
        display:function(p){
            const el=document.createElement("span");
            el.className="salary-cell";
            el.textContent="$"+Number(p.value).toLocaleString();
            return el;
        }
    }
},

{
    field:"bonus",
    header:"Bonus",
    width:130,
    renderer:{
        display:function(p){
            const el=document.createElement("span");
            el.className="salary-cell";
            el.textContent="$"+Number(p.value).toLocaleString();
            return el;
        }
    }
},

{ field:"vacation", header:"Vacation", width:110 },

{ field:"sickLeaves", header:"Sick Leaves", width:120 },

{
    field:"performance",
    header:"Performance",
    width:170,
    groupable: true,
    renderer:{
        display:function(p){
            const badge=document.createElement("span");

            const colors={
                "Excellent":"green",
                "Good":"blue",
                "Average":"amber",
                "Needs Improvement":"pink"
            };

            badge.className="dept-badge dept-"+(colors[p.value]||"slate");
            badge.textContent=p.value;

            return badge;
        }
    }
},

{ field:"lastReview", header:"Last Review", width:140 },

{ field:"joined", header:"Joined", width:130 },

{
    field:"remote",
    header:"Remote",
    groupable: true,
    width:110,
    renderer:{
        display:function(p){
            const el=document.createElement("span");
            el.textContent=p.value?"🌍 Remote":"🏢 Office";
            return el;
        }
    }
},

{
    field:"active",
    header:"Status",
    groupable: true,
    width:130,
    renderer:{
        display:function(p){
            const badge=document.createElement("span");

            badge.className=p.value
                ?"status-badge status-active"
                :"status-badge status-inactive";

            badge.textContent=p.value
                ?"Active"
                :"Inactive";

            return badge;
        }
    }
},

{ field:"projects", header:"Open Projects", width:140, groupable: true, },

{ field:"experience", header:"Years", width:100, groupable: true, }

];

var options = {
  showGroupingBar: true,
}

  return { columns: columns, data: rows, options: options };
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
    var trend = Array.from({ length: 2 }, function () {
      return intBetween(rng, 10, 500);
    });
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
  {
    field: "symbol",
    header: "Symbol",
    colId: "sym",
    flex: 1.6,
    minWidth: 210,
    renderer: {
      display: function (p) {
        const wrapper = document.createElement("div");
        wrapper.className = "employee-cell";

        wrapper.innerHTML = `
          <img
            class="employee-avatar"
            src="https://logo.clearbit.com/${p.row.company.toLowerCase().replace(/\s+/g, "")}.com"
            onerror="this.src='https://placehold.co/80x80?text=${p.row.symbol}'"
          />

          <div class="employee-info">
            <div class="employee-name">${p.row.symbol}</div>
            <div class="employee-email">${p.row.company}</div>
          </div>
        `;

        return wrapper;
      }
    }
  },

  {
    field: "price",
    header: "Price",
    colId: "price",
    width: 120,
    renderer: {
      display: function (p) {
        const span = document.createElement("span");
        span.className = "salary-cell";
        span.textContent = "$" + Number(p.value).toFixed(2);
        return span;
      }
    }
  },

  {
    field: "change",
    header: "Change",
    colId: "chg",
    width: 120,
    renderer: {
      display: function (p) {
        const value = Number(p.value);

        const badge = document.createElement("span");
        badge.className = value >= 0
          ? "status-badge status-active"
          : "status-badge status-inactive";

        badge.textContent =
          (value >= 0 ? "+" : "") +
          value.toFixed(2) +
          "%";

        return badge;
      }
    }
  },

  {
    field: "trend",
    header: "30D Trend",
    colId: "trend",
    type: 'sparkline',
    minWidth: 250,
    sparkline: { type: 'area', stroke: '#2563eb', showMarkers: true },

    width: 250,
    sortable: false,
  },

  {
    field: "marketCap",
    header: "Market Cap",
    colId: "cap",
    width: 130,
    renderer: {
      display: function (p) {
        const span = document.createElement("span");
        span.className = "salary-cell";

        const v = p.value;

        span.textContent =
          "$" +
          (v >= 1e12 ? (v / 1e12).toFixed(2) + "T" :
           v >= 1e9 ? (v / 1e9).toFixed(2) + "B" :
           v >= 1e6 ? (v / 1e6).toFixed(2) + "M" :
           v.toLocaleString());

        return span;
      }
    }
  },

  {
    field: "volume",
    header: "Volume",
    colId: "vol",
    width: 120,
    renderer: {
      display: function (p) {
        const span = document.createElement("span");
        span.className = "pg-num--muted";

        const v = p.value;

        span.textContent =
          v >= 1e9 ? (v / 1e9).toFixed(1) + "B" :
          v >= 1e6 ? (v / 1e6).toFixed(1) + "M" :
          v >= 1e3 ? (v / 1e3).toFixed(1) + "K" :
          v.toLocaleString();

        return span;
      }
    }
  },

  {
    field: "rating",
    header: "Analyst",
    colId: "rating",
    width: 140,
    renderer: {
      display: function (p) {
        const badge = document.createElement("span");
        badge.className = "dept-badge dept-" + p.row.ratingKind;
        badge.textContent = p.row.rating;
        return badge;
      }
    }
  }
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
  {
    field: "id",
    header: "Order",
    colId: "oid",
    width: 110,
    renderer: {
      display: function (p) {
        const span = document.createElement("span");
        span.className = "id-cell";
        span.textContent = "#" + p.value;
        return span;
      }
    }
  },

  {
    field: "customer",
    header: "Customer",
    colId: "cust",
    flex: 1.6,
    minWidth: 230,
    renderer: {
      display: function (p) {
        const wrapper = document.createElement("div");
        wrapper.className = "employee-cell";

        const avatar = (p.row.id % 70) + 1;

        wrapper.innerHTML = `
          <img
            class="employee-avatar"
            src="https://i.pravatar.cc/80?img=${avatar}"
            alt="${p.row.customer}"
          />

          <div class="employee-info">
            <div class="employee-name">${p.row.customer}</div>
            <div class="employee-email">${p.row.email}</div>
          </div>
        `;

        return wrapper;
      }
    }
  },

  {
    field: "product",
    header: "Product",
    colId: "prod",
    flex: 1.4,
    minWidth: 190,
    renderer: {
      display: function (p) {
        const wrapper = document.createElement("div");
        wrapper.className = "project-cell";

        wrapper.innerHTML = `
          <div class="project-name">${p.row.product}</div>
          <div class="project-desc">Qty: ${p.row.qty}</div>
        `;

        return wrapper;
      }
    }
  },

  {
    field: "date",
    header: "Date",
    colId: "date",
    width: 130,
    renderer: {
      display: function (p) {
        const span = document.createElement("span");
        span.className = "pg-num--muted";
        span.textContent = p.value;
        return span;
      }
    }
  },

  {
    field: "payment",
    header: "Payment",
    colId: "pay",
    width: 120,
    sortable: false,
    renderer: {
      display: function (p) {
        const badge = document.createElement("span");

        const colors = {
          Paid: "green",
          Pending: "amber",
          Failed: "pink",
          Refunded: "blue"
        };

        badge.className = "dept-badge dept-" + (colors[p.row.payment] || "slate");
        badge.textContent = p.row.payment;

        return badge;
      }
    }
  },

  {
    field: "status",
    header: "Status",
    colId: "status",
    width: 150,
    renderer: {
      display: function (p) {
        const badge = document.createElement("span");
        badge.className = "status-badge status-" + p.row.statusKind;
        badge.textContent = p.row.status;
        return badge;
      }
    }
  },

  {
    field: "progress",
    header: "Fulfillment",
    colId: "prog",
    width: 180,
    sortable: false,
    renderer: {
      display: function (p) {
        const wrapper = document.createElement("div");
        wrapper.className = "progress-cell";

        wrapper.innerHTML = `
          <div class="progress-bar">
            <div
              class="progress-fill"
              style="width:${p.row.progress}%">
            </div>
          </div>

          <span class="progress-text">
            ${p.row.progress}%
          </span>
        `;

        return wrapper;
      }
    }
  },

  {
    field: "total",
    header: "Total",
    colId: "total",
    width: 120,
    renderer: {
      display: function (p) {
        const span = document.createElement("span");
        span.className = "salary-cell";
        span.textContent = "$" + Number(p.value).toLocaleString();
        return span;
      }
    }
  }
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
  {
    field: "name",
    header: "Project",
    colId: "pname",
    flex: 1.6,
    minWidth: 230,
    renderer: {
      display: function (p) {
        const wrapper = document.createElement("div");
        wrapper.className = "project-cell";

        wrapper.innerHTML = `
          <div class="project-name">${p.row.name}</div>
          <div class="project-desc">${p.row.description || "Project Dashboard"}</div>
        `;

        return wrapper;
      }
    }
  },

  {
    field: "owner",
    header: "Owner",
    colId: "owner",
    flex: 1.3,
    minWidth: 210,
    renderer: {
      display: function (p) {
        const wrapper = document.createElement("div");
        wrapper.className = "employee-cell";

        const avatar = (p.row.id % 70) + 1;

        wrapper.innerHTML = `
          <img
            class="employee-avatar"
            src="https://i.pravatar.cc/80?img=${avatar}"
            alt="${p.row.owner}"
          />

          <div class="employee-info">
            <div class="employee-name">${p.row.owner}</div>
            <div class="employee-email">${p.row.ownerEmail}</div>
          </div>
        `;

        return wrapper;
      }
    }
  },

  {
    field: "priority",
    header: "Priority",
    colId: "prio",
    width: 130,
    renderer: {
      display: function (p) {
        const badge = document.createElement("span");
        badge.className = "dept-badge dept-" + p.row.priorityKind;
        badge.textContent = p.row.priority;
        return badge;
      }
    }
  },

  {
    field: "progress",
    header: "Progress",
    colId: "prog",
    width: 190,
    sortable: false,
    renderer: {
      display: function (p) {
        const wrapper = document.createElement("div");
        wrapper.className = "progress-cell";

        wrapper.innerHTML = `
          <div class="progress-bar">
            <div class="progress-fill" style="width:${p.row.progress}%"></div>
          </div>
          <span class="progress-text">${p.row.progress}%</span>
        `;

        return wrapper;
      }
    }
  },

  {
    field: "team",
    header: "Team",
    colId: "team",
    width: 150,
    sortable: false,
    renderer: {
      display: function (p) {
        const wrapper = document.createElement("div");
        wrapper.className = "team-cell";

        const max = Math.min(3, p.row.team.length);

        for (let i = 0; i < max; i++) {
          const img = document.createElement("img");
          img.className = "team-avatar";
          img.src = `https://i.pravatar.cc/60?img=${(p.row.id + i) % 70 + 1}`;
          wrapper.appendChild(img);
        }

        if (p.row.team.length > 3) {
          const more = document.createElement("span");
          more.className = "team-more";
          more.textContent = "+" + (p.row.team.length - 3);
          wrapper.appendChild(more);
        }

        return wrapper;
      }
    }
  },

  {
    field: "due",
    header: "Due Date",
    colId: "due",
    width: 130,
    renderer: {
      display: function (p) {
        const span = document.createElement("span");
        span.className = "pg-num--muted";
        span.textContent = p.value;
        return span;
      }
    }
  },

  {
    field: "status",
    header: "Status",
    colId: "status",
    width: 140,
    renderer: {
      display: function (p) {
        const badge = document.createElement("span");
        badge.className = "status-badge status-" + p.row.statusKind;
        badge.textContent = p.row.status;
        return badge;
      }
    }
  }
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
