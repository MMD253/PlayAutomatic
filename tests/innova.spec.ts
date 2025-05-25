import { test, expect } from '@playwright/test';

test.describe('Suite de pruebas Innova TipSalud', () => {
  test.beforeEach(async ({ page }) => {
    // Navegar a la página de inicio antes de cada prueba
    await page.goto('/Home/Inicio/Home/Dashboard');
  });

  test('Verificar carga de página de inicio', async ({ page }) => {
    // Verificar que estamos en la página correcta
    await expect(page).toHaveURL(/Dashboard$/);
    
    // Tomar captura de pantalla de la página
    await page.screenshot({ path: './screenshots/dashboard.png', fullPage: true });
  });

  test('Verificar elementos principales del Dashboard', async ({ page }) => {
    // Esperar a que la página cargue completamente
    await page.waitForLoadState('networkidle');

    // Verificar elementos críticos (ajusta los selectores según la estructura real de tu página)
    const mainContent = await page.locator('.main-content').isVisible();
    expect(mainContent).toBeTruthy();
  });

  test('Prueba de navegación básica', async ({ page }) => {
    // Esperar a que la página cargue
    await page.waitForLoadState('networkidle');

    // Ejemplo de navegación (ajusta según la estructura real de tu aplicación)
    // Aquí puedes agregar clicks a menús, navegación entre secciones, etc.
    
    // Verificar que podemos interactuar con elementos de navegación
    const menuItems = await page.locator('.nav-item').count();
    expect(menuItems).toBeGreaterThan(0);
  });
}); 