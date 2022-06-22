const landingSelectableEspecie = document.querySelector(".selectable.especie")
const landingSelectableRaza = document.querySelector(".selectable.raza")
const landingOptionsEspecie = document.querySelector(".options-especie")
const specificOptionEspecie = document.querySelectorAll(".options-especie .option")
const chosenEspecieText = document.querySelector(".selectable .chosen p")
const chosenEspecieImg = document.querySelector(".selectable .chosen .icon")
const landingOptionsRaza = document.querySelector(".options-raza")

window.addEventListener('click', function(e){   
    if (landingSelectableEspecie.contains(e.target)){
      // Clicked in box
      landingSelectableEspecie.classList.toggle('displayed');
      landingOptionsEspecie.classList.toggle('displayed');
    } else{
      // Clicked outside the box
      landingSelectableEspecie.classList.remove('displayed');
      landingOptionsEspecie.classList.remove('displayed');
    }
})

window.addEventListener('click', function(e){   
    if (landingSelectableRaza.contains(e.target)){
      // Clicked in box
      landingSelectableRaza.classList.toggle('displayed');
      landingOptionsRaza.classList.toggle('displayed');
    } else{
      // Clicked outside the box
      landingSelectableRaza.classList.remove('displayed');
      landingOptionsRaza.classList.remove('displayed');
    }
})

specificOptionEspecie.forEach((especie, id) => {
    especie.addEventListener('click', function() {
        chosenEspecieImg.removeAttribute("class")
        chosenEspecieImg.classList.add(especie.children[0].className)
        chosenEspecieText.innerHTML = especie.children[1].innerHTML;
        landingSelectableRaza.classList.add("clickable")
        landingSelectableEspecie.classList.toggle('displayed');
        landingOptionsEspecie.classList.toggle('displayed');
    })
})