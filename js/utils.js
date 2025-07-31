// Common utility functions for Expenso web app

// Retrieve array of user objects from localStorage
function getUsers() {
  return JSON.parse(localStorage.getItem('users')) || [];
}

// Save user array to localStorage
function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

// Retrieve expenses for current user
function getExpenses() {
  const currentUser = getCurrentUser();
  if (!currentUser) return [];
  return JSON.parse(localStorage.getItem('expenses_' + currentUser.email)) || [];
}

function saveExpenses(expenses) {
  const currentUser = getCurrentUser();
  if (!currentUser) return;
  localStorage.setItem('expenses_' + currentUser.email, JSON.stringify(expenses));
}

// Retrieve budget for current user
function getBudget() {
  const currentUser = getCurrentUser();
  if (!currentUser) return '';
  return localStorage.getItem('budget_' + currentUser.email) || '';
}

function saveBudget(budget) {
  const currentUser = getCurrentUser();
  if (!currentUser) return;
  localStorage.setItem('budget_' + currentUser.email, budget);
}

// Set the current logged in user in localStorage
function setCurrentUser(user) {
  localStorage.setItem('currentUser', JSON.stringify(user));
}

// Get current logged in user from localStorage
function getCurrentUser() {
  return JSON.parse(localStorage.getItem('currentUser'));
}

// Clear current user (logout)
function logout() {
  localStorage.removeItem('currentUser');
}

// Simple email regex for validation
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
  return re.test(String(email).toLowerCase());
}

// Quick navigation guard: if user not logged in, redirect to login page
function protectPage() {
  if (!getCurrentUser()) {
    window.location.href = 'index.html';
  }
}

// Bind logout link events for pages
function bindLogout() {
  const logoutLink = document.getElementById('logout-link');
  if (logoutLink) {
    logoutLink.addEventListener('click', (e) => {
      e.preventDefault();
      logout();
      window.location.href = 'index.html';
    });
  }
}