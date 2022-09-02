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
        razaFilter.value = ''
        fetchAndDisplayLists()
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










const provincias = ['alava','albacete','alicante','almería','asturias','avila','badajoz','barcelona','burgos','cáceres',
'cádiz','cantabria','castellón','ciudad real','córdoba','la coruña','cuenca','gerona','granada','guadalajara',
'guipúzcoa','huelva','huesca','islas baleares','jaén','león','lérida','lugo','madrid','málaga','murcia','navarra',
'orense','palencia','las palmas','pontevedra','la rioja','salamanca','segovia','sevilla','soria','tarragona',
'santa cruz de tenerife','teruel','toledo','valencia','valladolid','vizcaya','zamora','zaragoza'];

const perros_db = ["cualquiera", "mestizo", "airedale terrier", "akita americano", "akita inu", "alaskan malamute", "american staffordshire terrier", "antiguo perro de muestra danés", "azul de gascuña", "basenji", "basset artesiano de normandía", "basset de los alpes", "basset hound", "basset leonado de bretaña", "beagle", "beagle-harrier", "beauceron", "bedlington terrier", "bergamasco", "bichón boloñés", "bichón frisé", "bichón habanero", "bichón maltés", "billy", "black and tan coonhound", "bobtail", "boerboel", "border collie", "border terrier", "borzoi", "boston terrier", "bóxer", "boyero de appenzell", "boyero de berna", "boyero de entlebuch", "boyero de flandes", "boyero de las ardenas", "braco alemán", "braco alemán de pelo corto", "braco alemán de pelo duro", "braco australiano negro y fuego", "braco de ariège", "braco de auvernia", "braco de borbón", "braco de weimar", "braco eslovaco de pelo duro", "braco francés", "braco húngaro", "braco italiano", "braco saint-germain", "briquet grifón vendeano", "broholmer", "buhund", "bull terrier", "bulldog americano", "bulldog francés", "bulldog inglés", "bullmastiff", "cain terrier", "canaán", "cane corso", "caniche", "castro laboreiro", "cavailer king charles spaniel", "cazador de alces noruego", "chihuahua", "chow chow", "cirneco del etna", "clumber spaniel", "cobrador", "cocker spaniel americano", "cocker spaniel inglés", "collie barbudo", "collie de pelo corto", "collie de pelo largo", "corgi galés de pembroke", "cotón de tulear", "crestado chino", "crestado rodesiano", "cursino", "dálmata", "dandie dinmont", "dogo de burdeos", "dogo del tíbet", "dogo mallorquín", "drever", "eurasier", "field spaniel", "fila brasileiro", "fila de san miguel", "fox terrier", "foxhound americano", "foxhound inglés", "galgo afgano", "galgo español", "galgo inglés", "galgo italiano", "galgo polaco", "gascon saintongeois", "golden retriever", "gordon setter", "gran basset grifón vendeano", "gran boyero suizo", "gran danés", "gran grifón vendeano", "gran munsterlander", "gran sabueso anglo-francés", "grifón de bruselas", "grifón de muestra de pelo duro", "grifón leonado de bretaña", "grifón nivernais", "harrier", "hokkaido", "hovawart", "husky siberiano", "jack russel terrier", "jamthund", "kai", "kelpie australiano", "kerry blue terrier", "king charles spaniel", "kishu", "komondor", "kromfohrlander", "kuvasz", "labrador retriever", "lagotto romagnolo", "laika de siberia oriental", "laika de siberia occidental", "laika ruso-europeo", "lakeland terrier", "landseer", "lebrel escocés", "lebrel húngaro", "lebrel irlandés", "leonberger", "lasha apso", "lundehund", "manchester terrier", "mastín de trabajo", "mastín del pirineo", "mastín español", "mastín inglés", "mastín napolitano", "montaña de formosa", "montaña de los pirineos", "montaña del atlas", "mudi", "münsterlander pequeño", "otterhound", "papillón", "parson rusell terrier", "pastor alemán", "pastor belga", "pastor blanco suizo", "pastor catalán", "pastor croata", "pastor de anatolia", "pastor de asia central", "pastor de brie", "pastor de karst", "pastor de las islas shetland", "pastor de los pirineos", "pastor de maremma", "pastor de picardía", "pastor de tatra", "pastor del cáucaso", "pastor eslovaco", "pastor finlandés de laponia", "pastor ganadero australiano", "pastor holandés", "pastor islandés", "pastor lapón de suecia", "pastor mallorquín", "pastor ovejero australiano", "pastor polaco de las llanuras", "pastor portugués", "pastor rumano de mioritza", "pastor ucraniano", "pastor yugoslavo", "pekinés", "pequeño basset grifón vendeano", "pequeño brabantino", "pequeño perro león", "pequeño perro ruso", "pequeño sabueso de suiza", "perdiguero alemán", "perdiguero de burgos", "perdiguero de drente", "perdiguero frisón", "perdiguero portugués", "perro de agua americano", "perro de agua español", "perro de agua francés", "perro de agua frisón", "perro de agua irlandés", "perro de agua portugués", "perro de caza polaco", "perro de chindo", "perro de groenlandia", "perro de la sierra de la estrela", "perro de muestra alemán", "perro finlandés de laponia", "perro lobo americano", "perro lobo checoslovaco", "perro lobo de saarloos", "perro sin pelo del perú", "pharaon hound", "pinscher", "pinscher austriaco", "podenco canario", "podenco ibicenco", "podenco portugués", "pointer inglés", "pointevino", "pomerania", "porcelana", "presa canario", "pudelpointer", "pug", "puli", "pumi", "rafeiro do alentejo", "ratonero holandés", "retriever de chesapeake", "retriever de nueva escocia", "ridgeback tailandés", "rottweiler", "sabueso", "saluki", "samoyedo", "san bernardo", "schapendoes neerlandés", "schipperke", "schnauzer pequeño", "schnauzer mediano", "schnauzer gigante", "sealyham terrier", "setter inglés", "setter irlandés", "shar pei", "shiba inu", "shih tzu", "shikoku inu", "skye terrier", "sloughi", "spaniel azul de picardía", "spaniel bretón", "spaniel francés", "spaniel holandés", "spaniel japonés", "spaniel picardo", "spaniel tibetano", "spinone italiano", "spitz", "springer spaniel", "staffordshire bull terrier", "sussex spaniel", "teckel", "terranova", "terrier", "tosa inu", "vallhund sueco", "vizsla", "volpino australiano", "westie", "whippet", "xoloitzcuintle", "yorkshire terrier"];
const gatos_db = ["cualquiera", "mestizo", "abisinio", "american shorthair", "american wirehair", "angora turco", "azul ruso", "balinés", "bengalí", "birmano", "bobtail americano", "bobtail japonés", "bombay", "bosque de noruega", "british longhair", "british shorthair", "burmilla", "california spangled", "californian rex", "cartujo", "ceilán", "chausie", "común europeo", "cornish rex", "curl americano", "cymric", "devon rex", "don sphynx", "esfinge", "exótico", "german rex", "habana brown", "highland fold", "highland straight", "himalayo", "javanés", "khao manee", "korat", "maine coon", "manx", "mau egipcio", "munchkin", "nebelung", "ocicat", "oriental", "persa", "persa chinchilla", "peterbald", "pixie bob", "ragamuffin", "ragdoll", "safari", "sagrado de birmania", "savannah", "scottish fold", "selkirk rex", "siamés", "siamés thai", "siberiano", "singapura", "snowshoe", "sokoke", "somalí", "tiffany", "tonkinés", "toyger", "van turco", "york chocolate"]
const caballos_db = ["cualquiera", "mestizo", "akhal-teke", "apaloosa", "araapaloosa", "árabe", "árabe-portugués", "asturcón", "aveliñés", "azteca", "albino", "alter real", "angloargentino", "bardigiano", "bereber", "bretón", "buckskin", "budyonny", "basuto", "caballo altái", "caballo andaluz", "caballo de las retuertas", "caballo de las murgues", "caballo de merens", "caballo de los outer banks", "caballo ibérico", "caballo de polo", "caballo de pura raza gallega", "caballo catalán", "caballo mallorquín", "caballo marismeño", "caballo marwari", "caballo menorquín", "caballo morab", "chileno", "chilote", "criollo colombiano", "caballo costarricense de paso", "caballo criollo", "camargués", "darashouri", "don", "dülmener wildpferd", "falabella", "francés de silla", "freiberg", "frisón", "gelder", "gotland", "hackney", "haflinger", "hannoveriano", "holstein", "iberoamericano", "irish cob", "irish hunter", "islandés", "jaca navarra", "jomud", "karabakh", "kentucky mountain", "kustanair", "konik", "lipizzano", "lokai", "losino", "monchino", "mongol", "morab", "morgan horse", "mustang", "nonius", "oldenburgues", "palomino", "pura raza paso fino", "caballo peruano de paso", "percherón", "piebald", "pinto", "pottoka", "petramo", "przewalski", "quarter horse", "rocky mountain horse", "salernitano", "san fratelano", "poni de shetland", "silla americano", "tennessee walking", "tersk", "tinker", "torik", "trakehner", "ucraniano", "waler"];