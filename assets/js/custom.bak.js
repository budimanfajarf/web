// check localStorage
const preferredTheme = localStorage.getItem('preferredTheme');

if (preferredTheme == 'light')
  setLightMode(true);
else
  setLightMode(false);

function setLightMode(isLight) {
  const html = document.documentElement;
  const lightBtn = document.getElementById('light-btn');
  const darkBtn = document.getElementById('dark-btn');

  if(isLight) {
    localStorage.setItem('preferredTheme', 'light');
    html.classList.add('light');
    lightBtn ? lightBtn.style.display = "none" : '';
    darkBtn ? darkBtn.style.display = "inline-block" : '';
  } else {
    localStorage.removeItem('preferredTheme');
    html.classList.remove('light');
    darkBtn ? darkBtn.style.display = "none" : '';
    lightBtn ? lightBtn.style.display = "inline-block" : '';
  }
}

/*
window.addEventListener('scroll', function (event) {
  console.log('document.body.scrollHeight', document.body.scrollHeight);
  console.log('document.documentElement.scrollHeight', document.documentElement.scrollHeight)

  console.log('window.pageYOffset', window.pageYOffset);
  console.log('window.innerHeight', window.innerHeight);
  console.log('window.pageYOffset + window.innerHeight', window.pageYOffset + window.innerHeight);

  if (document.documentElement.scrollHeight == window.pageYOffset + window.innerHeight)
    alert('in the bottom of page!');

  if (document.documentElement.scrollHeight == window.pageYOffset + window.innerHeight) {
    header.classList.toggle('slideInUp');
    header.classList.toggle('slideOutDown');
  }
});
*/
