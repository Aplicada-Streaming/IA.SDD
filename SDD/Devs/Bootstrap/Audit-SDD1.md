# Auditoría del material fuente SDD 1.0

**Fase:** 0 (Auditoría inicial)
**Auditor:** Auditor independiente del material fuente
**Alcance:** /sdd1.0/ (solo lectura)
**Versión:** 1.0

---

## 1. Inventario

### 1.1 /sdd1.0/docs/

| Sección | Carpeta | Archivos `.md` | Especialidad mapeada (AG-XX) | Notas |
|---|---|---|---|---|
| 00 | `00-Contexto/` | `Vision-Producto-v1.0.md`, `Alcance-Proyecto-v1.0.md`, `Roadmap-Producto-v1.0.md`, `Compatibilidad-Plataformas-v1.0.md`, `Acuerdo-Equipo-v1.0.md` (5) | AG-00 Product Manager | Define el porque del proyecto. Sufijo `_vX.Y` con guion bajo. |
| 01 | `01-Necesidades-Negocio/` | `Necesidades-Negocio-v1.0.md` + subcarpeta `Necesidades-De-Negocio/` con `NB-01..NB-06` (7) | AG-01 Analista de Negocio | Patron `NB-XX-<Nombre>.vX.Y.md` con punto antes de la version. Mezcla mayusculas en kebab (`Desacople`, `Estandarizacion`). |
| 02 | `02-Especificacion-Funcional/` | `Especificacion-Funcional-v1.0.md`, `Definicion-DSL-v1.0.md`, subcarpeta `Casos-De-Uso/` con 39 CU (incluye duplicados `-v1.0` y `-v2.0` para CU-06, CU-09, CU-12, CU-21, CU-24, CU-25, CU-26), subcarpeta `Reglas-De-Negocio/` con `RN-01..RN-06`, subcarpeta `Modelo-Datos/` con `Modelo-Conceptual-v1.0.md` y subsubcarpeta `reglas-conceptuales-de-modelo/` con `RC-01..RC-06` (54) | AG-02 Analista Funcional | Coexistencia de `RN-` y `RC-`. Casos de uso usan kebab puro (correcto). Versionado expresa cambios reales (v2.0). |
| 03 | `03-UX-UI/` | `Glosario-v1.0.md`, `Experiencia-De-Uso-Del-Motor-v1.0.md`, `Experiencia-De-Uso-Del-Motor-v1.1.md`, `Wireframes-Documentos-v1.0.md`, `Wireframes-Documentos-v1.1.md`, `Representacion-Documento-Escpos-v1.0.md`, `Representacion-Documento-Escpos-v1.1.md`, `Representacion-Vista-Previa-UI-v1.0.md`, `Representacion-Vista-Previa-UI-v1.1.md` (9) | AG-03 Especialista DX | Carpeta con separador mixto (`ux-ui` con guion en vez de `_`). Mantiene versiones `-v1.0` y `-v1.1` en paralelo (debe limpiarse). |
| 04 | `04-Prompts-AI/` | `Prompt-Clasificacion-Documento-v1.0.md` (1) | AG-04 Ingeniero de Prompts | Seccion subdesarrollada respecto al resto. Solo 1 prompt. |
| 05 | `05-Arquitectura-Tecnica/` | `README.md`, `Arquitectura-Solucion-v1.0.md`, `Decisiones-Arquitectura-v1.0.md`, `Extensibilidad-Motor-v1.0.md`, `Flujo-Ejecucion-Motor-v1.0.md`, `Guia-Uso-Libreria-v1.0.md`, `Modelo-Datos-Logico-v1.0.md`, `Modelo-Logico-De-Ejecucion-v1.0.md`, `Contratos-Del-Motor-v1.0.md`, `Contratos-Del-Motor-v1.1.md` (10) | AG-05 Arquitecto de Software | No existen archivos ADR-XX individuales; las decisiones estan consolidadas en `Decisiones-Arquitectura-v1.0.md`. Gap a corregir en SDD. |
| 06 | `06-Backlog-Tecnico/` | `Backlog-Tecnico-v1.0.md`, `Product-Backlog-v1.0.md`, `Definition-Of-Ready-v1.0.md` (3) | AG-06 Scrum Master (Backlog) | US-XX y BT-XX estan inline dentro de los 3 documentos, no como archivos separados. Carpeta usa separador mixto (`backlog-tecnico`). |
| 07 | `07-Plan-Sprint/` | `plan-iteracion_sprint-01..08-v1.0.md`, `Template-Sprint-Review-v1.0.md`, `Template-Sprint-Retrospectiva-v1.0.md`, `Velocidad-Equipo-v1.0.md` (11) | AG-07 Gestion Agil | Nombres con dos separadores (`_sprint-01-v1.0`) que mezclan `_` y `-`. |
| 08 | `08-Calidad-Y-Pruebas/` | `Estrategia-Calidad-Motor-v1.0.md`, `Estrategia-Testing-Motor-v1.0.md`, `Casos-Prueba-Referenciales-v1.0.md`, `Criterios-Validacion-Motor-v1.0.md`, `Definition-Of-Done-v1.0.md`, `Guia-Testing-Extensibilidad-v1.0.md`, `Matriz-Cobertura-Pruebas-v1.0.md`, `Plan-Pruebas-v1.0.md` (8) | AG-08 QA / SDET | Sufijo `-motor` repetido en varios archivos delata domain-specific. |
| 09 | `09-Devops/` | `README.md`, `Pipeline-CI-CD-v1.0.md`, `Estrategia-Versionado-v1.0.md`, `Entornos-Deploy-v1.0.md`, `Guia-Publicacion-Nuget-v1.0.md` (5) | AG-09 DevOps | Foco fuerte en NuGet (especifico .NET). Hay que abstraer a "publicacion de artefactos". |
| 10 | `10-Developer-Guide/` | `README.md`, `conceptos-fundamentales.md`, `formato-dsl-templates.md`, `formato-perfiles-impresora.md`, `guia-integracion-maui.md`, `integracion-api-rest.md`, `perfiles-impresoras-reales.md`, `soporte-imagenes-termicas.md` (8) | AG-10 Technical Writer | Archivos sin sufijo de version (inconsistencia respecto al resto). Contenido muy domain-specific. |
| 11 | `11-Examples/` | `README.md`, `ejemplo-01-simple.md`, `ejemplo-02-multa.md`, `ejemplo-03-multaapp-nuget.md` (4) | AG-11 Developer Advocate | Sin sufijo de version. Nombres atan al dominio (`multa`, `nuget`). |
| raiz | `docs/README.md` | 1 | AG-ROOT Arquitecto de Soluciones | Onboarding global. Util como esqueleto del README maestro de SDD. |

