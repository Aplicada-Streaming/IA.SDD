# Reglas constructivas — Sensado de deriva y evidencia verificable

**Carpeta target (por proyecto):** `SDD/Docs/Proyectos/<Nombre-Proyecto>/03-UX-UI-DX/` para la línea de base, `SDD/Docs/Proyectos/<Nombre-Proyecto>/08-Calidad-Y-Pruebas/` para la matriz de sensado
**Subagente target del orquestador:** el subagente de la categoría que emite la afirmación; el auditor independiente para la verificación
**Versión de las reglas:** 1.1

---

## 0. El problema que resuelve

Un agente deriva cuando lo que produce se aleja progresivamente de lo que se especificó, sin que nadie lo note en el momento. La deriva no es una falla puntual: es acumulativa y se manifiesta tarde, cuando el código ya está escrito y el costo de volver es alto.

El template SDD tiene dos mecanismos previos contra la deriva y los dos son insuficientes por sí solos. La trazabilidad D6 verifica que las referencias entre documentos cierren, pero no verifica que el contenido referenciado siga significando lo mismo. La auditoría entre fases verifica conformidad estructural, pero un documento puede ser estructuralmente impecable y describir un producto que no es el que se acordó.

Lo que falta es un punto de comparación externo y concreto contra el cual contrastar el resultado. La maqueta aprobada en la Fase B2, junto con el modelo de datos que exhibe, es exactamente eso: un artefacto que el humano miró y aprobó, con superficies, componentes, estados, rutas y campos identificados uno por uno. Contra esa línea de base se puede preguntar, en cualquier momento posterior, si lo construido sigue siendo lo aprobado.

Este documento define ese mecanismo, al que el template llama sensado de deriva, y la regla de evidencia que lo sostiene.

---

## 1. La regla de evidencia verificable (D9)

**D9 — Toda afirmación sobre el estado del sistema debe estar respaldada por evidencia verificable.**

Alcance de D9. La regla no aplica a toda oración de todo documento: aplica a las afirmaciones sobre el estado del sistema, que son las que un agente puede fabricar sin darse cuenta. Concretamente:

| Tipo de afirmación | ¿Aplica D9? | Ejemplo |
| --- | --- | --- |
| Sobre lo que el sistema hace o tiene construido | Sí | "La superficie de listado implementa los cuatro estados" |
| Sobre conformidad con la línea de base | Sí | "El modelo de datos implementado coincide con el contrato de maqueta" |
| Sobre resultados de verificación | Sí | "La cobertura de la suite es 85 por ciento" |
| Sobre cumplimiento de un criterio de aceptación | Sí | "El criterio de accesibilidad de la pantalla está cumplido" |
| De diseño o de decisión | No | "Se adopta arquitectura en capas porque el dominio es acotado" |
| De especificación o de intención | No | "El sistema debe permitir cancelar un turno" |
| De contexto o de negocio | No | "Los usuarios operan en turnos de seis horas" |

La distinción es la que separa el modo indicativo del modo imperativo. Lo que se decide o se pide no necesita evidencia, se necesita justificación. Lo que se afirma que ya es, sí.

Forma de la evidencia. Una evidencia es verificable cuando cumple las cuatro condiciones:

1. Es localizable: apunta a un artefacto concreto con su ruta, y dentro de él a una sección, un identificador o una línea.
2. Es reproducible: otro agente o el humano puede volver a obtenerla siguiendo el método declarado, y obtiene lo mismo.
3. Es contemporánea: se declara la fecha o el commit en que se obtuvo. Una evidencia sin fecha no dice nada sobre el presente.
4. Es independiente de quien afirma: no vale como evidencia la propia afirmación reformulada, ni el resumen que produjo el mismo agente en el mismo paso.

Formato de cita de evidencia, obligatorio cuando D9 aplica:

```text
[EV-XX | <tipo> | <ruta-o-comando> | <ubicación dentro del artefacto> | <fecha o commit>]
```

Tipos de evidencia admitidos: `artefacto` (un archivo del repositorio), `ejecucion` (la salida de un comando reproducible), `linea-base` (un identificador de la línea de base visual o del contrato de datos), `audit` (un hallazgo de un informe de audit), `humano` (una aprobación explícita registrada con fecha).

Qué no es evidencia: la afirmación de un agente sin respaldo, una cita a un documento que no existe todavía, una referencia genérica a "la documentación", un porcentaje sin método de medición, una captura de una conversación.

