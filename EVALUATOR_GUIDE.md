# GUÍA DEL EVALUADOR — Evaluación Técnica ShopMetrics

> **⚠️ CONFIDENCIAL — NO compartir con candidatos**

Este documento lista todos los bugs intencionales, anti-patrones y problemas de calidad de código planteados en el codebase. Úsalo para calificar los hallazgos del candidato durante y después de la sesión.

**Total de issues planteados: 54**
**Línea base de calificación:**
- 5–8 issues → Nivel Junior/Mid
- 12–16 issues → Nivel Mid-Senior
- 20–30+ issues → Nivel Senior (8+ años)

---

## NIVEL 1 — Básico (8 issues)
*Cualquier desarrollador con 3+ años debería detectar estos.*

| # | Archivo | Issue | Peso de Puntuación |
|---|------|-------|-------------|
| L1-1 | `dashboard/page.tsx:1` | `"use client"` en la página raíz del dashboard — debería ser un Server Component | 1pt |
| L1-2 | `dashboard/page.tsx:20-38` | Data fetching con `useEffect + useState` en lugar de `async` Server Component | 1pt |
| L1-3 | `components/HeroBanner.tsx:80-84` | Tags nativos `<img>` en lugar de `next/image` en las slides del carousel | 1pt |
| L1-4 | `components/HeroBanner.tsx:80-84` | Sin `width`/`height` en las imágenes del carousel → **CLS (Cumulative Layout Shift)** — las slides saltan al cargar | 1pt |
| L1-5 | `components/HeroBanner.tsx:80-84` | `alt={slide.alt}` — aunque usa el alt del slide, las imágenes del carousel sin prioridad de carga adecuada afectan LCP | 1pt |
| L1-6 | `components/MetricsCards.tsx` | `style={{}}` inline mezclado con clases Tailwind en todo el componente | 1pt |
| L1-7 | `components/OrdersTable.tsx:101` | `key={index}` en lista ordenable — causa reconciliación incorrecta cuando las filas se reordenan | 1pt |
| L1-8 | `components/ProductList.tsx:28` | Color hardcodeado `bg-[#1a1a2e]` en lugar de un design token o color semántico de Tailwind | 1pt |

---

## NIVEL 2 — Intermedio (14 issues)
*Un desarrollador con 5+ años debería detectar estos además del Nivel 1.*

| # | Archivo | Issue | Peso de Puntuación |
|---|------|-------|-------------|
| L2-1 | `dashboard/page.tsx:22-29` | Llamadas `await` secuenciales (cascade fetching) en lugar de `Promise.all` — 4 requests ejecutan serialmente sumando ~1250ms | 2pt |
| L2-2 | `dashboard/page.tsx` | Sin export `generateMetadata` — el dashboard no tiene metadata SEO dinámica | 1pt |
| L2-3 | `components/HeroBanner.tsx` | URLs de imágenes del carousel sin optimización de tamaño — cargan resoluciones mayores a las necesarias, sin `srcSet`/`sizes` para entrega responsive | 2pt |
| L2-4 | `components/HeroBanner.tsx` | Sin hint de `loading="lazy"` o `priority` en las slides — todas las imágenes del carousel tienen la misma prioridad, el LCP no está optimizado | 2pt |
| L2-5 | `components/HeroBanner.tsx` | Sin placeholder blur o estrategia de carga progresiva — espacio en blanco mostrado hasta que las imágenes del carousel descargan | 1pt |
| L2-6 | `components/MetricsCards.tsx:11` | Recibe el objeto completo `DashboardData` como prop cuando solo `metrics` es necesario (over-fetching de prop) | 1pt |
| L2-7 | `components/MetricsCards.tsx:26-38` | Animación con `setInterval` sin cleanup de `clearInterval` — timer leaks al desmontar | 2pt |
| L2-8 | `components/OrdersTable.tsx:13-18` | Función `obtenerClaseEstado()` nombrada en español — convención de nombres inconsistente | 1pt |
| L2-9 | `components/OrdersTable.tsx:26` | Variable `filaSeleccionada` nombrada en español | 1pt |
| L2-10 | `components/OrdersTable.tsx:101` | `<tr>` con `onClick` no tiene `role`, `tabIndex`, ni `onKeyDown` — no es accesible por teclado | 1pt |
| L2-11 | `components/ProductCatalog.tsx` | Variables `productosFiltrados`, `estaCargando`, `cantidadTotal`, `manejarBusqueda`, `mostrarMasProductos` — todas en español | 1pt |
| L2-12 | `components/ProductCatalog.tsx` | Sin `React.memo` en `ProductCard` — cada tarjeta se re-renderiza en cada tecla en la caja de búsqueda | 2pt |
| L2-13 | `components/ProductCard.tsx:16-17` | `useState` para estado de hover/expandido — debería ser pseudo-clase CSS `:hover` | 1pt |
| L2-14 | `components/ProductList.tsx:16-21` | Estado derivado: `topProducts` se computa de `products + filterText` dentro de `useEffect + setState` — debería ser `useMemo` o computación inline | 2pt |

