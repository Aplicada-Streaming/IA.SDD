# Reglas de diseño — Acceso de operador único en panel monolítico

**Producto:** {{Nombre-Producto}}
**Documento:** Design-Rules-Acceso-Monousuario.md
**Versión:** 1.1
**Estado:** Vigente
**Fecha:** 2026-07-18
**Autor:** {{equipo-o-rol}} (AG-03 UX/UI)
**Ámbito:** Capacidad transversal — autenticación y sesión de un solo operador (agnóstico de framework)
**Hereda de:** `Design-Rules-Web-Generico.md`
**Posición:** Insumo normativo de la categoría 03. Extensión por capacidad del catálogo `References/Design/`. No es un artefacto operativo de `docs/`.

---

## 0. Propósito y alcance

Este documento codifica el lenguaje de diseño del acceso en un perfil concreto: el panel de control monolítico de un servicio específico, operado por una sola persona sobre su propia instancia. Es una extensión por capacidad del catálogo, transversal a cualquier stack, y aplica a todo proyecto de código cuyo intake declare una única identidad de operación.

Carga condicional: el subagente AG-03 lo suma al base solo cuando el proyecto de código declara acceso de operador único (Parte C del intake o casos de uso de 02 con una sola identidad y sin gestión de usuarios). No aplica a productos con varias identidades, roles diferenciados, invitaciones o federación de identidad; en esos casos rige el patrón de acceso general del documento base.

El perfil de operador único no es una versión recortada del acceso multiusuario: es un perfil con reglas propias. Su valor de diseño está en lo que omite deliberadamente. Cada ceremonia de identidad que se arrastra sin necesidad (registro, selección de cuenta, recuperación por correo, roles) agrega superficie, agrega decisiones y no compra nada, porque no hay a quién distinguir de quién.

Fuera de alcance. Este documento codifica el lado UX/UI: la superficie de acceso, el shell partido, el catálogo de resultados y su presentación, y las reglas de sesión visibles. El esquema de credenciales, el almacenamiento de secretos, la política de sesión y el control de intentos son arquitectura técnica y postura de seguridad: viven en la categoría 05 y se anclan en el qué funcional de 02. Acá se los referencia como cross-ref.

Marco de referencia: el del documento base, más el principio de mínima ceremonia de entrada, la heurística de prevención de errores y el criterio de mensajes de error que no filtran información del sistema.

---

## 1. Principio: una sola identidad, ninguna ceremonia de más

Hay exactamente una identidad de operación. La superficie de acceso lo asume y no ofrece ninguna afordancia que presuponga varias.

Consecuencia directa: la pantalla de acceso no lleva registro, ni "recordarme", ni selector de cuenta, ni enlace de recuperación, ni menú de perfil con cambio de usuario. Cada uno de esos elementos, en este perfil, es una puerta a un lugar que no existe. La ley de Hick opera acá en su forma más simple: la decisión óptima es la que no hay que tomar.

Corolario: la identidad no se enuncia como propiedad de la persona sino como propiedad de la instancia. El subtítulo de la superficie de acceso lo declara ("es la única cuenta del sistema"), de modo que el usuario entienda por qué no ve las opciones que espera de otras aplicaciones.

---

## 2. Contrato del perfil de operador único

El perfil se declara por lo que incluye y, sobre todo, por lo que omite. La omisión es una decisión de diseño registrada, no un pendiente.

| Elemento | En este perfil | Razón |
| --- | --- | --- |
| Identificador y secreto | Presentes | Son el mínimo para autenticar la sesión. |
| Registro de cuentas | Omitido | La identidad se crea una sola vez, en el primer arranque (ver extensión hermana). |
| Selector o listado de cuentas | Omitido | No hay entre qué elegir. |
| Recuperación del secreto | Omitida en la UI | No hay segundo canal de confianza en una instancia propia; la recuperación es un procedimiento de operación, no una superficie. |
| Persistencia de sesión opcional | Omitida | La política de sesión es única y se declara; no se delega en una casilla. |
| Roles y permisos visibles | Omitidos | Una sola identidad tiene todo el alcance; mostrar roles sugiere una granularidad inexistente. |
| Cambio del secreto | Presente | Es la única operación de identidad del ciclo de vida normal. |
| Cierre de sesión | Presente, siempre visible | Es la contrapartida obligatoria de una sesión persistente. |
| Menú de perfil | Reducido a la identidad visible más las dos acciones anteriores | No hay preferencias por usuario que administrar. |

