---
doc_id: GUIDE-SDD-DEVELOPMENT
doc_type: development-guide
title: Guía de desarrollo y extensibilidad del framework SDD
status: vigente
version: 1.4
owner: Framework SDD
last_review: 2026-07-29
audience: [mantenedor-del-framework, agente-ia]
language: es-rioplatense-neutro-tecnico
traces:
  - Marco-Teorico-SDD.md
  - Master-Prompt.md
  - Root-Rules.md
---

# Guía de desarrollo y extensibilidad del framework SDD

**Documento:** SDD-Development-Guide.md
**Versión:** 1.4
**Estado:** Vigente
**Fecha:** 2026-07-29
**Rol de intervención:** Mantenedor del framework

## Resumen ejecutivo

Esta guía explica cómo está construido el framework SDD por dentro y cómo modificarlo sin romperlo. Sirve a quien desarrolla y extiende el framework mismo, no a quien lo usa sobre un producto. Documenta la anatomía del repositorio, los contratos implícitos entre sus piezas, un procedimiento por cada eje de extensión, los criterios para decidir antes de tocar nada, los errores conocidos al extender y el procedimiento de cambio con su versionado.

No repite el marco teórico. Los fundamentos, la metodología, el catálogo de especialidades y los estilos arquitectónicos viven en [`../Devs/Guides/Marco-Teorico-SDD.md`](../Devs/Guides/Marco-Teorico-SDD.md), con catorce secciones que esta guía referencia y no duplica.

---

## Tabla de contenido

