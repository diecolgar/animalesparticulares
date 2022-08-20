const loginNav = document.querySelector('.navigation .loginnav')
const signinNav = document.querySelector('.navigation .signinnav')
const authWindow = document.querySelector('.authenticationwindow')
const loginWindow = document.querySelector('.authenticationwindow .loginwindow')
const validatedWindow = document.querySelector('.authenticationwindow .validatedwindow')
const signinWindow = document.querySelector(
	'.authenticationwindow .signinwindow'
)
const loginClose = document.querySelector('.loginwindow .firstline .closer')
const signinClose = document.querySelector('.signinwindow .firstline .closer')
const validatedClose = document.querySelector('.validatedwindow .firstline .closer')
const loginValidate = document.querySelector('.loginwindow .loginvalidator')
const loginEmail = document.querySelector('.loginwindow .user .inputbox')
const loginPassword = document.querySelector('.loginwindow .password .inputbox')
const signinValidate = document.querySelector('.signinwindow .signinvalidator')
const signinEmail = document.querySelector('.signinwindow .user .inputbox')
const signinPassword = document.querySelector(
	'.signinwindow .password .inputbox'
)
const signinErrorLog = document.querySelector('.signinwindow .signinerrorlog')

loginNav.addEventListener('click', () => {
	authWindow.classList.add('displayed')
	loginWindow.classList.add('displayed')
})

signinNav.addEventListener('click', () => {
	authWindow.classList.add('displayed')
	signinWindow.classList.add('displayed')
})

loginClose.addEventListener('click', () => {
	authWindow.classList.remove('displayed')
	loginWindow.classList.remove('displayed')
})

signinClose.addEventListener('click', () => {
	authWindow.classList.remove('displayed')
	signinWindow.classList.remove('displayed')
})

validatedClose.addEventListener('click', () => {
    authWindow.classList.remove('displayed')
	validatedWindow.classList.remove('displayed')
})

signinValidate.addEventListener('click', () => {
	const key = document.querySelector(
		'.signinwindow .password .inputbox'
	).value
	const keyVal = document.querySelector(
		'.signinwindow .validation .inputbox'
	).value

	if (key === keyVal) {
		signinErrorLog.innerHTML = ''
		firebaseCreateUser(signinEmail.value, signinPassword.value)
			.then((output) => {
                validatedWindow.classList.add('displayed')
                signinWindow.classList.remove('displayed')
			})
			.catch((error) => {
				signinErrorLog.innerHTML = error
				if (error === 'Firebase: Error (auth/missing-email).') {
					signinErrorLog.innerHTML = 'Se requiere un email'
				} else if (
					error ===
					'Firebase: Password should be at least 6 characters (auth/weak-password).'
				) {
					signinErrorLog.innerHTML = 'Contraseña demasiado débil'
				} else if (
					error === 'Firebase: Error (auth/email-already-in-use).'
				) {
					signinErrorLog.innerHTML = 'Este email ya está en uso.'
				} else {
					signinErrorLog.innerHTML = error
				}
			})
	} else {
		signinErrorLog.innerHTML = 'Las contraseñas no coinciden'
	}

})

loginValidate.addEventListener('click', () => {
    firebaseLogIn(loginEmail.value, loginPassword.value).then( () => {
        authWindow.classList.remove('displayed')
        loginWindow.classList.remove('displayed')
    }).catch( (error) => {
        alert(error)
    })
})
