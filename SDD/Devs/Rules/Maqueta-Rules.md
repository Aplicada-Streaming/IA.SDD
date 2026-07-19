# Reglas constructivas — Fase B2 Validación visual de maqueta

**Carpeta target (por proyecto visual):** `SDD/Maquetas/<Nombre-Proyecto>/` del repositorio destino
**Subagente target del orquestador:** Maquetador de validación visual (AG-03M)
**Versión de las reglas:** 1.0

---

## 0. Posición en la cadena SDD

La Fase B2 es una fase opcional del bucle por proyecto que se ejecuta entre la Fase B (02, 03, 04 y su audit) y la Fase C (05). No es una categoría documental nueva: no agrega una carpeta a la numeración `00` a `11`. Es una fase de validación que toma la especificación de experiencia ya redactada por AG-03 y la materializa en una maqueta navegable, para que el humano vea antes de que se codifique.

Resuelve tres problemas concretos del flujo:

1. La documentación generada por el orquestador es voluminosa y cara de validar leyendo. Una maqueta navegable se valida en minutos y expone huecos que el texto esconde.
2. La especificación de UX y UI no se puede apreciar en prosa. Lo que el humano aprueba en `Experiencia-De-Uso` y en los `wireframes-<superficie>` no es necesariamente lo que imaginó.
3. El resultado de la codificación no tiene contra qué contrastarse. La maqueta aprobada, junto con el modelo de datos que exhibe, es la línea de base verificable del sensado de deriva (ver `Deriva-Rules.md`).

Insumos: 02 del proyecto (casos de uso, reglas de negocio, modelo conceptual de datos), 03 del proyecto (`Experiencia-De-Uso`, `wireframes-<superficie>`, `representacion-<concepto>`, `Glosario-UX`), 00 (persona objetivo), el catálogo de diseño de `References/Design/` y el catálogo de modelos UX-UI de `Modelos-UX-UI/`.

Salida: la maqueta en `SDD/Maquetas/<Nombre-Proyecto>/` del destino, la retroalimentación de los documentos de 03 (y la propagación al resto de las categorías afectadas), los artefactos de línea de base del sensado de deriva y, si el humano lo aprueba, un modelo nuevo en el catálogo `Modelos-UX-UI/` del template más su ejemplo ofuscado en `Templates/`.

---

## 1. Especialidad asignada

### 1.1 Especialidad base

Maquetador de validación visual, equivalente AG-03M del catálogo SDD. Perfil profesional: Frontend Engineer con foco en prototipado de alta fidelidad estructural, más Diseñador de Interacción. Domina HTML semántico, CSS con tokens, un framework de grilla y componentes, y JavaScript de interacción sin framework. Se alinea con WCAG 2.2 nivel AA como piso, con las heurísticas de Nielsen para la inspección y con el catálogo de diseño de `References/Design/` como fuente única de tokens y patrones.

AG-03M no redefine la experiencia: la materializa. La titularidad de la especificación de experiencia sigue siendo de AG-03. Cuando la maqueta revela que la especificación estaba equivocada o incompleta, AG-03M no la corrige por su cuenta: emite el hallazgo y la corrección se aplica al documento de 03 en el paso de retroalimentación (§6).

### 1.2 Variantes según tipo de proyecto (8 valores D8)

| Tipo | ¿Se maqueta? | Superficie de la maqueta | Especialidad específica |
| --- | --- | --- | --- |
| library | No (salvo librería de componentes visuales) | Catálogo navegable de los componentes que expone la librería, un ejemplo por componente y por estado | Frontend Engineer + Diseñador de Sistemas de Componentes |
| web-monolith | Sí | Las superficies clave declaradas en los `wireframes-<superficie>` de 03 | Frontend Engineer + Diseñador de Interacción |
| web-microservices (con frontend) | Sí | Las superficies del frontend integrador, con la consistencia entre módulos como foco | Frontend Engineer + Arquitecto de Frontend |
| web-microservices (sin frontend) | No | — | — |
| desktop-app | Sí | Las ventanas principales, emuladas en el navegador con las convenciones de escritorio declaradas en 03 | Frontend Engineer + Especialista Cross-Platform |
| mobile-app-maui | Sí | Las pantallas principales en viewport móvil, con la nota responsive de 03 | Frontend Engineer + Especialista en Accesibilidad Móvil |
| rest-api | Solo si tiene portal de developers visible | Las páginas clave del portal declaradas en `DX-Portal-Developers` | Frontend Engineer + Developer Advocate |
| cli-tool | No | — | — |
| worker-service | No | — | — |

La maqueta es siempre HTML, CSS y JavaScript ejecutados en un navegador, cualquiera sea el `project_type`. Para `desktop-app` y `mobile-app-maui` la maqueta emula la superficie de destino en el navegador; no se maqueta con el toolkit nativo. La razón es la del §7: la maqueta tiene que poder editarse a mano y abrirse sin toolchain.

### 1.3 Multi-especialidad

- AG-02 Analista Funcional, para que los datos de ejemplo que exhibe la maqueta sean coherentes con el modelo conceptual y con las reglas de negocio, y para que cada superficie maquetada se ancle en un CU.
- AG-03 Especialista UX/UI, dueño de la especificación que la maqueta materializa y receptor de las correcciones que la validación produce.
- AG-05 Arquitecto, para que la línea de base visual no comprometa decisiones que corresponden a la capa de presentación.
- AG-08 QA, para que la matriz de sensado de deriva sea verificable con los mismos criterios que la estrategia de testing.

---

## 2. Condición de activación y artefactos que produce

### 2.1 Condición de activación

La Fase B2 se activa para un proyecto cuando el flag `requiere_maqueta` del proyecto es `true`. El orquestador lo deriva así:

