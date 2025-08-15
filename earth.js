const API_KEY = 'kJNZ1Ze3U6Yd1JrePehO5LWlK0D9e2IWI9oDB7q8';
const container = document.getElementById('earth-image');
const button = document.getElementById('load-earth');
const latInput = document.getElementById('lat');
const lonInput = document.getElementById('lon');
const dateInput = document.getElementById('date');

function showLoading() {
  container.innerHTML = '<p style="font-weight:bold;">Loading...</p>';
}

function showError(msg) {
  container.innerHTML = `<p style="color:red;">${msg}</p>`;
}

button.addEventListener('click', () => {
  const lat = latInput.value.trim();
  const lon = lonInput.value.trim();
  const date = dateInput.value.trim();

  if (!lat || !lon || !date) {
    showError('Please fill in all fields.');
    return;
  }

  showLoading();

  const url = `https://api.nasa.gov/planetary/earth/imagery?lon=${lon}&lat=${lat}&date=${date}&dim=0.1&api_key=${API_KEY}`;

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      return res.blob();
    })
    .then(blob => {
      const imgUrl = URL.createObjectURL(blob);
      container.innerHTML = `
        <div class="image-card">
          <div class="image-wrapper">
            <img src="${imgUrl}" alt="Earth Image for ${date}">
          </div>
          <div class="image-details">
            <h3>Earth Image</h3>
            <p>Latitude: ${lat}, Longitude: ${lon}</p>
            <p>Date: ${date}</p>
          </div>
        </div>
      `;
    })
    .catch(err => {
      console.error(err);
      showError('Failed to load Earth image. Try a different date or coordinates.');
    });
});
