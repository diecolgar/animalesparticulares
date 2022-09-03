

const mainFilters = document.querySelectorAll('.filtersbox .filter')

const especieFilter = document.querySelector('.filterelement .especie')
const especieFilterIcon = document.querySelector('.filterelement .especie .icon')
const especieFilterLabel = document.querySelector('.filterelement .especie .label')

const razaFilter = document.querySelector('.filterelement .raza')

const provinciaFilter = document.querySelector('.filterelement .provincia')

const filterOptionsContainer = document.querySelector('.filteroptions')
const filterOptions = document.querySelectorAll('.filteroptions .option')

const filterOptionEspecie = document.querySelector('.filteroptions .especie')
const filterOptionEspecieSpecific = document.querySelectorAll('.filteroptions .especie .specificoption')
const filterOptionEspecieSpecificIcon = document.querySelectorAll('.filteroptions .especie .specificoption .icon')
const filterOptionEspecieSpecificLabel = document.querySelectorAll('.filteroptions .especie .specificoption .label')

const filterOptionRaza = document.querySelector('.filteroptions .raza')
const filterOptionRazaSpecific = document.querySelectorAll('.filteroptions .raza .specificoption')

const filterOptionProvincia = document.querySelector('.filteroptions .provincia')
const filterOptionProvinciaSpecific = document.querySelectorAll('.filteroptions .Provincia .specificoption')

const searchButton = document.querySelector('.searchbutton')

const searchedResults = document.querySelector('.searchedresults')


//

const especieHref = window.location.href.split('?')[1];
// const razaHref = window.location.href.split('?')[2];
const provinciaHref = window.location.href.split('?')[2];

if (especieHref) {
    especieFilterLabel.innerHTML = especieHref
    if (especieHref === 'Perros') {
        especieFilterIcon.style.backgroundImage = 'url(/images/dog.svg)' 
    }
    if (especieHref === 'Gatos') {
        especieFilterIcon.style.backgroundImage = 'url(/images/cat.svg)' 
    }
    if (especieHref === 'Caballos') {
        especieFilterIcon.style.backgroundImage = 'url(/images/horse.svg)' 
    }
    if (especieHref === 'Roedores') {
        especieFilterIcon.style.backgroundImage = 'url(/images/rabbit.svg)' 
    }
    if (especieHref === 'Pajaros') {
        especieFilterIcon.style.backgroundImage = 'url(/images/bird.svg)' 
    }
    if (especieHref === 'Reptiles') {
        especieFilterIcon.style.backgroundImage = 'url(/images/reptile.svg)' 
    }
    if (especieHref === 'Granja') {
        especieFilterIcon.style.backgroundImage = 'url(/images/vacas.svg)' 
    }
}

if (provinciaHref) {
    provinciaFilter.value = provinciaHref
}

mainFilters.forEach((filter,id) => {
    window.addEventListener('click', function(e){   
        if (filter.contains(e.target)){
          // Clicked in box
          filter.classList.add('selected');
          filterOptions[id].classList.remove('invisible');
          filterOptionsContainer.classList.remove('hidden')
        } else{
          // Clicked outside the box
          filter.classList.remove('selected');
          filterOptions[id].classList.add('invisible');
        }
      })
})

let currentEspecie = 'Perros'
// ------------- SELECTION HANDLER FOR ESPECIE
filterOptionEspecieSpecific.forEach((option,id) => {
    option.addEventListener('click', () => {
        if(option.classList.contains('dogs')) {
            especieFilterIcon.style.backgroundImage = 'url(/images/dog.svg)'
            especieFilterLabel.innerHTML = 'Perros'
        } 
        if(option.classList.contains('cats')) {
            especieFilterIcon.style.backgroundImage = 'url(/images/cat.svg)'
            especieFilterLabel.innerHTML = 'Gatos'
        } 
        if(option.classList.contains('horses')) {
            especieFilterIcon.style.backgroundImage = 'url(/images/horse.svg)'
            especieFilterLabel.innerHTML = 'Caballos'
        }
        if(option.classList.contains('rabbits')) {
            especieFilterIcon.style.backgroundImage = 'url(/images/rabbit.svg)'
            especieFilterLabel.innerHTML = 'Roedores'
        }
        if(option.classList.contains('birds')) {
            especieFilterIcon.style.backgroundImage = 'url(/images/bird.svg)'
            especieFilterLabel.innerHTML = 'Pájaros'
        }
        if(option.classList.contains('reptiles')) {
            especieFilterIcon.style.backgroundImage = 'url(/images/turtle.svg)'
            especieFilterLabel.innerHTML = 'Reptiles'
        }
        if(option.classList.contains('farms')) {
            especieFilterIcon.style.backgroundImage = 'url(/images/vacas.svg)'
            especieFilterLabel.innerHTML = 'De Granja'
        }
        razaFilter.value = ''
    })
})

// ------------- SELECTION HANDLER FOR RAZA
filterOptionRazaSpecific.forEach((option,id) => {
    option.addEventListener('click', () => {
        razaFilter.value = option.innerHTML
    })
})


