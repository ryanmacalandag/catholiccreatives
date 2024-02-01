const dropDown = document.querySelectorAll('.dropdown');
const dropDownItems = document.querySelectorAll('.dropdown a li');
const themeToggleContainer = document.querySelectorAll('.theme-toggle-container');
const DOMbody = document.querySelector('body');
const selectedSociality = document.querySelector('.dropdown.sociality .selected-text');
const filtersButton = document.querySelector('.dropdown.filters');
const filtersContainer = document.querySelector('#filter-styles');
const title = document.querySelector('#title');

// Filter bar
let currentSociality = "all";
let defaultTitle = "all creative works";

window.onload = () => {
  selectedSociality.textContent = currentSociality;
  title.textContent = defaultTitle;
}

dropDown.forEach((i) => {
  i.addEventListener('click', (e) => {
    const thisDropDown = e.target.closest('.dropdown');
    thisDropDown.classList.contains('close') ? thisDropDown.classList.remove('close') : thisDropDown.classList.add('close');

    dropDownItems.forEach((j) => {
      j.addEventListener('click', (e) => {
        selectedSociality.textContent = j.dataset.sociality;
        currentSociality = j.dataset.sociality;

        // Grab all gallery items
        const galleryItems = document.querySelectorAll('#main-gallery .item-container');
        
        galleryItems.forEach((item) => {
          
          item.classList.add('hidden');

          // convert string into array
          let socialityList = item.dataset.sociality.split(" "); 

          if (socialityList.includes(currentSociality)) {
            item.classList.remove('hidden')
            title.textContent = currentSociality;
            if (currentSociality == 'popular') {
              title.textContent = defaultTitle;
            }
          } else if (currentSociality == 'all') {
            item.classList.remove('hidden');
            title.textContent = currentSociality;
          }
        })

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
  const galleryData = data;

  // Create main gallery from data using template
  const mainGallery = document.querySelector('#main-gallery');
  const itemTemplate = document.querySelector('#item-template');

  let galleryList = document.createElement('ul');
  galleryList.classList.add('gallery');
  galleryList.classList.add('boxed');

  galleryData.forEach((item) => {

    // Clone inner content of template
    // Then grab li element
    const li = itemTemplate.content.cloneNode(true).querySelector('li');
    const img = li.querySelector('img');
    const authorName = li.querySelector('.author-name');

    // Fill gallery item data
    li.dataset.sociality = item.sociality;
    li.dataset.category = item.category;
    li.dataset.tags = item.tags;
    li.dataset.medium = item.tags;

    // Fill gallery image data
    img.src = item.url;
    img.alt = item.title;
    authorName.textContent = item.author;

    // Append li item to ul list
    galleryList.append(li);

  })

  // Append ul list to main gallery
  mainGallery.append(galleryList);

})

