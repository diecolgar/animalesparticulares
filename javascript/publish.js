// INITIATE RANDOM ID FOR CURRENT PUBLISH PROCESS
function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}
const randomId = (makeid(5));

// Images
const uploadedimages = document.querySelectorAll(".imagescontainer .uploadedimage")

// Especie
const dataEspecieInput = document.querySelectorAll(".especie .datainput .especie")

// Raza
const dataRazaInput = document.querySelector(".raza .datainput .raza")
const dataRazaText = document.querySelector(".raza .datainput .raza .innertext")
const dataRazaDisplayable = document.querySelector(".raza .datainput .raza .selectable")
const dataRazaDisplayableOptions = document.querySelectorAll(".raza .datainput .raza .selectable .option")

//Multiples
const dataMultiplesInput = document.querySelector(".numero .datainput .multiples")

// Cuantos?
const dataCuantosTitle = document.querySelector(".numero .datainput .cuantos")
const dataCuantosInput = document.querySelector(".numero .datainput .numero")
const dataCuantosText = document.querySelector(".numero .datainput .numero .innertext")
const dataCuantosDisplayable = document.querySelector(".numero .datainput .numero .selectable")
const dataCuantosDisplayableOptions = document.querySelectorAll(".numero .datainput .numero .selectable .option")

// Edad Numero
const dataEdadInput = document.querySelector(".edad .datainput .edadnum")
const dataEdadText = document.querySelector(".edad .datainput .edadnum .innertext")
const dataEdadDisplayable = document.querySelector(".edad .datainput .edadnum .selectable")
const dataEdadDisplayableOptions = document.querySelectorAll(".edad .datainput .edadnum .selectable .option")

// Edad Meses/Años
const dataEdadUomInput = document.querySelector(".edad .datainput .edaduom" )
const dataEdadUomText = document.querySelector(".edad .datainput .edaduom .innertext")
const dataEdadUomDisplayable = document.querySelector(".edad .datainput .edaduom  .selectable")
const dataEdadUomDisplayableOptions = document.querySelectorAll(".edad .datainput .edaduom  .selectable .option")

// Edad Provincia
const dataProvinciaInput = document.querySelector(".provincia .datainput .provincia" )
const dataProvinciaText = document.querySelector(".provincia .datainput .provincia .innertext")
const dataProvinciaDisplayable = document.querySelector(".provincia .datainput .provincia  .selectable")
const dataProvinciaDisplayableOptions = document.querySelectorAll(".provincia .datainput .provincia  .selectable .option")


// ---------------------------------------------------------------------------  ESPECIE
dataEspecieInput.forEach(especie => {
    especie.addEventListener('click', () => {
        dataEspecieInput.forEach(especie2 => {
            if (!(especie === especie2)) {
                especie2.classList.remove('active')
            }
        })
        especie.classList.toggle('active')
        dataRazaText.innerHTML = 'Cualquiera';
        fetchAnimalsPublish(especie.className.split(" ")[2])
    })
})

// ---------------------------------------------------------------------------  UPDATE RAZA
function fetchAnimalsPublish(especie) {
    if (especie === 'perros') {
      var fetchData = 'perros_razas.txt'
    } else if (especie === 'gatos') {
      var fetchData = 'gatos_razas.txt'
    } else if (especie === 'caballos') {
      var fetchData = 'caballos_razas.txt'
    } else {
      var fetchData = 'cualquiera_razas.txt'
    }
    fetch(`/razas_db/${fetchData}`)
    .then(response => response.text())
    .then((response) => {
  
        // First remove previous divs
        while (document.querySelector(".raza .datainput .raza .selectable").firstChild) {
            document.querySelector(".raza .datainput .raza .selectable").removeChild(document.querySelector(".raza .datainput .raza .selectable").firstChild);
        }
        // Now create the rest
        reducedWords = response.split('\n')
        reducedWords.forEach(word => {
          var newDiv = document.createElement("div");
          newDiv.classList.add('option')
          newDiv.textContent = word
          document.querySelector(".raza .datainput .raza .selectable").appendChild(newDiv)
        })

        // And write with the new list
        var specificOptionRaza = document.querySelectorAll(".raza .datainput .raza .selectable .option")
        specificOptionRaza.forEach((raza, id) => {
          raza.addEventListener('click', function() {
            dataRazaText.innerHTML = raza.innerHTML;
          })
        })
    })
    .catch(err => console.log(err))
  }


