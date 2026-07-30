# PRODUCT-INTAKE-template

**Versión de la plantilla:** 2.1

Este campo versiona la **plantilla**. El campo `| Versión |` de la cabecera de abajo pertenece al documento de intake que la plantilla genera, y arranca en 1.0 en cada producto nuevo.

Plantilla metodológica SDD para producir el documento `PRODUCT-INTAKE-<Slug-Producto>.md`: el único documento de intake de un producto. Reúne el negocio (lo que el cliente quiere), la composición (qué proyectos de código componen el producto y cómo dependen entre sí) y la técnica de construcción (decisiones por proyecto de código). El orquestador lo lee, valida su completitud en la fase de validación de intake, deriva de él el `PRODUCT-MANIFEST` canónico (con tu confirmación) y recién entonces despacha la generación.

Reemplaza a las dos plantillas anteriores (`PROJECT-BRIEF-template.md` y `PROJECT-README-template.md`), que quedan deprecadas. El usuario completa un solo documento.

Estructura en tres partes:

- Parte A — Negocio del producto (§1 a §12). El qué y el porqué, en lenguaje del cliente. Es de nivel producto: el negocio es uno.
- Parte B — Composición del producto (§13 a §16). La jerarquía de proyectos de código tipados, el estilo de producto, la descomposición y la estructura de repositorio. El §13 es la fuente de la que el orquestador deriva el manifiesto.
- Parte C — Técnica por proyecto de código (§17 a §18). Las decisiones de construcción, en un bloque repetible por cada proyecto de código declarado en §13.
- Parte D — Anexos de datos (§20 a §21). Los escenarios y ejemplos de instancia (JSON completos, matrices de cobertura) que las Partes A y B citan por identificador. Es el único lugar del intake donde vive el dato crudo: el cuerpo referencia por ID, el anexo lo reproduce completo. **No es obligatoria: existe solo si las fuentes del intake aportan esos ejemplos. Pero si los aportan, el intake debe transcribirlos aquí en su totalidad, nunca dejar una referencia a un archivo externo que el orquestador después no pueda resolver.**

## Guía de uso de esta plantilla

1. Copiar este archivo como `PRODUCT-INTAKE-<Slug-Producto>.md` en `SDD/Intake/` del repositorio destino.
2. **Emitir la tabla de contenido** inmediatamente después de la cabecera, con enlaces ancla a cada sección de primer y segundo nivel. Es obligatoria y se regenera antes de entregar el intake al orquestador: un intake real supera con facilidad las dos mil líneas, y sin índice ni el humano ni el agente que lo lee por partes pueden ubicar una sección. La misma exigencia rige para los documentos que el framework genera; el intake no es la excepción, es el caso donde más hace falta.
3. Completar la cabecera y recorrer §1 a §19 en orden. Las preguntas guía marcadas con `(*)` son bloqueantes: el orquestador no avanza sin ellas.
4. Replicar el bloque técnico de §17 una vez por cada proyecto de código declarado en §13.
5. Borrar los bloques `Ejemplo` y `Lo que NO va en esta sección` una vez completado cada apartado.
6. Regla de autocontención: cuando una sección del cuerpo se apoye en un ejemplo de instancia (un escenario, un payload, un caso con datos), citarlo por identificador en el cuerpo (`E-1`, `E-2`, …) y transcribir su JSON completo en la Parte D (§20). Si las fuentes aportan esos ejemplos, la Parte D es obligatoria y debe contenerlos enteros; si no aportan ninguno, la Parte D se declara vacía con una línea que lo diga. **Prohibido dejar en el intake final una referencia a un archivo o repositorio externo como único respaldo de un dato: el orquestador aguas abajo no puede resolverla.**
7. Validar el §19 (checklist) antes de pasar el intake al orquestador.
8. Declarar `Versión: 1.0` en la cabecera en la primera emisión. El nombre del archivo no lleva la versión.

Para un producto de un solo proyecto de código (caso degenerado), §13 tiene una sola fila y §17 se replica una vez: el orquestador aplana el layout y reproduce el comportamiento del template de tipo único.

---

## Cabecera del documento

Bloque obligatorio al inicio. Reproducir y completar:

| Campo | Valor |
|---|---|
| `Nombre-Producto` | [Nombre del producto en prosa de negocio, con espacios y tildes. **No es un nombre de artefacto de código**] |
| `Raiz-Codigo` | [Raíz de la identidad de código, tal como la usa el ecosistema. Admite separadores de segmento. Se declara, no se deriva del nombre de negocio] |
| `Artefacto-Agrupacion` | [Nombre del agrupador de construcción: `<Raiz-Codigo>` más la extensión del ecosistema. Si el ecosistema no tiene convención única, declararlo] |
| Product Owner | [Persona que conoce el producto y es responsable del contenido de este documento] |
| Cliente / Stakeholder principal | [Persona, área u organización que la impulsa] |
| Repositorio | [Repositorio URL] |
| Lead técnico | [Nombre y rol] |
| Documento | `PRODUCT-INTAKE-<Slug-Producto>.md` |
| Versión | 1.0 |
| Fecha | [YYYY-MM-DD] |
| Stack principal | [Lenguaje + framework principal del producto] |
| Estado | Borrador / En revisión / Aprobado |

> Este documento captura qué quiere el cliente, cómo se compone el producto y cómo se construye cada proyecto de código.
> El orquestador deriva de §13 el `PRODUCT-MANIFEST` canónico; no completes el manifiesto a mano.
> `Slug-Producto` no se completa: el orquestador lo deriva de `Nombre-Producto` según `Master-Prompt.md` §3.2 y con él nombra este archivo.

