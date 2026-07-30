# Reglas constructivas — 05 Arquitectura técnica

**Carpeta target (por proyecto de código):** `SDD/Docs/Proyectos/<Nombre-Proyecto-Codigo>/05-Arquitectura-Tecnica/`
**Carpeta target (nivel producto):** `SDD/Docs/Producto/`
**Nivel de aplicación (`Vocabulario-Rules.md` §4 R3):** Proyecto de código + Producto
**Subagente target del orquestador:** Arquitecto de Software Senior (AG-05)
**Versión de las reglas:** 3.1

---

## 0. Posición en la cadena SDD

La categoría 05 es la primera categoría de diseño técnico de la cadena de trazabilidad D6. Recibe upstream de 00 (visión y restricciones técnicas implícitas), 01 (necesidades de negocio NB-XX), 02 (CU, RN, modelo conceptual y RC) y 04 (contratos de prompts si el proyecto de código delega lógica en un LLM). Produce los artefactos que sirven como ancla para 06 (US y backlog técnico), 07 (sprint plan), 08 (testing técnico y de integración), 09 (DevOps y despliegue), 10 (developer guide) y 11 (examples). Su salida define el cómo estructural del sistema sin entrar en detalle de implementación de cada US. Aplica de manera obligatoria a los ocho tipos D8: ningún tipo está exento de producir al menos una arquitectura de producto y una colección de ADRs individuales.

La categoría 05 opera en dos niveles dentro de un producto con jerarquía de proyectos de código:

- Nivel proyecto de código. Se genera una vez por cada proyecto de código del manifiesto, bajo `Proyectos/<Nombre-Proyecto-Codigo>/05-Arquitectura-Tecnica/`. El orquestador selecciona la variante de §1.2 según el `tipo_proyecto_codigo` de ese proyecto de código. Es la arquitectura interna de cada proyecto de código y no cambia respecto del template de tipo único.
- Nivel producto. Se genera una vez para todo el producto, bajo `Producto/`, por encima de la arquitectura de cada proyecto de código. Documenta el mapa de proyectos de código, los contratos inter-proyecto y el grafo de dependencias del manifiesto. Es obligatoria para productos con más de un proyecto de código. Para un producto de un único proyecto de código (caso degenerado) se omite: su contenido se reduce a la arquitectura del único proyecto de código y al README raíz.

**Frontera con la categoría 11.** Esta categoría documenta la arquitectura *como decisión de diseño*: vistas formales, ADR, contratos, NFR y alternativas descartadas. Se dirige a quien participó del diseño o lo continúa dentro de la cadena de especificación, y responde «por qué se decidió así». El sistema *como hecho consumado* —qué es, qué componentes tiene y dónde vive cada uno en el árbol de archivos del repositorio— lo documenta la categoría 11 en `Vision-General-Sistema` y `Recorrido-Codigo`, dirigida a quien llega de afuera y responde «qué es esto y por dónde entro». No duplicar: 11 referencia los ADR y los contratos de acá por su identificador.
---

## 1. Especialidad asignada

### 1.1 Especialidad base

Arquitecto de Software Senior, equivalente al AG-05 del catálogo SDD. Su perfil profesional combina diseño estructural, evaluación de trade-offs y registro formal de decisiones. Traduce los CU y RN de 02 y los NFR derivados de 00 y 01 en un diseño técnico implementable. Se alinea con ISO/IEC 42010 para descripción arquitectónica, con IEEE 1016 para la especificación de diseño, con el modelo C4 de Simon Brown para vistas y con el formato ADR de Michael Nygard para registrar decisiones. Cuando el proyecto de código requiere comunicación entre servicios autónomos, asume la variante de Arquitecto de Software Distribuido, alineada con los principios de DDD táctico, contratos asincrónicos y consistencia eventual.

### 1.2 Variantes según tipo de proyecto de código (8 valores D8)

| Tipo | Especialidad específica | Justificación |
| --- | --- | --- |
| library | Arquitecto de Software + API Designer | El foco está en Clean Architecture interna y en una capa Abstractions estable que define la superficie pública versionada. |
| web-monolith | Arquitecto Senior | Clean Architecture con separación de capas (Domain, Application, Infrastructure, Presentation), patrón MVC o equivalente y CQRS opcional cuando hay asimetría de lectura y escritura. |
| web-microservices | Arquitecto de Software Distribuido | Bounded contexts DDD, API gateway, service mesh, patrón saga para transacciones distribuidas y consistencia eventual con outbox o eventos de dominio. |
| desktop-app | Arquitecto + Cross-Platform Specialist | MVVM o equivalente, Clean Architecture local, gestión de estado y separación entre lógica y capa de presentación. |
| mobile-app-maui | Arquitecto Móvil | MVVM, diseño offline-first, motor de sincronización (sync engine) con resolución de conflictos y ciclo de vida del sistema operativo. |
| rest-api | Arquitecto + API Designer | Diseño REST con OpenAPI, manejo de errores RFC 7807 problem+json, idempotencia explícita en operaciones no seguras, paginación, filtros y versionado. |
| cli-tool | Arquitecto + CLI Designer | Parser de argumentos, pipeline command/handler, plugins, contrato de stdout/stderr y exit codes documentados como parte del diseño. |
| worker-service | Arquitecto Event-Driven | Consumer groups, idempotencia, dead-letter queues, backpressure y políticas de reintento con jitter. |

El orquestador lee esta tabla y, según el `tipo_proyecto_codigo` del proyecto de código en curso (leído del manifiesto de producto), selecciona la variante correspondiente y la combina con la especialidad base. La variante se aplica una vez por cada proyecto de código del producto.

Para la vista de producto de nivel `Producto/`, el orquestador no usa una variante por D8 (el producto no tiene un D8 propio): asume la especialidad base de Arquitecto de Soluciones Senior, y la variante de Arquitecto de Software Distribuido cuando la jerarquía implica comunicación entre proyectos de código autónomos. La vista de producto se produce una sola vez, al cierre del bucle de proyectos de código.

