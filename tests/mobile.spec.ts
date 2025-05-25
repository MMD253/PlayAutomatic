import { test, expect } from '@playwright/test';

// Test que solo se ejecutará en proyectos móviles
test('prueba móvil básica', async ({ page, isMobile }) => {
  // Navegar a Google
  await page.goto('https://www.google.com');

  // Verificar que estamos en la versión móvil
  const userAgent = await page.evaluate(() => navigator.userAgent);
  expect(userAgent).toContain('Mobile');

  // Buscar en Google
  const searchInput = await page.locator('textarea[name="q"]');
  await searchInput.click();
  await searchInput.fill('Playwright mobile testing');

  // Presionar Enter
  await page.keyboard.press('Enter');

  // Verificar que estamos en la página de resultados
  await expect(page).toHaveURL(/search/);

  // Tomar una captura de pantalla
  await page.screenshot({ path: `./screenshots/mobile-search-${Date.now()}.png` });
}); 