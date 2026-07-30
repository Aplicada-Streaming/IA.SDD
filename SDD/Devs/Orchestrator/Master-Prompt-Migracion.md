# Master prompt SDD — Orquestador de migración normativa

**Archivo:** `Master-Prompt-Migracion.md`
**Versión:** 1.1
**Idioma:** Español rioplatense neutro técnico
**Modo:** plan-then-confirm con subagentes + audit independiente. La mecánica de despacho y de auditoría **no se define acá**: se cita de `Master-Prompt.md` §8 y §10
**Prerequisitos:** un repositorio destino con `SDD/Docs/` poblado y, opcionalmente, un `Plan-Migracion-<origen>-a-<vigente>.md` emitido por la reconciliación normativa del orquestador de generación
**Salida:** el destino re-expresado bajo la normativa vigente, con su bloque de procedencia actualizado si la cadena quedó completa, más el plan y el informe de migración en `SDD/Docs/Audit/`

---

## §0 Cómo usar este prompt

Este prompt orquesta la **migración normativa** de un destino: lo lleva de la versión del framework con la que se generó a la vigente, preservando su contenido. Es contiguo al orquestador de generación, no lo reemplaza y no lo contiene.

**Cardinalidad.** Se ejecuta **una vez por salto de versión que el destino atraviese**, N veces en su vida. Es la diferencia con el orquestador de generación, que se ejecuta una sola vez por producto. Las dos cardinalidades son incompatibles y es la razón por la que la capacidad vive en un prompt propio.

**Modelo de repositorios.** El mismo que declara el `README.md` del framework y que resuelve `PROMPT-Agente-Migracion-SDD.md`: el repositorio fuente en solo lectura, el repositorio destino donde se escribe. La convención de rutas es la de `Master-Prompt.md` §0 y acá no se repite.

**Lo que este prompt NO hace:**

- No genera documentación desde cero. Si el destino no tiene `SDD/Docs/` poblada, no hay nada que migrar y el que corresponde es el orquestador de generación.
- No decide si migrar. La decisión es del humano y llega tomada: este prompt se invoca, no se dispara.
- No escribe en el repositorio fuente. Ninguna de sus fases tiene excepción de escritura sobre el framework.
- No inventa contenido. Es la regla de no invención de `Migracion-Rules.md` §4.1 y su violación es hallazgo P0.

**Dónde vive la mecánica.** En `Migracion-Rules.md`, que declara el principio de estado objetivo, la regla de no invención, la preservación de contenido, la clasificación por artefacto, el tratamiento del intake como documento humano, los destinos sin procedencia, la migración parcial, sus criterios de aceptación y sus anti-patrones. Este prompt declara **fases, detenciones y orden**; la regla declara **qué es correcto**. Es el principio de delegación de la especialidad de `Master-Prompt.md` §1 aplicado a la migración: un cambio de mecánica toca la regla y no este archivo.

---

## §1 Lo que este prompt no define, y de dónde lo toma

Este prompt es un archivo de fases, no un segundo orquestador completo. Todo lo que ya está resuelto en el orquestador de generación se **cita**, no se reescribe. La duplicación que no existe no se desincroniza.

| Mecanismo | De dónde se toma | Qué hace este prompt con él |
| --- | --- | --- |
| Despacho de subagentes | `Master-Prompt.md` §8, con su esqueleto de prompt y sus reglas de construcción | Lo usa tal cual, y le agrega el bloque de migración del prompt-snippet de `Migracion-Rules.md` §8 |
| Auditoría independiente | `Master-Prompt.md` §10, con su perfil de auditor, sus niveles P0 a P3, su estructura de informe y sus veredictos | Lo invoca en M4 y en M6, sumando los criterios de `Migracion-Rules.md` §6 |
| Política de archivado y deprecación | `Master-Prompt.md` §5 y §5.1 | La aplica antes de sobrescribir cualquier documento |
| Manejo de ambigüedad | `Master-Prompt.md` §9 | Lo usa para todo dato que falte y que el humano tenga que resolver |
| Flujo controlado de escritura del intake | `Master-Prompt.md` §13, regla 2 caso (b), con las reglas 3 a 7 | Lo sigue en M2. Ver la nota de habilitación de abajo |
| Diff normativo | `Master-Prompt.md` §2.1, pasos 1 a 5 | Lo ejecuta en M1 si el plan no existe todavía |
| Derivación del manifiesto | `Master-Prompt.md` §3 y §3.1, e `Intake-Rules.md` §4 | La ejecuta en M3 sobre el intake migrado |
| Orden topológico de los proyectos de código | `Master-Prompt.md` §3.3 | Lo usa en M4 |
| Invariantes globales | `Master-Prompt.md` §5 y el `README.md` del framework | Las inyecta en cada despacho, sin alterarlas |