Reglas de uso del contrato:
- Las omisiones se declaran en el artefacto `experiencia-de-uso` del proyecto de código; no se dejan implícitas.
- Ningún elemento omitido se muestra deshabilitado ni "próximamente": lo que no aplica, no se dibuja.
- Si el proyecto de código evoluciona a varias identidades, se abandona este perfil por el patrón general; no se lo estira.

---

## 3. El shell partido: acceso y trabajo son dos superficies distintas

El sistema tiene dos shells, y la frontera entre ellos es la sesión.

| Shell | Cuándo | Composición |
| --- | --- | --- |
| Shell de acceso | Sin sesión | Lienzo vacío, sin navegación, sin barra superior. Una tarjeta centrada de ancho acotado. |
| Shell de trabajo | Con sesión | Shell completo del documento base (§3.1): navegación de módulos, barra superior con la identidad y las acciones de identidad, área de contenido. |

Reglas del shell partido:
- El shell de acceso no muestra navegación: sin sesión no hay destino alcanzable, y mostrarlo sería ofrecer puertas cerradas.
- El shell de trabajo muestra siempre la identidad activa y la acción de cierre de sesión en la barra superior, no escondidas tras un menú de dos niveles.
- La transición entre shells es una navegación completa, no un cambio de estado dentro de la misma superficie: el cambio de shell es la señal visual de que la sesión cambió.
- El shell de acceso es el mismo que usa el primer arranque. Las dos superficies comparten composición para que el usuario perciba continuidad entre crear la identidad y usarla.

---

## 4. Patrones de componente

Heredan los tokens, la tipografía y el espaciado del documento base. Cada patrón declara anatomía, estados y comportamiento, y los wireframes lo referencian por nombre.

### 4.1 Tarjeta de acceso al sistema
Anatomía: contenedor de ancho acotado (~380px) sobre `color.background.primary`, borde `color.border.tertiary`, anclado a la franja superior del lienzo. Contiene título, banda de resultado (§4.2), campo de identificador, campo de secreto, una única acción primaria de ancho completo y el sello de versión al pie (ver la extensión de versionado). Estados: normal, con error, con confirmación entrante, enviando. Comportamiento: sin acciones secundarias; los campos declaran su propósito para que el gestor de credenciales del navegador los reconozca.

### 4.2 Banda de resultado por código
Anatomía: banda de ancho completo dentro de la tarjeta, sobre los campos. Variante de error (estado `danger`, `role="alert"`) y variante de confirmación (estado `success`, `role="status"`). Comportamiento: el texto no se compone en la vista; se resuelve desde un código de resultado contra el catálogo del proyecto de código (§5). Un código sin entrada en el catálogo cae en un mensaje genérico, nunca en el código crudo ni en el detalle técnico.

### 4.3 Barra de identidad
Anatomía: en la barra superior del shell de trabajo, la identidad activa como texto, seguida de dos acciones: cambio de secreto y cierre de sesión, ambas con ícono y etiqueta textual. Estados: normal, en envío del cierre. Comportamiento: el cierre de sesión es una acción que muta estado y se envía como tal, no como enlace de navegación; lleva etiqueta accesible explícita. Nunca se colapsa a solo ícono en escritorio.

