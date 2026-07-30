# Reglas constructivas — 03 UX / UI / DX

**Carpeta target (por proyecto de código):** `SDD/Docs/Proyectos/<Nombre-Proyecto-Codigo>/03-UX-UI-DX/`
**Nivel de aplicación (`Vocabulario-Rules.md` §4 R3):** Proyecto de código
**Subagente target del orquestador:** Especialista UX/UI o Especialista DX (AG-03), según variante.
**Versión de las reglas:** 4.0

---

## 0. Posición en la cadena SDD

La categoría 03 recibe insumos de 00 (visión, alcance, persona objetivo) y de 02 (CU con interacción humana significativa, RN que afectan la presentación). Produce los artefactos que sirven como ancla para 05 (arquitectura de la capa de presentación o del portal de developers), 06 (US con criterios de aceptación visuales o de ergonomía de API), 08 (tests de UI, snapshot y accesibilidad) y 11 (ejemplos de uso ilustrados). Su salida define cómo se siente el producto, sin invadir el qué de 02 ni el cómo de 05.

La categoría 03 tiene dos variantes principales:

- Variante UX/UI, para tipos D8 con interfaz visible al usuario final.
- Variante DX, para tipos D8 cuya superficie pública es código, contratos, mensajes de error y documentación.

El orquestador elige la variante según el `tipo_proyecto_codigo` del proyecto de código en curso (leído del manifiesto) y, en algunos casos, las combina (ver §1.3). La variante se aplica una vez por cada proyecto de código del producto.

---

## 1. Especialidad asignada

### 1.1 Especialidad base

Especialista en experiencia, equivalente AG-03 del catálogo SDD. Su perfil profesional combina investigación de usuarios, diseño de interacción, accesibilidad, redacción técnica y diseño de APIs. Se alinea con ISO 9241-210 para el proceso centrado en personas, con WCAG 2.2 nivel AA como piso de accesibilidad, con las heurísticas de Nielsen y las reglas de Shneiderman para la inspección, y con el marco Diátaxis para la estructura de documentación técnica orientada al developer.

La variante UX/UI se enfoca en personas no técnicas que recorren pantallas. La variante DX se enfoca en developers que integran una librería, consumen una API, operan un CLI o supervisan un servicio en segundo plano. Las dos variantes comparten el mismo cuerpo conceptual y los mismos principios; cambian los artefactos producidos y las métricas de éxito.

### 1.2 Variantes según tipo de proyecto de código (8 valores D8)

| Tipo | Variante | Especialidad específica | Justificación |
| --- | --- | --- | --- |
| library | DX | DX Lead | El producto se consume por código. El foco está en la superficie pública, la documentación de cada función o tipo, y los ejemplos ejecutables. |
| web-monolith | UX/UI | UX/UI Designer + Frontend Lead | El usuario final recorre pantallas en navegador. Se diseña experiencia, layout, estados y accesibilidad de cada vista. |
| web-microservices (con frontend) | UX/UI | UX/UI Designer + Frontend Architect | El frontend integra varios servicios. Se diseña experiencia consistente entre módulos y un design system compartido. |
| web-microservices (sin frontend) | DX | DX Lead para portal de developers | La superficie pública es la API. Se diseña el portal de documentación, los ejemplos de integración y los mensajes de error. |
| desktop-app | UX/UI | UX/UI Designer + Cross-Platform Specialist | Se diseña la experiencia para sistema operativo con convenciones de plataforma (atajos de teclado, ventanas, instaladores). |
| mobile-app-maui | UX/UI | Mobile UX Designer + Accessibility Specialist | El uso es táctil, en contextos variables, con consideraciones de permisos del sistema operativo y de accesibilidad reforzada. |
| rest-api | DX (con UX en portal) | API DX Designer + Developer Advocate | El rol de intervención es un developer integrador. Se aplica Diátaxis al portal de docs, OpenAPI como contrato y ejemplos de cada endpoint. |
| cli-tool | DX | CLI UX Designer + DX Engineer | La interfaz es la línea de comandos. Se diseña ayuda contextual, mensajes de error accionables, autocompletado y exit codes. |
| worker-service | DX para operadores | DX Engineer (Operability) | El rol de intervención es el operador del servicio. Se diseñan logs estructurados, dashboards, alertas y runbooks. |

### 1.3 Multi-especialidad

La categoría 03 se combina con otras especialidades cuando el alcance lo requiere:

- AG-02 Analista Funcional, para que cada flujo UX se ancle en un CU con interacción humana y cada artefacto DX se ancle en el contrato funcional de la API o de la CLI.
- AG-04 Ingeniero de Prompts, cuando una pantalla o un comando dispara un flujo asistido por LLM, para definir los affordances y los estados de espera, error y revisión humana.
- AG-05 Arquitecto, para alinear el wireframe con la arquitectura de la capa de presentación, o el portal de developers con el contrato OpenAPI.
- AG-08 QA, para que los estados visuales y los mensajes DX sean automatizables como snapshot tests o tests de contrato.
- AG-10 Technical Writer, para alinear el tono de los mensajes y la documentación con la guía de estilo del proyecto de código.

Hay dos casos de combinación explícita de variantes:

- rest-api con portal de developers visible. La superficie técnica es DX, pero el portal en sí es una aplicación web con experiencia propia. El artefacto principal es `DX-Portal-Developers.md`, complementado con wireframes de las pantallas clave del portal.
- web-microservices con frontend más SDK público. Se produce experiencia para el usuario final (UX/UI) y experiencia para el integrador externo (DX), en documentos separados.

El AG-03 mantiene siempre la titularidad del artefacto; las demás especialidades aportan revisiones acotadas.

### 1.4 Insumos normativos de diseño por stack

Antes de redactar `experiencia-de-uso` y `wireframes`, el AG-03 carga el catálogo de diseño de `devs/References/Design/` a través de su índice `Index-Design-Rules.md`.

Aplica siempre el documento base `Design-Rules-Web-Generico.md` y, si existe, la especialización del stack declarado en la Parte C del intake (por ejemplo `Design-Rules-Blazor-Mudblazor.md` para Blazor Interactive Server + MudBlazor). Si no hay especialización para el stack, rige únicamente el documento base.

Los tokens, patrones, estados y la iconografía SVG del catálogo son normativos: el subagente referencia sus patrones por nombre y hereda sus tokens; tiene prohibido definir tokens visuales ad hoc por proyecto de código. Un token nuevo solo se admite si es transversal y se promueve al catálogo.

Trazabilidad: cada artefacto 03 con UI declara, en su tabla de trazabilidad, el o los documentos del catálogo de diseño aplicados.

