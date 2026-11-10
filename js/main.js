(function () {
  "use strict";

  var CFG = window.POPEYE_CONFIG || {};
  var MENU = window.POPEYE_CARDAPIO || [];
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };

  var brl = function (v) {
    return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };
  var whatsUrl = function (msg) {
    return "https://wa.me/" + CFG.whatsapp + "?text=" + encodeURIComponent(msg);
  };
  var escapeHtml = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };

  /* ---------- Links de WhatsApp ---------- */
  $$(".js-whats").forEach(function (a) {
    a.href = whatsUrl(CFG.mensagemPadrao || "Olá!");
  });

  /* ---------- Ano no rodapé ---------- */
  var ano = $("#ano");
  if (ano) ano.textContent = new Date().getFullYear();

  /* ---------- Menu mobile ---------- */
  var toggle = $(".nav-toggle");
  var nav = $("#menu-principal");
  function closeNav() {
    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
    document.body.classList.remove("nav-open");
  }
  toggle.addEventListener("click", function () {
    var open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
  });
  $$("a", nav).forEach(function (a) { a.addEventListener("click", closeNav); });

  /* ---------- Cabeçalho ao rolar ---------- */
  var header = $(".site-header");
  var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 10); };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Aberto / fechado ---------- */
  function toMin(hhmm) { var p = hhmm.split(":"); return +p[0] * 60 + +p[1]; }
  function fmtHora(hhmm) {
    var p = hhmm.split(":");
    var h = String(+p[0]);
    return p[1] === "00" ? h + "h" : h + "h" + p[1];
  }
  function statusAgora(now) {
    var H = CFG.horarios || {};
    var d = now.getDay();
    var m = now.getHours() * 60 + now.getMinutes();
    var hoje = H[d], ontem = H[(d + 6) % 7];

    // Turno de ontem que passa da meia-noite
    if (ontem && toMin(ontem.fecha) <= toMin(ontem.abre) && m < toMin(ontem.fecha)) {
      return { aberto: true, texto: "Aberto agora · fecha às " + fmtHora(ontem.fecha) };
    }
    if (hoje) {
      var a = toMin(hoje.abre), f = toMin(hoje.fecha);
      var viraDia = f <= a;
      if (m >= a && (viraDia || m < f)) {
        return { aberto: true, texto: "Aberto agora · fecha às " + fmtHora(hoje.fecha) };
      }
      if (m < a) return { aberto: false, texto: "Fechado agora · abre hoje às " + fmtHora(hoje.abre) };
    }
    var amanha = H[(d + 1) % 7];
    return { aberto: false, texto: amanha ? "Fechado agora · abre amanhã às " + fmtHora(amanha.abre) : "Fechado agora" };
  }
  function atualizarStatus() {
    var el = $("#status-aberto");
    if (!el) return;
    var s = statusAgora(new Date());
    el.classList.toggle("is-open", s.aberto);
    el.classList.toggle("is-closed", !s.aberto);
    $(".status-text", el).textContent = s.texto;
  }
  atualizarStatus();
  setInterval(atualizarStatus, 60000);

  // Destaca o dia de hoje na tabela de horário
  var hojeDia = String(new Date().getDay());
  $$("#tabela-horario tr").forEach(function (tr) {
    if ((tr.getAttribute("data-days") || "").split(",").indexOf(hojeDia) > -1) tr.classList.add("is-today");
  });

  /* ---------- Banner rotativo ---------- */
  var slides = $$(".hero-slides .slide");
  var dotsWrap = $(".hero-dots");
  var atual = 0, timer = null;
  var reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function irPara(i) {
    slides[atual].classList.remove("is-active");
    dotsWrap.children[atual].setAttribute("aria-selected", "false");
    atual = (i + slides.length) % slides.length;
    slides[atual].classList.add("is-active");
    dotsWrap.children[atual].setAttribute("aria-selected", "true");
  }
  function iniciar() { if (!reduz) timer = setInterval(function () { irPara(atual + 1); }, 5500); }
  slides.forEach(function (_, i) {
    var b = document.createElement("button");
    b.type = "button";
    b.setAttribute("role", "tab");
    b.setAttribute("aria-label", "Imagem " + (i + 1));
    b.setAttribute("aria-selected", i === 0 ? "true" : "false");
    b.addEventListener("click", function () { clearInterval(timer); irPara(i); iniciar(); });
    dotsWrap.appendChild(b);
  });
  iniciar();

  /* ---------- Cardápio ---------- */
  var tabs = $(".menu-tabs");
  var grid = $("#menu-grid");
  var catAtual = MENU.length ? MENU[0].id : null;
  var TAGS = { veg: "Vegetariana", novo: "Novidade", top: "Mais pedido" };

  function renderTabs() {
    tabs.innerHTML = MENU.map(function (c) {
      return '<button type="button" role="tab" data-cat="' + c.id + '" aria-selected="' + (c.id === catAtual) + '">' +
        '<span aria-hidden="true">' + c.icone + "</span> " + escapeHtml(c.nome) + "</button>";
    }).join("");
  }
  function renderItens() {
    var cat = MENU.filter(function (c) { return c.id === catAtual; })[0];
    if (!cat) return;
    var html = '<p class="menu-cat-desc">' + escapeHtml(cat.descricao || "") + "</p>";
    html += cat.itens.map(function (it, idx) {
      var key = cat.id + ":" + idx;
      var qtd = carrinho[key] ? carrinho[key].qtd : 0;
      var tags = (it.tags || []).map(function (t) {
        return '<span class="tag tag-' + t + '">' + (TAGS[t] || t) + "</span>";
      }).join("");
      return '<article class="menu-item">' +
        '<div class="menu-item-body">' +
          "<h3>" + escapeHtml(it.nome) + "</h3>" +
          (tags ? '<div class="tags">' + tags + "</div>" : "") +
          "<p>" + escapeHtml(it.desc || "") + "</p>" +
        "</div>" +
        '<div class="menu-item-side">' +
          '<span class="price">' + (it.preco != null ? brl(it.preco) : "Consulte") + "</span>" +
          '<div class="qty" data-key="' + key + '">' +
            (qtd ? '<button type="button" class="qty-btn" data-op="-1" aria-label="Remover um ' + escapeHtml(it.nome) + '">−</button><span class="qty-n">' + qtd + "</span>" : "") +
            '<button type="button" class="qty-btn add" data-op="1" aria-label="Adicionar ' + escapeHtml(it.nome) + '">+</button>' +
          "</div>" +
        "</div>" +
      "</article>";
    }).join("");
    grid.innerHTML = html;
  }
  tabs.addEventListener("click", function (e) {
    var b = e.target.closest("button[data-cat]");
    if (!b) return;
    catAtual = b.getAttribute("data-cat");
    renderTabs();
    renderItens();
  });
  grid.addEventListener("click", function (e) {
    var b = e.target.closest(".qty-btn");
    if (!b) return;
    var key = b.parentNode.getAttribute("data-key");
    alterar(key, +b.getAttribute("data-op"));
    if (+b.getAttribute("data-op") > 0) pulse();
  });

  /* ---------- Carrinho / pedido no WhatsApp ---------- */
  var STORE = "popeye-pedido";
  var carrinho = {};
  try { carrinho = JSON.parse(localStorage.getItem(STORE)) || {}; } catch (e) { carrinho = {}; }

  function salvar() { try { localStorage.setItem(STORE, JSON.stringify(carrinho)); } catch (e) {} }
  function itemPorKey(key) {
    var p = key.split(":");
    var cat = MENU.filter(function (c) { return c.id === p[0]; })[0];
    return cat ? { cat: cat, item: cat.itens[+p[1]] } : null;
  }
  // descarta itens que não existem mais no cardápio
  Object.keys(carrinho).forEach(function (k) {
    var r = itemPorKey(k);
    if (!r || !r.item || r.item.nome !== carrinho[k].nome) delete carrinho[k];
  });

  function alterar(key, delta) {
    var r = itemPorKey(key);
    if (!r || !r.item) return;
    var atualQ = carrinho[key] ? carrinho[key].qtd : 0;
    var nova = atualQ + delta;
    if (nova <= 0) delete carrinho[key];
    else carrinho[key] = { nome: r.item.nome, cat: r.cat.nome, preco: r.item.preco, qtd: nova };
    salvar();
    renderItens();
    renderCarrinho();
  }

  var fab = $("#cart-fab"), cart = $("#cart"), backdrop = $("#cart-backdrop");
  function abrirCarrinho(abrir) {
    cart.classList.toggle("is-open", abrir);
    cart.setAttribute("aria-hidden", String(!abrir));
    fab.setAttribute("aria-expanded", String(abrir));
    backdrop.hidden = !abrir;
    if (abrir) $("#cart-close").focus();
  }
  function pulse() {
    fab.classList.remove("pulse");
    void fab.offsetWidth;
    fab.classList.add("pulse");
  }
  function renderCarrinho() {
    var keys = Object.keys(carrinho);
    var total = 0, count = 0, temConsulte = false;
    $("#cart-items").innerHTML = keys.length ? keys.map(function (k) {
      var c = carrinho[k];
      count += c.qtd;
      if (c.preco != null) total += c.preco * c.qtd; else temConsulte = true;
      return '<li><div><strong>' + c.qtd + "× " + escapeHtml(c.nome) + '</strong><small>' + escapeHtml(c.cat) + "</small></div>" +
        '<div class="qty" data-key="' + k + '"><button type="button" class="qty-btn" data-op="-1" aria-label="Remover um">−</button>' +
        '<button type="button" class="qty-btn add" data-op="1" aria-label="Adicionar um">+</button></div></li>';
    }).join("") : '<li class="empty">Seu pedido está vazio. Adicione itens do cardápio.</li>';
    $("#cart-total").textContent = brl(total) + (temConsulte ? " + itens a consultar" : "");
    $("#cart-count").textContent = count;
    fab.hidden = count === 0;
    $("#cart-send").disabled = count === 0;
    if (count === 0 && cart.classList.contains("is-open")) abrirCarrinho(false);
  }
  $("#cart-items").addEventListener("click", function (e) {
    var b = e.target.closest(".qty-btn");
    if (!b) return;
    alterar(b.parentNode.getAttribute("data-key"), +b.getAttribute("data-op"));
  });
  fab.addEventListener("click", function () { abrirCarrinho(true); });
  $("#cart-close").addEventListener("click", function () { abrirCarrinho(false); });
  backdrop.addEventListener("click", function () { abrirCarrinho(false); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { abrirCarrinho(false); closeNav(); }
  });
  $("#cart-clear").addEventListener("click", function () {
    carrinho = {}; salvar(); renderItens(); renderCarrinho();
  });
  $$('input[name="tipo"]').forEach(function (r) {
    r.addEventListener("change", function () {
      $("#campo-endereco").hidden = $('input[name="tipo"]:checked').value !== "Entrega";
    });
  });
  $("#cart-send").addEventListener("click", function () {
    var keys = Object.keys(carrinho);
    if (!keys.length) return;
    var tipo = $('input[name="tipo"]:checked').value;
    var nome = $("#c-nome").value.trim();
    var end = $("#c-end").value.trim();
    var obs = $("#c-obs").value.trim();
    var total = 0;
    var linhas = ["*Novo pedido pelo site* 🍕", ""];
    keys.forEach(function (k) {
      var c = carrinho[k];
      var sub = c.preco != null ? c.preco * c.qtd : null;
      if (sub != null) total += sub;
      linhas.push("• " + c.qtd + "x " + c.nome + " (" + c.cat + ")" + (sub != null ? " — " + brl(sub) : " — consultar"));
    });
    linhas.push("", "*Subtotal estimado:* " + brl(total));
    linhas.push("*Recebimento:* " + tipo);
    if (nome) linhas.push("*Nome:* " + nome);
    if (tipo === "Entrega" && end) linhas.push("*Endereço:* " + end);
    if (obs) linhas.push("*Obs.:* " + obs);
    linhas.push("", "Pode confirmar o valor final e o tempo estimado?");
    window.open(whatsUrl(linhas.join("\n")), "_blank", "noopener");
  });

  /* ---------- Galeria ---------- */
  var gal = $("#gallery-grid");
  var fundos = [
    "linear-gradient(135deg,#c8102e,#f6a91a)",
    "linear-gradient(135deg,#7a0f1d,#e2571e)",
    "linear-gradient(135deg,#e2571e,#ffc72c)",
    "linear-gradient(135deg,#8a1020,#c8102e)"
  ];
  if (gal) {
    gal.innerHTML = (CFG.galeria || []).map(function (g, i) {
      return '<figure class="g-item' + (g.grande ? " g-big" : "") + '" style="background-image:url(\'' + encodeURI(g.src) + "')," + fundos[i % fundos.length] + '">' +
        "<figcaption>" + escapeHtml(g.legenda) + "</figcaption></figure>";
    }).join("");
  }

  renderTabs();
  renderItens();
  renderCarrinho();
})();
