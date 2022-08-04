const ID = "4939728646";

const imagesContainerOne = document.querySelector('.imagescontainer .one')
const imagesContainerTwo = document.querySelector('.imagescontainer .two')
const images = document.querySelectorAll('.imagescontainer .image')


displayExploreItem = function(Id, desiredItem) {
    firebaseFetchAnimal(Id)
    .then((result) => {
        document.querySelector(".title .maintitle .text .especie").innerHTML = result.raza;
        document.querySelector(".title .maintitle .text .number").innerHTML = `(${result.number})`;
        document.querySelector(".title .subtitle .age").innerHTML = `${result.age} ${result.ageUom}`;
        document.querySelector(".title .subtitle .location").innerHTML = result.provincia;
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
    displayExploreItem("8056237187");
});


// CASUISTRY FOR NUMBER OF IMAGES
function numberOfImagesCSSReworker(numberOfImages) {
    if (numberOfImages === 1) {
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
