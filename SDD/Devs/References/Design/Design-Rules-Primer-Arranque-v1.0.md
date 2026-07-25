# Reglas de diseño — Primer arranque y aprovisionamiento inicial

**Proyecto:** {{nombre-solucion}}
**Documento:** Design-Rules-Primer-Arranque-v1.0.md
**Versión:** 1.0
**Estado:** Vigente
**Fecha:** 2026-07-18
**Autor:** {{equipo-o-rol}} (AG-03 UX/UI)
**Ámbito:** Capacidad transversal — primer arranque de un despliegue sin configurar (agnóstico de framework)
**Hereda de:** `Design-Rules-Web-Generico-v1.0.md`
**Posición:** Insumo normativo de la categoría 03. Extensión por capacidad del catálogo `References/Design/`. No es un artefacto operativo de `docs/`.

---

## 0. Propósito y alcance

Este documento codifica el lenguaje de diseño del primer arranque: qué ve y qué hace el usuario la primera vez que abre un sistema recién desplegado, cuando todavía no existe la configuración mínima que lo hace utilizable. Es una extensión por capacidad del catálogo, transversal a cualquier stack, y aplica a todo proyecto que se despliegue en una instancia propia y arranque vacío.

Carga condicional: el subagente AG-03 lo suma al base solo cuando el proyecto se despliega por instancia y arranca sin datos de configuración (Parte C del intake o casos de uso de 02 que describan alta inicial, instalación o puesta en marcha). No aplica a productos multi-inquilino donde el aprovisionamiento lo hace el proveedor antes de que el usuario entre.

El primer arranque es el único momento del ciclo de vida en el que el sistema no puede asumir nada de sí mismo. Diseñarlo como un caso especial improvisado produce pantallas huérfanas, bucles de redirección y sistemas que quedan a medio configurar sin que nadie lo note. Este documento lo trata como una capacidad de primera clase, con un predicado explícito, un guard en capas y una superficie propia.

Fuera de alcance. Este documento codifica el lado UX/UI: el predicado que la UX consume, los patrones de la superficie de aprovisionamiento y la mecánica de corte. La detección técnica del estado del sistema, el guard de ruteo, la transaccionalidad del alta y la idempotencia del arranque son arquitectura técnica: viven en la categoría 05 y se anclan en el qué funcional de 02. La instalación, el empaquetado y la secuencia de despliegue son categoría 09. Acá se los referencia como cross-ref.

Marco de referencia: el del documento base, más el principio de mínima ceremonia de entrada, la heurística de visibilidad del estado del sistema y el patrón de guard clause aplicado a la navegación.

---

## 1. Principio: el aprovisionamiento como predicado único

El sistema declara **un** predicado booleano que responde a la pregunta "¿está aprovisionado?". Ese predicado es la fuente de verdad del primer arranque, y todas las superficies que necesitan saberlo lo consultan; ninguna lo infiere por su cuenta.

Consecuencia directa: no hay banderas de configuración paralelas, ni archivos centinela, ni contadores de pasos completados que puedan desincronizarse entre sí. Si el predicado cambia de definición, cambia en un solo lugar y todas las superficies lo reflejan. Es la aplicación, a la capa de arranque, del principio de fuente única del documento base.

Corolario de diseño: el predicado se define por el artefacto mínimo indispensable para que el sistema sea operable por una persona, no por la totalidad de lo deseable. Todo lo que se pueda configurar después, se configura después, con el sistema ya en marcha y bajo sus superficies normales.

---

## 2. Contrato del predicado de aprovisionamiento

El predicado declara, como mínimo, los campos que la UX consume para decidir el destino de la navegación y redactar la superficie de aprovisionamiento.

| Campo del contrato | Qué hace en la UI |
| --- | --- |
| `estaAprovisionado` | Booleano único. Decide entre la superficie de aprovisionamiento y la superficie de acceso normal. |
| `artefactoMinimo` | Qué se está creando en el primer arranque (la entidad indispensable). Nombra el título y la acción primaria de la pantalla. |
| `destinoSiFalta` | Ruta de la superficie de aprovisionamiento, a la que se redirige cuando el predicado es falso. |
| `destinoSiExiste` | Ruta de la superficie de acceso, a la que se redirige cuando el predicado es verdadero. |
| `destinoAlCompletar` | Ruta a la que aterriza el usuario cuando termina el aprovisionamiento. No es necesariamente la portada. |
| `pasosPosteriores` | Lista de acciones recomendadas que quedan pendientes tras el aprovisionamiento, para orientar sin bloquear. |

Reglas de uso del contrato:
- Hay un solo predicado por sistema; no se admiten predicados por módulo que puedan contradecirse.
- El predicado es de solo lectura para la UX: la superficie lo consulta, nunca lo fuerza.
- `destinoAlCompletar` se declara explícitamente. Dejarlo implícito en la portada es una decisión no tomada, no un default.