**Nota de habilitación de M2.** La escritura del intake que M2 propone es un caso de escritura **estructural**, distinto de consolidar una respuesta del humano. Está autorizada por `Master-Prompt.md` §13 regla 2 **caso (b)**, con sus tres condiciones acumulativas: propuesta antes de escritura con aprobación explícita, nada se rellena, y bump major. Este prompt **no se autoriza a sí mismo**: la autorización vive en el flujo de no-modificación del intake del orquestador de generación y acá se cita. Si alguna de las tres condiciones no se cumple, M2 no escribe: la cláusula de cierre de §13 trata como error de orquestación toda escritura que no pase por ese flujo.

---

## §2 Insumos obligatorios y precondiciones

Insumos, todos de lectura:

- `Migracion-Rules.md`, íntegra. Es la regla que gobierna esta corrida.
- `Master-Prompt.md`, por los mecanismos que §1 enumera.
- `Vocabulario-Rules.md`, que va en la lista de insumos de todo despacho sin excepción, por la regla de construcción de `Master-Prompt.md` §8.
- El archivo de reglas de cada categoría cuyos documentos se migren, y las plantillas vigentes de intake y de manifiesto.
- El conjunto normativo de la versión de origen, desde `_legacy/<version>/` del framework, **si está disponible**. Si no lo está, se declara no reconstruible y no se supone su contenido.
- El `CHANGELOG.md` del framework, del que se leen los bloques «Impacto sobre destinos existentes» de las entradas major atravesadas por el salto. Es de donde salen los renombres de artefacto, que ningún diff de versiones puede inferir.
- El `Plan-Migracion-<origen>-a-<vigente>.md`, si ya existe.

Precondiciones, verificables antes de M0:

1. `SDD/Docs/` del destino tiene contenido. Si está vacía o no existe, este prompt no corresponde y lo declara.
2. `SDD/Intake/` del destino tiene un documento de intake, con su nombre vigente o con un nombre legado. La resolución de nombres legados es trabajo de M0 y no una precondición a cumplir por el usuario.
3. El repositorio fuente es accesible y `Migracion-Rules.md` es legible.

---

## §3 Plan de migración: las siete fases

| Fase | Qué hace | Detención | Salida |
| --- | --- | --- | --- |
| **M0** | Reconocimiento del destino: resuelve intake y manifiesto tolerando nombres legados, y lee la procedencia | Sí, si el destino no es reconocible | Bloque informativo de estado del destino |
| **M1** | Diff normativo: consume el plan si existe, lo emite si no. Sin despachar subagentes | Sí: presenta el plan completo y espera aprobación | `Plan-Migracion-<origen>-a-<vigente>.md` |
| **M2** | Migración del intake, como propuesta con diff de estructura | Sí, doble: aprobación del diff y resolución de la batería | Intake migrado, bump major, con archivado previo |
| **M3** | Re-derivación del manifiesto desde el intake migrado, con la procedencia todavía apuntando al origen | Sí: confirmación del manifiesto | Manifiesto migrado |
| **M4** | Migración de `SDD/Docs/` en orden D6, documento por documento según su clasificación | Sí, por corte, con audit entre medio | Documentos migrados, archivados y con su fila de control de cambios |
| **M5** | Cierre de procedencia, condicional a que la cadena quedó completa | Sí | Procedencia actualizada, o declaración de migración parcial |
| **M6** | Auditoría de migración por auditor independiente | Sí, bloqueante ante P0 | `Informe-Migracion-<origen>-a-<vigente>.md` |

