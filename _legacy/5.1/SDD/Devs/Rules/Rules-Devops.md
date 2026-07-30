# Reglas constructivas — 09 DevOps

**Carpeta target (por proyecto de código):** `SDD/Docs/Proyectos/<Nombre-Proyecto-Codigo>/09-Devops/`
**Nivel de aplicación (`Vocabulario-Rules.md` §4 R3):** Proyecto de código + Producto
**Subagente target del orquestador:** Ingeniero DevOps Senior (AG-09)
**Versión de las reglas:** 3.1

---

## 0. Posición en la cadena SDD

La categoría 09 ancla la disciplina de automatización del ciclo de vida del artefacto: build, validación, empaquetado, firma, publicación y rollback. Recibe upstream de 05 (arquitectura, componentes, contratos y NFR con métricas numéricas que el pipeline debe verificar) y de 08 (quality gates, Definition of Done, cobertura mínima por capa). Alimenta a 10 (developer guide de release, instalación local y workflow de versionado consumido por los autores) y a 11 (samples publicados que se consumen desde los canales de distribución declarados acá).

Esta categoría es **obligatoria para los ocho tipos D8**. Ningún proyecto de código está exento de declarar su pipeline, su estrategia de versionado, sus ambientes o canales de distribución, su guía de publicación y su política de supply chain. Cambia el tipo de artefacto publicado y la arquitectura del pipeline, pero la categoría siempre existe.

La auditoría de Fase 0 (`Bootstrap/Audit-SDD1.md`) detectó tres déficits del fuente SDD 1.0 que SDD corrige aquí. Primero, el documento `Guia-Publicacion-Nuget.md` ata el nombre del artefacto a un gestor de paquetes específico (.NET); SDD generaliza el nombre con el patrón `guia-publicacion-<tipo-artefacto>.md` parametrizado por el tipo de artefacto del proyecto de código. Segundo, las reglas de supply chain (SBOM, firma, SLSA, dependency scanning) no estaban formalizadas en un documento dedicado; SDD incorpora `supply-chain-seguridad.md` como artefacto obligatorio. Tercero, el modelo de "entornos" del fuente confundía publicación de paquete con despliegue de servicio: SDD declara explícitamente que el modelo de ambientes depende del tipo D8 (canales preview/stable para library; DEV/QA/STAGING/PROD para servicios desplegables).

La categoría 09 opera en dos niveles dentro de un producto con jerarquía de proyectos de código:

- Nivel proyecto de código. Se genera una vez por cada proyecto de código del manifiesto, bajo `Proyectos/<Nombre-Proyecto-Codigo>/09-Devops/`, con la variante de §1.2 según su `tipo_proyecto_codigo`. Es el pipeline, el versionado, los ambientes, la guía de publicación y el supply chain de ese proyecto de código. No cambia respecto del template de tipo único.
- Nivel producto. Se genera una vez para todo el producto, bajo `Producto/`, y orquesta el build y la publicación multi-proyecto: el orden de construcción derivado de las dependencias del manifiesto, la matriz de artefactos publicables por proyecto de código y la coordinación inter-proyecto. Es obligatoria para productos con más de un proyecto de código. Para un producto de un único proyecto de código (caso degenerado) se omite: el pipeline del único proyecto de código basta.

**Frontera con la categoría 11.** Esta categoría documenta la *política*: qué ambientes existen, cómo se promociona entre ellos, cómo se firma y se publica el artefacto. Su lector participa del diseño, dentro de la cadena de especificación. La categoría 11 documenta el *procedimiento verificado* sobre el sistema ya construido —qué comando corro, en qué orden, qué tiene que responder— en `Guia-Despliegue`, `Guia-Inicio-Rapido` y `Guia-Contenedor`, para quien llega de afuera. No duplicar: 11 cita la política de acá y no define una segunda paralela. Un valor de configuración que aparece en ambas categorías con contenido distinto es un hallazgo; el de 09 es el que rige.
---

## 1. Especialidad asignada

### 1.1 Especialidad base

Ingeniero DevOps Senior, equivalente al AG-09 del catálogo SDD. Perfil profesional que diseña, implementa y mantiene la infraestructura de automatización que permite al equipo construir, probar, empaquetar, publicar y desplegar software de manera confiable y repetible. Combina conocimientos de desarrollo, operaciones, seguridad y gestión de configuración. Trata el pipeline como un artefacto de software con su propia estrategia de testing, su control de versiones y su trazabilidad. Se alinea con SemVer 2.0.0 para versionado, con Conventional Commits 1.0.0 para semántica de cambios, con Keep a Changelog 1.1.0 para comunicación al integrador, con SLSA y NIST SSDF (SP 800-218) para supply chain, con OWASP SCVS para verificación de componentes y con la práctica industrial 2024-2026 de release engineering.

Combina varias facetas que el catálogo de disciplinas separa. CI/CD Engineering diseña stages, triggers, quality gates y artefactos. Release Engineering define versionado, canales, branching y política de breaking changes. Platform Engineering provisiona ambientes con IaC y opera promoción entre ellos. DevSecOps integra SBOM, firma, SCA, SAST y DAST en el pipeline. Operations Engineering define drain, replay y rollback para workloads vivos. Según el tipo D8 del proyecto de código, una o varias facetas dominan.

### 1.2 Variantes según tipo de proyecto de código (8 valores D8)

