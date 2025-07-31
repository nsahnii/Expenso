document.addEventListener('DOMContentLoaded', () => {
  protectPage();
  bindLogout();
  const expenses = getExpenses();
  // Weekly data
  const weeklyTotals = Array(7).fill(0);
  const monthlyTotals = Array(12).fill(0);
  expenses.forEach((exp) => {
    const d = new Date(exp.date);
    weeklyTotals[d.getDay()] += parseFloat(exp.amount);
    monthlyTotals[d.getMonth()] += parseFloat(exp.amount);
  });
  const weekLabels = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const monthLabels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  // Populate tables
  const weeklyTable = document.getElementById('weekly-table');
  const monthlyTable = document.getElementById('monthly-table');
  weeklyTable.innerHTML = '<tr><th>Day</th><th>Total ($)</th></tr>' +
    weekLabels.map((label, i) => `<tr><td>${label}</td><td>${weeklyTotals[i].toFixed(2)}</td></tr>`).join('');
  monthlyTable.innerHTML = '<tr><th>Month</th><th>Total ($)</th></tr>' +
    monthLabels.map((label, i) => `<tr><td>${label}</td><td>${monthlyTotals[i].toFixed(2)}</td></tr>`).join('');
  // Charts
  const weeklyCtx = document.getElementById('weekly-chart').getContext('2d');
  new Chart(weeklyCtx, {
    type: 'line',
    data: {
      labels: weekLabels,
      datasets: [{
        label: 'Weekly Total',
        data: weeklyTotals,
        borderColor: '#5b86e5',
        backgroundColor: 'rgba(91,134,229,0.2)',
        tension: 0.3,
      }],
    },
    options: { scales: { y: { beginAtZero: true } }, plugins: { legend: { display: false } } },
  });
  const monthlyCtx = document.getElementById('monthly-chart').getContext('2d');
  new Chart(monthlyCtx, {
    type: 'bar',
    data: {
      labels: monthLabels,
      datasets: [{
        label: 'Monthly Total',
        data: monthlyTotals,
        backgroundColor: '#ff6384',
      }],
    },
    options: { scales: { y: { beginAtZero: true } }, plugins: { legend: { display: false } } },
  });
  // Download CSV
  document.getElementById('download-report').addEventListener('click', () => {
    let csv = 'Period,Total\n';
    weekLabels.forEach((label, i) => { csv += `Week ${label},${weeklyTotals[i].toFixed(2)}\n`; });
    monthLabels.forEach((label, i) => { csv += `Month ${label},${monthlyTotals[i].toFixed(2)}\n`; });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'expenso_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });
});