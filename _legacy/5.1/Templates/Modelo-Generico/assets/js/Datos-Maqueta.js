/* ==========================================================================
   Datos-Maqueta.js
   Maqueta Modelo-Generico — v1.0

   ÚNICA fuente de los datos de ejemplo de la maqueta. Ningún HTML hardcodea
   datos: las tres superficies se renderizan desde este objeto por medio de
   Maqueta.js. El objetivo explícito es validar visualmente el modelo de datos
   antes de construir: si un campo falta o sobra, se ve en pantalla.

   ADVERTENCIA. IA.SDD es un repositorio público. Los datos de este archivo son
   sintéticos y ofuscados a propósito: no hay clientes, dominios reales, marcas
   ni datos verosímiles de negocio. Al derivar una maqueta de proyecto real,
   reemplazar este archivo entero y mantener la misma política de ofuscación si
   la maqueta va a vivir en un repositorio público.
   ========================================================================== */

window.DatosMaqueta = (function () {
  'use strict';

  /* ------------------------------------------------------------------------
     1. Identidad del modelo
     ------------------------------------------------------------------------ */

  var modelo = {
    nombre: 'Modelo-Generico',
    entidad: 'Elemento',
    entidadPlural: 'Elementos',
    version: 'v1.0',
    fecha: '2026-07-19'
  };

  /* ------------------------------------------------------------------------
     2. Contrato de campos de la entidad
     Cada campo declara nombre, tipo y ejemplo. Es lo que el validador humano
     revisa: la maqueta dibuja este contrato, no una tabla escrita a mano.
     ------------------------------------------------------------------------ */

  var contratoDeCampos = [
    {
      campo: 'codigo',
      etiqueta: 'Código',
      tipo: 'texto',
      ejemplo: 'ELM-001',
      descripcion: 'Identificador estable del elemento dentro del modelo.'
    },
    {
      campo: 'nombre',
      etiqueta: 'Nombre',
      tipo: 'texto',
      ejemplo: 'Elemento de ejemplo 01',
      descripcion: 'Rótulo legible del elemento.'
    },
    {
      campo: 'categoria',
      etiqueta: 'Categoría',
      tipo: 'enumerado',
      ejemplo: 'Categoría A',
      descripcion: 'Agrupación a la que pertenece el elemento.'
    },
    {
      campo: 'estado',
      etiqueta: 'Estado',
      tipo: 'enumerado',
      ejemplo: 'Activo',
      descripcion: 'Situación actual del elemento. Se muestra como badge con texto explícito.'
    },
    {
      campo: 'cantidad',
      etiqueta: 'Cantidad',
      tipo: 'numerico',
      ejemplo: 128,
      descripcion: 'Magnitud asociada al elemento. Se alinea con números tabulares.'
    },
    {
      campo: 'fechaActualizacion',
      etiqueta: 'Fecha de actualización',
      tipo: 'fecha',
      ejemplo: '2026-07-14',
      descripcion: 'Última modificación registrada, en formato YYYY-MM-DD.'
    }
  ];

  /* ------------------------------------------------------------------------
     3. Valores admitidos de los campos enumerados
     ------------------------------------------------------------------------ */

  var categorias = ['Categoría A', 'Categoría B', 'Categoría C'];

  var estados = [
    { valor: 'Activo', variante: 'exito' },
    { valor: 'Pausado', variante: 'atencion' },
    { valor: 'Con error', variante: 'error' }
  ];

  /* ------------------------------------------------------------------------
     4. Elementos de ejemplo (sintéticos y ofuscados)
     ------------------------------------------------------------------------ */

  var elementos = [
    { codigo: 'ELM-001', nombre: 'Elemento de ejemplo 01', categoria: 'Categoría A', estado: 'Activo',     cantidad: 128, fechaActualizacion: '2026-07-14' },
    { codigo: 'ELM-002', nombre: 'Elemento de ejemplo 02', categoria: 'Categoría B', estado: 'Pausado',    cantidad: 42,  fechaActualizacion: '2026-07-11' },
    { codigo: 'ELM-003', nombre: 'Elemento de ejemplo 03', categoria: 'Categoría A', estado: 'Con error',  cantidad: 0,   fechaActualizacion: '2026-07-09' },
    { codigo: 'ELM-004', nombre: 'Elemento de ejemplo 04', categoria: 'Categoría C', estado: 'Activo',     cantidad: 305, fechaActualizacion: '2026-07-16' },
    { codigo: 'ELM-005', nombre: 'Elemento de ejemplo 05', categoria: 'Categoría B', estado: 'Activo',     cantidad: 77,  fechaActualizacion: '2026-07-02' },
    { codigo: 'ELM-006', nombre: 'Elemento de ejemplo 06', categoria: 'Categoría C', estado: 'Pausado',    cantidad: 19,  fechaActualizacion: '2026-06-28' },
    { codigo: 'ELM-007', nombre: 'Elemento de ejemplo 07', categoria: 'Categoría A', estado: 'Activo',     cantidad: 214, fechaActualizacion: '2026-07-17' },
    { codigo: 'ELM-008', nombre: 'Elemento de ejemplo 08', categoria: 'Categoría B', estado: 'Con error',  cantidad: 5,   fechaActualizacion: '2026-07-05' }
  ];

  /* ------------------------------------------------------------------------
     5. Descriptores de configuración
     Fuente única de cada parámetro: etiqueta, leyenda, tipo, unidad, default,
     límites y ejemplos. La pantalla no escribe nada de esto a mano; lo lee.
     Cuatro consumidores: render del campo, ayuda contextual, validación y
     (forward-compat) contrato para una IA que proponga valores.
     ------------------------------------------------------------------------ */

  var descriptoresDeConfiguracion = [
    {
      clave: 'elementosPorPagina',
      etiqueta: 'Elementos por página',
      leyenda: 'Cuántas filas se muestran de una vez en el listado principal antes de paginar.',
      tipo: 'numerico',
      unidad: 'elementos',
      default: 25,
      min: 5,
      max: 100,
      grupo: 'comun',
      ejemplos: [
        { valor: 10, consecuencia: 'el listado carga más rápido y se pagina más seguido' },
        { valor: 100, consecuencia: 'se ve todo junto pero la carga inicial tarda más' }
      ]
    },
    {
      clave: 'intervaloDeRefresco',
      etiqueta: 'Intervalo de refresco',
      leyenda: 'Cada cuánto la superficie vuelve a pedir los datos del listado.',
      tipo: 'numerico',
      unidad: 'segundos',
      default: 60,
      min: 15,
      max: 600,
      grupo: 'comun',
      ejemplos: [
        { valor: 15, consecuencia: 'los cambios se ven casi al instante, con más consultas al origen' },
        { valor: 600, consecuencia: 'se consulta poco y los datos pueden verse desactualizados' }
      ]
    },
    {
      clave: 'categoriaPredeterminada',
      etiqueta: 'Categoría predeterminada',
      leyenda: 'Categoría que queda seleccionada en el filtro al abrir el listado.',
      tipo: 'seleccion',
      unidad: null,
      default: 'Categoría A',
      enum: categorias,
      grupo: 'comun',
      ejemplos: [
        { valor: 'Categoría A', consecuencia: 'el listado abre filtrado por la categoría más usada' },
        { valor: 'Categoría C', consecuencia: 'el listado abre filtrado por la categoría de menor volumen' }
      ]
    },
    {
      clave: 'mostrarElementosPausados',
      etiqueta: 'Mostrar elementos pausados',
      leyenda: 'Determina si los elementos en estado Pausado aparecen en el listado.',
      tipo: 'booleano',
      unidad: null,
      default: true,
      grupo: 'comun',
      ejemplos: [
        { valor: true, consecuencia: 'se ve el inventario completo, incluidos los detenidos' },
        { valor: false, consecuencia: 'el listado queda acotado a lo que está operando' }
      ]
    },
    {
      clave: 'umbralDeCantidad',
      etiqueta: 'Umbral de cantidad',
      leyenda: 'Valor de cantidad por debajo del cual un elemento se marca para revisión.',
      tipo: 'numerico',
      unidad: 'unidades',
      default: 20,
      min: 0,
      max: 500,
      grupo: 'avanzado',
      ejemplos: [
        { valor: 0, consecuencia: 'ningún elemento se marca por cantidad baja' },
        { valor: 500, consecuencia: 'prácticamente todos los elementos quedan marcados' }
      ]
    },
    {
      clave: 'diasDeRetencion',
      etiqueta: 'Días de retención',
      leyenda: 'Cuántos días se conserva el histórico de cambios de cada elemento.',
      tipo: 'numerico',
      unidad: 'días',
      default: 90,
      min: 7,
      max: 365,
      grupo: 'avanzado',
      ejemplos: [
        { valor: 7, consecuencia: 'se guarda poco histórico y se ocupa menos espacio' },
        { valor: 365, consecuencia: 'se puede auditar un año entero a costa de más espacio' }
      ]
    }
  ];

  /* ------------------------------------------------------------------------
     6. Frontera: configuración de entorno
     Parámetros que la superficie NO gobierna. Se declaran como informacion,
     no se dibujan como controles (ni siquiera deshabilitados).
     ------------------------------------------------------------------------ */

  var configuracionDeEntorno = [
    {
      clave: 'origenDeDatos',
      etiqueta: 'Origen de datos',
      leyenda: 'Se fija al desplegar la instancia. La superficie lo informa y no lo cambia.'
    },
    {
      clave: 'zonaHoraria',
      etiqueta: 'Zona horaria',
      leyenda: 'Se fija al desplegar la instancia y afecta cómo se muestran las fechas.'
    }
  ];

  /* ------------------------------------------------------------------------
     7. Estados de superficie obligatorios del catálogo
     ------------------------------------------------------------------------ */

  var estadosDeSuperficie = [
    { clave: 'vacio',    etiqueta: 'Vacío' },
    { clave: 'cargando', etiqueta: 'Cargando' },
    { clave: 'datos',    etiqueta: 'Con datos' },
    { clave: 'error',    etiqueta: 'Error' }
  ];

  /* ------------------------------------------------------------------------
     8. Textos de estado (voz activa; el error dice qué pasa y qué hacer)
     ------------------------------------------------------------------------ */

  var textosDeEstado = {
    vacio: {
      titulo: 'Todavía no hay elementos',
      detalle: 'Cuando se cree el primer elemento, aparece en este listado.',
      accion: 'Crear elemento'
    },
    cargando: {
      titulo: 'Cargando elementos',
      detalle: 'Se están trayendo los elementos del modelo.'
    },
    error: {
      titulo: 'No se pudieron traer los elementos',
      detalle: 'El origen de datos no respondió. Reintentar en unos segundos; si sigue igual, revisar la configuración del origen.',
      accion: 'Reintentar'
    }
  };

  return {
    modelo: modelo,
    contratoDeCampos: contratoDeCampos,
    categorias: categorias,
    estados: estados,
    elementos: elementos,
    descriptoresDeConfiguracion: descriptoresDeConfiguracion,
    configuracionDeEntorno: configuracionDeEntorno,
    estadosDeSuperficie: estadosDeSuperficie,
    textosDeEstado: textosDeEstado
  };
}());