| Tipo | Especialidad específica | Justificación |
| --- | --- | --- |
| library | DevOps + Release Engineer | El artefacto principal es un paquete distribuido; foco en SemVer estricta, Conventional Commits, canales preview/stable, política de breaking changes y publicación al gestor de paquetes del runtime objetivo. |
| web-monolith | DevOps + Deploy Engineer | Pipeline con stages clásicos build/test/package/deploy; ambientes DEV/QA/STAGING/PROD con promoción aprobada; rollback por reversión de deploy. |
| web-microservices | DevOps + Platform Engineer | GitOps con ArgoCD o Flux; manifiestos Helm o Kustomize; service mesh para canary y blue-green; rollback declarativo por revert del manifest; observabilidad por servicio. |
| desktop-app | DevOps + Release Engineer | Empaquetado en instalador nativo (MSIX, DMG, AppImage, .deb, .rpm); firma de código obligatoria; canales stable/beta; distribución por web o por store de escritorio. |
| mobile-app-maui | DevOps + Mobile Release Engineer | Publicación en App Store y Play Store; firma con certificados y keystores; canales internal/alpha/beta/production; OTA o code-push cuando el runtime lo admite. |
| rest-api | DevOps + Platform Engineer | Despliegue con canary o blue-green; publicación automática del OpenAPI versionado; contract publishing al hub de contratos; rollback rápido por traffic shift. |
| cli-tool | DevOps + Release Engineer | Binarios multi-OS (linux-x64, win-x64, darwin-arm64, etc.); publicación en múltiples gestores (Homebrew, Scoop, Chocolatey, paquete del runtime, GitHub Releases); checksum y firma. |
| worker-service | DevOps + Operations Engineer | Despliegue por consumer groups con drain y replay; coordinación con la cola de mensajes durante rollouts; rollback por revert de la versión del consumer y reproceso desde el offset previo. |

El orquestador lee esta tabla y, según el `tipo_proyecto_codigo` del proyecto de código en curso (leído del manifiesto de producto), selecciona la variante correspondiente y la combina con la especialidad base. La variante se aplica una vez por cada proyecto de código del producto. Para el build y la publicación de nivel producto (bajo `Producto/`), el orquestador asume la especialidad base de Ingeniero DevOps Senior con foco en Release Engineering y Platform Engineering, y produce el artefacto una sola vez, al cierre del bucle de proyectos de código.

### 1.3 Multi-especialidad

La categoría 09 colabora con varias especialidades durante la redacción y la revisión:

- AG-05 Arquitecto, para que los NFR con objetivo numérico (latencia, disponibilidad, throughput) tengan stage que los verifique antes de promover.
- AG-06 Scrum Master, para que el flujo de versionado encaje con el branching declarado en el acuerdo de equipo y con la cadencia de sprint.
- AG-08 QA / SDET, para que los quality gates del pipeline ejecuten exactamente la suite definida en la estrategia de testing y respeten la Definition of Done.
- AG-10 Technical Writer, para que la developer guide referencie los comandos exactos del pipeline y la guía de publicación oficial.
- AG-11 Developer Advocate, para que los samples publicados respeten los canales y la nomenclatura de versiones declarados acá.

El AG-09 mantiene titularidad de los artefactos. Las demás especialidades aportan revisión sectorial y consumen las decisiones.

---

## 2. Documentos que produce esta categoría

### 2.1 Tabla maestra

| Archivo | Obligatorio para | Recomendado | Omitir para | Descripción |
| --- | --- | --- | --- | --- |
| `pipeline-ci-cd.md` | Todos los tipos D8 | — | — | Definición del pipeline CI/CD con stages, triggers, matriz de runners, caché, artefactos, quality gates, promotion rules, rollback y notificaciones. |
| `estrategia-versionado.md` | Todos los tipos D8 | — | — | SemVer 2.0.0, Conventional Commits, herramienta de auto-versioning (MinVer, GitVersion, semantic-release o equivalente), branching, canales, deprecation policy. |
| `entornos-deploy.md` | Todos los tipos D8 | — | — | Ambientes o canales de distribución del proyecto de código, IaC, configuración 12-factor, secretos y promoción. El modelo concreto depende del tipo D8. |
| `guia-publicacion-<tipo-artefacto>.md` | Todos los tipos D8 con artefacto publicable | — | Tipos cuyo artefacto no se publica externamente | Pre-requisitos, comando o stage de publicación, verificación post-publish, rollback y métricas. Un documento por tipo de artefacto publicado. |
| `supply-chain-seguridad.md` | Todos los tipos D8 | — | — | SBOM (CycloneDX o SPDX), firma (sigstore/cosign u homólogos), nivel SLSA objetivo, dependency scanning, SAST y DAST, política de CVE. |
| `README.md` de la sección | Recomendado para todos | — | — | Índice navegable de los artefactos DevOps con orden de lectura sugerido. |

Artefactos de nivel producto (una vez para todo el producto, bajo `Producto/`):

| Archivo | Obligatorio para | Recomendado | Omitir para | Descripción |
| --- | --- | --- | --- | --- |
| `pipeline-producto.md` | Productos con más de un proyecto de código | — | Producto de un único proyecto de código (caso degenerado) | Orquestación de build y publicación del producto: orden de construcción derivado del grafo de dependencias del manifiesto, matriz de artefactos publicables por proyecto de código, coordinación inter-proyecto, versionado del producto, gate de integración y rollback coordinado. |

### 2.2 Reglas de inclusión y exclusión por tipo

| Tipo D8 | Modelo de ambientes | Tipo de artefacto publicado | Guía de publicación |
| --- | --- | --- | --- |
| library | Canales preview / stable sobre feed único | Paquete del gestor del runtime (paquete-nuget, paquete-npm, paquete-pypi, paquete-cargo, paquete-maven, paquete-gem, paquete-composer, paquete-github-packages, etc.) | `guia-publicacion-<paquete-X>.md` |
| web-monolith | DEV / QA / STAGING / PROD | image-docker o artefacto desplegable equivalente | `guia-publicacion-image-docker.md` |
| web-microservices | DEV / QA / STAGING / PROD con namespaces o clústeres por ambiente | image-docker + chart-helm + manifests-kustomize | `guia-publicacion-image-docker.md`, `guia-publicacion-chart-helm.md` |
| desktop-app | Canales stable / beta + ambiente de pruebas internas | instalador-msix, instalador-dmg, instalador-appimage, instalador-deb, instalador-rpm | `guia-publicacion-instalador-<plataforma>.md` |
| mobile-app-maui | Canales internal / alpha / beta / production | aab-android, ipa-ios | `guia-publicacion-store-mobile.md` |
| rest-api | DEV / QA / STAGING / PROD + canary | image-docker + contrato OpenAPI versionado | `guia-publicacion-image-docker.md`, `guia-publicacion-openapi.md` |
| cli-tool | Canales preview / stable + binarios por OS | binarios-github-releases + paquetes en gestores (homebrew, scoop, chocolatey, paquete-X) | `guia-publicacion-binarios-github-releases.md` y un documento por gestor adicional |
| worker-service | DEV / QA / STAGING / PROD por consumer group | image-docker | `guia-publicacion-image-docker.md` |

