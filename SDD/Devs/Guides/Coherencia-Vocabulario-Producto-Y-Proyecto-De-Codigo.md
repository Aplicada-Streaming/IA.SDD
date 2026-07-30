# Nota de coherencia — Vocabulario normativo: producto, proyecto de código y los cuatro planos de identidad

**Framework:** SDD
**Documento:** Coherencia-Vocabulario-Producto-Y-Proyecto-De-Codigo.md
**Versión:** 1.1
**Estado:** Vigente
**Fecha:** 2026-07-29
**Autor:** AG-ROOT (Arquitecto de Soluciones)

---

## 1. Alcance

Intervención sobre el vocabulario normativo del framework, publicada como versión **5.0**. Renombra el nivel superior de «solución» a **producto**, la unidad de compilación de «proyecto» a **proyecto de código**, separa los cuatro planos de identidad de un producto en campos propios e incorpora un archivo de reglas nuevo que fija el vocabulario.

Alcanza a los 42 archivos markdown del conjunto normativo, excluidos `SDD/Devs/Bootstrap/` y `_legacy/`, que son registros.

**Lo que la intervención no hace.** No reubica ninguna categoría documental, no cambia el conjunto D8, no altera el orden de fases, no toca la mecánica plan-then-confirm ni el ciclo de auditoría. Es un cambio de nombres y de definiciones, con dos validaciones nuevas que se derivan de ellas.

---

## 2. Por qué era necesaria

El framework no tenía glosario propio. El único disponible, `Marco-Teorico-SDD.md` §9, es un glosario de industria y definía sus dos términos centrales por su papel en la herramienta:

| Término | Definición anterior | Problema |
| --- | --- | --- |
| Proyecto | «Unidad de especialización del template» | Definido por lo que la herramienta hace con él, no por su frontera |
| Solución | «Agrupación de una jerarquía de N proyectos» | Definición puramente estructural, sin negocio ni frontera |

Un término definido por su papel en la herramienta absorbe cualquier significado. «Proyecto» llegó a designar cuatro cosas dentro del mismo árbol generado: la unidad de compilación de la composición, la unidad que recibe las categorías 02 a 11, el emprendimiento de `Alcance-Proyecto.md`, y —en un destino real— una entidad del dominio del cliente.

Tres hechos del propio framework mostraban que el nivel superior ya era el de producto y solo faltaba la palabra:

1. `Rules-Contexto.md` se titula «00 Contexto del producto» y emite `Vision-Producto.md` y `Roadmap-Producto.md` **a nivel solución**.
2. `SDD-User-Guide.md` fijaba la frontera de una solución con criterios de producto: «productos verdaderamente independientes, con clientes, roadmaps y ciclos de vida desacoplados».
3. El framework nombraba 62 veces «Product Owner» y 4 «Product Manager». Un Product Owner es dueño de un producto.

---

## 3. Inventario de archivos

| Archivo | De | A | Naturaleza del cambio |
| --- | --- | --- | --- |
| `Vocabulario-Rules.md` | — | 1.0 | **Nuevo.** Seis términos, cuatro planos de identidad, cinco reglas de uso, precedencia frente al dominio del cliente, correspondencia de industria |
| `Master-Prompt.md` | 4.1 | 5.0 | §3.2 derivación reformulada; §3.4 bloque informativo; §8 esqueleto de despacho; renombre en todo el cuerpo |
| `PRODUCT-INTAKE-template.md` | 1.5 | 2.0 | Renombrado desde `SOLUTION-INTAKE-template.md`. Cabecera con los cuatro planos; perfil de convención |
| `PRODUCT-MANIFEST-template.md` | 2.1 | 3.0 | Renombrado desde `SOLUTION-MANIFEST-template.md`. Bloque §1 con planos; ejemplo multi-segmento |
| `Intake-Rules.md` | 2.1 | 3.0 | §4 derivación; validaciones de independencia; §5 regla de choque de vocabulario |
| `Rules-Contexto.md` | 2.1 | 3.0 | `Alcance-Producto.md`; secciones del documento restituidas al sentido de producto |
| `Rules-Arquitectura-Tecnica.md` | 2.0 | 3.0 | `Arquitectura-Proyecto-Codigo.md`, `Vista-Producto.md`, carpeta `Producto/` |
| `Rules-Devops.md` | 2.0 | 3.0 | `Pipeline-Producto.md`, carpeta `Producto/` |
| `Rules-Documentacion.md` | 3.0 | 4.0 | Renombre y nivel declarado |
| `Rules-Examples.md` | 3.0 | 4.0 | Renombre y nivel declarado |
| `Root-Rules.md`, `Rules-Necesidades-Negocio.md`, `Rules-Especificacion-Funcional.md`, `Rules-UX-UI-DX.md`, `Rules-Prompts-AI.md`, `Rules-Backlog-Tecnico.md`, `Rules-Plan-Sprint.md`, `Rules-Calidad-Y-Pruebas.md`, `Maqueta-Rules.md`, `Deriva-Rules.md` | 2.x | 3.0 | Renombre y nivel declarado en cabecera |
| `README.md` | — | — | Anatomía (17 reglas), matriz de ruteo, tabla de niveles, redacción de D8 |
| `Marco-Teorico-SDD.md` | 1.9 | 2.0 | Renombre en el cuerpo y en el glosario de §9 |
| `SDD-Development-Guide.md` | 1.2 | 1.3 | Renombre |
| `SDD-User-Guide.md`, `SDD-Getting-Started-Guide.md`, catálogo `References/Design/`, `Modelos-UX-UI/`, `Templates/`, `PROMPTS/` | — | — | Renombre |
| `CHANGELOG.md` | — | — | Entrada `[5.0]` |
| `_legacy/4.1/` | — | — | Snapshot del conjunto superado, 56 archivos, verificado idéntico antes de intervenir |

