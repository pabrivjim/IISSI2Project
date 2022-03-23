"use strict"
import { followedUserGalleryRenderer } from "/js/renderers/followedUsersGallery.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { usersusersAPI } from "./api/useruser.js"
import { sessionManager } from "/js/utils/session.js";


function main() {
    
    //Se obtiene el usuario logeado
    let userId = sessionManager.getLoggedUser().userId;

    //obtenemos el div donde queremos añadir las cards
    let cardContent = document.querySelector("div#followedUsersDiv");
    // console.log(cardContent)

    //Obtenemos los datos de los usuarios a los que sigue el usuario logeado
    usersusersAPI.getByIdUser(userId)
        .then(data => {

            //Usamos el renderer para ir añadiendo las cards
            let followedUsers = followedUserGalleryRenderer.asGalleryPhoto(data);
            cardContent.appendChild(followedUsers);
        })
        .catch(error => messageRenderer.showErrorMessage(error));

}

document.addEventListener("DOMContentLoaded", main)