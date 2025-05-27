export const TEST_CONFIG = {
    // URLs
    baseUrl: 'http://innova.demo.tipsalud.local',
    
    // Timeouts
    defaultTimeout: 30000,
    
    // Credenciales
    credentials: {
        username: 'administrador',
        password: 'administrador'  // Ajusta esto según la contraseña correcta
    },
    
    // Rutas principales
    routes: {
        login: '/Home/Inicio/Home/Login',
        dashboard: '/Home/Inicio/Home/Dashboard',
        logout: '/Home/BackEnd/api/Logout/Submit',
        gestionUsuarios: '/Comun/AdministracionUsuarios/Inicio/GestionUsuario'
    }
}; 