Los modelos son piso. El equipo puede agregar ambientes intermedios cuando el dominio lo exija, pero no quitar ninguno sin un ADR que lo justifique.

En un producto multi-proyecto, el orden de construcción y de publicación lo fija el grafo de dependencias del manifiesto: se construye y publica cada proyecto de código antes que sus dependientes, y los paquetes redistribuibles se publican antes que los proyectos de código que los consumen. Ese orden y la matriz de artefactos se documentan en `Pipeline-Producto.md` (§4.9).

---

## 3. Nomenclatura y vinculación

### 3.1 Patrón de nombres

- `pipeline-ci-cd.md` para el pipeline CI/CD.
- `estrategia-versionado.md` para versionado y branching.
- `entornos-deploy.md` para ambientes o canales.
- `guia-publicacion-<tipo-artefacto>.md` para la guía de publicación, una por tipo de artefacto distinto.
- `supply-chain-seguridad.md` para la política de cadena de suministro.
- `README.md` para el índice de la sección.
- `pipeline-producto.md` para la orquestación de build y publicación de nivel producto (en `Producto/`).

El archivo vivo lleva su nombre lógico estable, sin sufijo de versión, y declara su versión en el campo `Versión` de la cabecera (D4). El sufijo `-v<X.Y>.md`, con guion medio, identifica únicamente a las copias archivadas en `_legacy/`. Queda prohibido hardcodear un gestor de paquetes en el nombre genérico de la categoría: SDD reemplaza el `Guia-Publicacion-Nuget.md` del fuente por `guia-publicacion-<tipo-artefacto>.md` con `<tipo-artefacto>` elegido en Título-Con-Guiones según el artefacto real del proyecto de código. Valores admitidos para `<tipo-artefacto>`: `paquete-nuget`, `paquete-npm`, `paquete-pypi`, `paquete-cargo`, `paquete-maven`, `paquete-gem`, `paquete-composer`, `paquete-github-packages`, `image-docker`, `chart-helm`, `binarios-github-releases`, `instalador-msix`, `instalador-dmg`, `instalador-appimage`, `instalador-deb`, `instalador-rpm`, `store-mobile`, `openapi`. La lista no es cerrada; cualquier tipo nuevo se incorpora respetando Título-Con-Guiones y la convención de prefijo `paquete-`, `image-`, `chart-`, `binarios-`, `instalador-` o `store-` según familia.

### 3.2 Convenciones de identificadores internos

- `STAGE-XX`: stage del pipeline. Numeración contigua con dos dígitos cuando se necesita ordenar; opcional para pipelines simples.
- `ENV-XX` o nombre semántico (`DEV`, `QA`, `STAGING`, `PROD`, `preview`, `stable`): identificador de ambiente o canal.
- `NFR-XX`: las NFR provienen de 05; en 09 sólo se referencian.
- `DOD-XX`: criterios de DoD provienen de 08; en 09 se ejecutan como gates.

### 3.3 Vinculación cross-doc

- Upstream: cada quality gate del pipeline referencia el criterio DoD o el NFR que verifica; cada ambiente referencia los NFR de disponibilidad y latencia objetivo declarados en 05.
- Downstream: la developer guide de 10 cita los comandos exactos del pipeline para reproducción local; los examples de 11 referencian los canales declarados en `entornos-deploy.md`.
- La estrategia de versionado es el documento bisagra: marca la frontera entre código (Conventional Commits, branching) y artefacto publicado (SemVer, canales, deprecation), y la consumen tanto los autores como los integradores.
- Nivel producto: el orden de build y publicación del `pipeline-producto` referencia el grafo de dependencias del manifiesto; cada artefacto publicable de su matriz referencia la `guia-publicacion-<tipo-artefacto>` del proyecto de código que lo produce. No puede haber un orden de build que contradiga las dependencias del manifiesto.

### 3.4 Política de versionado

Una sola versión vigente por nombre lógico. Cuando se pasa de `v1.0` a `v2.0` la versión anterior se mueve a `_legacy/` con estado `Superado`. El cambio mayor del pipeline (por ejemplo, adopción de un nuevo gate obligatorio o cambio de runner por defecto) requiere comunicar al equipo en el sprint review siguiente y actualizar la developer guide en 10 en el mismo PR.

### 3.5 README de la sección

Recomendado para todos los tipos. Lista los artefactos vigentes, el estado de cada uno, los enlaces a los workflows reales del repositorio y el orden de lectura sugerido (acuerdo de equipo → estrategia de versionado → pipeline → ambientes → guía de publicación → supply chain).

---

## 4. Estructura de redacción

### 4.1 Cabecera obligatoria

Cada artefacto inicia con un H1 y un bloque markdown de metadatos uniforme:

```markdown
# <Título del documento>

**Proyecto de código:** {{Nombre-Proyecto-Codigo}}
**Documento:** <nombre-archivo>.md
**Versión:** <X.Y>
**Estado:** Borrador | Propuesto | Aprobado | Vigente | Superado | Archivado
**Fecha:** YYYY-MM-DD
**Autor:** {{equipo-o-rol}}
```

**Tabla de contenido.** Todo documento generado que supere las tres secciones de primer nivel incluye una tabla de contenido inmediatamente después de la cabecera de metadatos, con enlaces ancla a cada sección de primer y de segundo nivel. La tabla de contenido no cuenta como sección de contenido ni altera la estructura obligatoria del documento: se ubica entre la cabecera y la primera sección, y las secciones obligatorias siguen siendo las que declara §4.2. Los documentos breves —fichas de una sola sección, entradas de índice— quedan exceptuados.

El ajuste es de navegabilidad. Estos documentos los lee principalmente un agente de IA que recorre la cadena de especificación acumulando contexto, y para ese lector la tabla de contenido es indiferente. Existe para el agente humano que entra a consultar un punto concreto sin haber leído el documento entero.

### 4.2 Estructura de `Pipeline-CI-CD.md`