Cuando el proyecto de código tiene superficies de configuración (parámetros que el usuario fija), el AG-03 carga además, vía el índice, la extensión por capacidad `Design-Rules-Config-Esquema`. En esas superficies, los artefactos `experiencia-de-uso` y `wireframes` deben: describir cada parámetro configurable por su descriptor (etiqueta, leyenda, default, límites, ejemplos); colgar la ayuda contextual de cada campo del descriptor; incluir presets cuando apliquen; incluir la explicación en lenguaje natural ("en palabras"); declarar el modo simulación; y reservar la ranura del asistente de IA (forward-compat) sin construirla. La frontera `PropuestaDeConfiguracion` se previsualiza y se confirma antes de aplicar: la UI propone, el humano confirma, el sistema valida. Además, el AG-03 declara la frontera entre configuración de aplicación (la que el usuario gobierna desde el sistema) y configuración de entorno (la que se fija al desplegar la instancia), y no dibuja en la superficie ningún parámetro que esta no gobierne, ni siquiera deshabilitado.

Cuando el proyecto de código se despliega por instancia y arranca sin la configuración mínima que lo hace utilizable, el AG-03 carga además la extensión `Design-Rules-Primer-Arranque`. En ese caso, `experiencia-de-uso` y `wireframes` deben: declarar el predicado único de aprovisionamiento y el artefacto mínimo que lo satisface; describir el corte en las tres capas (ruteo, superficie y acción) contra ese mismo predicado; dibujar la superficie de aprovisionamiento sin chrome de navegación y sin acción de cancelar; declarar explícitamente el destino al completar; y describir la orientación posterior que sugiere los pasos siguientes sin bloquear.

Cuando el proyecto de código declara una sola identidad de operación, el AG-03 carga además la extensión `Design-Rules-Acceso-Monousuario`. En ese caso, `experiencia-de-uso` y `wireframes` deben: declarar de forma explícita las omisiones del perfil (registro, selector de cuenta, recuperación, persistencia opcional de sesión, roles visibles), que no se dibujan ni siquiera deshabilitadas; describir el shell partido de acceso y de trabajo; resolver los mensajes desde un catálogo de códigos de resultado con rechazo de credenciales indiferenciado y sin exponer parámetros de la política; y declarar la duración de la sesión, su vencimiento y el efecto de cada acto de identidad sobre la sesión en curso.

Cuando el proyecto de código produce artefactos desplegables identificables, el AG-03 carga además la extensión `Design-Rules-Identidad-De-Version`. En ese caso, `experiencia-de-uso` y `wireframes` deben: declarar el contrato de identidad de versión que la superficie consume; ubicar el sello en las dos ubicaciones obligatorias (superficie de acceso y superficie del sistema en funcionamiento); y describir el distintivo de artefacto preliminar, el marcador de origen indeterminado y el detalle de diagnóstico con copiado en un solo gesto. La versión se deriva del proceso de construcción; la vista no la compone ni la transcribe.

El arquetipo de panel de control monolítico de un servicio específico carga las cuatro extensiones a la vez.

### 1.5 Relación con la Fase B2 de validación visual de maqueta

Cuando el proyecto de código tiene `requiere_maqueta` == true, lo que AG-03 redacta no cierra en su propio audit: se materializa después en una maqueta navegable que el humano valida, y esa validación vuelve. La regla completa de esa fase es `Maqueta-Rules.md`; acá se declara lo que le toca a AG-03.

Antes de la Fase B2. AG-03 escribe sabiendo que sus artefactos van a ser el insumo de una maqueta. En consecuencia:

- Cada `wireframes-<superficie>` corresponde a una superficie maquetable y declara su nombre canónico, que es el que va a llevar el archivo HTML de la maqueta.
- La tabla de estados de cada wireframe es la lista de estados que la maqueta va a tener que demostrar. Un estado no declarado no se maqueta y por lo tanto no se valida.
- Los flujos clave de `Experiencia-De-Uso` son las rutas de navegación que la maqueta va a materializar.
- AG-03 no dibuja la maqueta ni define valores visuales concretos: sigue rigiendo el anti-patrón de wireframe con detalle de CSS del §4.4.

Después de la Fase B2. AG-03 es el receptor de la retroalimentación. Los artefactos afectados suben minor y suman a su control de cambios el motivo `Retroalimentación de la Fase B2 de validación de maqueta`. La categoría 03 incorpora además tres artefactos nuevos que produce la fase y que viven en esta carpeta:

- `Linea-Base-Visual.md`: inventario identificado de superficies, componentes, estados y rutas de la maqueta aprobada.
- `Contrato-Datos-Maqueta.md`: los campos del modelo de datos que la maqueta exhibe, con su correspondencia al modelo conceptual de 02.
- `Bitacora-Validacion-Maqueta.md`: registro de las iteraciones de validación.

Los tres son insumo del sensado de deriva (`Deriva-Rules.md`) y quedan bajo la titularidad documental de 03, aunque los emita AG-03M.

Si `requiere_maqueta` == false, esta sección no aplica y la categoría 03 cierra en su audit de Fase B como siempre.

---

## 2. Documentos que produce esta categoría

### 2.1 Tabla maestra de artefactos

| Archivo | Variante | Obligatorio para | Recomendado | Omitir para | Descripción |
| --- | --- | --- | --- | --- | --- |
| `Experiencia-De-Uso.md` | UX/UI | web-monolith, web-microservices (con frontend), desktop-app, mobile-app-maui | — | library, cli-tool, worker-service, rest-api sin portal | Marco de experiencia: audiencia, principios de diseño, flujos clave, accesibilidad, internacionalización, performance percibida. |
| `wireframes-<superficie>.md` | UX/UI | Tipos con UI final, uno por pantalla o flujo principal | — | Tipos sin UI final | Esquema textual o ASCII de cada pantalla con componentes, estados, interacciones, versión móvil cuando aplica. |
| `representacion-<concepto>.md` | UX/UI o DX | Cuando hay una representación visual o estructural reutilizada (un componente, una notificación, un documento exportado) | — | Si no aplica | Documento focalizado sobre una representación específica del sistema. |
| `Glosario-UX.md` | UX/UI o DX | **Todos los tipos D8**: los tipos con UI final y los tipos DX, que acuñan su propio vocabulario de superficie pública | — | — | Terminología canónica de la sección (pantalla, vista, modal, toast, estado vacío, etcétera; en variante DX, los términos de la superficie pública y del recorrido de integración). Regla de inclusión y de no duplicación en §3.3. |
| `DX-Developer-Experience.md` | DX | library, cli-tool, worker-service, rest-api, web-microservices sin frontend | — | Tipos con UI final únicamente | Marco DX: rol de intervención developer, onboarding por tramos, quick-start, Diátaxis, mensajes de error, métricas DX. |
| `Guia-Onboarding-Developer.md` | DX | library, rest-api, web-microservices sin frontend | cli-tool, worker-service | — | Recorrido de primera hora del developer integrador. |
| `DX-Error-Messages.md` | DX | cli-tool, library | rest-api, worker-service | — | Catálogo de mensajes de error y su diagnóstico accionable. |
| `DX-Portal-Developers.md` | DX | rest-api con portal visible, web-microservices con SDK público | library con portal hospedado | Tipos sin portal | Especificación del portal de documentación de developers. |
| `DX-Operability.md` | DX | worker-service | rest-api con SLO estricto | Tipos con UI final | Experiencia del operador: logs estructurados, dashboards, alertas, runbooks. |
| `Linea-Base-Visual.md` | UX/UI | Proyectos de código con `requiere_maqueta` == true, al aprobarse la maqueta | — | Proyectos de código sin Fase B2 | Inventario identificado (`SUP-XX`, `CMP-XX`, `EST-XX`, `NAV-XX`) de lo que el humano aprobó al mirar la maqueta. Lo emite AG-03M; ver `Deriva-Rules.md` §2.1. |
| `Contrato-Datos-Maqueta.md` | UX/UI | Proyectos de código con `requiere_maqueta` == true, al aprobarse la maqueta | — | Proyectos de código sin Fase B2 | Campos del modelo de datos que la maqueta exhibe (`DM-XX`), con tipo, ejemplo, superficies y correspondencia al modelo conceptual de 02. Ver `Deriva-Rules.md` §2.2. |
| `Bitacora-Validacion-Maqueta.md` | UX/UI | Proyectos de código con `requiere_maqueta` == true | — | Proyectos de código sin Fase B2 | Registro de las iteraciones de validación de la maqueta: vía, observación del humano, cambio aplicado y documento retroalimentado. |
| `README.md` de la sección | Ambas | Recomendado para todos | — | — | Índice navegable de la sección con estado actual de cada artefacto. |

