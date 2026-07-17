# Prompt para Claude Code — Bootstrap del Template SDD 2.0

**Archivo:** `PROMPT-claude-code-bootstrap-sdd2.0.md`
**Versión:** 1.0
**Fecha:** 2026-05-17
**Autor:** Diseño del prompt orquestador
**Idioma:** Español rioplatense
**Modo de ejecución:** Local en Claude Code, sobre repositorio que contiene `/sdd1.0/` como material fuente.
**Resultado esperado:** Estructura completa `/sdd2.0/` con plantillas de intake, reglas por categoría, prompt orquestador y guías.

---

## 0 · Cómo usar este prompt

Este archivo es el **prompt único** que se carga en Claude Code para que reformule la metodología SDD 1.0 (acoplada al dominio "Motor DSL") en un **template metodológico reusable** SDD 2.0, orquestable por IA, adaptable a distintos tipos de proyecto (librería, monolito, microservicios, web, MAUI, API).

**Pasos para ejecutarlo:**

1. Verificar que el repositorio local contenga la carpeta `/sdd1.0/` con sus dos subcarpetas `/sdd1.0/docs/` (12 secciones 00–11) y `/sdd1.0/references/` (material de estudio, marco teórico, agentes especialidades, metodología SDD, métodos ágiles, arquitectura).
2. Abrir Claude Code en la raíz del repositorio.
3. Pegar este archivo completo como instrucción inicial.
4. Confirmar en el chat que Claude Code aplique el **modo plan-then-confirm** descrito en §3.
5. Revisar el plan que Claude Code presente y autorizar la ejecución por fases.
6. Al finalizar, validar contra los criterios de aceptación de §7.

**Lo que este prompt NO hace:**
- No genera código fuente. Solo produce **documentación metodológica** (plantillas, reglas, prompts, guías).
- No genera la documentación de un proyecto concreto. Esa la generará después el prompt orquestador creado por este prompt, cuando el usuario lo ejecute con un `PROJECT-BRIEF` y un `PROJECT-README` reales.
- No modifica `/sdd1.0/`. Es solo lectura. Toda la salida va a `/sdd2.0/`.

---

## 1 · Rol del agente principal

Sos el **agente orquestador principal** responsable de transformar la metodología documental SDD 1.0 en un template SDD 2.0 reusable y agnóstico al dominio. Operás en Claude Code con acceso al filesystem del repositorio.

**Responsabilidades:**

- Auditar el material fuente en `/sdd1.0/` y construir un mapa mental de la metodología.
- Decidir el plan de trabajo y presentarlo al usuario para confirmación antes de ejecutar.
- Despachar **subagentes especializados** para cada tarea, asignando un rol concreto a cada uno.
- Garantizar coherencia cross-documental: las invariantes (idioma, nomenclatura, estructura) se respetan en todos los artefactos.
- Auditar entre fases: tras cada fase, un subagente auditor independiente revisa lo generado antes de continuar.
- Producir un changelog de bootstrap al final.

**Lo que NO hacés:**

- No ejecutás tareas especializadas directamente cuando hay un subagente más apropiado.
- No tomás decisiones invariantes a mitad del plan: se recolectan al inicio y se respetan.
- No copiás contenido de `/sdd1.0/docs/` literal en `/sdd2.0/`. Esos documentos son el **caso aplicado** del proyecto Motor DSL — sirven como **ejemplo de estructura y nomenclatura**, no como contenido genérico a reusar.

---

## 2 · Material fuente y separación de roles del material

El repositorio tiene tres tipos de material fuente. Conviene fijar mentalmente la diferencia antes de operar.

### 2.1 `/sdd1.0/docs/` — Caso aplicado del Motor DSL

Documentación viva del proyecto concreto "Motor DSL de Generación de Documentos". Es un **ejemplo lleno**: la estructura, nomenclatura, secciones, tablas y trazabilidad son la **referencia de forma**. El contenido (qué dice cada documento) es específico del dominio térmica/ESC/POS/MAUI y **no debe copiarse** al template SDD 2.0.

**Cómo usarlo:** leer la estructura (`tree /sdd1.0/docs/`), abrir cada archivo y extraer:
- El esqueleto de secciones de cada plantilla (numeración, encabezados, tablas tipo).
- Las convenciones de nomenclatura de archivos (`NB-XX-nombre-kebab.v1.0.md`, `CU-XX-nombre-kebab_v1.0.md`, etc.).
- Los patrones de trazabilidad y referencias cruzadas (cómo NB→CU, CU→RN, etc.).
- Los formatos de tablas recurrentes (Stakeholders, Criterios de Aceptación Given/When/Then, Control de Cambios).

### 2.2 `/sdd1.0/references/` — Material metodológico y de estudio

Material teórico y didáctico. Contiene varias subcarpetas con apuntes y guías. Es la **fuente conceptual** para construir el marco teórico y las plantillas de SDD 2.0.

Estructura esperada:

```
/sdd1.0/references/
├── agentes-especialidades/         → catálogo de 13 especialidades (AG-ROOT, AG-00..AG-11) con plantillas base, criterios de calidad, preguntas guía
├── metodologia-sdd/                → fundamentos del enfoque SDD asistido por IA, prompting colaborativo
├── refinamiento_docs/              → patrones de refinamiento documental con subagentes
├── metodos-agiles/                 → Scrum, Kanban, XP, técnicas (vertical slicing, walking skeleton, story mapping), guía Jira
├── arquitectura/                   → guía de arquitectura de microservicios y estrategias frontend
├── devops/                         → planes de mejora DevOps como patrón reusable
├── uix-ux/                         → marco teórico UX/UI/DX (50+ páginas)
```

**Cómo usarlo:** son la materia prima del marco teórico y de las **preguntas guía** que se incluyen en cada plantilla y en cada markdown de reglas.

### 2.3 Material que se conserva en SDD 2.0

Algunas piezas se copian o se reeditan directamente porque son agnósticas al dominio. Otras se **abstraen** para volverse genéricas. La regla:

| Material fuente | Tratamiento en SDD 2.0 |
|---|---|
| `agentes-especialidades/README.md` y `AG-XX-*.md` | **Reedita** y **abstrae**: los ejemplos del Motor DSL salen; quedan tareas, especificaciones, criterios, preguntas guía y plantilla base. |
| `metodologia-sdd/metodologia-sdd-prompting.md` | **Reedita**: base del marco teórico de SDD 2.0, capítulo "Fundamentos del enfoque". |
| `metodos-agiles/guia-de-estudio.md` y `metodologias-agiles-jira.md` | **Reedita**: base del marco teórico, capítulos "Metodología Scrum" y "Técnicas de descomposición". |
| `arquitectura/guia-arquitectura-microservicios.md` | **Reedita en parte**: base del capítulo "Estilos arquitectónicos" del marco teórico, usado también por las reglas del 05. |
| `uix-ux/marco-teorico-ux-ui_v1.0.md` | **Cita y referencia**: el capítulo UX/UI/DX del marco teórico se construye a partir de éste, condensado. |
| `refinamiento_docs/` | **Reedita**: base del patrón "auditoría entre fases" que usa el orquestador. |
| `devops/plan-mejoras-devops_v1.0.md` | **Cita**: usado como ejemplo del patrón plan-then-confirm con subagentes; no se copia literal. |

---

## 3 · Modo de operación: plan-then-confirm

Antes de generar nada, presentás el **plan completo** al usuario y esperás confirmación. El plan tiene la forma:

```text
PLAN DE BOOTSTRAP SDD 2.0

Invariantes (D1–D8):
  D1: ...
  D2: ...

Fase 0 — Auditoría
  Subagente: Auditor del material fuente
  Salidas: informe de auditoría en /sdd2.0/devs/_bootstrap/audit-sdd1.md

Fase 1 — Plantillas de intake
  Subagente 1.A: Product Manager + Analista de Negocio Senior (PROJECT-BRIEF)
  Subagente 1.B: Arquitecto de Software Senior + DevOps (PROJECT-README)
  Salidas: 2 archivos en /sdd2.0/devs/intake/

Fase 2 — Reglas por categoría (paralelizable)
  Subagente 2.00: Product Manager → rules/00_rules_contexto.md
  Subagente 2.01: Analista de Negocio Senior → rules/01_rules_necesidades_negocio.md
  Subagente 2.02: Analista Funcional → rules/02_rules_especificacion_funcional.md
  ... (13 subagentes en total)

Fase 3 — Prompt orquestador y reglas root
  Subagente: Arquitecto de Soluciones Senior + Ingeniero de Prompts
  Salidas: /sdd2.0/devs/orchestrator/master-prompt.md + rules/_root_rules.md

Fase 4 — Marco teórico y guía de usuario
  Subagente 4.A: Technical Writer (marco teórico) → /sdd2.0/devs/guides/marco-teorico-sdd_v1.0.md
  Subagente 4.B: Developer Advocate (guía usuario) → /sdd2.0/guides/guia-usuario-sdd2.0_v1.0.md

Fase 5 — Auditoría final cross-doc
  Subagente: Auditor independiente sin contexto previo
  Salida: /sdd2.0/devs/_bootstrap/audit-final.md + ajustes correctivos
```

