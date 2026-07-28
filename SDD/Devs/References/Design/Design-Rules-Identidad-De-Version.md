# Reglas de diseño — Identidad de versión y su superficie

**Proyecto:** {{nombre-solucion}}
**Documento:** Design-Rules-Identidad-De-Version.md
**Versión:** 1.0
**Estado:** Vigente
**Fecha:** 2026-07-18
**Autor:** {{equipo-o-rol}} (AG-03 UX/UI)
**Ámbito:** Capacidad transversal — identidad de versión de una instancia desplegada (agnóstico de framework)
**Hereda de:** `Design-Rules-Web-Generico.md`
**Posición:** Insumo normativo de la categoría 03. Extensión por capacidad del catálogo `References/Design/`. No es un artefacto operativo de `docs/`.

---

## 0. Propósito y alcance

Este documento codifica cómo una instancia desplegada declara qué versión de sí misma está corriendo, y cómo esa declaración se presenta al usuario que la opera. Es una extensión por capacidad del catálogo, transversal a cualquier stack, y aplica a todo proyecto que se despliegue en instancias que alguien tenga que identificar, diagnosticar o actualizar.

Carga condicional: el subagente AG-03 lo suma al base cuando el proyecto produce artefactos desplegables identificables (Parte C del intake) y tiene una superficie donde exhibirlos. En proyectos sin UI final, la capacidad sigue vigente pero se materializa en la superficie DX correspondiente (salida de ayuda, encabezado de diagnóstico, registro de arranque) en vez de en una pantalla.

La versión no es un adorno del pie de página: es el dato que convierte un reporte de problema en un diagnóstico. Sin versión visible, toda conversación sobre una instancia empieza por averiguar qué instancia es. Este documento trata la identidad de versión como una capacidad de UX con contrato propio, y fija el criterio para que ese dato sea derivado y no inventado.

Fuera de alcance. Este documento codifica el contrato de la identidad de versión y su presentación. La mecánica de cálculo de la versión, el etiquetado de artefactos, la promoción entre entornos, las notas de publicación y la política de compatibilidad son ingeniería de entrega: viven en la categoría 09 y se anclan en las decisiones de arquitectura de 05. Acá se los referencia como cross-ref, y se fija únicamente el contrato que la superficie consume.

Marco de referencia: el del documento base, más la heurística de visibilidad del estado del sistema aplicada a la instancia, y el principio de fuente única de la extensión de configuración por esquema aplicado a la identidad del artefacto.

---

## 1. Principio: la versión se deriva, no se escribe

La versión que muestra una instancia se deriva del proceso que la construyó. No la escribe una persona en la superficie, ni se transcribe a mano en un archivo de la vista, ni se mantiene en paralelo en dos lugares.

Consecuencia directa: una versión escrita a mano miente en cuanto alguien olvida actualizarla, y miente en silencio. Una versión derivada de la construcción es, por definición, la del artefacto que está corriendo. Es la aplicación, a la identidad del artefacto, del mismo principio de fuente única con el que el documento base trata los tokens y la extensión de configuración trata los defaults.

Corolario de diseño: la superficie no compone la versión a partir de partes ni le agrega sufijos propios. Recibe una cadena ya formada por el proceso de construcción y la muestra. Si falta el dato, muestra el marcador de origen indeterminado (§5), nunca una versión inventada ni un espacio en blanco.

---

## 2. Contrato de la identidad de versión

La identidad de versión es el conjunto mínimo de datos que la superficie consume. Se declara una vez, en el punto de composición del sistema, y todas las superficies lo leen de ahí.

| Campo del contrato | Qué hace en la UI |
| --- | --- |
| `versionLegible` | Cadena que se muestra al usuario. Es el dato principal y el único obligatorio. |
| `identificadorDeConstruccion` | Referencia opaca al acto de construcción (secuencia o huella del origen). Amplía el diagnóstico cuando dos instancias comparten `versionLegible`. |
| `esPreliminar` | Indica que el artefacto no proviene de una línea de publicación estable. Habilita el distintivo de §4.3. |
| `origenIndeterminado` | La identidad no pudo derivarse del proceso de construcción. Habilita el marcador de §5. |

Reglas de uso del contrato:
- La superficie recibe `versionLegible` ya formada; no la ensambla ni la reformatea.
- Un mismo contrato alimenta todas las superficies que exhiben versión; no hay una versión de la pantalla y otra del diagnóstico.
- `origenIndeterminado` es un estado legítimo y se muestra como tal. Ocultarlo produce instancias que aparentan ser publicadas sin serlo.
- El contrato es de solo lectura para la UX. No existe superficie que permita fijar la versión a mano.

---

## 3. Los consumidores de la identidad de versión

Un mismo contrato alimenta consumidores con necesidades distintas de detalle. La superficie de usuario muestra lo mínimo; las superficies de diagnóstico muestran todo.