### 2.2 Reglas de inclusión y exclusión por tipo

| Tipo D8 | Variante principal | Mínimo de wireframes | DX docs obligatorios |
| --- | --- | --- | --- |
| library | DX | 0 | `dx-developer-experience`, `guia-onboarding-developer`, `dx-error-messages` |
| web-monolith | UX/UI | 1 por superficie clave (mínimo 4: login, home, flujo principal, error) | — |
| web-microservices (con frontend) | UX/UI | 1 por módulo expuesto (mínimo 5) | — |
| web-microservices (sin frontend) | DX | 0 | `dx-developer-experience`, `dx-portal-developers` |
| desktop-app | UX/UI | 1 por ventana principal (mínimo 4) | — |
| mobile-app-maui | UX/UI | 1 por pantalla principal en portrait, más una nota responsive (mínimo 5) | — |
| rest-api | DX (con UX en portal opcional) | 0 (1 a 3 si hay portal visible) | `dx-developer-experience`, `guia-onboarding-developer`, `dx-portal-developers` |
| cli-tool | DX | 0 | `dx-developer-experience`, `dx-error-messages` |
| worker-service | DX | 0 | `dx-developer-experience`, `dx-operability` |

El mínimo es piso, no techo. La cota superior queda definida por la cobertura de los CU con interacción humana relevante o de la superficie pública del producto.

---

## 3. Nomenclatura y vinculación

### 3.1 Patrón de nombres

- `experiencia-de-uso.md` para el marco UX.
- `wireframes-<Superficie>.md` para cada superficie. Ejemplo: `Wireframes-Pantalla-Login.md`.
- `representacion-<Concepto>.md`. Ejemplo: `Representacion-Notificacion-Toast.md`.
- `Glosario-UX.md` para el vocabulario de la sección.
- `dx-developer-experience.md` para el marco DX.
- `guia-onboarding-developer.md` para el recorrido de primera hora.
- `dx-error-messages.md` para el catálogo de errores accionables.
- `dx-portal-developers.md` para el portal de documentación.
- `dx-operability.md` para la experiencia del operador.

El archivo vivo no lleva sufijo de versión en el nombre: la declara en el campo `Versión` de su cabecera (D4). El sufijo `-v<X.Y>.md`, con guion medio y nunca con punto ni con guion bajo, identifica solo a las copias archivadas en `_legacy/`. El slug va en Título-Con-Guiones (cada palabra capitalizada, separadas por guion medio); quedan prohibidas las variantes todo-minúsculas, camelCase, con espacios o con acentos.

### 3.2 Convenciones de prefijos

- `wireframes-`: una superficie por archivo. Una superficie es una pantalla, un modal con flujo propio, una ventana o una pestaña con estados independientes.
- `representacion-`: una representación reutilizable por archivo. Sirve para conceptos que aparecen en varios wireframes y conviene centralizar.
- `dx-`: artefactos DX. Cada uno cubre un aspecto distinto: marco general, onboarding, mensajes de error, portal, operabilidad.
- `Glosario-UX`: nombre fijo. Sin variante de dominio.

### 3.3 Vinculación cross-doc

- Upstream: cada `experiencia-de-uso` declara la persona objetivo definida en 00 y los CU de 02 que tienen interacción humana. Cada wireframe declara el CU que lo origina. Cada DX doc declara la superficie pública (módulos de la librería, endpoints de la API, comandos del CLI, mensajes del worker) a la que sirve.
- Downstream: la sección 03 alimenta 05 con requisitos no funcionales de la capa de presentación o del portal, alimenta 06 con criterios de aceptación visuales o de ergonomía, y alimenta 08 con escenarios de snapshot test y de test de accesibilidad.
- Glosario: todo término que aparezca en más de un artefacto de 03 debe estar en `Glosario-UX.md`. Si un término ya está en `Glosario-Funcional.md` de 02 con la misma semántica, se referencia y no se duplica; si el sentido difiere, se declara la diferencia.
- Glosario, polisemia: todo término con más de un referente lleva entrada que enumera los referentes. El criterio de cuándo hace falta es `Vocabulario-Rules.md` §9: se desambigua cuando los sentidos comparten contexto de lectura, y el contexto de lectura de un subagente es la sección. Una polisemia con contextos disjuntos no se corrige.

### 3.4 README de la sección

Recomendado para todos los tipos. Debe listar los artefactos vigentes con propósito en una línea, la variante aplicada y el estado actual. Sirve como punto de entrada navegable para revisores externos (AG-05, AG-06, AG-08).

### 3.5 Política de versionado

Una sola versión vigente por nombre lógico. Cuando un artefacto pasa de `v1.0` a `v1.1` o `v2.0`:

1. Se crea el archivo nuevo en la carpeta principal con la versión actualizada.
2. La versión anterior se mueve a `_legacy/` con estado `Superado` y una nota al inicio que apunte a la versión vigente.
3. El README de la sección referencia únicamente la versión vigente.
4. Los wireframes y `dx-` docs que dependan del artefacto modificado se actualizan en la misma operación o se marca explícitamente la deuda.

Un nombre lógico tiene un solo archivo en la carpeta principal. Al superarse, se copia a `_legacy/` con el sufijo de la versión que preserva y el archivo vivo pasa a la versión nueva. La lección está documentada en la auditoría de Fase 0 del bootstrap: en el fuente convivían versiones paralelas sin marcado de deprecación y no había forma de saber cuál regía. en `Bootstrap/Audit-SDD1.md` Fase 0, donde se detectaron `experiencia-de-uso-del-motor-v1.0` y `v1.1` coexistiendo con la representación y los wireframes en el mismo estado.

