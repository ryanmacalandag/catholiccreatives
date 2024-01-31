const dropDown = document.querySelectorAll('.dropdown');
const dropDownItems = document.querySelectorAll('.dropdown a li');
const themeToggleContainer = document.querySelectorAll('.theme-toggle-container');
const DOMbody = document.querySelector('body');
const selectedSociality = document.querySelector('.dropdown.sociality .selected-text');
const filtersButton = document.querySelector('.dropdown.filters');
const filtersContainer = document.querySelector('#filter-styles');

// Filter bar
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

// Fetch data
async function getGalleryData() {
  const response = await fetch("./data.json");
  const data = await response.json();
  return data;
}

getGalleryData().then((data) => {
  const galleryItems = data;

  // Create main gallery from data using template
  const mainGallery = document.querySelector('#main-gallery');
  const itemTemplate = document.querySelector('#item-template');

  let galleryList = document.createElement('ul');
  galleryList.classList.add('gallery');
  galleryList.classList.add('boxed');

  galleryItems.forEach((item) => {

    // Clone inner content of template
    // Then grab li element
    const li = itemTemplate.content.cloneNode(true).querySelector('li');
    const img = li.querySelector('img');

    // Fill gallery item data
    li.dataset.sociality = item.sociality;
    li.dataset.category = item.category;
    li.dataset.tags = item.tags;
    li.dataset.medium = item.tags;

    // Fill gallery image data
    img.src = item.url;
    img.alt = item.title;

    // Append li item to ul list
    galleryList.append(li);

  })

  // Append ul list to main gallery
  mainGallery.append(galleryList);

})

