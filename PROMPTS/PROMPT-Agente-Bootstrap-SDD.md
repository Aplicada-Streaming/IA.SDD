# Prompt de entrada — Agente Bootstrap SDD

**Archivo:** `PROMPT-Agente-Bootstrap-SDD.md`
**Versión:** 2.0
**Idioma:** Español rioplatense neutro técnico
**Modo de ejecución:** Local en Claude Code, sobre el repositorio destino de una solución, dentro de un workspace que también contiene el repositorio fuente `IA.SDD`.
**Resultado esperado:** Documentación de especificación de la solución generada y auditada en `SDD/Docs/` del repositorio destino, lista para el handoff a codificación.

---

## 0 · Qué es este prompt

Este es el **prompt de entrada** del SDD (Spec-Driven Development). Se carga en Claude Code para arrancar la generación de la documentación de especificación de una solución. No contiene la lógica de orquestación: la **delega** en el master-prompt `../IA.SDD/SDD/Devs/Orchestrator/Master-Prompt.md`, que es el orquestador real (plan-then-confirm, subagentes especializados, audit independiente entre fases).

Este prompt fija tres cosas antes de delegar: el modelo de dos repositorios, los prerrequisitos verificables y la invocación del orquestador.

**Lo que este prompt NO hace:**

- No genera código fuente. Produce únicamente documentación de especificación.
- No copia el template dentro del repositorio destino. Lee reglas, plantillas y prompts desde el repositorio fuente `IA.SDD`.
- No completa el `SOLUTION-MANIFEST`: lo deriva el orquestador a partir del §13 del intake.

---

## 1 · Modelo de dos repositorios

El trabajo ocurre sobre dos repositorios ubicados como hermanos en un workspace común:

```text
workspace/
├── IA.SDD/                 # repositorio fuente (solo lectura): este template
│   ├── PROMPTs/            # este prompt de entrada
│   └── SDD/
│       ├── Devs/           # Rules, Intake (plantillas), Orchestrator, Guides, References, Bootstrap
│       └── Guides/         # Guía de usuario
└── <Repositorio-Destino>/  # repositorio de la solución (se ejecuta acá)
    └── SDD/
        ├── Intake/         # SOLUTION-INTAKE-<Nombre-Solucion>-v1.0.md (humano)
        │                   # SOLUTION-MANIFEST-<Nombre-Solucion>-v1.0.md (derivado por el orquestador)
        ├── Docs/           # documentación generada (salida del orquestador)
        └── README.md
```

Convención de rutas de todos los prompts y reglas:

- Insumos de solo lectura (reglas, plantillas, prompts, guías) → `../IA.SDD/SDD/Devs/...` y `../IA.SDD/SDD/Guides/...`.
- Artefactos de la solución → `SDD/Intake/...` y `SDD/Docs/...`, relativos a la raíz del repositorio destino, donde se ejecuta este prompt.

Esta separación mantiene las reglas, plantillas y prompts maestros fuera del repositorio destino, de modo que las mejoras al template se propaguen a nuevas soluciones sin re-copiarlo, y deja los artefactos generados del lado del repositorio destino.

---

## 2 · Prerrequisitos verificables

Antes de delegar en el orquestador, verificá:

1. El repositorio fuente `IA.SDD` está clonado como hermano del repositorio destino (`../IA.SDD/` es accesible desde la raíz del destino).
2. Existe `SDD/Intake/SOLUTION-INTAKE-<Nombre-Solucion>-v1.0.md` en el repositorio destino, completo, con el checklist de §19 del intake íntegramente tildado.
3. Cada proyecto declarado en la §13 del intake tiene un `project_type` que pertenece al conjunto cerrado D8 (`library`, `web-monolith`, `web-microservices`, `desktop-app`, `mobile-app-maui`, `rest-api`, `cli-tool`, `worker-service`).
4. La carpeta `SDD/Docs/` del destino está vacía o no existe. Si tiene contenido previo, el orquestador se detiene y pide decidir entre archivar en `SDD/Docs/_legacy/<fecha>/` o abortar.

Si el intake no está listo, este prompt se detiene y pide completarlo. La generación del intake a partir del contexto de la solución se hace antes, partiendo de la plantilla `../IA.SDD/SDD/Devs/Intake/SOLUTION-INTAKE-template.md` (ver la guía de usuario `../IA.SDD/SDD/Guides/Guia-Usuario-SDD-v1.0.md`).

---

## 3 · Invocación del orquestador

Con los prerrequisitos cumplidos, delegá en el master-prompt:

```text
Leé ../IA.SDD/SDD/Devs/Orchestrator/Master-Prompt.md y ejecutá el orquestador SDD
sobre este repositorio destino. Mi intake está en SDD/Intake/. La solución se
llama [Nombre de la solución].
```

A partir de ahí el orquestador toma el control y aplica el patrón plan-then-confirm descrito en el master-prompt:

1. Fase de validación de intake (previa a la Fase A): valida la completitud del `SOLUTION-INTAKE` con `../IA.SDD/SDD/Devs/Rules/Intake-Rules.md`, emite una batería consolidada de preguntas si falta algo bloqueante, deriva el `SOLUTION-MANIFEST` desde la §13 y lo presenta para confirmación. El manifiesto derivado se escribe en `SDD/Intake/` del destino.
2. Detección de la jerarquía: nombres, flags de gating y orden topológico de los proyectos.
3. Generación por fases (A a H): categorías de nivel solución (00, 01), categorías por proyecto (02 a 11) en orden topológico, y consolidación de solución, cada fase cerrada con un audit independiente. La salida se escribe en `SDD/Docs/` del destino.
4. Handoff a codificación: al terminar, el orquestador se detiene y espera confirmación explícita antes de generar código.

Toda la mecánica (despacho de subagentes, criterios de aceptación, manejo de ambigüedad, auditoría entre fases, adaptabilidad por `project_type`) vive en el master-prompt y en los archivos de reglas de `../IA.SDD/SDD/Devs/Rules/`. Este prompt no la duplica: solo la pone en marcha.

---

## 4 · Control de cambios

| Versión | Fecha | Cambios | Autor |
| --- | --- | --- | --- |
| 2.0 | 2026-07-17 | Reescritura como prompt de entrada del modelo de dos repositorios. Reemplaza el contenido anterior (meta-prompt de bootstrap SDD 1.0 → 2.0, hoy histórico y conservado en `../IA.SDD/SDD/Devs/Bootstrap/`). Fija el modelo fuente/destino, los prerrequisitos verificables y la invocación que delega en `Master-Prompt.md`. | Refactorización SDD |