### 1.3 Multi-especialidad

La categoría 05 admite revisiones acotadas por otras especialidades cuando el dominio lo requiere:

- AG-02 Analista Funcional, para validar que cada CU tiene un componente o conjunto de componentes que lo cubre y que el modelo lógico mantiene la semántica del modelo conceptual.
- AG-04 Ingeniero de Prompts, cuando alguno de los componentes delega lógica en un LLM, para fijar cómo se incrusta el contrato de prompt en el diseño técnico.
- AG-08 QA, para validar que cada NFR declara una métrica numérica medible y que cada ADR contempla cómo se verificará su cumplimiento.
- AG-09 DevOps, para revisar viabilidad de la vista de despliegue antes de pasarla a la categoría 09.

El AG-05 mantiene siempre la titularidad del artefacto; las demás especialidades aportan revisiones acotadas.

---

## 2. Documentos que produce esta categoría

### 2.1 Tabla maestra

Artefactos de nivel proyecto de código (uno por proyecto de código, bajo `Proyectos/<Nombre-Proyecto-Codigo>/05-Arquitectura-Tecnica/`):

| Archivo | Obligatorio para | Recomendado | Omitir para | Descripción |
| --- | --- | --- | --- | --- |
| `Arquitectura-Proyecto-Codigo.md` | Todos los tipos D8 | — | — | Documento maestro con las cuatro vistas mínimas (lógica, procesos, despliegue, datos), cross-cutting concerns y NFR. |
| `Decisiones-Arquitectura.md` | Todos los tipos D8 | — | — | Índice navegable de ADRs con estado, fecha y categoría. No contiene el cuerpo de las decisiones. |
| `Adrs/ADR-XX-<Nombre>.md` | Todos los tipos D8, mínimo tres ADRs | — | — | Un ADR por archivo individual. Una decisión, un documento, un estado declarado. |
| `Modelo-Datos-Logico.md` | web-monolith, web-microservices, rest-api, worker-service, mobile-app-maui con almacenamiento | desktop-app con persistencia local | library puro sin estado, cli-tool sin estado | Modelo lógico con tipos físicos, índices, restricciones y migración inicial. |
| `Flujo-Ejecucion.md` | worker-service, cli-tool con pipeline, library con motor de procesamiento | rest-api con orquestación compleja | web-monolith CRUD trivial | Pipeline de ejecución paso a paso con transformaciones de datos. |
| `contratos-<area>.md` | rest-api (OpenAPI), worker-service (mensajes AsyncAPI o referencia a esquema), library (Abstractions públicas) | web-microservices (contratos inter-servicio), cli-tool (contrato stdout/stderr) | web-monolith sin API externa | Contrato externo formal por área funcional. Un documento por área. |
| `Extensibilidad.md` | library con plugins, cli-tool con plugins, web-microservices con plugins | rest-api con webhooks o handlers externos | Tipos sin puntos de extensión | Puntos de extensión, contratos de plugin y ejemplo de registro. |
| `README.md` de la sección | Recomendado para todos | — | — | Índice navegable de la arquitectura, ADRs vigentes y NFR. |

Artefactos de nivel producto (una vez para todo el producto, bajo `Producto/`):

| Archivo | Obligatorio para | Recomendado | Omitir para | Descripción |
| --- | --- | --- | --- | --- |
| `Vista-Producto.md` | Productos con más de un proyecto de código | — | Producto de un único proyecto de código (caso degenerado) | Vista de producto por encima de la arquitectura de cada proyecto de código: mapa de proyectos de código, grafo de dependencias, contratos inter-proyecto, decisiones de nivel producto, cross-cutting compartido y riesgos de integración. |
| `Contratos-Inter-Proyecto.md` | Productos donde un proyecto de código expone un contrato consumido por otro proyecto de código de la mismo producto | — | Productos sin dependencias inter-proyecto con contrato formal | Detalle de cada contrato que cruza la frontera entre dos proyectos de código del producto, referenciando el `contratos-<area>` del proyecto de código productor. Puede integrarse como sección de `vista-producto` si los contratos son pocos. |
| `Producto/Adrs/ADR-XX-<Nombre>.md` | Productos con decisiones que afectan a más de un proyecto de código | — | Productos donde toda decisión es interna a un proyecto de código | ADRs de nivel producto (estilo de composición, política de versionado inter-proyecto, estrategia de comunicación entre proyectos de código). Mismas reglas de individualidad e inmutabilidad que los ADRs de proyecto de código. |

### 2.2 Reglas de inclusión y exclusión por tipo

| Tipo D8 | Mínimo de ADRs | Modelo lógico | Flujo de ejecución | Contratos |
| --- | --- | --- | --- | --- |
| library | 3 (estilo, superficie pública, estrategia de versionado) | No | Recomendado si hay motor de procesamiento | `Contratos-Abstractions.md` |
| web-monolith | 5 (estilo, persistencia, autenticación, separación de capas, manejo de errores) | Sí | Solo si hay orquestación compleja | Solo si expone API externa |
| web-microservices | 6 mínimo por bounded context (estilo, comunicación, persistencia, autenticación, transacciones distribuidas, observabilidad) | Sí, uno por contexto | Sí, sagas y eventos | Sí, por área: REST y AsyncAPI |
| desktop-app | 3 (estilo, persistencia local, estrategia de actualización) | Recomendado si guarda local | No | No (salvo integración externa) |
| mobile-app-maui | 4 (estilo, persistencia local, sincronización, gestión de permisos) | Sí si hay almacenamiento offline | Recomendado para sync engine | Solo si consume API propietaria |
| rest-api | 5 (estilo, persistencia, autenticación, paginación, manejo de errores) | Sí | Solo si hay orquestación de varios pasos | Sí, OpenAPI obligatorio |
| cli-tool | 3 (estilo, parser de argumentos, contrato stdout/stderr) | No (salvo persistencia local) | Sí, pipeline command/handler | `Contratos-Stdout-Stderr.md` |
| worker-service | 5 (estilo, mensajería, idempotencia, dead-letter, observabilidad) | Sí si guarda estado | Sí, obligatorio | Sí, AsyncAPI o esquema equivalente |

