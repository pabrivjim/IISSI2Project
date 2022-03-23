"use strict"
import { userInfoRenderer } from "./renderers/userInfo.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { usersAPI } from "./api/user.js";
import { userInfoPhotosRenderer } from "./renderers/userInfoPhotos.js";
import { usersusersAPI } from "./api/useruser.js";
import { sessionManager } from "/js/utils/session.js";

//Obtenemos la id del usuarios Logeado
let urlParams = new URLSearchParams(window.location.search);
let userId = urlParams.get("userId");

function main() {

    //Obtenemos los div donde estará la parte correspondiente al perfil y la parte de las fotos subidas por
    //el usuario respectivamente mediante el id
    let userProfile = document.querySelector("div#userDataAndDescription");
    let userPhotos = document.querySelector("div#userInfoPhotos");


    // usersAPI.getPhotosById(userId)
    //     .then(photos => {
    //         let allUserPhotos = userInfoPhotosRenderer.asPhotoContent(photos);
    //         userPhotos.appendChild(userInfoRenderer.asDescription());
    //         userPhotos.appendChild(allUserPhotos);
    //     })
    //     .catch(error => messageRenderer.showErrorMessage(error));


    //Por otro lado miramos si el usuario está logeado
    if (sessionManager.getLoggedUser() !== null) {

        //En el caso de estarlo, si el perfil del usuario es el mismo que el perfil del que está logeado
        if (sessionManager.getLoggedUser().userId == userId) {

            //Primero que nada obtenemos todas las fotos públicas y privada del usuario.
            //Después para mostrar los seguidores usamos el usersusers para obtener el numero de personas al que sigue
            //Y el numero de personas que lo siguen. Además me pasamos al renderer el tamaño del array de photos para así
            //poder mostrar el contador de fotos.
            usersAPI.getMyPhotosById(userId)
                .then(photos => {
                    usersusersAPI.getById(userId)
                        .then(users => {
                            let profileInfo = userInfoRenderer.asInfo(users[0], photos.length);
                            userProfile.appendChild(profileInfo);
                        })
                        .catch(error => messageRenderer.showErrorMessage(error));

                    //Para todas las fotos las mostramos en su div correspondiente (ubicado abajo del todo)
                    let allUserPhotos = userInfoPhotosRenderer.asPhotoContent(photos);
                    userPhotos.appendChild(userInfoRenderer.asDescription());
                    userPhotos.appendChild(allUserPhotos);
                })
                .catch(error => messageRenderer.showErrorMessage(error));
            //Entonces usamos la funcion setInterval para espere hasta que el botón de seguir esté creado.
            //Esto lo hacemos para que no nos de problemas los renderers y js ya que muchas veces se intenta
            //buscar el elemento antes de que exista
            var checkExist1 = setInterval(function () {
                if ($("#follow-button").length) {

                    //Una vez usando J-Query hemos visto que tiene length = existe entonces borramos el 
                    //intervalo basicamente.
                    clearInterval(checkExist1);

                    //En este caso al ser el usuario logado el mismo que el del perfil entonces cambiamos el
                    //título de la pagna a "Mi Perfil"
                    document.title = "Mi Perfil";

                    //Como ya sabemos que el botón existe lo obtenemos mediante el id
                    let followButton = document.getElementById("follow-button");

                    //Cambiamos todo su estilo a gris, y su contenido a "Editar Perfil"
                    followButton.textContent = "Editar Perfil"
                    followButton.classList.remove("btn-primary")
                    followButton.classList.add("btn-outline-dark")

                    //Le damos los atributos de dataTarget y dataToggle necesarios para el modal tal y como
                    //especifíca bootstrap
                    followButton.dataset.target = ".bd-example-modal-lg"
                    followButton.dataset.toggle = "modal"

                    //Obtenemos el div donde se ubicará el modal por el id, que se encuentra en el 
                    //renderer userInfoRenderer.asInfo()
                    let modal = document.getElementById("possible-modal");

                    //Añadimos al div del modal el modal que se encuentra en el renderer indicado
                    modal.appendChild(userInfoRenderer.asUserInfoModal());

                    //Obtenemos todos los elementos del modal de editar perfil por el id
                    let firstName = document.getElementById("firstname-input");
                    let lastName = document.getElementById("lastname-input");
                    let email = document.getElementById("email-input");
                    let telephone = document.getElementById("telephone-input");
                    let username = document.getElementById("username-input");
                    let avatar = document.getElementById("avatar-url");
                    let editProfileForm = document.getElementById("form_reg");

                    //Cuando se envíe el formulario de editar perfil llamamos a la función de editar perfil
                    editProfileForm.onsubmit = handleEditProfile;

                    //Obtenemos todos los datos del usuario por su id
                    usersAPI.getById(userId)
                        .then(users => {
                            //Al igual que en editPhoto cargamos los valores que estaban por defecto en la DB
                            let currentUser = users[0];
                            firstName.value = currentUser.firstName;
                            lastName.value = currentUser.lastName;
                            email.value = currentUser.email;
                            telephone.value = currentUser.telephone;
                            username.value = currentUser.username;
                            avatar.value = currentUser.avatarUrl;
                        })
                        .catch(error => messageRenderer.showErrorMessage(error));
                }
            }, 100);
            // check every 100ms

            //En el caso de que el usuario logeado no sea el mismo que el usuario de la pagina que está visitando
        } else {

            //Primero que nada obtenemos todas las photos públicas de un usuario.
            //Después para mostrar los seguidores usamos el usersusers para obtener el numero de personas al que sigue
            //Y el numero de personas que lo siguen. Además me pasamos al renderer el tamaño del array de photos para así
            //poder mostrar el contador de fotos.
            usersAPI.getPhotosById(userId)
                .then(photos => {
                    usersusersAPI.getById(userId)
                        .then(users => {
                            let profileInfo = userInfoRenderer.asInfo(users[0], photos.length);
                            userProfile.appendChild(profileInfo);
                        })
                        .catch(error => messageRenderer.showErrorMessage(error));

                    //Para todas las fotos las mostramos en su div correspondiente (ubicado abajo del todo)
                    let allUserPhotos = userInfoPhotosRenderer.asPhotoContent(photos);
                    userPhotos.appendChild(userInfoRenderer.asDescription());
                    userPhotos.appendChild(allUserPhotos);
                })
                .catch(error => messageRenderer.showErrorMessage(error));
            //Obtenemos el id del usuario logado
            let userLogged = sessionManager.getLoggedUser().userId;

            //Entonces usamos la funcion setInterval para espere hasta que el botón de seguir esté creado.
            //Esto lo hacemos para que no nos de problemas los renderers y js ya que muchas veces se intenta
            //buscar el elemento antes de que exista
            var checkExist1 = setInterval(function () {
                if ($("#follow-button").length) {

                    //Una vez usando J-Query hemos visto que tiene length = existe entonces borramos el 
                    //intervalo basicamente.
                    clearInterval(checkExist1);

                    //Obtenemos el botón de seguir por su id
                    let followButton = document.getElementById("follow-button");

                    //Y usamos el trigger de usersusersApi que nos devuelve
                    //userSource (usuario logeado), userTarget (usuarios a los que sigue), 
                    //username (nombre del usuario al que sigue), userId (basicamente es el mismo campo que userTarget y se podría cambiar), 
                    //avatarUrl (avatar del usuario al que sigue), photoId que el usuario al que sigue ha subido y su url
                    usersusersAPI.getByIdUserData(userLogged)
                        .then(users => {

                            //Para cada usuario que nos devuelve
                            for (let user of users) {

                                //Si el usuario logado es el mismo que el source (se podría quitar ahora que lo pienso),
                                //si el usuario es igual al user target y el user target es igual que el userId (que también se puede
                                //quitar)
                                if (userLogged == user.userSource
                                    && userId == user.userTarget
                                    && user.userTarget == user.userId) {

                                    //Entonces si se cumple eso significa que el usuario logado sigue al usuario al que está viendo
                                    //entonces ponemos el botón en rojo y como "Dejar de seguir"
                                    followButton.innerText = 'Dejar de seguir';
                                    followButton.classList.remove('btn-primary');
                                    followButton.classList.add('btn-danger');
                                }
                            }
                        })
                        .catch(error => messageRenderer.showErrorMessage(error));


                    //Por otro lado cuando clicamos en seguir o dejar de seguir
                    followButton.onclick = function () {

                        //En caso de que el contenido del botón sea "Seguir"
                        if (followButton.innerText === 'Seguir') {

                            //Creamos un form y obtenemos el elemento donde se muestra el numero de usuarios
                            let formData = new FormData();
                            let userFollowers = document.getElementById("userFollowers");

                            //Añadimos al form como userSource el usuario que está logado y en userTarget el
                            //usuario al que va a seguir
                            formData.append("userSource", userLogged);
                            formData.append("userTarget", userId);

                            //Hacemos un post en usersusers y seguidamente cambiamos el botón a "Dejar de seguir"
                            //ya que el usuario ya lo sigue. Además cambiamos también su estilo. Finalmente para 
                            //no tener que refrescar la página que es una cosa inncesaria, simplemente aumentamos el 
                            //contador de seguidores a 1
                            usersusersAPI.create(formData)
                                .then(data => {
                                    followButton.innerText = 'Dejar de seguir';
                                    followButton.classList.remove('btn-primary');
                                    followButton.classList.add('btn-danger');
                                    userFollowers.innerText = parseInt(userFollowers.textContent) + 1;
                                })
                                .catch(error => messageRenderer.showErrorMessage(error));

                            //En el caso de que el botón esté como "Dejar de seguir" significa que ya lo sigue tnonces
                            //emitimos una pregunta de si está seguro de si quiere dejarlo de seguir
                        } else if (followButton.innerText === 'Dejar de seguir') {
                            let answer = confirm("Estas seguro de dejar de seguir?");

                            //En el caso de que así lo desee, borramos la entrada de la tabla y el usuario logeado
                            //dejará de seguir al usuario que está viendo
                            if (answer) {
                                usersusersAPI.delete(userLogged, userId)
                                    .then(data => {

                                        //Una vez dejado de seguir cambiamos el botón a seguir de nuevo con su
                                        //respectivo style y clases etc y decrementamos el contador de seguidores en 1
                                        followButton.innerText = 'Seguir';
                                        followButton.classList.remove('btn-danger')
                                        followButton.classList.add('btn-primary');
                                        userFollowers.innerText = parseInt(userFollowers.textContent) - 1;
                                    })
                                    .catch(error => messageRenderer.showErrorMessage(error));
                            }

                        }
                    }
                }
            }, 100);
        }
    } else {

        //Primero que nada obtenemos todas las photos públicas de un usuario.
        //Después para mostrar los seguidores usamos el usersusers para obtener el numero de personas al que sigue
        //Y el numero de personas que lo siguen. Además me pasamos al renderer el tamaño del array de photos para así
        //poder mostrar el contador de fotos.
        usersAPI.getPhotosById(userId)
            .then(photos => {
                usersusersAPI.getById(userId)
                    .then(users => {
                        let profileInfo = userInfoRenderer.asInfo(users[0], photos.length);
                        userProfile.appendChild(profileInfo);
                    })
                    .catch(error => messageRenderer.showErrorMessage(error));

                //Para todas las fotos las mostramos en su div correspondiente (ubicado abajo del todo)
                let allUserPhotos = userInfoPhotosRenderer.asPhotoContent(photos);
                userPhotos.appendChild(userInfoRenderer.asDescription());
                userPhotos.appendChild(allUserPhotos);
            })
            .catch(error => messageRenderer.showErrorMessage(error));
    }
}


//Función de editar perfil
function handleEditProfile(event) {
    event.preventDefault();

    //Obtenemos los datos del form mediante el event
    let form = event.target;
    let formData = new FormData(form);

    //Hacemos un update en la DB con los nuevos datos 
    usersAPI.update(userId, formData)
        .then(data => {
            //En caso de acierto ocultamos el modal y mostramos un mensaje de Acierto
            $('#editProfileModal').modal('hide');
            messageRenderer.showSuccessMessage("Datos Actualizados")
            const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
            wait(1000).then(() => {
                window.location.href = `/docs/userInfo.html?userId=${sessionManager.getLoggedUser().userId}`
            })
        })
        .catch(error => {
            //En caso de acierto ocultamos el modal y mostramos un error
            $('#editProfileModal').modal('hide');
            messageRenderer.showErrorMessage(error)
        });
}

document.addEventListener("DOMContentLoaded", main)