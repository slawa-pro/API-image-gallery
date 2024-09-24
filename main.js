const API_KEY = 'SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo';
const baseUrl = 'https://api.unsplash.com/search/photos';
const gallery = document.getElementById("gallery");
const searchInput = document.getElementById("search-input");
const clearBtn = document.getElementById("clear-btn");

document.addEventListener("DOMContentLoaded", () => {
    searchInput.focus(); 
    loadImages("nature"); 

    searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            loadImages(searchInput.value);
        }
    });

    searchInput.addEventListener("input", () => {
        clearBtn.style.display = searchInput.value ? 'block' : 'none';
    });

    clearBtn.addEventListener("click", () => {
        searchInput.value = '';
        clearBtn.style.display = 'none';
        searchInput.focus();
    });
});

async function loadImages(query) {
    try {
        const response = await fetch(`${baseUrl}?query=${query}&client_id=${API_KEY}&per_page=9`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        displayImages(data.results);
    } catch (error) {
        console.error("Error fetching images:", error);
    }
}

function displayImages(images) {
    gallery.innerHTML = '';

    if (images.length === 0) {
        gallery.innerHTML = `<p>No images found for your search.</p>`;
        return;
    }

    images.forEach(image => {
        const galleryItem = document.createElement("div");
        galleryItem.classList.add("gallery-item");

        const imgElement = document.createElement("img");
        imgElement.src = image.urls.regular;
        imgElement.alt = image.alt_description || 'Unsplash image';
        imgElement.classList.add("gallery-img");

        galleryItem.appendChild(imgElement);
        gallery.appendChild(galleryItem);
    });
}
