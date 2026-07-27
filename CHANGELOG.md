# Changelog

Todos los cambios relevantes de este repositorio (`IA.SDD`) se documentan acá.
Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/).

## [3.1] - 2026-07-26

Eliminación de material histórico absorbido. No cambia ninguna regla ni el comportamiento del orquestador.

### Eliminado
- `SDD/Devs/Reformulacion/` (4 archivos, 80 KB): `Matriz-Coherencia-Template-v1.0.md` (línea base ST-01), `Propuesta-Modelo-Solucion-Jerarquia-v1.0.md` (ST-02, APROBADA e implementada), `Audit-Reformulacion-Final-v1.0.md` (ST-09, APROBADO sin P0) y `Audit-Unificacion-Intake-v1.0.md` (APROBADO sin P0). Documentaban la reformulación a modelo de solución con jerarquía de proyectos y la unificación del intake, ambas consumadas: el modelo que proponen **es** el framework vigente y los audits cerraron aprobados.
- `SDD/Devs/Intake/_legacy/2026-06-10/` (2 archivos, 56 KB): `PROJECT-BRIEF-template.md` y `PROJECT-README-template.md`, las dos plantillas que el `SOLUTION-INTAKE` unificado reemplazó.

**Criterio aplicado.** Un registro histórico se conserva mientras alguien lo cite o mientras explique algo que las reglas vigentes no expliquen por sí solas. Estos seis archivos no cumplían ninguna de las dos condiciones: cero referencias entrantes desde archivos vivos, y su contenido íntegramente absorbido en las reglas y en las entradas 2.0 a 2.5 de este changelog. El historial de git los preserva y son recuperables.

**No se tocó `SDD/Devs/Bootstrap/`.** Su `Audit-SDD1.md` es la evidencia empírica de las invariantes: siete archivos de reglas lo citan para justificar qué déficit del fuente corrigen. Eliminarlo dejaría a esas reglas diciendo «hacé X» sin poder decir por qué.

### Cambiado
- `README.md` y `SDD/Guides/SDD-Development-Guide.md`: la anatomía del repositorio pierde la fila de `Reformulacion/`, y la descripción de `Bootstrap/` deja de decir «registro histórico congelado» para declarar lo que realmente es, una fuente citada. La guía de desarrollo suma el criterio general para decidir cuándo un registro histórico se conserva y cuándo se elimina.

## [3.0] - 2026-07-26

Intercambio de las categorías 10 y 11, redefinición del cuerpo documental de entrega e incorporación del ciclo de documentación viva posterior al handoff. Sube major porque cambia el alcance y el gating de dos categorías, y porque la documentación generada con la numeración anterior deja de cumplir.

### Añadido
- `SDD/Guides/SDD-Development-Guide.md` (nuevo, 1.0): guía de desarrollo y extensibilidad del framework, para el mantenedor del framework y no el de una solución. Anatomía, seis contratos internos hasta ahora no escritos, **nueve** ejes de extensión con ejemplo trabajado, criterios, once anti-patrones y procedimiento de cambio. El archivo existía vacío desde su creación.
- `README.md` raíz: reescrito como superficie de entrada. Matriz de ruteo por intención, anatomía del repositorio, mapa de las doce categorías, invariantes D1 a D9 enunciadas y reglas de intervención.
- `Rules-Documentacion.md` (2.0): cuerpo documental de entrega organizado por rol de intervención, con artefactos de nivel solución (`Vision-General-Sistema`, `Guia-Inicio-Rapido`, `Guia-Despliegue`, `Bitacora-Eventualidades`, `Contrato-Agentes`, `AGENTS.md`) y tres cuerpos de proyecto: integrador, mantenedor y operador. Modelo de documentación viva en tres momentos, cadencia anclada al cierre de sprint, ensayo de entrega con gate humano y bitácora de eventualidades con triaje obligatorio. Identificadores `OPS-XX`, `EXT-XX` y `EVE-XX`.
- `Rules-Examples.md` (2.0): doble arista del sample. Contrato de verificación `VER-XX` con `verifica`, `comando`, `precondiciones`, `criterio_aceptacion` y `evidencia`, y dos pasadas de generación, de diseño pre-código y de ejecución durante la codificación.
- `Master-Prompt.md` (3.6): Fases I y J, con la precondición dura de la Fase I, su criterio de re-ejecución y diez hallazgos P0 propios. `AGENTS.md` como única salida fuera de `SDD/`.
- `Deriva-Rules.md` (1.1): sondas `VER-XX` en la matriz de sensado. Los proyectos sin interfaz visual dejan de quedar sin instrumento de sensado.
- `SDD-User-Guide.md` (1.5): §4.8 con el paso 7 del usuario y seis entradas de FAQ nuevas, F-24 a F-29.

