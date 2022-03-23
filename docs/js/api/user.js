"use strict";

import { BASE_URL, requestOptions } from "./common.js"

const usersAPI={
    getAll:function(){
        return new Promise(
            function (resolve, reject ){
                axios.get(`${BASE_URL}/users`,requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject (error.response.data.message));
            }
        );
    },
    getById:function(userId){
        return new Promise(
            function (resolve, reject ){
                axios.get(`${BASE_URL}/users/${userId}`,requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject (error.response.data.message));
            }
        );
    },
    getPhotosById:function(userId){
        return new Promise(
            function (resolve, reject ){
                axios.get(`${BASE_URL}/users/${userId}/photos`,requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject (error.response.data.message));
            }
        );
    },
    getMyPhotosById:function(userId){
        return new Promise(
            function (resolve, reject ){
                axios.get(`${BASE_URL}/users/${userId}/myPhotos`,requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject (error.response.data.message));
            }
        );
    },
    update: function (userId, formData) {
        return new Promise(function (resolve, reject) {
            axios
                .put(`${BASE_URL}/users/put/${userId}`, formData,
                    requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
}

export{usersAPI}