# Reglas constructivas — Migración normativa de un destino a la versión vigente

**Carpeta target:** `SDD/Docs/Audit/` del repositorio destino para los dos artefactos propios. El alcance sobre el que la migración opera es `SDD/Intake/` y `SDD/Docs/` del mismo repositorio
**Nivel de aplicación (`Vocabulario-Rules.md` §4 R3):** Producto y proyecto de código
**Subagente target del orquestador:** el orquestador de migración para el plan y el cierre; el auditor independiente para el informe; el subagente titular de cada categoría para re-expresar los documentos de esa categoría
**Versión de las reglas:** 1.0

Dentro de este archivo «migración» se usa en forma desnuda, según la excepción que `Vocabulario-Rules.md` §9.6 declara: en este contexto de lectura no hay otro referente con el que colisione. En cualquier otro archivo del framework el término va calificado como «migración normativa».

---

## 0. El problema que resuelve

Un árbol `SDD/Docs/` sobrevive a varias versiones del framework. Cuando el framework avanza, la documentación ya emitida queda descripta contra reglas que dejaron de estar vigentes, y el propio framework declara que ante un salto major esa documentación **deja de cumplir**.

El framework ya sabía diagnosticar ese estado y no sabía repararlo. La reconciliación normativa de `Master-Prompt.md` §2.1 lee el bloque de procedencia del destino, lo compara contra las versiones vigentes, clasifica cada salto por severidad y enumera los documentos potencialmente invalidados. Sus tres salidas son emitir un plan sin tocar nada, regenerar desde cero archivando lo anterior, o seguir con las reglas viejas. **Ninguna lleva el destino de la versión de origen a la vigente preservando su contenido.** Regenerar desde cero lo consigue tirando lo que había; seguir con las reglas viejas lo consigue no avanzando.

Esta regla define el instrumento que faltaba: la mecánica con la que un destino se re-expresa bajo la normativa vigente conservando lo que ya decía. La reconciliación queda siendo el diagnóstico, que es lo que hace bien, y esta regla el tratamiento.

**Dos fronteras que conviene fijar de entrada.**

| Esta regla | No es |
| --- | --- |
| La mecánica de la migración: qué principio la gobierna, qué se preserva, qué no se inventa y cómo se verifica | El orden en que se recorren los documentos ni las fases de la corrida, que viven en el master-prompt de migración |
| Una regla transversal que atraviesa las doce categorías y los dos documentos de entrada | Una categoría documental: no produce una carpeta numerada ni tiene subagente titular propio |

---

## 1. Especialidad asignada

### 1.1 Especialidad base

La migración **no crea especialidades nuevas**. Es la consecuencia directa del principio de delegación de la especialidad que rige el orquestador: la especialidad es propiedad del documento que se va a producir, no del orquestador que lo pide. Un caso de uso migrado sigue siendo un caso de uso, y quien mejor lo re-expresa es el mismo perfil que lo habría generado.

De ahí la regla base: **el documento migrado lo re-expresa el subagente titular de su categoría**, leído de §1.2 del archivo de reglas de esa categoría, con la variante que corresponda al `tipo_proyecto_codigo` del proyecto de código al que pertenece. Exactamente como en la generación.

### 1.2 Variantes de especialidad

Esta tabla **no tiene ocho filas por tipo D8**, y la omisión es deliberada y declarada. La migración no discrimina por tipo de proyecto de código porque no elige perfiles: los toma de la regla de cada documento, que ya discrimina por tipo en su propia §1.2. Agregar acá una segunda tabla indexada por D8 crearía dos declaraciones de la misma cosa, que es la clase de duplicación que se desincroniza al segundo cambio.

Lo que sí varía es el actor según la actividad:

| Actividad | Especialidad | De dónde sale |
| --- | --- | --- |
| Re-expresar un documento de una categoría | El subagente titular de esa categoría, en la variante de su tipo D8 | §1.2 del archivo de reglas de la categoría |
| Re-expresar el intake | Ninguna: el intake es documento humano. El agente **propone** y el Product Owner aprueba (§4.4) | `PRODUCT-INTAKE-template.md`, que declara que la autoría y la aprobación no se delegan |
| Re-derivar el manifiesto | El orquestador, que es quien lo deriva también en la generación | `Intake-Rules.md` §4 |
| Emitir el plan de migración | El orquestador de migración, sin despachar subagentes | Esta regla, §2.1 |
| Auditar la migración | El auditor independiente, invocado desde cero | Los criterios de audit del master-prompt de generación, más §6 de esta regla |

### 1.3 Lo que esta regla no asigna

No asigna un subagente «migrador». Un perfil genérico que re-expresa documentos de doce categorías distintas es exactamente el agente derivante que el framework existe para evitar: sin la especialidad de la categoría, el criterio con el que se decide qué contenido corresponde a qué sección lo pone el agente y no la regla.

---

## 2. Artefactos que produce

### 2.1 Tabla maestra de artefactos

| Archivo | Obligatorio para | Recomendado para | Omitir para | Descripción |
| --- | --- | --- | --- | --- |
| `Plan-Migracion-<origen>-a-<vigente>.md` | Toda migración | — | — | El plan: una fila por documento afectado, con su path, la regla que lo gobierna, qué cambió en esa regla, si requiere regeneración o solo revisión, su fuente de contenido y el orden de la cadena D6. Reemplaza a `Reconciliacion-<origen>-a-<vigente>.md` |
| `Informe-Migracion-<origen>-a-<vigente>.md` | Toda migración que haya escrito al menos un documento | — | Una migración que se detuvo antes de escribir: no hay resultado que auditar, y se declara así | El informe del auditor independiente: qué se migró, qué quedó pendiente, qué contenido quedó sin destino y el veredicto |

Los dos viven en `SDD/Docs/Audit/` del repositorio destino. Ninguno tiene gating por tipo D8: la migración es una propiedad del destino, no de la forma de entrega de sus proyectos de código.

**El plan es el contrato entre los dos orquestadores.** Lo emite la salida A de la reconciliación normativa y lo consume la migración. Si el usuario invoca la migración sin plan previo, la migración lo genera ella misma aplicando el mismo procedimiento de diff: la dependencia es del artefacto, no de haber corrido el otro prompt.

**La columna de fuente de contenido** es propia de la migración y no existía en el informe de reconciliación. Declara de dónde sale el contenido de cada documento migrado, con exactamente tres valores admitidos: el propio documento de origen, un documento hermano del mismo destino, o pendiente de respuesta humana. No hay un cuarto valor, y esa es la forma en que §4.1 se vuelve verificable fila por fila.

### 2.2 Alcance: qué se migra y qué no

**Se migra** `SDD/Intake/` —el intake y el manifiesto derivado— y `SDD/Docs/` —todos los documentos de especificación generados—, en ese orden, por la razón que fija §4.4.

**Fuera de alcance, con su razón.** Se declara para que la migración no se lea como si hubiera cubierto todo:

| Artefacto | Por qué queda afuera |
| --- | --- |
| `SDD/Maquetas/` | Se versiona con el repositorio y está exento del archivado. Es material ejecutable que el humano edita a mano |
| `/samples/` | Es código, no documentación de especificación |
| `AGENTS.md` | Se regenera completo desde `Contrato-Agentes.md` en cada corrida de la Fase I. Migrar el contrato alcanza |
| Código fuente del destino | El framework produce documentación de especificación, no código |

**Caso especial: destino posterior al handoff.** Si el destino ya tiene código, la categoría 11 está en el tramo de documentación viva, donde D9 exige que toda afirmación sobre el estado del sistema cite evidencia. Migrarla por regeneración plana produciría un cuerpo documental que describe intenciones y se lee como si describiera hechos. En ese caso la migración de 11 se enruta por el criterio de re-ejecución de la Fase I del master-prompt de generación, no por regeneración.