Una vez confirmado, ejecutás fase por fase con un audit independiente entre cada fase mayor. Si durante una fase aparece una decisión nueva que afecta varias fases, **se detiene**, se discute con el usuario y se actualiza el bloque de invariantes antes de continuar.

---

## 4 · Invariantes globales (D1–D8)

Estas decisiones se fijan al inicio y aplican a todo el plan. Cada subagente las recibe inyectadas en su prompt.

| ID | Decisión | Valor |
|---|---|---|
| **D1** | Idioma de toda la documentación generada | Español rioplatense, neutro técnico. |
| **D2** | Codificación, formato y línea final | UTF-8, EOL `LF`, archivos `.md`, encabezados con `#`, listas con `-`. |
| **D3** | Convención de nombres de archivo de **plantillas** | `kebab-case` + sufijo descriptivo. Ej: `PROJECT-BRIEF-template.md`, `00_rules_contexto.md`. |
| **D4** | Convención de nombres de archivo de **artefactos generados** (los que producirá el orquestador en `/sdd2.0/docs/`) | Reglada por cada markdown de reglas. Sigue la convención de `/sdd1.0/docs/` adaptada: `<area>_v<X.Y>.md`, `NB-XX-<kebab>.v<X.Y>.md`, `CU-XX-<kebab>_v<X.Y>.md`, etc. **Sin espacios, sin acentos, sin mayúsculas en kebab.** |
| **D5** | Versionado de las plantillas SDD 2.0 | Las plantillas arrancan en `v1.0`. El sufijo va en la cabecera, no en el nombre de archivo (porque la plantilla evoluciona pero el path no debería cambiar). |
| **D6** | Trazabilidad cross-doc | Cadena estándar: `Visión → NB → CU → RN → ADR → US → BT → Sprint → Test → Pipeline`. Cada documento generado declara explícitamente sus enlaces upstream y downstream. |
| **D7** | Tratamiento del proyecto fuente Motor DSL | Material de referencia formal, **no de contenido**. Ningún archivo en `/sdd2.0/` debe mencionar "ESC/POS", "MAUI", "impresora térmica", "Motor DSL", "Bluetooth" como si fueran ejemplos canónicos. Si se necesita un ejemplo, se construye uno genérico (ej. "sistema de gestión de turnos", "API de pagos", "librería utilitaria"). |
| **D8** | Tipos de proyecto soportados por el template | `library` · `web-monolith` · `web-microservices` · `desktop-app` · `mobile-app-maui` · `rest-api` · `cli-tool` · `worker-service`. Las reglas por categoría declaran qué documentos son obligatorios, recomendados u omitibles para cada tipo. |

**Si el usuario quiere agregar, quitar o modificar una invariante, lo hace antes de aprobar el plan. Una vez aprobadas, son inmutables hasta el final del bootstrap.**

---

## 5 · Estructura objetivo de `/sdd2.0/`

Al finalizar el bootstrap, la estructura debe ser:

```text
/sdd2.0/
├── devs/
│   ├── _bootstrap/
│   │   ├── audit-sdd1.md                 ← informe Fase 0
│   │   ├── audit-fase-1.md               ← audit entre fases
│   │   ├── audit-fase-2.md
│   │   ├── audit-fase-3.md
│   │   ├── audit-final.md                ← audit Fase 5
│   │   └── bootstrap-changelog.md        ← changelog del bootstrap
│   │
│   ├── intake/
│   │   ├── PROJECT-BRIEF-template.md     ← requerimientos cliente
│   │   └── PROJECT-README-template.md    ← requerimientos técnicos
│   │
│   ├── rules/
│   │   ├── _root_rules.md                ← reglas para README raíz del proyecto
│   │   ├── 00_rules_contexto.md
│   │   ├── 01_rules_necesidades_negocio.md
│   │   ├── 02_rules_especificacion_funcional.md
│   │   ├── 03_rules_ux_ui_dx.md
│   │   ├── 04_rules_prompts_ai.md
│   │   ├── 05_rules_arquitectura_tecnica.md
│   │   ├── 06_rules_backlog_tecnico.md
│   │   ├── 07_rules_plan_sprint.md
│   │   ├── 08_rules_calidad_y_pruebas.md
│   │   ├── 09_rules_devops.md
│   │   ├── 10_rules_developer_guide.md
│   │   └── 11_rules_examples.md
│   │
│   ├── orchestrator/
│   │   └── master-prompt.md              ← prompt orquestador del proyecto
│   │
│   └── guides/
│       └── marco-teorico-sdd_v1.0.md     ← marco teórico de la metodología
│
├── docs/                                  ← VACÍA en el bootstrap; la llena el master-prompt cuando se ejecute con un proyecto real
│   └── .gitkeep
│
└── guides/
    └── guia-usuario-sdd2.0_v1.0.md       ← guía paso a paso para usar el template
```

> **Importante:** `/sdd2.0/docs/` queda vacía. Es el destino del orquestador, no del bootstrap. El bootstrap **crea el `.gitkeep`** y nada más en esa carpeta.

---

## 6 · Fases detalladas

### Fase 0 — Auditoría del material fuente

**Subagente:** `Auditor independiente del material fuente`
**Rol:** Auditor especialista en documentación técnica con experiencia en SDD y metodologías ágiles.
**Entrada:** `/sdd1.0/docs/` y `/sdd1.0/references/` (solo lectura).
**Modo:** sin contexto previo de las decisiones futuras de SDD 2.0; opera contra D1–D8 y nada más.

**Tareas:**

1. Ejecutar `tree /sdd1.0/docs/` y mapear cada carpeta a una especialidad (cross-check con `agentes-especialidades/README.md`).
2. Listar todos los archivos `.md` y clasificarlos por:
   - categoría (00..11 o README raíz)
   - tipo de documento (visión, NB, CU, RN, ADR, US, BT, sprint plan, etc.)
   - patrón de nomenclatura observado
3. Detectar inconsistencias de nomenclatura en el material fuente (espacios, acentos, separadores mixtos `.v` vs `_v`) y registrarlas como **lecciones a evitar** en SDD 2.0.
4. Construir una tabla "estructura repetible" vs "contenido específico":
   - Estructura repetible (sirve como esqueleto): encabezados, tablas, secciones obligatorias, trazabilidad.
   - Contenido específico (a descartar): nombres de productos, tecnologías concretas, NB-XX particulares.
5. Mapear `/sdd1.0/references/` para identificar qué fragmentos del marco teórico cubren cada capítulo previsto.

**Salida:** `/sdd2.0/devs/_bootstrap/audit-sdd1.md` con:

```markdown
# Auditoría del material fuente SDD 1.0

## 1. Inventario
| Sección | Archivos | Especialidad | Notas |

## 2. Patrones de estructura repetibles
| Patrón | Descripción | Aplicable a |

## 3. Contenido específico del dominio (a descartar)
| Mención | Ubicación | Genericización propuesta |

## 4. Inconsistencias del fuente
| Tipo | Archivo(s) | Cómo evitarlo en SDD 2.0 |

## 5. Mapa de cobertura del marco teórico
| Capítulo previsto SDD 2.0 | Fuentes en /sdd1.0/references/ |

## 6. Recomendaciones para fase 1
```

**Confirmación con el usuario:** Claude Code presenta el audit y pide confirmación antes de avanzar a Fase 1.

---

### Fase 1 — Plantillas de intake

Dos subagentes en paralelo. Cada uno produce una plantilla con cabecera, secciones obligatorias, preguntas guía con ejemplos, criterios de completitud y un bloque final de "checklist de verificación".

#### Fase 1.A — `PROJECT-BRIEF-template.md` (requerimientos del cliente)

**Subagente:** `Product Manager + Analista de Negocio Senior` (rol compuesto).
**Especialidad base:** AG-00 + AG-01 (visión + necesidades de negocio).
**Entrada:** `/sdd1.0/references/agentes-especialidades/AG-00-product-manager.md`, `AG-01-analista-negocio.md`, `metodos-agiles/guia-de-estudio.md` (sección "Punto de partida").
**Salida:** `/sdd2.0/devs/intake/PROJECT-BRIEF-template.md`

**Contenido obligatorio del template:**

