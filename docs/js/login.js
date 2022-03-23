"use strict";
import { messageRenderer } from "/js/renderers/messages.js";
import { authAPI } from "./api/auth.js";
import { sessionManager } from "./utils/session.js";

function main() {
    
    //Obtenemos el botón del login y cuando se envíe el formulario llamamos a la funcion de login
    let form = document.getElementById("form_reg");
    form.onsubmit = formHandler;
}


//Enviamos el login a sendLogin para registrarnos con los dos datos (username y pass)
function formHandler(event) {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);
    sendLogin(formData);
}

//Nos logeamos
function sendLogin(formData) {
    authAPI.login(formData)
        .then(loginData => {
            let sessionToken = loginData.sessionToken;
            let loggedUser = loginData.user;
            sessionManager.login(sessionToken, loggedUser);
            window.location.href = "index.html";
        })
        .catch(error =>{
            if(error == "User not found"){
                messageRenderer.showErrorMessage("Usuario no encontrado")
            }else if (error == "The password is not correct"){
                messageRenderer.showErrorMessage("La contraseña no es correcta")
            }else{
                messageRenderer.showErrorMessage(error)
            }
        });
}

document.addEventListener("DOMContentLoaded", main);