- Valor propuesto: `true` cuando `tiene_ui_final == true`, o cuando el proyecto es `library` de componentes visuales, o cuando es `rest-api` con `tiene_portal_developers == true` y portal visible.
- Valor propuesto: `false` en cualquier otro caso.
- El humano confirma o invierte el valor propuesto al aprobar el plan inicial. La fase es opcional por diseño: un proyecto visual puede saltearla si el humano lo decide.

La confirmación en el plan inicial habilita la fase, pero no la arranca. El arranque es una segunda pregunta explícita, en el paso 1 (§3.1), al cerrar la Fase B del proyecto con su audit aprobado. Recién en ese momento la especificación de UX y UI está completa y el orquestador tiene todo lo que necesita para maquetar, y recién en ese momento el humano tiene la información para decidir bien. El humano puede declinar ahí aunque el flag esté en `true`.

Si el humano desactiva la fase en un proyecto con `tiene_ui_final == true`, la omisión se registra como ADR en 05 del proyecto, con el motivo declarado. Si la activa en un proyecto sin UI final, se registra el motivo en el log del orquestador.

### 2.2 Tabla maestra de artefactos

| Artefacto | Ubicación | Obligatorio | Descripción |
| --- | --- | --- | --- |
| `index.html` | `SDD/Maquetas/<Nombre-Proyecto>/` | Sí | Punto de entrada de la maqueta. Contiene la navegación a todas las superficies maquetadas. |
| `<Superficie>.html` | `SDD/Maquetas/<Nombre-Proyecto>/` | Uno por superficie clave de 03 | Una superficie por archivo, con el mismo nombre canónico que su `wireframes-<superficie>`. |
| `assets/css/Estilos-Maqueta.css` | `SDD/Maquetas/<Nombre-Proyecto>/assets/css/` | Sí | Materialización de los tokens del catálogo de diseño como variables CSS. Sin literales sueltos. |
| `assets/js/Datos-Maqueta.js` | `SDD/Maquetas/<Nombre-Proyecto>/assets/js/` | Sí | Fuente única de los datos de ejemplo hardcodeados y del contrato de campos. Ningún HTML hardcodea datos. |
| `assets/js/Maqueta.js` | `SDD/Maquetas/<Nombre-Proyecto>/assets/js/` | Sí | Render de los datos, navegación y conmutación de estados. |
| `assets/img/` | `SDD/Maquetas/<Nombre-Proyecto>/assets/img/` | Si hay assets | Imágenes de la maqueta. Los íconos van SVG inline, no acá. |
| `README.md` | `SDD/Maquetas/<Nombre-Proyecto>/` | Sí | Cómo se abre, qué superficies cubre, qué CU materializa, cómo se corrige a mano y cómo se le avisa al orquestador. |
| `Linea-Base-Visual-v1.0.md` | `SDD/Docs/Proyectos/<Nombre-Proyecto>/03-UX-UI-DX/` | Sí, al aprobar | Inventario identificado de superficies, componentes, estados y rutas de navegación de la maqueta aprobada. Insumo del sensado de deriva. |
| `Contrato-Datos-Maqueta-v1.0.md` | `SDD/Docs/Proyectos/<Nombre-Proyecto>/03-UX-UI-DX/` | Sí, al aprobar | Los campos del modelo de datos que la maqueta exhibe, con tipo, ejemplo y trazabilidad al modelo conceptual de 02. |
| `Bitacora-Validacion-Maqueta-v1.0.md` | `SDD/Docs/Proyectos/<Nombre-Proyecto>/03-UX-UI-DX/` | Sí | Registro de las iteraciones de validación: qué observó el humano, cómo se corrigió, qué documento se retroalimentó. |

Los tres documentos markdown viven en la categoría 03 del proyecto porque son especificación de experiencia, no salida de maqueta. La maqueta en sí vive en `SDD/Maquetas/`, fuera de `SDD/Docs/`, porque `SDD/Docs/` es exclusivamente prosa generada por el orquestador y la maqueta es material ejecutable que el humano edita a mano.

### 2.3 Nomenclatura

- Carpeta del proyecto: `SDD/Maquetas/<Nombre-Proyecto>/`, con el `Nombre-Proyecto` derivado en §3.2 del master-prompt.
- Archivos HTML de superficie: Título-Con-Guiones, sin sufijo de versión. Ejemplo: `Pantalla-Asignacion-Turno.html`. La maqueta se versiona con el repositorio, no con sufijo de archivo: hay una sola maqueta vigente por proyecto.
- Archivos de assets: Título-Con-Guiones. Ejemplo: `Estilos-Maqueta.css`, `Datos-Maqueta.js`.
- Documentos markdown de la fase: Título-Con-Guiones con sufijo `-v<X.Y>.md`, como cualquier artefacto de `SDD/Docs/`.
- `index.html` es la única excepción en minúscula: es la convención universal del punto de entrada de un sitio estático y romperla rompe el servido por defecto.

---

## 3. Secuencia de la fase

La Fase B2 tiene siete pasos. Los pasos 1, 2 y 5 son puntos de detención con confirmación humana explícita; el patrón plan-then-confirm del master-prompt rige acá igual que en el resto del flujo.

### 3.1 Paso 1 — Oferta de maqueta y elección del modelo UX-UI (detención)

El disparador de este paso es el cierre de la Fase B con su audit aprobado. En ese momento la especificación de UX y UI del proyecto ya está redactada y auditada, y el orquestador tiene todo lo que necesita para maquetar: las superficies de los wireframes, sus estados, los flujos de `Experiencia-De-Uso` y el modelo conceptual de datos con sus ejemplos. Recién ahí ofrece.

La oferta es explícita aunque el flag `requiere_maqueta` ya se haya confirmado en el plan inicial. El flag habilita la fase; esta pregunta la arranca. La razón es práctica: entre la aprobación del plan inicial y el cierre de la Fase B del proyecto pasaron varias fases, y el humano tiene ahora información que no tenía entonces.

