const dropDown = document.querySelectorAll('.dropdown');

dropDown.forEach((i) => {
  i.addEventListener('click', (e) => {
    const thisDropDown = e.target.closest('.dropdown');
    
    thisDropDown.classList.toggle('close');

    // const menuItems = thisDropDown.querySelectorAll('li')
    // menuItems.forEach((j) => {
    //   j.addEventListener('click', (f) => {
    //     console.log(f.target.textContent);
    //     console.log(thisDropDown);
    //     thisDropDown.innerText = f.target.textContent;
    //   })
    // })


  })
})

