" use strict " ;
import { sessionManager } from "/js/utils/session.js";

function main() {
    
    showUser();
    addLogoutHandler();
    hideHeaderOptions();
}

function hideHeaderOptions() {
    
    //Obtenemos los distintos elementos que queremos ocultar o dejar de ocultarlos al estar logeado o
    //al dejar de estarlo
    let headerLogin = document.getElementById("header-login");
    let headerLiLogin = document.getElementById("header-li-login");
    let headerFollowedUsers = document.getElementById("header-followedUsers");
    let headerUploadPhoto = document.getElementById("header-uploadPhoto");
    let headerMyProfile = document.getElementById("header-myProfile");
    let headerLogout = document.getElementById("header-logout");
    let headerLiLogout = document.getElementById("header-li-logout");
    
    //Si está logeado entonces escondemos el login y su li en la ul para que no quede un espacio en blanco
    if (sessionManager.isLogged()) {
        headerLogin.style.display = "none";
        headerLiLogin.style.display = "none";
        
        //Además el elemento de "My Profile" al clicar nos lleva a nuestro perfil
        let headerMyUserInfo = document.getElementById("header-myUserInfo");
        headerMyUserInfo.href = `/docs/userInfo.html?userId=${sessionManager.getLoggedUser().userId}`
        
    } else {

        //Para el caso de que no esté logeado ocultamos el logout y su li, para subir foto, el "My profile" y los 
        //usuarios seguidos
        headerLogout.style.display = "none";
        headerLiLogout.style.display = "none";
        headerUploadPhoto.style.display = "none";
        headerMyProfile.style.display = "none";
        // headerTrending.style.display = "none";
        headerFollowedUsers.style.display = "none";
    }
}

//Función de deslogearse
function addLogoutHandler() {
    let logoutButton = document.getElementById("header-logout");

    logoutButton.addEventListener("click",function(){
        sessionManager.logout();
        window.location.href = "index.html";
    });
}

//Función para mostrar el usuario
function showUser() {

    //Obtenemos el titulo de la pagina y también el logo
    let title = document.getElementById("PageName");
    let avatar = document.getElementById("header-avatar-placeholder");
    let text;

    //Y si el usuario está logeado entonces mostramos ahí su nombre y su avatar y en otro caso el nombre de la página
    //y el logo
    if (sessionManager.isLogged()) {
        let username = sessionManager.getLoggedUser().username;
        let avatarUrl = sessionManager.getLoggedUser().avatarUrl;
        avatar.src=avatarUrl
        text = "@" + username;
    } else {
        text = "PhotoPic";
        
    }
    title.textContent = text;
}
document.addEventListener("DOMContentLoaded" , main ) ;