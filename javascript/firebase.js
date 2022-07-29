const animalId = 'perro1239201'

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js';
import { getFirestore, collection, addDoc, getDocs } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js'
import { getStorage, ref, uploadString} from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-storage.js'


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

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
  
const db = getFirestore(firebase)

// FILL EXPLORE SECTION
async function fillExploreItem() {
    const querySnapshot = await getDocs(collection(db, "animales"));
        let i = 0;
        querySnapshot.forEach((doc) => {
        const imagen0 = doc.data().imagenes[0];
        const imagen1 = doc.data().imagenes[1];
        const imagen2= doc.data().imagenes[2];
        const imagen3 = doc.data().imagenes[3];
        const raza = doc.data().raza;
        const provincia = doc.data().provincia;
        document.querySelectorAll(".exploraitem")[i].classList.add('relleno');
        document.querySelectorAll(".exploraimage")[i].style.backgroundImage = `url(${imagen0})`;
        document.querySelectorAll(".exploratitulo")[i].innerHTML = raza;
        document.querySelectorAll(".exploralugar")[i].innerHTML = provincia;

        i++;
    });
}
// fillExploreItem()

// PUBLISH NEW ANIMAL
function publishNewAnimal(quantity,region,city,age,images,race) {
    try {
        const docRef = addDoc(collection(db, "animales"), {
          cantidad: quantity,
          provincia: region,
          ciudad: city,
          edad: age,
          imagenes: images,
          raza: race
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

// PUBLISH IMAGE
// Create a root reference
const storage = getStorage(firebase);

function firebasePublishPicture(file, name) {

  const reference = ref(storage, name);

  uploadString(reference, file, 'base64').then((snapshot) => {
    console.log('Uploaded a blob or file!');
  });
}

export {firebasePublishPicture}
window.firebasePublishPicture = firebasePublishPicture;