El mínimo es piso, no techo. La cantidad real queda determinada por el conjunto de decisiones técnicas que el equipo necesita registrar para mantener trazabilidad.

---

## 3. Nomenclatura y vinculación

### 3.1 Patrón de nombres

- `arquitectura-producto.md` para el documento maestro.
- `decisiones-arquitectura.md` para el índice de ADRs.
- `Adrs/ADR-XX-<Nombre>.md` para cada ADR, con dos dígitos en `XX`, Título-Con-Guiones en el slug y guion medio antes de la versión.
- `Modelo-Datos-logico.md` para el modelo lógico.
- `flujo-ejecucion.md` para el pipeline de ejecución.
- `contratos-<area>.md` para cada contrato externo (por ejemplo `Contratos-REST.md`, `Contratos-Mensajes.md`, `Contratos-Abstractions.md`, `Contratos-Stdout-Stderr.md`).
- `extensibilidad.md` para los puntos de extensión.
- `vista-producto.md` para la vista de producto de nivel `Producto/`.
- `contratos-inter-proyecto.md` para el detalle de contratos que cruzan proyectos de código del producto.
- `Producto/Adrs/ADR-XX-<Nombre>.md` para los ADRs de nivel producto, con las mismas reglas de los ADRs de proyecto de código.

Queda prohibido el patrón heredado `decisiones-arquitectura.v1.0.md` o el patrón consolidado `decisiones-arquitectura-todo-junto.v1.0.md`. La versión siempre va con guion medio `-v`, jamás con guion bajo `_v` ni con punto `.v`. El slug va en Título-Con-Guiones (cada palabra capitalizada, separadas por guion medio); quedan prohibidas las variantes todo-minúsculas, camelCase, con espacios o con acentos.

### 3.2 Convenciones de prefijos y sufijos

- `ADR-`: Architecture Decision Record. Una decisión técnica formal, individual, inmutable una vez aceptada.
- Nombre lógico sin sufijo de versión en el nombre; la versión vive en el campo `Versión` de la cabecera (D4), uniforme para todos los artefactos.
- Los contratos llevan prefijo `contratos-<area>`. El área va en Título-Con-Guiones y refleja el dominio del contrato (rest, mensajes, abstractions, stdout-stderr, grpc).

### 3.3 Convención crítica de ADR individuales

La auditoría de Fase 0 del bootstrap (`Bootstrap/Audit-SDD1.md`) detectó que el fuente Motor DSL consolida todas las decisiones en un único archivo `Decisiones-Arquitectura.md` con secciones internas, sin archivos individuales por ADR. SDD corrige esta práctica de manera obligatoria:

1. Cada ADR vive en un archivo independiente bajo `Adrs/`.
2. El archivo `Decisiones-Arquitectura.md` se reduce a un índice navegable con identificador, título, estado, fecha y categoría.
3. Cada ADR es inmutable una vez aceptada. Si la decisión cambia, se crea una nueva `ADR-YY` con estado `Aceptado` y la anterior pasa a estado `Superado por ADR-YY` sin reescribirse.
4. Queda prohibido editar el cuerpo de una ADR aceptada para reflejar nuevas decisiones.

Esta convención asegura trazabilidad histórica de las decisiones y compatibilidad con herramientas de búsqueda y revisión por archivo.

### 3.4 Vinculación cross-doc

- Upstream: cada ADR referencia explícitamente las NB, CU, RN o NFR que la motivan. No puede existir ADR huérfana de motivación.
- Downstream: cada componente declarado en la arquitectura referencia los CU que cubre y los tests previstos en 08.
- El modelo lógico referencia el modelo conceptual de 02. Cada entidad lógica tiene una entidad conceptual de origen.
- Los contratos referencian los CU que los consumen.
- Los puntos de extensión referencian la ADR que justifica su existencia y el ejemplo de extensión en 11.
- Nivel producto: cada contrato inter-proyecto referencia la dependencia del manifiesto que materializa (proyecto de código consumidor hacia proyecto de código productor) y el `contratos-<area>` del proyecto de código productor que lo define. No puede existir un contrato inter-proyecto que no corresponda a una arista del grafo de dependencias del manifiesto, ni una dependencia con contrato formal que no esté documentada en la vista de producto.

### 3.5 README de la sección

Recomendado para todos los tipos. Debe listar el documento maestro, el índice de ADRs con su estado actual, el modelo lógico si aplica, los contratos vigentes y los puntos de extensión. Sirve como punto de entrada navegable para revisores externos (AG-02, AG-06, AG-08, AG-09).

### 3.6 Política de versionado

Una sola versión vigente por nombre lógico para todos los artefactos salvo los ADR. Para `arquitectura-producto`, `Modelo-Datos-logico`, `flujo-ejecucion`, `contratos-<area>` y `extensibilidad`, cuando se pasa de `v1.0` a `v2.0` se aplica la regla general: la versión anterior se mueve a `_legacy/` con estado `Superado`.

Para los ADR aplica una regla diferente y crítica: nunca se versionan en el mismo archivo. Una ADR aceptada no cambia de versión; si la decisión evoluciona, se crea una ADR nueva con identificador siguiente y la anterior queda con estado `Superado por ADR-YY`. Ambos archivos coexisten en `Adrs/` sin moverse a `_legacy/`, para preservar la historia decisional.

---

## 4. Estructura de redacción

### 4.1 Cabecera obligatoria

Cada artefacto inicia con un H1 y un bloque markdown de metadatos:

