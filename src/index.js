/**************CONSTS************** */
const url = "http://localhost:3000/ramens";
const ramenMenu = document.getElementById("ramen-menu");
const ramenDetail = document.getElementById("ramen-detail");
const detailImage = document.querySelector("#ramen-detail .detail-image");
const detailName = document.querySelector("#ramen-detail .name");
const detailRestaurant = document.querySelector("#ramen-detail .restaurant");
const ratingDisplay = document.getElementById("rating-display");
const commentDisplay = document.getElementById("comment-display");
const ramenForm = document.getElementById("new-ramen");
const deleteBtn = document.getElementById('delete-ramen')
let currentRamen;
//CD #1 - see all ramen
//DRY fetch function
function getRamen(url) {
  return fetch(url)
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

//add ramen to menu with onclick event

/*****
 * Parameter
 *
 * {
 *      id: 0,
 *      name: '',
 *      image: '',
 *      restaurant: '',
 *      rating: -1,
 * }
 *
 */

//adds a ramen to the menu bar
function showRamen(ramen) {
  //console.log(ramen)
  //display image for each ramen
  ramenImg = document.createElement("img");
  ramenImg.setAttribute('id', ramen.id)
  ramenImg.src = ramen.image;
  ramenImg.addEventListener("click", () => {
    showDetails(ramen);
  });
  ramenMenu.appendChild(ramenImg);
}

function showDetails(ramen) {
  //populating details div with CURRENT ramen information
  detailImage.src = ramen.image;
  detailName.textContent = ramen.name;
  detailRestaurant.textContent = ramen.restaurant;
  ratingDisplay.textContent = ramen.rating;
  commentDisplay.textContent = ramen.comment;
  currentRamen = ramen.id //update currentRamen to be id of ramen showing details
}



//immediately populates menu with already existing ramens from database on page load
//getRamen(url)
getRamen("http://localhost:3000/ramens").then((data) => {
  //populating the menu
  data.forEach((ramen) => {
    //ramen is now one ramen object
    showRamen(ramen);
  });
  //manually showing the details of the FIRST ramen
  showDetails(data[0])
});

//add ramen to menu
ramenForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let new_ramen = {
    name: e.target.name.value,
    image: e.target.image.value,
    restaurant: e.target.restaurant.value,
    rating: e.target.rating.value,
    comment: e.target["new-comment"].value,
  };
  showRamen(new_ramen);
});

deleteBtn.addEventListener('click', () => {
    console.log(currentRamen)
    //remove menu item where currentRamen === id
    let menuToRemove = document.getElementById(currentRamen.toString())
    menuToRemove.remove()
    detailImage.src = ''
    detailName.textContent = ''
    detailRestaurant.textContent = ''
    ratingDisplay.textContent = ''
    commentDisplay.textContent = ''
})

//PATCH request: `http://localhost:5500/${currentRamen}`

//request the data
// function getData() {
//     fetch(url) //access the url
//     .then(res => res.json()) //convert response into json
//     .then(data => {
//         console.log(data)
//         data.forEach(ramen => {
//             console.log(ramen)
//             //display image for each ramen
//             ramenImg = document.createElement('img')
//             ramenImg.src = ramen.image
//             ramenMenu.appendChild(ramenImg)
//         })
//     }) //do something with data
//     .catch(err => console.log(err))
// }

// getData()
//iterate through the data
//create one image tag for current ramen