Consecuencia. Una afirmación de las que requieren evidencia y no la trae es un hallazgo P1 del audit. Una afirmación con evidencia que no resuelve (ruta inexistente, identificador inexistente, comando que no reproduce) es un hallazgo P0: es peor que no citar, porque simula verificación.

D9 rige desde su incorporación hacia adelante. No se aplica retroactivamente a la documentación generada antes de que existiera: reauditar toda la prosa previa contra una regla nueva produciría un volumen de hallazgos que ahoga a los reales.

---

## 2. Los artefactos de línea de base

La línea de base se emite al cierre de la Fase B2, con la maqueta aprobada. Son tres artefactos y cada uno tiene su sistema de identificadores, porque un elemento sin identificador no se puede rastrear.

A esos tres se suma una cuarta fuente de sondas que no proviene de la maqueta: los contratos de verificación de la categoría 10, descriptos en §2.4. La distinción importa porque cubren dimensiones distintas. Las sondas de maqueta miden si el sistema construido se parece a lo que el humano aprobó mirando; las sondas de verificación miden si el sistema construido sigue haciendo lo que la especificación dice que hace. Un proyecto sin interfaz visual no tiene línea de base de maqueta y aun así tiene deriva que sensar.

### 2.1 `Linea-Base-Visual-v1.0.md`

Ubicación: `SDD/Docs/Proyectos/<Nombre-Proyecto>/03-UX-UI-DX/`.

Inventario de lo que el humano aprobó al mirar la maqueta. Cuatro tablas, cada una con su prefijo de identificador:

| Prefijo | Elemento | Qué registra cada fila |
| --- | --- | --- |
| `SUP-XX` | Superficie | Nombre canónico, archivo de la maqueta, wireframe de 03 que la especifica, CU de 02 que la origina, propósito en una línea |
| `CMP-XX` | Componente | Nombre, superficies en que aparece, datos que muestra, comportamiento, patrón del catálogo de diseño que materializa |
| `EST-XX` | Estado | Superficie o componente al que pertenece, condición que lo produce, representación aprobada |
| `NAV-XX` | Ruta de navegación | Superficie origen, disparador, superficie destino, qué se preserva al volver |

Los identificadores son de dos dígitos uniformes, como el resto de los identificadores del template (D3, D4). Son estables: un elemento que se elimina no libera su número; su fila queda con estado `Retirado` y la fecha, para que una referencia vieja no apunte a otra cosa.

### 2.2 `Contrato-Datos-Maqueta-v1.0.md`

Ubicación: `SDD/Docs/Proyectos/<Nombre-Proyecto>/03-UX-UI-DX/`.

El modelo de datos tal como quedó validado visualmente. Es el documento que cierra la brecha entre el modelo conceptual de 02, que es abstracto, y lo que el humano efectivamente vio y aprobó.

| Prefijo | Elemento | Qué registra cada fila |
| --- | --- | --- |
| `DM-XX` | Campo del modelo | Entidad, nombre del campo, tipo, obligatoriedad, ejemplo exhibido en la maqueta, superficies donde aparece (`SUP-XX`), entidad y atributo del modelo conceptual de 02 que le corresponde, regla de negocio que lo condiciona si la hay |

Reglas del contrato:

- Todo campo que la maqueta exhibe tiene su fila. Si un campo aparece en la maqueta y no existe en el modelo conceptual de 02, es un hallazgo que se resuelve en la retroalimentación de la Fase B2, no una fila que se agrega sin más.
- Todo campo del modelo conceptual que ninguna superficie exhibe se declara explícitamente en una sección de campos no exhibidos, con el motivo. Un campo que el humano nunca vio no está validado visualmente, y eso hay que saberlo.
- El formato de presentación de cada campo es parte del contrato: una fecha que se aprobó en formato largo y aparece en el sistema construido como marca de tiempo cruda es deriva, aunque el dato sea el mismo.

### 2.3 `Matriz-Sensado-Deriva-v1.0.md`

Ubicación: `SDD/Docs/Proyectos/<Nombre-Proyecto>/08-Calidad-Y-Pruebas/`.

La matriz es el instrumento operativo: convierte la línea de base en una lista de comprobaciones que el humano o un agente pueden correr en cualquier momento de la codificación.

