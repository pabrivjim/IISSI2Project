"use strict";

import { BASE_URL, requestOptions } from "./common.js"

const trendingsAPI={
    getFollowedUsers:function(){
        return new Promise(
            function (resolve, reject ){
                axios.get(`${BASE_URL}/trendings/followedUsers`,requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject (error.response.data.message));
            }
        );
    },
    getTopPicRatings:function(){
        return new Promise(
            function (resolve, reject ){
                axios.get(`${BASE_URL}/trendings/bestRatings`,requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject (error.response.data.message));
            }
        );
    },
    getmostComments:function(){
        return new Promise(
            function (resolve, reject ){
                axios.get(`${BASE_URL}/trendings/mostComments`,requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject (error.response.data.message));
            }
        );
    },
    getAverageUser:function(){
        return new Promise(
            function (resolve, reject ){
                axios.get(`${BASE_URL}/trendings/averageRatingUser`,requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject (error.response.data.message));
            }
        );
    },
    getMostUsedCategory:function(){
        return new Promise(
            function (resolve, reject ){
                axios.get(`${BASE_URL}/trendings/mostUsedCategory`,requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject (error.response.data.message));
            }
        );
    },
    // getById:function(photoId){
    //     return new Promise(
    //         function (resolve, reject ){
    //             axios.get(`${BASE_URL}/photos/${photoId}/comments`,requestOptions)
    //             .then(response => resolve(response.data))
    //             .catch(error => reject (error.response.data.message));
    //         }
    //     );
    // },
    // create: function (formData) {
    //     return new Promise(function (resolve, reject) {
    //         axios
    //             .post(`${BASE_URL}/comments`, formData, requestOptions)
    //             .then(response => resolve(response.data))
    //             .catch(error => reject(error.response.data.message));
    //     });
    // },
    // delete: function (photoId) {
    //     return new Promise(function (resolve, reject) {
    //         axios
    //             .delete(`${BASE_URL}/comments/${commentId}`, requestOptions
    //             )
    //             .then(response => resolve(response.data))
    //             .catch(error => reject(error.response.data.message));
    //     });

    // },
}

export{trendingsAPI}