1. **Cabecera** con campos a completar: nombre del proyecto, cliente / stakeholder principal, fecha, versión del brief, autor del brief.
2. **§1 Idea y problema** — qué problema resuelve el sistema, en lenguaje del cliente. Preguntas guía con ejemplos en distintos dominios (turnos médicos, e-commerce, librería utilitaria).
3. **§2 Audiencia y stakeholders** — quién usa, quién paga, quién decide. Tabla con propietario / implementador / beneficiario.
4. **§3 Propuesta de valor y diferenciación** — qué hace distinto a esta solución vs el statu quo.
5. **§4 Alcance funcional pretendido (alto nivel)** — lista enumerada de capacidades que el cliente espera; explícitamente con el rótulo "(MoSCoW provisorio)".
6. **§5 Historias de usuario / experiencias deseadas** — formato `Como [rol], quiero [acción], para [valor]`. Mínimo 3 ejemplos en el template, con espacio para más.
7. **§6 Flujos típicos** — narrativa coloquial de 2–3 flujos representativos (cómo lo usaría un usuario real). Sin diagramas formales.
8. **§7 Casos límite y "qué pasa si"** — preguntas para el cliente del estilo "qué pasa si no hay conexión", "qué pasa si el dato llega vacío", "qué pasa si dos personas hacen lo mismo a la vez".
9. **§8 Métricas de éxito desde el negocio** — formato SMART. Tabla con criterio / métrica / target / plazo.
10. **§9 Lo que NO es este sistema (exclusiones)** — exclusiones explícitas con justificación.
11. **§10 Restricciones del cliente** — presupuesto orientativo, fecha objetivo, restricciones legales/regulatorias, integraciones obligatorias con sistemas existentes.
12. **§11 Riesgos detectados desde el negocio** — riesgos que el cliente ya conoce y mitigaciones propuestas.
13. **§12 Glosario del dominio del cliente** — términos del negocio que el equipo técnico necesita aprender.
14. **§13 Checklist de completitud del brief** — al menos 10 ítems verificables. El brief no se considera "listo" hasta que todos están tildados.

**Cada sección debe traer:**
- Una **instrucción** de qué se espera (qué responder y qué profundidad).
- Entre 2 y 4 **preguntas guía** con asterisco rojo si son bloqueantes para el siguiente paso.
- Al menos **un ejemplo genérico aplicado a un dominio distinto al Motor DSL** (recordar D7).
- Una nota de **lo que NO va en esta sección** (para evitar contaminación con info técnica).

**Cabecera de la plantilla:**

```markdown
# Project Brief — [Nombre del Proyecto]

**Cliente / Stakeholder:** [Nombre y rol]
**Documento:** PROJECT-BRIEF-<nombre-kebab>_v1.0.md
**Versión:** 1.0
**Fecha:** [YYYY-MM-DD]
**Autor del brief:** [Nombre]
**Estado:** [Borrador / En revisión / Aprobado]

> Este documento captura **lo que el cliente quiere** en lenguaje de negocio.
> NO incluye decisiones técnicas (stack, arquitectura, deployment, etc.).
> Para eso ver el documento PROJECT-README.

---
```

#### Fase 1.B — `PROJECT-README-template.md` (requerimientos técnicos)

**Subagente:** `Arquitecto de Software Senior + Ingeniero DevOps Senior` (rol compuesto).
**Especialidad base:** AG-05 + AG-09 (más insumos de AG-ROOT y AG-11 para 11_examples).
**Entrada:** `/sdd1.0/references/agentes-especialidades/AG-05-*.md`, `AG-09-*.md`, `AG-ROOT-*.md`, `AG-11-*.md`, `arquitectura/guia-arquitectura-microservicios.md`, `metodos-agiles/metodologias-agiles-jira.md` (sección 16: vertical slicing).
**Salida:** `/sdd2.0/devs/intake/PROJECT-README-template.md`

**Contenido obligatorio del template:**

1. **Cabecera** con: nombre del proyecto, repositorio, lead técnico, fecha, versión del README, stack principal.
2. **§1 Tipo de proyecto** — campo único con uno de los valores de D8 (`library`, `web-monolith`, `web-microservices`, `desktop-app`, `mobile-app-maui`, `rest-api`, `cli-tool`, `worker-service`). El orquestador usa este campo para decidir qué documentos generar. Tabla explicativa con las implicancias de cada tipo (qué documentos serán obligatorios, qué carpetas en `/src` se crean, qué hay en `/samples`, etc.).
3. **§2 Stack tecnológico** — lenguaje + versión, framework principal, runtime, plataformas target. Ej: `.NET 10`, `MAUI`, `Blazor Server`, `ASP.NET Core 10`. Tabla con dependencias core y justificación de cada una.
4. **§3 Estilo arquitectónico** — selección entre `monolito`, `monolito modular`, `microservicios`, `librería`, `pipeline`, `event-driven`, `clean architecture`. Tabla con criterio de elección (tomada de `guia-arquitectura-microservicios.md` §10) y justificación de la elección concreta del proyecto.
5. **§4 Esquema de descomposición y delivery** — selección entre `vertical slicing`, `horizontal slicing`, `walking skeleton + thin slices`. Preguntas guía: "¿el primer sprint entrega valor demostrable end-to-end?" "¿se pueden re-cortar las historias si la velocity baja?". Ejemplo aplicado al tipo de proyecto declarado en §1.
6. **§5 Estructura de repositorio propuesta** — árbol completo `tree` con `/src`, `/tests`, `/samples`, `/docs`, `/devs`. Para cada carpeta principal, qué contiene y qué nomenclatura tienen los proyectos `.csproj`/`.sln`. **Específicamente §5.X sobre `/samples`**: descripción detallada de cómo se materializan los `11_examples` para este tipo de proyecto (si es librería MAUI → app MAUI consumiendo `/src/<libreria>`; si es API → cliente web/escritorio que consume la API; etc.).
7. **§6 Comunicación e integración** — solo si aplica (microservicios, APIs externas). Protocolos (REST/gRPC/WebSocket/MQ), formato (JSON/Protobuf), versionado de contratos, manejo de errores transversal.
8. **§7 Persistencia** — qué se guarda, dónde, cómo se versiona el esquema (migrations), patrones (Repository, UoW, DAO), estrategia multi-tenant si aplica.
9. **§8 Seguridad y autenticación** — flujo OAuth/OIDC si aplica, manejo de secretos, política de roles. Tabla de decisión de auth (tomada de `guia-arquitectura-microservicios.md` §10.3) adaptada al proyecto.
10. **§9 Estrategia de testing** — pirámide de tests deseada (unit / integration / e2e / snapshot), cobertura mínima objetivo, frameworks (xUnit, NUnit, Playwright, etc.), enfoque BDD si aplica.
11. **§10 Estrategia de versionado y release** — SemVer 2.0.0, Conventional Commits, herramienta (MinVer, GitVersion, semantic-release), branching (GitHub Flow / Git Flow), canales de release (preview/stable), feed de paquetes si aplica.
12. **§11 Pipeline CI/CD** — qué pasos se exigen (build, test, lint, SCA, SBOM, firma, publicación), matriz de SO/runtime, ambientes (DEV/QA/STAGING/PROD o solo preview/stable según naturaleza), políticas de promoción.
13. **§12 Compatibilidad y plataformas target** — sistemas operativos, runtimes, navegadores, dispositivos, versiones mínimas soportadas.
14. **§13 Requerimientos no funcionales (NFR)** — performance (latencia p99, throughput), escalabilidad, disponibilidad, observabilidad (logs, métricas, tracing), cumplimiento normativo (GDPR, PCI, fiscal local).
15. **§14 Estrategia de demo / samples (11_examples)** — particularidad del proyecto: qué aplicaciones de ejemplo se construirán en `/samples`, qué demuestra cada una, qué nivel (básico/intermedio/avanzado), qué relación tienen con `/src` (ProjectReference / PackageReference / consumer externo).
16. **§15 Decisiones técnicas pre-tomadas (pre-ADR)** — decisiones ya cerradas por el cliente o el equipo antes del Sprint 0, con su justificación. Estas se convertirán en ADRs aceptados durante el Sprint 0.
17. **§16 Restricciones técnicas y trade-offs aceptados** — qué se renuncia conscientemente para ganar otra cosa (ej: "se acepta acoplar al SDK X porque agiliza el MVP, aunque sabemos que limita la portabilidad").
18. **§17 Checklist de completitud técnica** — al menos 12 ítems verificables.

**Cada sección debe traer:**
- Instrucción y profundidad esperada.
- 2–4 preguntas guía con ejemplos.
- Al menos un ejemplo aplicado a un tipo de proyecto distinto al Motor DSL (un microservicio de pagos, una API de identidad, una librería utilitaria genérica).
- "Lo que NO va en esta sección".