1. Stages obligatorios. Lint (formato, linters por lenguaje), build (compilación reproducible), test (unitarios, integración, contract según pirámide de 08), SCA (composition analysis y vulnerabilidades de dependencias), SBOM (CycloneDX o SPDX), firma (sigstore/cosign u homólogo), publish (al canal correspondiente). Cada stage declara su comando, su tooling y su criterio de éxito.
2. Matriz de SO y runtime. Combinaciones de sistema operativo y versión del runtime que se ejecutan en cada trigger. Justificación de la matriz: cobertura de integradores reales versus costo de minutos de CI.
3. Caché y artefactos. Política de caché del gestor de dependencias del runtime, expiración, llaves de caché y archivos producidos por cada stage con su retención.
4. Promotion rules entre ambientes o canales. Criterios para promover de DEV a QA, de QA a STAGING, de STAGING a PROD, o de preview a stable. Cada transición declara su trigger (tag, aprobación manual, merge a rama específica) y sus prerequisitos.
5. Rollback. Procedimiento por tipo de artefacto: revertir tag o deploy, delist en feed, re-deploy de versión previa, reproceso desde offset previo en workers. Cada paso operativo con comando concreto.
6. Notificaciones. Canales de comunicación de éxito y falla, escalamientos por severidad y dashboards visibles al equipo.

### 4.3 Estructura de `Estrategia-Versionado.md`

1. SemVer 2.0.0. Especificación adoptada con formato `MAJOR.MINOR.PATCH[-PRERELEASE][+BUILDMETADATA]` y reglas de incremento.
2. Conventional Commits 1.0.0. Convención de mensajes con prefijos semánticos (`feat`, `fix`, `chore`, `docs`, `refactor`, `perf`, `test`, `build`, `ci`, `style`) y marcador `BREAKING CHANGE` o `!` para mayor.
3. Herramienta de versionado. MinVer, GitVersion, semantic-release, Nerdbank.GitVersioning u homólogo del runtime objetivo. Configuración base y prefijo de tag.
4. Branching. GitHub Flow, Git Flow o Trunk-based development según el acuerdo de equipo, con reglas de protección de ramas y políticas de PR.
5. Canales. Preview, stable y opcionalmente LTS, con criterios de promoción y semántica de sufijos `-alpha`, `-beta`, `-rc`.
6. Deprecation policy. Cómo se anuncian y comunican los breaking changes, cuántos minor antes de remover, marcado de obsoletos en código y mención en CHANGELOG.

### 4.4 Estructura de `Entornos-Deploy.md`

1. Lista de ambientes o canales. Para tipos desplegables: DEV, QA, STAGING, PROD con propósito, URL, aprobador y SLA. Para librerías y CLI: preview y stable con criterios de uso.
2. Provisión (IaC). Herramienta declarativa elegida (Terraform, Pulumi, Bicep, CloudFormation u homólogo). Layout de módulos, política de state y aprobación de `plan` antes de `apply`.
3. Configuración por ambiente. 12-factor: configuración en variables de entorno o archivos referenciados, nunca en código. Mapa de variables por ambiente.
4. Secretos. Vault, AWS Secrets Manager, Azure Key Vault, GitHub Secrets o equivalente. Rotación, scopes y prohibición explícita de commit.
5. Promoción. Procedimiento de promoción entre ambientes o canales, integrado con el pipeline. Aprobador requerido y registro de auditoría.

### 4.5 Estructura de `guia-publicacion-<tipo-artefacto>.md`

1. Pre-requisitos. Cuenta, token o credencial necesarios, scopes mínimos, configuración local opcional para publicación manual.
2. Comando o stage de publicación. Comando exacto reproducible y el stage del pipeline que lo ejecuta de forma automatizada. Variables de entorno requeridas.
3. Verificación post-publish. Cómo confirmar que el artefacto quedó publicado y es consumible: instalación de prueba, descarga, comprobación de firma o checksum.
4. Rollback. Cómo delistar, retirar o reemplazar la versión publicada cuando aplica; ventana de gracia y comunicación.
5. Métricas. Indicadores observables: descargas, vulnerabilidades detectadas post-publish, tasa de adopción, tiempo medio hasta detección de regresión.

### 4.6 Estructura de `Supply-Chain-Seguridad.md`

1. SBOM. Formato (CycloneDX o SPDX), generador, formato de salida (JSON o XML), publicación adjunta al release y firma del propio SBOM.
2. Firma. Cosign, sigstore, certificado de organización u homólogo. Política de transparency log y verificación por integradores.
3. SLSA. Nivel objetivo (L1, L2, L3, L4) con criterios cumplidos y plan de elevación.
4. Dependency scanning. Tooling de SCA, frecuencia de ejecución, política ante vulnerabilidad crítica, alta, media y baja. Integración con Dependabot, Renovate o equivalente.
5. SAST y DAST. Herramientas de análisis estático y dinámico, stages del pipeline donde se ejecutan y criterios de bloqueo de PR.
6. Política de CVE. SLA de remediación por severidad, comunicación al integrador, ventana entre detección y publicación de fix.

### 4.7 Tablas tipo y formatos recurrentes

Stages del pipeline:

| Stage | Tooling | Quality gate | Bloqueante |
| --- | --- | --- | --- |
| Lint | <linter del lenguaje> | 0 errores nuevos | Sí en PR |
| Build | <compilador o builder> | 0 errores de compilación | Sí |
| Test | <framework de tests> | DoD y cobertura mínima de 08 cumplidas | Sí |
| SCA | <herramienta de SCA> | 0 CVE críticas, 0 altas sin excepción | Sí |
| SBOM | <generador CycloneDX o SPDX> | SBOM generado y adjunto | Sí |
| Firma | <sigstore / cosign / equivalente> | Firma válida y registrada | Sí |
| Publish | <comando de publicación> | Artefacto disponible en el canal | Sí |

Ambientes y canales:

| Ambiente / Canal | URL o destino | Aprobador | SLA |
| --- | --- | --- | --- |
| DEV | <url-o-feed> | Auto | — |
| QA | <url-o-feed> | QA lead | <horas a verde> |
| STAGING | <url-o-feed> | Release manager | <horas de soak> |
| PROD | <url-o-feed> | Release manager + aprobación de negocio | <SLO mensual> |
| preview | <feed-preview> | Auto | — |
| stable | <feed-stable> | Release manager | — |

Reglas SemVer:

| Tipo de cambio en Conventional Commits | Bump SemVer | Ejemplo |
| --- | --- | --- |
| `feat` | MINOR | 1.2.3 → 1.3.0 |
| `fix` | PATCH | 1.2.3 → 1.2.4 |
| `feat!` o `BREAKING CHANGE` en footer | MAJOR | 1.2.3 → 2.0.0 |
| `refactor`, `perf`, `test`, `chore`, `docs`, `style`, `build`, `ci` | Ninguno | 1.2.3 → 1.2.3 |

Tipo de proyecto de código D8 y tipo de artefacto a publicar:

| Tipo D8 | Tipo de artefacto principal | Tipos de artefacto secundarios admitidos |
| --- | --- | --- |
| library | paquete del gestor del runtime: paquete-npm, paquete-pypi, paquete-cargo, paquete-maven, paquete-gem, paquete-composer, paquete-nuget, paquete-github-packages, etc. | binarios-github-releases para precompilados opcionales |
| web-monolith | image-docker | binarios-github-releases para distribución alternativa |
| web-microservices | image-docker | chart-helm, manifests-kustomize |
| desktop-app | instalador nativo: instalador-msix, instalador-dmg, instalador-appimage, instalador-deb, instalador-rpm | binarios-github-releases para portable |
| mobile-app-maui | aab-android e ipa-ios publicados a store-mobile | — |
| rest-api | image-docker | openapi versionado, chart-helm |
| cli-tool | binarios-github-releases | paquete en gestores externos: homebrew, scoop, chocolatey, paquete-X del runtime |
| worker-service | image-docker | chart-helm |

### 4.8 Anti-patrones a evitar

| Anti-patrón | Problema | Solución |
| --- | --- | --- |
| Pipeline sin quality gates | Tests verdes con cobertura baja, sin SCA y sin SBOM; bugs y vulnerabilidades escapan a producción | Cada stage relevante declara su gate y su criterio de bloqueo |
| Versionado manual | Olvidos, inconsistencias y versiones salteadas | Herramienta de auto-versioning a partir de Conventional Commits y tags Git |
| Falta de SBOM | Inventario opaco, imposibilidad de responder ante CVE de dependencias | SBOM CycloneDX o SPDX adjunto a cada release |
| Secretos en commit | Tokens expuestos en historia Git, rotación reactiva tardía | Vault o secret manager; scan automático de commits; rotación periódica |
| Sin política de rollback | Versión rota publicada e integradores bloqueados | Procedimiento documentado por tipo de artefacto, ejecutable en minutos |
| Stack hardcoded en el documento general | El fuente SDD 1.0 tenía `guia-publicacion-nuget` ligado al ecosistema .NET, impidiendo aplicar la regla a otros runtimes | Nombre genérico `guia-publicacion-<tipo-artefacto>.md` con el tipo elegido por proyecto de código |
| Confundir publicación con despliegue | Aplicar DEV/QA/STAGING/PROD al artefacto de una librería | Distinguir canales (preview/stable) en library de ambientes en servicios desplegables |
| Pipeline irreproducible localmente | Solo corre en el runner CI; debugging dependiente de logs | Comandos del pipeline documentados y ejecutables en máquina local con las mismas versiones |
| Trigger único y opaco | Todo se dispara en push a `main`; no hay distinción PR vs release | Triggers explícitos por evento: PR, push, tag, schedule |
| Falta de firma del artefacto | El integrador no puede verificar autoría e integridad | Firma con sigstore/cosign u homólogo en el stage final |
| Promotion sin aprobador humano para PROD | Despliegues automáticos a producción sin gate humano cuando el negocio lo requiere | Aprobador explícito en la promoción a PROD y registro auditable |
| CHANGELOG ausente o no mantenido | El integrador no sabe qué cambió | Generación automática desde Conventional Commits y publicación en el release |

### 4.9 Estructura de `Pipeline-Producto.md`

Aplica solo a productos con más de un proyecto de código. Orquesta el build y la publicación del producto completo por encima del pipeline de cada proyecto de código; no duplica el `pipeline-ci-cd` de cada proyecto de código, lo referencia.

1. Objetivo y alcance. Qué orquesta el documento y qué queda en el pipeline de cada proyecto de código. Aclara que el detalle de stages internos vive en el `pipeline-ci-cd` de cada proyecto de código.
2. Orden de construcción. Derivado del grafo de dependencias del manifiesto, en orden topológico: primero los proyectos de código sin dependencias (incluidos los paquetes redistribuibles), luego los dependientes. Tabla con el nivel topológico de cada proyecto de código y los proyectos de código paralelizables del mismo nivel.
3. Matriz de build y publicación multi-proyecto. Por proyecto de código: `tipo_proyecto_codigo`, tipo de artefacto publicable, canal o feed de publicación, y si su artefacto es consumido por otros proyectos de código del producto. Refleja la tabla de §2.2 aplicada a cada proyecto de código del manifiesto.
4. Coordinación inter-proyecto. Por cada arista de dependencia, cómo el proyecto de código consumidor obtiene el artefacto del productor: por referencia al paquete publicado (el redistribuible se publica primero) o por build conjunto en el repositorio. Declara la política para cada dependencia.
5. Versionado del producto. Independiente por proyecto de código o lockstep; cómo se coordinan los bumps cuando un cambio en un proyecto de código productor obliga a versionar a sus consumidores.
6. Gate de integración de producto. Verificación end-to-end de que los proyectos de código integrados funcionan juntos antes de publicar el producto (smoke test del producto levantada con sus artefactos).
7. Rollback coordinado. Orden de rollback inverso al de build y manejo de un artefacto compartido roto que afecta a varios consumidores.
8. Trazabilidad. Liga el orden de build a las dependencias del manifiesto y cada artefacto publicable a la `guia-publicacion-<tipo-artefacto>` del proyecto de código que lo produce.

Para un producto de un único proyecto de código, este artefacto se omite: el orden de build es trivial y la publicación se resuelve con el pipeline del único proyecto de código.

---

## 5. Preguntas guía para el subagente

### 5.1 Input upstream

