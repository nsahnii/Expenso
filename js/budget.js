document.addEventListener('DOMContentLoaded', () => {
  protectPage();
  bindLogout();
  const budgetInput = document.getElementById('budget-input');
  const budgetForm = document.getElementById('budget-form');
  const summaryElem = document.getElementById('budget-summary');
  // Load existing budget
  const existing = getBudget();
  if (existing) {
    budgetInput.value = existing;
  }
  renderSummary();
  budgetForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = budgetInput.value;
    if (!val || parseFloat(val) <= 0) return;
    saveBudget(parseFloat(val).toFixed(2));
    renderSummary();
    alert('Budget saved successfully');
  });

  function renderSummary() {
    const budget = parseFloat(getBudget() || 0);
    const expenses = getExpenses();
    const totalSpent = expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);
    summaryElem.innerHTML = '';
    // If no budget has been set, hide the summary and exit
    if (!budget) {
      summaryElem.style.display = 'none';
      return;
    }
    summaryElem.style.display = 'block';
    const remain = (budget - totalSpent).toFixed(2);
    const percent = budget ? Math.min((totalSpent / budget) * 100, 100) : 0;
    // Header
    const h3 = document.createElement('h3');
    h3.textContent = 'Current Budget Summary';
    h3.style.marginTop = '0';
    summaryElem.appendChild(h3);
    // Budget overview grid
    const overviewDiv = document.createElement('div');
    overviewDiv.className = 'summary';
    overviewDiv.innerHTML = `
      <div class="overview-item">
        <span class="label">Budget</span>
        <span>$${budget.toFixed(2)}</span>
      </div>
      <div class="overview-item">
        <span class="label">Spent</span>
        <span>$${totalSpent.toFixed(2)}</span>
      </div>
      <div class="overview-item">
        <span class="label">Remaining</span>
        <span>$${remain}</span>
      </div>
    `;
    summaryElem.appendChild(overviewDiv);
    // Progress bar
    const progressContainer = document.createElement('div');
    progressContainer.className = 'budget-progress';
    const progressBar = document.createElement('div');
    progressBar.className = 'budget-progress-bar';
    progressBar.style.width = percent + '%';
    progressBar.style.backgroundColor = totalSpent > budget ? '#e02424' : '#10b981';
    progressContainer.appendChild(progressBar);
    summaryElem.appendChild(progressContainer);
  }
});