En la misma pregunta va de qué modelo partir. El orquestador lee el índice `../IA.SDD/SDD/Devs/Modelos-UX-UI/Index-Modelos-UX-UI.md` y presenta:

- Opción por defecto: las reglas constructivas del catálogo `References/Design/` (documento base más la especialización de stack más las extensiones por capacidad que correspondan, según `Index-Design-Rules.md` §4).
- Opciones alternativas: cada modelo registrado en `Modelos-UX-UI/`, con su nombre, en una línea qué resuelve y para qué tipo de proyecto se capturó.

Bloque de salida obligatorio:

```text
Fase B del proyecto <Nombre-Proyecto> cerrada y auditada. La especificación de
UX y UI está completa: <N> superficies especificadas en 03, <M> casos de uso con
interacción humana en 02, modelo conceptual con <K> entidades.

¿Generamos la maqueta de validación visual para este proyecto?

Si aceptás, indicá de qué modelo de diseño partir:
- [por defecto] Catálogo base: Design-Rules-Web-Generico + <especializacion-stack> + <extensiones>
- <Nombre-Modelo-1>: <qué resuelve> (capturado para <project_type>)
- <Nombre-Modelo-2>: <qué resuelve> (capturado para <project_type>)

El modelo elegido no reemplaza al catálogo base: se aplica por encima.
Si preferís saltear la maqueta, seguimos con la Fase C y registro la omisión
como ADR en 05.
```

El humano decide las dos cosas en una sola respuesta. Si saltea, la fase termina acá y la omisión se registra como ADR en 05 del proyecto, con el motivo declarado.

Un modelo del catálogo nunca reemplaza al documento base de `References/Design/`: se aplica por encima, igual que una especialización por stack. Ante conflicto entre el modelo y el base, manda el base, salvo que el modelo documente la desviación con su justificación.

### 3.2 Paso 2 — Plan de maqueta (detención)

El orquestador presenta el plan antes de construir:

- Superficies a maquetar, una por `wireframes-<superficie>` de 03, con el CU que las origina.
- Rutas de navegación entre superficies, derivadas de los flujos clave de `Experiencia-De-Uso`.
- Entidades y campos del modelo conceptual de 02 que la maqueta va a exhibir, y de dónde salen los datos de ejemplo (de los ejemplos de la documentación, no inventados).
- Estados a demostrar por superficie, como mínimo vacío, cargando, con datos y error.
- Modelo UX-UI elegido en el paso 1.
- Rutas de salida.

El humano responde `aprobar`, `aprobar con cambios <detalle>` o `rechazar <motivo>`.

### 3.3 Paso 3 — Construcción

AG-03M construye la maqueta según §4. Reglas duras de este paso:

- Los datos de ejemplo salen de la documentación ya generada (ejemplos de los CU, del modelo conceptual, de las reglas de negocio). Si un campo no tiene ejemplo en la documentación, AG-03M no lo inventa: emite ambigüedad con el patrón de §9 del master-prompt.
- Ningún token visual se define ad hoc. Todo valor visual sale del catálogo de diseño y del modelo elegido, materializado como variable CSS con el nombre semántico del catálogo.
- Toda superficie demuestra sus estados. El flujo feliz no alcanza.

### 3.4 Paso 4 — Lanzamiento en el navegador

Terminada la construcción, el orquestador no se limita a avisar que la maqueta existe: intenta abrirla. El procedimiento tiene tres tramos y ninguno puede bloquear la fase.

1. Levanta un servidor estático local en segundo plano sobre `SDD/Maquetas/<Nombre-Proyecto>/`, en un puerto libre a partir de 8080, y registra el puerto y el identificador del proceso para poder apagarlo al cerrar la fase.
2. Intenta abrir la URL en el navegador del humano con el abridor del sistema operativo: `xdg-open` en Linux, `start` en Windows, `open` en macOS. Si el entorno declara un navegador preferido para la validación, lo usa; si no, respeta el navegador por defecto del sistema.
3. Si el paso 2 no puede completarse (no hay entorno gráfico alcanzable desde donde corre el orquestador, no hay abridor disponible, o el comando falla), no se detiene ni lo trata como error: informa la URL y el comando para abrirla a mano, y sigue.

El tramo 3 no es un caso de borde. El orquestador puede estar ejecutándose en una shell sin sesión gráfica alcanzable (contenedor, sesión remota, entorno restringido) aunque el humano tenga su navegador ahí nomás. Una fase que dependiera del auto-lanzado sería frágil por diseño; el auto-lanzado es una comodidad, y la URL informada es el contrato.

Cuando el humano va a corregir a mano (vía B del §3.5), el orquestador le recomienda explícitamente el servidor liviano del editor en lugar del servidor que él levantó, porque recarga sola en cada guardado. Ver §7.

Bloque de salida obligatorio:

```text
Maqueta del proyecto <Nombre-Proyecto> lista en SDD/Maquetas/<Nombre-Proyecto>/index.html
Superficies: <lista>

<si el auto-lanzado funcionó>
La abrí en tu navegador: http://localhost:<puerto>
<si no>
No pude abrir el navegador desde acá (<motivo>). Abrila con:
  <comando de §7.1>
</si>

Si vas a corregirla a mano, conviene servirla desde el editor (en Visual Studio
Code, Live Server o equivalente): recarga sola en cada guardado. También podés
activar "Recarga automática" en la barra de validación de la propia maqueta.

Qué revisar:
- Navegación: ¿los recorridos entre superficies son los que esperabas?
- Datos: ¿los campos que se muestran son los que el sistema tiene que mostrar? ¿falta o sobra alguno?
- Estados: alterná los estados de cada superficie con la barra de validación. ¿falta alguno?
- Apariencia: ¿la jerarquía visual y el peso de cada acción son los correctos?

Podés corregirla de dos maneras:
1. Por prompt: describime el cambio y lo aplico.
2. A mano: editá los archivos HTML, CSS, JS o las imágenes y avisame
   "revisá la maqueta y tomá las correcciones". Releo los archivos, extraigo
   los cambios y los incorporo a la especificación.
```

