import Axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export async function getImagesByQuery(query, page = 1) {
  try {
    const response = await Axios.get("https://pixabay.com/api/", {
      params: {
        key: '50312672-6ff896f2a2c8f700d68e76dd9',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page,
        per_page: 15,
      }
    });

    const { hits, totalHits } = response.data;

    if (hits.length === 0) {
      iziToast.warning({
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        backgroundColor: '#ef4040',
        titleColor: 'white',
        messageColor: 'white',
      });
      return { images: [], totalHits: 0 };
    }

    const images = hits.map(hit => ({
      webformatURL: hit.webformatURL,
      largeImageURL: hit.largeImageURL,
      tags: hit.tags,
      likes: hit.likes,
      views: hit.views,
      comments: hit.comments,
      downloads: hit.downloads
    }));

    return { images, totalHits };

  } catch (error) {
    throw new Error('Помилка при отриманні зображень з Pixabay API');
  }
}














// export function getImagesByQuery(query) {
//     const BASE_URL = 'https://pixabay.com/api/';

//     const params = new URLSearchParams({
//         key: '50312672-6ff896f2a2c8f700d68e76dd9',
//         q: query,
//         image_type: 'photo',
//         orientation: 'horizontal',
//         safesearch: 'true',      

//     });

//     const url = `${BASE_URL}?${params}`
    
//     return fetch(url, {params}).then(res => res.json());
    
// }
// getImagesByQuery('flower');







// refs.formEl.addEventListener('submit', e => {
//     e.preventDefault();

//     const userValue = e.target.elements.query.value;
// })