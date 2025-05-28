import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const galleryEl = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const btnLoadMore = document.querySelector('.load-more');

let lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'title',
  captionDelay: 250,
  captionPosition: 'bottom',
});

export function createGallery(images) {
  const markup = images.map(
    ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
      <li class="gallery-item">
        <a href="${largeImageURL}" class="image-container" alt="${tags}">
          <img src="${webformatURL}"
               alt="${tags}"
               title="Likes: ${likes} | Views: ${views} | Comments: ${comments} | Downloads: ${downloads}" />
          <div class="info-overlay">
            <div class="info-item"><b>Likes</b>: ${likes}</div>
            <div class="info-item"><b>Views</b>: ${views}</div>
            <div class="info-item"><b>Comments</b>: ${comments}</div>
            <div class="info-item"><b>Downloads</b>: ${downloads}</div>
          </div>
        </a>
      </li>`).join('');

      galleryEl.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  galleryEl.innerHTML = '';
}

export function showLoader() {
  loader.classList.add('is-visible');
}

export function hideLoader() {
  loader.classList.remove('is-visible');
}

export function showLoadMoreButton() {
  
  btnLoadMore.classList.remove('is-hidden');
}
export function hideLoadMoreButton() {
  btnLoadMore.classList.add('is-hidden');
}

export function showToast(message, type = 'info') {
  iziToast[type]({
    message,
    position: 'topRight',
    backgroundColor: type === 'error' ? '#ef4040' : type === 'warning' ? '#ef4040' : '#f0ad4e',
    titleColor: 'white',
    messageColor: 'white',
  });
}