Ninguna fase arranca sin que la anterior haya cerrado con confirmación humana. La corrida puede terminar en cualquier fase: una migración parcial es un estado final legítimo bajo las condiciones de `Migracion-Rules.md` §4.6.

---

## §4 M0 — Reconocimiento del destino

Pasos:

1. **Resolver el intake tolerando nombres legados.** Buscar `SDD/Intake/PRODUCT-INTAKE-*.md`. Si no hay ninguno, buscar los nombres de artefacto declarados por las versiones archivadas en `_legacy/` del framework y por los bloques «Impacto sobre destinos existentes» del `CHANGELOG.md`. Un intake encontrado bajo un nombre legado **no es un error**: es el caso normal de un destino que hay que migrar, y se declara como tal.
2. **Resolver el manifiesto** con el mismo criterio.
3. **Leer el bloque de procedencia** del manifiesto: versión del conjunto, del master-prompt, de cada regla aplicada y de las dos plantillas de intake.
4. **Verificar la reconstruibilidad del origen**: si `_legacy/<version>/` del framework existe, citarlo como disponible; si no, declararlo no reconstruible. No declarar reconstruible nada que no se haya verificado: es afirmación sobre el estado del sistema y D9 exige evidencia.
5. **Si no hay bloque de procedencia**, declararlo y degradar la clasificación de saltos a «revisar todo», según `Migracion-Rules.md` §4.5. No inferir la versión de origen a partir del aspecto de los documentos.

Formato del bloque informativo:

```text
Reconocimiento del destino

Intake:      {{path}}  {{nombre vigente | nombre legado: <nombre>}}
Manifiesto:  {{path}}  {{nombre vigente | nombre legado: <nombre> | ausente}}
Procedencia: {{SDD <version> | NO DECLARADA}}
Conjunto de origen: {{disponible en _legacy/<version>/ | no reconstruible | no aplica}}
Clasificación de saltos: {{por severidad | DEGRADADA a "revisar todo"}}

Documentos en SDD/Docs/: {{N}}
```

**Detención.** Solo si el destino no es reconocible: sin intake bajo ningún nombre, o con más de un producto y sin que el usuario indique cuál. En ese caso se enumeran los nombres que se buscaron, para que el usuario vea por qué no se resolvió.

---

## §5 M1 — Diff normativo

**Si el plan ya existe**, se lee y se verifica que corresponda al par de versiones que M0 resolvió. Si no corresponde, se descarta y se emite uno nuevo, declarando por qué.

**Si el plan no existe**, se ejecuta el diff normativo de `Master-Prompt.md` §2.1, pasos 1 a 5. No se despacha ningún subagente: es una fase de lectura y de cálculo.

El plan agrega, respecto del informe de reconciliación:

- **Filas para el intake y el manifiesto**, enumerados desde la tabla maestra de `Intake-Rules.md` §2.1.
- **Una columna de fuente de contenido**, con los tres valores admitidos de `Migracion-Rules.md` §2.1.
- **La clasificación de cada documento**: regenerar, revisar o no tocar, según `Migracion-Rules.md` §4.3.
- **Los renombres de artefacto aplicables**, leídos de los bloques «Impacto sobre destinos existentes» del `CHANGELOG.md` del framework.

Estructura del plan:

1. Cabecera: destino, versión de origen, versión vigente, reconstruibilidad del conjunto de origen, fecha.
2. Tabla de saltos por archivo de reglas, con su severidad.
3. Renombres de artefacto aplicables, o la constancia de que no hay ninguno.
4. Tabla de documentos, una fila por documento, en orden de la cadena D6: path, regla que lo gobierna, qué cambió en esa regla, clasificación, fuente de contenido.
5. Documentos fuera de alcance, con la razón de `Migracion-Rules.md` §2.2.
6. Degradación declarada, si el destino no tenía procedencia.

**Detención obligatoria.** Se presenta el plan completo y se espera aprobación. No se modifica ningún documento durante M1.

---

## §6 M2 — Migración del intake

