
let fashion = document.getElementById('fashion')
fetch('dress.json')
    .then(response =>response.json())
    .then(data => {
        let dress = data.results

        dress.forEach(element => {
            console.log(element.name);
            fashion.innerHTML += `
                <div class="card" style="width: 18rem;">
                    <div id="carousel${element.id}" class="carousel carousel-dark slide" data-bs-ride="carousel" style="width:18rem;">
                        <div class="carousel-inner">
                            <div class="carousel-item active" data-bs-interval="10000">
                            <img style="width:100%" src="${element.imgs[0]}" alt="">
                            </div>
                            <div class="carousel-item" data-bs-interval="2000">
                            <img style="width:100%" src="${element.imgs[1]}" alt="">
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
                        <p></p>
                    </div>
                </div>
            `
        });

    })