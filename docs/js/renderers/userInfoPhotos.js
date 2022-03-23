"use strict"
import { parseHTML } from "/js/utils/parseHTML.js";
import { userInfoRenderer } from "/js/renderers/userInfo.js";

const userInfoPhotosRenderer = {
    asPhotoContent: function (photos) {
        let photosContainer = parseHTML(' <div class="row">');

        for (let photo of photos) {
            let content = userInfoRenderer.asPhotos(photo);
            photosContainer.appendChild(content);
        }
        return photosContainer;
    }
};




export { userInfoPhotosRenderer };