// Fetch and display raza
razaFilter.addEventListener('input', ()=> {
    razaFilter.classList.add('selected');
    let filteredArray
    const value = razaFilter.value.toLowerCase();
    if (especieFilterLabel.innerHTML === 'Perros') {
        filteredArray = perros_db.filter(animal => animal.includes(value));
    } else if (especieFilterLabel.innerHTML === 'Gatos') {
        filteredArray = gatos_db.filter(animal => animal.includes(value));
    } else if (especieFilterLabel.innerHTML === 'Caballos') {
        filteredArray = caballos_db.filter(animal => animal.includes(value));
    } else if (especieFilterLabel.innerHTML === 'Roedores') {
        filteredArray = roedores_db.filter(animal => animal.includes(value));
    } else if (especieFilterLabel.innerHTML === 'Pájaros') {
        filteredArray = aves_db.filter(animal => animal.includes(value));
    }
    filterOptionRaza.innerHTML = ''
    for (let i = 0; (i < 3) && (i < filteredArray.length); i++) {
        var newDiv = document.createElement("div");
        newDiv.classList.add('specificoption')
        
        const capitalizeWord = filteredArray[i].toLowerCase().split('')
        capitalizeWord[0] = capitalizeWord[0].toUpperCase()
        filteredArray[i] = capitalizeWord.join('')

        newDiv.textContent = filteredArray[i]
        console.log(newDiv)
        filterOptionRaza.appendChild(newDiv)
    }
    document.querySelectorAll('.filteroptions .raza .specificoption').forEach(animal => {
        animal.addEventListener('click', () => {
            razaFilter.value = animal.innerHTML
            filterOptionRaza.innerHTML = ''
        })
    })
})

// Check that raza is valid
razaFilter.addEventListener('focusout', ()=> {
    let currentArray
    let reset = true
    if (especieFilterLabel.innerHTML === 'Perros') {
        currentArray = perros_db
    } else if (especieFilterLabel.innerHTML === 'Gatos') {
        currentArray = gatos_db
    } else if (especieFilterLabel.innerHTML === 'Caballos') {
        currentArray = caballos_db
    } else {
        currentArray = perros_db
    }
    for (let i = 0; i < currentArray.length; i++) {
        if (razaFilter.value.toLowerCase() === currentArray[i]) {
            reset = false
        }
    }
    if (reset) {
        razaFilter.value = ''
    }
})


// Fetch and display provincia
provinciaFilter.addEventListener('input', ()=> {
    provinciaFilter.classList.add('selected');
    let filteredArray
    const value = provinciaFilter.value.toLowerCase();
    filteredArray = provincias.filter(provincia => provincia.includes(value));
    filterOptionProvincia.innerHTML = ''
    for (let i = 0; (i < 3) && (i < filteredArray.length); i++) {
        var newDiv = document.createElement("div");
        newDiv.classList.add('specificoption')
        
        const capitalizeWord = filteredArray[i].toLowerCase().split('')
        capitalizeWord[0] = capitalizeWord[0].toUpperCase()
        filteredArray[i] = capitalizeWord.join('')

        newDiv.textContent = filteredArray[i]
        console.log(newDiv)
        filterOptionProvincia.appendChild(newDiv)
    }
    document.querySelectorAll('.filteroptions .provincia .specificoption').forEach(provincia => {
        provincia.addEventListener('click', () => {
            provinciaFilter.value = provincia.innerHTML
            filterOptionProvincia.innerHTML = ''
        })
    })
})

// Check that provincia is valid
provinciaFilter.addEventListener('focusout', ()=> {
    let currentArray = provincias
    let reset = true
    for (let i = 0; i < currentArray.length; i++) {
        if (provinciaFilter.value.toLowerCase() === currentArray[i]) {
            reset = false
        }
    }
    if (reset) {
        provinciaFilter.value = ''
    }
})


// Search Trigger
searchButton.addEventListener('click', ()=> {
    goSearch()
})

function goSearch() {
    let dataObject = {
        especie: document.querySelector('.filterelement .especie .label').innerHTML.toLowerCase(),
        raza: document.querySelector('.filterelement .raza').value,
        provincia: document.querySelector('.filterelement .provincia').value,
        edad: '',
        numero: '',
        fecha: ''
    }
    
    firebaseFetchAnimalComplex(dataObject).then( (output) => {
        document.querySelectorAll('.searchedimage .actualimage').forEach(image => {
            image.style.backgroundImage = 'none'
        })
        while (document.querySelector(".searchedresults").children[1]) {
            document.querySelector(".searchedresults").removeChild(document.querySelector(".searchedresults").firstChild);
        }

        for (let i = 1; i < output.length; i++) {
            var newww = document.querySelectorAll('.searchedelement')[0].cloneNode(true)
            searchedResults.appendChild(newww)        
        }
            const searchedImage = document.querySelectorAll('.searchedimage .actualimage')
            const searchedEspecie = document.querySelectorAll('.searchedespecie')
            const searchedNumber = document.querySelectorAll('.searchednumber')
            const searchedAge = document.querySelectorAll('.searchedage')
            const searchedLocation = document.querySelectorAll('.searchedlocation')
        for (let i = 0; i < output.length; i++) {
            firebaseGetPicture(output[i].id, 0).then((result) => {
                searchedImage[i].style.backgroundImage = `url(${result}`;
            });

            searchedEspecie[i].innerHTML = output[i].raza
            
            if (output[i].number === '1') {
                searchedNumber[i].innerHTML = ''
             } else {
                searchedNumber[i].innerHTML = `(${output[i].number})`;
            }

            searchedAge[i].innerHTML = `${output[i].age} ${output[i].ageUom}`
            searchedLocation[i].innerHTML = output[i].provincia
        }
    })
}

window.addEventListener('load', function() {

    goSearch();
});

// READING HREF INFORMATION










const provincias = ['alava','albacete','alicante','almería','asturias','avila','badajoz','barcelona','burgos','cáceres',
'cádiz','cantabria','castellón','ciudad real','córdoba','la coruña','cuenca','gerona','granada','guadalajara',
'guipúzcoa','huelva','huesca','islas baleares','jaén','león','lérida','lugo','madrid','málaga','murcia','navarra',
'orense','palencia','las palmas','pontevedra','la rioja','salamanca','segovia','sevilla','soria','tarragona',
'santa cruz de tenerife','teruel','toledo','valencia','valladolid','vizcaya','zamora','zaragoza'];