El intake es documento humano: el Product Owner es su autor responsable y quien lo aprueba. De ahí que M2 **propone** y no escribe hasta tener aprobación explícita.

Pasos:

1. **Leer el intake de origen** íntegro, y la plantilla `PRODUCT-INTAKE-template.md` vigente.
2. **Construir la propuesta** re-expresando el contenido de origen bajo la estructura vigente, con la regla de no invención de `Migracion-Rules.md` §4.1: ninguna sección sin fuente se rellena.
3. **Presentar el diff de estructura**, que es lo que el humano tiene que poder revisar sin leer los dos documentos completos:

```text
Diff de estructura del intake

Secciones movidas:      {{origen §N → vigente §M}}
Secciones partidas:     {{origen §N → vigente §M y §P}}
Secciones renombradas:  {{nombre anterior → nombre vigente}}
Secciones nuevas sin fuente: {{§M, va a la batería de preguntas}}
Contenido sin destino:  {{texto localizable del origen que la plantilla vigente no ubica}}
```

4. **Emitir la batería consolidada de preguntas** con el formato de `Intake-Rules.md` §6, por cada sección exigida que no tiene fuente.
5. **Detención doble**: aprobación del diff de estructura, y resolución de la batería. Las dos son necesarias; aprobar el diff no autoriza a escribir con la batería abierta.
6. **Escribir**, siguiendo el flujo de `Master-Prompt.md` §13: archivado previo del estado anterior en `SDD/Intake/_legacy/<YYYY-MM-DD>/`, fila en el control de cambios del intake, y bump **major**, porque una migración estructural reescribe secciones ya aprobadas.

Si el intake de origen tiene un nombre legado, el intake migrado se escribe con el nombre vigente y el archivo legado queda archivado, no renombrado en su lugar: el archivado es lo que preserva el estado anterior.

**Si alguna de las tres condiciones del caso (b) de `Master-Prompt.md` §13 regla 2 no se cumple** —falta la aprobación explícita, quedó una sección rellenada con contenido inferido, o el bump no es major—, M2 no escribe: presenta la propuesta, el diff y la batería, y declara qué condición falta. Es preferible una migración detenida y declarada que una escritura que la normativa trata como error de orquestación.

---

## §7 M3 — Re-derivación del manifiesto

El manifiesto es artefacto derivado, así que no se migra: se **re-deriva** del intake migrado.

Pasos:

1. Derivar el manifiesto desde §13 del intake migrado, aplicando `Intake-Rules.md` §4 y las validaciones bloqueantes de `Master-Prompt.md` §3.1.
2. Completar el bloque de procedencia según la plantilla vigente, **con las versiones de origen todavía**. La procedencia no se toca en M3: es trabajo de M5, y adelantarlo produciría una afirmación falsa mientras `SDD/Docs/` sigue sin migrar.
3. Archivar el manifiesto anterior antes de sobrescribir.
4. Presentar el manifiesto derivado y esperar confirmación explícita, que es la detención que `Master-Prompt.md` §3 paso 3 ya declara.

Si alguna validación de §3.1 falla —un tipo fuera de D8, dos proyectos de código principales, un ciclo de dependencias—, el manifiesto no se deriva y se reporta en la batería de preguntas. Es el mismo comportamiento que en la generación.

---

## §8 M4 — Migración de `SDD/Docs/`

Es la fase larga. Recorre el plan aprobado en el orden de la cadena D6:

1. Categorías de nivel producto: 00, después 01.
2. Cada proyecto de código, en el orden topológico de `Master-Prompt.md` §3.3, y dentro de cada uno las categorías 02 a 11 en su orden de generación.
3. Consolidación de nivel producto.

**Por documento**, según su clasificación de `Migracion-Rules.md` §4.3:

| Clasificación | Qué hace M4 |
| --- | --- |
| **Regenerar contenido** | Archiva el estado previo, despacha al subagente titular de la categoría con el esqueleto de `Master-Prompt.md` §8 más el bloque de migración de `Migracion-Rules.md` §8, y escribe el documento re-expresado con su fila de control de cambios |
| **Revisar** | Archiva el estado previo, despacha con el mismo esqueleto declarando la clasificación, y el subagente corrige solo lo que no cumple la normativa vigente |
| **No tocar** | No abre el documento para escritura. Registra en el informe que se evaluó y no requería cambio |

