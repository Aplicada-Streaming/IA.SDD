# Reglas de vocabulario normativo

**Archivo target:** todo artefacto del framework y toda documentación que el framework genera
**Lector:** el orquestador, todo subagente AG-XX, el auditor de cada fase y quien interviene el framework
**Versión de las reglas:** 2.0

---

## §1 Propósito y posición

Esta es una regla meta, como `Root-Rules.md` e `Intake-Rules.md`: no gobierna una de las doce categorías, gobierna una capacidad transversal. Fija **qué designa cada término del framework**, con un término por concepto y un concepto por término.

Existe porque el framework no tenía glosario propio. El único glosario disponible, el de `Marco-Teorico-SDD.md` §9, es un glosario de industria y define los dos términos centrales por su papel en la herramienta en lugar de por su frontera: *Proyecto* como «unidad de especialización del template» y *Solución* como «agrupación de una jerarquía de N proyectos». Un término definido por lo que la herramienta hace con él absorbe cualquier significado, y eso fue exactamente lo que ocurrió: la palabra «proyecto» llegó a designar cuatro cosas distintas dentro del mismo árbol generado.

La regla ordena el vocabulario en dos ejes que antes estaban mezclados en uno:

- El **eje de producto**, que responde qué se entrega y a quién. Es el eje del negocio y de las categorías que lo especifican.
- El **eje de código**, que responde cómo se compila y se agrupa lo que se entrega. Es el eje del ecosistema tecnológico.

Los dos ejes son independientes por diseño. Un mismo producto puede reorganizar su composición de código sin dejar de ser el mismo producto, y una misma solución de código puede pasar de servir a un producto a servir a dos.

---

## §2 Los seis términos

Cada término se define por su **frontera** —qué lo delimita, quién lo consume—, no por los artefactos que el framework le produce.

| Término | Qué designa | Qué lo delimita | Eje |
| --- | --- | --- | --- |
| **Producto** | Aquello que se entrega y que alguien usa para obtener valor. Es la unidad de trabajo del framework: un intake, un negocio, un repositorio destino, un árbol `SDD/Docs/` | Una frontera clara, stakeholders conocidos, usuarios o clientes definidos, un roadmap y un ciclo de vida propios. Dos conjuntos de capacidades con clientes, roadmaps y ciclos de vida desacoplados son **dos productos**, y llevan dos intakes | producto |
| **Unidad de entrega** | Cada pieza del producto que se despliega o se distribuye por separado y que un usuario, integrador u operador consume directamente | Poder desplegarse o publicarse de forma independiente. Un producto monolítico tiene una sola | producto |
| **Módulo** | Área funcional dentro de una unidad de entrega: un agrupamiento de capacidades con sentido para el usuario | Cohesión funcional percibida por quien usa el producto. **No es desplegable por separado** | producto |
| **Solución de código** | El artefacto del ecosistema que agrupa la construcción: el archivo de solución en .NET, el POM agregador en Maven, el *workspace* en Cargo o npm | El comando de construcción que la toma como entrada única | código |
| **Proyecto de código** | La unidad de compilación dentro de una solución de código: lo que el ecosistema llama *project*, *module*, *subproject* o *package* | Producir un artefacto de compilación propio y declarar sus propias dependencias | código |
| **Proyecto** | El emprendimiento: el esfuerzo temporal que se acomete para construir o evolucionar un producto | Tener principio, fin y alcance acordado. Es temporal por definición; el producto no lo es | proceso |

**Repositorio destino**, **repositorio fuente** y **repositorio de documentación** conservan el sentido que les fija el `README.md` del framework y no se redefinen acá.

---

## §3 Los cuatro planos de identidad

Un producto se nombra distinto en cada plano, y los cuatro nombres son **independientes**: ninguno se deriva de otro salvo donde esta tabla lo declara. Confundirlos fue lo que produjo bloques informativos con tres líneas que parecían la misma cosa escrita distinto.