```markdown
# ADR-XX — <Título de la decisión>

**Proyecto de código:** {{Nombre-Proyecto-Codigo}}
**Documento:** ADR-XX-<Nombre>.md
**Versión:** <X.Y>
**Estado:** Propuesto | Aceptado | Superado por ADR-YY | Rechazado
**Fecha:** YYYY-MM-DD
**Autor:** {{equipo-o-rol}}
**Categoría:** Estilo | Persistencia | Comunicación | Seguridad | Observabilidad | Despliegue | Extensibilidad
```

Para `arquitectura-producto`, `Modelo-Datos-logico`, `flujo-ejecucion`, `contratos-<area>` y `extensibilidad` aplica la misma cabecera adaptando el título y omitiendo `Categoría`.

**Tabla de contenido.** Todo documento generado que supere las tres secciones de primer nivel incluye una tabla de contenido inmediatamente después de la cabecera de metadatos, con enlaces ancla a cada sección de primer y de segundo nivel. La tabla de contenido no cuenta como sección de contenido ni altera la estructura obligatoria del documento: se ubica entre la cabecera y la primera sección, y las secciones obligatorias siguen siendo las que declara §4.2. Los documentos breves —fichas de una sola sección, entradas de índice— quedan exceptuados.

El ajuste es de navegabilidad. Estos documentos los lee principalmente un agente de IA que recorre la cadena de especificación acumulando contexto, y para ese lector la tabla de contenido es indiferente. Existe para el agente humano que entra a consultar un punto concreto sin haber leído el documento entero.

### 4.2 Secciones obligatorias de `Arquitectura-Proyecto-Codigo.md`

1. Objetivo. Una a tres oraciones que respondan qué documenta el archivo y para quién.
2. Estilo arquitectónico. Estilo elegido (pipeline, capas, microkernel, microservicios, event-driven, hexagonal) con justificación contra al menos dos alternativas descartadas.
3. Vista lógica. Componentes con responsabilidad, entradas, salidas y dependencias unidireccionales.
4. Vista de procesos. Concurrencia, transacciones, hilos o consumidores, manejo de estado en memoria.
5. Vista de despliegue. Unidades de despliegue, runtime objetivo, dependencias de infraestructura sin entrar en detalle de proveedor concreto.
6. Vista de datos. Persistencia, caches, particionamiento o sharding si aplica, referencia al modelo lógico.
7. Cross-cutting concerns. Logging, tracing, métricas, manejo de errores, configuración y secretos, en una única sección que centraliza decisiones transversales.
8. Quality attributes (NFR). Tabla con cada NFR, su objetivo numérico y su mecanismo de medición.
9. Riesgos arquitectónicos. Cada riesgo con impacto, probabilidad y mitigación.
10. Trazabilidad. Tabla con CU upstream, RN upstream, ADRs que lo gobiernan y tests previstos en 08.

### 4.3 Secciones obligatorias de un ADR

1. Contexto. Qué problema se necesita resolver, qué restricciones existen, qué CU, RN o NFR lo motivan.
2. Decisión. Qué se decidió hacer, expresado de manera declarativa y unívoca.
3. Estado. Propuesto, Aceptado, Superado por ADR-YY o Rechazado, con fecha de transición.
4. Alternativas consideradas. Tabla con cada alternativa, pros y contras evaluados.
5. Consecuencias positivas. Lista enumerada.
6. Consecuencias negativas y trade-offs. Lista enumerada. Cada trade-off debe ser explícito y aceptado.
7. Implementación. Cómo se realiza la decisión, qué componentes la materializan, qué convenciones impone.
8. Métricas de validación. Cómo se verifica que la decisión cumple el objetivo (por ejemplo, latencia p95, cobertura de tests, throughput).
9. Referencias. Enlaces a CU, RN, NFR, otras ADR relacionadas y referencias externas si aplica.
10. Control de cambios. Tabla con versión, fecha y descripción. Para ADR aceptadas, la única edición permitida es el cambio de estado a `Superado por ADR-YY`.

### 4.4 Secciones obligatorias de `Modelo-Datos-Logico.md`

1. Tablas o colecciones. Una por subsección, con propósito y referencia a la entidad conceptual de 02.
2. Atributos con tipo de dato físico. Nombre, tipo, nulabilidad, default. Aquí sí viven los tipos físicos; en 02 solo viven los nombres y la semántica.
3. Índices. Identificador, columnas, tipo (único, parcial, compuesto), motivación.
4. Restricciones. Claves primarias, foráneas, únicas, check, valores permitidos.
5. Migración inicial. Referencia al tooling de migración del proyecto de código (sin nombrar productos comerciales concretos), con identificador de la migración y resumen del cambio.
6. Estrategia multi-tenant. Si aplica, declarar partición por tenant (columna discriminadora, esquema por tenant o base por tenant) y mecanismo de aislamiento.
7. Trazabilidad. Tabla que liga cada tabla o colección a la entidad conceptual de origen y a los CU que la consumen.

### 4.5 Secciones obligatorias de `contratos-<area>.md`

1. Alcance del contrato. Qué CU se materializan a través de este contrato.
2. Formato. OpenAPI inline o referencia a archivo `.yaml`, esquema AsyncAPI, contrato gRPC con `.proto`, o contrato textual para stdout/stderr y exit codes.
3. Operaciones. Listado de endpoints, mensajes, comandos o llamadas.
4. Esquemas de datos. DTOs, payloads, headers, claves de mensaje.
5. Manejo de errores. Códigos, formato (por ejemplo problem+json RFC 7807), errores reservados.
6. Versionado del contrato. Estrategia de compatibilidad hacia atrás y deprecación.
7. Trazabilidad. CU y RN que cubre, ADR que lo gobierna.

### 4.6 Tablas tipo y formatos recurrentes

Tabla de estilos arquitectónicos versus criterios de elección:

| Criterio | Pipeline | Capas | Hexagonal | Microservicios | Event-driven |
| --- | --- | --- | --- | --- | --- |
| Tamaño del equipo | 1-5 | 1-10 | 3-15 | 10+ | 5+ |
| Dominios de negocio | 1 | 1-3 | 1-3 | 5+ | 2+ |
| Deploy independiente | No | No | Deseable | Requerido | Requerido |
| Complejidad operativa | Baja | Baja | Media | Alta | Alta |
| Time to market (MVP) | Rápido | Rápido | Medio | Lento | Medio |
| Acoplamiento entre dominios | Bajo por etapa | Medio | Bajo | Muy bajo | Muy bajo |