| Columna | Contenido |
| --- | --- |
| ID | `SD-XX` |
| Elemento de línea de base | El identificador que se verifica: `SUP-XX`, `CMP-XX`, `EST-XX`, `NAV-XX`, `DM-XX` o `VER-XX` |
| Afirmación a verificar | Qué tendría que ser cierto en el sistema construido |
| Método de verificación | Cómo se comprueba: inspección visual contra la maqueta, test automatizado de 08, inspección del esquema de datos, revisión de una ruta, o el comando declarado en el contrato de verificación cuando la sonda es `VER-XX` |
| Evidencia esperada | Qué artefacto o ejecución produce la evidencia, en el formato de §1 |
| Umbral de deriva | Qué diferencia se considera aceptable y cuál no |
| Estado | `Sin verificar`, `Conforme`, `Deriva menor`, `Deriva mayor` |
| Fecha de la última verificación | — |

La matriz vive en 08 y no en 03 porque es un instrumento de verificación, y 08 es la categoría dueña de la verificación. La emite AG-03M al cerrar la Fase B2, y AG-08 la incorpora a la estrategia de testing del proyecto cuando genera la Fase E.

Cuando el proyecto no ejecuta Fase B2 pero sí tiene categoría 10, la matriz se emite igual: la abre AG-08 en la Fase E, poblada solo con sondas `VER-XX` tomadas de los contratos de verificación. Una matriz sin filas es un proyecto sin instrumento de sensado, y eso hay que evitarlo, no documentarlo.


### 2.4 Contratos de verificación de la categoría 10 (`VER-XX`)

Ubicación: dentro de cada `ejemplo-XX-<Progresion>-v<X.Y>.md` de `SDD/Docs/Proyectos/<Nombre-Proyecto>/10-Examples/`, en su sección 9. Los define `Rules-Examples.md` §4.6; esta regla solo declara cómo entran al sensado.

| Prefijo | Elemento | Qué registra cada sonda |
| --- | --- | --- |
| `VER-XX` | Contrato de verificación de un sample | Los `CU-XX` y `US-XX` que ejercita, el comando exacto, las precondiciones, el criterio de aceptación como aserción evaluable y la evidencia de la última corrida con su fecha |

Estas sondas extienden el alcance de la matriz de superficies visuales a **contratos y comportamiento**. Tres consecuencias que hay que tener presentes:

- **No requieren maqueta.** Un proyecto con `requiere_maqueta` en `false` no emite `Linea-Base-Visual` ni `Contrato-Datos-Maqueta`, pero sí emite `Matriz-Sensado-Deriva` si tiene categoría 10, poblada exclusivamente con sondas `VER-XX`. Antes de esta extensión, esos proyectos quedaban sin ningún instrumento de sensado.
- **Su método de verificación es siempre automatizable.** A diferencia de una sonda `SUP-XX`, que suele resolverse por inspección visual, una `VER-XX` trae su propio comando y su propia aserción. La columna «Método de verificación» de la matriz se completa con el comando del contrato.
- **Su evidencia ya existe.** El campo `evidencia` del contrato es la evidencia que D9 exige. No hay que producirla aparte: la matriz la cita por identificador.

Un contrato en estado `No verificado — sin código` entra a la matriz con estado `Sin verificar`, igual que cualquier otra sonda antes de la primera corrida.
---

## 3. Umbrales de deriva

No toda diferencia entre la maqueta y el sistema construido es un problema. La maqueta es una línea de base de un momento, no un contrato pixel a pixel. Sin umbrales declarados, el sensado produce ruido y se abandona.

| Dimensión | Deriva menor (se registra, no bloquea) | Deriva mayor (bloquea y exige decisión) |
| --- | --- | --- |
| Superficies | Cambia el nombre, se reordena el contenido | Falta una superficie aprobada, aparece una no aprobada, se fusionan dos |
| Componentes | Cambia el espaciado, el orden de las columnas, el texto de una etiqueta | Falta un componente, cambia el tipo de presentación (tabla por tarjetas), desaparece una acción |
| Estados | Cambia el texto del mensaje, el tipo de indicador de carga | Falta un estado aprobado, un estado cambia de condición disparadora |
| Navegación | Cambia el disparador visual de una ruta | Falta una ruta, aparece un callejón sin salida, se pierde lo que debía preservarse al volver |
| Modelo de datos | Cambia el orden de los campos en la presentación | Falta un campo, cambia el tipo, cambia la obligatoriedad, cambia el formato de presentación acordado |
| Accesibilidad | Cambia el orden de foco dentro de un grupo | Se pierde el recorrido por teclado, se pierde el foco visible, cae el contraste bajo el piso |
| Contratos y comportamiento (`VER-XX`) | Cambia el texto de un mensaje de salida sin cambiar su semántica, cambia el formato de un log | El `criterio_aceptacion` falla, cambia el comando de ejecución sin actualizar el contrato, aparecen precondiciones no declaradas, o el CU que la sonda ejercita dejó de estar cubierto |