- ¿Cada NFR con objetivo numérico (latencia, throughput, disponibilidad) tiene un stage o un gate del pipeline que lo verifica antes de promover?
- ¿La Definition of Done de 08 se ejecuta como conjunto de gates en el pipeline, no se redefine acá?
- ¿La pirámide de testing de 08 está representada con un stage por nivel (unit, integration, e2e, snapshot, contract según aplique)?
- ¿La estrategia de versionado encaja con el branching declarado en el acuerdo de equipo de 00?

### 5.2 Scope

- ¿El modelo de ambientes o canales es el adecuado al tipo D8 del proyecto de código?
- ¿La guía de publicación cubre todos los tipos de artefacto producidos por el proyecto de código y no más?
- ¿El nombre del documento de publicación usa el patrón `guia-publicacion-<tipo-artefacto>.md` y `<tipo-artefacto>` es un valor admitido?

### 5.3 Trazabilidad

- ¿Cada quality gate del pipeline referencia el criterio DoD o el NFR que verifica?
- ¿Cada ambiente o canal referencia los NFR de disponibilidad y latencia objetivo de 05?
- ¿La estrategia de versionado referencia el documento de Conventional Commits y el branching del acuerdo de equipo?
- ¿La developer guide de 10 cita comandos exactos del pipeline para reproducción local?

### 5.4 Calidad operativa

- ¿Existe procedimiento de rollback por tipo de artefacto, ejecutable y ensayado al menos una vez?
- ¿El SBOM se genera y se adjunta al release de forma automatizada?
- ¿La firma del artefacto se ejecuta en el stage final y se verifica antes del publish?
- ¿La política de CVE tiene SLA por severidad y comunicación al integrador?
- ¿Los secretos viven en un vault, nunca en commit, y rotan con frecuencia declarada?

---

## 6. Criterios de aceptación

- [ ] Existe `Pipeline-CI-CD.md` con stages obligatorios (lint, build, test, SCA, SBOM, firma, publish), matriz de SO/runtime, caché, artefactos, promotion rules, rollback y notificaciones.
- [ ] Existe `Estrategia-Versionado.md` con SemVer 2.0.0, Conventional Commits 1.0.0, herramienta de versionado declarada, branching alineado al acuerdo de equipo, canales y deprecation policy.
- [ ] Existe `Entornos-Deploy.md` con el modelo correcto para el tipo D8 (canales para library/cli-tool; DEV/QA/STAGING/PROD para web-monolith/microservices/rest-api/worker-service; canales + ambientes internos para desktop-app y mobile-app-maui).
- [ ] Existe al menos una `guia-publicacion-<tipo-artefacto>.md` con pre-requisitos, comando o stage, verificación post-publish, rollback y métricas.
- [ ] Existe `Supply-Chain-Seguridad.md` con SBOM, firma, nivel SLSA objetivo, dependency scanning, SAST/DAST y política de CVE.
- [ ] Ningún archivo hardcodea un gestor de paquetes en el nombre genérico de la categoría; el patrón es `guia-publicacion-<tipo-artefacto>.md` con `<tipo-artefacto>` parametrizado.
- [ ] El pipeline ejecuta exactamente la DoD de 08 como gates, sin redefinir criterios localmente.
- [ ] Cada NFR con objetivo numérico de 05 tiene un stage o gate que lo verifica antes de promover.
- [ ] Cada ambiente y canal declara aprobador y SLA o ventana de soak cuando corresponde.
- [ ] El procedimiento de rollback está documentado por tipo de artefacto con comando concreto.
- [ ] El SBOM y la firma se generan automáticamente en el pipeline y se adjuntan al release.
- [ ] No aparecen menciones de stacks o protocolos del dominio fuente fuera de la tabla `Tipo D8 → Tipo de artefacto` cuando el proyecto de código efectivamente los utiliza.

Criterios adicionales de nivel producto (solo si el producto tiene más de un proyecto de código):

- [ ] Existe `Producto/Pipeline-Producto.md` con las ocho secciones del §4.9.
- [ ] El orden de construcción respeta el grafo de dependencias del manifiesto y publica los redistribuibles antes que sus consumidores.
- [ ] La matriz de build y publicación lista, por proyecto de código, su tipo de artefacto publicable y su canal o feed.
- [ ] Cada artefacto publicable referencia la `guia-publicacion-<tipo-artefacto>` del proyecto de código que lo produce.
- [ ] Existe un gate de integración de producto antes de publicar el producto.
- [ ] Para un producto de un único proyecto de código, `pipeline-producto` se omitió correctamente.
- [ ] Todo documento con más de tres secciones de primer nivel incluye tabla de contenido inmediatamente después de la cabecera, con enlaces ancla a las secciones de primer y de segundo nivel. Los documentos breves quedan exceptuados.
- [ ] Todo término que esta categoría acuña o precisa, y que aparece en más de uno de sus artefactos, está declarado en `Glosario-Tecnico.md` de 11, con sus referentes cuando tiene más de uno. Los términos de entorno, canal y artefacto publicable son técnicos y se declaran una sola vez en el glosario técnico, no en cada pipeline.
- [ ] Ninguna forma desnuda de un término polisémico queda sin resolver en un artefacto que se lee por secciones (`Vocabulario-Rules.md` §9.2).
- [ ] Ninguna polisemia con contextos disjuntos se reporta como defecto ni se corrige calificando todas las ocurrencias (criterio negativo de `Vocabulario-Rules.md` §9.1).

---

## 7. Ejemplos genéricos

### 7.1 Ejemplo 1 — `Pipeline-CI-CD.md` para librería de parsing CSV publicada en package manager con canales preview y stable

Fragmento ilustrativo, no documento completo:

