const API_KEY = 'kJNZ1Ze3U6Yd1JrePehO5LWlK0D9e2IWI9oDB7q8';
const container = document.getElementById('mars-photos');

fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${API_KEY}`)
  .then(res => res.json())
  .then(data => {
    const photos = data.photos.reverse();
    container.innerHTML = photos.slice(0, 10).map(photo => `
      <img src="${photo.img_src}" alt="${photo.camera.full_name}" width="300">
    `).join('');
  });