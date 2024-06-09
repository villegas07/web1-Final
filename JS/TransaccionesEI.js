let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let accounts = JSON.parse(localStorage.getItem('accounts')) || [];
let editingIndex = null;

document.getElementById('guardarBtn').addEventListener('click', function() {
    const tipoTransaccion = document.getElementById('tipoTransaccion').value;
    const tipoIngresoEgreso = document.getElementById('tipoIngresoEgreso').value;
    const valorTransaccion = parseFloat(document.getElementById('valorTransaccion').value);
    const cuentaBancaria = document.getElementById('cuentaBancaria').value;
    const fechaTransaccion = document.getElementById('fechaTransaccion').value;
    const descripcion = document.getElementById('descripcion').value;
    const adjuntar = document.getElementById('adjuntar').files[0];

    if (!cuentaValida(cuentaBancaria)) {
        alert('La cuenta bancaria no existe.');
        return;
    }

    if (tipoTransaccion && tipoIngresoEgreso && !isNaN(valorTransaccion) && cuentaBancaria && fechaTransaccion && descripcion && adjuntar) {
        const codigo = transactions.length.toString().padStart(2, '0');
        const transaction = {
            codigo,
            tipoTransaccion,
            tipoIngresoEgreso,
            valorTransaccion,
            cuentaBancaria,
            fechaTransaccion,
            descripcion,
            adjuntar: URL.createObjectURL(adjuntar)
        };

        if (editingIndex !== null) {
            transactions[editingIndex] = transaction;
            editingIndex = null;
        } else {
            transactions.push(transaction);
        }

        // Actualizar el saldo de la cuenta bancaria
        const accountIndex = accounts.findIndex(acc => acc.numeroCuenta === cuentaBancaria);
        if (accountIndex !== -1) {
            if (tipoTransaccion === 'Ingreso') {
                accounts[accountIndex].saldoActual += valorTransaccion;
            } else {
                accounts[accountIndex].saldoActual -= valorTransaccion;
            }
            localStorage.setItem('accounts', JSON.stringify(accounts));
        }

        localStorage.setItem('transactions', JSON.stringify(transactions));
        document.getElementById('transactionForm').reset();
        renderTable();
        window.dispatchEvent(new Event('storage')); // Notificar cambios para otras ventanas
    } else {
        alert('Por favor, complete todos los campos.');
    }
});

document.getElementById('consultarBtn').addEventListener('click', function() {
    const fechaTransaccion = document.getElementById('fechaTransaccion').value;
    if (fechaTransaccion) {
        const filteredTransactions = transactions.filter(transaction => transaction.fechaTransaccion === fechaTransaccion);
        renderTable(filteredTransactions);
    } else {
        alert('Por favor, ingrese una fecha para consultar.');
    }
});

function cuentaValida(numeroCuenta) {
    return accounts.some(account => account.numeroCuenta === numeroCuenta);
}

function renderTable(filteredTransactions = transactions) {
    const tableContainer = document.getElementById('tableContainer');
    const transactionsTable = document.getElementById('transactionsTable');

    transactionsTable.innerHTML = '';
    filteredTransactions.forEach((transaction, index) => {
        const row = transactionsTable.insertRow();
        row.innerHTML = `
            <td>${transaction.tipoTransaccion}</td>
            <td>${transaction.tipoIngresoEgreso}</td>
            <td>${transaction.valorTransaccion.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</td>
            <td>${transaction.cuentaBancaria}</td>
            <td>${transaction.fechaTransaccion}</td>
            <td>${transaction.descripcion}</td>
            <td><a href="${transaction.adjuntar}" target="_blank">Ver archivo</a></td>
            <td>
                <button class="bg-green-500" onclick="editRow(${index})">Editar</button>
                <button class="bg-red-500" onclick="deleteRow(${index})">Eliminar</button>
            </td>
        `;
    });

    tableContainer.style.display = filteredTransactions.length > 0 ? 'block' : 'none';
}

function editRow(index) {
    const transaction = transactions[index];
    document.getElementById('tipoTransaccion').value = transaction.tipoTransaccion;
    document.getElementById('tipoIngresoEgreso').value = transaction.tipoIngresoEgreso;
    document.getElementById('valorTransaccion').value = transaction.valorTransaccion;
    document.getElementById('cuentaBancaria').value = transaction.cuentaBancaria;
    document.getElementById('fechaTransaccion').value = transaction.fechaTransaccion;
    document.getElementById('descripcion').value = transaction.descripcion;
    editingIndex = index;
}

function deleteRow(index) {
    transactions.splice(index, 1);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    renderTable();
    window.dispatchEvent(new Event('storage')); // Notificar cambios para otras ventanas
}

// Renderizar la tabla al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    renderTable();
});

window.addEventListener('storage', function() {
    transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    renderTable();
});
