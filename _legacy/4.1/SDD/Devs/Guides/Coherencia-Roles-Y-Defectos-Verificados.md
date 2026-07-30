# Nota de coherencia — Vocabulario de roles, autoridad de AG-00 y defectos verificados

**Proyecto:** Framework SDD
**Documento:** Coherencia-Roles-Y-Defectos-Verificados.md
**Versión:** 1.0
**Estado:** Vigente
**Fecha:** 2026-07-29
**Autor:** AG-ROOT (Arquitecto de Soluciones) con verificación independiente

---

## 1. Alcance

Verificación de la intervención que aplica las ondas 1 y 2 del plan de mejoras derivado de un análisis externo del framework. La intervención tiene dos partes:

- **Parte A — defectos verificados.** Seis defectos contrastados contra el árbol vigente, que no requerían ninguna decisión previa.
- **Parte B — vocabulario de roles y autoridad de AG-00.** Declaración del Product Owner como rol, distinción entre Product Owner y stakeholder, y acotación de la autoridad de decisión de la especialidad AG-00.

Quedan **fuera de alcance**, por requerir decisiones que no se tomaron: la declaración de la frontera del framework, la terminología del concepto «producto» como nivel superior, el desdoblamiento de AG-05 y AG-09 por nivel, las especialidades gatilladas (AppSec y Modelador de Datos), el registro de decisión de producto y el modelo de cuatro niveles del plano de código.

Esta nota verifica el resultado contra las invariantes D1 a D9 y contra la trazabilidad entre reglas, orquestador, plantillas y guías.

## 2. Inventario de archivos

### 2.1 Creados

| Archivo | Rol |
| --- | --- |
| `Devs/Guides/Coherencia-Roles-Y-Defectos-Verificados.md` | Esta nota de coherencia. |

### 2.2 Editados

| Archivo | Versión | Parte |
| --- | --- | --- |
| `Devs/Rules/Rules-Contexto.md` | 2.0 → 2.1 | A y B |
| `Devs/Rules/Rules-Plan-Sprint.md` | 2.0 → 2.1 | B |
| `Devs/Rules/Root-Rules.md` | 2.0 → 2.1 | A |
| `Devs/Intake/SOLUTION-INTAKE-template.md` | 1.4 → 1.5 | A y B |
| `Devs/Intake/SOLUTION-MANIFEST-template.md` | (sin campo) → 2.1 | A |
| `Devs/Orchestrator/Master-Prompt.md` | 4.0 → 4.1 | A y B |
| `Devs/Guides/Marco-Teorico-SDD.md` | 1.8 → 1.9 | A y B |
| `Guides/SDD-User-Guide.md` | 1.5 → 1.6 | A y B |

Sin cambios: los quince archivos de reglas restantes, `README.md`, `PROMPTS/`, `Templates/`, `_legacy/` y `Devs/Bootstrap/`. Este último es intocable por regla del propio framework: un registro que se corrige después deja de ser un registro.

## 3. Parte A — defectos verificados y su evidencia