```markdown
# Pipeline CI/CD — Librería de parsing CSV

**Proyecto de código:** {{Nombre-Proyecto-Codigo}}
**Documento:** Pipeline-CI-CD.md
**Versión:** 1.0
**Estado:** Aprobado
**Fecha:** 2026-05-17

## 1. Stages obligatorios

| Stage | Tooling | Quality gate | Bloqueante |
| --- | --- | --- | --- |
| Lint | <linter del runtime objetivo> | 0 warnings nuevos | Sí en PR |
| Build | <builder del runtime objetivo> | 0 errores | Sí |
| Test unit | <framework unitario> | Cobertura dominio >= 90 % | Sí |
| Test integration | <framework de integración> | Verde | Sí |
| Test snapshot | <framework de snapshot> | Verde | Sí |
| SCA | <herramienta de SCA> | 0 CVE críticas/altas | Sí |
| SBOM | <generador CycloneDX> | SBOM JSON adjunto | Sí |
| Firma | <sigstore/cosign> | Firma válida en transparency log | Sí |
| Publish preview | <comando de publicación> | Artefacto en canal preview | Sólo en tag `-alpha`, `-beta`, `-rc` |
| Publish stable | <comando de publicación> | Artefacto en canal stable | Sólo en tag `v<X.Y.Z>` sin sufijo |

## 2. Matriz de SO y runtime

| Trigger | Sistemas operativos | Runtime |
| --- | --- | --- |
| PR a main | linux, windows | versión soportada del runtime |
| Tag estable | linux | versión soportada del runtime |

Justificación: la librería se consume en linux y windows; la matriz cruzada en PR detecta diferencias de path separator y line endings antes del release.

## 4. Promotion rules

- preview se publica automáticamente desde tags con sufijo `-alpha.N`, `-beta.N` o `-rc.N`.
- stable se publica desde tags `v<X.Y.Z>` sin sufijo, generados por la herramienta de versionado a partir de Conventional Commits.
- No hay aprobación humana entre preview y stable; el gate es la suite de tests verde y el SBOM presente.

## 5. Rollback

- Delist de la versión rota en el feed dentro de la ventana de gracia del gestor.
- Publicación inmediata de PATCH con el fix; comunicación en CHANGELOG y release notes.
- Si el bug es breaking, MAJOR + guía de migración.
```

### 7.2 Ejemplo 2 — `Estrategia-Versionado.md` para REST API de pagos

Fragmento ilustrativo, no documento completo:

```markdown
# Estrategia de versionado — REST API de pagos

**Proyecto de código:** {{Nombre-Proyecto-Codigo}}
**Documento:** Estrategia-Versionado.md
**Versión:** 1.0
**Estado:** Aprobado
**Fecha:** 2026-05-17

## 1. SemVer 2.0.0

Formato: `MAJOR.MINOR.PATCH[-PRERELEASE]`. La API expone contrato OpenAPI versionado; cualquier cambio incompatible en el contrato implica MAJOR. Cambio retrocompatible (campo opcional nuevo, nuevo endpoint) implica MINOR. Bug fix sobre comportamiento existente implica PATCH.

## 2. Conventional Commits 1.0.0

| Prefijo | Bump | Ejemplo |
| --- | --- | --- |
| `feat` | MINOR | `feat(api): agregar endpoint de consulta de saldo` |
| `fix` | PATCH | `fix(service): corregir cálculo de IVA exento` |
| `feat!` o `BREAKING CHANGE` | MAJOR | `feat!(api): migrar contrato v1 a v2` |
| `refactor`, `perf`, `test`, `chore`, `docs`, `style`, `build`, `ci` | Ninguno | — |

## 3. Herramienta de versionado

<MinVer / GitVersion / semantic-release u homólogo del runtime objetivo> calcula la versión desde tags Git con prefijo `v`. La versión inicial es 1.0.0; el contrato OpenAPI está estabilizado desde el primer release.

## 4. Branching

Trunk-based development con `main` protegida; ramas `feature/<slug>` cortas (menos de 5 días); PR obligatorio con al menos una aprobación; merge por squash con mensaje Conventional Commits que define el bump.

## 5. Canales

- `preview`: tags con sufijo `-alpha.N`, `-beta.N`, `-rc.N`. Despliegan a STAGING.
- `stable`: tags `v<X.Y.Z>` sin sufijo. Despliegan a PROD con canary 5 % → 25 % → 100 %.

## 6. Deprecation policy

- Un endpoint deprecado vive al menos dos MINOR antes de removerse.
- Se marca con header `Deprecation` y `Sunset` en la respuesta.
- Se anuncia en CHANGELOG y en la documentación pública del contrato OpenAPI.
```

Los dos fragmentos son ilustrativos. Cada proyecto de código adapta el dominio respetando la estructura.

---

## 8. Prompt-snippet sugerido

```text
Sos un {{ESPECIALIDAD-VARIANTE-09}} responsable de redactar los artefactos DevOps del proyecto de código {{NOMBRE_PROYECTO_CODIGO}}.

Insumos:
- PRODUCT-INTAKE: {{path}}
- Upstream: 05 (arquitectura y NFR con métricas numéricas), 08 (quality gates, DoD, pirámide y cobertura).

A generar (obligatorio para todos los tipos D8):
- Pipeline-CI-CD.md
- Estrategia-Versionado.md
- Entornos-Deploy.md
- guia-publicacion-<tipo-artefacto>.md (uno por tipo de artefacto publicado; <tipo-artefacto> en Título-Con-Guiones)
- Supply-Chain-Seguridad.md
- README.md de la sección (recomendado)

Reglas de redacción: §4 de Rules-Devops.md.
Nomenclatura: sufijo uniforme `.md`. Prohibido hardcodear gestor de paquetes en el nombre genérico de la categoría; el patrón es `guia-publicacion-<tipo-artefacto>.md` con <tipo-artefacto> parametrizado (corrección obligatoria del antecedente del fuente).
Trazabilidad: cada quality gate referencia el criterio DoD de 08 o el NFR de 05 que verifica. La DoD no se redefine acá; se ejecuta como gates.
Modelo de ambientes: la tabla §2.2 fija el modelo por tipo D8. Confundir publicación con despliegue (aplicar DEV/QA/STAGING/PROD a una librería) es anti-patrón explícito.
Supply chain: SBOM, firma, nivel SLSA objetivo, dependency scanning, SAST/DAST y política de CVE son obligatorios en todo tipo D8.
Criterios de calidad: §6 de Rules-Devops.md.

Restricciones: no introducir productos comerciales ni protocolos del dominio fuente. Idioma rioplatense técnico, tildes correctas, sin emojis ni negritas decorativas.

Salida: SDD/Docs/Proyectos/{{NOMBRE_PROYECTO_CODIGO}}/09-Devops/<estructura>.
```

