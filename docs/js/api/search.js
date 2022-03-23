"use strict";

import { BASE_URL, requestOptions } from "./common.js"

const searchsAPI={
    getAll:function(query){
        return new Promise(
            function (resolve, reject ){
                axios.get(`${BASE_URL}/all/${query}`,requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject (error.response.data.message));
            }
        );
    },
    getByUser:function(query){
        return new Promise(
            function (resolve, reject ){
                axios.get(`${BASE_URL}/all/users/${query}`,requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject (error.response.data.message));
            }
        );
    },
    getByPhotos:function(query){
        return new Promise(
            function (resolve, reject ){
                axios.get(`${BASE_URL}/all/photos/${query}`,requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject (error.response.data.message));
            }
        );
    },
    getByCategories:function(query){
        return new Promise(
            function (resolve, reject ){
                axios.get(`${BASE_URL}/all/categories/${query}`,requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject (error.response.data.message));
            }
        );
    }
}

export{searchsAPI}