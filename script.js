const dropDown = document.querySelectorAll('.dropdown');

dropDown.forEach((i) => {
  i.addEventListener('click', (e) => {
    const thisDropDown = e.target.closest('.dropdown');
    
    thisDropDown.classList.toggle('close');

  })
})