| Plano | Campo | Forma | Quién lo consume | Ejemplo |
| --- | --- | --- | --- | --- |
| Negocio | `Nombre-Producto` | Prosa legible, con espacios, tildes y mayúsculas naturales | 00-Contexto, 01-Necesidades-Negocio, el README raíz, la comunicación con el cliente | `Gestión de Turnos` |
| Documentación | `Slug-Producto` | Título-Con-Guiones, ASCII sin acentos (D3) | Nombres de archivo y rutas del plano documental: `PRODUCT-INTAKE-<Slug-Producto>.md` | `Gestion-De-Turnos` |
| Código, raíz | `Raiz-Codigo` | La del ecosistema. **Admite separadores de segmento** | El archivo de solución, la raíz de los espacios de nombres, el prefijo de cada proyecto de código | `Contoso.Turnos` |
| Código, agrupador | `Artefacto-Agrupacion` | `<Raiz-Codigo>` más la extensión del ecosistema | El comando de construcción, la apertura del repositorio, los scripts | `Contoso.Turnos.sln` |

Reglas de derivación y de declaración:

1. `Slug-Producto` **se deriva** de `Nombre-Producto` con el algoritmo de normalización de `Master-Prompt.md` §3.2. Es el único derivado obligatorio.
2. `Raiz-Codigo` **se declara** en el perfil de convención del intake. Solo se deriva de `Nombre-Producto` cuando el intake no declara valor, y aun entonces admite separadores. La identidad de código es una decisión técnica, muchas veces preexistente al framework, y no una forma tipográfica del nombre de negocio.
3. `Artefacto-Agrupacion` se deriva de `Raiz-Codigo` con la extensión del ecosistema, y se declara cuando el ecosistema no tiene una convención única.
4. Cada proyecto de código lleva a su vez dos nombres: `Nombre-Proyecto-Codigo`, su identidad documental en Título-Con-Guiones, e `Identidad-Codigo`, su nombre en el ecosistema, compuesto como `<Raiz-Codigo>.<Sufijo>`.

**Prohibido que dos de estos campos se distingan solo por capitalización o por puntuación.** Si `Slug-Producto` y `Raiz-Codigo` resultan la misma cadena con los puntos cambiados por guiones, uno de los dos está mal declarado: el plano de negocio no habla en forma de código.

---

## §4 Reglas de uso

**R1. «Proyecto» a secas designa el emprendimiento.** Nunca una unidad de compilación, nunca un producto. Cuando el referente es la unidad de compilación se escribe **siempre completo**: «proyecto de código».

> Excepción única y declarada: en los compuestos `multi-proyecto`, `inter-proyecto` y `cross-proyecto`, el referente es siempre el proyecto de código. Son formas lexicalizadas donde el calificador no entra sin deformar la palabra. Fuera de esos tres compuestos la excepción no se extiende.

**R2. «Solución» a secas no se usa.** El agrupador de construcción se escribe siempre completo: «solución de código». La palabra queda reservada a ese compuesto y a su uso corriente en prosa de negocio («la solución al problema del cliente»), donde no nombra ningún concepto del framework.

**R3. Cada categoría declara su nivel.** La cabecera de cada `Rules-<Categoria>.md` declara si la categoría se aplica a nivel producto, a nivel proyecto de código o a los dos. Ese nivel fija qué nombre usa el documento en su prosa: un documento de nivel producto nombra al producto con `Nombre-Producto` y tiene prohibido nombrarlo con `Raiz-Codigo`.

**R4. «Módulo» conserva su sentido funcional.** Designa un área funcional del producto, no una unidad de compilación. El uso que ya hacen las reglas de UX-UI-DX, de maqueta y de calidad es el correcto y no se toca.

**R5. Un término, un concepto.** Ningún artefacto del framework introduce un sinónimo de los seis términos de §2 sin incorporarlo acá primero.

---

## §5 Confusiones que esta regla cierra

| No son lo mismo | Diferencia |
| --- | --- |
| Producto y solución de código | El producto es qué se entrega; la solución de código es cómo se agrupa la construcción. Su cardinalidad no es necesariamente uno a uno |
| Producto y proyecto de código | Un producto puede compilarse en un proyecto de código o en veinte. El número de proyectos de código no dice nada sobre cuántos productos hay |
| Producto y proyecto | El producto es permanente y se mide por el valor que entrega; el proyecto es temporal y se mide por su alcance y su cierre |
| Unidad de entrega y proyecto de código | Una unidad de entrega se despliega; un proyecto de código se compila. Una capa interna es proyecto de código y **no** es unidad de entrega |
| Unidad de entrega y módulo | La unidad de entrega se despliega por separado; el módulo no. Un panel con nueve módulos en su barra de navegación es **una** unidad de entrega |
| `Slug-Producto` y `Raiz-Codigo` | Identidad documental e identidad de código. Independientes por diseño: ver §3 |