### Cambiado
- **Intercambio 10 ↔ 11.** `Rules-Developer-Guide.md` pasa a `Rules-Documentacion.md`; la categoría de ejemplos pasa de 11 a 10 y la de documentación de 10 a 11. Carpetas target `10-Examples/` y `11-Documentacion/`. Subagentes reasignados: AG-10 Developer Advocate y AG-11 Technical Writer / Documentation Lead. La dependencia se invierte: 10 demuestra con código ejecutable y verificable, 11 explica, referencia y enlaza.
- **Gating de la categoría 11.** Deja de ser opcional para cuatro tipos D8 y pasa a existir siempre, con granularidad por cuerpo. El cuerpo mantenedor es obligatorio para los ocho tipos.
- **Orden de fases.** La Fase F queda solo con 09-Devops; la Fase G produce la pasada de diseño de 10-Examples; la Fase H suma el plan documental de 11. El handoff cierra el tramo de especificación y no el alcance del framework.
- **Definition of Done del sprint** (`Rules-Plan-Sprint.md` 1.4): incorpora la actualización de la categoría 11 como condición de cierre.
- **Fronteras declaradas en las dos direcciones**: `Rules-Arquitectura-Tecnica.md` (1.4), `Rules-Calidad-Y-Pruebas.md` (1.6) y `Rules-Devops.md` (1.6) declaran su frontera con la categoría 11. Sin esto, el subagente de esas categorías no la conoce, porque cada uno lee un solo archivo de reglas.
- **Tabla de contenido** exigida en los documentos generados por las diez categorías de 00 a 09, cuando superan las tres secciones de primer nivel.
- **Vocabulario de actores normalizado**: «consumidor» pasa a «integrador» y «constructor» a «mantenedor» donde designan un rol de intervención; «audiencia» pasa a «rol de intervención» donde designa a quien lee documentación. Se conservan los usos técnicos y la categoría de stakeholder del intake.
- **Referencias a la sección de anti-patrones**: el orquestador las citaba como «§4.5», numeración que solo coincidía en siete de los trece archivos de reglas. Ahora se las ubica por título.
- `SDD-Getting-Started-Guide.md` (1.1) y `Marco-Teorico-SDD-v1.0.md` (1.7): puestos al día con la numeración nueva.

### Corregido
- **Contradicción entre `Rules-Calidad-Y-Pruebas.md` y `Deriva-Rules.md`** (1.6 → 1.7). La categoría 08 seguía condicionando `Matriz-Sensado-Deriva` a `requiere_maqueta == true` y a haber ejecutado la Fase B2, contradiciendo la extensión del sensado a contratos y comportamiento. Ahora §0 declara las dos clases de sonda y su origen, §2.1 hace la matriz obligatoria también para proyectos con categoría 10, y §6 separa el criterio por clase de sonda y prohíbe la matriz vacía. Sin esta corrección, un proyecto sin interfaz visual seguía quedando sin instrumento de sensado.
- **Nomenclatura de invariantes.** El framework se refería al conjunto como «D1-D8» pese a que son nueve desde la incorporación de D9. Dieciocho ocurrencias normativas pasan a «D1-D9» en el master-prompt, las dos guías de usuario, `Root-Rules.md`, `Rules-Necesidades-Negocio.md`, el marco teórico y el catálogo de diseño, con las enumeraciones completadas. Las notas de coherencia ya emitidas conservan «D1-D8»: verificaron contra el conjunto vigente en su momento.
- **Neutralidad de dominio en la guía de arranque** (1.1 → 1.2). El ejemplo aplicado de §6 nombraba una solución concreta en dieciocho lugares. Pasan al placeholder `<Nombre-Solucion>`, con la descripción del dominio y los flujos de usuario enunciados en términos genéricos.
- **Referencia muerta en el marco teórico** (1.7 → 1.8). El bloque de ejemplo de §11.2 citaba `devs/Rules/decisiones-D1-D8.md`, archivo inexistente, con rutas del layout previo al modelo de tres niveles.
- **Versionado de la plantilla de intake** (1.2 → 1.3). `SOLUTION-INTAKE-template.md` no declaraba su propia versión en cabecera, solo en su control de cambios. Aplicación incompleta de D6 sobre las plantillas.
- **Autosuficiencia del repositorio.** Doce ocurrencias de rutas que apuntaban fuera del árbol quedaron eliminadas. Ningún archivo de `IA.SDD` referencia otro repositorio.

