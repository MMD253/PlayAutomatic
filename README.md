# Pruebas Automatizadas con Playwright

Este proyecto contiene pruebas automatizadas para la aplicación Innova TipSalud utilizando Playwright.

## Requisitos Previos

- Node.js (versión 14 o superior)
- npm (incluido con Node.js)
- Acceso a la aplicación Innova TipSalud

## Instalación

1. Clonar el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
```

2. Instalar dependencias:
```bash
npm install
```

3. Instalar navegadores de Playwright:
```bash
npx playwright install
```

## Estructura del Proyecto

- `tests/` - Directorio principal de pruebas
  - `login.spec.ts` - Pruebas de login
  - `logout.spec.ts` - Pruebas de logout
  - `home.spec.ts` - Pruebas de la página principal
  - `utils/` - Utilidades y configuración
    - `config.ts` - Configuración general
    - `helpers.ts` - Funciones auxiliares

## Ejecución de Pruebas

### Ejecutar todas las pruebas:
```bash
npx playwright test
```

### Ejecutar pruebas específicas:
```bash
npx playwright test tests/login.spec.ts
npx playwright test tests/home.spec.ts
```

### Ejecutar pruebas en modo UI:
```bash
npx playwright test --ui
```

### Ejecutar pruebas con interfaz visual:
```bash
npx playwright test --headed
```

## Configuración

Ajustar las credenciales y URLs en el archivo `tests/utils/config.ts` según el ambiente de pruebas.

## Reportes

Los reportes de las pruebas se generan automáticamente y se pueden encontrar en:
- HTML: `playwright-report/index.html`
- Screenshots: `screenshots/`
- Videos (en caso de fallo): `test-results/` 