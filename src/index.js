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
//forms and delete button
const newForm = document.querySelector('#new-ramen')
const editForm = document.querySelector('#edit-ramen')
const deleteBtn = document.querySelector('#delete-ramen')
//url for localhost
const url = 'http://localhost:3000/ramens'

//show ramen in details div
//ramen parameter takes an object representing a ramen
const showRamen = (ramen) => {
    //including new attribute ramen-id for editing and deleting
    let ramenId = ramen.id;
    ramenDetail.setAttribute('ramen-id', ramenId); 
    deleteBtn.setAttribute('ramen-id', ramenId);
    editForm.setAttribute('ramen-id', ramenId);
    restaurant.innerText = ramen.restaurant;
    itemName.innerText = ramen.name;
    rating.innerText = ramen.rating;
    comment.innerText = ramen.comment;
    image.src = ramen.image;
}

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

//deletes ramen from database and removes from ramen menu
//e parameter takes on click event object
const deleteRamen = (e) => {
    let menuList = document.querySelectorAll('#ramen-menu img')
    let rmId = e.target.getAttribute('ramen-id')
    menuList.forEach((el, i) => {
        if (el.getAttribute('ramen-id') === rmId) {
            el.remove();
        }
    })
    fetch(`${url}/${rmId}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
}

//edit ramen from database using PATCH and updates in details div
//e parameter takes form submit event object
const editRamen = (e) => {
    e.preventDefault();
    let newRating = e.target.rating.value;
    console.log(`new rating is ${rating}`)
    let newComment = e.target['new-comment'].value;
    let ramenId = e.target.getAttribute('ramen-id');
    rating.innerText = newRating;
    comment.innerText = newComment;
    let body = {
        rating: newRating,
        comment: newComment
    }
    fetch(`${url}/${ramenId}`, {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    e.target.reset();
}

//adds new ramen to database and updates ramen menu, and shows in details div
//e parameter takes form submit event object
const newRamen = (e) => {
    e.preventDefault();
    let newRamen = {
        name: e.target.name.value,
        restaurant: e.target.restaurant.value,
        image: e.target.image.value,
        rating: e.target.rating.value,
        comment: e.target['new-comment'].value
    }


    fetch(url, {
        method: 'POST',
        body: JSON.stringify(newRamen),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        addRamen(data);
        showRamen(data);
    })
    .catch(err => console.log(err))

    e.target.reset();
}

deleteBtn.addEventListener('click', deleteRamen);
editForm.addEventListener('submit', editRamen);
newForm.addEventListener('submit', newRamen);

//when dom is loaded fetch data, return first ramen, and showRamen
document.addEventListener('DOMContentLoaded', (e) => {
    fetch(url)
    .then(res => res.json())
    .then(data => {
        data.forEach((el, i) => {
            addRamen(el);
        })
        return data[0] //return first ramen to next then
    })
    .then(firstRamen => showRamen(firstRamen)) 
})