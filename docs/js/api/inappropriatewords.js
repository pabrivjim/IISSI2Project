"use strict";

import { BASE_URL, requestOptions } from "./common.js"

const inappropriatewordsAPI={
    getAll:function(){
        return new Promise(
            function (resolve, reject ){
                axios.get(`${BASE_URL}/inappropriatewords`,requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject (error.response.data.message));
            }
        );
    },
}


export{inappropriatewordsAPI}