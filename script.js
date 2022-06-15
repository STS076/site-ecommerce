let fashion = document.getElementById('fashion')
let panier = document.getElementById('panier')
let vosArticles = document.getElementById('vosArticles')
let password = document.getElementById("password")
let name = document.getElementById("name")
let surname = document.getElementById("surname")
let emailAddress = document.getElementById("emailAddress")
let submit = document.getElementById("submit")
let confirmPassword = document.getElementById("confirmPassword")
let page = document.getElementById("page")
let myCartArray = []
let allArticlesArray = []
let panierCount = 0
let countCard = 0


fetch('dress.json')
    .then(response => response.json())
    .then(data => {
        let dress = data.results
        
        dress.forEach((element, key) => {
            const images = element.imgs.map((__, key) => `<button type="button" data-bs-target="#carousel-${element.id}" data-bs-slide-to="${key}" ${key == 0 ? 'class="active" aria-current="true"' : null} aria-label="Slide ${key + 1}"></button>`)
            allArticlesArray.push(element)
            fashion.innerHTML += `
                <div class="col-12 col-sm-6 col-lg-4 col-xl-3 " >
                    <div class="card m-2" >
                        <div id="carousel-${element.id}" class="carousel carousel-dark slide" data-bs-ride="carousel" >
                            <div class="carousel-indicators">
                                ${images}
                            </div>
                            <div class="carousel-inner">
                                <div class="carousel-item active" data-bs-interval="10000">
                                <img style="width:100%" src="img/${element.imgs[0]}" alt="vue vêtement de face" loading="lazy">
                                </div>
                                <div class="carousel-item" data-bs-interval="2000">
                                <img style="width:100%" src="img/${element.imgs[1]}" alt="vue vêtement de dos" loading="lazy">
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
                                <button id="${element.id}-btn" class="btn p-2 smoll-text" onclick="addToCart(${key})">Ajouter au panier</button>
                            </div>
                        </div>
                    </div>
                </div>
            `
        });
        console.log(allArticlesArray);
    })

