const dropDown = document.querySelectorAll('.dropdown');
const dropDownItems = document.querySelectorAll('.dropdown a li');
const themeToggleContainer = document.querySelectorAll('.theme-toggle-container');
const DOMbody = document.querySelector('body');
const selectedSociality = document.querySelector('.dropdown.sociality .selected-text');
const filtersButton = document.querySelector('.dropdown.filters');
const filtersContainer = document.querySelector('#filter-styles');

let currentSociality = "All";

console.log(dropDownItems)

selectedSociality.textContent = currentSociality;

const setCurrentSociality = (sociality) => {
  selectedSociality.textContent = sociality;
}

dropDown.forEach((i) => {
  i.addEventListener('click', (e) => {
    const thisDropDown = e.target.closest('.dropdown');
    thisDropDown.classList.toggle('close');

    dropDownItems.forEach((j) => {
      console.log(j.dataset.sociality)
      j.addEventListener('click', (e) => {
        setCurrentSociality(j.dataset.sociality);
      })
    })

  })
})

filtersButton.addEventListener('click', (e) => {
  filtersContainer.classList.toggle('open');
})

themeToggleContainer.forEach((i) => {
  i.addEventListener('click', (e) => {
    DOMbody.classList.toggle('dark')
  })
})