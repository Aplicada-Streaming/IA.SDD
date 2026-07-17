# Changelog

Todos los cambios relevantes de este repositorio (`IA.SDD`) se documentan acá.
Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/).

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
