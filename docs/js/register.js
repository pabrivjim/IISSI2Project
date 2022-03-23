"use strict";
import { messageRenderer } from "./renderers/messages.js";
import { userValidator } from "./validators/register-validator.js";
import { authAPI } from "/js/api/auth.js";
import { sessionManager } from "/js/utils/session.js";


function main() {

    //Obtenemos el botón del register y cuando se envíe el formulario llamamos a la funcion de de registrarnos
    let form = document.getElementById("form_reg");
    form.onsubmit = formHandler;
}

//Enviamos el register a sendRegister para registrarnos con los dos datos (username y pass)
function formHandler(event) {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);
    let errors = userValidator.validateRegister(formData);

    if(errors.length>0){
        let errorDiv =document.getElementById("errors");
        errorDiv.innerHTML="";
        for(let error of errors){ //si se usa in errors sale el index en vez de el texto del error
            messageRenderer.showErrorMessage(error);
        }
    }else {
        sendRegister(formData);
    }
}

//Función para registrarse
function sendRegister(formData) {
    authAPI.register(formData)
        .then(loginData => {
            let sessionToken = loginData.sessionToken;
            let loggedUser = loginData.user;
            sessionManager.login(sessionToken, loggedUser);
            window.location.href = "index.html";
        })
        .catch(error => {
            if(error == "There already exists another user with that username"){
                messageRenderer.showErrorMessage("No puede haber dos usuarios con el mismo nombre de usuario") 
            }else{
             messageRenderer.showErrorMessage(error)   
            }
        });
}

document.addEventListener("DOMContentLoaded", main)