### 3.5 Paso 5 — Ciclo de corrección y validación (detención, iterativo)

El ciclo se repite hasta que el humano aprueba. Dos vías de corrección, y las dos tienen que estar soportadas:

Vía A, corrección por prompt. El humano describe el cambio; AG-03M lo aplica sobre los archivos de la maqueta y vuelve al paso 4.

Vía B, corrección manual del humano. El humano edita a mano los HTML, el CSS, el JavaScript o las imágenes y le pide al orquestador que reevalúe. El orquestador:

1. Relee íntegros los archivos de `SDD/Maquetas/<Nombre-Proyecto>/`.
2. Los compara contra el estado que él mismo había dejado. Si el repositorio destino tiene control de versiones, usa el diff; si no, compara contra el inventario que registró en la bitácora al cerrar la iteración anterior.
3. Enumera las diferencias encontradas y las interpreta como decisiones de diseño del humano: qué cambió, en qué superficie, y qué implica para la especificación.
4. Presenta esa lectura al humano para que confirme la interpretación antes de propagarla. Una corrección manual mal interpretada que se propaga a la documentación es peor que no haberla tomado.
5. Preserva las correcciones manuales: en las iteraciones siguientes AG-03M no las pisa. Si un cambio pedido por prompt entra en conflicto con una corrección manual previa, AG-03M se detiene y pregunta.

Cada iteración, por cualquiera de las dos vías, agrega una entrada a `Bitacora-Validacion-Maqueta-v1.0.md` con fecha, vía, observación del humano, cambio aplicado y documento a retroalimentar.

El paso cierra cuando el humano responde con la aprobación explícita de la maqueta.

### 3.6 Paso 6 — Retroalimentación y propagación

Con la maqueta aprobada, el orquestador propaga lo aprendido a la documentación. Este paso es obligatorio: una maqueta aprobada que no se retroalimenta deja la documentación mintiendo.

Orden de propagación:

1. Primero 03 del proyecto, que es la categoría dueña de la experiencia. Se actualizan `Experiencia-De-Uso` (flujos, estados, accesibilidad, performance percibida) y cada `wireframes-<superficie>` afectado, subiendo minor. Se crean `Linea-Base-Visual`, `Contrato-Datos-Maqueta` y `Bitacora-Validacion-Maqueta`.
2. Después hacia atrás, si la validación tocó algo que vive aguas arriba.
3. Después hacia adelante, si ya había categorías generadas que dependen de lo que cambió. En el orden normal de ejecución la Fase B2 corre antes de la Fase C, así que hacia adelante no suele haber nada generado todavía; si la fase se ejecuta fuera de orden por una regeneración parcial, aplica la matriz completa.

Matriz de propagación:

| Qué cambió en la validación | Categorías a retroalimentar | Dirección |
| --- | --- | --- |
| Un flujo de navegación entre superficies | 03 (`Experiencia-De-Uso`), 02 (flujo del CU) | atrás |
| Una superficie nueva, eliminada o fusionada | 03 (wireframes), 02 (CU), 06 (US), 07 (sprint) | atrás y adelante |
| Un campo del modelo de datos agregado, quitado o de tipo distinto | 02 (modelo conceptual, RN), 05 (modelo lógico), 08 (casos de prueba) | atrás y adelante |
| Un estado no previsto (vacío, error, sin permiso, parcial) | 03 (tabla de estados), 02 (flujo alternativo del CU), 08 (casos de prueba) | atrás y adelante |
| Una regla de negocio que la maqueta reveló ausente o mal entendida | 02 (RN), 01 (NB si cambia la necesidad) | atrás |
| Un criterio de accesibilidad o de performance percibida | 03, 08 (tests de accesibilidad), 05 (NFR de presentación) | atrás y adelante |
| Un patrón o token visual nuevo, transversal | Catálogo `References/Design/` o modelo en `Modelos-UX-UI/` | template |
| Alcance funcional que la maqueta mostró faltante | 00 (alcance), 01 (NB), 02 (CU), 06, 07 | atrás y adelante |

Regla de corte: si la propagación alcanza al `SOLUTION-INTAKE`, no se edita libremente. Aplica §13 del master-prompt (control de cambios, versión, archivado de la versión anterior). Si alcanza a 00 o 01, que son de nivel solución y ya fueron auditadas en la Fase A, el orquestador se detiene, informa el alcance real del cambio y pide confirmación antes de tocarlas: un hallazgo de maqueta de un proyecto no reescribe la visión de la solución sin que el humano lo sepa.

Cada documento retroalimentado suma una entrada a su control de cambios con el motivo `Retroalimentación de la Fase B2 de validación de maqueta del proyecto <Nombre-Proyecto>`.

### 3.7 Paso 7 — Captura de conocimiento (detención)

Con la documentación retroalimentada, el orquestador ofrece capitalizar la experiencia. Bloque de salida obligatorio:

```text
Maqueta aprobada y documentación retroalimentada.

¿Querés incorporar este diseño como modelo UX-UI reutilizable del Framework SDD?
Si aceptás, se generan dos artefactos en el repositorio fuente IA.SDD:
1. Las reglas constructivas del modelo en
   SDD/Devs/Modelos-UX-UI/Rules-Design-<Nombre-Modelo>-v1.0.md
2. Un ejemplo genérico y ofuscado del modelo en
   Templates/<Nombre-Modelo>/

Necesito un nombre para el modelo (Título-Con-Guiones, sin datos del cliente
ni del dominio del proyecto). Propuesta: <Nombre-Propuesto>.

Si preferís no capitalizarlo, la fase cierra acá y el diseño queda solo en el
proyecto.
```