Tabla de índice de ADRs:

| ADR | Título | Categoría | Estado | Fecha |
| --- | --- | --- | --- | --- |
| ADR-01 | <Nombre> | <Categoría> | Aceptado | YYYY-MM-DD |
| ADR-02 | <Nombre> | <Categoría> | Superado por ADR-05 | YYYY-MM-DD |

Tabla de NFR:

| NFR | Objetivo numérico | Mecanismo de medición | ADR relacionada |
| --- | --- | --- | --- |
| Latencia p95 | <valor> ms | <métrica y herramienta abstracta> | ADR-XX |
| Throughput | <valor> ops/s | <métrica> | ADR-XX |
| Disponibilidad | <valor> % | <métrica> | ADR-XX |

Tabla de trazabilidad del componente:

| Dimensión | Referencia |
| --- | --- |
| CU cubiertos | CU-XX, CU-YY |
| RN aplicables | RN-XX |
| ADRs que lo gobiernan | ADR-XX, ADR-YY |
| Tests previstos | <referencia tentativa a 08> |

### 4.7 Anti-patrones a evitar

| Anti-patrón | Problema | Solución |
| --- | --- | --- |
| Arquitectura sin ADRs (todo decidido inline) | No queda registro de por qué se eligió cada opción; rompe la trazabilidad histórica | Forzar al menos tres ADRs aceptadas por proyecto de código, una por categoría relevante |
| ADRs sin estado declarado | Imposible distinguir lo vigente de lo superado | Forzar el campo Estado en la cabecera y rechazar ADR sin estado |
| ADR consolidada en un único archivo | Lección documentada del fuente Motor DSL; impide búsquedas por decisión y bloquea la inmutabilidad por archivo | Forzar archivos individuales `ADR-XX-<Nombre>.md` bajo `Adrs/` |
| Estilo arquitectónico implícito | El lector deduce el estilo por inspección; ambigüedad | Declarar el estilo en §2 del documento maestro con justificación |
| NFR sin métrica numérica | "Debe ser rápido"; no verificable | Cada NFR con valor numérico y mecanismo de medición |
| Modelo lógico sin migración versionada | Imposible reconstruir el esquema o auditar cambios | Referenciar migración inicial con identificador |
| Cross-cutting concerns disperso en cada componente | Decisiones de logging y errores repetidas e inconsistentes | Centralizar en §7 del documento maestro |
| ADR aceptada editada para reflejar nueva decisión | Pérdida del razonamiento histórico | Crear ADR nueva; marcar la anterior como `Superado por ADR-YY` |
| Contrato sin versionado | Cambios silenciosos rompen consumidores | Declarar política de versionado y compatibilidad hacia atrás |
| Componente como sinónimo de clase | Confunde diseño arquitectónico con diseño de código | Componente es un módulo con responsabilidad cohesiva |
| Casing inconsistente en ADRs | Rompe automatizaciones | Forzar Título-Con-Guiones estricto en el slug |

### 4.8 Secciones obligatorias de `Vista-Producto.md`

Aplica solo a productos con más de un proyecto de código. La vista de producto se sitúa por encima de la arquitectura de cada proyecto de código y no la duplica: referencia, no reescribe..

1. Objetivo y alcance. Qué documenta la vista de producto y para quién. Aclara que el detalle interno de cada proyecto de código vive en su propia `arquitectura-producto`.
2. Mapa de proyectos de código. Tabla con `Nombre-Proyecto-Codigo`, `tipo_proyecto_codigo` D8, rol en el producto, `Identidad-Codigo` y bandera `redistribuible`. Refleja el manifiesto.
3. Grafo de dependencias. El DAG del manifiesto representado como vista navegable, con el orden topológico de construcción. Debe ser acíclico; cualquier ciclo es un defecto del manifiesto y detiene la generación.
4. Contratos inter-proyecto. Por cada arista de dependencia con contrato formal, qué expone el proyecto de código productor al consumidor, con referencia al `contratos-<area>` del productor. Si los contratos son numerosos, se detallan en `Contratos-Inter-Proyecto.md` y esta sección los indexa.
5. Decisiones de nivel producto. Índice de los ADRs de `Producto/Adrs/` que afectan a más de un proyecto de código (estilo de composición, política de versionado inter-proyecto, estrategia de comunicación entre proyectos de código). Si no hay decisiones de nivel producto, declararlo explícitamente.
6. Cross-cutting compartido. Convenciones transversales que el producto impone a todos sus proyectos de código: correlación de logging y tracing entre proyectos de código, formato de errores común, gestión de versiones de los paquetes compartidos y redistribuibles.
7. Riesgos de integración inter-proyecto. Cada riesgo con impacto, probabilidad y mitigación, enfocado en las fronteras entre proyectos de código (incompatibilidad de contratos, acoplamiento de versiones, orden de despliegue).
8. Trazabilidad. Tabla que liga cada contrato inter-proyecto a la dependencia del manifiesto que materializa y a los CU que cruzan la frontera entre proyectos de código.

Para un producto de un único proyecto de código, la vista de producto se omite por completo: el mapa tendría un solo nodo y el grafo ninguna arista, de modo que su contenido se reduce a la arquitectura del único proyecto de código y al README raíz.

---

## 5. Preguntas guía para el subagente

### 5.1 Upstream

- ¿Cada CU de 02 tiene al menos un componente que lo cubre? ¿Hay CU sin componente, lo cual debería disparar alerta?
- ¿Cada RN de 02 está reflejada en algún componente o ADR? Las RN no se documentan otra vez; se vinculan.
- ¿Qué NFR vienen de 00 y 01 y cómo se traducen a la tabla de quality attributes?
- ¿El modelo conceptual de 02 cubre todas las entidades necesarias para el modelo lógico?