Total `/sdd1.0/docs/`: 126 archivos `.md`.

### 1.2 /sdd1.0/references/

| Subcarpeta | Archivos `.md` clave | Proposito metodologico |
|---|---|---|
| `agentes-especialidades/` | `README.md`, `tabla-caracterizacion-agentes.md`, `AG-ROOT-arquitecto-soluciones.md`, `AG-00..AG-11` (14) | Define los 13 roles (AG-ROOT + AG-00..AG-11) que se mapean 1:1 con las carpetas `docs/`. Es el insumo central para el capitulo "Especialidades" de SDD. |
| `arquitectura/` | `guia-arquitectura-.net.md`, `guia-arquitectura-microservicios.md`, `guia-manejo-recursos.md` (3) | Estilos arquitectonicos: clean .NET, microservicios + API gateway + multi-tenancy, manejo de recursos. Base del capitulo "Estilos arquitectonicos". |
| `devops/` | `marco-teorico.md`, `Plan-Mejoras-Devops-v1.0.md`, `guia-flujo-trabajo-versionado.md`, `publish-nuget.md` (4) | Release engineering industrial 2024-2026, SemVer, supply chain, GitOps, publicacion. Base del capitulo "DevOps y release engineering". |
| `metodologia-sdd/` | `sdd.md`, `resumen.md`, `metodologia-sdd-prompting.md`, `referencias.md` (4) | Tres niveles SDD (Spec-First, Spec-Anchored, Spec-as-Source), prompting colaborativo Claude/Copilot. Base del capitulo "Fundamentos SDD" y "Prompting con IA". |
| `metodos-agiles/` | `guia-de-estudio.md`, `metodologias-agiles-jira.md`, `guia-organizacion-proyecto-jira.md`, `caso-de-estudio-1.md` (4) | Vision -> Epicas -> Product Backlog -> US/MoSCoW -> DoR/DoD -> Sprints. Base del capitulo "Metodologia agil aplicada". |
| `notas/` | `tools.md` (1) | Notas operativas de VS Code (vista paralela MD). Descartable. |
| `refinamiento_docs/` | `agentes-refinamiento-docs.md`, `prompt_refinanmiento.md` (2) | Define el prompt maestro y los sub-agentes de refinamiento por carpeta. Base del capitulo "Metodologia del template". Nota: `prompt_refinanmiento.md` contiene typo en el nombre. |
| `uix-ux/` | `metodologia-uix-ux.md`, `Marco-Teorico-UX-UI-v1.0.md` (2) | Documentacion de flujos de usuario, wireframes, journey maps. Base del capitulo "UX/UI/DX como continuo". Nota: carpeta `uix-ux` (typo, deberia ser `ux-ui`). |

