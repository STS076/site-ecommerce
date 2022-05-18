let fashion = document.getElementById('fashion')
let panier = document.getElementById('panier')
let panierCount = 0
let vosArticles = document.getElementById('vosArticles')
let myArticlesArray = []
fetch('dress.json')
    .then(response =>response.json())
    .then(data => {
        let dress = data.results

        dress.forEach(element => {
            console.log(element.name);
            fashion.innerHTML += `
                <div class="card mt-2 mb-2" style="width: 14rem;">
                    <div id="carousel${element.id}" class="carousel carousel-dark slide" data-bs-ride="carousel" style="width:14rem;">
                        <div class="carousel-inner">
                            <div class="carousel-item active" data-bs-interval="10000">
                            <img style="width:100%" src="img/${element.imgs[0]}" alt="">
                            </div>
                            <div class="carousel-item" data-bs-interval="2000">
                            <img style="width:100%" src="img/${element.imgs[1]}" alt="">
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carousel${element.id}" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carousel${element.id}" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                    <div class="card-body">
                        <p>${element.name}</p>
                        <div class="d-flex justify-content-evenly">
                            <div class="badge bg-primary py-3">${element.price}€</div>
                            <button id="article-${element.id}" class="btn btn-primary smoll-text" onclick="addToCart(id,${element.id})">Ajouter au panier</button>
                        </div>
                    </div>
                </div>
            `
        });

    })

    function addToCart(idBtn, idElement) {
        console.log(idBtn);
        panierCount++
        myArticlesArray.push(idElement)
        // console.log(panierCount);
        panier.innerHTML = "+ " + panierCount
        // Object.values(object1)
        // myArticlesArray.splice(myArticlesArray.indexOf(element), 1)
        console.log(myArticlesArray);
    }