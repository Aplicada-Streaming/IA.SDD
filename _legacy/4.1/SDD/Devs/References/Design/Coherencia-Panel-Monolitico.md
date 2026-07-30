# Nota de coherencia — Incorporación del arquetipo de panel de control monolítico

**Proyecto:** Template SDD
**Documento:** Coherencia-Panel-Monolitico.md
**Versión:** 1.0
**Estado:** Vigente
**Fecha:** 2026-07-18
**Autor:** AG-ROOT (Arquitecto de Soluciones, pase de QA)

---

## 1. Alcance

Pase de verificación en lectura sobre la incorporación de tres extensiones por capacidad al catálogo de reglas de diseño (`devs/References/Design/`) y su cableado en la metodología SDD: primer arranque y aprovisionamiento inicial, acceso de operador único en panel monolítico, e identidad de versión y su superficie. Las tres se derivaron de la extracción de características de un panel de control monolítico de un servicio específico, en producción. Cubre además la actualización de la extensión de configuración dirigida por esquema con los hallazgos de la misma extracción. Se verifica contra las invariantes D1–D8 del template, con énfasis en D7 (neutralidad de dominio), y la cadena de trazabilidad esperada.

## 2. Inventario de archivos

### 2.1 Creados

| Archivo | Rol |
| --- | --- |
| `Devs/References/Design/Design-Rules-Primer-Arranque.md` | Documento de capacidad: primer arranque y aprovisionamiento inicial (§0–§12), agnóstico de framework. |
| `Devs/References/Design/Design-Rules-Acceso-Monousuario.md` | Documento de capacidad: acceso de operador único en panel monolítico (§0–§12), agnóstico de framework. |
| `Devs/References/Design/Design-Rules-Identidad-De-Version.md` | Documento de capacidad: identidad de versión y su superficie (§0–§12), agnóstico de framework. |
| `Devs/References/Design/Coherencia-Panel-Monolitico.md` | Esta nota de coherencia. |

### 2.2 Editados

| Archivo | Cambios | Versión |
| --- | --- | --- |
| `Devs/References/Design/Design-Rules-Config-Esquema.md` | §2.1 nueva (frontera entre configuración de aplicación y de entorno), §4.4 con la derivación de presets desde `ejemplos` y `default`, §9 criterios, §10 tres anti-patrones, §11 extensión hermana y cross-ref de despliegue, control de cambios. | 1.0 → 1.1 |
| `Devs/References/Design/Design-Rules-Web-Generico.md` | §10 dos anti-patrones (chrome sin sesión, instancia sin versión visible), §11 registro de las tres extensiones nuevas, control de cambios. | 1.1 → 1.2 |
| `Devs/References/Design/Design-Rules-Blazor-Mudblazor.md` | Nueva §4.2: mapeo de los patrones de las tres extensiones a componentes MudBlazor, con notas de fidelidad sobre formularios de identidad por POST; §11 registra las extensiones mapeadas; control de cambios. | 1.1 → 1.2 |
| `Devs/References/Design/Index-Design-Rules.md` | §2 registra las tres extensiones y la nota del arquetipo que las agrupa; §4 reemplaza el criterio de carga en prosa por tabla de condiciones y declara la ortogonalidad mutua; control de cambios. | 1.1 → 1.2 |
| `Devs/Rules/Rules-UX-UI-DX.md` | §1.4 extendida con la condición de carga y los requisitos sobre `experiencia-de-uso`/`wireframes` de cada extensión, más la frontera aplicación/entorno; §4.3 tres filas de trazabilidad; §4.4 siete anti-patrones; control de cambios. | 1.4 → 1.5 |
| `Devs/Orchestrator/Master-Prompt.md` | Notas operativas en §6 (tres insumos condicionales nuevos para AG-03 y declaración de ortogonalidad); fila 3.3 en §16; cabecera. | 3.2 → 3.3 |
| `Devs/Guides/Marco-Teorico-SDD.md` | Párrafo en §8.7 sobre las tres extensiones y el arquetipo que describen en conjunto. | sin marca de versión interna; solo edición |
| `Guides/SDD-User-Guide.md` | Los tres documentos nuevos sumados al árbol del plano `devs/` en §10.2. | sin marca de versión interna; solo edición |

