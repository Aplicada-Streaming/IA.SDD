# Changelog

Todos los cambios relevantes de este repositorio (`IA.SDD`) se documentan acá.
Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/).

## [6.0] - 2026-07-29

Capacidad de **migración normativa**: llevar un destino generado con una versión anterior del framework a la versión vigente, preservando su contenido. Sube major porque `PRODUCT-MANIFEST-template.md` sube major y un manifiesto ya emitido deja de cumplir. Ninguna invariante D1-D9 modificada, el conjunto D8 intacto, el orden de fases y la mecánica plan-then-confirm sin cambios.

**Qué faltaba.** El framework sabía diagnosticar el desfasaje de un destino y no sabía repararlo. La reconciliación normativa de `Master-Prompt.md` §2.1 leía la procedencia, la comparaba contra las versiones vigentes, clasificaba los saltos y enumeraba los documentos potencialmente invalidados; sus tres salidas eran emitir un plan sin tocar nada, regenerar desde cero archivando lo anterior, o seguir con las reglas viejas. Ninguna llevaba el destino a la versión vigente conservando lo que ya decía: regenerar lo conseguía tirando lo que había, y seguir con las reglas viejas lo conseguía no avanzando. Además la reconciliación no alcanzaba a los dos documentos de entrada, y sobre un destino generado con la 4.1 **ni llegaba a correr**, porque §2 resolvía el producto buscando `PRODUCT-INTAKE-*.md` y en la 4.1 el intake se llamaba `SOLUTION-INTAKE`.

La nota de coherencia es [`Coherencia-Migracion.md`](SDD/Devs/Guides/Coherencia-Migracion.md).

### Añadido — la capacidad de migración

- **`Migracion-Rules.md` 1.0**, decimoctava regla del framework y sexta transversal. Fija el **principio de estado objetivo**: la normativa vigente es la especificación del estado al que hay que llegar, el documento existente es la fuente del contenido, y la migración re-expresa el segundo bajo la primera. No hay recetas por salto de versión; el salto sirve para priorizar, no para transformar. Se descartaron explícitamente los playbooks por par de versiones, con cinco fundamentos, el primero de ellos siendo que `Vocabulario-Rules.md` §9.5 ya prohíbe la transformación mecánica de texto con el daño de la 5.0 como prueba. Declara además la **regla de no invención** (§4.1): todo contenido de un documento migrado proviene del documento de origen, de un documento hermano o de una respuesta del humano, y no hay cuarta fuente; la sección exigida sin fuente se emite como pendiente y **no se rellena**. Catorce criterios de aceptación, seis hallazgos P0 y ocho anti-patrones.
- **`Master-Prompt-Migracion.md` 1.1**, orquestador contiguo con siete fases M0 a M6: reconocimiento del destino con tolerancia de nombres legados, diff normativo, migración del intake, re-derivación del manifiesto, migración de `SDD/Docs/` en orden de la cadena D6, cierre condicional de la procedencia y auditoría. **No redefine despacho ni auditoría**: cita §8 y §10 del master-prompt de generación, junto con su archivado de §5, su manejo de ambigüedad de §9 y su orden topológico de §3.3. La duplicación que no existe no se desincroniza.
- **`PROMPT-Agente-Migracion-SDD.md` 1.0**, prompt de entrada par del de bootstrap, con la tabla que decide cuál de los dos corresponde según el estado del destino.
- **Destinos sin procedencia declarada**: pasan de tener solo regenerar o abortar a ser migrables, con la clasificación degradada a «revisar todo». Es posible porque la migración opera contra el estado objetivo y no contra el conjunto de origen. La degradación se declara y **no se supone ninguna versión de origen**.
- **Migración parcial** como estado final legítimo, con dos condiciones bloqueantes: la procedencia no se reescribe y el estado parcial se declara documento por documento en el informe.

### Añadido — la instrumentación que la migración necesitaba

- **`PRODUCT-MANIFEST-template.md` (3.1 → 4.0 → 4.1).** El bloque de procedencia de §1.1 suma **dos filas obligatorias**: la versión de `PRODUCT-INTAKE-template` y la de `PRODUCT-MANIFEST-template`. Las plantillas se versionan aparte de las reglas, así que un cambio de su estructura no movía ninguna versión declarada y era invisible para el diff normativo: los dos documentos de entrada del destino no podían resultar candidatos de nada. Sube **major** por el criterio de `SDD-Development-Guide.md` §VI.1. En la 4.1 se completa además la fila de reglas transversales, que omitía `Vocabulario-Rules` pese a que `Master-Prompt.md` §8 la inyecta en todo despacho, y suma `Migracion-Rules`.
- **`Intake-Rules.md` (3.1 → 3.2).** **§2.1 nueva**, tabla maestra de sus dos artefactos. El paso 4 del diff normativo enumera los documentos que una regla gobierna leyendo «su tabla maestra de documentos (§2.1 de la regla)», y esta regla no la tenía: el intake y el manifiesto nunca podían aparecer entre los documentos potencialmente invalidados, ni siquiera ante el salto major de 2.1 a 3.0 de esta misma regla.
- **`Master-Prompt.md` (5.1 → 5.2).** §2 paso 1 **tolera nombres de artefacto legados**, buscándolos en `_legacy/` y en los bloques de impacto del `CHANGELOG.md` antes de concluir que no hay intake; un intake bajo nombre legado deja de detener la cadena y pasa a declararse como destino a migrar. §2.1 nombra el instrumento de su salida A y renombra su plan; sus tres prohibiciones y su detención quedan intactas y **no se agrega una cuarta salida**, porque ejecutar el plan sigue siendo una decisión aparte. §13 regla 2 pasa de un caso de escritura del intake a **dos**, con el segundo siendo la migración estructural bajo tres condiciones acumulativas.
- **`SDD-Development-Guide.md` (1.4 → 1.5 → 1.6).** §VI.4 especifica el bloque **«Impacto sobre destinos existentes»** con sus tres tablas, obligatorio en toda entrada major: hay una clase de cambio que ningún diff de versiones puede inferir, porque un renombre de artefacto no se deduce de que su regla haya subido de 2.1 a 3.0. §VI.5 declara la obligación correlativa. En la 1.6, tres conteos y el mapa de dependencias al día, y la **tabla de derivación del conjunto corregida**: hacía subir major solo por reglas e invariantes y no contemplaba las plantillas de intake.

### Cambiado — el término

- **`Vocabulario-Rules.md` (2.0 → 2.1).** **§9.6 nueva**: declara la familia calificada **«migración normativa»** con sus tres referentes verificados por barrido, porque la palabra ya tenía dos sentidos vigentes en el framework. Se adopta la forma calificada obligatoria —segundo escalón de la escalera de §9.3—, con el primero declarado insuficiente y su evidencia: los dos sentidos coexisten dentro de §9.5 de ese mismo archivo, y por §9.2 el criterio de colisión es la sección. Frente al tercer referente, las migraciones de datos del producto documentado, **no se desambigua nada** por contextos disjuntos, y la constancia queda escrita para que una auditoría posterior no lo levante como hallazgo. **§4 suma R6.** «Reconciliación normativa» conserva su nombre porque compara y no transforma.
- **Renombre léxico de «plan de adecuación» a «plan de migración normativa»**, por el procedimiento por ocurrencia de `Vocabulario-Rules.md` §9.5 y **no** por sustitución global de cadena: **diecinueve ocurrencias de «adecua\*» revisadas, siete sustituidas**, cero filas históricas de control de cambios reescritas y cero ocurrencias no normativas tocadas. Barrido negativo sin hallazgos. Alcanzó a `Master-Prompt.md`, `PROMPT-Agente-Bootstrap-SDD.md` (2.3 → 2.4), `SDD-User-Guide.md` (1.7 → 1.9) y `SDD-Getting-Started-Guide.md` (1.3 → 1.5).

### Impacto sobre destinos existentes

**Renombres de artefacto**

| Nombre anterior | Nombre vigente | Naturaleza |
| --- | --- | --- |
| `SDD/Docs/Audit/Reconciliacion-<origen>-a-<vigente>.md` | `SDD/Docs/Audit/Plan-Migracion-<origen>-a-<vigente>.md` | archivo |
| «plan de adecuación» | «plan de migración normativa» | término de la salida A de `Master-Prompt.md` §2.1 |

Los renombres de la 5.0 —`SOLUTION-INTAKE` a `PRODUCT-INTAKE`, `SOLUTION-MANIFEST` a `PRODUCT-MANIFEST`, `SDD/Docs/Solucion/` a `SDD/Docs/Producto/`, y los cinco identificadores— siguen vigentes y son los que la tolerancia de nombres legados de §2 paso 1 resuelve. No se repiten acá: su declaración vive en la entrada `[5.0]`.

**Secciones movidas o partidas**

| Documento | Sección anterior | Destino vigente |
| --- | --- | --- |
| `Intake-Rules.md` | §2 Campos bloqueantes | §2.2 Campos bloqueantes, dentro de §2 «Artefactos gobernados y campos bloqueantes». Las referencias externas apuntan a §2, que sigue conteniéndolos |
| `Master-Prompt.md` | §13 regla 2, caso único de escritura | §13 regla 2 caso (a). El caso (b) es nuevo |

**Campos bloqueantes nuevos**

| Documento | Campo | Regla que lo exige |
| --- | --- | --- |
| `PRODUCT-MANIFEST-<Slug-Producto>.md` | Fila de procedencia con la versión de `PRODUCT-INTAKE-template` | `PRODUCT-MANIFEST-template.md` §1.1 y su checklist de §7 |
| `PRODUCT-MANIFEST-<Slug-Producto>.md` | Fila de procedencia con la versión de `PRODUCT-MANIFEST-template` | `PRODUCT-MANIFEST-template.md` §1.1 y su checklist de §7 |

**Qué le pasa a un destino ya emitido.** Su manifiesto no declara las dos filas de plantilla y por lo tanto deja de cumplir. La vía de reparación es la que esta misma versión introduce: la migración normativa, que las completa en la fase M3 al re-derivar el manifiesto. Un destino que no se migre sigue siendo legible y utilizable; lo que pierde es la capacidad de que un diff normativo futuro detecte cambios de estructura de plantilla. No hay pérdida de contenido y no se requiere ninguna acción inmediata.

