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
});

// CASUISTRY FOR NUMBER OF IMAGES
// function numberOfImagesCSSReworker(numberOfImages) {
//     numberOfImages = 1;
//     if (numberOfImages === 1) {
//         images[0].style.width = '25vw'
//         images[0].style.height = '25vw'
//         images[0].style.borderRadius = '0 60px 0 60px'
//     }
//     if (numberOfImages === 2) {
//         images[0].style.width = '500px'
//         images[0].style.height = '500px'
//         images[0].style.margin = '20px'
//         images[0].style.borderRadius = '0 60px 0 0'
//         images[1].style.width = '500px'
//         images[1].style.height = '500px'
//         images[1].style.margin = '20px'
//         images[1].style.borderRadius = '0 60px 0 0'
//     }
//     if (numberOfImages === 3) {
//         images[0].style.width = '300px'
//         images[0].style.height = '300px'
//         images[0].style.margin = '10px'
//         images[0].style.borderRadius = '0 60px 0 0'
//         images[1].style.width = '300px'
//         images[1].style.height = '300px'
//         images[1].style.margin = '10px'
//         images[1].style.borderRadius = '0 60px 0 0'
//         images[2].style.width = '300px'
//         images[2].style.height = '300px'
//         images[2].style.margin = '10px'
//         images[2].style.borderRadius = '0 60px 0 0'
//     }
//     if (numberOfImages === 4) {
//         images[0].style.width = '500px'
//         images[0].style.height = '500px'
//         images[0].style.margin = '10px'
//         images[0].style.borderRadius = '0 60px 0 0'
//         images[1].style.width = '500px'
//         images[1].style.height = '500px'
//         images[1].style.margin = '10px'
//         images[1].style.borderRadius = '0 60px 0 0'
//         images[2].style.width = '500px'
//         images[2].style.height = '500px'
//         images[2].style.margin = '10px'
//         images[2].style.borderRadius = '0 60px 0 0'
//         images[3].style.width = '500px'
//         images[3].style.height = '500px'
//         images[3].style.margin = '10px'
//         images[3].style.borderRadius = '0 60px 0 0'
//     }
//     if (numberOfImages === 5) {
//         // Nothing yet
//     }
// }


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