---

## 3. Los tres puntos de corte (guard en capas)

El corte del primer arranque se aplica en tres capas, deliberadamente redundantes. La redundancia es intencional: cada capa cubre un vector de entrada distinto, y ninguna sola alcanza.

| Capa | Qué corta | Por qué no alcanza sola |
| --- | --- | --- |
| Guard de ruteo | La navegación a cualquier superficie protegida sin sesión ni aprovisionamiento. | No cubre la entrada directa por URL a la propia superficie de aprovisionamiento. |
| Guard de superficie | La apertura de la superficie de aprovisionamiento cuando el sistema ya está aprovisionado, y la de acceso cuando todavía no lo está. | Vive en el cliente; no protege el envío del formulario. |
| Guard de la acción | El envío de la acción de aprovisionamiento cuando el predicado ya es verdadero, y el de la acción de acceso cuando es falso. | Es el último y el único no evitable, pero llega tarde para orientar al usuario. |

Reglas de las tres capas:
- Los tres guards consultan el mismo predicado (§1). No se admiten criterios distintos por capa.
- El guard de la acción, ante un intento fuera de tiempo, redirige a la superficie correcta en vez de devolver un error. El intento tardío es una condición de carrera esperable, no una falta del usuario.
- Ninguna capa expone por qué rechazó: redirige de forma neutra. El detalle de rechazo es información de sistema, no contenido de usuario.

---

## 4. Patrones de componente

Heredan los tokens, la tipografía y el espaciado del documento base. Cada patrón declara anatomía, estados y comportamiento, y los wireframes lo referencian por nombre.

### 4.1 Shell partido (superficie sin chrome)
Anatomía: la superficie de aprovisionamiento se dibuja sobre un shell vacío, sin barra lateral, sin barra superior y sin navegación de módulos; solo el lienzo (`color.background.tertiary`) y la tarjeta centrada. Estados: único. Comportamiento: mientras el sistema no está aprovisionado no hay a dónde navegar, y ofrecer navegación sería mostrar puertas cerradas. El shell completo del documento base (§3.1) aparece recién con el sistema operable.

### 4.2 Tarjeta de aprovisionamiento
Anatomía: contenedor de ancho acotado (~380px) sobre `color.background.primary`, borde `color.border.tertiary`, alineado al centro horizontal y anclado a la franja superior del viewport, no al centro vertical. Contiene título, subtítulo de una línea que declara la unicidad o el alcance de lo que se crea, banda de error (§4.4), campos y una única acción primaria de ancho completo. Estados: normal, con error, enviando. Comportamiento: no hay acción secundaria ni escape; en el primer arranque no existe "cancelar", porque no hay estado previo al que volver.

### 4.3 Redirección con estado de resolución
Anatomía: superficie mínima que resuelve el predicado y muestra un indicador de progreso indeterminado mientras lo hace. Estados: resolviendo, resuelto (navega y desaparece). Comportamiento: nunca queda en blanco ni parpadea contenido que después se retira; la resolución del destino es un estado del sistema y se muestra como tal. La navegación resultante reemplaza la entrada del historial en vez de apilarla, para que el botón de retroceso no devuelva al usuario a un limbo.

### 4.4 Banda de mensaje de la superficie
Anatomía: banda de ancho completo dentro de la tarjeta, sobre los campos. Dos variantes: error (estado `danger`, `role="alert"`) y confirmación (estado `success`, `role="status"`). Comportamiento: el texto se resuelve desde un código de resultado (§5), nunca se compone a mano en la vista. La banda de confirmación es la que acusa recibo del aprovisionamiento en la superficie siguiente, cerrando el lazo entre las dos pantallas.

### 4.5 Requisito declarado antes del intento
Anatomía: texto de apoyo (`type.caption`, `color.text.tertiary`) bajo el campo que tiene restricciones, enunciando la regla completa en positivo. Comportamiento: el requisito se declara antes de que el usuario escriba, no después de que falle; y su contenido se deriva de la política del sistema, no se transcribe como literal en la vista. Es el mismo principio de fuente única de la extensión de configuración por esquema aplicado a las reglas de admisión.

### 4.6 Orientación posterior al aprovisionamiento
Anatomía: superficie de destino con una grilla de tarjetas de acceso (patrón §4.2 del base), una por cada paso recomendado de `pasosPosteriores`, cada una con ícono, título, una línea de propósito y acción de apertura. Estados: heredados de la tarjeta de acceso. Comportamiento: orienta, no bloquea. El sistema ya es operable; estas tarjetas son el camino sugerido, no un wizard obligatorio ni una lista de tareas con progreso.

---

## 5. Estados, feedback y validación

