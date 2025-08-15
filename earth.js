const API_KEY = 'kJNZ1Ze3U6Yd1JrePehO5LWlK0D9e2IWI9oDB7q8';

document.getElementById("load-epic").addEventListener("click", () => {
  const date = document.getElementById("epic-date").value;
  const epicUrl = `https://api.nasa.gov/EPIC/api/natural/date/${date}?api_key=${API_KEY}`;

  console.log("EPIC Date:", date);

  fetch(epicUrl)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("earth-image");
      container.innerHTML = ""; // Clear previous images

      if (!data || data.length === 0) {
        container.innerHTML = `<p>No EPIC images available for this date.</p>`;
        return;
      }

      data.forEach(item => {
        const imageName = item.image;
        const dateParts = date.split("-");
        const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${dateParts[0]}/${dateParts[1]}/${dateParts[2]}/png/${imageName}.png`;
        const img = document.createElement("img");
        
        
        img.src = imageUrl;
        img.alt = "EPIC Earth Image";
        img.style.width = "300px";
        img.style.margin = "10px";

        container.appendChild(img);

        img.addEventListener("click", () => {
  window.open(img.src, "_blank");


  img.addEventListener("click", () => {
  window.open(img.src, "_blank"); // or modal logic
});
});
      });
    })
    .catch(err => {
      console.error("EPIC fetch error:", err);
      document.getElementById("earth-image").innerHTML = `<p>Error loading EPIC images. Try a different date.</p>`;
    });
});
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");

img.addEventListener("click", () => {
  modal.style.display = "flex";
  modalImg.src = img.src;
});

modal.addEventListener("click", () => {
  modal.style.display = "none";
});