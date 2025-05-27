import { Page, expect } from '@playwright/test';
import { TEST_CONFIG } from './config';

export async function login(page: Page, username: string = TEST_CONFIG.credentials.username, password: string = TEST_CONFIG.credentials.password) {
    try {
        console.log('Iniciando proceso de login...');
        
        // Navegar a la página de login si no estamos en ella
        const loginUrl = TEST_CONFIG.baseUrl + TEST_CONFIG.routes.login;
        console.log(`Navegando a ${loginUrl}`);
        
        await page.goto(loginUrl);
        await page.waitForLoadState('domcontentloaded');
        
        console.log('Página cargada, tomando captura de pantalla...');
        await page.screenshot({ path: './screenshots/login-page.png' });
        
        // Esperar y verificar que el formulario de login esté visible
        console.log('Buscando formulario de login...');
        const formSelectors = ['form', '#loginForm', '.login-form', '#form1'];
        console.log(`Intentando selectores de formulario: ${formSelectors.join(', ')}`);
        
        const form = page.locator(formSelectors.join(', ')).first();
        await expect(form).toBeVisible({ timeout: 20000 });
        
        // Buscar el campo de usuario
        console.log('Buscando campo de usuario...');
        const userSelectors = [
            'input[name="NombreDeUsuario"]',
            'input[name="Usuario"]',
            'input[name="UserName"]',
            'input[type="text"]',
            'input[placeholder*="usuario" i]',
            'input[placeholder*="user" i]',
            '#NombreDeUsuario'
        ];
        console.log(`Intentando selectores de usuario: ${userSelectors.join(', ')}`);
        
        const userField = page.locator(userSelectors.join(', ')).first();
        await expect(userField).toBeVisible({ timeout: 20000 });
        
        // Buscar el campo de contraseña
        console.log('Buscando campo de contraseña...');
        const passwordSelectors = [
            'input[name="Password"]',
            'input[name="Contrasena"]',
            'input[name="Clave"]',
            'input[type="password"]',
            'input[placeholder*="contraseña" i]',
            'input[placeholder*="password" i]',
            '#Password'
        ];
        console.log(`Intentando selectores de contraseña: ${passwordSelectors.join(', ')}`);
        
        const passwordField = page.locator(passwordSelectors.join(', ')).first();
        await expect(passwordField).toBeVisible({ timeout: 20000 });
        
        // Llenar los campos
        console.log('Llenando campos del formulario...');
        await userField.fill(username);
        await passwordField.fill(password);
        
        // Tomar captura después de llenar los campos
        await page.screenshot({ path: './screenshots/login-filled.png' });
        
        // Buscar el botón de login
        console.log('Buscando botón de login...');
        const buttonSelectors = [
            '[data-automation="IniciarSesionBtn"]',
            'button[type="submit"]',
            'button:has-text("Iniciar")',
            'button:has-text("Login")',
            'button:has-text("Ingresar")',
            'input[type="submit"]',
            '#btnLogin',
            'button.btn-primary'
        ];
        console.log(`Intentando selectores de botón: ${buttonSelectors.join(', ')}`);
        
        const loginButton = page.locator(buttonSelectors.join(', ')).first();
        await expect(loginButton).toBeVisible({ timeout: 20000 });
        
        // Hacer clic en el botón
        console.log('Haciendo clic en el botón de login...');
        await loginButton.click();
        
        // Esperar la navegación
        console.log('Esperando navegación después del login...');
        await page.waitForLoadState('networkidle', { timeout: 30000 });
        
        // Verificar que el login fue exitoso
        console.log('Verificando login exitoso...');
        const mainSelectors = ['.main-content', '#main', '.dashboard-content', '.content-wrapper', '#content'];
        const mainContent = page.locator(mainSelectors.join(', ')).first();
        await expect(mainContent).toBeVisible({ timeout: 30000 });
        
        // Tomar captura del dashboard
        await page.screenshot({ path: './screenshots/dashboard.png' });
        console.log('Login completado exitosamente');
        
    } catch (error) {
        console.error('Error durante el proceso de login:', error);
        await page.screenshot({ path: './screenshots/login-error.png' });
        throw error;
    }
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