Toda deriva mayor detectada se resuelve por una de dos vías, nunca por omisión:

1. Se corrige el sistema construido para volver a la línea de base.
2. Se actualiza la línea de base, con aprobación humana explícita, porque la realidad de la construcción reveló que la línea de base estaba equivocada. En ese caso la línea de base sube versión, la maqueta se corrige, y la matriz de propagación de `Maqueta-Rules.md` §3.6 se aplica de nuevo.

La vía 2 es legítima y frecuente. Lo que no es legítimo es que la línea de base y el sistema se separen sin que nadie lo declare: eso es exactamente la deriva.

---

## 4. Puntos de sensado

El sensado no es un evento único al final. Son cinco momentos, cada uno con su alcance:

| Momento | Quién lo corre | Alcance | Salida |
| --- | --- | --- | --- |
| Al cerrar la Fase B2 | AG-03M | Emisión de la línea de base y de la matriz con todo en `Sin verificar` | Los artefactos de §2.1 a §2.3 |
| Al cerrar la fase que genera la categoría 10 | AG-10 | Alta de una sonda `VER-XX` por cada contrato de verificación declarado en la pasada de diseño, todas en `Sin verificar` | Matriz con las filas de contratos incorporadas |
| Al cerrar la Fase E (08) | AG-08 | Incorporación de la matriz a la estrategia de testing: qué filas se cubren con test automatizado y cuáles quedan como inspección. Las filas `VER-XX` ya traen su comando, así que se resuelven como automatizadas salvo justificación | Matriz con método de verificación resuelto por fila |
| Al cerrar cada sprint de codificación | El humano, asistido por el orquestador | Verificación de las filas cuyos elementos toca el sprint. En las `VER-XX` esto significa correr el comando del contrato y volcar la salida real al campo `evidencia` del sample | Matriz con estado y fecha actualizados, derivas mayores escaladas |
| Ante una regeneración parcial | El orquestador | Revalidación de las filas que dependen de lo regenerado | Filas afectadas devueltas a `Sin verificar` |

El cuarto momento es el que da valor a todo lo anterior. Ocurre durante la codificación, y es el punto donde las dos clases de sonda se comportan distinto: una `SUP-XX` exige que alguien mire y compare, mientras que una `VER-XX` se corre sola y devuelve un veredicto. Esa asimetría es deliberada, y es la razón por la que conviene que todo proyecto tenga sondas de comportamiento aunque no tenga superficie visual.

Por eso el resumen ejecutivo del handoff (§12 del master-prompt) entrega la matriz explícitamente: es el instrumento que el equipo se lleva al ciclo de desarrollo.

---

## 5. Cómo se usa la línea de base como guía tutora

La línea de base sirve a dos lectores distintos y hay que escribirla para los dos.

Para el humano. La maqueta abierta al lado del sistema construido es la comparación más barata que existe: se mira, se navega y se ven las diferencias sin leer una línea de documentación. La matriz le da la lista de qué mirar para no revisar solo lo que le llama la atención.

Para el agente. La línea de base es la única descripción del resultado esperado que está en forma de inventario identificado y no de prosa. Un agente que va a codificar una superficie puede pedir su fila `SUP-XX`, sus `CMP-XX`, sus `EST-XX` y sus `DM-XX`, y tiene el alcance exacto sin interpretar. Un agente que va a verificar puede recorrer la matriz sin decidir qué es relevante.

Reglas de uso:

- La línea de base se cita, no se reinterpreta. Un agente que necesita algo que no está en la línea de base lo pide, no lo deduce.
- La línea de base no reemplaza a la especificación. Dice qué elementos hay y cómo se ven; el porqué y el comportamiento fino siguen viviendo en 02 y 03.
- Un elemento que no está en la línea de base no está prohibido: está sin validar visualmente. La distinción importa, porque tratarlo como prohibido paraliza la construcción y tratarlo como aprobado es deriva.

