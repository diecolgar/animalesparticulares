const dataCuantosInput = document.querySelector(".numero .datainput .numero")
const dataCuantosText = document.querySelector(".numero .datainput .numero .innertext")
const dataCuantosDisplayable = document.querySelector(".numero .datainput .numero .selectable")
const dataCuantosDisplayableOptions = document.querySelectorAll(".numero .datainput .numero .selectable .option")

const dataEdadInput = document.querySelector(".edad .datainput .edadnum")
const dataEdadText = document.querySelector(".edad .datainput .edadnum .innertext")
const dataEdadDisplayable = document.querySelector(".edad .datainput .edadnum .selectable")
const dataEdadDisplayableOptions = document.querySelectorAll(".edad .datainput .edadnum .selectable .option")

const dataEdadUomInput = document.querySelector(".edad .datainput .edaduom" )
const dataEdadUomText = document.querySelector(".edad .datainput .edaduom .innertext")
const dataEdadUomDisplayable = document.querySelector(".edad .datainput .edaduom  .selectable")
const dataEdadUomDisplayableOptions = document.querySelectorAll(".edad .datainput .edaduom  .selectable .option")

// NUMERO - CUANTOS
window.addEventListener('click', function(e){   
    if (dataCuantosInput.contains(e.target)){
      // Clicked in box
      dataCuantosDisplayable.classList.toggle('displayed');
    } else{
      // Clicked outside the box
      dataCuantosDisplayable.classList.remove('displayed');
    }
  })

dataCuantosDisplayableOptions.forEach(option => {
option.addEventListener('click', () => {
    dataCuantosText.innerHTML = option.innerHTML
})
})


// EDAD NUMERO
window.addEventListener('click', function(e){   
if (dataEdadInput.contains(e.target)){
    // Clicked in box
    dataEdadDisplayable.classList.toggle('displayed');
} else{
    // Clicked outside the box
    dataEdadDisplayable.classList.remove('displayed');
}
})

dataEdadDisplayableOptions.forEach(option => {
    option.addEventListener('click', () => {
        dataEdadText.innerHTML = option.innerHTML
    })
})

// EDAD UOM

window.addEventListener('click', function(e){   
    if (dataEdadUomInput.contains(e.target)){
        // Clicked in box
        dataEdadUomDisplayable.classList.toggle('displayed');
    } else{
        // Clicked outside the box
        dataEdadUomDisplayable.classList.remove('displayed');
    }
    })
    
    dataEdadUomDisplayableOptions.forEach(option => {
        option.addEventListener('click', () => {
            dataEdadUomText.innerHTML = option.innerHTML
        })
    })