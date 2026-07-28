# Archivado de versiones del framework

Esta carpeta conserva el **conjunto normativo completo** de cada versión publicada del framework, tal como estaba en el momento de publicarse.

## Qué hay acá

Una subcarpeta por versión declarada en [`../CHANGELOG.md`](../CHANGELOG.md):

```text
_legacy/
  4.0/
    README.md
    PROMPTS/
    SDD/
    Templates/
  4.1/
    ...
```

Cada subcarpeta es una copia completa y autocontenida: el master-prompt, los dieciséis archivos de reglas, las plantillas de intake, el catálogo de diseño, las guías y el prompt de entrada, en las versiones exactas en que convivían.

## Por qué el conjunto entero y no los archivos que cambiaron

Porque **las reglas son interdependientes**. Un `Rules-Contexto` de una versión combinado con un `Master-Prompt` de otra puede producir una combinación que nunca existió y que nunca se auditó. Lo que hay que poder reconstruir es el estado coherente, no una selección de archivos sueltos.

El costo es bajo: el conjunto normativo son unos 50 archivos markdown, alrededor de 1,5 MB por snapshot, y se toma una vez por versión publicada, no por edición.

## Para qué sirve

Para que un agente pueda responder, sin usar el control de versiones ni crear ramas:

- Con qué reglas exactas se generó la documentación de un destino, leyendo la procedencia que ese destino declara en su `SOLUTION-MANIFEST`.
- Qué cambió entre la versión con la que se generó y la vigente, comparando dos subcarpetas.
- Qué documentos de ese destino quedaron invalidados, contrastando qué reglas subieron major.

Es la condición para poder planificar la actualización de un destino hacia el árbol documental vigente.

## Cuándo se crea un snapshot

Al publicar una versión nueva en el `CHANGELOG.md`, y como parte de esa misma intervención, se copia acá el estado que queda superado. Una entrada del changelog, una subcarpeta.

## Alcance temporal

**La mecánica rige desde la versión 4.0 hacia adelante.** Las versiones 3.2 y anteriores no tienen snapshot en esta carpeta y solo son recuperables desde el historial del control de versiones. Es el mismo criterio con el que se incorporó la invariante D9: una regla nueva rige hacia adelante, y reconstruir hacia atrás produciría un trabajo cuyo resultado nadie va a consultar.

## Qué no se copia

| Excluido | Motivo |
| --- | --- |
| `CHANGELOG.md` | Es el registro de versiones en sí, acumulativo. Su historia es su propio contenido |
| `_legacy/` | No se archiva a sí mismo |
| Archivos de configuración del repositorio | No son normativos y no condicionan lo que el orquestador genera |

## Regla de intocabilidad

Una subcarpeta de versión, una vez creada, **no se modifica nunca**: ni sus enlaces, ni sus cabeceras, ni una coma. Es lo que garantiza que reconstruir un estado devuelva el estado real y no una reinterpretación posterior.