Total `/sdd1.0/references/`: 35 archivos `.md`. Total general inventariado: **161 archivos**.

---

## 2. Patrones de estructura repetibles

| Patron | Descripcion | Aplicable a (categorias SDD) |
|---|---|---|
| Encabezado de metadatos | Bloque inicial `Proyecto / Documento / Version / Estado / Fecha / Autor` repetido en casi todos los `.md`. | Plantilla base de todos los artefactos NB, CU, RN, ADR, US, BT, sprint, test, ADR-tecnico. |
| Numeracion de carpetas `00..11` | Doce secciones ordenadas por orden de lectura, una por especialidad. | Esqueleto `docs/` reusable para todos los tipos de proyecto (D8). |
| Mapeo 1 carpeta = 1 especialidad | Cada carpeta tiene un AG-XX duenio. Reglas claras de produccion/consumo. | Catalogo de 13 especialidades (AG-ROOT + AG-00..AG-11). |
| Trazabilidad explicita por tablas | Tablas `CU -> NB`, `RN -> CU`, `US -> CU/RN`, `BT -> US`, `Test -> US`. | Patron de "tabla de trazabilidad" obligatoria al pie de cada artefacto (cubre D6). |
| Plantilla de caso de uso | Secciones fijas: Proposito / Actores / Precondiciones / Postcondiciones / Flujo principal / Flujos alternativos / Excepciones / Trazabilidad. | Plantilla `CU.template.md`. |
| Plantilla de necesidad de negocio | Secciones: Descripcion / Ejemplo / Impacto / Problema especifico / Criterios de exito (tabla con metrica/target) / Stakeholders / Trazabilidad a CU / Dependencias. | Plantilla `NB.template.md`. |
| Plantilla de sprint plan | Secciones: Informacion general / Objetivo del sprint / Historias y tareas comprometidas (tabla con tipo, prioridad, estimacion) / Alcance tecnico / Criterios de hecho. | Plantilla `sprint-plan.template.md`. |
| Backlog tecnico por epicas | Estructura "EPICA N -> Objetivo -> BT-XXX (Tipo, Prioridad, Fuente, Descripcion, Criterios de aceptacion)". | Plantilla `backlog-tecnico.template.md`. |
| README de seccion | Cada carpeta `docs/XX_*` puede llevar un `README.md` con indice, glosario, RACI y decisiones D1-Dn. | Plantilla `section-readme.template.md` (parametrizable por especialidad). |
| Pipeline de transformacion DSL -> AST -> Render | En el dominio especifico es DSL, pero el patron "pipeline declarado" sirve para describir arquitecturas en general. | Patron generico de "diagrama de flujo de la solucion" en `05-Arquitectura-Tecnica/`. |
| Pirámide de testing y quality gates | 70 unit / 20 integracion / 5 snapshot / 5 E2E, DoD, cobertura minima. | Plantillas de `estrategia-testing.template.md` y `definition-of-done.template.md`. |
| Estructura de marco teorico vs operativo | `/References/devops/marco-teorico.md` separa lo metodologico (teoria) de lo vivo (`/Docs/09-Devops/`). | Convencion `../IA.SDD/SDD/Devs/` (marco) vs `SDD/Docs/` (operativo) para evitar contaminacion. |
| Tablas RACI y decisiones D1-Dn | El README de `09-Devops/` usa RACI y decisiones numeradas. | Patron transversal para todas las secciones de SDD (invariantes locales por seccion). |
| Flujo de lectura recomendado | Cadena explicita AG-00 -> AG-01 -> ... -> AG-ROOT al pie del README global. | Plantilla `reading-flow.template.md` en el README maestro. |
| Definicion de Ready / Definicion de Done | DoR/DoD como artefactos separados y referenciables. | Plantillas reusables, idem D6. |

