document.addEventListener('DOMContentLoaded', () => {
    const currentUser = localStorage.getItem('currentUser');
    
    if (!currentUser) {
        alert('No hay usuario autenticado');
        window.location.href = '../index.html';
        return;
    }

    const user = JSON.parse(localStorage.getItem(currentUser));
    document.getElementById('username').textContent = currentUser;
    
    const userDataDiv = document.getElementById('user-data');
    const userData = user.data;

    // Aquí puedes renderizar la información del usuario almacenada en userData
    // Ejemplo: Mostrar todas las transacciones del usuario
    for (const key in userData) {
        if (userData.hasOwnProperty(key)) {
            const div = document.createElement('div');
            div.textContent = `${key}: ${userData[key]}`;
            userDataDiv.appendChild(div);
        }
    }
});
