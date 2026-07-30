# PRODUCT-MANIFEST-template

**Versión de la plantilla:** 3.1

Este campo versiona la **referencia de formato**. El campo `| Versión |` del bloque de producto de §1 pertenece al manifiesto que el orquestador deriva, y arranca en 1.0 en cada producto nuevo.

Referencia de formato del artefacto `PRODUCT-MANIFEST-<Slug-Producto>.md`. El manifiesto declara la jerarquía de proyectos de código de un producto: enumera los proyectos de código, su tipo D8, su rol, sus dependencias y sus nombres de código. Es la fuente única de verdad de la enumeración de proyectos de código para el resto del orquestador.

A partir de SDD con intake unificado, el manifiesto NO lo completa el usuario a mano: es un artefacto derivado. El usuario completa un único documento, `PRODUCT-INTAKE-<Slug-Producto>.md`, y de su §13 (Proyectos de código del producto) el orquestador construye este manifiesto durante la Fase de validación de intake, siguiendo las reglas de derivación de `Intake-Rules.md` §4, y lo presenta para confirmación humana. Este archivo describe el formato del artefacto generado; no es una plantilla a llenar.

## Guía de uso de esta referencia

1. El orquestador genera `PRODUCT-MANIFEST-<Slug-Producto>.md` en `SDD/Intake/` del repositorio destino a partir de `PRODUCT-INTAKE` §13, con la convención de nombres declarada en el perfil del intake.
2. Compone el bloque de producto y la tabla de proyectos de código según el esquema de §1 y §2 de esta referencia.
3. Aplica las validaciones de §4 (tipos D8, proyecto de código principal único, sin colisión de nombres, dependencias resueltas, grafo acíclico). Si alguna falla, no deriva el manifiesto y lo reporta en la batería de validación de intake.
4. Presenta el manifiesto derivado al humano y espera confirmación explícita antes de tratarlo como canónico.
5. Toda regeneración posterior sigue el flujo de no-modificación de `Master-Prompt.md` §13.

Un producto de un solo proyecto de código es válido y es el caso degenerado: el manifiesto derivado tiene una sola fila y el orquestador aplana el layout, reproduciendo el comportamiento del template de tipo único.

---

## §1 Bloque de producto

Bloque obligatorio al inicio del documento. Reproducir y completar los placeholders:

Los cuatro primeros campos son los cuatro planos de identidad de [`Vocabulario-Rules.md`](../Rules/Vocabulario-Rules.md) §3. Solo `Slug-Producto` se deriva; los otros tres se toman del intake.

| Campo | Plano | Valor |
|---|---|---|
| `Nombre-Producto` | negocio | [Nombre del producto en prosa, del intake] |
| `Slug-Producto` | documentación | [derivado de `Nombre-Producto`, Título-Con-Guiones] |
| `Raiz-Codigo` | código | [declarado en el perfil del intake; admite separadores de segmento] |
| `Artefacto-Agrupacion` | código | [`Raiz-Codigo` más la extensión del ecosistema] |
| Proyecto de código principal | — | [`Nombre-Proyecto-Codigo` del proyecto de código cabeza] |
| Intake (origen) | `PRODUCT-INTAKE-<Slug-Producto>.md` (de su §13 se deriva este manifiesto) |
| Documento | `PRODUCT-MANIFEST-<Slug-Producto>.md` |
| Versión | 1.0 |
| Fecha | [YYYY-MM-DD] |
| Estado | Borrador / En revisión / Aprobado |

### §1.1 Procedencia del framework

Bloque obligatorio. Declara bajo qué normativa se generó esta documentación. El orquestador lo completa al derivar el manifiesto, leyendo el campo `Versión` de la cabecera de cada archivo que efectivamente usa; no agrega ninguna lectura, porque ya abre cada archivo de reglas para construir sus despachos.

| Artefacto del framework | Versión |
|---|---|
| Framework SDD (conjunto) | [entrada vigente del `CHANGELOG.md` del framework] |
| `Master-Prompt` | [versión de su cabecera] |
| `Root-Rules` | [versión de su cabecera] |
| `Rules-<Categoria>` | [una fila por cada regla de categoría efectivamente aplicada] |
| Reglas transversales aplicadas | [`Intake-Rules`, y `Maqueta-Rules` y `Deriva-Rules` si se ejecutó la Fase B2] |

**Para qué sirve.** Un árbol de `SDD/Docs/` generado hoy va a sobrevivir a varias versiones del framework. Sin este bloque no hay forma de saber contra qué reglas se produjo, y por lo tanto tampoco de saber qué documentos quedaron invalidados cuando una regla sube major, que es lo que el propio framework declara que ocurre. Con el bloque, y con el conjunto normativo de esa versión conservado en `_legacy/` del framework, se puede reconstruir la normativa exacta y planificar la actualización.

