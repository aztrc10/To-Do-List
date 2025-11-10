const btnDark = document.querySelector('.btn-darkmode');
const icono = btnDark.querySelector('.material-symbols-outlined');

if (localStorage.modo === 'dark') {
  document.body.classList.add('dark-mode');
  icono.textContent = 'light_mode';
}

btnDark.onclick = () => {
  document.body.classList.toggle('dark-mode');
  const dark = document.body.classList.contains('dark-mode');
  icono.textContent = dark ? 'light_mode' : 'dark_mode';
  localStorage.modo = dark ? 'dark' : 'light';
};