## [5.1] - 2026-07-29

Gobierno del glosario de la documentación generada, y reparación del método con que se aplicó la 5.0. Sube minor: agrega criterios de aceptación y un artefacto obligatorio a una categoría, sin modificar ninguna invariante D1-D9, el conjunto D8, el orden de fases ni la mecánica plan-then-confirm. Dos reglas suben major por su propio artefacto —`Rules-Especificacion-Funcional.md` y `Rules-UX-UI-DX.md`— y su documentación ya emitida sin glosario deja de cumplir.

**Origen.** Dos hechos que se explican uno al otro. El primero es una orden de trabajo emitida desde la corrida de un producto real, que verificó dos defectos: el framework no tenía ninguna regla que dijera **cuándo un término polisémico necesita desambiguarse**, y el glosario de la categoría 02 era sección de un documento condicional que ningún criterio de aceptación verificaba. El segundo es que **la intervención de la 5.0 se ejecutó sustituyendo cadenas de manera global**, y produjo cuatro clases de daño. Los dos son el mismo defecto: el framework no tenía criterio para intervenir vocabulario, y por eso su propia intervención de vocabulario salió mal. La nota de coherencia es [`Coherencia-Sustitucion-Lexica-Y-Gobierno-Glosario.md`](SDD/Devs/Guides/Coherencia-Sustitucion-Lexica-Y-Gobierno-Glosario.md).

### Añadido — el criterio de desambiguación léxica

- **`Vocabulario-Rules.md` §9** (1.0 → 2.0), en cinco subsecciones. **§9.1** fija la regla de decisión: un término polisémico se desambigua **solo cuando sus sentidos pueden aparecer en el mismo contexto de lectura**; cuando los contextos son disjuntos no se califica, porque hacerlo carga el texto sin resolver un problema que no existe. **§9.2** declara la pieza que es propia de cómo trabaja el framework y no se deduce de la lingüística: **el contexto de lectura de un subagente es la sección, no el documento**, porque el despacho de `Master-Prompt.md` §8 nombra secciones y no archivos completos; de ahí se sigue que las formas calificadas de una familia de términos están bien y **la forma desnuda es el defecto**. **§9.3** ordena las tres formas de desambiguar por costo creciente —entrada de glosario, forma calificada obligatoria, invariante de producto con prohibición de fusión— y obliga a usar la más barata que resuelva, declarando por qué las anteriores no alcanzaban. **§9.4** prohíbe declarar una invariante de desambiguación sin haber verificado la colisión, y remite esa verificación a D9. **§9.5** prohíbe la sustitución global de cadena al renombrar un término en un corpus ya escrito, con el procedimiento por ocurrencia que la reemplaza.
- **El criterio existía y vivía en el lugar equivocado.** Estaba enunciado dentro del `SOLUTION-INTAKE` §12 de un producto real, como hallazgo local de esa solución: «no se califica cuando los contextos son disjuntos, porque cargaría el texto sin resolver un problema que no existe». Un orquestador que adoptara la forma del patrón heredaba la forma sin el criterio.
- **`Vocabulario-Rules.md` §10** suma seis criterios de aceptación, incluido el **criterio negativo**: una polisemia con contextos disjuntos **no es hallazgo**, y reportarla es un defecto del informe de auditoría, no del documento auditado.
- **Cuatro términos nuevos en el glosario operativo del orquestador** (`Master-Prompt.md` §15): contexto de lectura, colisión de sentidos, falso positivo de ambigüedad léxica y glosario de categoría.

### Añadido — el glosario de la categoría 02 como artefacto

- **`Glosario-Funcional.md`** (`Rules-Especificacion-Funcional.md` 3.0 → **4.0**), obligatorio para los **ocho** tipos D8. Hasta ahora el glosario de 02 era el punto 6 de `Modelo-Conceptual.md`, documento condicional a la persistencia: **un `library` o un `cli-tool` no tenía glosario en absoluto**, aunque acuñara igual sus cinco casos de uso mínimos, sus reglas de negocio y su vocabulario. El glosario de la categoría que más términos introduce dependía de un flag que no tiene nada que ver con el vocabulario.
- **§4.2.4 nueva** con las cinco secciones obligatorias del glosario, entre ellas la de términos con más de un referente, que no se omite: si ninguno lo requiere, declara «ninguno verificado». Un glosario con tabla de términos vacía no cumple.
- **§3.3** suma la regla de inclusión —todo término que aparezca en más de un artefacto de 02—, la de no duplicación frente al glosario del dominio de 00 y la de polisemia. **§4.5** suma cuatro anti-patrones y **§5.4** tres preguntas guía. **§6** suma cinco criterios verificables. Las menciones de «glosario» en ese archivo pasan de **1 a 20**.
- **`Rules-UX-UI-DX.md`** (3.0 → **4.0**): `Glosario-UX.md` pasa de «Recomendado para todos los tipos con UI final» a **obligatorio para los ocho tipos**, incluidos los DX, que acuñan el vocabulario de su superficie pública. Su §6 pasa de verificar solo la no duplicación a verificar además existencia y completitud. La orden de trabajo de origen lo declaraba «sin cambios porque ya cumple»: era la única de las trece reglas que gobernaba su glosario, pero su artefacto era recomendado y su criterio no verificaba que existiera.
- **Criterio uniforme de gobierno del glosario en §6 de las quince reglas restantes**, con el **destino** de sus términos declarado en cada una: 01 los deja en el glosario del dominio de 00; 05 y 09 en el `Glosario-Tecnico.md` de 11; 06, 07, 08 y 10 no acuñan vocabulario y un término nuevo ahí es señal de que falta aguas arriba. **Archivos de reglas sin ninguna mención de «glosario»: de 9 sobre 17 a 0 sobre 17.**
- **`Deriva-Rules.md`** exige que los nombres canónicos `SUP`, `CMP`, `EST` y `NAV` de la línea de base coincidan término por término con los de 03 y estén declarados en `Glosario-UX.md`: un nombre de superficie que la línea de base inventa vuelve inservible el sensado, porque lo que se compara deja de ser lo que se aprobó.

### Cambiado — el audit del glosario deja de ser un criterio único

- **`Master-Prompt.md` §10** (5.0 → 5.1) reemplaza «glosario sin contradicciones» por **cuatro** criterios: sin contradicciones, **completitud** (todo término que la fase acuña y aparece en más de un artefacto está en el glosario de su categoría), **polisemia gobernada** (todo término con más de un referente tiene entrada que los declara o forma calificada en las ocurrencias que colisionan) y el **criterio negativo**. Un glosario incompleto cumplía «sin contradicciones» trivialmente, que es por qué ese criterio solo no alcanzaba. El punto 5 de la estructura del informe pasa a enumerar las polisemias evaluadas y descartadas, para que la ronda siguiente no las vuelva a levantar.
- **`Master-Prompt.md` §15** redefine *Producto* y *Proyecto de código* **por frontera**, remitiendo a `Vocabulario-Rules.md` §2. Definía el producto como «contenedor raíz del entregable que agrupa una jerarquía de proyectos de código», que es exactamente la definición-por-papel-en-la-herramienta que la 5.0 identificó como el origen del problema y corrigió en el marco teórico sin propagarlo al glosario del orquestador ni al de la guía de usuario.

### Corregido — `Vocabulario-Rules.md` no estaba cableada

La 5.0 incorporó la regla declarando como lector «el orquestador, todo subagente AG-XX, el auditor de cada fase», y los diecisiete archivos de reglas la citan desde la línea «Nivel de aplicación» de su cabecera. Pero **no estaba en los insumos obligatorios del despacho de `Master-Prompt.md` §8**, ni en los del auditor de §10: ningún subagente la recibía y la cita de su cabecera no resolvía. Ahora se inyecta en **todo** despacho, con la regla de construcción que declara por qué no admite excepción de categoría, y en el del auditor. `SDD-Development-Guide.md` §III.8 registra el caso como segundo ejemplo trabajado de agregar una regla transversal, con la lección explícita: **declarar el lector no es cablearlo.**

### Corregido — las cuatro clases de daño de la sustitución global de cadena

El renombre de la 5.0 era correcto y no se revierte. Lo que se repara es el método.

