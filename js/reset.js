document.addEventListener('DOMContentLoaded', () => {
  const resetForm = document.getElementById('reset-form');
  const msgElem = document.getElementById('reset-msg');
  resetForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('reset-email').value.trim().toLowerCase();
    const users = getUsers();
    const user = users.find((u) => u.email === email);
    if (user) {
      msgElem.textContent = 'A password reset link has been sent to your email (simulation).';
    } else {
      msgElem.textContent = 'No account found with that email.';
    }
    // In a real system you would send an actual reset email
  });
});