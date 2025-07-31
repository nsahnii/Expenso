document.addEventListener('DOMContentLoaded', () => {
  // Display a random motivational quote about saving money
  const quoteElem = document.getElementById('quote');
  const quotes = [
    'Save today, secure tomorrow.',
    'Every penny saved is a penny earned.',
    'Small savings add up to big dreams.',
    'Financial freedom starts with mindful spending.',
    'A budget is telling your money where to go instead of wondering where it went.'
  ];
  function displayRandomQuote() {
    const q = quotes[Math.floor(Math.random() * quotes.length)];
    if (quoteElem) quoteElem.textContent = `"${q}"`;
  }
  displayRandomQuote();
  // Bind add-first button to redirect to add page
  const addFirstBtn = document.getElementById('add-first-btn');
  if (addFirstBtn) {
    addFirstBtn.addEventListener('click', () => {
      window.location.href = 'add.html';
    });
  }

  // Primary add button removed per user request. Only the empty state button is used.
  protectPage();
  bindLogout();
  const listContainer = document.getElementById('expenses-list');
  const emptyMsg = document.getElementById('expenses-empty');
  const summaryContainer = document.getElementById('expense-summary');

  renderExpenses();

  function renderExpenses() {
    const expenses = getExpenses();
    listContainer.innerHTML = '';
    if (!expenses || expenses.length === 0) {
      // No expenses: hide summary and show empty message
      summaryContainer.style.display = 'none';
      listContainer.style.display = 'none';
      emptyMsg.style.display = 'block';
      return;
    }
    // There are expenses: hide empty message
    emptyMsg.style.display = 'none';
    listContainer.style.display = 'block';
    summaryContainer.style.display = 'block';
    // Render summary overview
    renderSummary(expenses);
    // Render each expense card
    expenses.forEach((exp) => {
      const card = document.createElement('div');
      card.className = 'expense-card';
      // Info
      const info = document.createElement('div');
      info.className = 'expense-info';
      info.textContent = exp.name;
      const categorySpan = document.createElement('span');
      categorySpan.textContent = exp.category;
      categorySpan.className = 'category';
      const color = getCategoryColor(exp.category);
      if (color) categorySpan.style.backgroundColor = color;
      info.appendChild(categorySpan);
      // Amount
      const amount = document.createElement('div');
      amount.className = 'expense-amount';
      amount.textContent = '$' + parseFloat(exp.amount).toFixed(2);
      // Actions
      const actions = document.createElement('div');
      actions.className = 'expense-actions';
      const delBtn = document.createElement('button');
      delBtn.className = 'btn-secondary';
      delBtn.textContent = 'Delete';
      delBtn.addEventListener('click', () => {
        const confirmDelete = confirm('Delete this expense?');
        if (confirmDelete) {
          const current = getExpenses();
          saveExpenses(current.filter((e) => e.id !== exp.id));
          renderExpenses();
        }
      });
      actions.appendChild(delBtn);
      card.appendChild(info);
      card.appendChild(amount);
      card.appendChild(actions);
      listContainer.appendChild(card);
    });
  }

  function renderSummary(expenses) {
    // Compute totals relative to budget
    const totalSpent = expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);
    const budget = parseFloat(getBudget() || 0);
    const remaining = (budget - totalSpent).toFixed(2);
    const percent = budget ? Math.min((totalSpent / budget) * 100, 100) : 0;
    // Clear existing contents
    summaryContainer.innerHTML = '';
    // Assign card class for consistent styling
    summaryContainer.className = 'card';
    // Title
    const title = document.createElement('h3');
    title.textContent = 'Monthly Overview';
    title.style.marginTop = '0';
    summaryContainer.appendChild(title);
    // Overview grid
    const overviewDiv = document.createElement('div');
    overviewDiv.className = 'summary';
    overviewDiv.innerHTML = `
      <div class="overview-item">
        <span class="label">Budget</span>
        <span>$${budget ? budget.toFixed(2) : '0.00'}</span>
      </div>
      <div class="overview-item">
        <span class="label">Spent</span>
        <span>$${totalSpent.toFixed(2)}</span>
      </div>
      <div class="overview-item">
        <span class="label">Remaining</span>
        <span>$${remaining}</span>
      </div>
    `;
    summaryContainer.appendChild(overviewDiv);
    // Progress bar container
    const progressContainer = document.createElement('div');
    progressContainer.className = 'budget-progress';
    const progressBar = document.createElement('div');
    progressBar.className = 'budget-progress-bar';
    progressBar.style.width = percent + '%';
    // Colour: success if under budget, error if over
    progressBar.style.backgroundColor = totalSpent > budget && budget > 0 ? '#e02424' : '#10b981';
    progressContainer.appendChild(progressBar);
    summaryContainer.appendChild(progressContainer);
  }

  function getCategoryColor(catName) {
    switch (catName) {
      case 'Food': return '#ff6384';
      case 'Home': return '#36a2eb';
      case 'Work': return '#cc65fe';
      case 'Shop': return '#ffce56';
      case 'Transport': return '#4bc0c0';
      default: return '#5b86e5';
    }
  }
});