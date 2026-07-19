# Plantilla — Reglas de diseño de un modelo UX-UI

**Proyecto:** Template SDD
**Documento:** Rules-Design-Modelo-Template.md
**Versión:** 1.0
**Estado:** Vigente
**Fecha:** 2026-07-19
**Autor:** AG-ROOT (Arquitecto de Soluciones)

---

## Cómo se usa esta plantilla

La completa el subagente AG-03M en el paso 7 de la Fase B2 (`Rules/Maqueta-Rules.md` §3.7), cuando el humano acepta capitalizar el diseño de una maqueta aprobada. El resultado se escribe como `Rules-Design-<Nombre-Modelo>-v1.0.md` en este mismo directorio y se registra en `Index-Modelos-UX-UI.md` §2.

Tres reglas de redacción que gobiernan todo el documento:

1. Se escriben reglas, no descripciones. El criterio de inclusión de una regla es que su ausencia haría que un diseño posterior salga distinto de forma perceptible. Si una observación no cambia lo que otro agente produciría, no se incluye.
2. Se escribe en modo imperativo y agnóstico del dominio. Nada de nombres de clientes, entidades, campos, sistemas ni assets del proyecto de origen. Si una regla no se puede formular sin el dominio, no se captura.
3. Cada sección declara explícitamente `No aplica` cuando el modelo no tiene nada que decir sobre ese eje. Una sección vacía sin marcar se lee como omisión.

Los bloques `<...>` son placeholders a reemplazar. Los bloques rotulados como orientación se borran del documento final.

---

# Reglas de diseño — Modelo `<Nombre-Modelo>`

**Proyecto:** {{nombre-solucion}}
**Documento:** Rules-Design-`<Nombre-Modelo>`-v1.0.md
**Versión:** 1.0
**Estado:** Vigente
**Fecha:** `<YYYY-MM-DD>`
**Autor:** {{equipo-o-rol}} (AG-03M)
**Ámbito:** Modelo UX-UI capturado de maqueta aprobada
**Hereda de:** `References/Design/Design-Rules-Web-Generico-v1.0.md`
**Posición:** Insumo normativo opcional de la Fase B2 y de la categoría 03. Se aplica por encima del catálogo base, nunca lo reemplaza.

---

## 0. Identidad del modelo

| Campo | Valor |
| --- | --- |
| Qué resuelve, en una línea | `<el problema de experiencia que este modelo resuelve bien>` |
| `project_type` de origen | `<uno de los ocho valores D8>` |
| Variante de 03 | UX/UI o DX |
| Extensiones por capacidad que asumía el original | `<lista de References/Design/ o ninguna>` |
| Cuándo conviene elegirlo | `<condiciones del proyecto en que este modelo aplica bien>` |
| Cuándo NO conviene | `<condiciones en que este modelo estorba>` |
| Template ejecutable | `Templates/<Nombre-Modelo>/` |

La fila "Cuándo NO conviene" es obligatoria y no admite quedar vacía. Un modelo sin límites declarados se aplica donde no corresponde.

---

## 1. Composición y layout

Reglas sobre el reparto del espacio.

- `<regla de chrome fijo, ancho máximo, densidad, grilla de referencia>`
- `<regla de jerarquía espacial entre zonas>`
- `<regla de comportamiento responsive del layout, si aplica>`

Esqueleto de referencia del layout, en ASCII, sin colores ni valores de CSS.

---

## 2. Presentación de datos

Reglas sobre cómo se muestran los conjuntos y los registros individuales.

| Situación | Presentación | Criterio |
| --- | --- | --- |
| `<conjunto pequeño / grande / con jerarquía>` | `<tabla / tarjetas / lista / árbol>` | `<por qué>` |

- Regla de paginación, orden y filtrado: `<...>`
- Regla del campo vacío o nulo: `<qué se muestra cuando no hay dato>`
- Regla de truncado y de contenido largo: `<...>`
- Regla de formato por tipo de dato (fecha, número, identificador, estado): `<...>`

