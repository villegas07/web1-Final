let alerts = JSON.parse(localStorage.getItem('alerts')) || [];
let editingIndex = null;

document.getElementById('guardarBtn').addEventListener('click', function() {
    const tipoAlerta = document.getElementById('tipoAlerta').value;
    const descripcionAlerta = document.getElementById('descripcionAlerta').value;
    const fechaHoraAlerta = document.getElementById('fechaHoraAlerta').value;
    const opcionesRepeticion = document.getElementById('opcionesRepeticion').value;

    if (tipoAlerta && descripcionAlerta && fechaHoraAlerta && opcionesRepeticion) {
        const alert = {
            tipoAlerta,
            descripcionAlerta,
            fechaHoraAlerta,
            opcionesRepeticion
        };

        if (editingIndex !== null) {
            alerts[editingIndex] = alert;
            editingIndex = null;
        } else {
            alerts.push(alert);
        }

        localStorage.setItem('alerts', JSON.stringify(alerts));
        document.getElementById('alertForm').reset();
        renderTable();
    } else {
        alert('Por favor, complete todos los campos.');
    }
});

document.getElementById('consultarBtn').addEventListener('click', function() {
    const tipoAlerta = document.getElementById('tipoAlerta').value;
    if (tipoAlerta) {
        const filteredAlerts = alerts.filter(alert => alert.tipoAlerta === tipoAlerta);
        renderTable(filteredAlerts);
    } else {
        alert('Por favor, ingrese un tipo de alerta para consultar.');
    }
});

function renderTable(filteredAlerts = alerts) {
    const tableContainer = document.getElementById('tableContainer');
    const alertsTable = document.getElementById('alertsTable');

    alertsTable.innerHTML = '';
    filteredAlerts.forEach((alert, index) => {
        const row = alertsTable.insertRow();
        row.innerHTML = `
            <td>${alert.tipoAlerta}</td>
            <td>${alert.descripcionAlerta}</td>
            <td>${alert.fechaHoraAlerta}</td>
            <td>${alert.opcionesRepeticion}</td>
            <td>
                <button class="bg-green-500" onclick="editRow(${index})">Editar</button>
                <button class="bg-red-500" onclick="deleteRow(${index})">Eliminar</button>
            </td>
        `;
    });

    tableContainer.style.display = filteredAlerts.length > 0 ? 'block' : 'none';
}

function editRow(index) {
    const alert = alerts[index];
    document.getElementById('tipoAlerta').value = alert.tipoAlerta;
    document.getElementById('descripcionAlerta').value = alert.descripcionAlerta;
    document.getElementById('fechaHoraAlerta').value = alert.fechaHoraAlerta;
    document.getElementById('opcionesRepeticion').value = alert.opcionesRepeticion;
    editingIndex = index;
}

function deleteRow(index) {
    alerts.splice(index, 1);
    localStorage.setItem('alerts', JSON.stringify(alerts));
    renderTable();
}

// Renderizar la tabla al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    renderTable();
});