Total patrones repetibles identificados: **14**.

---

## 3. Contenido especifico del dominio (a descartar en SDD)

| Mencion observada | Ubicacion (archivo) | Genericizacion propuesta |
|---|---|---|
| "Motor DSL de Generacion de Documentos" como nombre de producto | `docs/README.md`, todos los frontmatters | Reemplazar por placeholder `{{nombre-proyecto}}` en plantillas. |
| ESC/POS, ticket, impresora termica | `docs/02-Especificacion-Funcional/Casos-De-Uso/CU-06-renderizar-escpos_*`, `08-Calidad-Y-Pruebas/Criterios-Validacion-Motor-v1.0.md`, `10-Developer-Guide/perfiles-impresoras-reales.md` | Excluir del template. Si se necesitan ejemplos de "renderizar salida", usar dominio generico tipo "componente de export". |
| MAUI / Bluetooth / NuGet / .NET 10 | `Docs/02-Especificacion-Funcional/Casos-De-Uso/CU-10-Enviar-Impresora-Bluetooth-v1.0.md`, `CU-27-Integrar-Motor-MAUI-v1.0.md`, `09-Devops/Guia-Publicacion-Nuget-v1.0.md`, `10-Developer-Guide/guia-integracion-maui.md` | Convertir en variantes por tipo de proyecto (mobile-app-maui, library, etc., segun D8). El template no fija stack. |
| Casos de uso CU-01..CU-32 numerados | `docs/02-Especificacion-Funcional/Casos-De-Uso/` | Conservar solo el patron `CU-XX-<Nombre>`. La numeracion concreta la define cada proyecto en su intake. |
| NB-01..NB-06 con titulos especificos (`Desacople`, `Multi-dispositivo`, `Reduccion-de-costos`) | `docs/01-Necesidades-Negocio/Necesidades-De-Negocio/` | Eliminar contenido. Conservar plantilla `NB.template.md`. |
| RC-01..RC-06 (reglas conceptuales del modelo de datos del motor) | `docs/02-Especificacion-Funcional/Modelo-Datos/reglas-conceptuales-de-modelo/` | Generizar como categoria opcional `RC-XX` (regla conceptual) en proyectos con modelo de datos rico. No imponer. |
| Sprints 01..08 con contenido (parser, AST, evaluador) | `docs/07-Plan-Sprint/plan-iteracion_sprint-0*` | Conservar solo el formato; eliminar las historias y tareas inline. |
| Backlog tecnico con BT-001..BT-XXX especificos (MotorDsl.Core, MotorDsl.Parser) | `Docs/06-Backlog-Tecnico/Backlog-Tecnico-v1.0.md` | Conservar la estructura "Epica -> BT-XXX"; eliminar BTs concretos. |
| Ejemplos `ejemplo-02-multa`, `ejemplo-03-multaapp-nuget` | `docs/11-Examples/` | Renombrar a `ejemplo-01-basico`, `ejemplo-02-intermedio`, `ejemplo-03-avanzado` (progresion de complejidad, no de dominio). |
| Cobertura ≥ 70%, .NET 10 SDK, dotnet build/test | `docs/README.md`, `08-Calidad-Y-Pruebas/` | Convertir cobertura y comandos en variables por tipo de proyecto. |
| GitHub Packages / publish-nuget.md | `references/devops/publish-nuget.md` | Mover a apendice "ejemplo .NET" del capitulo DevOps. El nucleo debe ser stack-agnostic. |
| "Motor DSL" en metodologia-sdd-prompting | `references/metodologia-sdd/metodologia-sdd-prompting.md` | Reescribir como caso de uso ilustrativo, no como referencia normativa. |