---

## 4. Estructura de redacción

### 4.1 Cabecera obligatoria

Cada artefacto inicia con un H1 y un bloque markdown de metadatos:

```markdown
# <Título del artefacto>

**Proyecto de código:** {{Nombre-Proyecto-Codigo}}
**Documento:** <nombre-de-archivo>.md
**Versión:** <X.Y>
**Estado:** Borrador | Propuesto | Aprobado | Vigente | Superado | Archivado
**Fecha:** YYYY-MM-DD
**Autor:** {{equipo-o-rol}}
**Variante:** UX/UI | DX
```

**Tabla de contenido.** Todo documento generado que supere las tres secciones de primer nivel incluye una tabla de contenido inmediatamente después de la cabecera de metadatos, con enlaces ancla a cada sección de primer y de segundo nivel. La tabla de contenido no cuenta como sección de contenido ni altera la estructura obligatoria del documento: se ubica entre la cabecera y la primera sección, y las secciones obligatorias siguen siendo las que declara §4.2. Los documentos breves —fichas de una sola sección, entradas de índice— quedan exceptuados.

El ajuste es de navegabilidad. Estos documentos los lee principalmente un agente de IA que recorre la cadena de especificación acumulando contexto, y para ese lector la tabla de contenido es indiferente. Existe para el agente humano que entra a consultar un punto concreto sin haber leído el documento entero.

### 4.2 Secciones obligatorias de `Experiencia-De-Uso.md`

1. Audiencia y contexto de uso. Persona objetivo, contexto físico y emocional, frecuencia y duración de uso.
2. Principios de diseño. Selección explícita de heurísticas de Nielsen aplicables y leyes UX relevantes (Hick, Fitts, Miller, Jakob, según el caso) con justificación de aplicación al producto.
3. Flujos clave. Narrativa de cada user journey con disparador, pasos, puntos de fricción anticipados y salida.
4. Estados y feedback. Mapa de estados por superficie clave (vacío, cargando, con datos, error, sin conexión, éxito) con el feedback visual y textual esperado.
5. Accesibilidad. Compromiso explícito con WCAG 2.2 nivel AA mínimo. Identificación de criterios prioritarios (contraste, foco visible, navegación por teclado, etiquetas semánticas, alternativas textuales).
6. Internacionalización. Idiomas soportados, expansión de texto esperada, dirección de lectura, formatos de fecha y número.
7. Performance percibida. Tiempos máximos tolerables por acción, uso de skeletons, optimistic UI cuando aplica, criterios de animación.
8. Errores y recuperación. Taxonomía de errores que el usuario verá, tono de los mensajes, vías de recuperación o handoff humano.
9. Trazabilidad. Tabla con CU upstream, wireframes que materializan el marco, US a generar en 06, tests previstos en 08.
10. Notas y supuestos.
11. Control de cambios.

### 4.2.1 Secciones obligatorias de `wireframes-<superficie>.md`

1. Pantalla y propósito. Nombre canónico de la superficie y una a tres oraciones sobre la tarea que el usuario completa.
2. Layout. Descripción textual o ASCII art de la disposición espacial. No se incluyen colores, tipografías ni valores de CSS.
3. Componentes principales. Tabla con nombre, propósito, datos que muestra y comportamiento.
4. Interacciones. Tabla con acción, disparador, resultado esperado y precondición.
5. Estados. Tabla con estado, condición que lo produce y representación esperada.
6. Versión móvil o responsive cuando aplica. Notas sobre breakpoints, reflujo y elementos que se ocultan o se reorganizan.
7. Notas de implementación. Recomendaciones de accesibilidad específicas de la pantalla, performance percibida, internacionalización.
8. Trazabilidad. Tabla con CU origen, marco `experiencia-de-uso` aplicado, US a generar, tests previstos.
9. Control de cambios.

### 4.2.2 Secciones obligatorias de `representacion-<concepto>.md`

1. Concepto representado y propósito.
2. Apariencia esquemática. Descripción textual o ASCII.
3. Variantes. Tabla con variante, condición de uso y diferencias esperadas.
4. Datos que consume.
5. Restricciones de accesibilidad.
6. Reutilización. Listado de wireframes o `dx-` docs que la invocan.
7. Control de cambios.

### 4.2.3 Secciones obligatorias de `DX-Developer-Experience.md`

1. Rol de intervención developer. Tipo de developer (integrador, mantenedor, operador), nivel de experiencia esperado, herramientas que ya conoce.
2. Onboarding por tramos. Qué logra el developer en 5 minutos, en 30 minutos y en 1 hora. Cada tramo con su objetivo verificable.
3. Quick-start. Pasos mínimos para producir el primer resultado exitoso. Debe ser ejecutable y reproducible.
4. Diátaxis. Plan explícito de los cuatro modos de documentación: tutorial (orientado al aprendizaje), how-to (orientado a la tarea), reference (orientado a la información), explanation (orientado a la comprensión). Indicar dónde vive cada modo y cómo se enlazan.
5. Mensajes de error y diagnóstico. Principios de redacción (qué pasó, por qué pasó, qué hacer al respecto). Referencia al catálogo `dx-error-messages` cuando exista.
6. Métricas DX. Time-to-first-success (TTFS), time-to-first-value (TTFV), tasa de error de onboarding, otras métricas pertinentes.
7. Feedback loop. Cómo se recoge el feedback del developer (issues, discusiones, encuestas, telemetría con consentimiento) y cómo se incorpora al ciclo de mejora.
8. Trazabilidad. Tabla con superficie pública que se documenta, CU upstream, US a generar, tests previstos.
9. Control de cambios.

### 4.2.4 Secciones obligatorias de `Guia-Onboarding-Developer.md`

1. Audiencia y prerrequisitos.
2. Instalación o acceso. Pasos mínimos verificables.
3. Primer ejemplo ejecutable. Snippet que produce un resultado visible.
4. Diagnóstico de problemas frecuentes en la primera hora.
5. Próximos pasos. Enlaces explícitos al modo tutorial, how-to y reference (Diátaxis).
6. Control de cambios.

### 4.2.5 Secciones obligatorias de `DX-Error-Messages.md`

1. Principios de redacción de errores. Lenguaje plano, acción sugerida, sin culpar al usuario.
2. Taxonomía. Categorías de error (entrada inválida, recurso ausente, conflicto de estado, error transitorio, error interno).
3. Catálogo. Tabla con código, categoría, mensaje, causa probable, acción sugerida.
4. Tono y voz. Coherencia con la guía de estilo del proyecto de código.
5. Localización. Política de traducción de los mensajes técnicos.
6. Control de cambios.

### 4.2.6 Secciones obligatorias de `DX-Portal-Developers.md`

