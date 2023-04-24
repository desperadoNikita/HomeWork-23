const apiKey = "35543196-fc0c7445742bb26726fd17e7d";
const perPage = 40;
let currentPage = 1;

const searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", searchImages);

function searchImages() {
  const searchTerm = document.getElementById("searchInput").value;
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${searchTerm}&per_page=${perPage}&page=${currentPage}`;

  fetch(url)
    .then(response => response.json())
    .then(({hits, totalHits}) => {
      const imageContainer = document.getElementById("imageContainer");
      imageContainer.innerHTML = "";

      hits.forEach(({previewURL, tags, likes, views, downloads}) => {
        const imgContainer = document.createElement("div");
        imgContainer.classList.add("imageContainer");

        const img = document.createElement("img");
        img.src = previewURL;
        img.alt = tags;

        const likes1 = document.createElement("p");
        likes1.textContent = `Likes: ${likes}`;
        likes1.classList.add("red")

        const views1 = document.createElement("p");
        views1.textContent = `Views: ${views}`;
        views1.classList.add("aqua");

        const downloads1 = document.createElement("p");
        downloads1.textContent = `Downloads: ${downloads}`;
        downloads1.classList.add("black");

        imgContainer.append(img, likes1, views1, downloads1);
        imageContainer.appendChild(imgContainer);
      });

      const totalPages = Math.ceil(totalHits / perPage);
      const pagination = document.getElementById("pagination");
      pagination.innerHTML = "";

      for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement("a");
        pageLink.href = "#";
        pageLink.textContent = i;
        pageLink.addEventListener("click", () => {
          currentPage = i;
          searchImages();
        });
        pagination.appendChild(pageLink);
      }
    })
    .catch(console.log);
  }
 

    const sortLikesBtn = document.getElementById("sortLikesBtn");
      sortLikesBtn.addEventListener("click", () => {
  sortImagesBy("red");
});

    const sortViewsBtn = document.getElementById("sortViewsBtn");
      sortViewsBtn.addEventListener("click", () => {
  sortImagesBy("aqua");
});

    const sortDownloadsBtn = document.getElementById("sortDownloadsBtn");
      sortDownloadsBtn.addEventListener("click", () => {
  sortImagesBy("black");
});


function sortImagesBy(sortBy) {
  const imageContainer = document.getElementById("imageContainer");
  const images = Array.from(imageContainer.children);

  images.sort((a, b) => {
    const aValue= a.querySelector(`.${sortBy}`).textContent.split(":")[1].trim();
    const bValue = b.querySelector(`.${sortBy}`).textContent.split(":")[1].trim();
    return parseInt(bValue) - parseInt(aValue);
  });

  imageContainer.innerHTML = "";
  images.forEach(image => {
    imageContainer.appendChild(image);
  });
}

const bwBtn = document.getElementById("bwBtn");
bwBtn.addEventListener("click", () => {
  applyFilter("bw");
});

const retroBtn = document.getElementById("retroBtn");
retroBtn.addEventListener("click", () => {
  applyFilter("retro");
});

const sepiaBtn = document.getElementById("sepiaBtn");
sepiaBtn.addEventListener("click", () => {
  applyFilter("sepia");
});

const resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click", () => {
  applyFilter("original");
});

function applyFilter(filter) {
  const imageContainer = document.getElementById("imageContainer");
  const images = Array.from(imageContainer.querySelectorAll("img"));
  images.forEach(img => {
    img.classList.remove("bw", "retro", "sepia");
    if (filter !== "original") {
      img.classList.add(filter);
    }
  });
}