---

## 4. Inconsistencias detectadas en el fuente

| Tipo de inconsistencia | Archivo(s) afectado(s) | Como evitarlo en SDD |
|---|---|---|
| Doble convencion de version `.vX.Y` vs `_vX.Y` | NB usa `NB-01-Desacople-v1.0.md` (punto). El resto (CU, RN, sprint, contexto) usa `-v1.0.md` (guion bajo). | Fijar `-v<X.Y>` como unica convencion (D4). Bloquear el punto antes de la version. |
| Casing variable en el slug | En el fuente SDD 1.0, `NB-01-Desacople.v1.0.md` y `NB-02-estandarizacion.v1.0.md` mezclan capitalizacion (unos con inicial en mayuscula, otros todo en minusculas). | Forzar Título-Con-Guiones estricto (D3). Pre-commit hook que valide regex. |
| Acentos en titulos de archivo | Ninguno con acentos en filename (correcto), pero algunos contenidos internos usan emojis y simbolos (`🧠`, `📌`, `👉`). | Prohibir emojis en cuerpo (D1 ya implicito). Linter de markdown que rechace emojis. |
| Separadores mixtos en nombres de carpeta | En el fuente SDD 1.0, `03_ux_ui` (guion bajo), `06_backlog-tecnico` (guion), `09_devops` (sin separador) mezclan separadores tras el prefijo numerico. | Unificar a Título-Con-Guiones con guion medio (D3): `03-UX-UI-DX`, `06-Backlog-Tecnico`, `09-Devops`. Regla unica documentada. |
| Carpeta con typo | `references/uix-ux/` en el fuente SDD 1.0 (deberia ser `ux-ui` segun la convencion del resto). | Renombrar a `UX-UI` en SDD. |
| Archivo con typo en nombre | `references/refinamiento_docs/prompt_refinanmiento.md` ("refinanmiento"). | Renombrar a `prompt-refinamiento.md` y aplicar Título-Con-Guiones (D3). |
| Sufijo de version ausente en `10-Developer-Guide/` y `11-Examples/` | `conceptos-fundamentales.md`, `formato-dsl-templates.md`, `ejemplo-01-simple.md`, etc. | Hacer obligatorio `-v1.0` en todos los artefactos versionables (D5). Las guias del developer guide tambien deben llevar version. |
| Coexistencia de v1.0 y v1.1 / v2.0 sin marcar deprecacion | `03-UX-UI/Experiencia-De-Uso-Del-Motor-v1.0.md` + `-v1.1.md`; `CU-06-v1.0` + `-v2.0`; idem CU-09, CU-12, CU-21, CU-24, CU-25, CU-26. | Definir politica: solo la version vigente queda en el arbol; las anteriores se archivan en `_legacy/` con sello `Estado: Superado`. |
| Inconsistencia en prefijos numericos | Todos usan `NN_` (00 a 11) salvo carpetas hijas que ya no usan numero. La sub-subcarpeta `reglas-conceptuales-de-modelo/` no tiene prefijo de orden. | Subcarpetas no llevan prefijo numerico (correcto), pero documentar la regla para no confundir. |
| Frontmatter inconsistente | Algunos archivos arrancan con `# Titulo` y otros con `**Proyecto:** ...`. Algunos llevan `--` o `---` antes del titulo (`07-Plan-Sprint/plan-Iteracion_sprint-01-v1.0.md` empieza con `--`). | Definir un frontmatter YAML opcional o un bloque markdown estandar fijo: titulo H1 + tabla de metadatos. |
| Numeracion saltada en CU | Existen `CU-01..CU-10` y `CU-13..CU-32`, pero `CU-11`, `CU-12` aparecen sueltos sin la secuencia natural (CU-11 esta presente como `seleccionar-perfil-impresora`, pero la organizacion de IDs no es contigua en el filesystem). | El template debe definir reglas de numeracion contigua. Pre-commit que detecte huecos. |
| Idioma de identificadores mezclado en backlog | `BT-001` (tres digitos) vs `NB-01`, `CU-01`, `RN-01` (dos digitos). | Fijar dos digitos por convencion (`BT-01`, `BT-02`, ..., `BT-99`) o tres consistentes. |
| Estados libres | Aparecen `Propuesto`, `Activo`, `Aprobado`, `Borrador`. Sin enum cerrado. | Enumerar estados validos: `Borrador / Propuesto / Aprobado / Vigente / Superado / Archivado`. |
| ADRs sin existir como archivos individuales | `05-Arquitectura-Tecnica/` consolida todo en `Decisiones-Arquitectura-v1.0.md`. La cadena D6 menciona ADR como artefacto. | Forzar `ADR-XX-<Nombre>-v1.0.md` por decision en SDD. |

