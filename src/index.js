const url = "http://localhost:3000/ramens"
const ramenMenu = document.querySelector('#ramen-menu')
const ramenImage = document.querySelector('#ramen-detail .detail-image')
const ramenName = document.querySelector('#ramen-detail .name ')
const ramenRestaurant = document.querySelector('#ramen-detail .restaurant')
const ramenRating = document.querySelector('#rating-display')
const ramenComment = document.querySelector('#comment-display')
const newRamenForm = document.querySelector('#new-ramen')
const deleteBtn = document.querySelector('#delete-ramen')
const editRamenForm = document.querySelector('#edit-ramen')

//DELIVERABLE 1: get all data from server
const getAllData = () => {
    fetch(url)
    .then(res => res.json())
    .then(data => {
        //3. iterate over data
        data.forEach(curRamen => {
            addToMenu(curRamen)
        })
    })
    //console.log(data) will not work - out of scope - in synchronous area
}

//DELIVERABLE 2: add ramen image to ramen menu
const addToMenu = (ramen) => {
    let img = document.createElement('img')
    img.src = ramen.image 
    //1. on ramen menu click 
    img.addEventListener('click', () => {
        //2. get ramen details and populate appropriate elements
        ramenRating.innerText = ramen.rating 
        ramenRestaurant.innerText = ramen.restaurant
        ramenName.innerText = ramen.name
        ramenImage.src = ramen.image 
        ramenComment.innerText = ramen.comment
    })
    //add image element (with event listener) to menu bar up top
    ramenMenu.append(img)
    
}

//DELIVERABLE 3: on new ramen form submit
const addNewRamen = (e) => {
    e.preventDefault()
    //2. get user input data from form
    let body = {
        name: e.target.name.value,
        restaurant: e.target.restaurant.value,
        rating: e.target.rating.value,
        comment: e.target['new-comment'].value,
        image: e.target.image.value
    }
    addToMenu(body)

    //3. make post request
    //4. if request successful, add new ramen to #ramen-menu div (along with being able to click on it)
}

    


//make function to populate #ramen-menu and show ramen details


//code that runs on index.js load down here
document.addEventListener('DOMContentLoaded', () => {
    getAllData()
    newRamenForm.addEventListener('submit', (e) => {
        addNewRamen(e)
    })
})