"use strict"
import { parseHTML } from "/js/utils/parseHTML.js";
import { photoDetailsRenderer } from "/js/renderers/photoDetails.js";
import { userscommentsAPI } from "../api/usersComments.js";
import { messageRenderer } from "/js/renderers/messages.js";

const commentRenderer = {
    asCommentContent: function (comments) {
        let commentList = parseHTML('<div>');

        let counter = 0;
        //Para cada comentario
        for (let comment of comments) {
            // console.log(comment["commentId"])

            //Obtenemos el id y se lo pasamos a la api de la tabla userscomments
            userscommentsAPI.getById(comment["commentId"])
                .then(commentValue => {

                    //En el caso de que la valoración del comentario sea null, significa que su valor es cero
                    //entonces simplemente lo asignamos (valorar comentario)
                    if (commentValue[0]["c"] === null)
                        commentValue[0]["c"] = 0;
                    // console.log(commentValue)

                    //En el caso de que el contador sea 0, significa que es el primer elemento entonces
                    //no le ponemos mt-2 a la hora de crear el div para que no quede demasiado separado de arriba
                    if (counter === 0) {

                        //Creamos la card y la añadimos al div de la lista de comentarios
                        let card = parseHTML('<div class="card p-2 mx-3">');
                        commentList.appendChild(card);

                        //cargamos cargamos el renderer del comentario (Usamos la id para valorar tanto positiva
                        //como negativamente el comentario así sabemos cual es el comentario asociado)
                        let content = photoDetailsRenderer.asComments(comment, commentValue[0]);
                        card.appendChild(content);
                        counter++;
                    } else {

                        //En otro caso significa que no es el primero entonces simplemente le añadimos el mt-2
                        //y hacemos exactamente igual
                        let card = parseHTML('<div class="card p-2 mx-3 mt-2">');
                        commentList.appendChild(card);
                        let content = photoDetailsRenderer.asComments(comment, commentValue[0]);
                        card.appendChild(content);
                    }
                })
                .catch(error => messageRenderer.showErrorMessage(error));



        }

        return commentList;
    }
};

export { commentRenderer };