**Cabecera de la plantilla:**

```markdown
# Project README — [Nombre del Proyecto]

**Repositorio:** [URL]
**Lead técnico:** [Nombre]
**Documento:** PROJECT-README-<nombre-kebab>_v1.0.md
**Versión:** 1.0
**Fecha:** [YYYY-MM-DD]
**Stack principal:** [Lenguaje + framework + runtime]
**Estado:** [Borrador / En revisión / Aprobado]

> Este documento captura **cómo se va a construir** el sistema descrito en PROJECT-BRIEF.
> Contiene decisiones técnicas de stack, arquitectura, testing, CI/CD, samples.
> NO repite las necesidades del cliente: las asume conocidas vía PROJECT-BRIEF.

---
```

**Audit Fase 1:** Subagente auditor revisa que las dos plantillas cumplan D1–D8 y produzcan documentos compatibles entre sí (sin contradicciones, con campos vinculables: el `Tipo de Proyecto` del README es coherente con la naturaleza del Brief). Salida: `/sdd2.0/devs/_bootstrap/audit-fase-1.md`.

---

### Fase 2 — Reglas constructivas por categoría

Se generan **13 archivos** (uno por categoría 00–11 más `_root_rules.md`). Pueden ejecutarse en paralelo porque cada uno escribe en un archivo diferente.

#### Estructura obligatoria de cada `XX_rules_<categoria>.md`

Cada markdown de reglas tiene exactamente esta estructura, derivada del patrón observado en `/sdd1.0/references/agentes-especialidades/`:

```markdown
# Reglas constructivas — [Categoría XX nombre]

**Carpeta target:** `/sdd2.0/docs/XX_<nombre>/`
**Subagente target del orquestador:** [rol base]
**Versión de las reglas:** 1.0

---

## 1. Especialidad asignada

### 1.1 Especialidad base
[Nombre del rol] (por ejemplo: "Analista de Negocio Senior").
Equivalente al AG-XX del catálogo SDD 1.0.

### 1.2 Variantes según tipo de proyecto
| Tipo de proyecto (D8) | Especialidad específica | Justificación |
|---|---|---|
| library | [rol] | ... |
| web-monolith | [rol] | ... |
| web-microservices | [rol compuesto] | ej: "Analista de Negocio + Domain Modeler (DDD)" |
| desktop-app | [rol] | ... |
| mobile-app-maui | [rol] | ... |
| rest-api | [rol] | ... |
| cli-tool | [rol] | ... |
| worker-service | [rol] | ... |

> **El orquestador lee esta tabla** y, a partir del campo `Tipo de proyecto` del PROJECT-README, selecciona la variante correcta para inyectar en el prompt del subagente que generará los documentos de esta categoría.

### 1.3 Multi-especialidad
Si la categoría requiere más de una especialidad simultánea (por ejemplo 02 Especificación funcional puede requerir Analista Funcional + Modelador de Dominio en proyectos DDD), se documenta acá cómo se combinan.

---

## 2. Documentos que produce esta categoría

### 2.1 Tabla maestra de documentos
| Archivo (nomenclatura) | Obligatorio para | Recomendado para | Omitir para | Descripción |
|---|---|---|---|---|

### 2.2 Reglas de inclusión/exclusión por tipo de proyecto
[Cómo el orquestador decide qué documentos generar.]

---

## 3. Nomenclatura y vinculación

### 3.1 Patrón de nombres
[Patrón regex / template, ej: `NB-XX-<kebab>.v<X.Y>.md` donde XX es número de 2 dígitos.]

### 3.2 Convenciones de prefijos / sufijos
[NB, CU, RN, ADR, US, BT, TK, etc. — qué significa cada uno y cuándo se usa.]

### 3.3 Vinculación cross-doc (trazabilidad upstream/downstream)
[Quién consume qué y qué produce qué, con paths concretos.]

### 3.4 README de la sección
[Si la categoría requiere un README de carpeta (recomendado para 09, 10, 11) y qué contiene.]

---

## 4. Estructura de redacción de cada documento

### 4.1 Cabecera obligatoria
```markdown
# [Título descriptivo]

**Proyecto:** [Nombre]
**Documento:** [archivo].md
**Versión:** X.Y
**Fecha:** YYYY-MM-DD
**Autor / Subagente:** [rol]
**Estado:** [Borrador / Aprobado / Deprecado]
**Trazabilidad upstream:** [enlaces a documentos que alimentan éste]
**Trazabilidad downstream:** [enlaces a documentos que éste alimenta]

---
```

### 4.2 Secciones obligatorias
[Lista numerada con qué va en cada sección, qué profundidad y formato.]

### 4.3 Secciones opcionales según tipo de proyecto
[Cuándo agregar qué.]

### 4.4 Tablas tipo y formatos recurrentes
[Por ejemplo: cómo se redacta una tabla de criterios de aceptación Given/When/Then; cómo se redacta una tabla de Stakeholders; cómo se redacta una tabla de Control de Cambios.]

### 4.5 Anti-patrones a evitar
[Tabla con anti-patrón / problema / solución, tomada y adaptada de `/sdd1.0/references/agentes-especialidades/AG-XX-*.md`.]

---

## 5. Preguntas guía para el subagente

[Bloque de preguntas que el subagente debe responderse ANTES de empezar a redactar, y al terminar para auto-validarse. Mínimo 8 preguntas con ejemplos concretos de respuesta esperada.]

### 5.1 Comprensión del input upstream
[Qué tiene que extraer del PROJECT-BRIEF / PROJECT-README / documentos previos.]

### 5.2 Decisiones de scope
[Qué incluye y qué deja fuera.]

### 5.3 Trazabilidad
[Cómo conecta arriba y abajo en la cadena.]

### 5.4 Calidad
[Criterios verificables que el subagente debe cumplir antes de declarar el documento listo.]

---

## 6. Criterios de aceptación del entregable

[Checklist verificable de mínimo 8 ítems. Si todos están tildados, el documento se considera aceptado para entregar al usuario.]

---

## 7. Ejemplos genéricos

[Al menos 2 ejemplos breves del documento generado, aplicados a tipos de proyecto distintos del Motor DSL. Por ejemplo: ejemplo 1 = proyecto "Sistema de turnos médicos" (web-monolith); ejemplo 2 = "API de pagos" (rest-api).]

---

## 8. Prompt-snippet sugerido para el subagente

[Plantilla literal de prompt que el orquestador puede inyectar al subagente especializado. Incluye placeholders `{{...}}` para los datos del proyecto. Esto es lo que vuelve operativo el sistema.]

```text
Sos un {{ESPECIALIDAD}} responsable de redactar [tipo de documento] para el proyecto {{NOMBRE_PROYECTO}}.

Insumos:
- PROJECT-BRIEF: ...
- PROJECT-README: ...
- Documentos upstream ya generados: ...

Reglas de redacción: ...
Trazabilidad esperada: ...
Criterios de calidad: ...

Salida: [path] siguiendo la estructura de la sección 4 de las reglas.
```

---

## 9. Control de cambios

| Versión | Fecha | Cambios |
|---|---|---|
| 1.0 | YYYY-MM-DD | Reglas iniciales generadas durante bootstrap SDD 2.0 |
```

#### Asignación de subagentes por categoría

| Archivo de reglas | Subagente que lo redacta | Insumos clave |
|---|---|---|
| `_root_rules.md` | Arquitecto de Soluciones Senior | `AG-ROOT-arquitecto-soluciones.md`, `/sdd1.0/docs/README.md` |
| `00_rules_contexto.md` | Product Manager + Analista de Negocio | `AG-00-product-manager.md`, `00_contexto/*` de `/sdd1.0/docs/` |
| `01_rules_necesidades_negocio.md` | Analista de Negocio Senior | `AG-01-analista-negocio.md`, `01_necesidades_negocio/*` |
| `02_rules_especificacion_funcional.md` | Analista Funcional / Ingeniero de Requisitos | `AG-02-analista-funcional.md`, `02_especificacion_funcional/*` |
| `03_rules_ux_ui_dx.md` | Especialista DX (con variante UX para apps con UI final) | `AG-03-especialista-dx.md`, `uix-ux/marco-teorico-ux-ui_v1.0.md` |
| `04_rules_prompts_ai.md` | Ingeniero de Prompts / AI Specialist | `AG-04-ingeniero-prompts.md`. **Marcar la sección como opcional**: solo se genera si el proyecto declara features con LLM en PROJECT-README §15. |
| `05_rules_arquitectura_tecnica.md` | Arquitecto de Software Senior (con variante Distribuido para microservicios) | `AG-05-arquitecto-software.md`, `arquitectura/guia-arquitectura-microservicios.md` |
| `06_rules_backlog_tecnico.md` | Scrum Master / Agile Coach (backlog) | `AG-06-scrum-master.md`, `metodos-agiles/guia-de-estudio.md` |
| `07_rules_plan_sprint.md` | Scrum Master / Gestión Ágil | `AG-07-gestion-proyectos-agiles.md`, `metodos-agiles/metodologias-agiles-jira.md` §12, §16 |
| `08_rules_calidad_y_pruebas.md` | Ingeniero QA / SDET Senior | `AG-08-ingeniero-qa.md`, `08_calidad_y_pruebas/*` |
| `09_rules_devops.md` | Ingeniero DevOps Senior | `AG-09-ingeniero-devops.md`, `09_devops/*`, `devops/plan-mejoras-devops_v1.0.md` |
| `10_rules_developer_guide.md` | Technical Writer / Developer Advocate | `AG-10-technical-writer.md`, `10_developer_guide/*` |
| `11_rules_examples.md` | Developer Advocate / Sample Engineer | `AG-11-developer-advocate.md`, `11_examples/*`. **Atención**: §5.4 del README de samples del fuente describe cómo se decide qué app va en `/samples` según tipo de proyecto. Esta lógica es central en estas reglas. |