### Impacto sobre documentación ya emitida
La documentación generada con la numeración anterior no se regenera automáticamente. Una solución existente conserva sus carpetas `10-Developer-Guide/` y `11-Examples/` hasta que se ejecute una regeneración parcial de esas categorías. El resto de las categorías no se ve afectado.

## [2.5] - 2026-07-25

Normalización de la nomenclatura de los archivos de reglas: se elimina el prefijo numérico de las doce reglas por categoría.

### Cambiado
- `SDD/Devs/Rules/`: las doce reglas por categoría pierden el prefijo numérico y pasan a `Rules-<Categoria>.md` (`00-Rules-Contexto.md` → `Rules-Contexto.md`, …, `11-Rules-Examples.md` → `Rules-Examples.md`). Las cuatro reglas meta (`Root-Rules.md`, `Intake-Rules.md`, `Maqueta-Rules.md`, `Deriva-Rules.md`) ya cumplían la convención y no cambian. Sin cambios de contenido normativo: no se sube versión de ninguna regla. La numeración de las categorías se mantiene donde sí es semántica: títulos de las reglas (`# Reglas constructivas — 05 Arquitectura técnica`), carpetas destino (`SDD/Docs/05-Arquitectura-Tecnica/`) y fases del orquestador.
- Referencias actualizadas en los 20 markdown del repositorio que citaban los nombres anteriores: `SDD/Devs/Orchestrator/Master-Prompt.md`, `SDD/Guides/SDD-User-Guide.md`, `SDD/Devs/Guides/Coherencia-Auditoria-Marco-v1.0.md`, los nueve documentos de `SDD/Devs/References/Design/`, los cuatro de `SDD/Devs/Bootstrap/`, los tres de `SDD/Devs/Reformulacion/`, las propias reglas y las entradas históricas de este changelog.
- El patrón placeholder `XX-Rules-<Categoria>.md` pasa a `Rules-<Categoria>.md` en `Master-Prompt.md` (§1 y §6), `SDD-User-Guide.md` (§6 y §10 glosario), `Audit-Fase-3.md` y `Matriz-Coherencia-Template-v1.0.md` §2.1.
- `SDD-User-Guide.md` §4.4: la verificación del listado de `Rules/` deja de expresarse como rango `00-Rules-*.md` a `11-Rules-*.md` y pasa a "los doce archivos de reglas por categoría `Rules-*.md` (de `Rules-Contexto.md` a `Rules-Examples.md`)".

## [2.4] - 2026-07-24

Reorganización de las guías de usuario: convención de nombres en inglés y nueva guía de arranque rápido.

### Añadido
- `SDD/Guides/SDD-Getting-Started-Guide.md` (1.0): guía de arranque rápido para primeros pasos con el template, con front-matter estructurado (`doc_id`, `traces` a `SDD-User-Guide.md` y `PROMPT-Agente-Bootstrap-SDD.md`) y orientada a desarrolladores primerizos, analistas, líderes técnicos y agentes de IA.
- `PROMPTS/README.md`: descripción del agente orquestador (borrador inicial).

### Cambiado
- `SDD/Guides/Guia-Usuario-SDD-v1.0.md` → `SDD/Guides/SDD-User-Guide.md`: renombrado a la convención de nombres en inglés, sin cambios de contenido (se mantiene la v1.3).
- `README.md` raíz: se corrige el enlace de la guía de usuario al nombre nuevo (`SDD/Guides/SDD-User-Guide.md`), que había quedado roto tras el rename.

## [2.3] - 2026-07-20

Desacople de la ubicación del repositorio fuente respecto del destino y autocontención de los ejemplos de instancia en el intake.