---

## NIVEL 3 — Avanzado (32 issues)
*Solo un desarrollador con 8+ años de experiencia en producción debería detectar estos.*

| # | Archivo | Issue | Peso de Puntuación |
|---|------|-------|-------------|
| L3-1 | `dashboard/page.tsx` | Sin boundaries `<Suspense>` — todo el dashboard (incluyendo 5,000 productos y el carousel de banners) bloquea el render hasta que TODOS los datos se resuelvan. Cada sección debería hacer streaming independiente. | 3pt |
| L3-2 | `dashboard/layout.tsx:1` | `"use client"` en el layout + importando `Sidebar` y `Header` desde barrel — fuerza todo el subtree del dashboard al client bundle, eliminando los beneficios de RSC | 3pt |
| L3-3 | `components/index.ts` | Barrel file re-exporta todo incluyendo `ProductCatalog` (5,000 items) y `HeroBanner` (carousel con múltiples imágenes) — **mata el tree-shaking**, aumenta el tamaño del bundle de cualquier página que importe aunque sea un solo componente desde este archivo | 3pt |
| L3-4 | `components/HeroBanner.tsx:52-60` | **Stale closure bug** — `handleNext` se define sin `useCallback` y el `useEffect` del autoplay no incluye `handleNext` en sus dependencias. Esto causa que el interval use una versión stale de la función, potencialmente saltando slides o comportamiento errático | 3pt |
| L3-5 | `components/HeroBanner.tsx:42-44` | `handleNext`/`handlePrev` sin `useCallback` — se recrean en cada render, causando re-renders innecesarios si se pasaran a componentes hijos memoizados | 1pt |
| L3-6 | `components/HeroBanner.tsx:73` | `key={index}` en lugar de `key={slide.id}` — anti-patrón de React que causa problemas de reconciliación si el orden de slides cambia | 2pt |
| L3-6a | `components/HeroBanner.tsx:88-92` | **Gradiente overlay con inline style** — `style={{ background: "linear-gradient(...)" }}` en lugar de usar clases Tailwind `bg-gradient-to-b from-transparent to-black/70` | 1pt |
| L3-6b | `components/HeroBanner.tsx:106-119` | **Inline styles en botones de navegación** — `style={{ top: "50%", transform: "translateY(-50%") }}` en lugar de usar clases Tailwind `top-1/2 -translate-y-1/2` | 1pt |
| L3-6c | `components/HeroBanner.tsx:121` | **Inline style en contenedor de indicadores** — `style={{ left: "50%", transform: "translateX(-50%)" }}` en lugar de clases Tailwind `left-1/2 -translate-x-1/2` | 1pt |
| L3-7 | `components/HeroBanner.tsx` | **Carousel sin atributos de accesibilidad** — faltan `aria-label`, `aria-roledescription="carousel"`, `aria-roledescription="slide"`, `aria-hidden` en slides inactivos, y `aria-current` en indicadores. Los botones de navegación tampoco tienen `aria-label` | 2pt |
| L3-8 | `components/HeroBanner.tsx` | **Imágenes del carousel sin lazy loading** — las 3 imágenes cargan simultáneamente en el LCP, sin `loading="lazy"` ni estrategia de carga progresiva. Todas las slides excepto la primera deberían cargar lazy | 2pt |
| L3-9 | `components/HeroBanner.tsx` | No hay pausa del autoplay cuando la pestaña está oculta (`document.visibilitychange`) — el carousel continúa rotando en background tabs, desperdiciando ciclos de CPU | 2pt |
| L3-10 | `components/HeroBanner.tsx` | No hay gesto de swipe táctil para navegación mobile — UX pobre en dispositivos táctiles | 1pt |
| L3-11 | `components/HeroBanner.tsx` | Sin `prefers-reduced-motion` — el autoplay y las transiciones pueden causar mareo en usuarios con sensibilidad al movimiento | 2pt |
| L3-12 | `components/HeroBanner.tsx` | Las transiciones CSS usan `duration-700` que puede sentirse lenta. Sin easing personalizado para transiciones más naturales | 1pt |
| L3-13 | `components/MetricsCards.tsx:19-26` | Layout thrashing: lee `ref.current.offsetHeight` (fuerza layout) luego escribe `ref.current.style.minHeight` en el mismo bloque síncrono dentro de un `useEffect` — causa forced reflow | 3pt |
| L3-14 | `components/OrdersTable.tsx:43-50` | `.sort()` muta el array `filteredOrders` in-place — en React 19 concurrent mode, esto puede causar inconsistencias visuales porque el mismo array se comparte entre render passes | 3pt |
| L3-15 | `components/ProductCard.tsx:30-42` | `new IntersectionObserver()` creado **por tarjeta** — con 5,000 tarjetas, esto registra 5,000 observers simultáneamente. Sin `observer.disconnect()` en cleanup → **massive memory leak** | 3pt |
| L3-16 | `components/ProductCard.tsx:20-23` | `allProducts.find(p => p.id === product.id)` llamado dentro de cada render de cada tarjeta — búsqueda O(n) × 5,000 tarjetas = O(n²) en cada ciclo de render | 3pt |
| L3-17 | `components/ProductCatalog.tsx:91-97` | `calcularDescuento()` llamado dentro de `.map()` en cada render — 5,000 × cálculo costoso en cada tecla. Debería estar memoizado por producto. | 2pt |
| L3-18 | `components/ProductCatalog.tsx` | Sin virtualización (sin `react-window`, `react-virtuoso`, o paginación con `IntersectionObserver`) — los 5,000 nodos DOM renderizados simultáneamente → **congelamiento del browser** | 3pt |
| L3-19 | `components/ProductCatalog.tsx` | Sin `startTransition` para diferir el re-render pesado de filter/sort — la UI se bloquea y no responde durante el re-render de 5,000 items | 3pt |
| L3-20 | `components/ProductCatalog.tsx` | Los 5,000 tags `<img>` cargan simultáneamente — sin `loading="lazy"` o carga batcheada → **network waterfall con 5,000 requests de imagen concurrentes** | 2pt |
| L3-21 | `components/ProductList.tsx:36-39` | Input mezclado controlled/uncontrolled: `ref` + `defaultValue` + `onChange` llamando `setState`. El input es uncontrolled (`defaultValue`) pero el parent maneja el estado `filterText` — React advertirá y el comportamiento es indefinido | 3pt |
| L3-22 | `components/SearchFilter.tsx:37-43` | `useEffect` dispara en cada cambio de prop `onFilterChange` — pero `onFilterChange` es una nueva referencia de función cada render (no memoizado en el parent) → **disparador de infinite render loop** | 3pt |
| L3-23 | `hooks/useProductFilters.ts:79` | El array `products` en la dependencia del `useEffect` es una prop — si el parent pasa `ALL_PRODUCTS` inline, se crea una nueva referencia de array cada render → **infinite loop** | 3pt |
| L3-24 | `hooks/usePolling.ts:14-33` | `setInterval` no pausa cuando la pestaña está oculta (`document.visibilityState === 'hidden'`) — continúa disparando API calls en pestañas de background, desperdiciando ancho de banda y batería | 2pt |
| L3-25 | `hooks/usePolling.ts` | El estado `isPolling` se trackea pero el `setInterval` **no es condicional a esto** — llamar `stopPolling()` cambia el estado pero no detiene realmente el interval | 3pt |
| L3-26 | `actions/dashboard.ts:8` | Variable mutable `requestCount` a nivel de módulo en una Server Action — **no idempotente**. En despliegues serverless/edge este contador se resetea por instancia y por cold start, haciendo que el count loggeado sea sin sentido y engañoso. Cada invocación tiene side effects más allá de su propósito declarado. | 3pt |
| L3-27 | `middleware.ts` | El patrón `matcher` `/((?!_next/static|_next/image|favicon.ico).*)` aún ejecuta el middleware en **todas las rutas API, todas las rutas de página, y todos los paths no excluidos incluyendo fonts y manifests** — debería estar scopeado solo a las rutas que lo necesitan (ej. solo `/dashboard/*`) | 2pt |
| L3-28 | `components/Header.tsx:10-15` | `new Date().toLocaleString()` llamado durante el render — esta es una **función impura** que produce output diferente en server vs client → error de **hydration mismatch**. Debe envolverse en `useEffect` o usar `suppressHydrationWarning`. | 3pt |
| L3-29 | `dashboard/page.tsx` | Faltan archivos `loading.tsx` y `error.tsx` en el directorio `dashboard/` — no hay loading UI durante la navegación, ni error boundary para fetches fallidos. En producción, cualquier fallo de fetch crashea toda la ruta silenciosamente. | 2pt |

