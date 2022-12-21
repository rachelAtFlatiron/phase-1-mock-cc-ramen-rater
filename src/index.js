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
let globalRamen = -1

//DELIVERABLE 1: get all data from server
const getAllData = () => {
    fetch(url)
    .then(res => res.json())
    .then(data => {
        //iterate over data
        data.forEach(curRamen => {
            addToMenu(curRamen)
        })
        //AD 1: show first ramen on page load
        showDetails(data[0])
        globalRamen = data[0].id
    })
    //console.log(data) will not work - out of scope - in synchronous area
}

//DELIVERABLE 2: add ramen image to ramen menu
const addToMenu = (ramen) => {
    let img = document.createElement('img')
    img.src = ramen.image 
    img.id = `id${ramen.id}`
    //1. on ramen menu click 
    img.addEventListener('click', () => {
        showDetails(ramen)
        globalRamen = ramen.id
        console.log("cur ramen id", globalRamen)
    })
    //add image element (with event listener) to menu bar up top
    ramenMenu.append(img)
}

const showDetails = (ramen) => {
    //get ramen details and populate appropriate elements
    ramenRating.innerText = ramen.rating 
    ramenRestaurant.innerText = ramen.restaurant
    ramenName.innerText = ramen.name
    ramenImage.src = ramen.image 
    ramenComment.innerText = ramen.comment
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
}

//on edit form submit
const editRamen = (e) => {
    e.preventDefault()
    //get user information 
    let newRating = e.target.rating.value 
    let newComment = e.target['new-comment'].value
    //update the comment and rating divs with said information
    ramenComment.innerText = newComment
    ramenRating.innerText = newRating
}

const deleteRamen = () => {
    //get current ramen id : globalRamen
    //find ramen icon in menu with ramen id
    document.querySelector(`#ramen-menu #id${globalRamen}`).remove()
    //clear ramen details divs
    showDetails({ 
        image: '',
        rating: 0,
        restaurant: '',
        name: '',
        comment: ''
    })
}

//code that runs on index.js load down here
document.addEventListener('DOMContentLoaded', () => {
    getAllData()
    newRamenForm.addEventListener('submit', (e) => {
        addNewRamen(e)
    })
    editRamenForm.addEventListener('submit', (e) => {
        editRamen(e)
    })

    deleteBtn.addEventListener('click', () => {
        deleteRamen()
    })
})

//1. create global variable to keep track of selected ramen
//2. include ramen id on each menu icon
//3. update global variable when new ramen is selected
//4. on delete button click, remove menu ramen icon with global id 
//5. clear the details section