Si el humano acepta, AG-03M produce los dos artefactos según §5 y §6. Si no, la fase cierra.

Al cerrar la fase, el orquestador apaga el servidor estático que había levantado en el paso 4 y lo informa. Un servidor olvidado ocupando un puerto es una molestia que el humano descubre días después sin saber de dónde salió.

Nota operativa: los dos artefactos se escriben en el repositorio fuente `IA.SDD`, que es el único caso en todo el flujo en que el orquestador escribe fuera del repositorio destino. Por eso requiere aceptación explícita y por eso el paso de ofuscación de §6 es bloqueante: `IA.SDD` es un repositorio público.

---

## 4. Reglas constructivas de la maqueta

### 4.1 Tecnología

- HTML5 semántico, CSS y JavaScript vanilla, con Bootstrap 5.0 como framework de grilla y componentes.
- Sin proceso de build, sin gestor de paquetes, sin `node_modules`: lo que se edita es lo que se sirve. La justificación está en §7.
- Bootstrap se carga por CDN. El CSS propio se carga después y sobreescribe con los tokens del catálogo de diseño.
- Íconos SVG inline con `currentColor`. Prohibido el raster para iconografía y prohibidos los packs de íconos por CDN.
- Nada de llamadas de red a servicios reales. La maqueta es autónoma y funciona sin backend.

### 4.2 Datos de ejemplo

- Fuente única: `assets/js/Datos-Maqueta.js`, que expone un objeto global con el arreglo de datos de ejemplo, el contrato de campos (nombre, tipo, ejemplo, entidad de origen) y, si el proyecto tiene superficies de configuración, los descriptores de configuración.
- Ningún HTML hardcodea datos. Los renderiza el JavaScript desde esa fuente. La razón es funcional: si los datos están dispersos en el HTML, la maqueta no sirve para validar el modelo de datos, que es uno de sus dos propósitos.
- Los datos salen de los ejemplos de la documentación de 02. Cantidad suficiente para que se vean los casos límite declarados en los CU: la fila más larga, el valor nulo, la categoría con muchos elementos, el estado de error.
- Los datos de ejemplo son verosímiles dentro del dominio del proyecto pero no son datos reales del cliente. La maqueta vive en el repositorio destino; los datos reales no entran ahí ni siquiera en una maqueta.

### 4.3 Estados y barra de validación

Toda superficie demuestra como mínimo los estados vacío, cargando, con datos y error, más los que declare su wireframe.

La maqueta incluye una barra de validación visible que permite al humano alternar los estados de la superficie en curso sin recargar ni tocar código. Esa barra es un instrumento de la maqueta, no una parte del producto: se rotula explícitamente como tal ("Barra de validación de maqueta — no forma parte del producto") y no se traslada a la especificación ni al código.

La barra incluye además un interruptor de recarga automática, apagado por defecto. Encendido, consulta periódicamente los archivos de la maqueta y refresca la página cuando alguno cambió, de modo que quien corrige a mano vea el efecto sin refrescar. Requisitos de su implementación:

- Apagado por defecto y con su estado persistido en el navegador, para que no sorprenda a quien solo viene a mirar y para que quien lo prendió no tenga que volver a prenderlo en cada superficie.
- Detección por comparación de un identificador de versión del recurso, no por descarga completa de los archivos.
- Intervalo de consulta de entre dos y cinco segundos, y suspensión cuando la pestaña no está visible.
- Degradación silenciosa: sobre `file://` la consulta no funciona, y el interruptor se muestra deshabilitado con la razón, en lugar de fallar.
- Nada de esto se traslada al producto: es parte del mismo instrumento que la barra.

### 4.4 Cobertura mínima por tipo

| Tipo D8 | Superficies mínimas en la maqueta |
| --- | --- |
| web-monolith | Las cuatro del piso de 03 (acceso, home, flujo principal, error) más una por flujo crítico |
| web-microservices (con frontend) | Una por módulo expuesto, mínimo cinco |
| desktop-app | Una por ventana principal, mínimo cuatro |
| mobile-app-maui | Una por pantalla principal en viewport móvil, mínimo cinco, más la nota responsive materializada |
| rest-api con portal visible | Landing, quick-start y reference del portal, mínimo tres |
| library de componentes visuales | Un ejemplo por componente público y por estado |

El mínimo es piso. La cota superior la fija la cobertura de los CU con interacción humana relevante.

### 4.5 Accesibilidad

WCAG 2.2 nivel AA es piso obligatorio también en la maqueta, no solo en el producto. Una maqueta que se valida sin foco visible, sin navegación por teclado o sin contraste suficiente enseña al validador humano a aprobar una superficie inaccesible. Mínimos verificables: landmarks semánticos, `label` asociados, foco visible en todos los controles, recorrido completo por teclado, `aria-live` para los cambios de estado, contraste 4.5:1 en texto.

### 4.6 Sello de versión

La maqueta exhibe en el pie de cada superficie el nombre del proyecto, el modelo UX-UI aplicado y la fecha de la iteración vigente. Es lo que permite al humano saber qué está mirando cuando vuelve a la maqueta días después.

---

## 5. Captura del modelo UX-UI

Cuando el humano acepta capitalizar el diseño (§3.7), AG-03M redacta `../IA.SDD/SDD/Devs/Modelos-UX-UI/Rules-Design-<Nombre-Modelo>-v1.0.md` siguiendo la plantilla `Rules-Design-Modelo-Template.md` del mismo directorio.

