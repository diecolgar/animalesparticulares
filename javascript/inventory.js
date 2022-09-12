const ID = window.location.href.split('?')[1];

let numberOfImagesGlobal = 0;
const imagedisplay = document.querySelector('.imagedisplay')
const arrowleft = document.querySelector('.imagescontainer .arrowleft')
const arrowright = document.querySelector('.imagescontainer .arrowright')
const counter = document.querySelector('.imagescontainer .counter .button')
const images = document.querySelectorAll('.imagescontainer .image')


displayExploreItem = function(Id) {
    firebaseFetchAnimal(Id)
    .then((result) => {
        // Set title
        document.querySelector(".title .maintitle .text .especie").innerHTML = result.raza;
        document.querySelector(".title .maintitle .text .especie").classList.remove('loading');

        // Set icon
        const especieIcon = document.querySelector(".title .maintitle .icon");
        if (result.especie === "perros") {
            especieIcon.style.backgroundImage = `url('/images/dog.svg')`;
        } else if (result.especie === "gatos") {
            especieIcon.style.backgroundImage = `url('/images/cat.svg')`;
        } else if (result.especie === "caballos") {
            especieIcon.style.backgroundImage = `url('/images/horse.svg')`;
        } else if (result.especie === "roedores") {
            especieIcon.style.backgroundImage = `url('/images/rabbit.svg')`;
        } else if (result.especie === "reptiles") {
            especieIcon.style.backgroundImage = `url('/images/turtle.svg')`;
        } else if (result.especie === "caballos") {
            especieIcon.style.backgroundImage = `url('/images/horse.svg')`;
        } else if (result.especie === "pajaros") {
            especieIcon.style.backgroundImage = `url('/images/bird.svg')`;
        } else if (result.especie === "degranja") {
            especieIcon.style.backgroundImage = `url('/images/vacas.svg')`;
        }

        // Set sex
        document.querySelector(".title .subtitle .gender").innerHTML = '';
        document.querySelector(".title .subtitle .gender").classList.remove('loading');
        if (result.genero === 'macho') {
            document.querySelector(".title .subtitle .gender").style.backgroundImage = `url('/images/maleicon.svg')`
        } else if (result.genero === 'hembra') {
            document.querySelector(".title .subtitle .gender").style.backgroundImage = `url('/images/maleicon.svg')`
        }

        // Set age
        document.querySelector(".title .subtitle .age").innerHTML = `${result.age} ${result.ageUom}`;
        document.querySelector(".title .subtitle .age").classList.remove('loading');
        
        // Set location
        document.querySelector(".title .subtitle .location").innerHTML = result.provincia;
        document.querySelector(".title .subtitle .location").classList.remove('loading');

        // Set description
        document.querySelector(".description").innerHTML = result.description;
        document.querySelector(".description").classList.remove('loading');

        // Set contactdata
        if (result.name !== 'indefinido') {
            document.querySelector(".contactinfo .nombre").innerHTML = result.name;
        }
        if (result.email !== 'indefinido') {
            document.querySelector(".contactinfo .mail").innerHTML = result.email;
        }
        checkIfUserIsPropietaryToDisplayDeleteOption()
        document.querySelector(".contactinfo .phone").innerHTML = result.phone;
        // document.querySelector(".description").classList.remove('loading');

        // Set images
        // let imageNumber = result.numberOfImages;
        // numberOfImagesCSSReworker(imageNumber)
        return result.numberOfImages;
    })
    .then((numberOfImages) => {
        numberOfImagesGlobal = numberOfImages;
        for (let i = 0; i < numberOfImages; i++) {
            firebaseGetPicture(Id, i).then((result) => {
                document.querySelectorAll(".imagescontainer .image")[i].style.backgroundImage = `url(${result}`;
            });
        }
        if (!(numberOfImages === 1)) {
            arrowright.classList.remove('hidden')
        }
        counter.innerHTML = `1/${numberOfImages}`
    })
}

window.addEventListener('load', function() {
    displayExploreItem(ID);
});

// IMAGE SLIDER LOGIC
let currentDisplayedImageIndex = 0;
arrowright.addEventListener('click', () => {
    currentDisplayedImageIndex++;
    arrowleft.classList.remove('hidden')
    if (currentDisplayedImageIndex === (numberOfImagesGlobal-1)) {
        arrowright.classList.add('hidden')
    } 
    updateDisplayedImageFromIndex(currentDisplayedImageIndex)
})
arrowleft.addEventListener('click', () => {
    currentDisplayedImageIndex--;
    arrowright.classList.remove('hidden')
    if (currentDisplayedImageIndex === 0) {
        arrowleft.classList.add('hidden')
    } 
    updateDisplayedImageFromIndex(currentDisplayedImageIndex)
})

function updateDisplayedImageFromIndex(index) {
    images.forEach(image => {
        image.classList.add('hidden')
    })
    images[index].classList.remove('hidden')
    counter.innerHTML = `${index+1}/${numberOfImagesGlobal}`
}


// CHECK IF USER IS PROPIETARY
function checkIfUserIsPropietaryToDisplayDeleteOption() {
    const inventoryUserEmail = document.querySelector(".contactinfo .mail").innerHTML
    console.log(inventoryUserEmail)
    firebaseGetUserData().then( (userData) => {
        let currentUserEmail = userData.email 
        console.log(currentUserEmail)
        if (currentUserEmail === inventoryUserEmail) {
            document.querySelector('.borrarpublicacion').style.display = 'flex'
        }
    })
    .catch()
}



// DELETE PUBLICACION

const borrarButton = document.querySelector('.borrarbutton')
const borrarSeguro = document.querySelector('.borrarseguro')
const borrarSeguroSi = document.querySelector('.borrarsi')
const borrarSeguroNo = document.querySelector('.borrarno')


borrarButton.addEventListener('click', () => {
    borrarSeguro.style.display = 'flex'
})

borrarSeguroNo.addEventListener('click', () => {
    borrarSeguro.style.display = 'none'
})

borrarSeguroSi.addEventListener('click', () => {
    firebaseErasePublication(ID).then( output => {
        alert('Publicación eliminada con éxito!')
        borrarSeguro.style.display = 'none'
        window.location.href = `https://animalesparticulares.com/searcher.html`
    })
})