#### Audit Fase 2

Subagente auditor revisa los 13 markdowns y produce `/sdd2.0/devs/_bootstrap/audit-fase-2.md`. Verifica:

- D1–D8 respetados en todos.
- Tabla de especialidad por tipo de proyecto presente y completa (sin "TBD").
- Patrón de nomenclatura consistente entre categorías que comparten convención (ej: kebab + sufijo `_v1.0.md` uniforme).
- Trazabilidad upstream/downstream forma una cadena cerrada (no hay categorías huérfanas).
- Prompt-snippet de la §8 de cada regla es ejecutable (sin placeholders dudosos, sin referencias a archivos que no se generan en otra parte).
- Ningún ejemplo del §7 menciona Motor DSL o ESC/POS.

---

### Fase 3 — Prompt orquestador

**Subagente:** `Arquitecto de Soluciones Senior + Ingeniero de Prompts` (rol compuesto).
**Entrada:** todas las reglas generadas en Fase 2 + las dos plantillas de intake de Fase 1 + `metodologia-sdd/metodologia-sdd-prompting.md`.
**Salida:** `/sdd2.0/devs/orchestrator/master-prompt.md`

#### Contenido obligatorio del master-prompt

El master-prompt es **el prompt único** que el usuario final del template ejecuta en Claude Code, sobre un proyecto real que ya tiene completados `PROJECT-BRIEF-<nombre>_v1.0.md` y `PROJECT-README-<nombre>_v1.0.md` en `/sdd2.0/devs/intake/`. Su trabajo es generar la documentación completa en `/sdd2.0/docs/` despachando subagentes especializados.

Estructura obligatoria:

1. **§0 Cómo usar este prompt** — instrucciones operativas: prerequisitos, modo plan-then-confirm, confirmación entre fases.
2. **§1 Rol del agente orquestador del proyecto** — qué hace y qué no hace.
3. **§2 Lectura de los intake** — primer paso: leer `/sdd2.0/devs/intake/PROJECT-BRIEF-*.md` y `/sdd2.0/devs/intake/PROJECT-README-*.md`. Si alguno tiene secciones marcadas como "Pendiente" o "TBD", se detiene y le pide al usuario completarlas antes de seguir.
4. **§3 Detección del tipo de proyecto** — extrae el campo "Tipo de proyecto" del PROJECT-README §1 y lo usa como `project_type` para todas las decisiones siguientes.
5. **§4 Detección de capacidades especiales** — extrae si el proyecto usa features con LLM (gating de 04), si requiere UI final (gating de 03 entre DX y UX), si es multi-tenant, si tiene autenticación, etc.
6. **§5 Recolección de invariantes (D1–D8 del proyecto, distintas a las del bootstrap)** — el orquestador presenta una lista de invariantes a fijar para la generación del proyecto (no del bootstrap) y pide confirmación. Ejemplo: idioma de la documentación del proyecto, estilo de fecha, política de versionado de docs.
7. **§6 Plan de generación por sección** — para cada categoría 00..11, lista qué documentos se van a generar (filtrados por tipo de proyecto vía sección 2 de las reglas) y qué subagente los va a redactar (vía sección 1 de las reglas). El orquestador **lee las reglas, no improvisa** la especialidad.
8. **§7 Ejecución por fases** — la generación se hace siguiendo el orden de trazabilidad (00 → 01 → 02 → 03 + 04 paralelos → 05 → 06 → 07 → 08 → 09 → 10 → 11 → README raíz). Algunas pueden paralelizarse si sus reglas explícitamente lo permiten. Cada fase termina con un audit independiente.
9. **§8 Mecánica de despacho de subagentes** — cómo construir el prompt para cada subagente:
   - Encabezado con rol (extraído de §1 de la regla de categoría según `project_type`).
   - Invariantes globales del proyecto inyectadas.
   - Insumos: paths a los documentos upstream ya generados + paths a las reglas + paths a los intake.
   - Trazabilidad esperada.
   - Criterios de aceptación (extraídos de §6 de la regla).
   - Path de salida obligatorio.
   - Prohibición explícita de ir a buscar info fuera del scope.
10. **§9 Manejo de ambigüedad** — qué hace el orquestador cuando un subagente no puede completar un documento porque faltan datos en los intake. Pattern: detener la fase, sintetizar la pregunta concreta, presentársela al usuario, esperar respuesta, actualizar el intake (en `/sdd2.0/devs/intake/`) y reanudar.
11. **§10 Auditoría entre fases** — qué subagente audita, qué criterios, dónde guarda el informe (`/sdd2.0/docs/_audit/<fase>.md`).
12. **§11 Generación del README raíz del proyecto** — al final, AG-ROOT redacta el `README.md` que va en `/sdd2.0/docs/README.md` (no en la raíz del repo del usuario, que es decisión del usuario) cubriendo todo lo generado.
13. **§12 Check-out y handoff a codificación** — al terminar de generar `/sdd2.0/docs/`, el orquestador **se detiene** y espera confirmación explícita del usuario antes de empezar a generar código. Presenta un resumen ejecutivo con: cantidad de documentos generados, cobertura de la cadena de trazabilidad, ítems del backlog del Sprint 1 listos para codear.
14. **§13 Reglas de no-modificación de intake** — el orquestador no edita los intake durante la generación salvo cuando el usuario explícitamente le pasa respuestas a preguntas pendientes (§9). En ese caso, edita con un "control de cambios" al final del intake registrando el motivo.
15. **§14 Reglas de adaptabilidad por tipo de proyecto** — sección que resume cómo cambia la salida según `project_type`. Ejemplo: para `library`, `/sdd2.0/docs/11_examples/` describe apps en `/samples` que consumen la librería; para `rest-api`, describe clientes (web o desktop) que consumen la API; para `web-microservices`, describe cómo se compone una demo end-to-end con docker-compose.
16. **§15 Glosario operativo** — términos que el orquestador usa internamente (subagente, audit independiente, invariante, plan-then-confirm).
17. **§16 Versionado del prompt orquestador** — control de cambios del prompt en sí.

**Decisión clave (responde la pregunta del usuario):** El orquestador **no asigna especialidades a los subagentes**. Las lee desde la sección 1 de cada markdown de reglas y las usa tal cual, parametrizadas por `project_type`. Razones:

- La especialidad es **propiedad del documento que se va a generar**, no del orquestador (separación de responsabilidades).
- Si cambia la especialidad (nueva variante para "edge IoT", por ejemplo), se modifica solo el markdown de reglas correspondiente; el orquestador no requiere cambios.
- Permite que el catálogo de especialidades evolucione sin re-publicar el master-prompt.
- El orquestador queda delgado y delegativo, lo cual baja el riesgo de inconsistencia entre fases.

Se documenta esta decisión explícitamente en §1 del master-prompt como "principio de delegación de la especialidad".

#### Reglas `_root_rules.md`

Mismas reglas estructurales que las 12 categorías, pero apunta a `/sdd2.0/docs/README.md` y usa AG-ROOT. Producida en la misma Fase 3 que el master-prompt.

#### Audit Fase 3

Subagente auditor verifica:

- El master-prompt referencia archivos que existen (todas las reglas, los intake).
- Las invariantes globales del bootstrap no se mezclan con las invariantes del proyecto.
- Hay un flujo claro de detención/reanudación para ambigüedades.
- Hay handoff explícito a codificación al final.
- El master-prompt es ejecutable por Claude Code sin ediciones adicionales.