---

## §6 Precedencia frente al glosario del dominio del cliente

El dominio de un cliente puede usar cualquiera de estas seis palabras con otro sentido, y es legítimo: el vocabulario del negocio no se le corrige al negocio.

Cuando ocurre, rige este procedimiento:

1. El glosario del dominio del intake **declara explícitamente el choque** y define los dos usos, cada uno con un término distinguible.
2. Dentro de la documentación generada, el término desnudo queda para el sentido del dominio del cliente, y el sentido del framework se escribe calificado.
3. La declaración es bloqueante: un intake cuyo glosario usa un término de §2 sin declarar el choque no pasa la validación de `Intake-Rules.md` §5.

Es lo que convierte en procedimiento lo que hasta ahora cada destino resolvía por reacción y de manera distinta.

Esta sección resuelve el choque de **un término de §2** con el dominio del cliente. El criterio general —cuándo un término polisémico cualquiera necesita desambiguarse y cuándo no— vive en §9, y es el que decide si un choque como éste es un defecto o es lenguaje natural funcionando.

---

## §7 Correspondencia con el vocabulario de industria

El framework no inventa estos conceptos: los nombra igual que los estándares que ya usa en sus roles y en sus prácticas. La tabla declara la correspondencia para que quien llega con formación de industria no tenga que aprender un vocabulario paralelo.

| Término del framework | Correspondencia | Fuente |
| --- | --- | --- |
| Producto | *Product*: vehículo para entregar valor, con frontera clara, stakeholders conocidos y usuarios o clientes definidos. Un *Product Backlog* y un *Product Owner* por producto | Scrum Guide 2020 |
| Unidad de entrega | *Container*: unidad desplegable o ejecutable por separado, por encima del nivel de componente | Modelo C4 |
| Módulo | *Component*: agrupamiento de funcionalidad dentro de una unidad desplegable, no desplegable por sí mismo | Modelo C4 |
| Proyecto | *Project*: esfuerzo temporal que se acomete para crear un producto, servicio o resultado único | Cuerpo de conocimiento y léxico del PMI |
| Solución de código y proyecto de código | *solution* / *project* en Visual Studio y MSBuild; *multi-module project* / *module* en Maven; *multi-project build* / *subproject* en Gradle; *workspace* / *package* en Cargo y npm | Documentación de cada ecosistema |
| Producto, como sistema entregado a un cliente | *Solution* de SAFe: el producto, servicio o sistema entregado al cliente. Se registra la correspondencia porque explica por qué el framework usaba antes esa palabra | SAFe |

**Sobre la evidencia de esta sección.** Las afirmaciones de §1 a §6 se verifican abriendo archivos de este repositorio. Las de esta tabla se verifican contra los estándares publicados, que no viven acá: se citan por estándar y por concepto, y deliberadamente sin número de cláusula, porque un número que no se puede comprobar desde el repositorio sería una cita sin evidencia y D9 lo prohíbe.

**No se adopta ningún marco completo.** SDD toma de cada fuente la definición del concepto, no su ceremonia ni su estructura organizativa.

---

## §8 Pendiente declarado

La **unidad de entrega** está definida en §2 y tiene correspondencia de industria, pero **todavía no es un nivel del layout de salida**. Hoy el nivel intermedio de `SDD/Docs/Proyectos/<Nombre-Proyecto-Codigo>/` se puebla con proyectos de código, y las once categorías que cuelgan de él producen artefactos de nivel producto: casos de uso, experiencia de uso, *Product Backlog*, plan de sprint, pipeline, samples y cuerpo documental.

La reubicación de esas categorías al nivel de unidad de entrega es una intervención estructural aparte, que esta regla no ejecuta. Queda declarada acá para que la discrepancia sea visible y no se lea como un descuido.

Por la misma razón, `tipo_proyecto_codigo` conserva el conjunto cerrado D8 aunque D8 sea, según el propio `SDD-Development-Guide.md`, un catálogo de **formas de entrega**. El campo se renombró sin cambiar su semántica; a qué nivel corresponde se decide en esa intervención.

---

## §9 Criterio de desambiguación léxica

