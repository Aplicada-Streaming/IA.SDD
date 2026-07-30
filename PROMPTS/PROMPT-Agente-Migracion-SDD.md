# Prompt de entrada — Agente de Migración Normativa SDD

> **Invocación**:
> - `Leer y Ejecutar /IA/IA.SDD/PROMPTS/PROMPT-Agente-Migracion-SDD.md en el repositorio: /<Repositorio-Destino>`

**Archivo:** `PROMPT-Agente-Migracion-SDD.md`
**Versión:** 1.0
**Idioma:** Español rioplatense neutro técnico
**Modo de ejecución:** Local en Claude Code. La invocación declara dos rutas: la del prompt de entrada (de la que se deriva la raíz del repositorio fuente `IA.SDD`) y la del repositorio destino del producto. Su ubicación relativa en el workspace es indistinta.
**Resultado esperado:** El destino re-expresado bajo la normativa vigente del framework, con su bloque de procedencia actualizado si la cadena quedó completa, y su informe de migración auditado en `SDD/Docs/Audit/`.

---

## 0 · Qué es este prompt

Este es el **prompt de entrada de la migración normativa**: lleva un destino que ya tiene documentación generada de la versión del framework con la que se generó a la versión vigente, **preservando su contenido**. No contiene la lógica de orquestación: la **delega** en `<RUTA-FUENTE>/SDD/Devs/Orchestrator/Master-Prompt-Migracion.md`, que es el orquestador real.

Es el par de `PROMPT-Agente-Bootstrap-SDD.md`, que arranca la generación. Los dos prompts de entrada tienen la misma forma y la misma responsabilidad acotada: fijar el modelo de repositorios, verificar prerrequisitos y delegar.

**Cuándo se usa este prompt y no el de bootstrap.**

| Situación del destino | Prompt que corresponde |
| --- | --- |
| `SDD/Docs/` vacía o inexistente | `PROMPT-Agente-Bootstrap-SDD.md` |
| `SDD/Docs/` poblada y su procedencia coincide con la versión vigente | `PROMPT-Agente-Bootstrap-SDD.md`: no hay nada que migrar |
| `SDD/Docs/` poblada y su procedencia declara una versión anterior | **Este prompt** |
| `SDD/Docs/` poblada y sin bloque de procedencia | **Este prompt**, con la clasificación degradada que declara `Migracion-Rules.md` §4.5 |

**Lo que este prompt NO hace:**

- No genera documentación desde cero. Si no hay nada generado, el que corresponde es el prompt de bootstrap.
- No genera código fuente. El framework produce documentación de especificación.
- No completa lo que falta. Si la normativa vigente exige una sección para la que el destino no tiene contenido, la sección se emite como pendiente y se pregunta. Es la regla de no invención de `Migracion-Rules.md` §4.1.
- No decide si migrar. La decisión llega tomada: este prompt se invoca, no se dispara solo.
- No escribe en el repositorio fuente.

---

## 1 · Modelo de dos repositorios

El mismo que el prompt de bootstrap. El trabajo ocurre sobre dos repositorios de un workspace común, y su posición relativa es indistinta: `<RUTA-FUENTE>` se deriva del path de la invocación (el path de este prompt sin el sufijo `/PROMPTS/PROMPT-Agente-Migracion-SDD.md`) y `<RUTA-DESTINO>` es la ruta indicada tras «en el repositorio:».

```text
workspace/
├── <RUTA-FUENTE>/          # repositorio fuente (solo lectura): el framework
│   ├── PROMPTS/            # este prompt de entrada
│   ├── _legacy/            # conjuntos normativos de versiones publicadas
│   ├── CHANGELOG.md        # de acá salen los renombres de artefacto
│   └── SDD/
│       ├── Devs/           # Rules, Intake (plantillas), Orchestrator, Guides, References
│       └── Guides/         # guías de cara al usuario
└── <RUTA-DESTINO>/         # repositorio del producto (los artefactos se escriben acá)
    └── SDD/
        ├── Intake/         # el intake y el manifiesto, que la migración alcanza
        │   └── _legacy/    # estados previos del intake, por fecha
        └── Docs/           # documentación generada, que la migración alcanza
            ├── Audit/      # el plan y el informe de migración
            └── ...         # cada carpeta con su propio _legacy/
```

Convención de rutas:

- Insumos de solo lectura (reglas, plantillas, prompts, guías, conjuntos archivados) → `<RUTA-FUENTE>/SDD/Devs/...`, `<RUTA-FUENTE>/SDD/Guides/...`, `<RUTA-FUENTE>/_legacy/...`.
- Artefactos del producto → `SDD/Intake/...` y `SDD/Docs/...`, relativos a `<RUTA-DESTINO>`.

Donde el master-prompt o las reglas escriban `../IA.SDD/`, léase `<RUTA-FUENTE>/`. La forma `../IA.SDD/` es el caso particular en que fuente y destino son hermanas; no es un requisito.

**Una diferencia respecto de la generación:** la migración además lee `<RUTA-FUENTE>/_legacy/` y `<RUTA-FUENTE>/CHANGELOG.md`, que la generación no necesita. De ahí salen el conjunto normativo de la versión de origen, cuando es reconstruible, y los renombres de artefacto, que ningún diff de versiones puede inferir.

---

## 2 · Prerrequisitos verificables

Antes de delegar en el orquestador, verificá:

1. El repositorio fuente está accesible en la `<RUTA-FUENTE>` derivada de la invocación. Verificable: `<RUTA-FUENTE>/SDD/Devs/Orchestrator/Master-Prompt-Migracion.md` y `<RUTA-FUENTE>/SDD/Devs/Rules/Migracion-Rules.md` existen y son legibles.
2. `SDD/Docs/` del repositorio destino **tiene contenido**. Si está vacía o no existe, este prompt no corresponde: usá `PROMPT-Agente-Bootstrap-SDD.md`.
3. `SDD/Intake/` del destino tiene un documento de intake, con su nombre vigente o con un nombre legado. **No es prerrequisito que el nombre sea el vigente**: resolver nombres legados es trabajo de la fase M0, y es precisamente el caso que la migración existe para atender.
4. Si existe un `Plan-Migracion-<origen>-a-<vigente>.md` en `SDD/Docs/Audit/`, tenelo a mano: el orquestador lo consume en lugar de recalcularlo. **No es obligatorio**: si no está, la fase M1 lo emite ella misma. La dependencia es del artefacto, no de haber corrido el otro prompt.
5. El destino no tiene trabajo sin guardar. La migración archiva antes de sobrescribir, pero el archivado preserva lo que está en disco, no lo que está en un editor abierto.

Si el prerrequisito 2 no se cumple, este prompt se detiene y te dice qué prompt corresponde. Si el 3 no se cumple —no hay ningún intake bajo ningún nombre—, se detiene y enumera los nombres que buscó, para que se vea por qué no lo resolvió.

---

## 3 · Invocación del orquestador

Con los prerrequisitos cumplidos, delegá en el master-prompt de migración:

```text
Leé <RUTA-FUENTE>/SDD/Devs/Orchestrator/Master-Prompt-Migracion.md y ejecutá el
orquestador de migración normativa SDD sobre <RUTA-DESTINO>. Resolvé toda ruta
`../IA.SDD/...` de las reglas contra <RUTA-FUENTE>. El destino tiene documentación
generada en SDD/Docs/. El producto se llama [Nombre del producto].
```

A partir de ahí el orquestador toma el control y recorre sus siete fases, deteniéndose en cada una:

1. **M0 — Reconocimiento del destino.** Resuelve el intake y el manifiesto tolerando nombres legados, lee el bloque de procedencia y verifica si el conjunto normativo de origen es reconstruible.
2. **M1 — Diff normativo.** Consume el plan de migración si existe, y si no lo emite. Presenta el plan completo, con filas para el intake y el manifiesto, y espera aprobación. No modifica nada todavía.
3. **M2 — Migración del intake.** Propone el intake bajo la plantilla vigente y presenta un diff de estructura. Lo que no tiene fuente va a una batería de preguntas, no se rellena. Escribe recién con aprobación explícita.
4. **M3 — Re-derivación del manifiesto**, desde el intake migrado, y confirmación.
5. **M4 — Migración de `SDD/Docs/`**, en el orden de la cadena D6, documento por documento, con audit independiente en cada corte.
6. **M5 — Cierre de procedencia**, solo si toda la cadena quedó migrada. Si algo quedó pendiente, la procedencia no se toca y el estado parcial se declara.
7. **M6 — Auditoría de migración**, por un auditor independiente, con veredicto bloqueante ante cualquier hallazgo P0.

Toda la mecánica —qué se preserva, qué no se inventa, cómo se clasifica cada documento, cómo se tratan las correcciones manuales, qué pasa con un destino sin procedencia y cuándo una migración parcial es aceptable— vive en `<RUTA-FUENTE>/SDD/Devs/Rules/Migracion-Rules.md`. El despacho de subagentes y la auditoría viven en `Master-Prompt.md` §8 y §10, y el orquestador de migración los cita en lugar de redefinirlos. Este prompt no duplica nada de eso: solo lo pone en marcha.

---

## 4 · Qué esperar al terminar

- El intake y el manifiesto re-expresados bajo las plantillas vigentes, con sus estados previos archivados en `SDD/Intake/_legacy/<fecha>/`.
- Los documentos de `SDD/Docs/` migrados según su clasificación, cada uno con su estado previo archivado en el `_legacy/` de su propia carpeta y su fila de control de cambios.
- `SDD/Docs/Audit/Plan-Migracion-<origen>-a-<vigente>.md` con el estado final de cada fila.
- `SDD/Docs/Audit/Informe-Migracion-<origen>-a-<vigente>.md` con el veredicto, el contenido que quedó sin destino y la declaración de migración completa o parcial.
- El bloque de procedencia del manifiesto actualizado a las versiones vigentes **solo si la cadena quedó completa**. Si quedó parcial, sigue declarando el origen, que es lo que sigue siendo cierto.

Con la migración completa, reinvocá `PROMPT-Agente-Bootstrap-SDD.md` para seguir trabajando sobre el destino: su reconciliación normativa informará «al día» y continuará sin preguntar.

---

## 5 · Control de cambios

| Versión | Fecha | Cambios | Autor |
| --- | --- | --- | --- |
| 1.0 | 2026-07-29 | Prompt de entrada inicial de la migración normativa, par del prompt de entrada de bootstrap. Fija el modelo de dos repositorios con las dos lecturas propias de la migración —`_legacy/` y el `CHANGELOG.md` del framework, de donde salen el conjunto de origen y los renombres de artefacto—, cinco prerrequisitos verificables, la tabla que decide entre este prompt y el de bootstrap según el estado del destino, la invocación que delega en `Master-Prompt-Migracion.md` y el resumen de las siete fases con lo que el usuario recibe al terminar. Declara explícitamente que el nombre legado del intake **no es un prerrequisito a corregir** sino el caso que la migración atiende, y que el plan de migración es opcional porque la fase M1 lo emite si falta. No contiene lógica de orquestación, igual que su par de bootstrap. | Framework SDD (migración normativa) |
