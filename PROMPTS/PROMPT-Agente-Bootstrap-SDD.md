# Prompt de entrada — Agente Bootstrap SDD

> **Invocación**:
> - `Leer y Ejecutar /IA/IA.SDD/PROMPTS/PROMPT-Agente-Bootstrap-SDD.md en el repositorio: /<Repositorio-Destino>`

**Archivo:** `PROMPT-Agente-Bootstrap-SDD.md`
**Versión:** 2.3
**Idioma:** Español rioplatense neutro técnico
**Modo de ejecución:** Local en Claude Code. La invocación declara dos rutas: la del prompt de entrada (de la que se deriva la raíz del repositorio fuente `IA.SDD`) y la del repositorio destino del producto. Su ubicación relativa en el workspace es indistinta.
**Resultado esperado:** Documentación de especificación del producto generado y auditada en `SDD/Docs/` del repositorio destino, lista para el handoff a codificación.

---

## 0 · Qué es este prompt

Este es el **prompt de entrada** del SDD (Spec-Driven Development). Se carga en Claude Code para arrancar la generación de la documentación de especificación de un producto. No contiene la lógica de orquestación: la **delega** en el master-prompt `<RUTA-FUENTE>/SDD/Devs/Orchestrator/Master-Prompt.md`, que es el orquestador real (plan-then-confirm, subagentes especializados, audit independiente entre fases).

Este prompt fija tres cosas antes de delegar: el modelo de dos repositorios, los prerrequisitos verificables y la invocación del orquestador.

**Lo que este prompt NO hace:**

- No genera código fuente. Produce únicamente documentación de especificación.
- No copia el template dentro del repositorio destino. Lee reglas, plantillas y prompts desde el repositorio fuente `IA.SDD`.
- No completa el `PRODUCT-MANIFEST`: lo deriva el orquestador a partir del §13 del intake.

---

## 1 · Modelo de dos repositorios

El trabajo ocurre sobre dos repositorios de un workspace común. Su posición relativa es indistinta: `<RUTA-FUENTE>` se deriva del path de la invocación (el path del prompt de entrada sin el sufijo `/PROMPTS/PROMPT-Agente-Bootstrap-SDD.md`) y `<RUTA-DESTINO>` es la ruta indicada tras «en el repositorio:».

```text
workspace/
├── <RUTA-FUENTE>/          # repositorio fuente (solo lectura): este template
│   ├── PROMPTS/            # este prompt de entrada
│   └── SDD/
│       ├── Devs/           # Rules, Intake (plantillas), Orchestrator, Guides, References, Bootstrap
│       └── Guides/         # Guía de usuario
└── <RUTA-DESTINO>/         # repositorio del producto (los artefactos se escriben acá)
    └── SDD/
        ├── Intake/         # PRODUCT-INTAKE-<Slug-Producto>.md (humano)
        │                   # PRODUCT-MANIFEST-<Slug-Producto>.md (derivado por el orquestador)
        ├── Docs/           # documentación generada (salida del orquestador)
        └── README.md
```

Convención de rutas de todos los prompts y reglas:

- Insumos de solo lectura (reglas, plantillas, prompts, guías) → `<RUTA-FUENTE>/SDD/Devs/...` y `<RUTA-FUENTE>/SDD/Guides/...`.
- Artefactos del producto → `SDD/Intake/...` y `SDD/Docs/...`, relativos a `<RUTA-DESTINO>`.

Donde el master-prompt o las reglas escriban `../IA.SDD/`, léase `<RUTA-FUENTE>/`. La forma `../IA.SDD/` es el caso particular en que fuente y destino son hermanas; no es un requisito.

Esta separación mantiene las reglas, plantillas y prompts maestros fuera del repositorio destino, de modo que las mejoras al template se propaguen a productos nuevos sin re-copiarlo, y deja los artefactos generados del lado del repositorio destino.

---

## 2 · Prerrequisitos verificables

Antes de delegar en el orquestador, verificá:

1. El repositorio fuente `IA.SDD` está clonado y accesible en la `<RUTA-FUENTE>` derivada de la invocación. Verificable: `<RUTA-FUENTE>/SDD/Devs/Orchestrator/Master-Prompt.md` existe y es legible. La posición relativa respecto del destino es indistinta.
2. Existe `SDD/Intake/PRODUCT-INTAKE-<Slug-Producto>.md` en el repositorio destino, completo, con el checklist de §19 del intake íntegramente tildado.
3. Cada proyecto de código declarado en la §13 del intake tiene un `tipo_proyecto_codigo` que pertenece al conjunto cerrado D8 (`library`, `web-monolith`, `web-microservices`, `desktop-app`, `mobile-app-maui`, `rest-api`, `cli-tool`, `worker-service`).
4. La carpeta `SDD/Docs/` del destino está vacía o no existe. Si tiene contenido previo, el orquestador ejecuta la reconciliación normativa (`Master-Prompt.md` §2.1): compara la versión del framework con la que se generó ese árbol contra la vigente, te muestra qué documentos quedaron potencialmente invalidados y te deja elegir entre un plan de adecuación, regenerar desde cero o continuar bajo la versión anterior. No modifica nada hasta que elegís.

