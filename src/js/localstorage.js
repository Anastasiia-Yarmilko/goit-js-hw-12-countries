const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const bodyRef = document.querySelector('body');
const switchRef = document.querySelector('#theme-switch-toggle');

const handleCheckbox = () => {
    if (switchRef.checked) {
        bodyRef.classList.remove(Theme.LIGHT);
        bodyRef.classList.add(Theme.DARK);
        localStorage.setItem('theme', Theme.DARK);
    } else {
    bodyRef.classList.remove(Theme.DARK);
    bodyRef.classList.add(Theme.LIGHT);
    localStorage.setItem('theme', Theme.LIGHT);
  }
}

const reloadTheme = () => {
    if (localStorage.getItem('theme') === Theme.DARK) {
        bodyRef.classList.add(Theme.DARK);
        switchRef.checked = true;
    }
}

switchRef.addEventListener('change', handleCheckbox);
reloadTheme();