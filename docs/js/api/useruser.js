"use strict";

import { BASE_URL, requestOptions } from "./common.js"

const usersusersAPI={
    getAll:function(){
        return new Promise(
            function (resolve, reject ){
                axios.get(`${BASE_URL}/usersusers`,requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject (error.response.data.message));
            }
        );
    },
    getById:function(userId){
        return new Promise(
            function (resolve, reject ){
                axios.get(`${BASE_URL}/usersusers/${userId}/follows`,requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject (error.response.data.message));
            }
        );
    },
    getByIdUser:function(userId){
        return new Promise(
            function (resolve, reject ){
                axios.get(`${BASE_URL}/usersusers/${userId}/user`,requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject (error.response.data.message));
            }
        );
    },
    getByIdUserData:function(userId){
        return new Promise(
            function (resolve, reject ){
                axios.get(`${BASE_URL}/usersusers/${userId}/userFollow`,requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject (error.response.data.message));
            }
        );
    },
    create: function (formData) {
        return new Promise(function (resolve, reject) {
            axios
                .post(`${BASE_URL}/usersusers`, formData, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
    delete: function (userSource, userTarget) {
        return new Promise(function (resolve, reject) {
            axios
                .delete(`${BASE_URL}/usersusers/${userSource}/${userTarget}`, requestOptions
                )
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    }
}

export{usersusersAPI}