### Cambiado
- `PROMPTS/PROMPT-Agente-Bootstrap-SDD.md` (2.0 → 2.1): la ubicación del repositorio fuente deja de asumirse hermana del destino. Se introducen los placeholders `<RUTA-FUENTE>` (derivada del path de la invocación, quitando el sufijo `/PROMPTS/PROMPT-Agente-Bootstrap-SDD.md`) y `<RUTA-DESTINO>` (la ruta indicada tras «en el repositorio:»), y se declara `../IA.SDD/` como alias de `<RUTA-FUENTE>/`, lo que cubre las ocurrencias del master-prompt y de las reglas sin editarlas. §1 introduce ambos placeholders y el bloque de invocación; §2 prerrequisito 1 pasa de «clonado como hermano» a «accesible en `<RUTA-FUENTE>`», verificable; §3 invoca al orquestador con las rutas derivadas. Habilita workspaces donde fuente y destino no son hermanas (p. ej. `IA/IA.SDD` y `DEV/<solución>`).
- `SDD/Devs/Intake/SOLUTION-INTAKE-template.md` (1.0 → 1.1): se agrega la **Parte D — Anexos de datos** (§20 escenarios con JSON completo y su procedencia y estado, §21 matriz de cobertura y trazabilidad), la **regla de autocontención** en la guía de uso (paso 5), los ítems de checklist de la Parte D y la fila de trazabilidad downstream. Objetivo: que el intake transcriba los ejemplos de instancia en lugar de referenciar archivos externos que el orquestador aguas abajo no puede resolver. La Parte D es opcional y condicional (existe solo si las fuentes aportan ejemplos), pero cuando existen es su hogar canónico: el cuerpo cita por identificador (`E-1`, `E-2`, …) y el anexo reproduce el dato completo, sin referencias colgantes ni anexos huérfanos.

## [2.2] - 2026-07-19

Incorporación de la Fase B2 de validación visual de maqueta y del mecanismo de sensado de deriva.

### Añadido
- **Fase B2 — Validación visual de maqueta**, opcional y por proyecto, entre la Fase B y la Fase C. Se activa con el flag nuevo `requiere_maqueta`, propuesto por el orquestador y confirmado por el humano. Materializa la especificación de la categoría 03 en una maqueta navegable (HTML, CSS, Bootstrap 5.0 y JavaScript estáticos, sin proceso de build), la valida con el humano en el navegador, retroalimenta la documentación y capitaliza el diseño.
  - `SDD/Devs/Rules/Maqueta-Rules.md`: subagente AG-03M con sus variantes por D8, artefactos, secuencia de siete pasos con tres detenciones, las dos vías de corrección (por prompt y manual, esta última con relectura, interpretación y confirmación antes de propagar), matriz de propagación de la retroalimentación, reglas constructivas de la maqueta, captura del modelo UX-UI, generación del template ofuscado con verificación bloqueante, y el método de lanzado y relanzado con sus tres formas soportadas.
  - `SDD/Devs/Rules/Deriva-Rules.md`: invariante **D9 — evidencia verificable**, con alcance acotado a las afirmaciones sobre el estado del sistema, cuatro condiciones de validez y formato de cita `EV-XX`; los tres artefactos de línea de base (`Linea-Base-Visual`, `Contrato-Datos-Maqueta`, `Matriz-Sensado-Deriva`) con sus identificadores `SUP`, `CMP`, `EST`, `NAV`, `DM` y `SD`; umbrales de deriva menor y mayor por dimensión; los cuatro puntos de sensado.
- **Catálogo de modelos UX-UI** en `SDD/Devs/Modelos-UX-UI/`: `Index-Modelos-UX-UI.md` (arranca vacío) y `Rules-Design-Modelo-Template.md`, la plantilla de captura. Es el tercer eje del sistema de diseño del template, ortogonal al documento base, a las especializaciones por stack y a las extensiones por capacidad; se aplica por encima del base y nunca lo reemplaza.
- **Carpeta `Templates/`** en la raíz del repositorio, con su `README.md` (estructura obligatoria de un template y regla de ofuscación) y `Modelo-Generico/`, el ejemplo de referencia ejecutable que fija la estructura: tres superficies, tokens del catálogo base como variables CSS, fuente única de datos, los cuatro estados conmutables y la superficie de configuración dirigida por esquema.

