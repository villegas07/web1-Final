let accounts = JSON.parse(localStorage.getItem('accounts')) || [];
let editingRow = null;

document.getElementById('guardarBtn').addEventListener('click', function() {
    const numeroCuenta = document.getElementById('numeroCuenta').value;
    const nombreBanco = document.getElementById('nombreBanco').value;
    const tipoCuenta = document.getElementById('tipoCuenta').value;
    let saldoActual = parseFloat(document.getElementById('saldoActual').value);
    const estadoCuenta = document.getElementById('estadoCuenta').value;
    const fechaApertura = document.getElementById('fechaApertura').value;
    const descripcion = document.getElementById('descripcion').value;

    if (numeroCuenta && nombreBanco && tipoCuenta && !isNaN(saldoActual) && estadoCuenta && fechaApertura && descripcion) {
        const account = {
            numeroCuenta,
            nombreBanco,
            tipoCuenta,
            saldoActual,
            estadoCuenta,
            fechaApertura,
            descripcion
        };

        if (editingRow) {
            updateRow(editingRow, account);
            editingRow = null;
        } else {
            addRow(account);
        }
        localStorage.setItem('accounts', JSON.stringify(accounts));
        document.getElementById('accountForm').reset();
    } else {
        alert('Por favor, complete todos los campos.');
    }
});

document.getElementById('consultarBtn').addEventListener('click', function() {
    const numeroCuenta = document.getElementById('numeroCuenta').value;
    if (numeroCuenta) {
        consultarPorNumeroCuenta(numeroCuenta);
    } else {
        alert('Por favor, ingrese un número de cuenta para consultar.');
    }
});

function addRow(data) {
    const table = document.getElementById('accountsTable');
    const newRow = table.insertRow();

    newRow.innerHTML = `
        <td>${data.numeroCuenta}</td>
        <td>${data.nombreBanco}</td>
        <td>${data.tipoCuenta}</td>
        <td>${data.saldoActual.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</td>
        <td>${data.estadoCuenta}</td>
        <td>${data.fechaApertura}</td>
        <td>${data.descripcion}</td>
        <td>
            <button class="bg-green-500" onclick="editRow(this)">Editar</button>
            <button class="bg-red-500" onclick="deleteRow(this)">Eliminar</button>
        </td>
    `;

    accounts.push(data);
    localStorage.setItem('accounts', JSON.stringify(accounts));
}

function updateRow(row, data) {
    row.cells[0].innerHTML = data.numeroCuenta;
    row.cells[1].innerHTML = data.nombreBanco;
    row.cells[2].innerHTML = data.tipoCuenta;
    row.cells[3].innerHTML = data.saldoActual.toLocaleString('es-ES', { style: 'currency', currency: 'USD' });
    row.cells[4].innerHTML = data.estadoCuenta;
    row.cells[5].innerHTML = data.fechaApertura;
    row.cells[6].innerHTML = data.descripcion;

    const accountIndex = accounts.findIndex(acc => acc.numeroCuenta === data.numeroCuenta);
    if (accountIndex !== -1) {
        accounts[accountIndex] = data;
        localStorage.setItem('accounts', JSON.stringify(accounts));
    }
}

function editRow(button) {
    editingRow = button.parentElement.parentElement;

    document.getElementById('numeroCuenta').value = editingRow.cells[0].innerHTML;
    document.getElementById('nombreBanco').value = editingRow.cells[1].innerHTML;
    document.getElementById('tipoCuenta').value = editingRow.cells[2].innerHTML;
    document.getElementById('saldoActual').value = editingRow.cells[3].innerHTML.replace(/[^0-9.-]+/g, "");
    document.getElementById('estadoCuenta').value = editingRow.cells[4].innerHTML;
    document.getElementById('fechaApertura').value = editingRow.cells[5].innerHTML;
    document.getElementById('descripcion').value = editingRow.cells[6].innerHTML;
}

function deleteRow(button) {
    const row = button.parentElement.parentElement;
    const numeroCuenta = row.cells[0].innerText;
    accounts = accounts.filter(account => account.numeroCuenta !== numeroCuenta);
    localStorage.setItem('accounts', JSON.stringify(accounts));
    row.remove();
}

function consultarPorNumeroCuenta(numeroCuenta) {
    const table = document.getElementById('accountsTable');
    const rows = table.rows;
    let encontrado = false;

    for (let i = 0; i < rows.length; i++) {
        rows[i].style.display = "none";
    }

    for (let i = 0; i < rows.length; i++) {
        if (rows[i].cells[0].innerText === numeroCuenta) {
            rows[i].style.display = "";
            encontrado = true;
            break;
        }
    }

    if (!encontrado) {
        alert('No se encontró una cuenta con el número especificado.');
    }
}

// Renderizar la tabla al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    const table = document.getElementById('accountsTable');
    accounts.forEach(account => {
        const row = table.insertRow();
        row.innerHTML = `
            <td>${account.numeroCuenta}</td>
            <td>${account.nombreBanco}</td>
            <td>${account.tipoCuenta}</td>
            <td>${account.saldoActual.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</td>
            <td>${account.estadoCuenta}</td>
            <td>${account.fechaApertura}</td>
            <td>${account.descripcion}</td>
            <td>
                <button class="bg-green-500" onclick="editRow(this)">Editar</button>
                <button class="bg-red-500" onclick="deleteRow(this)">Eliminar</button>
            </td>
        `;
    });
});
