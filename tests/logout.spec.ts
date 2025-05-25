import { test, expect } from '@playwright/test';
import { login, logout } from './utils/helpers';
import { TEST_CONFIG } from './utils/config';

test.describe('Suite de pruebas de Logout', () => {
    test('Logout exitoso después de login', async ({ page }) => {
        // Realizar login primero
        await login(page);
        
        // Verificar que estamos en el dashboard
        await expect(page).toHaveURL(/Dashboard$/);
        
        // Realizar logout
        await logout(page);
        
        // Verificar que fuimos redirigidos a la página de login
        await expect(page).toHaveURL(/Login$/);
        
        // Intentar acceder al dashboard después del logout
        await page.goto(TEST_CONFIG.routes.dashboard);
        
        // Verificar que somos redirigidos al login
        await expect(page).toHaveURL(/Login$/);
    });
}); 