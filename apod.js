const API_KEY = 'kJNZ1Ze3U6Yd1JrePehO5LWlK0D9e2IWI9oDB7q8';
const container = document.getElementById('apod-container');
const button = document.getElementById('load-apod');
const dateInput = document.getElementById('apod-date');

button.addEventListener('click', () => {
  const date = dateInput.value;
  const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}&thumbs=true`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      container.innerHTML = `
        <h3>${data.title} (${data.date})</h3>
        ${data.media_type === 'video' ? `<img src="${data.thumbnail_url}" alt="Video thumbnail">` : `<img src="${data.url}" alt="APOD">`}
        <p>${data.explanation}</p>
      `;
    });
});