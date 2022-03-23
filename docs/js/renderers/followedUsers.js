"use strict";
import { parseHTML } from "/js/utils/parseHTML.js";

const followedUserRenderer = {
    asElement: function (data) {
        let html = `
        <div class="col-md-3 text-center thumb">
            <div class="card height100">
                <div class="card-body cardFlexStyle">
                    <a href=photodetails.html?photoId=${data.photoId}>
                        <img class="img-fluid img-thumbnail photo-zoom" src="${data.url}"
                            alt="Random Image">
                    </a>
                    <div>
                    <div class="profile align-items-center mt-3 mb-3">
                        <a href=userInfo.html?userId=${data.userId}>
                            <img src=${data.avatarUrl} alt="..." height= "50" width="50" class="user-img rounded-circle my-2">
                        </a>
                    </div>
                        <h5 class="text-center align-items-center">${data.username}</h5>
                    </div>
                </div>
            </div>
        </div>`

        let followedUserPhoto = parseHTML(html);
        return followedUserPhoto;
    }
};

export { followedUserRenderer };
