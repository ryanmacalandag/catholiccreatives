const dropDown = document.querySelectorAll('.dropdown');
const themeToggleContainer = document.querySelectorAll('.theme-toggle-container');
const DOMbody = document.querySelector('body');

dropDown.forEach((i) => {
  i.addEventListener('click', (e) => {
    const thisDropDown = e.target.closest('.dropdown');
    
    thisDropDown.classList.toggle('close');

  })
})

themeToggleContainer.forEach((i) => {
  i.addEventListener('click', (e) => {
    DOMbody.classList.toggle('dark')
  })
})