**Qué devuelve cada subagente**, además del documento: la lista de secciones pendientes por falta de fuente, la lista de contenido sin destino, y la declaración de qué sección salió de dónde. Sin esas tres devoluciones la fila del plan no se puede cerrar.

**Correcciones manuales.** Si al abrir un documento el subagente encuentra contenido que el snapshot no refleja, se detiene y lo devuelve como ambigüedad según `Master-Prompt.md` §9, sin editar. El orquestador enumera las diferencias, declara cómo las interpretó y espera confirmación antes de propagar. Es la regla de `Migracion-Rules.md` §4.2 y el mismo patrón que el criterio de re-ejecución del orquestador de generación.

**Cortes y audit.** M4 se corta por categoría de nivel producto y por proyecto de código. En cada corte se invoca el audit de `Master-Prompt.md` §10, sumando los criterios de `Migracion-Rules.md` §6, y se espera confirmación antes de seguir. Un veredicto RECHAZADO obliga a corrección y re-audit, con la numeración de rondas que §10 ya declara.

---

## §9 M5 — Cierre de procedencia

M5 es una fase y no un efecto colateral, porque reescribir la procedencia es el acto que declara la migración terminada, y una declaración falsa sobre el estado del sistema está prohibida por D9.

Procedimiento:

1. **Verificar que toda la cadena quedó migrada**: ninguna fila del plan sin resolver, ninguna sección pendiente sin respuesta del humano, ningún documento clasificado como regenerar o revisar que haya quedado sin tocar.
2. **Si la cadena está completa**: reescribir el bloque de procedencia del manifiesto con las versiones vigentes —conjunto, master-prompt, cada regla aplicada y las dos plantillas de intake—, con su fila de control de cambios.
3. **Si algo quedó pendiente**: la procedencia **no se toca**. Se declara el estado parcial, documento por documento, según `Migracion-Rules.md` §4.6. El destino sigue declarando su procedencia de origen, que es lo que sigue siendo cierto.

**Detención.** Se presenta el resultado de la verificación y qué se va a hacer con la procedencia, antes de escribirla.

Reescribir la procedencia con migración parcial es hallazgo P0 del audit de M6.

---

## §10 M6 — Auditoría de migración

Auditor independiente, invocado desde cero, con el perfil y la mecánica de `Master-Prompt.md` §10. Este prompt no redefine ni el perfil, ni los niveles de hallazgo, ni la estructura del informe, ni los veredictos.

**Qué se suma a los criterios de §10:** los catorce criterios de aceptación de `Migracion-Rules.md` §6.

**Hallazgos P0 propios de la migración**, que son los que distinguen una migración de una regeneración disfrazada:

- Un documento migrado contiene contenido que no proviene ni del documento de origen, ni de un documento hermano, ni de una respuesta del humano: es invención.
- Una sección exigida por la normativa vigente quedó rellenada con contenido inferido en lugar de emitida como pendiente.
- La procedencia se reescribió con migración parcial.
- Una corrección manual del usuario fue pisada sin declarar la interpretación y esperar confirmación.
- El estado previo de un documento migrado no quedó archivado en el `_legacy/` de su carpeta.
- Una fila del plan quedó sin resolver y sin declararse como pendiente en el informe.

**Salida.** `SDD/Docs/Audit/Informe-Migracion-<origen>-a-<vigente>.md`, con la estructura de informe de `Master-Prompt.md` §10 más tres secciones propias: el estado final de cada fila del plan, el contenido sin destino enumerado con su texto localizable, y la declaración de migración completa o parcial.

**Detención bloqueante.** Un P0 detiene la cadena: se corrige y se re-audita. La migración no se declara cerrada con un P0 abierto.

---

## §11 Después de M6