### 2.3 Nomenclatura

Los dos artefactos llevan en el nombre las dos versiones que delimitan el salto, con la versión del conjunto y no la de un archivo suelto: `Plan-Migracion-4.1-a-6.0.md`. Cuando el origen no es determinable porque el destino no declara procedencia, el segmento de origen es `sin-procedencia`: `Plan-Migracion-sin-procedencia-a-6.0.md`. Es un dato del estado del destino y no un valor por defecto que oculte la falta.

---

## 3. El principio de estado objetivo

Es el principio rector de la migración y de él se derivan todas las reglas de §4.

> **La normativa vigente es la especificación del estado al que hay que llegar. El documento existente es la fuente del contenido. La migración re-expresa el segundo bajo la primera.**

No hay recetas por salto de versión. El salto de versión sirve para **priorizar**, no para transformar.

**Por qué el estado objetivo y no un playbook por salto.** Cinco fundamentos:

1. **El framework ya prohíbe la transformación mecánica, con su propio caso como prueba.** `Vocabulario-Rules.md` §9.5 prohíbe la sustitución global de cadena y documenta el daño que produjo en la intervención del framework 5.0. Un playbook por salto describe la migración como operación de texto: adoptarlo sería reintroducir la práctica que el framework acaba de prohibir.
2. **El estado objetivo ya está declarado y no hay que escribirlo.** Cada archivo de reglas declara su tabla maestra, sus reglas de inclusión por tipo, sus criterios de aceptación y sus anti-patrones. Ésa es la especificación completa del destino. Un playbook la duplicaría, y una duplicación que hay que mantener en paralelo se desincroniza.
3. **El costo de los playbooks crece sin techo y su mantenimiento es retroactivo.** Habría que escribir uno al publicar cada versión, y revisarlo cuando una versión posterior cambie lo que él migraba. Con el estado objetivo, publicar una versión no genera ninguna deuda de migración.
4. **Degrada bien cuando falta el conjunto de origen.** El archivado por versión rige desde la 4.0 hacia adelante, así que un destino generado con una versión anterior no es reconstruible. Un playbook necesita conocer el origen y sin él no hay migración posible. Con el estado objetivo la migración sigue siendo posible, porque el objetivo está declarado: lo único que se pierde es la clasificación de saltos. Es degradación de precisión, no pérdida de capacidad (§4.5).
5. **El diff que hace falta ya está calculado.** La reconciliación normativa ya lee la procedencia, lee las versiones vigentes, clasifica cada salto y enumera los artefactos gobernados por cada regla con salto major. Falta ejecutar, no calcular.

**Lo que el estado objetivo no resuelve solo.** Dice a dónde hay que llegar; no dice cómo mapear el contenido viejo cuando una sección desaparece, se parte en dos o se renombra. Para eso no se inventa mecanismo: se reusa el de preservación de correcciones manuales de §4.2. El agente relee, enumera las diferencias, declara cómo interpretó cada una y espera confirmación.

**La única concesión.** Hay un tipo de cambio que ningún diff de versiones puede inferir: el renombre de un artefacto. Que un intake pasó a llamarse de otra manera no se deduce de que su regla haya subido de 2.1 a 3.0. Ese conocimiento vive en el bloque «Impacto sobre destinos existentes» que `SDD-Development-Guide.md` §VI.4 exige en toda entrada major del `CHANGELOG.md`. La migración lo **lee**; no lo reconstruye por inferencia.

---

## 4. Reglas constructivas de la migración

### 4.1 Regla de no invención

**Todo contenido de un documento migrado proviene del documento de origen, de un documento hermano del mismo destino, o de una respuesta del humano. No hay una cuarta fuente.**