### 4.4 Superficie de cambio de secreto
Anatomía: superficie del shell de trabajo, contenedor angosto, con secreto actual, secreto nuevo, confirmación, el requisito de política declarado bajo el campo nuevo, y par de acciones: primaria de guardar y secundaria de volver. Estados: normal, error por código, éxito. Comportamiento: al concretarse, declara explícitamente qué pasa con la sesión en curso. Un cambio de secreto que deja al usuario en duda sobre si sigue autenticado es un cambio a medias.

### 4.5 Estado de acceso restringido temporalmente
Anatomía: variante de la banda de error (§4.2) con texto que declara la restricción y la naturaleza temporal de la espera, sin exponer umbrales, contadores ni tiempo exacto restante. Comportamiento: es un estado del acceso, no un error del usuario; el tono lo refleja. No se muestra un contador regresivo: expondría el parámetro de la política y convertiría la espera en un juego.

### 4.6 Continuidad entre superficies de identidad
Anatomía: la banda de confirmación (§4.2) de la superficie de acceso recibe el acuse del acto ocurrido en la superficie anterior (identidad creada, secreto cambiado). Comportamiento: cada acto de identidad termina en la superficie siguiente con su acuse visible. El lazo se cierra en la pantalla de destino, no en la de origen.

---

## 5. Estados, feedback y mensajes de resultado

Además de los estados del documento base, la superficie de acceso declara:

| Estado | Condición | Feedback visual | Feedback textual |
| --- | --- | --- | --- |
| Listo para ingresar | Sin sesión, sistema aprovisionado | Tarjeta de acceso sobre shell vacío | Título de la acción; sin instrucciones superfluas |
| Credenciales rechazadas | El par identificador/secreto no valida | Banda de error | Rechazo indiferenciado, sin decir qué parte falló |
| Acceso restringido temporalmente | Se superó el umbral de intentos de la política | Banda de error (§4.5) | Restricción temporal, sin umbrales ni cuenta regresiva |
| Formulario vencido | La protección del formulario expiró | Banda de error | Que se reintente; sin detalle técnico |
| Identidad recién creada | Se llega desde el primer arranque | Banda de confirmación | Qué se creó y qué hacer ahora |
| Secreto actualizado | Se llega desde el cambio de secreto | Banda de confirmación | Qué cambió y qué pasa con la sesión |
| Sesión expirada | La sesión venció por inactividad o por tope | Retorno al shell de acceso | Que la sesión venció, sin culpar al usuario |

Reglas del catálogo de resultados:
- Cada resultado tiene un código estable y un texto único; el texto vive en el catálogo del proyecto de código, no repetido por superficie.
- El rechazo de credenciales es indiferenciado por diseño: distinguir "identificador inexistente" de "secreto incorrecto" confirma la existencia de la identidad a quien no debería saberlo.
- Ningún mensaje expone parámetros de la política (umbrales, ventanas, duraciones), ni detalle técnico del rechazo.
- Los textos se escriben desde el lado del usuario y proponen la acción siguiente; un mensaje que solo constata el fallo está incompleto.

---

## 6. La frontera de sesión (lado UX)

La sesión es lo que separa los dos shells, y sus reglas visibles se declaran en el diseño aunque su mecánica sea técnica.

- La duración de la sesión es única y declarada. No se ofrece al usuario elegirla, ni por casilla ni por preferencia.
- El vencimiento devuelve al shell de acceso con su estado declarado (§5). No se produce un vencimiento silencioso que se manifieste recién como un error en una acción cualquiera.
- El cierre de sesión está siempre a un clic desde cualquier superficie del shell de trabajo.
- Todo acto de identidad declara su efecto sobre la sesión en curso. Si el cambio de secreto la conserva, se dice; si la invalida, se dice y se lleva al usuario al shell de acceso.
- El alcance de la sesión no se comunica como permisos: en este perfil, tener sesión es tener todo el alcance, y enunciar roles sugeriría una granularidad que no existe.

Cross-ref. El esquema de derivación y verificación del secreto, el transporte y los atributos de la credencial de sesión, la protección del formulario, el control de intentos y su alcance (por instancia o distribuido) son arquitectura técnica y postura de seguridad de la categoría 05. El qué funcional de autenticar, cambiar el secreto y cerrar sesión vive en 02. La provisión del secreto inicial y su rotación operativa son categoría 09.