---

## 6. Criterios de aceptación

- [ ] En proyectos con Fase B2: existen `Linea-Base-Visual-v1.0.md` y `Contrato-Datos-Maqueta-v1.0.md` en 03 del proyecto, con los identificadores `SUP-XX`, `CMP-XX`, `EST-XX`, `NAV-XX` y `DM-XX` de dos dígitos uniformes.
- [ ] Toda superficie de la maqueta aprobada tiene su `SUP-XX`, y toda superficie con `SUP-XX` existe en la maqueta.
- [ ] Todo campo que la maqueta exhibe tiene su `DM-XX` con su correspondencia al modelo conceptual de 02.
- [ ] Los campos del modelo conceptual que ninguna superficie exhibe están declarados con su motivo.
- [ ] Existe `Matriz-Sensado-Deriva-v1.0.md` en 08 del proyecto, con una fila `SD-XX` por elemento verificable, su método de verificación, su evidencia esperada y su umbral.
- [ ] Los umbrales de deriva de cada fila son coherentes con la tabla del §3.
- [ ] Toda afirmación sobre el estado del sistema en los artefactos de la fase cita evidencia en el formato del §1.
- [ ] Ninguna evidencia citada apunta a una ruta, identificador o comando que no resuelve.
- [ ] El resumen ejecutivo del handoff incluye la matriz de sensado con el estado de cada fila.
- [ ] En proyectos con categoría 10: la matriz tiene una fila `VER-XX` por cada contrato de verificación declarado en `10-Examples`, sin contratos huérfanos ni filas sin contrato que las respalde.
- [ ] Ningún proyecto con categoría 10 queda sin `Matriz-Sensado-Deriva-v1.0.md`, aunque no haya ejecutado Fase B2.
- [ ] El método de verificación de cada fila `VER-XX` es el comando declarado en su contrato, o su desvío está justificado en la propia fila.
- [ ] La evidencia de cada fila `VER-XX` cita el campo `evidencia` del sample por identificador, con su fecha, y no se transcribe duplicada en la matriz.

---

## 7. Anti-patrones a evitar

| Anti-patrón | Problema | Solución |
| --- | --- | --- |
| Línea de base escrita como prosa descriptiva | No se puede rastrear ni verificar elemento por elemento | Inventario con identificadores estables de dos dígitos |
| Matriz sin umbrales | Toda diferencia parece deriva; el equipo la abandona en dos sprints | Declarar umbral por fila según la tabla del §3 |
| Matriz sin método de verificación | Nadie sabe cómo comprobar la fila, así que nadie la comprueba | Método concreto por fila, resuelto por AG-08 en la Fase E |
| Evidencia que cita al mismo agente que afirma | Verificación circular: el agente se cita a sí mismo | La evidencia es independiente de quien afirma |
| Evidencia sin fecha ni commit | No se sabe si sigue siendo cierta | Contemporaneidad obligatoria en el formato de cita |
| Deriva mayor registrada y no escalada | La matriz se convierte en un registro de deudas que nadie paga | Toda deriva mayor se resuelve por corrección o por actualización aprobada de la línea de base |
| Actualizar la línea de base en silencio para que cierre | Se elimina el punto de comparación y el sensado deja de sensar | La actualización sube versión, requiere aprobación humana y re-dispara la propagación |
| Aplicar D9 a toda oración de todo documento | Se llena la documentación de citas ceremoniales y se pierde la señal | D9 aplica a las afirmaciones sobre el estado del sistema, según la tabla del §1 |
| Reauditar retroactivamente toda la documentación previa contra D9 | Volumen de hallazgos que ahoga a los reales | D9 rige hacia adelante desde su incorporación |
| Tratar la maqueta como contrato pixel a pixel | Bloqueo permanente por diferencias irrelevantes | Umbrales de deriva menor y mayor |
| Emitir línea de base sin Fase B2 | No hay nada que el humano haya mirado y aprobado; la línea de base es una afirmación más | La línea de base se emite solo desde una maqueta aprobada explícitamente |
| Dejar sin matriz a un proyecto sin interfaz visual | Se lo deja sin instrumento de sensado por no tener maqueta, cuando sí tiene contratos que pueden derivar | Si hay categoría 10, la matriz se emite con sondas `VER-XX` aunque no haya Fase B2 |
| Sonda `VER-XX` con método de verificación manual | Desaprovecha lo único que la distingue: que trae su comando y su aserción | El método es el comando del contrato, salvo justificación escrita en la fila |
| Transcribir la evidencia del contrato dentro de la matriz | Dos copias de la misma salida que divergen en la corrida siguiente | La matriz cita el `VER-XX` y su fecha; la salida vive en el sample |
| Confundir deriva de superficie con deriva de comportamiento | Se aplica el umbral equivocado y se escala mal | `SUP-XX` a `DM-XX` miden parecido con lo aprobado; `VER-XX` mide si el sistema sigue haciendo lo especificado |

