document.addEventListener('DOMContentLoaded', function() {
    renderTableFromTransactions();
});

document.getElementById('guardarBtn').addEventListener('click', function() {
    const codigo = document.getElementById('codigo').value;
    const nombreTipo = document.getElementById('nombreTipo').value;
    const descripcion = document.getElementById('descripcion').value;
    const tipo = document.getElementById('tipo').value;
    const categoria = document.getElementById('categoria').value;

    if (codigo && nombreTipo && descripcion && tipo && categoria) {
        const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        const index = transactions.findIndex(transaction => transaction.codigo === codigo);
        if (index !== -1) {
            transactions[index] = { codigo, tipoTransaccion: tipo, tipoIngresoEgreso: nombreTipo, descripcion, categoria };
            localStorage.setItem('transactions', JSON.stringify(transactions));
            renderTableFromTransactions();
            window.dispatchEvent(new Event('storage')); // Notificar cambios para otras ventanas
        }
    } else {
        alert('Por favor, complete todos los campos.');
    }
});

document.getElementById('consultarBtn').addEventListener('click', function() {
    const codigo = document.getElementById('codigo').value;
    if (codigo) {
        consultarPorCodigo(codigo);
    } else {
        alert('Por favor, ingrese un código para consultar.');
    }
});

function addRow(data) {
    const table = document.getElementById('entriesTable');
    const newRow = table.insertRow();

    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);
    const cell6 = newRow.insertCell(5);

    cell1.innerHTML = data.codigo;
    cell2.innerHTML = data.tipoIngresoEgreso;
    cell3.innerHTML = data.descripcion;
    cell4.innerHTML = data.tipoTransaccion;
    cell5.innerHTML = data.descripcion;
    cell6.innerHTML = `<button class="bg-green-500" onclick="editRow('${data.codigo}')">EDITAR</button>
                       <button class="bg-red-500" onclick="deleteRow('${data.codigo}')">Eliminar</button>`;
}

function updateRow(row, data) {
    row.cells[0].innerHTML = data.codigo;
    row.cells[1].innerHTML = data.tipoIngresoEgreso;
    row.cells[2].innerHTML = data.descripcion;
    row.cells[3].innerHTML = data.tipoTransaccion;
    row.cells[4].innerHTML = data.descripcion;
}

function editRow(codigo) {
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const transaction = transactions.find(transaction => transaction.codigo === codigo);

    document.getElementById('codigo').value = transaction.codigo;
    document.getElementById('nombreTipo').value = transaction.tipoIngresoEgreso;
    document.getElementById('descripcion').value = transaction.descripcion;
    document.getElementById('tipo').value = transaction.tipoTransaccion;
    document.getElementById('categoria').value = transaction.descripcion;
}

function deleteRow(codigo) {
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions = transactions.filter(transaction => transaction.codigo !== codigo);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    renderTableFromTransactions();
    window.dispatchEvent(new Event('storage')); // Notificar cambios para otras ventanas
}

function consultarPorCodigo(codigo) {
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const table = document.getElementById('entriesTable');
    table.innerHTML = '';

    // Mostrar solo la fila que coincide con el código
    transactions.forEach(transaction => {
        if (transaction.codigo === codigo) {
            const row = table.insertRow();
            row.innerHTML = `
                <td>${transaction.codigo}</td>
                <td>${transaction.tipoIngresoEgreso}</td>
                <td>${transaction.descripcion}</td>
                <td>${transaction.tipoTransaccion}</td>
                <td>${transaction.descripcion}</td>
                <td>
                    <button class="bg-green-500" onclick="editRow('${transaction.codigo}')">EDITAR</button>
                    <button class="bg-red-500" onclick="deleteRow('${transaction.codigo}')">Eliminar</button>
                </td>
            `;
        }
    });
}

function renderTableFromTransactions() {
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const table = document.getElementById('entriesTable');

    table.innerHTML = '';

    transactions.forEach((transaction, index) => {
        const row = table.insertRow();

        row.innerHTML = `
            <td>${transaction.codigo}</td>
            <td>${transaction.tipoIngresoEgreso}</td>
            <td>${transaction.descripcion}</td>
            <td>${transaction.tipoTransaccion}</td>
            <td>${transaction.descripcion}</td>
            <td>
                <button class="bg-green-500" onclick="editRow('${transaction.codigo}')">EDITAR</button>
                <button class="bg-red-500" onclick="deleteRow('${transaction.codigo}')">Eliminar</button>
            </td>
        `;
    });
}

window.addEventListener('storage', function() {
    renderTableFromTransactions();
});