function addToCart(element) {
    let item = {
        "item": allArticlesArray[element],
        "quantity": 1
    }
    if (myCartArray[element]) {
        myCartArray[element].quantity++
    } else {
        myCartArray.push(item)
    }
    console.log(myCartArray);

    vosArticles.innerHTML = '';
    myCartArray.forEach((element, key) => {
        vosArticles.innerHTML += `
                <div class="card mt-2" id="card${key}" >
                    <div class="row g-0">
                        <div class="col-lg-2 col-2">
                            <img  style="width:100%" src="img/${element.item.imgs[0]}" alt="vêtement dans votre panier">
                        </div>
                        <div class="col-lg-10 col-10">
                            <div class="card-body">
                                <div class="d-flex justify-content-between mb-2">
                                    <p class="card-title fw-bold">${element.item.name}</p>
                                    <a type="button" class="mx-1 aH my-0 p-0 text-dark fw-bold btn-sm d-flex align-items-end " onclick="deleteItem('card${key}')">
                                        <i class="bi bi-trash3"></i>
                                    </a>
                                </div>
                                <div class="d-flex justify-content-evenly">
                                    <p class="mx-1 card-title">${element.item.id}</p>
                                    <p class="mx-1 card-text">${element.item.price}€</p>
                                    <input id="nb${element.item.id}" type="number" class="mx-1 p-1 taille" min="1" value="${element.quantity}" data-cart-itemquantity="${key}">
                                    <p class="mx-1 card-text" data-soustotal id="priceAll${element.item.id}">${element.item.price * element.quantity}€</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
    });
    panier.innerHTML = myCartArray.length
    total()
}

function total() {
    let sophie = 0
    let allSoustotal = document.querySelectorAll("[data-soustotal]")
    allSoustotal.forEach(element => {
        sophie += parseFloat(element.innerHTML)
    });
    let totalDiv = document.getElementById('totalDiv')
    totalDiv.innerHTML = "Total : " + sophie + '€'
    console.log(sophie);
    listenCartQuantity()
}

function sousTotalClacul(array) {
    array.forEach(element => {
        element.priceByQuantity = element.quantity * element.price
    });
}

function checkItem(array, item) {
    let sophie = false;
    array.forEach(element => {
        if (element.id == item) {
            element.quantity++
            sophie = true;
        }
    });
    return sophie;
}

function register() {
    mainView.classList.add('d-none');
    landingPage.style.display = 'none';
    registerYourself.style.display = "block";
}

function showClothes() {
    let mainView = document.getElementById('mainView');
    let landingPage = document.getElementById('landingPage')
    let registerYourself = document.getElementById("registerYourself")
    mainView.classList.remove('d-none');
    landingPage.style.display = 'none';
    registerYourself.style.display = "none";
}

function deleteItem(element) {
    let card = document.getElementById(element)
    card.remove()
    myCartArray.splice(card, 1)
    panier.innerHTML = myCartArray.length
    total()
}

function validForm() {
    if (surname.value == "") {
        errorsurname.innerHTML = `<p class="text-danger">*Merci de bien vouloir renseigner votre Nom</p>`
        surname.style.backgroundColor = `pink`
    } else {
        errorsurname.innerHTML = ""
        surname.style.backgroundColor = ""
    }
    if (name.value == "") {
        errorname.innerHTML = `<p class="text-danger">*Merci de bien vouloir renseigner votre Prénom</p>`
        name.style.backgroundColor = `pink`
    } else if (name.value != "") {
        errorname.innerHTML = ""
        name.style.backgroundColor = ""
    }
    if (emailAddress.value == "") {
        erroremailAddress.innerHTML = `<p class="text-danger">*Merci de bien vouloir renseigner votre email</p>`
        emailAddress.style.backgroundColor = `pink`
    } else if (emailAddress.value != "") {
        erroremailAddress.innerHTML = ""
        emailAddress.style.backgroundColor = ""
    }
    if (checkbox.checked == false) {
        errorcheckbox.innerHTML = `<p class="text-danger">*Merci de bien vouloir valider les CGU</p>`
    } else if (checkbox.checked == true) {
        errorcheckbox.innerHTML = ""
    }
    if (password.value == "") {
        errorpassword.innerHTML = `<p class="text-danger">*Merci de bien vouloir renseigner votre mot de passe</p>`
        password.style.backgroundColor = `pink`
    } else if (password.value != "") {
        errorpassword.innerHTML = ""
        password.style.backgroundColor = ""
    }
    if (confirmPassword.value == "") {
        errorconfirmPassword.innerHTML = `<p class="text-danger">*Merci de bien vouloir confirmer votre mot de passe</p>`
        confirmPassword.style.backgroundColor = `pink`
    }
    if (confirmPassword.value != password.value) {
        errorconfirmPassword.innerHTML = `<p class="text-danger">*Veuillez rentrer un MDP identique</p>`
        confirmPassword.style.backgroundColor = `pink`

    } else if (confirmPassword.value != "" && confirmPassword.value == password.value) {
        errorconfirmPassword.innerHTML = ""
        confirmPassword.style.backgroundColor = ""
    }
    if (surname.value != "" && name.value != "" && password.value != "" && emailAddress.value != "" && confirmPassword.value == password.value && checkbox.checked == true) {
        mainView.classList.add('d-none');
        landingPage.style.display = 'block';
        registerYourself.style.display = "none";
    }
}

function cleanError(id) {
    let errormessage = document.getElementById("error" + id)
    errormessage.innerHTML = ""
    let background = document.getElementById(id)
    background.style.backgroundColor = ""
}

function trierArticles(filter) {
    allArticlesArray.forEach(element => {
        element.category.forEach(filterCategories => {
            if (filterCategories != "robe" && filter == "robe") {
                return;
            } else if (filterCategories != "blouse" && filter == "blouse") {
                return;
            } else if (filterCategories != "tshirt" && filter == "tshirt") {
                return;
            } else if (filterCategories != "debardeur" && filter == "debardeur") {
                return;
            } else if (filterCategories != "bas" && filter == "bas") {
                return;
            } else if (filterCategories != "ensemble" && filter == "ensemble") {
                return;
            } else if (filterCategories != "combinaison" && filter == "combinaison") {
                return;
            }
            filterCards(element);
        })
    });
}

function valider() {
    let robe = document.getElementById("robe")
    let blouse = document.getElementById("blouse")
    let tshirt = document.getElementById("tshirt")
    let debardeur = document.getElementById("debardeur")
    let bas = document.getElementById("bas")
    let ensemble = document.getElementById("ensemble")
    let combinaison = document.getElementById("combinaison")

    let choice = [] //array for multiple choice
    let showAll = true

    if (robe.checked == true) {
        choice.push("robe")
        showAll = false
    }
    if (blouse.checked == true) {
        choice.push("blouse")
        showAll = false
    }
    if (tshirt.checked == true) {
        choice.push("tshirt")
        showAll = false
    }
    if (debardeur.checked == true) {
        choice.push("debardeur")
        showAll = false
    }
    if (bas.checked == true) {
        choice.push("bas")
        showAll = false
    }
    if (ensemble.checked == true) {
        choice.push("ensemble")
        showAll = false
    }
    if (combinaison.checked == true) {
        choice.push("combinaison")
        showAll = false
    }

    if (showAll == false) {
        fashion.innerHTML = ""

        allArticlesArray.forEach((element, key) => {
            //The every() function behaves exactly like forEach(), except it stops iterating through the array whenever the callback function returns a falsy value.
            element.category.every(cat => {
                if (choice.indexOf(cat) != -1 ) {
                    filterCards(element, key)
                    return false
                }
            })
        });
    }
}

function filterCards(element, key) {
    fashion.innerHTML += 
    `<div class="col-12 col-sm-6 col-lg-4 col-xl-3 " >
        <div class="card m-2">
            <div id="carousel-${element.id}" class="carousel carousel-dark slide" data-bs-ride="carousel" >
                <div class="carousel-inner">
                    <div class="carousel-item active" data-bs-interval="10000">
                    <img style="width:100%" src="img/${element.imgs[0]}" alt="vue vêtement de face" loading="lazy">
                    </div>
                    <div class="carousel-item" data-bs-interval="2000">
                    <img style="width:100%" src="img/${element.imgs[1]}" alt="vue vêtement de dos" loading="lazy">
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
                    <button id="${element.id}-btn" class="btn p-2 smoll-text" onclick="addToCart(${key})">Ajouter au panier</button>
                </div>
            </div>
        </div>
    </div>
    `
};

function listenCartQuantity() {
    let allQuantityInputs = document.querySelectorAll('input[data-cart-itemquantity]')
    console.log(allQuantityInputs);
    allQuantityInputs.forEach((input, key) => {
        input.addEventListener('change', function () {
            myCartArray[this.dataset.cartItemquantity].quantity = parseInt(this.value)
            let subTotal = document.querySelector(`#card${this.dataset.cartItemquantity} [data-soustotal]`)
            subTotal.innerText = (myCartArray[this.dataset.cartItemquantity].item.price * parseInt(this.value)) + '€'
            total()
        })
    })
}