### Cambiado
- `Master-Prompt.md` (3.3 → 3.4): flag `requiere_maqueta` en §4, invariante D9 en §5, fila de la Fase B2 y dos notas operativas en §6, los nueve pasos de la fase en §7, criterios de audit propios de B2 y de D9 en §10, línea de base y matriz de sensado en el resumen ejecutivo del handoff en §12, seis términos nuevos en §15. Se declara la única excepción de escritura fuera del repositorio destino (captura del modelo UX-UI en `IA.SDD`, con aceptación explícita y ofuscación bloqueante).
- `Rules-UX-UI-DX.md` (1.5 → 1.6): nueva §1.5 con lo que le toca a AG-03 antes y después de la fase, tres artefactos nuevos en la tabla maestra, tres filas de trazabilidad, dos anti-patrones y dos criterios de aceptación condicionados a `requiere_maqueta`.
- `Rules-Calidad-Y-Pruebas.md` (1.2 → 1.3): `Matriz-Sensado-Deriva-v<X.Y>.md` en la tabla maestra y su criterio de aceptación. AG-08 resuelve el método de verificación de cada fila al generar la Fase E.
- `Index-Design-Rules.md` (1.2 → 1.3): nueva §4.1 con el registro del catálogo de modelos UX-UI como tercer eje, el orden de apilado de las cuatro capas y la regla de conflicto.
- `Guia-Usuario-SDD-v1.0.md` (1.2 → 1.3): se agrega la tabla de contenido del documento. Nuevo §4.6 (Paso 5b) con el recorrido completo de la fase; el §4.6 anterior pasa a §4.7. Nuevo §7.4 (agregar un modelo UX-UI). Cuatro entradas de FAQ nuevas (F-20 a F-23). Seis términos nuevos en el glosario. Árbol de carpetas con `SDD/Maquetas/`, las dos reglas nuevas y el catálogo de modelos.
- `Marco-Teorico-SDD-v1.0.md` (1.4 → 1.6): §8.8 (la maqueta como instrumento de diseño y de control) y §9.7 (la deriva como separación acumulativa, la línea de base como referente externo falsable y la fundamentación de D9 y de sus umbrales). Además, puesta al día con el framework vigente: §3.6 y §3.8 corrigen la referencia al master-prompt (v3.0 → 3.4) y el rastro del modelo anterior a los dos repositorios, e incorporan la Fase B2 al diagrama del flujo; §4.1 y §4.3 registran a AG-03M como subagente de fase que no altera el catálogo de 13 especialidades; §13 suma ocho términos. Se agrega la fila 1.5 que el cambio de 2.1 había omitido, en incumplimiento de la política de versionado D5.

### Decisiones registradas
- **El orquestador lanza la maqueta y degrada sin fallar.** Al terminar de construirla levanta un servidor estático local e intenta abrir el navegador con el abridor del sistema. Si no alcanza un entorno gráfico desde donde corre, informa la URL y el comando en lugar de tratarlo como error: el auto-lanzado es una comodidad, la URL informada es el contrato. Para la corrección manual se recomienda el servidor liviano del editor, que recarga solo al guardar y que el orquestador no puede disparar por su cuenta; para el resto de los casos la maqueta trae su propia recarga automática en la barra de validación, apagada por defecto.
- **La maqueta se sirve estática, sin paso de build.** Lo que se edita es lo que se sirve, y es lo mismo que después relee el orquestador; esa equivalencia es la que hace posible la corrección manual del humano. Un paso de build la rompería: obligaría a rebuild para ver cada cambio, dejaría al orquestador sin saber si la verdad es la fuente o el artefacto servido, y metería dependencias en el repositorio destino para un artefacto de vida corta. Tres métodos de lanzado soportados, en orden de preferencia: servidor liviano del editor (en Visual Studio Code, Live Server o equivalente, que recarga solo en cada guardado y es el mejor ajuste para la corrección manual), archivo directo en el navegador, y servidor estático de línea de comandos. La excepción, admitida vía ADR, está en `Maqueta-Rules.md` §7.2.
- **`SDD/Maquetas/` es hermana de `SDD/Docs/`, no está dentro.** `SDD/Docs/` es exclusivamente prosa generada por el orquestador; la maqueta es material ejecutable que el humano edita durante la validación.
- **D9 no se aplica retroactivamente.** Reauditar la documentación previa contra una invariante nueva produciría un volumen de hallazgos que ahoga a los reales.

## [2.1] - 2026-07-18

Incorporación del arquetipo de panel de control monolítico al catálogo de reglas de diseño, a partir de la extracción de características de un servicio en producción.

