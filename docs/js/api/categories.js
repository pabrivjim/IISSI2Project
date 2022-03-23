"use strict";

import { BASE_URL, requestOptions } from "./common.js"

const categoriesAPI={
    getAll:function(){
        return new Promise(
            function (resolve, reject ){
                axios.get(`${BASE_URL}/categories`,requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject (error.response.data.message));
            }
        );
    },
    get_By_Name:function(name){
        return new Promise(
            function (resolve, reject ){
                axios.get(`${BASE_URL}/categories/${name}`,requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject (error.response.data.message));
            }
        );
    },
    create: function (formData) {
        return new Promise(function (resolve, reject) {
            axios
                .post(`${BASE_URL}/categories`, formData, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
}

export{categoriesAPI}