Prompt-snippet de la orquestación de nivel producto (se despacha una sola vez, al cierre del bucle de proyectos de código, solo si el producto tiene más de un proyecto de código):

```text
Sos un Ingeniero DevOps Senior con foco en Release Engineering y Platform Engineering, responsable de la orquestación de build y publicación del producto {{NOMBRE_PRODUCTO}}.

Insumos:
- PRODUCT-MANIFEST: {{path}} (grafo de dependencias, tipos de artefacto, nombres de código).
- Los artefactos 09-Devops de cada proyecto de código ya generados en Proyectos/<Nombre>/09-Devops/.

A generar:
- Producto/Pipeline-Producto.md con las ocho secciones del §4.9.

Reglas: el orden de construcción respeta el grafo del manifiesto (dependencias antes que dependientes; redistribuibles antes que consumidores); la matriz refleja §2.2 aplicada por proyecto de código; cada artefacto publicable referencia la guia-publicacion del proyecto de código productor; no duplicar el pipeline interno de cada proyecto de código.
Criterios de calidad: §6 de Rules-Devops.md (criterios de nivel producto).

Salida: SDD/Docs/Producto/Pipeline-Producto.md.
```

---

## 9. Control de cambios

| Versión | Fecha | Descripción |
| --- | --- | --- |
| 1.0 | 2026-05-17 | Versión inicial de las reglas constructivas de la categoría 09. Define los cinco artefactos obligatorios para todo tipo D8 (`pipeline-ci-cd`, `estrategia-versionado`, `entornos-deploy`, `guia-publicacion-<tipo-artefacto>`, `supply-chain-seguridad`) más el README recomendado, parametriza el nombre de la guía de publicación con `<tipo-artefacto>` corrigiendo el antecedente `Guia-Publicacion-Nuget.md` del fuente SDD 1.0, fija el modelo de ambientes por tipo D8 distinguiendo canales (library, cli-tool) de ambientes (web-monolith, web-microservices, rest-api, worker-service) y formaliza supply chain (SBOM, firma, SLSA, SCA, SAST/DAST, política de CVE) como artefacto obligatorio. |
| 1.1 | 2026-06-09 | Validación ST-06: la categoría se genera por proyecto bajo `Proyectos/<Nombre-Proyecto>/09-Devops/`; la frase de cierre de §1.2 y la ruta de salida del prompt-snippet referencian el `project_type` del proyecto en curso (manifiesto). Tablas §1.2 sin reescritura. El build y la publicación multi-proyecto se reformulan en ST-07. |
| 1.2 | 2026-06-09 | Reformulación ST-07: build y publicación multi-proyecto. La categoría 09 opera en dos niveles. Nivel proyecto sin cambios. Nivel solución: nuevo artefacto `Pipeline-Solucion.md` en `Solucion/` (§4.9) con orden de construcción derivado del grafo de dependencias del manifiesto, matriz de artefactos publicables por proyecto, coordinación inter-proyecto, versionado de la solución, gate de integración y rollback coordinado. Obligatorio para soluciones de más de un proyecto; omitido en el caso degenerado. | Reformulación SDD |
| 1.3 | 2026-06-10 | Migración de referencias de intake al documento unificado SOLUTION-INTAKE (unificación de intake). | Migración SDD |
| 1.4 | 2026-07-26 | Normalización del vocabulario de actores: «consumidor» pasa a «integrador» donde designa a quien consume el artefacto publicado. Se conserva el término donde designa un proyecto consumidor del grafo de dependencias o un consumer group de mensajería, usos técnicos en los que no refiere a un actor. |
| 1.5 | 2026-07-26 | Se declara en §0 la frontera con la categoría 11: esta categoría define la política de ambientes, promoción y publicación; la 11 documenta el procedimiento verificado sobre el sistema construido y no define una política paralela. Sin cambios de artefactos ni de gating. |
| 1.6 | 2026-07-26 | Navegabilidad para lectores humanos: §4.1 y §6 exigen tabla de contenido en todo documento generado que supere las tres secciones de primer nivel, con enlaces ancla de primer y segundo nivel y excepción para documentos breves. Es el único cambio: no se altera la estructura obligatoria de los documentos, no se agregan artefactos ni carga narrativa. |
| 2.0 | 2026-07-28 | Normalización del versionado (framework 4.0). El archivo vivo pierde el sufijo de versión del nombre y pasa a declarar su versión en el campo `Versión` de su cabecera; el sufijo `-v<X.Y>.md` queda reservado a las copias archivadas en `_legacy/`. Se actualizan los patrones de nombre, los ejemplos, las cabeceras modelo, los anti-patrones y los criterios de aceptación de la categoría. Sube major porque la documentación generada con la nomenclatura anterior deja de cumplir. Deriva de la reformulación de D4 y D5 en el `README.md` del framework. |
| 3.0 | 2026-07-29 | Renombre de vocabulario normativo (framework 5.0). El nivel superior pasa de «solución» a **producto**, la unidad de compilación de «proyecto» a **proyecto de código**, y los cuatro planos de identidad del producto se separan en campos propios (`Nombre-Producto`, `Slug-Producto`, `Raiz-Codigo`, `Artefacto-Agrupacion`). Se declara el nivel de aplicación de la regla en su cabecera, según `Vocabulario-Rules.md` §4 R3. Sube major porque los identificadores y los nombres de artefacto cambian, y la documentación generada con la nomenclatura anterior deja de cumplir. |
| 3.1 | 2026-07-29 | Criterio de gobierno del glosario en §6. Sube minor: agrega criterios de aceptación verificables sin cambiar el conjunto de artefactos de la categoría ni ninguna invariante, y ninguna documentación ya emitida deja de cumplir por sí sola. Los tres criterios exigen que todo término que la categoría acuña o precisa y usa en más de uno de sus artefactos esté declarado en el glosario que le corresponde, que ninguna forma desnuda de un término polisémico quede sin resolver en un artefacto que se lee por secciones, y —criterio negativo— que ninguna polisemia con contextos disjuntos se reporte como defecto. Materializan `Vocabulario-Rules.md` §9 en la categoría. **Origen**: el audit verificaba «glosario sin contradicciones», que un glosario incompleto cumple trivialmente, y esta regla no mencionaba la palabra «glosario» ni una vez. |
