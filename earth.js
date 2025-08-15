const API_KEY = 'kJNZ1Ze3U6Yd1JrePehO5LWlK0D9e2IWI9oDB7q8';

document.getElementById('load-earth').addEventListener('click', () => {
  const lat = document.getElementById('lat').value;
  const lon = document.getElementById('lon').value;
  const date = document.getElementById('date').value;

  const url = `https://api.nasa.gov/planetary/earth/imagery?lon=${lon}&lat=${lat}&date=${date}&dim=0.1&api_key=${API_KEY}`;

  fetch(url)
    .then(res => res.blob())
    .then(blob => {
      const imgUrl = URL.createObjectURL(blob);
      document.getElementById('earth-image').innerHTML = `<img src="${imgUrl}" alt="Earth Image">`;
    });
});