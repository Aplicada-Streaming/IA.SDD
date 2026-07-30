# Nota de coherencia — Auditoría del marco teórico contra configuración dirigida por esquema

**Framework:** SDD
**Documento:** Coherencia-Auditoria-Marco.md
**Versión:** 1.1
**Estado:** Vigente
**Fecha:** 2026-06-20
**Autor:** AG-ROOT (Arquitecto de Soluciones, pase de QA) con verificación de AG-08

---

## 1. Alcance

Pase de verificación en lectura sobre la auditoría de `Marco-Teorico-SDD.md` contra las mejoras de configuración dirigida por esquema (schema-driven UI) y su AI-readiness. La auditoría diagnosticó sección por sección, convirtió cada brecha en una tarea con especialidad asignada y ejecutó las ediciones de forma quirúrgica y serializada sobre el documento. Esta nota verifica el resultado contra las invariantes D1–D8 (con énfasis en D7) y la cadena de trazabilidad con el catálogo de diseño, la regla 03 y el master-prompt.

## 2. Inventario de archivos

### 2.1 Creados

| Archivo | Rol |
| --- | --- |
| `Devs/Guides/Coherencia-Auditoria-Marco.md` | Esta nota de coherencia. |

### 2.2 Editado

`Devs/Guides/Marco-Teorico-SDD.md` (1.3 → 1.4). Secciones tocadas, una por tarea de la auditoría:

| Tarea | Sección | Cambio | Lente |
| --- | --- | --- | --- |
| T1 | §1.5 Mapa visual | `references/` pasa a "por stack y por capacidad" | AG-ROOT |
| T2 | §2.5 SDD encaja con IA | Párrafo: descriptor como contrato + frontera validable + simulación + propone/confirma/valida | AG-05 (apoyo AG-04) |
| T3 | §4.2 AG-03 | Línea: carga la extensión y produce superficies de configuración por descriptor | AG-03 |
| T4 | §4.2 AG-05 | Línea: motor de la frontera `PropuestaDeConfiguracion` como responsabilidad de arquitectura | AG-05 |
| T5 | §4.2 AG-04 | Línea: asistente futuro (descriptores como tool definitions, structured outputs contra la frontera) | AG-04 |
| T6 | §7.5 Patrones transversales | Bullet: plan-and-apply con frontera validable como patrón transversal agnóstico de D8 | AG-05 |
| T7 | §8.3 Leyes UX | Párrafo: divulgación progresiva a Hick/Miller; ayuda contextual a la heurística 10 | AG-03 |
| T8 | §11.1 Plan-then-confirm | Párrafo: propone/confirma/valida como instancia runtime con human-in-the-loop | AG-04 |
| T9 | §12.3 Anti-patrones | Fila "IA que ejecuta en vez de proponer" + nota de anti-patrones de UX (default/ayuda hardcodeados) | AG-08 (apoyo AG-03) |
| T10 | §13 Glosario | Nueve términos nuevos | AG-10 |
| T11 | Cabecera + Control de Cambios | Versión 1.3 → 1.4, fecha y fila de changelog | AG-ROOT |

Secciones sin cambio: §8.7 ya reflejaba el núcleo de la mejora (Cumple en el diagnóstico). §14 Bibliografía queda igual: la mejora no introduce una fuente formal nueva realmente citada, y no se agregan referencias de relleno. No se tocó `docs/` ni se sobrescribió ninguna plantilla.

## 3. Verificación de invariantes (D1–D8)

| Invariante | Resultado | Evidencia |
| --- | --- | --- |
| D1 — Idioma | Cumple | Adiciones en español rioplatense técnico, tono alineado con el marco; sin emojis ni negritas decorativas (salvo las etiquetas de término del glosario, que siguen el estilo preexistente de esa tabla). |
| D2 — Encoding | Cumple | El archivo nuevo se creó en UTF-8 sin BOM; las ediciones no introducen BOM. |
| D3 — Nombres | Cumple | `Coherencia-Auditoria-Marco.md` en Título-Con-Guiones con prefijo `_` de meta-archivo, igual que `Coherencia-config-esquema`. |
| D4 — Versionado de nombre | Cumple | Los archivos declaran su versión en el campo `Versión` de su cabecera y ninguno lleva sufijo de versión en el nombre. Reexpresado bajo la D4 vigente desde el framework 4.0; la verificación original de esta nota se hizo contra la D4 anterior, que exigía el sufijo en el nombre. |
| D5 — Una sola versión vigente | Cumple | El marco sube de versión in situ (1.3 → 1.4); no hay copias paralelas. |
| D6 — Trazabilidad de cabecera | Cumple | Esta nota declara Proyecto/Documento/Versión/Estado/Fecha/Autor y lleva control de cambios; el marco mantiene su cabecera con la versión actualizada. |
| D7 — Neutralidad de dominio (crítica) | Cumple | Ningún literal del dominio de moderación de la fuente se filtró al marco: la búsqueda de baneo/banear/spam/timeout/fan-out/"palabra prohibida"/moderación no arroja coincidencias en las adiciones. El vocabulario es neutro: parámetro, descriptor, default, límite, ejemplo, preset, propuesta, simulación. |
| D8 — `tipo_proyecto_codigo` | Cumple | No se inventan tipos: la capacidad se describe como transversal "a cualquier tipo D8 con superficies de configuración"; los valores D8 citados son del conjunto cerrado. |