Además de los estados del documento base, la superficie de aprovisionamiento declara:

| Estado | Condición | Feedback visual | Feedback textual |
| --- | --- | --- | --- |
| Resolviendo destino | El predicado todavía no respondió | Indicador de progreso indeterminado | Sin texto; la espera es breve por contrato |
| Sin aprovisionar | El predicado es falso | Tarjeta de aprovisionamiento sobre shell vacío | Qué se va a crear y por qué es único |
| Requisito no cumplido | Un campo viola la política declarada | Borde `color.border.danger` + banda de error | Qué regla se violó, enunciada igual que en §4.5 |
| Confirmación no coincidente | Dos campos que deben coincidir difieren | Banda de error | Cuál es la discrepancia y qué hacer |
| Envío fuera de tiempo | El sistema se aprovisionó entre la carga y el envío | Redirección neutra a la superficie de acceso | Ninguno en la superficie abandonada |
| Aprovisionado, sin uso todavía | El predicado es verdadero y no hay actividad | Banda de confirmación + orientación posterior (§4.6) | Qué se creó y cuáles son los pasos sugeridos |

Toda la validación de la superficie es de conveniencia. La validación que decide si el aprovisionamiento se concreta vive en el sistema, contra la misma política que la superficie enuncia.

---

## 6. La frontera del acto de aprovisionamiento (lado UX)

El aprovisionamiento es un acto único e irrepetible: una vez concretado, la superficie que lo produce deja de existir para siempre en esa instancia. Eso le impone reglas propias.

- Es explícito. El usuario declara los valores y confirma; no se aprovisiona de forma implícita por el hecho de abrir la aplicación o de escribir algo por primera vez.
- Es irreversible desde la UI. No se ofrece deshacer ni reeditar desde la superficie de aprovisionamiento: lo creado se administra después, desde las superficies normales del sistema.
- Es indivisible. O el sistema queda aprovisionado o no queda; no hay estado intermedio expuesto al usuario, ni progreso parcial persistido entre visitas.
- Cierra el lazo. La superficie siguiente acusa recibo con la banda de confirmación (§4.4). Un aprovisionamiento silencioso deja al usuario sin saber si funcionó.

Cross-ref. La transaccionalidad del alta, la idempotencia frente a intentos concurrentes y la definición técnica del predicado son arquitectura de la categoría 05. El qué funcional del artefacto mínimo y del acto de crearlo vive en 02. La secuencia de instalación y las variables que el operador fija antes de que exista una UI son categoría 09.

---

## 7. Esqueletos de referencia

Esquemas de referencia de las superficies que introduce esta extensión. Fijan la composición, no los valores; los wireframes del proyecto los detallan y referencian los patrones por nombre.

Superficie de aprovisionamiento (patrones §4.1, §4.2, §4.4, §4.5):

```text
+-------------------------- lienzo, sin chrome ---------------------------+
|                                                                          |
|                  +------------- ~380px --------------+                   |
|                  |  <Crear el artefacto mínimo>      |  título           |
|                  |  <alcance / unicidad>             |  subtítulo        |
|                  |  [ banda de error   role=alert ]  |  §4.4 condicional |
|                  |  <etiqueta>                       |  label            |
|                  |  [ campo                       ]  |                   |
|                  |  <etiqueta>                       |                   |
|                  |  [ campo                       ]  |                   |
|                  |  <requisito declarado>            |  §4.5             |
|                  |  <etiqueta de confirmación>       |                   |
|                  |  [ campo                       ]  |                   |
|                  |  [====== acción primaria =====]   |  ancho completo   |
|                  +-----------------------------------+                   |
+--------------------------------------------------------------------------+
```

Superficie de orientación posterior (patrón §4.6, sobre el shell completo del base §3.1):

```text
+-----------------+--------------------------------------------------------+
| <navegación>    |  [ banda de confirmación   role=status ]               |
|  · módulo A     |                                                        |
|  · módulo B     |  +----------+  +----------+  +----------+              |
|  · módulo C     |  | ícono    |  | ícono    |  | ícono    |   grilla de  |
|  · módulo D     |  | título   |  | título   |  | título   |   tarjetas   |
|                 |  | 1 línea  |  | 1 línea  |  | 1 línea  |   de acceso  |
|                 |  | [Abrir]  |  | [Abrir]  |  | [Abrir]  |              |
|                 |  +----------+  +----------+  +----------+              |
+-----------------+--------------------------------------------------------+
```

---

## 8. Accesibilidad de los patrones nuevos (WCAG 2.2 AA, piso)

