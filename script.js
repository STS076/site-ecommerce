let fashion = document.getElementById('fashion')
let panier = document.getElementById('panier')
let panierCount = 0
let vosArticles = document.getElementById('vosArticles')
let myArticlesArray = []
let thisArt


fetch('dress.json')
    .then(response => response.json())
    .then(data => {
        let dress = data.results
        dress.forEach(element => {
            fashion.innerHTML += `
                <div class="card my-2 col-lg-3 col-10 mx-2" >
                    <div id="carousel-${element.id}" class="carousel carousel-dark slide" data-bs-ride="carousel" >
                        <div class="carousel-inner">
                            <div class="carousel-item active" data-bs-interval="10000">
                            <img style="width:100%" src="img/${element.imgs[0]}" alt="">
                            </div>
                            <div class="carousel-item" data-bs-interval="2000">
                            <img style="width:100%" src="img/${element.imgs[1]}" alt="">
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
                        <p>${element.name}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="fw-bold">${element.price}€</div>
                            <button id="${element.id}-btn" class="btn p-2 smoll-text" onclick="addToCart('${element.id}')">Ajouter au panier</button>
                        </div>
                    </div>
                </div>
            `
        });


    })

function addToCart(idElement) {
    panierCount++
    // myArticlesArray.push(idElement)
    console.log(panierCount);
    panier.innerHTML = "+ " + panierCount
    // Object.values(object1)
    // console.log(myArticlesArray);
    // thisArt = Object.values(json)
    dress.splice(dress.indexOf(idElement), 1)
    // console.log(thisArt);
}