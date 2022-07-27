// write your code here
//setAttribute is attached to an element, createAttribute is not yet attached to an element

//row of images div
const menu = document.querySelector('#ramen-menu')

//details div
const ramenDetail = document.querySelector('#ramen-detail')
const image = document.querySelector("#ramen-detail .detail-image")
const restaurant = document.querySelector("#ramen-detail .restaurant")
const itemName = document.querySelector("#ramen-detail .name")
const rating = document.querySelector('#rating-display')
const comment = document.querySelector('#comment-display')

//form
const newForm = document.querySelector('#new-ramen')

//url for localhost
const url = 'http://localhost:3000/ramens'

//add ramen to menu row of images
//ramen parameter takes an object representing a ramen
const addRamen = (ramen) => {

    let menuImg = document.createElement('img');
    menuImg.src = ramen.image;
    menuImg.setAttribute('ramen-id', ramen.id); //include ramen id for editing and deleting
    menu.append(menuImg);
    menuImg.addEventListener('click', (e) => { //on menu image click show ramen in details div
        showRamen(ramen)
    })
}


//show ramen in details div
//ramen parameter takes an object representing a ramen
const showRamen = (ramen) => {
    //update details div with ramen info
    restaurant.innerText = ramen.restaurant;
    itemName.innerText = ramen.name;
    rating.innerText = ramen.rating;
    comment.innerText = ramen.comment;
    image.src = ramen.image;
}

//adds new ramen to database and updates ramen menu, and shows in details div
//e parameter takes form submit event object
const newRamen = (e) => {

    e.preventDefault();
    //build new ramen object from form input
    let newRamen = {
        name: e.target.name.value,
        restaurant: e.target.restaurant.value,
        image: e.target.image.value,
        rating: e.target.rating.value,
        comment: e.target['new-comment'].value
    }

    addRamen(newRamen);
    showRamen(newRamen);

    //reset form
    e.target.reset();
}

//add event listeners using methods above
newForm.addEventListener('submit', newRamen);

//fetch data, return first ramen, and showRamen
fetch(url)
    .then(res => res.json())
    .then(data => {
        data.forEach((el, i) => {
            addRamen(el);
        })
        return data[0] //return first ramen to next '.then'
    })
    .then(firstRamen => showRamen(firstRamen)) 
    .catch(err => console.log(err))

//NOTE: DOMContentLoaded is taken care of with 'defer' keyword in script tag of index.html