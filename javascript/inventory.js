const ID = window.location.href.split('?')[1];

const imagesContainerOne = document.querySelector('.imagescontainer .one')
const imagesContainerTwo = document.querySelector('.imagescontainer .two')
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

        // Set images
        let imageNumber = result.numberOfImages;
        numberOfImagesCSSReworker(imageNumber)
        return result.numberOfImages;
    })
    .then((numberOfImages) => {
        for (let i = 0; i < numberOfImages; i++) {
            firebaseGetPicture(Id, i).then((result) => {
                document.querySelectorAll(".imagescontainer .image")[i].style.backgroundImage = `url(${result}`;
            });
        }
    })
}

window.addEventListener('load', function() {
    displayExploreItem(ID);
});


// CASUISTRY FOR NUMBER OF IMAGES
function numberOfImagesCSSReworker(numberOfImages) {
    if (numberOfImages === 1) {
        imagesContainerOne.style.width = '60%'
        images[0].style.borderRadius = '0 60px 0 60px'
        imagesContainerTwo.style.width = '0'
    }
    if (numberOfImages === 2) {
        imagesContainerTwo.style.width = '60%'
        images[1].style.width = '200%'
        images[1].style.height = '100%'
        images[1].style.borderRadius = '0 60px 0 0'
        images[2].style.width = 0
        images[3].style.width = 0
        images[4].style.width = 0
    }
    if (numberOfImages === 3) {
        imagesContainerTwo.style.width = '60%'
        images[1].style.width = '200%'
        images[1].style.borderRadius = '0 60px 0 0'
        images[2].style.borderRadius = '0 0 0 0'
        images[2].style.width = '200%'
        images[3].style.width = 0
        images[4].style.width = 0
    }
    if (numberOfImages === 4) {
        imagesContainerTwo.style.width = '60%'
        images[1].style.width = '200%'
        images[1].style.borderRadius = '0 60px 0 0'
        images[2].style.borderRadius = '0 0 0 0'
        images[4].style.width = 0
    }
    if (numberOfImages === 5) {
        // Nothing yet
    }
}