No se modificó `docs/`. No se sobrescribió ninguna plantilla. No se modificó el proyecto fuente del que se extrajeron las características.

## 3. Verificación de invariantes (D1–D8)

| Invariante | Resultado | Evidencia |
| --- | --- | --- |
| D1 — Idioma | Cumple | Todo el contenido nuevo en español rioplatense técnico, tono normativo en presente indicativo; sin emojis ni negritas decorativas; la negrita queda reservada a las etiquetas de cabecera. |
| D2 — Encoding | Cumple | Archivos nuevos en UTF-8 sin BOM. |
| D3 — Nombres | Cumple | `Design-Rules-Primer-Arranque.md`, `Design-Rules-Acceso-Monousuario.md` y `Design-Rules-Identidad-De-Version.md` en Título-Con-Guiones, sin espacios, tildes ni eñes; la nota de coherencia sigue la convención vigente del subárbol. |
| D4 — Versionado de nombre | Cumple | Los archivos declaran su versión en el campo `Versión` de su cabecera y ninguno lleva sufijo de versión en el nombre. Reexpresado bajo la D4 vigente desde el framework 4.0; la verificación original de esta nota se hizo contra la D4 anterior, que exigía el sufijo en el nombre. |
| D5 — Una sola versión vigente | Cumple | Un único archivo por nombre lógico; sin copias paralelas ni entradas en `_legacy/`. |
| D6 — Trazabilidad de cabecera | Cumple | Los tres documentos de capacidad declaran Proyecto/Documento/Versión/Estado/Fecha/Autor/Ámbito/Hereda de/Posición, y cierran con Trazabilidad (§11) y Control de cambios (§12) como últimas secciones. |
| D7 — Neutralidad de dominio (crítica) | Cumple | El catálogo no contiene literales del dominio de la fuente ni de su stack: la búsqueda de términos del servicio original y de su tecnología no arroja ninguna ocurrencia en los tres documentos nuevos. Los únicos aciertos de la búsqueda son falsos positivos léxicos ("botón" contra el término de dominio, en contexto de UI). El vocabulario es neutro: instancia, predicado, aprovisionamiento, artefacto mínimo, identidad, operador, sesión, secreto, shell, sello, construcción. El mapeo a tecnología concreta vive donde corresponde: en la especialización por stack (§4.2 de `Design-Rules-Blazor-Mudblazor`). |
| D8 — `project_type` | Cumple | No se inventan valores. Las tres extensiones aplican de forma transversal por condición declarada en el intake, no por tipo; los `project_type` citados de forma indirecta pertenecen al conjunto cerrado existente. |

## 4. Verificación de trazabilidad

| Eslabón | Resultado | Evidencia |
| --- | --- | --- |
| Índice → documentos de capacidad | Cumple | `Index-Design-Rules.md` §2 registra los tres en la subtabla de extensiones por capacidad; §4 fija la condición de carga de cada uno en tabla. |
| Documentos de capacidad → base | Cumple | Las tres cabeceras declaran "Hereda de `Design-Rules-Web-Generico.md`" y §0/§11 lo confirman; el base los registra en §11 y remite a dos de ellos desde los anti-patrones de §10. |
| Extensiones entre sí | Cumple | Primer arranque y acceso monousuario se declaran extensión hermana mutua (shell de acceso compartido); identidad de versión declara la superficie de acceso como una de sus ubicaciones obligatorias; configuración por esquema declara a primer arranque como hermana por la frontera de entorno. |
| Especialización Blazor → documentos de capacidad | Cumple | `Design-Rules-Blazor-Mudblazor.md` §4.2 mapea los patrones de las tres extensiones a componentes MudBlazor; §11 las registra. |
| Regla 03 → índice / extensiones | Cumple | `Rules-UX-UI-DX.md` §1.4 indica cargar cada extensión vía el índice según su condición, y fija los requisitos sobre `experiencia-de-uso` y `wireframes`; §4.3 suma la fila de trazabilidad de cada una. |
| Marco teórico → subárbol | Cumple | `Marco-Teorico-SDD.md` §8.7 describe las tres extensiones y el arquetipo que conforman. |
| Guía de usuario → árbol | Cumple | `SDD-User-Guide.md` §10.2 incluye los tres documentos en el árbol del plano `devs/`. |
| Master-prompt → insumo | Cumple | `Master-Prompt.md` §6 suma las tres como insumo condicional de AG-03 y declara su ortogonalidad; §16 lo registra en la fila 3.3. |
| Límite con 05/02/09 | Cumple | Los tres documentos acotan el lado UX y referencian como cross-ref lo que no les pertenece: el predicado técnico, la transaccionalidad, el esquema de credenciales y la credencial de sesión a 05; el qué funcional a 02; la instalación, la provisión del secreto, el cálculo de la versión y el etiquetado de artefactos a 09. |

