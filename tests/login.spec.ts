import { test, expect } from '@playwright/test';
import { TEST_CONFIG } from './utils/config';
import { login } from './utils/helpers';

test.describe('Suite de pruebas de Login', () => {
    test('Login exitoso con credenciales válidas', async ({ page }) => {
        // Navegar a la página de login
        await page.goto(TEST_CONFIG.routes.login);
        
        // Verificar que estamos en la página de login
        await expect(page).toHaveURL(/login$/);
        
        // Realizar el login
        await login(page);
        
        // Verificar que fuimos redirigidos al dashboard
        await expect(page).toHaveURL(/Dashboard$/);
        
        // Verificar que elementos del dashboard están presentes
        await expect(page.locator('.main-content')).toBeVisible();
    });

    test('Login fallido con credenciales inválidas', async ({ page }) => {
        // Navegar a la página de login
        await page.goto(TEST_CONFIG.routes.login);
        
        // Intentar login con credenciales incorrectas
        await login(page, 'usuario_incorrecto', 'contraseña_incorrecta');
        
        // Verificar que seguimos en la página de login
        await expect(page).toHaveURL(/login$/);
        
        // Verificar que se muestra mensaje de error
        await expect(page.locator('.error-message')).toBeVisible();
    });

    test('Validación de campos requeridos', async ({ page }) => {
        // Navegar a la página de login
        await page.goto(TEST_CONFIG.routes.login);
        
        // Intentar login sin ingresar credenciales
        await page.click('button[type="submit"]');
        
        // Verificar mensajes de validación
        await expect(page.locator('#username:invalid')).toBeVisible();
        await expect(page.locator('#password:invalid')).toBeVisible();
    });
}); 