- [1. Para quién es esta guía](#1-para-quién-es-esta-guía)
- [Parte I — Anatomía del framework](#parte-i--anatomía-del-framework)
  - [I.1 Mapa de dependencias](#i1-mapa-de-dependencias)
  - [I.2 Despiece por carpeta](#i2-despiece-por-carpeta)
  - [I.3 Quién lee y quién escribe cada pieza](#i3-quién-lee-y-quién-escribe-cada-pieza)
- [Parte II — Los contratos internos](#parte-ii--los-contratos-internos)
  - [II.1 La estructura canónica de nueve secciones](#ii1-la-estructura-canónica-de-nueve-secciones)
  - [II.2 Cómo el orquestador decide qué generar](#ii2-cómo-el-orquestador-decide-qué-generar)
  - [II.3 El gating de doble granularidad](#ii3-el-gating-de-doble-granularidad)
  - [II.4 Cómo se encadena la trazabilidad](#ii4-cómo-se-encadena-la-trazabilidad)
  - [II.5 Qué espera el auditor de cada fase](#ii5-qué-espera-el-auditor-de-cada-fase)
  - [II.6 Cómo se derivan los flags del intake](#ii6-cómo-se-derivan-los-flags-del-intake)
- [Parte III — Metodología de extensibilidad](#parte-iii--metodología-de-extensibilidad)
  - [III.1 Agregar una categoría documental nueva](#iii1-agregar-una-categoría-documental-nueva)
  - [III.2 Agregar o modificar un artefacto dentro de una categoría](#iii2-agregar-o-modificar-un-artefacto-dentro-de-una-categoría)
  - [III.3 Agregar una variante de especialidad](#iii3-agregar-una-variante-de-especialidad)
  - [III.4 Agregar una fase al orquestador](#iii4-agregar-una-fase-al-orquestador)
  - [III.5 Modificar el gating por tipo D8](#iii5-modificar-el-gating-por-tipo-d8)
  - [III.6 Agregar un modelo UX-UI al catálogo](#iii6-agregar-un-modelo-ux-ui-al-catálogo)
  - [III.7 Modificar una invariante global](#iii7-modificar-una-invariante-global)
  - [III.8 Agregar una regla transversal nueva](#iii8-agregar-una-regla-transversal-nueva)
  - [III.9 Agregar un flag de gating](#iii9-agregar-un-flag-de-gating)
  - [III.10 Por qué el conjunto D8 es cerrado](#iii10-por-qué-el-conjunto-d8-es-cerrado)
- [Parte IV — Criterios y preguntas guía](#parte-iv--criterios-y-preguntas-guía)
- [Parte V — Anti-patrones de extensión](#parte-v--anti-patrones-de-extensión)
- [Parte VI — Procedimiento de cambio](#parte-vi--procedimiento-de-cambio)
- [Control de cambios](#control-de-cambios)

---

## 1. Para quién es esta guía

El framework tiene cuatro documentos de cara al lector y cada uno responde una pregunta distinta. Elegir el equivocado hace perder tiempo, así que conviene declarar la correspondencia antes de seguir.

| Guía | Lector | Responde |
| --- | --- | --- |
| [`SDD-Getting-Started-Guide.md`](SDD-Getting-Started-Guide.md) | Quien arranca por primera vez | «¿Cómo pongo esto a andar hoy?» |
| [`SDD-User-Guide.md`](SDD-User-Guide.md) | Quien **usa** el framework en un producto real | «¿Cómo lo aplico paso a paso?» |
| [`../Devs/Guides/Marco-Teorico-SDD.md`](../Devs/Guides/Marco-Teorico-SDD.md) | Quien quiere entender los fundamentos | «¿Por qué está diseñado así?» |
| **Esta guía** | Quien **desarrolla y extiende el framework mismo** | «¿Cómo está construido por dentro y cómo lo modifico sin romperlo?» |

Es una audiencia que hasta esta versión no tenía documento: el mantenedor del framework, no el de un producto. La diferencia práctica es de dirección de escritura. Quien usa el framework escribe en el repositorio destino y nunca toca este repositorio; quien lo desarrolla escribe acá y no toca ningún producto.

**Prerrequisito de lectura.** Esta guía asume que ya conocés el flujo de fases y el modelo de tres repositorios. Si no, empezá por la guía de usuario: acá esos temas no se repiten.

---

## Parte I — Anatomía del framework

### I.1 Mapa de dependencias

El framework no es una colección de archivos sueltos: es un grafo con dirección. El orquestador lee las reglas, las reglas leen el catálogo de diseño, y todo se apoya sobre las invariantes globales. Nada apunta hacia atrás.

```mermaid
graph TD
    INTAKE[PRODUCT-INTAKE-template<br/>plantilla que completa el usuario]
    IR[Intake-Rules<br/>validacion del intake]
    VOC[Vocabulario-Rules<br/>vocabulario normativo]
    MANIF[PRODUCT-MANIFEST<br/>derivado por el orquestador]
    MP[Master-Prompt<br/>orquestador]
    RULES[Rules-XX<br/>doce archivos de categoria]
    ROOT[Root-Rules<br/>layout canonico]
    MAQ[Maqueta-Rules<br/>validacion visual]
    DER[Deriva-Rules<br/>sensado y evidencia D9]
    REF[References/Design<br/>catalogo de diseno]
    MOD[Modelos-UX-UI<br/>modelos capturados]
    TPL[Templates<br/>maquetas ejecutables]
    MT[Marco-Teorico<br/>fundamentos]

    INTAKE --> IR
    IR --> MANIF
    MANIF --> MP
    MP --> RULES
    MP --> ROOT
    MP --> MAQ
    MP --> DER
    MP --> VOC
    VOC --> RULES
    RULES --> REF
    MAQ --> MOD
    MOD --> TPL
    MT -.fundamenta.-> RULES
    MT -.fundamenta.-> MP
```

Las líneas punteadas señalan una relación distinta de las demás. El marco teórico **fundamenta** las reglas pero no las gobierna: si el marco y una regla se contradicen, gana la regla y el marco se corrige. La razón es que la regla es ejecutable —un subagente la lee y produce algo— mientras que el marco es explicativo.

### I.2 Despiece por carpeta

| Ruta | Responsabilidad | Cuándo se toca |
| --- | --- | --- |
| `SDD/Devs/Rules/` | Los diecisiete archivos normativos: doce de categoría más cinco transversales, `Root-Rules`, `Intake-Rules`, `Maqueta-Rules`, `Deriva-Rules` y `Vocabulario-Rules`. Cada uno define qué produce su categoría, con qué estructura y bajo qué criterios | En casi toda extensión |
| `SDD/Devs/Orchestrator/` | El master-prompt. Despacha subagentes por fase, aplica el gating, ordena topológicamente y corta para confirmación humana | Al agregar fases, categorías o flags |
| `SDD/Devs/Intake/` | `PRODUCT-INTAKE-template.md`, que completa el usuario, y `PRODUCT-MANIFEST-template.md`, que deriva el orquestador | Al agregar una sección de intake o un flag derivable |
| `SDD/Devs/Guides/` | Marco teórico y notas de coherencia de auditoría | Al cambiar fundamentos, o al cerrar una intervención |
| `SDD/Devs/References/Design/` | Catálogo de reglas de diseño, por stack y por capacidad transversal, con su índice | Al agregar una capacidad de diseño reutilizable |
| `SDD/Devs/Modelos-UX-UI/` | Modelos UX-UI capturados de maquetas aprobadas, con su índice y su plantilla de registro | Al capturar un modelo nuevo desde una Fase B2 |
| `SDD/Devs/Bootstrap/` | Auditoría del fuente que originó el framework. **Fuente citada, no archivo muerto**: siete archivos de reglas la referencian como origen del rationale de sus correcciones | Nunca se edita; se cita |
| `_legacy/` | Una subcarpeta por versión publicada, con el conjunto normativo completo tal como estaba al publicarse. Permite reconstruir con qué reglas exactas se generó un destino sin recurrir al control de versiones | Al publicar una versión nueva. Lo ya archivado no se toca nunca |
| `SDD/Guides/` | Las tres guías de cara al usuario | Al cambiar algo que el usuario percibe |
| `PROMPTS/` | El prompt de entrada del agente de bootstrap | Al cambiar el modelo de repositorios o el arranque |
| `Templates/` | Maquetas ejecutables de referencia, ofuscadas | Al capturar un template desde una Fase B2 |

**Sobre `Bootstrap/`.** Describe el estado del fuente que originó el framework y es la evidencia de por qué varias reglas son como son: siete archivos de reglas la citan explícitamente al declarar qué déficit corrigen. No se edita. Corregirla para que coincida con el estado actual falsearía el registro, así que cuando una intervención renombra categorías o reasigna subagentes esa carpeta queda deliberadamente desactualizada, y la intervención lo declara en su nota de coherencia.

**Criterio para el material histórico en general.** Un registro histórico se conserva mientras alguien lo cite o mientras explique algo que las reglas vigentes no expliquen por sí solas. Cuando su contenido queda íntegramente absorbido —la propuesta está implementada, el audit cerró aprobado, la plantilla fue reemplazada— y ningún archivo vivo lo referencia, se elimina y su existencia queda registrada en el `CHANGELOG.md`. El historial de git lo preserva. Es lo que se hizo con las carpetas de reformulación y de plantillas de intake superadas.

### I.3 Quién lee y quién escribe cada pieza

| Pieza | La escribe | La lee |
| --- | --- | --- |
| Archivo de reglas de una categoría | El mantenedor del framework | El orquestador al armar el plan; el subagente de esa categoría al generar; el auditor al verificar |
| Master-prompt | El mantenedor del framework | El agente orquestador, en cada corrida |
| Plantilla de intake | El mantenedor del framework | El usuario, que la completa; el orquestador, que la valida y deriva de ella |
| Catálogo de diseño | El mantenedor del framework | El subagente de UX-UI-DX |
| Modelos UX-UI | El orquestador, con aceptación humana explícita (única excepción de escritura sobre este repositorio) | El humano, al elegir modelo en la Fase B2 |
| Marco teórico | El mantenedor del framework | Quien quiere entender por qué |
| `Vocabulario-Rules.md` | El mantenedor del framework | **Todos**: el orquestador, todo subagente y todo auditor. Es la única regla transversal que `Master-Prompt.md` §8 inyecta en cada despacho, porque su archivo target es todo artefacto que el framework genera |

Un dato que conviene tener presente al extender: **el subagente de una categoría recibe un solo archivo de reglas de categoría, más `Vocabulario-Rules.md`**. No lee los demás. Todo lo que necesite saber sobre una categoría vecina tiene que estar declarado en su propio archivo, típicamente como frontera. Es la causa más frecuente de solapamiento entre categorías, y la que menos se anticipa.

---

## Parte II — Los contratos internos

Las piezas del framework se comunican por contratos que hasta esta guía no estaban escritos en ningún lado. Son la causa más probable de que una extensión rompa algo sin que nadie entienda por qué.

### II.1 La estructura canónica de nueve secciones

Todo archivo de reglas de categoría comparte la misma estructura, de §0 a §9. No es una convención estética: hay despacho y auditoría que la asumen.

| Sección | Contenido | Quién la consume |
| --- | --- | --- |
| §0 | Posición en la cadena SDD: upstream, downstream, gating de la categoría | El orquestador, al armar el plan y ordenar las fases |
| §1 | Especialidad asignada, variantes por tipo D8, multi-especialidad | El orquestador, al elegir el perfil del subagente |
| §2 | Documentos que produce: tabla maestra y reglas de inclusión por tipo | El orquestador, al filtrar qué se genera |
| §3 | Nomenclatura y vinculación: patrón de nombres, identificadores, trazabilidad | El subagente y el auditor |
| §4 | Estructura de redacción por artefacto, tablas tipo, anti-patrones | El subagente |
| §5 | Preguntas guía para el subagente | El subagente |
| §6 | Criterios de aceptación | El auditor de la fase |
| §7 | Ejemplos genéricos | El subagente |
| §8 | Prompt-snippet sugerido | El orquestador, al despachar |
| §9 | Control de cambios | El mantenedor del framework |

**Por qué es rígida.** El orquestador arma cada despacho leyendo §1.2 para la variante de especialidad, §2.1 y §2.2 para filtrar documentos, y §8 para el prompt-snippet y la ruta de salida. El auditor verifica contra §6. Un archivo que mueva ese contenido de lugar obliga a quien lo lea a buscarlo, y quien busca se equivoca.

**Dónde la rigidez es real y dónde no.** Los números de §0 a §9 son estables en los doce archivos de categoría. La numeración de las **subsecciones** de §4 no lo es: la sección de anti-patrones va de §4.4 a §4.9 según el archivo. Por eso el master-prompt la ubica por título y no por número, y toda extensión debe hacer lo mismo.

Las cinco reglas transversales no siguen exactamente esta estructura, porque no gobiernan una categoría. `Deriva-Rules.md` y `Maqueta-Rules.md` tienen su propia organización de §0 a §9 con contenido distinto, y `Vocabulario-Rules.md` la suya de §1 a §11; eso es correcto: la estructura canónica aplica a lo que produce documentación de una carpeta numerada.

### II.2 Cómo el orquestador decide qué generar

La decisión encadena tres entradas y no admite atajos.

```mermaid
graph LR
    A[PRODUCT-INTAKE 13<br/>tabla de proyectos de código] --> B[PRODUCT-MANIFEST<br/>derivado y confirmado]
    B --> C{tipo_proyecto_codigo<br/>de cada proyecto de código}
    C --> D[Seccion 0 y 2.2 del archivo<br/>de reglas: existe la categoria?]
    D --> E[Seccion 2.1: que artefactos<br/>se materializan?]
    E --> F[Seccion 1.2: que variante<br/>de especialidad?]
    F --> G[Seccion 8: prompt-snippet<br/>y ruta de salida]
```

El `tipo_proyecto_codigo` es el discriminador central. Sale de §13 del intake, se deriva al manifiesto, el humano lo confirma, y a partir de ahí gobierna tres decisiones distintas en cada categoría: si la categoría existe, qué subconjunto de artefactos produce, y con qué perfil profesional se la genera.

**Consecuencia para quien extiende.** Si agregás un artefacto sin declarar su comportamiento para los ocho tipos, el orquestador no sabe si generarlo. En el mejor caso lo genera siempre, que suele ser incorrecto; en el peor, el subagente decide por su cuenta y el resultado varía entre corridas del mismo proyecto de código.

### II.3 El gating de doble granularidad

El framework filtra en dos niveles, y confundirlos produce categorías vacías o artefactos huérfanos.

| Nivel | Pregunta | Dónde se declara |
| --- | --- | --- |
| **Categoría** | ¿Esta categoría existe para este tipo D8? | §0 y §2.2 del archivo de reglas |
| **Artefacto** | Dentro de la categoría, ¿qué documentos se materializan? | §2.1, columnas «Obligatorio para», «Recomendado», «Omitir para» |

Hay un tercer discriminador que se suma a los dos anteriores: los **flags** de §4 del master-prompt. `usa_llm` habilita la categoría 04 entera; `requiere_maqueta` habilita la Fase B2; `tiene_portal_developers` refuerza artefactos de 03 y de 11. Un flag no reemplaza al gating por tipo: se combina con él.

La categoría 11 introdujo una variante que conviene conocer porque puede repetirse: su gating es **por cuerpo**, un nivel intermedio entre categoría y artefacto. La categoría existe siempre, y lo que varía es cuál de sus tres cuerpos —integrador, mantenedor, operador— se materializa. Cuando una categoría agrupa artefactos por rol de lector, ese nivel intermedio resulta más expresivo que la tabla plana de artefactos, porque permite decir «este proyecto de código no tiene integradores externos» sin tener que repetir la exclusión en siete filas.

**Regla de cierre.** Toda omisión por gating se registra en `Decisiones-Proyecto.md` del proyecto de código. Cuando el equipo omite algo que el gating declara obligatorio, se requiere ADR.

### II.4 Cómo se encadena la trazabilidad

La cadena D6 es lo que hace que la documentación sea auditable en lugar de ser una colección de opiniones.

```mermaid
graph LR
    NB[NB-XX<br/>necesidad de negocio] --> CU[CU-XX<br/>caso de uso]
    CU --> ADR[ADR-XX<br/>decision de arquitectura]
    ADR --> US[US-XX y BT-XX<br/>backlog]
    US --> TC[casos de prueba]
    CU --> VER[VER-XX<br/>contrato de verificacion]
    VER --> DOC[cuerpo documental<br/>de entrega]
```

Cada eslabón declara su upstream en la cabecera del documento y su downstream cuando corresponde. El auditor verifica dos cosas distintas: que las referencias **resuelvan** —el identificador citado existe— y que no haya **huérfanos** —un CU sin NB que lo origine, una BT sin US que la consuma.

**Consecuencia para quien extiende.** Un artefacto nuevo que no declara su lugar en esta cadena es invisible para el auditor. Antes de agregarlo hay que poder responder de qué recibe y a qué alimenta. Si la respuesta honesta es «de nada y a nada», probablemente el artefacto no corresponde a este framework.

### II.5 Qué espera el auditor de cada fase

El auditor se invoca desde cero, sin contexto previo, y lee solo los entregables de la fase, sus insumos upstream y los archivos de reglas correspondientes. Verifica cinco cosas:

1. Conformidad D1 a D9 de cada documento.
2. Cumplimiento de §6 del archivo de reglas, para el `tipo_proyecto_codigo` del proyecto de código.
3. Coherencia cross-doc dentro de la fase: referencias que resuelven, identificadores no duplicados, glosario sin contradicciones.
4. Trazabilidad declarada y consistente con §3.3 del archivo de reglas.
5. Filename y estructura de carpetas correctos.

Los hallazgos van en cuatro niveles, de P0 a P3, y solo P0 detiene la cadena. El veredicto es `APROBADO`, `APROBADO CON OBSERVACIONES` o `RECHAZADO`.

**Consecuencia para quien extiende.** Si agregás un artefacto y no agregás su criterio en §6, el auditor no lo verifica, y el artefacto puede salir vacío o mal formado sin que nadie lo note. Es el error de extensión más silencioso de todos, porque no falla: simplemente no verifica.

### II.6 Cómo se derivan los flags del intake

Los flags de §4 del master-prompt no los inventa el orquestador ni los pregunta a ciegas: cada uno tiene una regla de derivación desde el intake y una confirmación humana.

| Flag | Se deriva de | Habilita |
| --- | --- | --- |
| `usa_llm` | Declaración explícita del proyecto de código en el intake | La categoría 04 completa |
| `tiene_ui_final` | Tipo D8 y declaración del intake | Variante UX/UI de la categoría 03 |
| `requiere_maqueta` | `tiene_ui_final`, `tipo_proyecto_codigo` y `tiene_portal_developers`; propuesto por el orquestador y confirmado o invertido por el humano | La Fase B2 y la línea de base del sensado de deriva |
| `tiene_portal_developers` | Declaración del intake sobre SDK público o documentación pública | Documentos DX adicionales en 03; refuerza 10 y 11 |
| `tiene_extensibilidad` | Puntos de extensión declarados en el intake | Artefactos de extensión en 05 y guía de extensión en 11 |

El patrón es siempre el mismo y conviene respetarlo al agregar un flag: **derivar un valor propuesto, presentarlo, y dejar que el humano lo confirme o lo invierta**. Un flag que el orquestador fija sin preguntar convierte una decisión de producto en un efecto secundario de una regla de derivación, y el usuario se entera cuando ve el resultado.

---

## Parte III — Metodología de extensibilidad

Cada eje sigue la misma estructura: qué estás agregando, qué archivos tocar y en qué orden, qué invariantes no se pueden romper, cómo verificar que no rompiste nada, y un ejemplo trabajado.

### III.1 Agregar una categoría documental nueva

**Qué estás agregando.** Una carpeta numerada nueva en la salida, con su archivo de reglas, su subagente y su fase de generación. Es la extensión de mayor impacto después de tocar una invariante.

**Archivos a tocar, en orden:**

1. `SDD/Devs/Rules/Rules-<Nombre>.md` — el archivo nuevo, con la estructura canónica completa de §0 a §9.
2. `SDD/Devs/Rules/Root-Rules.md` — el mapa de documentación del README raíz de la salida y el flujo de lectura por rol.
3. `SDD/Devs/Orchestrator/Master-Prompt.md` — §3.5 layout, §6 plan de generación, §7 ejecución por fases, §14 tabla de adaptabilidad por D8, §15 glosario.
4. Los archivos de reglas de las categorías **vecinas**, para declarar la frontera recíproca.
5. `SDD/Guides/SDD-User-Guide.md` — la descripción de fases, el mapa de carpetas y las FAQ.
6. `README.md` raíz — el mapa de las categorías y la matriz de ruteo.
7. `SDD/Devs/Guides/Marco-Teorico-SDD.md` — solo donde el agregado lo desactualice.

**Invariantes que no se pueden romper.** D3 y D4 en el nombre del archivo y de la carpeta. D6: la categoría declara su upstream y su downstream, y ninguno queda vacío. D8: el gating cubre los ocho tipos, sin dejar ninguno sin decisión.

**Cómo verificar.** Buscá el nombre de la categoría nueva en todo el árbol y confirmá que aparece en los siete lugares del listado. Después verificá algo menos obvio: que el subagente que la genera recibe, en su despacho, todo lo que necesita saber sobre sus vecinas. Lee un solo archivo de reglas.

**Ejemplo trabajado.** La incorporación de la categoría 11 como cuerpo documental de entrega tocó exactamente esos siete lugares. El paso que más fácil se olvida es el cuarto. Sin la frontera declarada desde el lado de la categoría 05, el subagente de arquitectura no sabe que la ubicación de los componentes en el árbol de archivos le corresponde a 11, y la produce igual: la frontera solo frena al agente que la lee.

### III.2 Agregar o modificar un artefacto dentro de una categoría

**Qué estás agregando.** Un documento más en la salida de una categoría existente. Es la extensión más frecuente y la que más veces sale mal por omisión.

**Archivos a tocar, en orden:**

1. §2.1 del archivo de reglas — fila nueva en la tabla maestra, con sus columnas de gating.
2. §2.2 — el comportamiento del artefacto para cada uno de los ocho tipos D8.
3. §3.1 — el patrón de nombre, con su sufijo de versión.
4. §3.3 — su upstream y su downstream.
5. §4.x — la estructura de redacción: qué secciones tiene y en qué orden.
6. §5 — al menos una pregunta guía que ayude al subagente a producirlo bien.
7. §6 — **el criterio de aceptación**. Es el paso que se omite y el que hace que nadie verifique el artefacto.
8. §8 — mencionarlo en el prompt-snippet, para que el subagente sepa que tiene que producirlo.
9. §9 — la fila de control de cambios, con bump **minor**.

**Invariantes.** D3 y D4 en el nombre. D5: si el artefacto reemplaza a otro, el anterior se archiva en `_legacy/`, no se borra. D6: declara upstream y downstream.

**Cómo verificar.** Recorré los nueve puntos y confirmá que el artefacto aparece en todos. Si falta en §6, la extensión está incompleta aunque el documento se genere sin problemas.

**Ejemplo trabajado.** La incorporación del contrato de verificación a la categoría 10 recorrió los nueve pasos, y además tocó `Deriva-Rules.md`, porque el artefacto aportaba sondas a un instrumento gobernado por otra regla. Ese décimo paso —el efecto sobre instrumentos transversales— no siempre aplica, pero conviene preguntárselo antes de cerrar.

### III.3 Agregar una variante de especialidad

**Qué estás agregando.** Un perfil profesional distinto para una categoría existente, típicamente porque un tipo D8 requiere un foco que los perfiles actuales no cubren.

**Archivos a tocar:** §1.2 del archivo de reglas de esa categoría, y §14 del master-prompt si la variante cambia lo que la tabla de adaptabilidad declara para ese tipo.

**Invariantes.** D8: la tabla de §1.2 tiene exactamente ocho filas, una por tipo. Agregar una variante no agrega una fila: reemplaza el contenido de una.

**Cómo verificar.** Contá las filas de §1.2. Si no son ocho, algo se rompió.

**Ejemplo trabajado.** La categoría 11 pasó de tener cuatro variantes con `Technical Writer (opcional)` repetido a tener ocho variantes distintas, una por tipo, cuando el cuerpo mantenedor se volvió obligatorio para todos. El cambio no agregó filas: cambió el contenido de las que ya estaban. Un `(opcional)` repetido en cuatro filas suele ser señal de que la categoría no fue pensada para esos tipos, no de que ahí no haga falta nada.

### III.4 Agregar una fase al orquestador

**Qué estás agregando.** Un corte nuevo en la secuencia de generación, con su audit y su detención.

**Archivos a tocar, en orden:**

1. `Master-Prompt.md` §6 — la fila o filas de la fase en el plan de generación.
2. `Master-Prompt.md` §7 — la fase en la secuencia de ejecución, con sus pasos numerados.
3. `Master-Prompt.md` §10 — los criterios de audit propios de la fase y sus hallazgos P0.
4. `Master-Prompt.md` §15 — el término en el glosario.
5. `SDD/Guides/SDD-User-Guide.md` — la fase en la descripción del flujo, y las FAQ que correspondan.

**Invariantes.** La letra de las fases es secuencial y no se recicla. Toda fase cierra con audit y con detención antes de la siguiente. Si la fase requiere confirmación humana, se declara explícitamente como gate.

**Tres preguntas que hay que responder antes de agregarla:** ¿corre una vez, una vez por proyecto de código, o una vez por incremento? ¿Qué precondición tiene que cumplirse para que pueda ejecutarse? ¿Qué se regenera y qué se preserva si vuelve a correr?

**Ejemplo trabajado.** Las Fases I y J son el caso más completo, porque son las primeras que operan sobre un repositorio con código. La Fase I obligó a declarar tres cosas que ninguna fase anterior necesitaba: una precondición dura —sin código, sin sample implementado y sin tests que corran, la fase no se ejecuta—, un criterio de re-ejecución que declara qué se preserva entre corridas, incluidas las correcciones manuales del usuario, y un path de informe de audit que distinga cada incremento.

### III.5 Modificar el gating por tipo D8

**Qué estás cambiando.** Si una categoría o un artefacto se genera o no para un tipo determinado.

**Archivos a tocar:** §0 y §2.2 del archivo de reglas si cambia el gating de la categoría; §2.1 si cambia el de un artefacto; §14 del master-prompt si la tabla de adaptabilidad lo refleja.

**Invariantes.** D8: los ocho tipos siguen teniendo una decisión declarada. Un tipo sin fila no es «opcional»: es un hueco.

**Qué se rompe si el gating es incorrecto.** Dos fallas simétricas y de distinto costo. Si el gating es **demasiado laxo**, se generan artefactos que nadie va a leer, y el volumen ahoga a lo que sí importa. Si es **demasiado estricto**, un proyecto de código queda sin un documento que necesita, y eso se descubre meses después, cuando alguien lo busca y no está. La segunda falla es más cara y menos visible.

**Bump de versión.** Es **major**. La documentación generada con el gating anterior deja de cumplir la regla nueva.

**Ejemplo trabajado.** El cuerpo mantenedor de la categoría 11 pasó de opcional a obligatorio para los ocho tipos. El fundamento: todo proyecto de código va a ser retomado por alguien, incluso los que no tienen integrador externo, y ese alguien puede no haber participado de ninguna fase de la especificación. Es el caso típico de gating demasiado estricto que se descubre tarde.

### III.6 Agregar un modelo UX-UI al catálogo

**Qué estás agregando.** Un diseño capturado de una maqueta aprobada, disponible como punto de partida para proyectos de código futuros.

**Archivos a tocar:** un archivo nuevo bajo `SDD/Devs/Modelos-UX-UI/` siguiendo `Rules-Design-Modelo-Template.md`, su fila en `Index-Modelos-UX-UI.md`, y el template ejecutable ofuscado bajo `Templates/`.

**Invariantes.** **D7 es crítica acá y es bloqueante.** El modelo se captura de la maqueta de un cliente real, así que la ofuscación no es una recomendación: es condición de aceptación. Ningún literal del dominio del proyecto de código origen puede sobrevivir en el modelo ni en el template.

**Cómo verificar.** Buscá en el modelo y en el template los términos del dominio del proyecto de código origen. El resultado esperado es cero, sin matices.

**La vía normal no es manual.** El paso 7 de la Fase B2 ofrece capturar el modelo automáticamente, con aceptación explícita del humano y verificación de ofuscación bloqueante. Agregarlo a mano es la excepción, y pierde esa verificación.

### III.7 Modificar una invariante global

**Qué estás cambiando.** Una de las reglas D1 a D9 que gobiernan todo el framework.

**Es el cambio de mayor impacto que existe**, y conviene entender por qué antes de intentarlo. Una invariante no vive en un archivo: vive en los diecisiete archivos de reglas que la citan, en el master-prompt que la inyecta a cada subagente, en los criterios de todos los auditores, y en **toda la documentación ya emitida en todos los repositorios destino**. Cambiar D3, por ejemplo, invalida el nombre de cada archivo que el framework generó alguna vez.

**Archivos a tocar:** todos los que la citen, sin excepción, más el marco teórico donde la fundamenta.

**Procedimiento obligatorio:**

1. Decisión explícita del responsable del framework, registrada por escrito.
2. Barrido completo del árbol buscando toda mención de la invariante.
3. Declaración de si el cambio rige **hacia adelante** o **retroactivamente**.
4. Nota de coherencia con verificación de las nueve invariantes en cada archivo tocado.
5. Entrada en el `CHANGELOG.md` que declare el impacto sobre la documentación ya emitida.

**El precedente a seguir es D9.** Se incorporó después de las ocho originales y se declaró explícitamente que rige hacia adelante y no se aplica retroactivamente, porque reauditar toda la documentación previa contra una regla nueva produce un volumen de hallazgos que ahoga a los reales. Es el criterio por defecto para cualquier invariante nueva.

### III.8 Agregar una regla transversal nueva

**Qué estás agregando.** Un archivo de reglas que no gobierna una categoría documental sino una **capacidad del framework**, como `Maqueta-Rules.md` gobierna la validación visual o `Deriva-Rules.md` el sensado de deriva.

Es el eje que menos se recorre y el que más fácil se confunde con agregar una categoría. La distinción: una categoría produce una carpeta numerada en la salida y tiene un subagente titular; una regla transversal define un mecanismo que **atraviesa** varias categorías y suele delegarse desde el master-prompt.

**Archivos a tocar, en orden:**

1. `SDD/Devs/Rules/<Nombre>-Rules.md` — el archivo nuevo. **No sigue la estructura canónica de nueve secciones de las categorías**: la organiza según el mecanismo, aunque conviene conservar §0 el problema que resuelve, §6 criterios de aceptación, §8 prompt-snippet y §9 control de cambios, que es lo que el orquestador y el auditor consumen.
2. `Master-Prompt.md` — el cableado: en qué fase se invoca el mecanismo, qué flag lo habilita si hay uno, qué criterios de audit aporta y qué término suma al glosario.
3. Los archivos de reglas de las categorías **que el mecanismo atraviesa**, para declarar qué les toca. Es el paso crítico: cada subagente lee un solo archivo de reglas, así que un mecanismo transversal que no se declara en las categorías afectadas no se ejecuta.
4. `SDD/Guides/SDD-User-Guide.md` — si el usuario percibe el mecanismo.

**Invariantes.** El nombre sigue el patrón `<Capacidad>-Rules.md` y no `Rules-<Capacidad>.md`, que está reservado para las categorías. Si el mecanismo introduce una invariante global, se aplica §III.7 y no este eje.

**Cómo verificar.** Confirmá que el mecanismo aparece declarado en cada categoría que atraviesa, no solo en su propio archivo. Es el mismo error que el anti-patrón de la frontera de un solo lado.

**Segundo ejemplo trabajado, y el que muestra el paso que falta.** `Vocabulario-Rules.md` se incorporó en la 5.0 declarando como lector «todo subagente AG-XX», y las diecisiete reglas la citaron desde su cabecera. El paso 2 quedó incompleto: no se sumó a los insumos del despacho de `Master-Prompt.md` §8, así que ningún subagente la recibía y la cita de su cabecera no resolvía. Se corrigió en la 5.1. La lección: para una regla transversal, declarar el lector no es cablearlo; el cableado es la línea del esqueleto de despacho.

**Ejemplo trabajado.** `Deriva-Rules.md` atraviesa 03 (emite la línea de base), 08 (es dueña operativa de la matriz) y 10 (aporta las sondas de contrato). Cuando el sensado se extendió a contratos y comportamiento, el archivo transversal se actualizó y la categoría 08 quedó contradiciéndolo, porque su regla seguía condicionando la matriz a la Fase B2. El defecto no estaba en el mecanismo: estaba en no haber propagado el cambio a la categoría que lo opera.

### III.9 Agregar un flag de gating

**Qué estás agregando.** Una condición booleana derivada del intake que habilita o refuerza artefactos, o que dispara una fase.

**Archivos a tocar, en orden:**

1. `PRODUCT-INTAKE-template.md` — la sección o pregunta de la cual el flag se deriva. Si el flag no tiene de dónde derivarse, no es un flag: es una pregunta más que le hacés al usuario en cada corrida.
2. `Master-Prompt.md` §4 — la fila del flag con su ámbito (producto o proyecto de código), su fuente, su **regla de derivación** y qué habilita.
3. `Master-Prompt.md` §6 — la columna de gating de las filas que el flag afecta.
4. Los archivos de reglas de las categorías afectadas — §0 y §2.2, para que el subagente sepa qué cambia cuando el flag está activo.
5. `Master-Prompt.md` §15 y `SDD-User-Guide.md` — glosario y explicación al usuario.

**Invariantes.** El flag **se deriva y se confirma**, nunca se fija en silencio. El patrón obligatorio: el orquestador propone un valor a partir de la regla de derivación, lo presenta, y el humano lo confirma o lo invierte. Un flag que el orquestador decide sin preguntar convierte una decisión de producto en un efecto secundario de una regla.

**Cómo verificar.** Respondé tres preguntas: ¿de qué dato del intake se deriva? ¿qué pasa si el humano lo invierte? ¿qué se registra si queda en `false` y el gating declaraba algo obligatorio? Si la tercera no tiene respuesta, falta la ADR de omisión.

**Ejemplo trabajado.** `requiere_maqueta` es el caso más completo, porque combina tres entradas —`tiene_ui_final`, `tipo_proyecto_codigo` y `tiene_portal_developers`— para proponer un valor, admite que el humano lo invierta, y su `false` en un proyecto de código con interfaz visual exige ADR de omisión registrada en 05. Además dispara una fase entera, no solo artefactos.

### III.10 Por qué el conjunto D8 es cerrado

El conjunto de ocho tipos de proyecto de código es cerrado por diseño, y esta guía no habilita ampliarlo. Conviene entender el fundamento, porque la tentación de agregar un noveno tipo aparece seguido.

**El fundamento.** El `tipo_proyecto_codigo` no es una etiqueta descriptiva: es el discriminador del que cuelga todo el comportamiento variable del framework. Cada uno de los doce archivos de reglas tiene al menos dos tablas indexadas por tipo —la de variantes de especialidad en §1.2 y la de gating en §2.2— y varios tienen más. El master-prompt tiene su propia tabla de adaptabilidad. Un tipo nuevo no agrega una fila: agrega **una fila en cada una de esas tablas**, y cada una exige una decisión de diseño real, no un valor por defecto copiado del vecino.

**Qué habría que rehacer si alguna vez se ampliara.** Las doce tablas de §1.2, las doce de §2.2, las tablas de §2.1 con gating por artefacto, la tabla de adaptabilidad del master-prompt, la matriz de estructura de `/samples` de la categoría 10, el gating por cuerpo de la categoría 11, y las reglas de derivación de los flags que dependen del tipo. Son más de treinta tablas, y una fila mal puesta en cualquiera produce documentación incorrecta en silencio.

**Por qué ocho y no otro número.** Los ocho tipos cubren el espacio de formas de entrega de software: biblioteca redistribuible, aplicación web monolítica, aplicación web distribuida, aplicación de escritorio, aplicación móvil, servicio HTTP, herramienta de línea de comandos y servicio de procesamiento en segundo plano. Un caso que no encaja en ninguno suele ser una **combinación** de dos, y el modelo de producto con N proyectos de código existe precisamente para eso: se modela como dos proyectos de código tipados con una dependencia entre ellos, no como un tipo nuevo.

---

## Parte IV — Criterios y preguntas guía

El objetivo de esta parte es que formes criterio, no que sigas una receta. Antes de tocar nada, tenés que poder responder estas preguntas.

**Antes de agregar cualquier cosa:**

- ¿Esto es una categoría nueva o un artefacto dentro de una existente? Si el material tiene un lector distinto, una cadencia distinta y un subagente distinto, es categoría. Si comparte los tres, es artefacto.
- ¿Corresponde al framework o al proyecto de código que lo usa? Si solo aplica a un dominio, un stack o un cliente, no va acá. El framework es agnóstico por D7.
- ¿Qué rol de intervención lo lee? Si la respuesta es «cualquiera», probablemente todavía no lo pensaste.
- ¿Qué categoría vecina se solapa, y dónde está exactamente la frontera? Si no podés enunciar la frontera en una oración, no está clara.
- ¿De qué recibe upstream y a qué alimenta downstream? Un artefacto sin ninguno de los dos es invisible para el auditor.

**Sobre el gating:**

- ¿Qué comportamiento tiene para cada uno de los ocho tipos? Ocho respuestas, no una regla general con excepciones vagas.
- ¿Qué se rompe si el gating es demasiado laxo? ¿Y si es demasiado estricto? Los dos costos son reales y asimétricos.
- ¿Depende de algún flag además del tipo? ¿Ese flag existe o hay que crearlo?

**Sobre la verificación:**

- ¿Cómo va a verificar el auditor que esto se generó bien? Si no podés escribir el criterio de §6, el artefacto no está listo para agregarse.
- ¿El criterio es evaluable, o requiere que alguien interprete? «El documento es claro» no es un criterio.
- ¿La verificación que estás exigiendo es posible en la fase donde la ubicaste? Es el error que se detalla en la Parte V.

**Sobre el impacto:**

- ¿Cuántos archivos toca este cambio? Si son más de tres o cuatro, conviene segmentar en etapas con nota de coherencia entre cada una.
- ¿Invalida documentación ya emitida en repositorios destino? Si la respuesta es sí, es bump major y hay que declarar el impacto.
- ¿Qué le pasa a un producto de un solo proyecto de código? El caso degenerado con layout aplanado se rompe con facilidad y es el que menos se prueba.

---

## Parte V — Anti-patrones de extensión

| Anti-patrón | Síntoma | Consecuencia | Corrección |
| --- | --- | --- | --- |
| **Duplicar contenido entre categorías en lugar de declarar la frontera** | El mismo tema aparece en dos archivos de reglas con redacción parecida | Divergen en el segundo cambio; el subagente no sabe cuál rige | Declarar la frontera en §0 de ambos archivos: qué documenta cada uno y qué no |
| **Declarar la frontera de un solo lado** | Solo la categoría nueva sabe qué no le corresponde | El subagente de la categoría vieja lee un solo archivo de reglas y produce el material igual | Frontera recíproca: las dos categorías la declaran |
| **Hardcodear un stack comercial en un nombre de archivo** | Aparece el nombre de un producto en un patrón de nomenclatura | El framework queda atado a ese stack; los proyectos de código con otro objetivo no pueden usar la regla | Parametrizar con slug genérico, como `guia-integracion-<sistema-objetivo>` |
| **Agregar un artefacto sin declarar su gating por D8** | La tabla de §2.1 tiene una fila con columnas de gating vacías | El orquestador no sabe si generarlo; el resultado varía entre corridas | Ocho decisiones explícitas, una por tipo |
| **Agregar un artefacto sin criterio en §6** | El artefacto se genera pero ningún audit lo menciona | Sale vacío o mal formado y nadie lo nota. Es el error más silencioso | Criterio de aceptación evaluable por cada artefacto nuevo |
| **Romper la estructura canónica de nueve secciones** | Un archivo de reglas tiene §0 a §7, o mete contenido en una sección que no le corresponde | Quien busca los criterios donde siempre están no los encuentra | Respetar §0 a §9; si el contenido no encaja, va como subsección |
| **Referenciar una sección por número en lugar de por título** | Una regla dice «los anti-patrones de §4.5» | La numeración de subsecciones varía por archivo; la referencia queda rota en la mitad de los casos | Ubicar por título |
| **Introducir una referencia a un repositorio externo** | Aparece una ruta que sale del árbol de este repositorio | Se pierde la autosuficiencia: el repositorio deja de poder clonarse solo | Rutas relativas internas; los estándares se nombran, no se enlazan |
| **Exigir en una fase pre-código una verificación que requiere código** | Un criterio de aceptación pide validar snippets en CI, en una fase donde no hay ni CI ni código | El criterio es incumplible por construcción y se ignora, lo que erosiona la credibilidad de todos los demás | Separar en dos pasadas: declarar el criterio antes, verificarlo después |
| **Corregir el material histórico congelado** | `Bootstrap/` se actualiza para coincidir con el estado actual | El registro deja de reflejar lo que realmente se auditó, y las reglas que lo citan pierden su fundamento | Congelar y declarar la omisión en la nota de coherencia. Si el material ya no lo cita nadie y su contenido está absorbido, eliminarlo y registrarlo en el `CHANGELOG.md` |
| **Modificar la salida sin actualizar la guía de usuario** | El framework genera algo que la guía no menciona | El usuario no sabe qué le va a llegar ni por qué | Toda extensión visible al usuario toca `SDD-User-Guide.md` en la misma intervención |

El anti-patrón de la verificación imposible merece una nota, porque motivó la intervención más grande que el framework tuvo. La categoría de documentación se generaba antes del handoff, pero sus criterios de aceptación exigían validar snippets contra código, medir tiempos de onboarding con un developer real y verificar que los códigos de error documentados coincidieran con los que el sistema emite. Nada de eso existe antes de codificar. El archivo estaba redactado con la voz de una categoría post-implementación y ubicado en una fase pre-implementación. La corrección fue estructural: partir la generación en pasadas, declarar el criterio cuando todavía se puede discutir y verificarlo cuando hay contra qué.

---

## Parte VI — Procedimiento de cambio

### VI.1 Cómo se versiona un archivo de reglas

| Tipo de cambio | Bump | Ejemplos |
| --- | --- | --- |
| Corrección de redacción sin cambio semántico | Ninguno | Erratas, aclaraciones, reordenamiento de párrafos |
| Incorporación que no invalida lo vigente | **Minor** | Un artefacto más, un anti-patrón, un criterio de aceptación, una pregunta guía |
| Cambio que invalida documentación ya generada | **Major** | Cambio de gating, artefacto obligatorio nuevo, renombre de carpeta target, reasignación de subagente, cambio de estructura obligatoria |

La pregunta que resuelve las dudas: **¿un documento generado con la versión anterior sigue cumpliendo la nueva?** Si no, es major.

### VI.2 Qué se registra en el control de cambios

Cada archivo modificado incorpora su fila en §9, con versión, fecha, descripción y autor. La descripción dice **qué cambió y por qué**, en términos del framework. No dice quién lo pidió ni desde dónde: un archivo de reglas no referencia el prompt que lo modificó, porque eso rompería la autosuficiencia del repositorio.

Autor válido: el rol del subagente titular de la categoría, o el nombre de la intervención.

Las filas ya escritas **no se reescriben**, aunque un cambio posterior invalide lo que describen. Son registro histórico, y corregirlas hace que el changelog mienta. Si una intervención renombra una carpeta, las filas viejas siguen nombrando la carpeta vieja, y la fila nueva declara el renombre.

### VI.3 Cómo se verifica la coherencia después de un cambio

Toda intervención que toque más de un archivo emite una nota de coherencia siguiendo el patrón de [`../Devs/Guides/Coherencia-Auditoria-Marco.md`](../Devs/Guides/Coherencia-Auditoria-Marco.md), que define la forma: alcance, inventario de archivos tocados, verificación de invariantes, verificación de trazabilidad, observaciones y veredicto.

Lista de comprobación mínima:

| # | Comprobación | Resultado esperado |
| --- | --- | --- |
| 1 | Invariantes D1–D9 intactas en todo archivo tocado | Sin violaciones |
| 2 | Autosuficiencia: cero referencias fuera del árbol de este repositorio | Cero ocurrencias |
| 3 | Referencias internas: todo archivo, carpeta y sección citada existe | Cero enlaces rotos |
| 4 | Sin contradicción entre lo escrito y lo que ya estaba | Sin contradicciones, o reportadas |
| 5 | Control de cambios actualizado en cada archivo modificado | Una fila por archivo |
| 6 | El caso degenerado sigue produciendo el layout aplanado | Verificado |
| 7 | Nada fuera del alcance declarado fue modificado | Sin cambios colaterales |

El veredicto es `CONFORME` o `NO CONFORME`. Con `NO CONFORME` no se avanza: se corrige y se reemite.

**Intervenciones grandes: segmentar.** Una intervención que toca más de tres o cuatro archivos conviene partirla en etapas, cada una con nota de coherencia propia y confirmación humana entre medio. Cada etapa debe cumplir tres condiciones: dejar el framework en estado consistente y utilizable aunque la intervención se abandone ahí, ser verificable por sí sola sin depender de una etapa posterior, y no definir dos veces el mismo artefacto. Es el mismo patrón de auditoría entre fases que el framework aplica en sus propias corridas, aplicado a su propio desarrollo.

Una regla que vale la pena adoptar: **un descubrimiento no habilita un cambio**. Si durante una etapa aparece algo que exigiría modificar el resultado de una etapa ya cerrada, no se modifica en silencio. Se registra como observación, se reporta y se espera decisión.

### VI.4 Qué hacer cuando un cambio obliga a regenerar documentación ya emitida

Es la parte más incómoda del procedimiento y la que más se posterga. Un bump major de un archivo de reglas significa que la documentación generada con la versión anterior ya no cumple.

Opciones, en orden de preferencia:

1. **Regeneración parcial.** El orquestador vuelve a correr solo la categoría afectada del proyecto de código afectado, y el sensado de deriva devuelve a `Sin verificar` las filas que dependen de lo regenerado. Es la vía normal.
2. **Regeneración con preservación de correcciones manuales.** Si el usuario editó a mano los documentos, se aplica el patrón de re-ejecución: el orquestador relee, enumera las diferencias, informa cómo las interpretó y espera confirmación antes de propagar.
3. **Congelar la versión anterior.** Si regenerar no es viable, la documentación existente se marca con la versión de reglas contra la cual se generó, y el cambio se aplica solo a productos nuevos.

Lo que **no** es una opción es dejar documentación emitida contra una versión de reglas que ya no existe, sin declararlo. Un lector que sigue una regla derogada no tiene forma de saber que la está siguiendo.

**Registro obligatorio.** Todo bump major se anota en el `CHANGELOG.md` de la raíz declarando explícitamente el impacto sobre la documentación ya emitida, aunque la decisión sea no regenerar nada.

La opción 3 depende de dos cosas que el framework provee desde la versión 4.0: que el destino declare contra qué versión se generó, en el bloque de procedencia de su `PRODUCT-MANIFEST`, y que esa versión siga siendo reconstruible, en `_legacy/`. Sin las dos, «congelar la versión anterior» es una intención sin instrumento.

### VI.5 Cómo se versiona el framework como conjunto

Los archivos se versionan uno por uno según VI.1. El framework además se versiona **como conjunto**, y esa es la versión que un destino cita para declarar bajo qué normativa se generó.

**Dónde vive.** En el `CHANGELOG.md` de la raíz. Una entrada equivale a una versión publicada. No hace falta ningún otro registro: el log del control de versiones registra commits, que es otra cosa y no se mezcla con esto.

**Cómo se deriva.** De la mayor severidad de sus partes:

| La versión del conjunto sube… | Cuando… |
| --- | --- |
| **major** | alguna regla sube major, o se modifica una invariante D1-D9 |
| **minor** | alguna regla sube minor y ninguna sube major |
| **patch** | no cambia ninguna regla ni el comportamiento del orquestador |

**Qué obliga.** Publicar una versión nueva incluye, en la misma intervención, copiar el conjunto normativo que queda superado a `_legacy/<version>/`. Se copia el conjunto entero y no solo los archivos que cambiaron, porque las reglas son interdependientes: un `Rules-Contexto` de una versión junto a un `Master-Prompt` de otra puede producir una combinación que nunca existió y nunca se auditó. Lo que hay que poder reconstruir es el estado coherente.

Quedan fuera del snapshot el propio `CHANGELOG.md`, que es acumulativo y cuya historia es su contenido, la carpeta `_legacy/` misma, y los archivos de configuración del repositorio, que no condicionan lo que el orquestador genera.

**Intocabilidad.** Una subcarpeta de versión, una vez creada, no se modifica nunca. Es la misma razón por la que las filas de control de cambios no se reescriben: un registro que se corrige después deja de ser un registro.

---

## Control de cambios

| Versión | Fecha | Cambios | Autor |
| --- | --- | --- | --- |
| 1.0 | 2026-07-26 | Versión inicial de la guía de desarrollo del framework. Parte I anatomía, con mapa de dependencias en Mermaid, despiece por carpeta y matriz de quién lee y escribe cada pieza. Parte II con los seis contratos internos: estructura canónica de nueve secciones, decisión de generación, gating de doble granularidad, encadenamiento de la trazabilidad, expectativas del auditor y derivación de flags. Parte III con siete ejes de extensión, cada uno con archivos a tocar, invariantes, verificación y ejemplo trabajado, más el fundamento del conjunto cerrado D8. Parte IV con las preguntas guía agrupadas por decisión. Parte V con once anti-patrones de extensión. Parte VI con versionado, control de cambios, verificación de coherencia, segmentación de intervenciones grandes y tratamiento de la documentación ya emitida. | Reformulación SDD |
| 1.1 | 2026-07-26 | Dos ejes de extensión nuevos en la Parte III: §III.8 agregar una regla transversal, con la distinción respecto de agregar una categoría y el ejemplo del sensado de deriva atravesando tres categorías; y §III.9 agregar un flag de gating, con el patrón obligatorio de derivar, presentar y confirmar, y el ejemplo de `requiere_maqueta`. El fundamento del conjunto cerrado D8 se renumera a §III.10. | Reformulación SDD |
| 1.2 | 2026-07-28 | Normalización del versionado (framework 4.0). §I.2 suma la carpeta `_legacy/` a la anatomía. §VI.4 declara que la opción de congelar la versión anterior depende del bloque de procedencia del destino y de que la versión siga siendo reconstruible. **§VI.5 es nueva**: versionado del framework como conjunto, con el `CHANGELOG.md` como registro único, la derivación de la severidad a partir de sus partes, la obligación de copiar el conjunto normativo superado a `_legacy/<version>/` y la regla de intocabilidad de lo archivado. | Revisión SDD |
| 1.3 | 2026-07-29 | Vocabulario normativo (framework 5.0). La guía adopta «producto» y «proyecto de código» en las seis partes. Fila registrada retroactivamente en la 5.1: la migración subió la versión de cabecera a 1.3 sin dejar su fila, y §I.2, §II.1 y §III.7 quedaron declarando dieciséis archivos de reglas y cuatro transversales cuando la propia intervención agregó el decimoséptimo. | Reformulación SDD |
| 1.4 | 2026-07-29 | Puesta al día contra el conjunto 5.1 y el decimoséptimo archivo de reglas. **Corregidos tres conteos** que contradecían al `README.md` raíz: §I.2 decía «los dieciséis archivos normativos … más `Root-Rules`, `Intake-Rules`, `Maqueta-Rules` y `Deriva-Rules`», §II.1 «las cuatro reglas transversales» y §III.7 que una invariante «vive en los dieciséis archivos de reglas»; pasan a diecisiete y cinco. **§I.1** suma el nodo `Vocabulario-Rules` al mapa de dependencias, con sus dos aristas: la del master-prompt, que la inyecta, y la de las reglas de categoría, que la citan. **§I.3** la incorpora a la tabla de quién lee cada pieza, declarándola como la única regla transversal que llega a todo subagente, y corrige la nota que decía que el subagente «recibe un solo archivo de reglas». **§III.8** suma un segundo ejemplo trabajado, el de `Vocabulario-Rules` en la 5.0, cuyo paso 2 quedó incompleto —lector declarado sin cablear en el esqueleto de despacho— con la lección explícita de que declarar el lector no es cablearlo. Se restituye el salto de línea final del archivo, que faltaba, y se unifica la versión, que el front-matter declaraba como 1.2 mientras la cabecera declaraba 1.3: el mismo defecto de doble declaración que traía `SDD-Getting-Started-Guide.md`. | Revisión SDD |
