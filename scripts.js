// import varables from data.js file 

import { BOOKS_PER_PAGE} from "./data.js"
import {authors} from "./data.js"
import {genres} from "./data.js"
import {books} from "./data.js"
 
// extract html elements from document
const tags = {
  settings: {
    button: document.querySelector('[data-header-settings]'),
    dialog: document.querySelector('[data-settings-overlay]'),
    form: document.querySelector('[data-settings-form]'),
    theme: document.querySelector('[data-settings-theme]'),
    cancel: document.querySelector('[data-settings-cancel]'),
    save: document.querySelector('[data-settings-save]')
  },
  search: {
    button: document.querySelector('[data-header-search]'),
    dialog: document.querySelector('[data-search-overlay]'),
    form: document.querySelector('[data-search-form]'),
    title: document.querySelector('[data-search-title]'),
    genres: document.querySelector('[data-search-genres]'),
    authors: document.querySelector('[data-search-authors]'),
    cancel: document.querySelector('[data-search-cancel]'), 
    sumbit: document.querySelector('[data-search-submit]')},
  list : {
    parent: document.querySelector('[data-list-items]'),
    active: document.querySelector('[data-list-active]'),
    blur: document.querySelector('[data-list-blur]'),
    image: document.querySelector('[data-list-image]'),
    title: document.querySelector('[data-list-title]'),
    subtitle: document.querySelector('[data-list-subtitle]'),
    close: document.querySelector('[data-list-close]'),
    button: document.querySelector('[data-list-button]'),
    description: document.querySelector('[data-list-description]')
}

}  

/**
 * A function that handles the toggle behavior of the search dialog.
 *  @param {string} event
 */

const searchHandler = (event) => {
  event.preventDefault(); // Prevents default behavior ,must not submit form for search button when clicked event occurs  
  const { title, genres, authors, dialog } = tags.search; // Access HTML elements of the search form
  title.value = "";     // clears values of html elements on the search form
  genres.value = "";
  authors.value = "";   
  dialog.hasAttribute("open")  // checks if search overlay is open 
    ? (dialog.removeAttribute("open"),
      genres.querySelectorAll("option:not(:first-child)").forEach((option) => option.remove()), // removes all options except for the first in genres select item
      authors.querySelectorAll("option:not(:first-child)").forEach((option) => option.remove()))  // removes all option except for the first in authers select item 
    : dialog.setAttribute("open", true);
};

tags.search.button.addEventListener("click", searchHandler); // when event 'click' happens on the search button searchhandler function is called
tags.search.cancel.addEventListener("click", searchHandler);

/**
 * A function that handles the toggle behavior of the settings dialog.
 * When the settings button or cancel button is clicked, the settingsHandler function is called.
 * @param {string} event 
 */

const settingsHandler = (event) => {
  event.preventDefault();  // prevents the default behavior of the event
  const { dialog } = tags.settings; //  creates dialogue variable from desructurs tags.settings object inorder to access html elements
  dialog.hasAttribute("open") ? dialog.removeAttribute("open") : dialog.setAttribute("open", true); // checks if dialogu / settings overlay is open if open if not then sets attribute to open 
};

tags.settings.button.addEventListener("click", settingsHandler); // 
tags.settings.cancel.addEventListener("click", settingsHandler); //when cancel button is clicked , closes the overlay


/**
 * A function that handles the save behavior of the settings dialog
 * Sets theme
 * @param {string} event 
 */

const saveHandler = (event) => {
  event.preventDefault(); //prevents default behaviour of event 
  const { theme, dialog } = tags.settings; // accesses themes from html element 
  if (theme.value === "night") {
    document.documentElement.style.setProperty("--color-dark", "255, 255, 255"); // setting css style
    document.documentElement.style.setProperty("--color-light", "10, 10, 20");
  } else {
    document.documentElement.style.setProperty("--color-dark", "10, 10, 20");  // setting css style
    document.documentElement.style.setProperty("--color-light", "255, 255, 255");
  }
  dialog.removeAttribute("open"); 
};

tags.settings.save.addEventListener("click", saveHandler); // after style has been set close overlay 

/**
 * A function that dynamically creates HTML options for a select element
 * @param {*} obj 
 * @param {*} element 
 */

const createOptionsHtml = (obj, element) => {
  const fragment = document.createDocumentFragment(); // It creates a document fragment to hold the new options.

  for (const [key, value] of Object.entries(obj)) {  // loops through each object entry to create option element for each 
    const option = document.createElement("option");
    option.value = key;
    option.innerText = value;
    fragment.appendChild(option);
  }

  element.appendChild(fragment);
};



tags.search.genres.addEventListener("click", () => createOptionsHtml(genres, tags.search.genres));
tags.search.authors.addEventListener("click", () => createOptionsHtml(authors, tags.search.authors));

const sortBooks = (event) => {
  event.preventDefault();
  const search = {
    title: tags.search.title.value,
    genre: tags.search.genres.value,
    author: tags.search.authors.value,
  };
};

tags.search.sumbit.addEventListener("click", sortBooks);

let index = 0;
const fragment = document.createDocumentFragment();
const area = document.querySelector("[data-list-items]");

const createBookElement = ({ id, image, title, author }) => {
  const element = document.createElement("button");
  element.classList = "preview";
  element.setAttribute("id", id);

  element.innerHTML = `
      <img class="preview__image" src=${image}>
      <div class="preview__info">
          <h3 class="preview__title">${title}</h3>
          <div class="preview__author">${authors[author]}</div>
      </div>`;

  return element;
};

const showBooks = () => {
  const extracted = books.slice(index, index + BOOKS_PER_PAGE);

  for (const book of extracted) {
    const element = createBookElement(book);
    fragment.appendChild(element);
  }

  index += extracted.length;
  area.appendChild(fragment);

  const booksLeft = Object.keys(books).length - index;
  tags.list.button.innerHTML = `Show More (${booksLeft})`;
};

tags.list.button.addEventListener("click", showBooks);
window.addEventListener("load", showBooks);



document.addEventListener("click", (event) => {

    if (event.target.closest(".preview") == null ) { return }
       else{ 
           const bookElement = event.target.closest(".preview")
           if (bookElement.hasAttribute("id")) {
            const previewId = bookElement.id;
           if (typeof previewId !== "string" ){return}
           preview(previewId)}   
           }
          
   });
  
   tags.list.close.addEventListener('click', closePreview);
  
