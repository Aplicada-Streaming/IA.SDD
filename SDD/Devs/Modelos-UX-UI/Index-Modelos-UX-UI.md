# Índice — Catálogo de modelos UX-UI

**Proyecto:** Template SDD
**Documento:** Index-Modelos-UX-UI.md
**Versión:** 1.0
**Estado:** Vigente
**Fecha:** 2026-07-19
**Autor:** AG-ROOT (Arquitecto de Soluciones)

---

## 1. Propósito

`Devs/Modelos-UX-UI/` es el catálogo de experiencia acumulada en diseño UX-UI del template. Reúne los modelos de diseño que se capturaron a partir de maquetas reales validadas y aprobadas por un humano en la Fase B2, para que un agente pueda reproducir un diseño equivalente en un proyecto posterior sin haber visto el original.

Es un subárbol metodológico del plano `Devs/`, como `References/Design/`. No es salida generada por proyecto y no vive en `Docs/`.

Diferencia con `References/Design/`, que es la otra mitad del sistema de diseño del template:

| | `References/Design/` | `Modelos-UX-UI/` |
| --- | --- | --- |
| Qué contiene | El lenguaje de diseño normativo: tokens, patrones de componente, estados, accesibilidad | Modelos completos de diseño capturados de maquetas aprobadas |
| De dónde sale | Diseñado como material metodológico | Extraído de la práctica, al cerrar una Fase B2 |
| Cuándo se aplica | Siempre; es el piso obligatorio | Opcional; el humano elige uno en el paso 1 de la Fase B2 |
| Relación entre sí | Es la base | Se aplica por encima de la base, nunca la reemplaza |

Ante conflicto entre un modelo de este catálogo y el documento base de `References/Design/`, manda el base, salvo que el modelo documente la desviación con su justificación. Es la misma regla que rige a las especializaciones por stack.

---

## 2. Catálogo de modelos

| Modelo | Capturado de | `project_type` de origen | Qué resuelve | Estado |
| --- | --- | --- | --- | --- |
| — | — | — | El catálogo arranca vacío. El primer modelo se registra al cerrar la primera Fase B2 en la que el humano acepte capitalizar el diseño. | — |

Mientras el catálogo esté vacío, el paso 1 de la Fase B2 (`Maqueta-Rules.md` §3.1) ofrece únicamente la opción por defecto: el catálogo base de `References/Design/` con su especialización de stack y sus extensiones por capacidad.

---

## 3. Convención de nombres y estructura

- Documento de reglas de un modelo: `Rules-Design-<Nombre-Modelo>-v<X.Y>.md`, en este directorio.
- `<Nombre-Modelo>` va en Título-Con-Guiones, es agnóstico del dominio del proyecto de origen y describe qué resuelve el modelo, no de quién salió. `Panel-Operativo-Denso` es un nombre válido; `Panel-Cliente-Acme` no lo es.
- Cada modelo tiene su ejemplo ejecutable ofuscado en `Templates/<Nombre-Modelo>/` del repositorio fuente, con la misma raíz de nombre.
- El documento se redacta a partir de `Rules-Design-Modelo-Template.md` de este directorio.
- Versionado: una sola versión vigente por modelo. Las anteriores se archivan en `_legacy/<fecha>/` con estado `Superado`, según la política de deprecación del template (D5).

---

## 4. Cómo se registra un modelo nuevo

El registro ocurre en el paso 7 de la Fase B2 (`Maqueta-Rules.md` §3.7), solo con aceptación explícita del humano, y produce tres escrituras en la misma operación:

1. `Rules-Design-<Nombre-Modelo>-v1.0.md` en este directorio, con las reglas constructivas extraídas según `Maqueta-Rules.md` §5.
2. `Templates/<Nombre-Modelo>/` en la raíz del repositorio fuente, con el ejemplo ejecutable ofuscado según `Maqueta-Rules.md` §6.
3. Una fila nueva en la tabla del §2 de este índice.

Un modelo que no está en la tabla del §2 no existe para el orquestador: el paso 1 de la Fase B2 lee este índice y solo ofrece lo que encuentra acá.

Condición bloqueante de la escritura: `IA.SDD` es un repositorio público. Ningún modelo ni ningún template puede contener nombres de clientes, datos reales, assets del proyecto de origen ni decisiones que solo tengan sentido en su dominio. La verificación de ofuscación de `Maqueta-Rules.md` §6.5 es previa y bloqueante.

---

## 5. Cómo se selecciona un modelo

El subagente AG-03M no elige: ofrece y el humano decide. La secuencia está en `Maqueta-Rules.md` §3.1.

Criterios que el orquestador usa para ordenar las opciones que presenta:

1. Modelos capturados del mismo `project_type` que el proyecto en curso, primero.
2. Después, modelos capturados de un `project_type` con la misma variante de 03 (UX/UI o DX).
3. Al final, el resto, con la advertencia de que su origen es de otro tipo de proyecto.

La opción por defecto (catálogo base sin modelo) se presenta siempre y primero. Un modelo se aplica por encima del base, con las extensiones por capacidad que correspondan según `Index-Design-Rules.md` §4; las tres capas son ortogonales.

---

## 6. Control de cambios

| Versión | Fecha | Cambios | Autor |
| --- | --- | --- | --- |
| 1.0 | 2026-07-19 | Índice inicial del catálogo de modelos UX-UI, creado junto con la Fase B2 de validación visual de maqueta. Define el propósito del catálogo y su diferencia con `References/Design/`, la convención de nombres `Rules-Design-<Nombre-Modelo>-v<X.Y>.md` con su template ofuscado en `Templates/`, el procedimiento de registro con sus tres escrituras y su condición bloqueante de ofuscación, y el criterio de presentación de opciones en el paso 1 de la Fase B2. El catálogo arranca vacío. | AG-ROOT |