- Banda de error con `role="alert"` y banda de confirmación con `role="status"`: el resultado del acto se anuncia sin requerir que el usuario lo busque visualmente.
- Requisito declarado (§4.5) asociado a su control por `aria-describedby`, de modo que el lector de pantalla lo anuncie junto con el campo y antes del intento.
- Estado de resolución (§4.3) anunciado como región activa; la espera no puede ser solo un cambio visual.
- Foco inicial en el primer campo de la tarjeta de aprovisionamiento; tras un error, el foco vuelve a la banda o al primer campo inválido.
- La superficie sin chrome (§4.1) mantiene un encabezado de primer nivel que nombra la tarea: la ausencia de navegación no puede dejar la página sin estructura semántica.
- Contraste y foco visible según el base; ningún estado se comunica solo por color.

---

## 9. Criterios de aceptación del diseño

Una superficie de primer arranque cumple esta extensión cuando: existe un único predicado de aprovisionamiento y todas las superficies lo consultan en vez de inferirlo; el corte se aplica en las tres capas de §3 contra ese mismo predicado y con redirección neutra; la superficie de aprovisionamiento se dibuja sin chrome de navegación y sin acción de cancelar; el acto es explícito, indivisible e irreversible desde la UI, y la superficie siguiente acusa recibo; los requisitos de admisión se declaran antes del intento y se derivan de la política del sistema, no de literales en la vista; `destinoAlCompletar` está declarado explícitamente; existe orientación posterior que sugiere sin bloquear; y los patrones nuevos cumplen accesibilidad AA (`role="alert"` / `role="status"`, `aria-describedby`, foco gestionado, encabezado presente sin navegación).

---

## 10. Anti-patrones

| Anti-patrón | Problema | Corrección |
| --- | --- | --- |
| Varias banderas de "ya configurado" | Se desincronizan; el sistema queda en un estado que ninguna superficie sabe leer | Un único predicado de aprovisionamiento consultado por todas las superficies |
| Guard solo en la superficie | La entrada directa por URL o el envío tardío lo esquivan | Guard en las tres capas de §3, contra el mismo predicado |
| Wizard multipaso para el arranque | Ceremonia que puede abandonarse a la mitad y deja el sistema en estado parcial | Una superficie, un acto indivisible; el resto se configura después |
| Superficie de aprovisionamiento accesible tras completarse | Permite intentos sin sentido y expone que el sistema ya está tomado | Guard que redirige a la superficie de acceso cuando el predicado es verdadero |
| Aprovisionar de forma implícita al primer uso | El usuario no sabe qué quedó creado ni con qué valores | Acto explícito con confirmación, y acuse de recibo en la superficie siguiente |
| Requisitos que aparecen recién al fallar | Convierte la primera pantalla del sistema en un juego de adivinanzas | Declarar la regla completa antes del intento, derivada de la política |
| Chrome de navegación en el arranque | Ofrece puertas que todavía no abren | Shell vacío hasta que el sistema es operable |
| Redirigir a la portada por defecto al terminar | Decisión no tomada; deja al usuario sin próximo paso | Declarar `destinoAlCompletar` y sumar orientación posterior |

---

## 11. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Especialidad dueña | AG-03 UX/UI |
| Hereda de | `Design-Rules-Web-Generico-v1.0.md` |
| Mapeado por | especializaciones por stack (por ejemplo `Design-Rules-Blazor-Mudblazor-v1.0.md`) |
| Extensión hermana | `Design-Rules-Acceso-Monousuario-v1.0.md` (comparte el shell partido y el catálogo de códigos de resultado) |
| Regla que lo invoca | `devs/Rules/Rules-UX-UI-DX.md` (cuando el proyecto se despliega por instancia y arranca vacío) |
| Cross-ref técnico | categoría 05 (predicado, guard de ruteo, transaccionalidad e idempotencia del alta) |
| Cross-ref funcional | categoría 02 (qué funcional del artefacto mínimo y del acto de aprovisionar) |
| Cross-ref de despliegue | categoría 09 (instalación, empaquetado, parámetros de entorno previos a la primera pantalla) |
| Marco teórico | `Guides/Marco-Teorico-SDD-v1.0.md`, cap. UX/UI/DX |
| Artefactos operativos que lo aplican | `experiencia-de-uso`, `wireframes-<superficie>` de las superficies de arranque y orientación del proyecto |

---

## 12. Control de cambios

| Versión | Fecha | Cambios | Autor |
| --- | --- | --- | --- |
| 1.0 | 2026-07-18 | Versión inicial. Extensión por capacidad: primer arranque y aprovisionamiento inicial. Predicado único de aprovisionamiento y su contrato, guard en tres capas, patrones de componente (shell partido, tarjeta de aprovisionamiento, redirección con estado de resolución, banda de mensaje, requisito declarado, orientación posterior), estados, frontera del acto de aprovisionamiento, esqueletos de referencia, accesibilidad AA y anti-patrones. Agnóstico de framework, sin literales de dominio. | AG-03 UX/UI |