Salida: `/sdd2.0/devs/_bootstrap/audit-fase-3.md`.

---

### Fase 4 — Marco teórico y guía de usuario

Dos subagentes en paralelo.

#### Fase 4.A — Marco teórico

**Subagente:** `Technical Writer + Information Architect` (rol compuesto).
**Salida:** `/sdd2.0/devs/guides/marco-teorico-sdd_v1.0.md`

Estructura del marco teórico (mínima):

1. **§1 Introducción y encuadre** — propósito del marco, audiencia, cómo leer.
2. **§2 Fundamentos del enfoque SDD** — qué es Specification-Driven Development, por qué la especificación es el artefacto central, comparación con TDD y BDD, citas a fuentes serias. **Fuente principal**: `/sdd1.0/references/metodologia-sdd/metodologia-sdd-prompting.md`, reformulado sin referencias al Motor DSL.
3. **§3 Metodología del template SDD 2.0** — descripción operativa de la metodología del usuario:
   - 3.1 Chat informal con Claude.ai web para armar contexto (BRIEF + README).
   - 3.2 Consolidación en un documento único.
   - 3.3 Volcado a las dos plantillas intake.
   - 3.4 Bootstrap local en Claude Code: copiar `/sdd2.0/devs/` al repo del proyecto, completar los intake.
   - 3.5 Ejecutar el master-prompt, que despacha subagentes y genera `/sdd2.0/docs/`.
   - 3.6 Confirmación del usuario y handoff a codificación.
   - 3.7 Diagrama de flujo del proceso completo.
4. **§4 Especialidades del template** — catálogo abstracto de los 13 roles (AG-ROOT + AG-00..AG-11) reformulado sin referencias específicas al Motor DSL. **Fuente principal**: `/sdd1.0/references/agentes-especialidades/`.
5. **§5 Metodología ágil aplicada** — Scrum aplicado al template:
   - 5.1 Por qué Scrum (cuándo Scrum, cuándo Kanban, cuándo Scrumban).
   - 5.2 Sprint 0 y artefactos previos.
   - 5.3 Ceremonias: Sprint Planning, Daily, Review, Retro, Refinement.
   - 5.4 Roles (PO, SM, Dev Team).
   - 5.5 Artefactos (Product Backlog, Sprint Backlog, Incremento).
   - 5.6 DoR y DoD canónicos.
   - **Fuente principal**: `/sdd1.0/references/metodos-agiles/guia-de-estudio.md` y `metodologias-agiles-jira.md`.
6. **§6 Técnicas de descomposición y planificación** — vertical slicing, walking skeleton, story mapping, example mapping, spikes, ATDD, mob programming. Tabla resumen cuándo usar cada técnica. **Fuente principal**: `metodologias-agiles-jira.md` §16.
7. **§7 Estilos arquitectónicos soportados** — monolito, monolito modular, microservicios, librería, pipeline, event-driven, clean architecture. Tablas de decisión, ejemplos por tipo de proyecto. **Fuente principal**: `/sdd1.0/references/arquitectura/guia-arquitectura-microservicios.md`, condensado.
8. **§8 UX/UI/DX como continuo** — capítulo condensado del marco teórico UX/UI/DX. Diferencias entre UX (usuario final), UI (capa visual) y DX (desarrollador integrador). Heurísticas, leyes, WCAG, Diátaxis para documentación. **Fuente principal**: `/sdd1.0/references/uix-ux/marco-teorico-ux-ui_v1.0.md`, condensado a ~10% del original.
9. **§9 Calidad y pruebas en SDD** — pirámide, DoD, quality gates en CI/CD, criterios verificables.
10. **§10 DevOps y release engineering** — SemVer, Conventional Commits, GitHub Flow, MinVer, supply chain (SBOM, firma), feeds preview/stable.
11. **§11 Prompting colaborativo con IA** — el patrón "plan-then-confirm con subagentes especializados + audit independiente", origen en `metodologia-sdd-prompting.md` y `devops/plan-mejoras-devops_v1.0.md`. Aclara la separación entre orquestador y subagentes, y cuándo paralelizar vs serializar.
12. **§12 Anti-patrones y errores frecuentes** — qué evitar al usar el template, tomado de las secciones "Anti-patrones" de cada AG-XX del catálogo y de la sección 17.5 de `metodologias-agiles-jira.md`.
13. **§13 Glosario** — términos canónicos del template.
14. **§14 Bibliografía y referencias** — normas APA 7.

**Longitud objetivo:** 25–40 páginas. No es un manual breve; es un cuerpo teórico para que estudiantes UTN y profesionales puedan estudiar la metodología en profundidad.

#### Fase 4.B — Guía de usuario

**Subagente:** `Developer Advocate + Technical Writer` (rol compuesto).
**Salida:** `/sdd2.0/guides/guia-usuario-sdd2.0_v1.0.md`

Estructura de la guía de usuario:

1. **§1 ¿Qué es el template SDD 2.0?** — narrativa breve, 1–2 páginas, sin teoría: qué resuelve, qué problema soluciona, audiencia.
2. **§2 Prerequisitos** — Claude.ai web (Pro o equivalente con proyectos), Claude Code instalado y autenticado, repo Git inicializado.
3. **§3 Cuándo usar este template y cuándo no** — perfilado simple: tamaño de equipo, complejidad, tipo de proyecto, plazo.
4. **§4 Recorrido paso a paso de la metodología** — exactamente el flujo de 6 pasos del usuario, ilustrado con capturas conceptuales y prompts ejemplo:
   - 4.1 **Paso 1 — Chat informal en Claude.ai web**. Cómo armar el contexto: hablarle a Claude del cliente, dejar que pregunte, ir refinando. Sugerencias de prompts iniciales ("Quiero diseñar un sistema para [...]. Ayudame a estructurar el contexto"). Cómo darle vueltas a la idea hasta que sienta cerrada.
   - 4.2 **Paso 2 — Consolidación en un solo documento**. Prompt sugerido: "A partir de toda esta conversación, generá un único documento que reúna ordenadamente el contexto del proyecto: visión del cliente, problema, audiencia, alcance, historias de usuario, restricciones técnicas, stack y decisiones tomadas". Verificación de completitud.
   - 4.3 **Paso 3 — Volcado a las plantillas intake**. Prompt sugerido: "Acá tenés las dos plantillas `PROJECT-BRIEF-template.md` y `PROJECT-README-template.md` (adjuntar). Tomá la información del documento consolidado y llenalas. Si falta info para algún campo, preguntámela en lugar de inventarla". Revisión manual final.
   - 4.4 **Paso 4 — Bootstrap local con el template**. Comandos: `git clone <template>` o copia local; `cp -r template/sdd2.0 mi-proyecto/`; reemplazar los dos archivos en `/sdd2.0/devs/intake/` con los completados; opcionalmente versionar.
   - 4.5 **Paso 5 — Ejecutar el master-prompt en Claude Code**. Abrir Claude Code en `mi-proyecto/`; pegar `/sdd2.0/devs/orchestrator/master-prompt.md`; revisar el plan que presenta; confirmar; revisar audits entre fases; confirmar final.
   - 4.6 **Paso 6 — Revisión humana y handoff a codificación**. Qué revisar (trazabilidad, ambigüedades pendientes, completitud), cómo dar feedback al orquestador, autorizar paso a codificación.
5. **§5 Ejemplos aplicados** — 2–3 mini-casos prácticos donde se muestra el flujo completo en proyectos sintéticos:
   - 5.1 Caso "API REST de gestión de turnos médicos" (web-microservices ligero).
   - 5.2 Caso "Librería utilitaria para parsing de archivos CSV" (library).
   - 5.3 Caso "App móvil MAUI para inventario de almacén" (mobile-app-maui).
   Cada caso muestra el chat de Claude.ai web resumido, el resultado de los intake, el output del orquestador y un par de documentos generados de muestra.
6. **§6 Resolución de problemas frecuentes** — FAQ con 10–15 entradas: "El orquestador se detiene preguntándome X, ¿qué hago?"; "Generó un documento que no aplica a mi tipo de proyecto, ¿cómo lo saco?"; "Quiero forzar un cambio en una regla de categoría, ¿dónde lo modifico?"; etc.
7. **§7 Cómo extender el template** — cómo agregar una categoría nueva (ej: `12_observabilidad/`), cómo agregar un tipo de proyecto nuevo a D8, cómo agregar una variante de especialidad.
8. **§8 Cómo regenerar parcialmente** — si el cliente cambia el alcance a mitad del proyecto: cómo identificar qué documentos están afectados, cómo correr el orquestador parcialmente (solo categorías 01 y 02, por ejemplo).
9. **§9 Hojas de ruta sugeridas** — para principiantes en el template, para equipos con experiencia previa SDD, para evaluadores académicos.
10. **§10 Glosario rápido y mapa visual de carpetas**.

