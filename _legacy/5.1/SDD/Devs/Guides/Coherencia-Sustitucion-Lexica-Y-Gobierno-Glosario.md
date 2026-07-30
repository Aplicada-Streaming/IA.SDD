# Nota de coherencia — Sustitución léxica y gobierno del glosario

**Framework:** SDD
**Documento:** Coherencia-Sustitucion-Lexica-Y-Gobierno-Glosario.md
**Versión:** 1.0
**Estado:** Vigente
**Fecha:** 2026-07-29
**Autor:** AG-ROOT (Arquitecto de Soluciones)

---

## Tabla de contenido

- [1. Alcance](#1-alcance)
- [2. Los dos defectos de gobierno de glosario](#2-los-dos-defectos-de-gobierno-de-glosario)
- [3. La clase de defecto que introdujo la 5.0](#3-la-clase-de-defecto-que-introdujo-la-50)
- [4. Inventario de archivos](#4-inventario-de-archivos)
- [5. Verificación de invariantes (D1–D9)](#5-verificación-de-invariantes-d1d9)
- [6. Verificación de trazabilidad](#6-verificación-de-trazabilidad)
- [7. Comprobaciones ejecutadas](#7-comprobaciones-ejecutadas)
- [8. Observaciones](#8-observaciones)
- [9. Lo que esta intervención deliberadamente no hace](#9-lo-que-esta-intervención-deliberadamente-no-hace)
- [10. Veredicto](#10-veredicto)
- [11. Control de cambios](#11-control-de-cambios)

---

## 1. Alcance

Intervención publicada como versión **5.1**. Tiene dos mitades que se explican una a la otra:

1. **Gobierno del glosario.** Incorpora a `Vocabulario-Rules.md` el criterio de cuándo un término polisémico necesita desambiguarse, declara `Glosario-Funcional.md` como artefacto obligatorio de la categoría 02, y suma criterios de aceptación verificables de glosario a los diecisiete archivos de reglas y al audit del orquestador.
2. **Reparación de la migración 5.0.** La intervención de vocabulario de la 5.0 se ejecutó por sustitución global de cadena y produjo cuatro clases de daño verificadas. Se reparan las cuatro, y la prohibición del procedimiento queda escrita como regla.

Las dos mitades son el mismo defecto visto de los dos lados: **el framework no tenía criterio para intervenir vocabulario, y por eso su propia intervención de vocabulario salió mal.**

Alcanza a 41 archivos markdown del conjunto normativo, excluidos `SDD/Devs/Bootstrap/` y `_legacy/`, que son registros.

**Lo que la intervención no hace.** No reubica ninguna categoría, no cambia el conjunto D8, no altera el orden de fases, no toca la mecánica plan-then-confirm, no crea ni elimina ninguna invariante D1-D9.

---

## 2. Los dos defectos de gobierno de glosario

El diagnóstico proviene de una orden de trabajo emitida desde la corrida de un producto real y verificada contra el conjunto 4.1. Se reverificó contra el árbol vigente antes de intervenir.

### 2.1 Defecto A — el criterio de desambiguación no existía como regla

| Evidencia | Estado antes | Estado después |
| --- | --- | --- |
| `grep -riE 'desambigu\|polisem\|homonim'` sobre `SDD/` | Una sola ocurrencia, y era una nota de coherencia hablando de la homonimia con el archivo de solución de .NET. **Cero reglas** | `Vocabulario-Rules.md` §9, con cinco subsecciones y seis criterios de aceptación |
| `Master-Prompt.md` §10, criterios del audit | «Coherencia cross-doc … glosario sin contradicciones». Un glosario incompleto lo cumple trivialmente | Cuatro criterios: sin contradicciones, completitud, polisemia gobernada y el criterio negativo del falso positivo |
| Dónde vivía el criterio correcto | Enunciado dentro del `SOLUTION-INTAKE` §12 de un producto real, como hallazgo local de esa solución | Regla del framework, en el archivo cuyo lector declarado es todo subagente y todo auditor |

El enunciado que el intake de ese producto había alcanzado por su cuenta —«no se califica cuando los contextos son disjuntos, porque cargaría el texto sin resolver un problema que no existe»— es el que §9.1 declara. Lo que el framework agrega y ese intake no podía saber está en **§9.2**: el contexto de lectura de un subagente es la sección y no el documento, porque así construye el despacho `Master-Prompt.md` §8. Sin esa pieza el criterio queda a medias: descarta falsos positivos pero no detecta el caso real.

### 2.2 Defecto B — el glosario de la categoría 02 no estaba gobernado

| Evidencia | Estado antes | Estado después |
| --- | --- | --- |
| Menciones de «glosario» en `Rules-Especificacion-Funcional.md` | **1**, en el punto 6 de §4.2.2 | **20** |
| Dónde vivía el glosario de 02 | Sección de `Modelo-Conceptual.md`, documento **condicional**: obligatorio solo para los cinco tipos D8 con persistencia. Un `library` o un `cli-tool` no tenía glosario en absoluto | `Glosario-Funcional.md`, artefacto propio, obligatorio para los ocho tipos D8 |
| Criterio de inclusión | Ninguno: nada decía qué términos entran | §3.3, tres reglas: inclusión, no duplicación frente a 00 y polisemia |
| Verificación en §6 | Cero ocurrencias de «glosario» | Cinco criterios |
| Archivos de reglas sin ninguna mención de «glosario» | **9 de 17** | **0 de 17** |

El modelo de un glosario por categoría con regla de no duplicación entre ellos no se cambió: es el que `Rules-UX-UI-DX.md` ya implementaba y funciona. El defecto era que no estaba replicado. Con una corrección al diagnóstico de origen: **`Rules-UX-UI-DX.md` también necesitaba cambio**, porque declaraba su glosario «Recomendado» y su único criterio de aceptación verificaba la no duplicación, no la existencia ni la completitud. Replicarlo tal cual no habría cerrado el defecto.

---

## 3. La clase de defecto que introdujo la 5.0

La intervención de vocabulario de la 5.0 renombró el nivel superior de «solución» a «producto» y la unidad de compilación de «proyecto» a «proyecto de código». El renombre era correcto y no se revierte. **El método fue sustituir cadenas de manera global**, y eso produjo cuatro clases de daño.

### 3.1 La cadena de un término es subcadena de otras palabras

Sustituir `soluci*` por `producto` convierte «re**soluci**ón» en «reproducto». Resultado medido: **30 ocurrencias de una palabra inexistente en 12 archivos**, y la palabra «resolución» desapareció por completo del framework vivo.

| Ocurrencia | Por qué importaba |
| --- | --- |
| `SDD-User-Guide.md` §6, título de sección, y su ancla en la tabla de contenido | «§6 Reproducto de problemas frecuentes» es lo primero que ve un usuario que busca ayuda |
| `Rules-Documentacion.md`, campo `resolucion` de la bitácora de eventualidades, en la tabla de campos y en el bloque de ejemplo | Es el **nombre de un campo de contrato**. Un subagente que lo lea emite `reproducto:` en la documentación generada |
| `Design-Rules-Primer-Arranque.md` §4.3, título del patrón «Redirección con estado de resolución», más tres referencias internas | Es el nombre canónico de un patrón de diseño que otro documento del catálogo referencia |
| `Rules-Arquitectura-Tecnica.md` §1.2, variante `mobile-app-maui`: «motor de sincronización con resolución de conflictos» | Es texto que el orquestador copia **literal** al despacho del subagente (`Master-Prompt.md` §8) |
| `Intake-Rules.md` §5 y `PRODUCT-INTAKE-template.md`, «Regla de resolución de la Parte D» | Es el nombre de una validación bloqueante |

### 3.2 La misma palabra puede llevar un sentido no normativo que las reglas de uso preservan

R2 de `Vocabulario-Rules.md` conserva «solución» en prosa de negocio y como remedio de un problema. La sustitución pisó ese sentido:

- **23 cabeceras de tabla de anti-patrones** `| Anti-patrón | Problema | Solución |` convertidas en `| … | Producto |`, en **17 archivos**: 15 de los 17 archivos de reglas, `Rules-Design-Modelo-Template.md`, y `Marco-Teorico-SDD.md`, que aporta siete de las veintitrés tablas. No es cosmético: `Master-Prompt.md` §8 manda a cada subagente respetar la sección de anti-patrones, y §10 hace de un anti-patrón un hallazgo P1.
- **Concordancias de género rotas**, que son la huella visible del reemplazo ciego: «no debe leerse como **producto técnica**» (`Rules-Necesidades-Negocio.md` §4.2), «saltando a **productos técnicas**» (`SDD-User-Guide.md` §4.1), «separar en **productos** SDD **distintas**» (`SDD-User-Guide.md` F-11).
- **Remedios convertidos en producto**: «tabla síntoma/causa/**producto**» y «confirmar la causa antes de aplicar **el producto**» (`Rules-Documentacion.md`, dos lugares), «sugerencia de **producto**» en las heurísticas de usabilidad del marco teórico.

### 3.3 Una etiqueta de campo se renombró sobre valores que no cambiaron de referente

El campo de cabecera `**Proyecto:**` se convirtió en `**Proyecto de código:**` en **14 lugares de 13 archivos** donde el valor no es una unidad de compilación:

- Siete con valor `Template SDD`, que es el framework. Pasan a `**Framework:** SDD`, el patrón que la propia nota de coherencia de la 5.0 ya usaba.
- Siete con valor `{{Nombre-Producto}}`, que es el plano de negocio del producto. La etiqueta de un plano sobre el valor de otro es exactamente lo que `Vocabulario-Rules.md` §3 prohíbe. Pasan a `**Producto:** {{Nombre-Producto}}`.

Se corrigieron además **27 marcadores `{{nombre-proyecto}}`** que la 5.0 dejó sin renombrar aunque había declarado el identificador `Nombre-Proyecto` → `Nombre-Proyecto-Codigo`, y que además violaban D3 por ser todo-minúsculas: 26 pasan a `{{Nombre-Proyecto-Codigo}}` en las diez reglas de nivel proyecto de código, y el de `Rules-Necesidades-Negocio.md` pasa a `{{Nombre-Producto}}` porque esa categoría es de nivel producto. Por la misma razón de R3, las tres cabeceras modelo de `Rules-Contexto.md` —categoría de nivel producto que emite `Vision-Producto.md` y `Alcance-Producto.md`— dejan de declarar un proyecto de código y declaran el producto, con sus valores de ejemplo normalizados a prosa. Se normalizaron también tres valores de ejemplo que no cumplían Título-Con-Guiones (`servicio-pagos`, `Turnos Médicos`, `Librería CSV`).

### 3.4 Se reescribieron filas históricas de control de cambios

`SDD-Development-Guide.md` §VI.2 lo prohíbe textualmente: «Las filas ya escritas **no se reescriben**, aunque un cambio posterior invalide lo que describen. Son registro histórico, y corregirlas hace que el changelog mienta. Si una intervención renombra una carpeta, las filas viejas siguen nombrando la carpeta vieja, y la fila nueva declara el renombre».

La migración reescribió **60 filas históricas en 23 archivos**. Todas se restituyeron a su texto original, verificado contra el control de versiones. El `CHANGELOG.md` sí había respetado la regla: su diff de la 5.0 son 66 líneas agregadas y ninguna eliminada.

**Límite declarado de la restitución.** Las filas que la intervención 4.1 había escrito el mismo día, y que la 5.0 reescribió a continuación, **no son recuperables**: las dos intervenciones ocurrieron sobre el mismo estado sin commit intermedio, así que no existe fuente de verdad de su texto original. Quedan con el vocabulario de la 5.0. Se declara acá en lugar de reconstruirlas, porque un registro reconstruido es un registro falso.

---

## 4. Inventario de archivos

| Archivo | De | A | Naturaleza del cambio |
| --- | --- | --- | --- |
| `Vocabulario-Rules.md` | 1.0 | 2.0 | **§9 nueva**, criterio de desambiguación léxica en cinco subsecciones; §6 con puntero a §9; §10 con seis criterios de aceptación. §11 era §10 |
| `Master-Prompt.md` | 5.0 | 5.1 | §6 suma `Glosario-Funcional.md`; §8 inyecta `Vocabulario-Rules.md` en todo despacho; §10 con los cuatro criterios de glosario y el auditor recibiendo la regla; §15 redefine dos términos por frontera y suma cuatro; §16 registra la fila 5.0 faltante |
| `Rules-Especificacion-Funcional.md` | 3.0 | **4.0** | `Glosario-Funcional.md` como artefacto obligatorio para los ocho tipos D8; §4.2.4 nueva; §3.3, §4.5, §5.4 y §6 con las reglas y criterios; corrección del residuo «11 (ejemplos)» y de tres nombres en todo-minúsculas |
| `Rules-UX-UI-DX.md` | 3.0 | **4.0** | `Glosario-UX.md` pasa de recomendado a obligatorio para los ocho tipos; §3.3 suma la regla de polisemia; §6 suma existencia, completitud y criterio negativo |
| `Rules-Contexto.md`, `Rules-Necesidades-Negocio.md`, `Rules-Prompts-AI.md`, `Rules-Arquitectura-Tecnica.md`, `Rules-Backlog-Tecnico.md`, `Rules-Plan-Sprint.md`, `Rules-Calidad-Y-Pruebas.md`, `Rules-Devops.md`, `Root-Rules.md` | 3.0 | 3.1 | Tres criterios de gobierno del glosario en §6, con el destino de sus términos declarado |
| `Rules-Examples.md`, `Rules-Documentacion.md` | 4.0 | 4.1 | Ídem |
| `Deriva-Rules.md` | 3.0 | 3.1 | Coherencia de los nombres canónicos de la línea de base con `Glosario-UX.md`, en §6 |
| `Intake-Rules.md`, `Maqueta-Rules.md` | 3.0 | 3.1 | Reparación de la sustitución léxica |
| `PRODUCT-INTAKE-template.md` | 2.0 | 2.1 | Ídem |
| `PRODUCT-MANIFEST-template.md` | 3.0 | 3.1 | Restitución de fila histórica |
| `Marco-Teorico-SDD.md` | 1.9 | 2.1 | Fila 2.0 registrada retroactivamente; 2.1 repara siete cabeceras de anti-patrones, dos «reproducto» y una «sugerencia de producto» |
| `SDD-Development-Guide.md` | 1.2 | 1.4 | Fila 1.3 registrada retroactivamente; 1.4 corrige tres conteos, suma `Vocabulario-Rules` al mapa §I.1 y a la tabla §I.3, y agrega el segundo ejemplo trabajado de §III.8 |
| `SDD-User-Guide.md` | 1.6 | 1.7 | Corrige la contradicción sobre `Raiz-Codigo`, completa el glosario §10.1 con nueve entradas, suma las cinco transversales, siete «reproducto» y el conteo de FAQ |
| `SDD-Getting-Started-Guide.md` | 1.2 / 1.0 | 1.3 | Unifica la doble declaración de versión, suma seis términos al glosario mínimo, corrige una «reproducto» y el rango de la FAQ |
| `PROMPT-Agente-Bootstrap-SDD.md` | 2.2 | 2.3 | Fila registrada retroactivamente |
| `Coherencia-Vocabulario-Producto-Y-Proyecto-De-Codigo.md` | 1.0 | 1.1 | Reexpresión de las celdas D1 y D2, que afirmaban verificaciones no realizadas; observación 6 nueva |
| `Coherencia-Roles-Y-Defectos-Verificados.md`, `Coherencia-Auditoria-Marco.md`, `Coherencia-Config-Esquema.md`, `Coherencia-Incorporacion.md`, `Coherencia-Panel-Monolitico.md` | 1.0 | 1.1 | Cabecera a `**Framework:** SDD` y reparación léxica. **Alcance verificado sin modificar** |
| Catálogo `References/Design/` (6 `Design-Rules-*` más `Index-Design-Rules.md`), `Index-Modelos-UX-UI.md`, `Rules-Design-Modelo-Template.md`, `Templates/README.md`, `Templates/Modelo-Generico/README.md` | varias | +1 minor | Filas registradas retroactivamente y reparación léxica. `Rules-Design-Modelo-Template.md` suma además §16, su propio control de cambios, que no tenía |
| `README.md` | — | — | Dos filas nuevas en la matriz de ruteo y la capacidad de desambiguación en la línea de reglas transversales |
| `CHANGELOG.md` | — | — | Entrada `[5.1]` |
| `Coherencia-Sustitucion-Lexica-Y-Gobierno-Glosario.md` | — | 1.0 | **Nuevo.** Esta nota |

---

## 5. Verificación de invariantes (D1–D9)

| Invariante | Verificación |
| --- | --- |
| **D1** Idioma y registro | Todo el texto nuevo en español rioplatense neutro técnico, con tildes y eñes, sin emojis ni negritas decorativas. **Barrido de concordancia ejecutado y no declarado**: se buscaron determinantes y adjetivos femeninos junto a «producto» (`la/una/esta/otra/distintas producto`, `producto técnica/actual/completa/propia/adecuada/correcta/elegida/adoptada`) y colocaciones de remedio (`aplicar el producto`, `síntoma/causa/producto`, `sugerencia de producto`, `producto al problema`). Cero residuos. Es el barrido que la nota de la 5.0 afirmaba haber hecho y no había hecho |
| **D2** Encoding | UTF-8 sin BOM, LF. Se restituyó el salto de línea final de `SDD-Development-Guide.md`, que faltaba. Verificado sobre los 45 archivos alcanzados: cero sin LF final |
| **D3** Nombres | `Glosario-Funcional.md` respeta Título-Con-Guiones. Se corrigieron nombres que no lo respetaban y que la propia regla que los contenía prohibía: `especificacion-funcional.md`, `modelo-conceptual.md`, `definicion-<concepto>.md` y `glosario-ux` en todo-minúsculas, y 27 marcadores `{{nombre-proyecto}}` |
| **D4** Sufijo de versión | Ningún archivo vivo lleva sufijo en el nombre; cada uno declara su versión en cabecera. `Glosario-Funcional.md` sigue el patrón |
| **D5** Una sola versión vigente | Un archivo por nombre lógico. **Se corrigió el incumplimiento de la 5.0**: cuatro archivos declaraban en cabecera una versión que su control de cambios no registraba (`Master-Prompt.md` 5.0, `Marco-Teorico-SDD.md` 2.0, `SDD-Development-Guide.md` 1.3, y `SDD-Getting-Started-Guide.md` con dos versiones contradictorias en el mismo archivo), y unos veinte archivos habían sido modificados sin fila. Verificado: cero archivos alcanzados sin fila nueva, salvo el `README.md` raíz, cuyo mecanismo de versionado es el `CHANGELOG.md`, y `Templates/Modelo-Generico/README.md`, que lleva sello al pie |
| **D6** Trazabilidad | `Vocabulario-Rules.md` §9 se referencia desde `Master-Prompt.md` §8, §10 y §15, desde los diecisiete archivos de reglas y desde el `README.md`. Se verificó que la inserción de §9 **no renumeró ninguna sección referenciada desde afuera**: las citas existentes apuntan a §1, §2, §3, §4 R1, §4 R3, §6 y §8, y §9 se insertó por delante de las dos únicas secciones sin referencias entrantes, §9 y §10 anteriores. Una de las citas a §8 vive en el `CHANGELOG.md`, que es registro histórico y no puede corregirse: renumerar habría dejado un registro apuntando a otra sección |
| **D7** Neutralidad de dominio | No se introdujo vocabulario de ningún cliente. Los valores de ejemplo normalizados (`Turnos Médicos Clínica`, `Parser CSV`, `Servicio-Pagos`, `Turnos-Medicos-API`) son formas del dominio de ejemplo que el framework ya usaba. El ejemplo del término polisémico de §9 usa «registro», palabra del vocabulario técnico común |
| **D8** Conjunto cerrado | Los ocho valores no cambian. `Glosario-Funcional.md` es obligatorio para los ocho, lo que **elimina** una condicionalidad por tipo en lugar de agregarla |
| **D9** Evidencia verificable | Cada cifra de esta nota es reproducible con un comando sobre el árbol; §7 los enumera. §9.4 de `Vocabulario-Rules.md` declara explícitamente que la verificación de colisión de contextos es una afirmación sobre el estado del sistema y cae bajo D9. La reexpresión de las celdas D1 y D2 de la nota de la 5.0 se hizo **porque** eran afirmaciones sin evidencia válida |

---

## 6. Verificación de trazabilidad

- Los diecisiete archivos de reglas mencionan el glosario al menos una vez. Antes eran nueve en cero.
- `Master-Prompt.md` §8 lista `Vocabulario-Rules.md` entre los insumos obligatorios de todo despacho, y §10 entre los del auditor. Es lo que faltaba para que el lector declarado en la cabecera de esa regla la reciba.
- `Rules-UX-UI-DX.md` §3.3 y §6 nombran `Glosario-Funcional.md`, que `Rules-Especificacion-Funcional.md` §2.1 crea. Antes obligaban a referenciar «el glosario de 02», que era una sección de un documento condicional y podía no existir.
- `Deriva-Rules.md` §6 remite a `Glosario-UX.md`, que `Rules-UX-UI-DX.md` §2.1 ahora declara obligatorio para los ocho tipos.
- Los conteos de archivos de reglas coinciden entre `README.md` y `SDD-Development-Guide.md`: diecisiete y cinco transversales en los dos.
- El mapa de dependencias de `SDD-Development-Guide.md` §I.1 incluye `Vocabulario-Rules` con sus dos aristas.

---

## 7. Comprobaciones ejecutadas

Todas sobre `IA.SDD`, sin generar documentación de ningún producto.

| # | Comprobación | Resultado |
| --- | --- | --- |
| 1 | `grep -ri 'reproducto'` sobre el árbol vivo | 19 ocurrencias, **todas citas de la palabra como evidencia del defecto**: filas de control de cambios, §9.5 de la regla, este documento y la entrada `[5.1]` del changelog. **Cero en texto normativo** |
| 2 | `grep -r 'Anti-patrón \| Problema \| Producto'` | 0 |
| 3 | `grep -r 'Anti-patrón \| Problema \| Solución'` | 24: las **23** cabeceras restituidas, que es el total previo a la migración, más la cita de §3.2 de este documento |
| 4 | Etiqueta `**Proyecto de código:**` sobre valor `Template SDD` o `{{Nombre-Producto}}` | 0 |
| 5 | `{{nombre-proyecto}}` fuera de `Bootstrap/` | 0 en texto normativo; 2 citas en §3.3 y §5 de este documento |
| 6 | `grep -ci glosario Rules-Especificacion-Funcional.md` | 20, de 1 |
| 7 | Archivos de reglas con cero menciones de «glosario» | 0 de 17 |
| 8 | Filas históricas de control de cambios que difieren de su texto original | 0 |
| 9 | Coherencia de columnas en cada tabla de control de cambios | Cero desajustes en las filas nuevas. La migración había insertado filas de cuatro celdas en tablas de tres columnas; se normalizaron las nuevas y **no se tocaron las históricas**, que en cinco archivos ya traían el desajuste desde antes de la 5.0. Se corrigieron además dos filas propias de esta intervención que citaban una cabecera de tabla con sus barras verticales literales y por eso rompían la celda |
| 10 | Archivos alcanzados sin salto de línea final | 0 |
| 11 | Ocurrencias de `Nombre-Solucion`, `NombreSolucionCodigo` o `project_type` fuera de `Bootstrap/` y `_legacy/` | Solo dentro de filas de control de cambios que declaran el renombre citando el nombre anterior, que es lo que §VI.2 pide |

**Prueba de regresión pendiente, declarada.** La comprobación definitiva del Defecto B es generar la categoría 02 de un producto de tipo `library` o `cli-tool` —sin persistencia— y verificar que emite glosario. No se ejecutó: requiere una corrida completa del orquestador sobre un destino, que está fuera del alcance de una intervención sobre el repositorio fuente. Queda declarada para no leerse como verificada.

---

## 8. Observaciones

1. **El defecto de la 5.0 es la mejor evidencia de que el criterio hacía falta.** La intervención declaró una regla de vocabulario y aplicó *la forma* del patrón —reemplazar el término— sin *el criterio* de verificar, por ocurrencia, si el referente cambiaba. Es el mismo mecanismo que la orden de trabajo de origen describía para los productos generados, ocurriendo dentro del framework. `Vocabulario-Rules.md` §9.5 es la primera regla del framework cuya evidencia es un defecto del propio framework.
2. **Un veredicto APROBADO no detectó el defecto porque no había criterio contra el cual detectarlo.** La nota de coherencia de la 5.0 verificó D1 a D9 y aprobó, y su celda D1 afirmaba un barrido de concordancias que no se había hecho. No fue negligencia de la verificación: era una verificación que ninguna regla exigía y que ningún criterio de aceptación describía. Ahora la exige `Vocabulario-Rules.md` §10.
3. **La inserción de §9 se ubicó por restricción de trazabilidad, no por lectura.** El lugar natural del criterio es después de §6, que trata el choque de un término con el dominio del cliente. Se ubicó en §9 porque insertar antes habría renumerado §8, citada desde el `CHANGELOG.md`, que es registro histórico e intocable. Se compensó con un puntero explícito de §6 a §9. Es el costo de tener un registro inmutable, y es un costo que conviene pagar.
4. **No todas las categorías reciben un glosario propio, y eso es deliberado.** Solo 02, 03 y 11 emiten uno. Las demás reciben el criterio de aceptación con el **destino** de sus términos declarado: 01 los deja en el glosario del dominio de 00, 05 y 09 en el `Glosario-Tecnico.md` de 11, 06, 07, 08 y 10 no acuñan vocabulario y un término nuevo ahí es señal de que falta aguas arriba. Multiplicar glosarios habría creado el problema de duplicación que la regla de no duplicación existe para evitar.
5. **`Rules-UX-UI-DX.md` era el modelo a replicar y necesitaba cambio.** La orden de trabajo de origen lo declaraba «sin cambios porque ya cumple». Es cierto que era la única de las trece que gobernaba su glosario, y su §3.3 se replicó tal cual. Pero su artefacto era «Recomendado» y su único criterio verificaba la no duplicación: un proyecto podía omitir el glosario y pasar el audit.
6. **Filas de la 4.1 no restituibles.** Declarado en §3.4. Es el único daño de la migración que no se reparó, y no se reparó porque repararlo requeriría inventar el texto.

---

## 9. Lo que esta intervención deliberadamente no hace

- **No revierte el renombre de la 5.0.** El paso de «solución» a «producto» y de «proyecto» a «proyecto de código» era correcto y está bien fundado. Lo que se repara es el método de aplicación, no la decisión.
- **No propone una invariante D10.** El criterio de desambiguación es una regla operativa transversal, no una invariante del template. Las invariantes D1-D9 no se tocan.
- **No toca `SDD/Devs/Bootstrap/` ni `_legacy/`.** Un registro que se corrige después deja de ser un registro. Las dos «reproducto» y los `project_type` que `Bootstrap/` conserva citan el estado vigente en su momento.
- **No unifica los glosarios en uno solo por producto.** El modelo de un glosario por categoría con regla de no duplicación es el que funciona; el defecto era que no estaba replicado.
- **No materializa el nivel de unidad de entrega.** Sigue siendo el pendiente declarado de `Vocabulario-Rules.md` §8, y esta intervención no lo mueve.

---

## 10. Veredicto

**APROBADO CON UNA VERIFICACIÓN PENDIENTE DECLARADA.**

El conjunto 5.1 cierra los dos defectos de gobierno de glosario con criterios auditables, y repara las cuatro clases de daño que la migración de la 5.0 había introducido. Las once comprobaciones de §7 se ejecutaron y dan el resultado esperado.

La verificación pendiente es la prueba de regresión con una corrida real sobre un producto de tipo `library` o `cli-tool`, que es la única que demuestra empíricamente que la categoría 02 ya emite glosario sin persistencia. Se declara como pendiente y no como cumplida, porque afirmarla sin haberla corrido sería exactamente el defecto que la celda D1 de la nota anterior cometió.

---

## 11. Control de cambios

| Versión | Fecha | Cambios | Autor |
| --- | --- | --- | --- |
| 1.0 | 2026-07-29 | Nota inicial de la intervención publicada como framework 5.1: gobierno del glosario —criterio de desambiguación léxica en `Vocabulario-Rules.md` §9, `Glosario-Funcional.md` como artefacto obligatorio de la categoría 02, criterios de aceptación en los diecisiete archivos de reglas y cuatro criterios de glosario en el audit del orquestador— y reparación de las cuatro clases de daño que la sustitución global de cadena de la 5.0 había producido: 30 ocurrencias de «reproducto», 23 cabeceras de tabla de anti-patrones, 14 etiquetas de cabecera sobre valores de otro plano y 60 filas históricas de control de cambios reescritas. Incluye la verificación D1-D9 con el barrido de concordancia que la nota de la 5.0 declaraba sin haberlo hecho, once comprobaciones reproducibles, y la prueba de regresión con corrida real declarada como pendiente. | AG-ROOT |
