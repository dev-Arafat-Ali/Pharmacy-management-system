// ── Toggle between Log In / Sign Up forms on this page ──
const authButtons = document.querySelectorAll('.auth-btn');
const allForms = document.querySelectorAll('.account-form');

function showForm(mode) {
  allForms.forEach(form => {
    form.classList.toggle('hidden', form.dataset.mode !== mode);
  });
  authButtons.forEach(b => b.classList.toggle('active', b.dataset.mode === mode));
}

authButtons.forEach(btn => {
  btn.addEventListener('click', () => showForm(btn.dataset.mode));
});

document.querySelectorAll('.switch-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    showForm(link.dataset.mode);
  });
});

// ── Form submission placeholder ──
// No backend yet — this just confirms the form works front-end side.
allForms.forEach(form => {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const isAdmin = this.id.toLowerCase().includes('admin');
    const action = this.dataset.mode === 'signup' ? 'Registration' : 'Login';
    alert(`${action} submitted (${isAdmin ? 'Staff' : 'Customer'})! Not connected to a backend yet.`);
    this.reset();
  });
});