Las secciones anteriores fijan el vocabulario **del framework**. Esta fija cómo se decide, en cualquier documentación que el framework genere, si un término con más de un referente es un defecto o es lenguaje natural funcionando. Sin ella, el framework verifica «glosario sin contradicciones» sin tener con qué separar un caso real de un falso positivo.

### §9.1 La regla de decisión

**Un término polisémico se desambigua solo cuando sus sentidos pueden aparecer en el mismo contexto de lectura.** Cuando los contextos son disjuntos, no se califica: hacerlo carga el texto sin resolver un problema que no existe.

«Imagen de registro» y «registro del contenedor» conviven sin ambigüedad: el modificador las distingue y ningún lector se confunde. Reportarlas como defecto es un falso positivo, y la corrección que ese falso positivo induce —calificar todas las ocurrencias del término— **es** un defecto.

### §9.2 Qué cuenta como «mismo contexto de lectura»

Acá está la parte que el framework tiene que declarar explícitamente, porque es propia de cómo trabaja y no se deduce de la lingüística:

> **El contexto de lectura de un subagente es la sección, no el documento.**

`Master-Prompt.md` §8 construye cada despacho con una lista de insumos que nombra **secciones**, no archivos completos: «Parte A negocio; §13 composición; §17 bloque técnico del proyecto de código». Un lector humano abre el documento entero y el contexto le resuelve la referencia; un subagente que recibió tres secciones de setenta, no.

Consecuencia operativa: **un término cuyos sentidos se distinguen solo leyendo el documento completo sí colisiona.** «El registro queda en el estado previo», leído dentro de un caso de uso completo, se entiende; leído como sección suelta por un subagente que tiene que derivar una decisión de transaccionalidad, admite tres lecturas que producen tres arquitecturas distintas.

Corolario: el término desnudo de una familia calificada es el caso que hay que mirar. Si un documento usa «registro de auditoría», «registro del contenedor» e «imagen de registro», las tres formas calificadas están bien y **«el registro» a secas es el defecto**.

### §9.3 Las tres formas de desambiguar, por costo creciente

Se usa **la más barata que resuelva el caso**, y se declara por qué las anteriores no alcanzaban.

| Forma | Cuándo alcanza | Costo |
| --- | --- | --- |
| **Entrada de glosario** que declara los referentes y cuál corresponde a cada contexto | El término se lee mal solo en algunas secciones y el glosario está en el alcance de lectura del subagente | El más bajo: un párrafo, ninguna reescritura |
| **Forma calificada obligatoria** en las ocurrencias que colisionan | El término desnudo aparece en secciones que se despachan por separado y ahí no se resuelve | Medio: reescritura puntual, verificable por ocurrencia |
| **Invariante de producto con prohibición de fusión** (§5 de `Master-Prompt.md`) | El término es central, se usa en las doce categorías y una fusión posterior invalidaría documentación aguas abajo | El más alto: alcanza a todo subagente y a todo audit |

### §9.4 Prohibición

**No se declara una invariante de desambiguación sin haber verificado que los contextos colisionan.** Enumerar los sentidos de un término cuyos contextos son disjuntos, y prohibir su fusión, es tratar como defecto lo que no lo es. El patrón queda primado: una vez que un producto declara una invariante para un término, la forma del patrón —enumerar sentidos, prohibir la fusión— se aplica al siguiente término sin volver a verificar la premisa.

La verificación es por ocurrencia y es afirmación sobre el estado del sistema: cae bajo D9.

### §9.5 Sustituir un término en un corpus ya escrito

Renombrar un término a lo largo de documentación existente es una intervención léxica, no una operación de texto. **Queda prohibida la sustitución global de una cadena.** Dos razones, las dos verificadas sobre este mismo framework:

1. **La cadena de un término es subcadena de otras palabras.** Sustituir `soluci*` por `producto` convierte «re**soluci**ón» en «reproducto». En la migración del framework 5.0 esto produjo treinta ocurrencias de una palabra inexistente en doce archivos, incluidos un título de sección, un ancla de tabla de contenido y el nombre de un campo de contrato.
2. **La misma palabra puede llevar un sentido no normativo que las reglas de uso preservan.** R2 conserva «solución» en prosa de negocio y como remedio de un problema. La misma migración pisó veintitrés cabeceras de tabla de anti-patrones —cuya columna de remedio se llama «Solución»— y varios usos de prosa, dejando concordancias de género rotas del tipo «producto técnica».

