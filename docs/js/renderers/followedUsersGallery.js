"use strict"
import { parseHTML } from "/js/utils/parseHTML.js";
import { followedUserRenderer } from "./followedUsers.js";


const followedUserGalleryRenderer = {
    asGalleryPhoto: function (data) {
        let followedUserGalleryContainer = parseHTML('<div class="row gallery">');
        for (let e of data) {
            let pic = followedUserRenderer.asElement(e);
            followedUserGalleryContainer.appendChild(pic);
        }
        return followedUserGalleryContainer;
    }
};

export { followedUserGalleryRenderer };