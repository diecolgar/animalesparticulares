const animalId = 'perro1239201'

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js'
import { getFirestore, collection, addDoc, getDocs, where, query, limit, doc, deleteDoc} from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js'
import { getStorage, ref, uploadString, getDownloadURL, deleteObject } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-storage.js'
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword, updateProfile, sendPasswordResetEmail} from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js'

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyBP3j2j5D9KHU70IcaKNOsEYQ9lumqCn50',
	authDomain: 'animales-particulares.firebaseapp.com',
	projectId: 'animales-particulares',
	storageBucket: 'animales-particulares.appspot.com',
	messagingSenderId: '454246576552',
	appId: '1:454246576552:web:8d18941ef96f18eb76ad9d',
}

export { firebaseConfig }

// INITIALIZE FIREBASE
const firebase = initializeApp(firebaseConfig)
const db = getFirestore(firebase)

// FIREBASE AUTHENTICATION
// --------------------------------------------------------------- USER REGISTER
const auth = getAuth()

function firebaseCreateUser(email, password, name) {
	return new Promise(function (resolve, reject) {
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
                updateProfile(auth.currentUser, {
                    displayName: name, photoURL: "https://example.com/jane-q-user/profile.jpg"
                })
                document.querySelector('.navelement.usernav').innerHTML = name
                document.querySelector('.navelement.usernav').classList.add('displayed')
				resolve()
				// ...
			})
			.catch((error) => {
				// console.log(error.code)
				reject(error.message)
				// ..
			})
	})
}

// Making fuction global
export { firebaseCreateUser }
window.firebaseCreateUser = firebaseCreateUser

// --------------------------------------------------------------- ON AUTH CHANGE
onAuthStateChanged(auth, (user) => {
	if (user) {
		// User is signed in, see docs for a list of available properties
		// https://firebase.google.com/docs/reference/js/firebase.User

        const uid = user.uid
        document.querySelector('.navelement.usernav').innerHTML = `Hola, ${user.displayName}`
        document.querySelector('.navelement.usernav').classList.add('displayed')
        document.querySelector('.loginnav').classList.remove('displayed')
        document.querySelector('.signinnav').classList.remove('displayed')
        document.querySelector('.signout').classList.add('displayed')

        if ((document.URL === 'http://127.0.0.1:5500/publish.html') || (document.URL === 'https://animalesparticulares.com/publish.html') ) {
            firebaseGetUserData().then( (userData) => {
                document.querySelector(".nombrecontacto .datainput .inputbox").value = userData.displayName;
                document.querySelector(".nombrecontacto .datainput .inputbox").style.pointerEvents = 'none';
                document.querySelector(".nombrecontacto .datainput .inputbox").style.backgroundColor = 'white';
                document.querySelector(".emailcontacto .datainput .inputbox").value = userData.email;
                document.querySelector(".emailcontacto .datainput .inputbox").style.pointerEvents = 'none';
                document.querySelector(".emailcontacto .datainput .inputbox").style.backgroundColor = 'white';
            })
        }
    // ...
	} else {
		// User is signed out
		document.querySelector('.navelement.usernav').innerHTML = ''
        document.querySelector('.navelement.usernav').classList.remove('displayed')
        document.querySelector('.loginnav').classList.add('displayed')
        document.querySelector('.signinnav').classList.add('displayed')
        document.querySelector('.signout').classList.remove('displayed')
	}
})

// --------------------------------------------------------------- SIGN OUT
document.querySelector('.signout').addEventListener('click', () => {
    signOut(auth).then(() => {
        // Signed out
      }).catch((error) => {
        // An error happened.
      });
})

// --------------------------------------------------------------- LOG IN
function firebaseLogIn(email, password) {
	return new Promise(function (resolve, reject) {
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            resolve()
        })
        .catch((error) => {
            reject(error)
        });
    })
}

// Making fuction global
export { firebaseLogIn }
window.firebaseLogIn = firebaseLogIn

// --------------------------------------------------------------- PASSWORD RESET
function firebaseResetPassword(email) {
	return new Promise(function (resolve, reject) {
        sendPasswordResetEmail(auth, email)
        .then(() => {
            resolve()
        })
        .catch((error) => {
            reject(error)
        });
    })
}

// Get user data
export { firebaseResetPassword }
window.firebaseResetPassword = firebaseResetPassword

// --------------------------------------------------------------- GET USER DATA
function firebaseGetUserData() {
	return new Promise(function (resolve, reject) {
    const auth = getAuth();
    const user = auth.currentUser;
        let userData = {
            displayName: user.displayName,
            email: user.email,
            phone: user.email
        }
        console.log(userData)
        resolve(userData)
    })

}

// Get user data
export { firebaseGetUserData }
window.firebaseGetUserData = firebaseGetUserData

// FIREBASE GENERAL FETCH
// --------------------------------------------------------------- FETCH ANIMAL FROM ID
async function firebaseFetchAnimal(Id) {
	return new Promise(function (resolve, reject) {
		let outputData = {}

		const q = query(
			collection(db, 'animales'),
			where('Id', '==', Id),
			limit(1)
		)

		getDocs(q).then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				outputData = {
                    name: doc.data().Name,
                    email: doc.data().Email,
                    phone: doc.data().Phone,
					id: doc.data().Id,
					age: doc.data().Age,
					ageUom: doc.data().AgeUom,
					description: doc.data().Description,
					especie: doc.data().Especie,
					fecha: doc.data().Fecha,
					number: doc.data().Number,
					provincia: doc.data().Provincia,
					raza: doc.data().Raza,
					numberOfImages: doc.data().NumeroImagenes,
				}

				resolve(outputData)
			})
		})
	})
}
// Making fuction global
export { firebaseFetchAnimal }
window.firebaseFetchAnimal = firebaseFetchAnimal