- **30 ocurrencias de la palabra inexistente «reproducto» en 12 archivos**, porque «re**soluci**ón» contiene la cadena `soluci`. La palabra «resolución» había desaparecido por completo del framework vivo. Entre las ocurrencias: el **título de §6 de `SDD-User-Guide.md`** con su ancla en la tabla de contenido, el **nombre del campo `resolucion`** de la bitácora de eventualidades de `Rules-Documentacion.md` en su tabla de campos y en su bloque de ejemplo, el **título del patrón** «Redirección con estado de resolución» de `Design-Rules-Primer-Arranque.md` con tres referencias internas, la variante `mobile-app-maui` de `Rules-Arquitectura-Tecnica.md` que el orquestador copia literal al despacho, y el nombre de la validación bloqueante «Regla de resolución de la Parte D» en `Intake-Rules.md` y en la plantilla de intake.
- **23 cabeceras de tabla de anti-patrones en 17 archivos**: `| Anti-patrón | Problema | Solución |` había quedado como `| … | Producto |`, y esa columna contiene el remedio. Alcanzaba a 15 de los 17 archivos de reglas y a siete tablas del marco teórico. No es cosmético: §8 manda a cada subagente respetar la sección de anti-patrones y §10 hace de un anti-patrón un hallazgo P1. R2 de `Vocabulario-Rules.md` conserva explícitamente ese uso de la palabra.
- **Concordancias de género y remedios pisados**: «no debe leerse como **producto técnica**», «saltando a **productos técnicas**», «separar en **productos** SDD **distintas**», «tabla síntoma/causa/**producto**», «antes de aplicar **el producto**» (dos lugares) y «sugerencia de **producto**».
- **14 etiquetas de cabecera en 13 archivos**: el campo `**Proyecto:**` se había convertido en `**Proyecto de código:**` sobre valores que no son unidades de compilación. Los siete con valor `Template SDD` pasan a `**Framework:** SDD`, patrón que la propia nota de la 5.0 ya usaba; los siete con valor `{{Nombre-Producto}}` pasan a `**Producto:**`, porque una etiqueta de un plano sobre el valor de otro es lo que `Vocabulario-Rules.md` §3 prohíbe. Se corrigieron además **27 marcadores `{{nombre-proyecto}}`** que la 5.0 dejó sin renombrar pese a haber declarado el identificador nuevo, y que violaban D3 por ser todo-minúsculas; las tres cabeceras modelo de `Rules-Contexto.md`, categoría de **nivel producto**, dejan de declarar un proyecto de código, según R3.
- **60 filas históricas de control de cambios reescritas en 23 archivos**, contra `SDD-Development-Guide.md` §VI.2, que lo prohíbe textualmente: «las filas ya escritas no se reescriben, aunque un cambio posterior invalide lo que describen; corregirlas hace que el changelog mienta». Todas restituidas a su texto original, verificado contra el control de versiones. El `CHANGELOG.md` sí había respetado la regla. **Límite declarado**: las filas que la 4.1 escribió el mismo día y la 5.0 reescribió a continuación no son recuperables, porque no hubo commit intermedio y no existe fuente de verdad de su texto; quedan con el vocabulario nuevo y se declara en lugar de reconstruirse, porque un registro reconstruido es un registro falso.

### Corregido — el registro de versiones de la 5.0

- **Cuatro archivos declaraban en cabecera una versión que su control de cambios no registraba**: `Master-Prompt.md` (5.0 sin fila, siendo que su propia §16 dice «cualquier cambio en su contenido sube versión y queda registrado»), `Marco-Teorico-SDD.md` (2.0 sin fila), `SDD-Development-Guide.md` (1.3 sin fila) y `SDD-Getting-Started-Guide.md`, que declaraba **dos versiones contradictorias en el mismo archivo**, `1.2` en el front-matter y `1.0` en el bloque de cabecera. Las filas faltantes se registran retroactivamente, declarando que se registran retroactivamente.
- **Unos veinte archivos habían sido modificados sin dejar fila**: los nueve del catálogo `References/Design/`, las notas de coherencia, el prompt de entrada, las dos guías de usuario y `Templates/`. Todos suben versión con su fila.
- **Filas de cuatro celdas insertadas en tablas de tres columnas**, que rompían el renderizado de la tabla. Normalizadas.
- **`Rules-Design-Modelo-Template.md` no tenía control de cambios propio**: declaraba versión en cabecera y su §15 es el control de cambios del documento que la plantilla produce, no de la plantilla. Se agrega §16, aplicación incompleta de D5 que §15 hacía difícil de ver.
- **`SDD-Development-Guide.md` no tenía salto de línea final.** Restituido.

### Corregido — desfase de los tres documentos de `SDD/Guides`

- **`SDD-User-Guide.md` (1.6 → 1.7) contradecía al orquestador en el punto que la 5.0 vino a corregir.** §4.5 paso 6 decía «Derivar `Slug-Producto`, `Raiz-Codigo` (PascalCase)» y F-18 que `Raiz-Codigo` «es la forma PascalCase del nombre del producto», cuando `Master-Prompt.md` §3.2 y `Vocabulario-Rules.md` §3 declaran que **se declara en el perfil de convención del intake y admite separadores de segmento**. Un usuario que siguiera la guía disparaba la validación bloqueante de independencia entre planos. Su glosario §10.1 pasa de dos entradas de vocabulario a nueve —los seis términos normativos por frontera, los cuatro planos de identidad, el contexto de lectura y el glosario de categoría—; §4.4 dejaba de listar tres de las cinco reglas transversales y §10.2 no incluía `Vocabulario-Rules.md` en el árbol; el resumen ejecutivo declaraba 23 entradas de FAQ y hay 29, defecto arrastrado desde la 1.5.
- **`SDD-Development-Guide.md` (1.2 → 1.4) contradecía al `README.md` raíz en tres conteos**: §I.2 declaraba «los dieciséis archivos normativos … más `Root-Rules`, `Intake-Rules`, `Maqueta-Rules` y `Deriva-Rules`», §II.1 «las cuatro reglas transversales» y §III.7 que una invariante «vive en los dieciséis archivos de reglas», cuando la propia 5.0 había agregado el decimoséptimo y el README ya decía diecisiete y cinco. Su mapa de dependencias §I.1 no tenía el nodo `Vocabulario-Rules` y su tabla §I.3 de quién lee cada pieza no la incluía, además de afirmar que el subagente «recibe un solo archivo de reglas».
- **`SDD-Getting-Started-Guide.md` (1.2 → 1.3)** suma al glosario mínimo los términos que un primer arranque necesita —producto, proyecto de código, proyecto como emprendimiento, solución de código, los cuatro nombres del producto con la aclaración de que `Raiz-Codigo` la declara el usuario, y la regla de vocabulario— y corrige el rango de la FAQ, que citaba `F-01 a F-23` cuando hay 29 desde la 3.0.

### Corregido — defectos preexistentes encontrados en el camino

- **`Rules-Especificacion-Funcional.md` §0 citaba «11 (ejemplos)»**, número nuevo con el significado viejo: residuo del intercambio 10 ↔ 11 de la 3.0 del framework.
- **Cuatro nombres de artefacto en todo-minúsculas** que la propia regla que los contenía prohíbe en el párrafo siguiente: `especificacion-funcional.md`, `modelo-conceptual.md` y `definicion-<concepto>.md` en §3.1, §3.5 y §5.1 de la regla de 02, contra su propia §2.1; y `glosario-ux` en §3.1 y §3.2 de la regla de 03, contra su §2.1 y contra D3.
- **`Rules-Arquitectura-Tecnica.md` declaraba dos veces la línea «Nivel de aplicación»** en su cabecera.
- **Tres valores de ejemplo que no cumplían Título-Con-Guiones**: `servicio-pagos`, `Turnos Médicos` y `Librería CSV` en cabeceras modelo de nivel proyecto de código.

### Corregido — dos celdas de verificación de la nota de coherencia de la 5.0

`Coherencia-Vocabulario-Producto-Y-Proyecto-De-Codigo.md` (1.0 → 1.1) reexpresa sus celdas **D1** y **D2**, que afirmaban verificaciones no realizadas: la D1 declaraba un «barrido de determinantes, adjetivos y participios adyacentes» que no se había hecho —lo demuestran «producto técnica» y las 30 «reproducto»—, y la D2 declaraba haber restituido el salto de línea final «en los archivos que no lo tenían» mientras `SDD-Development-Guide.md` seguía sin él. Eran afirmaciones sobre el estado del sistema sin evidencia válida, que es lo que D9 prohíbe. **El alcance verificado por la nota no se modifica**, según el criterio de reexpresión del `README.md`: el alcance no se toca nunca y solo se reexpresa la verificación concreta que quedaría falsa. Se agrega su observación 6 con la clase de defecto que la intervención introdujo y que su propio veredicto APROBADO no detectó, porque no había criterio contra el cual detectarlo.

### Preservado deliberadamente

- **`SDD/Devs/Bootstrap/` y `_legacy/` no se tocaron.** Las dos «reproducto» y los `project_type` que `Bootstrap/` conserva citan el estado vigente en su momento.
- **El renombre de la 5.0 no se revierte.** «Producto» y «proyecto de código» quedan como el vocabulario normativo. Lo que se repara es cómo se aplicó.
- **No se creó snapshot en `_legacy/`.** El archivado por versión rige por conjunto normativo publicado y esta entrada no publica una versión mayor: la 5.0 sigue siendo el conjunto de referencia y su subcarpeta se crea cuando sea superada.
- **No se propone una invariante D10.** El criterio de desambiguación es una regla operativa transversal, no una invariante del template.
- **No se unifican los glosarios en uno por producto**, y no todas las categorías reciben glosario propio. Solo 02, 03 y 11 emiten uno; las demás declaran dónde van sus términos. Multiplicar glosarios crearía el problema que la regla de no duplicación existe para evitar.
- **El nivel de unidad de entrega sigue definido y sin materializar**, pendiente declarado de `Vocabulario-Rules.md` §8.

### Verificación pendiente, declarada

La comprobación empírica del defecto del glosario de 02 es **generar la categoría 02 de un producto de tipo `library` o `cli-tool`** —sin persistencia— y verificar que emite glosario. Requiere una corrida del orquestador sobre un destino y queda fuera del alcance de una intervención sobre el repositorio fuente. Se declara como pendiente y no como cumplida, porque afirmarla sin haberla corrido sería el mismo defecto que la celda D1 de la nota anterior cometió.

## [5.0] - 2026-07-29

Vocabulario normativo: el nivel superior pasa de «solución» a **producto** y la unidad de compilación pasa de «proyecto» a **proyecto de código**. Sube major: cambian identificadores, nombres de artefacto y nombres de archivo, y toda la documentación generada bajo la nomenclatura anterior deja de cumplir. Alcanza a los diecisiete archivos de reglas, al orquestador, a las dos plantillas de intake y a las guías.

**Origen.** La constatación de que el framework no tenía glosario propio y de que sus dos términos centrales estaban definidos por su papel en la herramienta y no por su frontera: `Marco-Teorico-SDD.md` §9 definía *Proyecto* como «unidad de especialización del template» y *Solución* como «agrupación de una jerarquía de N proyectos». Un término definido así absorbe cualquier significado, y eso fue lo que ocurrió: «proyecto» llegó a designar cuatro cosas distintas dentro del mismo árbol generado —la unidad de compilación, la unidad que recibe las categorías 02 a 11, el emprendimiento de `Alcance-Proyecto.md` y, en un destino real, una entidad del dominio del cliente—.

### Añadido
- **`Vocabulario-Rules.md`**, decimoséptimo archivo de reglas y quinta regla transversal. Fija los **seis términos** con definición por frontera —producto, unidad de entrega, módulo, solución de código, proyecto de código, proyecto—, los **cuatro planos de identidad** de un producto, cinco reglas de uso, la tabla de confusiones que cierra, la precedencia frente al glosario del dominio del cliente y la correspondencia con el vocabulario de industria.
- **Los cuatro planos de identidad como campos propios**: `Nombre-Producto` (prosa de negocio), `Slug-Producto` (Título-Con-Guiones, deriva del anterior), `Raiz-Codigo` (identidad de código, **se declara**) y `Artefacto-Agrupacion` (el agrupador de construcción, que el framework no modelaba). Ninguno se distingue de otro solo por capitalización o puntuación.
- **Validación bloqueante de independencia** en `Master-Prompt.md` §3.2 e `Intake-Rules.md` §4: si `Slug-Producto` y `Raiz-Codigo` son la misma cadena salvo por la puntuación, el campo de negocio fue completado con un nombre de artefacto de código y la derivación no procede.
- **Regla de choque de vocabulario** en `Intake-Rules.md` §5: si el glosario del dominio del cliente usa uno de los seis términos con otro sentido, el intake debe declarar el choque y definir los dos usos. Es bloqueante. Convierte en procedimiento lo que cada destino venía resolviendo por reacción y de manera distinta.
- **Declaración de nivel en la cabecera de cada regla** (`Vocabulario-Rules.md` §4 R3): producto, proyecto de código, o ambos. El nivel fija qué nombre usa el documento en su prosa.
- **Ejemplo de raíz de código multi-segmento** en `PRODUCT-MANIFEST-template.md` §5 (`Contoso.Turnos`). Los dos ejemplos anteriores eran de un solo segmento y ocultaban el caso que el framework no podía expresar.

### Cambiado
- **`Raiz-Codigo` se declara, ya no se deriva.** `Master-Prompt.md` §3.2 obligaba a obtenerla del nombre legible «concatenando sin separadores», cláusula que hacía inexpresable cualquier raíz de espacio de nombres de más de un segmento —la forma normal en .NET, Java y Python— y que forzaba a escribir la identidad de código en el campo de negocio.
- **`SOLUTION-INTAKE` → `PRODUCT-INTAKE` y `SOLUTION-MANIFEST` → `PRODUCT-MANIFEST`**, con sus dos plantillas renombradas.
- **Identificadores**: `Nombre-Solucion` → `Slug-Producto`; `NombreSolucionCodigo` → `Raiz-Codigo`; `Nombre-Proyecto` → `Nombre-Proyecto-Codigo`; `nombre-proyecto-codigo` → `Identidad-Codigo`; `project_type` → `tipo_proyecto_codigo`.
- **Artefactos generados**: `Alcance-Proyecto.md` → `Alcance-Producto.md` (elimina el sentido «emprendimiento» del árbol), `Arquitectura-Solucion.md` → `Arquitectura-Proyecto-Codigo.md`, `Vista-Solucion.md` → `Vista-Producto.md`, `Pipeline-Solucion.md` → `Pipeline-Producto.md`, y la carpeta `SDD/Docs/Solucion/` → `SDD/Docs/Producto/`.
- **Esqueleto de despacho de `Master-Prompt.md` §8**: la línea de contexto repetía `{{NOMBRE_SOLUCION}}` dos veces en dos posiciones que debían llevar nombres distintos. Pasa a declarar los cuatro planos, cada uno con su marcador.
- **Bloque informativo de `Master-Prompt.md` §3.4**: imprimía tres líneas que declaraban formatos y parecían el mismo nombre escrito distinto. Pasa a declarar cuatro conceptos con su plano.
- **Redacción de D8**, que decía «conjunto cerrado de tipos de proyecto». El conjunto de ocho valores no cambia.

### Preservado deliberadamente
- **«Módulo» conserva su sentido funcional.** Se verificó que ya designaba un área funcional del producto en 37 lugares del framework y en los destinos reales —barra de navegación de módulos, acento por módulo, módulos incluidos en el plan de pruebas—. Usarlo para la unidad de compilación habría creado una colisión nueva en el plano de UX y de pruebas.
- **«Proyecto» a secas queda para el emprendimiento**, con una excepción declarada y única: los compuestos `multi-proyecto`, `inter-proyecto` y `cross-proyecto`, donde el calificador no entra sin deformar la palabra.
- **`SDD/Devs/Bootstrap/` y `_legacy/` no se tocaron**, por la regla de que un registro que se corrige después deja de ser un registro. El vocabulario que conservan era el vigente en su momento.
- **«Solución» sobrevive en un solo compuesto, «solución de código»**, donde significa exactamente lo que significa en el ecosistema. Es lo que elimina la homonimia con el archivo de solución de .NET.
- **El nivel de unidad de entrega queda definido pero sin materializar.** `Vocabulario-Rules.md` §8 lo declara como pendiente: hoy las once categorías de nivel producto cuelgan de un nivel poblado con proyectos de código, y reubicarlas es una intervención estructural aparte. `tipo_proyecto_codigo` conserva D8 por la misma razón.

### Impacto sobre destinos existentes
Los árboles generados bajo 4.x declaran su procedencia y la reconciliación normativa de `Master-Prompt.md` §2.1 los clasifica como desfasados. Ninguno se renombra retroactivamente: el usuario elige entre plan de adecuación, regeneración o continuar bajo la versión de origen, y el conjunto 4.1 queda archivado en `_legacy/4.1/` para poder aplicarlo.

## [4.1] - 2026-07-29

Vocabulario de roles, autoridad de decisión de AG-00 y defectos verificados. Sube minor: precisa el alcance de una especialidad y corrige defectos, sin modificar ninguna invariante D1-D9 ni el conjunto de artefactos de ninguna categoría. Ninguna documentación ya emitida deja de cumplir.

**Origen.** Un análisis externo del framework centrado en cómo quedaron definidos los conceptos de solución, producto, solución de código y proyecto. De sus hallazgos, esta entrada aplica los que **no requerían decidir nada**: los defectos contrastables contra el árbol y la acotación de AG-00, que el propio framework ya había vuelto innecesaria sin actualizar el texto.

### Corregido
- **Los ejemplos de `Nombre-Solucion` y `Nombre-Proyecto` usaban minúsculas**, variante que D3, el algoritmo de `Master-Prompt.md` §3.2 y **tres archivos de reglas** prohíben textualmente («quedan prohibidas las variantes todo-minúsculas»). El defecto se propagaba al nombre de archivo: `SOLUTION-MANIFEST-template.md` §5 declaraba `Nombre-Solucion` = `gestion-de-turnos` y en la fila siguiente citaba `SOLUTION-INTAKE-Gestion-De-Turnos.md`, siendo el patrón `SOLUTION-INTAKE-<Nombre-Solucion>.md`. 66 ocurrencias normalizadas en cuatro archivos. `SDD-User-Guide.md` §4.1 definía Título-Con-Guiones como «(minúsculas, …)», definición que se contradice a sí misma.
- **`SOLUTION-MANIFEST-template.md` no declaraba su versión en cabecera.** Era el único artefacto de `Intake/` sin campo `Versión` legible. La plantilla de intake había corregido el mismo defecto en su 1.3, declarándolo «una aplicación incompleta de D6 sobre las plantillas»; la corrección no se había propagado a la otra plantilla.
- **Las fichas de AG-10 y AG-11 del catálogo de especialidades estaban intercambiadas.** `Marco-Teorico-SDD.md` §4.2 declaraba AG-10 como Technical Writer y AG-11 como Developer Advocate, al revés de lo que declaran `Rules-Examples.md`, `Rules-Documentacion.md` y la tabla resumen §4.3 del propio marco. **La entrada 1.7 de su control de cambios afirma haber actualizado §4.2** en el intercambio 10 ↔ 11 del 2026-07-28: el registro declaraba una corrección que no se había aplicado a las fichas. Arrastraban la misma inversión el diagrama de trazabilidad de §4.4 y las interacciones cross-rol de AG-03.
- **Cuatro rutas `rules/` obsoletas** en el manifiesto, el master-prompt y el marco teórico. La del master-prompt caía en el primer paso de la fase de validación de intake.
- **El árbol de ejemplo del intake §16 contradecía el layout del orquestador**: mostraba `docs/` y `devs/Intake/` donde `Master-Prompt.md` §3.5 fija `SDD/Docs/` y `SDD/Intake/`. Es el ejemplo que el usuario copia, así que el defecto se propagaba a cada intake real.
- **El flag `equipo_n` declaraba un origen inexistente.** `Master-Prompt.md` §4 decía leerlo de «SOLUTION-INTAKE §2 (stakeholders) o §10 (restricciones)», y ninguna de las dos secciones pedía la cantidad de personas del equipo: §2 pide una tabla de roles y §10 pide presupuesto, fecha, normativa e integraciones. El flag gatea la emisión de `Acuerdo-Equipo.md` y la forma de la categoría 07.
- **Cuatro referencias al `BRIEF`**, plantilla deprecada desde la unificación de intake del 2026-06-10, y **residuos del intercambio 10 ↔ 11** en `Rules-Contexto.md`, cuya §1.1 decía «11 (examples)»: el número nuevo con el significado viejo. La ruta `03-UX-UI/` de la tabla §4.3 pasa a `03-UX-UI-DX/`.

### Cambiado — la autoridad de decisión de AG-00
- **`Rules-Contexto.md` (2.0 → 2.1) parte la responsabilidad de la especialidad.** Su §1.1 declaraba que la responsabilidad principal de AG-00 era «completar lo que el cliente todavía no dijo: **forzar la priorización MoSCoW, declarar exclusiones explícitas**, traducir aspiraciones en objetivos SMART». La frase mezcla dos comportamientos incompatibles: **formalizar lo implícito**, que es trabajo de Product Manager y se conserva, y **decidir lo no decidido**, que es arbitraje de Product Owner y se retira.
- **Por qué.** AG-00 corre aguas abajo del punto en que el humano ya confirmó el intake y el manifiesto. Una prioridad decidida ahí entra a la cadena D6 habiendo pasado el audit y ninguna aprobación, y es indistinguible de una decidida por el Product Owner: el audit verifica completitud, forma y coherencia interna, no fidelidad a una intención que nunca se expresó, y D9 declara explícitamente que no aplica a afirmaciones de contexto, que es lo que produce esta categoría. El riesgo no es que el agente invente mal, es que invente bien.
- **La arbitración ya era innecesaria y el texto quedó sin actualizar.** `Intake-Rules.md` §5 valida, antes de despachar cualquier subagente, que §4 tenga MoSCoW con Must mínimo y §9 al menos tres exclusiones. La frase proviene de `Rules-Contexto.md` **1.0, del 2026-05-17**, generada en el bootstrap; `Intake-Rules.md` no existió hasta el **2026-06-10**. Ninguna versión intermedia revisó ese párrafo.
- **`Rules-Plan-Sprint.md` (2.0 → 2.1)** deja de llamar «Product Owner / Backlog» a AG-06, que su propio archivo de reglas y el catálogo definen como Scrum Master, y explicita que no reprioriza.
- **`Marco-Teorico-SDD.md` §5.5** corrige el mapeo del rol Scrum Product Owner, que apuntaba a AG-00. La ficha de AG-00 siempre declaró el alias como «Product Owner senior **en contextos donde el rol no existe formalmente**»; la tabla de correspondencias había dejado caer la condición. Se restituye.

### Añadido
- **Product Owner y stakeholder como términos declarados**, con entradas de glosario en `Master-Prompt.md` §15 y `SDD-User-Guide.md` §10.1. El Product Owner es un rol humano aguas arriba del intake, **fuera de la cadena AG-XX**, dueño de la priorización y de las exclusiones. El stakeholder es una categoría de relación, parcial y plural, que aporta el material que el Product Owner arbitra. El framework ya usaba «Product Owner» sin traducir en cinco archivos de reglas; faltaba en el único documento que el rol escribe.
- **Campo `Product Owner` en la cabecera del intake** y nota que declara quién es responsable del documento: el PO es el autor del contenido y quien aprueba, y la redacción puede estar asistida por un agente sin que eso delegue la autoría. La pregunta bloqueante de §2 se desdobla: fusionaba al Product Owner con la categoría de stakeholder «propietario», que no son lo mismo —quien financia también es propietario y no por eso es el PO—.
- **`Rules-Contexto.md` §6.1, catálogo de ambigüedades de la categoría**: dieciocho ítems que AG-00 verifica **antes de redactar**, con el criterio que distingue formalización de decisión. Complementa el mecanismo reactivo de `Master-Prompt.md` §9 poniéndole un piso: enumera qué buscar en lugar de esperar a tropezarse con ello. Es el piloto de un patrón replicable a las once categorías restantes.
- **`Coherencia-Roles-Y-Defectos-Verificados.md`**, nota de coherencia con el inventario, la evidencia de cada defecto, la verificación D1-D9, la trazabilidad en seis eslabones y cinco observaciones.

### Preservado deliberadamente
- **`SDD/Devs/Bootstrap/` no se tocó**, por la regla de que un registro que se corrige después deja de ser un registro. Las referencias al `BRIEF` que ese directorio conserva son correctas: citan el estado vigente en su momento.
- **La triple asignación de la priorización queda cerrada solo en AG-00.** `Rules-Necesidades-Negocio.md` y `Rules-Backlog-Tecnico.md` conservan su mandato sobre la prioridad; corregirlos requiere que el Product Owner esté declarado, cosa que esta entrada recién habilita.
- **No se creó snapshot en `_legacy/`.** El archivado por versión rige por conjunto normativo publicado, y esta entrada no publica una versión mayor: la 4.0 sigue siendo el conjunto de referencia y su primera subcarpeta se crea cuando sea superada.

## [4.0] - 2026-07-28

Normalización del versionado y del archivado. **Sube major: se modifican las invariantes D4 y D5**, y la documentación generada con la nomenclatura anterior deja de cumplir.

**Origen.** El framework tenía **dos lógicas de versionado conviviendo dentro de cada plano**. En el propio repositorio, 34 archivos usaban nombre estable con la versión en la cabecera y 11 la llevaban en el nombre, de los cuales 4 mentían: el marco teórico iba por la versión 1.8 dentro de un archivo llamado `-v1.0.md`. En la documentación generada, la mayoría de los artefactos llevaba la versión en el nombre y nueve clases no la llevaban. **En los dos planos los defectos aparecieron en la frontera entre ambas lógicas**: la pérdida silenciosa de dos README de sección durante una corrida real, y los cuatro nombres desactualizados del framework, son el mismo choque visto de los dos lados.

### La regla única

En la carpeta de trabajo hay **un solo archivo por nombre lógico, sin sufijo de versión**. La versión vive en el campo `Versión` de la cabecera. Al ser superado, el archivo se copia completo a `_legacy/`, y **la copia archivada sí recibe el sufijo**. Aplica a los dos planos, sin excepciones de nombre.

Tres propiedades se siguen de la regla: cuál es la versión vigente deja de ser algo que hay que verificar y pasa a ser una propiedad estructural del árbol; subir de versión no propaga ninguna actualización de referencias, porque los enlaces apuntan a un nombre que no cambia; y un agente que lee una carpeta ingiere un solo ejemplar de cada documento.

### Cambiado
- **`README.md`**: D4 pasa a declarar que el archivo vivo lleva nombre lógico estable y que el sufijo `-v<X.Y>.md` identifica a las copias archivadas. D5 pasa a declarar que una sola versión vigente **es** un solo archivo por nombre lógico en la carpeta de trabajo. Se agrega la nota que explica la duplicidad anterior y por qué se elimina en lugar de parchearse, la fila de `_legacy/` en el mapa del repositorio y una fila de intervención para publicar una versión nueva del framework. Se agrega además el **criterio de qué se conserva y qué se reexpresa en una nota de coherencia**: el alcance verificado no se toca nunca, y una verificación concreta se reexpresa solo si quedaría falsa contra el árbol vigente o citaría un archivo que ya no existe.
- **Las cuatro notas de coherencia reexpresan su celda de D4** —la del marco teórico y las tres del catálogo de diseño— porque afirmaban que ciertos archivos llevaban sufijo de versión en el nombre y eso dejó de ser cierto. Cada celda declara bajo qué versión de la invariante se hizo la verificación original. **Las celdas de D5 quedan intactas**: afirmaban un único archivo por nombre lógico sin copias paralelas, que sigue siendo cierto bajo la formulación nueva.
- **Once archivos renombrados** a su nombre lógico estable: el marco teórico, la nota de coherencia del marco, los tres documentos de coherencia del catálogo de diseño y los seis `Design-Rules-*`. **163 referencias actualizadas** en 23 archivos, con cero enlaces rotos. Los `Design-Rules` previstos del roadmap del índice también pierden el sufijo, porque ese listado fija la convención de nombre.
- **`Master-Prompt.md` (3.7 → 4.0)**: §3 completa el bloque de procedencia del framework al derivar el manifiesto. §5 reescribe las celdas de versionado, deprecación y sufijo. §5.1 reescribe el detalle operativo alrededor de la regla única, con su ejemplo de árbol y las tres propiedades que se siguen.
- **Los dieciséis archivos de reglas suben major**: patrones de nombre, ejemplos, cabeceras modelo, anti-patrones y criterios de aceptación pasan a la nomenclatura sin sufijo. **751 nombres de artefacto normalizados** en 24 archivos, incluidas las dos guías de usuario, el prompt de entrada, las plantillas de intake y el marco teórico.
- **`SOLUTION-MANIFEST-template.md`**: §1.1 nueva con el bloque de procedencia del framework, que declara la versión del conjunto y la de cada regla aplicada. El perfil de convención de nombres pasa a §1.2.
- **`SDD-Development-Guide.md` (1.1 → 1.2)**: §I.2 suma `_legacy/` a la anatomía; §VI.4 declara que congelar la versión anterior depende de la procedencia y del snapshot; **§VI.5 nueva** con el versionado del framework como conjunto.

### Añadido
- **`_legacy/`** en la raíz del framework, con su README. Una subcarpeta por versión publicada, con el **conjunto normativo completo** —no los archivos que cambiaron— porque las reglas son interdependientes y lo que hay que poder reconstruir es el estado coherente. Un snapshot son unos 50 archivos y 1,5 MB, y se toma una vez por entrada de este changelog. **Rige desde la 4.0 hacia adelante**; las versiones anteriores solo son recuperables desde el historial del control de versiones, con el mismo criterio con que se incorporó D9.
- **Criterio de reexpresión de las notas de coherencia**, en el `README.md`. El **alcance** de lo que una nota verificó no se toca nunca: una nota que verificó D1 a D8 sigue diciendo D1 a D8. Una **verificación concreta** se reexpresa solo cuando quedaría falsa contra el árbol vigente o citaría un archivo inexistente; no alcanza con que la invariante haya cambiado de forma. La versión 4.0 es el ejemplo: D4 y D5 se reformularon las dos, pero solo las celdas de D4 se reexpresaron, porque las de D5 siguen siendo ciertas bajo la formulación nueva. Sin esta distinción el framework quedaba con dos prácticas opuestas para el mismo artefacto.
- **El `CHANGELOG.md` queda declarado como el mecanismo de versionado del framework.** El control de versiones vuelve a ser control de código fuente y nada más: reconstruir una versión no requiere tags ni ramas, porque el árbol se autocontiene.

### Corregido
- **Los checklists de D4 eran tautológicos.** Al menos seis reglas verificaban «Ningún archivo usa el patrón `-v<X.Y>.md`; todos usan `-v<X.Y>.md`», con los dos patrones idénticos, y `Rules-Contexto.md` daba un ejemplo inválido idéntico a los válidos. Una normalización anterior había convertido el patrón prohibido `.v<X.Y>.md` en el permitido y había vaciado de sentido toda línea que los contrastaba. Un auditor que los corriera pasaba siempre. Reescritos contra la regla nueva.
- **Campos `Documento` que no coincidían con su archivo**: cuatro notas de coherencia se declaraban con un prefijo de guion bajo que ningún archivo tenía.
- **Las cuatro notas de coherencia quedaban contradiciéndose a sí mismas** tras el cambio de D4: sus filas de inventario nombraban los archivos sin sufijo mientras sus celdas de verificación seguían afirmando que lo llevaban. Se readecuaron a las reglas vigentes, **declarando la reexpresión en la propia celda** e indicando bajo qué versión se hizo la verificación original. De paso citaban `Guia-Usuario-SDD-v1.0.md`, un archivo que nunca existió con ese nombre.
- **`§6.5` de `Maqueta-Rules.md` no existe**, y tres archivos lo citaban. §6 es una lista numerada sin subsecciones y la verificación de ofuscación es su punto 5. Defecto preexistente, verificado contra el estado anterior del repositorio.
- **`Master-Prompt.md` §0 titulaba «Modelo de dos repositorios»** mientras el `README.md` y la guía de arranque declaran tres. Reescrito: el framework opera sobre tres, el orquestador sobre dos de ellos y el tercero no lo toca nunca.
- **Cita ambigua a `§3.1`** en la derivación del manifiesto, que se leía como si la sección fuera del formato del manifiesto y no del propio master-prompt.

### Añadido — fase de reconciliación normativa

Hasta ahora, ante un `SDD/Docs/` con contenido previo el orquestador solo ofrecía **archivar todo y empezar de cero, o abortar**. No miraba con qué versión se había generado ese árbol ni proponía nada. Con la procedencia declarada y el archivado por versión, esa limitación deja de tener sentido.

- **`Master-Prompt.md` §2.1, nueva.** Se dispara solo si `SDD/Docs/` tiene contenido. Distingue tres casos: sin procedencia declarada (árbol anterior a que la procedencia existiera, se ofrece solo regenerar o abortar y se explica por qué), al día (lo informa y sigue) y desfasado (ejecuta la comparación). El diff normativo se arma sin despachar subagentes: lee la procedencia del manifiesto, lee las versiones vigentes de cabecera, clasifica cada salto por severidad leyéndola de la propia numeración, y para cada salto major enumera los artefactos que esa regla gobierna según su tabla maestra de documentos.
- **Tres salidas, con detención obligatoria.** **A** emite un plan de adecuación en `SDD/Docs/Audit/Reconciliacion-<origen>-a-<vigente>.md`, documento por documento y sin modificar nada. **B** regenera desde cero, que es el comportamiento histórico. **C** continúa bajo la versión de origen, leyendo sus reglas desde `_legacy/<version>/`; no se ofrece si ese conjunto no es reconstruible, porque el orquestador no puede aplicar reglas que no puede leer.
- **La decisión C se registra** en el manifiesto (`SOLUTION-MANIFEST-template.md` §1.1, tabla de decisiones de reconciliación). Sin registro, el arranque siguiente vuelve a preguntar lo mismo y el usuario vuelve a contestarlo sin memoria de haberlo hecho.
- **Prohibiciones de la fase**: no modificar ningún documento, no elegir salida por cuenta propia ni siquiera cuando no hay impacto, y no declarar reconstruible un conjunto de origen sin verificar que existe, porque es una afirmación sobre el estado del sistema y D9 exige evidencia.
- Propagado a `PROMPT-Agente-Bootstrap-SDD.md` (prerrequisito 4), `SDD-Getting-Started-Guide.md` (troubleshooting), `SDD-User-Guide.md` (lista de fases y glosario) y `Master-Prompt.md` §0, §3.5 y §7.

### Añadido — navegabilidad y anexos de datos del intake

Sintetizado del patrón que **dos intakes reales desarrollaron por su cuenta** sobre la plantilla 1.3, en dos soluciones sin relación entre sí. La convergencia entre ambos es la evidencia de que faltaba en la plantilla.

- **Tabla de contenido obligatoria** en el `SOLUTION-INTAKE`, después de la cabecera, con las secciones de primer y segundo nivel y con cada escenario de la Parte D listado por identificador. El framework ya la exigía a los documentos que genera; el intake, que es el que más agentes leen y que en la práctica supera las dos mil líneas, era la excepción injustificada.
- **Formato por escenario de §20, de tres piezas a cinco.** Suma **contexto** (qué situación real representa), **qué ejercita** (del modelo, las reglas y los invariantes) y **qué verificar** (traducción directa a casos de prueba). El último es el que convierte un JSON en fixture: es lo que `08-Calidad-Y-Pruebas` toma como criterio de aceptación y lo que `10-Examples` convierte en contrato de verificación.
- **`Estado` del dato como enum cerrado**: `medido`, `declarado`, `derivado`, `reconstruido`. Es la regla de evidencia D9 aplicada a los datos de ejemplo, con la consecuencia declarada de que un valor `reconstruido` no es una medición y no se presenta como tal.
- **Recomendación de encadenar los escenarios** como una única línea de tiempo coherente en lugar de emitirlos sueltos: un conjunto encadenado sirve de juego de datos para un *end-to-end* completo.
- **`Intake-Rules.md` (2.0 → 2.1) valida ahora la Parte D**, que hasta acá no verificaba nadie: presencia de los cuatro bloques por escenario, `Estado` dentro del enum, tabla de contenido con los escenarios listados, **regla de resolución de identificadores en las dos direcciones** (toda cita tiene anexo y todo anexo está citado) y **regla de autocontención**. Las dos reglas existían declaradas en la plantilla desde su 1.3 y ninguna validación las comprobaba.

### Preservado deliberadamente
- Las entradas anteriores de este changelog y los archivos de `SDD/Devs/Bootstrap/` **conservan los nombres que citaban en su momento**, según `SDD-Development-Guide.md` §VI.2 y la regla de que `Bootstrap/` nunca se edita. Un registro que se corrige después deja de ser un registro.

**Sobre el primer snapshot de `_legacy/`.** No se creó ninguno en esta versión. Las entradas `[3.2]` y `[4.0]` se produjeron en una misma sesión de trabajo sobre el estado `[3.1]`, así que no existe un árbol publicado intermedio que preservar. El archivado por versión rige desde la 4.0 hacia adelante: su primera subcarpeta se crea cuando la 4.0 sea superada. Fabricar un snapshot reconstruido sería un registro falso, que es justamente lo que la regla de intocabilidad de `_legacy/` prohíbe.

## [3.2] - 2026-07-28

Reparación de la política de deprecación y del archivado en `_legacy/`. Sube minor: precisa políticas existentes y agrega una sección al esqueleto de despacho, sin modificar ninguna invariante D1-D9 ni el conjunto de artefactos de ninguna categoría. Ninguna documentación ya emitida deja de cumplir.

**Origen.** Ocho hallazgos verificados sobre la política de archivado, cinco reportados por la evaluación de una corrida real del orquestador sobre una solución de cuatro proyectos y tres detectados al contrastarlos contra el framework. Cuatro de ellos comparten el mismo mecanismo: un artefacto se sobrescribe sin que ningún actor reciba error y sin que el directorio se vea incorrecto.

### Cambiado
- `Master-Prompt.md` (3.6 → 3.7). **§3.5**: el layout declara `SDD/Docs/Audit/`, que §10 escribía sin que ninguna fuente de estructura la declarara, y explica dónde aparece `_legacy/` y por qué no ocupa una posición fija. **§5**: la política de deprecación unifica la ruta en `<carpeta-del-artefacto>/_legacy/<YYYY-MM-DD>/` e incorpora los requisitos de estado `Superado` y nota a la versión vigente, que hasta ahora vivían solo en las reglas de categoría y por eso no llegaban al bloque de invariantes que §8 inyecta a los subagentes; la política de versionado incorpora el criterio de estado de cabecera para las correcciones derivadas del audit de la propia fase de emisión. **§7.2**: declara el versionado por corte de cadencia en el tramo de documentación viva y exceptúa a las Fases I y J de la regla de snapshot previo. **§8**: el esqueleto de despacho suma la sección «Estado previo del entregable», y el snapshot queda asignado al orquestador y no al subagente. **§10**: el path del informe de auditoría suma el eje de ronda.
- `Root-Rules.md` (1.4 → 1.5), `Rules-Contexto.md` (1.5 → 1.6), `Rules-Necesidades-Negocio.md` (1.4 → 1.5), `Rules-Examples.md` (2.0 → 2.1), `Rules-Documentacion.md` (2.0 → 2.1): cada una declara que su artefacto emitido sin sufijo de versión sí lo recibe al archivarse, con puntero a la regla general.

### Añadido
- `Master-Prompt.md` **§5.1**, sección nueva con el detalle operativo de la política de deprecación: la ruta única con su lectura de las abreviaturas de las reglas de categoría y el caso distinto de `SDD/Docs/_legacy/` del prerrequisito 4; el sufijo de versión que reciben al archivarse los artefactos emitidos sin sufijo; la tabla de cinco exenciones declaradas (`AGENTS.md`, `CHANGELOG.md`, maqueta, ADR y el campo `evidencia` de los contratos `VER-XX`); y la prohibición de renombrar retroactivamente lo ya archivado, porque etiquetar con una versión un archivo cuyo contenido no se verificó viola D9.

### Corregido
- **Ruta de archivado sin eje de proyecto.** `_legacy/<categoria>/<fecha>/` no tenía forma de distinguir dos proyectos que archivaran la misma categoría el mismo día. La ruta local a la carpeta del artefacto lo resuelve por construcción.
- **Artefactos sin sufijo de versión imposibles de archivar.** Seis clases de artefacto se emitían sin sufijo y se archivaban identificándose por nombre de archivo: el segundo archivado del mismo día sobrescribía al primero. Produjo pérdida real en dos README de sección durante la corrida que originó la evaluación.
- **Re-audit que sobrescribía su informe.** El path del informe de auditoría estaba fijo en `-v1.0` y §10 obliga a re-audit tras un veredicto RECHAZADO. El eje de ronda lo corrige, y con él la trazabilidad de las correcciones, que citan el hallazgo del informe que las origina.
- **Dos erratas de formato preexistentes**: la fila D9 de `Master-Prompt.md` §5 y la fila 3.4 de su §16 estaban separadas de sus tablas por una línea en blanco que las rompía como markdown.
- **Referencia colgada** en `SDD-Development-Guide.md` §2 a `SDD/Devs/Intake/_legacy/`, carpeta eliminada en la entrada 3.1 de este changelog.

## [3.1] - 2026-07-26

Eliminación de material histórico absorbido. No cambia ninguna regla ni el comportamiento del orquestador.

### Eliminado
- `SDD/Devs/Reformulacion/` (4 archivos, 80 KB): `Matriz-Coherencia-Template-v1.0.md` (línea base ST-01), `Propuesta-Modelo-Solucion-Jerarquia-v1.0.md` (ST-02, APROBADA e implementada), `Audit-Reformulacion-Final-v1.0.md` (ST-09, APROBADO sin P0) y `Audit-Unificacion-Intake-v1.0.md` (APROBADO sin P0). Documentaban la reformulación a modelo de solución con jerarquía de proyectos y la unificación del intake, ambas consumadas: el modelo que proponen **es** el framework vigente y los audits cerraron aprobados.
- `SDD/Devs/Intake/_legacy/2026-06-10/` (2 archivos, 56 KB): `PROJECT-BRIEF-template.md` y `PROJECT-README-template.md`, las dos plantillas que el `SOLUTION-INTAKE` unificado reemplazó.

**Criterio aplicado.** Un registro histórico se conserva mientras alguien lo cite o mientras explique algo que las reglas vigentes no expliquen por sí solas. Estos seis archivos no cumplían ninguna de las dos condiciones: cero referencias entrantes desde archivos vivos, y su contenido íntegramente absorbido en las reglas y en las entradas 2.0 a 2.5 de este changelog. El historial de git los preserva y son recuperables.

**No se tocó `SDD/Devs/Bootstrap/`.** Su `Audit-SDD1.md` es la evidencia empírica de las invariantes: siete archivos de reglas lo citan para justificar qué déficit del fuente corrigen. Eliminarlo dejaría a esas reglas diciendo «hacé X» sin poder decir por qué.

### Cambiado
- `README.md` y `SDD/Guides/SDD-Development-Guide.md`: la anatomía del repositorio pierde la fila de `Reformulacion/`, y la descripción de `Bootstrap/` deja de decir «registro histórico congelado» para declarar lo que realmente es, una fuente citada. La guía de desarrollo suma el criterio general para decidir cuándo un registro histórico se conserva y cuándo se elimina.

## [3.0] - 2026-07-26

Intercambio de las categorías 10 y 11, redefinición del cuerpo documental de entrega e incorporación del ciclo de documentación viva posterior al handoff. Sube major porque cambia el alcance y el gating de dos categorías, y porque la documentación generada con la numeración anterior deja de cumplir.

### Añadido
- `SDD/Guides/SDD-Development-Guide.md` (nuevo, 1.0): guía de desarrollo y extensibilidad del framework, para el mantenedor del framework y no el de una solución. Anatomía, seis contratos internos hasta ahora no escritos, **nueve** ejes de extensión con ejemplo trabajado, criterios, once anti-patrones y procedimiento de cambio. El archivo existía vacío desde su creación.
- `README.md` raíz: reescrito como superficie de entrada. Matriz de ruteo por intención, anatomía del repositorio, mapa de las doce categorías, invariantes D1 a D9 enunciadas y reglas de intervención.
- `Rules-Documentacion.md` (2.0): cuerpo documental de entrega organizado por rol de intervención, con artefactos de nivel solución (`Vision-General-Sistema`, `Guia-Inicio-Rapido`, `Guia-Despliegue`, `Bitacora-Eventualidades`, `Contrato-Agentes`, `AGENTS.md`) y tres cuerpos de proyecto: integrador, mantenedor y operador. Modelo de documentación viva en tres momentos, cadencia anclada al cierre de sprint, ensayo de entrega con gate humano y bitácora de eventualidades con triaje obligatorio. Identificadores `OPS-XX`, `EXT-XX` y `EVE-XX`.
- `Rules-Examples.md` (2.0): doble arista del sample. Contrato de verificación `VER-XX` con `verifica`, `comando`, `precondiciones`, `criterio_aceptacion` y `evidencia`, y dos pasadas de generación, de diseño pre-código y de ejecución durante la codificación.
- `Master-Prompt.md` (3.6): Fases I y J, con la precondición dura de la Fase I, su criterio de re-ejecución y diez hallazgos P0 propios. `AGENTS.md` como única salida fuera de `SDD/`.
- `Deriva-Rules.md` (1.1): sondas `VER-XX` en la matriz de sensado. Los proyectos sin interfaz visual dejan de quedar sin instrumento de sensado.
- `SDD-User-Guide.md` (1.5): §4.8 con el paso 7 del usuario y seis entradas de FAQ nuevas, F-24 a F-29.

### Cambiado
- **Intercambio 10 ↔ 11.** `Rules-Developer-Guide.md` pasa a `Rules-Documentacion.md`; la categoría de ejemplos pasa de 11 a 10 y la de documentación de 10 a 11. Carpetas target `10-Examples/` y `11-Documentacion/`. Subagentes reasignados: AG-10 Developer Advocate y AG-11 Technical Writer / Documentation Lead. La dependencia se invierte: 10 demuestra con código ejecutable y verificable, 11 explica, referencia y enlaza.
- **Gating de la categoría 11.** Deja de ser opcional para cuatro tipos D8 y pasa a existir siempre, con granularidad por cuerpo. El cuerpo mantenedor es obligatorio para los ocho tipos.
- **Orden de fases.** La Fase F queda solo con 09-Devops; la Fase G produce la pasada de diseño de 10-Examples; la Fase H suma el plan documental de 11. El handoff cierra el tramo de especificación y no el alcance del framework.
- **Definition of Done del sprint** (`Rules-Plan-Sprint.md` 1.4): incorpora la actualización de la categoría 11 como condición de cierre.
- **Fronteras declaradas en las dos direcciones**: `Rules-Arquitectura-Tecnica.md` (1.4), `Rules-Calidad-Y-Pruebas.md` (1.6) y `Rules-Devops.md` (1.6) declaran su frontera con la categoría 11. Sin esto, el subagente de esas categorías no la conoce, porque cada uno lee un solo archivo de reglas.
- **Tabla de contenido** exigida en los documentos generados por las diez categorías de 00 a 09, cuando superan las tres secciones de primer nivel.
- **Vocabulario de actores normalizado**: «consumidor» pasa a «integrador» y «constructor» a «mantenedor» donde designan un rol de intervención; «audiencia» pasa a «rol de intervención» donde designa a quien lee documentación. Se conservan los usos técnicos y la categoría de stakeholder del intake.
- **Referencias a la sección de anti-patrones**: el orquestador las citaba como «§4.5», numeración que solo coincidía en siete de los trece archivos de reglas. Ahora se las ubica por título.
- `SDD-Getting-Started-Guide.md` (1.1) y `Marco-Teorico-SDD-v1.0.md` (1.7): puestos al día con la numeración nueva.

### Corregido
- **Contradicción entre `Rules-Calidad-Y-Pruebas.md` y `Deriva-Rules.md`** (1.6 → 1.7). La categoría 08 seguía condicionando `Matriz-Sensado-Deriva` a `requiere_maqueta == true` y a haber ejecutado la Fase B2, contradiciendo la extensión del sensado a contratos y comportamiento. Ahora §0 declara las dos clases de sonda y su origen, §2.1 hace la matriz obligatoria también para proyectos con categoría 10, y §6 separa el criterio por clase de sonda y prohíbe la matriz vacía. Sin esta corrección, un proyecto sin interfaz visual seguía quedando sin instrumento de sensado.
- **Nomenclatura de invariantes.** El framework se refería al conjunto como «D1-D8» pese a que son nueve desde la incorporación de D9. Dieciocho ocurrencias normativas pasan a «D1-D9» en el master-prompt, las dos guías de usuario, `Root-Rules.md`, `Rules-Necesidades-Negocio.md`, el marco teórico y el catálogo de diseño, con las enumeraciones completadas. Las notas de coherencia ya emitidas conservan «D1-D8»: verificaron contra el conjunto vigente en su momento.
- **Neutralidad de dominio en la guía de arranque** (1.1 → 1.2). El ejemplo aplicado de §6 nombraba una solución concreta en dieciocho lugares. Pasan al placeholder `<Nombre-Solucion>`, con la descripción del dominio y los flujos de usuario enunciados en términos genéricos.
- **Referencia muerta en el marco teórico** (1.7 → 1.8). El bloque de ejemplo de §11.2 citaba `devs/Rules/decisiones-D1-D8.md`, archivo inexistente, con rutas del layout previo al modelo de tres niveles.
- **Versionado de la plantilla de intake** (1.2 → 1.3). `SOLUTION-INTAKE-template.md` no declaraba su propia versión en cabecera, solo en su control de cambios. Aplicación incompleta de D6 sobre las plantillas.
- **Autosuficiencia del repositorio.** Doce ocurrencias de rutas que apuntaban fuera del árbol quedaron eliminadas. Ningún archivo de `IA.SDD` referencia otro repositorio.

### Impacto sobre documentación ya emitida
La documentación generada con la numeración anterior no se regenera automáticamente. Una solución existente conserva sus carpetas `10-Developer-Guide/` y `11-Examples/` hasta que se ejecute una regeneración parcial de esas categorías. El resto de las categorías no se ve afectado.

## [2.5] - 2026-07-25

Normalización de la nomenclatura de los archivos de reglas: se elimina el prefijo numérico de las doce reglas por categoría.

### Cambiado
- `SDD/Devs/Rules/`: las doce reglas por categoría pierden el prefijo numérico y pasan a `Rules-<Categoria>.md` (`00-Rules-Contexto.md` → `Rules-Contexto.md`, …, `11-Rules-Examples.md` → `Rules-Examples.md`). Las cuatro reglas meta (`Root-Rules.md`, `Intake-Rules.md`, `Maqueta-Rules.md`, `Deriva-Rules.md`) ya cumplían la convención y no cambian. Sin cambios de contenido normativo: no se sube versión de ninguna regla. La numeración de las categorías se mantiene donde sí es semántica: títulos de las reglas (`# Reglas constructivas — 05 Arquitectura técnica`), carpetas destino (`SDD/Docs/05-Arquitectura-Tecnica/`) y fases del orquestador.
- Referencias actualizadas en los 20 markdown del repositorio que citaban los nombres anteriores: `SDD/Devs/Orchestrator/Master-Prompt.md`, `SDD/Guides/SDD-User-Guide.md`, `SDD/Devs/Guides/Coherencia-Auditoria-Marco-v1.0.md`, los nueve documentos de `SDD/Devs/References/Design/`, los cuatro de `SDD/Devs/Bootstrap/`, los tres de `SDD/Devs/Reformulacion/`, las propias reglas y las entradas históricas de este changelog.
- El patrón placeholder `XX-Rules-<Categoria>.md` pasa a `Rules-<Categoria>.md` en `Master-Prompt.md` (§1 y §6), `SDD-User-Guide.md` (§6 y §10 glosario), `Audit-Fase-3.md` y `Matriz-Coherencia-Template-v1.0.md` §2.1.
- `SDD-User-Guide.md` §4.4: la verificación del listado de `Rules/` deja de expresarse como rango `00-Rules-*.md` a `11-Rules-*.md` y pasa a "los doce archivos de reglas por categoría `Rules-*.md` (de `Rules-Contexto.md` a `Rules-Examples.md`)".

## [2.4] - 2026-07-24

Reorganización de las guías de usuario: convención de nombres en inglés y nueva guía de arranque rápido.

### Añadido
- `SDD/Guides/SDD-Getting-Started-Guide.md` (1.0): guía de arranque rápido para primeros pasos con el template, con front-matter estructurado (`doc_id`, `traces` a `SDD-User-Guide.md` y `PROMPT-Agente-Bootstrap-SDD.md`) y orientada a desarrolladores primerizos, analistas, líderes técnicos y agentes de IA.
- `PROMPTS/README.md`: descripción del agente orquestador (borrador inicial).

### Cambiado
- `SDD/Guides/Guia-Usuario-SDD-v1.0.md` → `SDD/Guides/SDD-User-Guide.md`: renombrado a la convención de nombres en inglés, sin cambios de contenido (se mantiene la v1.3).
- `README.md` raíz: se corrige el enlace de la guía de usuario al nombre nuevo (`SDD/Guides/SDD-User-Guide.md`), que había quedado roto tras el rename.

## [2.3] - 2026-07-20

Desacople de la ubicación del repositorio fuente respecto del destino y autocontención de los ejemplos de instancia en el intake.

### Cambiado
- `PROMPTS/PROMPT-Agente-Bootstrap-SDD.md` (2.0 → 2.1): la ubicación del repositorio fuente deja de asumirse hermana del destino. Se introducen los placeholders `<RUTA-FUENTE>` (derivada del path de la invocación, quitando el sufijo `/PROMPTS/PROMPT-Agente-Bootstrap-SDD.md`) y `<RUTA-DESTINO>` (la ruta indicada tras «en el repositorio:»), y se declara `../IA.SDD/` como alias de `<RUTA-FUENTE>/`, lo que cubre las ocurrencias del master-prompt y de las reglas sin editarlas. §1 introduce ambos placeholders y el bloque de invocación; §2 prerrequisito 1 pasa de «clonado como hermano» a «accesible en `<RUTA-FUENTE>`», verificable; §3 invoca al orquestador con las rutas derivadas. Habilita workspaces donde fuente y destino no son hermanas (p. ej. `IA/IA.SDD` y `DEV/<solución>`).
- `SDD/Devs/Intake/SOLUTION-INTAKE-template.md` (1.0 → 1.1): se agrega la **Parte D — Anexos de datos** (§20 escenarios con JSON completo y su procedencia y estado, §21 matriz de cobertura y trazabilidad), la **regla de autocontención** en la guía de uso (paso 5), los ítems de checklist de la Parte D y la fila de trazabilidad downstream. Objetivo: que el intake transcriba los ejemplos de instancia en lugar de referenciar archivos externos que el orquestador aguas abajo no puede resolver. La Parte D es opcional y condicional (existe solo si las fuentes aportan ejemplos), pero cuando existen es su hogar canónico: el cuerpo cita por identificador (`E-1`, `E-2`, …) y el anexo reproduce el dato completo, sin referencias colgantes ni anexos huérfanos.

## [2.2] - 2026-07-19

Incorporación de la Fase B2 de validación visual de maqueta y del mecanismo de sensado de deriva.

### Añadido
- **Fase B2 — Validación visual de maqueta**, opcional y por proyecto, entre la Fase B y la Fase C. Se activa con el flag nuevo `requiere_maqueta`, propuesto por el orquestador y confirmado por el humano. Materializa la especificación de la categoría 03 en una maqueta navegable (HTML, CSS, Bootstrap 5.0 y JavaScript estáticos, sin proceso de build), la valida con el humano en el navegador, retroalimenta la documentación y capitaliza el diseño.
  - `SDD/Devs/Rules/Maqueta-Rules.md`: subagente AG-03M con sus variantes por D8, artefactos, secuencia de siete pasos con tres detenciones, las dos vías de corrección (por prompt y manual, esta última con relectura, interpretación y confirmación antes de propagar), matriz de propagación de la retroalimentación, reglas constructivas de la maqueta, captura del modelo UX-UI, generación del template ofuscado con verificación bloqueante, y el método de lanzado y relanzado con sus tres formas soportadas.
  - `SDD/Devs/Rules/Deriva-Rules.md`: invariante **D9 — evidencia verificable**, con alcance acotado a las afirmaciones sobre el estado del sistema, cuatro condiciones de validez y formato de cita `EV-XX`; los tres artefactos de línea de base (`Linea-Base-Visual`, `Contrato-Datos-Maqueta`, `Matriz-Sensado-Deriva`) con sus identificadores `SUP`, `CMP`, `EST`, `NAV`, `DM` y `SD`; umbrales de deriva menor y mayor por dimensión; los cuatro puntos de sensado.
- **Catálogo de modelos UX-UI** en `SDD/Devs/Modelos-UX-UI/`: `Index-Modelos-UX-UI.md` (arranca vacío) y `Rules-Design-Modelo-Template.md`, la plantilla de captura. Es el tercer eje del sistema de diseño del template, ortogonal al documento base, a las especializaciones por stack y a las extensiones por capacidad; se aplica por encima del base y nunca lo reemplaza.
- **Carpeta `Templates/`** en la raíz del repositorio, con su `README.md` (estructura obligatoria de un template y regla de ofuscación) y `Modelo-Generico/`, el ejemplo de referencia ejecutable que fija la estructura: tres superficies, tokens del catálogo base como variables CSS, fuente única de datos, los cuatro estados conmutables y la superficie de configuración dirigida por esquema.

### Cambiado
- `Master-Prompt.md` (3.3 → 3.4): flag `requiere_maqueta` en §4, invariante D9 en §5, fila de la Fase B2 y dos notas operativas en §6, los nueve pasos de la fase en §7, criterios de audit propios de B2 y de D9 en §10, línea de base y matriz de sensado en el resumen ejecutivo del handoff en §12, seis términos nuevos en §15. Se declara la única excepción de escritura fuera del repositorio destino (captura del modelo UX-UI en `IA.SDD`, con aceptación explícita y ofuscación bloqueante).
- `Rules-UX-UI-DX.md` (1.5 → 1.6): nueva §1.5 con lo que le toca a AG-03 antes y después de la fase, tres artefactos nuevos en la tabla maestra, tres filas de trazabilidad, dos anti-patrones y dos criterios de aceptación condicionados a `requiere_maqueta`.
- `Rules-Calidad-Y-Pruebas.md` (1.2 → 1.3): `Matriz-Sensado-Deriva-v<X.Y>.md` en la tabla maestra y su criterio de aceptación. AG-08 resuelve el método de verificación de cada fila al generar la Fase E.
- `Index-Design-Rules.md` (1.2 → 1.3): nueva §4.1 con el registro del catálogo de modelos UX-UI como tercer eje, el orden de apilado de las cuatro capas y la regla de conflicto.
- `Guia-Usuario-SDD-v1.0.md` (1.2 → 1.3): se agrega la tabla de contenido del documento. Nuevo §4.6 (Paso 5b) con el recorrido completo de la fase; el §4.6 anterior pasa a §4.7. Nuevo §7.4 (agregar un modelo UX-UI). Cuatro entradas de FAQ nuevas (F-20 a F-23). Seis términos nuevos en el glosario. Árbol de carpetas con `SDD/Maquetas/`, las dos reglas nuevas y el catálogo de modelos.
- `Marco-Teorico-SDD-v1.0.md` (1.4 → 1.6): §8.8 (la maqueta como instrumento de diseño y de control) y §9.7 (la deriva como separación acumulativa, la línea de base como referente externo falsable y la fundamentación de D9 y de sus umbrales). Además, puesta al día con el framework vigente: §3.6 y §3.8 corrigen la referencia al master-prompt (v3.0 → 3.4) y el rastro del modelo anterior a los dos repositorios, e incorporan la Fase B2 al diagrama del flujo; §4.1 y §4.3 registran a AG-03M como subagente de fase que no altera el catálogo de 13 especialidades; §13 suma ocho términos. Se agrega la fila 1.5 que el cambio de 2.1 había omitido, en incumplimiento de la política de versionado D5.

### Decisiones registradas
- **El orquestador lanza la maqueta y degrada sin fallar.** Al terminar de construirla levanta un servidor estático local e intenta abrir el navegador con el abridor del sistema. Si no alcanza un entorno gráfico desde donde corre, informa la URL y el comando en lugar de tratarlo como error: el auto-lanzado es una comodidad, la URL informada es el contrato. Para la corrección manual se recomienda el servidor liviano del editor, que recarga solo al guardar y que el orquestador no puede disparar por su cuenta; para el resto de los casos la maqueta trae su propia recarga automática en la barra de validación, apagada por defecto.
- **La maqueta se sirve estática, sin paso de build.** Lo que se edita es lo que se sirve, y es lo mismo que después relee el orquestador; esa equivalencia es la que hace posible la corrección manual del humano. Un paso de build la rompería: obligaría a rebuild para ver cada cambio, dejaría al orquestador sin saber si la verdad es la fuente o el artefacto servido, y metería dependencias en el repositorio destino para un artefacto de vida corta. Tres métodos de lanzado soportados, en orden de preferencia: servidor liviano del editor (en Visual Studio Code, Live Server o equivalente, que recarga solo en cada guardado y es el mejor ajuste para la corrección manual), archivo directo en el navegador, y servidor estático de línea de comandos. La excepción, admitida vía ADR, está en `Maqueta-Rules.md` §7.2.
- **`SDD/Maquetas/` es hermana de `SDD/Docs/`, no está dentro.** `SDD/Docs/` es exclusivamente prosa generada por el orquestador; la maqueta es material ejecutable que el humano edita durante la validación.
- **D9 no se aplica retroactivamente.** Reauditar la documentación previa contra una invariante nueva produciría un volumen de hallazgos que ahoga a los reales.

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
- `Design-Rules-Web-Generico-v1.0.md` (1.1 → 1.2), `Index-Design-Rules.md` (1.1 → 1.2), `Rules-UX-UI-DX.md` (1.4 → 1.5) y `Master-Prompt.md` (3.2 → 3.3): registro, criterio de carga, requisitos de artefacto, trazabilidad, anti-patrones e inyección de las extensiones nuevas en el despacho de AG-03.
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
