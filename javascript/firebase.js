const animalId = 'perro1239201'

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js';
import { getFirestore, collection, addDoc, getDocs, where, query, limit } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js'
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


// FIREBASE GENERAL FETCH
// --------------------------------------------------------------- FETCH ANIMAL
async function firebaseFetchAnimal(Id) {
    return new Promise(function(resolve, reject) {
        let outputData = {};

        const q = query(collection(db, "animales"), where("Id", "==", Id), limit(1));

        getDocs(q).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                outputData = {
                id: doc.data().Id,
                age: doc.data().Age,
                ageUom: doc.data().AgeUom,
                description: doc.data().Description,
                especie: doc.data().Especie,
                fecha: doc.data().Fecha,
                number: doc.data().Number,
                provincia: doc.data().Provincia,
                raza: doc.data().Raza,
                numberOfImages: doc.data().NumeroImagenes
                }
                
                resolve(outputData);
        
            }); 
        })
    });
}
// Making fuction global
export {firebaseFetchAnimal}
window.firebaseFetchAnimal = firebaseFetchAnimal;



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
          Fecha: publishData.publishDate,
          NumeroImagenes: publishData.publishImageNumber
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

  // Making fuction global
  export {firebasePublishNewAnimal}
  window.firebasePublishNewAnimal = firebasePublishNewAnimal;



// --------------------------------------------------------------- PUBLISH IMAGE
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



// --------------------------------------------------------------- GET IMAGE
function firebaseGetPicture(imageId, index) {
  return new Promise(function(resolve, reject) {
    getDownloadURL(ref(storage, `id=${imageId}img=${index}`))
    .then((url) => {
        console.log(url)
      resolve(url);
    })
    .catch((error) => {
        console.log("Image reference not found, not a critical error")
    })
    // getDownloadURL(ref(storage, `id=${imageId}img=${index}.png;`))
    // .then((url) => {
    //     console.log(url)
    //   resolve(url);
    // })
    // .catch((error) => {
    //     console.log("Image reference not found, not a critical error")
    // })
  })
}

  // Making fuction global
  export {firebaseGetPicture}
  window.firebaseGetPicture = firebaseGetPicture;