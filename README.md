# Framework SDD — Diseño y desarrollo asistido por IA con Specification-Driven Development

SDD resuelve un problema concreto del desarrollo asistido por IA: los agentes derivan. Escriben código plausible que se aleja poco a poco de lo que se pidió, y la desviación se descubre tarde, cuando volver es caro. La respuesta del framework es generar la documentación viva de una solución **antes** de escribir código, y usarla como referente externo contra el cual contrastar todo lo que se construye después.

Su unidad de trabajo es la **solución**, que agrupa N proyectos (N ≥ 1). Cada proyecto declara exactamente uno de ocho tipos cerrados. A partir de un único documento de entrada, un orquestador deriva la composición de la solución, la valida con el usuario y genera doce categorías documentales numeradas, proyecto por proyecto y en orden topológico, con auditoría independiente entre fases y confirmación humana en cada corte. Con el sistema ya en construcción, el ciclo continúa: la documentación se actualiza incremento a incremento y se verifica ejecutando lo que documenta.

Este archivo es la superficie de entrada del repositorio. Si llegaste acá sin contexto, la [matriz de ruteo](#matriz-de-ruteo-por-intención) te dice a qué archivo ir según lo que vengas a hacer.

---

## Modelo de tres repositorios

SDD opera sobre tres repositorios separados por responsabilidad. Confundirlos es el error más caro que puede cometer un agente, porque escribe en el lugar equivocado y contamina el framework con material de un cliente.

| Rol | Escritura | Contiene |
| --- | --- | --- |
| **Framework SDD** (este repositorio, fuente) | Nunca se toca durante una corrida normal | Reglas constructivas, plantillas de intake, master-prompt, guías, prompt de entrada |
| **Repositorio destino** | El orquestador escribe acá | El intake (`SDD/Intake/`), la documentación generada (`SDD/Docs/`) y, más adelante, el código y los samples |
| **Repositorio de documentación** | El usuario, a mano | Los tool-prompts reejecutables, el material de investigación, indexación y análisis |

Hay **una sola excepción** a la regla de que el orquestador no escribe en este repositorio: el paso de captura de conocimiento de la Fase B2, que registra un modelo UX-UI en `SDD/Devs/Modelos-UX-UI/` y su ejemplo ofuscado en `Templates/`. Requiere aceptación explícita del humano y la verificación de ofuscación es bloqueante.

---

## Anatomía del repositorio

| Ruta | Qué contiene |
| --- | --- |
| [`SDD/Devs/Rules/`](SDD/Devs/Rules/) | Los dieciséis archivos de reglas constructivas: uno por categoría documental más cuatro transversales. Es el corazón normativo del framework |
| [`SDD/Devs/Orchestrator/`](SDD/Devs/Orchestrator/) | El master-prompt que despacha subagentes por fase, con auditoría entre fases y confirmación humana en cada corte |
| [`SDD/Devs/Intake/`](SDD/Devs/Intake/) | Plantillas de carga inicial: `SOLUTION-INTAKE-template.md` que completa el usuario y `SOLUTION-MANIFEST-template.md` que deriva el orquestador |
| [`SDD/Devs/Guides/`](SDD/Devs/Guides/) | Guías internas del framework: el marco teórico y las notas de coherencia de auditoría |
| [`SDD/Devs/References/Design/`](SDD/Devs/References/Design/) | Catálogo de reglas de diseño por stack y por capacidad transversal, insumo del subagente de UX-UI-DX |
| [`SDD/Devs/Modelos-UX-UI/`](SDD/Devs/Modelos-UX-UI/) | Modelos UX-UI capturados de maquetas aprobadas, con su índice |
| [`SDD/Devs/Bootstrap/`](SDD/Devs/Bootstrap/) | Auditoría del fuente que originó el framework. No es archivo muerto: siete archivos de reglas la citan como fuente del rationale de sus correcciones |
| [`SDD/Guides/`](SDD/Guides/) | Las tres guías de cara al usuario: arranque, uso y desarrollo del framework |
| [`PROMPTS/`](PROMPTS/) | El prompt de entrada que arranca el agente de bootstrap sobre un repositorio destino |
| [`Templates/`](Templates/) | Plantillas ejecutables de maqueta, con su modelo genérico de referencia |
| [`CHANGELOG.md`](CHANGELOG.md) | Bitácora de cambios del framework, por intervención |

---

## Matriz de ruteo por intención

Es el núcleo de este documento. Buscá la fila que describe lo que venís a hacer y andá al archivo que indica.

| Vengo a… | Leé |
| --- | --- |
| Entender qué es SDD y por qué existe | Este archivo, y después [`SDD/Devs/Guides/Marco-Teorico-SDD-v1.0.md`](SDD/Devs/Guides/Marco-Teorico-SDD-v1.0.md) |
| Poner SDD a andar hoy, por primera vez | [`SDD/Guides/SDD-Getting-Started-Guide.md`](SDD/Guides/SDD-Getting-Started-Guide.md) |
| Arrancar una solución nueva | [`PROMPTS/PROMPT-Agente-Bootstrap-SDD.md`](PROMPTS/PROMPT-Agente-Bootstrap-SDD.md), y después [`SDD/Devs/Intake/SOLUTION-INTAKE-template.md`](SDD/Devs/Intake/SOLUTION-INTAKE-template.md) |
| Aplicar el framework paso a paso en una solución real | [`SDD/Guides/SDD-User-Guide.md`](SDD/Guides/SDD-User-Guide.md) |
| Consultar qué genera una categoría y con qué criterios | El archivo de reglas de esa categoría en [`SDD/Devs/Rules/`](SDD/Devs/Rules/); ver el [mapa de categorías](#mapa-de-las-doce-categorías) |
| Modificar el comportamiento de una categoría | Su archivo de reglas, y antes [`SDD/Guides/SDD-Development-Guide.md`](SDD/Guides/SDD-Development-Guide.md) Parte III |
| Extender el framework con algo nuevo | [`SDD/Guides/SDD-Development-Guide.md`](SDD/Guides/SDD-Development-Guide.md) Partes II a V |
| Entender por qué el framework es como es | [`SDD/Devs/Guides/Marco-Teorico-SDD-v1.0.md`](SDD/Devs/Guides/Marco-Teorico-SDD-v1.0.md) |
| Saber qué reglas rigen la redacción de un documento generado | §4 del archivo de reglas de su categoría. Para el cuerpo documental de entrega, [`SDD/Devs/Rules/Rules-Documentacion.md`](SDD/Devs/Rules/Rules-Documentacion.md) §1.4, §1.5, §4.6 y §4.7 |
| Encontrar el orquestador | [`SDD/Devs/Orchestrator/Master-Prompt.md`](SDD/Devs/Orchestrator/Master-Prompt.md) |
| Encontrar las plantillas de intake | [`SDD/Devs/Intake/`](SDD/Devs/Intake/) |
| Entender el orden de fases y qué produce cada una | [`SDD/Devs/Orchestrator/Master-Prompt.md`](SDD/Devs/Orchestrator/Master-Prompt.md) §6 y §7 |
| Saber qué invariantes no puedo romper | La [sección de invariantes](#invariantes-globales) de este archivo, y [`SDD/Devs/Rules/Root-Rules.md`](SDD/Devs/Rules/Root-Rules.md) |
| Entender el sensado de deriva y la regla de evidencia | [`SDD/Devs/Rules/Deriva-Rules.md`](SDD/Devs/Rules/Deriva-Rules.md) |
| Entender la validación visual de maqueta | [`SDD/Devs/Rules/Maqueta-Rules.md`](SDD/Devs/Rules/Maqueta-Rules.md) |
| Agregar un modelo UX-UI al catálogo | [`SDD/Devs/Modelos-UX-UI/Index-Modelos-UX-UI.md`](SDD/Devs/Modelos-UX-UI/Index-Modelos-UX-UI.md) |
| Saber qué cambió en el framework y cuándo | [`CHANGELOG.md`](CHANGELOG.md) |

---

## Mapa de las doce categorías

Cada categoría tiene su carpeta de salida en el repositorio destino, su archivo de reglas en este repositorio y su nivel de aplicación.

| Cat. | Carpeta de salida | Archivo de reglas | Nivel |
| --- | --- | --- | --- |
| 00 | `00-Contexto/` | [`Rules-Contexto.md`](SDD/Devs/Rules/Rules-Contexto.md) | Solución |
| 01 | `01-Necesidades-Negocio/` | [`Rules-Necesidades-Negocio.md`](SDD/Devs/Rules/Rules-Necesidades-Negocio.md) | Solución |
| 02 | `02-Especificacion-Funcional/` | [`Rules-Especificacion-Funcional.md`](SDD/Devs/Rules/Rules-Especificacion-Funcional.md) | Proyecto |
| 03 | `03-UX-UI-DX/` | [`Rules-UX-UI-DX.md`](SDD/Devs/Rules/Rules-UX-UI-DX.md) | Proyecto |
| 04 | `04-Prompts-AI/` | [`Rules-Prompts-AI.md`](SDD/Devs/Rules/Rules-Prompts-AI.md) | Proyecto |
| 05 | `05-Arquitectura-Tecnica/` | [`Rules-Arquitectura-Tecnica.md`](SDD/Devs/Rules/Rules-Arquitectura-Tecnica.md) | Proyecto + Solución |
| 06 | `06-Backlog-Tecnico/` | [`Rules-Backlog-Tecnico.md`](SDD/Devs/Rules/Rules-Backlog-Tecnico.md) | Proyecto |
| 07 | `07-Plan-Sprint/` | [`Rules-Plan-Sprint.md`](SDD/Devs/Rules/Rules-Plan-Sprint.md) | Proyecto |
| 08 | `08-Calidad-Y-Pruebas/` | [`Rules-Calidad-Y-Pruebas.md`](SDD/Devs/Rules/Rules-Calidad-Y-Pruebas.md) | Proyecto |
| 09 | `09-Devops/` | [`Rules-Devops.md`](SDD/Devs/Rules/Rules-Devops.md) | Proyecto + Solución |
| 10 | `10-Examples/` | [`Rules-Examples.md`](SDD/Devs/Rules/Rules-Examples.md) | Proyecto |
| 11 | `11-Documentacion/` | [`Rules-Documentacion.md`](SDD/Devs/Rules/Rules-Documentacion.md) | Proyecto + Solución |

Reglas transversales, que no gobiernan una categoría sino una capacidad del framework: [`Root-Rules.md`](SDD/Devs/Rules/Root-Rules.md) (layout canónico y README raíz de la salida), [`Intake-Rules.md`](SDD/Devs/Rules/Intake-Rules.md) (validación del documento de entrada), [`Maqueta-Rules.md`](SDD/Devs/Rules/Maqueta-Rules.md) (validación visual) y [`Deriva-Rules.md`](SDD/Devs/Rules/Deriva-Rules.md) (sensado de deriva y evidencia verificable).

**La dependencia entre 10 y 11 es la que más se confunde**: la categoría 10 demuestra con código ejecutable y verificable; la 11 explica, referencia y enlaza esos ejemplos sin duplicar su código. Los ejemplos existen antes, porque son insumo de la documentación final.

---

## Invariantes globales

Son las reglas que ningún agente puede romper sin autorización explícita. Están enunciadas acá para que un agente que solo tiene este archivo en contexto sepa a qué atenerse.

| Id | Invariante | Qué significa |
| --- | --- | --- |
| **D1** | Idioma y registro | Español rioplatense neutro técnico, con tildes y eñes obligatorias en el cuerpo. Sin marketing, sin emojis, sin negritas decorativas. Los nombres de archivo van en ASCII sin acentos |
| **D2** | Encoding | UTF-8 sin BOM, fin de línea LF, fechas en formato `YYYY-MM-DD` |
| **D3** | Nombres | Título-Con-Guiones estricto en archivos y carpetas: cada palabra capitalizada, separadas por guion medio. Prohibidos espacios, acentos, eñes y caracteres especiales. Los identificadores llevan prefijo y dos dígitos uniformes (`NB-XX`, `CU-XX`, `ADR-XX`, `US-XX` y equivalentes) |
| **D4** | Sufijo de versión | `-v<X.Y>.md` con guion medio. Nunca con guion bajo ni con punto |
| **D5** | Una sola versión vigente | Un nombre lógico tiene una única versión vigente. Las superadas se archivan en `_legacy/`. Mayor para cambios incompatibles, menor para incorporaciones. Todo documento lleva su sección de control de cambios |
| **D6** | Trazabilidad | Cada documento declara su upstream y su downstream en la cabecera, y las referencias entre documentos resuelven. Los enlaces internos son relativos |
| **D7** | Neutralidad de dominio | Prohibido filtrar vocabulario, ejemplos, productos comerciales o protocolos del dominio de un cliente concreto a los artefactos normativos del framework |
| **D8** | Conjunto cerrado de tipos de proyecto | Exactamente ocho valores, ni uno más: `library`, `web-monolith`, `web-microservices`, `desktop-app`, `mobile-app-maui`, `rest-api`, `cli-tool`, `worker-service` |
| **D9** | Evidencia verificable | Toda afirmación sobre el estado del sistema cita evidencia localizable, reproducible, contemporánea e independiente de quien afirma. Su alcance acotado y su formato de cita viven en [`Deriva-Rules.md`](SDD/Devs/Rules/Deriva-Rules.md) §1 |

D1 a D8 vienen del bootstrap del framework. D9 se incorporó después, con el sensado de deriva, y rige hacia adelante y no retroactivamente: reauditar la documentación previa contra una regla nueva produciría un volumen de hallazgos que ahoga a los reales. Las notas de coherencia emitidas antes de su incorporación siguen diciendo «D1-D8», y es correcto que lo hagan: verificaron contra el conjunto vigente en su momento.

---

## Reglas de intervención sobre el framework

| Qué querés hacer | Qué exige |
| --- | --- |
| Corregir una errata o aclarar una redacción sin cambio semántico | Editar in situ, sin subir versión. Registrar en el control de cambios del archivo si el cambio es visible |
| Agregar un artefacto a una categoría, un anti-patrón o un criterio de aceptación | Subir **minor** del archivo de reglas, con fila nueva en su §9 control de cambios |
| Cambiar el gating de una categoría por tipo D8, o el conjunto de artefactos que produce | Subir **major** del archivo de reglas. La documentación ya generada con la versión anterior deja de cumplir |
| Agregar una categoría documental o una fase al orquestador | Subir **major** del archivo afectado, y actualizar el master-prompt, `Root-Rules.md` y la guía de usuario en la misma intervención |
| Modificar una invariante D1 a D9 | Es el cambio de mayor impacto del framework: alcanza a los dieciséis archivos de reglas, al orquestador y a toda la documentación ya emitida. Requiere decisión explícita del responsable y nota de coherencia |
| Cualquier intervención sobre varios archivos | Emitir una nota de coherencia siguiendo el patrón de [`Coherencia-Auditoria-Marco-v1.0.md`](SDD/Devs/Guides/Coherencia-Auditoria-Marco-v1.0.md): alcance, inventario, verificación de invariantes, trazabilidad, observaciones y veredicto |

El procedimiento completo, con sus ejes de extensión, sus criterios y sus anti-patrones, vive en [`SDD/Guides/SDD-Development-Guide.md`](SDD/Guides/SDD-Development-Guide.md).

**Autosuficiencia.** Ningún archivo de este repositorio referencia otro repositorio. Es lo que permite clonarlo solo, moverlo o distribuirlo sin arrastrar dependencias. Al intervenirlo, esa propiedad se preserva: los estándares de industria se nombran, no se enlazan.

---

[Resumen del framework](https://docs.google.com/document/d/1S0LlnTQbsV-5zxHtKwbxpTZaQrtgKu5q/preview)
