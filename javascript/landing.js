
const exploraItem = document.querySelectorAll(".exploraitem")

const especieSelectable = document.querySelector('.searchelement.especie .buttonbox')
const especieSelectableText = document.querySelector('.searchelement.especie .buttonbox .text')
const especieSelectableIcon = document.querySelector('.searchelement.especie .buttonbox .icon')
const especieDisplayable = document.querySelector('.searchelement.especie .options')
const especieOptions = document.querySelectorAll('.searchelement.especie .options .searchoption')

const provinciaSelectable = document.querySelector('.searchelement.provincia')
const provinciaSelectableText = document.querySelector('.searchelement.provincia .inputbox')
const provinciaOptions = document.querySelector('.searchelement.provincia .options')

const searchButton = document.querySelector('.search')

// QUICK SEARCH BUTTONS
// Onclick handlers por especie button
window.addEventListener('click', function(e){   
  if (especieSelectable.contains(e.target)){
    // Clicked in box
    especieDisplayable.classList.toggle('displayed');
  } else{
    // Clicked outside the box
    especieDisplayable.classList.remove('displayed');
  }
})

// Onclick handlers por provincia button
window.addEventListener('click', function(e){   
    if (provinciaSelectable.contains(e.target)){
      // Clicked in box
    } else{
      // Clicked outside the box
      provinciaOptions.innerHTML = ''
      let provinciaMatch = false
      provincias.forEach(provincia => {
        if( provincia.toLowerCase() === provinciaSelectableText.value.toLowerCase() ) {
            console.log(provincia)
            provinciaMatch = true
        }
      })
      if (provinciaMatch === false) {
        provinciaSelectableText.value = ''
      } else {
        const capitalizeProvincia = provinciaSelectableText.value.toLowerCase().split('')
        capitalizeProvincia[0] = capitalizeProvincia[0].toUpperCase()
        provinciaSelectableText.value = capitalizeProvincia.join('')
      }
    }
  })

// Assign data from search especie button
especieOptions.forEach(option => {
    option.addEventListener('click', () => {
        if (option.classList.contains('dogs')) {
            especieSelectableText.innerHTML = 'Perros'
            especieSelectableIcon.style.backgroundImage = 'url(/images/dog_light.svg)'
        }
        if (option.classList.contains('cats')) {
            especieSelectableText.innerHTML = 'Gatos'
            especieSelectableIcon.style.backgroundImage = 'url(/images/cat_light.svg)'
        }
        if (option.classList.contains('horses')) {
            especieSelectableText.innerHTML = 'Caballos'
            especieSelectableIcon.style.backgroundImage = 'url(/images/horse_light.svg)'

        }
        if (option.classList.contains('rabbits')) {
            especieSelectableText.innerHTML = 'Roedores'
            especieSelectableIcon.style.backgroundImage = 'url(/images/rabbit_light.svg)'
        }
        if (option.classList.contains('birds')) {
            especieSelectableText.innerHTML = 'Pajaros'
            especieSelectableIcon.style.backgroundImage = 'url(/images/bird_light.svg)'
        }
        if (option.classList.contains('reptiles')) {
            especieSelectableText.innerHTML = 'Reptiles'
            especieSelectableIcon.style.backgroundImage = 'url(/images/turtle_light.svg)'
        }
        if (option.classList.contains('farms')) {
            especieSelectableText.innerHTML = 'De Granja'
            especieSelectableIcon.style.backgroundImage = 'url(/images/vacas_light.svg)'
        }
    })
})


// Fetch and display provincia
provinciaSelectableText.addEventListener('input', ()=> {
    const value = provinciaSelectableText.value.toLowerCase();
    const filteredArray = provincias.filter(provincia => provincia.includes(value));
    provinciaOptions.innerHTML = ''
    for (let i = 0; (i < 3) && (i < filteredArray.length); i++) {
        var newDiv = document.createElement("div");
        newDiv.classList.add('provinciaoption')
        
        const capitalizeProvincia = filteredArray[i].toLowerCase().split('')
        capitalizeProvincia[0] = capitalizeProvincia[0].toUpperCase()
        filteredArray[i] = capitalizeProvincia.join('')

        newDiv.textContent = filteredArray[i]
        provinciaOptions.appendChild(newDiv)
    }
    document.querySelectorAll('.searchelement.provincia .options .provinciaoption').forEach(provincia => {
        provincia.addEventListener('click', () => {
            provinciaSelectableText.value = provincia.innerHTML
            provinciaOptions.innerHTML = ''
        })
    })
})


// ------------------------------------------------------ EXPLORE SECTION

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
        } else if (result.especie === "roedores") {
            especieIcon.style.backgroundImage = `url('/images/rabbit.svg')`;
        } else if (result.especie === "pajaros") {
            especieIcon.style.backgroundImage = `url('/images/bird.svg')`;
        } else if (result.especie === "degranja") {
            especieIcon.style.backgroundImage = `url('/images/vacas.svg')`;
        } else if (result.especie === "reptiles") {
            especieIcon.style.backgroundImage = `url('/images/turtle.svg')`;
        }

        // Set title
        document.querySelectorAll(".exploratitulo")[desiredItem].innerHTML = result.raza;
        document.querySelectorAll(".exploratitulo")[desiredItem].classList.remove('loadingStyle')

        // Set genero
        if ((result.genero === '1')) {
            document.querySelectorAll(".exploragender")[desiredItem].innerHTML = `(${result.genero})`;
        } else {
            document.querySelectorAll(".exploragender")[desiredItem].innerHTML = '';
        }
        document.querySelectorAll(".exploragender")[desiredItem].classList.remove('loadingStyle')
        
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
    displayExploreItem("0042830522", 0);
    displayExploreItem("6514940586", 1);
    displayExploreItem("5067777030", 2);
    displayExploreItem("4923993962", 3);
    displayExploreItem("8120695249", 4);
    displayExploreItem("4919233007", 5);
    displayExploreItem("6671840101", 6);
    displayExploreItem("3070934282", 7);
});

// Explore onclick event handler
exploraItem.forEach(item => {
    item.addEventListener('click', () => {
        if (item.classList.contains('filled')) {
            const redirectId = item.dataset.identifier;
            item.href = `https://animalesparticulares.com/inventory?${redirectId}`
        }
    })
})

// Search button onclick handler
searchButton.addEventListener('click', () => {
    // Handling 'de granja' case
    if (especieSelectableText.innerHTML === 'De Granja') {
        searchButton.href = `https://animalesparticulares.com/searcher?${'DeGranja'}?${provinciaSelectableText.value}`
    } else {
        searchButton.href = `https://animalesparticulares.com/searcher?${especieSelectableText.innerHTML}?${provinciaSelectableText.value}`
    }
})