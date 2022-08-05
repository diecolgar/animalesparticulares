// INITIATE RANDOM ID FOR CURRENT PUBLISH PROCESS
function makeid(length) {
  var result           = '';
  var characters       = '0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}
const randomId = (makeid(10));

// All inputs!
const allInputs = document.querySelectorAll('.datainput')

// Validation button listo!
const validationButtuon = document.querySelector('.publishbutton')
const validationErrorMessage = document.querySelector('.publisherrormessage')

// Images
const uploadedimages = document.querySelectorAll(".imagescontainer .imagesdisplay .uploadedimage")
const arrowleft = document.querySelector(".imagescontainer .arrowleft")
const arrowright = document.querySelector(".imagescontainer .arrowright")
const imagecloser = document.querySelector(".imagescontainer .imagesdisplay .closer")
const imagecounter = document.querySelector(".imagescontainer .imagesdisplay .numerodeimagenes")

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

// Description
const dataDescripcionInput = document.querySelector(".descripcion .datainput .descripcion" )

// Ver button
const verButton = document.querySelector('.ver')


// ---------------------------------------------------------------------------  ESPECIE
dataEspecieInput.forEach(especie => {
    especie.addEventListener('click', () => {
        dataEspecieInput.forEach(especie2 => {
            if (!(especie === especie2)) {
                especie2.classList.remove('active')
            }
        })
        especie.classList.toggle('active')
        dataRazaText.innerHTML = 'Seleccionar...';
        dataRazaText.classList.remove('selected')
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
            dataRazaText.classList.add('selected');
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


// ---------------------------------------------------------------------------  MULTIPLES
dataMultiplesInput.addEventListener('click', function(e){   
    dataCuantosInput.classList.toggle('writteable')
    dataCuantosTitle.classList.toggle('writteable')
    dataCuantosText.innerHTML = '2'
    dataCuantosText.classList.add('selected');
    if (!dataCuantosTitle.classList.contains('writteable')) {
        dataCuantosText.innerHTML = ''
        dataCuantosText.classList.remove('selected');
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
    dataCuantosText.classList.add('selected');
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
        dataEdadText.classList.add('selected');
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
            dataEdadUomText.classList.add('selected');
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
            dataProvinciaText.classList.add('selected');
        })
    })


// ---------------------------------------------------------------------------  IMAGE SLIDE ONCLICK HANDLER
arrowleft.addEventListener('click', () => {
    let continueArrow = true;
    uploadedimages.forEach((image, id) => {
        if((image.classList.contains('displayed')) && (id !== 0) && continueArrow && (uploadedimages[id-1].classList.contains('imaged'))) {
            uploadedimages[id-1].classList.add('displayed');
            uploadedimages[id].classList.remove('displayed');
            imagecounter.innerHTML = `${id}/${numberOfUploadedImages}`;
            continueArrow = false;
            if ((id-1) === 0) {
                arrowleft.classList.remove('displayed')
            }
        }
        arrowright.classList.add('displayed')
    })
})
arrowright.addEventListener('click', () => {
    let continueArrow = true;
    uploadedimages.forEach((image, id) => {
        if((image.classList.contains('displayed')) && (id !== (numberOfUploadedImages+1)) && continueArrow && (uploadedimages[id+1].classList.contains('imaged'))) {
            uploadedimages[id+1].classList.add('displayed');
            uploadedimages[id].classList.remove('displayed');
            imagecounter.innerHTML = `${id+2}/${numberOfUploadedImages}`;
            continueArrow = false;
            console.log(id);
            console.log(numberOfUploadedImages);
            if ((id+2) === numberOfUploadedImages) {
                arrowright.classList.remove('displayed')
            }
        }
        arrowleft.classList.add('displayed')
    })
})
//////////////////// ------------------- CLOSER EVENT ------------------- ////////////////////
imagecloser.addEventListener('click', () => {
    uploadedimages.forEach(image => {
        image.classList.remove('displayed')
    })
    arrowleft.classList.remove('displayed');
    arrowright.classList.remove('displayed');
    imagecloser.classList.remove('displayed');
    imagecounter.classList.remove('displayed');
})


//////////////////// ------------------- IMAGE UPLOAD ------------------- ////////////////////
const maxImages = 5;
let numberOfUploadedImages = 0;

let base64imagesString = Array(maxImages);
let imageEncoding = Array(maxImages);

document.querySelector("#files").addEventListener("change", (e) => {
    numberOfUploadedImages = 0;
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
        if ((!files[i].type.match("image")) && (i < maxImages)) continue;
        const picReader = new FileReader();
        picReader.addEventListener("load", function (event) {
          picFile = event.target;
          
          if ( i < maxImages ) {
            uploadedimages[i].style.backgroundImage = `url('${picFile.result}')`;
            uploadedimages[i].classList.add('imaged');
            uploadedimages[0].classList.add('displayed');
            arrowleft.classList.add('displayed');
            arrowright.classList.add('displayed');
            imagecloser.classList.add('displayed');
            imagecounter.classList.add('displayed');
            numberOfUploadedImages++;
            imagecounter.innerHTML = `1/${numberOfUploadedImages}`;
          
            base64imagesString[i] = picFile.result.split(',')[1];
            imageEncoding[i] = `id=${randomId}img=${i}`
          }

        });
        picReader.readAsDataURL(files[i]); //READ THE IMAGE
    }

  } else {
    alert("Your browser does not support File API");
  }
});

    //////////////////// ------------------- VALIDATION!  ------------------- ////////////////////

validationButtuon.addEventListener('click', () => {

  let publish = true;

  const publishData = {
    publishEspecie: '',
    publishRaza: '',
    publishNumber: '1',
    publishAge: '',
    publishAgeUom: '',
    publishProvincia: '',
    publishDescription: '',
    publishId: randomId,
    publishDate: new Date().toLocaleDateString("es-ES"),
    publishImageNumber: numberOfUploadedImages
  }

  // Check and get especie
  dataEspecieInput.forEach(especie => {
    if(especie.classList.contains('active')) {
      publishData.publishEspecie = especie.className.split(' ')[2];
    }
  })

  // Check and get raza
  if (dataRazaText.classList.contains('selected')) {
      publishData.publishRaza = dataRazaText.innerHTML;
  }

  // Get numero
  if (!(dataCuantosText.innerHTML === '')) {
     publishData.publishNumber = dataCuantosText.innerHTML;
  }

  // Get edad
  if (!(dataEdadText.innerHTML  === '?')) {
    publishData.publishAge = dataEdadText.innerHTML;
  }

  // Get edaduom
  if (!(dataEdadUomText.innerHTML  === 'Seleccionar...')) {
    publishData.publishAgeUom = dataEdadUomText.innerHTML;
  }

  // Check and get provincia
  if (dataProvinciaText.classList.contains('selected')) {
    publishData.publishProvincia = dataProvinciaText.innerHTML;
  }

  // Check and get descripcion
  if (!(dataDescripcionInput.value === '')) {
    publishData.publishDescription = dataDescripcionInput.value;
  }

  // Checking at least 1 image filled...
  publish = false;
  uploadedimages.forEach(image => {
    if (image.classList.contains('imaged')) {
      publish = true;
    }
  });
  // Checking all data items filled
  for (let i = 0; i < Object.entries(publishData).length; i++) {
    console.log(Object.entries(publishData)[i][1])
    if (Object.entries(publishData)[i][1] === '') {
      publish = false;
    }
  }
  if (publish === true) {
  validationErrorMessage.innerHTML = ''
  
  // PUBLISH SECTION
  // Publish data in firebase firestore
  firebasePublishNewAnimal(publishData);

  // Publish images in firebase storage
  for (let i = 0; i < maxImages; i++) {
    if ((base64imagesString[i] === undefined) || (imageEncoding[i] === undefined)) {
      // Nothing
    } else {
      firebasePublishPicture(base64imagesString[i], imageEncoding[i]);
    }
  }
  document.querySelector('.validationscreen').style.opacity = '1';
  document.querySelector('.validationscreen').style.visibility = 'visible';

  } else {
  validationErrorMessage.innerHTML = 'Aún faltan campos por rellenar!';
  document.querySelector('.validationscreen').style.opacity = '1';
  document.querySelector('.validationscreen').style.visibility = 'visible';
  }
})

verButton.addEventListener('click', () => {
    const url = `http://127.0.0.1:5500/inventory.html?${randomId}`
    verButton.href = url;
});