---

## 4. Verificación de invariantes (D1–D9)

| Invariante | Verificación |
| --- | --- |
| **D1** Idioma y registro | Todo el texto nuevo en español rioplatense neutro técnico, con tildes y eñes. Sin emojis ni negritas decorativas. **Celda reexpresada en la 1.1** (criterio de reexpresión del `README.md`: una verificación concreta se reexpresa cuando quedaría falsa contra el árbol). La formulación original afirmaba un barrido de concordancias de género que **no se había hecho**: la revisión de la 5.1 encontró «producto técnica», «productos técnicas» y «productos SDD distintas», y treinta ocurrencias de la palabra inexistente «reproducto». La afirmación era una afirmación sobre el estado del sistema sin evidencia válida, que es lo que D9 prohíbe. El barrido se ejecutó en la 5.1 y su resultado está en `Coherencia-Sustitucion-Lexica-Y-Gobierno-Glosario.md` |
| **D2** Encoding | UTF-8 sin BOM, LF. **Celda reexpresada en la 1.1**: la formulación original afirmaba haber restituido el LF final «en los archivos que no lo tenían», y `SDD-Development-Guide.md` seguía sin él. Se restituyó en la 5.1 |
| **D3** Nombres | Los identificadores nuevos respetan Título-Con-Guiones: `Nombre-Producto`, `Slug-Producto`, `Raiz-Codigo`, `Artefacto-Agrupacion`, `Nombre-Proyecto-Codigo`, `Identidad-Codigo`. Los nombres de archivo siguen en ASCII sin acentos |
| **D4** Sufijo de versión | Ningún archivo vivo lleva sufijo en el nombre; cada uno declara su versión en cabecera |
| **D5** Una sola versión vigente | Un archivo por nombre lógico. El conjunto superado se archivó completo en `_legacy/4.1/` antes de la primera modificación, con verificación por `diff -r` |
| **D6** Trazabilidad | Las referencias cruzadas se renombraron en bloque, de modo que apuntan a los nombres nuevos. `Vocabulario-Rules.md` queda enlazado desde el README, desde las dos plantillas y desde las cabeceras de las dieciséis reglas restantes |
| **D7** Neutralidad de dominio | El ejemplo nuevo de raíz multi-segmento usa `Contoso.Turnos`, organización ficticia sobre el dominio de ejemplo que el framework ya usaba. No se introdujo vocabulario de ningún cliente |
| **D8** Conjunto cerrado | **Se modificó la redacción de la invariante**, que decía «tipos de proyecto». Los ocho valores no cambian. `Vocabulario-Rules.md` §8 declara que D8 es un catálogo de formas de entrega y que a qué nivel corresponde se decide en una intervención aparte |
| **D9** Evidencia verificable | Toda afirmación de esta nota y de `Vocabulario-Rules.md` §1 a §6 se verifica abriendo archivos de este repositorio. La tabla de correspondencia de industria de §7 declara explícitamente que se verifica contra estándares publicados y se cita sin número de cláusula, porque un número no comprobable desde el repositorio sería una cita sin evidencia |

---

## 5. Verificación de trazabilidad

