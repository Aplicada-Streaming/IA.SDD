# Changelog

Todos los cambios relevantes de este repositorio (`IA.SDD`) se documentan acá.
Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/).

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