| Consumidor | Qué toma del contrato |
| --- | --- |
| Sello de versión en la UI | `versionLegible`, más el distintivo si `esPreliminar`, más el marcador si `origenIndeterminado`. |
| Detalle de diagnóstico | El contrato completo, incluido `identificadorDeConstruccion`. |
| Superficie DX (proyectos sin UI final) | El contrato completo, en la salida de ayuda o el encabezado de diagnóstico. |
| Reporte de problema | El contrato completo, copiable en un solo gesto (§4.4). |

El primer consumidor es el que ve el usuario todos los días; los otros tres son los que se usan el día que algo falla. El diseño debe servir a los cuatro sin que el primero cargue con el detalle de los otros.

---

## 4. Patrones de componente

Heredan los tokens, la tipografía y el espaciado del documento base. Cada patrón declara anatomía, estados y comportamiento, y los wireframes lo referencian por nombre.

### 4.1 Sello de versión
Anatomía: texto en `type.meta`, `color.text.tertiary`, sin borde ni fondo, ubicado al pie de la superficie que lo aloja. Estados: normal, preliminar (§4.3), indeterminado (§5). Comportamiento: es información, no acción; no compite visualmente con nada. Se dibuja al pie precisamente porque su valor es estar siempre disponible sin reclamar atención.

### 4.2 Ubicación obligatoria del sello
El sello aparece, como mínimo, en dos lugares: la superficie de acceso (visible antes de autenticarse, cuando todavía es la única información disponible sobre la instancia) y una superficie del sistema en funcionamiento alcanzable desde la navegación. Mostrarlo solo antes de entrar deja sin dato a quien ya está operando; mostrarlo solo adentro deja sin dato a quien no puede entrar, que es justamente el caso en el que más se lo necesita.

### 4.3 Distintivo de artefacto preliminar
Anatomía: chip de estado (`radius.pill`, `type.meta`) con estado `warning`, texto explícito, contiguo al sello. Comportamiento: aparece solo si `esPreliminar`. Declara que la instancia no proviene de una línea de publicación estable, lo que cambia por completo la lectura de cualquier comportamiento anómalo. Nunca se comunica solo por color: lleva siempre su etiqueta.

### 4.4 Detalle de diagnóstico
Anatomía: superficie o panel de divulgación que expone el contrato completo en filas clave/valor, con una acción de copiado en un solo gesto. Estados: colapsado, expandido, copiado. Comportamiento: se abre desde el sello. El copiado produce un bloque de texto plano listo para pegar en un reporte; pedirle al usuario que transcriba a mano un identificador de construcción es garantizar el error de transcripción.

### 4.5 Marcador de origen indeterminado
Anatomía: el sello reemplaza `versionLegible` por un marcador textual explícito que declara que la identidad no pudo derivarse. Comportamiento: se muestra tal cual, sin disimulo. Es el estado esperado en ejecución local y el estado alarmante en una instancia desplegada; distinguir ambos casos es responsabilidad de quien lee, y para eso el marcador debe ser visible.

---

## 5. Estados y feedback

| Estado | Condición | Feedback visual | Feedback textual |
| --- | --- | --- | --- |
| Versión publicada | `versionLegible` presente, `esPreliminar` falso | Sello en `type.meta` al pie | La versión, sin adornos |
| Versión preliminar | `esPreliminar` verdadero | Sello + chip `warning` contiguo | Versión más la declaración de artefacto preliminar |
| Origen indeterminado | `origenIndeterminado` verdadero | Sello con marcador explícito | Que la identidad no pudo derivarse de la construcción |
| Detalle expandido | El usuario abrió el diagnóstico | Filas clave/valor + acción de copiado | Contrato completo, incluido el identificador de construcción |
| Detalle copiado | Se ejecutó el copiado | Confirmación efímera | Que el bloque quedó disponible para pegar |

Ningún estado se comunica solo por color; el distintivo de preliminar y el marcador de indeterminado son textuales por definición.

---

## 6. La frontera con la ingeniería de entrega (lado UX)

Este documento fija qué consume y qué muestra la superficie. Cómo se produce ese dato es de la categoría 09, y la frontera entre ambos es el contrato de §2.

Reglas de la frontera que sí son de diseño:
- La superficie no participa del cálculo. Recibe el contrato ya resuelto en el punto de composición del sistema.
- La superficie no distingue entornos por su cuenta. Si un entorno debe mostrarse distinto, esa distinción llega como campo del contrato, no como condicional en la vista.
- Una instancia sin identidad de versión es una instancia no diagnosticable. La ausencia del dato es un hallazgo de diseño, no una omisión menor.
- La cadena que se muestra al usuario y la que se registra en el diagnóstico son la misma. Dos representaciones distintas del mismo artefacto obligan a traducir en el peor momento.

Cross-ref. El cálculo de la versión a partir del origen, la precisión con la que se sella en los binarios, el etiquetado de los artefactos publicados, las notas de publicación y la política de compatibilidad son categoría 09. Las decisiones de compatibilidad que la versión comunica se registran como decisiones de arquitectura en 05. El qué funcional de identificar una instancia vive en 02.

---

## 7. Esqueleto de referencia

