"use strict"
import { photoDetailsRenderer } from "./renderers/photoDetails.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { photosAPI } from "./api/photo.js"
import { usersAPI } from "./api/user.js";
import { commentsAPI } from "./api/comment.js";
import { commentRenderer } from "./renderers/photoDetailsComment.js";
import { sessionManager } from "/js/utils/session.js";
import { inappropriatewordsAPI } from "./api/inappropriatewords.js";
import { ratingsAPI } from "./api/ratings.js";
import { userscommentsAPI } from "./api/usersComments.js";

//Obtenemos la photoId
let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");

function main() {
    let photoContent = document.querySelector("div#photo-div");
    let commentContent = document.querySelector("div#comments-list");
    let desc = document.querySelector("div#photoDetailsDesc");


    //Obtenemos el rating y los datos de la foto por Id
    photosAPI.getByIdRating(photoId)
        .then(photos => {

            //A partir de la userId que ha subido la foto
            usersAPI.getById(photos[0].userId)
                .then(users => {

                    //El primer if es por si es null entonces no tendría userId of null y peta
                    if (sessionManager.getLoggedUser() !== null) {

                        //En el caso de que la persona logeada sea igual que la persona que ha subido la foto
                        if (sessionManager.getLoggedUser().userId === users[0].userId) {

                            //Entonces llamamos al renderer de asMyPhoto que incluye el botón de editar foto
                            let photoDet = photoDetailsRenderer.asMyPhoto(photos[0], users[0]);
                            photoContent.appendChild(photoDet);
                        } else {

                            //En otro caso, simplemente mostarmos la foto pero no el botón para editar
                            let photoDet = photoDetailsRenderer.asPhoto(photos[0], users[0]);
                            photoContent.appendChild(photoDet);
                        }
                    } else {

                        //Aqui realmente hacemos lo mismo que cuando el usuario no es el mismo que subió la foto
                        //pero lo he puesto simplemente para diferenciar casos por si en un futuro se quiere añadir
                        //Algo para los que no están logeados
                        let photoDet = photoDetailsRenderer.asPhoto(photos[0], users[0]);
                        photoContent.appendChild(photoDet);
                    }
                })
                .catch(error => messageRenderer.showErrorMessage(error));

            //Cargamos la descripción para la foto
            let description = photoDetailsRenderer.asDescription(photos[0])
            desc.appendChild(description)
        })
        .catch(error => messageRenderer.showErrorMessage(error));
    

    //Definimos un array de ids de comentarios
    let commentIdArray = []
    commentsAPI.getById(photoId)
        .then(comments => {

            //Guardamos los commentId pq usaremos esos para acceder al form
            comments.forEach(function (obj) {
                commentIdArray.push(obj.commentId);
            })
            
            //Cargamos los comentarios y lo añadimos a la lista de comentarios
            let commentDet = commentRenderer.asCommentContent(comments);
            commentContent.appendChild(commentDet);

            //Establecemos un intevalo de tiempo para esperar a que el formulario de likes y dislikes exista
            //y así no de problemas de element not found etc
            var checkExist1 = setInterval(function () {

                //Si existen comentarios
                if (commentIdArray.length > 0) {
                    
                    //entonces para comentario
                    for (let i = 0; i < commentIdArray.length; i++) {

                        //Si el elemento ya está creado (por eso usamos una media query con length) además
                        //según he probado si uso documment.getelement me da error hasta que se crea y queda feo
                        //que salga por consola
                        if ($(`#likeAndDislike${commentIdArray[i]}`).length) {

                            //Borramos el intervalo para que no siga haciendo el bucle
                            clearInterval(checkExist1);
                            
                            //Si el usuario no esta logeado
                            if (sessionManager.getLoggedUser() === null) {

                                //Entonces obtenemos el form (que para no tener el mismo id le asignamos el id del comentario)
                                //tengo entendido que también se puede hacer con name pero a mi no me funcionaba correctamente...
                                let formValorateComment = document.getElementById(`likeAndDislike${commentIdArray[i]}`);

                                //Si se envía entonces mostarmos un error y el return false solo es para asegurarme.
                                formValorateComment.onsubmit = function () {
                                    messageRenderer.showErrorMessage("No puede valorar si no ha iniciado sesión")

                                    //return false es para que no pete y se mande automáticamente
                                    return false
                                }
                            } else {
                                //Obtenemos el id del usuario logado y al igual que antes obtenemos el form
                                let userId = sessionManager.getLoggedUser().userId;
                                let formValorateComment = document.getElementById(`likeAndDislike${commentIdArray[i]}`);
                                
                                //Cuando se clica en enviar el formulario entonces
                                formValorateComment.onsubmit = function (event) {
                                    event.preventDefault();
                                    let form = event.target;
                                    let formData = new FormData(form);

                                    //Tras mucho probar, muchos dolores de cabeza, miles de threads en stackoverflow (los cuales no ayudaron)
                                    // Y SOBRE TODO mucho console.log, encontré la solucion => event["submitter"]["value"]
                                    //Al tener los 5 botones como submit, lo unico que necesito es obtener el botón que es clicado
                                    // y en este caso se obtiene accediendo a submiter y a el value.
                                    let x = event["submitter"]["value"];
                                    console.log(x)

                                    //Asignamos a la id como valor commentIdValX siendo X el commentId (hacemos como en el form)
                                    let commentIdValue = event["submitter"]["id"].replace("commentIdVal", "")
                                    
                                    //Agregamos los datos al form con las keys correspondientes de la db
                                    formData.append("userId", userId);
                                    formData.append("commentId", commentIdValue);
                                    formData.append("value", x)
                                    
                                    //Creamos el comentario
                                    userscommentsAPI.create(formData)
                                        .then(data => {
                                            window.location.href = `/docs/photodetails.html?photoId=${photoId}`
                                        })
                                        .catch(error => messageRenderer.showErrorMessage(error));
                                }
                            }
                        }
                    }
                }
            }, 100); // check every 100ms
        })
        .catch(error => messageRenderer.showErrorMessage(error));

    //En el caso de que se intente postear un comentario entonces llamamos a la funcion handleSubmitContent
    let postCommentForm = document.getElementById("form-upload-comment");
    postCommentForm.onsubmit = handleSubmitComment;

    
    //Parte de valoraciones
    var checkExist2 = setInterval(function () {
        
        //Una vez se haya creado el form de valoraciones
        if ($('#ratings-form').length) {

            //Quitamos el intervalo de espera
            clearInterval(checkExist2);

            //Si el usuario no está logeado
            if (sessionManager.getLoggedUser() === null) {
                
                //entonces al enviar el formulario devolvemos falso para que no redirija ni nada y
                //Mostramos un error de que no puede valorar si no ha iniciado sesión
                let formRating = document.getElementById("ratings-form");
                formRating.onsubmit = function () {
                    messageRenderer.showErrorMessage("No puede valorar si no ha iniciado sesión")
                    return false; //si devuelves false no se actualiza y no se lleva acabo el submit
                }

            //En el caso de que sí esté logeado
            } else {

                //Entonces obtenemos su id
                let userId = sessionManager.getLoggedUser().userId;

                //Obtenemos las puntuaciones de la foto
                ratingsAPI.getUserByPhotoId(photoId)
                    .then(users => {

                        //En el caso de que el usuario no haya valorado aún
                        if (!users.some(({ user }) => user == userId)) {

                            //Se le pasa por parametro para no tener que declararlo
                            postRating(userId);
                        } else {
                            ratingsAPI.getUserRatingInPhoto(photoId, userId)
                                .then(rating => {
                                    //Este es el caso en el que ya haya valorado, entonces lo que hacemos es
                                    //Mostrarle su valoración e impedir que pueda valorar de nuevo. Si intentara
                                    //por algun medio valorar, tenemos en el backend un trigger así que tampoco podría
                                    let ratingGiven = document.getElementById("ratingGiven");
                                    ratingGiven.textContent = "Tu valoración"
                                    let ratingUserValue = rating[0]["value"];

                                    //Array con los colores de las estrellas
                                    let colors = ["rgb(177, 49, 10)", "rgb(252, 151, 0)", "yellow", "rgb(166, 255, 0)", "rgb(56, 231, 49)"]

                                    //Para todas las estrellas (5)
                                    for (let i = 0; i < 5; i++) {
                                        let star = document.getElementById(`star${i + 1}label`);

                                        //Si su valoración es por ejemplo 3 pues le asignamos los colores a las estrellas
                                        //cuyo valor es <3
                                        if (i < ratingUserValue) {
                                            star.style.color = colors[i];
                                        }

                                        //Para todas las estrellas le quitamos el atributo id para que no 
                                        //afecte el hover
                                        let starinput = document.getElementById(`star${i + 1}`);
                                        starinput.removeAttribute("id")
                                    }
                                })
                                .catch(error => messageRenderer.showErrorMessage(error));
                        }
                    })
                    .catch(error => {

                        //En el caso de que no tenga puntuaciones
                        console.log(error) //Simplemente por puro debug
                        //Se le pasa por parametro para no tener que declararlo
                        postRating(userId);
                    });
            }
        }
    }, 100); // check every 100ms
}





