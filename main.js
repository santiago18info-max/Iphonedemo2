/* =========================================================
   NUBO IMPORT — sitio (plan Inicial)
   Para cambiar el stock, editá MODELOS y LISTA.
   ========================================================= */
(function () {
  var WA = "59897226657";
  var $ = function (s, r) { return (r || document).querySelector(s); }, $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var U = function (id, w) { return "https://images.unsplash.com/" + id + "?auto=format&fit=crop&w=" + (w || 700) + "&q=80"; };
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function wa(msg) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg); }
  function n(v) { return v.toLocaleString("es-UY"); }

  /* ---------- cinta ---------- */
  var T = ["Envíos a todo el país", "Originales y libres de fábrica", "Garantía por escrito", "Hasta 12 cuotas", "Tomamos tu usado", "Importación por encargo"];
  var th = T.map(function (t) { return "<span>" + t + "</span>"; }).join("");
  $("#ticker").innerHTML = th + th + th + th;

  /* ---------- carrusel de modelos ---------- */
  var MODELOS = [
    { m: "iPhone 17 Pro Max", s: "17 Pro Max", d: "El más nuevo. Nuevo y sellado.", from: 1690, img: "photo-1695048133142-1a20484d2569" },
    { m: "iPhone 16 Pro", s: "16 Pro", d: "Titanio, cámara de 48 MP.", from: 1190, img: "photo-1616348436168-de43ad0db179" },
    { m: "iPhone 16", s: "16", d: "Colores nuevos, USB-C.", from: 990, img: "photo-1605236453806-6ff36851218e" },
    { m: "iPhone 15 Pro Max", s: "15 Pro Max", d: "Semi nuevo, batería 96%.", from: 950, img: "photo-1632661674596-df8be070a5c5" },
    { m: "iPhone 15", s: "15", d: "Semi nuevo, como de caja.", from: 690, img: "photo-1511707171634-5f897ff02aa9" },
    { m: "iPhone 14 Pro", s: "14 Pro", d: "Semi nuevo, pantalla siempre activa.", from: 630, img: "photo-1678685888221-cda773a3dcdb" },
    { m: "iPhone 14", s: "14", d: "Semi nuevo, rendidor.", from: 520, img: "photo-1591337676887-a217a6970a8a" },
    { m: "iPhone 13", s: "13", d: "La mejor relación precio y calidad.", from: 420, img: "photo-1510557880182-3d4d3cba35a5" }
  ];
  var rail = $("#rail");
  rail.innerHTML = MODELOS.map(function (p) {
    return '<article class="model"><figure class="ph"><span>' + esc(p.s) + '</span><img src="' + U(p.img) + '" alt="' + esc(p.m) + '" loading="lazy" onerror="this.remove()"></figure>' +
      "<h3>" + esc(p.m) + "</h3><p>" + esc(p.d) + '</p><div class="model-foot"><b><small>Desde</small>US$ ' + n(p.from) + '</b><a href="#precios" data-q="' + esc(p.m) + '" aria-label="Ver precios de ' + esc(p.m) + '">→</a></div></article>';
  }).join("");
  function slide(d) { var c = $(".model", rail); rail.scrollBy({ left: d * (c.offsetWidth + 16) * (window.innerWidth > 700 ? 2 : 1), behavior: "smooth" }); }
  $("#railPrev").onclick = function () { slide(-1); };
  $("#railNext").onclick = function () { slide(1); };
  // la flecha de cada modelo filtra la lista de precios
  rail.addEventListener("click", function (e) { var a = e.target.closest("[data-q]"); if (!a) return; $("#q").value = a.dataset.q; setFilter("todos"); renderList(); });

  /* ---------- destacado ---------- */
  var F = { name: "iPhone 16 Pro", colors: [["Titanio desierto", "#C9B8A0"], ["Titanio negro", "#3A3A3C"], ["Titanio blanco", "#EDEBE6"], ["Titanio natural", "#8C8C8A"]], caps: [["128 GB", 1190], ["256 GB", 1290], ["512 GB", 1490]], c: 0, k: 1 };
  function paintFeat() {
    $("#fColors").innerHTML = F.colors.map(function (c, i) { return '<button type="button" data-i="' + i + '" class="' + (i === F.c ? "on" : "") + '" style="background:' + c[1] + '" aria-label="' + c[0] + '" title="' + c[0] + '"></button>'; }).join("");
    $("#fCaps").innerHTML = F.caps.map(function (c, i) { return '<button type="button" data-i="' + i + '" class="' + (i === F.k ? "on" : "") + '">' + c[0] + "</button>"; }).join("");
    $("#fPrice").textContent = "US$ " + n(F.caps[F.k][1]);
    $("#fBtn").href = wa("¡Hola Nubo! Quiero el " + F.name + " " + F.caps[F.k][0] + " en " + F.colors[F.c][0].toLowerCase() + " (US$ " + F.caps[F.k][1] + "). ¿Lo tienen?");
  }
  $("#fColors").addEventListener("click", function (e) { var b = e.target.closest("button"); if (b) { F.c = +b.dataset.i; paintFeat(); } });
  $("#fCaps").addEventListener("click", function (e) { var b = e.target.closest("button"); if (b) { F.k = +b.dataset.i; paintFeat(); } });
  paintFeat();

  /* ---------- lista de precios ----------
     [modelo, capacidad, estado ("nuevo" | "semi"), batería %, precio US$] */
  var LISTA = [
    ["iPhone 17 Pro Max", "256 GB", "nuevo", 100, 1690], ["iPhone 17 Pro Max", "512 GB", "nuevo", 100, 1890],
    ["iPhone 16 Pro", "128 GB", "nuevo", 100, 1190], ["iPhone 16 Pro", "256 GB", "nuevo", 100, 1290],
    ["iPhone 16", "128 GB", "nuevo", 100, 990], ["iPhone 16", "256 GB", "nuevo", 100, 1090],
    ["iPhone 15 Pro Max", "256 GB", "semi", 96, 950],
    ["iPhone 15", "128 GB", "semi", 94, 690], ["iPhone 15", "256 GB", "semi", 92, 770],
    ["iPhone 14 Pro", "128 GB", "semi", 91, 630], ["iPhone 14 Pro", "256 GB", "semi", 90, 690],
    ["iPhone 14", "128 GB", "semi", 89, 520],
    ["iPhone 13", "128 GB", "semi", 87, 420], ["iPhone 13", "256 GB", "semi", 88, 480]
  ];
  var filter = "todos";
  function setFilter(f) { filter = f; $$("#chips button").forEach(function (b) { b.classList.toggle("on", b.dataset.f === f); }); }
  function renderList() {
    var q = $("#q").value.trim().toLowerCase();
    var rows = LISTA.filter(function (r) { return (filter === "todos" || r[2] === filter) && (!q || r[0].toLowerCase().indexOf(q) > -1); });
    $("#plist").innerHTML = rows.map(function (r) {
      var semi = r[2] === "semi", st = semi ? "Semi nuevo" : "Nuevo · sellado";
      return '<div class="prow"><span class="pname">' + r[0] + '</span><span class="pcap" data-extra=" · ' + st + (semi ? " · batería " + r[3] + "%" : "") + '">' + r[1] + '</span><span class="pstate' + (semi ? "" : " new") + '">' + st + '</span><span class="pbat' + (r[3] >= 90 ? " good" : "") + '">' + r[3] + '%</span><span class="pprice"><small>US$</small>' + n(r[4]) + '</span>' +
        '<a class="btn btn-ghost btn-sm" target="_blank" rel="noopener" href="' + wa("¡Hola Nubo! Me interesa el " + r[0] + " " + r[1] + " (" + st.toLowerCase() + ", US$ " + r[4] + "). ¿Está disponible?") + '">Consultar</a></div>';
    }).join("");
    $("#pempty").hidden = rows.length > 0;
  }
  $("#chips").addEventListener("click", function (e) { var b = e.target.closest("button"); if (b) { setFilter(b.dataset.f); renderList(); } });
  $("#q").addEventListener("input", renderList);
  renderList();

  /* ---------- encargo ---------- */
  $("#encForm").addEventListener("submit", function (e) {
    e.preventDefault(); var f = e.target;
    window.open(wa("¡Hola Nubo! Soy " + f.name.value.trim() + " y quiero cotizar por encargo: " + f.prod.value.trim() + "."), "_blank", "noopener");
    f.reset();
  });

  /* ---------- general ---------- */
  $$(".js-wa").forEach(function (a) { a.href = wa(a.dataset.msg); a.target = "_blank"; a.rel = "noopener"; });
  $("#year").textContent = new Date().getFullYear();
  var burger = $("#burger"), menu = $("#menu"), nav = $("#nav");
  burger.onclick = function () { var o = menu.classList.toggle("open"); burger.setAttribute("aria-expanded", o); };
  menu.addEventListener("click", function (e) { if (e.target.tagName === "A") { menu.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); } });
  function onScroll() { nav.classList.toggle("scrolled", window.scrollY > 40); }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { threshold: .1 });
    $$(".reveal").forEach(function (el) { io.observe(el); });
  } else $$(".reveal").forEach(function (el) { el.classList.add("in"); });
})();
