"use strict";

import { BASE_URL, requestOptions } from "./common.js"

const photosCategoriesAPI={
    delete: function (photoId, categoryId) {
        return new Promise(function (resolve, reject) {
            axios
                .delete(`${BASE_URL}/photosCategories/${photoId}/${categoryId}`, requestOptions
                )
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
    getById:function(photoId){
        return new Promise(
            function (resolve, reject ){
                axios.get(`${BASE_URL}/photosCategories/${photoId}`,requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject (error.response.data.message));
            }
        );
    },
    create: function (formData) {
        return new Promise(function (resolve, reject) {
            axios
                .post(`${BASE_URL}/photosCategories`, formData, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
}

export{photosCategoriesAPI}