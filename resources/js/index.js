async function fetchMagazineData(magazineUrl) {
  try {
    let ResponseObject = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${magazineUrl}`
    );
    let jsonData = await ResponseObject.json();
    return jsonData;
  } catch (error) {
    return null;
  }
}

function updateTheDom(magazineData) {
  console.log(magazineData);
  let divCard = document.createElement("div");
  divCard.setAttribute("class", "card mb-4");
  document.getElementById("accordion").append(divCard);

  divCard.innerHTML = `<div class="card-header" id="heading${idCounter}">
  <h5 class="mb-0">
    <button class="badge badge-light" data-toggle="collapse" data-target="#collapse${idCounter}" role="button" aria-expanded="false" aria-controls="collapse${idCounter}">
    <i class="fas fa-angle-down"></i>
    ${magazineData.feed.title}
    </button>
  </h5>
</div>
<div id="collapse${idCounter}" class="collapse" aria-labelledby="heading${idCounter}" data-parent="#accordion">
  <div class="card-body">
  
  <div id="carouselExampleControls${idCounter}" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner">
     ${magazineData.items
       .map((item) => {
         return `<a href=${item.link} class="carousel-item">
       <div class="card">
       <img class="card-img-top d-block w-100" src=${item.enclosure.link} alt="Card image cap">
       <div class="card-body">
         <h5 class="card-title">${item.title}</h5>
         <p class="card-text">${item.description}</p>
       </div>
     </div>
              </a>`;
       })
       .join("")}
  </div>

  <a class="carousel-control-prev" data-target="#carouselExampleControls${idCounter}" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="false"></span>
    <span class="sr-only">Previous</span>
  </a>
  
  <a class="carousel-control-next" data-target="#carouselExampleControls${idCounter}" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="false"></span>
    <span class="sr-only">Next</span>
  </a>
</div> 

  </div>
</div>

`;

  document.querySelector(".collapse").setAttribute("class", "collapse show");
  let carouselItemAll = document.querySelectorAll(".carousel-item");
  carouselItemAll[10 * (idCounter - 1)].setAttribute(
    "class",
    "carousel-item active"
  );
}

let idCounter = 1;
async function controllerFunction() {
  for (const magazineUrl of magazines) {
    let magazineData = await fetchMagazineData(magazineUrl);
    updateTheDom(magazineData);
    idCounter++;
  }
}

controllerFunction();
