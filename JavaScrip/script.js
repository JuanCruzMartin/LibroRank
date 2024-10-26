            //  FORMULARIO DE REGISTRO

const submitFunction = (event) => {
    if(!validarFormulario()){
        event.preventDefault();
    }else{
        event.preventDefault();
        alert(
            'Los datos enviados fueron :  \n' +
                'Nombre: ' + document.getElementById('nombre').value + '\n'+
                'Apellido: ' + document.getElementById('apellido').value + '\n'+
                'Email: ' + document.getElementById('email').value + '\n'+
                'Edad: ' + document.getElementById('edad').value + '\n'+
                'tipo de lector : ' + document.getElementById('tipoDeLector').value + '\n'+
                'tipo de libros que mas lee : ' + document.getElementById('estiloDeLibroQueLee').value + '\n'+
                'Nivel de Estudio: ' + document.getElementById('nivelEstudio').value + '\n'
        )
    }
}

document.getElementById('formulario').addEventListener('submit',submitFunction)

function validarFormulario(){
    let camposTexto = document.querySelectorAll('input[type="text"]');
    let validacionCorrecta = true;

   camposTexto.forEach(campo =>{
    let errorCampo = document.getElementById('error' + campo.id.charAt(0).toUpperCase() + campo.id.slice(1))
    if (campo.value.length == ''){
        mostrarError(errorCampo,'Este campo es requerido.')
        validacionCorrecta =false;
    }else if (campo.value.length > 0 && campo.value.length < 3){
        mostrarError(errorCampo,'Se requiere minimo 3 caracteres.')
        validacionCorrecta= false;
    }else {ocultarError(errorCampo)

    }
   })

    //esto valida campo de email
    const email = document.getElementById('email');
    let errorEmail = document.getElementById('errorEmail')

    if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)){//esto valida que el formato de mail sea correcto!
        ocultarError(errorEmail)
    }else {
        mostrarError(errorEmail,'Ingrese un correo electronico valido.')
    }


    // validar edad

    const edad = document.getElementById('edad');
    const errorEdad = document.getElementById('errorEdad')
    if (edad.value < 18){
        mostrarError(errorEdad,'Debes ser mayor a 18 para registrarte.')
        validacionCorrecta = false
    }else {
        ocultarError(errorEdad)
    }



   // validar nivel de estudio 

const nivelEstudio = document.getElementById('nivelEstudio')
const errorNivelEstudio = document.getElementById('errorNivelEstudio')

if(nivelEstudio.value ==''){
    mostrarError (errorNivelEstudio,'Por favor, seleccione un estudio')
    validacionCorrecta = false;
}else{
    ocultarError(errorNivelEstudio)
}


    //validacion de libros que mas lee

    const actividad = document.getElementById('estiloDeLibroQueLee')
    const errorActividad = document.getElementById('errorActividad')

    if(actividad.value ==''){
        mostrarError (errorEstiloDeLibroQueLee,'Por favor, seleccion un estilo de libro')
        validacionCorrecta = false;
    }else{
        ocultarError(errorEstiloDeLibroQueLee)
    }
// validar terminos y condiciones

const aceptoTerminos = document.getElementById('aceptoTerminos')
const errorAceptoTerminos = document.getElementById('errorAceptoTerminos')

if(!aceptoTerminos.checked){
    mostrarError(errorAceptoTerminos,'Debes aceptar los terminos y condiciones.')
    validacionCorrecta = false
}else {
    ocultarError(errorAceptoTerminos)
}

return validacionCorrecta //Esto dira si el formulario completo es valido o no

}

const mostrarError = (elemento,mensaje)=>{
    elemento.textContent=mensaje;
    elemento.style.display='block';
}
const ocultarError = (elemento)=>{
    elemento.textContent='';
    elemento.style.display="none";
}




























//             LOGIN


document.addEventListener('DOMContentLoaded', function(){
    const loginForm = document.getElementById('loginForm');
    const userName = document.getElementById('email');
    const password = document.getElementById('Password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const showHideButton = document.getElementById('show-hide')
        loginForm.addEventListener('submit',function(event){
            event.preventDefault();
            validateForm();
        })

        emailInput.addEventListener('blur',function(){
            validateEmail()
        })
        emailInput.addEventListener('change',function(){
            clearError(emailError)
        })
        passwordInput.addEventListener('change',function(){
            clearError(passwordError)
        })

        showHideButton.addEventListener('click',function(){
            if (passwordInput.type == 'password'){
                passwordInput.type = 'text'
            }else {
                passwordInput.type='password'
            }
        })

        function validateForm(){
            const isValidEmail=validateEmail()
            const isValidPassword=validatePassword()
            if (isValidEmail && isValidPassword){
                saveToLocalStorage()
                alert('Has ingresado con exito')
            }
        }

        function validateEmail(){
            const emailRegex =/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
            const emailValue = userName.value.trim()
            if (!emailRegex.test(emailValue)){
                showError(emailError,'Ingresa un email valido')
                return false;
            }
            return true
        }

        function validatePassword(){
            const passwordValue = password.value.trim();
            if (passwordValue.length < 6){
                showError ( passwordError,'Ingrese una contraseña de al menos 6 caracteres')
                return false;
            }
            return true
        }

        function showError (errorElement,messege ){
            errorElement.innerHTML = messege;
            errorElement.style.display = 'block';
        }
        function clearError (errorElement){
            errorElement.innerHTML='';
            errorElement.style.display = 'none';
            
        }

        function saveToLocalStorage(){
            const emailValue = userName.value.trim();
            localStorage.setItem('email',emailValue)
            const body = bodyBuilderJSON()
            console.log(body);
        }

        function bodyBuilderJSON(){
            return{
                "email":userName.value,
                "password":password.value
            }
        }

})
