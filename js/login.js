document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const errorMsg = document.getElementById('login-error');
  const googleBtn = document.getElementById('google-btn');

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    errorMsg.textContent = '';
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const users = getUsers();
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      window.location.href = 'expenses.html';
    } else {
      errorMsg.textContent = 'Invalid email or password';
    }
  });

  // If a Google button exists (future integration), attach a placeholder click handler
  if (googleBtn) {
    googleBtn.addEventListener('click', () => {
      alert('Google sign-in is not available in this demo. Please login using email and password.');
    });
  }
});