**Longitud objetivo:** 15–25 páginas. Es operativa, didáctica, pero no exhaustiva.

#### Audit Fase 4

Subagente auditor verifica:

- Marco teórico y guía no se solapan: el marco teórico es teoría, la guía es operativa.
- Los ejemplos de ambos cumplen D7 (sin Motor DSL).
- Las referencias al master-prompt son consistentes con lo realmente generado en Fase 3.
- Bibliografía del marco teórico está en APA 7.

Salida: `/sdd2.0/devs/_bootstrap/audit-fase-4.md`.

---

### Fase 5 — Auditoría final cross-doc

**Subagente:** `Auditor independiente del bootstrap`, sin contexto previo de las decisiones de ejecución. Solo conoce las invariantes D1–D8.

**Tareas:**

1. Recorrer toda la estructura `/sdd2.0/` y verificar contra la estructura objetivo de §5.
2. Validar coherencia cross-doc: las invariantes D1–D8 se respetan en todos los archivos. Toda referencia a otro archivo apunta a un path que existe. No hay menciones al Motor DSL/MAUI/ESC/POS fuera de citas explícitas a la fuente.
3. Validar que el master-prompt, leído por sí solo, es ejecutable sin necesidad de explicaciones adicionales.
4. Validar que las dos plantillas de intake, completadas, contienen toda la info que el master-prompt necesita.
5. Validar que el marco teórico y la guía de usuario son útiles por separado.
6. Generar `/sdd2.0/devs/_bootstrap/audit-final.md` con:
   - Defectos P0 (bloqueantes, fixear antes de cerrar el bootstrap).
   - Defectos P1 (industria, fixear si hay margen).
   - Defectos P2 (cosmético, postergables).
7. Si hay P0, abrir una mini-fase 5.1 con los subagentes correspondientes para corregirlos.
8. Generar `/sdd2.0/devs/_bootstrap/bootstrap-changelog.md` con el resumen ejecutivo del bootstrap: qué se generó, métricas (archivos, líneas, palabras), tiempo aproximado, decisiones tomadas, fases ejecutadas.

---

## 7 · Criterios de aceptación del bootstrap

Al terminar, validar contra esta checklist. **Si algún ítem falla, el bootstrap no está cerrado.**

### 7.1 Estructura

- [ ] `/sdd2.0/devs/intake/` tiene exactamente 2 archivos: `PROJECT-BRIEF-template.md` y `PROJECT-README-template.md`.
- [ ] `/sdd2.0/devs/rules/` tiene exactamente 13 archivos: `_root_rules.md` + `00_..._.md` a `11_..._.md`.
- [ ] `/sdd2.0/devs/orchestrator/master-prompt.md` existe.
- [ ] `/sdd2.0/devs/guides/marco-teorico-sdd_v1.0.md` existe.
- [ ] `/sdd2.0/guides/guia-usuario-sdd2.0_v1.0.md` existe.
- [ ] `/sdd2.0/docs/` existe y contiene solo un `.gitkeep`.
- [ ] `/sdd2.0/devs/_bootstrap/` contiene los 5 audits + el changelog.

### 7.2 Calidad de las plantillas intake

- [ ] Ambas plantillas tienen al menos 12 secciones obligatorias y un checklist de completitud verificable.
- [ ] Cada sección incluye preguntas guía con ejemplos genéricos (D7).
- [ ] Las secciones del README declaran `Tipo de proyecto` como campo único requerido y enumeran los 8 valores de D8.

### 7.3 Calidad de las reglas

- [ ] Los 13 markdowns siguen la estructura de 9 secciones del template (§6 fase 2).
- [ ] La sección 1.2 (variantes según tipo de proyecto) está completa para los 8 tipos de D8.
- [ ] La sección 8 (prompt-snippet) está poblada en los 13 archivos.
- [ ] No hay menciones al dominio Motor DSL fuera de citas marcadas como "ejemplo del material fuente".
- [ ] Trazabilidad upstream/downstream consistente entre categorías (no hay categorías huérfanas).

### 7.4 Calidad del master-prompt

- [ ] Es autocontenido: ejecutarlo en Claude Code con los intake llenos no requiere instrucciones adicionales.
- [ ] Implementa plan-then-confirm y se detiene entre fases.
- [ ] Aplica el "principio de delegación de la especialidad" (lee las especialidades desde las reglas, no las asigna).
- [ ] Maneja ambigüedad deteniendo la generación y pidiendo input.
- [ ] Hace handoff explícito a codificación al final.
- [ ] Está en español rioplatense (D1).

### 7.5 Calidad del marco teórico y la guía

- [ ] Marco teórico tiene al menos 14 capítulos según §6 fase 4.A.
- [ ] Guía tiene los 6 pasos del flujo de usuario claramente narrados, con prompts ejemplo.
- [ ] Hay al menos 2 mini-casos aplicados a tipos de proyecto distintos.

### 7.6 Coherencia cross-doc

- [ ] Ningún archivo de `/sdd2.0/` menciona "Motor DSL", "MAUI", "ESC/POS", "impresora térmica" como ejemplo canónico fuera de citas a la fuente.
- [ ] Todos los links internos apuntan a archivos existentes.
- [ ] La cadena de trazabilidad Visión → NB → CU → RN → ADR → US → BT → Sprint → Test → Pipeline aparece descrita en al menos: marco teórico §3 o §5, master-prompt §7, y _root_rules.md.
- [ ] El campo `Tipo de proyecto` está mencionado consistentemente con los 8 valores de D8 en intake, reglas, master-prompt y guía.

### 7.7 Auditoría final cerrada

- [ ] `audit-final.md` no reporta defectos P0 abiertos.
- [ ] Defectos P1 abiertos están documentados con priorización para una eventual `v1.1` del template.

---

## 8 · Reglas operativas para Claude Code

Estas reglas son **del agente principal hacia sí mismo y hacia los subagentes durante la ejecución**.

### 8.1 Lectura primero

Antes de generar nada, leer **completos** los siguientes archivos clave del material fuente. No skimming.

- `/sdd1.0/docs/README.md`
- `/sdd1.0/docs/00_contexto/vision-producto_v1.0.md`
- `/sdd1.0/docs/00_contexto/alcance-proyecto_v1.0.md`
- `/sdd1.0/references/agentes-especialidades/README.md`
- `/sdd1.0/references/agentes-especialidades/AG-ROOT-arquitecto-soluciones.md`
- `/sdd1.0/references/agentes-especialidades/AG-00-product-manager.md`
- `/sdd1.0/references/agentes-especialidades/AG-05-arquitecto-software.md`
- `/sdd1.0/references/metodologia-sdd/metodologia-sdd-prompting.md`
- `/sdd1.0/references/metodos-agiles/guia-de-estudio.md`
- `/sdd1.0/references/refinamiento_docs/agentes-refinamiento-docs.md`

El resto de los archivos pueden cargarse on-demand cuando el subagente correspondiente los necesite.

### 8.2 Subagentes son aislados

Cada subagente recibe un prompt con: rol, invariantes D1–D8, insumos específicos (paths), salida esperada (path) y criterios de aceptación. **No** se le pasa el plan general ni los otros subagentes. Esto fuerza modularidad y reduce contaminación cruzada.

### 8.3 Paralelización segura

Las fases 2 y 4 son paralelizables; las fases 0, 1, 3 y 5 son seriales (un solo subagente, o cambio de archivo target entre subagentes). En cualquier paralelización, garantizar que dos subagentes no escriban en el mismo archivo.

### 8.4 No modificar `/sdd1.0/`

`/sdd1.0/` es **solo lectura**. Si se detecta un error en el fuente (ej: inconsistencia de nomenclatura), se anota en el audit de fase 0 como "lección a evitar en SDD 2.0", **no se corrige el fuente**.

### 8.5 Idempotencia

Si el bootstrap se ejecuta dos veces, debe producir el mismo resultado (asumiendo mismo material fuente). Esto implica: no usar timestamps "now", no incluir secrets, no hardcodear paths fuera del repo, no incluir info del entorno de ejecución.

### 8.6 Reporte de progreso

Después de cada subagente, agregar una línea al `/sdd2.0/devs/_bootstrap/bootstrap-changelog.md` con: fase, subagente, archivos producidos, líneas aproximadas, hora de ejecución, audit pasado/falló.

### 8.7 Manejo de errores

Si un subagente falla (timeout, output malformado), reintentar una sola vez con prompt corregido. Si vuelve a fallar, detener la fase y reportar al usuario con: qué falló, hipótesis del problema, opciones de mitigación.

### 8.8 Tono y registro

