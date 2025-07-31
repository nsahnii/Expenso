document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signup-form');
  const errorMsg = document.getElementById('signup-error');
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    errorMsg.textContent = '';
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim().toLowerCase();
    const password = document.getElementById('signup-password').value;
    const confirm = document.getElementById('signup-confirm').value;
    if (!validateEmail(email)) {
      errorMsg.textContent = 'Please enter a valid email address.';
      return;
    }
    if (password.length < 6) {
      errorMsg.textContent = 'Password must be at least 6 characters.';
      return;
    }
    if (password !== confirm) {
      errorMsg.textContent = 'Passwords do not match.';
      return;
    }
    const users = getUsers();
    if (users.some((u) => u.email === email)) {
      errorMsg.textContent = 'An account with this email already exists.';
      return;
    }
    const newUser = { name, email, password };
    users.push(newUser);
    saveUsers(users);
    alert('Account created successfully. Please log in.');
    window.location.href = 'index.html';
  });
});