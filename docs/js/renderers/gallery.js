"use strict"
import { parseHTML } from "/js/utils/parseHTML.js" ;
import { indexPhotoRenderer } from "/js/renderers/indexPhoto.js" ;


const galleryRenderer ={
    asGalleryPhoto : function(photos){
        let galleryContainer = parseHTML ('<div class="row gallery">');

        for(let photo of photos){
            let pic= indexPhotoRenderer.asElement(photo);
            galleryContainer.appendChild(pic);
        }
        return galleryContainer;
    },
    asGalleryUser : function(users){
        let galleryContainer = parseHTML ('<div class="row gallery">');

        for(let user of users){
            let pic= indexPhotoRenderer.asUserElement(user);
            galleryContainer.appendChild(pic);
        }
        return galleryContainer;
    }
};

export {galleryRenderer};