| Id | Defecto | Evidencia del defecto | Resolución |
| --- | --- | --- | --- |
| A1 | Los ejemplos de `Nombre-Solucion` y `Nombre-Proyecto` usaban minúsculas | D3 exige «cada palabra capitalizada»; `Master-Prompt.md` §3.2 paso 4 exige «capitalizar la inicial de cada palabra»; y `Rules-Especificacion-Funcional.md`, `Rules-Backlog-Tecnico.md` y `Rules-Arquitectura-Tecnica.md` declaran las tres, textualmente, que «quedan prohibidas las variantes todo-minúsculas». En el mismo bloque de `SOLUTION-MANIFEST-template.md` §5 convivían `Nombre-Solucion` = `gestion-de-turnos` y el archivo `SOLUTION-INTAKE-Gestion-De-Turnos.md`, siendo que el patrón es `SOLUTION-INTAKE-<Nombre-Solucion>.md` | 66 ocurrencias normalizadas en cuatro archivos. `SDD-User-Guide.md` §4.1 decía «Título-Con-Guiones (minúsculas…)», definición que se contradice a sí misma, y pasa a citar D3 y §3.2 |
| A2 | `SOLUTION-MANIFEST-template.md` no declaraba su versión en cabecera | Único artefacto de `Intake/` sin campo `Versión` legible. La plantilla de intake corrigió el mismo defecto en su 1.3, declarándolo «una aplicación incompleta de D6 sobre las plantillas»; la corrección no se propagó a la otra plantilla | Cabecera con `Versión de la plantilla: 2.1`, siguiendo el formato de la plantilla de intake |
| A3 | Rutas `rules/` obsoletas | Cuatro ubicaciones citaban `rules/Intake-Rules.md` y `rules/Maqueta-Rules.md`; la ruta real es `SDD/Devs/Rules/`. La del master-prompt caía en el primer paso de la fase de validación de intake | Reemplazadas por el nombre lógico, que es la convención dominante en esos archivos |
| A4 | El árbol de ejemplo del intake §16 contradecía el layout del orquestador | Mostraba `docs/` y `devs/Intake/`; `Master-Prompt.md` §3.5 fija `SDD/Docs/` y `SDD/Intake/`. Es el ejemplo que el usuario copia, así que el defecto se propagaba a cada intake real | Árbol corregido y nota que declara que las rutas del framework no se eligen |
| A5 | Las fichas de AG-10 y AG-11 del catálogo estaban intercambiadas | `Marco-Teorico-SDD.md` §4.2 declaraba AG-10 = Technical Writer y AG-11 = Developer Advocate, contra `Rules-Examples.md` (AG-10 Developer Advocate), `Rules-Documentacion.md` (AG-11 Technical Writer) y la tabla §4.3 del propio marco. **La entrada 1.7 de su control de cambios afirma haber actualizado §4.2 en el intercambio 10 ↔ 11 del 2026-07-26**, y las fichas seguían invertidas: el registro declaraba una corrección no aplicada | Fichas intercambiadas, con sus interacciones cross-rol reescritas según la dependencia que fija el `README.md`: la 10 demuestra, la 11 explica y enlaza |
| A6 | Arrastres de la misma inversión y una ruta de carpeta | El diagrama de trazabilidad de §4.4 decía «AG-10 (Developer guide) → AG-11 (Ejemplos)»; la ficha de AG-03 alimentaba «AG-10 (developer guide), AG-11 (ejemplos)»; la tabla §4.3 apuntaba a `03-UX-UI/` en lugar de `03-UX-UI-DX/` | Los tres corregidos |

**Defectos adicionales encontrados durante la ejecución**, de la misma clase y resueltos en la misma pasada:

| Defecto | Evidencia | Resolución |
| --- | --- | --- |
| Cuatro referencias al `BRIEF` deprecado | `Rules-Contexto.md` §4 y §5.2 y `SDD-User-Guide.md` citaban «§4 del BRIEF» y «§10 del BRIEF». `PROJECT-BRIEF-template.md` está deprecado desde la unificación de intake del 2026-06-10 | Pasan a `SOLUTION-INTAKE` |
| Residuos del intercambio 10 ↔ 11 en `Rules-Contexto.md` | §1.1 decía «11 (examples)», con el número nuevo y el significado viejo; §6 y §8 declaraban trazabilidad downstream a la categoría 11 | Pasan a 10 |
| Conteo desactualizado en el prompt-snippet | §8 declaraba «§6 de Rules-Contexto.md (11 ítems verificables)» cuando §6 tenía 12 | Actualizado a 13, que es el conteo tras esta intervención |
| Origen inexistente del flag `equipo_n` | `Master-Prompt.md` §4 declaraba leerlo de «SOLUTION-INTAKE §2 (stakeholders) o §10 (restricciones)». §2 pide una tabla de roles y §10 pide presupuesto, fecha, normativa e integraciones: **ninguna de las dos pedía la cantidad de personas**. El flag gatea la emisión de `Acuerdo-Equipo.md` y la forma de la categoría 07 | Pregunta guía nueva en el intake §2, ítem en el checklist §19, y origen corregido en §4 del master-prompt con escalamiento por §9 si falta |

## 4. Parte B — vocabulario de roles y autoridad de AG-00

### 4.1 El defecto de fondo

La priorización MoSCoW estaba declarada como responsabilidad en la §1.1 de **tres especialidades distintas**, ninguna de las cuales rinde cuentas por ella:

| Especialidad | Texto original | Categoría |
| --- | --- | --- |
| AG-00 Product Manager | «forzar la priorización MoSCoW» | 00 |
| AG-01 Analista de Negocio | «con qué prioridad relativa» | 01 |
| AG-06 Scrum Master | «que la priorización MoSCoW refleje el valor real de negocio» | 06 |

El modo de falla es acumulativo. Si el intake trae la priorización decidida, las tres la derivan y no pasa nada. Si no la trae, las tres la producen por separado, cada una coherente consigo misma, y las tres versiones conviven sin contradecirse de forma detectable porque cada una vive en su categoría.

Esta intervención corrige el eslabón de AG-00, que es donde la cadena D6 arranca. Los de AG-01 y AG-06 quedan para la intervención E1 del plan, que requiere que el Product Owner esté declarado; con esta nota ya lo está.

