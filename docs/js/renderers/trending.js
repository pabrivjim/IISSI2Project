"use strict"
import { parseHTML } from "/js/utils/parseHTML.js";

const trendingRenderer = {

    /*Usuario más seguido */
    asTrendingsCardTopUser: function (user) {
        let html = `
        <div class="col-md text-center"> <!--<div class="col-md-3 text-center"> hace que la foto ocupe 3 de las 12 columnas-->
            <div class="card">
                <div class="profile align-items-center tex mt-3"><img src=".${user.avatarUrl}"
                    alt="..." height= "130" width="130" class="user-img rounded-circle my-2">
                    <h4 class="text-center align-items-center">${user.firstName} ${user.lastName}</h4>
                </div>
                <div class=" card-body ">
                    <h5 class="card-title text-center">@${user.username}</h5>
                    <!--C es como lo he llamado en el endpoint-->
                    <p class="card-text">Numero de Seguidores: ${user.C}</p>
                    <a href=/docs/userInfo.html?userId=${user.userId} class="btn btn-primary">Ver Perfil</a>
                </div>
            </div>
        </div>
        `
        let topUser = parseHTML(html);
        return topUser;
    },
    /*Perfiles con más puntuación*/
    asTrendingsCardTopUserPuntuation: function (user) {
        let html = `
        <div class="col-md text-center"> <!--<div class="col-md-3 text-center"> hace que la foto ocupe 3 de las 12 columnas-->
            <div class="card">
                <div class="profile align-items-center tex mt-3"><img src=".${user.avatarUrl}"
                    alt="..." height= "130" width="130" class="user-img rounded-circle my-2">
                    <h4 class="text-center align-items-center">${user.firstName} ${user.lastName}</h4>
                </div>
                <div class=" card-body ">
                    <h5 class="card-title text-center">@${user.username}</h5>
                    <!--C es como lo he llamado en el endpoint-->
                    <p class="card-text">Puntuación media: ${user.C}</p>
                    <a href=/docs/userInfo.html?userId=${user.userId} class="btn btn-primary">Ver Perfil</a>
                </div>
            </div>
        </div>
        `
        let topUserPuntuation = parseHTML(html);
        return topUserPuntuation;
    },
    /*Fotos más comentadas*/
    asTrendingsMostComments: function (photo) {
        let html = `<div class="col-md text-center"> <!--<div class="col-md-3 text-center"> hace que la foto ocupe 3 de las 12 columnas-->
            <div class="card height100">         
                <img class="img-fluid img-thumbnail photo-zoom" src="${photo.url}"
                alt="Random Image">
                <div class="card-body cardFlexStyle">   
                    <h4 class="card-title text-center">${photo.title}</h4>
                    <h5 class="card-title text-center">@${photo.username}</h5>
                    <p class="card-text">Número de comentarios: ${photo.C}</p>
                    <a href=photodetails.html?photoId=${photo.photoId} class="btn btn-primary">Ver foto</a>
                </div>
            </div>
        </div>`
        let mostComments = parseHTML(html);
        return mostComments;
    },
    /*Fotos mejor puntuadas*/
    asTrendingsTopPicRating: function (photo) {
        let html = `
        <div class="col-md text-center"> <!--<div class="col-md-3 text-center"> hace que la foto ocupe 3 de las 12 columnas-->
            <div class="card height100">         
                <img class="img-fluid img-thumbnail photo-zoom" src="${photo.url}"
                alt="Random Image">
                <div class="card-body cardFlexStyle">   
                    <h4 class="card-title text-center">${photo.title}</h4>
                    <h5 class="card-title text-center">@${photo.username}</h5>
                    <p class="card-text">Putuación Media: ${photo.C}</p>
                    <a href=photodetails.html?photoId=${photo.photoId} class="btn btn-primary">Ver foto</a>
                </div>
            </div>
        </div>`
        let bestPuntuationPic = parseHTML(html);
        return bestPuntuationPic;
    },
    /*Categorías mas usadas*/
    asTrendingMostUsedTopic: function (category) {
        let html = `<div class="col-md text-center"> <!--<div class="col-md-3 text-center"> hace que la foto ocupe 3 de las 12 columnas-->
        <div class="card height100">
        <img src=${category.url} class="card-img-top">
            <div class="card-body cardFlexStyle">
                <h5 class="card-title text-center"> ${category.name}</h5>
                <p class="card-text"> Número de fotos asociadas: ${category.C}</p>
                <a href=search.html?query=${category.name}&typeOfSearch=3 class="btn btn-primary">Ver categoría</a>
            </div>
        </div>
        </div>`
        let bestTopic = parseHTML(html);
        return bestTopic;
    },
};

export { trendingRenderer };