1. Audiencia y objetivos del portal.
2. Estructura de información según Diátaxis.
3. Navegación principal y búsqueda.
4. Páginas obligatorias (landing, quick-start, reference, changelog, status).
5. Ejemplos ejecutables y sandbox.
6. Accesibilidad del portal (WCAG 2.2 AA).
7. Métricas de uso del portal.
8. Control de cambios.

### 4.2.7 Secciones obligatorias de `DX-Operability.md`

1. Audiencia operador y contexto de operación.
2. Logs estructurados. Campos mínimos, niveles, correlation id.
3. Métricas y dashboards. Indicadores propuestos y umbrales.
4. Alertas y runbooks. Cada alerta con condición, severidad y acción esperada.
5. Procedimientos de recuperación.
6. Control de cambios.

### 4.3 Tablas tipo y formatos recurrentes

Se estandariza el uso de las siguientes tablas:

Tabla de estados y feedback (UX):

| Estado | Condición que lo produce | Feedback visual | Feedback textual |
| --- | --- | --- | --- |
| Vacío | No hay datos disponibles aún | Ilustración o ícono neutro | Texto orientativo con acción siguiente |
| Cargando | Operación asíncrona en curso | Skeleton o spinner según duración esperada | Indicación de qué se está cargando |
| Error | Falla recuperable | Banner o inline | Causa y acción de recuperación |
| Éxito | Acción completada | Confirmación visual sutil | Confirmación con próxima acción posible |

Tabla de heurísticas aplicadas (UX):

| Heurística de Nielsen | Aplicación en el producto | Verificación |
| --- | --- | --- |
| Visibilidad del estado del sistema | Stepper en flujos de varios pasos | Inspección heurística por dos revisores |

Tabla de métricas DX:

| Métrica | Definición | Objetivo | Cómo se mide |
| --- | --- | --- | --- |
| TTFS | Tiempo desde la instalación hasta el primer resultado exitoso | <= 5 minutos | Telemetría opt-in o pruebas con cinco developers |
| TTFV | Tiempo hasta el primer valor de negocio | <= 1 hora | Encuesta a developers de adopción reciente |
| Tasa de error en onboarding | % de developers que abandonan antes del primer éxito | <= 20% | Telemetría opt-in |

Tabla de trazabilidad de un artefacto 03:

| Dimensión | Referencia |
| --- | --- |
| Persona objetivo | <referencia a 00> |
| CU origen | <CU-XX en 02> |
| Reglas de negocio relevantes | <RN-XX si aplica> |
| Wireframes asociados | <archivo o N/A> |
| US a generar | <US-XX en 06> |
| Tests previstos | <referencia tentativa a 08> |
| Catálogo de diseño aplicado | <Design-Rules-Web-Generico y especialización por stack, o N/A para variante DX> |
| Configuración dirigida por esquema aplicada (descriptores, presets, modo simulación, ranura del asistente) | <sí / N/A> |
| Primer arranque aplicado (predicado de aprovisionamiento, guard en tres capas, destino al completar) | <sí / N/A> |
| Acceso de operador único aplicado (omisiones declaradas, shell partido, catálogo de resultados, política de sesión) | <sí / N/A> |
| Identidad de versión aplicada (contrato, ubicaciones del sello, detalle de diagnóstico) | <sí / N/A> |
| Modelo UX-UI aplicado en la Fase B2 | <Nombre-Modelo de `Modelos-UX-UI/`, "catálogo base" o N/A> |
| Validación visual de maqueta | <fecha de aprobación humana y ruta de la maqueta, o N/A si `requiere_maqueta` == false> |
| Línea de base emitida | <`Linea-Base-Visual.md` y `Contrato-Datos-Maqueta.md`, o N/A> |

### 4.4 Anti-patrones a evitar

| Anti-patrón | Problema | Solución |
| --- | --- | --- |
| Wireframe con detalle de CSS, paleta de colores o tipografía exacta | Invade UI fina; el wireframe se vuelve frágil ante cambios visuales | Mantener layout, jerarquía y comportamiento; la capa visual vive en 05 o en el design system |
| Documento de experiencia que solo describe el flujo feliz | El producto queda subdefinido ante fallos | Listar estados de error y recuperación por superficie |
| DX doc sin quick-start verificable o con snippet que no corre | El developer no logra el primer éxito y abandona | Validar manualmente el quick-start antes de publicar |
| Accesibilidad ausente o reducida a una mención genérica | Riesgo legal y de exclusión; impide cumplir 08 | Declarar WCAG 2.2 AA como piso y enumerar criterios prioritarios |
| Sufijo de versión en el nombre del archivo vivo | Reintroduce la segunda lógica de versionado que D4 eliminó, y con ella la colisión silenciosa al archivar | Un solo archivo por nombre lógico; la versión en la cabecera y el sufijo solo en `_legacy/` |
| Mensajes de error genéricos del tipo "Error 500" o "Ocurrió un problema" | El developer o el usuario no sabe qué hacer | Reescribir con causa probable y acción sugerida |
| Onboarding sin tramos verificables (5/30/60 minutos) | No se puede medir el éxito del onboarding | Agregar hitos verificables por tramo |
| Glosario duplicado con vocabulario distinto entre 02 y 03 | Confusión cross-doc | Reusar términos de 02 y solo agregar los nuevos de 03 |
| Wireframe sin estados | El developer de 05 no sabe qué dibujar cuando algo falla | Enumerar estados mínimos: vacío, cargando, con datos, error |
| DX docs que no aplican Diátaxis | Documentación mezclada entre tutorial y reference, ilegible | Separar los cuatro modos y enlazarlos explícitamente |
| Sufijo de versión en el nombre del archivo vivo | Reintroduce la segunda lógica de versionado que D4 eliminó, y con ella la colisión al archivar | El archivo vivo no lleva sufijo; la versión va en la cabecera |
| Definir paleta, tipografía, espaciado o íconos ad hoc por proyecto de código en vez de heredar del catálogo de diseño | Rompe consistencia cross-proyecto y duplica decisiones ya tomadas; los íconos raster fallan accesibilidad | Heredar tokens y patrones de `References/Design/`; iconografía SVG con `currentColor`; agregar token nuevo solo si es transversal y se promueve al catálogo |
| Default de un parámetro o ayuda de un campo hardcodeados en la pantalla de configuración | Se desincronizan del descriptor; dos fuentes de verdad | Tomar default, límites y ayuda del descriptor (ver `Design-Rules-Config-Esquema`) |
| Explicación "en palabras" de una configuración escrita a mano | Se desfasa de los valores reales | Generarla por plantilla a partir de descriptores + valores |
| Aplicar cambios de configuración sin previsualización ni modo simulación | El usuario no ve el efecto antes de comprometerlo | Previsualizar (en palabras + alcance) y simular antes de confirmar |
| Dar a la IA capacidad de ejecutar cambios de configuración en vez de proponerlos | Saca al humano del lazo; cambios sin control | La IA llena una `PropuestaDeConfiguracion`; el humano confirma, el sistema valida |
| Dibujar en la superficie de configuración un parámetro que solo se fija al desplegar | El control no manda: el usuario cree haber configurado algo que sigue igual | Declarar la frontera aplicación/entorno y no renderizar lo que la superficie no gobierna |
| Varias banderas de "ya configurado" o guard de primer arranque en una sola capa | El sistema queda en un estado que ninguna superficie sabe leer, o el corte se esquiva por URL o por envío tardío | Predicado único de aprovisionamiento y corte en las tres capas (ver `Design-Rules-Primer-Arranque`) |
| Wizard multipaso para el primer arranque | Ceremonia abandonable a la mitad que deja el sistema en estado parcial | Una superficie, un acto indivisible; el resto se configura después con el sistema en marcha |
| Arrastrar ceremonias multiusuario a un sistema de un solo operador | Registro, selector o recuperación llevan a lugares que no existen | Omitirlas y declarar la omisión (ver `Design-Rules-Acceso-Monousuario`) |
| Distinguir "usuario inexistente" de "credencial incorrecta", o exponer umbrales de la política en el mensaje | Confirma la existencia de la identidad y filtra parámetros de seguridad | Rechazo indiferenciado con texto único; restricción temporal sin números |
| Vencimiento silencioso de la sesión | Se manifiesta como un error arbitrario en una acción cualquiera | Devolver al shell de acceso con el estado de sesión vencida declarado |
| Versión transcrita a mano en la vista, o instancia sin versión visible | Miente en silencio, o vuelve la instancia no diagnosticable | Derivarla de la construcción y exhibirla en las dos ubicaciones obligatorias (ver `Design-Rules-Identidad-De-Version`) |
| Wireframe cuya superficie no tiene nombre canónico estable | La maqueta de la Fase B2 no puede nombrar su archivo ni la línea de base su `SUP-XX`; la trazabilidad se rompe en la primera iteración | Nombre canónico declarado en la sección 1 del wireframe y reusado por la maqueta y por la línea de base |
| Aprobar la maqueta y dejar los artefactos de 03 describiendo el diseño anterior | La documentación queda contando un producto que nadie aprobó; es exactamente la deriva que la fase venía a evitar | Retroalimentar 03 y propagar según la matriz de `Maqueta-Rules.md` §3.6 antes de cerrar la fase |

