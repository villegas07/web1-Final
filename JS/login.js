document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    console.log(`Intentando iniciar sesión con usuario: ${username}`);

    // Definición de usuarios y contraseñas
    const users = {
        admin: 'admin',
        usuario: 'usuario'
    };

    if (username in users && users[username] === password) {
        localStorage.setItem('currentUser', username);
        alert('Inicio de sesión exitoso');

        if (username === 'admin') {
            console.log('Redirigiendo a HTML/Inicio.html');
            window.location.href = 'HTML/Inicio.html';
        } else {
            console.log('Redirigiendo a HTML/option.html');
            window.location.href = 'HTML/option.html';
        }
    } else {
        alert('Usuario o contraseña incorrectos');
    }
}
