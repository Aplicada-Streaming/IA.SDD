# Reglas constructivas — 11 Documentacion

**Carpeta target (por proyecto de código):** `SDD/Docs/Proyectos/<Nombre-Proyecto-Codigo>/11-Documentacion/`
**Nivel de aplicación (`Vocabulario-Rules.md` §4 R3):** Proyecto de código + Producto
**Carpeta target (nivel producto):** `SDD/Docs/Producto/11-Documentacion/`
**Nivel de aplicación (`Vocabulario-Rules.md` §4 R3):** Proyecto de código + Producto
**Carpeta target (caso degenerado, producto de un proyecto de código):** `SDD/Docs/11-Documentacion/`
**Nivel de aplicación (`Vocabulario-Rules.md` §4 R3):** Proyecto de código + Producto
**Subagente target del orquestador:** Technical Writer / Documentation Lead (AG-11)
**Versión de las reglas:** 4.1

---

## Tabla de contenido

- [0. Posición en la cadena SDD](#0-posición-en-la-cadena-sdd)
  - [0.1 Los dos ejes: rol de intervención y naturaleza del lector](#01-los-dos-ejes-rol-de-intervención-y-naturaleza-del-lector)
  - [0.2 Fronteras con las categorías vecinas](#02-fronteras-con-las-categorías-vecinas)
  - [0.3 Modelo de documentación viva: los tres momentos](#03-modelo-de-documentación-viva-los-tres-momentos)
  - [0.4 Cadencia de actualización](#04-cadencia-de-actualización)
  - [0.5 Ensayo de entrega](#05-ensayo-de-entrega)
  - [0.6 Bitácora de eventualidades](#06-bitácora-de-eventualidades)
- [1. Especialidad asignada](#1-especialidad-asignada)
  - [1.1 Especialidad base](#11-especialidad-base)
  - [1.2 Variantes según tipo de proyecto de código (8 valores D8)](#12-variantes-según-tipo-de-proyecto-8-valores-d8)
  - [1.3 Multi-especialidad](#13-multi-especialidad)
  - [1.4 Estilo narrativo formativo](#14-estilo-narrativo-formativo)
  - [1.5 Doble audiencia](#15-doble-audiencia)
- [2. Documentos que produce esta categoría](#2-documentos-que-produce-esta-categoría)
  - [2.1 Artefactos de nivel producto](#21-artefactos-de-nivel-producto)
  - [2.2 Cuerpo integrador (nivel proyecto de código)](#22-cuerpo-integrador-nivel-proyecto)
  - [2.3 Cuerpo mantenedor (nivel proyecto de código)](#23-cuerpo-mantenedor-nivel-proyecto)
  - [2.4 Cuerpo operador (nivel proyecto de código)](#24-cuerpo-operador-nivel-proyecto)
  - [2.5 Reglas de inclusión y exclusión por tipo D8](#25-reglas-de-inclusión-y-exclusión-por-tipo-d8)
- [3. Nomenclatura y vinculación](#3-nomenclatura-y-vinculación)
  - [3.1 Patrón de nombres](#31-patrón-de-nombres)
  - [3.2 Identificadores estables](#32-identificadores-estables)
  - [3.3 Vinculación cross-doc](#33-vinculación-cross-doc)
  - [3.4 Política de versionado](#34-política-de-versionado)
  - [3.5 README de la sección y matriz de ruteo](#35-readme-de-la-sección-y-matriz-de-ruteo)
- [4. Estructura de redacción](#4-estructura-de-redacción)
  - [4.1 Cabecera obligatoria y frontmatter](#41-cabecera-obligatoria-y-frontmatter)
  - [4.2 Artefactos de nivel producto](#42-artefactos-de-nivel-producto)
  - [4.3 Cuerpo integrador](#43-cuerpo-integrador)
  - [4.4 Cuerpo mantenedor](#44-cuerpo-mantenedor)
  - [4.5 Cuerpo operador](#45-cuerpo-operador)
  - [4.6 Voz narrativa](#46-voz-narrativa)
  - [4.7 Formato markdown](#47-formato-markdown)
  - [4.8 Tablas tipo y formatos recurrentes](#48-tablas-tipo-y-formatos-recurrentes)
  - [4.9 Anti-patrones a evitar](#49-anti-patrones-a-evitar)
- [5. Preguntas guía para el subagente](#5-preguntas-guía-para-el-subagente)
- [6. Criterios de aceptación](#6-criterios-de-aceptación)
- [7. Ejemplos genéricos](#7-ejemplos-genéricos)
- [8. Prompt-snippet sugerido](#8-prompt-snippet-sugerido)
- [9. Control de cambios](#9-control-de-cambios)

---

## 0. Posición en la cadena SDD

La categoría 11 es el cuerpo documental de entrega: lo que queda cuando el sistema está construido y alguien de afuera tiene que usarlo, mantenerlo u operarlo. Recibe upstream de 02 (casos de uso y modelo de datos lógico), de 05 (arquitectura, contratos públicos, NFR y puntos de extensión), de 06 y 07 (historias y sprints, que fijan la cadencia de actualización), de 08 (estrategia de testing, que esta categoría cita y no redefine), de 09 (política de despliegue, que esta categoría convierte en procedimiento verificado) y de 10 (examples ejecutables y sus contratos de verificación, que explica y enlaza sin duplicar su código). No tiene downstream metodológico dentro de SDD.

Es la única categoría del framework cuyo lector primario es un **agente humano en primer contacto**: alguien que no participó de ninguna fase de la especificación y no puede recuperar el contexto preguntándole al equipo que la produjo, porque en buena medida ese equipo fue una secuencia de agentes de IA. Las categorías 00 a 09 están escritas para sostener la cadena de especificación, y su densidad es adecuada a un lector que llega con el contexto acumulado de las fases anteriores. Esta categoría atiende al que llega sin nada.

De ahí sale todo lo demás: su carga narrativa, su organización por rol de intervención en lugar de por artefacto técnico, y su modelo de generación incremental. Un cuerpo documental de entrega redactado de una sola vez al cierre describe un sistema que el redactor ya no recuerda haber construido.

### 0.1 Los dos ejes: rol de intervención y naturaleza del lector

Esta categoría abandona el modelo de audiencia única, pero **no lo reemplaza por una lista de audiencias**. Lo reemplaza por dos ejes que se cruzan. Confundirlos es el error de diseño que hay que evitar: produce documentos duplicados, unos «para personas» y otros «para la IA», que inevitablemente divergen.

**Eje 1 — Rol de intervención.** Qué viene a hacer el lector con el sistema. Es independiente de la naturaleza de ese lector: un agente de IA que despliega necesita exactamente lo mismo que un operador humano que despliega. Este eje es el que organiza los artefactos en cuerpos.

| Cuerpo | Rol | Pregunta que responde |
| --- | --- | --- |
| **Integrador** | Consume el proyecto de código desde otra aplicación o sistema, sin conocer su interior | «¿Cómo lo uso?» |
| **Mantenedor** | Retoma el desarrollo para conocerlo, intervenir el código y extenderlo | «¿Dónde está cada cosa y cómo agrego funcionalidad sin romper el diseño?» |
| **Operador** | Monta, despliega, verifica y sostiene el servicio en ejecución | «¿Cómo lo levanto, cómo sé que anda y qué hago cuando falla?» |

**Eje 2 — Naturaleza del lector.** Cómo lee, no qué busca. No genera cuerpos ni documentos propios: se resuelve dentro de cada artefacto, mediante el contrato de doble audiencia que estas reglas imponen en §1.5.

| Naturaleza | Necesita | Cómo se lo sirve |
| --- | --- | --- |
| **Agente humano** | Modelo mental, contexto, narrativa, orientación en primer contacto | Cara humana del contrato: resumen ejecutivo, definiciones en primer uso, flujos narrados con caso concreto, diagramas, preguntas guía |
| **Agente de IA** | Datos extraíbles, ubicaciones exactas, aserciones evaluables | Cara agente del contrato: frontmatter YAML, identificadores estables con prefijo, anclas predecibles, rutas absolutas, comandos verbatim, criterios como aserción, bloques `entradas` / `salidas` / `validaciones` |

**Regla dura**: un mismo documento sirve a las dos naturalezas. Está prohibido producir versiones paralelas de un mismo contenido segmentadas por tipo de lector. Ante divergencia entre ambas caras, se corrige el documento; nunca se bifurca.

«Agente» se usa como término genérico que abarca a personas y a modelos, y se califica siempre: **agente humano** o **agente de IA**. Es coherente con el hecho de que SDD es un framework operado por agentes de IA a lo largo de toda su cadena, donde el rol —especificar, codificar, desplegar, verificar— es lo que distingue a un interviniente, no su naturaleza.

**Por qué esta categoría carga con el peso narrativo.** El eje 2 explica la diferencia de tratamiento entre la categoría 11 y las categorías 00 a 09. La cadena de especificación ya está bien servida para el agente de IA, que la recorre acumulando contexto fase tras fase. Lo que ninguna categoría atiende es al agente humano que llega sin ese contexto acumulado y tiene que entender el desarrollo desde cero. Esta es la única categoría que asume ese lector como primario, y por eso es la única que adopta el estilo narrativo formativo de §1.4. Aplicárselo a 00–09 sería inflarlas sin destinatario.

### 0.2 Fronteras con las categorías vecinas

Sin fronteras declaradas, los artefactos de esta categoría se solapan con reglas existentes y el framework empieza a decir dos veces lo mismo en dos lugares que después divergen.

| Frontera | La categoría vecina documenta | La categoría 11 documenta |
| --- | --- | --- |
| **09 DevOps** | La *política*: qué ambientes existen, cómo se promociona entre ellos, cómo se firma y publica el artefacto. Lector: quien participa del diseño, dentro de la cadena de especificación | El *procedimiento verificado*: qué comando corro, en qué orden, qué tiene que responder. Lector: quien llega de afuera, con el sistema ya construido |
| **05 Arquitectura** | La arquitectura *como decisión*: vistas formales, ADRs, contratos, NFR, alternativas descartadas | El sistema *como hecho*: qué es, qué componentes tiene, dónde vive cada uno en el repositorio |
| **08 Calidad y Pruebas** | La estrategia de testing, los casos de prueba y la matriz de sensado de deriva | Cita esa estrategia para explicarle al mantenedor cómo correr los tests. **No la redefine** |
| **10 Examples** | El ejemplo ejecutable y su contrato de verificación | Explica, contextualiza y enlaza esos ejemplos. **No duplica su código** |
| **03 UX-UI-DX** | El diseño de la experiencia y las superficies | Nada. Esta categoría no documenta al usuario final no técnico; ese hueco se declara explícitamente como fuera de alcance del framework |

La frontera con 05 merece una nota, porque es la que más se cruza. `Vision-General-Sistema` **no duplica la categoría 05**. La 05 documenta la arquitectura como decisión de diseño, con vistas formales, ADRs y NFR, y se dirige a quien participó del diseño o lo continúa dentro de la cadena de especificación. La 11 documenta el sistema como hecho consumado, dirigida a alguien que llega de afuera sin ese recorrido y necesita orientarse. Una responde «por qué se decidió así»; la otra, «qué es esto y por dónde entro».

### 0.3 Modelo de documentación viva: los tres momentos

Esta categoría no se genera en una sola pasada al cierre. Se estructura en tres momentos.

| Momento | Cuándo | Entregable |
| --- | --- | --- |
| **1 — Plan documental** | Pre-código, una vez derivado y confirmado el `PRODUCT-MANIFEST` | El índice del cuerpo documental: qué artefactos va a tener cada proyecto de código, su rol de intervención y su estado inicial `Planificado`. Sin contenido redactado |
| **2 — Actualización incremental** | Durante la codificación, en cada corte de la cadencia de §0.4 | Los documentos afectados por el incremento, actualizados al estado real del sistema, con fecha de revisión y estado nuevo |
| **3 — Consolidación de cierre** | Una vez, al final | Verificación del cuerpo completo: se ejecuta todo comando documentado, se confirma que las aserciones se cumplen, se revisan huecos y contradicciones, y se emite la versión definitiva del `AGENTS.md` |

Con el manifiesto confirmado ya se conoce la composición del producto —qué proyectos de código hay, de qué tipo es cada uno y qué rol cumple—, y eso alcanza para determinar qué documentos va a tener cada proyecto de código sin redactar una línea. El Momento 1 se genera junto con el plan de generación que el orquestador presenta para aprobación, de modo que el usuario vea desde el principio qué documentación va a existir al final.

**El Momento 2 es el que tiene mayor valor de los tres**, y conviene entender por qué. Convierte la documentación en instrumento de control en lugar de obligación de cierre: obliga a revisar el producto desde los tres ángulos —¿se entiende qué hace?, ¿se puede intervenir el código?, ¿el despliegue resulta razonable o quedó enredado?— cuando todavía hay margen para corregir el diseño. Un procedimiento de despliegue que al documentarse resulta enredado es una señal de arquitectura, no un problema de redacción.

Cada actualización incremental toca únicamente los documentos afectados por el incremento, registra la fecha de la revisión y actualiza el estado del artefacto. Un documento no revisado desde hace más de dos cortes se marca como potencialmente desactualizado en el README de la categoría, con su fecha de última revisión visible.

**Anclaje de industria.** Los tres momentos corresponden a las prácticas establecidas de *Living Documentation* —documentación que evoluciona junto al sistema que describe—, *Docs as Code* —la documentación versionada y entregada por el mismo flujo que el código, de modo que no pueda derivar de él— y *Continuous Documentation* —la verificación continua y automatizada de la documentación contra el estado real del código—, con la documentación incorporada a la *Definition of Done* del incremento: una funcionalidad no está terminada hasta que su documentación está actualizada.

### 0.4 Cadencia de actualización

«Incremento funcional demostrable» no alcanza como disparador: hay que anclarlo a cortes que el framework ya tiene. Son tres disparadores, en orden de precedencia.

| Disparador | Alcance de la actualización |
| --- | --- |
| **Cierre de sprint** (corte por defecto; el framework ya modela sprints en la categoría 07) | Todos los documentos de 11 tocados por los ítems del sprint. Es el corte principal |
| **Cierre de incremento demostrable**, cuando el equipo no trabaja por sprints | Equivalente al anterior, con el incremento como unidad |
| **Cambio que altera un contrato público, un procedimiento de despliegue o una ruta de código citada** | Actualización inmediata, sin esperar el corte. Un documento que apunta a una ruta inexistente es peor que un documento ausente |

La actualización de esta categoría forma parte de la **Definition of Done** del sprint o del incremento: el corte no se declara cerrado con documentos afectados sin revisar. `Rules-Plan-Sprint.md` registra esa condición dentro de su definición de Done.

El tercer disparador es el que rompe la cadencia a propósito. Los otros dos agrupan trabajo para que la documentación no interrumpa la construcción; este la interrumpe porque el costo de no hacerlo es peor: un mantenedor que sigue una ruta que ya no existe pierde más tiempo que si no hubiera tenido documentación, y además deja de confiar en el resto del cuerpo.

### 0.5 Ensayo de entrega

Actualizar la documentación no prueba que sirva. Al cierre de cada Momento 2 —o al menos en los cortes que el usuario elija— se corre un **ensayo de entrega**: se toma la documentación en su estado actual y se ejecuta con ella una tarea real, sin ayuda externa.

El framework ya tiene el patrón exacto para esto en la Fase B2. La maqueta existe porque leer una especificación de UX y decidir si es lo que se quería resulta caro y poco confiable, así que se materializa algo navegable y se lo recorre. **El ensayo de entrega es a la documentación lo que la validación de maqueta es al diseño.** Misma lógica, mismo corte de confirmación humana.

**Quién lo corre.** El ensayo es un corte de confirmación humana, no una tarea que el orquestador pueda auto-adjudicarse. El agente que redactó los documentos no puede declararlo aprobado por sí mismo, por la misma razón por la que no puede aprobar su propia maqueta: conoce el sistema porque acaba de documentarlo, y esa contaminación anula la prueba. Son dos niveles y no hay que confundirlos.

| Nivel | Quién lo corre | Qué detecta | Condición |
| --- | --- | --- | --- |
| **Ensayo automatizado** | El agente, en cada corte del Momento 2 | Comandos rotos, rutas inexistentes, prerrequisitos faltantes | Necesaria, no suficiente |
| **Ensayo humano** | El usuario, en los cortes que elija y obligatoriamente en el Momento 3 | Lo que la documentación no dice pero hace falta saber | **Gate**: sin ensayo humano aprobado no se cierra el Momento 3 |

Hay al menos un guion de ensayo por rol de intervención.

| Rol | Guion del ensayo | Qué falla revela |
| --- | --- | --- |
| Operador | Desplegar un servicio concreto desde cero, en una máquina o entorno limpio, siguiendo únicamente `Guia-Despliegue` y `Guia-Contenedor` | Prerrequisitos no declarados, pasos implícitos, orden de arranque mal documentado |
| Mantenedor | Ubicar una porción de código concreta e introducir una mejora acotada, siguiendo únicamente `Recorrido-Codigo` y `Guia-Contribucion` | Puentes rotos entre arquitectura y árbol de archivos, convenciones tácitas, tests que no se sabe cómo correr |
| Integrador | Consumir una capacidad del sistema desde un cliente nuevo, siguiendo únicamente el cuerpo integrador | Referencia incompleta, ejemplos que no compilan, autenticación no explicada |

**Regla de oro del ensayo**: durante la corrida solo se puede leer la documentación. No se le pregunta al equipo, no se lee código fuera de lo que la documentación indica leer, no se usa conocimiento previo del proyecto de código. **El momento en que hay que salirse de la documentación es, exactamente, el hallazgo.**

Cada ensayo registra si la tarea se completó, cuánto tardó, en qué paso se trabó y qué hubo que averiguar por fuera. Cada trabada se convierte en un hallazgo con destino asignado —qué documento y qué sección lo tiene que absorber— y se resuelve antes de cerrar el corte. Un ensayo que no se completa es un hallazgo P0. El resultado se registra en el informe de audit de la fase, en `SDD/Docs/Audit/`, reutilizando la maquinaria de auditoría que el framework ya tiene.

**Anclaje de industria.** El guion del operador corresponde a la práctica SRE de *Game Day*. Los guiones de mantenedor e integrador corresponden a la prueba de usabilidad de documentación con un lector sin contexto previo, que el framework ya nombraba como «test del developer nuevo» sin operacionalizarla.

### 0.6 Bitácora de eventualidades

Durante la construcción, el despliegue y las primeras corridas aparecen situaciones que ningún documento de diseño podía anticipar, porque solo se manifiestan al ejecutar el sistema en un entorno real. Hoy esas situaciones se resuelven una vez, quedan en la memoria de quien las resolvió y se pierden. El siguiente operador las vuelve a sufrir idénticas.

El caso testigo es un servicio que se comunica con un dispositivo físico conectado por USB. Al containerizarlo aparece que necesita *passthrough* del dispositivo del host, con su regla de permisos y su ruta. Ninguna vista de arquitectura lo predijo, ninguna decisión de diseño lo registra, y es la primera cosa con la que se choca quien lo despliega. Es exactamente el conocimiento que hay que capitalizar.

`Bitacora-Eventualidades.md` es el artefacto de captura, de nivel producto, con una entrada por eventualidad identificada `EVE-XX`. Su estructura de campos vive en §4.2.

**Triaje obligatorio.** Cada eventualidad se clasifica y se propaga a un documento permanente. La bitácora es un buffer de captura, no el destino final.

| Naturaleza de la eventualidad | Destino permanente |
| --- | --- |
| Requisito del host o del entorno no declarado (acceso a un dispositivo, permiso, módulo del kernel, límite de recursos, variable no documentada) | `Guia-Contenedor` → prerrequisitos y dispositivos requeridos |
| Falla reproducible con síntoma observable en ejecución | `Runbook-Operacion` → nueva entrada `OPS-XX` |
| Falla que golpea a quien integra el proyecto de código desde afuera | `Troubleshooting` → nueva entrada `ISSUE-XX` |
| Paso del despliegue que resultó no evidente | `Guia-Despliegue` o `Guia-Inicio-Rapido` |
| Reveló un problema de diseño, no de documentación | ADR en la categoría 05, más escalamiento al usuario |
| No reproducible o caso único sin valor para terceros | Queda solo en la bitácora, marcada `No absorbida`, con el motivo |

**Regla dura**: ninguna eventualidad se cierra sin destino asignado. «Sin destino» no es un estado válido de cierre; si no aplica ninguna categoría, se marca explícitamente `No absorbida` con justificación. El triaje se ejecuta en cada corte del Momento 2, junto con la actualización incremental.

**Distinción con el sensado de deriva.** No hay que confundir ambos instrumentos. La deriva mide divergencia entre lo construido y una línea de base aprobada: algo se apartó de lo acordado. Una eventualidad es un hecho del entorno que nadie había previsto: no hay línea de base de la cual apartarse, hay conocimiento nuevo que capturar. Un mismo hallazgo puede alimentar los dos instrumentos, pero se registran por separado.

**Anclaje de industria.** Corresponde a la práctica de *postmortem sin culpa* de la disciplina SRE, donde cada incidente produce un registro estructurado de síntoma, causa raíz, resolución y acciones derivadas, con el foco puesto en que la organización aprenda y no en atribuir responsabilidad. La sección de *known issues* de un producto es el destino publicado de ese mismo material.

---

## 1. Especialidad asignada

### 1.1 Especialidad base

Technical Writer / Documentation Lead, equivalente al AG-11 del catálogo SDD. Perfil profesional de documentación técnica orientada a quien interviene sobre el producto terminado, no a quien participó de su especificación. Se apoya en el framework Diátaxis para separar tutoriales, how-to, referencia y explicación; en la práctica de *Docs as Code* para el versionado y la entrega junto al código; y en el principio del test del developer nuevo, que estas reglas operacionalizan como ensayo de entrega en §0.5.

Combina tres facetas. La cara **Technical Writer** redacta conceptos, referencias y troubleshooting con precisión, sin jerga interna del equipo y con vocabulario consistente. La cara **Developer Advocate** prioriza el tiempo a primer éxito, publica snippets copiables y mantiene un onboarding corto. La cara **Documentation Lead**, que es la incorporación de esta versión, sostiene el cuerpo completo a lo largo de la construcción: decide qué documento absorbe cada hallazgo, corre el triaje de la bitácora, ejecuta el ensayo automatizado y mantiene coherente un conjunto que crece incremento a incremento.

Cuando el proyecto de código expone una API pública o un CLI, el rol incluye además la generación o curación de referencia autogenerada desde código (XML docs, OpenAPI, help embebido), garantizando paridad estricta entre la API publicada y la documentada.

### 1.2 Variantes según tipo de proyecto de código (8 valores D8)

| Tipo | Especialidad específica | Foco del rol de intervención dominante |
| --- | --- | --- |
| library | Technical Writer + SDK Documentation Lead | Integrador que consume la librería desde su propia aplicación, y mantenedor que la extiende. Énfasis en modelo mental, referencia de la superficie pública, recorrido de código y puntos de extensión |
| rest-api | Technical Writer + API Documentation Lead | Integrador de la API HTTP y operador del servicio. Énfasis en referencia generada desde OpenAPI, autenticación, errores RFC 9457, contrato de contenedor y runbook |
| cli-tool | Technical Writer + CLI Documentation Lead | Operador o developer que usa la herramienta desde terminal. Énfasis en referencia de comandos, exit codes, variables de entorno y recorrido de código |
| web-microservices | Technical Writer + Platform Documentation Lead | Equipos integradores de los servicios públicos y operadores de la plataforma. Énfasis en visión general del sistema, orden de arranque entre servicios, contratos publicados y runbook por servicio |
| web-monolith | Technical Writer + Application Documentation Lead | Mantenedor y operador. Énfasis en recorrido de código, guía de contribución, contrato de contenedor y despliegue |
| desktop-app | Technical Writer + Desktop Documentation Lead | Mantenedor, e integrador solo si hay SDK de plugins. Énfasis en recorrido de código, guía de extensión y guía de instalación y actualización |
| mobile-app-maui | Technical Writer + Mobile Documentation Lead | Mantenedor, e integrador solo si hay SDK público. Énfasis en recorrido de código, convenciones multiplataforma y ciclo de publicación, que vive en 09 y acá solo se cita |
| worker-service | Technical Writer + Operability Documentation Lead | Operador y mantenedor. Énfasis en runbook, contrato de contenedor, patrones de log y semántica de los mensajes consumidos y emitidos |

El orquestador lee esta tabla y, según el `tipo_proyecto_codigo` del proyecto de código en curso (leído del manifiesto), decide qué variante de especialidad se activa. **La categoría siempre se genera**: lo que varía es qué cuerpos se materializan dentro de ella, según §2.5.

### 1.3 Multi-especialidad

Esta categoría colabora con varias especialidades durante la redacción y la revisión:

- **AG-02 Analista Funcional**, para alinear el vocabulario de conceptos fundamentales con los CU y el modelo de datos lógico, evitando que la documentación y la especificación se contradigan.
- **AG-05 Arquitecto**, para que la referencia, los conceptos y el recorrido de código respeten los contratos públicos, los puntos de extensión y las NFR declaradas. Es la colaboración más delicada, porque es donde está la frontera que más se cruza.
- **AG-08 QA / SDET**, para que la guía de contribución cite la estrategia de testing sin redefinirla, y para que los hallazgos del ensayo de entrega entren a la maquinaria de auditoría.
- **AG-09 DevOps**, para que la guía de despliegue y el contrato de contenedor sean el procedimiento verificado de la política que 09 define, y no una segunda política paralela.
- **AG-10 Developer Advocate**, dueño de la carpeta 10, que produce los examples ejecutables y sus contratos de verificación. La frontera es nítida: 10 demuestra con código ejecutable y verificable, 11 explica, referencia y enlaza esos ejemplos sin duplicar su código.
- **AG-ROOT Arquitecto de Soluciones**, para que la visión general del sistema y el README raíz de `SDD/Docs/` no se contradigan ni se dupliquen.

El AG-11 mantiene titularidad de los artefactos de 11. Las demás especialidades aportan revisión sectorial y validan paridad con su carpeta upstream.

### 1.4 Estilo narrativo formativo

El cuerpo documental de esta categoría no es una colección de fichas sueltas: es un recorrido. El lector debe terminar entendiendo el sistema y con criterio para intervenir en él según su rol, no solo reconociendo términos.

- **Diseñar el mapa antes de escribir las piezas.** Primero se fija el marco de referencia —el vocabulario común que reaparece en todos los documentos—, y recién entonces se desarrolla cada documento sobre ese marco. Ir de lo general a lo particular.
- **Definir cada término en su primer uso** y registrarlo en el glosario. Usar analogías cuando acerquen un concepto complejo.
- **Contextualizar todo ejemplo o snippet**: qué demuestra, precondiciones, resultado esperado. Un comando sin contexto no es documentación.
- **Cerrar las secciones densas con preguntas guía** que ayuden al lector a formar criterio.
- **Formativo, no enciclopédico**: cada sección deja al lector en condiciones de decidir.
- **Explicar, no solo describir**: qué es, para qué sirve, cómo funciona, cuándo se usa, cómo se relaciona con el resto.
- **Un procedimiento explica** objetivo, prerrequisitos, pasos, resultado esperado, validaciones y errores posibles. No es una lista de comandos.
- **Una arquitectura documenta** componentes, responsabilidades, relaciones, flujos y límites. No es una enumeración de archivos.
- **Interconectado**: cada documento enlaza con los que lo preceden y lo continúan. Ningún documento queda huérfano del mapa.
- **Única fuente de verdad**: un dato vive en un solo documento; el resto lo referencia. Documentos pequeños y especializados, con una única responsabilidad cada uno.
- **Adecuar la profundidad al tema**: ni superficial ni innecesariamente extensa.
- **No asumir** que el lector conoce el proyecto de código ni la documentación previa.

### 1.5 Doble audiencia

Todo documento sirve a la vez al agente humano que necesita **comprender** y al agente de IA que necesita **extraer datos y razonar**. Las dos caras describen el mismo hecho; ante divergencia, se corrige, nunca se mantienen versiones paralelas ni se bifurca el documento por tipo de lector.

El lector primario de esta categoría es el agente humano en primer contacto: alguien que no participó de ninguna fase de la especificación y no puede recuperar el contexto preguntándole al equipo que la produjo. La cara agente no compite con esa prioridad, la complementa: el mismo documento que le da a una persona el modelo mental le da a un agente de IA las rutas, los identificadores y las aserciones con las que operar.

**Cara humana:**

- Abrir cada documento con un resumen ejecutivo breve: qué es, para qué sirve, a quién le sirve.
- Narrar los flujos importantes de punta a punta con un caso concreto y datos de ejemplo realistas pero sintéticos. La narrativa complementa al diagrama, no lo repite.
- Progresar de lo general a lo específico.

**Cara agente:**

- **Frontmatter YAML** en todo documento, con al menos: `doc_id`, `doc_type`, `title`, `status`, `audience`, `owner`, `last_review`, `traces`.
- **Identificadores estables con prefijo** (`OPS-`, `EXT-`, `ISSUE-`, `VER-`, `EVE-`, `CU-`, `US-`, `ADR-`): los enlaces y las trazas apuntan al identificador, no a la ruta.
- **Encabezados y anclas predecibles**: los documentos del mismo tipo comparten las mismas secciones, lo que habilita parseo y validación por estructura.
- **Diagramas y modelos como código** (Mermaid, OpenAPI, dbml): diffeables y regenerables. Imágenes binarias solo cuando no exista alternativa.
- **Bloques para agentes** (`entradas` / `salidas` / `validaciones`) en todo documento que defina un proceso que un agente deba ejecutar o verificar.
- **Rutas absolutas desde la raíz del repositorio**, nunca referencias vagas del tipo «el archivo de configuración del servicio».
- **Comandos verbatim, copy-paste**, con su salida esperada textual.
- **Criterios de éxito expresados como aserción, no como prosa.** Un humano lo lee; un agente lo ejecuta y lo evalúa.
- **Snippets con procedencia**: ruta, rango de líneas y versión de la fuente. Nunca copias sin origen.
- El vocabulario narrativo y el máquina-legible comparten el mismo glosario; los sinónimos se registran como alias del término canónico.

---

## 2. Documentos que produce esta categoría

### 2.1 Artefactos de nivel producto

Se generan una sola vez para todo el producto, bajo `SDD/Docs/Producto/11-Documentacion/`. En el caso degenerado de un producto de un solo proyecto de código, van directamente bajo `SDD/Docs/11-Documentacion/`, sin subnivel.

| Archivo | Rol de intervención | Contenido |
| --- | --- | --- |
| `README.md` de la categoría | Todos | Landing de la documentación. Su núcleo obligatorio es la **matriz de ruteo**: tabla `actor × intención → documento`, de modo que el lector no necesite conocer la estructura de carpetas para encontrar su camino. Es el único nombre de archivo que hace falta recordar |
| `Vision-General-Sistema.md` | Todos | Mapa del sistema legible en diez minutos: qué hace el producto, qué proyectos de código la componen y qué hace cada uno en una línea, cómo se comunican entre sí, dónde vive el código de cada uno. Incluye diagrama de contexto y diagrama de contenedores en Mermaid. Es el plano que permite formarse una idea del producto sin leer arquitectura |
| `Guia-Inicio-Rapido.md` | Mantenedor, Operador | Levantar el **producto completo** en una máquina limpia, con el orden de arranque derivado del grafo de dependencias del manifiesto. Objetivo duro: un solo comando, o la menor cantidad posible, con verificación al final que confirme que el sistema quedó operativo |
| `Guia-Despliegue.md` | Operador | Procedimiento de despliegue por topología: prerrequisitos, orden de arranque entre proyectos de código, cómo se resuelven entre sí, configuración por ambiente, verificación paso a paso y rollback |
| `Bitacora-Eventualidades.md` | Operador, Mantenedor | Registro de las situaciones no previstas que aparecieron durante la construcción, el despliegue y la operación, con síntoma, causa, resolución e intentos descartados. Cada entrada se identifica `EVE-XX` y se triaja hacia un documento permanente, según §0.6 |
| `Contrato-Agentes.md` | Todos | Artefacto versionado del cual se deriva el `AGENTS.md` de la raíz. Es el que sigue la convención de nomenclatura del framework y el que se audita |
| `AGENTS.md` (emitido en la **raíz del repositorio destino**) | Agentes de IA | Contrato de contexto para agentes: cómo se construye el proyecto de código, cómo se corren los tests, convenciones de código, comandos de validación, límites de intervención, y punteros a los documentos de 11 por intención |

**Sobre `AGENTS.md`.** Es un formato abierto y establecido para instruir agentes de codificación, gobernado bajo la Agentic AI Foundation de la Linux Foundation, que los agentes cargan automáticamente al iniciar sesión en un repositorio. Se lo adopta tal cual, sin renombrarlo ni versionarlo con el sufijo del framework, porque su valor depende de que las herramientas lo encuentren en la ruta convencional. El artefacto versionado que lo gobierna, y del cual se deriva, sí sigue la convención: `Contrato-Agentes.md`, dentro de la carpeta de la categoría.

Es la única excepción admitida a la regla de nomenclatura D3 y D4 dentro de esta categoría, y se admite por una razón funcional, no estética: un archivo que las herramientas no encuentran no cumple su función, por bien nombrado que esté.

**Sobre el momento de emisión del `AGENTS.md`.** Se emite en la primera corrida del Momento 2 y se refresca en cada una, no solo al cierre. La razón es operativa: el Momento 2 es exactamente el tramo donde los agentes de IA codifican, despliegan y verifican, así que es cuando más necesitan ese contrato de contexto. Reservarlo para el Momento 3 lo dejaría disponible recién cuando ya no hace falta.

### 2.2 Cuerpo integrador (nivel proyecto de código)

Migra desde la categoría 10 anterior, conservando su estructura Diátaxis y su parametrización de nombres.

| Archivo | Cuadrante Diátaxis | Contenido |
| --- | --- | --- |
| `Conceptos-Fundamentales.md` | Explanation | Modelo mental, vocabulario, decisiones de diseño relevantes para el integrador y qué NO hace el sistema |
| `Guia-Onboarding-Developer.md` | Tutorial | De cero a primer éxito en cinco pasos, con Hello world en menos de cinco minutos |
| `guia-integracion-<sistema-objetivo>.md` | How-to | Una por stack objetivo. El nombre se parametriza con un slug genérico |
| `Referencia-Api.md` | Reference | Tipos públicos, métodos, eventos, excepciones, esquemas. Para HTTP, generada o curada desde OpenAPI |
| `Referencia-Cli.md` | Reference | Comandos, subcomandos, flags, exit codes, variables de entorno |
| `Troubleshooting.md` | How-to orientado a diagnóstico | Errores comunes con identificador `ISSUE-XX`, diagnóstico paso a paso, logs útiles y cómo reportar un bug |
| `Glosario-Tecnico.md` | Reference | Vocabulario canónico con definición y referencia cross-doc. Reemplaza glosarios duplicados |

Se conservan las dos correcciones que la regla anterior ya imponía y que siguen siendo válidas: nomenclatura uniforme y obligatoria en todos los artefactos, y prohibición de hardcodear un sistema comercial concreto en el nombre de la guía de integración, que se parametriza con un slug genérico.

### 2.3 Cuerpo mantenedor (nivel proyecto de código)

| Archivo | Contenido |
| --- | --- |
| `Recorrido-Codigo.md` | El puente entre la arquitectura y el repositorio real. Mapea cada componente declarado en 05 contra su ubicación exacta en el árbol de archivos: «la capa Application del ADR-002 vive en `src/<Proyecto de código>/Application/`». Recorre el flujo principal del sistema nombrando los archivos que se atraviesan en orden. Sin este documento, retomar un proyecto de código obliga a reconstruir el mapa leyendo código |
| `Guia-Contribucion.md` | Setup del entorno de desarrollo desde cero, cómo correr los tests y qué debería devolver, convenciones de código y de commits, y —el núcleo del documento— cómo agregar una funcionalidad de punta a punta: qué archivos se tocan, en qué orden, qué se actualiza en la documentación y qué verifica que quedó bien |
| `Guia-Extension.md` | Puntos de extensión publicados con identificador `EXT-XX`, contrato de cada uno y ejemplo de registro. Solo cuando el proyecto de código declara extensibilidad en 05 |

`Recorrido-Codigo` es el artefacto más específico de esta versión de las reglas y el que cierra el déficit central: la categoría 05 registra qué se decidió —vistas, ADRs, contratos— pero no existía puente entre esa arquitectura conceptual y el árbol de archivos real del repositorio.

### 2.4 Cuerpo operador (nivel proyecto de código)

| Archivo | Contenido |
| --- | --- |
| `Guia-Contenedor.md` | Contrato de ejecución del servicio: tabla de variables de entorno con tipo, default, obligatoriedad y efecto; puertos expuestos; volúmenes y su propósito; healthcheck con su endpoint y respuesta esperada; dependencias de arranque; dispositivos del host requeridos; límites de recursos sugeridos. Responde la pregunta «quiero montar este servicio en un contenedor, ¿qué necesito saber?» |
| `Runbook-Operacion.md` | Procedimientos de operación: arrancar, parar, reiniciar, verificar salud, leer logs y qué patrón buscar, métricas relevantes y sus umbrales. Incluye los incidentes conocidos con identificador `OPS-XX`, cada uno con síntoma, diagnóstico paso a paso y resolución |

### 2.5 Reglas de inclusión y exclusión por tipo D8

El gating es de granularidad por cuerpo, no por categoría.

| Tipo D8 | Cuerpo integrador | Cuerpo mantenedor | Cuerpo operador |
| --- | --- | --- | --- |
| `library` | Obligatorio | **Obligatorio** | No aplica (no se despliega como servicio) |
| `rest-api` | Obligatorio | **Obligatorio** | Obligatorio |
| `cli-tool` | Obligatorio | **Obligatorio** | Opcional (`Guia-Contenedor` solo si se distribuye containerizado) |
| `web-microservices` | Obligatorio si expone APIs públicas | **Obligatorio** | Obligatorio |
| `web-monolith` | Opcional (solo si expone API externa) | **Obligatorio** | Obligatorio |
| `worker-service` | Opcional | **Obligatorio** | Obligatorio |
| `desktop-app` | Opcional (solo si publica SDK de plugins) | **Obligatorio** | No aplica; se reemplaza por guía de instalación y actualización |
| `mobile-app-maui` | Opcional (solo si publica SDK) | **Obligatorio** | No aplica; la distribución por store ya vive en 09 |

El cambio de fondo respecto del gating anterior: **el cuerpo mantenedor es obligatorio para los ocho tipos, sin excepción**. Todo proyecto de código va a ser retomado por alguien, incluso aquellos sin integrador externo, y ese alguien puede no haber participado de ninguna fase de su especificación. La categoría 11 deja de ser opcional para cuatro de los ocho tipos y pasa a existir siempre; lo que varía es qué cuerpos se materializan dentro de ella.

Dentro del cuerpo integrador, el gating fino por artefacto es el siguiente:

| Tipo D8 | Conceptos | Onboarding | Integración | Referencia API | Referencia CLI | Troubleshooting | Glosario |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `library` | Sí | Sí | Sí (uno por stack objetivo) | Sí | No | Sí | Sí |
| `rest-api` | Sí | Sí | Recomendado | Sí (curada desde OpenAPI) | Solo si hay CLI oficial | Sí | Sí |
| `cli-tool` | Sí | Sí | Recomendado | Solo si expone API embebible | Sí | Sí | Sí |
| `web-microservices` | Sí | Sí | Recomendado | Sí (por servicio público) | No | Sí | Sí |
| `web-monolith` | Solo si hay API externa | No | No | Solo si hay API externa | No | Resumido | No |
| `desktop-app` | Solo si hay SDK de plugins | Si hay SDK | Si hay SDK | Si hay SDK | No | Solo si hay SDK | Solo si hay SDK |
| `mobile-app-maui` | Solo si hay SDK público | Si hay SDK | Si hay SDK | Si hay SDK | No | Solo si hay SDK | Solo si hay SDK |
| `worker-service` | No | No | No | No | No | Sí (semántica de mensajes) | No |

Cuando un cuerpo o un artefacto se omite por gating, la decisión se registra en `Decisiones-Proyecto.md`. Cuando el equipo omite un cuerpo que el gating declara obligatorio, se requiere ADR con justificación.

---

## 3. Nomenclatura y vinculación

### 3.1 Patrón de nombres

Todos los artefactos llevan Título-Con-Guiones y sin sufijo de versión en el nombre; la versión vive en el campo `Versión` de la cabecera (D4) (D3, D4). Queda prohibido hardcodear un nombre comercial concreto en el nombre de archivo.

- Nivel producto: `Vision-General-Sistema.md`, `Guia-Inicio-Rapido.md`, `Guia-Despliegue.md`, `Bitacora-Eventualidades.md`, `Contrato-Agentes.md`.
- Cuerpo integrador: `Conceptos-Fundamentales.md`, `Guia-Onboarding-Developer.md`, `guia-integracion-<sistema-objetivo>.md`, `Referencia-Api.md`, `Referencia-Cli.md`, `Troubleshooting.md`, `Glosario-Tecnico.md`.
- Cuerpo mantenedor: `Recorrido-Codigo.md`, `Guia-Contribucion.md`, `Guia-Extension.md`.
- Cuerpo operador: `Guia-Contenedor.md`, `Runbook-Operacion.md`.
- Índices sin sufijo por convención: `README.md`. Al archivarse sí reciben el sufijo: `_legacy/<YYYY-MM-DD>/README-v<X.Y>.md`, con la versión tomada del campo `Versión` de su cabecera, porque en el snapshot la versión es lo que lo identifica y sin ella dos archivados del mismo día colisionan.
- Excepción declarada: `AGENTS.md`, en la raíz del repositorio destino, por la razón funcional de §2.1. Está además **exento del archivado**: se regenera completo desde `Contrato-Agentes.md` en cada corrida (`Master-Prompt.md` §7.2), y el artefacto versionado y archivable es ese contrato, no el archivo derivado.

La regla general de archivado, con su ruta única y su tabla de exenciones, vive en `Master-Prompt.md` §5.1.

El segmento `<sistema-objetivo>` es Título-Con-Guiones y describe el stack o sistema receptor de la integración (por ejemplo `cli`, `servicio-web`, `aplicacion-de-escritorio`, `pipeline-ci`). No se admite hardcodear un nombre comercial.

### 3.2 Identificadores estables

Los enlaces y las trazas apuntan al identificador, no a la ruta. Una ruta cambia con una reorganización de carpetas; un identificador no.

| Prefijo | Qué identifica | Dónde vive | Definido en |
| --- | --- | --- | --- |
| `OPS-XX` | Incidente operativo conocido | `Runbook-Operacion` | Esta regla |
| `EXT-XX` | Punto de extensión publicado | `Guia-Extension` | Esta regla |
| `EVE-XX` | Eventualidad capturada | `Bitacora-Eventualidades` | Esta regla, §0.6 |
| `ISSUE-XX` | Entrada de troubleshooting del integrador | `Troubleshooting` | Preexistente, se conserva |
| `VER-XX` | Sonda de verificación de un sample | `10-Examples`, sección 9 de cada markdown | `Rules-Examples.md` §4.6. Esta categoría lo **cita**, no lo redefine |

Todos son de dos dígitos uniformes, como el resto de los identificadores del framework. Son estables: un elemento que se retira no libera su número; su entrada queda con estado `Retirado` y la fecha, para que una referencia vieja no apunte a otra cosa.

Además, cada concepto fundamental se nombra con un identificador Título-Con-Guiones dentro de su documento, y cada paso del onboarding se numera declarando su tiempo objetivo en minutos.

### 3.3 Vinculación cross-doc

- **Upstream**: la referencia API y CLI cita los contratos públicos de 05; los conceptos fundamentales citan el modelo de datos lógico de 02 y las decisiones de 05; el recorrido de código mapea los componentes de 05 contra rutas reales; la guía de contribución cita la estrategia de testing de 08; la guía de despliegue y el contrato de contenedor citan la política de 09; el troubleshooting cita los códigos de error declarados en 05 y los casos de prueba de 08; cada documento que ilustra un flujo enlaza el sample de 10 que lo materializa.
- **Downstream**: dentro de la cadena SDD esta categoría no tiene downstream. El README maestro del proyecto de código la referencia como punto de entrada.
- Cada documento incluye al pie una sección «Referencias cruzadas» con tres a cinco enlaces a documentos de 02, 05, 08, 09 o 10 según corresponda. La regla mínima es al menos un enlace a 05 por cada documento del cuerpo integrador y del cuerpo mantenedor.
- **Prohibición de duplicación**: cuando un dato ya vive en otra categoría, esta lo referencia y no lo copia. Un umbral de alerta que aparece en el runbook y en 09 con valores distintos es peor que un umbral que aparece una sola vez.

### 3.4 Política de versionado

Una sola versión vigente por nombre lógico. Al pasar de `v1.0` a `v2.0`, la anterior se archiva en `_legacy/` con estado `Superado`.

- **Mayor**: cambios incompatibles en lo documentado. Renombre de tipos públicos, eliminación de endpoints, cambio breaking en flags de CLI, cambio del procedimiento de despliegue que invalida el anterior, reorganización del árbol de código que invalida el recorrido.
- **Menor**: incorporaciones que no rompen lo vigente. Un `OPS-XX` nuevo, un punto de extensión más, una variable de entorno agregada.
- **Sin cambio de versión**: correcciones de redacción sin cambio semántico, que se reflejan en el control de cambios del documento afectado.

Cada actualización del Momento 2 registra la fecha en el campo `last_review` del frontmatter, exista o no cambio de versión. Un documento puede estar vigente sin haber cambiado, pero no puede estar vigente sin haber sido revisado.

### 3.5 README de la sección y matriz de ruteo

Obligatorio siempre, porque la categoría siempre existe. Es el único nombre de archivo que el lector tiene que recordar, y su núcleo es la matriz de ruteo: una tabla `actor × intención → documento` que le permite encontrar su camino sin conocer la estructura de carpetas.

Contenido mínimo del README:

1. Qué es este cuerpo documental y a quién sirve, en tres a cinco oraciones.
2. **Matriz de ruteo** por rol de intervención e intención.
3. Estado del cuerpo documental: tabla de artefactos con su estado (`Planificado`, `Vigente`, `Potencialmente desactualizado`) y su fecha de última revisión.
4. Orden de lectura sugerido por rol, con tres a cinco documentos por rol.
5. Cómo se mantiene: cadencia de §0.4, quién lo actualiza y qué se espera de quien lo lee.

La tabla del punto 3 es lo que hace visible la deuda documental. Un documento sin revisar desde hace más de dos cortes aparece marcado, y esa marca es el disparador de la revisión del corte siguiente.

---

## 4. Estructura de redacción

### 4.1 Cabecera obligatoria y frontmatter

Todo artefacto de esta categoría lleva frontmatter YAML seguido de un H1 y un bloque de metadatos legible. El frontmatter es la cara agente; el bloque de metadatos es la cara humana del mismo hecho.

```yaml
---
doc_id: DOC-<PROYECTO>-<TIPO>-<NN>
doc_type: vision-general | inicio-rapido | despliegue | bitacora | contrato-agentes | conceptos | onboarding | integracion | referencia-api | referencia-cli | troubleshooting | glosario | recorrido-codigo | contribucion | extension | contenedor | runbook
title: <Título del documento>
status: Planificado | Borrador | Vigente | Potencialmente desactualizado | Superado
rol_intervencion: [integrador | mantenedor | operador]
owner: {{equipo-o-rol}}
version: <X.Y>
last_review: YYYY-MM-DD
momento: 1 | 2 | 3
traces:
  - CU-XX
  - ADR-XX
  - VER-XX
---
```

```markdown
# <Título del documento>

**Proyecto de código:** {{Nombre-Proyecto-Codigo}}
**Rol de intervención:** Integrador | Mantenedor | Operador
**Tipo Diátaxis:** Tutorial | How-to | Reference | Explanation (solo cuerpo integrador)
**Nivel:** Básico | Medio | Avanzado
**Tiempo estimado de lectura:** <N> min

## Resumen ejecutivo

<Qué es, para qué sirve, a quién le sirve. Tres a cinco oraciones.>
```

El campo `rol_intervencion` es obligatorio y admite más de un valor: un documento puede servir a dos roles, y declararlo es preferible a duplicarlo. El campo `momento` declara en cuál de los tres momentos de §0.3 se produjo o se actualizó por última vez.

El resumen ejecutivo es obligatorio en todos los artefactos. Es lo primero que lee el agente humano en primer contacto y lo que le permite decidir si este es el documento que buscaba.

### 4.2 Artefactos de nivel producto

**`Vision-General-Sistema.md`**

1. Qué hace el producto. Dos a cuatro párrafos, en el vocabulario del negocio, sin jerga de implementación.
2. Diagrama de contexto en Mermaid: el producto como caja negra, los actores y los sistemas externos con los que habla.
3. Diagrama de contenedores en Mermaid: los proyectos de código que la componen y cómo se comunican entre sí.
4. Tabla de proyectos de código: nombre, tipo D8, qué hace en una línea, dónde vive el código, de qué depende.
5. Recorrido narrado del flujo principal, de punta a punta, con un caso concreto y datos sintéticos.
6. Qué NO hace el producto, para delimitar expectativas.

Se apoya en los dos primeros niveles del modelo C4, contexto y contenedores. No baja a componentes: ese nivel vive en 05.

**`Guia-Inicio-Rapido.md`**

1. Objetivo y resultado esperado, declarado como aserción verificable.
2. Prerrequisitos con versión mínima y comando de verificación de cada uno.
3. Comando de arranque, uno solo si es posible.
4. Orden de arranque entre proyectos de código cuando el comando único no alcanza, derivado del grafo de dependencias del manifiesto.
5. Verificación final: qué comando corro y qué tiene que responder para saber que el sistema quedó operativo.
6. Qué hacer si falla: los tres errores más frecuentes con su producto, enlazando al runbook para el resto.

**`Guia-Despliegue.md`**

1. Topologías soportadas y cuál elegir según el caso.
2. Prerrequisitos del entorno destino.
3. Configuración por ambiente: tabla de variables con su valor por ambiente, sin secretos en claro.
4. Procedimiento paso a paso, con comando verbatim y salida esperada por paso.
5. Verificación post-despliegue como aserción evaluable.
6. Rollback: procedimiento, punto de no retorno y cómo saber que se completó.

**`Bitacora-Eventualidades.md`**

Una entrada por eventualidad, con estos campos:

| Campo | Contenido |
| --- | --- |
| `id` | `EVE-XX` |
| `ambito` | `producto` o el `Nombre-Proyecto-Codigo` afectado |
| `fecha` | Cuándo se detectó |
| `momento` | Construcción, despliegue, operación o ensayo de entrega |
| `sintoma` | Qué se observó, en términos verificables |
| `causa` | Qué la provocaba realmente, no la hipótesis inicial |
| `resolucion` | Qué se hizo, con el comando o la configuración exacta |
| `intentos_descartados` | Qué se probó y no funcionó. Es lo que el documento permanente nunca va a conservar y lo que más tiempo ahorra al siguiente |
| `destino` | Documento y sección que absorbe la eventualidad de forma permanente, o `No absorbida` con su motivo |

El campo `intentos_descartados` es el que distingue a una bitácora útil de un registro ceremonial. Un documento permanente registral producto que funcionó; solo la bitácora conserva las tres que no, que es lo que evita que el siguiente las repita.

**`Contrato-Agentes.md` y `AGENTS.md`**

1. Qué es este repositorio, en dos a tres oraciones.
2. Cómo se construye: comando verbatim y salida esperada.
3. Cómo se corren los tests: comando verbatim, qué debería devolver, y cómo correr un subconjunto.
4. Convenciones de código y de commits, enunciadas, no enlazadas a un estándar externo.
5. Comandos de validación que un agente debe correr antes de dar por terminado un cambio.
6. Límites de intervención: qué no se toca sin confirmación humana.
7. Punteros a los documentos de 11 por intención, en forma de tabla.

El `AGENTS.md` se deriva del contrato versionado, no se escribe aparte. Si divergen, el contrato es la fuente y el `AGENTS.md` se regenera.

### 4.3 Cuerpo integrador

**`Conceptos-Fundamentales.md` (Explanation).** Concepto central en una a tres oraciones · modelo mental con diagrama del flujo principal y tabla concepto/qué es/ejemplo · decisiones de diseño relevantes para el integrador, cada una citando su ADR fuente en 05 · vocabulario con el subconjunto crítico · qué NO hace el sistema.

**`Guia-Onboarding-Developer.md` (Tutorial).** Prerequisites con comando de obtención · Hello world en menos de 5 min con output textual · primer caso real en menos de 30 min con datos representativos · integración con un sistema en menos de 1 hora, enlazando al how-to · siguientes pasos con tres rutas. El criterio de éxito es duro: si el tiempo medido supera el objetivo, se reescribe.

**`guia-integracion-<sistema-objetivo>.md` (How-to).** Objetivo · prerequisites del sistema objetivo · pasos numerados con título imperativo, código copy-paste y efecto esperado · verificación · troubleshooting específico enlazando al `ISSUE-XX` global. Sin desviaciones explicativas: el porqué vive en conceptos fundamentales.

**`Referencia-Api.md` (Reference).** Tipos públicos con invariantes · métodos con firma exacta, parámetros, retorno y excepciones · eventos con payload y semántica de orden y entrega · excepciones con código y cuándo se lanzan · ejemplos breves por bloque. Cuando la API es HTTP, se genera o cura desde OpenAPI 3.x, con ejemplos en `curl` y en al menos un cliente, y errores según RFC 9457.

**`Referencia-Cli.md` (Reference).** Comandos · subcomandos con ejemplo invocacional · flags con tipo, default y obligatoriedad · variables de entorno con precedencia frente a flags · códigos de salida exhaustivos · al menos un ejemplo por subcomando con stdout y stderr esperados.

**`Troubleshooting.md` (How-to de diagnóstico).** Errores comunes con `ISSUE-XX` en tabla síntoma/causa/solución · diagnóstico paso a paso con comandos que permitan confirmar la causa antes de aplicar la solución · logs útiles con nivel y patrón a buscar · cómo reportar un bug con plantilla y datos mínimos.

**`Glosario-Tecnico.md` (Reference).** Tabla término / definición operativa / referencia cross-doc. Es la fuente canónica del vocabulario; el resto de los documentos enlaza acá en lugar de redefinir. Los sinónimos se registran como alias del término canónico.

### 4.4 Cuerpo mantenedor

**`Recorrido-Codigo.md`**

1. Resumen ejecutivo: qué encuentra el lector acá y qué no.
2. **Mapa arquitectura → repositorio.** Tabla con una fila por componente declarado en 05: identificador del componente, ADR que lo decide, ruta exacta en el árbol de archivos, responsabilidad en una línea. Es el corazón del documento.
3. Árbol de carpetas comentado, hasta el nivel que aporte información y no más.
4. **Recorrido del flujo principal**, narrado de punta a punta, nombrando los archivos que se atraviesan en orden y qué hace cada uno. Con un caso concreto y datos sintéticos.
5. Dónde vive cada cosa: tabla de preguntas frecuentes de ubicación («¿dónde se valida la entrada?», «¿dónde se define el esquema de datos?») con su respuesta como ruta.
6. Convenciones estructurales: qué patrón sigue el árbol, dónde va un archivo nuevo y por qué.
7. Preguntas guía de cierre.

**Regla dura de este documento**: toda ruta citada existe. Una ruta que no resuelve es un hallazgo P0 del ensayo automatizado, porque es el error que más caro le sale al mantenedor: lo manda a buscar algo que no está.

**`Guia-Contribucion.md`**

1. Setup del entorno desde cero, con comando verbatim por paso y verificación de cada uno.
2. Cómo correr los tests, qué devuelven, cuánto tardan, y cómo correr un subconjunto. Cita la estrategia de 08, no la redefine.
3. Convenciones de código y de commits, enunciadas con ejemplo de lo correcto y de lo incorrecto.
4. **Cómo agregar una funcionalidad de punta a punta.** Es el núcleo. Un caso concreto recorrido paso a paso: qué archivos se tocan, en qué orden, qué se actualiza en la documentación, qué verifica que quedó bien. Con bloque `entradas` / `salidas` / `validaciones` para la cara agente.
5. Qué no hacer: los patrones que rompen el diseño, con el motivo.
6. Preguntas guía de cierre.

**`Guia-Extension.md`**

Una sección por punto de extensión, identificada `EXT-XX`: qué permite extender, contrato de la interfaz o del punto de enganche, ejemplo de registro completo, límites de lo que la extensión puede hacer, y enlace al sample de 10 que lo demuestra cuando existe.

### 4.5 Cuerpo operador

**`Guia-Contenedor.md`**

1. Resumen ejecutivo y qué imagen o artefacto documenta.
2. **Variables de entorno**: tabla nombre / tipo / default / obligatoriedad / efecto. Sin secretos en claro; los secretos se declaran por nombre y origen.
3. **Puertos expuestos**: tabla puerto / protocolo / propósito / si es obligatorio publicarlo.
4. **Volúmenes**: ruta interna / propósito / qué pasa si no se monta / política de permisos.
5. **Dispositivos del host requeridos**, cuando los haya: ruta del dispositivo, regla de acceso, cómo verificar que está disponible. Esta sección existe porque es exactamente donde aterrizan las eventualidades de tipo requisito del entorno.
6. **Healthcheck**: endpoint o comando, respuesta esperada como aserción, período y umbral de reintentos.
7. **Dependencias de arranque**: qué tiene que estar levantado antes, y cómo lo verifica el contenedor.
8. **Límites de recursos sugeridos**, con el criterio con el que se estimaron.
9. Bloque `entradas` / `salidas` / `validaciones` para la cara agente.

**`Runbook-Operacion.md`**

1. Resumen ejecutivo y alcance del runbook.
2. **Procedimientos base**: arrancar, parar, reiniciar, verificar salud. Cada uno con comando verbatim y salida esperada.
3. **Logs**: dónde están, en qué nivel, qué patrón buscar para cada clase de problema, con el comando de filtrado concreto.
4. **Métricas y umbrales**: tabla métrica / qué mide / umbral de atención / umbral de alarma / qué hacer al cruzarlo.
5. **Incidentes conocidos**: una entrada por incidente, identificada `OPS-XX`, con síntoma observable, diagnóstico paso a paso y resolución. El diagnóstico es una secuencia de comandos que permite confirmar la causa antes de aplicar la solución, no una hipótesis.
6. **Escalamiento**: cuándo dejar de intentar y a quién avisar, con el criterio explícito.

### 4.6 Voz narrativa

Aplica solo a las zonas de prosa —resúmenes, explicaciones, racional, narración de flujos—. No altera las zonas estructuradas —frontmatter, identificadores, tablas, anclas, diagramas como código—, que se mantienen rígidas a propósito. Ante conflicto, prevalece la regla estructural.

- Escribir desde el criterio de un profesional que entiende el sistema, no desde un molde rellenado. Cada sección responde a lo que ese caso concreto requiere.
- Formal y técnica, sin acartonamiento. Afirmar con seguridad cuando hay evidencia; señalar la incertidumbre cuando la hay, sin hedging defensivo.
- **Variar la longitud de frase.** Un texto donde todas las oraciones tienen el mismo largo y forma se percibe como automático.
- **Prosa donde corresponde prosa**: causa → efecto → impacto se narra en un párrafo conectado, no se fragmenta en viñetas. Reservar las listas para enumeraciones reales.
- **Sin paralelismo forzado**: no todas las viñetas tienen que empezar igual ni medir lo mismo.
- **Abrir con contenido, no con el título**: la primera frase de una sección aporta un hecho o contexto; no reformula el encabezado ni anuncia lo que la sección «va a» tratar.
- **Evitar las muletillas de relleno**: «Es importante destacar/señalar/mencionar que», «Cabe destacar», «En resumen», «En conclusión», «Como se puede observar», «Vale la pena mencionar».
- **Evitar los conectores decorativos encadenados** usados como pegamento entre frases que no lo necesitan.
- **Evitar los cierres genéricos** que resumen lo ya dicho sin agregar información o recomendación concreta.
- La voz es uniforme en todo el documento y entre documentos del mismo conjunto: se percibe una sola autoría.
- **Validación antes de cerrar**: releer las zonas de prosa y verificar que no hay muletillas, que la longitud de frase varía, que no hay listas que deberían ser párrafos, que ninguna sección abre reformulando su título y que los cierres aportan algo. Si un párrafo se puede borrar sin perder información, sobra.

### 4.7 Formato markdown

- Encabezados jerárquicos sin saltar niveles ni títulos vacíos, de lo general a lo específico.
- Secciones autocontenidas. Tabla de contenido cuando el tamaño lo justifique.
- No agregar secciones vacías ni decorativas.
- **Tablas** para resumir o comparar (parámetros, variables de entorno, puertos, servicios); sin celdas de texto largo.
- **Bloques de código** con lenguaje indicado, mínimos y con contexto.
- **Diagramas en Mermaid**, preferido sobre ASCII, para arquitectura, flujos, secuencias y dependencias. Sin diagramas redundantes.
- **Ejemplos reales**, obtenidos en la ejecución; los ilustrativos se marcan como tales.
- **Enlaces con rutas relativas** entre documentos relacionados; referenciar en lugar de duplicar.
- Validación antes de cerrar: estructura coherente, sin secciones vacías ni títulos duplicados, enlaces válidos, Mermaid sintácticamente correcto.

### 4.8 Tablas tipo y formatos recurrentes

**Matriz de ruteo del README de la sección**, que es el formato más importante de la categoría:

| Vengo a… | Rol | Leé |
| --- | --- | --- |
| Entender qué es esto y qué hace | Todos | `Vision-General-Sistema.md` |
| Levantar todo en mi máquina | Mantenedor, Operador | `Guia-Inicio-Rapido.md` |
| Usar el proyecto de código desde mi aplicación | Integrador | `Guia-Onboarding-Developer.md` |
| Buscar la firma exacta de un método o flag | Integrador | `Referencia-Api.md`, `Referencia-Cli.md` |
| Encontrar dónde está una parte del código | Mantenedor | `Recorrido-Codigo.md` |
| Agregar una funcionalidad | Mantenedor | `Guia-Contribucion.md` |
| Montar el servicio en un contenedor | Operador | `Guia-Contenedor.md` |
| Desplegar en un ambiente | Operador | `Guia-Despliegue.md` |
| El servicio se comporta raro | Operador | `Runbook-Operacion.md` |
| Me da un error al integrar | Integrador | `Troubleshooting.md` |

**Estado del cuerpo documental**, en el README de la sección:

| Documento | Rol | Estado | Última revisión | Momento |
| --- | --- | --- | --- | --- |
| `Vision-General-Sistema.md` | Todos | Vigente | 2026-08-14 | 2 |
| `Recorrido-Codigo.md` | Mantenedor | Potencialmente desactualizado | 2026-06-30 | 2 |
| `Guia-Extension.md` | Mantenedor | Planificado | — | 1 |

**Mapa arquitectura a repositorio**, en `Recorrido-Codigo`:

| Componente (05) | ADR | Ruta en el repositorio | Responsabilidad |
| --- | --- | --- | --- |
| Capa de aplicación | ADR-002 | `src/<Proyecto de código>/Application/` | Orquesta casos de uso; sin lógica de dominio |
| Adaptador de persistencia | ADR-004 | `src/<Proyecto de código>/Infrastructure/Persistence/` | Implementa los repositorios del dominio |

**Bloque para agentes**, obligatorio en todo documento que define un proceso ejecutable:

```yaml
entradas:
  - "Variable de entorno APP_ENV con valor local|staging|prod"
  - "Servicio de persistencia accesible en el puerto declarado"
salidas:
  - "Servicio respondiendo en el puerto expuesto"
  - "Registro de arranque con nivel INFO y patrón 'listening on'"
validaciones:
  - comando: "curl -sf http://localhost:<puerto>/health"
    espera:
      exit_code: 0
      body_json: {status: "healthy"}
```


### 4.9 Anti-patrones a evitar

| Anti-patrón | Problema | Solución |
| --- | --- | --- |
| Documentos sin sufijo de versión | Pierde trazabilidad entre release y documentación | Sufijo `.md` obligatorio, salvo la excepción declarada de `AGENTS.md` |
| Nombre de archivo hardcodeado con un sistema concreto | Ata el template a un stack particular | Parametrizar con slug genérico |
| Mezcla de cuadrantes Diátaxis en el cuerpo integrador | Un tutorial con explicaciones largas se vuelve ilegible; una referencia con narrativa pierde rigor | Declarar `Tipo Diátaxis` en la cabecera y respetarlo |
| **Producir una versión «para humanos» y otra «para la IA»** | Divergen en el segundo cambio y nadie sabe cuál vale | Un documento, dos caras. Ante divergencia se corrige, nunca se bifurca |
| **Confundir el eje de rol con el eje de naturaleza del lector** | Produce cuerpos duplicados y organización incoherente | El rol organiza los cuerpos; la naturaleza se resuelve dentro de cada artefacto |
| **Recorrido de código que cita rutas inexistentes** | Manda al mantenedor a buscar algo que no está; es peor que no tener el documento | Toda ruta se verifica en el ensayo automatizado de cada corte |
| **Redefinir la estrategia de testing en la guía de contribución** | Dos estrategias que divergen; el mantenedor no sabe cuál rige | 11 cita a 08 por referencia; no la copia |
| **Redefinir la política de ambientes en la guía de despliegue** | Misma falla, contra 09 | 11 documenta el procedimiento verificado; la política vive en 09 |
| **Duplicar el código de un sample dentro de la documentación** | El sample evoluciona y la copia queda vieja | Enlazar al `ejemplo-XX` de 10 por identificador |
| **Documentar la implementación interna en conceptos fundamentales** | Confunde el rol de intervención y duplica 05 | 11 documenta el modelo mental visible al integrador; la implementación vive en 05 |
| **Criterio de verificación redactado como prosa** | «Comprobar que el servicio arrancó bien» no es evaluable por un agente | Comando verbatim y aserción: exit code, respuesta HTTP, patrón de log |
| **Redactar todo el cuerpo al cierre** | Describe un sistema que el redactor ya no recuerda haber construido, y llega tarde para corregir el diseño | Los tres momentos de §0.3, con la cadencia de §0.4 |
| **Declarar cerrado un corte con documentos afectados sin revisar** | La deuda documental se vuelve invisible y se acumula | Definition of Done del sprint incluye la actualización de 11 |
| **Cerrar una eventualidad sin destino asignado** | El conocimiento se pierde igual que si no se hubiera registrado | Triaje obligatorio de §0.6; `No absorbida` es un destino válido, «sin destino» no |
| **Que el agente que documentó apruebe su propio ensayo de entrega** | Conoce el sistema porque acaba de documentarlo; la prueba no prueba nada | El ensayo humano es un gate de confirmación humana |
| **Salirse de la documentación durante el ensayo y no registrarlo** | Se pierde exactamente el hallazgo que el ensayo existe para producir | El momento en que hay que salirse es el hallazgo |
| Glosarios duplicados por documento | El mismo término con definiciones distintas en cada archivo | Un único glosario referenciado desde todos |
| Cobertura cero de troubleshooting | El integrador se traba ante el primer error y abandona | Mínimo cinco entradas `ISSUE-XX` basadas en errores reales |
| Documento que nunca declara su fecha de revisión | No se puede distinguir lo vigente de lo abandonado | `last_review` obligatorio en el frontmatter, actualizado en cada corte |
---

## 5. Preguntas guía para el subagente

### 5.1 Cobertura por rol de intervención

- ¿Los tres roles tienen su cuerpo, o alguno quedó implícito porque el proyecto de código «no lo necesita»?
- ¿El cuerpo mantenedor existe? Es obligatorio para los ocho tipos D8, sin excepción.
- Cuando un cuerpo se omitió, ¿la omisión está registrada en `Decisiones-Proyecto.md`, y con ADR si el gating lo declaraba obligatorio?
- ¿Algún documento sirve a dos roles sin declararlo en `rol_intervencion`?

### 5.2 Doble audiencia

- ¿Existe algún par de documentos que digan lo mismo, uno en tono narrativo y otro en tono estructurado? Es la bifurcación que estas reglas prohíben.
- ¿Todo documento tiene frontmatter con los ocho campos mínimos?
- ¿Los criterios de éxito están escritos como aserción evaluable, o como prosa que obliga a interpretar?
- ¿Las rutas citadas son absolutas desde la raíz del repositorio, o hay referencias vagas del tipo «el archivo de configuración»?
- ¿Los documentos que definen un proceso ejecutable tienen su bloque `entradas` / `salidas` / `validaciones`?

### 5.3 Fronteras

- ¿La guía de contribución redefine la estrategia de testing de 08, o la cita?
- ¿La guía de despliegue redefine la política de ambientes de 09, o documenta el procedimiento verificado?
- ¿`Vision-General-Sistema` duplica las vistas de 05, o documenta el sistema como hecho consumado?
- ¿Algún documento copia el código de un sample de 10 en lugar de enlazarlo?
- ¿Aparece documentación dirigida al usuario final no técnico? Está fuera de alcance del framework.

### 5.4 Recorrido de código y utilidad para el mantenedor

- ¿Todas las rutas citadas en `Recorrido-Codigo` existen en el repositorio?
- ¿Cada componente declarado en 05 tiene su fila en el mapa arquitectura a repositorio?
- ¿El recorrido del flujo principal nombra archivos concretos en orden, o describe capas en abstracto?
- ¿Alguien que nunca vio el proyecto de código podría ubicar dónde se valida una entrada leyendo solo este documento?

### 5.5 Documentación viva

- ¿Cada documento declara su `last_review`, y esa fecha es posterior al último corte que lo afectó?
- ¿Hay documentos marcados `Potencialmente desactualizado` que llevan más de dos cortes sin revisión?
- ¿El plan documental del Momento 1 sigue reflejando lo que efectivamente se produjo, o se generaron artefactos que nadie planificó y viceversa?
- ¿El `AGENTS.md` se refrescó en este corte, o quedó de la corrida anterior?

### 5.6 Ensayo de entrega

- ¿Se corrió el ensayo automatizado en este corte? ¿Qué comandos fallaron?
- ¿Se corrió algún ensayo humano? ¿Quién lo corrió, y conocía el sistema de antes?
- ¿En qué paso se trabó, y qué hubo que averiguar por fuera de la documentación?
- ¿Cada trabada tiene documento y sección de destino asignados?

### 5.7 Bitácora y triaje

- ¿Hay eventualidades abiertas desde hace más de un corte sin triaje?
- ¿Alguna eventualidad se cerró sin destino asignado?
- ¿Las marcadas `No absorbida` tienen su motivo escrito?
- ¿El campo `intentos_descartados` está completo, o se registró solo lo que funcionó?

### 5.8 Voz y forma

- ¿Alguna sección abre reformulando su propio título?
- ¿Hay muletillas de relleno del listado de §4.6?
- ¿Hay listas de viñetas donde correspondía un párrafo con causa, efecto e impacto?
- ¿Se percibe una sola autoría a lo largo del cuerpo, o se nota el corte entre documentos?
- ¿Algún párrafo se puede borrar sin perder información?

---

## 6. Criterios de aceptación

**Estructura y gating**

- [ ] La categoría existe para el proyecto de código. Es obligatoria para los ocho tipos D8.
- [ ] El cuerpo mantenedor está materializado, con `Recorrido-Codigo` y `Guia-Contribucion` como mínimo.
- [ ] Los cuerpos integrador y operador se materializaron o se omitieron según la tabla de §2.5, y toda omisión está registrada en `Decisiones-Proyecto.md`, con ADR cuando el gating los declaraba obligatorios.
- [ ] Existen los artefactos de nivel producto bajo `Producto/11-Documentacion/`, o bajo `SDD/Docs/11-Documentacion/` en el caso degenerado.
- [ ] Existe `README.md` de la sección con su matriz de ruteo y su tabla de estado del cuerpo documental.
- [ ] Ningún artefacto lleva sufijo de versión en el nombre; cada uno declara su versión en la cabecera, salvo `AGENTS.md`, que se deriva del contrato versionado.
- [ ] Ningún nombre de archivo hardcodea un sistema comercial concreto.

**Doble audiencia**

- [ ] Todo documento tiene frontmatter YAML con `doc_id`, `doc_type`, `title`, `status`, `rol_intervencion`, `owner`, `last_review` y `traces`.
- [ ] Todo documento abre con resumen ejecutivo de tres a cinco oraciones.
- [ ] No existen versiones paralelas del mismo contenido segmentadas por tipo de lector.
- [ ] Los criterios de éxito están expresados como aserción evaluable, no como prosa.
- [ ] Los comandos son verbatim y copy-paste, con su salida esperada textual.
- [ ] Las rutas son absolutas desde la raíz del repositorio.
- [ ] Los documentos que definen un proceso ejecutable incluyen su bloque `entradas` / `salidas` / `validaciones`.

**Fronteras y trazabilidad**

- [ ] Ningún documento redefine la estrategia de testing de 08, la política de ambientes de 09 ni las vistas de 05: las citan.
- [ ] Ningún documento duplica el código de un sample de 10; los enlaza por identificador.
- [ ] Cada documento del cuerpo integrador y del cuerpo mantenedor tiene al menos un enlace a 05.
- [ ] Cada documento incluye su sección de referencias cruzadas con tres a cinco enlaces.
- [ ] No hay documentación dirigida al usuario final no técnico.

**Recorrido de código**

- [ ] Todas las rutas citadas en `Recorrido-Codigo` existen en el repositorio.
- [ ] Cada componente declarado en 05 tiene su fila en el mapa arquitectura a repositorio.
- [ ] El recorrido del flujo principal nombra archivos concretos en orden.

**Documentación viva**

- [ ] El plan documental del Momento 1 existe y se corresponde con lo producido.
- [ ] Todo documento declara `last_review` con fecha posterior al último corte que lo afectó.
- [ ] Ningún documento afectado por el corte quedó sin revisar antes de declararlo cerrado.
- [ ] Los documentos sin revisar desde hace más de dos cortes están marcados `Potencialmente desactualizado` en el README.
- [ ] El `AGENTS.md` se emitió en la primera corrida del Momento 2 y se refrescó en la última.
- [ ] `Contrato-Agentes.md` y `AGENTS.md` no divergen.

**Ensayo de entrega**

- [ ] El ensayo automatizado se corrió en el corte, y todo comando documentado ejecuta sin error.
- [ ] Hay al menos un guion de ensayo definido por rol de intervención aplicable.
- [ ] El ensayo humano se corrió y fue aprobado antes de cerrar el Momento 3.
- [ ] Cada trabada del ensayo tiene documento y sección de destino asignados, y se resolvió antes de cerrar el corte.

**Bitácora**

- [ ] Existe `Bitacora-Eventualidades.md` de nivel producto.
- [ ] Cada `EVE-XX` tiene sus nueve campos completos, incluido `intentos_descartados`.
- [ ] Ninguna eventualidad quedó cerrada sin destino asignado; las `No absorbida` tienen su motivo.
- [ ] Ninguna eventualidad quedó abierta más de un corte sin triaje.

**Voz y forma**

- [ ] Ninguna sección abre reformulando su encabezado.
- [ ] No hay muletillas de relleno del listado de §4.6.
- [ ] Los diagramas son Mermaid y son sintácticamente correctos.
- [ ] Los enlaces internos resuelven.
- [ ] Todo término que esta categoría acuña o precisa, y que aparece en más de uno de sus artefactos, está declarado en `Glosario-Tecnico.md` del cuerpo integrador, que esta categoría emite, con sus referentes cuando tiene más de uno. Es la fuente canónica del vocabulario técnico del producto: el resto de los documentos enlaza acá en lugar de redefinir (§0 y el detalle del cuerpo integrador).
- [ ] Ninguna forma desnuda de un término polisémico queda sin resolver en un artefacto que se lee por secciones (`Vocabulario-Rules.md` §9.2).
- [ ] Ninguna polisemia con contextos disjuntos se reporta como defecto ni se corrige calificando todas las ocurrencias (criterio negativo de `Vocabulario-Rules.md` §9.1).

---

## 7. Ejemplos genéricos

### 7.1 Fragmento de `Recorrido-Codigo.md` para un `rest-api`

```markdown
---
doc_id: DOC-PAGOS-RECORRIDO-01
doc_type: recorrido-codigo
title: Recorrido de código del servicio de pagos
status: Vigente
rol_intervencion: [mantenedor]
owner: Equipo de plataforma
version: 1.0
last_review: 2026-08-14
momento: 2
traces: [ADR-002, ADR-004, CU-01]
---

# Recorrido de código del servicio de pagos

**Proyecto de código:** Servicio-Pagos
**Rol de intervención:** Mantenedor
**Nivel:** Medio
**Tiempo estimado de lectura:** 15 min

## Resumen ejecutivo

Este documento traduce la arquitectura decidida en 05 a ubicaciones concretas del
repositorio. Sirve para ubicar dónde vive cada componente y para seguir el flujo
principal archivo por archivo. No explica por qué se decidió así: eso vive en los ADR.

## Mapa arquitectura → repositorio

| Componente (05) | ADR | Ruta | Responsabilidad |
| --- | --- | --- | --- |
| Capa de aplicación | ADR-002 | `src/Pagos/Application/` | Orquesta casos de uso; sin lógica de dominio |
| Dominio | ADR-002 | `src/Pagos/Domain/` | Entidades, invariantes y reglas de negocio |
| Adaptador de persistencia | ADR-004 | `src/Pagos/Infrastructure/Persistence/` | Implementa los repositorios del dominio |
| Adaptador HTTP | ADR-002 | `src/Pagos/Api/` | Traduce HTTP a casos de uso; sin reglas propias |

## Recorrido del flujo principal: confirmar un pago (CU-01)

Una petición `POST /pagos/{id}/confirmar` entra por `src/Pagos/Api/PagosController.cs`,
que no decide nada: valida la forma del payload y delega. El caso de uso vive en
`src/Pagos/Application/ConfirmarPago/ConfirmarPagoHandler.cs`, y es el único lugar donde
se decide si la confirmación procede.

El handler carga la entidad con el repositorio declarado en
`src/Pagos/Domain/Repositorios/IPagoRepositorio.cs`, cuya implementación concreta está
en `src/Pagos/Infrastructure/Persistence/PagoRepositorio.cs`. La invariante que impide
confirmar dos veces el mismo pago no vive en el handler sino en la entidad, en
`src/Pagos/Domain/Pago.cs`, método `Confirmar()`. Es deliberado: una invariante en el
handler se saltea el día que aparece un segundo punto de entrada.

## Dónde vive cada cosa

| Pregunta | Respuesta |
| --- | --- |
| ¿Dónde se valida la entrada HTTP? | `src/Pagos/Api/Validadores/` |
| ¿Dónde se define el esquema de la base? | `src/Pagos/Infrastructure/Persistence/Migraciones/` |
| ¿Dónde se registran las dependencias? | `src/Pagos/Api/Program.cs` |

## Preguntas guía

- Si tuvieras que agregar un estado nuevo al pago, ¿qué archivos tocarías y en qué orden?
- ¿Por qué la invariante vive en la entidad y no en el handler?
```

### 7.2 Fragmento de `Guia-Contenedor.md` con dispositivo del host

Ilustra la absorción de una eventualidad de tipo requisito del entorno, que es el caso testigo de §0.6.

````markdown
## Dispositivos del host requeridos

Este servicio se comunica con un dispositivo físico conectado al host. Sin acceso al
dispositivo el contenedor arranca, pasa el healthcheck y no procesa nada: es una falla
silenciosa, y es la razón por la que esta sección existe.

| Dispositivo | Ruta en el host | Regla de acceso | Cómo verificar |
| --- | --- | --- | --- |
| Puerto serie del equipo | `/dev/<identificador-del-dispositivo>` | El contenedor requiere el dispositivo mapeado y pertenencia al grupo del dispositivo | `ls -l /dev/<identificador>` en el host devuelve el dispositivo y su grupo |

Verificación desde adentro del contenedor:

```bash
test -c /dev/<identificador-del-dispositivo> && echo "dispositivo accesible"
```

Salida esperada: `dispositivo accesible`, exit code `0`.

Origen: `EVE-03` de la bitácora de eventualidades. Se detectó en el primer despliegue
containerizado; ninguna vista de arquitectura lo anticipaba.
````

### 7.3 Entrada de bitácora `EVE-03`

```yaml
id: EVE-03
ambito: servicio-adquisicion
fecha: 2026-08-02
momento: despliegue
sintoma: >
  El contenedor arranca, el healthcheck responde saludable y no se registra ninguna
  lectura del dispositivo. Sin errores en el log.
causa: >
  El contenedor no tenía mapeado el dispositivo del host ni pertenencia al grupo que
  lo gobierna. La biblioteca de acceso falla en silencio cuando la ruta no existe.
resolucion: >
  Mapear el dispositivo al contenedor y agregar el grupo correspondiente. Se agregó
  además una verificación de existencia del dispositivo al arranque, que ahora falla
  ruidosamente en lugar de quedarse callada.
intentos_descartados: >
  Ejecutar el contenedor con privilegios elevados (funciona, pero es inaceptable en
  producción). Montar el dispositivo como volumen (no aplica: es un dispositivo de
  caracteres, no un archivo).
destino: >
  Guia-Contenedor.md, sección «Dispositivos del host requeridos», y
  Runbook-Operacion.md, entrada OPS-07 «El servicio no registra lecturas».
```

Los tres fragmentos son ilustrativos. Cada proyecto de código adapta el dominio respetando la estructura, la nomenclatura y el contrato de doble audiencia.

---

## 8. Prompt-snippet sugerido

```text
Sos un {{ESPECIALIDAD-VARIANTE-11}} responsable del cuerpo documental de entrega del proyecto de código {{NOMBRE_PROYECTO_CODIGO}}.

Momento en curso: {{MOMENTO}} (1 plan documental | 2 actualización incremental | 3 consolidación de cierre).

Insumos:
- PRODUCT-INTAKE: {{path}} (§13 tipo D8, §16 estructura de repo, §17 técnica por proyecto de código)
- Upstream: 02 (CU y modelo de datos), 05 (arquitectura, contratos, ADR, puntos de extensión), 08 (estrategia de testing, que citás y no redefinís), 09 (política de despliegue, que convertís en procedimiento verificado), 10 (samples y contratos de verificación VER-XX, que enlazás y no duplicás).
- Estado del repositorio construido, cuando el momento es 2 o 3.

A generar, según el gating por cuerpo de Rules-Documentacion.md §2.5:
- Nivel producto: README.md con matriz de ruteo, Vision-General-Sistema, Guia-Inicio-Rapido, Guia-Despliegue, Bitacora-Eventualidades, Contrato-Agentes, y AGENTS.md en la raíz del repositorio destino.
- Cuerpo integrador (según tipo D8): conceptos, onboarding, integración por stack, referencia API, referencia CLI, troubleshooting, glosario.
- Cuerpo mantenedor (OBLIGATORIO para los ocho tipos): Recorrido-Codigo, Guia-Contribucion, Guia-Extension si hay extensibilidad declarada en 05.
- Cuerpo operador (según tipo D8): Guia-Contenedor, Runbook-Operacion.

Dos ejes, no confundir: el rol de intervención (integrador, mantenedor, operador) organiza los cuerpos; la naturaleza del lector (agente humano, agente de IA) se resuelve DENTRO de cada documento. Prohibido producir versiones paralelas por tipo de lector.

Lector primario: agente humano en primer contacto, que no participó de ninguna fase de la especificación.

Reglas de redacción: §1.4 estilo narrativo formativo, §1.5 doble audiencia, §4.6 voz narrativa, §4.7 formato markdown de Rules-Documentacion.md. El archivo de reglas es autosuficiente: no necesitás ningún otro para saber cómo redactar.

Estructura por artefacto: §4.2 a §4.5 según el cuerpo.
Frontmatter YAML obligatorio en todo documento, con los ocho campos mínimos de §4.1.
Resumen ejecutivo obligatorio al abrir cada documento.
Criterios de éxito como aserción evaluable, nunca como prosa. Comandos verbatim con salida esperada. Rutas absolutas desde la raíz del repositorio.
Fronteras: citás a 08, 09, 05 y 10; no las redefinís ni duplicás su contenido.
Toda ruta citada en Recorrido-Codigo debe existir. Una ruta que no resuelve es hallazgo P0.
Triaje de eventualidades según §0.6: ninguna se cierra sin destino asignado.
Criterios de calidad: §6 de Rules-Documentacion.md.

Restricciones: no generar documentación para el usuario final no técnico (fuera de alcance del framework). No incorporar reglas de indexado de conocimiento. No introducir productos comerciales ni protocolos del dominio fuente en los nombres de archivo. Idioma rioplatense técnico, tildes correctas, sin emojis ni negritas decorativas.

Salida: SDD/Docs/Proyectos/{{NOMBRE_PROYECTO_CODIGO}}/11-Documentacion/<estructura> y SDD/Docs/Producto/11-Documentacion/<estructura> en el repo del producto, más AGENTS.md en su raíz.
```

---

## 9. Control de cambios

| Versión | Fecha | Cambio | Autor |
| --- | --- | --- | --- |
| 1.0 | 2026-05-17 | Versión inicial. Define la categoría 10 developer guide, sus artefactos obligatorios y opcionales por tipo D8, su estructura por cuadrante Diátaxis, el TTFS objetivo y los anti-patrones. Corrige los dos déficits del fuente SDD 1.0: impone sufijo `.md` uniforme en todos los artefactos de esta carpeta y parametriza el nombre de la guía de integración como `guia-integracion-<sistema-objetivo>.md` para evitar atar la plantilla a un stack comercial concreto. | AG-10 Technical Writer / Developer Advocate Senior |
| 1.1 | 2026-06-09 | Validación ST-06: la categoría se genera por proyecto bajo `Proyectos/<Nombre-Proyecto>/10-Developer-Guide/`; la frase de selección de variante y la carpeta target referencian el `project_type` del proyecto en curso (manifiesto). Tablas §1.2 sin reescritura. | Reformulación SDD |
| 1.2 | 2026-06-10 | Migración de referencias de intake al documento unificado SOLUTION-INTAKE (unificación de intake). | Migración SDD |
| 1.3 | 2026-07-26 | Intercambio de categorías 10 ↔ 11. El archivo pasa a llamarse `Rules-Documentacion.md`, la categoría de documentación pasa de 10 a 11 y su carpeta target de `10-Developer-Guide/` a `11-Documentacion/`, con carpeta de nivel solución en `Solucion/11-Documentacion/`; el subagente titular pasa de AG-10 a AG-11 Technical Writer / Documentation Lead. Se invierte la dependencia declarada con la categoría de ejemplos: 10 pasa a ser upstream de 11, con la formulación «10 demuestra con código ejecutable y verificable, 11 explica, referencia y enlaza». Se normaliza el vocabulario de actores: «consumidor» pasa a «integrador», «constructor» a «mantenedor» y «audiencia» a rol de intervención. Las filas 1.0 a 1.2 conservan su redacción original por ser registro histórico. La redefinición completa del cuerpo documental de entrega es objeto de la versión siguiente. | Reformulación SDD |
| 2.0 | 2026-07-26 | Redefinición completa de la categoría como cuerpo documental de entrega organizado por rol de intervención. §0 incorpora los dos ejes (rol de intervención y naturaleza del lector) con la prohibición de bifurcar documentos por tipo de lector, las cinco fronteras con las categorías vecinas, el modelo de documentación viva en tres momentos, la cadencia anclada al cierre de sprint, el ensayo de entrega con sus dos niveles y su gate humano, y la bitácora de eventualidades con su triaje obligatorio. §1 suma la faceta Documentation Lead y embebe el estilo narrativo formativo y el contrato de doble audiencia. §2 reorganiza los artefactos en nivel solución más tres cuerpos de proyecto, incorporando `Vision-General-Sistema`, `Guia-Inicio-Rapido`, `Guia-Despliegue`, `Bitacora-Eventualidades`, `Contrato-Agentes` y `AGENTS.md` a nivel solución, y `Recorrido-Codigo`, `Guia-Contribucion`, `Guia-Extension`, `Guia-Contenedor` y `Runbook-Operacion` a nivel proyecto. §2.5 sustituye el gating por categoría por gating de granularidad por cuerpo: **el cuerpo mantenedor pasa a ser obligatorio para los ocho tipos D8**, y la categoría deja de ser opcional. §3 fija los identificadores `OPS-XX`, `EXT-XX` y `EVE-XX`, conserva `ISSUE-XX` y cita `VER-XX` sin redefinirlo. §4 suma frontmatter YAML obligatorio, resumen ejecutivo obligatorio, la estructura de los diez artefactos nuevos, la voz narrativa y el formato markdown. §5 reorganiza las preguntas guía en ocho bloques. §6 reescribe los criterios de aceptación en siete grupos. §7 reemplaza los ejemplos por tres fragmentos que ilustran el recorrido de código, la absorción de una eventualidad de entorno y una entrada de bitácora. Se descarta expresamente toda regla de indexado de conocimiento. Sube major porque cambia el alcance, el gating y el conjunto de artefactos de la categoría. | Reformulación SDD |
| 2.1 | 2026-07-28 | Reparación de la política de archivado (Revisión SDD): §3.1 declara que los índices `README.md` reciben el sufijo de versión al archivarse y que `AGENTS.md` queda exento del archivado, porque se regenera completo desde `Contrato-Agentes.md` en cada corrida y es ese contrato el artefacto versionado y archivable. La regla general y su tabla de exenciones viven en `Master-Prompt.md` §5.1. |
| 3.0 | 2026-07-28 | Normalización del versionado (framework 4.0). El archivo vivo pierde el sufijo de versión del nombre y pasa a declarar su versión en el campo `Versión` de su cabecera; el sufijo `-v<X.Y>.md` queda reservado a las copias archivadas en `_legacy/`. Se actualizan los patrones de nombre, los ejemplos, las cabeceras modelo, los anti-patrones y los criterios de aceptación de la categoría. Sube major porque la documentación generada con la nomenclatura anterior deja de cumplir. Deriva de la reformulación de D4 y D5 en el `README.md` del framework. |
| 4.0 | 2026-07-29 | Renombre de vocabulario normativo (framework 5.0). El nivel superior pasa de «solución» a **producto**, la unidad de compilación de «proyecto» a **proyecto de código**, y los cuatro planos de identidad del producto se separan en campos propios (`Nombre-Producto`, `Slug-Producto`, `Raiz-Codigo`, `Artefacto-Agrupacion`). Se declara el nivel de aplicación de la regla en su cabecera, según `Vocabulario-Rules.md` §4 R3. Sube major porque los identificadores y los nombres de artefacto cambian, y la documentación generada con la nomenclatura anterior deja de cumplir. | Reformulación SDD |
| 4.1 | 2026-07-29 | Criterio de gobierno del glosario en §6. Sube minor: agrega criterios de aceptación verificables sin cambiar el conjunto de artefactos de la categoría ni ninguna invariante, y ninguna documentación ya emitida deja de cumplir por sí sola. Los tres criterios exigen que todo término que la categoría acuña o precisa y usa en más de uno de sus artefactos esté declarado en el glosario que le corresponde, que ninguna forma desnuda de un término polisémico quede sin resolver en un artefacto que se lee por secciones, y —criterio negativo— que ninguna polisemia con contextos disjuntos se reporte como defecto. Materializan `Vocabulario-Rules.md` §9 en la categoría. **Origen**: el audit verificaba «glosario sin contradicciones», que un glosario incompleto cumple trivialmente, y esta regla mencionaba el glosario sin verificarlo en §6. | Revisión SDD |