### 5.2 Scope

- ¿La arquitectura cubre lo que el tipo D8 exige y omite lo que no aplica?
- ¿Hay componentes con responsabilidades que pisan el alcance funcional definido en 02?
- ¿Hay decisiones que merecen su propia ADR y están enterradas como bullets del documento maestro?
- ¿Hay contratos externos que el tipo D8 obliga a documentar (REST para rest-api, mensajes para worker-service, abstractions para library)?

### 5.3 Trazabilidad

- ¿Cada componente declara los CU que cubre?
- ¿Cada ADR referencia las NB, CU, RN o NFR que la motivan?
- ¿Cada NFR tiene una ADR asociada o una justificación explícita de por qué no la necesita?
- ¿El modelo lógico referencia el modelo conceptual entidad por entidad?

### 5.4 Calidad

- ¿Cada ADR contempla al menos dos alternativas evaluadas con pros y contras?
- ¿Cada decisión tiene una métrica que permita verificar si está cumpliendo su objetivo?
- ¿Los cross-cutting concerns están centralizados en una sola sección?
- ¿Hay riesgos arquitectónicos identificados con mitigación explícita?

### 5.5 Versionado e inmutabilidad

- ¿Hay alguna ADR aceptada que se haya editado en su cuerpo en vez de ser superada por una nueva ADR?
- ¿Las versiones superadas de `arquitectura-producto` y `Modelo-Datos-logico` están en `_legacy/` con estado correcto?
- ¿El índice `Decisiones-Arquitectura.md` refleja todas las ADRs con su estado real?

---

## 6. Criterios de aceptación

- [ ] Existe `Arquitectura-Proyecto-Codigo.md` con las cuatro vistas mínimas (lógica, procesos, despliegue, datos) y las secciones §1 a §10 del §4.2.
- [ ] Existe `Decisiones-Arquitectura.md` que indexa los ADRs con su estado y fecha actual.
- [ ] Hay al menos tres ADRs en `Adrs/` como archivos individuales, cada uno con las diez secciones obligatorias del §4.3.
- [ ] Cada ADR tiene estado declarado (Propuesto, Aceptado, Superado por ADR-YY o Rechazado).
- [ ] Si el tipo D8 exige persistencia, existe `Modelo-Datos-Logico.md` con migración inicial referenciada y trazabilidad al modelo conceptual de 02.
- [ ] Si el tipo D8 exige contratos externos, existe `contratos-<area>.md` por cada área con esquema, errores y versionado declarados.
- [ ] El estilo arquitectónico tiene justificación explícita contra al menos dos alternativas descartadas.
- [ ] Cada NFR declara objetivo numérico y mecanismo de medición.
- [ ] Trazabilidad NFR↔arquitectura↔ADR explícita en al menos una tabla del documento maestro.
- [ ] Ningún archivo de la carpeta de trabajo lleva sufijo de versión en el nombre; cada uno declara su versión en el campo `Versión` de su cabecera (D4).
- [ ] Ningún ADR está consolidado dentro de otro documento; cada decisión vive en su archivo individual.
- [ ] No hay menciones a stacks concretos, productos comerciales ni protocolos específicos del dominio fuente.
- [ ] Existe `README.md` de la sección si así lo decide el equipo (recomendado).

Criterios adicionales de nivel producto (solo si el producto tiene más de un proyecto de código):

- [ ] Existe `Producto/Vista-Producto.md` con las ocho secciones del §4.8.
- [ ] El mapa de proyectos de código de la vista refleja el manifiesto sin divergencias (mismos proyectos de código, mismos D8, mismos nombres de código).
- [ ] El grafo de dependencias de la vista es acíclico y coincide con las dependencias del manifiesto.
- [ ] Cada contrato inter-proyecto corresponde a una arista de dependencia del manifiesto y referencia el `contratos-<area>` del proyecto de código productor.
- [ ] Las decisiones de nivel producto, si existen, viven en `Producto/Adrs/` como ADRs individuales con las mismas reglas de inmutabilidad que los ADRs de proyecto de código.
- [ ] Para un producto de un único proyecto de código, la vista de producto se omitió correctamente y no quedó `Producto/` huérfano.
- [ ] Todo documento con más de tres secciones de primer nivel incluye tabla de contenido inmediatamente después de la cabecera, con enlaces ancla a las secciones de primer y de segundo nivel. Los documentos breves quedan exceptuados.
- [ ] Todo término que esta categoría acuña o precisa, y que aparece en más de uno de sus artefactos, está declarado en `Glosario-Tecnico.md` de 11 para el vocabulario técnico, y `Glosario-Funcional.md` de 02 para los términos de dominio que reusa, con sus referentes cuando tiene más de uno. Es la categoría que más vocabulario técnico acuña —componente, contrato, capa, adaptador, límite de consistencia— y el que más se reusa aguas abajo. Los ADR son el lugar donde un término técnico nuevo aparece por primera vez, así que el ADR que lo introduce lo define.
- [ ] Ninguna forma desnuda de un término polisémico queda sin resolver en un artefacto que se lee por secciones (`Vocabulario-Rules.md` §9.2).
- [ ] Ninguna polisemia con contextos disjuntos se reporta como defecto ni se corrige calificando todas las ocurrencias (criterio negativo de `Vocabulario-Rules.md` §9.1).

---

## 7. Ejemplos genéricos

### 7.1 Ejemplo 1 — Fragmento de ADR para un web-monolith de turnos médicos

Fragmento ilustrativo, no documento completo:

