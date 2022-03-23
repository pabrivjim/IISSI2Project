"use strict"
import { galleryRenderer } from "/js/renderers/gallery.js" ;
import { messageRenderer } from "/js/renderers/messages.js" ;
import { photosAPI } from "./api/photo.js"

function main(){

    //obtenemos el div principal y vamos a añadiciendo las fotos en orde de reciente
    let content=document.querySelector("div.container");
    photosAPI.getAllRecent()
        .then(photos => {
            let gallery =galleryRenderer.asGalleryPhoto(photos);
            content.appendChild(gallery);
        })
        .catch(error => messageRenderer.showErrorMessage(error));
}

document.addEventListener("DOMContentLoaded", main)