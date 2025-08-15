

const API_KEY = 'kJNZ1Ze3U6Yd1JrePehO5LWlK0D9e2IWI9oDB7q8';
export default API_KEY;

// DOM Elements
const apiTypeSelect = document.getElementById('api-type'); // 'mars' or 'images'
const solInput = document.getElementById('sol-input');
const cameraSelect = document.getElementById('camera-select');
const queryInput = document.getElementById('query-input');
const photosGrid = document.getElementById('photos-grid');
const noPhotosMessage = document.getElementById('no-photos-message');
const loadingSpinner = document.getElementById('loading-spinner');
const errorMessage = document.getElementById('error-message');
const nextPageBtn = document.getElementById('next-page');

let currentPage = 1;

// Utility Functions
function showLoading() {
  loadingSpinner.classList.remove('hidden')};

function hideLoading() {
  loadingSpinner.classList.add('hidden')};

function showError(msg) {
  errorMessage.textContent = msg }
  errorMessage.classList.remove('hidden');
function hideError() {
  errorMessage.classList.add('hidden')};
function clearPhotos() {
  photosGrid.innerHTML = ''}
  noPhotosMessage.classList.add('hidden');


// Display Function
function displayPhotos(photos, isImageSearch = false) {
  clearPhotos()}

  photos.forEach(photo => {
    const card = document.createElement('div');
    card.className = 'photo-card';

    const img = document.createElement('img');
    img.loading = 'lazy';

    if (isImageSearch) {
      img.src = photo.links?.[0]?.href;
      img.alt = photo.data?.[0]?.title || 'NASA Image';
    } else {
      img.src = photo.img_src;
      img.alt = `Mars Rover Photo - ${photo.camera.full_name}`;
    }

    card.appendChild(img);
    photosGrid.appendChild(card);
  });


// Fetch Mars Rover Photos
function fetchMarsPhotos(page = 1) {
  showLoading();
  hideError();

  const sol = solInput.value.trim() || '1000';
  const camera = cameraSelect.value;
  let apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&page=${page}&api_key=${API_KEY}`;

  if (camera !== 'all') {
    apiUrl += `&camera=${camera}`;
  }

  fetch(apiUrl)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      return res.json();
    })
    .then(data => {
      hideLoading();
      const photos = data.photos;
      if (photos.length > 0) {
        displayPhotos(photos);
      } else {
        noPhotosMessage.classList.remove('hidden');
      }
    })
    .catch(err => {
      hideLoading();
      showError('Failed to load Mars photos.');
      console.error(err);
    });
}

// Fetch NASA Image Search
function fetchNasaImages(query) {
  showLoading();
  hideError();

  const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      hideLoading();
      const items = data.collection.items;
      if (items.length > 0) {
        displayPhotos(items, true);
      } else {
        noPhotosMessage.classList.remove('hidden');
      }
    })
    .catch(err => {
      hideLoading();
      showError('Failed to load NASA images.');
      console.error(err);
    });
}

// Main Trigger
function loadPhotos() {
  clearPhotos();
  currentPage = 1;

  const apiType = apiTypeSelect.value;

  if (apiType === 'mars') {
    fetchMarsPhotos(currentPage);
  } else if (apiType === 'images') {
    const query = queryInput.value.trim();
    if (query) {
      fetchNasaImages(query);
    } else {
      showError('Please enter a search query.');
    }
  }
}

// Pagination
nextPageBtn.addEventListener('click', () => {
  currentPage++;
  const apiType = apiTypeSelect.value;
  if (apiType === 'mars') {
    fetchMarsPhotos(currentPage);
  }
});

// Initial Load or Button Trigger
document.getElementById('load-btn').addEventListener('click', loadPhotos);
