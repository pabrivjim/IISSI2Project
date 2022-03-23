"use strict";
import { messageRenderer } from "/js/renderers/messages.js";
import { trendingsAPI } from "./api/trendings.js";
import { trendingsContent } from "/js/renderers/photo-trending.js";

function main() {
    let content = document.querySelector("div#container-trending");

    //Usuarios mas seguidos
    trendingsAPI.getFollowedUsers()
        .then(users => {
            let followedUsers = trendingsContent.asTrendingTopUser(users);
            content.appendChild(followedUsers);
        })
        .catch(error => messageRenderer.showErrorMessage(error));

    //Fotos con más valoración
    trendingsAPI.getTopPicRatings()
        .then(photos => {
            let bestRatings = trendingsContent.asTopPicRating(photos);
            content.appendChild(bestRatings);
        })
        .catch(error => messageRenderer.showErrorMessage(error));

    //Fotos mas comentadas
    trendingsAPI.getmostComments()
        .then(photos => {
            let mostComments = trendingsContent.asTrendingMostComment(photos);
            content.appendChild(mostComments);
        })
        .catch(error => messageRenderer.showErrorMessage(error));

    //Puntuación media del usuario
    trendingsAPI.getAverageUser()
        .then(categories => {
            let bestAverageUsers = trendingsContent.asTrendingTopUserPuntuation(categories);
            content.appendChild(bestAverageUsers);
        })
        .catch(error => messageRenderer.showErrorMessage(error));

    //Categorías mas usadas
    trendingsAPI.getMostUsedCategory()
        .then(users => {
            let bestAverageUsers = trendingsContent.asTredingTopic(users);
            content.appendChild(bestAverageUsers);
        })
        .catch(error => messageRenderer.showErrorMessage(error));
}

document.addEventListener("DOMContentLoaded", main);