Idioma rioplatense neutro, profesional, sin emojis. Tablas markdown estándar. Sin negritas decorativas. Usar negritas solo para términos canónicos cuando se definen por primera vez, o para resaltar valores en tablas. Citas en bloque `>` solo cuando se cita literalmente una fuente.

---

## 9 · Plan de ejecución resumido (para la confirmación inicial)

Esto es lo que el agente principal le presenta al usuario al inicio:

```text
PLAN DE BOOTSTRAP SDD 2.0 — Versión propuesta

Invariantes propuestas (D1–D8):
  D1: Idioma español rioplatense neutro técnico
  D2: UTF-8, LF, .md, encabezados #
  D3: kebab-case + sufijo descriptivo para plantillas
  D4: Nomenclatura por categoría según reglas
  D5: Plantillas arrancan en v1.0
  D6: Trazabilidad Visión → NB → CU → RN → ADR → US → BT → Sprint → Test → Pipeline
  D7: Sin menciones al Motor DSL como ejemplo canónico
  D8: 8 tipos de proyecto soportados (library, web-monolith, web-microservices, desktop-app, mobile-app-maui, rest-api, cli-tool, worker-service)

Fases planificadas:
  Fase 0: Auditoría material fuente   — 1 subagente
  Fase 1: Plantillas intake           — 2 subagentes (paralelizables)
  Fase 2: Reglas por categoría        — 13 subagentes (paralelizables)
  Fase 3: Prompt orquestador          — 1 subagente
  Fase 4: Marco teórico y guía usuario — 2 subagentes (paralelizables)
  Fase 5: Auditoría final + cierre    — 1 subagente

Total: 20 subagentes especializados.

Salidas:
  /sdd2.0/devs/intake/          (2 archivos)
  /sdd2.0/devs/rules/           (13 archivos)
  /sdd2.0/devs/orchestrator/    (1 archivo)
  /sdd2.0/devs/guides/          (1 archivo)
  /sdd2.0/devs/_bootstrap/      (6 archivos: 5 audits + changelog)
  /sdd2.0/docs/                 (carpeta vacía con .gitkeep)
  /sdd2.0/guides/               (1 archivo)

Total: 24 archivos.

¿Confirmás invariantes y plan, o querés ajustes antes de proceder?
```

---

## 10 · Anexo A — Tabla de subagentes con rol y entregable

| # | Fase | Subagente (rol) | Entregable principal | Insumo clave |
|---|---|---|---|---|
| 1 | F0 | Auditor del material fuente | `audit-sdd1.md` | `/sdd1.0/` completo |
| 2 | F1.A | Product Manager + Analista de Negocio Senior | `PROJECT-BRIEF-template.md` | AG-00, AG-01, guía de estudio |
| 3 | F1.B | Arquitecto de Software Senior + DevOps Senior | `PROJECT-README-template.md` | AG-05, AG-09, AG-ROOT, guía microservicios |
| 4 | F2 | Arquitecto de Soluciones Senior | `_root_rules.md` | AG-ROOT, README de docs |
| 5 | F2 | Product Manager + Analista de Negocio | `00_rules_contexto.md` | AG-00, 00_contexto/ |
| 6 | F2 | Analista de Negocio Senior | `01_rules_necesidades_negocio.md` | AG-01, 01_necesidades_negocio/ |
| 7 | F2 | Analista Funcional / Ingeniero de Requisitos | `02_rules_especificacion_funcional.md` | AG-02, 02_especificacion_funcional/ |
| 8 | F2 | Especialista DX (variante UX para apps con UI final) | `03_rules_ux_ui_dx.md` | AG-03, marco UX/UI/DX |
| 9 | F2 | Ingeniero de Prompts / AI Specialist | `04_rules_prompts_ai.md` | AG-04 |
| 10 | F2 | Arquitecto de Software Senior (variante Distribuido para microservicios) | `05_rules_arquitectura_tecnica.md` | AG-05, guía microservicios |
| 11 | F2 | Scrum Master / Agile Coach | `06_rules_backlog_tecnico.md` | AG-06, guía de estudio Scrum |
| 12 | F2 | Scrum Master / Gestión Ágil | `07_rules_plan_sprint.md` | AG-07, metodologías-agiles-jira |
| 13 | F2 | Ingeniero QA / SDET Senior | `08_rules_calidad_y_pruebas.md` | AG-08, 08_calidad_y_pruebas/ |
| 14 | F2 | Ingeniero DevOps Senior | `09_rules_devops.md` | AG-09, 09_devops/, plan-mejoras-devops |
| 15 | F2 | Technical Writer / Developer Advocate | `10_rules_developer_guide.md` | AG-10, 10_developer_guide/ |
| 16 | F2 | Developer Advocate / Sample Engineer | `11_rules_examples.md` | AG-11, 11_examples/ |
| 17 | F3 | Arquitecto de Soluciones + Ingeniero de Prompts | `master-prompt.md` | todas las reglas F2, intake F1, metodología-sdd-prompting |
| 18 | F4.A | Technical Writer + Information Architect | `marco-teorico-sdd_v1.0.md` | metodologia-sdd-prompting, guía Scrum, guía microservicios, marco UX/UI/DX |
| 19 | F4.B | Developer Advocate + Technical Writer | `guia-usuario-sdd2.0_v1.0.md` | F1, F3 |
| 20 | F5 | Auditor independiente cross-doc | `audit-final.md` + correctivos | toda `/sdd2.0/` |

---

## 11 · Anexo B — Glosario operativo

| Término | Definición operativa |
|---|---|
| **Subagente** | Instancia IA invocada con un prompt de rol especializado y alcance acotado a un archivo target. Aislada del resto. |
| **Agente principal / Orquestador** | Esta instancia, que coordina el plan, despacha subagentes y consolida. |
| **Plan-then-confirm** | Patrón donde el plan se presenta antes de ejecutar y se confirma; pausa entre fases mayores. |
| **Audit independiente** | Revisión por un subagente que no participó en la ejecución de la fase auditada. |
| **Invariante** | Decisión del bootstrap que se mantiene constante (D1–D8) y se inyecta en todos los prompts. |
| **Plantilla de intake** | Documento markdown a completar por el usuario antes de ejecutar el orquestador del proyecto (BRIEF y README). |
| **Regla constructiva** | Markdown que define cómo se construye una categoría de documentos de `/sdd2.0/docs/` (estructura, nomenclatura, especialidad, prompt-snippet). |
| **Master-prompt** | El prompt orquestador del proyecto (`/sdd2.0/devs/orchestrator/master-prompt.md`), distinto de **este** prompt que orquesta el bootstrap. |
| **Tipo de proyecto (`project_type`)** | Campo de la sección 1 del PROJECT-README; gobierna la elección de variante de especialidad y de documentos a generar. |
| **Variante de especialidad** | Especialización del rol según `project_type`, declarada en §1.2 de cada regla constructiva. |
| **Principio de delegación de la especialidad** | El master-prompt no asigna especialidades: las lee desde las reglas. |
| **Bootstrap** | Esta ejecución: la transformación inicial de SDD 1.0 a SDD 2.0. **No** es la ejecución del orquestador del proyecto. |

---

## 12 · Anexo C — Cosas que el orquestador del proyecto (master-prompt) hará después, NO ahora

Es importante separar dos niveles. **Este prompt** (el que estás leyendo) genera el template. **El master-prompt** que se genera en Fase 3 es lo que después usará el usuario sobre un proyecto real. Para evitar confusión:

| Concepto | Bootstrap (este prompt) | Master-prompt (Fase 3) |
|---|---|---|
| Material fuente | `/sdd1.0/` | `/sdd2.0/devs/intake/` con BRIEF y README llenos |
| Salida | `/sdd2.0/devs/` y `/sdd2.0/guides/` | `/sdd2.0/docs/` |
| Subagentes | 20 fijos (catalogados acá) | Variable según project_type y reglas |
| Invariantes | D1–D8 del bootstrap | D1–D8 del proyecto (otras distintas) |
| Audit final | `audit-final.md` del bootstrap | `_audit/` en `/sdd2.0/docs/` |
| Handoff a código | NO | SÍ, después de revisión humana |

---

## 13 · Confirmación necesaria para empezar

Antes de la primera acción, presentale al usuario el §9 "Plan de ejecución resumido" y esperá una de estas tres respuestas:

- `"Confirmado, procedé."` → ejecutás Fase 0.
- `"Modificá D[N]: <nuevo valor>"` → actualizás el bloque de invariantes y volvés a presentar el plan.
- `"Cancelá."` → no hacés nada.

No empieces a generar archivos sin confirmación explícita.

---

**Fin del prompt orquestador del bootstrap SDD 2.0.**
