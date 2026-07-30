# Templates — Ejemplos ejecutables de los modelos UX-UI

**Documento:** Templates/README.md
**Versión:** 1.1
**Estado:** Vigente
**Fecha:** 2026-07-19
**Autor:** AG-ROOT (Arquitecto de Soluciones)

---

## 1. Qué es esta carpeta

Cada subcarpeta de `Templates/` es un ejemplo ejecutable de un modelo UX-UI del catálogo `SDD/Devs/Modelos-UX-UI/`. Es al documento de reglas del modelo lo que un sample de la categoría 11 es a la referencia de API: el documento dice qué reglas rigen, el template muestra cómo se ven aplicadas.

Existe porque las formas constructivas del HTML, del CSS y del JavaScript se transmiten mal en prosa. Un agente que tiene que producir una maqueta con un modelo determinado aprende más abriendo su template que leyendo la descripción de su grilla.

Se pobla en el paso 7 de la Fase B2 de validación visual de maqueta (`SDD/Devs/Rules/Maqueta-Rules.md` §3.7 y §6), cuando el humano acepta capitalizar el diseño de una maqueta aprobada.

---

## 2. Contenido

| Template | Modelo UX-UI asociado | Qué demuestra |
| --- | --- | --- |
| `Modelo-Generico/` | — (ninguno; es el ejemplo de referencia de la estructura) | La estructura obligatoria de un template, los tokens del catálogo base materializados como variables CSS, los cuatro estados por superficie, la fuente única de datos y la configuración dirigida por esquema |

`Modelo-Generico/` no corresponde a ningún modelo capturado: es el ejemplo de referencia que fija la estructura y el nivel de detalle esperados. Un template nuevo se deriva de él.

---

## 3. Estructura obligatoria de un template

```text
Templates/<Nombre-Modelo>/
├── README.md                    qué patrones demuestra, cómo se relanza, qué reemplazar al derivarlo
├── index.html                   punto de entrada, con la navegación a todas las superficies
├── <Superficie>.html            una superficie por archivo, Título-Con-Guiones
└── assets/
    ├── css/
    │   └── <archivos css>       tokens del catálogo como variables CSS; sin literales visuales sueltos
    ├── js/
    │   ├── Datos-Maqueta.js     fuente única de los datos de ejemplo y del contrato de campos
    │   └── Maqueta.js           render, navegación y conmutación de estados
    └── img/                     imágenes; los íconos van SVG inline, no acá
```

`index.html` es la única excepción en minúscula: es la convención universal del punto de entrada de un sitio estático.

---

## 4. Reglas constructivas

Las mismas que rigen a la maqueta de la que sale el template (`SDD/Devs/Rules/Maqueta-Rules.md` §4), más las de ofuscación (§6):

- HTML5 semántico, CSS con tokens del catálogo `SDD/Devs/References/Design/`, JavaScript vanilla, Bootstrap 5.0 por CDN.
- Sin proceso de build, sin gestor de paquetes, sin `node_modules`: lo que se edita es lo que se sirve. La justificación completa está en `Maqueta-Rules.md` §7.
- Datos de ejemplo exclusivamente en `Datos-Maqueta.js`. Ningún HTML los hardcodea.
- Toda superficie demuestra al menos los estados vacío, cargando, con datos y error, conmutables desde la barra de validación.
- Íconos SVG inline con `currentColor`. Prohibido el raster para iconografía.
- WCAG 2.2 nivel AA como piso verificable.

---

## 5. Ofuscación, condición bloqueante

`IA.SDD` es un repositorio público. Un template se deriva de una maqueta de un proyecto de código real, así que la ofuscación es previa y bloqueante:

1. El dominio se reemplaza íntegro por un dominio sintético neutro. No se renombra: se reemplaza.
2. Se preserva la forma (estructura del HTML, nombres de clase, organización del CSS, estrategia de render, cantidad y tipo de campos) y se descarta el significado del dominio original.
3. Los textos de interfaz se reescriben en términos genéricos, conservando el tono y la longitud aproximada.
4. Se eliminan todos los assets que provengan del proyecto de código y se reemplazan por SVG neutros.
5. La verificación contra la lista de prohibiciones de `Maqueta-Rules.md` §5 se declara explícitamente antes de escribir. Si no puede completarse con certeza, el template no se genera.

Prohibido en cualquier template: nombres de clientes, personas, dominios, sistemas internos o proyectos de código destino; datos reales aunque sean de ejemplo; capturas o assets del proyecto de código de origen.

---

## 6. Cómo se abre un template

Método recomendado: abrir `Templates/<Nombre-Modelo>/index.html` con la extensión de servidor local del editor (en Visual Studio Code, Live Server o equivalente), que sirve la carpeta y recarga sola en cada guardado.

Alternativa por línea de comandos:

```bash
cd Templates/<Nombre-Modelo>
python3 -m http.server 8080
```

y abrir `http://localhost:8080`.

Para una mirada rápida también alcanza con abrir `index.html` directo en el navegador, teniendo en cuenta que algunos navegadores restringen ciertas operaciones sobre `file://`.

---

## 7. Control de cambios

| Versión | Fecha | Cambios | Autor |
| --- | --- | --- | --- |
| 1.0 | 2026-07-19 | Índice inicial de la carpeta de templates, creada junto con la Fase B2 de validación visual de maqueta. Define el propósito de los templates y su relación con el catálogo `Modelos-UX-UI/`, la estructura obligatoria de un template, sus reglas constructivas, la ofuscación bloqueante por tratarse de un repositorio público y el método de apertura. Registra `Modelo-Generico/` como ejemplo de referencia de la estructura. | AG-ROOT |
| 1.1 | 2026-07-29 | Vocabulario normativo (framework 5.0), registrado en la 5.1. El índice adopta «proyecto de código» y «producto» según `Vocabulario-Rules.md` §2, y su cabecera pasa de `**Proyecto:** Template SDD` a `**Framework:** SDD`. La fila se registra en la 5.1 porque la migración modificó el archivo sin dejar registro, contra `SDD-Development-Guide.md` §VI.1. | AG-ROOT |
