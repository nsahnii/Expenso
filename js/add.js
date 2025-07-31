document.addEventListener('DOMContentLoaded', () => {
  protectPage();
  bindLogout();

  const categorySelect = document.getElementById('expense-category');
  const subcategorySelect = document.getElementById('subcategory');

  // Add placeholder option
  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.textContent = 'Select category';
  placeholder.disabled = true;
  placeholder.selected = true;
  categorySelect.appendChild(placeholder);

  ['Food', 'Home', 'Work', 'Shop', 'Transport'].forEach((cat) => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    categorySelect.appendChild(opt);
  });

  const subcategoryMap = {
    Food: ["Groceries", "Restaurants", "Fast Food", "Coffee/Tea", "Snacks", "Meal Delivery"],
    Home: ["Rent/Mortgage", "Utilities", "Internet & Cable", "Furniture & Appliances", "Home Repairs", "Cleaning Supplies", "Property Taxes", "Insurance"],
    Work: ["Office Supplies", "Work Travel", "Training", "Memberships", "Software Subscriptions", "Freelance Help", "Coworking Space", "Uniforms"],
    Shop: ["Clothing", "Electronics", "Beauty & Skincare", "Gifts", "Household Items", "Online Shopping", "Books", "Hobby Supplies"],
    Transport: ["Gas/Fuel", "Public Transit", "Parking Fees", "Tolls", "Rideshare", "Car Maintenance", "Car Insurance", "Lease/Loan Payments"]
  };

  // 🔧 Corrected event listener for subcategory population
  categorySelect.addEventListener("change", function () {
    const selectedCategory = this.value;
    subcategorySelect.innerHTML = '<option value="">Select subcategory</option>';
    if (subcategoryMap[selectedCategory]) {
      subcategoryMap[selectedCategory].forEach(sub => {
        const option = document.createElement("option");
        option.value = sub;
        option.textContent = sub;
        subcategorySelect.appendChild(option);
      });
    }
  });

  // Set default date to today
  document.getElementById('expense-date').value = new Date().toISOString().substr(0, 10);

  const addForm = document.getElementById('add-form');
  const msgElem = document.getElementById('add-msg');

  addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    msgElem.textContent = '';

    const name = document.getElementById('expense-name').value.trim();
    const amountStr = document.getElementById('expense-amount').value;
    const category = document.getElementById('expense-category').value;
    const subcategory = document.getElementById('subcategory').value;
    const date = document.getElementById('expense-date').value;

    if (!name || !amountStr || !category || !subcategory || !date) {
      msgElem.textContent = 'Please complete all fields.';
      return;
    }

    const amount = parseFloat(amountStr);
    const expenses = getExpenses();

    const newExpense = {
      id: Date.now(),
      name,
      amount: amount.toFixed(2),
      category,
      subcategory,
      date
    };

    const updatedExpenses = [...expenses, newExpense];

    const budget = parseFloat(getBudget() || 0);
    const totalAfter = updatedExpenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);
    if (budget && totalAfter > budget) {
      alert('Warning: adding this expense exceeds your budget!');
    }

    saveExpenses(updatedExpenses);
    msgElem.textContent = 'Expense added successfully.';

    addForm.reset();
    document.getElementById('expense-category').value = '';
    document.getElementById('expense-date').value = new Date().toISOString().substr(0, 10);
  });
});
