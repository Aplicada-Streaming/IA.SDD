# Nota de coherencia — Migración normativa de un destino a la versión vigente

**Framework:** SDD
**Documento:** Coherencia-Migracion.md
**Versión:** 1.0
**Estado:** Vigente
**Fecha:** 2026-07-29
**Autor:** Framework SDD (migración normativa), con verificación por etapa

---

## 1. Alcance

Verificación de la intervención que publica el conjunto **6.0** y dota al framework de la capacidad de **migración normativa**: llevar un destino generado con una versión anterior a la versión vigente, preservando su contenido.

La intervención se ejecutó segmentada en seis etapas, con nota de coherencia por etapa y confirmación humana entre medio, según `SDD-Development-Guide.md` §VI.3. Esta nota consolida las seis. Verifica contra las invariantes **D1 a D9** —las nueve, que es el conjunto vigente al momento de esta intervención— y contra la cadena de trazabilidad entre los dos orquestadores, la regla transversal nueva y los dos documentos de entrada.

**Lo que la intervención no hizo, declarado:** no migró ningún destino real. Toca el framework; los destinos se migran después, con el orquestador que esta intervención crea. Tampoco cerró H4 —la validación del intake no cubre todo lo que la plantilla exige—, que queda para una intervención aparte por decisión registrada.

## 2. Inventario de archivos

### 2.1 Creados

| Archivo | Versión | Rol |
| --- | --- | --- |
| `Devs/Rules/Migracion-Rules.md` | 1.0 | La mecánica de la migración. Decimoctava regla, sexta transversal |
| `Devs/Orchestrator/Master-Prompt-Migracion.md` | 1.1 | Las siete fases M0 a M6, sus detenciones y su orden |
| `PROMPTS/PROMPT-Agente-Migracion-SDD.md` | 1.0 | Prompt de entrada, par del de bootstrap |
| `Devs/Guides/Coherencia-Migracion.md` | 1.0 | Esta nota |
| `_legacy/5.1/` | — | Snapshot del conjunto normativo superado, 59 archivos |

### 2.2 Editados

| Archivo | De | A | Severidad |
| --- | --- | --- | --- |
| `Devs/Intake/PRODUCT-MANIFEST-template.md` | 3.1 | 4.1 | **major** |
| `Devs/Rules/Intake-Rules.md` | 3.1 | 3.2 | minor |
| `Devs/Rules/Vocabulario-Rules.md` | 2.0 | 2.1 | minor |
| `Devs/Orchestrator/Master-Prompt.md` | 5.1 | 5.2 | minor |
| `Guides/SDD-Development-Guide.md` | 1.4 | 1.6 | minor |
| `Guides/SDD-User-Guide.md` | 1.7 | 1.9 | minor |
| `Guides/SDD-Getting-Started-Guide.md` | 1.3 | 1.5 | minor |
| `PROMPTS/PROMPT-Agente-Bootstrap-SDD.md` | 2.3 | 2.4 | minor |
| `README.md` | — | — | no se versiona; sus cambios se registran en el `CHANGELOG.md` |
| `CHANGELOG.md` | — | — | entrada `[6.0]` |

**Versión del conjunto: 6.0.** Se deriva de la mayor severidad de sus partes, y la plantilla de manifiesto sube major. La tabla de derivación de `SDD-Development-Guide.md` §VI.5 no contemplaba el caso de una plantilla, defecto que esta intervención detectó y corrigió en la misma etapa en que lo aplicó.

### 2.3 Segmentación efectiva

| Etapa | Contenido | Estado al cerrar |
| --- | --- | --- |
| E0 | Snapshot `_legacy/5.1/`, verificado con `diff -r` | Framework sin cambios, conjunto vigente archivado |
| E1 | Procedencia sobre las plantillas, tabla maestra del intake, forma del registro de impacto | Diagnóstico completo, sin capacidad nueva |
| E2 | El término y `Migracion-Rules.md` | Regla publicada y citable, ningún prompt la usa |
| E3 | Los dos prompts de la migración | Capacidad invocable, reconciliación sin nombrarla |
| E4 | Tolerancia de nombres legados, ruteo, tercer caso de escritura, renombre léxico | Los dos orquestadores integrados |
| E5 | Propagación, conteos, `CHANGELOG.md [6.0]`, esta nota | Framework coherente en la 6.0 |

## 3. Verificación de invariantes (D1–D9)

