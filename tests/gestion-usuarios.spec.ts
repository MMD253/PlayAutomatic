import { test, expect } from '@playwright/test';
import { TEST_CONFIG } from './utils/config';
import { login } from './utils/helpers';

test.describe('Suite de pruebas de Gestión de Usuarios', () => {
    test.beforeEach(async ({ page }) => {
        // Realizar login antes de cada prueba
        await page.goto(TEST_CONFIG.routes.login);
        await login(page);
        
        // Navegar a la página de gestión de usuarios
        await page.goto('http://innova.demo.tipsalud.local/Comun/AdministracionUsuarios/Inicio/GestionUsuario');
        // Esperar a que la página esté completamente cargada
        await Promise.all([
            page.waitForLoadState('networkidle'),
            page.waitForLoadState('domcontentloaded')
        ]);
    });

    test('Verificar carga de página de gestión de usuarios', async ({ page }) => {
        // Verificar que estamos en la página correcta
        await expect(page).toHaveURL(/GestionUsuario$/);
        
        // Verificar que la tabla de usuarios está presente (usando múltiples selectores posibles)
        const tablaUsuarios = page.locator('table, .grid-usuarios, #gridUsuarios, .tabla-usuarios').first();
        await expect(tablaUsuarios).toBeVisible();
        
        // Tomar captura de pantalla
        await page.screenshot({ path: './screenshots/gestion-usuarios.png', fullPage: true });
    });

    test('Buscar usuario existente', async ({ page }) => {
        // Buscar un usuario (usando múltiples selectores posibles)
        const searchInput = page.locator('input[type="search"], input[placeholder*="Buscar"], input[placeholder*="buscar"], input[placeholder*="Filtrar"]').first();
        await expect(searchInput).toBeVisible();
        await searchInput.fill('admin');
        await searchInput.press('Enter');
        
        // Esperar a que se actualicen los resultados
        await page.waitForLoadState('networkidle');
        
        // Verificar que hay resultados (usando múltiples selectores posibles)
        const resultados = page.locator('tr:not(:first-child), .fila-usuario, .grid-row').first();
        await expect(resultados).toBeVisible();
    });

    test('Crear nuevo usuario', async ({ page }) => {
        // Buscar y hacer clic en el botón de nuevo usuario (usando múltiples selectores posibles)
        const btnNuevo = page.locator('button:has-text("Nuevo"), button:has-text("Agregar"), button:has-text("Crear")').first();
        await expect(btnNuevo).toBeVisible();
        await btnNuevo.click();
        
        // Esperar a que se abra el formulario
        await page.waitForLoadState('networkidle');
        
        // Llenar el formulario (usando selectores más flexibles)
        await page.fill('input[name*="nombre" i], input[placeholder*="nombre" i]', 'Usuario Test');
        await page.fill('input[name*="usuario" i], input[placeholder*="usuario" i]', 'test_user');
        await page.fill('input[type="email"], input[name*="email" i], input[placeholder*="email" i]', 'test@example.com');
        await page.fill('input[type="password"], input[name*="password" i], input[placeholder*="contraseña" i]', 'Test123!');
        
        // Seleccionar rol (usando selectores más flexibles)
        const selectRol = page.locator('select[name*="rol" i], select[id*="rol" i]').first();
        await selectRol.selectOption({ label: 'Usuario' });
        
        // Guardar (usando múltiples selectores posibles)
        const btnGuardar = page.locator('button:has-text("Guardar"), button:has-text("Aceptar"), button[type="submit"]').first();
        await btnGuardar.click();
        
        // Verificar mensaje de éxito (usando múltiples selectores posibles)
        const mensajeExito = page.locator('.mensaje-exito, .alert-success, .notification-success, [role="alert"]').first();
        await expect(mensajeExito).toBeVisible({ timeout: 10000 });
    });

    test('Editar usuario existente', async ({ page }) => {
        // Buscar usuario
        const searchInput = page.locator('input[type="search"], input[placeholder*="Buscar"], input[placeholder*="buscar"], input[placeholder*="Filtrar"]').first();
        await searchInput.fill('test_user');
        await searchInput.press('Enter');
        
        // Esperar y hacer clic en el usuario (usando múltiples selectores posibles)
        const filaUsuario = page.locator('tr:has-text("test_user"), .fila-usuario:has-text("test_user")').first();
        await expect(filaUsuario).toBeVisible();
        await filaUsuario.click();
        
        // Modificar email
        const emailInput = page.locator('input[type="email"], input[name*="email" i], input[placeholder*="email" i]').first();
        await emailInput.fill('test_modified@example.com');
        
        // Guardar cambios
        const btnGuardar = page.locator('button:has-text("Guardar"), button:has-text("Aceptar"), button[type="submit"]').first();
        await btnGuardar.click();
        
        // Verificar mensaje de éxito
        const mensajeExito = page.locator('.mensaje-exito, .alert-success, .notification-success, [role="alert"]').first();
        await expect(mensajeExito).toBeVisible({ timeout: 10000 });
    });

    test('Eliminar usuario', async ({ page }) => {
        // Buscar usuario
        const searchInput = page.locator('input[type="search"], input[placeholder*="Buscar"], input[placeholder*="buscar"], input[placeholder*="Filtrar"]').first();
        await searchInput.fill('test_user');
        await searchInput.press('Enter');
        
        // Esperar y hacer clic en eliminar (usando múltiples selectores posibles)
        const btnEliminar = page.locator('button:has-text("Eliminar"), button:has-text("Borrar"), .btn-delete').first();
        await expect(btnEliminar).toBeVisible();
        await btnEliminar.click();
        
        // Confirmar eliminación (usando múltiples selectores posibles)
        const btnConfirmar = page.locator('button:has-text("Confirmar"), button:has-text("Sí"), button:has-text("Aceptar")').first();
        await expect(btnConfirmar).toBeVisible();
        await btnConfirmar.click();
        
        // Verificar mensaje de éxito
        const mensajeExito = page.locator('.mensaje-exito, .alert-success, .notification-success, [role="alert"]').first();
        await expect(mensajeExito).toBeVisible({ timeout: 10000 });
    });

    test('Validar campos requeridos', async ({ page }) => {
        // Hacer clic en nuevo usuario
        const btnNuevo = page.locator('button:has-text("Nuevo"), button:has-text("Agregar"), button:has-text("Crear")').first();
        await btnNuevo.click();
        
        // Intentar guardar sin llenar campos
        const btnGuardar = page.locator('button:has-text("Guardar"), button:has-text("Aceptar"), button[type="submit"]').first();
        await btnGuardar.click();
        
        // Verificar mensajes de validación (usando selectores más flexibles)
        const camposRequeridos = page.locator('input:invalid, .campo-requerido, .is-invalid, [aria-invalid="true"]');
        const count = await camposRequeridos.count();
        expect(count).toBeGreaterThan(0);
    });

    test('Verificar paginación', async ({ page }) => {
        // Verificar elementos de paginación (usando múltiples selectores posibles)
        const paginacion = page.locator('.paginacion, .pagination, nav[aria-label*="paginación" i]').first();
        await expect(paginacion).toBeVisible();
        
        // Cambiar de página (usando múltiples selectores posibles)
        const segundaPagina = page.locator('.paginacion >> button:has-text("2"), .pagination >> button:has-text("2"), [aria-label="Página 2"]').first();
        await expect(segundaPagina).toBeVisible();
        await segundaPagina.click();
        
        // Verificar que se cargaron nuevos datos
        await page.waitForLoadState('networkidle');
        const tablaUsuarios = page.locator('table, .grid-usuarios, #gridUsuarios, .tabla-usuarios').first();
        await expect(tablaUsuarios).toBeVisible();
    });
}); 