// ---------------------------------------------------------------------------  RAZA
window.addEventListener('click', function(e){   
    if (dataRazaInput.contains(e.target)){
      // Clicked in box
      dataRazaDisplayable.classList.toggle('displayed');
    } else{
      // Clicked outside the box
      dataRazaDisplayable.classList.remove('displayed');
    }
  })

dataRazaDisplayableOptions.forEach(option => {
    option.addEventListener('click', () => {
        dataRazaText.innerHTML = option.innerHTML
    })
})


// ---------------------------------------------------------------------------  MULTIPLES
dataMultiplesInput.addEventListener('click', function(e){   
    dataCuantosInput.classList.toggle('writteable')
    dataCuantosTitle.classList.toggle('writteable')
    dataCuantosText.innerHTML = '2'
    if (!dataCuantosTitle.classList.contains('writteable')) {
        dataCuantosText.innerHTML = ''
    }
  })


// ---------------------------------------------------------------------------  NUMERO - CUANTOS
window.addEventListener('click', function(e){   
    if (dataCuantosInput.contains(e.target) && dataCuantosInput.classList.contains('writteable')){
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


// ---------------------------------------------------------------------------  EDAD NUMERO
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

// ---------------------------------------------------------------------------  EDAD MESES
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

window.addEventListener('click', function(e){   
    if (dataProvinciaInput.contains(e.target)){
        // Clicked in box
        dataProvinciaDisplayable.classList.toggle('displayed');
    } else{
        // Clicked outside the box
        dataProvinciaDisplayable.classList.remove('displayed');
    }
    })
    
// ---------------------------------------------------------------------------  PROVINCIA

    dataProvinciaDisplayableOptions.forEach(option => {
        option.addEventListener('click', () => {
            dataProvinciaText.innerHTML = option.innerHTML
        })
    })


// ---------------------------------------------------------------------------  IMAGE ONCLICK HANDLER

uploadedimages.forEach(image => {
  image.addEventListener('click', () => {
    if (image.classList.contains('imaged')) {
      uploadedimages.forEach(image2 => {
        image2.classList.remove('extended')
        image2.classList.remove('displayed')
      })
      image.classList.add('extended')
      image.classList.add('displayed')
    }
  })
  image.addEventListener('mouseout', () => {
    uploadedimages.forEach(image => {
      image.classList.add('displayed')
      image.classList.remove('extended')
    })
  })
})

    //////////////////// ------------------- IMAGE UPLOAD ------------------- ////////////////////

    document.querySelector("#files").addEventListener("change", (e) => {
      if (window.File && window.FileReader && window.FileList && window.Blob) {
        const files = e.target.files;
        const maxImages = 4;
        for (let i = 0; i < files.length; i++) {
            if ((!files[i].type.match("image")) && (i < maxImages)) continue;
            const picReader = new FileReader();
            picReader.addEventListener("load", function (event) {
              const picFile = event.target;
              
              if ( i < maxImages ) {
                uploadedimages[i].style.backgroundImage = `url('${picFile.result}')`;
                uploadedimages[i].classList.add('imaged');
              
                base64string = picFile.result.split(',')[1];
  
                // Publish in firebase
                // firebasePublishPicture(base64string, `id=${randomId}img=${i}.${picFile.result.substring(11,14)}`);
              }

            });
            picReader.readAsDataURL(files[i]); //READ THE IMAGE
        }
      } else {
        alert("Your browser does not support File API");
      }
    });