Total inconsistencias documentadas: **14**.

---

## 5. Mapa de cobertura del marco teorico

| Capitulo previsto SDD | Fuentes en /sdd1.0/references/ | Notas de uso |
|---|---|---|
| Fundamentos del enfoque SDD | `metodologia-sdd/sdd.md`, `metodologia-sdd/resumen.md`, `metodologia-sdd/referencias.md` | Reusar los tres niveles (Spec-First, Spec-Anchored, Spec-as-Source) y el marco de decision. El resumen sirve como tabla de mapeo seccion-disciplina-artefactos. Limpiar referencias al Motor DSL. |
| Metodologia del template (flujo de usuario) | `refinamiento_docs/agentes-refinamiento-docs.md`, `refinamiento_docs/prompt_refinanmiento.md`, `metodologia-sdd/metodologia-sdd-prompting.md` | Define la cadena Claude (estratega) -> Copilot/Code (ejecutor) y los sub-agentes por carpeta. Genericar el caso Motor DSL como ejemplo. |
| Especialidades (13 roles) | `agentes-especialidades/README.md`, `agentes-especialidades/tabla-caracterizacion-agentes.md`, `AG-ROOT-arquitecto-soluciones.md`, `AG-00..AG-11` | Cobertura completa 1:1 con las carpetas `docs/`. Insumo directo para el catalogo de especialidades. |
| Metodologia agil aplicada (Scrum) | `metodos-agiles/guia-de-estudio.md`, `metodos-agiles/metodologias-agiles-jira.md`, `metodos-agiles/guia-organizacion-proyecto-jira.md`, `metodos-agiles/caso-de-estudio-1.md` | Cubre Vision -> Epicas -> Backlog -> US/MoSCoW -> DoR/DoD -> Sprints. El estudio de caso es generico (clinica, ferreteria, cursos), util como base. |
| Tecnicas de descomposicion | `metodos-agiles/guia-de-estudio.md` (seccion "Como agrupar el backlog en epicas", "Criterios para definir una epica"), `agentes-especialidades/AG-06-scrum-master.md`, `AG-02-analista-funcional.md` | El material existe pero esta disperso. Hay que consolidar en un capitulo unico de tecnicas (story mapping, MoSCoW, vertical slicing, INVEST). |
| Estilos arquitectonicos | `arquitectura/guia-arquitectura-.net.md`, `arquitectura/guia-arquitectura-microservicios.md`, `arquitectura/guia-manejo-recursos.md` | Cubre clean architecture, microservicios + API gateway + multi-tenancy + frontend patterns. Falta cobertura explicita de los 8 tipos D8: library, cli-tool, worker-service, mobile-app-maui, desktop-app, web-monolith, web-microservices, rest-api. Hay que producir guia complementaria para los faltantes. |
| UX/UI/DX como continuo | `uix-ux/metodologia-uix-ux.md`, `Uix-Ux/Marco-Teorico-UX-UI-v1.0.md`, `agentes-especialidades/AG-03-especialista-dx.md` | Buena base teorica de flujos de usuario, wireframes, journey maps. AG-03 ya une UX y DX. Notar typo en la carpeta `uix-ux` (renombrar a `ux-ui`). |
| Calidad y pruebas en SDD | `agentes-especialidades/AG-08-ingeniero-qa.md` + `docs/08-Calidad-Y-Pruebas/*` (como insumo de forma) | No hay marco teorico dedicado en `/References/`. Se debe redactar capitulo nuevo apoyado en la piramide de testing, DoD, quality gates y matriz de cobertura observados en docs. |
| DevOps y release engineering | `devops/marco-teorico.md`, `devops/guia-flujo-trabajo-versionado.md`, `Devops/Plan-Mejoras-Devops-v1.0.md`, `devops/publish-nuget.md`, `agentes-especialidades/AG-09-ingeniero-devops.md` | Cobertura industrial 2024-2026 muy buena (SemVer, supply chain, GitOps, seis contextos). `publish-nuget.md` es stack-specific; mover a apendice. |
| Prompting colaborativo con IA | `metodologia-sdd/metodologia-sdd-prompting.md`, `refinamiento_docs/agentes-refinamiento-docs.md`, `refinamiento_docs/prompt_refinanmiento.md`, `agentes-especialidades/AG-04-ingeniero-prompts.md` | Define separacion Claude (estrategia, prompts) / Copilot o Claude Code (ejecucion sobre filesystem). Limpiar referencias hardcoded al Motor DSL. |