Cuando la normativa vigente exige una sección para la que el destino no tiene contenido, la sección **no se rellena**. Se emite como pendiente y la pregunta se consolida en la batería de `Intake-Rules.md` §6 si es del intake, o en el plan como fila sin resolver si es de un documento generado.

**Por qué es la regla más importante de esta regla.** Una migración que completa lo que falta produce un documento que cumple formalmente la normativa vigente y afirma cosas que nadie decidió. Es peor que el documento viejo: el viejo se veía viejo, y éste se ve al día. D9 lo prohíbe, y el audit de la migración lo trata como hallazgo P0.

Rellenar con contenido inferido y declararlo como inferido tampoco alcanza: el lector que consume el documento aguas abajo lee la sección, no la declaración.

### 4.2 Preservación de contenido y de correcciones manuales

**Nada de lo que el destino ya decía se pierde en silencio.** Tres reglas:

1. **Estado previo archivado.** Antes de sobrescribir, el estado previo del documento se archiva en el `_legacy/` de su propia carpeta, con la fecha, según la política de archivado del master-prompt de generación. Sin eso la migración no es reversible.
2. **Contenido sin destino, declarado.** Si el documento de origen tiene contenido que la normativa vigente no ubica en ninguna sección, ese contenido **no se descarta**: se enumera en el plan y en el informe, con su texto localizable, y el humano decide. Descartarlo por no encontrarle lugar es la forma silenciosa de perder información.
3. **Correcciones manuales, no pisadas.** Si el usuario editó a mano el documento, se aplica el patrón ya resuelto del criterio de re-ejecución del master-prompt de generación: el agente relee, enumera las diferencias, declara cómo interpretó cada una y **espera confirmación** antes de propagar. No se decide por cuenta propia qué corrección era intencional.

### 4.3 Clasificación por artefacto

Cada documento del plan recibe exactamente una de tres clasificaciones, derivada de la severidad del salto de la regla que lo gobierna:

| Salto de la regla que lo gobierna | Clasificación | Qué se hace |
| --- | --- | --- |
| Major | **Regenerar contenido** | El documento se re-expresa completo bajo la normativa vigente, con su contenido tomado del de origen según §4.1 y §4.2 |
| Minor | **Revisar** | Se verifica el documento contra la normativa vigente y se corrige solo lo que no cumple. Un minor incorpora sin invalidar, así que la mayor parte del documento queda como está |
| Sin cambio | **No tocar** | El documento no se abre para escritura. Aparece en el plan con esta clasificación, para que quede constancia de que se evaluó y no de que se omitió |

La severidad se lee de la propia numeración de las versiones, no se infiere del contenido. Es la misma regla que gobierna el diff de la reconciliación normativa, y acá no se reinterpreta.

### 4.4 El intake es documento humano

El Product Owner es el autor responsable del intake y quien lo aprueba. La redacción puede estar asistida por un agente, pero la autoría del contenido y la aprobación no se delegan. De ahí cuatro restricciones propias:

1. **El agente propone, no sobrescribe.** Emite el intake migrado como propuesta y presenta un diff **de estructura**: qué sección se movió, qué se partió, qué se renombró y qué contenido quedó sin destino. Escribe recién con aprobación explícita.
2. **Nada se rellena.** Rige §4.1 sin excepción: la sección sin fuente va a la batería de preguntas, no se completa.
3. **Escritura por el flujo controlado.** Archivado previo del intake, fila en su control de cambios y re-derivación del manifiesto con nueva confirmación, según las reglas de no-modificación del intake del master-prompt de generación. El bump del intake es **major**, porque una migración estructural reescribe secciones ya aprobadas.
4. **Verificación contra la plantilla vigente.** El intake migrado se verifica contra `PRODUCT-INTAKE-template.md` vigente y no solo contra los campos bloqueantes de `Intake-Rules.md` §2.2. Los dos conjuntos no coinciden hoy: la plantilla declara secciones obligatorias que la validación no comprueba. La migración no cierra ese hueco, que es una intervención aparte, pero tampoco lo agrava.

