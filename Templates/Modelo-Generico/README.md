# Maqueta Modelo-Generico

Template de maqueta estática para validar visualmente un modelo de datos antes de construir el producto. Es HTML + CSS + JavaScript vanilla con Bootstrap 5.0 por CDN: se abre en un navegador y se edita a mano.

No es un producto ni el punto de partida de uno. Es un instrumento de validación: se le muestra a una persona, esa persona confirma o corrige el modelo, y recién después se escribe código real.

---

## Qué patrones demuestra

La maqueta materializa las reglas de `SDD/Devs/References/Design/Design-Rules-Web-Generico.md` y su extensión `Design-Rules-Config-Esquema.md`.

**Del catálogo base:**

- Tokens semánticos como variables CSS con los mismos nombres del catálogo (`--color-background-primary`, `--color-text-primary`, `--color-brand-primary`, la escala tipográfica, la escala de espaciado base 4 y los radios). Cero literales sueltos en las superficies.
- Shell con barra superior, ítem activo marcado con `aria-current="page"` y lienzo sobre `--color-background-tertiary`.
- ABM — grilla de listado: encabezados en `type.meta`, avatar de iniciales, badge de estado con texto explícito, icon-buttons con `aria-label`, barra de búsqueda y filtros.
- Los cuatro estados obligatorios de superficie: vacío, cargando (skeleton), con datos y error, en las tres páginas.
- Iconografía SVG inline con `currentColor`, familia única, trazo coherente. Sin raster, sin packs de íconos por CDN, sin emojis como íconos.
- Accesibilidad WCAG 2.2 AA como piso: landmarks (`header`, `nav`, `main`, `footer`), `<h1>` por vista, foco visible de 2px, `<label>` asociados, `aria-live` para los cambios de estado, objetivos de toque de 24px o más, y `prefers-reduced-motion` respetado.
- Sello de versión visible en el pie.

**De la extensión de configuración dirigida por esquema:**

- Campo dirigido por descriptor: la etiqueta, la leyenda, el valor por defecto y los límites salen del descriptor, nunca del HTML.
- Tarjeta de ayuda contextual en estado `info`, abierta por disclosure con `aria-expanded` y asociada al campo por `aria-describedby`.
- Divulgación progresiva: los parámetros avanzados viven en un expander colapsado.
- Explicación "en palabras" generada por plantilla a partir de descriptores más valores.
- Frontera `PropuestaDeConfiguracion`: el botón "Previsualizar" arma la propuesta y muestra qué cambia y a qué afecta; "Confirmar y aplicar" queda deshabilitado hasta que hubo previsualización. La interfaz propone, la persona confirma.
- Indicador de modo simulación y ranura del asistente de IA reservada y deshabilitada (forward-compat).
- Frontera entre configuración de aplicación y de entorno: los parámetros que la superficie no gobierna se informan, no se dibujan como controles.

---

## Cómo se relanza

No hay `node_modules` ni paso de compilación. Es deliberado: cualquier persona tiene que poder abrir un archivo, cambiar un texto y ver el resultado recargando el navegador.

**Opción 1 — servidor del editor (recomendada).** Abrir `index.html` con la extensión de servidor local del editor (en Visual Studio Code, Live Server o equivalente). Sirve la carpeta y recarga el navegador sola en cada guardado, así que es la mejor para editar y validar en un mismo ciclo.

**Opción 2 — servidor de línea de comandos.** Desde esta carpeta:

```
python3 -m http.server 8080
```

Y abrir `http://localhost:8080/` en el navegador. No recarga solo.

**Opción 3 — abrir el archivo directo.** Doble clic en `index.html`. Funciona todo salvo el paso de parámetro por URL entre listado y detalle en algunos navegadores con restricciones de `file://`. Con esta opción la recarga automática queda deshabilitada, porque las consultas de archivo no funcionan sobre `file://`.

Con las opciones 2 y 3, que no recargan solas, la barra de validación ofrece un interruptor **Recarga automática** (apagado por defecto): consulta los recursos de la maqueta cada pocos segundos y refresca la página cuando alguno cambia. Su estado se recuerda entre superficies y se suspende cuando la pestaña no está visible.

Bootstrap se toma del CDN, así que hace falta conexión a internet para ver los estilos base. El CSS propio se carga después de Bootstrap y sobreescribe lo que corresponda con los tokens del catálogo.

---

## Estructura

```
Modelo-Generico/
├── README.md
├── index.html                Panel y listado principal de elementos
├── Detalle.html              Ficha de una entidad y contrato de campos
├── Configuracion.html        Superficie de configuración dirigida por esquema
└── assets/
    ├── css/Estilos-Maqueta.css   Tokens del catálogo como variables CSS y patrones de componente
    ├── js/Datos-Maqueta.js       Única fuente de datos de ejemplo, contrato y descriptores
    ├── js/Maqueta.js             Render, navegación y cambio de estados
    └── img/                      Vacía a propósito: los íconos son SVG inline
```

---

## La barra de validación de maqueta

Arriba de todo, cada página muestra una barra amarilla rotulada **"Barra de validación de maqueta — no forma parte del producto"** con un grupo de botones "Estado de la superficie": Vacío, Cargando, Con datos y Error.

Ese control existe para que quien valida pueda ver los cuatro estados sin recargar ni tocar código. **No se deriva al producto final**: al construir la aplicación real, la barra entera se elimina.

---

## Qué hay que reemplazar al derivar una maqueta de proyecto

1. **`assets/js/Datos-Maqueta.js` entero.** Es el único archivo con datos. Reemplazar la identidad del modelo, el contrato de campos, los valores enumerados, los elementos de ejemplo y los descriptores de configuración por los del dominio real.
2. **Los rótulos de entidad en los HTML.** "Elemento", "Elementos", los títulos de sección y los textos de encabezado de cada superficie.
3. **El acento de marca**, si el proyecto tiene uno propio: `--color-brand-primary`, `--color-brand-primary-dark` y `--color-brand-primary-tint` en `assets/css/Estilos-Maqueta.css`. El resto de los tokens es del catálogo y no se toca sin justificación.
4. **Los íconos** del objeto `TRAZOS` en `assets/js/Maqueta.js`, si el proyecto adopta otro set vectorial. Mantener una sola familia y `currentColor`.
5. **El sello de versión**, que sale del campo `modelo.version` en `Datos-Maqueta.js`.
6. **La barra de validación**, que se elimina cuando la maqueta se convierte en producto.

Lo que **no** conviene cambiar: los nombres de las variables CSS de token. Son los del catálogo y sostienen la trazabilidad entre el diseño y la implementación.

---

## Advertencia sobre los datos

`IA.SDD` es un repositorio público. Todos los datos de esta maqueta son sintéticos y ofuscados a propósito: entidades `Elemento` con códigos `ELM-00N`, nombres `Elemento de ejemplo NN` y categorías `Categoría A/B/C`. No hay nombres de clientes, dominios reales, marcas ni datos verosímiles de negocio, y no debe haberlos.

Si una maqueta derivada de este template va a vivir en un repositorio público, mantener la misma política: ofuscar antes de publicar, no después.

---

Versión 1.0 — 2026-07-19
