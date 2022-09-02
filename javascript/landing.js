
const exploraItem = document.querySelectorAll(".exploraitem")

const especieSelectable = document.querySelector('.searchelement.especie .buttonbox')
const especieSelectableText = document.querySelector('.searchelement.especie .buttonbox .text')
const especieSelectableIcon = document.querySelector('.searchelement.especie .buttonbox .icon')
const especieDisplayable = document.querySelector('.searchelement.especie .options')
const especieOptions = document.querySelectorAll('.searchelement.especie .options .searchoption')

const provinciaSelectable = document.querySelector('.searchelement.provincia')
const provinciaSelectableText = document.querySelector('.searchelement.provincia .inputbox')
const provinciaOptions = document.querySelector('.searchelement.provincia .options')

provincias = ['alava','albacete','alicante','almería','asturias','avila','badajoz','barcelona','burgos','cáceres',
'cádiz','cantabria','castellón','ciudad real','córdoba','la coruña','cuenca','gerona','granada','guadalajara',
'guipúzcoa','huelva','huesca','islas baleares','jaén','león','lérida','lugo','madrid','málaga','murcia','navarra',
'orense','palencia','las palmas','pontevedra','la rioja','salamanca','segovia','sevilla','soria','tarragona',
'santa cruz de tenerife','teruel','toledo','valencia','valladolid','vizcaya','zamora','zaragoza']

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
        if (option.classList.contains('dog')) {
            especieSelectableText.innerHTML = 'Perros'
            especieSelectableIcon.style.backgroundImage = 'url(/images/dog_light.svg)'
        }
        if (option.classList.contains('cats')) {
            especieSelectableText.innerHTML = 'Gatos'
            especieSelectableIcon.style.backgroundImage = 'url(/images/cat_light.svg)'
        }
        if (option.classList.contains('horse')) {
            especieSelectableText.innerHTML = 'Caballos'
            especieSelectableIcon.style.backgroundImage = 'url(/images/horse_light.svg)'

        }
        if (option.classList.contains('conejos')) {
            especieSelectableText.innerHTML = 'Conejos'
            especieSelectableIcon.style.backgroundImage = 'url(/images/rabbit_light.svg)'

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
            especieIcon.style.backgroundImage = `url('/images/dog_green.svg')`;
        } else if (result.especie === "gatos") {
            especieIcon.style.backgroundImage = `url('/images/cat_green.svg')`;
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
    displayExploreItem("0042830522", 0);
    displayExploreItem("6514940586", 1);
    displayExploreItem("5067777030", 2);
    displayExploreItem("4923993962", 3);
    displayExploreItem("2262447875", 4);
    displayExploreItem("8217688185", 5);
});

// Explore onclick event handler
exploraItem.forEach(item => {
    item.addEventListener('click', () => {
        if (item.classList.contains('filled')) {
            const redirectId = item.dataset.identifier;
            item.href = `https://animalesparticulares.netlify.app/inventory.html?${redirectId}`
        }
    })
})

