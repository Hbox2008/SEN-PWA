// Search box detection

const searchBox = document.getElementById("search-form");
let requestedFilter;
searchBox.addEventListener("submit", (event) => {
  console.log("hi");
  event.preventDefault();
  console.log(searchBox.elements.bar.value);
  loadCrops("Name", searchBox.elements.bar.value);
});

// searchBox has a submit event, run the listener function like this: listener(Event)

loadCrops();

const filterButtons = document.querySelectorAll(".filterButtons button");
let buttonID;

console.log(filterButtons);

filterButtons.forEach((filterButtons) => {
  filterButtons.addEventListener("click", buttonClicked);
});

function buttonClicked() {
  buttonID = this.id;

  // let filterThing;

  switch (buttonID) {
    case "Spring":
      if (requestedFilter != "Spring") {
        requestedFilter = "Spring";
      } else {
        requestedFilter = "All";
      }
      break;
    case "Summer":
      if (requestedFilter != "Summer") {
        requestedFilter = "Summer";
      } else {
        requestedFilter = "All";
      }
      break;
    case "Fall":
      if (requestedFilter != "Fall") {
        requestedFilter = "Fall";
      } else {
        requestedFilter = "All";
      }
      break;
    case "Winter":
      if (requestedFilter != "Winter") {
        requestedFilter = "Winter";
      } else {
        requestedFilter = "All";
      }
      break;
    default:
      requestedFilter = null;
  }

  console.log(requestedFilter);

  loadCrops("Season", requestedFilter);
}

function loadCrops(filterType, filter) {
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
      ({
        crop,
        seedPrice,
        growTime,
        profDaily,
        regrow,
        image,
        link,
        season,
      } = rows) => {
        if (filterCondition(filterType, filter)) {
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

        function filterCondition(filterType, filter) {
          if (filter == null || filter == "") {
            return true;
          }

          switch (filterType) {
            case "Season":
              if (season == filter || filter == "All" || season == "All") {
                return true;
              }
              break;
            case "Name":
              if (crop.toLowerCase().includes(filter)) {
                return true;
              }
              break;
            default:
              return true;
          }
        }
      }
    );

    // Special error message if nothing is found.
    // if (result == "") {
    //   result = `
    //         <div class="card">
    //         <img class="card-image" src="../images/favicon.png" alt="Image of Winston Plushie."/>
    //         <h1 class="card-name">Pokemon not found :(</h1>
    //         <p class="card-seedPrice">You searched: "${filter}".
    //         <br>To reset filter, enter nothing.
    //         </p>
    //         `;
    // }

    document.querySelector(".container").innerHTML = result;
  }
}

// Serviceworker stuff
if ("serviceworker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceworker
      .register("js/serviceworker.js")
      .then((res) => console.log("service worker registered"))
      .catch((err) => console.log("service worker not registered", err));
  });
}