### Añadido
- **Tres extensiones por capacidad** en `SDD/Devs/References/Design/`, agnósticas de framework y sin literales del dominio de la fuente:
  - `Design-Rules-Primer-Arranque-v1.0.md`: predicado único de aprovisionamiento, corte en tres capas (ruteo, superficie y acción), superficie sin chrome, acto explícito e indivisible, orientación posterior.
  - `Design-Rules-Acceso-Monousuario-v1.0.md`: perfil de operador único definido por sus omisiones, shell partido acceso/trabajo, catálogo de códigos de resultado con rechazo indiferenciado, frontera de sesión.
  - `Design-Rules-Identidad-De-Version-v1.0.md`: versión derivada de la construcción y nunca transcrita, contrato de identidad, ubicaciones obligatorias del sello, detalle de diagnóstico.
- `SDD/Devs/References/Design/Coherencia-Panel-Monolitico-v1.0.md`: nota de coherencia del pase de QA (invariantes D1–D8 y trazabilidad).
- `Design-Rules-Blazor-Mudblazor-v1.0.md` §4.2: mapeo de los patrones de las tres extensiones a componentes MudBlazor.

### Cambiado
- `Design-Rules-Config-Esquema-v1.0.md` (1.0 → 1.1): frontera entre configuración de aplicación y configuración de entorno, y derivación de los presets a partir de los `ejemplos` y el `default` de los descriptores.
- `Design-Rules-Web-Generico-v1.0.md` (1.1 → 1.2), `Index-Design-Rules.md` (1.1 → 1.2), `Rules-UX-UI-DX.md` (1.4 → 1.5) y `Master-Prompt.md` (3.2 → 3.3): registro, criterio de carga, requisitos de artefacto, trazabilidad, anti-patrones e inyección de las extensiones nuevas en el despacho de AG-03.
- `Marco-Teorico-SDD-v1.0.md` §8.7 y `Guia-Usuario-SDD-v1.0.md` §10.2: descripción del arquetipo y árbol del plano `devs/` actualizados.

## [2.0] - 2026-07-17

Refactorización del template SDD: nueva nomenclatura y modelo de dos repositorios.

### Cambiado
- **Marca y nomenclatura:** todo lo que se llamaba `SDD2.2D` / `SDD 2.2` / `sdd2.2` pasa a llamarse `SDD`. La carpeta raíz `SDD2.2D/` es ahora `SDD/`.
- **Convención de nombres Título-Con-Guiones:** carpetas, archivos de metodología y artefactos generados usan Título-Con-Guiones (cada palabra capitalizada, separadas por guion medio), con sufijo de versión `-v<X.Y>.md`. Los identificadores (`NB`, `CU`, `RN`, `ADR`, `US`, `BT`, `RC`, `TC`) van en mayúscula; los valores del conjunto D8 (`library`, `rest-api`, etc.) se mantienen en minúscula por ser enums.
- **Doctrina D3/D4 reescrita:** de "kebab minúscula + sufijo `_v` con guion bajo" a "Título-Con-Guiones + sufijo `-v` con guion medio", incluido el algoritmo de normalización de nombres del `Master-Prompt.md` §3.2 y la tabla de invariantes §5.
- **Referencias internas:** actualizadas en toda la documentación (reglas, orquestador, plantillas, guías, marco teórico e históricos) a los nombres y rutas nuevos.

### Añadido
- **Modelo de dos repositorios:** la metodología pasa de copiar el template dentro del repositorio destino a trabajar con dos repositorios hermanos en un workspace común:
  - Repositorio fuente `IA.SDD` (solo lectura): reglas, plantillas, prompts, guías. Se referencia como `../IA.SDD/SDD/…`.
  - Repositorio destino de la solución: intake y manifiesto derivado en `SDD/Intake/`, documentación generada en `SDD/Docs/`.
  - Esto permite propagar mejoras del template a nuevas soluciones sin re-copiarlo.
- Documentado el nuevo flujo en la guía de usuario (Paso 4) y en el marco teórico (§1.5, §3.5).

### Reescrito
- `PROMPTS/PROMPT-Agente-Bootstrap-SDD.md`: pasa de contener el meta-prompt histórico de bootstrap (SDD 1.0 → 2.0) a ser el prompt de entrada real del modelo de dos repositorios, que fija prerrequisitos y delega en `SDD/Devs/Orchestrator/Master-Prompt.md`. El contenido histórico del bootstrap se conserva en `SDD/Devs/Bootstrap/`.

### Corregido
- El `README.md` raíz tenía dos enlaces rotos a la guía de usuario y al marco teórico (diferencias de casing y separador); ahora resuelven.
- Ejemplos válido/inválido de nomenclatura en las 12 reglas que habían quedado idénticos u orientados a la convención anterior.