---

## 5. Preguntas guía para el subagente

### 5.1 Upstream

- ¿Qué persona objetivo de 00 consume cada artefacto? ¿Es un usuario final no técnico o un developer integrador?
- ¿Qué CU de 02 tienen interacción humana significativa o exponen una superficie pública? Cada uno debe mapearse a un artefacto de 03.
- ¿Hay RN que condicionan la presentación o el mensaje de error? Si la respuesta es sí, deben aparecer enumeradas en el artefacto correspondiente.

### 5.2 Scope

- ¿La variante a aplicar es UX/UI, DX, o una combinación? El tipo D8 marca el default; la presencia de portal de developers en rest-api o microservicios puede agregar la variante alterna.
- ¿Cuántos wireframes son razonables para el alcance? Web-monolith con login, home, flujo principal y error es el piso; sumar uno por flujo crítico.
- ¿Cuáles son las superficies públicas a documentar en DX? Cada módulo o endpoint debe quedar cubierto por al menos un how-to o un reference.

### 5.3 Trazabilidad

- ¿Cada wireframe declara su CU origen?
- ¿Cada `dx-` doc declara la superficie pública que documenta?
- ¿El marco `experiencia-de-uso` enlaza con todos los wireframes producidos?
- ¿El glosario absorbe los términos nuevos sin duplicar los del glosario de 02?

### 5.4 Calidad

- ¿El compromiso de accesibilidad WCAG 2.2 nivel AA está declarado y enumera criterios prioritarios?
- ¿Cada wireframe enumera al menos los estados vacío, cargando, con datos y error?
- ¿Cada `dx-` doc tiene un quick-start verificable, con snippet ejecutable?
- ¿La documentación DX aplica Diátaxis y separa tutorial, how-to, reference y explanation?
- ¿Cada mensaje de error catalogado dice qué pasó, por qué pasó y qué hacer al respecto?

### 5.5 Versionado

- ¿Existe alguna versión anterior en la carpeta principal? Si la respuesta es sí, archivarla en `_legacy/` antes de publicar la nueva.
- ¿El README de la sección apunta solamente a las versiones vigentes?

---

## 6. Criterios de aceptación

- [ ] La variante aplicada (UX/UI, DX o combinada) está declarada explícitamente en la cabecera de cada artefacto y es coherente con el tipo D8.
- [ ] Existe `Experiencia-De-Uso.md` para todo tipo con UI final, con las once secciones obligatorias del §4.2.
- [ ] Para tipos con UI final existe al menos un `wireframes-<superficie>.md` por cada superficie clave, con las nueve secciones obligatorias del §4.2.1.
- [ ] Para tipos sin UI final existe `DX-Developer-Experience.md` con las nueve secciones obligatorias del §4.2.3, incluyendo Diátaxis y onboarding por tramos verificables (5/30/60 minutos).
- [ ] Toda accesibilidad declarada toma WCAG 2.2 nivel AA como piso mínimo; las menciones a versiones anteriores aparecen solo en notas de evolución histórica.
- [ ] Cada wireframe enumera al menos los estados vacío, cargando, con datos y error.
- [ ] Cada `dx-` doc presenta un quick-start verificable con snippet ejecutable y reproducible.
- [ ] Cada artefacto declara trazabilidad upstream (persona objetivo, CU origen, RN si aplica) y downstream (US, tests).
- [ ] Ningún archivo de la carpeta de trabajo lleva sufijo de versión en el nombre; cada uno declara su versión en el campo `Versión` de su cabecera (D4), y el slug respeta Título-Con-Guiones estricto.
- [ ] Existe un solo archivo por nombre lógico en la carpeta principal; las versiones superadas viven en `_legacy/` con su sufijo de versión.
- [ ] Existe `Glosario-UX.md` y su tabla de términos no está vacía.
- [ ] Todo término que aparece en más de un artefacto de 03 está declarado en `Glosario-UX.md`, con sus referentes cuando tiene más de uno.
- [ ] El glosario de la sección no duplica términos de `Glosario-Funcional.md` de 02 con semántica distinta; los reusados se referencian.
- [ ] Ninguna polisemia con contextos disjuntos se reporta como defecto ni se corrige calificando todas las ocurrencias (`Vocabulario-Rules.md` §9.1).
- [ ] No hay menciones a stacks concretos, productos comerciales ni protocolos específicos del dominio fuente.
- [ ] En proyectos de código con `requiere_maqueta` == true: cada wireframe declara un nombre canónico de superficie estable, y su tabla de estados enumera todos los estados que la maqueta va a tener que demostrar.
- [ ] En proyectos de código con `requiere_maqueta` == true y maqueta ya aprobada: los artefactos afectados por la validación subieron versión con su entrada de control de cambios, y existen `Linea-Base-Visual.md`, `Contrato-Datos-Maqueta.md` y `Bitacora-Validacion-Maqueta.md` en la carpeta de la categoría.
- [ ] Todo documento con más de tres secciones de primer nivel incluye tabla de contenido inmediatamente después de la cabecera, con enlaces ancla a las secciones de primer y de segundo nivel. Los documentos breves quedan exceptuados.