| Id | Verificación | Resultado |
| --- | --- | --- |
| **D1** | Español rioplatense neutro técnico en los cuatro archivos creados y los ocho editados. Sin marketing, sin emojis, sin negritas decorativas. Nombres de archivo en ASCII sin acentos: `Migracion-Rules.md`, `Master-Prompt-Migracion.md`, `PROMPT-Agente-Migracion-SDD.md`, `Coherencia-Migracion.md` | Conforme |
| **D2** | UTF-8 sin BOM, LF, salto de línea final, fechas `YYYY-MM-DD`. Verificado por barrido sobre los doce archivos del alcance | Conforme, cero excepciones |
| **D3** | Título-Con-Guiones estricto. El nombre de la regla transversal sigue el patrón `<Capacidad>-Rules.md` y no `Rules-<Capacidad>.md`, reservado a las categorías | Conforme |
| **D4** | Ningún archivo vivo lleva sufijo de versión en el nombre. El snapshot de `_legacy/5.1/` conserva los nombres lógicos, y la identidad de versión la da la carpeta: mismo criterio que el snapshot de la 4.1 | Conforme |
| **D5** | Una sola versión vigente por nombre lógico. El conjunto superado se archivó **antes de la primera modificación**, no después | Conforme |
| **D6** | Trazabilidad recíproca en las tres cadenas nuevas: `Intake-Rules.md` §2.1 ↔ `PRODUCT-MANIFEST-template.md` §1.1 ↔ `Master-Prompt.md` §2.1 paso 4; `Migracion-Rules.md` ↔ `Master-Prompt-Migracion.md` ↔ `PROMPT-Agente-Migracion-SDD.md`; `Vocabulario-Rules.md` §9.6 ↔ `Migracion-Rules.md`. Las doce citas cruzadas al master-prompt de generación resuelven contra secciones existentes | Conforme |
| **D7** | Ningún vocabulario, ejemplo, producto comercial ni protocolo de dominio de cliente en los artefactos nuevos | Conforme |
| **D8** | Conjunto cerrado de ocho tipos intacto. `Migracion-Rules.md` §1.2 **no** declara una tabla de ocho filas, y la omisión está declarada y fundamentada: la migración no elige perfiles, los toma de §1.2 de la regla de cada documento, que ya discrimina por tipo. Una segunda tabla indexada por D8 sería una duplicación que se desincroniza | Conforme, con la omisión declarada |
| **D9** | Toda afirmación sobre el estado del framework cita archivo y sección. El inventario del renombre léxico se verificó por barrido contra el árbol antes de sustituir, y el barrido negativo se corrió al cerrar. La prohibición de suponer una versión de origen en un destino sin procedencia es aplicación directa de D9 | Conforme |
| — | **Ninguna invariante D1 a D9 modificada** | Confirmado |

## 4. Verificación de trazabilidad

| # | Comprobación de `SDD-Development-Guide.md` §VI.3 | Resultado |
| --- | --- | --- |
| 1 | Invariantes D1–D9 intactas en todo archivo tocado | Sin violaciones |
| 2 | Autosuficiencia: cero referencias fuera del árbol de este repositorio | Cero ocurrencias. La migración lee `_legacy/` y el `CHANGELOG.md` del propio repositorio fuente |
| 3 | Referencias internas: todo archivo, carpeta y sección citada existe | Cero enlaces rotos. Se corrigió durante E1 una referencia adelantada a una entrada del `CHANGELOG.md` que todavía no existía |
| 4 | Sin contradicción entre lo escrito y lo que ya estaba | Sin contradicciones. Dos casos se resolvieron en lugar de dejarse: la fila «Sin procedencia» de §2.1, que habría contradicho a `Migracion-Rules.md` §4.5, y la nota condicional de habilitación de M2, que habría declarado bloqueada una capacidad ya habilitada |
| 5 | Control de cambios actualizado en cada archivo modificado | Una fila por archivo y por bump. El `README.md` no se versiona |
| 6 | El caso degenerado sigue produciendo el layout aplanado | Verificado: ninguna pieza de la intervención toca el layout de salida ni el gating |
| 7 | Nada fuera del alcance declarado fue modificado | Verificado por etapa contra el estado del árbol |

### 4.1 El renombre léxico, con los números que §9.5 exige

| Magnitud | Valor |
| --- | --- |
| Ocurrencias de «adecua\*» revisadas fuera de `_legacy/` | **19** |
| Sustituidas | **7** |
| Restantes | **12** |
| Filas históricas de control de cambios reescritas | **cero** |
| Ocurrencias no normativas tocadas | **cero** |
| Barrido negativo de «migración normativa» en contextos donde el referente nuevo no puede aparecer | **cero hallazgos** |

Las diecinueve son las dieciocho que el plan había inventariado más una que la propia intervención introdujo al declarar el renombre. Las doce restantes se reparten en cuatro históricas —tres entradas del `CHANGELOG.md` y una fila de control de cambios del master-prompt—, siete no normativas donde «adecuado» es adjetivo común, y una mención deliberada del nombre viejo como objeto del renombre en `Vocabulario-Rules.md` §9.6, que sustituir dejaría la oración diciendo que el plan pasó de llamarse igual a como se llama.