## 4. Verificación de trazabilidad

| Eslabón | Resultado | Evidencia |
| --- | --- | --- |
| Marco → catálogo de diseño | Cumple | §1.5, §2.5, §4.2, §7.5, §8.3, §11.1 y §12.3 referencian `Design-Rules-Config-Esquema` y/o la frontera `PropuestaDeConfiguracion`; §8.7 ya la documentaba. |
| Marco → regla 03 | Cumple | §4.2 (AG-03) refleja la carga de la extensión cuando hay superficies de configuración, consistente con `Rules-UX-UI-DX.md` v1.4 §1.4. |
| Marco → master-prompt | Cumple | La responsabilidad de AG-03 de cargar la extensión (marco §4.2) es coherente con la nota operativa de §6 del master-prompt (insumo de AG-03 para proyectos de código con superficies de configuración). |
| Reparto de responsabilidades UX/arquitectura/IA | Cumple | §4.2 separa AG-03 (lado UX), AG-05 (motor de la frontera) y AG-04 (asistente como tool definitions), sin solapamiento; coincide con el límite 05/02 del documento de capacidad. |
| Terminología uniforme | Cumple | `PropuestaDeConfiguracion`, descriptor, modo simulación, plan-and-apply, human-in-the-loop y divulgación progresiva se usan con el mismo sentido en todas las secciones editadas y quedan definidos en §13. |
| Auditabilidad (AG-08) | Cumple | Cada mejora reflejada está enunciada de forma verificable, no aspiracional: el default vive en el descriptor; la propuesta se valida antes de aplicar; la IA propone y no ejecuta; la divulgación progresiva oculta lo avanzado en expander. |

## 5. Observaciones

1. Fin de línea CRLF (informativa, preexistente). La cabecera del marco declara "EOL LF", pero todos los archivos del repositorio usan CRLF y no hay `.gitattributes` que fuerce LF; el archivo nuevo se creó en CRLF para mantener consistencia. Discrepancia preexistente a nivel template, fuera del alcance de esta auditoría.
2. El §8.7 y otras adiciones previas de config-esquema se habían incorporado al marco sin subir su versión interna; esta auditoría regulariza esa deuda al subir a 1.4 y registrar la reflexión completa en el Control de Cambios.

## 6. Veredicto

APROBADO CON OBSERVACIONES.

El marco refleja ahora, de forma coherente y completa, las mejoras de configuración dirigida por esquema y su AI-readiness: todas las brechas del diagnóstico quedaron corregidas por la especialidad correspondiente, sin contradicciones cruzadas, con terminología uniforme y trazabilidad cerrada hacia el catálogo, la regla 03 y el master-prompt. Las observaciones son el EOL CRLF preexistente y la regularización de la versión, sin impacto sobre la coherencia.

## 7. Control de cambios

| Versión | Fecha | Cambios | Autor |
| --- | --- | --- | --- |
| 1.0 | 2026-06-20 | Nota de coherencia inicial de la auditoría del marco teórico contra la configuración dirigida por esquema: diagnóstico por sección, ediciones quirúrgicas por especialidad, verificación D1–D8 (énfasis D7) y trazabilidad con el catálogo, la regla 03 y el master-prompt. | AG-ROOT (QA) |
| 1.1 | 2026-07-29 | Vocabulario normativo (framework 5.0), registrado en la 5.1. El campo de cabecera `**Proyecto:** Template SDD` pasa a `**Framework:** SDD`, porque el referente es el framework y no una unidad de compilación; es el patrón que ya usa `Coherencia-Vocabulario-Producto-Y-Proyecto-De-Codigo.md`. El cuerpo adopta el vocabulario de `Vocabulario-Rules.md` §2. **El alcance verificado por esta nota no se modifica**, según el criterio de reexpresión del `README.md`: se reexpresa cómo se nombra el sujeto verificado, no la verificación. La fila se registra en la 5.1 porque la migración modificó el archivo sin dejar registro, contra `SDD-Development-Guide.md` §VI.1. | AG-ROOT |