Sello y detalle de diagnóstico (patrones §4.1, §4.3, §4.4):

```text
+--------- superficie que aloja el sello ---------+
|                                                 |
|   ... contenido de la superficie ...            |
|                                                 |
|          <versión legible>  [preliminar]        |  §4.1 + §4.3
|                    ^ abre el detalle            |
+-------------------------------------------------+

detalle expandido (§4.4):
+-------------------------------------------------+
|  Versión               | <versión legible>      |
|  Construcción          | <identificador>        |
|  Origen                | <estado>               |
|                          [ Copiar diagnóstico ] |
+-------------------------------------------------+
```

---

## 8. Accesibilidad de los patrones nuevos (WCAG 2.2 AA, piso)

- El sello cumple el contraste mínimo de texto pese a su jerarquía baja: información secundaria no significa información ilegible.
- El distintivo de preliminar y el marcador de indeterminado son textuales; el color es refuerzo, nunca el único canal.
- El detalle de diagnóstico es un disclosure operable por teclado, que declara `aria-expanded` según su estado.
- La confirmación de copiado se anuncia como región activa; un cambio visual efímero no alcanza.
- El sello no es un elemento interactivo salvo que abra el detalle; cuando lo hace, expone foco visible y rol acorde.

---

## 9. Criterios de aceptación del diseño

Una superficie cumple esta extensión cuando: la versión que se muestra se deriva del proceso de construcción y la vista no la compone, transcribe ni reformatea; el sello está presente tanto en la superficie de acceso como en una superficie del sistema en funcionamiento; el artefacto preliminar se declara con distintivo textual; el origen indeterminado se muestra explícitamente en vez de disimularse con un espacio en blanco o una versión inventada; existe un detalle de diagnóstico con el contrato completo y copiado en un solo gesto; la cadena mostrada al usuario y la registrada en el diagnóstico son la misma; y los patrones nuevos cumplen accesibilidad AA (contraste del sello, canales redundantes, disclosure por teclado con `aria-expanded`, confirmación anunciada).

---

## 10. Anti-patrones

| Anti-patrón | Problema | Corrección |
| --- | --- | --- |
| Versión transcrita a mano en la vista | Se desactualiza en silencio y miente sobre el artefacto que corre | Derivarla del proceso de construcción y solo mostrarla |
| Dos fuentes de versión (vista y artefacto) | Divergen y obligan a averiguar cuál creerle | Un contrato único que alimenta a todos los consumidores |
| Versión visible solo antes de autenticarse | Quien ya está operando no puede reportar su instancia | Sello también en una superficie del sistema en funcionamiento |
| Versión visible solo dentro del sistema | Quien no puede entrar, que es cuando más se necesita, no la ve | Sello también en la superficie de acceso |
| Ocultar el origen indeterminado | Una instancia local aparenta ser publicada | Mostrar el marcador explícito |
| Identificador de construcción para transcribir a mano | Garantiza el error de transcripción en el reporte | Copiado en un solo gesto |
| Cadena distinta en la UI y en el diagnóstico | Obliga a traducir entre representaciones en el peor momento | Una sola cadena para ambos |
| Sello con contraste por debajo del piso | Información secundaria vuelta ilegible | Jerarquía baja con contraste AA |

---

## 11. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Especialidad dueña | AG-03 UX/UI |
| Hereda de | `Design-Rules-Web-Generico.md` |
| Mapeado por | especializaciones por stack (por ejemplo `Design-Rules-Blazor-Mudblazor.md`) |
| Extensión hermana | `Design-Rules-Acceso-Monousuario.md` (aloja el sello en la superficie de acceso) |
| Regla que lo invoca | `devs/Rules/Rules-UX-UI-DX.md` (cuando el proyecto produce artefactos desplegables identificables) |
| Cross-ref de entrega | categoría 09 (cálculo de la versión, sellado en binarios, etiquetado de artefactos, notas de publicación) |
| Cross-ref técnico | categoría 05 (decisiones de compatibilidad que la versión comunica, punto de composición del contrato) |
| Cross-ref funcional | categoría 02 (qué funcional de identificar una instancia) |
| Marco teórico | `Guides/Marco-Teorico-SDD.md`, cap. UX/UI/DX |
| Artefactos operativos que lo aplican | `experiencia-de-uso`, `wireframes-<superficie>` de las superficies que alojan el sello y el diagnóstico |

---

## 12. Control de cambios

| Versión | Fecha | Cambios | Autor |
| --- | --- | --- | --- |
| 1.0 | 2026-07-18 | Versión inicial. Extensión por capacidad: identidad de versión y su superficie. Principio de versión derivada, contrato de identidad de versión y sus consumidores, patrones de componente (sello, ubicación obligatoria, distintivo de preliminar, detalle de diagnóstico, marcador de origen indeterminado), estados, frontera con la ingeniería de entrega, esqueleto de referencia, accesibilidad AA y anti-patrones. Agnóstico de framework, sin literales de dominio. | AG-03 UX/UI |
