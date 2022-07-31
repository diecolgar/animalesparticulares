const animalId = 'perro1239201'

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js';
import { getFirestore, collection, addDoc, getDocs } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js'
import { getStorage, ref, uploadString, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-storage.js'


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBP3j2j5D9KHU70IcaKNOsEYQ9lumqCn50",
    authDomain: "animales-particulares.firebaseapp.com",
    projectId: "animales-particulares",
    storageBucket: "animales-particulares.appspot.com",
    messagingSenderId: "454246576552",
    appId: "1:454246576552:web:8d18941ef96f18eb76ad9d"
  };

export {firebaseConfig}

// INITIALIZE FIREBASE
const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase)

// FILL EXPLORE SECTION
async function firebaseFillExploreItem() {
    const querySnapshot = await getDocs(collection(db, "animales"));
        let i = 0;
        querySnapshot.forEach((doc) => {
          console.log(doc.data().Id);
          firebaseGetPicture(doc.data().Id, i).then(([url, index]) => {
            document.querySelectorAll(".exploraimage")[index].style.backgroundImage = `url(${url})`;
            }
          );
          const raza = doc.data().Raza;
          const provincia = doc.data().Provincia;

          document.querySelectorAll(".exploraitem")[i].classList.add('relleno');
          document.querySelectorAll(".exploratitulo")[i].innerHTML = raza;
          document.querySelectorAll(".exploralugar")[i].innerHTML = provincia;

          i++;
        });
}
  // Making fuction global
  export {firebaseFillExploreItem}
  window.firebaseFillExploreItem = firebaseFillExploreItem;

// PUBLISH NEW ANIMAL
function firebasePublishNewAnimal(publishData) {
    try {
        const docRef = addDoc(collection(db, "animales"), {
          Id: publishData.publishId,
          Especie: publishData.publishEspecie,
          Raza: publishData.publishRaza,
          Number: publishData.publishNumber,
          Age: publishData.publishAge,
          AgeUom: publishData.publishAgeUom,
          Provincia: publishData.publishProvincia,
          Description: publishData.publishDescription,
          Fecha: publishData.publishDate
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

  // Making fuction global
  export {firebasePublishNewAnimal}
  window.firebasePublishNewAnimal = firebasePublishNewAnimal;

// PUBLISH IMAGE
  // Create a root reference
  const storage = getStorage(firebase);

  function firebasePublishPicture(file, name) {

    const reference = ref(storage, name);

    uploadString(reference, file, 'base64').then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
  }

  // Making fuction global
  export {firebasePublishPicture}
  window.firebasePublishPicture = firebasePublishPicture;

// GET IMAGE
function firebaseGetPicture(imageId, index) {
  return new Promise(function(resolve, reject) {
    getDownloadURL(ref(storage, `id=${imageId}img=0.jpeg`))
    .then((url) => {
      console.log(url)
      console.log(index)
      // Index is used for displaying several,
      resolve([url, index]);
    })
  })

}

  // Making fuction global
  export {firebaseGetPicture}
  window.firebaseGetPicture = firebaseGetPicture;