La regla de formato es parte del contrato de datos del sensado de deriva: una fecha aprobada en un formato y construida en otro es deriva (`Rules/Deriva-Rules.md` §3).

---

## 3. Jerarquía y tipografía

- `<escala tipográfica del modelo y qué distingue cada nivel>`
- `<regla de distinción entre acción primaria, secundaria y destructiva>`
- `<regla de peso y tamaño para títulos, contenido y metadatos>`

---

## 4. Color y acentos

- `<qué codifica el color en este modelo>`
- `<hay acento por módulo o por dominio funcional; con qué criterio>`
- `<qué queda deliberadamente neutro>`

Los valores concretos se heredan de los tokens del catálogo base. Acá se declara el uso semántico, no la paleta.

---

## 5. Recursos visuales

- `<criterio de iconografía: cuándo hay ícono y cuándo no>`
- `<criterio de ilustración y de estado vacío>`
- `<criterio de uso del espacio en blanco>`

Iconografía siempre SVG con `currentColor`, heredado del catálogo base. Acá se declara cuándo se usa, no cómo se implementa.

---

## 6. Efectos y movimiento

| Transición | Duración | A qué comprensión sirve |
| --- | --- | --- |
| `<...>` | `<...>` | `<...>` |

Si el modelo no define movimiento propio, declarar `No aplica; rige el catálogo base`.

---

## 7. Elementos de UX

Cómo resuelve este modelo cada situación recurrente.

| Situación | Resolución del modelo |
| --- | --- |
| Confirmación de una acción con consecuencias | `<...>` |
| Deshacer | `<...>` |
| Previsualización antes de aplicar | `<...>` |
| Ayuda contextual | `<...>` |
| Estado vacío | `<...>` |
| Error recuperable | `<...>` |
| Operación larga | `<...>` |
| Búsqueda | `<...>` |

---

## 8. Navegación

- Modelo de navegación: `<jerárquico / por pestañas / por asistente / mixto>`
- Regla de retorno: `<cómo se vuelve y qué se preserva al volver>`
- Regla de profundidad máxima: `<...>`
- Regla de orientación: `<cómo sabe el usuario dónde está>`

---

## 9. Formas constructivas del HTML

- Estructura semántica que se repite en toda superficie: `<...>`
- Componentes del framework que el modelo usa: `<...>`
- Componentes del framework que el modelo evita deliberadamente, y por qué: `<...>`
- Reglas de landmarks y de encabezados: `<...>`

---

## 10. Formas constructivas del CSS

- Convención de nombres de clase: `<...>`
- Qué se resuelve con tokens y qué con utilidades del framework: `<...>`
- Organización de los archivos de estilo: `<...>`
- Qué está prohibido: `<literales visuales sueltos, estilos en línea, etcétera>`

---

## 11. Accesibilidad del modelo

Decisiones del modelo que sostienen la accesibilidad y no se pueden alterar al reusarlo.

- `<...>`

Piso obligatorio heredado del catálogo base: WCAG 2.2 nivel AA.

---

## 12. Criterios de aceptación del modelo

Lista verificable de qué tiene que cumplir un diseño para poder decir que aplica este modelo.

- [ ] `<...>`
- [ ] `<...>`

---

## 13. Anti-patrones propios del modelo

| Anti-patrón | Problema | Solución |
| --- | --- | --- |
| `<...>` | `<...>` | `<...>` |

---

## 14. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Catálogo base del que hereda | `Design-Rules-Web-Generico-v1.0.md` |
| Extensiones por capacidad asumidas | `<lista o N/A>` |
| Template ejecutable | `Templates/<Nombre-Modelo>/` |
| Fase que lo capturó | Fase B2 del proyecto de origen |
| Verificación de ofuscación | `<fecha y resultado, según Maqueta-Rules.md §6.5>` |

---

## 15. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | `<YYYY-MM-DD>` | Captura inicial del modelo a partir de una maqueta aprobada en Fase B2. |