---

## Guía de Puntuación

| Puntaje | Evaluación |
|-------|-----------|
| 0–10 pts | Nivel Mid (3–4 años) |
| 11–25 pts | Tendencia a Senior (5–6 años) |
| 26–45 pts | Senior (7–8 años) |
| 46–70 pts | Staff-level (8+ años, conocimiento profundo de Next.js/React) |

### Puntos Extra (a discreción del entrevistador)
- **+3pt** El candidato propone `react-virtuoso` o `react-window` con un sketch de implementación concreto
- **+3pt** El candidato explica el modelo de boundaries RSC y cómo correctamente dividir client/server en `layout.tsx`
- **+3pt** El candidato menciona `useOptimistic` o features concurrentes como fix para el gap de `startTransition`
- **+2pt** El candidato nota que `useDashboard.ts` existe pero **nunca se usa** (dead code)
- **+2pt** El candidato explica que el issue del barrel file puede mitigarse parcialmente con `/* @__PURE__ */` o imports basados en path

---

## Red Flags Clave Durante la Sesión

- El candidato solo encuentra issues visuales/estilísticos → no es nivel senior
- El candidato encuentra bugs pero no puede explicar **por qué** son bugs → conocimiento superficial
- El candidato propone refactor a WebSocket sin ser preguntado → scope creep, mala priorización
- El candidato no menciona `Suspense`/streaming en absoluto → falta conocimiento core de Next.js 13+
- El candidato se enfoca solo en nombres en español sin encontrar issues de rendimiento → no ve el bosque por los árboles

## Señales Positivas Fuertes

- Menciona `startTransition` + virtualización juntas como el fix compuesto para `ProductCatalog`
- Identifica el hydration mismatch en `Header.tsx` sin ejecutar la app
- Explica el memory leak de IntersectionObserver × 5,000 como un problema de registro O(n) de observers
- Propone `useMemo` para datos derivados Y explica por qué `useEffect + setState` es un anti-pattern para estado derivado síncrono
- Identifica que el matcher del middleware corre en assets estáticos y explica el costo de rendimiento