---

## 7. Esqueletos de referencia

Esquemas de referencia de las superficies que introduce esta extensión. Fijan la composición, no los valores; los wireframes del proyecto de código los detallan y referencian los patrones por nombre.

Superficie de acceso (patrones §4.1, §4.2):

```text
+-------------------------- lienzo, sin chrome ---------------------------+
|                                                                          |
|                  +------------- ~380px --------------+                   |
|                  |  <Iniciar sesión>                 |  título           |
|                  |  [ banda confirmación role=status]|  §4.2 condicional |
|                  |  [ banda de error    role=alert  ]|  §4.2 condicional |
|                  |  <identificador>                  |  label            |
|                  |  [ campo                       ]  |                   |
|                  |  <secreto>                        |  label            |
|                  |  [ campo                       ]  |                   |
|                  |  [====== acción primaria =====]   |  ancho completo   |
|                  |            <sello de versión>     |  al pie, sutil    |
|                  +-----------------------------------+                   |
|   sin registro · sin recordarme · sin recuperación · sin selector        |
+--------------------------------------------------------------------------+
```

Shell de trabajo con barra de identidad (patrón §4.3, sobre el shell del base §3.1):

```text
+--------------------------------------------------------------------------+
| [=]  <título del panel>        <identidad>  [Cambiar secreto]  [Salir]   |
+-----------------+--------------------------------------------------------+
| <navegación>    |                                                        |
|  · módulo A     |   área de contenido                                    |
|  · módulo B     |                                                        |
|  · módulo C     |                                                        |
+-----------------+--------------------------------------------------------+
```

---

## 8. Accesibilidad de los patrones nuevos (WCAG 2.2 AA, piso)

- Banda de error con `role="alert"` y banda de confirmación con `role="status"`: el resultado del intento se anuncia sin depender de que el usuario lo advierta visualmente.
- Requisito de política del secreto asociado a su control por `aria-describedby`, anunciado con el campo y antes del intento.
- Campos de identidad con propósito declarado, de modo que el gestor de credenciales y las tecnologías asistivas los identifiquen sin depender del texto visible.
- Acción de cierre de sesión con etiqueta accesible explícita que nombre el efecto completo, no solo el verbo del botón.
- Tras un rechazo, el foco vuelve a la banda de resultado o al primer campo, para que el motivo se perciba sin recorrer la página.
- El shell de acceso mantiene un encabezado de primer nivel que nombra la tarea; la ausencia de navegación no deja la página sin estructura semántica.
- Ningún estado del acceso se comunica solo por color.

---

## 9. Criterios de aceptación del diseño

Una superficie de acceso cumple esta extensión cuando: existe una sola identidad y las omisiones del perfil (§2) están declaradas en `experiencia-de-uso` y no dibujadas ni deshabilitadas en pantalla; el sistema tiene dos shells y la transición entre ellos es una navegación completa; la superficie de acceso no ofrece registro, recordarme, recuperación ni selector; los mensajes se resuelven desde un catálogo de códigos y el rechazo de credenciales es indiferenciado; ningún mensaje expone parámetros de la política; la duración de la sesión es única, declarada, y su vencimiento devuelve al shell de acceso con estado explícito; el cierre de sesión está siempre a un clic y todo acto de identidad declara su efecto sobre la sesión en curso; cada acto de identidad cierra su lazo con un acuse en la superficie siguiente; y los patrones nuevos cumplen accesibilidad AA (`role="alert"` / `role="status"`, `aria-describedby`, propósito de campo declarado, foco gestionado).

---

## 10. Anti-patrones