---

## 6. Recomendaciones para Fase 1 (plantillas intake)

- Construir dos plantillas iniciales `intake-vision.Template-v1.0.md` e `intake-tipo-proyecto.Template-v1.0.md` reusando como esqueleto el bloque de metadatos comun observado en `Docs/00-Contexto/Vision-Producto-v1.0.md` (Proyecto / Documento / Version / Estado / Fecha / Autor).
- Tomar de `references/metodos-agiles/guia-de-estudio.md` los tres insumos minimos pre-Scrum ("La idea y que quiere el cliente", "Que da y que pide el sistema", "Como lo quiere el cliente") y convertirlos en secciones obligatorias del intake de vision.
- Tomar del campo "Impacto" de los NB-XX el patron de tagging por area afectada, para incluirlo en el intake de vision como "areas impactadas".
- Rescatar la tabla "Criterio / Metrica / Target" de NB-01 como bloque "Criterios de exito tempranos" del intake.
- Descartar para el intake todo lo que sea propio del dominio Motor DSL: ESC/POS, MAUI, Bluetooth, .NET 10, NuGet, perfiles de impresora, plantillas DSL.
- Incluir en `intake-tipo-proyecto` un selector cerrado con los 8 tipos D8 (library, web-monolith, web-microservices, desktop-app, mobile-app-maui, rest-api, cli-tool, worker-service) y, por cada tipo, una sub-plantilla minima de stack-hints (no normativa).
- Aprovechar la idea de "Flujo de lectura recomendado" de `docs/README.md` para que el intake produzca como output un orden tentativo de las 12 secciones para ese tipo de proyecto (algunas pueden marcarse "no aplica" segun tipo: por ejemplo `04-Prompts-AI/` no aplica si el proyecto no incorpora IA).
- Forzar desde el intake que el nombre del proyecto se exprese en Título-Con-Guiones y que se reserve la variable `{{nombre-proyecto}}` para uso en todas las plantillas downstream.
- Definir desde el intake los valores de las decisiones D1-D8 que ese proyecto adoptara (idioma, encoding, Título-Con-Guiones, NB-XX, v1.0 inicial, cadena de trazabilidad, tipo de proyecto), guardandolos como `Decisiones-Proyecto-v1.0.md`.
- Excluir explicitamente de los intakes cualquier referencia a "Motor DSL", "DSL", "AST", "renderizador", "ESC/POS" como vocabulario.