Si el intake no está listo, este prompt se detiene y pide completarlo. La generación del intake a partir del contexto del producto se hace antes, partiendo de la plantilla `<RUTA-FUENTE>/SDD/Devs/Intake/PRODUCT-INTAKE-template.md` (ver la guía de usuario `<RUTA-FUENTE>/SDD/Guides/Guia-Usuario-SDD.md`).

---

## 3 · Invocación del orquestador

Con los prerrequisitos cumplidos, delegá en el master-prompt:

```text
Leé <RUTA-FUENTE>/SDD/Devs/Orchestrator/Master-Prompt.md y ejecutá el orquestador SDD
sobre <RUTA-DESTINO>. Resolvé toda ruta `../IA.SDD/...` de las reglas contra
<RUTA-FUENTE>. Mi intake está en SDD/Intake/. El producto se llama [Nombre del producto].
```

A partir de ahí el orquestador toma el control y aplica el patrón plan-then-confirm descrito en el master-prompt:

1. Fase de validación de intake (previa a la Fase A): valida la completitud del `PRODUCT-INTAKE` con `<RUTA-FUENTE>/SDD/Devs/Rules/Intake-Rules.md`, emite una batería consolidada de preguntas si falta algo bloqueante, deriva el `PRODUCT-MANIFEST` desde la §13 y lo presenta para confirmación. El manifiesto derivado se escribe en `SDD/Intake/` del destino.
2. Detección de la jerarquía: nombres, flags de gating y orden topológico de los proyectos de código.
3. Generación por fases (A a H): categorías de nivel producto (00, 01), categorías por proyecto de código (02 a 11) en orden topológico, y consolidación de producto, cada fase cerrada con un audit independiente. La salida se escribe en `SDD/Docs/` del destino.
4. Handoff a codificación: al terminar, el orquestador se detiene y espera confirmación explícita antes de generar código.

Toda la mecánica (despacho de subagentes, criterios de aceptación, manejo de ambigüedad, auditoría entre fases, adaptabilidad por `tipo_proyecto_codigo`) vive en el master-prompt y en los archivos de reglas de `<RUTA-FUENTE>/SDD/Devs/Rules/`. Este prompt no la duplica: solo la pone en marcha.

---

## 4 · Control de cambios

| Versión | Fecha | Cambios | Autor |
| --- | --- | --- | --- |
| 2.0 | 2026-07-17 | Reescritura como prompt de entrada del modelo de dos repositorios. Reemplaza el contenido anterior (meta-prompt de bootstrap SDD 1.0 → 2.0, hoy histórico y conservado en `../IA.SDD/SDD/Devs/Bootstrap/`). Fija el modelo fuente/destino, los prerrequisitos verificables y la invocación que delega en `Master-Prompt.md`. | Refactorización SDD |
| 2.1 | 2026-07-20 | La ubicación del repositorio fuente deja de asumirse hermana del destino: `<RUTA-FUENTE>` se deriva del path de la invocación y `<RUTA-DESTINO>` de «en el repositorio:». §1 introduce ambos placeholders y declara `../IA.SDD/` como alias de `<RUTA-FUENTE>/` (cubre las ocurrencias del master-prompt y las reglas sin editarlas); §2 prerrequisito 1 pasa de «clonado como hermano» a «accesible en `<RUTA-FUENTE>`», verificable; §3 invoca al orquestador con las rutas derivadas. Habilita workspaces donde fuente y destino no son hermanas (p. ej. `IA/IA.SDD` y `DEV/<solucion>`). | Refactorización SDD |
| 2.2 | 2026-07-26 | Preservación de la autosuficiencia del repositorio: el árbol de §1 nombra la carpeta de prompts de entrada como `PROMPTS/`, que es su nombre real en el repositorio fuente. | Reformulación SDD |
| 2.3 | 2026-07-29 | Vocabulario normativo (framework 5.0), registrado en la 5.1. El prompt de entrada pasa a nombrar el nivel superior como **producto** y la unidad de compilación como **proyecto de código**, según `Vocabulario-Rules.md` §2: `SOLUTION-INTAKE` → `PRODUCT-INTAKE`, `SOLUTION-MANIFEST` → `PRODUCT-MANIFEST`, `Nombre-Solucion` → `Slug-Producto` y `project_type` → `tipo_proyecto_codigo` en los prerrequisitos, el árbol de §1, el bloque de invocación y el resumen de lo que hace el orquestador. La fila se registra en la 5.1 porque la migración modificó el archivo sin dejar registro, contra `SDD-Development-Guide.md` §VI.1. | Reformulación SDD |