| Anti-patrón | Problema | Corrección |
| --- | --- | --- |
| Arrastrar ceremonias multiusuario | Registro, selector o recuperación llevan a lugares que no existen | Omitirlas y declarar la omisión en `experiencia-de-uso` |
| Mostrar deshabilitado lo que no aplica | Promete una capacidad inexistente y ensucia la superficie | Lo que no aplica no se dibuja |
| Distinguir "usuario inexistente" de "secreto incorrecto" | Confirma la existencia de la identidad a quien no debería saberlo | Rechazo indiferenciado con un único texto |
| Exponer umbrales o cuenta regresiva en la restricción | Filtra el parámetro de la política y convierte la espera en un juego | Declarar la restricción y su carácter temporal, sin números |
| Mensajes compuestos en cada vista | Los textos divergen entre superficies y se desactualizan | Catálogo de códigos con un texto único por resultado |
| Navegación visible sin sesión | Ofrece puertas cerradas y sugiere que falta permiso | Shell de acceso sin navegación |
| Cierre de sesión escondido tras un menú anidado | La contrapartida de una sesión persistente queda fuera de alcance | Acción visible en la barra de identidad, siempre a un clic |
| Cambio de secreto que no dice qué pasa con la sesión | El usuario queda sin saber si sigue autenticado | Declarar el efecto sobre la sesión en el acuse |
| Vencimiento silencioso de la sesión | Se manifiesta como un error arbitrario en una acción cualquiera | Devolver al shell de acceso con el estado de sesión vencida |
| Enunciar roles con una sola identidad | Sugiere una granularidad de permisos inexistente | No mostrar roles; tener sesión es tener todo el alcance |

---

## 11. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Especialidad dueña | AG-03 UX/UI |
| Hereda de | `Design-Rules-Web-Generico.md` |
| Mapeado por | especializaciones por stack (por ejemplo `Design-Rules-Blazor-Mudblazor.md`) |
| Extensión hermana | `Design-Rules-Primer-Arranque.md` (crea la identidad única y comparte el shell de acceso) |
| Regla que lo invoca | `devs/Rules/Rules-UX-UI-DX.md` (cuando el proyecto de código declara acceso de operador único) |
| Cross-ref técnico | categoría 05 (esquema de credenciales, credencial de sesión, protección de formulario, control de intentos) |
| Cross-ref funcional | categoría 02 (qué funcional de autenticar, cambiar el secreto y cerrar sesión) |
| Cross-ref de operación | categoría 09 (provisión y rotación operativa del secreto) |
| Marco teórico | `Guides/Marco-Teorico-SDD.md`, cap. UX/UI/DX |
| Artefactos operativos que lo aplican | `experiencia-de-uso`, `wireframes-<superficie>` de las superficies de acceso e identidad del proyecto de código |

---

## 12. Control de cambios

| Versión | Fecha | Cambios | Autor |
| --- | --- | --- | --- |
| 1.0 | 2026-07-18 | Versión inicial. Extensión por capacidad: acceso de operador único en panel monolítico. Contrato del perfil por inclusión y omisión, shell partido acceso/trabajo, patrones de componente (tarjeta de acceso, banda de resultado por código, barra de identidad, cambio de secreto, restricción temporal, continuidad entre superficies), catálogo de resultados, frontera de sesión, esqueletos de referencia, accesibilidad AA y anti-patrones. Agnóstico de framework, sin literales de dominio. | AG-03 UX/UI |
| 1.1 | 2026-07-29 | Vocabulario normativo (framework 5.0), registrado en la 5.1. El cuerpo adopta «proyecto de código» donde el referente es la unidad de compilación y «producto» donde es el nivel superior, según `Vocabulario-Rules.md` §2. El campo de cabecera pasa de `**Proyecto:**` a `**Producto:** {{Nombre-Producto}}`: la migración lo había dejado como `**Proyecto de código:**` sobre un valor de nivel producto, que `Vocabulario-Rules.md` §4 R3 prohíbe. La fila se registra en la 5.1 porque la migración modificó el archivo sin dejar registro, contra `SDD-Development-Guide.md` §VI.1. | AG-03 UX/UI |
