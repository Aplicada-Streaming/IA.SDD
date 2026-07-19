# Índice — Catálogo de reglas de diseño

**Proyecto:** Template SDD
**Documento:** Index-Design-Rules.md
**Versión:** 1.3
**Estado:** Vigente
**Fecha:** 2026-07-19
**Autor:** AG-ROOT (Arquitecto de Soluciones)

---

## 1. Propósito

`devs/References/Design/` es un subárbol metodológico del plano `devs/`, no un artefacto operativo del plano `docs/`. Reúne el catálogo de reglas de diseño que la categoría 03 (UX/UI/DX) consume como insumo normativo: tokens, patrones de componente, estados, feedback, iconografía vectorial, accesibilidad, responsive y movimiento.

El catálogo sigue un modelo base→especialización. Hay un documento base de diseño web genérico, agnóstico de framework, y dos tipos de documentos derivados del base:

- Especializaciones por stack: heredan del base y mapean cada token y cada patrón a su tecnología concreta. No redefinen principios ni inventan patrones: solo materializan el catálogo base en su stack y, cuando una limitación técnica lo impone, documentan la desviación con su justificación.
- Extensiones por capacidad transversal: heredan del base y codifican una capacidad de UX que aplica a cualquier stack cuando el proyecto la necesita (la primera es la configuración dirigida por esquema). Las especializaciones por stack luego mapean esos patrones a su tecnología.

Este subárbol vive en `devs/` porque es material metodológico estable, no salida generada por proyecto. No se ubica en `docs/`, que es exclusivamente la salida del orquestador.

Este índice es el punto de entrada del catálogo: el subagente AG-03 lo carga primero y desde acá resuelve qué documento o documentos aplicar.

## 2. Catálogo de reglas de diseño

Documento base y especializaciones por stack:

| Documento | Ámbito | Hereda de | `project_type` / stack al que aplica | Estado |
| --- | --- | --- | --- | --- |
| `Design-Rules-Web-Generico-v1.0.md` | Web genérico | — (base) | web-monolith, web-microservices (con frontend) | Vigente |
| `Design-Rules-Blazor-Mudblazor-v1.0.md` | Web Blazor Interactive Server + MudBlazor | web-genérico | proyectos web con stack Blazor + MudBlazor | Vigente |

Extensiones por capacidad transversal:

| Documento | Ámbito | Hereda de | Aplica a | Estado |
| --- | --- | --- | --- | --- |
| `Design-Rules-Config-Esquema-v1.0.md` | Capacidad transversal — configuración dirigida por esquema | web-genérico | cualquier proyecto con superficies de configuración | Vigente |
| `Design-Rules-Primer-Arranque-v1.0.md` | Capacidad transversal — primer arranque y aprovisionamiento inicial | web-genérico | cualquier proyecto que se despliegue por instancia y arranque vacío | Vigente |
| `Design-Rules-Acceso-Monousuario-v1.0.md` | Capacidad transversal — acceso de operador único | web-genérico | cualquier proyecto con una sola identidad de operación | Vigente |
| `Design-Rules-Identidad-De-Version-v1.0.md` | Capacidad transversal — identidad de versión y su superficie | web-genérico | cualquier proyecto que produzca artefactos desplegables identificables | Vigente |

Las tres últimas se incorporaron a partir de la extracción de características de un panel de control monolítico en producción, y son las que gobiernan el perfil completo de ese arquetipo: una instancia propia que arranca vacía, la aprovisiona su único operador y se identifica por la versión que corre. Aplican de forma independiente, pero se refuerzan entre sí: primer arranque y acceso monousuario comparten el shell partido, y la superficie de acceso es una de las dos ubicaciones obligatorias del sello de versión.

## 3. Documentos previstos (roadmap)

Huecos esperados del catálogo. Cada especialización futura hereda del documento base web genérico y aplica a su `project_type` o stack. Aún no existen como archivo; se listan para fijar la convención de nombre y el lugar que ocuparán.

| Documento previsto | Ámbito | Hereda de | `project_type` / stack al que aplicará |
| --- | --- | --- | --- |
| `Design-Rules-HTML-v1.0.md` | Web con HTML/CSS puro | web-genérico | web-monolith / web-microservices con frontend sin framework de componentes |
| `Design-Rules-Mobile-MAUI-v1.0.md` | Mobile nativo | web-genérico | mobile-app-maui |
| `Design-Rules-Blazor-MAUI-v1.0.md` | Blazor embebido en MAUI | web-genérico | mobile-app-maui / desktop-app con UI Blazor Hybrid |

Sobre las extensiones por capacidad: el documento `Design-Rules-Config-Esquema` reserva hoy una ranura de UI para el asistente de IA en estado deshabilitado; una v1.1 futura de ese documento realizará el panel del asistente que hoy queda como hueco forward-compatible.

## 4. Cómo se selecciona el documento

El subagente AG-03 elige la especialización según el stack declarado en la Parte C del intake (bloque técnico del proyecto) y el `project_type` del proyecto en curso:

1. Aplica siempre el documento base `Design-Rules-Web-Generico-v1.0.md`.
2. Si existe una especialización para el stack declarado, la suma por encima del base (por ejemplo `Design-Rules-Blazor-Mudblazor-v1.0.md` cuando el stack es Blazor Interactive Server + MudBlazor).
3. Si no hay especialización para el stack declarado, rige únicamente el documento base.
4. Además del base y la especialización por stack, carga las extensiones por capacidad que correspondan. Las extensiones por capacidad son ortogonales a la especialización por stack y entre sí: pueden aplicar con cualquier stack y en cualquier combinación. El criterio de carga de cada una:

| Extensión | Se carga cuando |
| --- | --- |
| `Design-Rules-Config-Esquema-v1.0.md` | El proyecto declara superficies de configuración (Parte C del intake o casos de uso de 02 con configuración de parámetros). |
| `Design-Rules-Primer-Arranque-v1.0.md` | El proyecto se despliega por instancia y arranca sin la configuración mínima que lo hace utilizable (Parte C del intake o casos de uso de 02 de alta inicial, instalación o puesta en marcha). No aplica a productos multi-inquilino aprovisionados por el proveedor. |
| `Design-Rules-Acceso-Monousuario-v1.0.md` | El proyecto declara una sola identidad de operación, sin gestión de usuarios ni roles diferenciados. Si hay varias identidades, rige el patrón de acceso general del base y esta extensión no se carga. |
| `Design-Rules-Identidad-De-Version-v1.0.md` | El proyecto produce artefactos desplegables identificables. En proyectos sin UI final, la capacidad se materializa en la superficie DX correspondiente en vez de en una pantalla. |

El arquetipo de panel de control monolítico de un servicio específico carga las cuatro extensiones a la vez, además del base y de su especialización por stack.

Ante conflicto entre el base y una especialización, manda la regla base salvo limitación técnica explícita y justificada en el documento hijo.

## 4.1 Tercer eje: los modelos UX-UI capturados

Además de este catálogo, el template mantiene el catálogo de modelos UX-UI en `Devs/Modelos-UX-UI/`, con su propio índice `Index-Modelos-UX-UI.md`. Son modelos completos de diseño capturados de maquetas reales validadas y aprobadas por un humano en la Fase B2 de validación visual (`Rules/Maqueta-Rules.md`).

La diferencia con este catálogo es de origen y de obligatoriedad. Este catálogo es material metodológico diseñado, y su documento base es piso obligatorio. Los modelos UX-UI son experiencia extraída de la práctica, y son opcionales: el humano elige uno, o ninguno, en el paso 1 de la Fase B2.

Los tres ejes son ortogonales y se apilan en este orden:

1. Documento base de este catálogo. Siempre.
2. Especialización por stack de este catálogo, si existe para el stack declarado.
3. Extensiones por capacidad de este catálogo, las que correspondan según §4.
4. Modelo UX-UI de `Modelos-UX-UI/`, si el humano eligió uno.

Un modelo UX-UI nunca reemplaza al documento base. Ante conflicto entre un modelo y el base, manda el base, salvo que el modelo documente la desviación con su justificación, que es la misma regla que rige a las especializaciones por stack.

## 5. Control de cambios

| Versión | Fecha | Cambios | Autor |
| --- | --- | --- | --- |
| 1.0 | 2026-06-19 | Índice inicial del catálogo de reglas de diseño. Registra el documento base web genérico y la especialización Blazor + MudBlazor, el roadmap de especializaciones previstas (HTML, MAUI, Blazor en MAUI) y el criterio de selección por stack y `project_type`. | AG-ROOT |
| 1.1 | 2026-06-20 | Incorporación del eje de extensiones por capacidad transversal: §1 distingue especializaciones por stack de extensiones por capacidad; §2 registra `Design-Rules-Config-Esquema-v1.0.md` en una subtabla propia; §4 agrega el criterio de carga de la extensión cuando el proyecto tiene superficies de configuración; §3 nota el panel de asistente de IA previsto a futuro. | AG-ROOT |
| 1.2 | 2026-07-18 | Incorporación de tres extensiones por capacidad derivadas de la extracción de características de un panel de control monolítico en producción: §2 registra `Design-Rules-Primer-Arranque-v1.0.md`, `Design-Rules-Acceso-Monousuario-v1.0.md` y `Design-Rules-Identidad-De-Version-v1.0.md` con la nota del arquetipo que las agrupa; §4 reemplaza el criterio de carga en prosa por una tabla con la condición de carga de cada extensión y declara su ortogonalidad mutua. | AG-ROOT |
| 1.3 | 2026-07-19 | Nueva §4.1: registro del catálogo de modelos UX-UI de `Devs/Modelos-UX-UI/` como tercer eje del sistema de diseño del template, con su diferencia de origen y obligatoriedad respecto de este catálogo, el orden de apilado de las cuatro capas y la regla de conflicto. Incorporado junto con la Fase B2 de validación visual de maqueta. | AG-ROOT |