---

## 7. Ejemplos genéricos

### 7.1 Ejemplo 1 — Fragmento de `Experiencia-De-Uso.md` para un sistema de turnos médicos (web-monolith)

Fragmento ilustrativo, no documento completo:

```markdown
# Experiencia de uso — Sistema de turnos médicos

**Proyecto de código:** {{Nombre-Proyecto-Codigo}}
**Documento:** Experiencia-De-Uso.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-05-17
**Autor:** Equipo UX
**Variante:** UX/UI

## 1. Audiencia y contexto de uso
- Persona primaria: agente administrativo de centro de salud, entre 30 y 55 años, uso intensivo durante turnos de 6 horas, en escritorio con monitor de 22 pulgadas.
- Persona secundaria: paciente que recibe la confirmación por correo electrónico, lectura en mobile, contexto disperso.

## 2. Principios de diseño
| Heurística de Nielsen | Aplicación |
| --- | --- |
| Visibilidad del estado del sistema | Stepper de tres pasos en la asignación de turno con microcopy del cupo restante. |
| Prevención de errores | Validación inmediata de superposición; el botón "Asignar" queda inhabilitado hasta resolver. |
| Recuperación de errores | Mensaje "El cupo se agotó mientras completabas el formulario. Probá con otro horario disponible." con acción sugerida. |

## 4. Estados y feedback
| Estado | Condición | Feedback |
| --- | --- | --- |
| Vacío | No hay turnos disponibles para la fecha seleccionada | Ilustración neutra y CTA "Probar con otra fecha". |
| Cargando | Consulta a la agenda en curso | Skeleton de tres líneas; spinner solo si supera 800 ms. |
| Error de red | Fallo transitorio | Banner con acción "Reintentar" y enlace a soporte. |

## 5. Accesibilidad
Compromiso WCAG 2.2 nivel AA. Criterios prioritarios: contraste 4.5:1 en texto, foco visible en todos los controles, navegación completa por teclado, etiquetas semánticas en formularios, anuncios de cambios dinámicos por aria-live para la confirmación del turno.

## 9. Trazabilidad
| Dimensión | Referencia |
| --- | --- |
| Persona objetivo | Agente administrativo (00) |
| CU origen | CU-03 Asignar turno médico |
| Reglas de negocio relevantes | RN-02, RN-04 |
| Wireframes asociados | Wireframes-Pantalla-Asignacion-Turno.md |
| US a generar | US-05, US-06 |
```

### 7.2 Ejemplo 2 — Fragmento de `DX-Developer-Experience.md` para una librería de parsing CSV (library)

```markdown
# DX — Librería de parsing CSV

**Proyecto de código:** {{Nombre-Proyecto-Codigo}}
**Documento:** DX-Developer-Experience.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-05-17
**Autor:** Equipo DX
**Variante:** DX

## 1. Rol de intervención developer
Developer backend con uno a tres años de experiencia, que conoce manejo de archivos pero no necesariamente parsing avanzado. Llega buscando una librería más rápida que su solución actual.

## 2. Onboarding por tramos
| Tramo | Objetivo verificable |
| --- | --- |
| 5 minutos | Instalar la librería e imprimir las primeras tres filas de un CSV de ejemplo. |
| 30 minutos | Mapear filas a un objeto del dominio con tipado y manejo básico de errores. |
| 1 hora | Procesar un archivo grande con streaming y reportar progreso. |

## 3. Quick-start
Snippet ejecutable que produce el primer resultado visible. El equipo verifica el snippet a mano antes de cada release.

## 4. Diátaxis
| Modo | Ubicación | Propósito |
| --- | --- | --- |
| Tutorial | `docs/tutorial.md` | Aprender los fundamentos desde cero. |
| How-to | `docs/how-to/` | Resolver tareas concretas (procesar archivo grande, validar columnas, exportar a JSON). |
| Reference | `docs/reference.md` | Consultar cada función, tipo y opción de configuración. |
| Explanation | `docs/explanation.md` | Comprender el modelo de streaming y las decisiones de diseño. |

## 5. Mensajes de error y diagnóstico
Cada error indica qué pasó (línea, columna), por qué pasó (regla violada) y qué hacer al respecto (cómo corregir o cómo ignorar la fila). Catálogo completo en `DX-Error-Messages.md`.

## 6. Métricas DX
| Métrica | Objetivo | Cómo se mide |
| --- | --- | --- |
| TTFS | <= 5 minutos | Telemetría opt-in del CLI de demo y pruebas con cinco developers externos. |
| TTFV | <= 1 hora | Encuesta a developers en sus primeras dos semanas. |

## 7. Feedback loop
Issues etiquetados como `dx`, sección de discusiones del repositorio, encuesta breve al cierre del primer mes de uso.

## 8. Trazabilidad
| Dimensión | Referencia |
| --- | --- |
| Persona objetivo | Developer backend integrador (00) |
| CU origen | CU-01 Parsear archivo CSV, CU-02 Mapear fila a objeto |
| US a generar | US-01, US-02, US-08 |
```

Los dos fragmentos son ilustrativos. Cada proyecto de código adapta el dominio respetando la estructura.

---

## 8. Prompt-snippet sugerido

```text
Sos un {{ESPECIALIDAD-VARIANTE}} responsable de redactar la categoría 03 del proyecto de código {{NOMBRE_PROYECTO_CODIGO}}.

Tipo de proyecto de código: {{TIPO}} (uno de los ocho valores D8).
Variante por defecto según tipo:
- library, cli-tool, worker-service, rest-api sin portal, web-microservices sin frontend: variante DX.
- web-monolith, web-microservices con frontend, desktop-app, mobile-app-maui: variante UX/UI.
- rest-api con portal visible o web-microservices con SDK público: combinación DX + UX/UI.

Insumos:
- PRODUCT-INTAKE: {{path}}
- Upstream: 00 (visión, persona objetivo), 02 (CU con interacción humana o superficie pública, RN que afectan presentación).

A generar (según variante):
- Variante UX/UI: Experiencia-De-Uso.md, wireframes-<superficie>.md (uno por superficie clave), representacion-<concepto>.md cuando aplique, Glosario-UX.md (obligatorio).
- Variante DX: DX-Developer-Experience.md, Guia-Onboarding-Developer.md, DX-Error-Messages.md (cli-tool, library), DX-Portal-Developers.md (rest-api con portal), DX-Operability.md (worker-service).
- README.md de la sección (recomendado).

Reglas de redacción: §4 de Rules-UX-UI-DX.md.
Nomenclatura: `<nombre>.md` con guion medio antes de `v`; slug en Título-Con-Guiones estricto.
Trazabilidad: cada artefacto declara persona objetivo, CU origen y US a generar.
Accesibilidad: WCAG 2.2 nivel AA como piso mínimo en todo artefacto UX.
Diátaxis: aplicación explícita en al menos un artefacto DX.
Política de versionado: §3.5; una sola versión vigente; anteriores a `_legacy/` con estado Superado.

Restricciones: no introducir stacks concretos, productos comerciales ni protocolos del dominio fuente. Idioma rioplatense técnico, tildes correctas, sin emojis.

Salida: SDD/Docs/Proyectos/{{NOMBRE_PROYECTO_CODIGO}}/03-UX-UI-DX/<estructura>.
```

