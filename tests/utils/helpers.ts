import { Page } from '@playwright/test';
import { TEST_CONFIG } from './config';

export async function login(page: Page, username: string = TEST_CONFIG.credentials.username, password: string = TEST_CONFIG.credentials.password) {
    await page.goto(TEST_CONFIG.routes.login);
    
    // Esperar a que el formulario de login esté visible
    await page.waitForSelector('form', { state: 'visible' });
    
    // Ingresar credenciales
    await page.fill('input[name="Usuario"]', username);
    await page.fill('input[name="Password"]', password);
    
    // Hacer clic en el botón de login
    await page.click('button[type="submit"]');
    
    // Esperar a que la navegación se complete
    await page.waitForLoadState('networkidle');
}

export async function logout(page: Page) {
    // Realizar la petición de logout
    const response = await page.goto(TEST_CONFIG.routes.logout);
    
    // Verificar que la respuesta fue exitosa
    if (response && !response.ok()) {
        throw new Error(`Logout failed with status ${response.status()}`);
    }
    
    // Esperar a que la navegación se complete
    await page.waitForLoadState('networkidle');
    
    // Verificar que fuimos redirigidos a la página de login
    await page.waitForURL(/Login$/);
}

export async function navigateToDashboard(page: Page) {
    await page.goto(TEST_CONFIG.routes.dashboard);
    await page.waitForLoadState('networkidle');
}

export async function takeScreenshot(page: Page, name: string) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await page.screenshot({ 
        path: `./screenshots/${name}-${timestamp}.png`,
        fullPage: true 
    });
}

export async function waitForPageLoad(page: Page) {
    await Promise.all([
        page.waitForLoadState('domcontentloaded'),
        page.waitForLoadState('networkidle'),
    ]);
} 