### 4.2 Por qué AG-00 no es un Product Owner

Tres argumentos verificables, no de criterio:

1. **Posición en la cadena.** AG-00 corre aguas abajo del punto en que el humano confirmó el intake y el manifiesto (`Master-Prompt.md` §3, pasos 3 y 4). Una decisión de producto tomada ahí entra a la cadena D6 habiendo pasado el audit y ninguna aprobación.
2. **El audit no puede detectarlo.** El audit independiente verifica «D1-D9 y los criterios de §6 de cada regla» (`Master-Prompt.md` §15): completitud, forma y coherencia interna. Una prioridad inventada pero coherente los pasa todos. Y D9 no alcanza, porque su propia definición declara que «no aplica a afirmaciones de diseño, de especificación ni de contexto», que es lo que produce la categoría 00.
3. **La arbitración ya era innecesaria.** `Intake-Rules.md` §5 valida, antes de despachar cualquier subagente, que §4 tenga MoSCoW con Must mínimo y que §9 tenga al menos tres exclusiones. Si el intake pasa, no queda nada que forzar; si no pasa, el orquestador se detiene con la batería de preguntas. La frase de AG-00 proviene de `Rules-Contexto.md` 1.0, del 2026-05-17, generada en el bootstrap; `Intake-Rules.md` no existió hasta el 2026-06-10. Ninguna versión intermedia revisó ese párrafo.

El propio catálogo tenía la formulación correcta y la tabla de correspondencias la había perdido: la ficha de AG-00 declara como alias «Product Owner senior **en contextos donde el rol no existe formalmente**», condición que §5.5 había dejado caer al afirmar sin matices «Product Owner → AG-00». Se restituye la condición y se corrige el mapeo.

### 4.3 Qué se agregó

- **Product Owner declarado** como rol humano aguas arriba del intake, fuera de la cadena AG-XX, con entrada de glosario en `Master-Prompt.md` §15 y en `SDD-User-Guide.md` §10.1, campo propio en la cabecera del intake y nota de responsabilidad.
- **Stakeholder declarado** como categoría de relación, parcial y plural, que aporta el material que el Product Owner arbitra. La pregunta bloqueante del intake §2 fusionaba ambos y ahora se desdobla.
- **Catálogo de ambigüedades de la categoría 00** (`Rules-Contexto.md` §6.1), con dieciocho ítems y el criterio que distingue formalización de decisión. Es el piloto de un patrón replicable a las once categorías restantes.
- **Se conserva «propietario»** donde designa la categoría de stakeholder, con el mismo criterio con que la normalización de actores del 2026-07-26 conservó «implementador».

## 5. Verificación de invariantes

| Invariante | Resultado | Evidencia |
| --- | --- | --- |
| D1 — Idioma y registro | Cumple | Adiciones en español rioplatense neutro técnico, sin emojis ni negritas decorativas fuera del uso estructural preexistente. |
| D2 — Encoding | Cumple | Verificado con `file --mime-encoding`: UTF-8 en los archivos tocados. Cero caracteres CR (`grep -c $'\r'` = 0), sin BOM. Fechas en `YYYY-MM-DD`. |
| D3 — Nombres | Cumple, y es el objeto de A1 | 66 ejemplos normalizados a Título-Con-Guiones. Verificación posterior: cero ocurrencias de los slugs en minúscula fuera de `_legacy/`. `API` en mayúscula completa por la regla de siglas conocidas de `Master-Prompt.md` §3.2. |
| D4 — Sufijo de versión | Cumple | Ningún archivo vivo tocado lleva sufijo en el nombre; los ocho declaran versión en cabecera. A2 corrige el único que no la declaraba. |
| D5 — Una sola versión vigente | Cumple | Los ocho archivos suben de versión in situ; no se creó ninguna copia paralela. No corresponde archivar en `_legacy/`, porque el archivado por versión rige por conjunto normativo publicado y esta intervención no publica una versión mayor del framework. |
| D6 — Trazabilidad | Cumple | Los ocho archivos declaran versión y control de cambios. Verificación cruzada: la versión de cabecera coincide con la última fila del control de cambios en los ocho casos. |
| D7 — Neutralidad de dominio | Cumple | Ningún vocabulario de dominio de cliente se incorporó. Los ejemplos usados (`Gestion-De-Turnos`, `Parser-Csv`) son los genéricos preexistentes del framework, solo normalizados en su capitalización. |
| D8 — Tipos de proyecto | Cumple | El conjunto cerrado de ocho valores no se toca en ningún archivo. |
| D9 — Evidencia verificable | Cumple | Cada defecto de §3 cita ubicación y contraste localizables y reproducibles. El caso A5 se apoya en una contradicción entre un registro de cambios y el estado del archivo que registra. |