**Orden respecto del resto.** El intake se migra antes que el manifiesto, y el manifiesto antes que los documentos generados. No es preferencia: es la cadena D6. El intake es la fuente de verdad, el manifiesto se deriva de él y los documentos generados se derivan de los dos. Migrar `SDD/Docs/` contra un intake todavía con estructura vieja produce documentación derivada de un upstream superado.

### 4.5 Destinos sin procedencia declarada

Un destino que no declara bloque de procedencia **sí es migrable**, y ésta es la capacidad que antes no existía: la reconciliación normativa solo le ofrece regenerar o abortar, porque no tiene contra qué comparar.

La migración por estado objetivo no necesita conocer el origen, porque el objetivo está declarado en la normativa vigente. Lo que se pierde es la clasificación de saltos de §4.3, y el efecto es concreto: **todos los documentos pasan a «revisar»**, sin discriminarse entre regenerar y no tocar.

Dos obligaciones cuando esto ocurre:

1. **Se declara la degradación**, en el plan y en el informe, con su consecuencia: el plan no prioriza, y el volumen de documentos a revisar es el total del destino.
2. **No se supone un origen.** Inferir la versión de origen a partir del aspecto de los documentos es una afirmación sobre el estado del sistema sin evidencia, y D9 la prohíbe. El segmento de origen del nombre de los artefactos es `sin-procedencia` (§2.3).

### 4.6 Migración parcial como estado final

Una migración puede terminar sin haber completado la cadena, y es un estado final legítimo. La razón es que la migración se detiene a pedir confirmación humana en cada corte: si un «no confirmo» no tuviera salida declarada, el destino quedaría en un estado que la propia regla considera inválido.

Las dos condiciones que la hacen legítima, y las dos son bloqueantes:

1. **El bloque de procedencia no se reescribe.** Una procedencia que declara la versión vigente sobre un árbol migrado a medias es una afirmación falsa sobre el estado del sistema, y D9 la prohíbe. La procedencia se actualiza **solo si toda la cadena quedó migrada**; reescribirla con migración parcial es hallazgo P0.
2. **El estado parcial se declara en el informe**, documento por documento: qué quedó migrado, qué quedó sin migrar y por qué. Una fila del plan que quedó sin resolver y sin declararse como pendiente es hallazgo P0.

El destino queda entonces declarando su procedencia de origen, que es lo que sigue siendo cierto, con un informe que dice exactamente cuánto se avanzó. Una migración posterior retoma desde ahí.

---

## 5. Preguntas guía

Antes de migrar un documento:

- ¿Cuál es la fuente de cada sección del documento migrado? Si alguna respuesta es «la completé yo», la migración de ese documento está mal y hay que volver a §4.1.
- ¿Qué decía el documento de origen que la normativa vigente no ubica en ninguna sección? Si la respuesta es «nada», ¿se verificó, o se asumió?
- ¿El usuario editó este documento a mano después de generarlo? ¿Con qué evidencia se responde eso?
- ¿La regla que gobierna este documento subió major, minor o no cambió? ¿De dónde se leyó la severidad?

Antes de cerrar la migración:

- ¿Quedó alguna fila del plan sin resolver? ¿Está declarada como pendiente?
- ¿Toda la cadena D6 quedó migrada? Si no, ¿la procedencia quedó sin tocar?
- ¿Algún documento migrado afirma algo sobre el estado del sistema que antes no afirmaba?

---

## 6. Criterios de aceptación

Verificables por el auditor independiente sobre el resultado de la migración:

- [ ] Todo documento migrado tiene su fuente de contenido declarada en el plan, con uno de los tres valores admitidos de §2.1.
- [ ] Ninguna sección de ningún documento migrado contiene contenido que no provenga del documento de origen, de un documento hermano o de una respuesta del humano.
- [ ] Ninguna sección exigida por la normativa vigente y sin fuente quedó rellenada: todas se emitieron como pendientes.
- [ ] El estado previo de cada documento migrado quedó archivado en el `_legacy/` de su propia carpeta antes de sobrescribir.
- [ ] Todo contenido del documento de origen que la normativa vigente no ubica quedó enumerado en el informe, con su texto localizable.
- [ ] Ninguna corrección manual del usuario fue pisada sin declarar la interpretación y esperar confirmación.
- [ ] Cada documento del plan lleva su clasificación de §4.3, incluidos los clasificados como «no tocar».
- [ ] El intake migrado se verificó contra la plantilla vigente y no solo contra los campos bloqueantes de `Intake-Rules.md` §2.2, y su bump es major.
- [ ] El intake se migró antes que el manifiesto, y el manifiesto antes que los documentos generados.
- [ ] Si el destino no declaraba procedencia, la degradación de la clasificación está declarada y no se supuso ninguna versión de origen.
- [ ] El bloque de procedencia se reescribió **solo** si toda la cadena quedó migrada. Si la migración fue parcial, la procedencia declara todavía el origen y el informe declara el estado parcial documento por documento.
- [ ] Ninguna fila del plan quedó sin resolver y sin declararse como pendiente en el informe.
- [ ] Ningún renombre de artefacto se resolvió por inferencia: se leyó del bloque de impacto sobre destinos existentes del `CHANGELOG.md` del framework.
- [ ] Ninguna sustitución de un término dentro de un documento migrado se hizo por reemplazo global de cadena (`Vocabulario-Rules.md` §9.5).

**Hallazgos P0**, que detienen la cadena: contenido inventado; sección exigida rellenada con contenido inferido; procedencia reescrita con migración parcial; corrección manual pisada sin declarar la interpretación; estado previo no archivado; fila del plan sin resolver y sin declarar.

---

## 7. Anti-patrones a evitar

| Anti-patrón | Síntoma | Consecuencia | Corrección |
| --- | --- | --- | --- |
| **Migrar por sustitución de cadena** | El renombre de un término se aplica con un reemplazo global sobre el árbol del destino | Las cuatro clases de daño que `Vocabulario-Rules.md` §9.5 documenta sobre el propio framework: palabras inexistentes, cabeceras de tabla pisadas, etiquetas convertidas sobre valores que no correspondían y filas históricas reescritas | El procedimiento por ocurrencia de §9.5: enumerar, clasificar por sentido, sustituir solo lo que cambia de referente, verificar con barrido negativo |
| **Rellenar para que el documento cumpla** | Una sección nueva de la normativa vigente aparece completa en el documento migrado | El documento afirma cosas que nadie decidió y se ve al día. Es el defecto más caro de la migración | Emitir la sección como pendiente. Un documento con pendientes declarados es más útil que uno completo y falso |
| **Escribir un playbook por salto de versión** | Aparece un documento «cómo migrar de X a Y» | Duplica el estado objetivo que las reglas ya declaran, hay que mantener las dos declaraciones sincronizadas, y no sirve cuando el conjunto de origen no es reconstruible | El principio de §3. El salto de versión prioriza; no transforma |
| **Cerrar la procedencia con la cadena incompleta** | El manifiesto declara la versión vigente y hay documentos sin migrar | El destino miente sobre su propio estado, y la migración siguiente parte de una premisa falsa | §4.6: la procedencia se toca solo con la cadena completa |
| **Migrar `SDD/Docs/` antes que el intake** | Los documentos generados quedan al día y el intake conserva su estructura vieja | La documentación queda derivada de un upstream superado, y la corrida siguiente del orquestador de generación vuelve a detenerse por el intake | El orden de la cadena D6 de §4.4 |
| **Descartar el contenido que no encuentra sección** | El documento migrado es más corto y nadie sabe qué se fue | Pérdida silenciosa de información, que es lo que el archivado previo existe para hacer detectable y no para hacer aceptable | §4.2 regla 2: enumerarlo en el informe y que el humano decida |
| **Usar un subagente genérico de migración** | Un mismo perfil re-expresa documentos de doce categorías | Sin la especialidad de la categoría, el criterio de qué contenido va en qué sección lo pone el agente y no la regla | §1.1: el subagente titular de la categoría del documento |
| **Suponer la versión de origen** | El plan declara un origen que el destino no declaraba | Afirmación sobre el estado del sistema sin evidencia, prohibida por D9. Además clasifica saltos que quizá no existieron | §4.5: `sin-procedencia`, con la degradación declarada |

