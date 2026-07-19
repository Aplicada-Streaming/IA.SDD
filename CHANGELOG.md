# Changelog

Todos los cambios relevantes de este repositorio (`IA.SDD`) se documentan acá.
Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/).

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
- `03-Rules-UX-UI-DX.md` (1.5 → 1.6): nueva §1.5 con lo que le toca a AG-03 antes y después de la fase, tres artefactos nuevos en la tabla maestra, tres filas de trazabilidad, dos anti-patrones y dos criterios de aceptación condicionados a `requiere_maqueta`.
- `08-Rules-Calidad-Y-Pruebas.md` (1.2 → 1.3): `Matriz-Sensado-Deriva-v<X.Y>.md` en la tabla maestra y su criterio de aceptación. AG-08 resuelve el método de verificación de cada fila al generar la Fase E.
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
- `Design-Rules-Web-Generico-v1.0.md` (1.1 → 1.2), `Index-Design-Rules.md` (1.1 → 1.2), `03-Rules-UX-UI-DX.md` (1.4 → 1.5) y `Master-Prompt.md` (3.2 → 3.3): registro, criterio de carga, requisitos de artefacto, trazabilidad, anti-patrones e inyección de las extensiones nuevas en el despacho de AG-03.
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
