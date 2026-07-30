# Nota de coherencia — Incorporación de la configuración dirigida por esquema

**Framework:** SDD
**Documento:** Coherencia-Config-Esquema.md
**Versión:** 1.1
**Estado:** Vigente
**Fecha:** 2026-06-20
**Autor:** AG-ROOT (Arquitecto de Soluciones, pase de QA)

---

## 1. Alcance

Pase de verificación en lectura sobre la incorporación de la extensión por capacidad "configuración dirigida por esquema" al catálogo de reglas de diseño (`devs/References/Design/`) y su cableado en la metodología SDD. Cubre los archivos creados y editados en las fases 1 a 6, contra las invariantes D1–D8 del template, con énfasis en D7 (neutralidad de dominio), y la cadena de trazabilidad esperada.

## 2. Inventario de archivos

### 2.1 Creados

| Archivo | Rol |
| --- | --- |
| `Devs/References/Design/Design-Rules-Config-Esquema.md` | Documento de capacidad: configuración dirigida por esquema (§0–§12), agnóstico de framework. |
| `Devs/References/Design/Coherencia-Config-Esquema.md` | Esta nota de coherencia. |

### 2.2 Editados

| Archivo | Cambios | Versión |
| --- | --- | --- |
| `Devs/References/Design/Design-Rules-Web-Generico.md` | Principio rector 8, estado semántico `info` en §2.1 (con confirmación de `warning` = Atención), anti-patrón en §10, extensión por capacidad en §11, control de cambios. | 1.0 → 1.1 |
| `devs/References/Design/Index-Design-Rules.md` | §1 distingue especializaciones por stack de extensiones por capacidad; §2 registra el documento de capacidad en subtabla propia; §4 criterio de carga; §3 nota de roadmap; control de cambios. | 1.0 → 1.1 |
| `Devs/References/Design/Design-Rules-Blazor-Mudblazor.md` | Nueva §4.1: mapeo de los patrones de configuración por esquema a componentes MudBlazor; control de cambios. | 1.0 → 1.1 |
| `devs/Rules/Rules-UX-UI-DX.md` | §1.4 extendida (carga de la extensión y requisitos sobre `experiencia-de-uso`/`wireframes`), anti-patrones en §4.4, fila de trazabilidad en §4.3, control de cambios. | 1.3 → 1.4 |
| `Devs/Guides/Marco-Teorico-SDD.md` | Párrafo en §8.7 sobre el eje de configuración dirigida por esquema. | sin marca de versión interna; solo edición |
| `Guides/SDD-User-Guide.md` | `Design-Rules-Config-Esquema.md` sumado al árbol del plano `devs/` en §10.2. | sin marca de versión interna; solo edición |
| `devs/Orchestrator/Master-Prompt.md` | Nota operativa en §6 sobre la extensión como insumo de AG-03; fila 3.2 en §16 (y corrección del orden de las filas 3.0/3.1); cabecera. | 3.1 → 3.2 |

No se modificó `docs/`. No se sobrescribió ninguna plantilla.

## 3. Verificación de invariantes (D1–D8)

| Invariante | Resultado | Evidencia |
| --- | --- | --- |
| D1 — Idioma | Cumple | Todo el contenido nuevo en español rioplatense técnico; sin emojis ni negritas decorativas; tono alineado con el resto del catálogo. |
| D2 — Encoding | Cumple | Archivos nuevos en UTF-8 sin BOM. |
| D3 — Nombres | Cumple | `Design-Rules-Config-Esquema.md` en Título-Con-Guiones; `Coherencia-Config-Esquema.md` con prefijo `_` de meta-archivo, igual que `_index` y `Coherencia-incorporacion`. |
| D4 — Versionado de nombre | Cumple | Los archivos declaran su versión en el campo `Versión` de su cabecera y ninguno lleva sufijo de versión en el nombre. Reexpresado bajo la D4 vigente desde el framework 4.0; la verificación original de esta nota se hizo contra la D4 anterior, que exigía el sufijo en el nombre. |
| D5 — Una sola versión vigente | Cumple | Un único archivo por nombre lógico; los documentos editados suben versión in situ, sin copias paralelas. |
| D6 — Trazabilidad de cabecera | Cumple | El documento de capacidad declara Proyecto/Documento/Versión/Estado/Fecha/Autor/Ámbito/Posición, más tablas de Trazabilidad (§11) y Control de cambios (§12); esta nota declara su cabecera y control de cambios. |
| D7 — Neutralidad de dominio (crítica) | Cumple | El catálogo no contiene literales del dominio de moderación de la fuente: no aparecen baneo/banear/ban, spam, canales (de chat), timeout, "palabra prohibida" ni fan-out. El vocabulario es neutro: parámetro, umbral, ventana, unidad, default, límite, ejemplo, preset, propuesta, simulación, descriptor. La búsqueda de literales prohibidos solo arroja falsos positivos neutros: "el único canal de información/sensorial" (idiom de accesibilidad), "Banner" (término de UI) y "Bandeja" (ejemplo de inbox preexistente en el base y la especialización Blazor), ninguno del dominio fuente. |
| D8 — `tipo_proyecto_codigo` | Cumple | No se inventan valores: la extensión aplica de forma transversal "a cualquier proyecto de código con superficies de configuración"; los `tipo_proyecto_codigo` citados (web-monolith, web-microservices, mobile-app-maui, desktop-app) son del conjunto cerrado existente. |