---

## 8. Prompt-snippet sugerido

```text
Sos el subagente responsable de emitir la línea de base de sensado de deriva del proyecto
{{NOMBRE_PROYECTO}} de la solución {{NOMBRE_SOLUCION}}, al cierre de la Fase B2.

Insumos obligatorios:
- La maqueta aprobada: SDD/Maquetas/{{NOMBRE_PROYECTO}}/ (todos sus archivos).
- Bitacora-Validacion-Maqueta-v1.0.md con las iteraciones de validación.
- 03 del proyecto: Experiencia-De-Uso y wireframes-<superficie> ya retroalimentados.
- 02 del proyecto: modelo conceptual de datos, CU y RN.

A generar:
- SDD/Docs/Proyectos/{{NOMBRE_PROYECTO}}/03-UX-UI-DX/Linea-Base-Visual-v1.0.md
- SDD/Docs/Proyectos/{{NOMBRE_PROYECTO}}/03-UX-UI-DX/Contrato-Datos-Maqueta-v1.0.md
- SDD/Docs/Proyectos/{{NOMBRE_PROYECTO}}/08-Calidad-Y-Pruebas/Matriz-Sensado-Deriva-v1.0.md

Reglas: §1 a §5 de Deriva-Rules.md.
Identificadores: SUP-XX, CMP-XX, EST-XX, NAV-XX, DM-XX, SD-XX, dos dígitos uniformes, estables.
Regla D9: toda afirmación sobre el estado del sistema cita evidencia en el formato de §1.
Umbrales: declarar deriva menor y mayor por fila según la tabla de §3.

Restricciones: no inventar elementos que la maqueta no exhibe; no reinterpretar la especificación;
todo elemento de la línea de base tiene que ser observable en la maqueta aprobada.
Idioma rioplatense técnico, tildes correctas, sin emojis.

Devolución:
1. Lista de artefactos generados con la cantidad de identificadores de cada tipo.
2. Lista de campos del modelo conceptual no exhibidos, con su motivo.
3. Lista de discrepancias detectadas entre la maqueta y la especificación de 02 o 03.
4. Auto-chequeo contra §6 de Deriva-Rules.md.
```

---

## 9. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-19 | Reglas iniciales del sensado de deriva. Define la regla de evidencia verificable D9 con su alcance acotado a las afirmaciones sobre el estado del sistema, las cuatro condiciones de una evidencia y su formato de cita `EV-XX`; los tres artefactos de línea de base (`Linea-Base-Visual`, `Contrato-Datos-Maqueta`, `Matriz-Sensado-Deriva`) con sus sistemas de identificadores; los umbrales de deriva menor y mayor por dimensión; los cuatro puntos de sensado; el uso de la línea de base como guía tutora para el humano y para el agente; criterios de aceptación, anti-patrones y prompt-snippet. |
| 1.1 | 2026-07-26 | Extensión del sensado de deriva a contratos y comportamiento (S2). Nuevo §2.4 con las sondas `VER-XX` aportadas por los contratos de verificación de la categoría 10, que no dependen de la maqueta y traen su propio comando y su propia evidencia. §2.3 admite `VER-XX` en la columna de elemento de línea de base y en la de método de verificación, y declara que un proyecto con categoría 10 emite matriz aunque no ejecute Fase B2. §3 suma la dimensión de contratos y comportamiento con sus dos umbrales. §4 pasa de cuatro a cinco puntos de sensado, con el alta de sondas al cerrar la fase que genera la categoría 10. §6 suma cuatro criterios de aceptación. |
