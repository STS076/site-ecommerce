fetch('dress.json')
.then(function(response) {
  return response.json();
})
.then(data => {
    let dress = data.results

    dress.forEach(element => {
        console.log(element.name);
    });

});