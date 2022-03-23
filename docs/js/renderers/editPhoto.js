"use strict";
import { parseHTML } from "/js/utils/parseHTML.js";

const editUserRenderer = {
    asElement: function (photo) {
        let html = `
        <div class="col-md-3 text-center thumb">
                <div class="card">
                    <div class="card-body">
                        <a href="photodetails.html">
                            <img class="img-fluid img-thumbnail photo-zoom" src="${photo.url}"
                                alt="Random Image">
                        </a>
                        <div class="profile align-items-center mt-3 mb-3">
                            <a href="userInfo.html">
                                <img src="./images/avatar_placeholder.png" alt="..." width="70"
                                    class="rounded img-thumbnail">
                            </a>
                        </div>
                        <h5 class="text-center align-items-center">${photo.userId}</h5>
                    </div>
                </div>

            </div>`

        let followedUserPhoto = parseHTML(html);
        return followedUserPhoto;
    }
};

export { editUserRenderer };
