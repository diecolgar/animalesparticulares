const landingSelectableZona = document.querySelector(".selectable.zona")
const landingSelectableEspecie = document.querySelector(".selectable.especie")
const landingSelectableRaza = document.querySelector(".selectable.raza")
const landingOptionsZona = document.querySelector(".options-zona")
const landingOptionsEspecie = document.querySelector(".options-especie")
const specificOptionZona = document.querySelectorAll(".options-zona .option")
const specificOptionEspecie = document.querySelectorAll(".options-especie .option")
// const specificOptionRaza = document.querySelectorAll(".options-raza .option")
const chosenZonaText = document.querySelector(".selectable.zona p")
const chosenEspecieText = document.querySelector(".selectable.especie .chosen p")
const chosenRazaText = document.querySelector(".selectable.raza p")
const chosenEspecieImg = document.querySelector(".selectable .chosen .icon")
const landingOptionsRaza = document.querySelector(".options-raza")
const searchButton = document.querySelector(".gosearch")

window.addEventListener('click', function(e){   
  if (landingSelectableZona.contains(e.target)){
    // Clicked in box
    landingSelectableZona.classList.toggle('displayed');
    landingOptionsZona.classList.toggle('displayed');
  } else{
    // Clicked outside the box
    landingSelectableZona.classList.remove('displayed');
    landingOptionsZona.classList.remove('displayed');
  }
})

window.addEventListener('click', function(e){   
    if (landingSelectableEspecie.contains(e.target)){
      // Clicked in box
      landingSelectableEspecie.classList.toggle('displayed');
      landingOptionsEspecie.classList.toggle('displayed');
    } else{
      // Clicked outside the box
      landingSelectableEspecie.classList.remove('displayed');
      landingOptionsEspecie.classList.remove('displayed');
    }
})

window.addEventListener('click', function(e){   
    if (landingSelectableRaza.contains(e.target)){
      // Clicked in box
      landingSelectableRaza.classList.toggle('displayed');
      landingOptionsRaza.classList.toggle('displayed');
    } else{
      // Clicked outside the box
      landingSelectableRaza.classList.remove('displayed');
      landingOptionsRaza.classList.remove('displayed');
    }
})

specificOptionZona.forEach((zona, id) => {
  zona.addEventListener('click', function() {
    chosenZonaText.innerHTML = zona.innerHTML;
  })
})

specificOptionEspecie.forEach((especie, id) => {
    especie.addEventListener('click', function() {
        chosenEspecieImg.removeAttribute("class")
        chosenEspecieImg.classList.add(especie.children[0].className)
        chosenEspecieText.innerHTML = especie.children[1].innerHTML;
        chosenRazaText.innerHTML = 'Selecciona una raza';
        landingSelectableRaza.classList.add("clickable")
        fetchAnimals(chosenEspecieText.innerHTML)
    })
})



// Fetch and display razas-animales list from local txt...
function fetchAnimals(especie) {
  if (especie === 'Perros') {
    var fetchData = 'perros_razas.txt'
  } else if (especie === 'Gatos') {
    var fetchData = 'gatos_razas.txt'
  } else if (especie === 'Caballos') {
    var fetchData = 'caballos_razas.txt'
  } else {
    var fetchData = 'cualquiera_razas.txt'
  }
  fetch(fetchData)
  .then(response => response.text())
  .then((response) => {

      // First remove previous divs
      while (document.querySelector(".options-raza").firstChild) {
        document.querySelector(".options-raza").removeChild(document.querySelector(".options-raza").firstChild);
      }
      // Now create the rest
      reducedWords = response.split('\n')
      reducedWords.forEach(word => {
        word = (word.length > 25)? word.substring(0, 22) + "...": word;
        var newDiv = document.createElement("div");
        newDiv.classList.add('option')
        newDiv.textContent = word
        document.querySelector(".options-raza").appendChild(newDiv)
      })
      var specificOptionRaza = document.querySelectorAll(".options-raza .option")
      specificOptionRaza.forEach((raza, id) => {
        raza.addEventListener('click', function() {
            chosenRazaText.innerHTML = raza.innerHTML;
            searchButton.classList.add("clickable")
        })
      })
  })
  .catch(err => console.log(err))
}