**Sobre el inventario del plan.** Clasificaba tres ocurrencias de «migración» de `Vocabulario-Rules.md` como prosa normativa vigente. La verificación contra el árbol mostró que **una de las tres es una fila del control de cambios de §11**, y por lo tanto intocable. Se sustituyeron dos, y el error del inventario se corrigió en el plan.

## 5. Observaciones

| Id | Observación | Estado |
| --- | --- | --- |
| **O-1** | El bloque de procedencia no podía declarar `Vocabulario-Rules`, pese a que el despacho la inyecta siempre. Misma clase de defecto que el que la intervención vino a cerrar para las plantillas | **Cerrada** en la 4.1 de la plantilla, por decisión explícita |
| **O-2** | El inventario del renombre del plan clasificaba una fila histórica como prosa vigente | **Cerrada**: no se sustituyó, y el plan se corrigió |
| **O-3** | Los conteos de reglas y transversales quedaron desactualizados durante E2, E3 y E4 | **Cerrada** en E5. Se declaró en su momento para que no se leyera como descuido |
| **O-4** | El plan declaraba a E3 cerrando con la capacidad «invocable», y §13 todavía trataba la escritura del intake como error de orquestación | **Cerrada** en E4. Se resolvió con una nota condicional en E3 en lugar de adelantando F3, y el plan se corrigió |
| **O-5** | Se actualizó un archivo de E3 durante E4, al quedar satisfecha su nota condicional | **Cerrada**, con bump y fila propios. Reportada al cierre de E4 |
| **O-6** | Se amplió §2.1 más allá de la letra de F3, para que la fila «Sin procedencia» no contradijera a la regla nueva | **Cerrada**, dentro de la sección que F3 ya tocaba |
| **O-7** | Dos notas de coherencia anteriores contienen celdas de verificación que afirman que el `README.md` enumera diecisiete reglas y cinco transversales. Esas celdas quedan falsas contra el árbol vigente | **Abierta**. No se tocaron: las notas de coherencia son registro histórico y su reexpresión no estaba en el alcance de esta intervención. Se reporta para decisión |
| **O-8** | `Devs/Bootstrap/` queda deliberadamente desactualizada respecto de la sexta transversal, según el criterio de material histórico congelado de `SDD-Development-Guide.md` §I.2 | **Declarada**, no es defecto |
| **O-9** | **Propagar contra la lista del plan no alcanza.** El plan enumeraba, archivo por archivo, qué había que tocar de la propagación, y esa lista se aplicó completa. Auditar después el `README.md` y las dos guías **enteros** encontró seis defectos más que el plan no había anticipado, todos de la misma clase: enumeraciones en singular escritas cuando había un solo master-prompt y un solo prompt de entrada. El peor era una afirmación falsa —la entrada de glosario *Master-prompt* de `SDD-User-Guide.md` §10 declaraba «Archivo único»—, y dos estaban en las tablas de modelo de repositorios del `README.md` y de la guía de arranque, que esos mismos documentos declaran como las que más caro sale confundir. **Lección para la próxima intervención que agregue una pieza donde antes había una sola: la lista de propagación del plan es el piso, no el techo. Hay que barrer el árbol buscando la enumeración vieja, no solo visitar los lugares previstos.** | **Cerrada**: los seis defectos corregidos, con su registro en las filas 1.9 de `SDD-User-Guide.md` y 1.5 de `SDD-Getting-Started-Guide.md`. Las tres del `README.md` no mueven versión porque no se versiona |

## 6. Veredicto

**CONFORME.**

La intervención cumple las siete comprobaciones de `SDD-Development-Guide.md` §VI.3, no modifica ninguna invariante, preserva la autosuficiencia del repositorio, archivó el conjunto superado antes de su primera modificación y ejecutó el renombre léxico por el procedimiento por ocurrencia que `Vocabulario-Rules.md` §9.5 exige, con su barrido negativo sin hallazgos.

Queda **una observación abierta**, O-7, que no bloquea: afecta a celdas de verificación de notas de coherencia históricas y no a ninguna regla, prompt ni plantilla vigente.

## 7. Control de cambios

| Versión | Fecha | Cambios | Autor |
| --- | --- | --- | --- |
| 1.0 | 2026-07-29 | Nota inicial de la intervención publicada como framework 6.0: capacidad de migración normativa, con su regla transversal, su orquestador contiguo y su prompt de entrada, más los cinco prerrequisitos de instrumentación y el renombre léxico de la salida A de la reconciliación. Consolida las notas de las seis etapas E0 a E5. Declara ocho observaciones, siete cerradas y una abierta. | Framework SDD (migración normativa) |
