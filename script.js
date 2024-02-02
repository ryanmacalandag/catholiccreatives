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
          } else if (currentSociality == 'all') {
            title.textContent = defaultTitle;
            item.classList.remove('hidden');
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

// Main Gallery
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
    li.dataset.imgurl = item.url;
    li.dataset.author = item.author;
    li.dataset.title = item.title;

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

// View gallery item
const viewItemContainer = document.querySelector('#view-item-container');
const viewItemTemplate = document.querySelector('#view-item-template');

const viewNode = viewItemTemplate.content.cloneNode(true);

console.log(viewItemTemplate)

const viewGalleryItem = (item) => {
  console.log(item);
  // Open the view container
  viewItemContainer.classList.add('open');

  // Build item in view container
  viewItemContainer.append(viewNode);

  // Item image
  const thisImage = viewItemContainer.querySelector('.this-image');
  thisImage.src = item.dataset.imgurl;

  // Item details
  const thisTitle = viewItemContainer.querySelector('.this-title');
  const thisAuthor = viewItemContainer.querySelector('.this-author');

  thisTitle.textContent = item.dataset.title || "No Title";
  thisAuthor.textContent = item.dataset.author;

  // Handle close button
  const viewCloseBtn = document.querySelector('.view-close-btn');
  viewCloseBtn.addEventListener('click', () => {
    viewItemContainer.classList.remove('open');
  })
}

