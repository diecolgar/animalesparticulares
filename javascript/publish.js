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

// Nombre
const dataNombreInput = document.querySelector(".nombrecontacto .datainput .inputbox")

// Email
const dataEmailInput = document.querySelector(".emailcontacto .datainput .inputbox")

// Phone
const dataPhoneInput = document.querySelector(".phonecontacto .datainput .inputbox")

// Especie
const dataEspecieInput = document.querySelectorAll(".especie .datainput .especie")

// Raza
const dataRazaInput = document.querySelector(".raza .datainput .raza")
const dataRazaText = document.querySelector(".raza .datainput .raza .innertext")
const dataRazaDisplayable = document.querySelector(".raza .datainput .raza .selectable")
const dataRazaDisplayableOptions = document.querySelectorAll(".raza .datainput .raza .selectable .option")

// Genero
const dataGeneroInput = document.querySelectorAll(".genero .datainput .genero")

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

// Loading display
const loadingScreen = document.querySelector('.loadingscreen')


// ---------------------------------------------------------------------------  ESPECIE
dataEspecieInput.forEach(especie => {
    especie.addEventListener('click', () => {
        dataEspecieInput.forEach(especie2 => {
            if (!(especie === especie2)) {
                especie2.classList.remove('active')
            }
        })
        especie.classList.toggle('active')
        dataRazaInput.style.pointerEvents = 'auto'
        dataRazaText.innerHTML = 'Seleccionar...';
        dataRazaText.classList.remove('selected')
        fetchAnimalsPublish(especie.className.split(" ")[2])
    })
})

// ---------------------------------------------------------------------------  GENERO
dataGeneroInput.forEach(genero => {
    genero.addEventListener('click', () => {
        dataGeneroInput.forEach(genero2 => {
            if (!(genero === genero2)) {
                genero2.classList.remove('active')
            }
        })
        genero.classList.toggle('active')
    })
})

// ---------------------------------------------------------------------------  UPDATE RAZA
function fetchAnimalsPublish(especie) {
    var fetchData
    if (especie === 'perros') {
        fetchData = perros_db
    } else if (especie === 'gatos') {
        fetchData = gatos_db
    } else if (especie === 'caballos') {
        fetchData = caballos_db
    } else if (especie === 'caballos') {
        fetchData = caballos_db
    } else if (especie === 'roedores') {
        fetchData = roedores_db
    } else if (especie === 'pajaros') {
        fetchData = pajaros_db
    } else if (especie === 'reptiles') {
        fetchData = reptiles_db
    } else if (especie === 'degranja') {
        fetchData = degranja_db
    } 
  
        // First remove previous divs
        while (document.querySelector(".raza .datainput .raza .selectable").firstChild) {
            document.querySelector(".raza .datainput .raza .selectable").removeChild(document.querySelector(".raza .datainput .raza .selectable").firstChild);
        }
        // Now create the rest

        fetchData.forEach(word => {
          var newDiv = document.createElement("div");
          newDiv.classList.add('option')

          const wordSplitted = word.split('')
          wordSplitted[0] = wordSplitted[0].toUpperCase()
          const capitalizedWord = wordSplitted.join('')

          newDiv.textContent = capitalizedWord
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
    publishName: 'indefinido',
    publishEmail: 'indefinido',
    publishPhone: '',
    publishEspecie: '',
    publishRaza: '',
    publishGenero: 'indefinido',
    publishAge: '',
    publishAgeUom: '',
    publishProvincia: '',
    publishDescription: '',
    publishId: randomId,
    publishDate: new Date().toLocaleDateString("es-ES"),
    publishImageNumber: numberOfUploadedImages
  }

  // Check and get nombre
  if (!(dataNombreInput.value === '')) {
    publishData.publishName = dataNombreInput.value;
  }

  // Check and get email
    if (!(dataEmailInput.value === '')) {
    publishData.publishEmail = dataEmailInput.value;
    }

    // Check and get phone
    if (!(dataPhoneInput.value === '')) {
    publishData.publishPhone = dataPhoneInput.value;
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

  // Get genero
  dataGeneroInput.forEach(genero => {
    if(genero.classList.contains('active')) {
      publishData.publishGenero = genero.className.split(' ')[2];
    }
  })

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
    loadingScreen.style.opacity = '1'
    loadingScreen.style.visibility = 'visible'
  validationErrorMessage.innerHTML = ''
  
  // PUBLISH SECTION

  // Publish images in firebase storage
  for (let i = 0; i < numberOfUploadedImages; i++) {
    if ((base64imagesString[i] === undefined) || (imageEncoding[i] === undefined)) {
        alert(`Algo ha salido mal al subir las imágenes. Inténtalo de nuevo o ponte en contacto con nosotros.`)
    } else {
      firebasePublishPicture(base64imagesString[i], imageEncoding[i])
      .then( () => {
            if ((i+1) === numberOfUploadedImages) {
                firebasePublishNewAnimal(publishData).then( () => {
                    loadingScreen.style.opacity = '0'
                    loadingScreen.style.visibility = 'hidden'
                    document.querySelector('.validationscreen').style.opacity = '1';
                    document.querySelector('.validationscreen').style.visibility = 'visible';
                })
            }
        }
        )
      .catch( (error) => {
        alert(`Algo ha salido mal. Error recibido: ${error}`)
      });
    }
  }


  } else {
  validationErrorMessage.innerHTML = 'Aún faltan campos por rellenar!';
  }
})

verButton.addEventListener('click', () => {
    const url = `http://animalesparticulares.com/inventory?${randomId}`
    verButton.href = url;
});