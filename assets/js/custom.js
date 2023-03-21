// check localStorage
const preferredTheme = localStorage.getItem('preferredTheme');

if (preferredTheme == 'light') setLightMode(true);
else setLightMode(false);

function setLightMode(isLight) {
  isLight = false; // force dark mode

  const html = document.documentElement;
  const lightBtn = document.getElementById('light-btn');
  const darkBtn = document.getElementById('dark-btn');

  if (isLight) {
    localStorage.setItem('preferredTheme', 'light');
    html.classList.add('light');
    lightBtn ? (lightBtn.style.display = 'none') : '';
    darkBtn ? (darkBtn.style.display = 'inline-block') : '';
  } else {
    localStorage.removeItem('preferredTheme');
    html.classList.remove('light');
    darkBtn ? (darkBtn.style.display = 'none') : '';
    lightBtn ? (lightBtn.style.display = 'inline-block') : '';
  }
}
