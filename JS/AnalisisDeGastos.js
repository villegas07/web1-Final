document.addEventListener('DOMContentLoaded', () => {
    const analysisTable = document.getElementById('analysisTable');

    function updateTable() {
        const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
        const monthlyData = {};

        let totalCapital = 0;
        accounts.forEach(account => {
            totalCapital += account.saldoActual;
        });

        transactions.forEach(transaction => {
            const date = new Date(transaction.fechaTransaccion);
            const month = date.toLocaleString('es-ES', { month: 'long' });
            const year = date.getFullYear();

            if (year === 2024) {
                if (!monthlyData[month]) {
                    monthlyData[month] = { ingresos: 0, egresos: 0 };
                }
                if (transaction.tipoTransaccion === 'Ingreso') {
                    monthlyData[month].ingresos += parseFloat(transaction.valorTransaccion);
                } else {
                    monthlyData[month].egresos += parseFloat(transaction.valorTransaccion);
                }
            }
        });

        analysisTable.innerHTML = ''; // Clear existing rows

        Object.keys(monthlyData).forEach(month => {
            const row = analysisTable.insertRow();
            const ingresos = monthlyData[month].ingresos;
            const egresos = monthlyData[month].egresos;

            row.innerHTML = `
                <td>${month.charAt(0).toUpperCase() + month.slice(1)}</td>
                <td>${ingresos.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</td>
                <td>${egresos.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</td>
                <td>${totalCapital.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</td>
            `;
        });
    }

    updateTable(); // Initial call
    setInterval(updateTable, 5000); // Update table every 5 seconds
});