Procedimiento obligatorio: enumerar las ocurrencias, clasificar cada una por sentido, sustituir solo las que cambian de referente y verificar el resultado con un barrido que busque la palabra nueva en contextos donde no puede aparecer. El registro de la sustitución declara cuántas ocurrencias se revisaron y cuántas se cambiaron.

---

## §10 Criterios de aceptación

Verificables por el auditor de cualquier fase sobre cualquier artefacto:

- [ ] No aparece «proyecto» a secas designando una unidad de compilación ni un producto, salvo en los tres compuestos de la excepción de R1.
- [ ] No aparece «solución» a secas designando el agrupador de construcción.
- [ ] Los cuatro campos de identidad de §3 están declarados y ninguno se distingue de otro solo por capitalización o puntuación.
- [ ] Todo documento de nivel producto nombra al producto con `Nombre-Producto` y no con `Raiz-Codigo`.
- [ ] Si el glosario del dominio del cliente usa un término de §2, el choque está declarado según §6.
- [ ] Ningún sinónimo nuevo de los seis términos circula sin estar incorporado a §2.

Sobre desambiguación léxica (§9), en la documentación que el framework genera:

- [ ] Todo término que la fase acuña y que aparece en más de un artefacto está declarado en el glosario de su categoría.
- [ ] Todo término con más de un referente dentro de la fase tiene entrada de glosario que los declara, o forma calificada en todas las ocurrencias que colisionan.
- [ ] Ninguna forma desnuda de un término de una familia calificada queda sin resolver en una sección que se despacha por separado (§9.2).
- [ ] **Criterio negativo:** ninguna polisemia con contextos disjuntos se reporta como defecto. Reportarla es un hallazgo del informe de auditoría, no del documento auditado.
- [ ] Toda invariante de desambiguación declarada cita la verificación de colisión que la justifica (§9.4).
- [ ] Ninguna sustitución de un término en un corpus ya escrito se hizo por reemplazo global de la cadena, y su registro declara ocurrencias revisadas y ocurrencias cambiadas (§9.5).

---

## §11 Control de cambios

| Versión | Fecha | Cambios | Autor |
| --- | --- | --- | --- |
| 1.0 | 2026-07-29 | Regla inicial de vocabulario normativo. Fija los seis términos de §2 con definición por frontera, los cuatro planos de identidad de §3, las cinco reglas de uso de §4, la tabla de confusiones de §5, la precedencia frente al glosario del dominio del cliente de §6 y la correspondencia con el vocabulario de industria de §7. Nace de la constatación de que el framework no tenía glosario propio y de que sus dos términos centrales estaban definidos por su papel en la herramienta en lugar de por su frontera. Declara como pendiente la reubicación de las once categorías de nivel producto al nivel de unidad de entrega. | Reformulación SDD |
| 2.0 | 2026-07-29 | **§9 nueva, criterio de desambiguación léxica.** La regla pasa de fijar el vocabulario del framework a fijar además cómo se decide, en la documentación que el framework genera, si un término con más de un referente es un defecto. Sube major porque agrega criterios de aceptación que el auditor de cualquier fase aplica sobre todo artefacto, y porque §9.5 prohíbe un procedimiento que hasta ahora no estaba prohibido. §9.1 fija la regla de decisión: se desambigua solo cuando los sentidos comparten contexto de lectura. §9.2 declara que **el contexto de lectura de un subagente es la sección y no el documento**, porque el despacho de `Master-Prompt.md` §8 entrega secciones nombradas y no archivos completos; de ahí se sigue que el término desnudo de una familia calificada es el caso a mirar y las formas calificadas no lo son. §9.3 ordena las tres formas de desambiguar por costo creciente y obliga a usar la más barata que resuelva. §9.4 prohíbe declarar una invariante de desambiguación sin verificar la colisión, y remite esa verificación a D9. §9.5 prohíbe la sustitución global de una cadena al renombrar un término en un corpus ya escrito, con las dos clases de daño verificadas sobre la migración de la 5.0 —la subcadena dentro de otra palabra y el sentido no normativo que R2 preserva— y fija el procedimiento por ocurrencia. §6 suma un puntero a §9. §10 suma seis criterios, incluido el criterio negativo del falso positivo. **Origen**: el criterio existía enunciado dentro del intake de un producto real y no como regla del framework; y la propia migración de la 5.0 lo incumplió antes de que existiera. §11 era §10. | Revisión SDD |
