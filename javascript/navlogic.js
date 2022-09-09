const navContainer = document.querySelector('.navigation')

const loginNav = document.querySelector('.navigation .loginnav')
const signinNav = document.querySelector('.navigation .signinnav')
const authWindow = document.querySelector('.authenticationwindow')
const loginWindow = document.querySelector('.authenticationwindow .loginwindow')
const signinWindow = document.querySelector('.authenticationwindow .signinwindow')
const validatedWindow = document.querySelector('.authenticationwindow .validatedwindow')
const passwordResetWindow = document.querySelector('.authenticationwindow .forgotpasswordwindow')

const loginClose = document.querySelector('.loginwindow .firstline .closer')
const signinClose = document.querySelector('.signinwindow .firstline .closer')
const validatedClose = document.querySelector('.validatedwindow .firstline .closer')
const passwordResetClose = document.querySelector('.forgotpasswordwindow .closer')

const loginValidate = document.querySelector('.loginwindow .loginvalidator')
const signinValidate = document.querySelector('.signinwindow .signinvalidator')

const loginEmail = document.querySelector('.loginwindow .user .inputbox')
const loginPassword = document.querySelector('.loginwindow .password .inputbox')

const signinName = document.querySelector('.signinwindow .username .inputbox')
const signinEmail = document.querySelector('.signinwindow .user .inputbox')
const signinPassword = document.querySelector(
	'.signinwindow .password .inputbox'
)
const signinErrorLog = document.querySelector('.signinwindow .signinerrorlog')
const loginErrorLog = document.querySelector('.loginwindow .loginerrorlog')

const forgotPasswordLink = document.querySelector('.loginwindow .forgotpassword')

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

passwordResetClose.addEventListener('click', () => {
    authWindow.classList.remove('displayed')
	passwordResetWindow.classList.remove('displayed')
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
		firebaseCreateUser(signinEmail.value, signinPassword.value, signinName.value)
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
				}  else if ( error === 'Firebase: Error (auth/invalid-email).') {
					signinErrorLog.innerHTML = 'Email no válido.'
                }
                else if ( error === 'Firebase: Error (auth/internal-error).') {
					signinErrorLog.innerHTML = 'Faltan campos por rellenar o no son correctos.'
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
    })
    .catch((error) => {
        console.log(error)
        loginErrorLog.innerHTML = 'Los datos introducidos no coinciden con ningún usuario. Si crees que se trata de un error, contacta con nosotros.'
    })
})

forgotPasswordLink.addEventListener('click', () => {

    firebaseResetPassword(loginEmail.value).then( () => {
        loginWindow.classList.remove('displayed')
        passwordResetWindow.classList.add('displayed')
    })
    .catch((error) => {
        if(loginEmail.value === '') {
            loginErrorLog.innerHTML = 'Escribe tu email en el primer campo para recibir un correo de reestablecimiento de contraseña.'
        } else {
            loginErrorLog.innerHTML = 'El email que has escrito no existe en nuestra base de datos.'
        }
    })

})

const hamburguerMenu = document.querySelector('.hamburguermenu')

hamburguerMenu.addEventListener('click', () => {
    navContainer.classList.toggle('closed')
})