**Cuándo se actualiza.** Solo cuando el árbol se regenera bajo una versión distinta. Una corrección dentro de la misma versión del framework no lo toca: seguiría siendo cierto.

#### Decisiones de reconciliación

Tabla opcional, vacía mientras no haya habido ninguna. El orquestador agrega una fila cada vez que la reconciliación normativa de `Master-Prompt.md` §2.1 se resuelve con la salida **C**, es decir cuando el usuario decide continuar bajo la versión de origen teniendo una versión más nueva disponible.

| Fecha | Versión evaluada | Decisión | Motivo declarado |
|---|---|---|---|
| [YYYY-MM-DD] | [versión vigente del framework en ese momento] | Continuar bajo [versión de origen] | [lo que dijo el usuario] |

**Por qué se registra.** Sin este registro, el arranque siguiente vuelve a presentar la misma comparación y el usuario vuelve a contestarla, sin memoria de haberlo hecho. Con el registro, el orquestador informa la postergación en una línea y solo vuelve a preguntar si el framework avanzó más allá de la versión ya evaluada.

Las salidas **A** y **B** no dejan fila acá: la A emite su propio informe en `SDD/Docs/Audit/` y la B reescribe el bloque de procedencia con la versión nueva, que es registro suficiente de lo que pasó.

### §1.2 Perfil de convención de nombres

Configuración que el orquestador aplica de forma reproducible para derivar los nombres de código de cada proyecto de código. Declarar una vez por producto:

| Parámetro | Valor por defecto | Notas |
|---|---|---|
| `Raiz-Codigo` | — | Declarado en el intake. Admite separadores de segmento |
| Separador de segmentos | `.` | Separa la raíz de código del sufijo de rol, y los segmentos internos de la raíz |
| Prefijo de paquetes redistribuibles | `Aplicada` | Reemplaza la raíz de código cuando `redistribuible: true` |
| Extensión del agrupador | la del ecosistema | Con `Raiz-Codigo` compone `Artefacto-Agrupacion` |

---

## §2 Tabla de proyectos de código

Una fila por proyecto de código. Todos los campos son obligatorios salvo Dependencias, que puede quedar vacío para proyectos de código sin dependencias.

| `Nombre-Proyecto-Codigo` | `Identidad-Codigo` | `tipo_proyecto_codigo` (D8) | Rol en el producto | `redistribuible` | Dependencias | Path `/src` |
|---|---|---|---|---|---|---|
| [Nombre-Proyecto-Codigo] | [`<Raiz-Codigo>.<Sufijo>`] | [uno de los 8 D8] | [una frase] | [true / false] | [lista de Nombre-Proyecto-Codigo o vacío] | [`src/<NombreProyectoCodigo>/`] |

Valores cerrados de `tipo_proyecto_codigo` (D8), exactamente 8:

```text
library, web-monolith, web-microservices, desktop-app, mobile-app-maui, rest-api, cli-tool, worker-service
```

### §2.1 Regla de nombres de código

1. El nombre de código de cada proyecto de código se forma como `<Raiz-Codigo>.<Sufijo>`, donde `<Sufijo>` identifica el rol del proyecto de código.
2. Si `redistribuible: true`, el nombre arranca con el prefijo de organización del perfil (`Aplicada` por defecto) en lugar de la raíz de código, porque un paquete reusable necesita un espacio de nombres estable e independiente del producto que lo consume. Por ejemplo, bajo la raíz de código `Contoso.Turnos`, un paquete de validaciones reusable se llama `Aplicada.Validaciones`, no `Contoso.Turnos.Validaciones`.
3. El `<Sufijo>` se orienta por el `tipo_proyecto_codigo` y el rol. Mapa orientativo, no cerrado:

| `tipo_proyecto_codigo` | Sufijo orientativo |
|---|---|
| `rest-api` | `.WebApi` o `.Api` |
| `web-monolith` | `.Web` |
| `worker-service` | `.Worker` |
| `cli-tool` | `.Cli` |
| `desktop-app` | `.Ui` o `.Desktop` |
| `mobile-app-maui` | `.Mobile` |
| `library` | `.Core`, `.Abstractions`, `.Domain`, `.Infrastructure` u otro rol |
| `web-microservices` | un proyecto de código por servicio bajo `<Raiz-Codigo>.Services.<Servicio>` más `.Gateway` y `.BuildingBlocks` |