// --------------------------------------------------------------- FETCH ANIMAL FROM FULL DATA
async function firebaseFetchAnimalComplex(dataObject) {
	return new Promise(function (resolve, reject) {
		let outputData = {}
        let razaCompare = '=='
        if ( (dataObject.raza === undefined) || (dataObject.raza === '') ){
            razaCompare = '!='
            dataObject.raza = ''
        }
		let q = query(
			collection(db, 'animales'),
			where('Especie', '==', dataObject.especie),
			where('Raza', razaCompare, dataObject.raza),
			limit(100)
		)
        
        let outputArray = []
		getDocs(q).then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				outputData = {
                    name: doc.data().Name,
                    email: doc.data().Email,
                    phone: doc.data().Phone,
					id: doc.data().Id,
					age: doc.data().Age,
					ageUom: doc.data().AgeUom,
					description: doc.data().Description,
					especie: doc.data().Especie,
					fecha: doc.data().Fecha,
					number: doc.data().Number,
					provincia: doc.data().Provincia,
					raza: doc.data().Raza,
					numberOfImages: doc.data().NumeroImagenes,
				}
                if ( (dataObject.provincia === undefined ) || (dataObject.provincia === '') ) {
                    outputArray.push(outputData)
                } else if (dataObject.provincia === outputData.provincia) {
                    outputArray.push(outputData)
                }
			})
			resolve(outputArray)
		})
	})
}
// Making fuction global
export { firebaseFetchAnimalComplex }
window.firebaseFetchAnimalComplex = firebaseFetchAnimalComplex

// --------------------------------------------------------------- PUBLISH NEW ANIMAL
function firebasePublishNewAnimal(publishData) {
	try {
		const docRef = addDoc(collection(db, 'animales'), {
            Name: publishData.publishName,
            Email: publishData.publishEmail,
            Phone: publishData.publishPhone,
			Id: publishData.publishId,
			Especie: publishData.publishEspecie,
			Raza: publishData.publishRaza,
			Number: publishData.publishNumber,
			Age: publishData.publishAge,
			AgeUom: publishData.publishAgeUom,
			Provincia: publishData.publishProvincia,
			Description: publishData.publishDescription,
			Fecha: publishData.publishDate,
			NumeroImagenes: publishData.publishImageNumber,
		})
		console.log('Document written with ID: ', docRef.id)
	} catch (e) {
		console.error('Error adding document: ', e)
	}
}

// Making fuction global
export { firebasePublishNewAnimal }
window.firebasePublishNewAnimal = firebasePublishNewAnimal

// --------------------------------------------------------------- PUBLISH IMAGE
// Create a root reference
const storage = getStorage(firebase)

function firebasePublishPicture(file, name) {
    return new Promise(function (resolve, reject) {
        const reference = ref(storage, name)

        uploadString(reference, file, 'base64').then((snapshot) => {
            console.log('Uploaded a blob or file!')
            resolve()
        })
        .catch( (error) => {
            reject(error)
        })
    })
}

// Making fuction global
export { firebasePublishPicture }
window.firebasePublishPicture = firebasePublishPicture

// --------------------------------------------------------------- GET IMAGE
function firebaseGetPicture(imageId, index) {
	return new Promise(function (resolve, reject) {
		getDownloadURL(ref(storage, `id=${imageId}img=${index}`))
			.then((url) => {
				console.log(url)
				resolve(url)
			})
			.catch((error) => {
				console.log('Image reference not found, not a critical error')
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
export { firebaseGetPicture }
window.firebaseGetPicture = firebaseGetPicture

// --------------------------------------------------------------- ERASE PUBLICATION
function firebaseErasePublication(id) {
	return new Promise(function (resolve, reject) {

		const q = query(
			collection(db, 'animales'),
			where('Id', '==', id),
			limit(1)
		)

		getDocs(q).then((querySnapshot) => {
			querySnapshot.forEach((docc) => {
                console.log(docc.id)
                const docRef = doc(db, "animales", docc.id);
                const imageRef0 = ref(storage, `id=${id}img=0`);
                const imageRef1 = ref(storage, `id=${id}img=1`);
                const imageRef2 = ref(storage, `id=${id}img=2`);
                const imageRef3 = ref(storage, `id=${id}img=3`);
                const imageRef4 = ref(storage, `id=${id}img=4`);

                deleteDoc(docRef)
                .then(() => {
                    console.log("Entire Document has been deleted successfully.")
                    deleteObject(imageRef0).catch()
                    deleteObject(imageRef1).catch()
                    deleteObject(imageRef2).catch()
                    deleteObject(imageRef3).catch()
                    deleteObject(imageRef4).catch()
                    resolve()
                })
                .catch( (error) => console.log(error))
			})
		})
	})
}

// Making fuction global
export { firebaseErasePublication }
window.firebaseErasePublication = firebaseErasePublication
