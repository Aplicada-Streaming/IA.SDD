# Guía de usuario del template SDD

```yaml
Documento: Guia-Usuario-SDD.md
Versión: 1.5
Fecha: 2026-07-26
Audiencia: profesionales y estudiantes que usan el template para una solución real
Idioma: español rioplatense neutro técnico
Estado: vigente
```

> Esta guía no enseña la teoría detrás del template (para eso está el marco teórico).
> Enseña a usarlo paso a paso, con prompts ejemplo, casos aplicados y resolución de problemas frecuentes.

---

## Tabla de contenido

- [§1 ¿Qué es el template SDD?](#1-qué-es-el-template-sdd)
  - [Solución y proyecto: el modelo de trabajo](#solución-y-proyecto-el-modelo-de-trabajo)
- [§2 Prerequisitos](#2-prerequisitos)
- [§3 Cuándo usar este template y cuándo no](#3-cuándo-usar-este-template-y-cuándo-no)
  - [3.1 Perfilado por tamaño de equipo](#31-perfilado-por-tamaño-de-equipo)
  - [3.2 Perfilado por complejidad](#32-perfilado-por-complejidad)
  - [3.3 Perfilado por tipo de proyecto (D8)](#33-perfilado-por-tipo-de-proyecto-d8)
  - [3.4 Perfilado por plazo](#34-perfilado-por-plazo)
  - [3.5 Tabla de recomendación combinada](#35-tabla-de-recomendación-combinada)
- [§4 Recorrido paso a paso de la metodología](#4-recorrido-paso-a-paso-de-la-metodología)
  - [4.1 Paso 1 — Chat informal en Claude.ai web](#41-paso-1--chat-informal-en-claudeai-web)
  - [4.2 Paso 2 — Consolidación en un solo documento](#42-paso-2--consolidación-en-un-solo-documento)
  - [4.3 Paso 3 — Volcado a la plantilla de intake](#43-paso-3--volcado-a-la-plantilla-de-intake)
  - [4.4 Paso 4 — Preparar el workspace de dos repositorios](#44-paso-4--preparar-el-workspace-de-dos-repositorios)
  - [4.5 Paso 5 — Ejecutar el master-prompt en Claude Code](#45-paso-5--ejecutar-el-master-prompt-en-claude-code)
  - [4.6 Paso 5b — Validar la maqueta visual (Fase B2, opcional)](#46-paso-5b--validar-la-maqueta-visual-fase-b2-opcional)
  - [4.7 Paso 6 — Revisión humana y handoff a codificación](#47-paso-6--revisión-humana-y-handoff-a-codificación)
  - [4.8 Paso 7 — Ciclo incremental de documentación viva (Fases I y J)](#48-paso-7--ciclo-incremental-de-documentación-viva-fases-i-y-j)
- [§5 Ejemplos aplicados](#5-ejemplos-aplicados)
  - [5.1 Caso "API REST de gestión de turnos médicos"](#51-caso-api-rest-de-gestión-de-turnos-médicos-rest-api-solución-de-un-proyecto)
  - [5.2 Caso "Librería utilitaria para parsing de archivos CSV"](#52-caso-librería-utilitaria-para-parsing-de-archivos-csv-library-solución-de-un-proyecto)
  - [5.3 Caso "App móvil de inventario de almacén"](#53-caso-app-móvil-de-inventario-de-almacén-mobile-app-maui-solución-de-un-proyecto)
  - [5.4 Caso "Solución de gestión de turnos con cuatro proyectos"](#54-caso-solución-de-gestión-de-turnos-con-cuatro-proyectos-solución-multi-proyecto)
- [§6 Resolución de problemas frecuentes](#6-resolución-de-problemas-frecuentes)
- [§7 Cómo extender el template](#7-cómo-extender-el-template)
  - [7.1 Agregar una categoría nueva](#71-agregar-una-categoría-nueva)
  - [7.2 Agregar un tipo de proyecto nuevo a D8](#72-agregar-un-tipo-de-proyecto-nuevo-a-d8)
  - [7.3 Agregar una variante de especialidad](#73-agregar-una-variante-de-especialidad)
  - [7.4 Agregar un modelo UX-UI al catálogo](#74-agregar-un-modelo-ux-ui-al-catálogo)
- [§8 Cómo regenerar parcialmente](#8-cómo-regenerar-parcialmente)
- [§9 Hojas de ruta sugeridas](#9-hojas-de-ruta-sugeridas)
- [§10 Glosario rápido y mapa visual de carpetas](#10-glosario-rápido-y-mapa-visual-de-carpetas)
- [Resumen ejecutivo](#resumen-ejecutivo)
- [Control de cambios](#control-de-cambios)

---

## §1 ¿Qué es el template SDD?

El template SDD es un kit de trabajo orientado a equipos de desarrollo que necesitan generar la documentación viva de un proyecto de software antes de escribir la primera línea de código. SDD se lee como "Specification-Driven Development", desarrollo guiado por la especificación. La idea es simple: si el problema está bien capturado, las decisiones técnicas están justificadas y la trazabilidad entre necesidades, casos de uso y tareas está cerrada, la codificación pasa a ser una consecuencia ordenada del diseño, no una serie de improvisaciones.

El template resuelve un dolor concreto y repetido: el equipo arranca a codear sin haber escrito la especificación, descubre los huecos del problema a mitad del sprint, paga los costos de retrabajo y termina con una documentación post-facto que nadie mantiene. SDD invierte el orden. Primero conversación con el cliente, después un intake estructurado unificado, después documentación auditada por categorías, después codificación.

A diferencia de plantillas ad-hoc o de un README inflado, SDD se apoya en tres pilares:

- Una cadena de trazabilidad cerrada (Visión → Necesidad de Negocio → Caso de Uso → Regla de Negocio → ADR → User Story → Backlog Técnico → Sprint → Test → Pipeline), todos los eslabones formales y verificables.
- Un conjunto de 12 categorías documentales numeradas (`00-Contexto/` a `11-Documentacion/`) más un README raíz, cada una con su propio archivo de reglas constructivas que codifica especialidad, documentos a producir, criterios de aceptación y prompts ejemplares.
- Un master-prompt orquestador que se ejecuta una sola vez por solución en Claude Code y va despachando subagentes especializados con audits independientes entre fases.

### Solución y proyecto: el modelo de trabajo

SDD distingue dos niveles. Una solución agrupa una jerarquía de N proyectos (con N mayor o igual a 1). Cada proyecto lleva exactamente uno de los 8 tipos cerrados D8 (`library`, `web-monolith`, `web-microservices`, `desktop-app`, `mobile-app-maui`, `rest-api`, `cli-tool`, `worker-service`); el tipo se elige por proyecto, no por la solución. La solución en sí no tiene un D8 propio: es el contenedor que enumera sus proyectos, sus roles, sus dependencias y sus nombres de código.

El intake describe la solución completa en un único documento: el `SOLUTION-INTAKE`, organizado en tres partes (A negocio, B composición, C técnica por proyecto). Su Parte B incluye la tabla de proyectos (§13) con el grafo de dependencias acíclico, y su Parte C repite un bloque técnico por proyecto. El usuario completa solo ese documento; ya no llena un manifiesto a mano. El orquestador, antes de la Fase A, valida el intake y deriva de su §13 el `SOLUTION-MANIFEST` de solución; recién con el manifiesto derivado y confirmado lee la jerarquía, la valida, ordena los proyectos en orden topológico y genera la documentación proyecto por proyecto, respetando que ninguno arranca antes que sus dependencias.

Una solución de un solo proyecto es perfectamente válida: es el caso degenerado y reproduce exactamente el comportamiento del template de tipo único anterior. En ese caso el orquestador aplana el layout y genera las categorías `00` a `11` directamente bajo `SDD/Docs/`, sin el subnivel `Proyectos/<Nombre>/` ni la carpeta `Solucion/`. Esa equivalencia es la garantía de no ruptura: si tu trabajo es un proyecto único, no cambia nada respecto de la versión anterior.

La audiencia primaria son desarrolladores, analistas, líderes técnicos y estudiantes avanzados que quieren producir documentación de calidad profesional sin pelearse con plantillas frías. El template asume que vas a usar Claude.ai web para conversar con el cliente y consolidar la idea, y Claude Code para ejecutar el orquestador y materializar la documentación en el repositorio.

Si el lector necesita la fundamentación teórica (por qué se eligió plan-then-confirm, por qué el principio de delegación de la especialidad, qué nodos cubre la cadena D6, qué invariantes globales D1 a D9 se aplican), eso se documenta en el marco teórico del template. Esta guía es operativa.

Una solución típica que usa SDD termina con una carpeta `SDD/Docs/` poblada por categoría (a nivel solución y por proyecto), un informe de audit por cada fase, un README raíz consolidado y un Sprint 1 listo para arrancar codificación. El handoff a codificación es explícito: el orquestador no escribe código sin confirmación humana.

---

## §2 Prerequisitos

Antes de arrancar con el template, asegurate de tener lo siguiente:

- Cuenta de Claude.ai web con plan que admita proyectos y archivos adjuntos. El template fue diseñado para Claude Pro o equivalente con la capacidad de subir documentos largos al chat y mantener proyectos persistentes.
- Claude Code instalado y autenticado en tu máquina local. Claude Code es la CLI que ejecuta el master-prompt sobre tu repositorio. Verificá que `claude --version` o el equivalente de tu instalación respondan sin error.
- Repositorio Git inicializado en local. SDD trabaja sobre archivos versionados; el orquestador asume que vas a poder hacer commits intermedios entre fases.
- Editor de texto con soporte de markdown (Visual Studio Code, Cursor, Zed o cualquier otro). Es muy útil tener vista previa de markdown mientras revisás los entregables.
- Acceso a una terminal funcional. En Windows, PowerShell 5.1 o superior (también podés usar Git Bash o WSL). En Linux y macOS, cualquier shell POSIX.

Conocimientos previos mínimos que la guía asume:

- Markdown básico (encabezados, listas, tablas, bloques de código).
- Git básico: `clone`, `add`, `commit`, `push`, `pull`, branching mínimo.
- Terminología ágil de superficie: qué es un sprint, una user story, una definition of done, una retrospective.
- Lectura cómoda de inglés técnico (algunos términos canónicos del template son anglicismos aceptados: backlog, ADR, walking skeleton, etc., siempre traducidos al rioplatense técnico).

Lo que NO necesitás:

- Experiencia previa con SDD: el template está diseñado para enseñarse a sí mismo via los archivos de reglas y este documento.
- Conocer un framework agile específico (Scrum certificado, SAFe). Los conceptos relevantes están explicados en línea.
- Saber escribir prompts: la guía te da los prompts iniciales que necesitás.

Verificación rápida antes de empezar:

```bash
git --version
claude --version
ls ~/.claude
```

Si los tres comandos responden, estás listo.

---

## §3 Cuándo usar este template y cuándo no

SDD no es universal. Está pensado para proyectos donde el esfuerzo de documentación inicial se paga con creces en el flujo posterior. Las siguientes dimensiones ayudan a perfilar si te conviene.

### 3.1 Perfilado por tamaño de equipo

- 1 persona (solo dev / freelance): conviene una versión liviana. Saltearse el `acuerdo-equipo` y el sprint plan completo (se usa `Mini-Plan.md`). Igual generar visión, alcance, NB, CU, ADR mínimas y backlog.
- 2 a 5 personas (equipo chico): caso canónico del template, todo el flujo aplica.
- 6 a 15 personas (equipo mediano): caso canónico también. Se recomienda fuerte ejecutar la fase H final (audit consolidado) con un revisor externo al equipo.
- Más de 15 personas (equipo grande): el template aplica como base. La coordinación entre múltiples bounded contexts se modela como una solución multi-proyecto (un proyecto por contexto dentro de la misma tabla de proyectos del intake, §13) en lugar de un único proyecto monolítico.

### 3.2 Perfilado por complejidad

- Proyecto trivial (un script, una utilidad chica, una demo): el template es excesivo. Usá un README plano de 50 líneas.
- Proyecto normal (semanas a pocos meses, un equipo, un dominio acotado): caso canónico, todo el template aplica.
- Proyecto complejo (varios trimestres, múltiples integraciones, regulación, varios integradores): el template es la base mínima. Probablemente necesités complementarlo con documentos específicos del dominio (compliance, contratos legales, runbooks operativos extensos).

### 3.3 Perfilado por tipo de proyecto (D8)

El template soporta 8 tipos cerrados (D8). El tipo se elige por proyecto, no por repositorio ni por solución: cada proyecto de la jerarquía declara exactamente uno de los 8 valores en la tabla de proyectos del intake (§13), y una solución puede combinar varios tipos distintos (por ejemplo, un `rest-api` principal que depende de dos `library`). La elección del tipo de cada proyecto gobierna qué documentos se generan en cada categoría para ese proyecto y qué especialidad se invoca en cada subagente. Los 8 tipos confirmados son:

1. `library`: librería reutilizable, distribuida via package manager del ecosistema.
2. `web-monolith`: aplicación web monolítica con frontend y backend acoplados.
3. `web-microservices`: arquitectura distribuida con varios servicios independientes.
4. `desktop-app`: aplicación de escritorio para Windows, Linux o macOS.
5. `mobile-app-maui`: aplicación móvil multiplataforma.
6. `rest-api`: servicio HTTP que expone una API REST consumida por otros sistemas.
7. `cli-tool`: herramienta de línea de comandos.
8. `worker-service`: servicio de procesamiento asincrónico orientado a eventos o colas.

El conjunto D8 sigue teniendo exactamente 8 valores. Lo que cambió respecto del modelo anterior es la cardinalidad: antes había un solo tipo por proyecto único; ahora hay N proyectos por solución, cada uno con su tipo. El conjunto cerrado no se amplía ni se reduce.

### 3.4 Perfilado por plazo

- Urgente (días, MVP de feria, hackathon): no usar el template completo, salvo que el equipo ya tenga fluidez con SDD. Recortar a `vision-producto`, `alcance-proyecto`, `Casos-De-Uso` y `plan-sprint` con `mini-plan`.
- Normal (semanas a tres meses): aplicar el template completo con audits livianos (revisión humana sin auditor independiente).
- Largo (más de tres meses, o producto con vida útil de años): aplicar el template completo, audits independientes en cada fase, versionado riguroso de los documentos.

### 3.5 Tabla de recomendación combinada

| Tamaño equipo | Complejidad | Plazo | Tipo D8 | Recomendación |
|---|---|---|---|---|
| 1 | Trivial | Urgente | cualquiera | Saltear template, README plano |
| 1 | Normal | Normal | library, cli-tool | Template con `mini-plan` y omisión de `acuerdo-equipo` |
| 1 | Normal | Largo | cualquiera | Template completo, `mini-plan` en sprint, audit propio |
| 2-5 | Normal | Normal | cualquiera | Caso canónico, template completo |
| 2-5 | Compleja | Normal | rest-api, web-microservices | Template completo + ADR por bounded context |
| 2-5 | Compleja | Largo | cualquiera | Template completo + audit externo |
| 6-15 | Normal | Normal | web-monolith, rest-api | Template completo, audits cada fase |
| 6-15 | Compleja | Largo | web-microservices | Template completo + solución multi-proyecto, un proyecto por contexto |
| >15 | Compleja | Largo | web-microservices | Solución multi-proyecto, un proyecto por bounded context |
| cualquiera | Trivial | Urgente | cualquiera | No usar template |
| cualquiera | Normal | Urgente | cualquiera | Template recortado: 00, 02, 06, 07 con `mini-plan` |

Cuándo NO usar el template:

- Proyecto con menos de una semana de trabajo total y sin intención de mantenerse.
- Prototipo descartable de validación rápida de una hipótesis.
- Investigación exploratoria sin compromiso de entrega.
- Cliente que rechaza la fase de intake estructurado y exige codear de inmediato.

En esos casos, el costo de armar la documentación inicial supera el beneficio. Igual podés tomar partes (la plantilla de visión, la matriz de casos de uso) sin comprometerte al flujo completo.

---

## §4 Recorrido paso a paso de la metodología

El flujo completo del usuario tiene 6 pasos, más un paso intermedio opcional (el 5b) que aparece solo en proyectos con interfaz visual. La narración asume que ya cumpliste los prerequisitos de §2 y que decidiste que el template aplica a tu solución según §3.

### 4.1 Paso 1 — Chat informal en Claude.ai web

El objetivo de este paso es armar contexto. Vas a Claude.ai en el navegador, abrís un proyecto nuevo (o un chat fresco si no querés persistir), y empezás una conversación sobre el problema que vas a resolver. La regla de oro es no apurar a Claude a decidir: queremos que pregunte, que haga repreguntas y que te ayude a aclarar lo que el cliente todavía no dijo.

Un prompt inicial que funciona bien:

```text
Quiero diseñar un sistema para [descripción del problema en una o dos frases].
El cliente es [tipo de cliente]. La urgencia es [normal / alta / baja].
Ayudame a estructurar el contexto. No tomes decisiones técnicas todavía;
primero hacé preguntas para entender el problema, los stakeholders, las
restricciones y los casos límite.
```

Claude responde con un set de preguntas. Vas contestando con la información que tenés y, cuando no sabés algo, lo decís explícitamente ("no sé, hay que preguntárselo al cliente"). Después de unos cuantos turnos vas a notar que la imagen se va cerrando.

Otro prompt útil cuando sentís que Claude está saltando a soluciones técnicas:

```text
Pará. Todavía no hablemos de stack ni de arquitectura.
Quiero quedarme en el problema. ¿Qué otras preguntas le harías a un
cliente que recién describe la idea para entender el dolor real y el
costo de no hacer nada?
```

Y otro para forzar la priorización:

```text
Si tuvieras que listar los tres flujos más frecuentes de uso del sistema
y los dos flujos críticos que rara vez pasan pero no pueden fallar,
¿cuáles serían? Justificá cada uno en una frase.
```

La conversación típica dura entre 10 y 15 turnos. Empezás con el problema, pasás por audiencias, propuesta de valor, alcance funcional, historias de usuario, flujos típicos, casos límite, métricas de éxito, exclusiones, restricciones, riesgos y glosario del dominio. No te apures a cerrar.

Al final de este paso tenés una conversación rica, no estructurada, en Claude.ai. Es deliberadamente desordenada: lo que importa es que esté completa.

### 4.2 Paso 2 — Consolidación en un solo documento

Una vez que sentís que la idea está cerrada, le pedís a Claude que consolide toda la conversación en un único documento de contexto. Este documento es interno, no es entregable: sirve como puente entre la charla y el intake.

Prompt sugerido:

```text
A partir de toda esta conversación, generá un único documento en
markdown que reúna ordenadamente el contexto del proyecto.
Estructura sugerida:
1. Visión del cliente en dos párrafos.
2. Problema concreto y consecuencias de no resolverlo.
3. Audiencia y stakeholders (tabla con rol, categoría, responsabilidad).
4. Alcance funcional pretendido (lista priorizada con MoSCoW provisorio).
5. Historias de usuario en formato Como/Quiero/Para.
6. Flujos típicos descriptos en lenguaje coloquial.
7. Casos límite con preguntas abiertas para el cliente.
8. Métricas de éxito (SMART).
9. Exclusiones declaradas.
10. Restricciones del cliente (presupuesto, fecha, legal, integraciones).
11. Riesgos detectados desde el negocio.
12. Glosario del dominio.

Mantené el lenguaje del cliente, sin decisiones técnicas todavía.
Si una sección quedó incompleta en la conversación, marcala como
PENDIENTE en lugar de inventar.
```

Claude devuelve un documento de 5 a 10 páginas. Hacé una pasada manual de verificación: ¿está todo lo que conversaron? ¿hay PENDIENTES razonables? ¿se mantiene en lenguaje de negocio sin colarse decisiones técnicas?

Si encontrás huecos, los completás conversando un par de turnos más y le pedís a Claude que regenere el documento. No avanzás al paso 3 hasta que el documento consolidado te parezca representativo.

Guardá ese documento aparte. Lo vamos a usar como input del paso siguiente.

### 4.3 Paso 3 — Volcado a la plantilla de intake

Acá entra en juego una única plantilla oficial del template, a nivel solución, ubicada en `../IA.SDD/SDD/Devs/Intake/` del template fuente:

- `SOLUTION-INTAKE-template.md`: el intake unificado de la solución. Reemplaza a las antiguas `PROJECT-BRIEF-template.md` y `PROJECT-README-template.md` (deprecadas). Está organizado en tres partes:
  - Parte A — Negocio (§1 a §12): idea y problema, audiencia y stakeholders, propuesta de valor, alcance funcional MoSCoW, historias de usuario, flujos típicos, casos límite, métricas de éxito, exclusiones, restricciones, riesgos y glosario del dominio. Todo en lenguaje de negocio, sin decisiones técnicas.
  - Parte B — Composición (§13 a §16): §13 la tabla de proyectos tipados (cada fila un proyecto con su tipo D8, rol, bandera `redistribuible` y dependencias), §14 el estilo de la solución y los contratos entre proyectos, §15 el esquema de descomposición y delivery, §16 la estructura de repositorio.
  - Parte C — Técnica por proyecto (§17): un bloque técnico repetible P.1 a P.12 por cada proyecto (stack, arquitectura, comunicación, persistencia, seguridad, testing, versionado, pipeline, compatibilidad, NFR, pre-ADR, trade-offs). Cierra con §18 estrategia de demo/samples y §19 el checklist de completitud.

El tipo D8 se declara por proyecto en la tabla de §13, no por la solución: la solución no tiene un D8 propio. No completás un manifiesto a mano: el `SOLUTION-MANIFEST` lo deriva el orquestador a partir de §13 (ver paso 5).

Subí la plantilla al chat de Claude.ai como archivo adjunto. Después le decís:

```text
Te paso la plantilla oficial del template SDD:
SOLUTION-INTAKE-template.md.

Quiero que tomes la información del documento consolidado que generamos
antes y completes la plantilla entera. Reglas:

1. No inventes datos que no estén en el documento consolidado.
2. En la Parte B, §13, enumerá todos los proyectos de la solución, cada
   uno con su tipo D8 (uno de los 8 cerrados por proyecto), su rol, su
   bandera redistribuible y sus dependencias. Verificá que el grafo de
   dependencias sea acíclico y que haya exactamente un proyecto principal.
3. En la Parte C, §17, repetí el bloque técnico P.1 a P.12 por cada
   proyecto declarado en §13.
4. Si falta información para algún campo, marcalo como PENDIENTE y
   listá al final las preguntas concretas que necesitás que yo le
   responda antes de seguir.
5. Borrá los bloques "Ejemplo genérico", "Ejemplo aplicado",
   "Caso degenerado" y "Lo que NO va en esta sección" del output final.
6. Respetá el checklist final de §19.

Si la solución tiene un solo proyecto, §13 tiene una sola fila
(caso degenerado) y el resto del flujo no cambia.
```

Claude genera el documento. Lo va a sacar con muchas secciones tildadas y, casi seguro, con algunos PENDIENTES que requieren ida y vuelta con el cliente real o con tu propio criterio.

Hacé la ronda de preguntas pendientes (las podés llevar al cliente si las hay), volvés a Claude con las respuestas y le pedís que regenere el intake con esas nuevas respuestas incorporadas. Repetí hasta que el checklist final de §19 esté íntegramente tildado y la Parte C tenga un bloque P.1 a P.12 por cada proyecto de §13.

No completás ningún manifiesto en este paso: el `SOLUTION-MANIFEST` no lo llena el usuario. Lo deriva el orquestador automáticamente a partir de §13 del intake, en la Fase de validación de intake, y te lo presenta para confirmación (ver paso 5).

Output del paso: un único archivo markdown personalizado a la solución, listo para bajar a local. El nombre definitivo sigue el patrón:

- `SOLUTION-INTAKE-<Nombre-Solucion>.md`

Donde `<Nombre-Solucion>` es el nombre de la solución en Título-Con-Guiones (minúsculas, sin acentos, guion medio como separador). Ejemplo: para "Gestión de Turnos", el slug es `gestion-de-turnos`. Los nombres de cada proyecto siguen el mismo criterio Título-Con-Guiones (por ejemplo `gestion-de-turnos-api`).

### 4.4 Paso 4 — Preparar el workspace de dos repositorios

A diferencia del modelo anterior, ya no copiás el template dentro del repositorio de tu proyecto. Trabajás con dos repositorios ubicados como hermanos en un workspace común: el repositorio fuente `IA.SDD` (este template, de solo lectura) y el repositorio destino de tu solución (donde se generará la documentación).

Si todavía no los tenés, cloná ambos en el mismo directorio de workspace:

```bash
# En la carpeta del workspace
git clone https://github.com/Aplicada-Streaming/IA.SDD.git
git clone <url-del-repo-destino> mi-solucion
```

El workspace queda así:

```text
workspace/
├── IA.SDD/                 # fuente (solo lectura): reglas, plantillas, prompts, guías
└── mi-solucion/            # destino: acá se generan el intake y la documentación
```

En el repositorio destino, colocá tu intake completado en `SDD/Intake/` (creá la carpeta si no existe). El nombre sigue el patrón `SOLUTION-INTAKE-<Nombre-Solucion>.md`:

```bash
# Desde la raíz del repo destino (mi-solucion/)
mkdir -p SDD/Intake
cp INTAKE-lleno.md SDD/Intake/SOLUTION-INTAKE-Gestion-De-Turnos.md
```

En PowerShell el equivalente es:

```powershell
New-Item -ItemType Directory -Force SDD\Intake
Copy-Item INTAKE-lleno.md SDD\Intake\SOLUTION-INTAKE-Gestion-De-Turnos.md
```

Hacé un commit del estado inicial en el repo destino:

```bash
git add SDD/
git commit -m "chore: intake inicial SDD de la solución"
```

Validá rápidamente que el intake está en su lugar (destino) y que el template fuente es accesible:

```bash
ls SDD/Intake/                        # tu intake, en el repo destino
ls ../IA.SDD/SDD/Devs/Orchestrator/   # Master-Prompt.md, en la fuente
ls ../IA.SDD/SDD/Devs/Rules/          # reglas de la fuente
```

Debería listar el `Master-Prompt.md` en `Orchestrator/` de la fuente, los doce archivos de reglas por categoría `Rules-*.md` (de `Rules-Contexto.md` a `Rules-Examples.md`), más `Root-Rules.md` y `Intake-Rules.md` en `Rules/` de la fuente, y tu intake personalizado en `SDD/Intake/` del destino (el único `SOLUTION-INTAKE` de la solución). El `SOLUTION-MANIFEST` no lo creás vos: lo deriva el orquestador y lo escribe también en `SDD/Intake/` del destino.

### 4.5 Paso 5 — Ejecutar el master-prompt en Claude Code

Acá empieza la parte más interesante: el orquestador valida tu intake, deriva de él el manifiesto de solución, valida la jerarquía y genera la documentación completa en `SDD/Docs/`, proyecto por proyecto, en orden topológico.

Abrí una terminal en la raíz del repositorio destino y lanzá Claude Code:

```bash
cd mi-solucion
claude
```

Una vez dentro de la sesión interactiva de Claude Code, la vía recomendada es leer el prompt de entrada `../IA.SDD/PROMPTS/PROMPT-Agente-Bootstrap-SDD.md`, que orquesta la ejecución sobre el repositorio destino delegando en el master-prompt. Alternativamente, podés referenciar el master-prompt directamente así:

```text
Leé ../IA.SDD/SDD/Devs/Orchestrator/Master-Prompt.md y arrancá la ejecución
del orquestador SDD sobre este repositorio destino. Mi intake ya está
en SDD/Intake/. La solución se llama [nombre de la solución].
```

Claude Code arranca con una Fase de validación de intake, previa a la Fase A y dirigida por `../IA.SDD/SDD/Devs/Rules/Intake-Rules.md`. En ella va a:

1. Leer tu único `SOLUTION-INTAKE` (las tres partes: negocio, composición, técnica por proyecto).
2. Validar la completitud del intake: campos bloqueantes presentes, ausencia de placeholders sin completar (`PENDIENTE`, `[Nombre]`, etc.) y coherencia entre partes (por ejemplo, que la Parte C tenga un bloque P.1 a P.12 por cada proyecto de §13).
3. Derivar el `SOLUTION-MANIFEST` a partir de la tabla de proyectos de §13: enumeración de proyectos, su `project_type` D8, rol, bandera `redistribuible`, dependencias y, derivados, los `nombre-proyecto-codigo` según el perfil de convención de nombres. Validar que cada `project_type` sea uno de los 8 valores D8, que haya exactamente un proyecto principal, que no haya colisión de nombres, que cada dependencia apunte a un proyecto existente y que el grafo sea acíclico.
4. Si falta completar algo bloqueante o una validación falla, se detiene y te emite una batería consolidada de preguntas (agrupadas por sección del intake) en lugar de avanzar a ciegas. Respondés, el orquestador actualiza el intake y revalida.
5. Presentar el manifiesto derivado y esperar tu confirmación explícita antes de tratarlo como artefacto canónico. El manifiesto no se completa a mano: se deriva y se confirma.

Con el manifiesto derivado y confirmado, el orquestador entra a la planificación:

6. Derivar `Nombre-Solucion`, `NombreSolucionCodigo` (PascalCase) y, por proyecto, el `Nombre-Proyecto` y el `nombre-proyecto-codigo`.
7. Ordenar los proyectos en orden topológico (primero los sin dependencias) y derivar, por proyecto, los flags de gating (usa_llm, tiene_ui_final, multi_tenant, etc.).
8. Recolectar invariantes de la solución (idioma, encoding, fecha, etc.).
9. Presentar el plan de generación: el orden de proyectos y, por proyecto, las categorías a producir.
10. Esperar tu confirmación explícita antes de despachar el primer subagente.

Cuando veas el plan, revisalo con calma. Verificá:

- Que la enumeración de proyectos, sus tipos D8 y el proyecto principal son los correctos.
- Que el orden topológico respeta las dependencias declaradas.
- Que la lista de documentos a generar por proyecto y categoría tiene sentido.
- Que los flags por proyecto están bien (si dice `usa_llm: false` en un proyecto que sí usa LLM, hay un problema en el intake).

Si todo está bien, respondés:

```text
aprobar
```

Si querés ajustes, respondés:

```text
aprobar con cambios: la categoría 04 debería estar habilitada porque
el sistema sí usa un LLM para clasificar tickets entrantes.
```

Y el orquestador ajusta antes de arrancar.

A partir de ahí, el orquestador despacha subagentes fase por fase. La Fase de validación de intake ya corrió antes de todo esto (validó el intake y derivó el manifiesto). La Fase A es a nivel solución y se corre una sola vez; las Fases B a G se repiten por proyecto en orden topológico (un proyecto no arranca antes que sus dependencias); la Fase H consolida la solución:

- Reconciliación normativa (solo si el destino ya tiene documentación de una corrida anterior): el orquestador compara con qué versión del framework se generó ese árbol contra la vigente, te muestra qué documentos quedaron potencialmente invalidados y te deja elegir entre un plan de adecuación, regenerar desde cero o continuar bajo la versión anterior. Sobre un destino vacío no corre.
- Fase de validación de intake (una vez, previa a A): validación de completitud del `SOLUTION-INTAKE` y derivación del `SOLUTION-MANIFEST` desde §13, con batería de preguntas si falta algo bloqueante y confirmación del manifiesto derivado.
- Fase A (nivel solución, una vez): 00-Contexto + 01-Necesidades-Negocio + audit A.
- Fase B (por proyecto): 02-Especificacion-Funcional + 03-UX-UI-DX + 04-Prompts-AI (si aplica) + audit B.
- Fase B2 (por proyecto, opcional): validación visual de maqueta, solo si el proyecto tiene interfaz visual y vos confirmás el flag `requiere_maqueta`. Es el paso 5b de §4.6.
- Fase C (por proyecto): 05-Arquitectura-Tecnica + audit C.
- Fase D (por proyecto): 06-Backlog-Tecnico + 07-Plan-Sprint + audit D.
- Fase E (por proyecto): 08-Calidad-Y-Pruebas + audit E.
- Fase F (por proyecto): 09-Devops + audit F.
- Fase G (por proyecto): 10-Examples, pasada de diseño + audit G.
- Fase H (consolidación): vista de solución + pipeline + README raíz + plan documental de 11 + audit final consolidado.
- Paso 6 (humano): handoff a codificación. A partir de acá el sistema se construye.
- Fase I (por incremento, re-ejecutable): 10 pasada de ejecución + 11 actualización incremental + `AGENTS.md` + ensayo automatizado + audit acotado al incremento.
- Fase J (una vez, al cierre): 11 consolidación + `AGENTS.md` definitivo + ensayo humano como gate + audit final de entrega.

Si la solución es de un solo proyecto (caso degenerado), el orquestador aplana el layout: genera las categorías `00` a `11` directo bajo `SDD/Docs/` más el README raíz, sin el subnivel `Proyectos/<Nombre>/` ni la carpeta `Solucion/`, y la Fase H omite la vista y el pipeline de solución. El resultado es idéntico al template de tipo único.

Entre cada fase, el orquestador se detiene, presenta el informe del audit (`SDD/Docs/Audit/<fase>-<categoria>.md`) y espera tu confirmación para continuar.

Si un audit devuelve `RECHAZADO` por hallazgos P0, el orquestador no avanza. Hay que corregir y re-auditar.

Si un subagente detecta una ambigüedad legítima (por ejemplo, falta una métrica numérica en el intake), se detiene y devuelve una pregunta estructurada. Vos respondés, el orquestador actualiza el intake siguiendo §13 del master-prompt y reanuda.

Tiempo total estimado del paso 5 para un proyecto normal: entre 2 y 6 horas de ejecución del modelo, distribuidas en sesiones. Es perfectamente normal pausar y retomar.

### 4.6 Paso 5b — Validar la maqueta visual (Fase B2, opcional)

Este paso aparece solamente en proyectos con interfaz visual. Es opcional: al aprobar el plan inicial vas a ver un flag `requiere_maqueta` por proyecto, y lo confirmás o lo invertís.

Para qué sirve. La especificación de UX y UI que produce la categoría 03 es texto: marco de experiencia, wireframes en ASCII, tablas de estados. Leerlo y decidir si eso es lo que querías es caro y poco confiable. La Fase B2 toma esa especificación y la materializa en una maqueta navegable, con HTML, CSS, Bootstrap 5 y JavaScript, que se abre en tu navegador y se recorre. Validás en minutos lo que en prosa te llevaría una tarde, y aparecen los huecos que el texto esconde.

Además, la maqueta muestra tus modelos de datos con ejemplos concretos, así que sirve para validar dos cosas de una: cómo se ve el producto y si el modelo de datos es el correcto.

Qué pasa, en orden:

1. Al cerrar la Fase B del proyecto, con la documentación de UX y UI ya generada y auditada, el orquestador te pregunta dos cosas juntas: si querés que genere la maqueta, y de qué modelo de diseño partir. La opción por defecto es el catálogo base del template; las alternativas son los modelos capturados de maquetas anteriores, si el catálogo `Modelos-UX-UI/` tiene alguno. Podés declinar acá aunque hayas dejado el flag activo al principio: el flag habilita la fase, esta pregunta la arranca.
2. Te presenta el plan de maqueta: qué superficies va a construir, qué rutas de navegación, qué campos del modelo va a exhibir y con qué datos de ejemplo, y qué estados va a demostrar por superficie. Aprobás o pedís cambios.
3. Construye la maqueta en `SDD/Maquetas/<Nombre-Proyecto>/` del repositorio destino.
4. La abre en tu navegador y te dice qué mirar: navegación, datos, estados y apariencia. Levanta un servidor local y lanza el navegador solo; si desde donde corre no alcanza tu entorno gráfico, no falla: te deja la URL y el comando para abrirla vos.
5. Corregís. Tenés dos vías y las dos valen:
   - Por prompt: le describís el cambio y lo aplica.
   - A mano: editás vos los archivos HTML, CSS, JavaScript o las imágenes, y después le decís "revisá la maqueta y tomá las correcciones". El orquestador relee los archivos, te enumera qué cambió y cómo lo interpretó, y espera que confirmes esa lectura antes de propagarla. No te pisa las correcciones manuales en las iteraciones siguientes.
6. Cuando aprobás la maqueta, retroalimenta la documentación. Esto es obligatorio y es el punto del ejercicio: los documentos de 03 se actualizan con lo aprobado, y si la validación tocó un caso de uso, un campo del modelo, una regla de negocio o el alcance, el cambio se propaga hacia atrás (02, 01, 00) y hacia adelante (05, 06, 07, 08). Si el cambio alcanza a las categorías de nivel solución o al intake, el orquestador se detiene y te avisa antes de tocarlas.
7. Te ofrece capitalizar el diseño: registrarlo como modelo reutilizable en el catálogo del template, con un nombre que vos elegís, más un ejemplo ejecutable ofuscado en `Templates/`. Si aceptás, ese modelo queda disponible como alternativa en el paso 1 de futuras maquetas. Si no, la fase cierra ahí.
8. Emite la línea de base del sensado de deriva: un inventario identificado de superficies, componentes, estados y rutas de navegación, más el contrato de los datos que la maqueta exhibe, más una matriz de comprobaciones. Ese material es el que te llevás a la codificación para verificar, sprint a sprint, que lo construido sigue siendo lo aprobado. Ver F-22.

Para abrirla por tu cuenta, en cualquier momento, tenés cuatro formas:

1. La que ya hizo el orquestador: el servidor que levantó sigue en pie mientras dure la fase, en la URL que te informó.
2. Desde tu editor, con la extensión de servidor local (en Visual Studio Code, Live Server o equivalente): abrís `SDD/Maquetas/<Nombre-Proyecto>/index.html` con la acción de servir de la extensión. **Si vas a corregir la maqueta a mano, usá esta**: recarga el navegador sola cada vez que guardás. El orquestador no puede dispararla por vos, así que ese clic es tuyo.
3. Con un servidor estático de línea de comandos:
   ```bash
   cd SDD/Maquetas/<Nombre-Proyecto>
   python3 -m http.server 8080
   ```
   y abrís `http://localhost:8080`.
4. Abriendo el archivo directo en el navegador. No requiere nada, pero algunos navegadores restringen operaciones sobre archivos locales, y con esta forma la recarga automática de la propia maqueta no funciona.

Si usás la 1 o la 3, que no recargan solas, prendé **Recarga automática** en la barra de validación de la maqueta: consulta los archivos cada pocos segundos y refresca cuando cambian. Viene apagada.

Las cuatro sirven los mismos archivos. No hay `npm install` ni proceso de compilación: lo que editás es lo que se sirve, y es lo mismo que después relee el orquestador. Esa equivalencia es lo que hace que corregir a mano funcione.

Qué revisar antes de aprobar:

- Recorré cada flujo de punta a punta. ¿Llegás a donde tenés que llegar? ¿Podés volver?
- Alterná los cuatro estados de cada superficie con la barra de validación. ¿Está definido qué pasa cuando no hay datos y cuando algo falla?
- Mirá los campos de cada pantalla contra lo que el sistema tiene que mostrar. ¿Falta alguno? ¿Sobra alguno? ¿El formato de las fechas y los números es el que usa tu negocio?
- Probá navegar con el teclado solo. Si no podés, la accesibilidad va a fallar después en la categoría 08.

### 4.7 Paso 6 — Revisión humana y handoff a codificación

Cuando el orquestador termina la fase H, te presenta el resumen ejecutivo del entregable: documentos generados por categoría, cobertura de la cadena de trazabilidad, ítems del Sprint 1 listos para codear, audits aprobados, decisiones pendientes y flags activos.

Antes de autorizar el handoff a codificación, hacé una revisión humana en estas dimensiones:

- Trazabilidad: abrí 3 o 4 user stories al azar y verificá que la cadena US → CU → NB → Visión cierra de punta a punta.
- Ambigüedades pendientes: revisá la lista de decisiones pendientes. Cerralas antes del Sprint 1 o documentalas como riesgos asumidos.
- Completitud: pasá por las 12 categorías de cada proyecto (bajo `Proyectos/<Nombre>/` en una solución multi-proyecto, o directo bajo `docs/` en el caso degenerado) y abrí el README de cada una. Si alguno está vacío o trivial, falló algo en la generación. En una solución multi-proyecto, revisá además la vista de solución y el pipeline de solución en `Solucion/`.
- Coherencia: leé la visión, leé los CU del Sprint 1, leé el ADR-001 del proyecto que estés revisando. ¿Cuentan la misma historia?

Si encontrás algo que arreglar, podés:

- Pedirle al orquestador que regenere un solo documento.
- Pedirle que re-auditar una fase específica.
- Volver al intake, actualizarlo siguiendo §13 y reanudar desde la fase afectada.

Cuando todo cierra, autorizás el paso a codificación:

```text
Confirmo handoff a codificación. Arrancamos Sprint 1 con los items
listados en el resumen ejecutivo.
```

El handoff **cierra el tramo de especificación, no el alcance de SDD**. Hasta acá el sistema no existía y se lo especificó; a partir de acá el sistema se construye y la documentación se verifica contra hechos. Ese segundo tramo son las Fases I y J, y es donde vive el paso 7.

### 4.8 Paso 7 — Ciclo incremental de documentación viva (Fases I y J)

Con el sistema en construcción, el orquestador vuelve a entrar en juego una vez por incremento. No es una fase más de la cadena de especificación: es un ciclo re-ejecutable que no tiene cantidad fija de corridas.

**Cuándo corre la Fase I.** En cada corte de la cadencia, que por defecto es el cierre de sprint. Si el equipo no trabaja por sprints, el corte es el cierre de cada incremento demostrable. Hay un tercer disparador que rompe la cadencia a propósito: un cambio que altera un contrato público, un procedimiento de despliegue o una ruta de código citada se documenta de inmediato, sin esperar el corte.

**Qué necesita para poder correr.** La Fase I tiene una precondición dura y el orquestador la verifica antes de despachar nada: tiene que existir código fuente, `/samples` tiene que tener al menos un sample implementado, y los tests tienen que correr. Si algo falta, se detiene y te lo informa en lugar de escribir documentación sobre un sistema que todavía no existe.

**Qué hace en cada corrida:**

1. Completa la evidencia de los contratos de verificación de la categoría 10: corre cada sample y vuelca la salida real con su fecha.
2. Actualiza los documentos de la categoría 11 que el incremento tocó, y solo esos.
3. Triaja las eventualidades registradas desde el corte anterior.
4. Emite o refresca el `AGENTS.md` en la raíz de tu repositorio.
5. Corre el ensayo de entrega automatizado.
6. Cierra con un audit acotado al incremento.

**Qué te toca a vos en la Fase I.** Poco, y ese es el punto. El orquestador hace el trabajo; vos revisás el resultado del ensayo automatizado y decidís si hace falta correr un ensayo humano en este corte. Lo único que no podés delegar es el criterio: si al documentar el despliegue el procedimiento resulta enredado, eso es una señal de arquitectura, no un problema de redacción, y conviene atenderla mientras todavía hay margen.

**Qué pasa en la Fase J.** Corre una sola vez, al cierre. Verifica el cuerpo documental completo ejecutando todo comando documentado, emite el `AGENTS.md` definitivo y exige un **ensayo de entrega humano aprobado**. Ese ensayo es un gate: sin él, la Fase J no cierra. Lo corrés vos o alguien de tu equipo que no haya documentado el sistema.

**Si tus correcciones manuales te preocupan**, no deberían: la Fase I no las pisa. El orquestador relee lo que editaste, enumera las diferencias respecto de lo que él había emitido, te informa cómo las interpretó y espera confirmación antes de propagarlas. Es el mismo patrón que ya conocés de la validación de maqueta.

---

## §5 Ejemplos aplicados

Cuatro mini-casos sintéticos que muestran el flujo completo end-to-end. Los tres primeros son soluciones de un proyecto (caso degenerado): ilustran un `project_type` distinto cada uno y muestran los cuatro sub-bloques (resumen del chat de Claude.ai, fragmentos clave del intake, output del orquestador, y muestras de los documentos generados). El cuarto es una solución multi-proyecto que combina varios tipos D8 en una sola jerarquía y muestra la tabla de proyectos del intake (§13), el manifiesto derivado, el grafo de dependencias y el orden topológico de generación.

### 5.1 Caso "API REST de gestión de turnos médicos" (rest-api, solución de un proyecto)

Contexto: un consultorio mediano (12 médicos, 3 administrativos, 600 turnos por semana) quiere reemplazar su sistema actual de turnos por teléfono con una API REST consumida por un portal web y una app móvil de pacientes. Es una solución de un solo proyecto: la tabla de proyectos del intake (§13) tiene una única fila (caso degenerado), el orquestador deriva un manifiesto de una sola entrada y aplana el layout, generando `00` a `11` directo bajo `SDD/Docs/`.

#### Chat resumido en Claude.ai

Turnos 1 a 3: el equipo le describe a Claude el problema del consultorio. Claude pregunta cuántos pacientes hay activos, cuántos médicos, qué pasa hoy si dos pacientes piden el mismo turno por teléfono al mismo tiempo, y si hay integraciones obligatorias con sistemas legados.

Turnos 4 a 6: el equipo aclara que hay un sistema contable interno con el que hay que sincronizar facturación diaria, que la recepcionista usa una planilla impresa que se duplica frecuentemente, y que el directorio quiere que el portal web esté en producción antes de la temporada de invierno (julio).

Turnos 7 a 10: Claude profundiza en historias de usuario (paciente, médico, recepcionista, auditor de obra social) y casos límite (cancelación tardía, sobreturno, paciente sin obra social, paciente menor de edad). El equipo va respondiendo y dejando algunos como pendientes para el cliente.

Turnos 11 a 13: cierre. Claude consolida en un documento único de contexto. El equipo lo revisa, pide dos correcciones menores (faltaba la métrica de tiempo de espera promedio y faltaba mencionar que el sistema actual también gestiona la sala de espera).

#### Fragmentos clave del intake

SOLUTION-INTAKE, §1 Idea y problema:

> Hoy los pacientes solo pueden sacar turno llamando por teléfono al consultorio en horario de atención, lo que satura la línea (15 a 30 minutos de espera promedio) y genera tiempos administrativos altos. La recepcionista anota en una planilla y mensualmente se detectan entre 8 y 12 turnos duplicados que tienen que resolverse a mano. Si no resolvemos esto, perdemos pacientes contra clínicas que ya tienen reserva online y la recepcionista no llega a cubrir las llamadas mientras atiende presencialmente.

SOLUTION-INTAKE, §4 Alcance funcional (extracto):

| ID | Capacidad | MoSCoW |
|---|---|---|
| F-01 | Reservar un turno para un médico y fecha disponible | Must Have |
| F-02 | Cancelar y reprogramar un turno propio | Must Have |
| F-03 | Listar disponibilidad de un médico para los próximos 30 días | Must Have |
| F-04 | Notificar al paciente 24 horas antes por correo | Should Have |
| F-05 | Integración con sistema contable existente (exportación CSV diaria) | Must Have |
| F-06 | Lista de espera automática para turnos liberados | Could Have |
| F-07 | App móvil nativa | Won't Have v1 |

SOLUTION-INTAKE, §13 Tipo de proyecto (tabla de proyectos): `rest-api`.

SOLUTION-INTAKE, §17 P.2 Estilo arquitectónico: Clean Architecture con 4 capas. Se descartan monolito en capas tradicional y microservicios (over-engineering para un dominio acotado con un equipo de 4 personas).

SOLUTION-INTAKE, §17 P.4 Persistencia: motor relacional gestionado con migrations versionadas. Sin multi-tenancy.

SOLUTION-INTAKE, §17 P.10 NFR: latencia p99 ≤ 300 ms en endpoints de consulta, SLO 99,5 por ciento, throughput sostenido 100 requests por segundo.

#### Output del orquestador

Claude Code, leyendo el master-prompt, detecta:

```text
project_type: rest-api
nombre-proyecto: Api-Turnos-Medicos
usa_llm: false
tiene_ui_final: false
multi_tenant: false
tiene_auth: true
equipo_n: 4
tiene_portal_developers: true
tiene_extensibilidad: false
tiene_persistencia: true
requiere_compliance: true
tiene_observabilidad_critica: true
```

Plan de generación: 12 categorías completas (04 omitida porque no usa LLM). En categoría 03 se elige variante DX (no UX/UI) porque la API consume otros frontends. La categoría 10 es obligatoria por ser rest-api con portal de developers.

Fases ejecutadas en orden: A, B, C, D, E, F, G, H. Cada una con su audit. La fase G genera 3 samples (cliente HTTP de referencia, colección de invocaciones reusables, SDK tipado para el lenguaje del portal). El total de archivos generados ronda los 60.

#### Muestras de documentos generados

Extracto de `SDD/Docs/02-Especificacion-Funcional/Casos-De-Uso/CU-03-Reservar-Turno.md`:

```markdown
# CU-03 — Reservar turno

## Actor primario
Paciente registrado

## Precondiciones
- El paciente está autenticado con un JWT válido.
- El médico al que se le quiere reservar turno existe y está activo.
- La franja horaria solicitada no está ocupada ni bloqueada.

## Flujo principal
1. El paciente consulta disponibilidad del médico para los próximos 30 días.
2. El sistema devuelve las franjas libres con duración estándar de 20 min.
3. El paciente selecciona una franja y confirma.
4. El sistema valida que la franja sigue libre (lock optimista).
5. El sistema crea el turno y devuelve identificador y comprobante.
6. El sistema envía notificación de confirmación al correo del paciente.

## Criterios de aceptación (Given/When/Then)
- Given un paciente autenticado y una franja libre,
  When solicita reservar esa franja,
  Then el sistema crea el turno y devuelve HTTP 201 con el identificador.
- Given un paciente autenticado y una franja que dejó de estar libre,
  When solicita reservar esa franja,
  Then el sistema devuelve HTTP 409 con código TURNO_NO_DISPONIBLE.

## Trazabilidad
- Upstream: NB-01 (acceso 24/7 a la reserva), Visión §2
- Downstream: US-08, BT-12, RC-04, TC-15
```

Extracto de `SDD/Docs/05-Arquitectura-Tecnica/Adrs/ADR-002-Estilo-Clean-Architecture.md`:

```markdown
# ADR-002 — Adopción de Clean Architecture

## Contexto
El sistema es una API REST con un dominio acotado (turnos, médicos,
pacientes, obras sociales) y un equipo de 4 personas con experiencia
mixta. Necesitamos una arquitectura que aísle la lógica de negocio
del framework HTTP y del motor de persistencia para mantener test
unitarios baratos y permitir cambios de infraestructura sin tocar
el dominio.

## Decisión
Adoptar Clean Architecture con 4 capas: Domain, Application,
Infrastructure, Api. El dominio no depende de frameworks.

## Alternativas descartadas
- Monolito en capas tradicional: acopla lógica de negocio al ORM,
  encarece los tests unitarios.
- Microservicios: over-engineering para un dominio acotado y un
  equipo chico, agrega complejidad operativa sin valor proporcional.

## Consecuencias
Positivas: testabilidad alta, intercambiabilidad de motor de persistencia,
contratos claros entre capas.
Negativas: más boilerplate inicial, curva de aprendizaje para el junior
del equipo.
```

### 5.2 Caso "Librería utilitaria para parsing de archivos CSV" (library, solución de un proyecto)

Contexto: el equipo de plataforma de una empresa tecnológica necesita una librería interna para parsear archivos CSV con varias particularidades (delimitadores distintos, encoding detectable, manejo de filas con error sin frenar la lectura completa). Hoy cada proyecto resuelve el problema con scripts ad-hoc y eso genera mucho retrabajo. También es una solución de un proyecto (caso degenerado): la tabla de proyectos del intake (§13) tiene una sola fila de tipo `library`.

#### Chat resumido en Claude.ai

Turnos 1 a 4: descripción del problema, identificación de los principales integradores (3 equipos internos, cada uno con su stack), foco en la ergonomía de la API pública y en la compatibilidad de versiones.

Turnos 5 a 7: Claude pregunta cómo se distribuye hoy la librería y qué políticas de breaking changes maneja la empresa. Se aclara que se publica via el registry interno del ecosistema del lenguaje y que se siguen lineamientos SemVer estrictos.

Turnos 8 a 10: profundización en historias del integrador (lectura básica, lectura con error tolerante, lectura en streaming, escritura, detección de encoding) y casos límite (archivo vacío, filas con cantidad de columnas inconsistente, caracteres no UTF-8, valores entre comillas con saltos de línea internos).

Turno 11 a 12: cierre y consolidación.

#### Fragmentos clave del intake

SOLUTION-INTAKE, §3 Propuesta de valor:

> Hoy cada equipo resuelve el parsing de CSV con scripts ad-hoc, lo que genera bugs repetidos y mantenimiento disperso. La promesa de esta librería es ofrecer una API pequeña y predecible que soporta los escenarios más comunes (delimitadores configurables, manejo de errores fila por fila, streaming de archivos grandes) y deja documentadas las extensiones para casos avanzados. Frente a librerías comerciales o externas con licencias o trade-offs, el diferenciador es que la API se ajusta al estilo idiomático del lenguaje del equipo y se integra al pipeline interno de CI sin fricción.

SOLUTION-INTAKE, §13 Tipo de proyecto (tabla de proyectos): `library`.

SOLUTION-INTAKE, §17 P.2 Estilo arquitectónico: Pipeline / Clean Architecture liviana. Descartado: monolito (no aplica, es librería), event-driven (innecesario).

SOLUTION-INTAKE, §17 P.6 Estrategia de testing: pirámide 80/15/5, cobertura mínima 85% líneas y 75% branches, snapshot tests para verificar formato de output canónico.

SOLUTION-INTAKE, §17 P.7 Versionado: SemVer 2.0.0, Conventional Commits, cálculo automático de versión a partir de tags Git, canales preview y stable, feed del ecosistema.

SOLUTION-INTAKE, §17 P.9 Compatibilidad: soporte para las versiones LTS actuales y previas del runtime. Sin soporte para arquitectura 32-bit.

#### Output del orquestador

```text
project_type: library
nombre-proyecto: Csv-Parser-Lib
usa_llm: false
tiene_ui_final: false
multi_tenant: false
tiene_auth: false
equipo_n: 3
tiene_portal_developers: true
tiene_extensibilidad: true
tiene_persistencia: false
requiere_compliance: false
tiene_observabilidad_critica: false
```

Plan: categoría 04 omitida (no LLM). Categoría 03 variante DX (developer integrador). Categoría 10 obligatoria con 3 samples progresivos (integrador básico, integrador intermedio, integrador avanzado con extensiones). Categoría 11 obligatoria.

La fase de arquitectura genera 3 ADR mínimos: estilo arquitectónico, superficie pública, política de versionado. La fase de developer guide genera conceptos, onboarding, integración por cada stack, referencia de API y troubleshooting.

#### Muestras de documentos generados

Extracto de `SDD/Docs/00-Contexto/Vision-Producto.md`:

```markdown
# Visión del producto — csv-parser-lib

## Audiencia
Desarrolladores internos de los equipos de Plataforma, Analytics e
Integraciones. Audiencia secundaria: futuros equipos que necesiten
parsear archivos CSV en sus pipelines.

## Propuesta de valor
Ofrecer una librería con API mínima y predecible para los casos
comunes de parsing CSV, con extensibilidad documentada para casos
avanzados. Reducir el costo de mantenimiento disperso que hoy tiene
la empresa con N scripts ad-hoc.

## Objetivos SMART
- Cobertura interna: 3 equipos integradores en los primeros 6 meses
  post-release v1.0.
- Reducción de bugs reportados sobre parsing CSV en los repos
  integradores: -50% en 9 meses.
- Tiempo medio de integración de un equipo nuevo: ≤ 1 jornada.

## Métricas de éxito
- Adopción medida por dependencias declaradas en repos internos.
- Cantidad de issues abiertas en el repo de la librería por trimestre.
- Tiempo de respuesta a issues críticas: ≤ 2 días hábiles.
```

Extracto de `SDD/Docs/10-Examples/README.md`:

```markdown
# Samples — csv-parser-lib

Esta carpeta contiene tres proyectos integradores que ilustran el uso
progresivo de la librería.

| Nivel | Carpeta | Qué demuestra |
|---|---|---|
| Básico | `01-basico-lectura/` | Lectura de un archivo CSV con delimitador por defecto, deserialización a una lista de objetos tipados |
| Intermedio | `02-intermedio-streaming/` | Lectura en streaming de un archivo grande, manejo de filas con error sin frenar la lectura completa, configuración de delimitador y encoding |
| Avanzado | `03-avanzado-extension/` | Implementación de un type converter custom para columnas con formato propietario, registro del converter via el punto de extensión documentado |

Cada sample es autocontenido. Para ejecutarlo, abrir la carpeta,
seguir el README local y correr el comando de la sección "Ejecutar".
```

### 5.3 Caso "App móvil de inventario de almacén" (mobile-app-maui, solución de un proyecto)

Contexto: una empresa logística con 4 depósitos y 30 empleados de campo quiere reemplazar el método actual (planillas en papel y planilla de cálculo) por una app móvil multiplataforma de inventario que soporte escaneo de código de barras, sincronización con un sistema central y modo offline. Es la tercera solución de un proyecto (caso degenerado), esta vez de tipo `mobile-app-maui`.

#### Chat resumido en Claude.ai

Turnos 1 a 3: descripción del contexto operativo, identificación del problema (errores frecuentes de inventario, demoras en cierres mensuales). Claude pregunta por conectividad en los depósitos (mala, intermitente), tipos de dispositivos disponibles y nivel técnico de los operarios (medio-bajo).

Turnos 4 a 6: profundización en historias de usuario (encargado de depósito, dueño del almacén, vendedor, auditor externo) y casos límite (sincronización después de varias horas offline, conflicto cuando dos operarios modifican el mismo producto, baja de la app por mantenimiento).

Turnos 7 a 10: Claude pregunta por restricciones de presupuesto y fecha (temporada alta en noviembre, hay que tener MVP antes), por integraciones obligatorias (sistema contable legacy con exportación CSV diaria) y por exclusiones explícitas (sin pagos online, sin gestión de proveedores, sin app web en v1).

Turnos 11 a 13: cierre, ronda de aclaraciones pendientes, consolidación.

#### Fragmentos clave del intake

SOLUTION-INTAKE, §5 Historias de usuario (extracto):

> Como encargado de depósito, quiero escanear un código de barras con la cámara del celular, para registrar la entrada de mercadería sin tipear.
>
> Como dueño del almacén, quiero recibir una notificación cuando el stock de un producto cae por debajo del mínimo, para generar el pedido al proveedor a tiempo.

SOLUTION-INTAKE, §13 Tipo de proyecto (tabla de proyectos): `mobile-app-maui`.

SOLUTION-INTAKE, §17 P.4 Persistencia: motor embebido local en el dispositivo + sincronización HTTP con el backend central. Estrategia de conflicto last-write-wins con override manual via UI.

SOLUTION-INTAKE, §17 P.9 Compatibilidad: versiones recientes del SO móvil de las dos plataformas dominantes. Sin soporte para tablets en v1.

SOLUTION-INTAKE, §17 P.10 NFR: tiempo de respuesta del escáner < 1 segundo, sincronización completa < 30 segundos para un día de movimientos típico, capacidad offline ≥ 8 horas continuas.

#### Output del orquestador

```text
project_type: mobile-app-maui
nombre-proyecto: Inventario-Almacen
usa_llm: false
tiene_ui_final: true
multi_tenant: false
tiene_auth: true
equipo_n: 5
tiene_portal_developers: false
tiene_extensibilidad: false
tiene_persistencia: true
requiere_compliance: true
tiene_observabilidad_critica: false
```

Plan: categoría 03 variante UX/UI con acento en accesibilidad móvil. Categoría 11 con cuerpo integrador omitido (no hay SDK público) y cuerpo mantenedor obligatorio. Categoría 10 genera 3 samples (app básica con datos mock, sync con mock server, modo offline avanzado con resolución de conflictos).

La fase de DevOps genera estrategia de publicación atada a los ciclos de las stores móviles, con canales internal/alpha/beta/production.

#### Muestras de documentos generados

Extracto de `SDD/Docs/03-UX-UI-DX/Wireframes-Pantalla-Escaneo.md`:

```markdown
# Wireframe — pantalla de escaneo

## Estado inicial
Vista en orientación vertical. Cámara ocupando los dos tercios
superiores con el rectángulo guía centrado. Tercio inferior con un
campo de texto auxiliar para ingreso manual del código y un botón
"Confirmar".

## Estado durante captura
Cuando la cámara detecta un código válido, se muestra un overlay
verde sobre el rectángulo guía con el código detectado. Vibración
corta del dispositivo como feedback háptico.

## Estado de error
Si el código no se reconoce en 5 segundos, se muestra un mensaje
"No se detectó código. Probá manualmente." con foco automático en
el campo de texto.

## Estados de carga
Spinner sobre el botón "Confirmar" mientras se valida contra la
base local. Si la conexión está disponible, se sincroniza en
background sin bloquear al usuario.
```

Extracto de `SDD/Docs/09-Devops/Entornos-Deploy.md`:

```markdown
# Estrategia de entornos y publicación

## Canales de release
- internal: builds firmados que se distribuyen al equipo de QA
  interno. Trigger: cada merge a main.
- alpha: build entregado a 3 depósitos piloto. Trigger: tag pre-release
  con sufijo -alpha.N.
- beta: build entregado a todos los depósitos antes de un release. Trigger:
  tag pre-release con sufijo -beta.N.
- production: build promocionado al canal estable de cada store. Trigger:
  tag estable vX.Y.Z + aprobación manual.

## Política de rollout
Rollout progresivo del 10% / 30% / 100% en intervalos de 24 horas.
Métrica de freno automático: tasa de crashes > 1% en los primeros
1000 usuarios.
```

### 5.4 Caso "Solución de gestión de turnos con cuatro proyectos" (solución multi-proyecto)

Contexto: el mismo dominio de turnos médicos del caso 5.1, pero esta vez el equipo no entrega una sola API: arma una solución con cuatro proyectos que se construyen y publican como una jerarquía. La solución se llama "Gestión de Turnos" (`gestion-de-turnos`, `NombreSolucionCodigo` = `GestionDeTurnos`). Este caso muestra qué cambia respecto del degenerado: la tabla de proyectos del intake (§13) tiene cuatro filas, hay dependencias entre proyectos, el orquestador deriva un manifiesto de cuatro entradas, genera en orden topológico y aparecen los artefactos de nivel solución.

Los cuatro proyectos:

- `gestion-de-turnos-api` (`rest-api`, proyecto principal): la API pública de turnos.
- `gestion-de-turnos-domain` (`library`): el dominio y las reglas de negocio compartidas.
- `gestion-de-turnos-notificaciones` (`worker-service`): el envío asincrónico de recordatorios.
- `aplicada-validaciones` (`library`, redistribuible): un paquete reusable de validaciones, independiente de la solución que lo consume.

#### Fragmento de §13 del SOLUTION-INTAKE

Datos de solución (extracto):

| Campo | Valor |
|---|---|
| Nombre de solución | Gestión de Turnos |
| `Nombre-Solucion` | `gestion-de-turnos` |
| `NombreSolucionCodigo` | `GestionDeTurnos` |
| Proyecto principal | `gestion-de-turnos-api` |

Perfil de convención: PascalCase; separador `.`; prefijo de redistribuibles `Aplicada`.

Tabla de proyectos (§13). Es lo único que completás; el `nombre-proyecto-codigo` lo deriva el orquestador al construir el manifiesto:

| `Nombre-Proyecto` | `nombre-proyecto-codigo` | `project_type` | Rol | `redistribuible` | Dependencias |
|---|---|---|---|---|---|
| `gestion-de-turnos-api` | `GestionDeTurnos.WebApi` | `rest-api` | API pública de turnos (principal) | false | `gestion-de-turnos-domain`, `aplicada-validaciones` |
| `gestion-de-turnos-domain` | `GestionDeTurnos.Domain` | `library` | Dominio y reglas de negocio compartidas | false | `aplicada-validaciones` |
| `gestion-de-turnos-notificaciones` | `GestionDeTurnos.Worker` | `worker-service` | Envío asincrónico de recordatorios | false | `gestion-de-turnos-domain` |
| `aplicada-validaciones` | `Aplicada.Validaciones` | `library` | Paquete reusable de validaciones | true | — |

Los nombres de código siguen la convención `<NombreSolucionCodigo>.<Sufijo>` (por ejemplo `GestionDeTurnos.WebApi`), salvo el paquete redistribuible, que arranca con el prefijo de organización `Aplicada` (`Aplicada.Validaciones`) para tener un espacio de nombres estable e independiente de la solución que lo consume.

#### Grafo de dependencias y orden topológico

La tabla de §13 declara: `api` depende de `domain` y de `aplicada-validaciones`; `domain` depende de `aplicada-validaciones`; `notificaciones` depende de `domain`. El grafo es acíclico, condición que el orquestador valida al derivar el manifiesto, antes de arrancar.

```text
aplicada-validaciones  ->  gestion-de-turnos-domain  ->  gestion-de-turnos-api
                       \                              \-> gestion-de-turnos-notificaciones
                        \-> gestion-de-turnos-api
```

De ese grafo el orquestador deriva el orden topológico de generación y de build. Ningún proyecto arranca antes que sus dependencias; los del mismo nivel pueden generarse en paralelo:

```text
nivel 0: aplicada-validaciones
nivel 1: gestion-de-turnos-domain
nivel 2: gestion-de-turnos-api, gestion-de-turnos-notificaciones   (paralelizables)
```

#### Output del orquestador

El orquestador lee §13 del intake, valida (tipos D8 válidos, un único proyecto principal, sin colisión de nombres, dependencias resueltas, grafo acíclico), deriva el manifiesto y los nombres de código, te lo presenta para confirmación y planifica:

```text
solucion: gestion-de-turnos
NombreSolucionCodigo: GestionDeTurnos
proyecto-principal: gestion-de-turnos-api
proyectos: 4 (orden topologico: aplicada-validaciones, gestion-de-turnos-domain,
              gestion-de-turnos-api, gestion-de-turnos-notificaciones)
```

Ejecuta la Fase A una sola vez a nivel solución (00-Contexto, 01-Necesidades-Negocio), luego recorre las Fases B a G por proyecto en el orden topológico, y cierra con la Fase H de consolidación: como hay más de un proyecto, genera la vista de solución (`Solucion/Vista-Solucion.md`, con el mapa de proyectos, los contratos inter-proyecto y el grafo de dependencias), el pipeline de solución (`Solucion/Pipeline-Solucion.md`, con el orden de build topológico y la matriz de artefactos publicables por proyecto) y el README raíz.

#### Layout generado (extracto)

```text
SDD/Docs/
├── 00-Contexto/                         # nivel solución
├── 01-Necesidades-Negocio/              # nivel solución
├── Solucion/
│   ├── Vista-Solucion.md
│   └── Pipeline-Solucion.md
├── Proyectos/
│   ├── aplicada-validaciones/02..11/
│   ├── gestion-de-turnos-domain/02..11/
│   ├── gestion-de-turnos-api/02..11/
│   └── gestion-de-turnos-notificaciones/02..11/
└── README.md                            # README raíz de solución
```

Comparado con el caso 5.1 (degenerado), las diferencias visibles son: el subnivel `Proyectos/<Nombre>/`, la carpeta `Solucion/` con sus dos artefactos, y que `00`/`01` quedan a nivel solución en vez de mezclados con el resto de las categorías.

---

## §6 Resolución de problemas frecuentes

FAQ con respuestas concretas a los problemas más comunes durante el uso del template.

### F-01 — El orquestador se detiene preguntándome X, ¿qué hago?

Es el comportamiento esperado del patrón de manejo de ambigüedad (§9 del master-prompt). El subagente detectó que falta información bloqueante en el intake y no quiere inventar. La pregunta viene estructurada con la sección del intake donde debería vivir la respuesta.

Pasos:

1. Leé la pregunta concreta y la justificación.
2. Si la respuesta la tenés, respondés directamente. El orquestador va a actualizar el intake siguiendo §13 del master-prompt y va a reanudar el subagente.
3. Si la respuesta requiere consultar al cliente, anotala como pendiente, hacé la consulta, y respondé cuando tengas la información.
4. Si decidís que la información no es bloqueante, podés pedir al orquestador que asuma un valor por defecto justificado, pero queda como decisión documentada en el log.

### F-02 — Generó un documento que no aplica al tipo de un proyecto, ¿cómo lo saco?

Revisá primero el `project_type` del proyecto en §13 del `SOLUTION-INTAKE` (la tabla de proyectos). Si el tipo está mal, corregilo en §13 del intake; el orquestador re-deriva el manifiesto y regenera lo afectado de ese proyecto. Si está bien, abrí el archivo de reglas correspondiente (`Rules-<Categoria>.md`), verificá §2.1 y §2.2 (tabla maestra de documentos y reglas por tipo). Si el documento estaba marcado como "Omitir" para ese tipo y aun así se generó, es un bug del subagente. Pedile al orquestador que regenere esa categoría para ese proyecto con instrucciones explícitas.

Si simplemente decidiste que no querés ese documento aunque la regla lo recomiende, eliminalo a mano y registrá un ADR en `SDD/Docs/05-Arquitectura-Tecnica/` documentando la omisión.

### F-03 — Quiero forzar un cambio en una regla de categoría, ¿dónde lo modifico?

Las reglas viven en `../IA.SDD/SDD/Devs/Rules/`. Cada categoría tiene su archivo `Rules-<Categoria>.md`. Para cambiar comportamiento de una categoría:

1. Editás el archivo de reglas correspondiente.
2. Si es un cambio editorial menor, subís minor (`v1.0` → `v1.1`).
3. Si es un cambio operativo (agregar documento, cambiar especialidad), subís minor o major según corresponda.
4. Re-ejecutás el orquestador desde la fase afectada.

El master-prompt no se toca para esto: el principio de delegación de la especialidad implica que el orquestador lee las reglas en cada ejecución.

### F-04 — El audit reportó un P0, ¿cómo lo corrijo?

P0 significa hallazgo bloqueante: viola D1-D9 (idioma, encoding, Título-Con-Guiones, versionado, deprecación, trazabilidad, vocabulario, conjunto cerrado D8, evidencia verificable D9) o rompe la estructura obligatoria del documento.

Pasos:

1. Abrí el informe en `SDD/Docs/Audit/<fase>-<categoria>.md`.
2. Identificá el archivo, sección y evidencia del hallazgo.
3. Si es un error de contenido (placeholder sin completar, sección omitida), pedile al orquestador que regenere ese documento.
4. Si es un error de trazabilidad, revisá los documentos upstream o downstream y arreglá las referencias.
5. Una vez corregido, pedile al orquestador que re-auditar la fase. Si pasa, avanzás.

### F-05 — Mi proyecto está en otro idioma, ¿puedo usar el template?

Sí, pero requiere preparación. Las reglas constructivas y el master-prompt están escritos en español rioplatense neutro. Para usar el template en otro idioma:

1. Modificá la sección §5 del master-prompt (Recolección de invariantes del proyecto) para declarar el idioma de salida deseado.
2. Pedile al orquestador que aplique ese idioma a todos los entregables.
3. Tené en cuenta que las preguntas guía y los ejemplos de cada archivo de reglas siguen en español: van a quedar en español en el material interno aunque la documentación de salida esté traducida.

Para una traducción completa del template, copiá el repo y traducí los archivos de reglas. Es trabajo, pero es tractable.

### F-06 — ¿Cómo regenero un solo documento sin re-ejecutar todo?

Indicale al orquestador qué documento querés regenerar. Ejemplo:

```text
Regenerá únicamente SDD/Docs/05-Arquitectura-Tecnica/Adrs/ADR-003-Persistencia.md
manteniendo el resto intacto.
```

El orquestador valida los upstream (que no hayan cambiado las decisiones de las que depende el documento), despacha el subagente de la categoría, regenera el archivo y dispara un audit acotado al cambio. No se re-ejecuta el flujo completo.

### F-07 — ¿Puedo modificar el master-prompt para mi caso?

Sí, pero con cuidado. El master-prompt es la única instrucción que el orquestador necesita y es autocontenido. Si lo modificás:

1. Subí versión (sección §16 del master-prompt).
2. Documentá qué cambiaste y por qué en el control de cambios.
3. Mantené el patrón plan-then-confirm. Saltearlo (por ejemplo, dejar que el orquestador codee sin confirmación) rompe la garantía de calidad del template.

No se recomienda modificar §1 (principio de delegación de la especialidad), §7 (orden de fases) ni §10 (auditoría entre fases). Modificar §5 (invariantes) o §14 (adaptabilidad por tipo) es habitual y seguro.

### F-08 — El intake quedó incompleto y el orquestador se rehúsa a avanzar

Es el comportamiento correcto. El intake incompleto es la principal fuente de documentación pobre. Pasos:

1. Leé la lista enumerada que devuelve el orquestador (archivo, sección, placeholder).
2. Volvé a Claude.ai web o respondé directamente al orquestador con los datos faltantes.
3. Si la información no existe (no sabés la respuesta y no podés consultar al cliente), tenés dos opciones: documentar un valor por defecto asumido explícitamente (queda como decisión a confirmar) o pausar la generación hasta tener la respuesta. No inventes.

### F-09 — ¿Cómo agrego información nueva al proyecto a mitad del flujo?

Si la información nueva afecta el intake (por ejemplo, el cliente cambió el alcance o agregó una restricción nueva):

1. Aplicá §13 del master-prompt: actualizá el intake siguiendo el control de cambios.
2. Identificá las fases afectadas por el cambio (por ejemplo, un cambio en §10 Restricciones del BRIEF afecta 00, 01, 09).
3. Pedile al orquestador que retroceda a la fase más temprana afectada y regenere desde ahí.

Si la información nueva es técnica (por ejemplo, agregás un ADR durante el desarrollo), agregalo a `SDD/Docs/05-Arquitectura-Tecnica/Adrs/` y actualizá la trazabilidad downstream a mano o pedile al orquestador que la rehidrate.

### F-10 — El subagente generó algo distinto a lo que esperaba

Primer paso: leé el archivo de reglas de la categoría y verificá qué pide. Es posible que tus expectativas estuvieran fuera de la especificación de la regla, y el subagente acertó.

Segundo paso: si el subagente realmente se desvió, pedile al orquestador que regenere el documento citando explícitamente la sección de la regla que no se respetó. Ejemplo:

```text
Regenerá CU-04-Cancelar-Turno.md respetando estrictamente la
estructura de §4.2 de ../IA.SDD/SDD/Devs/Rules/Rules-Especificacion-Funcional.md.
El documento actual omite la sección de criterios Given/When/Then.
```

### F-11 — Tengo varios proyectos relacionados (API, dominio, worker), ¿cómo los manejo?

Esa es justamente la jerarquía de proyectos que modela una solución. No necesitás N carpetas `SDD` separadas: declarás los proyectos como filas de la tabla de §13 de tu `SOLUTION-INTAKE`, con sus dependencias, y el orquestador deriva el manifiesto y genera la documentación de todos en una sola ejecución, proyecto por proyecto en orden topológico, bajo `Proyectos/<Nombre>/`. Ver F-16 para cómo se declaran.

Solo conviene separar en soluciones SDD distintas cuando se trata de productos verdaderamente independientes, con clientes, roadmaps y ciclos de vida desacoplados, que no comparten un intake de negocio ni un grafo de dependencias. En ese caso sí, cada solución tiene su propia carpeta `SDD` y su propio `SOLUTION-INTAKE`.

### F-12 — La generación de una fase tarda mucho, ¿es normal?

Sí, dentro de cierto rango. Una fase típica con 3 a 8 documentos y un audit puede demorar entre 5 y 30 minutos según el tamaño del proyecto y la velocidad del modelo. Si una fase tarda más de una hora, abortá, revisá el intake (probablemente hay ambigüedades que estén haciendo retroceder al subagente repetidamente) y reanudá.

### F-13 — El orquestador me pidió aprobar el plan inicial, ¿qué reviso?

Mínimo checklist antes de aprobar:

- `project_type` correcto.
- Lista de documentos por categoría coherente con el alcance.
- Flags activos correctos (especialmente `usa_llm`, `tiene_auth`, `equipo_n`).
- Invariantes del proyecto (idioma, encoding, política de versionado) alineadas con tu organización.

Si todo está bien, aprobás. Si querés cambios, los pedís en la misma respuesta con justificación.

### F-14 — Los audits aprueban con observaciones P2 o P3, ¿puedo ignorarlas?

Podés, pero quedan registradas en el informe. Cuando el orquestador cierre el flujo, te las va a listar como "decisiones pendientes" en el resumen ejecutivo de §12 del master-prompt. Conviene resolverlas antes del Sprint 1, especialmente las P2 que apuntan a secciones recomendadas ausentes. Las P3 son mejoras estilísticas que podés agendar como deuda documental ligera.

### F-15 — ¿Qué hago con el feedback del cliente sobre los documentos generados?

El cliente típicamente no lee toda la documentación, pero sí lee el README raíz, la visión, el alcance y, a veces, los CU principales. Si el cliente pide cambios:

1. Si son cambios de fondo (cambio de alcance, exclusión nueva), aplicá §13: actualizá el intake correspondiente.
2. Si son cambios de forma (claridad, ortografía, ejemplos), aplicalos directamente al documento generado, sin tocar el intake.
3. Después de cambios, regenerá el README raíz para asegurar que los enlaces y referencias siguen coherentes.

### F-16 — ¿Cómo declaro varios proyectos en una solución?

En §13 de tu `SOLUTION-INTAKE`. Esa sección tiene una tabla de proyectos donde cada fila es un proyecto: su `Nombre-Proyecto`, su `project_type` (uno de los 8 D8), su rol, su bandera `redistribuible` y sus dependencias hacia otros proyectos de la misma solución. Declarás un único proyecto principal y armás el grafo de dependencias listando, en la columna Dependencias, los proyectos de los que depende cada uno. El grafo tiene que ser acíclico. Además, por cada proyecto declarado en §13 repetís el bloque técnico P.1 a P.12 en §17. No completás un manifiesto a mano: durante la Fase de validación de intake, el orquestador valida §13 (tipos válidos, un solo principal, sin colisiones de nombre, dependencias resueltas, grafo acíclico), deriva el `SOLUTION-MANIFEST` con los `nombre-proyecto-codigo` y te lo presenta para confirmación. Recién entonces ordena los proyectos en orden topológico y genera la documentación de cada uno.

### F-17 — ¿Qué pasa si mi solución es un solo proyecto?

Es el caso degenerado y es totalmente válido: la tabla de proyectos de §13 tiene una sola fila y el orquestador deriva un manifiesto de una sola entrada. El orquestador aplana el layout y genera las categorías `00` a `11` directo bajo `SDD/Docs/` más el README raíz, sin el subnivel `Proyectos/<Nombre>/` ni la carpeta `Solucion/`, y la Fase H omite la vista y el pipeline de solución. El resultado es idéntico al del template de tipo único anterior: si venías trabajando con un proyecto único, no cambia nada para vos. Esta equivalencia es la garantía de no ruptura del modelo.

### F-18 — ¿Cómo se nombran los proyectos en /src?

Por convención `<NombreSolucionCodigo>.<Sufijo>`, donde `<NombreSolucionCodigo>` es la forma PascalCase del nombre de la solución y `<Sufijo>` identifica el rol del proyecto. Ejemplos: `GestionDeTurnos.WebApi`, `GestionDeTurnos.Domain`, `GestionDeTurnos.Worker`. La excepción son los paquetes redistribuibles (`redistribuible: true`): en lugar de la raíz de la solución, arrancan con el prefijo de organización del perfil (`Aplicada` por defecto), para tener un espacio de nombres estable e independiente de la solución que los consume. Por ejemplo, un paquete de validaciones reusable se llama `Aplicada.Validaciones`, no `GestionDeTurnos.Validaciones`. Esta convención aplica solo al plano de código en `/src`; el plano de documentación sigue en Título-Con-Guiones sin cambios (por ejemplo `gestion-de-turnos-api`).

### F-19 — ¿Cuántos documentos de intake completo?

Uno solo: el `SOLUTION-INTAKE`. Es el intake unificado que reemplaza a las antiguas plantillas `PROJECT-BRIEF` y `PROJECT-README` (deprecadas). En él va todo: negocio (Parte A, §1 a §12), composición de la solución con la tabla de proyectos (Parte B, §13 a §16) y la técnica por proyecto (Parte C, §17, bloque P.1 a P.12 repetido por proyecto). No completás un `SOLUTION-MANIFEST` a mano: el orquestador lo deriva de §13 durante la Fase de validación de intake, lo valida y te lo presenta para confirmación. El manifiesto queda como artefacto derivado, no como plantilla a llenar.

### F-20 — ¿Puedo saltearme la validación de maqueta?

Sí. La Fase B2 es opcional por diseño. Al aprobar el plan inicial vas a ver el flag `requiere_maqueta` por proyecto; lo ponés en `false` y el flujo sigue como siempre, de la Fase B directo a la C. La omisión queda registrada como ADR en la categoría 05 del proyecto, con el motivo que declares.

Conviene saltearla cuando el proyecto no tiene interfaz visual, cuando estás reproduciendo un diseño ya validado en otro proyecto de la misma solución, o cuando el plazo es tan corto que no hay margen para iterar. Conviene hacerla cuando el cliente todavía no tiene claro qué espera ver, cuando el modelo de datos es grande, o cuando el equipo que va a codear no participó del análisis.

### F-21 — Modifiqué la maqueta a mano y el orquestador no toma mis cambios

Tenés que avisarle explícitamente. El orquestador no vigila el sistema de archivos: relee la maqueta cuando se lo pedís. Decile algo como:

```text
Edité a mano la maqueta. Revisá SDD/Maquetas/<Nombre-Proyecto>/ y tomá las
correcciones que hice.
```

Va a releer los archivos, comparar contra el estado que él había dejado, enumerarte las diferencias y decirte cómo las interpretó. Confirmás o corregís esa lectura, y recién ahí las propaga a la documentación. Ese paso de confirmación existe porque una corrección manual mal interpretada que se propaga es peor que no haberla tomado.

Si un cambio que le pedís por prompt entra en conflicto con algo que corregiste a mano, se detiene y pregunta en vez de pisarlo.

### F-22 — ¿Qué hago con la línea de base y la matriz de sensado de deriva?

Son el instrumento de control que te llevás a la codificación, y viven fuera del alcance de SDD, que termina en el handoff.

Qué son. La línea de base es el inventario de lo que aprobaste al mirar la maqueta: cada superficie, componente, estado y ruta de navegación con su identificador (`SUP-XX`, `CMP-XX`, `EST-XX`, `NAV-XX`), más el contrato de los campos que la maqueta exhibía (`DM-XX`). La matriz (`Matriz-Sensado-Deriva.md`, en la categoría 08) convierte ese inventario en una lista de comprobaciones, cada una con su método de verificación, la evidencia que la respalda y el umbral a partir del cual la diferencia deja de ser aceptable.

Cómo se usa. Al cierre de cada sprint, recorrés las filas de la matriz cuyos elementos tocó el sprint y las marcás como `Conforme`, `Deriva menor` o `Deriva mayor`. Una deriva menor se registra y sigue. Una deriva mayor se resuelve de una de dos maneras, nunca por omisión: se corrige el sistema para volver a la línea de base, o se actualiza la línea de base con tu aprobación explícita porque la construcción reveló que la línea de base estaba equivocada. Lo que no vale es que las dos se separen sin que nadie lo declare: eso es la deriva.

Para qué sirve de verdad. Le da a vos y al agente un punto de comparación externo y concreto. Sin él, la única forma de saber si lo construido es lo acordado es leer la documentación y confiar en la memoria. Con él, se abre la maqueta al lado del sistema y se mira.

### F-23 — ¿Qué es un modelo UX-UI y cuándo conviene capturar uno?

Un modelo UX-UI es un diseño completo, capturado de una maqueta que ya validaste y aprobaste, escrito como reglas constructivas para que un agente pueda reproducir algo equivalente en otro proyecto sin haber visto el original. Vive en `../IA.SDD/SDD/Devs/Modelos-UX-UI/` con su ejemplo ejecutable en `../IA.SDD/Templates/`.

No es lo mismo que el catálogo de reglas de diseño de `References/Design/`. Ese catálogo es el piso obligatorio y siempre aplica. Un modelo es opcional, se aplica por encima del piso y sale de la práctica, no del diseño metodológico.

Conviene capturar uno cuando el diseño que aprobaste resuelve bien un problema que se te va a repetir: un panel operativo denso, un flujo de alta guiado, un catálogo de consulta. No conviene cuando el diseño es muy específico del dominio del proyecto, porque entonces las reglas no se pueden formular de manera agnóstica y el modelo no sirve para reusar.

Tené presente que `IA.SDD` es un repositorio público. Cuando aceptás capitalizar un modelo, el orquestador ofusca todo el dominio antes de escribir: reemplaza entidades, campos, valores, textos y assets por equivalentes sintéticos, y preserva solo la forma. Si no puede completar esa verificación con certeza, no escribe nada.

### F-24 — ¿Por qué se intercambiaron las categorías 10 y 11?

Porque la dependencia real entre ellas iba al revés de como estaba declarada. Los ejemplos ejecutables son insumo de la documentación final, no al revés: la documentación los referencia, los contextualiza y los enlaza. Además, los ejemplos cumplen un segundo rol que solo tiene sentido durante la codificación —verificar que cada incremento sigue satisfaciendo los casos de uso—, así que tienen que existir antes.

Ahora la categoría 10 son los `Examples` y la 11 es la `Documentacion`. La formulación que hay que recordar: **10 demuestra con código ejecutable y verificable, 11 explica, referencia y enlaza esos ejemplos sin duplicar su código**.

Si tenés documentación generada con la numeración anterior, no se regenera sola. Ver §8 para la regeneración parcial.

### F-25 — ¿Cuándo se corre la Fase I y con qué cadencia?

Una vez por corte, y el corte por defecto es el **cierre de sprint**. El framework ya modela sprints en la categoría 07, así que no hace falta inventar un ritmo nuevo. Si tu equipo no trabaja por sprints, el corte es el cierre de cada incremento demostrable.

Hay un tercer disparador que rompe la cadencia a propósito: un cambio que altera un contrato público, un procedimiento de despliegue o una ruta de código citada se documenta **de inmediato**, sin esperar el corte. El motivo es práctico: un documento que apunta a una ruta que ya no existe es peor que no tener documento, porque manda al lector a buscar algo que no está y le hace perder la confianza en todo el resto.

La Fase I no arranca apenas hacés el handoff. Tiene una precondición dura: código fuente, al menos un sample implementado y tests que corran. Si no se cumple, el orquestador se detiene y te lo dice.

### F-26 — ¿Qué pasa si quiero saltearme la documentación incremental?

Podés, pero conviene entender qué perdés, porque no es lo que parece.

Lo obvio es que al final vas a tener que escribir todo junto, y va a costar más. Lo que no es obvio es lo otro: la actualización incremental funciona como **instrumento de control del diseño**, no como obligación administrativa. Cuando documentás el despliegue de un incremento y el procedimiento te sale enredado, eso es una señal de arquitectura. Cuando escribís el recorrido de código y no podés explicar dónde vive algo, eso es una señal de estructura. Las dos aparecen mientras todavía hay margen para corregir.

Si postergás todo al cierre, esas señales llegan cuando corregirlas es caro, y además el que escribe ya no recuerda por qué hizo las cosas así.

Formalmente, la actualización de la categoría 11 forma parte de la Definition of Done del sprint: el corte no se declara cerrado con documentos afectados sin revisar. Si decidís saltearla igual, registralo como decisión explícita, no lo dejes pasar en silencio.

### F-27 — ¿Cómo se relaciona `AGENTS.md` con el resto de la documentación?

`AGENTS.md` es el contrato de contexto para agentes de codificación, y vive en la **raíz de tu repositorio**, no dentro de `SDD/Docs/`. Es la única salida del orquestador que queda fuera de `SDD/`, y es a propósito: su valor depende de que las herramientas de agentes lo encuentren en la ruta convencional donde lo buscan.

Contiene lo que un agente necesita para trabajar en tu repositorio sin romper nada: cómo se construye el proyecto, cómo se corren los tests, convenciones de código y de commits, comandos de validación, límites de intervención, y punteros a los documentos de la categoría 11 por intención.

No se escribe a mano. Se **deriva** de `Contrato-Agentes.md`, que vive dentro de la carpeta de la categoría 11 y sí sigue la convención de nomenclatura del framework. Si los dos divergen, el contrato es la fuente y el `AGENTS.md` se regenera.

Se emite en la primera corrida de la Fase I y se refresca en todas las siguientes. No se reserva para el cierre, porque la Fase I es justamente el tramo donde los agentes están codificando y es cuando más lo necesitan.

### F-28 — ¿Cómo se corre un ensayo de entrega y qué hago si no se completa?

Un ensayo de entrega es una prueba de utilidad de la documentación: tomás el cuerpo documental en su estado actual y ejecutás con él una tarea real, sin ayuda externa. Es a la documentación lo que la validación de maqueta es al diseño.

Hay dos niveles y no hay que confundirlos:

| Nivel | Quién lo corre | Cuándo | Qué detecta |
| --- | --- | --- | --- |
| **Automatizado** | El agente | En cada Fase I | Comandos rotos, rutas inexistentes, prerrequisitos faltantes |
| **Humano** | Vos o alguien de tu equipo | En los cortes que elijas, y obligatoriamente en la Fase J | Lo que la documentación no dice pero hace falta saber |

El ensayo humano es un **gate**: sin él aprobado, la Fase J no cierra. Y no lo puede aprobar el agente que documentó, por la misma razón por la que no puede aprobar su propia maqueta: conoce el sistema porque acaba de documentarlo, y esa contaminación anula la prueba.

**Cómo se corre.** Elegí un guion según el rol:

- **Operador**: desplegá un servicio desde cero en una máquina limpia, siguiendo únicamente `Guia-Despliegue` y `Guia-Contenedor`.
- **Mantenedor**: ubicá una porción de código concreta e introducí una mejora acotada, siguiendo únicamente `Recorrido-Codigo` y `Guia-Contribucion`.
- **Integrador**: consumí una capacidad del sistema desde un cliente nuevo, siguiendo únicamente el cuerpo integrador.

**La regla de oro**: durante la corrida solo se lee la documentación. No le preguntás al equipo, no leés código fuera de lo que la documentación te indica leer, no usás lo que ya sabés del proyecto. **El momento en que tenés que salirte de la documentación es, exactamente, el hallazgo.**

**Qué hacer si no se completa.** Un ensayo que no se completa es un hallazgo P0 y no se cierra el corte con él abierto. El procedimiento es directo: anotá en qué paso te trabaste y qué tuviste que averiguar por fuera; convertí cada trabada en un hallazgo con **destino asignado**, es decir qué documento y qué sección lo tiene que absorber; corregí esos documentos; y volvé a correr el ensayo. El resultado queda registrado en el informe de audit de la fase, en `SDD/Docs/Audit/`.

Lo que no vale es completar la tarea usando conocimiento propio y declarar el ensayo aprobado. Eso no prueba que la documentación sirva: prueba que vos ya sabías.

### F-29 — ¿Cómo se registra y se triaja una eventualidad?

Una **eventualidad** es una situación que aparece al ejecutar el sistema en un entorno real y que ninguna vista de diseño podía anticipar. No es deriva: la deriva es apartarse de algo acordado, y acá no hay línea de base de la cual apartarse. Es conocimiento nuevo que hay que capturar antes de que se pierda.

Se registran en `Bitacora-Eventualidades.md`, de nivel solución, con identificador `EVE-XX`.

**Un caso completo, de punta a punta.** Un servicio se comunica con un dispositivo físico conectado por USB al host.

**Síntoma.** Al containerizarlo, el contenedor arranca, el healthcheck responde saludable y no se registra ninguna lectura del dispositivo. Sin errores en el log. Es la peor clase de falla: silenciosa.

**Diagnóstico.** El contenedor no tenía mapeado el dispositivo del host ni pertenencia al grupo que lo gobierna. La biblioteca de acceso falla en silencio cuando la ruta del dispositivo no existe.

**Intentos descartados.** Correr el contenedor con privilegios elevados funciona, pero es inaceptable en producción. Montar el dispositivo como volumen no aplica: es un dispositivo de caracteres, no un archivo. **Este campo es el que más tiempo le ahorra al siguiente**, y es el único lugar donde queda registrado: ningún documento permanente conserva lo que no funcionó.

**Resolución.** Mapear el dispositivo al contenedor y agregar el grupo correspondiente. Además, se agregó una verificación de existencia del dispositivo al arranque, para que la próxima vez falle ruidosamente en lugar de quedarse callada.

**Triaje.** Acá está el punto de toda la mecánica: la bitácora es un buffer de captura, **no el destino final**. Esta eventualidad es un requisito del entorno no declarado, así que se propaga a dos documentos permanentes:

1. `Guia-Contenedor.md`, sección «Dispositivos del host requeridos»: la ruta del dispositivo, la regla de acceso y cómo verificar que está disponible.
2. `Runbook-Operacion.md`, entrada `OPS-07` «El servicio no registra lecturas»: síntoma observable, diagnóstico paso a paso y resolución.

La entrada `EVE-03` de la bitácora queda con su campo `destino` apuntando a esos dos lugares.

**Regla dura**: ninguna eventualidad se cierra sin destino asignado. Si de verdad no aplica a ningún documento —porque no es reproducible o es un caso único sin valor para terceros— se marca explícitamente `No absorbida` con el motivo escrito. «Sin destino» no es un estado de cierre válido.

El triaje se ejecuta en cada corte de la Fase I, junto con la actualización incremental. Una eventualidad abierta desde hace más de un corte sin triaje es un hallazgo P0.

---

## §7 Cómo extender el template

El template está diseñado para evolucionar. Cualquier extensión sigue tres principios: la especialidad vive en la regla, no en el master-prompt; el cambio sube versión del artefacto modificado; el orquestador lee las reglas en cada ejecución sin necesidad de recompilar.

### 7.1 Agregar una categoría nueva

Imaginemos que querés agregar una categoría `12-Observabilidad/` para proyectos con requerimientos fuertes de observabilidad operativa.

Pasos:

1. Creá la carpeta `../IA.SDD/SDD/Devs/Rules/Rules-Observabilidad.md` siguiendo la estructura de las reglas existentes (§1 Especialidad, §2 Documentos, §3 Nomenclatura, §4 Estructura, §5 Preguntas guía, §6 Criterios, §7 Anti-patrones, §8 Prompt-snippet).
2. Definí la especialidad base (por ejemplo, "Site Reliability Engineer Senior") y las variantes por tipo D8.
3. Listá los documentos a producir: `Estrategia-Observabilidad.md`, `Dashboards.md`, `Alertas.md`, `runbooks/RB-XX-<Nombre>.md`, `README.md`.
4. Actualizá `../IA.SDD/SDD/Devs/Orchestrator/Master-Prompt.md` §6 (plan de generación por categoría) para incluir la nueva categoría. Subí minor del master-prompt.
5. Decidí en qué fase entra (si es transversal, queda como fase F o G; si es post-DevOps, queda como fase F2 nueva).
6. Probá el flujo completo con un proyecto piloto.

Tiempo estimado: medio día para la definición, otro medio día para la prueba.

### 7.2 Agregar un tipo de proyecto nuevo a D8

D8 son los 8 valores cerrados: `library`, `web-monolith`, `web-microservices`, `desktop-app`, `mobile-app-maui`, `rest-api`, `cli-tool`, `worker-service`. Agregar un tipo nuevo (por ejemplo `embedded-firmware`) implica:

1. Subir major del master-prompt (§3 y §14 cambian).
2. Actualizar cada uno de los 13 archivos de reglas para agregar la nueva variante en §1.2 y §2.2.
3. Documentar qué documentos pasan a ser obligatorios, recomendados u omitidos para ese tipo.
4. Actualizar la tabla de adaptabilidad de §14 del master-prompt.

Es un cambio de mayor envergadura, no se hace casual. Conviene mantener D8 estable y, si aparece una variante, ver si encaja en alguno de los 8 existentes (un firmware puede modelarse como `cli-tool` muy ajustado, por ejemplo).

### 7.3 Agregar una variante de especialidad

Caso más simple: dentro de una categoría existente, querés una variante adicional. Por ejemplo, en `Rules-Contexto.md` querés agregar "Product Manager + Compliance Officer" como variante para proyectos regulados.

Pasos:

1. Editás §1.2 del archivo de reglas correspondiente.
2. Agregás una fila a la tabla de variantes con el criterio de activación.
3. Si la activación depende de un flag (por ejemplo `requiere_compliance: true`), citás ese flag de §4 del master-prompt.
4. Subís minor del archivo de reglas.
5. El orquestador empieza a leer la variante en la próxima ejecución, sin tocar el master-prompt.

### 7.4 Agregar un modelo UX-UI al catálogo

La vía normal es aceptar la oferta del paso 7 de la Fase B2 (ver §4.6 y F-23): el orquestador extrae las reglas de la maqueta que aprobaste, las ofusca y las registra. No hace falta hacer nada a mano.

Si querés agregar un modelo por fuera de ese flujo, por ejemplo porque tenés un diseño validado en un proyecto anterior a la existencia de la fase:

1. Copiá `../IA.SDD/SDD/Devs/Modelos-UX-UI/Rules-Design-Modelo-Template.md` y completalo como `Rules-Design-<Nombre-Modelo>.md` en el mismo directorio. El criterio de qué incluir está en el encabezado de la plantilla: se escriben reglas accionables, no descripciones, y una regla entra si su ausencia haría que un diseño posterior salga distinto de forma perceptible.
2. Construí el ejemplo ejecutable en `../IA.SDD/Templates/<Nombre-Modelo>/`, derivándolo de `Templates/Modelo-Generico/`, que fija la estructura y el nivel de detalle esperados.
3. Registrá el modelo en la tabla de `../IA.SDD/SDD/Devs/Modelos-UX-UI/Index-Modelos-UX-UI.md` §2. Un modelo que no está en el índice no existe para el orquestador.
4. Verificá la ofuscación antes de commitear: ni nombres de clientes, ni datos reales, ni assets del proyecto de origen, ni decisiones que solo tengan sentido en su dominio.

Tiempo estimado: media jornada si partís de una maqueta ya construida.

---

## §8 Cómo regenerar parcialmente

Caso típico: el cliente cambia el alcance a mitad del proyecto. Por ejemplo, en el caso "API REST de turnos médicos", el cliente decide en el sprint 2 que sí va a haber app móvil nativa en v1 (estaba como Won't Have).

### 8.1 Identificar qué documentos están afectados

Pasos:

1. Actualizá el intake siguiendo §13 del master-prompt. Subí minor o major según corresponda.
2. Hacé un diff conceptual entre el intake anterior y el nuevo para identificar qué secciones cambiaron.
3. Mapeá esas secciones a categorías afectadas usando la tabla "Trazabilidad downstream" del `SOLUTION-INTAKE`:

| Sección del intake modificada | Categorías afectadas |
|---|---|
| §4 Alcance funcional | 00, 01, 02, 06, 07, 11 |
| §8 Métricas de éxito | 00, §17 P.10 (NFR) |
| §10 Restricciones | 00, 09 |
| §13 Tipo de un proyecto (tabla de proyectos) | TODAS las del proyecto afectado (es bloqueante, re-deriva el manifiesto) |
| §17 P.2 Estilo arquitectónico | 05 |
| §17 P.4 Persistencia | 02 (modelo conceptual), 05 (modelo lógico), 07 |
| §17 P.6 Testing | 08 |
| §17 P.8 Pipeline CI/CD | 09 |

### 8.2 Correr el orquestador parcialmente

Indicale al orquestador qué fases querés regenerar. Ejemplo:

```text
Cambió el alcance: la capacidad F-07 (app móvil nativa) pasó de
"Won't Have v1" a "Must Have". Actualicé el intake siguiendo §13.

Regenerá únicamente:
- 00-Contexto (actualización de alcance y roadmap)
- 01-Necesidades-Negocio (agregar NB nueva si aplica)
- 02-Especificacion-Funcional (agregar CU correspondientes)
- 06-Backlog-Tecnico (agregar US y BT)
- 07-Plan-Sprint (re-planificar Sprint 3 y 4)
- 10-Examples (agregar sample de cliente móvil si corresponde)

Mantené el resto intacto.
```

El orquestador valida que las categorías omitidas no estén impactadas, despacha los subagentes de las categorías listadas, regenera los documentos, dispara audits acotados y devuelve el resumen ejecutivo actualizado.

Importante: si la regeneración parcial detecta inconsistencias que no se pueden resolver sin tocar categorías no listadas, el orquestador se detiene y te pide ampliar el alcance del cambio.

---

## §9 Hojas de ruta sugeridas

Tres recorridos según tu perfil al acercarte al template.

### 9.1 Para principiantes en el template

Si nunca usaste SDD ni un template parecido, este es el orden de lectura recomendado:

1. Esta guía completa (§1 a §10). Tiempo estimado: 1 hora.
2. La plantilla `SOLUTION-INTAKE-template.md`. Leela completa, recorriendo sus tres partes: negocio (§1 a §12), composición con la tabla de proyectos de §13 (tipo D8 por proyecto) que define la jerarquía, y técnica por proyecto (§17, bloque P.1 a P.12). Mirá el ejemplo aplicado multi-proyecto y el caso degenerado. Tiempo estimado: 1 hora.
3. La regla `Intake-Rules.md`. Es la que dirige la Fase de validación de intake: cómo se valida la completitud del intake y cómo se deriva el `SOLUTION-MANIFEST` de §13. Tiempo estimado: 20 minutos.
4. La plantilla `SOLUTION-MANIFEST-template.md`. Leela como referencia del formato del artefacto que el orquestador deriva (no es una plantilla a llenar a mano). Tiempo estimado: 15 minutos.
5. Tres archivos de reglas a elección: `Rules-Contexto.md`, `Rules-Especificacion-Funcional.md` y `Rules-Arquitectura-Tecnica.md`. Tiempo estimado: 1 hora.
6. El master-prompt completo. Tiempo estimado: 45 minutos.

Ejercicios sugeridos:

- Ejercicio 1: tomá un proyecto chico que ya hayas hecho y completá manualmente el `SOLUTION-INTAKE` entero (Parte A negocio, Parte B composición, Parte C técnica). No corras el orquestador, solo hacé el intake. Ves dónde te trabás.
- Ejercicio 2: corré el orquestador sobre un proyecto sintético (podés usar el caso 5.2 de esta guía como inspiración). Hacé un commit por fase.
- Ejercicio 3: leé los audits que genera el orquestador y verificá si coincidís con sus hallazgos.

Total estimado de onboarding: una jornada y media de trabajo enfocado, sin contar la ejecución del orquestador.

### 9.2 Para equipos con experiencia previa SDD

Si ya trabajaron con la versión 1.0 del template (la del Motor DSL, referenciada al final de §1 de esta guía como antecedente histórico), las novedades de la 2.1 son:

- Plan-then-confirm explícito: ya no se ejecuta el orquestador de corrido, hay puntos de detención obligatorios.
- Principio de delegación de la especialidad: las reglas tienen prioridad sobre el master-prompt.
- 8 tipos D8 cerrados con variantes de especialidad por tipo.
- Auditoría independiente entre fases con veredicto bloqueante.
- Patrón de manejo de ambigüedad con detención / pregunta / reanudación.
- Reglas de no-modificación de intake con flujo controlado.
- Tabla de adaptabilidad por tipo de proyecto.

Pueden saltearse:

- §1 y §2 de esta guía (qué es el template y prerrequisitos).
- §4.1 y §4.2 (chat informal y consolidación), si ya tienen un flujo propio de pre-intake.
- La mayoría de los archivos de reglas si ya los conocen de la versión anterior (revisar solo los diffs).

Conviene leer con atención:

- §3 y §14 del master-prompt (tipos D8 y adaptabilidad).
- §5 y §10 del master-prompt (invariantes y auditoría).
- Los archivos de reglas que tengan §1.2 (variantes por tipo).
- Esta guía §7 y §8 (extensión y regeneración parcial).

### 9.3 Para evaluadores académicos

Si el template se usa en contexto académico (cátedra, evaluación de trabajos prácticos, jurado de tesis), los criterios de evaluación recomendados son:

- Conformidad D1 a D9 del entregable final (idioma, encoding, naming, versionado, política de deprecación, trazabilidad, vocabulario, conjunto cerrado D8, evidencia verificable D9).
- Completitud por categoría: cada una de las 12 categorías tiene los documentos obligatorios para su tipo.
- Trazabilidad cerrada: la cadena Visión → NB → CU → ADR → US → BT → Sprint → Test → Pipeline cierra sin huérfanos.
- Calidad de los audits: los informes de `SDD/Docs/Audit/` muestran hallazgos reales y veredictos justificados.
- Coherencia narrativa: el README raíz y los READMEs de cada categoría cuentan una historia coherente.

Una matriz de evaluación posible:

| Dimensión | Peso | Cómo evaluar |
|---|---|---|
| Intake completo y de calidad | 20% | Revisar el `SOLUTION-INTAKE` (Partes A, B y C), checklist §19 íntegramente tildado, ausencia de placeholders, manifiesto derivado coherente con §13 |
| Trazabilidad cerrada | 25% | Tomar 5 US al azar y verificar la cadena hacia arriba (CU, NB, Visión) y hacia abajo (BT, Sprint, Tests) |
| Calidad arquitectónica | 20% | Revisar ADRs: presencia de contexto, decisión, alternativas, consecuencias. Revisar diagrama de componentes coherente con CU |
| Estrategia de testing y pipeline | 15% | Cobertura mínima numérica, quality gates explícitos, pipeline con stages claros |
| Audits y veredictos | 10% | Revisar 2 o 3 informes de audit, verificar que los hallazgos son reales y los veredictos están justificados |
| Coherencia narrativa | 10% | Leer README raíz, visión, alcance y CU principales; verificar que se sostienen mutuamente |

Total: 100%.

---

## §10 Glosario rápido y mapa visual de carpetas

### 10.1 Glosario rápido

Términos esenciales para usar el template. Para el glosario exhaustivo del marco teórico, ver el documento correspondiente.

| Término | Definición breve |
|---|---|
| Solución | Contenedor de nivel superior que agrupa una jerarquía de N proyectos (N mayor o igual a 1). No tiene un D8 propio: lo declaran sus proyectos. |
| Proyecto | Unidad de la jerarquía de una solución. Lleva exactamente uno de los 8 tipos D8. Sobre cada proyecto se generan las categorías 02 a 11. |
| Manifiesto de solución | Documento `SOLUTION-MANIFEST-<Nombre-Solucion>.md`. Artefacto derivado por el orquestador a partir de §13 del intake (no lo completa el usuario): enumeración de proyectos, su D8, rol, dependencias, nombres de código derivados y perfil de nombres. Su grafo es acíclico (DAG). El usuario lo confirma; no lo escribe a mano. |
| Proyecto principal | El proyecto cabeza de la solución. El manifiesto declara exactamente uno; es una validación bloqueante. |
| Orden topológico | Orden de generación y build derivado del grafo de dependencias: primero los proyectos sin dependencias, luego los que dependen de proyectos ya resueltos. Ninguno arranca antes que sus dependencias. |
| Caso degenerado | Solución de un solo proyecto. El orquestador aplana el layout (00..11 directo bajo `docs/`, sin `Proyectos/<Nombre>/` ni `Solucion/`). Equivale al template de tipo único anterior. |
| Vista de solución | Artefacto de nivel solución (`Solucion/Vista-Solucion.md`), solo si hay más de un proyecto. Contiene el mapa de proyectos, los contratos inter-proyecto y el grafo de dependencias. |
| Pipeline de solución | Artefacto de nivel solución (`Solucion/Pipeline-Solucion.md`), solo si hay más de un proyecto. Contiene el orden de build topológico y la matriz de artefactos publicables por proyecto. |
| Intake | Documento único de entrada de la solución: el `SOLUTION-INTAKE`. Es fuente de verdad. Reemplaza a las antiguas plantillas PROJECT-BRIEF y PROJECT-README, hoy deprecadas. |
| SOLUTION-INTAKE | Plantilla de intake unificada `SOLUTION-INTAKE-<Nombre-Solucion>.md`, una por solución. Tres partes: A negocio (§1-§12), B composición con la tabla de proyectos de §13 (§13-§16), C técnica por proyecto (§17, bloque P.1-P.12), más §18 samples y §19 checklist. El único documento que completa el usuario. |
| Reconciliación normativa | Fase previa a todo, dirigida por `Master-Prompt.md` §2.1. Solo corre si `SDD/Docs/` del destino ya tiene contenido. Compara la versión del framework declarada en el bloque de procedencia del manifiesto contra la vigente, enumera los documentos potencialmente invalidados por los saltos major y ofrece tres salidas: plan de adecuación, regeneración desde cero o continuar bajo la versión de origen. No modifica nada. |
| Procedencia del framework | Bloque del `SOLUTION-MANIFEST` que declara bajo qué versión del framework y de qué reglas se generó la documentación del destino. Es lo que hace posible la reconciliación normativa. |
| Fase de validación de intake | Fase previa a la Fase A, dirigida por `Intake-Rules.md`. El orquestador valida la completitud del intake, emite una batería consolidada de preguntas si falta algo bloqueante, deriva el `SOLUTION-MANIFEST` de §13 y lo presenta para confirmación. |
| Master-prompt | Archivo único `../IA.SDD/SDD/Devs/Orchestrator/Master-Prompt.md` que ejecuta el orquestador. Es la instrucción que se pega en Claude Code. |
| Orquestador | Agente principal que coordina la generación de la documentación. Valida el intake, deriva el manifiesto de §13, valida la jerarquía, deriva nombres, ordena los proyectos en orden topológico, planifica, despacha subagentes y audita. |
| Subagente | Agente especializado que produce los documentos de una categoría. Su especialidad vive en §1 del archivo de reglas correspondiente. |
| Audit independiente | Revisión cierre de fase por un subagente auditor sin contexto previo. Veredicto bloqueante: APROBADO, APROBADO CON OBSERVACIONES o RECHAZADO. |
| Plan-then-confirm | Modo operativo: cada fase se planifica, se confirma con el usuario, se ejecuta, se audita, se detiene. |
| D8 | Conjunto cerrado de 8 tipos de proyecto: library, web-monolith, web-microservices, desktop-app, mobile-app-maui, rest-api, cli-tool, worker-service. Se elige uno por proyecto. El conjunto no cambia: siguen siendo 8. |
| Convención de nombres de código | Regla de nombres en `/src`: `<NombreSolucionCodigo>.<Sufijo>` (por ejemplo `GestionDeTurnos.WebApi`). Excepción para redistribuibles: arrancan con el prefijo de organización `Aplicada` (por ejemplo `Aplicada.Validaciones`). El plano de documentación sigue en Título-Con-Guiones. |
| Flag de gating | Variable derivada del intake que condiciona qué documentos se generan. Ejemplos: usa_llm, tiene_persistencia, equipo_n. |
| Cadena D6 | Cadena de trazabilidad: Visión → NB → CU → RN → ADR → US → BT → Sprint → Test → Pipeline. |
| Invariante | Decisión que no se renegocia durante la generación. Hay invariantes globales (D1 a D9) y propias del proyecto. |
| Ambigüedad legítima | Falta concreta de un dato bloqueante en el intake que dispara detención / pregunta / reanudación. |
| Handoff a codificación | Punto en el que el orquestador entrega la documentación auditada y espera confirmación humana para arrancar Sprint 1. |
| Regla constructiva | Archivo `Rules-<Categoria>.md` (o `Root-Rules.md`) que codifica especialidad, documentos, nomenclatura, estructura, criterios y prompt-snippet de la categoría. |
| Fase B2 | Fase opcional de validación visual de maqueta, por proyecto, entre la Fase B y la Fase C. Se activa con el flag `requiere_maqueta`. Materializa la especificación de 03 en una maqueta navegable, la valida con vos, retroalimenta la documentación y emite la línea de base del sensado de deriva. Su regla es `Maqueta-Rules.md`. |
| Maqueta | Sitio estático navegable en `SDD/Maquetas/<Nombre-Proyecto>/`: HTML, CSS, Bootstrap 5 y JavaScript, sin proceso de build, con los datos de ejemplo de la documentación hardcodeados. Sirve para validar de una sola vez la experiencia y el modelo de datos. No es el producto ni documentación viva: es la línea de base de un momento, aprobada explícitamente. |
| Modelo UX-UI | Diseño capturado de una maqueta aprobada, escrito como reglas constructivas en `Modelos-UX-UI/` con su ejemplo ofuscado en `Templates/`. Opcional; se aplica por encima del catálogo base de `References/Design/`, nunca en su reemplazo. |
| Línea de base visual | Inventario identificado (`SUP-XX` superficies, `CMP-XX` componentes, `EST-XX` estados, `NAV-XX` rutas) de lo aprobado en la maqueta, más el contrato de datos (`DM-XX`) que exhibía. Punto de comparación externo del sensado de deriva. |
| Sensado de deriva | Mecanismo de control que contrasta lo construido contra la línea de base visual y el contrato de datos, con umbrales declarados de deriva menor y mayor. Se opera con la `Matriz-Sensado-Deriva.md` de la categoría 08, sprint a sprint. Su regla es `Deriva-Rules.md`. |
| Evidencia verificable (D9) | Invariante global: toda afirmación sobre el estado del sistema cita un artefacto localizable, reproducible, contemporáneo e independiente de quien afirma. No aplica a afirmaciones de diseño, de especificación ni de contexto, que necesitan justificación y no evidencia. Rige hacia adelante desde su incorporación. |

### 10.2 Mapa visual de la estructura de carpetas

Árbol esperado de una solución multi-proyecto que aplica el template SDD. Para el caso degenerado (un solo proyecto), ver la nota al final.

```text
mi-proyecto/
├── SDD/
│   ├── devs/
│   │   ├── intake/
│   │   │   ├── SOLUTION-INTAKE-template.md               # Única plantilla a completar
│   │   │   ├── SOLUTION-MANIFEST-template.md             # Referencia del artefacto derivado
│   │   │   └── SOLUTION-INTAKE-<Nombre-Solucion>.md  # Tu intake unificado
│   │   ├── orchestrator/
│   │   │   └── Master-Prompt.md                          # Único prompt a pegar
│   │   ├── rules/
│   │   │   ├── Root-Rules.md                            # Reglas del README raíz
│   │   │   ├── Intake-Rules.md                          # Validación de intake y derivación del manifiesto
│   │   │   ├── Maqueta-Rules.md                         # Fase B2: validación visual de maqueta
│   │   │   ├── Deriva-Rules.md                          # Sensado de deriva y evidencia verificable (D9)
│   │   │   ├── Rules-Contexto.md
│   │   │   ├── Rules-Necesidades-Negocio.md
│   │   │   ├── Rules-Especificacion-Funcional.md
│   │   │   ├── Rules-UX-UI-DX.md
│   │   │   ├── Rules-Prompts-AI.md
│   │   │   ├── Rules-Arquitectura-Tecnica.md
│   │   │   ├── Rules-Backlog-Tecnico.md
│   │   │   ├── Rules-Plan-Sprint.md
│   │   │   ├── Rules-Calidad-Y-Pruebas.md
│   │   │   ├── Rules-Devops.md
│   │   │   ├── Rules-Documentacion.md
│   │   │   └── Rules-Examples.md
│   │   ├── references/                                  # Catálogo de reglas de diseño por stack, insumo de AG-03
│   │   │   └── design/
│   │   │       ├── Index-Design-Rules.md
│   │   │       ├── Design-Rules-Web-Generico.md
│   │   │       ├── Design-Rules-Blazor-Mudblazor.md
│   │   │       ├── Design-Rules-Config-Esquema.md      # Extensión por capacidad: configuración dirigida por esquema
│   │   │       ├── Design-Rules-Primer-Arranque.md     # Extensión por capacidad: primer arranque y aprovisionamiento inicial
│   │   │       ├── Design-Rules-Acceso-Monousuario.md  # Extensión por capacidad: acceso de operador único
│   │   │       └── Design-Rules-Identidad-De-Version.md # Extensión por capacidad: identidad de versión y su superficie
│   │   ├── Modelos-UX-UI/                               # Catálogo de modelos capturados de maquetas aprobadas (Fase B2)
│   │   │   ├── Index-Modelos-UX-UI.md
│   │   │   ├── Rules-Design-Modelo-Template.md          # Plantilla para capturar un modelo
│   │   │   └── Rules-Design-<Nombre-Modelo>.md     # Un archivo por modelo capturado
│   │   └── Bootstrap/                                   # Material de bootstrapping
│   ├── guides/
│   │   ├── Guia-Usuario-SDD.md                   # Este documento
│   │   └── Marco-Teorico-SDD.md                  # Marco teórico (separado)
│   ├── docs/                                             # Generado por el orquestador
│   │   ├── Audit/                                       # Informes de audit por fase
│   │   │   ├── FaseA-00-Contexto.md
│   │   │   ├── FaseA-01-Necesidades-Negocio.md
│   │   │   ├── FaseB-02-Especificacion-Funcional.md
│   │   │   └── ...
│   │   ├── 00-Contexto/                                  # Nivel solución (Fase A, una vez)
│   │   │   ├── README.md
│   │   │   ├── Vision-Producto.md
│   │   │   ├── Alcance-Proyecto.md
│   │   │   ├── Roadmap-Producto.md
│   │   │   ├── Compatibilidad-Plataformas.md
│   │   │   └── Acuerdo-Equipo.md
│   │   ├── 01-Necesidades-Negocio/                       # Nivel solución (Fase A, una vez)
│   │   │   ├── README.md
│   │   │   ├── Necesidades-Negocio.md
│   │   │   └── Necesidades-De-Negocio/
│   │   │       ├── NB-01-<Nombre>.md
│   │   │       ├── NB-02-<Nombre>.md
│   │   │       └── NB-XX-<Nombre>.md
│   │   ├── Solucion/                                    # Solo si hay más de un proyecto (Fase H)
│   │   │   ├── Vista-Solucion.md                    # AG-05: mapa, contratos, grafo
│   │   │   ├── Pipeline-Solucion.md                 # AG-09: build topológico, artefactos
│   │   │   └── 11-Documentacion/                         # AG-11: artefactos de nivel solución
│   │   │       ├── README.md                             # Matriz de ruteo actor x intención
│   │   │       ├── Vision-General-Sistema.md
│   │   │       ├── Guia-Inicio-Rapido.md
│   │   │       ├── Guia-Despliegue.md
│   │   │       ├── Bitacora-Eventualidades.md
│   │   │       └── Contrato-Agentes.md              # De acá se deriva AGENTS.md
│   │   ├── Proyectos/                                    # Un subárbol 02..11 por proyecto
│   │   │   └── <Nombre-Proyecto>/                  # Repetido por cada proyecto del manifiesto
│   │   │       ├── 02-Especificacion-Funcional/
│   │   │       │   ├── README.md
│   │   │       │   ├── Especificacion-Funcional.md
│   │   │       │   ├── Casos-De-Uso/
│   │   │       │   │   ├── CU-01-<Nombre>.md
│   │   │       │   │   └── CU-XX-<Nombre>.md
│   │   │       │   ├── Reglas-De-Negocio/
│   │   │       │   │   └── RN-XX-<Nombre>.md
│   │   │       │   └── Modelo-Datos/
│   │   │       │       └── Modelo-Conceptual.md
│   │   │       ├── 03-UX-UI-DX/
│   │   │       │   ├── README.md
│   │   │       │   └── (UX/UI o DX según gating)
│   │   │       ├── 04-Prompts-AI/                        # Solo si usa_llm == true
│   │   │       │   ├── README.md
│   │   │       │   └── prompt-<tarea>.md
│   │   │       ├── 05-Arquitectura-Tecnica/
│   │   │       │   ├── README.md
│   │   │       │   ├── Arquitectura-Solucion.md
│   │   │       │   ├── Decisiones-Arquitectura.md
│   │   │       │   └── Adrs/
│   │   │       │       ├── ADR-001-<Nombre>.md
│   │   │       │       └── ADR-XX-<Nombre>.md
│   │   │       ├── 06-Backlog-Tecnico/
│   │   │       │   ├── README.md
│   │   │       │   ├── Product-Backlog.md
│   │   │       │   ├── Backlog-Tecnico.md
│   │   │       │   └── Definition-Of-Ready.md
│   │   │       ├── 07-Plan-Sprint/
│   │   │       │   ├── README.md
│   │   │       │   ├── Plan-Iteracion-Sprint-00.md
│   │   │       │   ├── Plan-Iteracion-Sprint-01.md
│   │   │       │   ├── Template-Sprint-Review.md
│   │   │       │   ├── Template-Sprint-Retrospectiva.md
│   │   │       │   └── Velocidad-Equipo.md
│   │   │       ├── 08-Calidad-Y-Pruebas/
│   │   │       │   ├── README.md
│   │   │       │   ├── Estrategia-Calidad.md
│   │   │       │   ├── Estrategia-Testing.md
│   │   │       │   ├── Plan-Pruebas.md
│   │   │       │   ├── Matriz-Cobertura-Pruebas.md
│   │   │       │   ├── Casos-Prueba-Referenciales.md
│   │   │       │   ├── Criterios-Validacion.md
│   │   │       │   └── Definition-Of-Done.md
│   │   │       ├── 09-Devops/
│   │   │       │   ├── README.md
│   │   │       │   ├── Pipeline-CI-CD.md
│   │   │       │   ├── Estrategia-Versionado.md
│   │   │       │   ├── Entornos-Deploy.md
│   │   │       │   └── Supply-Chain-Seguridad.md
│   │   │       ├── 10-Examples/                          # Según gating y tipo; con contratos de verificación VER-XX
│   │   │       │   ├── README.md
│   │   │       │   ├── ejemplo-01-<Nombre>.md
│   │   │       │   ├── ejemplo-02-<Nombre>.md
│   │   │       │   └── ejemplo-03-<Nombre>.md
│   │   │       └── 11-Documentacion/                     # Siempre; qué cuerpos se materializan depende del tipo
│   │   │           ├── README.md
│   │   │           ├── Conceptos-Fundamentales.md
│   │   │           ├── Guia-Onboarding-Developer.md
│   │   │           ├── Referencia-API.md
│   │   │           └── Troubleshooting.md
│   │   └── README.md                                     # README raíz consolidado de la solución
│   └── Maquetas/                                         # Solo si algún proyecto ejecutó la Fase B2
│       └── <Nombre-Proyecto>/                            # Una maqueta por proyecto visual
│           ├── index.html                                # Punto de entrada con la navegación
│           ├── <Superficie>.html                         # Una superficie por archivo
│           ├── README.md
│           └── assets/
│               ├── css/                                  # Tokens del catálogo como variables CSS
│               ├── js/                                   # Datos-Maqueta.js (fuente única) y Maqueta.js
│               └── img/
├── src/                                                  # Código de la solución (fase posterior)
│   ├── <NombreSolucionCodigo>.<Sufijo>/                  # Un proyecto por nombre de código
│   └── Aplicada.<Paquete>/                               # Redistribuibles con prefijo Aplicada
├── tests/                                                # Tests (fase posterior)
├── samples/                                              # Materializado desde 10-Examples
├── AGENTS.md                                             # Contrato de contexto para agentes (Fase I)
└── README.md                                             # README de la raíz del repo
```

Notas sobre el árbol:

- Las carpetas marcadas con "según gating" se generan solo si los flags del intake las habilitan.
- Cada categoría tiene un README.md propio que es el índice navegable.
- `SDD/Docs/Audit/` se popula a medida que avanzan las fases.
- Las categorías `00-Contexto/` y `01-Necesidades-Negocio/` viven a nivel solución (se generan una vez en la Fase A). Las categorías `02` a `11` se repiten bajo `Proyectos/<Nombre-Proyecto>/`, un subárbol por proyecto del manifiesto.
- La carpeta `Solucion/` y sus dos artefactos (vista de solución y pipeline de solución) se generan solo cuando hay más de un proyecto.
- Caso degenerado (solución de un solo proyecto): el orquestador aplana el layout. Las categorías `00` a `11` van directo bajo `SDD/Docs/` (sin el subnivel `Proyectos/<Nombre>/` y sin la carpeta `Solucion/`), igual que en el árbol del template de tipo único. El README raíz se genera siempre.
- `AGENTS.md` vive en la raíz del repositorio, fuera de `SDD/`. Es la única salida del orquestador que no está bajo `SDD/`, y es a propósito: las herramientas de agentes lo buscan ahí. Se emite en la primera corrida de la Fase I.
- `SDD/Maquetas/` aparece solo si algún proyecto ejecutó la Fase B2. Es hermana de `SDD/Docs/` y no está dentro de ella: `SDD/Docs/` es exclusivamente prosa generada por el orquestador, y la maqueta es material ejecutable que vos editás a mano durante la validación.
- El catálogo de modelos UX-UI (`Devs/Modelos-UX-UI/`) y sus ejemplos ejecutables (`Templates/`, en la raíz del repositorio fuente `IA.SDD`, hermana de `SDD/`) viven del lado del template, no del repositorio destino. Se poblan solo si aceptás capitalizar el diseño de una maqueta aprobada.
- El árbol mostrado es el caso completo; tu solución va a tener algunas omisiones por proyecto según el `project_type` de cada uno y sus flags.

---

## Resumen ejecutivo

Esta guía de usuario está distribuida en 10 capítulos completos según la estructura solicitada, actualizada al modelo de solución más jerarquía de proyectos con intake unificado. Explica que una solución agrupa N proyectos (con N mayor o igual a 1), cada uno con uno de los 8 tipos D8, y que el usuario completa un único documento de intake: el SOLUTION-INTAKE (Parte A negocio §1-§12, Parte B composición con la tabla de proyectos de §13, Parte C técnica por proyecto §17 con bloque P.1-P.12), que reemplaza a las antiguas PROJECT-BRIEF y PROJECT-README. El SOLUTION-MANIFEST ya no lo completa el usuario: el orquestador lo deriva de §13 durante una Fase de validación de intake (previa a la Fase A, dirigida por Intake-Rules.md), que valida la completitud, emite una batería consolidada de preguntas si falta algo bloqueante y presenta el manifiesto derivado para confirmación. Incluye 4 mini-casos aplicados: tres soluciones de un proyecto (rest-api de gestión de turnos médicos, library de parsing CSV, mobile-app-maui de inventario de almacén), enmarcadas como caso degenerado, y una solución multi-proyecto (gestión de turnos con cuatro proyectos: api, domain, notificaciones y un paquete redistribuible) con su tabla de proyectos en §13, su manifiesto derivado, grafo de dependencias y orden topológico. Documenta además la Fase B2 de validación visual de maqueta, opcional y por proyecto: el orquestador materializa la especificación de la categoría 03 en una maqueta navegable (HTML, CSS, Bootstrap 5 y JavaScript estáticos, sin proceso de build), la abre en el navegador, la corrige por prompt o toma las correcciones manuales del humano, retroalimenta la documentación propagando hacia atrás y hacia adelante, ofrece capitalizar el diseño como modelo UX-UI reutilizable del template, y emite la línea de base del sensado de deriva, el instrumento con el que el equipo verifica sprint a sprint que lo construido sigue siendo lo aprobado. Aporta 23 entradas de FAQ con respuestas concretas y accionables. Ilustra explícitamente los 8 tipos D8 confirmados (library, web-monolith, web-microservices, desktop-app, mobile-app-maui, rest-api, cli-tool, worker-service) y la convención de nombres de código `<NombreSolucionCodigo>.<Sufijo>` con la excepción `Aplicada` para redistribuibles, junto con un mapa visual ASCII completo de la estructura de carpetas (00/01 a nivel solución, `Solucion/`, `Proyectos/<Nombre>/02..11/` y README raíz, con el aplanado del caso degenerado).

---

## Control de cambios

| Versión | Fecha | Cambios |
|---|---|---|
| 1.1 | 2026-06-10 | Actualización del contenido al modelo de solución más jerarquía de proyectos: intake de tres documentos (SOLUTION-MANIFEST + BRIEF + README de solución), generación por proyecto en orden topológico, layout con Proyectos/<Nombre>/ y Solucion/, caso degenerado aplanado, convención de nombres de código, caso aplicado multi-proyecto, FAQ y glosario ampliados. |
| 1.2 | 2026-06-10 | Actualización al intake unificado: el usuario completa un único documento SOLUTION-INTAKE; el SOLUTION-MANIFEST lo deriva el orquestador en la Fase de validación de intake con confirmación; flujo, casos, árbol, FAQ y glosario ajustados. |
| 1.3 | 2026-07-19 | Incorporación de la Fase B2 de validación visual de maqueta y del sensado de deriva. Se agrega la tabla de contenido del documento. Nuevo §4.6 (Paso 5b: elección de modelo UX-UI, plan de maqueta, construcción, validación en el navegador, las dos vías de corrección, retroalimentación obligatoria, captura de conocimiento y emisión de la línea de base), con el §4.6 anterior renumerado a §4.7. §4.5 suma la Fase B2 al listado de fases. Nuevo §7.4 (agregar un modelo UX-UI al catálogo). Cuatro entradas de FAQ nuevas (F-20 a F-23: saltear la fase, correcciones manuales no tomadas, uso de la línea de base y de la matriz de sensado, qué es un modelo UX-UI). Seis términos nuevos en el glosario (Fase B2, maqueta, modelo UX-UI, línea de base visual, sensado de deriva, evidencia verificable D9). El árbol de carpetas suma `SDD/Maquetas/`, las reglas `Maqueta-Rules.md` y `Deriva-Rules.md`, y el catálogo `Modelos-UX-UI/` con sus notas. |
| 1.4 | 2026-07-26 | Intercambio de categorías 10 ↔ 11: §2, §4 (fases F y G), §5 (casos aplicados) y §10 (mapa de carpetas) pasan a declarar `10-Examples` gobernada por `Rules-Examples.md` y `11-Documentacion` gobernada por `Rules-Documentacion.md`. Normalización del vocabulario de actores: «consumidor» pasa a «integrador». La reformulación de §4.7 y las entradas nuevas de FAQ son objeto de la versión siguiente. |
| 1.5 | 2026-07-26 | Actualización de cara al usuario tras la reformulación de las categorías 10 y 11 y la incorporación del ciclo de documentación viva. §4 renumera las categorías en el listado de fases, incorpora las Fases I y J y suma el §4.8 con el paso 7 del usuario, que describe el ciclo incremental posterior al handoff, su precondición, qué hace cada corrida y qué le toca al usuario. §4.7 deja de afirmar que el handoff cierra el alcance de SDD: cierra el tramo de especificación. §5 corrige las referencias a categorías en los casos aplicados. §6 suma seis entradas de FAQ, F-24 a F-29: el intercambio de categorías, la cadencia de la Fase I, las consecuencias de saltear la documentación incremental, la relación de `AGENTS.md` con el resto del cuerpo, cómo correr un ensayo de entrega y qué hacer cuando no se completa, y cómo se registra y triaja una eventualidad con el caso del dispositivo USB desarrollado de punta a punta. §10 actualiza el mapa de carpetas con la carpeta de nivel solución de la categoría 11, los contratos de verificación de la 10 y `AGENTS.md` en la raíz del repositorio. |

---

**Fin del documento**