**Los cuatro nombres del producto no son el mismo nombre escrito distinto.** `Nombre-Producto` es una decisión de negocio y `Raiz-Codigo` es una decisión técnica, muchas veces ya tomada antes de que este documento exista; son independientes por diseño y esta cabecera los recibe por separado para que ninguno tenga que ocupar el lugar del otro. El vocabulario completo, con sus cuatro planos, vive en [`Vocabulario-Rules.md`](../Rules/Vocabulario-Rules.md) §3.

Ejemplo, para un producto de gestión de turnos médicos de la organización Contoso:

| Campo | Valor |
|---|---|
| `Nombre-Producto` | Gestión de Turnos |
| `Slug-Producto` | `Gestion-De-Turnos` (derivado, no se completa) |
| `Raiz-Codigo` | `Contoso.Turnos` |
| `Artefacto-Agrupacion` | `Contoso.Turnos.sln` |

**Quién es responsable de este documento.** El **Product Owner** es el autor responsable: es quien conoce el producto al detalle, reúne el material que lo define y aprueba el resultado. La redacción puede estar asistida por un agente que estructura ese material bajo esta plantilla, pero la autoría del contenido y la aprobación no se delegan. El Product Owner es además el dueño de las decisiones de producto que este documento registra —la priorización MoSCoW de §4 y las exclusiones de §9—, y ninguna especialidad aguas abajo las toma por él: si faltan, la generación se detiene y pregunta.

## Tabla de contenido

Bloque obligatorio, inmediatamente después de la cabecera. Enumerar cada sección de primer y segundo nivel con enlace ancla, en el orden en que aparecen, incluidas las Partes A a D y el checklist de §19. Se regenera antes de entregar el intake al orquestador, para que ninguna sección agregada durante la redacción quede fuera del índice.

Formato:

```markdown
- [Parte A — Negocio del producto](#parte-a--negocio-del-producto)
  - [§1 Idea y problema](#1-idea-y-problema)
  - [§2 …](#2-)
- [Parte B — Composición del producto](#parte-b--composición-del-producto)
  - …
- [Parte D — Anexos de datos](#parte-d--anexos-de-datos)
  - [§20 Anexo A — Escenarios con ejemplos completos](#20-anexo-a--escenarios-con-ejemplos-completos)
    - [§20.E-1 · …](#20e-1--)
- [§19 Checklist de completitud del intake](#19-checklist-de-completitud-del-intake)
```

En la Parte D, listar además cada escenario por su identificador: es la parte que más crece y la que otros documentos citan por ID, así que su índice es lo que permite resolver una cita sin recorrer el archivo entero.

---

# Parte A — Negocio del producto

## §1 Idea y problema

Instrucción: Describir en lenguaje del cliente qué dolor concreto motival producto y por qué ahora. Dos a cuatro párrafos: qué pasa hoy, a quién le duele, y la consecuencia de no resolverlo.

Preguntas guía:
- (*) ¿Qué problema concreto resuelve el producto y a quién le pasa hoy?
- (*) ¿Qué pasa si NO se construye en los próximos meses?
- ¿Por qué ahora? ¿Hay un disparador externo (regulación, competencia, crecimiento)?

Ejemplo (sistema de turnos médicos): Hoy los pacientes solo sacan turno por teléfono en horario de atención, lo que satura la línea y genera esperas. Si no se resuelve, se pierden pacientes contra clínicas con reserva online.

Lo que NO va en esta sección:
- Stack, frameworks, decisiones de arquitectura (van a la Parte C).
- Estimaciones de esfuerzo o sprint plan.

---

## §2 Audiencia y stakeholders

Instrucción: Identificar a quién usal producto día a día, quién paga y quién decide su rumbo. Completar la tabla con al menos un representante por categoría (propietario, implementador, beneficiario). Sin genéricos como "los usuarios".

Un stakeholder y el Product Owner no son lo mismo, y conviene no fusionarlos en una sola respuesta. El **stakeholder** aporta un interés parcial y legítimo: pide, se queja, juzga, y puede pedir cosas incompatibles con las de otro stakeholder. El **Product Owner** arbitra entre esos intereses y cierra. El Product Owner cae en la categoría «propietario» de la tríada, pero no la agota: quien financia también es propietario y no por eso es el Product Owner.

Preguntas guía:
- (*) ¿Quién es el Product Owner: la persona que conoce el producto, redacta este documento, arbitra entre intereses en conflicto y aprueba el intake?
- (*) ¿Quién es el propietario del problema, entendido como categoría de stakeholder: quién lo padece, quién financia y quién decide el rumbo?
- (*) ¿Quiénes son los usuarios finales y qué rol cumple cada uno?
- (*) ¿Cuántas personas componen el equipo de desarrollo? De este dato deriva el flag `equipo_n` (`Master-Prompt.md` §4), que condiciona la emisión de `Acuerdo-Equipo.md` y la forma del plan de sprint de la categoría 07.
- ¿Hay actores indirectos (auditoría, legal, soporte)?

Ejemplo:

| Rol | Nombre o cargo | Categoría | Responsabilidad principal |
|---|---|---|---|
| Product Owner | [Nombre] | Propietario | Redacta y aprueba el intake; arbitra prioridades y exclusiones |
| Dueño del problema | [Nombre] | Propietario | Padece el problema, financia o decide el rumbo |
| Equipo de desarrollo | [Estudio/equipo, N personas] | Implementador | Construye y mantiene |
| Usuarios finales | [Rol] | Beneficiario | Operan el producto |

Lo que NO va en esta sección:
- Roles técnicos internos del equipo (eso es Parte C).
- Permisos o perfiles de seguridad (eso es especificación funcional / §17 P.5).