---

## 9. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-05-17 | Reglas iniciales generadas durante bootstrap SDD. Variantes UX/UI y DX cubriendo los 8 tipos D8, accesibilidad WCAG 2.2 AA como piso, Diátaxis explícito, política de versionado con `_legacy/`. |
| 1.1 | 2026-06-09 | Validación ST-06: la categoría se genera por proyecto bajo `Proyectos/<Nombre-Proyecto>/03-UX-UI-DX/`; la selección de variante y la ruta de salida del prompt-snippet referencian el `project_type` del proyecto en curso (manifiesto). Tablas §1.2 sin reescritura. |
| 1.2 | 2026-06-10 | Migración de referencias de intake al documento unificado SOLUTION-INTAKE (unificación de intake). |
| 1.3 | 2026-06-19 | Incorporación del catálogo de reglas de diseño (`devs/References/Design/`) como insumo normativo de AG-03: nueva §1.4 (carga del índice, documento base más especialización por stack, tokens y patrones normativos, trazabilidad del catálogo), anti-patrón de tokens ad hoc en §4.4 y fila "Catálogo de diseño aplicado" en la tabla de trazabilidad de §4.3. |
| 1.4 | 2026-06-20 | Cableado de la extensión por capacidad `Design-Rules-Config-Esquema`: §1.4 extendida (carga cuando hay superficies de configuración, y requisitos sobre `experiencia-de-uso`/`wireframes`: descriptores, ayuda contextual, presets, explicación en palabras, modo simulación, ranura del asistente y frontera `PropuestaDeConfiguracion`), nuevos anti-patrones de configuración por esquema en §4.4 y fila "Configuración dirigida por esquema aplicada" en la trazabilidad de §4.3. |
| 1.5 | 2026-07-18 | Cableado de tres extensiones por capacidad nuevas (`Design-Rules-Primer-Arranque`, `Design-Rules-Acceso-Monousuario`, `Design-Rules-Identidad-De-Version`), derivadas de la extracción de características de un panel de control monolítico en producción: §1.4 suma la condición de carga y los requisitos sobre `experiencia-de-uso`/`wireframes` de cada una, más la frontera entre configuración de aplicación y de entorno; §4.3 suma tres filas de trazabilidad; §4.4 suma siete anti-patrones (predicado y guard de arranque, wizard multipaso, ceremonias multiusuario arrastradas, rechazo diferenciado y filtrado de política, vencimiento silencioso de sesión, versión transcrita o ausente, parámetro de entorno dibujado). |
| 1.6 | 2026-07-19 | Enganche con la Fase B2 de validación visual de maqueta: nueva §1.5 (qué le toca a AG-03 antes y después de la fase, y los tres artefactos que la fase deposita en esta categoría), tres artefactos nuevos en la tabla maestra de §2.1 (`Linea-Base-Visual`, `Contrato-Datos-Maqueta`, `Bitacora-Validacion-Maqueta`), tres filas nuevas en la trazabilidad de §4.3 (modelo UX-UI aplicado, validación visual, línea de base emitida), dos anti-patrones nuevos en §4.4 (superficie sin nombre canónico estable, maqueta aprobada sin retroalimentar) y dos criterios de aceptación condicionados a `requiere_maqueta`. La mecánica de la fase no se duplica acá: vive en `Maqueta-Rules.md`. |
| 1.7 | 2026-07-26 | Normalización del vocabulario de actores: «consumidor» pasa a «integrador» u «operador» según el caso, y «audiencia» pasa a «rol de intervención» en las secciones DX, que designan a quien interviene sobre el producto. Se conserva «audiencia» en las secciones UX, que designan al público del producto. El tipo de developer se enumera como integrador, mantenedor u operador. |
| 1.8 | 2026-07-26 | Navegabilidad para lectores humanos: §4.1 y §6 exigen tabla de contenido en todo documento generado que supere las tres secciones de primer nivel, con enlaces ancla de primer y segundo nivel y excepción para documentos breves. Es el único cambio: no se altera la estructura obligatoria de los documentos, no se agregan artefactos ni carga narrativa. |
| 2.0 | 2026-07-28 | Normalización del versionado (framework 4.0). El archivo vivo pierde el sufijo de versión del nombre y pasa a declarar su versión en el campo `Versión` de su cabecera; el sufijo `-v<X.Y>.md` queda reservado a las copias archivadas en `_legacy/`. Se actualizan los patrones de nombre, los ejemplos, las cabeceras modelo, los anti-patrones y los criterios de aceptación de la categoría. Sube major porque la documentación generada con la nomenclatura anterior deja de cumplir. Deriva de la reformulación de D4 y D5 en el `README.md` del framework. |
| 3.0 | 2026-07-29 | Renombre de vocabulario normativo (framework 5.0). El nivel superior pasa de «solución» a **producto**, la unidad de compilación de «proyecto» a **proyecto de código**, y los cuatro planos de identidad del producto se separan en campos propios (`Nombre-Producto`, `Slug-Producto`, `Raiz-Codigo`, `Artefacto-Agrupacion`). Se declara el nivel de aplicación de la regla en su cabecera, según `Vocabulario-Rules.md` §4 R3. Sube major porque los identificadores y los nombres de artefacto cambian, y la documentación generada con la nomenclatura anterior deja de cumplir. |
| 4.0 | 2026-07-29 | **El glosario de la categoría pasa a ser obligatorio.** Sube major porque `Glosario-UX.md` deja de ser «Recomendado para todos los tipos con UI final» y pasa a obligatorio para los ocho tipos D8, incluidos los tipos DX, que acuñan el vocabulario de su superficie pública; la documentación de 03 emitida sin él deja de cumplir. §3.3 suma la regla de polisemia y remite al criterio de `Vocabulario-Rules.md` §9. §6 pasa de verificar solo la no duplicación a verificar además existencia y completitud, y suma el criterio negativo del falso positivo. La regla de no duplicación pasa a nombrar `Glosario-Funcional.md` de 02, que la 4.0 de `Rules-Especificacion-Funcional.md` acaba de crear: hasta ahora obligaba a referenciar «el glosario de 02», que era una sección de un documento condicional y podía no existir. **Corregido**: §3.1 y §3.2 nombraban el artefacto `glosario-ux` en todo-minúsculas, contra §2.1 y contra D3. |
