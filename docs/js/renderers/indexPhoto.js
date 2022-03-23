"use strict";
import { parseHTML } from "/js/utils/parseHTML.js";

const indexPhotoRenderer = {
    asElement: function (photo) {
        let html = `
        <div class="col-md-3 thumb">
        <a href=/docs/photodetails.html?photoId=${photo.photoId}>
        <img class="img-fluid img-thumbnail" src="${photo.url}"
                alt="Random Image">
    </a>
    </div>`

        let indexPhoto = parseHTML(html);
        return indexPhoto;
    },
    asUserElement: function (user) {
        let html = `
        <div class="col-md-3 text-center mb-3"> <!--<div class="col-md-3 text-center"> hace que la foto ocupe 3 de las 12 columnas-->
            <div class="card">
                <div class="profile align-items-center tex mt-3"><img src=${user.avatarUrl}
                    alt="..." height= "110" width="110" class="user-img rounded-circle my-2">
                    <h4 class="text-center align-items-center">${user.firstName} ${user.lastName}</h4>
                </div>
                <div class=" card-body ">
                    <h5 class="card-title text-center">@${user.username}</h5>
                    <a href=/docs/userInfo.html?userId=${user.userId} class="btn btn-primary">Ver Perfil</a>
                </div>
            </div>
        </div>`

        let indexPhoto = parseHTML(html);
        return indexPhoto;
    }
};

export { indexPhotoRenderer };