---

## §3 Propuesta de valor y diferenciación

Instrucción: Explicar qué hace el producto mejor o distinto que la alternativa actual (sistema viejo, planilla manual, competencia o no hacer nada). Una o dos frases por diferenciador, máximo cinco.

Preguntas guía:
- (*) ¿Qué hace hoy el cliente y por qué no le alcanza?
- (*) ¿Cuál es la promesa central que justifica el proyecto de código?
- ¿Cuál es el diferenciador defendible si la competencia copia la funcionalidad?

Ejemplo (CLI de migración): Hoy el equipo migra con scripts SQL ad-hoc. La promesa es ejecutar migraciones declarativas con un comando, con reporte de filas migradas y fallidas y reintento de lo fallido.

Lo que NO va en esta sección:
- Listas exhaustivas de funcionalidades (eso va a §4).
- Lenguaje de marketing vacío.

---

## §4 Alcance funcional pretendido (MoSCoW)

Instrucción: Listar las capacidades funcionales, sin implementación, cada una con etiqueta MoSCoW provisoria (Must / Should / Could / Won't Have v1). Si todo es Must, no hay priorización.

Preguntas guía:
- (*) ¿Cuál es el conjunto mínimo de capacidades sin el cual el producto no resuelve el problema?
- (*) ¿Qué capacidades son importantes pero pueden esperar?
- ¿Hay capacidades para una versión futura, no la inicial?

Ejemplo:

| ID | Capacidad | MoSCoW |
|---|---|---|
| F-01 | [Capacidad mínima] | Must Have |
| F-02 | [Capacidad importante] | Should Have |
| F-03 | [Capacidad deseable] | Could Have |
| F-04 | [Fuera de v1] | Won't Have v1 |

Lo que NO va en esta sección:
- Algoritmos, estructuras de datos, firmas de métodos.
- Detalles de UI concretos.

---

## §5 Historias de usuario / experiencias deseadas

Instrucción: Describir el producto desde quien la usa, en formato `Como [rol], quiero [acción], para [valor]`. Mínimo tres, cubriendo al menos dos roles si hay más de un actor.

Preguntas guía:
- (*) ¿Quiénes operan el producto y qué quiere lograr cada uno?
- (*) ¿Cuáles son las tres acciones más frecuentes de un usuario típico?
- ¿Hay acciones raras pero críticas (cierre de mes, baja de cuenta)?

Ejemplo: Como encargado de depósito, quiero escanear un código de barras con la cámara, para registrar la entrada sin tipear.

Lo que NO va en esta sección:
- Criterios de aceptación detallados (van al refinamiento de cada US).
- Wireframes o restricciones técnicas.

---

## §6 Flujos típicos

Instrucción: Narrar dos o tres recorridos representativos del uso normal, en lenguaje coloquial, cuatro a ocho pasos cada uno. Sin diagramas formales.

Preguntas guía:
- (*) ¿Cuál es el flujo más frecuente, el del 80 % del tiempo?
- ¿Hay un flujo crítico que rara vez pasa pero no puede fallar? ¿Cuál es el onboarding de un usuario nuevo?

Lo que NO va en esta sección:
- Diagramas UML/BPMN, endpoints, payloads.
- Implementación interna (colas, retries).

---

## §7 Casos límite y "qué pasa si"

Instrucción: Listar las preguntas incómodas que el cliente debe responder antes de construir. Mínimo cinco, cada una con espacio para la respuesta del cliente.

Preguntas guía:
- (*) ¿Qué pasa si dos personas hacen la misma operación a la vez?
- (*) ¿Qué pasa si se pierde la conexión en medio de una operación?
- ¿Qué pasa si un dato obligatorio llega vacío o mal formado? ¿Si alguien quiere borrar su cuenta o sus datos?

Lo que NO va en esta sección:
- Productos técnicas (retries, locks, idempotencia): acá va el "qué", no el "cómo".

---

## §8 Métricas de éxito desde el negocio

Instrucción: Establecer métricas SMART de negocio (específicas, medibles, alcanzables, relevantes, temporales). Mínimo tres, cada una con criterio, unidad, target y plazo. Son métricas de resultado de negocio, distintas de los NFR técnicos de §17 P.10.

Preguntas guía:
- (*) ¿Cómo sabemos, en seis meses, si fue exitoso?
- (*) ¿Qué número concreto le hace decir al cliente "valió la pena"?
- ¿Qué métricas de hoy vamos a poder comparar antes y después?

Ejemplo:

| Criterio | Métrica | Target | Plazo |
|---|---|---|---|
| Adopción del canal digital | % de operaciones online sobre el total | ≥ 40 % | 6 meses post-lanzamiento |

Lo que NO va en esta sección:
- Métricas técnicas (latencia p99, throughput, uptime): van a §17 P.10.
- Métricas de proceso de desarrollo (velocity, cobertura).

---

## §9 Lo que NO es este producto (exclusiones)

Instrucción: Declarar explícitamente qué NO va a hacer el producto, con justificación. Mínimo tres exclusiones; cada una explica por qué queda afuera y, si aplica, cuándo podría incorporarse.

Preguntas guía:
- (*) ¿Qué se pidió y se decidió dejar afuera de esta versión?
- (*) ¿Qué supuestos del equipo serían incorrectos?
- ¿Qué integraciones quedan fuera de alcance aunque parezcan obvias?

Lo que NO va en esta sección:
- Capacidades que sí están dentro del alcance (van a §4).
- Exclusiones sin justificación.

---

## §10 Restricciones del cliente

Instrucción: Documentar restricciones externas: presupuesto orientativo, fecha objetivo, restricciones legales o regulatorias, integraciones obligatorias con sistemas existentes. No son negociables a nivel técnico. Distintas de los trade-offs técnicos autoimpuestos de §17 P.12.

Preguntas guía:
- (*) ¿Hay fecha objetivo concreta y qué la motiva?
- (*) ¿Cuál es el presupuesto orientativo o el rango?
- ¿Hay normativas que cumplir? ¿Sistemas con los que integrar sí o sí?

Lo que NO va en esta sección:
- Restricciones técnicas autoimpuestas por el equipo (van a §17 P.12).
- Decisiones de arquitectura derivadas (van a los ADR).

---

## §11 Riesgos detectados desde el negocio

Instrucción: Listar los riesgos del dominio que el cliente conoce o intuye, con probabilidad cualitativa, impacto y mitigación. Mínimo tres. Foco en riesgos de negocio, no en riesgos técnicos generales.

Preguntas guía:
- (*) ¿Qué le quita el sueño al cliente sobre este producto?
- (*) ¿Hubo un intento previo y por qué falló?
- ¿Qué supuesto crítico, si se rompe, hace inviable el resultado?

Lo que NO va en esta sección:
- Riesgos técnicos puros (deuda técnica, refactor): van a §17 P.12.

---

## §12 Glosario del dominio del cliente

Instrucción: Definir los términos del dominio del cliente que el equipo técnico necesita aprender. Mínimo cinco, en una o dos frases, con sinónimos si los hay.

Preguntas guía:
- (*) ¿Qué palabras usa el cliente que el equipo no entendería de entrada?
- ¿Hay términos que parecen comunes pero significan algo distinto acá? ¿Siglas del rubro?

Lo que NO va en esta sección:
- Términos técnicos universales del software (API, base de datos, framework).

---

# Parte B — Composición del producto

## §13 Proyectos de código del producto

Instrucción: Enumerar los proyectos de código que componen el producto. Cada proyecto de código lleva exactamente uno de los 8 valores cerrados D8. De esta tabla el orquestador deriva el `PRODUCT-MANIFEST` canónico; revisala con cuidado. No se elige un único tipo paral producto: el producto es compuesta. Un producto de un proyecto de código es el caso degenerado (una sola fila).

Preguntas guía:
- (*) ¿Qué proyectos de código componen el producto y qué valor D8 lleva cada uno?
- (*) ¿Cuál es el proyecto de código principal (cabeza del producto)?
- (*) ¿Qué dependencias hay entre proyectos de código? ¿El grafo es acíclico?
- ¿Algún proyecto de código se publica como paquete redistribuible independiente del producto?

Valores cerrados D8, exactamente 8:

```text
library, web-monolith, web-microservices, desktop-app, mobile-app-maui, rest-api, cli-tool, worker-service
```

Tabla de proyectos de código (fuente del manifiesto derivado):

| `Nombre-Proyecto-Codigo` | `tipo_proyecto_codigo` (D8) | Rol en el producto | Dependencias | `redistribuible` |
|---|---|---|---|---|
| [Nombre-Proyecto-Codigo] (principal) | [uno de los 8 D8] | [una frase] | [lista de Nombre-Proyecto-Codigo o vacío] | [true / false] |

Perfil de convención de nombres de código (el orquestador deriva los nombres `/src` con esta regla):

| Parámetro | Valor por defecto | Notas |
|---|---|---|
| `Raiz-Codigo` | — | **Se declara en la cabecera, no se deriva.** Admite separadores de segmento: `Contoso.Turnos` es un valor válido |
| Separador de segmentos | `.` | Separa la raíz de código del sufijo de rol, y también los segmentos internos de la propia raíz |
| Prefijo de paquetes redistribuibles | `Aplicada` | Reemplaza la raíz de código cuando `redistribuible: true` |
| Extensión del agrupador | la del ecosistema | Con `Raiz-Codigo` compone `Artefacto-Agrupacion` |

Regla de nombres de código: cada proyecto de código se nombra `<Raiz-Codigo>.<Sufijo>` (por ejemplo `Contoso.Turnos.WebApi`, `Contoso.Turnos.Domain`); los redistribuibles arrancan con el prefijo de organización (`Aplicada.Validaciones`). La regla es agnóstica de stack a propósito.

Los nombres de código resultantes deben coincidir con los directorios de `/src` de §16. Si el repositorio ya existe, `Raiz-Codigo` se toma de él y no se inventa: la identidad de código preexistente manda sobre cualquier derivación.

Lo que NO va en esta sección:
- Decisiones técnicas internas de cada proyecto de código (van a §17).
- El árbol de carpetas completo (va a §16).

---

## §14 Estilo arquitectónico del producto

Instrucción: Describir a alto nivel cómo se componen los proyectos de código entre sí: quién depende de quién, qué expone cada proyecto de código a sus dependientes y por qué la jerarquía es la elegida. El detalle interno de cada proyecto de código va a §17 P.2 y a `05-Arquitectura-Tecnica/`.

Preguntas guía:
- (*) ¿Cómo se relacionan los proyectos de código y qué contrato expone cada uno a sus dependientes?
- (*) ¿Por qué esta descomposición y no otra (un monolito, más microservicios)?
- ¿Qué proyecto de código es el punto de entrada para el usuario final? ¿Hay proyectos de código compartidos (dominio, validaciones)?

Lo que NO va en esta sección:
- Detalle de capas internas de cada proyecto de código (va a §17 P.2 y a 05).
- Diagramas formales de despliegue (van a 05 y a la vista de producto).

---

## §15 Esquema de descomposición y delivery

Instrucción: Declarar la estrategia de descomposición del trabajo en el tiempo (vertical slicing, walking skeleton, thin slice) y justificarla. Criterio bloqueante: el primer sprint entrega valor demostrable end-to-end a través de la jerarquía.

Preguntas guía:
- (*) ¿El primer sprint entrega valor demostrable end-to-end a través de la jerarquía?
- (*) ¿La descomposición es vertical (rebanadas funcionales) u horizontal (capas/proyectos de código por sprint)?
- ¿En qué orden se construyen los proyectos de código según sus dependencias (orden topológico)?

Ejemplo (producto multi-proyecto): walking skeleton en Sprint 0 que atraviesa el paquete de validaciones, el dominio y la API para una operación mínima end-to-end; el worker y el resto de las capacidades se agregan en sprints posteriores manteniendo el camino end-to-end. El orden de construcción respeta el orden topológico de las dependencias de §13.

Lo que NO va en esta sección:
- Plan de sprint con US/BT (va a `07-Plan-Sprint/`).

---

## §16 Estructura de repositorio del producto

Instrucción: Proponer el árbol `tree` con `/src`, `/tests`, `/samples` y la carpeta `SDD/` del framework. Se deriva de la jerarquía de §13 y de la convención de nombres: cada proyecto de código es `src/<NombreProyectoCodigo>/`, salvo redistribuibles con prefijo de organización. Incluir la subsección §16.1 sobre `/samples`.

Las rutas del framework no se eligen: las fija `Master-Prompt.md` §3.5. El intake va en `SDD/Intake/`, la documentación generada en `SDD/Docs/` y las maquetas de la Fase B2 en `SDD/Maquetas/`. Lo único que esta sección propone es el árbol de código.

Preguntas guía:
- (*) ¿Cada proyecto de código de §13 tiene su carpeta en `/src` con su nombre de código?
- (*) ¿La estructura sigue las convenciones del ecosistema del lenguaje?
- ¿Los redistribuibles arrancan con el prefijo de organización?

Ejemplo (producto Gestión de Turnos):
```text
Gestion-De-Turnos/
├── src/
│   ├── GestionDeTurnos.WebApi/         # rest-api (principal)
│   ├── GestionDeTurnos.Domain/         # library de dominio
│   ├── GestionDeTurnos.Worker/         # worker-service
│   └── Aplicada.Validaciones/          # library redistribuible
├── tests/
├── samples/
└── SDD/
    ├── Intake/                         # PRODUCT-INTAKE y PRODUCT-MANIFEST derivado
    ├── Docs/                           # categorías 00-11 (por proyecto de código bajo Proyectos/<Nombre-Proyecto-Codigo>/)
    └── Maquetas/                       # solo si algún proyecto de código ejecuta la Fase B2
```

### §16.1 Materialización de `/samples`

Instrucción: Describir cómo se materializan los samples según el tipo D8 de cada proyecto de código que los produce. Cada sample autocontenido, ejecutable, con su nivel de complejidad.

| Tipo D8 | Qué hay en `/samples` |
|---|---|
| `library` | Apps integradoras progresivas vía package manager |
| `rest-api` | Cliente HTTP de referencia, colección de pruebas, SDK |
| `cli-tool` | Recetas de uso por OS |
| `worker-service` | Productor de prueba + compose con broker |
| (otros tipos) | Según la tabla de adaptabilidad del orquestador |

Lo que NO va en esta sección:
- Contenido detallado de los samples (va a `10-Examples/`).

---

# Parte C — Técnica por proyecto de código

## §17 Bloque técnico por proyecto de código (plantilla repetible)

Instrucción: Para cada proyecto de código declarado en §13, copiar el bloque de identidad más las subsecciones P.1 a P.12 y completarlas. Si el producto tiene N proyectos de código, este bloque aparece N veces. Cada proyecto de código es autocontenido.

Identidad del proyecto de código (repetir por proyecto de código):

| Campo | Valor |
|---|---|
| `Nombre-Proyecto-Codigo` | [Nombre-Proyecto-Codigo] |
| `Identidad-Codigo` | [`<Raiz-Codigo>.<Sufijo>` o `Aplicada.<X>`] |
| `tipo_proyecto_codigo` (D8) | [uno de los 8] |
| Rol | [una frase] |
| `redistribuible` | [true / false] |

### §17.P.1 Stack tecnológico
Instrucción: Lenguaje, versión, runtime, framework y plataformas target del proyecto de código, con las dependencias core justificadas.
Preguntas guía: (*) ¿Versión mínima del lenguaje y runtime? (*) ¿Dependencias core sin las que no compila?

### §17.P.2 Estilo arquitectónico del proyecto de código
Instrucción: Estilo interno (capas, hexagonal, pipeline, event-driven) justificado contra dos alternativas. Coherente con su `tipo_proyecto_codigo` y con §14.
Preguntas guía: (*) ¿Qué estilo y por qué? (*) ¿Qué dos alternativas se descartaron?

### §17.P.3 Comunicación e integración
Instrucción: Protocolo, formato de payload, versión de contratos y política de breaking changes. Los contratos hacia otros proyectos de código deben ser coherentes con las dependencias de §13. Si no aplica, "No aplica" con justificación.
Preguntas guía: (*) ¿Protocolos sincrónicos y asincrónicos? (*) ¿Cómo se versionan los contratos? ¿Qué expone a sus dependientes?

### §17.P.4 Persistencia
Instrucción: Qué guarda, dónde, cómo se versiona el esquema, patrones de acceso, multi-tenant si aplica. Si no hay persistencia, "No aplica".
Preguntas guía: (*) ¿Motor y por qué? (*) ¿Cómo se versiona el esquema? ¿Multi-tenant?

### §17.P.5 Seguridad y autenticación
Instrucción: Autenticación, autorización y manejo de secretos del proyecto de código, en runtime y en CI/CD.
Preguntas guía: (*) ¿Mecanismo de autenticación y dónde reside el Identity Provider? (*) ¿Dónde viven los secretos? ¿Compliance?

### §17.P.6 Estrategia de testing
Instrucción: Pirámide con porcentajes, cobertura mínima numérica (gate del CI), frameworks por nivel, BDD/ATDD. La cobertura mínima es bloqueante y numérica.
Preguntas guía: (*) ¿Cobertura mínima de líneas y branches? (*) ¿Frameworks por nivel? ¿Tests de contrato hacia otros proyectos de código?

### §17.P.7 Estrategia de versionado y release
Instrucción: SemVer 2.0.0 y Conventional Commits; herramienta de cálculo de versión, branching, canales, feed.
Preguntas guía: (*) ¿SemVer y Conventional Commits sin excepciones? (*) ¿Qué herramienta calcula la versión? ¿Canales y dónde se publica?

### §17.P.8 Pipeline CI/CD
Instrucción: Stages (build, test, lint, SCA, SBOM, firma, publicación), matriz de SO/runtime, ambientes; cada stage con quality gate explícito. La cobertura mínima coincide con P.6.
Preguntas guía: (*) ¿Plataforma de CI? (*) ¿Quality gates bloqueantes para mergear? ¿Cómo se hace rollback?

### §17.P.9 Compatibilidad y plataformas target
Instrucción: SO, runtimes, navegadores, dispositivos y versiones mínimas, coherentes con el `tipo_proyecto_codigo`. Toda combinación no listada se considera no soportada.
Preguntas guía: (*) ¿Plataformas target? (*) ¿Versión mínima de cada runtime/SO?

### §17.P.10 Requerimientos no funcionales (NFR)
Instrucción: Métricas numéricas de performance, escalabilidad, disponibilidad, observabilidad y compliance del proyecto de código. Cada métrica medible. NFR vagos no se aceptan. Distintos de las métricas de negocio de §8.
Preguntas guía: (*) ¿Latencia objetivo p99 y throughput mínimo? (*) ¿SLO de disponibilidad? ¿Qué se loguea, mide y traza?

### §17.P.11 Decisiones técnicas pre-tomadas (pre-ADR)
Instrucción: Decisiones cerradas antes del Sprint 0 con justificación y alternativas. Se convierten en ADRs en `05-Arquitectura-Tecnica/`.
Preguntas guía: (*) ¿Decisiones cerradas y por qué? (*) ¿Alternativas evaluadas? ¿Qué queda abierto para Sprint 0?

### §17.P.12 Restricciones técnicas y trade-offs aceptados
Instrucción: A qué renuncia el proyecto de código conscientemente para ganar otra cosa. Distintos de las restricciones del cliente de §10.
Preguntas guía: (*) ¿Qué ganancias se priorizaron y a costa de qué? (*) ¿Restricciones del ecosistema? ¿Qué cargas no soporta?

Lo que NO va en el bloque técnico:
- Necesidades de negocio (van a la Parte A).
- ADRs formales (viven en `05-Arquitectura-Tecnica/`).

---

## §18 Estrategia de demo / samples

Instrucción: Detallar qué samples se construyen en `/samples`, qué proyecto de código del producto ilustra cada uno, su nivel de complejidad y cómo se vincula a `/src`. Cada sample autocontenido y reproducible en cinco pasos o menos.

Preguntas guía:
- (*) ¿Cuántos samples y qué proyecto de código ilustra cada uno?
- (*) ¿Cómo se vincula cada sample con el código productivo?
- ¿Hay un sample que demuestre el punto de extensión principal?

Lo que NO va en esta sección:
- Tutoriales conceptuales (van a `11-Documentacion/`).

---

# Parte D — Anexos de datos

Parte opcional y condicional: se incluye únicamente si las fuentes del intake aportan escenarios o ejemplos de instancia. Cuando existen, esta parte es su hogar canónico dentro del intake. El cuerpo (Partes A y B) los cita por identificador; aquí se reproducen completos. Regla de resolución: **todo identificador citado en el cuerpo debe existir en la Parte D, y todo anexo de la Parte D debe estar citado desde el cuerpo** (sin referencias colgantes ni anexos huérfanos).

## §20 Anexo A — Escenarios con ejemplos completos

Instrucción: Transcribir, uno por subsección, cada escenario de instancia que el cuerpo cita por identificador (`E-1`, `E-2`, …), con su JSON completo y sin recortar. Es el único apartado del intake donde se admite payload crudo. No se inventan datos: si un escenario citado no existe en las fuentes, no se crea; se resuelve como ambigüedad antes de emitir el intake.

**Por qué el anexo no es decorativo.** Estos escenarios son insumo declarado de cuatro consumidores aguas abajo: el modelo conceptual de `02-Especificacion-Funcional`, los datos de la maqueta de la Fase B2, las *fixtures* de prueba de `08-Calidad-Y-Pruebas` y los samples de `10-Examples`. Un JSON sin criterio de verificación es dato suelto; con él, es una fixture ejecutable. Por eso el formato pide las cuatro piezas y no solo el payload.

**Estado del dato.** Enum cerrado, porque es la regla de evidencia D9 aplicada a los datos de ejemplo:

| Estado | Significa |
|---|---|
| `medido` | Proviene de una observación documentada, con su fecha |
| `declarado` | Lo afirma una persona con autoridad sobre el dato, sin medición que lo respalde |
| `derivado` | Se calcula a partir de otro dato del intake, con la regla de cálculo declarada |
| `reconstruido` | Valor sintético que rellena una serie para que la fixture sea ejecutable |

Un valor `reconstruido` **no es una medición** y nunca se presenta como tal. Cuando conviven en un mismo JSON, marcar los reconstruidos dentro del propio payload.

Formato por escenario:

### §20.[ID] · [Título del escenario]

Procedencia: `[archivo fuente]`, líneas [N–M]. Estado: [medido / declarado / derivado / reconstruido].

**Contexto.** Qué situación real representa este escenario y en qué momento de la vida del sistema ocurre.

**Qué ejercita.** Qué partes del modelo, qué reglas de negocio y qué invariantes pone a prueba. Si el escenario cubre un caso incómodo —un dato que el sistema no puede obtener por sí solo, un borde del modelo—, decirlo acá: es lo que lo vuelve valioso.

​```json
{ ...JSON completo del escenario, transcripto de la fuente sin recortes... }
​```

**Qué verificar.** Traducción directa a casos de prueba: qué debe cumplirse sobre estos datos para que el comportamiento se considere correcto. Es lo que `08-Calidad-Y-Pruebas` toma como criterio de aceptación y lo que `10-Examples` convierte en contrato de verificación.

(repetir la subsección `§20.[ID]` una vez por cada escenario aportado por las fuentes)

**Recomendación sobre el conjunto.** Cuando los escenarios lo permitan, encadenarlos como una única línea de tiempo coherente, de la puesta en marcha al caso más avanzado, en lugar de emitirlos como casos sueltos. Un conjunto encadenado sirve como juego de datos de un *end-to-end* completo; ocho casos inconexos, no. Los identificadores internos conviene que sean legibles, para que las fixtures se lean solas.

Lo que NO va en esta sección:
- Referencias a un archivo externo en lugar del JSON (rompe la autocontención: el orquestador no las resuelve).
- Escenarios no citados desde el cuerpo (un anexo huérfano es ruido).
- Datos sintéticos presentados como medidos: un valor `reconstruido` se marca como tal.
- JSON sin bloque **Qué verificar**: sin criterio, el dato no es utilizable aguas abajo.

## §21 Anexo B — Cobertura de campos y trazabilidad de los ejemplos

Instrucción: Reproducir, si la fuente la provee, la matriz que cruza cada área del modelo (o cada invariante / flujo end-to-end) contra el escenario de §20 que lo ejercita. Sirve para demostrar que los ejemplos anexados cubren el modelo y los invariantes que el intake declara. Se deriva de §20 y de las fuentes; es opcional y se incluye solo si aporta trazabilidad real.

Lo que NO va en esta sección:
- Invariantes o reglas nuevas no presentes en las fuentes.

---

## §19 Checklist de completitud del intake

Verificar antes de pasar el intake al orquestador. Todos los ítems deben estar tildados.

Negocio (Parte A):
- [ ] La cabecera tiene nombre de producto, Product Owner, cliente, fecha y estado.
- [ ] §1 describe un problema concreto y qué pasa si no se construye.
- [ ] §2 tiene al menos un stakeholder por categoría con rol explícito, identifica al Product Owner como rol distinto del dueño del problema, y declara la cantidad de personas del equipo de desarrollo (origen de `equipo_n`).
- [ ] §4 tiene al menos un ítem en cada categoría MoSCoW y el Must Have es el mínimo razonable.
- [ ] §5 tiene al menos 3 historias en formato `Como/quiero/para`, cubriendo 2 roles si hay más de uno.
- [ ] §7 lista al menos 5 casos límite con espacio para respuesta del cliente.
- [ ] §8 tiene al menos 3 métricas SMART de negocio con target y plazo numéricos.
- [ ] §9 lista al menos 3 exclusiones con justificación.
- [ ] §10 declara presupuesto orientativo y fecha objetivo (o "sin fecha" justificado).
- [ ] §11 lista al menos 3 riesgos con probabilidad, impacto y mitigación.
- [ ] §12 define al menos 5 términos del dominio.

Composición (Parte B):
- [ ] §13 enumera todos los proyectos de código, cada uno con uno de los 8 valores D8, señala el principal, y el grafo de dependencias es acíclico.
- [ ] §13 declara el perfil de convención de nombres; no hay colisión de nombres de proyecto de código.
- [ ] §14 describe la composición y los contratos entre proyectos de código.
- [ ] §15 garantiza valor demostrable end-to-end en el primer sprint a través de la jerarquía.
- [ ] §16 publica el árbol `tree` derivado de la jerarquía y de la convención de nombres, con §16.1.

Técnica por proyecto de código (Parte C):
- [ ] §17 está completo para cada proyecto de código de §13 (identidad + P.1 a P.12).
- [ ] Cada proyecto de código: P.6 declara cobertura mínima numérica; P.7 adopta SemVer y Conventional Commits; P.8 enumera quality gates bloqueantes; P.9 declara plataformas y versiones mínimas; P.10 expresa NFR con métricas numéricas.

Anexos de datos (Parte D — solo si las fuentes aportan ejemplos de instancia):
- [ ] Todo identificador de escenario citado en el cuerpo (§6, §7, u otras) tiene su JSON completo en §20, y ningún escenario de §20 queda huérfano.
- [ ] Ningún dato del intake se respalda únicamente en una referencia a un archivo externo: todo lo citado está transcripto.
- [ ] Cada escenario de §20 declara procedencia (archivo + líneas) y estado (verificado / propuesto / reconstruido).

General:
- [ ] No hay vocabulario del dominio fuente del bootstrap ni stacks hardcodeados en el texto normativo (D7).
- [ ] El control de cambios refleja la versión y fecha del documento.

---

## Trazabilidad downstream

Este documento alimenta las siguientes secciones SDD. La parte de negocio (A) es de nivel producto; la composición (B) deriva el manifiesto; la técnica (C) se aplica por proyecto de código.

| Sección del intake | Destino | Documento downstream típico |
|---|---|---|
| §1 a §12 (negocio) | `00-Contexto/`, `01-Necesidades-Negocio/` | visión, alcance, NB-XX |
| §13 (proyectos de código) | `PRODUCT-MANIFEST` derivado; todas las categorías por proyecto de código | manifiesto canónico; selector de variantes D8 |
| §14 estilo de producto | `05-Arquitectura-Tecnica/` (vista de producto) | `Arquitectura-Proyecto-Codigo.md` |
| §16 estructura | `05-Arquitectura-Tecnica/`, `11-Documentacion/` | árbol, README de carpeta |
| §17 P.x (técnica por proyecto de código) | `05`, `08`, `09`, `00` (según P) por proyecto de código | ADRs, estrategia testing, pipeline, NFR |
| §18 samples | `10-Examples/` | `Ejemplo-XX.md` |
| §20–§21 anexos de datos | `02-Especificacion-Funcional/`, `10-Examples/`, `SDD/Maquetas/` | modelo conceptual con ejemplos, fixtures de prueba, `Datos-Maqueta.js` |

---

## Control de cambios

| Versión | Fecha | Cambios | Autor |
|---|---|---|---|
| 1.0 | [YYYY-MM-DD] | Intake unificado inicial del producto | [Autor] |
| 1.1 | 2026-07-20 | Se agrega la Parte D — Anexos de datos (§20 escenarios con JSON completo, §21 cobertura), la regla de autocontención en la guía de uso (paso 5), los ítems de checklist de la Parte D y la fila de trazabilidad downstream. Objetivo: que el intake transcriba los ejemplos de instancia en lugar de referenciar archivos externos que el orquestador no puede resolver. | Orquestador SDD (Claude Code) |
| 1.2 | 2026-07-26 | Intercambio de categorías 10 ↔ 11: los destinos declarados en §17 P.11, §18 y la tabla de mapeo intake → documentación pasan a `10-Examples/` para los samples y `11-Documentacion/` para el cuerpo documental de entrega. Normalización del vocabulario de actores. | Reformulación SDD |
| 1.3 | 2026-07-26 | La plantilla declara su propia versión en cabecera, con la aclaración de que el campo `Versión` del cuerpo pertenece al documento generado y no a la plantilla. Corrige una aplicación incompleta de D6 sobre las plantillas.  Reformulación SDD |
| 1.4 | 2026-07-28 | Navegabilidad y anexos de datos. Se incorpora la **tabla de contenido obligatoria** después de la cabecera, con cada escenario de la Parte D listado por identificador: un intake real supera las dos mil líneas y sin índice no es navegable ni por el humano ni por el agente que lo lee por partes. El formato por escenario de §20 pasa de tres piezas a cinco: suma **contexto**, **qué ejercita** y **qué verificar**, este último porque es lo que `08-Calidad-Y-Pruebas` toma como criterio de aceptación y `10-Examples` convierte en contrato de verificación. El `Estado` del dato pasa a enum cerrado (`medido`, `declarado`, `derivado`, `reconstruido`), que es D9 aplicada a los datos de ejemplo. Se agrega la recomendación de encadenar los escenarios como una única línea de tiempo. Sintetizado del patrón que dos intakes reales desarrollaron por su cuenta sobre la versión 1.3. |
| 1.5 | 2026-07-29 | Product Owner declarado y correcciones de coherencia. La cabecera suma el campo **Product Owner** y una nota que declara quién es responsable del documento: el PO es el autor del contenido y quien aprueba, la redacción puede estar asistida por un agente, y las decisiones de producto de §4 y §9 son suyas. §2 desdobla la pregunta bloqueante, que fusionaba al Product Owner con la categoría de stakeholder «propietario», e incorpora la pregunta por la cantidad de personas del equipo, origen declarado del flag `equipo_n` que ninguna sección pedía. §16 corrige el árbol de ejemplo, que mostraba `docs/` y `devs/Intake/` en lugar de las rutas `SDD/Docs/` y `SDD/Intake/` que fija `Master-Prompt.md` §3.5. Ejemplos de `Slug-Producto` normalizados a Título-Con-Guiones. Checklist de §19 actualizado. | — |
| 2.0 | 2026-07-29 | Renombre de vocabulario normativo (framework 5.0). El nivel superior pasa de «solución» a **producto** y la unidad de compilación de «proyecto» a **proyecto de código**; los cuatro planos de identidad se separan en `Nombre-Producto`, `Slug-Producto`, `Raiz-Codigo` y `Artefacto-Agrupacion`. | Reformulación SDD |
| 2.1 | 2026-07-29 | Corrección de la sustitución global de cadena de la 5.0. La Parte D declaraba «Regla de **reproducto**», palabra inexistente producida al sustituir `soluci*` por `producto` sobre «re**soluci**ón». La clase de defecto y su prohibición quedan documentadas en `Vocabulario-Rules.md` §9.5. La restitución de las filas históricas de este control de cambios, que la migración había reescrito contra `SDD-Development-Guide.md` §VI.2, se registra una sola vez en `CHANGELOG.md` [5.1] por alcanzar a veintitrés archivos. | Revisión SDD |
