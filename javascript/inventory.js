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
        }

        // Set number
        if (!(result.number === '1')) {
            document.querySelector(".title .maintitle .text .number").innerHTML = `(${result.number})`;
        } else {
            document.querySelector(".title .maintitle .text .number").innerHTML = '';
        }
        document.querySelector(".title .maintitle .text .number").classList.remove('loading');

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
        document.querySelector(".contactinfo .nombre").innerHTML = result.name;
        document.querySelector(".contactinfo .mail").innerHTML = result.email;
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
    checkIfUserIsPropietaryToDisplayDeleteOption();
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
    if (document.querySelector('.usernav').innerHTML === document.querySelector(".contactinfo .mail").innerHTML) {
        document.querySelector('.borrarpublicacion').style.display = 'flex'
    }
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
    })
})