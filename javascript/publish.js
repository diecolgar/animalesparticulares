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
    var fetchData
    if (especie === 'perros') {
        fetchData = perros_db
    } else if (especie === 'gatos') {
        fetchData = gatos_db
    } else if (especie === 'caballos') {
        fetchData = caballos_db
    } else {
        fetchData = perros_db
    }
  
        // First remove previous divs
        while (document.querySelector(".raza .datainput .raza .selectable").firstChild) {
            document.querySelector(".raza .datainput .raza .selectable").removeChild(document.querySelector(".raza .datainput .raza .selectable").firstChild);
        }
        // Now create the rest

        fetchData.forEach(word => {
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
    publishName: '',
    publishEmail: '',
    publishPhone: '',
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
  }
})

verButton.addEventListener('click', () => {
    const url = `http://127.0.0.1:5500/inventory.html?${randomId}`
    verButton.href = url;
});


const perros_db = ["Cualquiera", "Mestizo", "Airedale terrier", "Akita americano", "Akita inu", "Alaskan malamute", "American staffordshire terrier", "Antiguo perro de muestra danés", "Azul de Gascuña", "Basenji", "Basset artesiano de Normandía", "Basset de los Alpes", "Basset hound", "Basset leonado de Bretaña", "Beagle", "Beagle-harrier", "Beauceron", "Bedlington terrier", "Bergamasco", "Bichón boloñés", "Bichón frisé", "Bichón habanero", "Bichón maltés", "Billy", "Black and tan coonhound", "Bobtail", "Boerboel", "Border Collie", "Border Terrier", "Borzoi", "Boston terrier", "Bóxer", "Boyero de Appenzell", "Boyero de Berna", "Boyero de Entlebuch", "Boyero de Flandes", "Boyero de las Ardenas", "Braco alemán", "Braco alemán de pelo corto", "Braco alemán de pelo duro", "Braco australiano negro y fuego", "Braco de Ariège", "Braco de Auvernia", "Braco de Borbón", "Braco de Weimar", "Braco eslovaco de pelo duro", "Braco francés", "Braco húngaro", "Braco italiano", "Braco Saint-Germain", "Briquet grifón vendeano", "Broholmer", "Buhund", "Bull terrier", "Bulldog americano", "Bulldog francés", "Bulldog inglés", "Bullmastiff", "Cain terrier", "Canaán", "Cane corso", "Caniche", "Castro Laboreiro", "Cavailer king charles spaniel", "Cazador de alces noruego", "Chihuahua", "Chow chow", "Cirneco del Etna", "Clumber spaniel", "Cobrador", "Cocker spaniel americano", "Cocker spaniel inglés", "Collie barbudo", "Collie de pelo corto", "Collie de pelo largo", "Corgi galés de Pembroke", "Cotón de Tulear", "Crestado chino", "Crestado rodesiano", "Cursino", "Dálmata", "Dandie Dinmont", "Dogo de Burdeos", "Dogo del Tíbet", "Dogo mallorquín", "Drever", "Eurasier", "Field spaniel", "Fila brasileiro", "Fila de San Miguel", "Fox terrier", "Foxhound americano", "Foxhound inglés", "Galgo afgano", "Galgo español", "Galgo inglés", "Galgo italiano", "Galgo polaco", "Gascon saintongeois", "Golden retriever", "Gordon setter", "Gran basset grifón vendeano", "Gran Boyero suizo", "Gran danés", "Gran grifón vendeano", "Gran munsterlander", "Gran sabueso anglo-francés", "Grifón de Bruselas", "Grifón de muestra de pelo duro", "Grifón leonado de Bretaña", "Grifón nivernais", "Harrier", "Hokkaido", "Hovawart", "Husky siberiano", "Jack russel terrier", "Jamthund", "Kai", "Kelpie australiano", "Kerry blue terrier", "King charles spaniel", "Kishu", "Komondor", "Kromfohrlander", "Kuvasz", "Labrador retriever", "Lagotto romagnolo", "Laika de Siberia oriental", "Laika de Siberia occidental", "Laika ruso-europeo", "Lakeland terrier", "Landseer", "Lebrel escocés", "Lebrel húngaro", "Lebrel irlandés", "Leonberger", "Lasha apso", "Lundehund", "Manchester terrier", "Mastín de trabajo", "Mastín del Pirineo", "Mastín español", "Mastín inglés", "Mastín napolitano", "Montaña de Formosa", "Montaña de los Pirineos", "Montaña del Atlas", "Mudi", "Münsterlander pequeño", "Otterhound", "Papillón", "Parson rusell terrier", "Pastor alemán", "Pastor belga", "Pastor blanco suizo", "Pastor catalán", "Pastor croata", "Pastor de Anatolia", "Pastor de Asia central", "Pastor de Brie", "Pastor de Karst", "Pastor de las islas Shetland", "Pastor de los Pirineos", "Pastor de Maremma", "Pastor de Picardía", "Pastor de Tatra", "Pastor del Cáucaso", "Pastor eslovaco", "Pastor finlandés de Laponia", "Pastor ganadero australiano", "Pastor holandés", "Pastor islandés", "Pastor lapón de Suecia", "Pastor mallorquín", "Pastor ovejero australiano", "Pastor polaco de las llanuras", "Pastor portugués", "Pastor rumano de Mioritza", "Pastor ucraniano", "Pastor yugoslavo", "Pekinés", "Pequeño basset grifón vendeano", "Pequeño brabantino", "Pequeño perro león", "Pequeño perro ruso", "Pequeño sabueso de Suiza", "Perdiguero alemán", "Perdiguero de Burgos", "Perdiguero de Drente", "Perdiguero frisón", "Perdiguero portugués", "Perro de agua americano", "Perro de agua español", "Perro de agua francés", "Perro de agua frisón", "Perro de agua irlandés", "Perro de agua portugués", "Perro de caza polaco", "Perro de Chindo", "Perro de Groenlandia", "Perro de la sierra de la Estrela", "Perro de muestra alemán", "Perro finlandés de Laponia", "Perro lobo americano", "Perro lobo checoslovaco", "Perro lobo de Saarloos", "Perro sin pelo del Perú", "Pharaon Hound", "Pinscher", "Pinscher austriaco", "Podenco canario", "Podenco ibicenco", "Podenco portugués", "Pointer inglés", "Pointevino", "Pomerania", "Porcelana", "Presa canario", "Pudelpointer", "Pug", "Puli", "Pumi", "Rafeiro do Alentejo", "Ratonero holandés", "Retriever de Chesapeake", "Retriever de Nueva Escocia", "Ridgeback tailandés", "Rottweiler", "Sabueso", "Saluki", "Samoyedo", "San Bernardo", "Schapendoes neerlandés", "Schipperke", "Schnauzer pequeño", "Schnauzer mediano", "Schnauzer gigante", "Sealyham terrier", "Setter inglés", "Setter irlandés", "Shar pei", "Shiba inu", "Shih tzu", "Shikoku inu", "Skye terrier", "Sloughi", "Spaniel azul de Picardía", "Spaniel bretón", "Spaniel francés", "Spaniel holandés", "Spaniel japonés", "Spaniel picardo", "Spaniel tibetano", "Spinone italiano", "Spitz", "Springer spaniel", "Staffordshire bull terrier", "Sussex spaniel", "Teckel", "Terranova", "Terrier", "Tosa inu", "Vallhund sueco", "Vizsla", "Volpino australiano", "Westie", "Whippet", "Xoloitzcuintle", "Yorkshire terrier"];
const gatos_db = ["Cualquiera", "Mestizo", "Abisinio", "American shorthair", "American wirehair", "Angora turco", "Azul ruso", "Balinés", "Bengalí", "Birmano", "Bobtail americano", "Bobtail japonés", "Bombay", "Bosque de Noruega", "British longhair", "British shorthair", "Burmilla", "California spangled", "Californian rex", "Cartujo", "Ceilán", "Chausie", "Común europeo", "Cornish rex", "Curl americano", "Cymric", "Devon rex", "Don Sphynx", "Esfinge", "Exótico", "German rex", "Habana brown", "Highland fold", "Highland straight", "Himalayo", "Javanés", "Khao Manee", "Korat", "Maine Coon", "Manx", "Mau egipcio", "Munchkin", "Nebelung", "Ocicat", "Oriental", "Persa", "Persa chinchilla", "Peterbald", "Pixie bob", "Ragamuffin", "Ragdoll", "Safari", "Sagrado de Birmania", "Savannah", "Scottish fold", "Selkirk rex", "Siamés", "Siamés thai", "Siberiano", "Singapura", "Snowshoe", "Sokoke", "Somalí", "Tiffany", "Tonkinés", "Toyger", "Van turco", "York chocolate"];
const caballos_db = ["Cualquiera", "Mestizo", "Akhal-Teke", "Apaloosa", "AraApaloosa", "Árabe", "Árabe-portugués", "Asturcón", "Aveliñés", "Azteca", "Albino", "Alter Real", "AngloArgentino", "Bardigiano", "Bereber", "Bretón", "Buckskin", "Budyonny", "Basuto", "Caballo Altái", "Caballo andaluz", "Caballo de las retuertas", "Caballo de las Murgues", "Caballo de Merens", "Caballo de los Outer Banks", "Caballo ibérico", "Caballo de polo", "Caballo de pura raza gallega", "Caballo catalán", "Caballo mallorquín", "Caballo marismeño", "Caballo Marwari", "Caballo menorquín", "Caballo morab", "Chileno", "Chilote", "Criollo Colombiano", "Caballo Costarricense de Paso", "Caballo criollo", "Camargués", "Darashouri", "Don", "Dülmener Wildpferd", "Falabella", "Francés de silla", "Freiberg", "Frisón", "Gelder", "Gotland", "Hackney", "Haflinger", "Hannoveriano", "Holstein", "Iberoamericano", "Irish Cob", "Irish Hunter", "Islandés", "Jaca navarra", "Jomud", "Karabakh", "Kentucky mountain", "Kustanair", "Konik", "Lipizzano", "Lokai", "Losino", "Monchino", "Mongol", "Morab", "Morgan Horse", "Mustang", "Nonius", "Oldenburgues", "Palomino", "Pura Raza Paso Fino", "Caballo Peruano de Paso", "Percherón", "Piebald", "Pinto", "Pottoka", "Petramo", "Przewalski", "Quarter Horse", "Rocky Mountain Horse", "Salernitano", "San Fratelano", "Poni de Shetland", "Silla americano", "Tennessee Walking", "Tersk", "Tinker", "Torik", "Trakehner", "Ucraniano", "Waler"];