## 5. Observaciones

1. Esqueletos de referencia en ASCII (nueva, deliberada). Los documentos de primer arranque, acceso monousuario e identidad de versión incorporan una sección §7 con esqueletos de composición en bloques `text`. Es una desviación respecto de las References previas, que no usaban arte ASCII y dejaban el wireframe como artefacto exclusivo de salida de AG-03. Se adoptó porque las tres capacidades se definen tanto por la composición de sus superficies como por sus reglas, y describirlas solo en prosa obligaba a que cada proyecto reinventara el layout. Los esqueletos fijan composición y no valores, y se declaran explícitamente como referencia, no como wireframe del proyecto: el artefacto `wireframes-<superficie>` sigue siendo responsabilidad de AG-03 y referencia los patrones por nombre.
2. Ubicación de la identidad de versión en `Design/` (informativa). La mecánica de versionado es materia de la categoría 09, no de diseño. El documento incorporado acota deliberadamente su alcance al contrato que la superficie consume y a su presentación, y remite el resto a 09 por cross-ref. Si el catálogo incorpora en el futuro un subárbol de References para entrega, corresponde revisar si la parte no visual migra allí.
3. Longitud de los documentos (informativa). Los tres nuevos quedan entre 198 y 234 líneas, dentro del rango del catálogo (190–270) y por debajo del techo de facto de 300.
4. Fin de línea LF (correctiva). Se verificó el fin de línea real de los archivos del repositorio y es LF, coincidente con lo documentado en las invariantes del `Master-Prompt.md` §5. Los archivos nuevos se crearon en LF. Esto contradice la observación registrada en las dos notas de coherencia previas del subárbol (`Coherencia-Incorporacion.md` y `Coherencia-Config-Esquema.md`), que declaraban un CRLF de facto y una discrepancia con la invariante: esa observación es incorrecta y queda anulada. No hay discrepancia de EOL abierta en el subárbol.

## 6. Veredicto

APROBADO CON OBSERVACIONES.

Las invariantes D1–D8 se cumplen, con D7 verificada de forma explícita (ningún literal del dominio ni del stack de la fuente se filtró al catálogo; el mapeo tecnológico quedó confinado a la especialización por stack), y la cadena de trazabilidad cierra extremo a extremo (índice → capacidades → base, capacidades entre sí, especialización Blazor → capacidades, regla 03 → índice, marco teórico y guía → subárbol, master-prompt → insumo). Las observaciones son la incorporación deliberada de esqueletos ASCII como desviación de formato justificada, la ubicación provisoria de la identidad de versión en el subárbol de diseño, y la corrección del EOL declarado en las notas de coherencia previas (es LF, no CRLF); ninguna afecta la coherencia de la incorporación.

## 7. Control de cambios

| Versión | Fecha | Cambios | Autor |
| --- | --- | --- | --- |
| 1.0 | 2026-07-18 | Nota de coherencia inicial de la incorporación de las extensiones por capacidad "primer arranque", "acceso de operador único" e "identidad de versión", de la actualización de "configuración dirigida por esquema" a 1.1, y de su cableado en el base, el índice, la especialización Blazor, la regla 03, el marco teórico, la guía de usuario y el master-prompt. | AG-ROOT |
