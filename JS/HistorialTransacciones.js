document.addEventListener('DOMContentLoaded', () => {
    const historialTable = document.getElementById('historialTable');
    const mesFiltro = document.getElementById('mesFiltro');
    const tipoTransaccionFiltro = document.getElementById('tipoTransaccionFiltro');
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    function renderTable(filteredTransactions) {
        historialTable.innerHTML = '';
        filteredTransactions.forEach(transaction => {
            const row = historialTable.insertRow();
            const date = new Date(transaction.fechaTransaccion);
            const month = date.toLocaleString('es-ES', { month: 'long' });
            const formattedDate = date.toLocaleDateString('es-ES');

            row.innerHTML = `
                <td>${formattedDate}</td>
                <td>${month.charAt(0).toUpperCase() + month.slice(1)}</td>
                <td>${transaction.tipoTransaccion}</td>
                <td>${transaction.tipoIngresoEgreso}</td>
                <td>${transaction.valorTransaccion.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</td>
                <td>${transaction.cuentaBancaria}</td>
                <td>${transaction.descripcion}</td>
            `;
        });
    }

    function filterTransactions() {
        const mes = mesFiltro.value;
        const tipoTransaccion = tipoTransaccionFiltro.value;

        const filteredTransactions = transactions.filter(transaction => {
            const date = new Date(transaction.fechaTransaccion);
            const month = ('0' + (date.getMonth() + 1)).slice(-2);

            return (mes === '' || month === mes) &&
                   (tipoTransaccion === '' || transaction.tipoTransaccion === tipoTransaccion);
        });

        renderTable(filteredTransactions);
    }

    mesFiltro.addEventListener('change', filterTransactions);
    tipoTransaccionFiltro.addEventListener('change', filterTransactions);

    renderTable(transactions); // Renderizar la tabla con todas las transacciones al cargar la página
});