const perros_db = ["cualquiera", "mestizo", "airedale terrier", "akita americano", "akita inu", "alaskan malamute", "american staffordshire terrier", "antiguo perro de muestra danés", "azul de gascuña", "basenji", "basset artesiano de normandía", "basset de los alpes", "basset hound", "basset leonado de bretaña", "beagle", "beagle-harrier", "beauceron", "bedlington terrier", "bergamasco", "bichón boloñés", "bichón frisé", "bichón habanero", "bichón maltés", "billy", "black and tan coonhound", "bobtail", "boerboel", "border collie", "border terrier", "borzoi", "boston terrier", "bóxer", "boyero de appenzell", "boyero de berna", "boyero de entlebuch", "boyero de flandes", "boyero de las ardenas", "braco alemán", "braco alemán de pelo corto", "braco alemán de pelo duro", "braco australiano negro y fuego", "braco de ariège", "braco de auvernia", "braco de borbón", "braco de weimar", "braco eslovaco de pelo duro", "braco francés", "braco húngaro", "braco italiano", "braco saint-germain", "briquet grifón vendeano", "broholmer", "buhund", "bull terrier", "bulldog americano", "bulldog francés", "bulldog inglés", "bullmastiff", "cain terrier", "canaán", "cane corso", "caniche", "castro laboreiro", "cavailer king charles spaniel", "cazador de alces noruego", "chihuahua", "chow chow", "cirneco del etna", "clumber spaniel", "cobrador", "cocker spaniel americano", "cocker spaniel inglés", "collie barbudo", "collie de pelo corto", "collie de pelo largo", "corgi galés de pembroke", "cotón de tulear", "crestado chino", "crestado rodesiano", "cursino", "dálmata", "dandie dinmont", "dogo de burdeos", "dogo del tíbet", "dogo mallorquín", "drever", "eurasier", "field spaniel", "fila brasileiro", "fila de san miguel", "fox terrier", "foxhound americano", "foxhound inglés", "galgo afgano", "galgo español", "galgo inglés", "galgo italiano", "galgo polaco", "gascon saintongeois", "golden retriever", "gordon setter", "gran basset grifón vendeano", "gran boyero suizo", "gran danés", "gran grifón vendeano", "gran munsterlander", "gran sabueso anglo-francés", "grifón de bruselas", "grifón de muestra de pelo duro", "grifón leonado de bretaña", "grifón nivernais", "harrier", "hokkaido", "hovawart", "husky siberiano", "jack russel terrier", "jamthund", "kai", "kelpie australiano", "kerry blue terrier", "king charles spaniel", "kishu", "komondor", "kromfohrlander", "kuvasz", "labrador retriever", "lagotto romagnolo", "laika de siberia oriental", "laika de siberia occidental", "laika ruso-europeo", "lakeland terrier", "landseer", "lebrel escocés", "lebrel húngaro", "lebrel irlandés", "leonberger", "lasha apso", "lundehund", "manchester terrier", "mastín de trabajo", "mastín del pirineo", "mastín español", "mastín inglés", "mastín napolitano", "montaña de formosa", "montaña de los pirineos", "montaña del atlas", "mudi", "münsterlander pequeño", "otterhound", "papillón", "parson rusell terrier", "pastor alemán", "pastor belga", "pastor blanco suizo", "pastor catalán", "pastor croata", "pastor de anatolia", "pastor de asia central", "pastor de brie", "pastor de karst", "pastor de las islas shetland", "pastor de los pirineos", "pastor de maremma", "pastor de picardía", "pastor de tatra", "pastor del cáucaso", "pastor eslovaco", "pastor finlandés de laponia", "pastor ganadero australiano", "pastor holandés", "pastor islandés", "pastor lapón de suecia", "pastor mallorquín", "pastor ovejero australiano", "pastor polaco de las llanuras", "pastor portugués", "pastor rumano de mioritza", "pastor ucraniano", "pastor yugoslavo", "pekinés", "pequeño basset grifón vendeano", "pequeño brabantino", "pequeño perro león", "pequeño perro ruso", "pequeño sabueso de suiza", "perdiguero alemán", "perdiguero de burgos", "perdiguero de drente", "perdiguero frisón", "perdiguero portugués", "perro de agua americano", "perro de agua español", "perro de agua francés", "perro de agua frisón", "perro de agua irlandés", "perro de agua portugués", "perro de caza polaco", "perro de chindo", "perro de groenlandia", "perro de la sierra de la estrela", "perro de muestra alemán", "perro finlandés de laponia", "perro lobo americano", "perro lobo checoslovaco", "perro lobo de saarloos", "perro sin pelo del perú", "pharaon hound", "pinscher", "pinscher austriaco", "podenco canario", "podenco ibicenco", "podenco portugués", "pointer inglés", "pointevino", "pomerania", "porcelana", "presa canario", "pudelpointer", "pug", "puli", "pumi", "rafeiro do alentejo", "ratonero holandés", "retriever de chesapeake", "retriever de nueva escocia", "ridgeback tailandés", "rottweiler", "sabueso", "saluki", "samoyedo", "san bernardo", "schapendoes neerlandés", "schipperke", "schnauzer pequeño", "schnauzer mediano", "schnauzer gigante", "sealyham terrier", "setter inglés", "setter irlandés", "shar pei", "shiba inu", "shih tzu", "shikoku inu", "skye terrier", "sloughi", "spaniel azul de picardía", "spaniel bretón", "spaniel francés", "spaniel holandés", "spaniel japonés", "spaniel picardo", "spaniel tibetano", "spinone italiano", "spitz", "springer spaniel", "staffordshire bull terrier", "sussex spaniel", "teckel", "terranova", "terrier", "tosa inu", "vallhund sueco", "vizsla", "volpino australiano", "westie", "whippet", "xoloitzcuintle", "yorkshire terrier"];
const gatos_db = ["cualquiera", "mestizo", "abisinio", "american shorthair", "american wirehair", "angora turco", "azul ruso", "balinés", "bengalí", "birmano", "bobtail americano", "bobtail japonés", "bombay", "bosque de noruega", "british longhair", "british shorthair", "burmilla", "california spangled", "californian rex", "cartujo", "ceilán", "chausie", "común europeo", "cornish rex", "curl americano", "cymric", "devon rex", "don sphynx", "esfinge", "exótico", "german rex", "habana brown", "highland fold", "highland straight", "himalayo", "javanés", "khao manee", "korat", "maine coon", "manx", "mau egipcio", "munchkin", "nebelung", "ocicat", "oriental", "persa", "persa chinchilla", "peterbald", "pixie bob", "ragamuffin", "ragdoll", "safari", "sagrado de birmania", "savannah", "scottish fold", "selkirk rex", "siamés", "siamés thai", "siberiano", "singapura", "snowshoe", "sokoke", "somalí", "tiffany", "tonkinés", "toyger", "van turco", "york chocolate"]
const caballos_db = ["cualquiera", "mestizo", "akhal-teke", "apaloosa", "araapaloosa", "árabe", "árabe-portugués", "asturcón", "aveliñés", "azteca", "albino", "alter real", "angloargentino", "bardigiano", "bereber", "bretón", "buckskin", "budyonny", "basuto", "caballo altái", "caballo andaluz", "caballo de las retuertas", "caballo de las murgues", "caballo de merens", "caballo de los outer banks", "caballo ibérico", "caballo de polo", "caballo de pura raza gallega", "caballo catalán", "caballo mallorquín", "caballo marismeño", "caballo marwari", "caballo menorquín", "caballo morab", "chileno", "chilote", "criollo colombiano", "caballo costarricense de paso", "caballo criollo", "camargués", "darashouri", "don", "dülmener wildpferd", "falabella", "francés de silla", "freiberg", "frisón", "gelder", "gotland", "hackney", "haflinger", "hannoveriano", "holstein", "iberoamericano", "irish cob", "irish hunter", "islandés", "jaca navarra", "jomud", "karabakh", "kentucky mountain", "kustanair", "konik", "lipizzano", "lokai", "losino", "monchino", "mongol", "morab", "morgan horse", "mustang", "nonius", "oldenburgues", "palomino", "pura raza paso fino", "caballo peruano de paso", "percherón", "piebald", "pinto", "pottoka", "petramo", "przewalski", "quarter horse", "rocky mountain horse", "salernitano", "san fratelano", "poni de shetland", "silla americano", "tennessee walking", "tersk", "tinker", "torik", "trakehner", "ucraniano", "waler"];
const roedores_db = ["cualquiera", "conejos", "cobayas", "capibaras", "hamsters", "ratones", "ratas"];
const aves_db = ["cualquiera", "agapornis", "cacatúas", "canarios", "cotorras", "diamante mandarin", "diamantes", "eclectus", "guacamayo", "jilgueros", "loro", "mirlo", "ninfas", "periquito", "periquitos", "ruiseñor", "yaco"]