```markdown
# ADR-03 — Elección de base de datos relacional para turnos médicos

**Proyecto de código:** {{Nombre-Proyecto-Codigo}}
**Documento:** ADR-03-Eleccion-Base-Datos-Postgres.md
**Versión:** 1.0
**Estado:** Aceptado
**Fecha:** 2026-05-17
**Autor:** Equipo Arquitectura
**Categoría:** Persistencia

## 1. Contexto
El sistema de turnos médicos requiere transacciones ACID, integridad referencial estricta entre paciente, agenda y reserva, e índices compuestos para búsquedas por profesional y rango horario. El volumen estimado es alto pero acotado a un único bounded context. NB-02 exige consistencia inmediata; RN-04 prohíbe la superposición de turnos.

## 2. Decisión
Se adopta una base de datos relacional como almacenamiento principal del bounded context de turnos.

## 4. Alternativas consideradas
| Alternativa | Pros | Contras |
| --- | --- | --- |
| Base relacional | Transacciones ACID, restricciones declarativas, madurez del ecosistema | Costo operativo de gestión del esquema |
| Base documental | Flexibilidad de esquema, escala horizontal trivial | No garantiza integridad referencial; complica la regla de no superposición |
| Almacenamiento clave-valor | Latencia muy baja | Requiere reimplementar consistencia transaccional en aplicación |

## 5. Consecuencias positivas
- RN-04 se materializa mediante restricción única compuesta a nivel de motor de base de datos.
- CU-03 obtiene atomicidad sin lógica adicional en la capa de aplicación.

## 6. Consecuencias negativas
- Requiere un plan de migraciones versionado desde el inicio.
- Acopla el bounded context al modelo relacional; un cambio futuro implica reescribir el repositorio.

## 8. Métricas de validación
- Latencia p95 de CU-03 menor a 200 ms con 50 turnos concurrentes.
- Cero superposiciones de turnos en pruebas de concurrencia de 08.
```

### 7.2 Ejemplo 2 — Fragmento de arquitectura de producto para un microservicio de pagos

Fragmento ilustrativo, no documento completo:

```markdown
# Arquitectura de producto — Microservicio de pagos

**Proyecto de código:** {{Nombre-Proyecto-Codigo}}
**Documento:** Arquitectura-Proyecto-Codigo.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-05-17

## 2. Estilo arquitectónico
Bounded context independiente con Clean Architecture interna (Domain, Application, Infrastructure, API) y comunicación asincrónica con otros contextos vía bus de eventos. Alternativas descartadas: monolito modular (no permite deploy independiente exigido por NFR-02) y servicio sin separación de capas (impide testear el dominio sin infraestructura).

## 3. Vista lógica
| Componente | Responsabilidad | Entradas | Salidas | Dependencias |
| --- | --- | --- | --- | --- |
| API de pagos | Expone endpoints REST de intención y confirmación | HTTP | Eventos de dominio | Application |
| Application | Orquesta commands y queries | Comandos validados | Eventos | Domain, Infrastructure |
| Domain | Reglas de negocio de pagos | DTOs internos | Entidades y eventos | Ninguna |
| Infrastructure | Persistencia y publicación de eventos | Entidades | Filas en base; mensajes en bus | Domain |

## 4. Vista de procesos
Cada confirmación de pago se procesa en una transacción local que incluye la actualización del agregado y la inserción del evento en una tabla outbox. Un proceso de publicación asincrónica drena la outbox al bus de eventos. Patrón saga coordina con el contexto de reservas mediante eventos de compensación.

## 7. Cross-cutting concerns
- Logging estructurado con identificador de correlación propagado desde el gateway.
- Tracing distribuido con identificadores de span propagados en headers y en metadatos de mensajes.
- Manejo de errores con problem+json RFC 7807; cada error declara un código estable.

## 8. Quality attributes
| NFR | Objetivo | Mecanismo | ADR |
| --- | --- | --- | --- |
| Latencia p95 confirmación | < 300 ms | métrica del servicio | ADR-02 |
| Disponibilidad mensual | >= 99,9 % | SLO con error budget | ADR-04 |
| Idempotencia de confirmación | 100 % de operaciones repetidas | clave de idempotencia + tabla de claves vistas | ADR-05 |
```

Los dos fragmentos son ilustrativos. Cada proyecto de código adapta el dominio respetando la estructura.

---

## 8. Prompt-snippet sugerido

```text
Sos un {{ESPECIALIDAD-VARIANTE}} responsable de redactar la arquitectura técnica del proyecto de código {{NOMBRE_PROYECTO_CODIGO}}.

Insumos:
- PRODUCT-INTAKE: {{path}}
- Upstream: 00 (visión, restricciones), 01 (NB-XX), 02 (CU, RN, modelo conceptual, RC), 04 (contratos de prompts si aplica).

A generar (según tipo {{TIPO}} de D8):
- Arquitectura-Proyecto-Codigo.md con las cuatro vistas mínimas y NFR con métricas numéricas.
- Decisiones-Arquitectura.md como índice navegable de ADRs.
- Adrs/ADR-XX-<Nombre>.md, uno por decisión, mínimo según §2.2. Crítico: archivos individuales, no consolidado.
- Modelo-Datos-Logico.md si el tipo D8 exige persistencia.
- Flujo-Ejecucion.md si el tipo D8 tiene pipeline o motor de procesamiento.
- contratos-<area>.md por cada contrato externo según §2.2.
- Extensibilidad.md si el tipo D8 tiene puntos de extensión.
- README.md de la sección (recomendado).

Reglas de redacción: §4 de Rules-Arquitectura-Tecnica.md.
Nomenclatura: `ADR-XX-<Nombre>.md` con guion medio `-v` (no `_v` ni `.v`); slug en Título-Con-Guiones estricto.
Convención crítica: cada ADR es un archivo individual bajo Adrs/. Prohibido consolidar todas las decisiones en un único archivo (corrección del antecedente Motor DSL).
Inmutabilidad: ADR aceptada no se edita; si la decisión cambia, se crea ADR-YY nueva y la anterior pasa a `Superado por ADR-YY`.
Trazabilidad: cada ADR referencia NB, CU, RN o NFR que la motivan; cada componente lista CU cubiertos.
Criterios de calidad: §6 de Rules-Arquitectura-Tecnica.md.

Restricciones: no introducir stacks concretos, productos comerciales ni protocolos del dominio fuente. Idioma rioplatense técnico, tildes correctas, sin emojis.

Salida: SDD/Docs/Proyectos/{{NOMBRE_PROYECTO_CODIGO}}/05-Arquitectura-Tecnica/<estructura>.
```