La regla se expresa de forma agnóstica de stack a propósito. El perfil de convención de §1.2 es donde un producto concreto materializa la convención de su ecosistema.

### §2.2 Derivación de nombres (a cargo del orquestador)

- `Slug-Producto` y cada `Nombre-Proyecto-Codigo` se derivan con el algoritmo de normalización del `Master-Prompt.md` §3: acentos y eñes a su equivalente ASCII, capitalización de la inicial de cada palabra (Título-Con-Guiones), unión de palabras con guion medio, colapso de guiones y recorte de guiones extremos.
- `Raiz-Codigo` se obtiene en PascalCase del nombre legible.
- `Identidad-Codigo` se compone por la regla de §2.1.

---

## §3 Grafo de dependencias

Las dependencias declaradas en la tabla de §2 forman un grafo dirigido. El orquestador deriva de él el orden topológico de generación y de construcción: primero los proyectos de código sin dependencias, luego los que dependen solo de proyectos de código ya resueltos. Los proyectos de código del mismo nivel topológico pueden generarse en paralelo.

Representar el grafo como referencia visual (opcional pero recomendado):

```text
[proyecto-sin-deps]  ->  [proyecto-que-depende]  ->  [proyecto-principal]
```

---

## §4 Validaciones bloqueantes

El orquestador detiene la cadena y reporta si alguna de estas condiciones no se cumple:

- Algún `tipo_proyecto_codigo` no pertenece al conjunto cerrado D8.
- No hay exactamente un proyecto de código principal (hay cero o más de uno).
- Dos proyectos de código colisionan en `Nombre-Proyecto-Codigo` o en `Identidad-Codigo`.
- Una dependencia apunta a un proyecto de código que no existe en la tabla.
- El grafo de dependencias contiene un ciclo.
- El `PRODUCT-INTAKE` §13 (origen del manifiesto) no puede recorrerse para derivar la tabla: filas de ejemplo sin reemplazar, perfil de convención ausente o campos bloqueantes vacíos.

---

## §5 Ejemplo aplicado (producto multi-proyecto)

Bloque de producto:

**Este ejemplo usa una raíz de código de dos segmentos a propósito.** Es la forma normal en .NET, Java y Python, y la formulación anterior del framework no podía expresarla: derivaba la raíz del nombre de negocio concatenando sin separadores, con lo que la única manera de declarar `Contoso.Turnos` era escribirlo en el campo de negocio, contaminándolo. Los cuatro planos van separados y ninguno se parece a otro.

| Campo | Plano | Valor |
|---|---|---|
| `Nombre-Producto` | negocio | Gestión de Turnos |
| `Slug-Producto` | documentación | `Gestion-De-Turnos` |
| `Raiz-Codigo` | código | `Contoso.Turnos` |
| `Artefacto-Agrupacion` | código | `Contoso.Turnos.sln` |
| Proyecto de código principal | — | `Gestion-De-Turnos-API` |
| Intake (origen) | — | `PRODUCT-INTAKE-Gestion-De-Turnos.md` |

Perfil de convención: separador `.`; prefijo de redistribuibles `Aplicada`; extensión del agrupador `.sln`.

Tabla de proyectos de código:

| `Nombre-Proyecto-Codigo` | `Identidad-Codigo` | `tipo_proyecto_codigo` | Rol | `redistribuible` | Dependencias | Path `/src` |
|---|---|---|---|---|---|---|
| `Gestion-De-Turnos-API` | `Contoso.Turnos.WebApi` | `rest-api` | API pública de turnos (principal) | false | `Gestion-De-Turnos-Domain`, `Aplicada-Validaciones` | `src/Contoso.Turnos.WebApi/` |
| `Gestion-De-Turnos-Domain` | `Contoso.Turnos.Domain` | `library` | Dominio y reglas de negocio compartidas | false | `Aplicada-Validaciones` | `src/Contoso.Turnos.Domain/` |
| `Gestion-De-Turnos-Notificaciones` | `Contoso.Turnos.Worker` | `worker-service` | Envío asincrónico de recordatorios | false | `Gestion-De-Turnos-Domain` | `src/Contoso.Turnos.Worker/` |
| `Aplicada-Validaciones` | `Aplicada.Validaciones` | `library` | Paquete reusable de validaciones | true | — | `src/Aplicada.Validaciones/` |

Grafo de dependencias:

```text
Aplicada-Validaciones  ->  Gestion-De-Turnos-Domain  ->  Gestion-De-Turnos-API
                       \                              \-> Gestion-De-Turnos-Notificaciones
                        \-> Gestion-De-Turnos-API
```

Orden topológico:

```text
nivel 0: Aplicada-Validaciones
nivel 1: Gestion-De-Turnos-Domain
nivel 2: Gestion-De-Turnos-API, Gestion-De-Turnos-Notificaciones   (paralelizables)
```

---

## §6 Caso degenerado (producto de un proyecto de código)

Un producto con un único proyecto de código reproduce el comportamiento del template de tipo único.

Bloque de producto:

| Campo | Valor |
|---|---|
| Nombre de producto | Parser CSV |
| `Slug-Producto` | `Parser-Csv` |
| `Raiz-Codigo` | `ParserCsv` |
| Proyecto de código principal | `Parser-Csv` |
| Intake (origen) | `PRODUCT-INTAKE-Parser-Csv.md` |

Tabla de proyectos de código:

| `Nombre-Proyecto-Codigo` | `Identidad-Codigo` | `tipo_proyecto_codigo` | Rol | `redistribuible` | Dependencias | Path `/src` |
|---|---|---|---|---|---|---|
| `Parser-Csv` | `ParserCsv.Core` | `library` | Librería de parseo (única y principal) | false | — | `src/ParserCsv.Core/` |

El orquestador recorre un solo proyecto de código; el resultado equivale a la ejecución actual del template contra un único `tipo_proyecto_codigo`.

---

## §7 Checklist de validación del manifiesto derivado

El orquestador verifica estos ítems al derivar el manifiesto desde `PRODUCT-INTAKE` §13, antes de presentarlo para confirmación. Todos deben cumplirse; si alguno falla, no deriva el manifiesto y lo reporta en la batería de validación de intake.

- [ ] El bloque de producto tiene nombre, `Slug-Producto`, `Raiz-Codigo`, proyecto de código principal y referencias de intake completos.
- [ ] El perfil de convención de nombres está declarado (forma PascalCase, separador, prefijo de redistribuibles).
- [ ] La tabla de proyectos de código tiene al menos una fila y todos los campos obligatorios completos.
- [ ] Cada `tipo_proyecto_codigo` pertenece al conjunto cerrado D8 de 8 valores.
- [ ] Hay exactamente un proyecto de código principal.
- [ ] No hay colisiones de `Nombre-Proyecto-Codigo` ni de `Identidad-Codigo`.
- [ ] Cada dependencia referencia un proyecto de código existente en la tabla.
- [ ] El grafo de dependencias es acíclico.
- [ ] Cada proyecto de código marcado `redistribuible: true` arranca su nombre de código con el prefijo de organización del perfil.
- [ ] El control de cambios refleja la versión y fecha del documento.

---

## Control de cambios

| Versión | Fecha | Cambios | Autor |
|---|---|---|---|
| 1.0 | [YYYY-MM-DD] | Manifiesto inicial del producto | [Autor] |
| 2.0 | 2026-06-10 | Reconversión a referencia de formato del artefacto derivado (unificación de intake). El manifiesto deja de completarse a mano: el orquestador lo deriva de `SOLUTION-INTAKE` §13 según `rules/Intake-Rules.md` §4 y lo presenta para confirmación. Se actualizan el intro, la guía de uso y el checklist; el esquema (bloque de solución, tabla de proyectos, validaciones) se conserva como formato de referencia. | Reformulación SDD |
| 2.1 | 2026-07-29 | La referencia de formato declara su propia versión en cabecera, que no tenía: era el único artefacto de `Intake/` sin campo `Versión` legible, aplicación incompleta de D4 y D6 equivalente a la que la plantilla de intake corrigió en su 1.3. Se normalizan los ejemplos de `Slug-Producto` y `Nombre-Proyecto-Codigo` a Título-Con-Guiones, con lo que el valor declarado y el nombre de archivo del intake citado dejan de contradecirse. Se corrigen dos rutas `rules/Intake-Rules.md` por su nombre lógico. | Revisión SDD |
| 3.0 | 2026-07-29 | Renombre de vocabulario normativo (framework 5.0). El nivel superior pasa de «solución» a **producto** y la unidad de compilación de «proyecto» a **proyecto de código**; los cuatro planos de identidad se separan en `Nombre-Producto`, `Slug-Producto`, `Raiz-Codigo` y `Artefacto-Agrupacion`. | Reformulación SDD |
| 3.1 | 2026-07-29 | Restitución de la fila histórica del control de cambios que la migración de la 5.0 había reescrito con el vocabulario nuevo, contra `SDD-Development-Guide.md` §VI.2: una fila ya escrita no se reescribe aunque un cambio posterior invalide lo que describe, porque corregirla hace que el registro mienta. La fila nueva declara el renombre; la vieja sigue nombrando lo que nombraba. | Revisión SDD |
