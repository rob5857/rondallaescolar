/* ============================================================
   CONTENIDO EDITABLE DEL SITIO
   Aquí se actualizan portada, eventos, campaña, auspiciadores,
   álbumes, videos, noticias e informes.
   ============================================================ */
(() => {
  const F = (n, alt) => ({ src: `assets/fotos/${n}.jpg`, alt });
  const V = (n, titulo) => ({ src: `assets/video/${n}.mp4`, titulo });

  // Fotografías por actividad (se reutilizan en eventos, álbumes y portada)
  const fotosReloj = [
    F("b17", "Estudiantes de la rondalla tocando cuatros y guitarras en la tarima del Reloj de las Flores"),
    F("b06", "La rondalla posa en fila frente al Reloj de las Flores bajo un cielo azul con nubes"),
    F("b20", "Estudiantes en las congas y el pandero durante la presentación"),
    F("b21", "La rondalla tocando en tarima, vista desde el público"),
    F("b22", "Fila de estudiantes concentrados tocando el cuatro frente a sus atriles"),
    F("b04", "La rondalla saluda desde la tarima con sus instrumentos"),
    F("b14", "Vista general de la carpa y la tarima durante la presentación"),
    F("b16", "La rondalla en tarima vista de lado, con congas y cuatros"),
    F("b11", "Estudiante tocando la guitarra junto al teclado"),
    F("b12", "Estudiante tocando las congas frente al micrófono"),
    F("b09", "Sección de percusión y guitarras durante la presentación"),
    F("b19", "Percusión de la rondalla: congas y güiro"),
    F("b24", "Guitarras y congas vistas desde la tarima"),
    F("b01", "La rondalla y su director posan en una escalera de madera entre jardines"),
    F("b23", "Foto de grupo de la rondalla en la escalera del jardín"),
    F("b03", "Estudiantes de la rondalla sonríen frente a un jardín vertical"),
    F("b18", "La rondalla en fila frente al Reloj de las Flores"),
    F("b07", "Estudiantes de la rondalla frente a los jardines del Reloj de las Flores"),
    F("b02", "La rondalla posa con invitados en la escalera del jardín"),
    F("b05", "Afiche: «¡Hoy comienzan grandes historias!» La Rondalla Escolar hace su primera presentación en el Reloj de las Flores de Puerto Rico")
  ];
  const fotosMusica = [
    F("a04", "La rondalla tocando sentada frente a un arco de globos negros y dorados en la cancha de la escuela"),
    F("a02", "Estudiantes con cuatros y guitarras durante la presentación en la escuela"),
    F("a06", "La rondalla de pie saluda al público al terminar su presentación"),
    F("a07", "La rondalla de pie frente al arco de globos y la bandera de Puerto Rico"),
    F("a05", "Vista amplia de la cancha escolar con la rondalla tocando"),
    F("a03", "El director se dirige al público junto a la bandera de Puerto Rico")
  ];
  const videosReloj = [
    V("b02", "En tarima en el Reloj de las Flores"),
    V("b01", "Reloj de las Flores · vista general"),
    V("b03", "Reloj de las Flores · otra pieza"),
    V("b04", "Música entre amigos después de la presentación")
  ];
  const videosMusica = [
    V("a01", "Día Internacional de la Música · pieza 1"),
    V("a02", "Día Internacional de la Música · pieza 2"),
    V("a03", "Día Internacional de la Música · pieza 3"),
    V("a07", "Día Internacional de la Música · pieza 4"),
    V("a08", "Día Internacional de la Música · pieza 5"),
    V("a04", "Día Internacional de la Música · de cerca"),
    V("a05", "Día Internacional de la Música · momento breve"),
    V("a06", "Día Internacional de la Música · saludo final")
  ];

  window.RONDALLA = {

    config: {
      // Muestra la franja "Versión preliminar". Cambiar a false al publicar.
      borrador: true,
      // Correo institucional que recibirá los mensajes del formulario.
      correo: "",
      // Enlace de pago seguro (Stripe Payment Link o botón de PayPal). Vacío = cobros inactivos.
      enlaceDonacion: "",
      // Enlace para aportación mensual. Vacío = "próximamente".
      enlaceDonacionMensual: "",
      // Video destacado de la portada (se reproduce solo cuando el visitante pulsa).
      videoDestacado: { src: "assets/video/b02.mp4", titulo: "En tarima en el Reloj de las Flores de Puerto Rico", descripcion: "3 de octubre de 2026" },
      // Fotos del slider de la portada, en orden. La primera es la que se ve al entrar.
      heroFotos: [
        F("portada", "La Rondalla Escolar JNCG en tarima, con arco de globos negros y dorados"),
        fotosReloj[0], fotosMusica[0], fotosReloj[1], fotosReloj[2], fotosReloj[3]
      ]
    },

    /* EVENTOS
       estado: "proximo" | "realizado" | "pospuesto" | "cancelado"
       fecha: AAAA-MM-DD · hora: HH:MM (hora de Puerto Rico; puede quedar vacía)
       Tras la actividad: cambiar estado a "realizado" y añadir "resena", "fotos" y "videos". */
    eventos: [
      {
        id: "parranda-navidena",
        titulo: "Parranda Navideña Escolar",
        fecha: "2026-12-17", hora: "08:00", duracionMin: 240,
        lugar: "Comunidad de Barranquitas",
        acceso: "Recorrido por la comunidad",
        estado: "proximo",
        descripcion: "La rondalla lleva la alegría navideña con su tradicional parranda a distintos puntos representativos de Barranquitas.",
        imagen: "", resena: "", fotos: [], videos: []
      },
      {
        id: "reloj-de-las-flores",
        titulo: "Primera presentación en el Reloj de las Flores",
        fecha: "2026-10-03", hora: "", duracionMin: 90,
        lugar: "Reloj de las Flores de Puerto Rico",
        acceso: "Abierto al público",
        estado: "realizado",
        descripcion: "«¡Hoy comienzan grandes historias!» La Rondalla Escolar hizo su primera presentación en el Reloj de las Flores de Puerto Rico.",
        imagen: "assets/fotos/b06.jpg",
        resena: "Con disciplina, unión y pasión por la música, nuestros estudiantes subieron a la tarima del Reloj de las Flores. Fue la primera de muchas presentaciones y un paso más en el camino de sus sueños.",
        fotos: fotosReloj.slice(0, 8), videos: videosReloj.slice(0, 2)
      },
      {
        id: "dia-internacional-musica",
        titulo: "Día Internacional de la Música: presentación oficial",
        fecha: "2026-10-01", hora: "", duracionMin: 90,
        lugar: "Escuela S.U. José N. Colón González",
        acceso: "Comunidad escolar",
        estado: "realizado",
        descripcion: "Celebración del Día Internacional de la Música y presentación oficial de la Rondalla Escolar JNCG ante la comunidad escolar.",
        imagen: "assets/fotos/a04.jpg",
        resena: "La rondalla se presentó oficialmente ante su comunidad escolar. El Comité Timón agradeció a las familias su aportación, colaboración y compromiso para hacer posible la actividad.",
        fotos: fotosMusica, videos: videosMusica.slice(0, 2)
      }
    ],

    /* CAMPAÑA ACTIVA
       meta y recaudado en dólares. Dejar en null hasta tener costos reales:
       el sitio no mostrará cifras ni barra de progreso mientras tanto. */
    campana: {
      titulo: "Lo que la rondalla necesita para seguir sonando",
      descripcion: "Cada presentación tiene gastos detrás. Tu aportación ayuda a cubrir lo que la rondalla y sus integrantes necesitan para ensayar, viajar y presentarse.",
      // Lista de necesidades que se muestra en la portada y en Apóyanos.
      necesidades: [
        { nombre: "Instrumentos", detalle: "Cuerdas nuevas, reparaciones, mantenimiento y estuches." },
        { nombre: "Transportación", detalle: "Traslado de los integrantes y los instrumentos a las presentaciones." },
        { nombre: "Sonido", detalle: "Equipo y servicio de sonido para ensayos y actividades." },
        { nombre: "Meriendas", detalle: "Meriendas para los integrantes en ensayos y presentaciones." },
        { nombre: "Uniformes y camisas", detalle: "Uniforme y camisas oficiales de la rondalla." },
        { nombre: "Otras necesidades", detalle: "Cualquier otra necesidad de la rondalla y de sus integrantes." }
      ],
      meta: null,
      recaudado: null,
      fechaLimite: "",
      responsable: "",
      destino: "Instrumentos, transportación, sonido, meriendas, uniformes y camisas, y otras necesidades de la rondalla y sus integrantes.",
      siSobra: "Por definir junto a la escuela antes de abrir la campaña.",
      siNoSeAlcanza: "Por definir junto a la escuela antes de abrir la campaña."
    },

    /* AUSPICIADORES aprobados por la escuela.
       { nombre, nivel: "Oro"|"Plata"|"Bronce"|"Amigo"|"En especie", logo: "assets/auspiciadores/x.png",
         promo: "anuncio que se abre grande al tocar la ficha", promoAlt: "descripción del anuncio",
         categoria, municipio, descripcion, enlace } */
    auspiciadores: [
      {
        nombre: "Desarrollos Industriales",
        nivel: "Oro",
        promo: "assets/auspiciadores/desarrollos-industriales.jpg",
        promoAlt: "Anuncio de Desarrollos Industriales: equipo de emergencia para restaurar daños por incendio, humo e inundaciones. Servicio de emergencia 24/7. Teléfono +1 (973) 392-0478. Página web desarrollosindustrialespr.com",
        categoria: "Restauración de daños por incendio, humo e inundaciones",
        municipio: "",
        descripcion: "Equipo de emergencia para restaurar propiedades afectadas por incendio, humo e inundaciones.",
        enlace: "https://www.desarrollosindustrialespr.com/"
      }
    ],

    /* ÁLBUMES. Solo material con autorización. */
    albumes: [
      { titulo: "Reloj de las Flores de Puerto Rico · 3 de octubre de 2026", anio: "2026-2027", fotos: fotosReloj },
      { titulo: "Día Internacional de la Música · 1 de octubre de 2026", anio: "2026-2027", fotos: fotosMusica }
    ],

    /* VIDEOS. { titulo, src, subtitulos: "archivo .vtt opcional" } */
    videos: [...videosReloj, ...videosMusica],

    /* NOTICIAS Y LOGROS. { fecha: "AAAA-MM-DD", titulo, texto, imagen, imagenAlt } */
    noticias: [
      {
        fecha: "2026-10-03",
        titulo: "¡Hoy comienzan grandes historias!",
        texto: "La Rondalla Escolar hizo su primera presentación en el Reloj de las Flores de Puerto Rico. Música, amistad y futuro.",
        imagen: "assets/fotos/b05.jpg",
        imagenAlt: "Afiche de la primera presentación de la Rondalla Escolar en el Reloj de las Flores de Puerto Rico"
      },
      {
        fecha: "2026-10-01",
        titulo: "Carta de agradecimiento a nuestras familias",
        texto: "Tras la presentación oficial de la rondalla en el Día Internacional de la Música, el Comité Timón agradeció a padres, madres y encargados por decir presente y apoyar los sueños y talentos de los estudiantes.",
        imagen: "assets/fotos/a01.jpg",
        imagenAlt: "Carta de agradecimiento del Comité Timón a los padres, madres y encargados de la Rondalla Escolar JNCG"
      }
    ],

    /* TRANSPARENCIA. { periodo, concepto, recaudado, usado, informe: "enlace opcional" } */
    transparencia: []
  };
})();