## 6. Verificación de trazabilidad

| Eslabón | Resultado | Evidencia |
| --- | --- | --- |
| Reglas → orquestador | Cumple | La acotación de AG-00 (`Rules-Contexto.md` §1.1 y §6.1) invoca el patrón de ambigüedad legítima de `Master-Prompt.md` §9, que ya existía y no se modifica. |
| Orquestador → intake | Cumple | El origen de `equipo_n` en `Master-Prompt.md` §4 apunta a una pregunta que ahora existe en el intake §2 y figura en su checklist §19. |
| Intake → reglas | Cumple | La nota de responsabilidad del intake declara que las decisiones de §4 y §9 son del Product Owner, y `Rules-Contexto.md` §1.1 declara que AG-00 las deriva de ahí. Las dos puntas coinciden. |
| Catálogo → reglas de categoría | Cumple | Las fichas de AG-10 y AG-11 del marco coinciden ahora con el «Subagente target» declarado en `Rules-Examples.md` y `Rules-Documentacion.md`, y con la tabla §4.3. |
| Glosarios entre sí | Cumple | Las entradas Product Owner y Stakeholder de `Master-Prompt.md` §15 y de `SDD-User-Guide.md` §10.1 declaran lo mismo con el mismo alcance. |
| Terminología uniforme | Cumple | «Product Owner» sin traducir en los ocho archivos, coherente con el uso preexistente en cinco archivos de reglas. «Propietario» conservado solo donde designa la categoría de stakeholder. |

## 7. Observaciones

1. **`Parser-Csv`, no `Parser-CSV`.** El algoritmo de `Master-Prompt.md` §3.2 enumera las siglas que van en mayúscula completa: API, REST, UX, UI, DX, AI y CLI. CSV no está en esa lista, así que la normalización estricta produce `Parser-Csv`, que además coincide con el `NombreSolucionCodigo` = `ParserCsv` que el mismo ejemplo ya declaraba. Si se decide que CSV debe tratarse como sigla conocida, el lugar es la lista de §3.2 y no el ejemplo. No se modificó la lista, porque ampliarla es una decisión y no un defecto.
2. **La triple asignación de la priorización queda cerrada solo en AG-00.** `Rules-Necesidades-Negocio.md` y `Rules-Backlog-Tecnico.md` conservan su mandato sobre la prioridad. Es deliberado: corresponde a la intervención E1 del plan, que esta nota habilita al dejar declarado el Product Owner.
3. **Once enlaces relativos no resuelven**, todos en `Root-Rules.md` y `Rules-Necesidades-Negocio.md`. Son ejemplos de índices del árbol generado en el repositorio destino, no enlaces de este repositorio. Defecto preexistente de naturaleza cosmética, verificado como no introducido por esta intervención.
4. **El catálogo declara «13 especialidades»** en `Marco-Teorico-SDD.md` §4.1 mientras la tabla §4.3 enumera catorce, por la incorporación de AG-03M con la Fase B2. No se corrigió: determinar si AG-03M cuenta dentro del conjunto es una decisión sobre el catálogo, no un defecto de transcripción.
5. **La expresión «forzar la priorización» sobrevive en `SDD-User-Guide.md` §4.1**, y es correcto que lo haga: describe al humano forzándose a priorizar durante la elaboración conversacional del intake, que es exactamente el arbitraje del Product Owner aguas arriba.

## 8. Veredicto

**APROBADO CON OBSERVACIONES.**

Los seis defectos de la Parte A y los cuatro adicionales encontrados durante la ejecución quedan corregidos, cada uno con evidencia del defecto y del contraste que lo prueba. La Parte B deja declarados el Product Owner y el stakeholder como roles distintos, acota la autoridad de AG-00 a la formalización y le da un catálogo de ambigüedades verificable antes de redactar. Las nueve invariantes se cumplen y los seis eslabones de trazabilidad cierran.

Las cinco observaciones son: una decisión de alcance deliberadamente no tomada sobre la lista de siglas, dos tramos que corresponden a intervenciones posteriores del plan, un defecto cosmético preexistente y una expresión que sobrevive correctamente. Ninguna afecta la coherencia del conjunto.

## 9. Control de cambios

| Versión | Fecha | Cambios | Autor |
| --- | --- | --- | --- |
| 1.0 | 2026-07-29 | Nota de coherencia inicial de la intervención de vocabulario de roles, autoridad de AG-00 y defectos verificados: inventario de ocho archivos editados, evidencia por defecto, verificación D1-D9, trazabilidad en seis eslabones y cinco observaciones. | AG-ROOT |