El documento no describe la maqueta: extrae de ella las reglas constructivas que permitirían a otro agente producir algo equivalente sin haberla visto. El criterio de inclusión de una regla es este: se incluye si su ausencia haría que un diseño posterior salga distinto de forma perceptible.

Ejes que la captura debe recorrer, cada uno con la pregunta que lo dispara:

| Eje | Pregunta de captura |
| --- | --- |
| Composición y layout | ¿Cómo se reparte el espacio? ¿Hay chrome fijo, ancho máximo, densidad declarada, grilla de referencia? |
| Presentación de datos | ¿Los conjuntos se muestran como tabla, tarjetas o lista? ¿Con qué criterio se elige? ¿Cómo se paginan, ordenan y filtran? ¿Qué se muestra cuando un campo viene vacío? |
| Jerarquía y tipografía | ¿Qué escala se usa? ¿Cómo se distingue título, contenido, acción primaria y secundaria? |
| Color y acentos | ¿Qué codifica el color? ¿Hay acento por módulo? ¿Qué queda neutro? |
| Recursos visuales | ¿Qué iconografía, ilustraciones y espacios en blanco se usan y con qué criterio? |
| Efectos y movimiento | ¿Qué transiciones existen, con qué duración y a qué comprensión sirven? |
| Elementos de UX | ¿Cómo se resuelven confirmación, deshacer, previsualización, ayuda contextual, estado vacío, error recuperable? |
| Navegación | ¿Cuál es el modelo de navegación? ¿Jerárquico, por pestañas, por asistente? ¿Cómo se vuelve? ¿Qué se preserva al volver? |
| Formas constructivas del HTML | ¿Qué estructura semántica se repite? ¿Qué componentes del framework se usan y cuáles se evitan? |
| Formas constructivas del CSS | ¿Cómo se nombran las clases? ¿Qué se resuelve con tokens y qué con utilidades del framework? ¿Qué está prohibido? |
| Accesibilidad del modelo | ¿Qué decisiones del modelo son las que sostienen la accesibilidad y no se pueden alterar al reusarlo? |

Cada regla capturada se escribe como una regla accionable, no como una descripción. "Los conjuntos de más de veinte elementos se presentan como tabla con encabezado fijo y paginación de veinticinco por página" es una regla. "La maqueta usaba tablas lindas" no lo es.

Prohibiciones de la captura, no negociables porque `IA.SDD` es público:

- Ningún nombre de cliente, de producto comercial del cliente, de persona, de dominio, de sistema interno ni de proyecto del destino.
- Ningún literal de datos reales, ni siquiera de ejemplo, si proviene del dominio del cliente.
- Ninguna captura de pantalla ni asset gráfico del proyecto destino.
- Ninguna decisión que solo tenga sentido en el dominio del proyecto. Si una regla no se puede formular de manera agnóstica del dominio, no se captura.

El documento nuevo se registra en `Index-Modelos-UX-UI.md` en la misma operación. Un modelo que no está en el índice no existe para el orquestador: el paso 1 de §3.1 lee el índice.

---

## 6. Generación del template ofuscado

En la misma operación de §5, AG-03M genera `../IA.SDD/Templates/<Nombre-Modelo>/` con la estructura declarada en `../IA.SDD/Templates/README.md`.

El template es un ejemplo ejecutable del modelo: reproduce las formas constructivas del HTML, del CSS y del JavaScript de la maqueta aprobada, para que un agente futuro no tenga que inferirlas de la prosa. Es al documento de reglas lo que un sample de `11-Examples` es a la referencia de API.

Regla de ofuscación, bloqueante:

1. El dominio se sustituye íntegro por un dominio sintético neutro. No se renombra: se reemplaza. Las entidades pasan a ser genéricas, los campos pasan a ser genéricos, los valores pasan a ser genéricos.
2. Se preserva la forma, se descarta el contenido: la estructura del HTML, los nombres de clase, la organización del CSS, la estrategia de render del JavaScript, la cantidad y el tipo de campos por entidad. Nada del significado del dominio original.
3. Los textos de interfaz se reescriben en términos genéricos, conservando el tono y la longitud aproximada, porque la longitud del texto es una decisión de diseño.
4. Se eliminan todos los assets de imagen que provengan del proyecto; se reemplazan por SVG neutros generados para el template.
5. Antes de escribir, AG-03M hace una pasada de verificación explícita contra la lista de prohibiciones de §5 y declara su resultado en el bloque de devolución. Si la verificación no puede completarse con certeza, no se genera el template.

El template incluye su propio `README.md` con qué patrones demuestra, cómo se relanza y qué hay que reemplazar al derivarlo.

---

## 7. Método de lanzado y relanzado

La maqueta es un sitio estático servido tal cual está en el disco. No tiene proceso de build: lo que se edita es lo que se sirve, y lo que se sirve es lo que el orquestador vuelve a leer. Esa equivalencia es lo que hace posible la vía B del §3.5, que es donde está el valor de la fase.

### 7.1 Métodos soportados

Los cuatro sirven exactamente los mismos archivos. La maqueta no depende de ninguno en particular.

1. **Auto-lanzado del orquestador.** Es lo que ocurre en el paso 4 sin que el humano haga nada: servidor estático en segundo plano más apertura del navegador con el abridor del sistema. Es el camino por defecto y el más cómodo para la primera mirada.
2. **Servidor liviano del editor.** El recomendado cuando el humano va a corregir a mano. En Visual Studio Code, la extensión de servidor local (Live Server o equivalente) sirve la carpeta y recarga el navegador sola en cada guardado, así que el ciclo de editar, guardar y ver no tiene paso intermedio. El orquestador no puede dispararla por su cuenta: no hay una vía soportada para ejecutar comandos dentro de una ventana de editor ya abierta, de modo que la inicia el humano. Si se quiere que abra un navegador determinado, se configura en la extensión.
3. **Servidor estático de línea de comandos.** Cuando no hay editor con extensión de servidor a mano:
   ```bash
   cd SDD/Maquetas/<Nombre-Proyecto>
   python3 -m http.server 8080
   ```
   y abrir `http://localhost:8080`. No recarga sola.