---

## 7. Lecciones transversales (cross-fase)

- La numeracion de carpetas `00..11` y el mapeo 1:1 con especialidades AG-XX es la piedra angular reusable de SDD 1.0; mantenerla en SDD sin reescribir.
- Toda nueva plantilla debe imponer su nomenclatura mediante un linter (pre-commit + CI). La mezcla `.v1.0` vs `-v1.0` y el casing libre en NB demuestran que sin automatizacion la convencion se erosiona.
- La separacion `/Docs/` (operativo, vivo) y `/Devs/` (metodologico, marco teorico) que aparece en `references/devops/marco-teorico.md` es un acierto: replicar la misma frontera en SDD para evitar contaminacion cruzada.
- Versionar artefactos en paralelo (v1.0 + v1.1 + v2.0 conviviendo) es deuda: definir politica "una sola version vigente por nombre logico" y archivar el resto en `_legacy/`.
- La cadena de trazabilidad D6 (Vision -> NB -> CU -> RN -> ADR -> US -> BT -> Sprint -> Test -> Pipeline) ya esta presente como practica pero no esta explicitada como artefacto. Producir un documento `Trazabilidad-Matriz-v1.0.md` por proyecto como artefacto de primera clase.
- ADR debe materializarse como archivos individuales `ADR-XX-<Nombre>-v1.0.md`, no como un consolidado.
- Generalizar lo agnostico de stack (cobertura, comandos, pipeline) mediante variables y perfiles por tipo de proyecto; no hardcodear `.NET 10 / NuGet / MAUI`.
- El prompting colaborativo (Claude estratega + ejecutor con acceso a filesystem) es transferible y debe formalizarse como capitulo metodologico, no como anecdota del Motor DSL.
- Los marcos teoricos de DevOps, UX/UI y arquitectura ya cubren la mayoria de los capitulos de SDD; las brechas son: calidad y pruebas (no hay marco), tecnicas de descomposicion (esta disperso) y cobertura de los 8 tipos D8 (solo .NET y microservicios estan cubiertos).
- Mantener emojis fuera del contenido y reservarlos -- si acaso -- para README de bienvenida, nunca dentro de artefactos normativos. SDD debe prohibirlos por D1.

---

## Resumen cuantitativo

- Total de archivos `.md` inventariados: **161** (126 en `docs/`, 35 en `references/`).
- Total de inconsistencias documentadas: **14**.
- Total de patrones repetibles identificados: **14**.
