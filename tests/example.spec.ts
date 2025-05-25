import { test, expect } from '@playwright/test';

test('ejemplo básico', async ({ page }) => {
  // Navegar a Google
  await page.goto('https://www.google.com');

  // Verificar que el título contiene "Google"
  await expect(page).toHaveTitle(/Google/);

  // Escribir en el campo de búsqueda
  const searchInput = await page.locator('textarea[name="q"]');
  await searchInput.click();
  await searchInput.fill('Playwright testing');

  // Presionar Enter
  await page.keyboard.press('Enter');

  // Verificar que estamos en la página de resultados
  await expect(page).toHaveURL(/search/);
}); 