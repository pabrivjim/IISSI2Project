"use strict";
import { parseHTML } from "/js/utils/parseHTML.js";

const userInfoRenderer = {
    asInfo: function (user, photoLength) {
        let html = `
        <div>
        <div class="px-4 pt-0 pb-4 cover">
        <div class="text-center">
            <div class="profile align-items-center tex mt-3"><img src="${user.avatarUrl}"
                    alt="..." height= "130" width="130" class="user-img rounded-circle my-2">
                <h4 class="text-center align-items-center">@${user.username}</h4>
            </div>
            <div class="media-body mb-3">
                <h4 class="mt-0 mb-0 align-items-center">${user.firstName} ${user.lastName}</h4>
                <p class="small"> <i class="fas fa-envelope mr-2"></i>${user.email}</p>
            </div>
            <ul class="list-inline mb-0 align-items-center">
                <li class="list-inline-item">
                    <h5 class="font-weight-bold mb-0 text-center align-items-center">${photoLength}</h5><small
                        class="text-muted"> <i class="fas fa-image mr-1"></i>Photos</small>
                </li>
                <li class="list-inline-item">
                    <h5 class="font-weight-bold mb-0 text-center align-items-center" id="userFollowers">${user.Followers}</h5><small
                        class="text-muted"> <i class="fas fa-user mr-1"></i>Followers</small>
                </li>
                <li class="list-inline-item">
                    <h5 class="font-weight-bold mb-0 text-center align-items-center">${user.Following}</h5><small
                        class="text-muted"> <i class="fas fa-user mr-1"></i>Following</small>
                </li>
            </ul>
            <div class="btn btn-primary btn-sm col-md-3 align-items-center mt-3 mb-2" role="button"
                id="follow-button">
                Seguir
            </div>
            <div id="possible-modal">

            </div>
        </div>

    </div>
    <div class="px-4 py-3">
        <h5 class="mb-4">About</h5>
        <div class="p-4 rounded shadow-sm bg-light">
            <p class="font-italic mb-0">Web Developer</p>
            <p class="font-italic mb-0">Lives in New York</p>
            <p class="font-italic mb-0">Photographer</p>
        </div>
    </div>
    </div>
            `

        let userInfoData = parseHTML(html);
        return userInfoData;
    },
    asUserInfoModal: function () {
        let html = `
        <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
        aria-hidden="true" id="editProfileModal">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Edit your Profile</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="col-md pr-3 pl-3">
                        <form id="form_reg">
                            <div class="row">
                                <div class="col-md">
                                    <div class="form-group">
                                        <label for="firstname-input" class="floatLeft">First name:</label>
                                        <input type="text" class="form-control" id="firstname-input" name="firstName"
                                            placeholder="First name">
                                    </div>
                                </div>
                                <div class="col-md">
                                    <label for="lastname-input" class="floatLeft">Last name:</label>
                                    <input type="text" class="form-control" id="lastname-input" name="lastName"
                                        placeholder="Last name">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md">
                                    <div class="form-group">
                                        <label for="email-input" class="floatLeft">Email:</label>
                                        <input type="mail" class="form-control" id="email-input" name="email"
                                            placeholder="Email">
                                    </div>
                                </div>
                                <div class="col-md">
                                    <label for="telephone-input" class="floatLeft">Telephone:</label>
                                    <input type="tel" class="form-control" id="telephone-input" name="telephone"
                                        placeholder="Telephone">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md">
                                    <div class="form-group">
                                        <label for="username-input" class="floatLeft">Username:</label>
                                        <input type="text" class="form-control" id="username-input" name="username"
                                            placeholder="Username">
                                    </div>
                                </div>
                                <div class="col-md">
                                    <div class="form-group">
                                        <label for="avatar-url" class="floatLeft">Foto de Perfil</label>
                                        <input type="text" class="form-control" id="avatar-url" name="avatarUrl"
                                            placeholder="Foto de Perfil" required>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-md text-center">
                                    <button type="submit" class="btn btn-success" id="submitEditProfile">Aplicar cambios</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>`

        let userInfoModal = parseHTML(html);
        return userInfoModal;
    },
    asDescription: function () {
        let html = `<div class="d-flex align-items-center justify-content-between mb-3">
        <h5 class="mb-0">Recent photos</h5></div>`
        let userInfoDesc = parseHTML(html);
        return userInfoDesc;
    },
    asPhotos: function (photo) {
        let html = `
        <div class="col-md-3 thumb">
            <a href=/docs/photodetails.html?photoId=${photo.photoId}>
                <img class="img-fluid rounded shadow-sm" src="${photo.url}"
                alt="Random Image" >
            </a>
        </div>
                        `
        let userInfoPhotos = parseHTML(html);
        return userInfoPhotos;
    },
};

export { userInfoRenderer };
