/* ==========================================================================
   Maqueta.js
   Maqueta Modelo-Generico — v1.0

   Render, navegación y cambio de estados de las tres superficies.
   Toda la información que se dibuja proviene de `DatosMaqueta`
   (assets/js/Datos-Maqueta.js). Este archivo no contiene datos de ejemplo.

   Cada superficie se identifica con `data-superficie` en el <body>:
   `listado`, `detalle` o `configuracion`.
   ========================================================================== */

(function (D) {
  'use strict';

  if (!D) {
    return;
  }

  /* ======================================================================
     1. Utilidades
     ====================================================================== */

  function $(selector, raiz) {
    return (raiz || document).querySelector(selector);
  }

  function $$(selector, raiz) {
    return Array.prototype.slice.call((raiz || document).querySelectorAll(selector));
  }

  function crear(etiqueta, clase, texto) {
    var nodo = document.createElement(etiqueta);
    if (clase) { nodo.className = clase; }
    if (texto !== undefined && texto !== null) { nodo.textContent = String(texto); }
    return nodo;
  }

  function vaciar(nodo) {
    while (nodo && nodo.firstChild) {
      nodo.removeChild(nodo.firstChild);
    }
  }

  /* ======================================================================
     2. Iconografía: SVG inline con currentColor
     Trazo 1.75px, grilla de 24px, una sola familia. Sin raster y sin packs
     de íconos por CDN. Los íconos decorativos van con aria-hidden.
     ====================================================================== */

  var TRAZOS = {
    cubo: '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z"/><path d="M4 7.5l8 4.5 8-4.5"/><path d="M12 12v9"/>',
    listado: '<path d="M8 6h12"/><path d="M8 12h12"/><path d="M8 18h12"/><path d="M4 6h.01"/><path d="M4 12h.01"/><path d="M4 18h.01"/>',
    detalle: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5z"/><path d="M14 3v5h5"/><path d="M9 13h6"/><path d="M9 17h4"/>',
    configuracion: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
    lupa: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
    editar: '<path d="M4 20h4L19 9a2.1 2.1 0 0 0-3-3L5 17v3z"/><path d="M14.5 6.5l3 3"/>',
    eliminar: '<path d="M4 7h16"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/><path d="M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 8h.01"/>',
    alerta: '<path d="M12 4l9 16H3l9-16z"/><path d="M12 10v4"/><path d="M12 17h.01"/>',
    flecha: '<path d="M15 6l-6 6 6 6"/>',
    chevron: '<path d="M6 9l6 6 6-6"/>',
    guardar: '<path d="M5 5h11l3 3v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"/><path d="M8 5v5h7V5"/><path d="M8 19v-5h8v5"/>',
    mas: '<path d="M12 5v14"/><path d="M5 12h14"/>',
    reintentar: '<path d="M20 11a8 8 0 1 0-2.3 5.6"/><path d="M20 5v6h-6"/>',
    ojo: '<path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6z"/><circle cx="12" cy="12" r="3"/>'
  };

  /**
   * Devuelve el markup de un ícono SVG inline.
   * @param {string} nombre Clave del trazo en TRAZOS.
   * @param {number} tamanio Lado en px (24 navegación, 20 tarjeta, 16 inline, 15 fila).
   * @param {string} titulo Si se pasa, el ícono es significativo (role="img" + <title>);
   *                        si se omite, es decorativo (aria-hidden).
   */
  function icono(nombre, tamanio, titulo) {
    var lado = tamanio || 16;
    var semantica = titulo
      ? 'role="img"><title>' + escapar(titulo) + '</title>'
      : 'aria-hidden="true" focusable="false">';
    return '<svg xmlns="http://www.w3.org/2000/svg" width="' + lado + '" height="' + lado +
      '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" ' +
      'stroke-linecap="round" stroke-linejoin="round" ' + semantica +
      (TRAZOS[nombre] || '') + '</svg>';
  }

  function escapar(texto) {
    return String(texto).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  /* Ilustración monocroma para el estado vacío. No porta información crítica:
     el texto que la acompaña dice lo mismo. */
  function ilustracionVacio() {
    return '<svg class="mq-estado-vacio__ilustracion" viewBox="0 0 96 96" fill="none" ' +
      'stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ' +
      'aria-hidden="true" focusable="false">' +
      '<rect x="14" y="26" width="68" height="48" rx="8"/>' +
      '<path d="M14 40h68"/><path d="M28 33h.01"/><path d="M36 33h.01"/>' +
      '<path d="M32 56h32"/><path d="M38 64h20"/>' +
      '</svg>';
  }

  /* ======================================================================
     3. Barra de validación de maqueta
     Es un elemento de la maqueta, NO del producto final. Permite al validador
     humano alternar los cuatro estados obligatorios sin recargar la página.
     ====================================================================== */

  var estadoActual = 'datos';
  var suscriptores = [];

  function alCambiarEstado(callback) {
    suscriptores.push(callback);
  }

  function fijarEstado(clave) {
    estadoActual = clave;
    /* Se acota a los botones con data-estado: la barra tiene además el
       interruptor de recarga automática, que comparte estilo pero no es
       un botón de estado y no debe reescribirse acá. */
    $$('.mq-boton-estado[data-estado]').forEach(function (boton) {
      boton.setAttribute('aria-pressed', String(boton.dataset.estado === clave));
    });
    suscriptores.forEach(function (cb) { cb(clave); });
  }

  function montarBarraDeValidacion() {
    var contenedor = $('[data-barra-validacion]');
    if (!contenedor) { return; }

    var aviso = crear('p', 'mq-barra-validacion__aviso');
    aviso.innerHTML = icono('alerta', 16) +
      '<span>Barra de validación de maqueta — no forma parte del producto</span>';

    var controles = crear('div', 'mq-barra-validacion__controles');
    controles.setAttribute('role', 'group');
    controles.setAttribute('aria-label', 'Estado de la superficie');

    var etiqueta = crear('span', 'mq-barra-validacion__etiqueta', 'Estado de la superficie:');
    controles.appendChild(etiqueta);

    D.estadosDeSuperficie.forEach(function (estado) {
      var boton = crear('button', 'mq-boton-estado', estado.etiqueta);
      boton.type = 'button';
      boton.dataset.estado = estado.clave;
      boton.setAttribute('aria-pressed', String(estado.clave === estadoActual));
      boton.addEventListener('click', function () { fijarEstado(estado.clave); });
      controles.appendChild(boton);
    });

    contenedor.appendChild(aviso);
    contenedor.appendChild(controles);
    contenedor.appendChild(construirRecargaAutomatica());
  }

  /* ----------------------------------------------------------------------
     Recarga automática. Instrumento de la maqueta, no del producto.
     Consulta periódicamente los recursos de la maqueta y refresca la página
     cuando alguno cambió, para que quien corrige a mano vea el efecto sin
     refrescar. Apagada por defecto; su estado se persiste en el navegador.
     Sobre file:// las consultas no funcionan, así que se deshabilita con su
     razón visible en vez de fallar en silencio.
     ---------------------------------------------------------------------- */

  var CLAVE_RECARGA = 'maqueta.recargaAutomatica';
  var INTERVALO_RECARGA_MS = 3000;
  var RECURSOS_VIGILADOS = [
    'assets/css/Estilos-Maqueta.css',
    'assets/js/Datos-Maqueta.js',
    'assets/js/Maqueta.js'
  ];

  var temporizadorRecarga = null;
  var huellasIniciales = null;

  function soportaRecarga() {
    return window.location.protocol !== 'file:';
  }

  function leerPreferenciaRecarga() {
    try {
      return window.localStorage.getItem(CLAVE_RECARGA) === 'true';
    } catch (e) {
      return false;
    }
  }

  function guardarPreferenciaRecarga(valor) {
    try {
      window.localStorage.setItem(CLAVE_RECARGA, String(valor));
    } catch (e) {
      /* almacenamiento no disponible: la preferencia dura lo que la pestaña */
    }
  }

  function huellaDe(recurso) {
    var url = recurso + '?sonda=' + encodeURIComponent(String(contadorSonda));
    return fetch(url, { method: 'HEAD', cache: 'no-store' }).then(function (respuesta) {
      if (!respuesta.ok) { return null; }
      return (respuesta.headers.get('etag') || '') + '|' +
             (respuesta.headers.get('last-modified') || '') + '|' +
             (respuesta.headers.get('content-length') || '');
    }).catch(function () { return null; });
  }

  var contadorSonda = 0;

  function tomarHuellas() {
    contadorSonda += 1;
    return Promise.all(RECURSOS_VIGILADOS.map(huellaDe));
  }

  function sondear() {
    if (document.hidden) { return; }
    tomarHuellas().then(function (actuales) {
      if (!huellasIniciales) { huellasIniciales = actuales; return; }
      var cambio = actuales.some(function (huella, i) {
        return huella !== null && huellasIniciales[i] !== null && huella !== huellasIniciales[i];
      });
      if (cambio) { window.location.reload(); }
    });
  }

  function fijarRecargaAutomatica(activa, interruptor) {
    interruptor.setAttribute('aria-pressed', String(activa));
    guardarPreferenciaRecarga(activa);

    if (temporizadorRecarga) {
      window.clearInterval(temporizadorRecarga);
      temporizadorRecarga = null;
    }
    huellasIniciales = null;

    if (activa) {
      tomarHuellas().then(function (iniciales) { huellasIniciales = iniciales; });
      temporizadorRecarga = window.setInterval(sondear, INTERVALO_RECARGA_MS);
    }
  }

  function construirRecargaAutomatica() {
    var grupo = crear('div', 'mq-barra-validacion__controles');
    grupo.appendChild(crear('span', 'mq-barra-validacion__etiqueta', 'Recarga automática:'));

    var interruptor = crear('button', 'mq-boton-estado');
    interruptor.type = 'button';
    interruptor.innerHTML = icono('reintentar', 14) + '<span>Al guardar</span>';

    if (!soportaRecarga()) {
      interruptor.disabled = true;
      interruptor.setAttribute('aria-pressed', 'false');
      grupo.appendChild(interruptor);
      grupo.appendChild(crear('span', 'mq-caption',
        'No disponible al abrir el archivo directo. Servila desde el editor o con un servidor local.'));
      return grupo;
    }

    var activa = leerPreferenciaRecarga();
    interruptor.addEventListener('click', function () {
      activa = !activa;
      fijarRecargaAutomatica(activa, interruptor);
    });
    grupo.appendChild(interruptor);
    fijarRecargaAutomatica(activa, interruptor);
    return grupo;
  }

  /* ======================================================================
     4. Piezas de estado compartidas por las tres superficies
     ====================================================================== */

  function renderVacio(destino, alReintentar) {
    var textos = D.textosDeEstado.vacio;
    var bloque = crear('div', 'mq-estado-vacio');
    bloque.innerHTML = ilustracionVacio();
    bloque.appendChild(crear('h3', 'mq-titulo', textos.titulo));
    bloque.appendChild(crear('p', 'mq-caption', textos.detalle));

    var accion = crear('button', 'mq-boton mq-boton--primario');
    accion.type = 'button';
    accion.innerHTML = icono('mas', 16) + '<span>' + escapar(textos.accion) + '</span>';
    accion.addEventListener('click', function () { fijarEstado('datos'); });
    bloque.appendChild(accion);

    destino.appendChild(bloque);
    if (alReintentar) { alReintentar(); }
  }

  function renderCargando(destino, filas) {
    var textos = D.textosDeEstado.cargando;
    var bloque = crear('div', 'mq-pila');
    bloque.appendChild(crear('p', 'mq-caption', textos.detalle));

    var cantidad = filas || 4;
    for (var i = 0; i < cantidad; i += 1) {
      bloque.appendChild(crear('div', 'mq-skeleton mq-skeleton--fila'));
    }
    destino.appendChild(bloque);
  }

  function renderError(destino) {
    var textos = D.textosDeEstado.error;
    var bloque = crear('div', 'mq-estado-error');

    var banner = crear('div', 'mq-estado-error__banner');
    banner.innerHTML = icono('alerta', 20);
    var cuerpo = crear('div');
    cuerpo.appendChild(crear('p', 'mq-body-strong', textos.titulo));
    cuerpo.appendChild(crear('p', 'mq-caption', textos.detalle));
    banner.appendChild(cuerpo);
    bloque.appendChild(banner);

    var accion = crear('button', 'mq-boton mq-boton--secundario');
    accion.type = 'button';
    accion.innerHTML = icono('reintentar', 16) + '<span>' + escapar(textos.accion) + '</span>';
    accion.addEventListener('click', function () { fijarEstado('cargando'); });
    bloque.appendChild(accion);

    destino.appendChild(bloque);
  }

  function varianteDeEstado(valor) {
    var encontrado = D.estados.filter(function (e) { return e.valor === valor; })[0];
    return encontrado ? encontrado.variante : 'neutro';
  }

  function badgeDeEstado(valor) {
    var clase = 'mq-badge';
    var variante = varianteDeEstado(valor);
    if (variante !== 'neutro') { clase += ' mq-badge--' + variante; }
    return '<span class="' + clase + '">' + escapar(valor) + '</span>';
  }

  function iniciales(nombre) {
    return String(nombre).replace(/[^0-9]/g, '').slice(-2) || 'EL';
  }

  /* ======================================================================
     5. Superficie: listado principal (index.html)
     Patrón ABM — grilla de listado, con búsqueda y filtros.
     ====================================================================== */

  function montarListado() {
    var destino = $('[data-region-listado]');
    var anuncio = $('[data-anuncio-estado]');
    var resumen = $('[data-region-resumen]');
    if (!destino) { return; }

    var filtros = { texto: '', categoria: '', estado: '' };

    montarFiltros(filtros, function () { pintar(estadoActual); });
    montarResumen(resumen);

    function elementosFiltrados() {
      return D.elementos.filter(function (elemento) {
        var coincideTexto = !filtros.texto ||
          (elemento.codigo + ' ' + elemento.nombre).toLowerCase().indexOf(filtros.texto.toLowerCase()) !== -1;
        var coincideCategoria = !filtros.categoria || elemento.categoria === filtros.categoria;
        var coincideEstado = !filtros.estado || elemento.estado === filtros.estado;
        return coincideTexto && coincideCategoria && coincideEstado;
      });
    }

    function pintar(estado) {
      vaciar(destino);
      if (estado === 'vacio') {
        renderVacio(destino);
        anunciar(anuncio, D.textosDeEstado.vacio.titulo);
        return;
      }
      if (estado === 'cargando') {
        renderCargando(destino, 5);
        anunciar(anuncio, D.textosDeEstado.cargando.detalle);
        return;
      }
      if (estado === 'error') {
        renderError(destino);
        anunciar(anuncio, D.textosDeEstado.error.titulo);
        return;
      }

      var filas = elementosFiltrados();
      if (filas.length === 0) {
        // La búsqueda que no encuentra nada resuelve en estado vacío con acción.
        renderVacio(destino);
        anunciar(anuncio, 'La búsqueda no devolvió elementos.');
        return;
      }

      destino.appendChild(construirTabla(filas));
      anunciar(anuncio, 'Se muestran ' + filas.length + ' elementos de ' + D.elementos.length + '.');
    }

    alCambiarEstado(pintar);
    pintar(estadoActual);
  }

  function construirTabla(filas) {
    var envoltorio = crear('div', 'mq-tabla-envoltorio mq-tarjeta');
    var tabla = crear('table', 'mq-tabla');

    var caption = crear('caption', 'mq-sr-only',
      'Listado de elementos del modelo ' + D.modelo.nombre);
    tabla.appendChild(caption);

    var thead = crear('thead');
    var filaCabecera = crear('tr');
    var thEntidad = crear('th', null, D.modelo.entidad);
    thEntidad.scope = 'col';
    filaCabecera.appendChild(thEntidad);
    D.contratoDeCampos
      .filter(function (c) { return c.campo !== 'nombre' && c.campo !== 'codigo'; })
      .forEach(function (campo) {
        var th = crear('th', null, campo.etiqueta);
        th.scope = 'col';
        filaCabecera.appendChild(th);
      });
    var thAcciones = crear('th', 'mq-tabla__acciones', 'Acciones');
    thAcciones.scope = 'col';
    filaCabecera.appendChild(thAcciones);
    thead.appendChild(filaCabecera);
    tabla.appendChild(thead);

    var tbody = crear('tbody');
    filas.forEach(function (elemento) {
      var tr = crear('tr');

      var tdEntidad = crear('td');
      tdEntidad.innerHTML =
        '<div class="mq-fila-acciones" style="align-items:center">' +
        '<span class="mq-avatar" aria-hidden="true">' + escapar(iniciales(elemento.codigo)) + '</span>' +
        '<span><a class="mq-tabla__nombre" href="Detalle.html?codigo=' + encodeURIComponent(elemento.codigo) + '">' +
        escapar(elemento.nombre) + '</a>' +
        '<span class="mq-meta" style="display:block">' + escapar(elemento.codigo) + '</span></span>' +
        '</div>';
      tr.appendChild(tdEntidad);

      tr.appendChild(crear('td', null, elemento.categoria));

      var tdEstado = crear('td');
      tdEstado.innerHTML = badgeDeEstado(elemento.estado);
      tr.appendChild(tdEstado);

      tr.appendChild(crear('td', 'mq-numerico', elemento.cantidad));
      tr.appendChild(crear('td', 'mq-numerico', elemento.fechaActualizacion));

      var tdAcciones = crear('td', 'mq-tabla__acciones');
      tdAcciones.innerHTML =
        '<a class="mq-icon-boton" href="Detalle.html?codigo=' + encodeURIComponent(elemento.codigo) +
        '" aria-label="Ver el detalle de ' + escapar(elemento.nombre) + '">' + icono('ojo', 15) + '</a> ' +
        '<button type="button" class="mq-icon-boton" aria-label="Editar ' + escapar(elemento.nombre) + '">' +
        icono('editar', 15) + '</button> ' +
        '<button type="button" class="mq-icon-boton mq-icon-boton--peligro" aria-label="Eliminar ' +
        escapar(elemento.nombre) + '">' + icono('eliminar', 15) + '</button>';
      tr.appendChild(tdAcciones);

      tbody.appendChild(tr);
    });
    tabla.appendChild(tbody);

    envoltorio.appendChild(tabla);
    return envoltorio;
  }

  function montarFiltros(filtros, alCambiar) {
    var destino = $('[data-region-filtros]');
    if (!destino) { return; }

    var busqueda = crear('div', 'mq-busqueda');
    busqueda.innerHTML =
      '<label class="mq-etiqueta" for="mq-busqueda">Buscar por código o nombre</label>' +
      '<span class="mq-busqueda__icono">' + icono('lupa', 16) + '</span>' +
      '<input class="mq-input" type="search" id="mq-busqueda" placeholder="ELM-001">';
    destino.appendChild(busqueda);
    $('#mq-busqueda', busqueda).addEventListener('input', function (ev) {
      filtros.texto = ev.target.value;
      alCambiar();
    });

    destino.appendChild(selectDeFiltro('mq-filtro-categoria', 'Categoría', D.categorias,
      function (valor) { filtros.categoria = valor; alCambiar(); }));

    destino.appendChild(selectDeFiltro('mq-filtro-estado', 'Estado',
      D.estados.map(function (e) { return e.valor; }),
      function (valor) { filtros.estado = valor; alCambiar(); }));
  }

  function selectDeFiltro(id, etiqueta, opciones, alCambiar) {
    var bloque = crear('div');
    bloque.style.flex = '0 1 180px';

    var label = crear('label', 'mq-etiqueta', etiqueta);
    label.setAttribute('for', id);

    var select = crear('select', 'mq-select');
    select.id = id;
    select.appendChild(new Option('Todas las opciones', ''));
    opciones.forEach(function (opcion) {
      select.appendChild(new Option(opcion, opcion));
    });
    select.addEventListener('change', function (ev) { alCambiar(ev.target.value); });

    bloque.appendChild(label);
    bloque.appendChild(select);
    return bloque;
  }

  /* Tarjetas de resumen: una por estado del modelo, con conteo. */
  function montarResumen(destino) {
    if (!destino) { return; }
    var acentos = ['', '--b', '--c', '--d'];

    D.estados.forEach(function (estado, indice) {
      var cantidad = D.elementos.filter(function (e) { return e.estado === estado.valor; }).length;
      var tarjeta = crear('div', 'mq-tarjeta');
      tarjeta.innerHTML =
        '<span class="mq-icono-contenedor mq-icono-contenedor' + acentos[indice] + '">' +
        icono('cubo', 20) + '</span>' +
        '<p class="mq-meta">' + escapar(estado.valor) + '</p>' +
        '<p class="mq-titulo mq-numerico">' + cantidad + '</p>' +
        '<p class="mq-caption">Elementos en este estado.</p>';
      destino.appendChild(tarjeta);
    });
  }

  /* ======================================================================
     6. Superficie: detalle (Detalle.html)
     ====================================================================== */

  function montarDetalle() {
    var destino = $('[data-region-detalle]');
    var anuncio = $('[data-anuncio-estado]');
    var contrato = $('[data-region-contrato]');
    if (!destino) { return; }

    var codigo = new URLSearchParams(window.location.search).get('codigo');
    var elemento = D.elementos.filter(function (e) { return e.codigo === codigo; })[0] || D.elementos[0];

    montarContrato(contrato);

    function pintar(estado) {
      vaciar(destino);
      if (estado === 'vacio') {
        renderVacio(destino);
        anunciar(anuncio, 'No hay un elemento seleccionado.');
        return;
      }
      if (estado === 'cargando') {
        renderCargando(destino, 3);
        anunciar(anuncio, D.textosDeEstado.cargando.detalle);
        return;
      }
      if (estado === 'error') {
        renderError(destino);
        anunciar(anuncio, D.textosDeEstado.error.titulo);
        return;
      }

      destino.appendChild(construirFichaDetalle(elemento));
      anunciar(anuncio, 'Se muestra el detalle de ' + elemento.nombre + '.');
    }

    alCambiarEstado(pintar);
    pintar(estadoActual);
  }

  function construirFichaDetalle(elemento) {
    var tarjeta = crear('div', 'mq-tarjeta');

    var cabecera = crear('div', 'mq-cabecera-superficie');
    var titulo = crear('div');
    titulo.innerHTML =
      '<h2 class="mq-titulo">' + escapar(elemento.nombre) + '</h2>' +
      '<p class="mq-caption">' + escapar(elemento.codigo) + ' · ' + escapar(elemento.categoria) + '</p>';
    cabecera.appendChild(titulo);

    var acciones = crear('div', 'mq-fila-acciones');
    acciones.innerHTML =
      '<a class="mq-boton mq-boton--pill" href="index.html">' + icono('flecha', 16) +
      '<span>Volver al listado</span></a>' +
      '<button type="button" class="mq-boton mq-boton--primario">' + icono('guardar', 16) +
      '<span>Guardar cambios</span></button>';
    cabecera.appendChild(acciones);
    tarjeta.appendChild(cabecera);

    var kv = crear('dl', 'mq-kv');
    D.contratoDeCampos.forEach(function (campo) {
      var bloque = crear('div');
      bloque.appendChild(crear('dt', 'mq-kv__clave', campo.etiqueta));
      var dd = crear('dd', 'mq-kv__valor');
      if (campo.campo === 'estado') {
        dd.innerHTML = badgeDeEstado(elemento.estado);
      } else {
        dd.textContent = String(elemento[campo.campo]);
        if (campo.tipo === 'numerico' || campo.tipo === 'fecha') {
          dd.classList.add('mq-numerico');
        }
      }
      bloque.appendChild(dd);
      kv.appendChild(bloque);
    });
    tarjeta.appendChild(kv);

    return tarjeta;
  }

  /* Contrato de campos: la maqueta lo dibuja para que el validador humano
     confirme el modelo de datos campo por campo. */
  function montarContrato(destino) {
    if (!destino) { return; }

    var envoltorio = crear('div', 'mq-tabla-envoltorio mq-tarjeta');
    var tabla = crear('table', 'mq-tabla');
    tabla.innerHTML =
      '<caption class="mq-sr-only">Contrato de campos de la entidad ' +
      escapar(D.modelo.entidad) + '</caption>' +
      '<thead><tr>' +
      '<th scope="col">Campo</th><th scope="col">Etiqueta</th>' +
      '<th scope="col">Tipo</th><th scope="col">Ejemplo</th><th scope="col">Qué representa</th>' +
      '</tr></thead>';

    var tbody = crear('tbody');
    D.contratoDeCampos.forEach(function (campo) {
      var tr = crear('tr');
      tr.innerHTML =
        '<td><code>' + escapar(campo.campo) + '</code></td>' +
        '<td>' + escapar(campo.etiqueta) + '</td>' +
        '<td><span class="mq-badge">' + escapar(campo.tipo) + '</span></td>' +
        '<td class="mq-numerico">' + escapar(campo.ejemplo) + '</td>' +
        '<td>' + escapar(campo.descripcion) + '</td>';
      tbody.appendChild(tr);
    });
    tabla.appendChild(tbody);
    envoltorio.appendChild(tabla);
    destino.appendChild(envoltorio);
  }

  /* ======================================================================
     7. Superficie: configuración dirigida por esquema (Configuracion.html)
     Cada campo toma etiqueta, leyenda, default y límites de su descriptor.
     La pantalla no hardcodea nada de eso.
     ====================================================================== */

  function montarConfiguracion() {
    var destino = $('[data-region-configuracion]');
    var anuncio = $('[data-anuncio-estado]');
    if (!destino) { return; }

    // Valores de trabajo: arrancan en el `default` de cada descriptor.
    var valores = {};
    D.descriptoresDeConfiguracion.forEach(function (d) { valores[d.clave] = d.default; });

    function pintar(estado) {
      vaciar(destino);
      if (estado === 'vacio') {
        renderVacio(destino);
        anunciar(anuncio, 'No hay parámetros configurables declarados.');
        return;
      }
      if (estado === 'cargando') {
        renderCargando(destino, 4);
        anunciar(anuncio, 'Se están cargando los descriptores de configuración.');
        return;
      }
      if (estado === 'error') {
        renderError(destino);
        anunciar(anuncio, D.textosDeEstado.error.titulo);
        return;
      }

      destino.appendChild(construirFormularioDeConfiguracion(valores, anuncio));
      anunciar(anuncio, 'Se muestran ' + D.descriptoresDeConfiguracion.length + ' parámetros configurables.');
    }

    alCambiarEstado(pintar);
    pintar(estadoActual);
  }

  function construirFormularioDeConfiguracion(valores, anuncio) {
    var raiz = crear('div', 'mq-pila');

    var comunes = D.descriptoresDeConfiguracion.filter(function (d) { return d.grupo === 'comun'; });
    var avanzados = D.descriptoresDeConfiguracion.filter(function (d) { return d.grupo === 'avanzado'; });

    var tarjeta = crear('div', 'mq-tarjeta mq-pila');
    tarjeta.appendChild(crear('h2', 'mq-titulo', 'Parámetros del modelo'));
    tarjeta.appendChild(crear('p', 'mq-caption',
      'Cada control se construye desde el descriptor del parámetro: etiqueta, leyenda, valor por defecto y límites.'));

    var grilla = crear('div', 'mq-grilla-tarjetas');
    comunes.forEach(function (descriptor) {
      grilla.appendChild(construirCampo(descriptor, valores, refrescar));
    });
    tarjeta.appendChild(grilla);

    // Divulgación progresiva: los avanzados arrancan colapsados (ley de Hick).
    var expander = crear('div');
    var botonExpander = crear('button', 'mq-expander__boton');
    botonExpander.type = 'button';
    botonExpander.setAttribute('aria-expanded', 'false');
    botonExpander.setAttribute('aria-controls', 'mq-panel-avanzado');
    botonExpander.innerHTML = icono('chevron', 16) + '<span>Opciones avanzadas</span>';

    var panel = crear('div', 'mq-expander__panel mq-grilla-tarjetas');
    panel.id = 'mq-panel-avanzado';
    panel.hidden = true;
    panel.style.marginTop = 'var(--space-4)';
    avanzados.forEach(function (descriptor) {
      panel.appendChild(construirCampo(descriptor, valores, refrescar));
    });

    botonExpander.addEventListener('click', function () {
      var abierto = botonExpander.getAttribute('aria-expanded') === 'true';
      botonExpander.setAttribute('aria-expanded', String(!abierto));
      panel.hidden = abierto;
    });

    expander.appendChild(botonExpander);
    expander.appendChild(panel);
    tarjeta.appendChild(expander);
    raiz.appendChild(tarjeta);

    // Explicación "en palabras": se genera por plantilla, nunca a mano.
    var bloqueExplicacion = crear('div', 'mq-tarjeta mq-pila');
    bloqueExplicacion.appendChild(crear('h2', 'mq-titulo', 'La configuración, en palabras'));
    var explicacion = crear('div', 'mq-en-palabras');
    explicacion.id = 'mq-en-palabras';
    bloqueExplicacion.appendChild(explicacion);
    raiz.appendChild(bloqueExplicacion);

    // Propuesta: la UI propone, el humano confirma. Nunca se aplica directo.
    var bloquePropuesta = crear('div', 'mq-tarjeta mq-pila');
    var cabeceraPropuesta = crear('div', 'mq-cabecera-superficie');
    cabeceraPropuesta.innerHTML =
      '<div><h2 class="mq-titulo">Propuesta de configuración</h2>' +
      '<p class="mq-caption">Previsualizar arma la propuesta con los valores actuales. ' +
      'Nada se aplica hasta confirmar.</p></div>' +
      '<span class="mq-badge mq-badge--atencion">Modo simulación</span>';
    bloquePropuesta.appendChild(cabeceraPropuesta);

    var previsualizacion = crear('div');
    previsualizacion.id = 'mq-previsualizacion';
    previsualizacion.setAttribute('aria-live', 'polite');
    bloquePropuesta.appendChild(previsualizacion);

    var acciones = crear('div', 'mq-fila-acciones');
    var botonPrevisualizar = crear('button', 'mq-boton mq-boton--secundario');
    botonPrevisualizar.type = 'button';
    botonPrevisualizar.innerHTML = icono('ojo', 16) + '<span>Previsualizar</span>';

    var botonConfirmar = crear('button', 'mq-boton mq-boton--primario');
    botonConfirmar.type = 'button';
    botonConfirmar.disabled = true;
    botonConfirmar.innerHTML = icono('guardar', 16) + '<span>Confirmar y aplicar</span>';

    botonPrevisualizar.addEventListener('click', function () {
      vaciar(previsualizacion);
      var caja = crear('div', 'mq-ayuda');
      caja.appendChild(crear('p', 'mq-ayuda__titulo', 'Esto es lo que va a cambiar'));
      caja.appendChild(crear('p', null, explicarEnPalabras(valores)));
      caja.appendChild(crear('p', 'mq-caption',
        'Alcance afectado: listado principal y vista de detalle de ' + D.modelo.entidadPlural.toLowerCase() + '.'));
      previsualizacion.appendChild(caja);
      botonConfirmar.disabled = false;
      anunciar(anuncio, 'Propuesta lista para revisar. Todavía no se aplicó.');
    });

    botonConfirmar.addEventListener('click', function () {
      vaciar(previsualizacion);
      var caja = crear('div', 'mq-ayuda');
      caja.style.borderColor = 'var(--color-brand-primary)';
      caja.appendChild(crear('p', 'mq-ayuda__titulo', 'Propuesta confirmada'));
      caja.appendChild(crear('p', null,
        'En el producto real, acá el sistema valida la propuesta contra los descriptores y la aplica. ' +
        'En la maqueta el efecto se simula.'));
      previsualizacion.appendChild(caja);
      botonConfirmar.disabled = true;
      anunciar(anuncio, 'Propuesta confirmada.');
    });

    acciones.appendChild(botonPrevisualizar);
    acciones.appendChild(botonConfirmar);
    bloquePropuesta.appendChild(acciones);
    raiz.appendChild(bloquePropuesta);

    // Ranura del asistente: hueco forward-compatible, deshabilitado hoy.
    var ranura = crear('div', 'mq-ranura-asistente');
    ranura.setAttribute('aria-disabled', 'true');
    ranura.innerHTML =
      '<p class="mq-body-strong">Asistente de configuración ' +
      '<span class="mq-badge mq-badge--info">próximamente</span></p>' +
      '<p class="mq-caption">Cuando se conecte, propone valores dentro de los límites de cada descriptor. ' +
      'La propuesta pasa por la misma previsualización y confirmación: propone, no aplica.</p>';
    raiz.appendChild(ranura);

    // Frontera: configuración de entorno. Se informa, no se dibuja como control.
    var entorno = crear('div', 'mq-tarjeta mq-pila');
    entorno.appendChild(crear('h2', 'mq-titulo', 'Se fija al desplegar'));
    entorno.appendChild(crear('p', 'mq-caption',
      'Estos parámetros no se administran desde esta superficie. Se declaran acá como información.'));
    var listaEntorno = crear('ul');
    D.configuracionDeEntorno.forEach(function (item) {
      var li = crear('li', 'mq-caption');
      li.innerHTML = '<strong>' + escapar(item.etiqueta) + '</strong> — ' + escapar(item.leyenda);
      listaEntorno.appendChild(li);
    });
    entorno.appendChild(listaEntorno);
    raiz.appendChild(entorno);

    function refrescar() {
      var nodo = $('#mq-en-palabras');
      if (nodo) { nodo.textContent = explicarEnPalabras(valores); }
      botonConfirmar.disabled = true;
    }

    window.setTimeout(refrescar, 0);
    return raiz;
  }

  /**
   * Campo configurable dirigido por descriptor.
   * Label, control, hint de default y límites, y ayuda contextual: todo sale
   * del descriptor. Nada se escribe a mano por pantalla.
   */
  function construirCampo(descriptor, valores, alCambiar) {
    var idControl = 'mq-campo-' + descriptor.clave;
    var idAyuda = 'mq-ayuda-' + descriptor.clave;
    var idHint = 'mq-hint-' + descriptor.clave;
    var idError = 'mq-error-' + descriptor.clave;

    var bloque = crear('div');

    var cabecera = crear('div', 'mq-campo__cabecera');
    var label = crear('label', 'mq-etiqueta', descriptor.etiqueta);
    label.setAttribute('for', idControl);
    cabecera.appendChild(label);

    var botonInfo = crear('button', 'mq-info-boton');
    botonInfo.type = 'button';
    botonInfo.setAttribute('aria-expanded', 'false');
    botonInfo.setAttribute('aria-controls', idAyuda);
    botonInfo.setAttribute('aria-label', 'Ver la ayuda de ' + descriptor.etiqueta);
    botonInfo.innerHTML = icono('info', 16);
    cabecera.appendChild(botonInfo);
    bloque.appendChild(cabecera);

    var control = construirControl(descriptor, idControl, valores, alCambiar, idError);
    control.setAttribute('aria-describedby', idHint + ' ' + idAyuda);
    bloque.appendChild(control);

    var hint = crear('span', 'mq-hint', textoDeHint(descriptor));
    hint.id = idHint;
    bloque.appendChild(hint);

    var error = crear('span', 'mq-error-inline');
    error.id = idError;
    error.setAttribute('aria-live', 'polite');
    bloque.appendChild(error);

    var ayuda = crear('div', 'mq-ayuda');
    ayuda.id = idAyuda;
    ayuda.hidden = true;
    ayuda.innerHTML =
      '<p class="mq-ayuda__titulo">¿Qué es ' + escapar(descriptor.etiqueta.toLowerCase()) + '?</p>' +
      '<p>' + escapar(descriptor.leyenda) + '</p>' +
      '<ul class="mq-ayuda__ejemplos">' +
      descriptor.ejemplos.map(function (ejemplo) {
        return '<li>Con <strong>' + escapar(formatearValor(ejemplo.valor)) + '</strong>, ' +
          escapar(ejemplo.consecuencia) + '.</li>';
      }).join('') +
      '</ul>';
    bloque.appendChild(ayuda);

    botonInfo.addEventListener('click', function () {
      var abierta = botonInfo.getAttribute('aria-expanded') === 'true';
      botonInfo.setAttribute('aria-expanded', String(!abierta));
      ayuda.hidden = abierta;
    });

    return bloque;
  }

  function construirControl(descriptor, id, valores, alCambiar, idError) {
    var control;

    if (descriptor.tipo === 'seleccion') {
      control = crear('select', 'mq-select');
      descriptor.enum.forEach(function (opcion) {
        control.appendChild(new Option(opcion, opcion, false, opcion === valores[descriptor.clave]));
      });
    } else if (descriptor.tipo === 'booleano') {
      control = crear('select', 'mq-select');
      control.appendChild(new Option('Sí', 'true', false, valores[descriptor.clave] === true));
      control.appendChild(new Option('No', 'false', false, valores[descriptor.clave] === false));
    } else {
      control = crear('input', 'mq-input');
      control.type = 'number';
      control.min = descriptor.min;
      control.max = descriptor.max;
      control.value = valores[descriptor.clave];
    }

    control.id = id;

    control.addEventListener('change', function (ev) {
      var bruto = ev.target.value;
      var nodoError = document.getElementById(idError);

      if (descriptor.tipo === 'numerico') {
        var numero = Number(bruto);
        // La validación inline se deriva de los límites del descriptor.
        if (Number.isNaN(numero) || numero < descriptor.min || numero > descriptor.max) {
          control.classList.add('mq-input--error');
          control.setAttribute('aria-invalid', 'true');
          if (nodoError) {
            nodoError.textContent = 'El valor tiene que estar entre ' + descriptor.min +
              ' y ' + descriptor.max + ' ' + (descriptor.unidad || '') + '.';
          }
          return;
        }
        control.classList.remove('mq-input--error');
        control.removeAttribute('aria-invalid');
        if (nodoError) { nodoError.textContent = ''; }
        valores[descriptor.clave] = numero;
      } else if (descriptor.tipo === 'booleano') {
        valores[descriptor.clave] = bruto === 'true';
      } else {
        valores[descriptor.clave] = bruto;
      }

      alCambiar();
    });

    return control;
  }

  /* Hint derivado del descriptor: default y límites. */
  function textoDeHint(descriptor) {
    var partes = ['Por defecto ' + formatearValor(descriptor.default) +
      (descriptor.unidad ? ' ' + descriptor.unidad : '')];

    if (descriptor.min !== undefined && descriptor.max !== undefined) {
      partes.push('entre ' + descriptor.min + ' y ' + descriptor.max);
    }
    if (descriptor.enum) {
      partes.push('opciones: ' + descriptor.enum.join(', '));
    }
    return partes.join('; ') + '.';
  }

  function formatearValor(valor) {
    if (valor === true) { return 'sí'; }
    if (valor === false) { return 'no'; }
    return String(valor);
  }

  /**
   * Explicación "en palabras" generada por plantilla a partir de los
   * descriptores y los valores actuales. Es la inversa del prompt futuro:
   * hoy traduce valores a palabras; mañana la IA traduce palabras a valores.
   */
  function explicarEnPalabras(valores) {
    var frases = D.descriptoresDeConfiguracion.map(function (descriptor) {
      var valor = formatearValor(valores[descriptor.clave]);
      var unidad = descriptor.unidad ? ' ' + descriptor.unidad : '';
      return descriptor.etiqueta.toLowerCase() + ' queda en ' + valor + unidad;
    });

    return 'Con esta configuración, ' + frases.join('; ') + '. ' +
      descripcionDeConsecuencia(valores);
  }

  function descripcionDeConsecuencia(valores) {
    var porPagina = valores.elementosPorPagina;
    var refresco = valores.intervaloDeRefresco;
    return 'En la práctica: el listado muestra hasta ' + porPagina +
      ' elementos por pantalla y se actualiza cada ' + refresco + ' segundos.';
  }

  /* ======================================================================
     8. Anuncio accesible de cambios de estado
     ====================================================================== */

  function anunciar(nodo, mensaje) {
    if (nodo) { nodo.textContent = mensaje; }
  }

  /* ======================================================================
     9. Encabezado, pie y arranque
     ====================================================================== */

  function montarChrome() {
    var marca = $('[data-marca]');
    if (marca) {
      marca.innerHTML = icono('cubo', 20);
    }

    $$('[data-icono-nav]').forEach(function (nodo) {
      nodo.innerHTML = icono(nodo.dataset.iconoNav, 20);
    });

    var nombreModelo = $('[data-nombre-modelo]');
    if (nombreModelo) {
      nombreModelo.textContent = D.modelo.nombre;
    }

    var sello = $('[data-sello-version]');
    if (sello) {
      sello.textContent = 'Maqueta ' + D.modelo.nombre + ' — ' + D.modelo.version;
    }
  }

  function arrancar() {
    montarChrome();
    montarBarraDeValidacion();

    var superficie = document.body.dataset.superficie;
    if (superficie === 'listado') { montarListado(); }
    if (superficie === 'detalle') { montarDetalle(); }
    if (superficie === 'configuracion') { montarConfiguracion(); }
  }

  document.addEventListener('DOMContentLoaded', arrancar);
}(window.DatosMaqueta));