- El README enumera diecisiete archivos de reglas y cinco transversales; el directorio contiene diecisiete.
- Las dieciséis reglas preexistentes declaran su nivel de aplicación en cabecera y citan `Vocabulario-Rules.md` §4 R3.
- Las dos plantillas de intake enlazan `Vocabulario-Rules.md` §3 desde el bloque de identidad.
- `Master-Prompt.md` §3.2 y `Intake-Rules.md` §4 declaran la misma validación de independencia, cada una desde su lado, y se citan mutuamente.
- Los marcadores del esqueleto de despacho quedaron en cinco distintos (`NOMBRE_PRODUCTO`, `SLUG_PRODUCTO`, `RAIZ_CODIGO`, `ARTEFACTO_AGRUPACION`, `NOMBRE_PROYECTO_CODIGO`), sin repetición en posiciones que deban llevar valores distintos.

---

## 6. Observaciones

1. **La primera propuesta de término para la unidad de compilación fue «módulo» y se descartó por evidencia.** Un barrido mostró que «módulo» ya designaba un área funcional del producto en 37 lugares del framework —wireframe por módulo, acento por módulo, módulos incluidos en el plan de pruebas— y en la documentación generada de los destinos reales. Adoptarlo habría creado una colisión nueva en el plano de UX y de pruebas en lugar de cerrar una. Se adoptó «proyecto de código», que además ya había sido adoptado por un destino real por su cuenta.
2. **«Solución» sobrevive en un solo compuesto.** Al pasar el nivel superior a «producto», la palabra queda usada únicamente en «solución de código», donde significa lo mismo que en el ecosistema. La homonimia con el archivo de solución de .NET, que la formulación anterior solo podía mitigar, desaparece.
3. **Queda una excepción declarada a la prohibición de «proyecto» a secas**: los compuestos `multi-proyecto`, `inter-proyecto` y `cross-proyecto`, donde el calificador no entra sin deformar la palabra. Está enunciada en `Vocabulario-Rules.md` §4 R1 y acotada a esos tres.
4. **La unidad de entrega está definida pero no materializada.** Es la discrepancia declarada de `Vocabulario-Rules.md` §8: once de las doce categorías producen artefactos de nivel producto y cuelgan de un nivel poblado con proyectos de código. Reubicarlas es una intervención estructural que esta nota no ejecuta y que conviene no confundir con un descuido de esta.
5. **Los destinos existentes no se renombraron.** La reconciliación normativa de `Master-Prompt.md` §2.1 es el mecanismo previsto y ofrece las tres salidas; el conjunto 4.1 quedó archivado para poder aplicar la salida C.
6. **La intervención se ejecutó por sustitución global de cadena, y eso introdujo una clase de defecto que este veredicto no detectó.** Agregada en la 1.1, con la revisión de la 5.1 como evidencia. El método —reemplazar `soluci*` por `producto` y `proyecto` por `proyecto de código`— produjo cuatro clases de daño: treinta ocurrencias de la palabra inexistente «reproducto», porque «re**soluci**ón» contiene la cadena; veintitrés cabeceras de tabla de anti-patrones cuya columna de remedio se llama «Solución», uso que R2 conserva; catorce etiquetas de cabecera `**Proyecto:**` convertidas en `**Proyecto de código:**` sobre valores que no son unidades de compilación; y sesenta filas históricas de control de cambios reescritas, contra `SDD-Development-Guide.md` §VI.2. **La lección es del framework, no de la ejecución**: no existía ninguna regla que prohibiera el procedimiento. Ahora existe, en `Vocabulario-Rules.md` §9.5, y es la primera regla del framework cuya evidencia es un defecto del propio framework.

---

## 7. Veredicto

**APROBADO.** El conjunto normativo 5.0 es internamente coherente: un término por concepto y un concepto por término, con las definiciones ancladas en un archivo de reglas verificable y con criterios de aceptación auditables. Las dos discrepancias que subsisten —la unidad de entrega sin nivel propio y D8 en el nivel del proyecto de código— están declaradas como pendientes en el propio cuerpo normativo, con su razón, y no como omisiones.

---

## 8. Control de cambios

| Versión | Fecha | Cambios | Autor |
| --- | --- | --- | --- |
| 1.0 | 2026-07-29 | Nota inicial de la intervención de vocabulario normativo publicada como framework 5.0. | AG-ROOT |
| 1.1 | 2026-07-29 | Reexpresión de las celdas **D1** y **D2** de §4, que afirmaban verificaciones no realizadas, y remisión a la nota de la 5.1. El **alcance** verificado por esta nota no se modifica: sigue siendo D1 a D9 sobre la intervención de vocabulario, según el criterio del `README.md` de que el alcance no se toca nunca y solo se reexpresa la verificación concreta que quedaría falsa. Se agrega la observación 6, con la clase de defecto que la intervención introdujo y que su propio veredicto no detectó. | AG-ROOT |
