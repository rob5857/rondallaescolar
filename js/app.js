/* Rondalla Escolar José N. Colón González — comportamiento del sitio.
   El contenido editable vive en js/data.js. */
(() => {
  "use strict";
  const D = window.RONDALLA || {};
  const C = D.config || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (t) => String(t ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const pagina = document.body.dataset.page;
  const movimientoReducido = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Iconos e ilustraciones ---------- */
  const svg = (d, vb = 24) => `<svg viewBox="0 0 ${vb} ${vb}" fill="none" stroke="currentColor" stroke-width="${vb === 24 ? 1.8 : 3}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const ICONO = {
    inicio: svg('<path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>'),
    rondalla: svg('<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>'),
    eventos: svg('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>'),
    galeria: svg('<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="M21 16l-5-5L5 20"/>'),
    apoyanos: svg('<path d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z"/>'),
    contacto: svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>')
  };
  const ARTE = {
    cuatro: svg('<path d="M60 50c-17 0-27 8-27 20 0 7 4 9 4 13s-6 8-6 15c0 11 13 18 29 18s29-7 29-18c0-7-6-11-6-15s4-6 4-13c0-12-10-20-27-20z"/><path d="M54 50V18h12v32M51 18V6h18v12z"/><circle cx="60" cy="84" r="8"/><path d="M57 8v90M63 8v90" stroke-width="1.2"/>', 120),
    guitarra: svg('<path d="M60 46c-12 0-20 7-20 16 0 5 2 8 2 11-6 4-10 10-10 18 0 13 12 21 28 21s28-8 28-21c0-8-4-14-10-18 0-3 2-6 2-11 0-9-8-16-20-16z"/><path d="M55 46V16h10v30M52 16V5h16v11z"/><circle cx="60" cy="74" r="8"/><path d="M50 98h20"/><path d="M57 7v91M63 7v91" stroke-width="1.2"/>', 120),
    piano: svg('<rect x="10" y="30" width="100" height="62" rx="6"/><path d="M10 52h100M30 52v40M50 52v40M70 52v40M90 52v40"/><path d="M24 52v22h12V52M44 52v22h12V52M84 52v22h12V52" fill="currentColor" stroke-width="1.5"/>', 120),
    percusion: svg('<ellipse cx="38" cy="42" rx="24" ry="9"/><path d="M14 42l5 46c0 5 9 8 19 8s19-3 19-8l5-46"/><ellipse cx="88" cy="50" rx="18" ry="7"/><path d="M70 50l4 38c0 4 6 6 14 6s14-2 14-6l4-38"/><path d="M57 62h14"/>', 120)
  };

  /* ---------- Encabezado y pie ---------- */
  const NAV = [
    ["inicio", "index.html", "Inicio", "Inicio"],
    ["rondalla", "rondalla.html", "Nuestra rondalla", "Rondalla"],
    ["eventos", "eventos.html", "Eventos", "Eventos"],
    ["galeria", "galeria.html", "Galería", "Galería"],
    ["apoyanos", "apoyanos.html", "Apóyanos", "Apóyanos"],
    ["contacto", "contacto.html", "Contacto", "Contacto"]
  ];
  const cab = $("#cabecera");
  if (cab) {
    cab.innerHTML = `
      ${C.borrador ? '<div class="borrador" role="note">Versión preliminar · textos, cifras y eventos pendientes de aprobación de la escuela.</div>' : ""}
      <header class="cabecera"><div class="contenedor cabecera-fila">
        <a class="marca" href="index.html"><img src="assets/logo-192.png" alt="" width="42" height="42">
          <span><small>Rondalla Escolar</small>José N. Colón González</span></a>
        <nav class="nav" aria-label="Principal"><ul>
          ${NAV.map(([id, href, largo, corto]) => `<li><a href="${href}"${id === pagina ? ' aria-current="page"' : ""}>${ICONO[id]}<span class="largo">${largo}</span><span class="corto" aria-hidden="true">${corto}</span></a></li>`).join("")}
        </ul></nav>
      </div></header>`;
    // Las etiquetas corta y larga se alternan por CSS; en móvil la corta debe ser la accesible.
    if (matchMedia("(max-width: 859px)").matches) $$(".nav .corto").forEach((e) => e.removeAttribute("aria-hidden"));
  }
  const pie = $("#pie");
  if (pie) {
    pie.innerHTML = `<footer class="pie"><div class="contenedor">
      <div class="pie-fila">
        <div><img src="assets/logo-192.png" alt="Emblema de la rondalla" width="96" height="96">
          <p><strong style="color:#f4ecd8">Rondalla Escolar José N. Colón González</strong><br>Nuestra música, nuestras raíces, nuestro futuro.</p></div>
        <div><p class="antetitulo" style="color:var(--oro-claro)">Explora</p><ul>${NAV.map(([, href, largo]) => `<li><a href="${href}">${largo}</a></li>`).join("")}</ul></div>
        <div><p class="antetitulo" style="color:var(--oro-claro)">Participa</p><ul>
          <li><a href="apoyanos.html#donar">Apoyar la rondalla</a></li>
          <li><a href="apoyanos.html#auspiciadores">Ser auspiciador</a></li>
          <li><a href="apoyanos.html#transparencia">Transparencia</a></li>
          <li><a href="contacto.html">Invítanos a tu actividad</a></li></ul></div>
      </div>
      <p class="legal">© ${new Date().getFullYear()} Rondalla Escolar José N. Colón González. Las fotografías y videos se publican únicamente con autorización. Este sitio no almacena datos de tarjetas ni comparte información de estudiantes o familias.</p>
    </div></footer>`;
  }

  /* ---------- Sonido (solo cuando el visitante lo decide) ---------- */
  let ctx, ruido;
  const audio = () => {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      ruido = ctx.createBuffer(1, ctx.sampleRate * 0.4, ctx.sampleRate);
      const d = ruido.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  };
  const envolvente = (a, pico, dur) => {
    const g = a.createGain(), t = a.currentTime;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(pico, t + 0.006);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    g.connect(a.destination);
    return g;
  };
  function cuerda(f, dur = 1.6, vol = 0.22) {
    const a = audio(); if (!a) return;
    const t = a.currentTime, g = envolvente(a, vol, dur);
    const filtro = a.createBiquadFilter();
    filtro.type = "lowpass";
    filtro.frequency.setValueAtTime(Math.min(f * 7, 9000), t);
    filtro.frequency.exponentialRampToValueAtTime(f * 1.5, t + dur * 0.7);
    filtro.connect(g);
    for (const [tipo, desv] of [["sawtooth", 0], ["triangle", 4]]) {
      const o = a.createOscillator();
      o.type = tipo; o.frequency.value = f; o.detune.value = desv;
      o.connect(filtro); o.start(t); o.stop(t + dur);
    }
  }
  function tecla(f) {
    const a = audio(); if (!a) return;
    const t = a.currentTime, g = envolvente(a, 0.3, 1.4);
    for (const [tipo, mult, v] of [["triangle", 1, 1], ["sine", 2, 0.3]]) {
      const o = a.createOscillator(), gv = a.createGain();
      o.type = tipo; o.frequency.value = f * mult; gv.gain.value = v;
      o.connect(gv).connect(g); o.start(t); o.stop(t + 1.4);
    }
  }
  function golpe(tipo) {
    const a = audio(); if (!a) return;
    const t = a.currentTime;
    if (tipo === "bongo-agudo" || tipo === "bongo-grave" || tipo === "clave") {
      const f = { "bongo-agudo": 420, "bongo-grave": 260, clave: 2400 }[tipo];
      const dur = tipo === "clave" ? 0.09 : 0.28;
      const o = a.createOscillator(), g = envolvente(a, 0.5, dur);
      o.type = "sine"; o.frequency.setValueAtTime(f * 1.4, t);
      o.frequency.exponentialRampToValueAtTime(f, t + 0.04);
      o.connect(g); o.start(t); o.stop(t + dur);
      return;
    }
    // Güiro: tres raspados cortos. Maracas: un soplo de ruido agudo.
    const veces = tipo === "guiro" ? 3 : 1;
    for (let i = 0; i < veces; i++) {
      const s = a.createBufferSource(), f = a.createBiquadFilter(), g = a.createGain();
      const t0 = t + i * 0.07, dur = tipo === "guiro" ? 0.06 : 0.14;
      s.buffer = ruido;
      f.type = "bandpass"; f.frequency.value = tipo === "guiro" ? 3200 : 7000; f.Q.value = tipo === "guiro" ? 4 : 1;
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(0.4, t0 + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      s.connect(f).connect(g).connect(a.destination);
      s.start(t0); s.stop(t0 + dur + 0.02);
    }
  }

  /* ---------- Portada: cuerdas que se rasguean ---------- */
  const hero = $(".hero");
  if (hero) {
    // Diez cuerdas en cinco órdenes, como el cuatro puertorriqueño (Si, Mi, La, Re, Sol).
    const X = [14, 16, 32, 34, 50, 52, 68, 70, 86, 88];
    const F = [123.47, 246.94, 164.81, 329.63, 220, 220, 293.66, 293.66, 392, 392];
    const lienzo = $(".hero-cuerdas", hero);
    const cuerdas = X.map((x) => {
      const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
      p.setAttribute("d", `M${x} 0Q${x} 50 ${x} 100`);
      lienzo.append(p);
      return { x, p, amp: 0, t: 0 };
    });
    let sonido = false, animando = false, xPrevio = null;
    const dibuja = () => {
      let viva = false;
      for (const c of cuerdas) {
        if (c.amp < 0.02) { if (c.amp) { c.amp = 0; c.p.setAttribute("d", `M${c.x} 0Q${c.x} 50 ${c.x} 100`); } continue; }
        viva = true; c.t += 0.9; c.amp *= 0.955;
        c.p.setAttribute("d", `M${c.x} 0Q${(c.x + Math.sin(c.t) * c.amp).toFixed(2)} 50 ${c.x} 100`);
      }
      animando = viva;
      if (viva) requestAnimationFrame(dibuja);
    };
    const pulsa = (i) => {
      if (sonido) cuerda(F[i], 1.8, 0.14);
      if (movimientoReducido) return;
      cuerdas[i].amp = 2.2; cuerdas[i].t = 0;
      if (!animando) { animando = true; requestAnimationFrame(dibuja); }
    };
    const enX = (e) => { const r = hero.getBoundingClientRect(); return ((e.clientX - r.left) / r.width) * 100; };
    hero.addEventListener("pointermove", (e) => {
      const x = enX(e);
      if (xPrevio !== null) {
        const a = Math.min(xPrevio, x), b = Math.max(xPrevio, x);
        cuerdas.forEach((c, i) => { if (c.x > a && c.x <= b) pulsa(i); });
      }
      xPrevio = x;
    });
    hero.addEventListener("pointerleave", () => { xPrevio = null; });
    hero.addEventListener("pointerdown", (e) => {
      if (e.target.closest("a, button")) return;
      const x = enX(e); xPrevio = x;
      cuerdas.forEach((c, i) => { if (Math.abs(c.x - x) < 2.5) pulsa(i); });
    });
    // Slider de fotos: la primera de config.heroFotos es la que se ve al entrar.
    const fotosHero = C.heroFotos || [], cajaFotos = $("#hero-fotos"), cajaPuntos = $("#hero-puntos");
    if (fotosHero.length && cajaFotos) {
      cajaFotos.innerHTML = fotosHero.map((f, i) => `<img ${i ? `data-src="${esc(f.src)}"` : `src="${esc(f.src)}" class="activa" fetchpriority="high"`} alt="${esc(f.alt)}" decoding="async">`).join("");
      const imgs = $$("img", cajaFotos);
      let actual = 0, reloj = null, pausa = movimientoReducido;
      cajaPuntos.innerHTML = fotosHero.map((_, i) => `<button type="button" class="punto" aria-label="Foto ${i + 1} de ${fotosHero.length}"${i ? "" : ' aria-current="true"'}></button>`).join("")
        + `<button type="button" class="pausa" aria-label="${pausa ? "Reanudar" : "Pausar"} el pase de fotos">${pausa ? "▶" : "❚❚"}</button>`;
      const puntos = $$(".punto", cajaPuntos), bPausa = $(".pausa", cajaPuntos);
      const carga = (i) => { const im = imgs[i]; if (im.dataset.src) { im.src = im.dataset.src; delete im.dataset.src; } };
      const ir = (i) => {
        actual = (i + imgs.length) % imgs.length;
        carga(actual); carga((actual + 1) % imgs.length);
        imgs.forEach((im, k) => im.classList.toggle("activa", k === actual));
        puntos.forEach((p, k) => (k === actual ? p.setAttribute("aria-current", "true") : p.removeAttribute("aria-current")));
      };
      const marcha = () => { clearInterval(reloj); if (!pausa) reloj = setInterval(() => { if (!document.hidden) ir(actual + 1); }, 6000); };
      puntos.forEach((p, i) => p.addEventListener("click", () => { ir(i); marcha(); }));
      bPausa.addEventListener("click", () => {
        pausa = !pausa;
        bPausa.textContent = pausa ? "▶" : "❚❚";
        bPausa.setAttribute("aria-label", `${pausa ? "Reanudar" : "Pausar"} el pase de fotos`);
        marcha();
      });
      carga(1 % imgs.length); marcha();
    }

    const bSonido = $("#btn-sonido");
    bSonido?.addEventListener("click", () => {
      sonido = !sonido;
      bSonido.setAttribute("aria-pressed", sonido);
      bSonido.textContent = sonido ? "🔊 Sonido activado" : "🔈 Activar sonido";
      if (sonido) { audio(); rasguea(); }
    });
    const rasguea = () => cuerdas.forEach((_, i) => setTimeout(() => pulsa(i), i * 45));
    $("#btn-rasguear")?.addEventListener("click", rasguea);
  }

  /* ---------- Instrumentos ---------- */
  const INSTRUMENTOS = [
    { id: "cuatro", nombre: "Cuatro", corto: "El instrumento nacional de Puerto Rico y la voz que lleva la melodía.",
      texto: "Instrumento nacional de Puerto Rico. Tiene diez cuerdas agrupadas en cinco órdenes y su timbre brillante lleva la melodía en la música típica.",
      notas: [["Si", 246.94], ["Mi", 329.63], ["La", 220], ["Re", 293.66], ["Sol", 392]], toca: (f, i) => { cuerda(f); if (i < 2) cuerda(f / 2, 1.6, 0.14); } },
    { id: "guitarra", nombre: "Guitarra", corto: "Sostiene la armonía y marca el pulso que une al grupo.",
      texto: "Acompaña con acordes y bajos. Sostiene la armonía y el ritmo sobre los que el cuatro canta.",
      notas: [["Mi", 82.41], ["La", 110], ["Re", 146.83], ["Sol", 196], ["Si", 246.94], ["Mi", 329.63]], toca: (f) => cuerda(f, 2.2, 0.3) },
    { id: "piano", nombre: "Piano", corto: "Amplía los colores del conjunto con armonías y contracantos.",
      texto: "Aporta amplitud y color: refuerza la armonía, dobla melodías y enriquece los arreglos del conjunto.", clase: "piano",
      notas: [["Do", 261.63], ["Re", 293.66], ["Mi", 329.63], ["Fa", 349.23], ["Sol", 392], ["La", 440], ["Si", 493.88], ["Do", 523.25]], toca: (f) => tecla(f) },
    { id: "percusion", nombre: "Percusión", corto: "Güiro, maracas y bongó ponen el sabor y el movimiento.",
      texto: "Güiro, maracas, bongó y clave dan el sabor rítmico de nuestra música y enseñan a escucharse en grupo.",
      notas: [["Bongó agudo", "bongo-agudo"], ["Bongó grave", "bongo-grave"], ["Güiro", "guiro"], ["Maracas", "maracas"], ["Clave", "clave"]], toca: (t) => golpe(t) }
  ];
  $$("[data-instrumentos]").forEach((caja) => {
    const completo = caja.dataset.instrumentos === "completo";
    caja.innerHTML = INSTRUMENTOS.map((ins) => `
      <article class="tarjeta instrumento revela">
        <div class="arte">${ARTE[ins.id]}</div>
        <h3>${ins.nombre}</h3>
        <p>${completo ? ins.texto : ins.corto}</p>
        ${completo ? `<div class="teclas ${ins.clase || ""}" role="group" aria-label="Probar ${ins.nombre}: cada botón reproduce un sonido">
          ${ins.notas.map(([n], i) => `<button type="button" class="tecla" data-ins="${ins.id}" data-i="${i}">${n}</button>`).join("")}</div>` : ""}
      </article>`).join("");
  });
  document.addEventListener("click", (e) => {
    const b = e.target.closest(".tecla"); if (!b) return;
    const ins = INSTRUMENTOS.find((x) => x.id === b.dataset.ins), i = +b.dataset.i;
    ins.toca(ins.notas[i][1], i);
    b.classList.add("suena"); setTimeout(() => b.classList.remove("suena"), 160);
  });

  /* ---------- Videos ---------- */
  // preload="metadata" + #t=1 muestra un fotograma sin descargar el video completo.
  function video(v) {
    return `<video class="video" controls playsinline preload="none" src="${esc(v.src)}#t=1" aria-label="${esc(v.titulo)}">
      ${v.subtitulos ? `<track kind="subtitles" srclang="es" label="Español" src="${esc(v.subtitulos)}" default>` : ""}</video>`;
  }
  // El fotograma inicial se pide solo cuando el video se acerca a la pantalla, para no frenar las fotos.
  const vigia = "IntersectionObserver" in window ? new IntersectionObserver((es) => es.forEach((x) => {
    if (x.isIntersecting) { x.target.preload = "metadata"; vigia.unobserve(x.target); }
  }), { rootMargin: "300px" }) : null;
  const vigilaVideos = () => $$("video.video:not([data-v])").forEach((v) => { v.dataset.v = 1; if (vigia) vigia.observe(v); else v.preload = "metadata"; });
  new MutationObserver(vigilaVideos).observe(document.body, { childList: true, subtree: true });
  // Al reproducir un video se pausan los demás.
  document.addEventListener("play", (e) => {
    if (e.target.tagName === "VIDEO") $$("video").forEach((v) => { if (v !== e.target) v.pause(); });
  }, true);

  /* ---------- Grabación destacada ---------- */
  const esc_ = $("#audio-destacado");
  if (esc_) {
    const a = C.videoDestacado || {};
    esc_.innerHTML = a.src
      ? `${video(a)}<p style="margin:12px 0 0"><strong>${esc(a.titulo)}</strong><br><span style="color:#cfc5ad">${esc(a.descripcion)}</span></p>
         <p class="nota" style="color:#cfc5ad;margin-top:10px">El video suena solo cuando tú lo pulsas. <a href="galeria.html#videos-seccion">Ver más videos</a></p>`
      : `<p class="nota" style="color:#cfc5ad">Pronto publicaremos aquí una interpretación autorizada de la rondalla. Mientras tanto, activa el sonido en la portada y rasguea las cuerdas, o prueba cada instrumento en <a href="rondalla.html#instrumentos">Instrumentos y raíces</a>.</p>`;
  }

  /* ---------- Eventos ---------- */
  const PR = "America/Puerto_Rico";
  const instante = (e) => { // Puerto Rico es UTC−4 todo el año
    const [y, m, d] = e.fecha.split("-").map(Number), [hh, mm] = (e.hora || "00:00").split(":").map(Number);
    return new Date(Date.UTC(y, m - 1, d, hh + 4, mm));
  };
  const fmt = (f, o) => new Intl.DateTimeFormat("es-PR", { timeZone: PR, ...o }).format(f);
  const eventos = (D.eventos || []).map((e) => {
    const cuando = instante(e);
    let estado = e.estado;
    if (estado === "proximo" && cuando.getTime() + 3 * 3600e3 < Date.now()) estado = "realizado";
    return { ...e, cuando, estado };
  });
  const proximos = eventos.filter((e) => e.estado === "proximo" || e.estado === "pospuesto").sort((a, b) => a.cuando - b.cuando);
  const pasados = eventos.filter((e) => e.estado === "realizado" || e.estado === "cancelado").sort((a, b) => b.cuando - a.cuando);
  const NOMBRE_ESTADO = { proximo: "Próximo", realizado: "Realizado", pospuesto: "Pospuesto", cancelado: "Cancelado" };
  const etiquetas = (e) => `<span class="etiqueta ${e.estado}">${NOMBRE_ESTADO[e.estado]}</span>${e.ejemplo ? ' <span class="etiqueta ejemplo">Ejemplo</span>' : ""}`;
  const cuandoTexto = (e) => `${fmt(e.cuando, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}${e.hora ? " · " + fmt(e.cuando, { hour: "numeric", minute: "2-digit" }) : ""}`;

  const tarjetaEvento = (e) => `
    <article class="tarjeta evento revela ${e.estado === "realizado" || e.estado === "cancelado" ? "pasado" : ""}">
      <div class="fecha" aria-hidden="true"><b>${fmt(e.cuando, { day: "numeric" })}</b><span>${fmt(e.cuando, { month: "short" }).replace(".", "")} ${fmt(e.cuando, { year: "2-digit" })}</span></div>
      <div>${etiquetas(e)}
        <h3>${esc(e.titulo)}</h3>
        <p class="meta">${cuandoTexto(e)}<br>${esc(e.lugar)} · ${esc(e.acceso)}</p>
        <div class="botones">
          <button type="button" class="btn btn-oscuro btn-chico" data-evento="${esc(e.id)}">${e.estado === "realizado" ? "Ver memoria" : "Ver detalles"}</button>
          ${e.estado === "proximo" ? `<button type="button" class="btn btn-linea btn-chico" data-ics="${esc(e.id)}">Añadir al calendario</button>` : ""}
        </div>
      </div>
    </article>`;

  const lista = $("#lista-eventos");
  if (lista) {
    const pinta = (cual) => {
      const grupo = cual === "realizados" ? pasados : proximos;
      lista.innerHTML = grupo.length ? grupo.map(tarjetaEvento).join("")
        : `<p class="vacio">${cual === "realizados" ? "Aún no hay presentaciones en el archivo." : "No hay presentaciones anunciadas por ahora. ¡Vuelve pronto!"}</p>`;
    };
    $$("#filtros-eventos button").forEach((b) => b.addEventListener("click", () => {
      $$("#filtros-eventos button").forEach((x) => x.setAttribute("aria-pressed", x === b));
      pinta(b.dataset.filtro);
    }));
    pinta("proximos");
  }

  const cajaProxima = $("#proxima");
  if (cajaProxima) {
    const e = proximos.find((x) => x.estado === "proximo");
    if (e) {
      const dias = Math.max(0, Math.ceil((e.cuando - Date.now()) / 864e5));
      cajaProxima.innerHTML = `
        <div><p class="cuenta">${dias === 0 ? "¡Hoy!" : dias}<small>${dias === 0 ? "nos vemos" : dias === 1 ? "día para vernos" : "días para vernos"}</small></p></div>
        <div>${etiquetas(e)}<h3 style="font-size:1.7rem;margin-top:10px">${esc(e.titulo)}</h3>
          <p style="color:#cfc5ad">${cuandoTexto(e)}<br>${esc(e.lugar)} · ${esc(e.acceso)}</p>
          <div class="botones"><button type="button" class="btn btn-oro" data-evento="${esc(e.id)}">Ver el evento</button>
          <button type="button" class="btn btn-linea" data-ics="${esc(e.id)}">Añadir al calendario</button></div></div>`;
    } else {
      cajaProxima.innerHTML = `<p class="entradilla">Estamos preparando las próximas presentaciones. Consulta la <a href="eventos.html">agenda</a> pronto.</p>`;
    }
  }

  // Detalle del evento: la misma ficha sirve de anuncio y, después, de memoria.
  let dlg;
  const dialogo = (html, clase = "") => {
    if (!dlg) {
      dlg = document.createElement("dialog");
      document.body.append(dlg);
      dlg.addEventListener("click", (e) => { if (e.target === dlg || e.target.closest(".dialogo-cerrar")) dlg.close(); });
    }
    dlg.className = clase;
    dlg.innerHTML = `<button type="button" class="dialogo-cerrar" aria-label="Cerrar">✕</button>${html}`;
    dlg.showModal();
  };
  const abreEvento = (id) => {
    const e = eventos.find((x) => x.id === id); if (!e) return;
    const fotos = (e.fotos || []).map((f) => `<div class="foto"><img src="${esc(f.src)}" alt="${esc(f.alt)}" loading="lazy"></div>`).join("");
    const videos = (e.videos || []).map((v) => `<figure style="margin:0 0 14px">${video(v)}<figcaption class="nota">${esc(v.titulo)}</figcaption></figure>`).join("");
    dialogo(`<div class="dialogo-cuerpo">
      ${e.imagen ? `<div class="foto" style="margin-bottom:18px"><img src="${esc(e.imagen)}" alt=""></div>` : ""}
      ${etiquetas(e)}<h2 style="margin-top:10px">${esc(e.titulo)}</h2>
      <dl class="datos" style="margin-bottom:18px">
        <div><dt>Fecha y hora</dt><dd>${cuandoTexto(e)} (hora de Puerto Rico)</dd></div>
        <div><dt>Lugar</dt><dd>${esc(e.lugar)}</dd></div>
        <div><dt>Acceso</dt><dd>${esc(e.acceso)}</dd></div></dl>
      <p>${esc(e.descripcion)}</p>
      ${e.estado === "realizado" ? `<h3>Memoria de la actividad</h3><p>${esc(e.resena || "Pronto compartiremos la reseña y el material aprobado.")}</p>${videos}${fotos ? `<div class="mosaico">${fotos}</div>` : ""}
        ${fotos ? '<p style="margin-top:16px"><a class="btn btn-oscuro btn-chico" href="galeria.html">Ver la galería completa</a></p>' : ""}` : ""}
      ${e.estado === "proximo" ? `<button type="button" class="btn btn-oro" data-ics="${esc(e.id)}">Añadir al calendario</button>` : ""}
    </div>`);
  };
  const descargaICS = (id) => {
    const e = eventos.find((x) => x.id === id); if (!e) return;
    const z = (f) => f.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const t = (s) => String(s || "").replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");
    const fin = new Date(e.cuando.getTime() + (e.duracionMin || 90) * 60e3);
    const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Rondalla Escolar Jose N Colon Gonzalez//ES", "BEGIN:VEVENT",
      `UID:${e.id}@rondalla-jncg`, `DTSTAMP:${z(new Date())}`, `DTSTART:${z(e.cuando)}`, `DTEND:${z(fin)}`,
      `SUMMARY:${t(e.titulo)} — Rondalla Escolar José N. Colón González`, `LOCATION:${t(e.lugar)}`, `DESCRIPTION:${t(e.descripcion)}`,
      "END:VEVENT", "END:VCALENDAR"].join("\r\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    a.download = `${e.id}.ics`; a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  };
  document.addEventListener("click", (e) => {
    const ev = e.target.closest("[data-evento]"), ic = e.target.closest("[data-ics]");
    if (ic) descargaICS(ic.dataset.ics);
    else if (ev) {
      if (lista) abreEvento(ev.dataset.evento);
      else location.href = `eventos.html#${ev.dataset.evento}`;
    }
  });
  if (lista && location.hash) abreEvento(decodeURIComponent(location.hash.slice(1)));

  /* ---------- Fotografías ---------- */
  const pendiente = (arte, texto = "Fotografía autorizada próximamente") => `<div class="foto"><div class="pendiente">${ARTE[arte]}${texto}</div></div>`;
  const todasFotos = (D.albumes || []).flatMap((a) => a.fotos || []);
  const botonFoto = (f) => `<button type="button" class="foto" data-foto="${esc(f.src)}" data-alt="${esc(f.alt)}"><img src="${esc(f.src)}" alt="${esc(f.alt)}" loading="lazy" decoding="async"></button>`;
  const momentos = $("#momentos");
  if (momentos) {
    const artes = ["cuatro", "guitarra", "percusion", "piano"];
    momentos.innerHTML = artes.map((a, i) => (todasFotos[i] ? botonFoto(todasFotos[i]) : pendiente(a))).join("");
  }
  const cajaAlbumes = $("#albumes");
  if (cajaAlbumes) {
    const albumes = D.albumes || [];
    cajaAlbumes.innerHTML = albumes.length
      ? albumes.map((a) => `<section style="margin-bottom:40px"><div class="cabecera-seccion"><h3 style="margin:0">${esc(a.titulo)}</h3><span class="etiqueta">${esc(a.anio)}</span></div>
          <div class="mosaico">${(a.fotos || []).map(botonFoto).join("")}</div></section>`).join("")
      : `<div class="mosaico">${["cuatro", "guitarra", "piano", "percusion", "guitarra", "cuatro"].map((a) => pendiente(a)).join("")}</div>
         <p class="nota" style="margin-top:16px">Los álbumes se organizarán por actividad y año escolar. Solo publicamos fotografías con autorización de las familias y de la escuela.</p>`;
  }
  document.addEventListener("click", (e) => {
    const f = e.target.closest("[data-foto]"); if (!f) return;
    dialogo(`<img src="${esc(f.dataset.foto)}" alt="${esc(f.dataset.alt)}"><p>${esc(f.dataset.alt)}</p>`, "visor");
  });
  const cajaVideos = $("#videos");
  if (cajaVideos) {
    const v = D.videos || [];
    cajaVideos.innerHTML = v.length
      ? `<div class="rejilla">${v.map((x) => `<figure class="tarjeta" style="margin:0;padding:12px">${video(x)}
          <figcaption style="margin:10px 6px 4px;font-weight:600">${esc(x.titulo)}</figcaption></figure>`).join("")}</div>
         <p class="nota" style="margin-top:16px">Son interpretaciones musicales grabadas en vivo; no contienen diálogos que requieran subtítulos.</p>`
      : `<p class="vacio">Los videos de nuestras presentaciones llegarán pronto, con subtítulos para que todos puedan disfrutarlos.</p>`;
  }
  const cajaNoticias = $("#noticias");
  if (cajaNoticias) {
    const n = [...(D.noticias || [])].sort((a, b) => b.fecha.localeCompare(a.fecha));
    cajaNoticias.innerHTML = n.length
      ? `<div class="rejilla">${n.map((x) => `<article class="tarjeta revela"><p class="antetitulo">${fmt(instante({ fecha: x.fecha, hora: "12:00" }), { day: "numeric", month: "long", year: "numeric" })}</p><h3>${esc(x.titulo)}</h3><p>${esc(x.texto)}</p>
          ${x.imagen ? `<button type="button" class="btn btn-linea btn-chico" data-foto="${esc(x.imagen)}" data-alt="${esc(x.imagenAlt || x.titulo)}">Ver imagen</button>` : ""}</article>`).join("")}</div>`
      : `<p class="vacio">Aquí compartiremos reconocimientos, proyectos y experiencias de la rondalla.</p>`;
  }

  /* ---------- Campaña ---------- */
  const dinero = (n) => new Intl.NumberFormat("es-PR", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
  $$("[data-campana]").forEach((caja) => {
    const c = D.campana; if (!c) { caja.hidden = true; return; }
    const completo = caja.dataset.campana === "completa";
    const hayMeta = typeof c.meta === "number" && c.meta > 0;
    const p = hayMeta ? Math.min(100, Math.round(((c.recaudado || 0) / c.meta) * 100)) : 0;
    const dato = (t, v) => (v ? `<div><dt>${t}</dt><dd>${esc(v)}</dd></div>` : "");
    caja.innerHTML = `
      <p class="antetitulo">Una necesidad concreta</p>
      <h2>${esc(c.titulo)}</h2>
      <p class="entradilla">${esc(c.descripcion)}</p>
      ${hayMeta ? `<div class="progreso" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${p}" aria-label="Avance de la campaña"><i></i></div>
        <p><strong>${dinero(c.recaudado || 0)}</strong> de ${dinero(c.meta)} · ${p}%</p>`
      : `<p class="nota" style="color:#cfc5ad">La meta se publicará cuando esté calculada con costos reales.</p>`}
      ${(c.necesidades || []).length ? `<ul class="necesidades">${c.necesidades.map((n) => `<li><b>${esc(n.nombre)}</b>${esc(n.detalle)}</li>`).join("")}</ul>` : ""}
      <dl class="datos">${dato("Destino de los fondos", c.destino)}
        ${completo ? dato("Fecha límite", c.fechaLimite) + dato("Responsable", c.responsable) + dato("Si sobra dinero", c.siSobra) + dato("Si no se alcanza la meta", c.siNoSeAlcanza) : ""}</dl>
      ${completo ? "" : '<div class="botones" style="margin-top:24px"><a class="btn btn-oro" href="apoyanos.html#donar">Apoyar la rondalla</a><a class="btn btn-linea" href="apoyanos.html#transparencia">Cómo usamos los fondos</a></div>'}`;
    if (hayMeta) requestAnimationFrame(() => setTimeout(() => $(".progreso i", caja).style.setProperty("--p", p + "%"), 200));
  });

  /* ---------- Donación ---------- */
  const fDonar = $("#form-donar");
  if (fDonar) {
    const otro = $("#monto-otro"), resumen = $("#resumen-donacion"), mensual = $('input[value="mensual"]', fDonar);
    if (!C.enlaceDonacionMensual) { mensual.disabled = true; $("#nota-mensual").hidden = false; }
    const monto = () => {
      const v = fDonar.elements.monto.value;
      return v === "otro" ? Math.floor(Number(otro.value)) || 0 : Number(v);
    };
    const refresca = () => {
      $("#campo-otro").hidden = fDonar.elements.monto.value !== "otro";
      const m = monto();
      resumen.textContent = m > 0 ? `Tu aportación: ${dinero(m)} ${fDonar.elements.frecuencia.value === "mensual" ? "cada mes" : "una sola vez"}.` : "Escribe el monto que deseas aportar.";
    };
    fDonar.addEventListener("input", refresca); refresca();
    fDonar.addEventListener("submit", (e) => {
      e.preventDefault();
      if (monto() <= 0) { otro.focus(); return; }
      const url = fDonar.elements.frecuencia.value === "mensual" ? C.enlaceDonacionMensual : C.enlaceDonacion;
      if (url) { location.href = url; return; }
      dialogo(`<div class="dialogo-cuerpo"><h2>¡Gracias por querer apoyar!</h2>
        <p>Los pagos en línea todavía no están activos: la escuela está confirmando la cuenta institucional que recibirá las aportaciones.</p>
        <p>Mientras tanto, escríbenos y te orientamos sobre cómo hacer llegar tu aportación de ${dinero(monto())} o una donación en especie.</p>
        <a class="btn btn-oro" href="contacto.html?tipo=donacion">Escribirnos</a></div>`);
    });
  }

  /* ---------- Auspiciadores ---------- */
  const aus = D.auspiciadores || [];
  const logoAus = (a) => {
    const dentro = a.logo ? `<img src="${esc(a.logo)}" alt="${esc(a.nombre)}" loading="lazy">` : `<strong>${esc(a.nombre)}</strong>`;
    return a.enlace ? `<a class="logo-aus" href="${esc(a.enlace)}" rel="sponsored noopener" target="_blank" title="${esc(a.nombre)} (enlace patrocinado)">${dentro}</a>` : `<div class="logo-aus">${dentro}</div>`;
  };
  const libre = '<a class="logo-aus libre" href="apoyanos.html#auspiciadores">Tu comercio aquí</a>';
  const logosInicio = $("#logos-aus");
  if (logosInicio) logosInicio.innerHTML = aus.length ? aus.slice(0, 8).map(logoAus).join("") : libre.repeat(4);
  const directorio = $("#directorio-aus");
  if (directorio) {
    directorio.innerHTML = aus.length
      ? aus.map((a) => `<article class="tarjeta">${logoAus(a)}<p style="margin-top:14px"><span class="etiqueta">${esc(a.nivel)}</span></p>
          <h3>${esc(a.nombre)}</h3><p class="nota">${esc([a.categoria, a.municipio].filter(Boolean).join(" · "))}</p><p>${esc(a.descripcion)}</p>
          ${a.enlace ? `<p class="nota"><a href="${esc(a.enlace)}" rel="sponsored noopener" target="_blank">Visitar sitio</a> · enlace patrocinado</p>` : ""}</article>`).join("")
      : libre.repeat(3);
  }

  /* ---------- Transparencia ---------- */
  const tabla = $("#tabla-transparencia");
  if (tabla) {
    const t = D.transparencia || [];
    tabla.innerHTML = t.length
      ? `<div class="tabla-caja"><table><thead><tr><th>Periodo</th><th>Concepto</th><th class="num">Recaudado</th><th class="num">Utilizado</th><th>Informe</th></tr></thead><tbody>
          ${t.map((r) => `<tr><td>${esc(r.periodo)}</td><td>${esc(r.concepto)}</td><td class="num">${dinero(r.recaudado)}</td><td class="num">${dinero(r.usado)}</td><td>${r.informe ? `<a href="${esc(r.informe)}">Ver</a>` : "—"}</td></tr>`).join("")}</tbody></table></div>`
      : `<p class="vacio">Aún no hay informes publicados. Cuando comience la recaudación, aquí aparecerá cuánto se recibió y en qué se utilizó.</p>`;
  }

  /* ---------- Contacto ---------- */
  const fContacto = $("#form-contacto");
  if (fContacto) {
    const tipo = fContacto.elements.tipo, campoFecha = $("#campo-fecha"), estado = $("#estado-contacto");
    const pre = new URLSearchParams(location.search).get("tipo");
    if (pre && [...tipo.options].some((o) => o.value === pre)) tipo.value = pre;
    const refresca = () => { campoFecha.hidden = tipo.value !== "invitacion"; };
    tipo.addEventListener("change", refresca); refresca();
    fContacto.addEventListener("submit", (e) => {
      e.preventDefault();
      estado.hidden = false;
      if (!C.correo) {
        estado.textContent = "El correo institucional aún no está configurado, así que tu mensaje no se ha enviado. Por favor, comunícate con la escuela directamente por ahora.";
        return;
      }
      const d = Object.fromEntries(new FormData(fContacto));
      const asunto = `${tipo.selectedOptions[0].text} — ${d.nombre}`;
      const cuerpo = `Nombre: ${d.nombre}\nCorreo: ${d.correo}\nMotivo: ${tipo.selectedOptions[0].text}${d.fecha ? `\nFecha propuesta: ${d.fecha}` : ""}\n\n${d.mensaje}`;
      location.href = `mailto:${C.correo}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
      estado.textContent = "Se abrió tu aplicación de correo con el mensaje listo. Solo falta pulsar «Enviar».";
    });
  }
})();