function postRating(userId) {
    let formRating = document.getElementById("ratings-form");
    formRating.onsubmit = function (event) {
        event.preventDefault();
        let form = event.target;
        let formData = new FormData(form);

        //Tras mucho probar, muchos dolores de cabeza, miles de threads en stackoverflow (los cuales no ayudaron)
        // Y SOBRE TODO mucho console.log, encontré la solucion => event["submitter"]["value"]
        //Al tener los 5 botones como submit, lo unico que necesito es obtener el botón que es clicado
        // y en este caso se obtiene accediendo a submiter y a el value.
        let x = event["submitter"]["value"];
        formData.append("userId", userId);
        formData.append("photoId", photoId);
        formData.append("value", x)

        ratingsAPI.create(formData)
            .then(data => window.location.href = `/docs/photodetails.html?photoId=${photoId}`)
            .catch(error => messageRenderer.showErrorMessage(error));
    }
}

//Función para publicar comentario
function handleSubmitComment(event) {
    event.preventDefault();

    //Obtenemos los datos de la foto por el id
    photosAPI.getById(photoId)
        .then(photo => {

            //Si la visibilidad es distinta de privada (también está en el backend)
            if (photo[0]["visibility"] !== "Private") {
                let form = event.target;
                let formData = new FormData(form);

                //Obtenemos el valor del campo donde se escribe el comentario 
                let commentValue = document.getElementById("escribir-comentario").value;

                /*
                    \s: matches any whitespace symbol: spaces, tabs, and line breaks
                    +: match one or more of the preceding tokens (referencing \s)
                    g: the g at the end indicates iterative searching throughout the full string
                */

                //Simplemente lo que hacemos con esto es quitar los espacios intermedios y dejar solo 1 para poder hacer split
                let commentContent = commentValue.replace(/\s+/g, ' ').trim().split(" ")

                //Obtenemos todas las palabras inapropiadas
                inappropriatewordsAPI.getAll()
                    .then(words => {

                        //Mix de diferentes fuentes para poder crear la sentencia que considero aceptable para lo que necesito
                        //https://stackoverflow.com/questions/16312528/check-if-an-array-contains-any-element-of-another-array-in-javascript
                        //https://stackoverflow.com/questions/52410662/why-is-this-returning-the-error-contains-is-not-a-function
                        //https://stackoverflow.com/questions/50371188/javascripts-includes-function-not-working-correctly-with-array-of-objects
                        //console.log(words.some(({word}) => (commentContent.some(r => r.toLowerCase().includes(word)))))

                        //Si ninguna de las palabras que está escrita en el comentario contiene alguna de las palabras de la 
                        //tabla de palabras inapropiadas significa que el comentario no tiene palabras inapropiadas
                        if (!words.some(({ word }) => (commentContent.some(r => r.toLowerCase().includes(word))))) {
                            
                            //Entonces obtenemos el userId, añadimos al form ya creado el userId y la photoId
                            let userId = sessionManager.getLoggedUser().userId;
                            formData.append("userId", userId);
                            formData.append("photoId", photoId);

                            //Creamos el comentario. En el caso de que sea existoso, simplemente redirigimos a la misma pagina
                            commentsAPI.create(formData)
                                .then(data => window.location.href = `/docs/photodetails.html?photoId=${photoId}`)
                                .catch(error => messageRenderer.showErrorMessage(error));

                        } else {

                            //En cualquier otro caso significa que sí contiene palabras inapropiadas entonces
                            //salta un mensaje de error diciendo que no puede contener palabras inapropiadas
                            messageRenderer.showErrorMessage("No puedes hacer uso de palabras inapropiadas")
                        }
                    })
                    .catch(error => messageRenderer.showErrorMessage(error));
            } else {

                //En el caso de que la visibilidad sea privada entonces mostramos un error
                //diciendo que no puede comentar en fotos privadas
                messageRenderer.showErrorMessage("No puedes comentar en fotos privadas")
            }
        })
        .catch(error => messageRenderer.showErrorMessage(error));

}



document.addEventListener("DOMContentLoaded", main)