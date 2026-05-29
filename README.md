# ShopMetrics — Dashboard de Analytics E-commerce

> **Evaluación Técnica — Senior Frontend Engineer**

## Contexto

ShopMetrics es un dashboard interno de analytics que actualmente se ejecuta en producción para una empresa de e-commerce de tamaño mediano (~50k usuarios activos mensuales). El equipo de ingeniería heredó este código después de una ronda de desarrollo rápido y actualmente está enfrentando quejas de rendimiento tanto de usuarios como del equipo de operaciones.

**Síntomas reportados por el sistema de monitoreo en producción:**

- El dashboard tarda demasiado en volverse interactivo después de la carga inicial
- La sección del catálogo de productos hace que el navegador se congele al hacer scroll
- El banner principal causa cambios visibles en el layout en conexiones lentas
- Algunos usuarios reportan que la página se siente lenta cada vez que escriben en la caja de búsqueda

---

## Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| Lenguaje | TypeScript 5.x |
| Estilos | TailwindCSS v4 |

---

## Instalación

### Requisitos

- Node.js 20+
- npm 10+

### Pasos

```bash
# 1. Clonar el repositorio
git clone <repo-url>
cd challenge-senior

# 2. Instalar dependencias
npm install

# 3. Copiar variables de entorno
cp .env.local.example .env.local

# 4. Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) — serás redirigido automáticamente al dashboard.

---

## Estructura del Proyecto

A continuación se describe la organización del código. **Nota:** Los nombres de archivos se mantienen en inglés siguiendo las convenciones del proyecto, pero las descripciones indican la función de cada uno.

```
src/
├── app/
│   ├── layout.tsx                  # Layout raíz de la aplicación
│   ├── page.tsx                    # Redirección a /dashboard
│   ├── globals.css                 # Estilos globales
│   └── dashboard/
│       ├── page.tsx                # Página principal del dashboard
│       ├── layout.tsx              # Shell del dashboard (sidebar + header)
│       ├── components/             # Componentes de UI
│       ├── hooks/                  # Hooks personalizados de React
│       ├── context/                # Contextos de React
│       ├── types/                  # Tipos de TypeScript
│       ├── utils/                  # Funciones auxiliares y formateadores
│       └── actions/                # Server Actions de Next.js
├── middleware.ts                   # Middleware de Next.js
└── data/
    └── mock-data.ts                # Datos de prueba (5,000 productos)
```

### ¿Qué encontrarás en cada directorio?

- **`app/`**: Contiene la estructura de rutas de Next.js App Router. El dashboard es la funcionalidad principal.
- **`app/dashboard/components/`**: Todos los componentes visuales como tarjetas de productos, gráficos, tablas, etc.
- **`app/dashboard/hooks/`**: Lógica reutilizable extraída en hooks personalizados.
- **`app/dashboard/context/`**: Estado global compartido entre componentes mediante React Context.
- **`app/dashboard/utils/`**: Funciones auxiliares para formateo de datos, cálculos, etc.
- **`app/dashboard/actions/`**: Funciones de servidor para operaciones asíncronas.
- **`data/`**: Datos mock extensos para simular el comportamiento con volumen real.

---

## Tu Misión

Este codebase contiene **problemas de rendimiento, bugs funcionales y anti-patrones** que debes identificar. No se te indicará exactamente dónde están — parte de la evaluación es tu capacidad de auditoría y análisis del código.

### Lo que debes hacer:

1. **Ejecutar la aplicación** y observar su comportamiento, interacciones y rendimiento percibido
2. **Revisar el código sistemáticamente** — componentes, hooks, utilidades, configuración
3. **Identificar problemas** en las siguientes categorías:
   - Bugs funcionales (cosas que no funcionan como deberían)
   - Problemas de rendimiento (renderizados innecesarios, bloqueos, lentitud)
   - Anti-patrones de React/Next.js
   - Problemas de calidad de código y mantenibilidad
   - Problemas de accesibilidad o UX

4. **Documentar cada hallazgo**:
   - ¿Cuál es el problema?
   - ¿Por qué es un problema?
   - ¿Cómo lo solucionarías?

5. **Solucionar los problemas críticos** que identifiques — implementa los fixes directamente en el código, priorizando aquellos que afecten rendimiento, funcionalidad o estabilidad

6. **Crear una rama** (`feat/review-<tu-nombre>`) y subir tus hallazgos:
   - Fixes de código donde tengas tiempo de implementarlos
   - Comentarios en el código para issues identificados pero que no pudiste arreglar completamente
   - Un resumen escrito en un archivo `FINDINGS.md` en la raíz

### Criterios de Evaluación

| Área | Qué evaluamos |
|------|---------------|
| **Detección de Bugs** | Precisión al identificar problemas reales |
| **Profundidad** | Análisis superficial vs. causa raíz |
| **Priorización** | ¿Puedes distinguir entre issues críticos y cosméticos? |
| **Soluciones** | ¿Son tus propuestas precisas e idiomáticas? |
| **Comunicación** | Claridad de tus explicaciones |

> **Tip:** Los problemas existen en múltiples niveles de sutileza. Algunos son visiblemente obvios en el navegador. Otros solo se manifiestan bajo condiciones específicas o a escala. Apunta a ir más allá de lo evidentemente roto.

---

## Scripts Disponibles

```bash
npm run dev      # Iniciar servidor de desarrollo
npm run build    # Build de producción
npm run lint     # Ejecutar ESLint
```
