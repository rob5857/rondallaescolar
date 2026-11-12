/* Panel de campaña: edita la meta y las aportaciones, las guarda en este
   dispositivo y genera el archivo js/campana.js para publicar. */
(() => {
  "use strict";
  const CLAVE = "rondalla-campana";
  const $ = (s) => document.querySelector(s);
  const esc = (t) => String(t ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const dinero = (n) => new Intl.NumberFormat("es-PR", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(n);
  const hoy = () => new Intl.DateTimeFormat("en-CA", { timeZone: "America/Puerto_Rico" }).format(new Date());
  const copia = (o) => JSON.parse(JSON.stringify(o));

  const publicado = window.RONDALLA_CAMPANA || { nombre: "", fecha: "", meta: 0, donaciones: [], actualizado: "" };
  let almacen = true, datos = copia(publicado);
  try {
    const local = JSON.parse(localStorage.getItem(CLAVE));
    if (local && String(local.actualizado) > String(publicado.actualizado)) datos = local;
  } catch { almacen = false; }
  datos.donaciones = datos.donaciones || [];

  const hayCambios = () => String(datos.actualizado) !== String(publicado.actualizado);
  const guarda = () => {
    datos.actualizado = new Date().toISOString();
    try { localStorage.setItem(CLAVE, JSON.stringify(datos)); } catch { almacen = false; }
    pinta();
  };
  const archivo = () => `/* CAMPAÑA ACTIVA: meta y aportaciones de la cartelera de Apóyanos.
   No hace falta editar este archivo a mano: abre panel.html, cambia la meta
   o registra aportaciones, descarga el archivo nuevo y reemplaza este. */
window.RONDALLA_CAMPANA = ${JSON.stringify(datos, null, 2)};
`;

  const pinta = () => {
    const meta = Number(datos.meta) || 0;
    const rec = datos.donaciones.reduce((s, d) => s + Number(d.monto), 0);
    const p = meta > 0 ? Math.min(100, Math.round((rec / meta) * 100)) : 0;
    $("#panel-cifras").innerHTML = `
      <div><b>${dinero(meta)}</b>Meta</div>
      <div><b>${dinero(rec)}</b>Recaudado</div>
      <div><b>${dinero(Math.max(0, meta - rec))}</b>Falta</div>
      <div><b>${p}%</b>Completado</div>
      <div><b>${datos.donaciones.length}</b>Aportaciones</div>`;
    $("#panel-lista").innerHTML = datos.donaciones.length
      ? `<div class="tabla-caja"><table><thead><tr><th>Fecha</th><th>Nombre público</th><th class="num">Monto</th><th><span class="sr">Acciones</span></th></tr></thead><tbody>
          ${datos.donaciones.map((d, i) => `<tr><td>${esc(d.fecha || "—")}</td><td>${esc(d.nombre || "Aportación anónima")}</td><td class="num">${dinero(Number(d.monto))}</td>
            <td><button type="button" class="btn-borrar" data-borrar="${i}" aria-label="Borrar la aportación de ${dinero(Number(d.monto))}">Borrar</button></td></tr>`).join("")}
        </tbody></table></div>`
      : '<p class="vacio">Todavía no hay aportaciones registradas.</p>';
    $("#panel-estado").textContent = !almacen
      ? "Este navegador no permite guardar en el dispositivo. Descarga el archivo antes de cerrar la página."
      : hayCambios()
        ? "Tienes cambios guardados solo en este dispositivo. El público no los verá hasta que subas el archivo a GitHub."
        : "Sin cambios pendientes: esto es lo que está publicado.";
  };

  const llena = () => {
    $("#p-nombre").value = datos.nombre || "";
    $("#p-meta").value = datos.meta || "";
    $("#p-fecha").value = datos.fecha || "";
    $("#a-fecha").value = hoy();
  };

  $("#form-meta").addEventListener("submit", (e) => e.preventDefault());
  $("#form-meta").addEventListener("input", () => {
    const meta = Math.round(Number($("#p-meta").value) * 100) / 100;
    datos.nombre = $("#p-nombre").value.trim();
    datos.fecha = $("#p-fecha").value;
    if (meta > 0) datos.meta = meta;
    guarda();
  });

  $("#form-aporte").addEventListener("submit", (e) => {
    e.preventDefault();
    const campo = $("#a-monto"), monto = Math.round(Number(campo.value) * 100) / 100;
    if (!(monto > 0)) { campo.focus(); return; }
    datos.donaciones.push({ fecha: $("#a-fecha").value || hoy(), monto, nombre: $("#a-nombre").value.trim() });
    campo.value = ""; $("#a-nombre").value = "";
    guarda(); campo.focus();
  });

  $("#panel-lista").addEventListener("click", (e) => {
    const b = e.target.closest("[data-borrar]"); if (!b) return;
    const d = datos.donaciones[Number(b.dataset.borrar)];
    if (!confirm(`¿Borrar la aportación de ${dinero(Number(d.monto))}?`)) return;
    datos.donaciones.splice(Number(b.dataset.borrar), 1);
    guarda();
  });

  $("#btn-descargar").addEventListener("click", () => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([archivo()], { type: "text/javascript" }));
    a.download = "campana.js";
    document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  });

  $("#btn-copiar").addEventListener("click", async (e) => {
    const b = e.currentTarget;
    try { await navigator.clipboard.writeText(archivo()); b.textContent = "Copiado ✓"; }
    catch { b.textContent = "No se pudo copiar"; }
    setTimeout(() => (b.textContent = "Copiar el contenido"), 2000);
  });

  $("#btn-restablecer").addEventListener("click", () => {
    if (!hayCambios() || !confirm("¿Descartar los cambios guardados en este dispositivo y volver a lo publicado?")) return;
    try { localStorage.removeItem(CLAVE); } catch { /* nada que borrar */ }
    datos = copia(publicado); datos.donaciones = datos.donaciones || [];
    llena(); pinta();
  });

  llena(); pinta();

  /* Acceso de demostración. La contraseña está a la vista en este archivo:
     sirve para mostrar el funcionamiento, no como seguridad real. */
  const CLAVE_DEMO = "jncg2026", SESION = "rondalla-panel";
  const dentro = () => { try { return sessionStorage.getItem(SESION) === "1"; } catch { return false; } };
  const muestra = (ok) => { $("#panel-acceso").hidden = ok; $("#panel-contenido").hidden = !ok; };
  muestra(dentro());
  $("#form-acceso").addEventListener("submit", (e) => {
    e.preventDefault();
    const campo = $("#clave"), ok = campo.value === CLAVE_DEMO;
    $("#clave-error").hidden = ok;
    if (!ok) { campo.select(); return; }
    try { sessionStorage.setItem(SESION, "1"); } catch { /* sin almacenamiento */ }
    campo.value = ""; muestra(true);
  });
  $("#btn-salir").addEventListener("click", () => {
    try { sessionStorage.removeItem(SESION); } catch { /* nada */ }
    muestra(false); $("#clave").focus();
  });
})();
