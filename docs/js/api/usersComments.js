"use strict";

import { BASE_URL, requestOptions } from "./common.js"

const userscommentsAPI={
    getById:function(commentId){
        return new Promise(
            function (resolve, reject ){
                axios.get(`${BASE_URL}/userscomments/${commentId}/`,requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject (error.response.data.message));
            }
        );
    },
    create: function (formData) {
        return new Promise(function (resolve, reject) {
            axios
                .post(`${BASE_URL}/userscomments`, formData, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    }
}

export{userscommentsAPI}