4. **Abrir el archivo directamente.** `SDD/Maquetas/<Nombre-Proyecto>/index.html` en el navegador, sin nada. Sirve para una mirada rápida, pero algunos navegadores restringen operaciones sobre `file://`, así que no es el método para una sesión de validación larga. Con este método la recarga automática de la propia maqueta (§4.3) no funciona.

Para los métodos 1, 2 y 3 la maqueta ofrece además su propia recarga automática, en la barra de validación (§4.3). Cubre el caso de quien no usa la extensión del editor y no quiere refrescar a mano.

El `README.md` de cada maqueta documenta el método que el proyecto haya adoptado.

### 7.2 Sin proceso de build

La maqueta no usa empaquetador ni transpilador. La decisión no es contra ninguna herramienta en particular; es que un paso de build rompe tres cosas que esta fase necesita:

| Necesidad de la fase | Qué pasa con un paso de build |
| --- | --- |
| El humano edita los archivos a mano (§3.5 vía B) | Edita la fuente y necesita rebuild para ver el efecto; si edita el artefacto servido, lo pierde en el build siguiente |
| El orquestador relee las correcciones manuales | Tiene que distinguir fuente de artefacto generado y decidir cuál es la verdad |
| Arranque sin fricción | Instalar dependencias y mantenerlas en el repositorio destino, para una maqueta de vida corta |

A eso se suma que un empaquetador acá no aporta nada: no hay módulos que resolver, ni sintaxis que transpilar, ni tamaño que optimizar. La recarga automática, que sí es útil, la da el servidor del editor sin build.

Si un proyecto futuro necesitara compilar para maquetar (por ejemplo, una librería de componentes que solo se puede demostrar compilada), se registra como ADR en 05 del proyecto y la maqueta documenta su propio comando de build en su `README.md`. Es la excepción, no el camino.

---

## 8. Criterios de aceptación

- [ ] La fase se ejecutó solo si `requiere_maqueta` del proyecto es `true`, y su valor fue confirmado por el humano en el plan inicial.
- [ ] El paso 1 ofreció explícitamente el catálogo base y los modelos de `Modelos-UX-UI/` registrados en el índice, y el humano eligió.
- [ ] Existe una superficie maquetada por cada `wireframes-<superficie>` de 03, con el mínimo por tipo del §4.4 cumplido.
- [ ] Toda superficie demuestra al menos los estados vacío, cargando, con datos y error, conmutables desde la barra de validación.
- [ ] Los datos de ejemplo viven exclusivamente en `assets/js/Datos-Maqueta.js` y ningún HTML los hardcodea.
- [ ] Todo valor visual sale del catálogo de diseño o del modelo elegido, materializado como token; no hay literales visuales ad hoc.
- [ ] La maqueta cumple WCAG 2.2 AA en los mínimos verificables del §4.5.
- [ ] La maqueta abre sin toolchain, con cualquiera de los métodos del §7.1.
- [ ] El paso 4 intentó el auto-lanzado y, si no pudo, informó la URL y el comando sin tratar el fallo como error ni detener la fase.
- [ ] La barra de validación ofrece el interruptor de recarga automática, apagado por defecto y degradado con su razón cuando la maqueta se abre desde `file://`.
- [ ] Al cerrar la fase, el servidor estático levantado por el orquestador quedó apagado y se lo informó.
- [ ] Las dos vías de corrección del §3.5 se ofrecieron explícitamente al humano, y las correcciones manuales fueron releídas, interpretadas y confirmadas antes de propagarse.
- [ ] `Bitacora-Validacion-Maqueta-v1.0.md` tiene una entrada por iteración, con vía, observación, cambio y documento retroalimentado.
- [ ] La aprobación de la maqueta es explícita del humano; no se infiere del silencio.
- [ ] Todo documento afectado por la matriz de propagación del §3.6 fue retroalimentado y subió versión con su entrada de control de cambios.
- [ ] Existen `Linea-Base-Visual-v1.0.md` y `Contrato-Datos-Maqueta-v1.0.md` con los identificadores del §2 de `Deriva-Rules.md`.
- [ ] Si el humano aceptó capitalizar, existen el documento de modelo en `Modelos-UX-UI/`, su entrada en el índice y el template en `Templates/`, y la verificación de ofuscación del §6.5 está declarada.
- [ ] Ningún artefacto escrito en `IA.SDD` contiene nombres, datos, assets ni decisiones del dominio del proyecto destino.

---

## 9. Anti-patrones a evitar

