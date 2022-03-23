"use strict";
import { parseHTML } from "/js/utils/parseHTML.js";

const photoDetailsRenderer = {
    asPhoto: function (photo, user) {
        if (photo.rating === null)
            photo.rating = "Undefined"
        let html = `
            <div class="card m-2" style="height: 96%">
                <div class="card-body" style="height: fit-content;">
                    <h4 class="card-title mt-2"> ${photo.title} </h4>
                    <img src="${photo.url}"
                        class="card-img-top mt-2">
                    <h5 class="card-tittle mt-3" id="ratingGiven"> Valorar: </h5>
                    <div class="mt-2">
                        <form id="ratings-form">
                            <div id="stars-valoration-container" class="starrating risingstar d-flex justify-content-center flex-row-reverse">
                                <input type="submit" id="star5" name="value" value=5 ><label for="star5"
                                    title="5 star" id="star5label"></label>
                                <input type="submit" id="star4" name="value" value=4 ><label for="star4"
                                    title="4 star" id="star4label"></label>
                                <input type="submit" id="star3" name="value" value=3 ><label for="star3"
                                    title="3 star" id="star3label"></label>
                                <input type="submit" id="star2" name="value" value=2 ><label for="star2"
                                    title="2 star" id="star2label"></label>
                                <input type="submit" id="star1" name="value" value=1 ><label for="star1"
                                    title="1 star" id="star1label"></label>
                            </div>
                        </form>
                    </div>
                    <div class="mt-2">
                        <span>Author: <small><a href=/docs/userInfo.html?userId=${user.userId}>@${user.username}</small></a></span><br>
                        <span>Visibilidad: <small>${photo.visibility}</small></span><br>
                        <span>Valoración: <small>${photo.rating}</small></span><br>
                        <span>URL: <small>/docs/photodetails.html?photoId=${photo.photoId}</small></span>
                    </div>
                </div>
            </div>
            `

        let photoDetailsPhoto = parseHTML(html);
        return photoDetailsPhoto;
    },
    asMyPhoto: function (photo, user) {
        if (photo.rating === null)
            photo.rating = "Undefined"
        let html = `
            <div class="card m-2" style="height: 96%">
                <div class="card-body" style="height: fit-content;">
                    <h4 class="card-title mt-2"> ${photo.title} </h4>
                    <img src="${photo.url}"
                        class="card-img-top mt-2">
                    <h5 class="card-tittle mt-3" id="ratingGiven"> Valorar: </h5>
                    <div class="mt-2">
                        <form id="ratings-form">
                            <div id="stars-valoration-container" class="starrating risingstar d-flex justify-content-center flex-row-reverse">
                                <input type="submit" id="star5" name="value" value=5 ><label for="star5"
                                    title="5 star" id="star5label"></label>
                                <input type="submit" id="star4" name="value" value=4 ><label for="star4"
                                    title="4 star" id="star4label"></label>
                                <input type="submit" id="star3" name="value" value=3 ><label for="star3"
                                    title="3 star" id="star3label"></label>
                                <input type="submit" id="star2" name="value" value=2 ><label for="star2"
                                    title="2 star" id="star2label"></label>
                                <input type="submit" id="star1" name="value" value=1 ><label for="star1"
                                    title="1 star" id="star1label"></label>
                            </div>
                        </form>
                    </div>
                    <a href=/docs/uploadPhoto.html?photoId=${photo.photoId} class="btn btn-primary">Editar Foto</a>
                    <div class="mt-2">
                        <span>Author: <small><a href=/docs/userInfo.html?userId=${user.userId}>@${user.username}</small></a></span><br>
                        <span>Visibilidad: <small>${photo.visibility}</small></span><br>
                        <span>Valoración: <small>${photo.rating}</small></span><br>
                        <span>URL: <small>/docs/photodetails.html?photoId=${photo.photoId}</small></span>
                    </div>
                </div>
            </div>
            `

        let photoDetailsPhoto = parseHTML(html);
        return photoDetailsPhoto;
    },
    asDescription: function (photo) {
        let html = `<div class="col-12">
        <div class="card pb-3 mt-2" id="desc-pic">
            <div class="card-body m-3 rounded" id="desc">
                <h5 class="card-title"> Descripción: </h5>
                <span>${photo.description}</span>
            </div>
            <div class="ml-3">
                <span class="font-weight-bold">Fecha de publicación: ${photo.date}</span>
            </div>

        </div>
    </div>`
        let photoDetailsComments = parseHTML(html);
        return photoDetailsComments;
    },
    asComments: function (comment, commentValue) {
        let html = `
        <div>
        <div class="d-flex justify-content-between mt-2">
            <div id="user-comment">
                <div class="user d-flex flex-row align-items-center" id="avatar-user-comment">
                    <img src=".${comment.avatarUrl}" height= "30" width="30" class="user-img rounded-circle mr-2"> <span><a
                            href="/docs/userInfo.html?userId=${comment.userId}"><small class="font-weight-bold text-primary">${comment.username}</small></a></span>
                </div>
                <div class="user d-flex flex-row align-items-center" id="comment-text-wrapper">
                    <span id="comment-text"><small class="font-weight-bold">${comment.text}</small></span>
                </div>
            </div>
        </div>
        <div class="action d-flex justify-content-between mt-2 align-items-center">
            <div class="reply px-4"><small>${comment.date}</small></div>
            <div class="reply"><small>Valoración: ${commentValue.c}</small></div>
            <div style="display: inline-flex;">
                <form id="likeAndDislike${comment.commentId}">
                    <div class="icons align-items-center m-1">
                        <button type="submit" value=1 id="commentIdVal${comment.commentId}">
                            <i class="fa fa-angle-up text-success"></i>
                        </button>
                    </div>
                    
                    <div class="icons align-items-center m-1">
                        <button type="submit" id="commentIdVal${comment.commentId}" value=-1>
                            <i class="fa fa-angle-down text-danger"></i>
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </div>
            `
        let photoDetailsComments = parseHTML(html);
        return photoDetailsComments;
    },
    asSendComment: function () {
        let html = `
        <form id="form-upload-comment">
        <div id="post-comment">
            <div class="card p-2">
                <div class="action d-flex justify-content-between align-items-center">
                    <textarea id="escribir-comentario" cols="" placeholder="Escribe un comentario..." name="text" maxlength="150"></textarea>
                    <input id="enviar-comentario" type="button" value="Enviar">
                </div>
            </div>
        </div>  
        </form>
            `
        let photoDetailsComments = parseHTML(html);
        return photoDetailsComments;
    },
};

export { photoDetailsRenderer };
