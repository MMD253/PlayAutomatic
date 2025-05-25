import { test, expect } from '@playwright/test';
import { login } from './utils/helpers';

test.describe('Suite de pruebas de Home/Dashboard', () => {
    // Hacer login antes de cada prueba
    test.beforeEach(async ({ page }) => {
        await login(page);
        // Verificar que estamos en el dashboard
        await expect(page).toHaveURL(/Dashboard$/);
    });

    test('Verificar componentes principales del header', async ({ page }) => {
        // Verificar logo
        await expect(page.locator('.navbar-brand img')).toBeVisible();
        
        // Verificar menú de usuario
        await expect(page.locator('.user-menu')).toBeVisible();
        
        // Verificar nombre de usuario
        await expect(page.locator('.user-name')).toBeVisible();
    });

    test('Verificar menú de navegación principal', async ({ page }) => {
        // Verificar que el menú principal está visible
        await expect(page.locator('.sidebar-menu')).toBeVisible();
        
        // Verificar elementos del menú
        const menuItems = page.locator('.sidebar-menu .nav-item');
        await expect(menuItems).toHaveCount(await menuItems.count());
        
        // Verificar que al menos hay un elemento en el menú
        expect(await menuItems.count()).toBeGreaterThan(0);
    });

    test('Verificar contenido principal del dashboard', async ({ page }) => {
        // Verificar que el contenedor principal está visible
        await expect(page.locator('.main-content')).toBeVisible();
        
        // Verificar título de la página
        await expect(page.locator('h1')).toBeVisible();
        
        // Verificar que hay widgets o paneles en el dashboard
        const dashboardWidgets = page.locator('.widget, .panel, .card');
        await expect(dashboardWidgets).toHaveCount(await dashboardWidgets.count());
        
        // Verificar que hay al menos un widget
        expect(await dashboardWidgets.count()).toBeGreaterThan(0);
    });

    test('Verificar funcionalidad de búsqueda', async ({ page }) => {
        // Verificar que el campo de búsqueda está presente
        const searchInput = page.locator('input[type="search"]');
        await expect(searchInput).toBeVisible();
        
        // Realizar una búsqueda
        await searchInput.fill('test');
        await searchInput.press('Enter');
        
        // Esperar a que los resultados se actualicen
        await page.waitForLoadState('networkidle');
    });

    test('Verificar responsive design', async ({ page }) => {
        // Probar diferentes tamaños de pantalla
        const viewports = [
            { width: 1920, height: 1080 }, // Desktop grande
            { width: 1366, height: 768 },  // Desktop común
            { width: 768, height: 1024 },  // Tablet
            { width: 375, height: 667 }    // Móvil
        ];

        for (const viewport of viewports) {
            await page.setViewportSize(viewport);
            
            // Verificar que el contenido principal es visible
            await expect(page.locator('.main-content')).toBeVisible();
            
            // Verificar menú responsive
            if (viewport.width < 768) {
                // En móvil, verificar que existe el botón de menú
                await expect(page.locator('.navbar-toggle, .menu-toggle')).toBeVisible();
            }
        }
    });

    test('Verificar interactividad de widgets', async ({ page }) => {
        // Obtener todos los widgets interactivos
        const widgets = page.locator('.widget, .panel, .card');
        const count = await widgets.count();

        // Verificar cada widget
        for (let i = 0; i < count; i++) {
            const widget = widgets.nth(i);
            
            // Verificar que el widget es visible
            await expect(widget).toBeVisible();
            
            // Si tiene botones o enlaces, verificar que son interactivos
            const interactiveElements = widget.locator('button, a, .btn');
            const hasInteractive = await interactiveElements.count() > 0;
            
            if (hasInteractive) {
                await expect(interactiveElements.first()).toBeEnabled();
            }
        }
    });
}); 