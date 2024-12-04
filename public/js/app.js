let result = "";
fetch("./frontEndData.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    appendData(data);
  })
  .catch(function (err) {
    console.log("error: " + err);
  });
function appendData(data) {
  data.forEach(
    ({ crop, seedPrice, growTime, profDaily, regrow, image, link } = rows) => {
      result += `
        <div class="card">
        <img class="card-image" src="${image}" alt="Product image for the ${crop} VSCode extension."/>
        <h1 class="card-name">${crop}</h1>
        <h1 class="card-seedPrice">${seedPrice}</h1>
        <h1 class="card-growTime">${growTime}</h1>
        <h1 class="card-profDaily">${profDaily}</h1>
        <h1 class="card-regrow">${regrow}</h1>
        <a class="card-link" href=${link}><button class="btn"><img class="mag-image" src="images/Magnifying_Glass.png" alt="Magnifying Glass"/></button></a>
        </div>
        `;
    }
  );
  document.querySelector(".container").innerHTML = result;
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("js/serviceWorker.js")
      .then((res) => console.log("service worker registered"))
      .catch((err) => console.log("service worker not registered", err));
  });
}
