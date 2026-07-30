# Nota de coherencia — Incorporación del catálogo de reglas de diseño

**Proyecto:** Template SDD
**Documento:** Coherencia-Incorporacion.md
**Versión:** 1.0
**Estado:** Vigente
**Fecha:** 2026-06-19
**Autor:** AG-ROOT (Arquitecto de Soluciones)

---

## 1. Alcance

Pase de verificación en lectura sobre la incorporación del catálogo de reglas de diseño (`devs/References/Design/`) y su cableado en la metodología SDD. Cubre los archivos creados y editados en las fases 1 a 3, contra las invariantes D1–D8 del template y la trazabilidad esperada del catálogo.

## 2. Inventario de archivos

### 2.1 Creados

| Archivo | Rol |
| --- | --- |
| `devs/References/Design/Index-Design-Rules.md` | Índice del catálogo: propósito, tabla del catálogo, roadmap de especializaciones, criterio de selección, control de cambios. |
| `Devs/References/Design/Coherencia-Incorporacion.md` | Esta nota de coherencia. |

### 2.2 Provistos, intactos (no modificados)

| Archivo | Estado |
| --- | --- |
| `Devs/References/Design/Design-Rules-Web-Generico.md` | Documento base, sin alteración. |
| `Devs/References/Design/Design-Rules-Blazor-Mudblazor.md` | Especialización Blazor + MudBlazor, sin alteración. |

### 2.3 Editados

| Archivo | Cambios | Versión |
| --- | --- | --- |
| `devs/Rules/Rules-UX-UI-DX.md` | Nueva §1.4 (insumos normativos de diseño por stack), fila de anti-patrón en §4.4, fila "Catálogo de diseño aplicado" en la tabla de trazabilidad de §4.3, control de cambios. | 1.2 → 1.3 |
| `devs/Orchestrator/Master-Prompt.md` | Nota operativa en §6 sobre el insumo del catálogo para AG-03 en proyectos con UI, fila en la tabla de versionado §16. | 3.0 → 3.1 |
| `Devs/Guides/Marco-Teorico-SDD.md` | `references/` sumado al mapa de carpetas del plano `devs/` (§1.5), nueva subsección §8.7 sobre el catálogo. | sin marca de versión interna; solo edición |
| `Guides/SDD-User-Guide.md` | Subárbol `References/Design/` sumado al mapa de carpetas del plano `devs/` (§10.2). | sin marca de versión interna; solo edición |

No se modificó `docs/`. No se sobrescribió ninguna plantilla.

## 3. Verificación de invariantes (D1–D8)

| Invariante | Resultado | Evidencia |
| --- | --- | --- |
| Idioma español rioplatense neutro técnico | Cumple | Todo el contenido nuevo en español; sin emojis ni negritas decorativas. |
| Encoding UTF-8 | Cumple | Archivos nuevos en UTF-8 sin BOM. |
| Título-Con-Guiones en nombres de archivo | Cumple | `Index-Design-Rules.md`, `Coherencia-Incorporacion.md` y los `design-rules-*` siguen Título-Con-Guiones; los prefijos `_` se alinean con los meta-archivos existentes (`Root-Rules.md`, `Intake-Rules.md`). |
| Versionado de nombre (D4) | Cumple | Los archivos declaran su versión en el campo `Versión` de su cabecera y ninguno lleva sufijo de versión en el nombre. Reexpresado bajo la D4 vigente desde el framework 4.0; la verificación original de esta nota se hizo contra la D4 anterior, que exigía el sufijo en el nombre. |
| Una sola versión vigente por nombre lógico | Cumple | Un único archivo por nombre lógico en `References/Design/`; sin versiones paralelas. |
| Trazabilidad explícita en cabeceras | Cumple | El índice y esta nota declaran Proyecto/Documento/Versión/Estado/Fecha/Autor; la cabecera de la regla 03 sube a 1.3 y la del master-prompt a 3.1, con su control de cambios respectivo. |
| Vocabulario neutro sin atar al dominio de ninguna solución (D7) | Cumple | El contenido nuevo no introduce literales de dominio de solución. Los nombres de stack (Blazor, MudBlazor, MAUI, HTML) y los tokens de diseño pertenecen a la capa de especialización por stack del catálogo, no al dominio funcional de una solución. |
| Conjunto cerrado D8 de `project_type` | Cumple | El índice y los cableados referencian valores D8 existentes (web-monolith, web-microservices, mobile-app-maui, desktop-app); no se inventa ningún `project_type` nuevo. |

## 4. Verificación de trazabilidad

| Eslabón | Resultado | Evidencia |
| --- | --- | --- |
| El índice referencia los dos documentos | Cumple | Tabla del catálogo en `Index-Design-Rules.md` §2 lista `Design-Rules-Web-Generico.md` y `Design-Rules-Blazor-Mudblazor.md` con su relación base→especialización. |
| La regla 03 referencia el índice | Cumple | §1.4 de `Rules-UX-UI-DX.md` indica cargar el catálogo a través de `Index-Design-Rules.md`. |
| El marco teórico referencia el subárbol | Cumple | §1.5 (mapa de carpetas) y §8.7 de `Marco-Teorico-SDD.md` mencionan `devs/References/Design/` y el modelo base→especialización. |
| La guía de usuario referencia el subárbol | Cumple | §10.2 de `SDD-User-Guide.md` incluye `References/Design/` en el árbol del plano `devs/` con su línea de propósito. |
| El master-prompt incluye el insumo | Cumple | Nota operativa de §6 de `Master-Prompt.md` suma el catálogo como insumo de AG-03 para proyectos con UI. |

## 5. Observaciones

1. Fin de línea CRLF (informativa, preexistente). La tabla de invariantes de solución del master-prompt menciona LF como EOL, pero todos los archivos del repositorio (incluidos los dos documentos provistos del catálogo, la regla 03 y el master-prompt) usan CRLF, y no hay `.gitattributes` que fuerce LF. Los archivos nuevos se crearon en CRLF para mantener consistencia con el repositorio y con los archivos provistos. Es una discrepancia preexistente a nivel template, fuera del alcance de esta incorporación; normalizar el EOL implicaría reescribir todos los archivos del plano `devs/`.

## 6. Veredicto

APROBADO CON OBSERVACIONES.

Las invariantes verificadas (Título-Con-Guiones, versión declarada en la cabecera y no en el nombre, encoding UTF-8, idioma, ausencia de literales de dominio, una sola versión vigente por nombre) y la trazabilidad del catálogo cumplen. La única observación es la del EOL CRLF, preexistente y de alcance template, sin impacto sobre la coherencia de la incorporación.

## 7. Control de cambios

| Versión | Fecha | Cambios | Autor |
| --- | --- | --- | --- |
| 1.0 | 2026-06-19 | Nota de coherencia inicial de la incorporación del catálogo de reglas de diseño y su cableado en la regla 03, el marco teórico, la guía de usuario y el master-prompt. | AG-ROOT |