| Anti-patrón | Problema | Solución |
| --- | --- | --- |
| Maquetar antes de que 02 y 03 estén aprobados | La maqueta se convierte en la especificación y el análisis se saltea; se dibuja lo primero que se ocurre | La Fase B2 corre después del audit de la Fase B, sobre una especificación ya auditada |
| Maqueta que solo muestra el flujo feliz | El humano aprueba un producto que no tiene definido qué pasa cuando algo falla | Barra de validación con los cuatro estados mínimos por superficie |
| Datos de ejemplo inventados por el maquetador | La maqueta valida un modelo de datos que nadie especificó | Los datos salen de los ejemplos de 02; si falta uno, se emite ambigüedad |
| Datos hardcodeados dentro del HTML | La maqueta deja de servir para validar el modelo de datos y toda corrección hay que hacerla N veces | Fuente única en `Datos-Maqueta.js` |
| Aprobar la maqueta y no retroalimentar la documentación | Queda una documentación que describe un producto distinto del aprobado; es la deriva que la fase venía a evitar | El paso 6 es obligatorio y su omisión es hallazgo P0 del audit |
| Propagar una corrección manual sin confirmar la interpretación | Se documenta una decisión que el humano no tomó | Enumerar las diferencias, interpretarlas y confirmarlas antes de propagar |
| Pisar las correcciones manuales del humano en la iteración siguiente | El humano deja de corregir a mano porque su trabajo se pierde | Preservarlas; ante conflicto con un pedido por prompt, detenerse y preguntar |
| Agregar un paso de build para "hacerlo bien" | Se rompe la edición manual del humano, el orquestador deja de saber si la verdad es la fuente o el artefacto servido, y la maqueta pasa a depender de un toolchain | Estático, servido tal cual está en disco; la excepción se justifica con ADR (§7.2) |
| Maqueta con estilos ad hoc en vez de tokens del catálogo | El diseño se desalinea del resto de la solución y no se puede capitalizar | Heredar tokens; un token nuevo se promueve al catálogo |
| Capturar el modelo UX-UI como descripción en vez de como reglas | Un agente futuro no puede reproducir el diseño leyéndolo | Reglas accionables, una por decisión, con el criterio de inclusión del §5 |
| Publicar en `IA.SDD` un template con literales del dominio del cliente | Se filtra información de un cliente en un repositorio público | Ofuscación bloqueante del §6 con verificación declarada |
| Hacer que la fase dependa del auto-lanzado del navegador | El orquestador puede correr sin sesión gráfica alcanzable y la validación queda bloqueada por una comodidad | El auto-lanzado es comodidad; la URL informada es el contrato (§3.4) |
| Maqueta sin accesibilidad porque "es solo una maqueta" | Se valida y se aprueba una superficie inaccesible; el problema se descubre en 08 | WCAG 2.2 AA como piso también en la maqueta |
| Tratar la maqueta aprobada como documentación viva del producto | Se desactualiza y contradice al código sin que nadie lo note | La maqueta es la línea de base de un momento; lo que vive es la especificación retroalimentada y la matriz de sensado de deriva |

---

## 10. Prompt-snippet sugerido

```text
Sos un {{ESPECIALIDAD-VARIANTE}} responsable de la Fase B2 de validación visual de maqueta
del proyecto {{NOMBRE_PROYECTO}} de la solución {{NOMBRE_SOLUCION}}.

Tipo de proyecto: {{TIPO}} (uno de los ocho valores D8).
Modelo UX-UI elegido por el humano: {{MODELO_ELEGIDO}}.

Insumos obligatorios:
- 02 del proyecto: CU, RN, modelo conceptual de datos y sus ejemplos.
- 03 del proyecto: Experiencia-De-Uso, wireframes-<superficie>, representacion-<concepto>, Glosario-UX.
- 00: persona objetivo.
- Catálogo de diseño: ../IA.SDD/SDD/Devs/References/Design/Index-Design-Rules.md, el documento base,
  la especialización de stack y las extensiones por capacidad que apliquen.
- Modelo elegido, si no es el catálogo base: ../IA.SDD/SDD/Devs/Modelos-UX-UI/{{MODELO_ELEGIDO}}.

A generar en SDD/Maquetas/{{NOMBRE_PROYECTO}}/:
- index.html, un <Superficie>.html por wireframe de 03.
- assets/css/Estilos-Maqueta.css con los tokens del catálogo como variables CSS.
- assets/js/Datos-Maqueta.js como fuente única de los datos de ejemplo y del contrato de campos.
- assets/js/Maqueta.js con el render, la navegación y la conmutación de estados.
- README.md de la maqueta.

Reglas constructivas: §4 de Maqueta-Rules.md.
Tecnología: HTML5 semántico, CSS con tokens, JavaScript vanilla, Bootstrap 5.0 por CDN.
Sin proceso de build ni node_modules: lo que se edita es lo que se sirve (§7).
Estados: vacío, cargando, con datos y error como mínimo, conmutables desde la barra de validación.
Barra de validación: incluye el interruptor de recarga automática, apagado por defecto (§4.3).
Datos: salen de los ejemplos de 02; si falta un ejemplo, emitir ambigüedad (§9 del master-prompt),
no inventar. Nunca datos reales del cliente.
Accesibilidad: WCAG 2.2 nivel AA como piso, con los mínimos verificables de §4.5.

Restricciones: no redefinir la experiencia especificada en 03; los hallazgos se emiten para el paso
de retroalimentación. No definir tokens visuales ad hoc. Idioma rioplatense técnico, tildes correctas,
sin emojis.

Devolución:
1. Lista de archivos generados con su superficie y el CU que materializa.
2. Lista de hallazgos sobre la especificación de 03 detectados al maquetar.
3. Lista de ambigüedades en el formato de §9 del master-prompt.
4. Auto-chequeo contra §8 de Maqueta-Rules.md.
```

---

## 11. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-19 | Reglas iniciales de la Fase B2 de validación visual de maqueta. Define el subagente AG-03M y sus variantes por D8, el flag `requiere_maqueta`, los artefactos de maqueta en `SDD/Maquetas/<Nombre-Proyecto>/` y los tres documentos de 03 que la fase produce, la secuencia de siete pasos con sus detenciones, las dos vías de corrección (por prompt y manual con relectura e interpretación confirmada), la matriz de propagación de la retroalimentación, las reglas constructivas de la maqueta, la captura del modelo UX-UI en `Modelos-UX-UI/`, la generación del template ofuscado en `Templates/` con verificación bloqueante, el lanzado automático del paso 4 con degradación a URL informada, el método de relanzado con sus cuatro formas soportadas, la recarga automática propia de la barra de validación y la decisión de no incorporar un paso de build, criterios de aceptación, anti-patrones y prompt-snippet. |