Con la migración cerrada, el usuario reinvoca el orquestador de generación. Su reconciliación normativa lee la procedencia, la encuentra coincidente con la vigente, informa «al día» en una línea y continúa sin preguntar, que es el comportamiento que `Master-Prompt.md` §2.1 ya tiene para ese caso.

Si la migración quedó parcial, la reconciliación vuelve a encontrar el destino desfasado y vuelve a ofrecer sus tres salidas. Es correcto: el destino sigue desfasado, y el informe de migración dice exactamente cuánto se avanzó.

**Este prompt no se encadena automáticamente con el de generación, ni al principio ni al final.** La salida A de la reconciliación emite el plan y se detiene, porque ejecutar el plan es una decisión aparte; y M6 cierra la migración y se detiene, porque generar no es la continuación natural de migrar.

---

## §12 Glosario operativo

| Término | Qué designa acá |
| --- | --- |
| Migración normativa | Llevar un destino de la versión del framework con la que se generó a la vigente, preservando su contenido. La forma calificada es obligatoria fuera de este archivo y de `Migracion-Rules.md`, por `Vocabulario-Rules.md` §9.6 |
| Reconciliación normativa | La fase de diagnóstico del orquestador de generación (`Master-Prompt.md` §2.1). Compara y ofrece; no transforma |
| Estado objetivo | La normativa vigente leída como especificación del estado al que hay que llegar. Principio rector, en `Migracion-Rules.md` §3 |
| Plan de migración normativa | El contrato entre los dos orquestadores: lo emite la salida A de la reconciliación y lo consume M1 |
| Fuente de contenido | De dónde sale el contenido de un documento migrado. Tres valores: documento de origen, documento hermano, pendiente humano |
| Migración parcial | Estado final legítimo en el que la cadena no se completó, la procedencia no se tocó y el estado se declaró en el informe |
| Nombre legado | El nombre que un artefacto tenía en una versión anterior del framework. M0 los resuelve; no son errores |

---

## §13 Control de cambios

| Versión | Fecha | Cambios | Autor |
| --- | --- | --- | --- |
| 1.0 | 2026-07-29 | Master-prompt inicial del orquestador de migración normativa. Declara las siete fases M0 a M6 con sus detenciones y sus salidas: reconocimiento del destino con tolerancia de nombres legados, diff normativo que consume o emite el plan, migración del intake como propuesta con diff de estructura y doble detención, re-derivación del manifiesto con la procedencia todavía en el origen, migración de `SDD/Docs/` en orden de la cadena D6 con audit por corte, cierre condicional de la procedencia y auditoría final con sus seis hallazgos P0 propios. **§1 declara el contrato de citas**: el despacho de subagentes, la auditoría, el archivado, el manejo de ambigüedad, el diff normativo, la derivación del manifiesto y el orden topológico se toman de `Master-Prompt.md` §8, §10, §5, §9, §2.1, §3 y §3.3, y no se redefinen; la duplicación que no existe no se desincroniza. La mecánica de qué es correcto vive en `Migracion-Rules.md`, por delegación de la especialidad; este archivo declara fases, detenciones y orden. §1 declara además la **nota de habilitación de M2**: mientras §13 del orquestador de generación no autorice el caso de escritura estructural del intake, M2 presenta la propuesta y no escribe, en lugar de autorizarse a sí mismo. §11 declara que este prompt no se encadena automáticamente con el de generación en ninguno de los dos extremos. | Framework SDD (migración normativa) |
| 1.1 | 2026-07-29 | Integración con el orquestador de generación, al quedar declarado el caso de escritura estructural del intake en `Master-Prompt.md` §13 regla 2 caso (b). **§1** reemplaza la nota condicional de habilitación —que declaraba a M2 detenido mientras §13 no autorizara ese caso— por la cita de la autorización vigente y de sus tres condiciones acumulativas, y precisa la fila del contrato de citas. **§6** reemplaza la condición de bloqueo global por la condición por requisito: M2 no escribe si falta la aprobación explícita, si quedó una sección rellenada con contenido inferido o si el bump no es major, y declara cuál de las tres faltó. Sube minor: no cambia ninguna fase, detención ni orden; precisa de dónde toma su autorización. | Framework SDD (migración normativa) |