## 4. Verificación de trazabilidad

| Eslabón | Resultado | Evidencia |
| --- | --- | --- |
| Índice → documento de capacidad | Cumple | `Index-Design-Rules.md` §2 registra `Design-Rules-Config-Esquema.md` en la subtabla de extensiones por capacidad; §4 fija su criterio de carga. |
| Documento de capacidad → base | Cumple | La cabecera declara "Hereda de `Design-Rules-Web-Generico.md`" y §0/§11 lo confirman; el base lo registra en §11 (extensión por capacidad) y lo remite desde el principio 8. |
| Especialización Blazor → documento de capacidad | Cumple | `Design-Rules-Blazor-Mudblazor.md` §4.1 mapea los patrones de la extensión a componentes MudBlazor. |
| Regla 03 → índice / extensión | Cumple | `Rules-UX-UI-DX.md` §1.4 indica cargar `Design-Rules-Config-Esquema` vía el índice cuando hay superficies de configuración. |
| Marco teórico → subárbol | Cumple | `Marco-Teorico-SDD.md` §8.7 describe el eje de extensiones por capacidad y la configuración dirigida por esquema. |
| Guía de usuario → árbol | Cumple | `SDD-User-Guide.md` §10.2 incluye `Design-Rules-Config-Esquema.md` en el árbol del plano `devs/`. |
| Master-prompt → insumo | Cumple | `Master-Prompt.md` §6 suma la extensión como insumo de AG-03 para proyectos de código con superficies de configuración; §16 lo registra en la fila 3.2. |
| Límite con 05/02 | Cumple | El documento de capacidad acota el lado UX y referencia el motor (registro de descriptores, validación, salidas estructuradas / tool calling, plan-and-apply) como cross-ref a 05 y el qué funcional a 02, sin implementarlos. |

## 5. Observaciones

1. Fin de línea CRLF (informativa, preexistente). Como en la incorporación previa del catálogo, todos los archivos del repositorio usan CRLF y no hay `.gitattributes` que fuerce LF; los archivos nuevos se crearon en CRLF para mantener consistencia. Discrepancia preexistente a nivel template respecto del LF documentado en las invariantes de producto, fuera del alcance de esta incorporación.
2. Higiene en §16 del master-prompt. Al agregar la fila 3.2 se corrigió el orden de las filas 3.0 y 3.1, que habían quedado invertidas en la incorporación anterior; la tabla queda ahora en orden ascendente.

## 6. Veredicto

APROBADO CON OBSERVACIONES.

Las invariantes D1–D8 se cumplen, con D7 verificada de forma explícita (ningún literal del dominio de moderación de la fuente se filtró al catálogo), y la cadena de trazabilidad cierra extremo a extremo (índice → capacidad → base, especialización Blazor → capacidad, regla 03 → índice, marco teórico y guía → subárbol, master-prompt → insumo). Las observaciones son el EOL CRLF preexistente y la corrección de orden en §16, sin impacto sobre la coherencia de la incorporación.

## 7. Control de cambios

| Versión | Fecha | Cambios | Autor |
| --- | --- | --- | --- |
| 1.0 | 2026-06-20 | Nota de coherencia inicial de la incorporación de la extensión por capacidad "configuración dirigida por esquema" y su cableado en el base, el índice, la especialización Blazor, la regla 03, el marco teórico, la guía de usuario y el master-prompt. | AG-ROOT |
| 1.1 | 2026-07-29 | Vocabulario normativo (framework 5.0), registrado en la 5.1. El campo de cabecera `**Proyecto:** Template SDD` pasa a `**Framework:** SDD`, porque el referente es el framework y no una unidad de compilación; es el patrón que ya usa `Coherencia-Vocabulario-Producto-Y-Proyecto-De-Codigo.md`. El cuerpo adopta el vocabulario de `Vocabulario-Rules.md` §2. **El alcance verificado por esta nota no se modifica**, según el criterio de reexpresión del `README.md`: se reexpresa cómo se nombra el sujeto verificado, no la verificación. La fila se registra en la 5.1 porque la migración modificó el archivo sin dejar registro, contra `SDD-Development-Guide.md` §VI.1. | AG-ROOT |
