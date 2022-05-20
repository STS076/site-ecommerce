let fashion = document.getElementById('fashion')
let panier = document.getElementById('panier')
let vosArticles = document.getElementById('vosArticles')

let password = document.getElementById("password")
let name = document.getElementById("name")
let surname = document.getElementById("surname")
let emailAddress = document.getElementById("emailAddress")
let checkbox = document.getElementById("checkbox")
let submit = document.getElementById("submit")
let confirmPassword = document.getElementById("confirmPassword")
let page = document.getElementById("page")
let myCartArray = []
let allArticlesArray = []
let panierCount = 0
let countCard = 0

// panier.innerHTML = "+ " + localStorage.getItem("mycount")

// localStorage.setItem("mycount", panierCount)
// let nombres = localStorage.getItem("mycount")
// nombres = nombres.split(",")
// if (localStorage.getItem("mycount") != ""){
//     panierCount = localStorage.getItem("mycount")
// } 

fetch('dress.json')
    .then(response => response.json())
    .then(data => {
        let count = 0
        let dress = data.results
        dress.forEach(element => {
            allArticlesArray.push(element)
            fashion.innerHTML += `
                <div class="card my-2 col-lg-3 col-10 mx-2" >
                    <div id="carousel-${element.id}" class="carousel carousel-dark slide" data-bs-ride="carousel" >
                        <div class="carousel-inner">
                            <div class="carousel-item active" data-bs-interval="10000">
                            <img style="width:100%" src="img/${element.imgs[0]}" alt="vue vêtement de face">
                            </div>
                            <div class="carousel-item" data-bs-interval="2000">
                            <img style="width:100%" src="img/${element.imgs[1]}" alt="vue vêtement de dos">
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carousel-${element.id}" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carousel-${element.id}" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                    <div class="card-body">
                        <p class="txtSize">${element.name}</p>
                        <div class="d-flex  justify-content-between align-items-center ">
                            <div class="fw-bold">${element.price}€</div>
                            <button id="${element.id}-btn" class="btn p-2 smoll-text" onclick="addToCart(${count})">Ajouter au panier</button>
                        </div>
                    </div>
                </div>
            `
            count++
        });
    })

function addToCart(element) {
    panierCount++
    panier.innerHTML = "+ " + panierCount
    myCartArray.push(allArticlesArray[element])
    console.log(myCartArray)

    myCartArray.forEach(element => {
        // nbId = document.getElementById('nb' + countCard).value
        vosArticles.innerHTML += `<div class="card mt-1" id="card${countCard}" >
        <div class="row g-0">
          <div class="col-lg-4 col-4">
          <img  style="width:100%"  src="img/${element.imgs[0]}" alt="vêtement dans votre panier">
          </div>
          <div class="col-lg-8 col-8">
            <div class="card-body">
                <p class="card-title fw-bold fs-5">${element.name}</p>
                <div class=" d-flex justify-content-evenly">
                    <p class="card-text">${element.price}€</p>
                    <div class="d-flex">
                        <input id="nb${countCard}" type="number" class="taille" min="1" value="1"></input>
                        <button class="btn filtres text-dark fw-bold btn-sm d-flex align-items-end " onclick="deleteItem('card${countCard}')">Supprimer</button>
                    </div>
                    <p class="card-text" id="priceAll${countCard}">€</p>
                </div>
            </div>
          </div>
        </div>
      </div>`
        countCard++
    });

}

function accessCart() {
    for (let i = 0; i < vosArticles.length; i++) {
        let nbId = document.getElementById('nb' + i)
        // console.log(nbId);
        nbId.addEventListener('click', function priceArticle() {
                console.log(nbId.value);
        })
    }

}
function register (){
    mainView.style.display = 'none';
    landingPage.style.display = 'none';
    registerYourself.style.display = "block";
}


function showClothes() {
    let mainView = document.getElementById('mainView');
    let landingPage = document.getElementById('landingPage')
    let registerYourself = document.getElementById("registerYourself")
    mainView.style.display = 'block';
    landingPage.style.display = 'none';
    registerYourself.style.display = "none";
}


function deleteItem(element) {
    let card = document.getElementById(element)
    card.remove()
    myCartArray.splice(card, 1)
    panierCount--
    panier.innerHTML = "+ " + panierCount
}

function validForm (){
    if (surname.value == ""){
        errorsurname.innerHTML = `<p class="text-danger">*Merci de bien vouloir renseigner votre Nom</p>`
        surname.style.backgroundColor = `pink`
    } else  {
        errorsurname.innerHTML = ""
        surname.style.backgroundColor = ""
    }

    if (name.value == ""){
        errorname.innerHTML = `<p class="text-danger">*Merci de bien vouloir renseigner votre Prénom</p>`
        name.style.backgroundColor = `pink`
    } else if (name.value != ""){
        errorname.innerHTML = ""
        name.style.backgroundColor = ""
    }

    if(emailAddress.value == ""){
        erroremailAddress.innerHTML = `<p class="text-danger">*Merci de bien vouloir renseigner votre email</p>`
        emailAddress.style.backgroundColor = `pink`
    } else if (emailAddress.value != ""){
        erroremailAddress.innerHTML = ""
        emailAddress.style.backgroundColor = ""
    }

    if (checkbox.checked == false ){
        errorcheckbox.innerHTML = `<p class="text-danger">*Merci de bien vouloir valider les CGU</p>`
    } else if (checkbox.checked == true){
        errorcheckbox.innerHTML = ""
    }

    if(password.value == ""){
        errorpassword.innerHTML = `<p class="text-danger">*Merci de bien vouloir renseigner votre mot de passe</p>`
        password.style.backgroundColor = `pink`
    }     else if (password.value != "") {
        errorpassword.innerHTML = ""
        password.style.backgroundColor = ""
    }

    if (confirmPassword.value == ""){
        errorconfirmPassword.innerHTML = `<p class="text-danger">*Merci de bien vouloir confirmer votre mot de passe</p>`
        confirmPassword.style.backgroundColor = `pink`
    }
    if (confirmPassword.value != password.value){
        errorconfirmPassword.innerHTML = `<p class="text-danger">*Veuillez rentrer un MDP identique</p>`
        confirmPassword.style.backgroundColor = `pink`
        
    } 
    else if (confirmPassword.value != "" && confirmPassword.value == password.value){
        errorconfirmPassword.innerHTML = ""
        confirmPassword.style.backgroundColor = ""
    }

    if (surname.value != "" && name.value != "" && password.value != "" && emailAddress.value != "" && confirmPassword.value == password.value && checkbox.checked == true ){
        mainView.style.display = 'none';
        landingPage.style.display = 'block';
        registerYourself.style.display = "none";
    }  
    
}

function cleanError(id){
    let errormessage = document.getElementById("error" + id)
    errormessage.innerHTML = ""
    let background = document.getElementById(id)
    background.style.backgroundColor = ""
}