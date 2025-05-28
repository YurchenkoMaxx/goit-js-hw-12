import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  showToast
} from './js/render-functions';



const formEl = document.querySelector('.form');
const inputEl = document.querySelector('.input');
const btnLoadMore = document.querySelector('.load-more');

let query = '';
let currentPage = 0;
let maxPage = 0;
const PAGE_SIZE = 15;

formEl.addEventListener('submit', handleFormSubmit);
btnLoadMore.addEventListener('click', loadMoreImages);

async function handleFormSubmit(e) {
  e.preventDefault();
  query = inputEl.value.trim();

  if (!query) return showToast('Будь ласка, введіть запит', 'warning');

  currentPage = 1;
  hideLoadMoreButton();
  clearGallery();
  showLoader();

  try {
    const { images, totalHits } = await getImagesByQuery(query, currentPage);

    createGallery(images);
    maxPage = Math.ceil(totalHits / PAGE_SIZE);
    if (currentPage < maxPage) showLoadMoreButton();
  } catch {
    showToast('Виникла помилка при завантаженні. Спробуйте ще раз.', 'error');
  } finally {
    hideLoader();
  }
  inputEl.value = '';
}

async function loadMoreImages() {
  currentPage++;
  showLoader();

  try {
    const { images } = await getImagesByQuery(query, currentPage);
    createGallery(images);


    const cardHeight = document.querySelector('.gallery-item').getBoundingClientRect().height;

    
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth'
    });


    if (currentPage >= maxPage) {
      hideLoadMoreButton();
      showToast('We are sorry, but you\'ve reached the end of search results', 'info');
    }
  } catch {
    showToast('Виникла помилка при завантаженні. Спробуйте ще раз.', 'error');
  } finally {
    hideLoader();
  }
}

