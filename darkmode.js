const btnDarkMode = document.querySelector('.btn-darkmode');
const icono = btnDarkMode.querySelector('.material-symbols-outlined');

btnDarkMode.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  if (document.body.classList.contains('dark-mode')) {
    icono.textContent = 'light_mode'; 
  } else {
    icono.textContent = 'dark_mode'; 
  }
});