---

## 8. Prompt-snippet sugerido

Para el despacho del subagente que re-expresa un documento, a agregar sobre el snippet de la categoría correspondiente:

```text
Estás migrando un documento existente, no generándolo desde cero.

Documento de origen: {{PATH_ORIGEN}} (ya archivado en {{PATH_LEGACY}})
Normativa vigente que lo gobierna: {{ARCHIVO_DE_REGLAS}} versión {{VERSION_VIGENTE}}
Salto de esa regla: {{major|minor|sin cambio}} → clasificación {{regenerar|revisar|no tocar}}
Fuente de contenido declarada en el plan: {{origen|documento hermano|pendiente humano}}

Reglas que no podés romper:

1. Todo contenido del documento que produzcas proviene del documento de origen, de
   un documento hermano de este destino, o de una respuesta del humano que te fue
   entregada. No hay cuarta fuente. Si una sección que la normativa vigente exige
   no tiene fuente, NO la completes: devolvela como pendiente, con el nombre de la
   sección y qué haría falta para llenarla.
2. Si el documento de origen dice algo que la normativa vigente no ubica en ninguna
   sección, no lo descartes: devolvelo en una lista de contenido sin destino, con su
   texto, para que el humano decida.
3. Si detectás que el documento de origen fue editado a mano después de generarse,
   no resuelvas por tu cuenta qué corrección era intencional: enumerá las
   diferencias, declará cómo las interpretás y detenete a esperar confirmación.
4. No apliques ningún renombre de término por sustitución global de cadena.

Devolvé, además del documento: la lista de secciones pendientes, la lista de
contenido sin destino, y la declaración de qué sección salió de dónde.
```

Para el despacho del auditor, los criterios de §6 de este archivo se suman a los criterios de audit del master-prompt de generación, con sus seis hallazgos P0.

---

## 9. Control de cambios

| Versión | Fecha | Cambios | Autor |
| --- | --- | --- | --- |
| 1.0 | 2026-07-29 | Regla inicial de migración normativa, decimoctava regla del framework y sexta transversal. Fija el **principio de estado objetivo** de §3, con sus cinco fundamentos y su única concesión, en lugar de playbooks por salto de versión: la normativa vigente es la especificación del destino y el documento existente es la fuente del contenido. §1 declara que la migración no crea especialidades y delega el perfil a §1.2 de la regla de cada categoría, con la omisión de la tabla por D8 declarada y fundamentada. §2 declara los dos artefactos propios, el plan como contrato entre los dos orquestadores con su columna nueva de fuente de contenido, el alcance sobre `SDD/Intake/` y `SDD/Docs/` y los cuatro artefactos fuera de alcance con su razón. §4 reúne la mecánica: **regla de no invención** (§4.1), preservación de contenido y de correcciones manuales con archivado previo (§4.2), clasificación por severidad del salto (§4.3), el intake como documento humano con el agente proponiendo y el orden de la cadena D6 (§4.4), **destinos sin procedencia** admitidos con clasificación degradada a revisar todo (§4.5) y **migración parcial** admitida con la procedencia intacta y el estado parcial declarado (§4.6). §6 declara catorce criterios de aceptación y seis hallazgos P0; §7, ocho anti-patrones. La regla no declara fases ni orden de ejecución de la corrida: eso vive en el master-prompt de migración. | Framework SDD (migración normativa) |
