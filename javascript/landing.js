// import {firebaseFillExploreItem} from '/firebase.js';

// Selectable buttons to open displayable
const landingSelectableZona = document.querySelector(".selectable.zona")
const landingSelectableEspecie = document.querySelector(".selectable.especie")
const landingSelectableRaza = document.querySelector(".selectable.raza")
// Displayed options box
const landingOptionsZona = document.querySelector(".options-zona")
const landingOptionsEspecie = document.querySelector(".options-especie")
const landingOptionsRaza = document.querySelector(".options-raza")
// Displayed options individually
const specificOptionZona = document.querySelectorAll(".options-zona .option")
const specificOptionEspecie = document.querySelectorAll(".options-especie .option")
// Selectable buttons texts
const chosenZonaText = document.querySelector(".selectable.zona p")
const chosenEspecieText = document.querySelector(".selectable.especie .chosen p")
const chosenRazaText = document.querySelector(".selectable.raza p")
// Selectable buttons images
const chosenEspecieImg = document.querySelector(".selectable .chosen .icon")
// Search button
const searchButton = document.querySelector(".gosearch")
// Explora items
const exploraItem = document.querySelectorAll(".exploraitem")

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
        chosenRazaText.innerHTML = 'Cualquier raza';
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
  fetch(`/razas_db/${fetchData}`)
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
        })
      })
  })
  .catch(err => console.log(err))
}

// Fetch and display explore section...
displayExploreItem = function(Id, desiredItem) {
    firebaseFetchAnimal(Id).then((result) => {

        //Set id and class as filled
        document.querySelectorAll(".exploraitem")[desiredItem].dataset.identifier = result.id;
        document.querySelectorAll(".exploraitem")[desiredItem].classList.add('filled');
        
        // Set icon
        const especieIcon = document.querySelectorAll(".exploraicon")[desiredItem];
        especieIcon.style.width = '20%'
        if (result.especie === "perros") {
            especieIcon.style.backgroundImage = `url('/images/dog.svg')`;
        } else if (result.especie === "gatos") {
            especieIcon.style.backgroundImage = `url('/images/cat.svg')`;
        } else if (result.especie === "caballos") {
            especieIcon.style.backgroundImage = `url('/images/horse.svg')`;
        }

        // Set title
        document.querySelectorAll(".exploratitulo")[desiredItem].innerHTML = result.raza;
        document.querySelectorAll(".exploratitulo")[desiredItem].classList.remove('loadingStyle')

        // Set number
        if (!(result.number === '1')) {
            document.querySelectorAll(".exploranumber")[desiredItem].innerHTML = `(${result.number})`;
        } else {
            document.querySelectorAll(".exploranumber")[desiredItem].innerHTML = '';
        }
        document.querySelectorAll(".exploranumber")[desiredItem].classList.remove('loadingStyle')
        
        // Set separator
        document.querySelectorAll(".separator")[desiredItem].classList.remove('loadingStyle')

        // Set age
        document.querySelectorAll(".exploraedad")[desiredItem].innerHTML = `${result.age} ${result.ageUom}`;
        document.querySelectorAll(".exploraedad")[desiredItem].classList.remove('loadingStyle')

        // Set place
        document.querySelectorAll(".exploralugar")[desiredItem].innerHTML = result.provincia;
        document.querySelectorAll(".exploralugar")[desiredItem].classList.remove('loadingStyle')

    });
    firebaseGetPicture(Id, 0).then((result) => {
        document.querySelectorAll(".exploraimage")[desiredItem].style.backgroundImage = `url(${result}`;
    });
}

window.addEventListener('load', function() {
    displayExploreItem("2315221133", 0);
    displayExploreItem("2262447875", 1);
    displayExploreItem("0294537884", 2);
});

// Explore onclick event handler
exploraItem.forEach(item => {
    item.addEventListener('click', () => {
        if (item.classList.contains('filled')) {
            const redirectId = item.dataset.identifier;
            item.href = `http://127.0.0.1:5500/inventory.html?${redirectId}`
        }
    })
})

