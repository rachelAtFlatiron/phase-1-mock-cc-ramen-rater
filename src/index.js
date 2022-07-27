//see all ramen image in ramen-menu
//get #ramen-menu
const ramenMenu = document.querySelector('#ramen-menu');
const ramenDetails = document.querySelector('#ramen-detail');
const ramenImage = document.querySelector('.detail-image');
const ramenName = document.querySelector('#ramen-detail .name')
const ramenRestaurant = document.querySelector('#ramen-detail .restaurant')
const ramenRating = document.querySelector('#rating-display');
const ramenComment = document.querySelector('#comment-display');
const ramenForm = document.querySelector('#new-ramen');
const editForm = document.querySelector('#edit-ramen');
//const deleteBtn = document.querySelector('#delete-ramen');
const url = 'http://localhost:3000/ramens';

//id of current displayed ramen
let activeRamen = 1;

//add ramen image to menu, create on click event
const addRamen = function(ramen){
    //create an image tag
    let image = document.createElement('img');
    //create new attribute to pass down ramen id info
    image.setAttribute('ramen-id', ramen.id);
    //add image to src
    image.src = ramen.image;
    //append image to #ramen-div
    ramenMenu.append(image);
    //on ramen-menu click show ramen in details
    image.addEventListener('click', (e) => {
        showRamen(ramen);
    })
    //create delete button
    let deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'delete';
    //on click remove button AND menu image
    deleteBtn.addEventListener('click', function(){
        image.remove();
        deleteBtn.remove();
    })
    //add delete button to ramen div
    ramenMenu.append(deleteBtn);
}

//fetching one single ramen using id
const getDataById = function(ramenId){
    return fetch(`${url}/${ramenId}`)
    .then(res => res.json())
}

//populates display div with information
const showRamen = function(ramen){
    editForm.setAttribute('ramen-id', ramen.id);
    ramenImage.src = ramen.image;
    ramenName.innerText = ramen.name;
    ramenRestaurant.innerText = ramen.restaurant;
    ramenRating.innerText = ramen.rating;
    ramenComment.innerText = ramen.comment;
}

//fetch GET all ramen
fetch(url)
.then(res => {
    return res.json()
}) 
.then(ramens => {
    //iterate through all ramen
    ramens.forEach((ramen, index) => {
        addRamen(ramen);
    })    
    showRamen(ramens[0])
})
        
//submit form create new ramen
ramenForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(e.target.name.value);
    let newRamen = {
        name: e.target.name.value,
        restaurant: e.target.restaurant.value,
        rating: e.target.rating.value,
        comment: e.target['new-comment'].value,
        image: e.target.image.value
    }
    addRamen(newRamen);

    e.target.reset();
})

//update current ramen
editForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get new values from form
    let newRating = e.target.rating.value;
    let comment = e.target['new-comment'].value;
    
    //update div
    ramenRating.innerText = newRating;
    ramenComment.innerText = comment;

    //clear form
    e.target.reset();
})