Prompt-snippet de la vista de producto (se despacha una sola vez, al cierre del bucle de proyectos de código, solo si el producto tiene más de un proyecto de código):

```text
Sos un Arquitecto de Soluciones Senior (variante Arquitecto de Software Distribuido si la jerarquía implica comunicación entre proyectos de código autónomos) responsable de redactar la vista de producto de {{NOMBRE_PRODUCTO}}.

Insumos:
- PRODUCT-MANIFEST: {{path}} (mapa de proyectos de código, dependencias, nombres de código).
- Las arquitecturas de cada proyecto de código ya generadas y aprobadas en Proyectos/<Nombre>/05-Arquitectura-Tecnica/.

A generar:
- Producto/Vista-Producto.md con las ocho secciones del §4.8.
- Producto/Contratos-Inter-Proyecto.md si los contratos que cruzan proyectos de código son numerosos.
- Producto/Adrs/ADR-XX-<Nombre>.md por cada decisión que afecte a más de un proyecto de código.

Reglas: el mapa y el grafo reflejan el manifiesto sin divergencias; cada contrato inter-proyecto corresponde a una arista de dependencia; no duplicar la arquitectura interna de cada proyecto de código, referenciarla.
Criterios de calidad: §6 de Rules-Arquitectura-Tecnica.md (criterios de nivel producto).

Salida: SDD/Docs/Producto/<estructura>.
```

---

## 9. Control de cambios

| Versión | Fecha | Descripción |
| --- | --- | --- |
| 1.0 | 2026-05-17 | Versión inicial de las reglas constructivas de la categoría 05. Establece la convención obligatoria de ADRs individuales bajo `Adrs/` como corrección del antecedente Motor DSL, define las cuatro vistas mínimas del documento maestro, las diez secciones obligatorias del ADR, las variantes por tipo D8 y los criterios de aceptación. |
| 1.1 | 2026-06-09 | Reformulación a solución más jerarquía (ST-05). La categoría 05 opera en dos niveles: por proyecto (bajo `Proyectos/<Nombre>/05-Arquitectura-Tecnica/`, con la variante §1.2 del D8 del proyecto, sin cambios respecto del template de tipo único) y de solución (bajo `Solucion/`). Se introduce la vista de solución `Vista-Solucion.md` con sus ocho secciones (§4.8): mapa de proyectos, grafo de dependencias, contratos inter-proyecto, decisiones de nivel solución, cross-cutting compartido, riesgos de integración y trazabilidad. Se agregan `Contratos-Inter-Proyecto.md` y `Solucion/Adrs/`. La vista de solución es obligatoria para soluciones de más de un proyecto y se omite en el caso degenerado de un proyecto. | Reformulación SDD |
| 1.2 | 2026-06-10 | Migración de referencias de intake al documento unificado SOLUTION-INTAKE (unificación de intake). | Migración SDD |
| 1.3 | 2026-07-26 | Se declara en §0 la frontera con la categoría 11: esta categoría documenta la arquitectura como decisión de diseño; el sistema como hecho consumado, con la ubicación de cada componente en el repositorio, lo documenta la categoría 11. Sin cambios de artefactos ni de gating.  Reformulación SDD |
| 1.4 | 2026-07-26 | Navegabilidad para lectores humanos: §4.1 y §6 exigen tabla de contenido en todo documento generado que supere las tres secciones de primer nivel, con enlaces ancla de primer y segundo nivel y excepción para documentos breves. Es el único cambio: no se altera la estructura obligatoria de los documentos, no se agregan artefactos ni carga narrativa. |
| 2.0 | 2026-07-28 | Normalización del versionado (framework 4.0). El archivo vivo pierde el sufijo de versión del nombre y pasa a declarar su versión en el campo `Versión` de su cabecera; el sufijo `-v<X.Y>.md` queda reservado a las copias archivadas en `_legacy/`. Se actualizan los patrones de nombre, los ejemplos, las cabeceras modelo, los anti-patrones y los criterios de aceptación de la categoría. Sube major porque la documentación generada con la nomenclatura anterior deja de cumplir. Deriva de la reformulación de D4 y D5 en el `README.md` del framework. |
| 3.0 | 2026-07-29 | Renombre de vocabulario normativo (framework 5.0). El nivel superior pasa de «solución» a **producto**, la unidad de compilación de «proyecto» a **proyecto de código**, y los cuatro planos de identidad del producto se separan en campos propios (`Nombre-Producto`, `Slug-Producto`, `Raiz-Codigo`, `Artefacto-Agrupacion`). Se declara el nivel de aplicación de la regla en su cabecera, según `Vocabulario-Rules.md` §4 R3. Sube major porque los identificadores y los nombres de artefacto cambian, y la documentación generada con la nomenclatura anterior deja de cumplir. |
| 3.1 | 2026-07-29 | Criterio de gobierno del glosario en §6. Sube minor: agrega criterios de aceptación verificables sin cambiar el conjunto de artefactos de la categoría ni ninguna invariante, y ninguna documentación ya emitida deja de cumplir por sí sola. Los tres criterios exigen que todo término que la categoría acuña o precisa y usa en más de uno de sus artefactos esté declarado en el glosario que le corresponde, que ninguna forma desnuda de un término polisémico quede sin resolver en un artefacto que se lee por secciones, y —criterio negativo— que ninguna polisemia con contextos disjuntos se reporte como defecto. Materializan `Vocabulario-Rules.md` §9 en la categoría. **Origen**: el audit verificaba «glosario sin contradicciones», que un glosario incompleto cumple trivialmente, y esta regla no mencionaba la palabra «glosario» ni una vez. |
