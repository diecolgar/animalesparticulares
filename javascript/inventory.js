const ID = "4939728646";

displayExploreItem = function(Id, desiredItem) {
    firebaseFetchAnimal(Id).then((result) => {
        document.querySelector(".title .maintitle .text .especie").innerHTML = result.raza;
        document.querySelector(".title .maintitle .text .number").innerHTML = result.number;
        document.querySelector(".title .subtitle .age").innerHTML = result.age;
        document.querySelector(".title .subtitle .location").innerHTML = result.provincia;
    });
    firebaseGetPicture(Id, desiredItem).then((result) => {
        document.querySelectorAll(".imagescontainer .image")[desiredItem].style.backgroundImage = `url(${result}`;
    });
}

window.addEventListener('load', function() {
    displayExploreItem("4939728646", 0);
    displayExploreItem("4939728646", 1);
    displayExploreItem("4939728646", 2);
    displayExploreItem("4939728646", 3);
});
