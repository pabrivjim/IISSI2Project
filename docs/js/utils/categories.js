"use strict"
import { messageRenderer } from "/js/renderers/messages.js";
import { categoriesAPI } from "../api/categories.js";


document.addEventListener('DOMContentLoaded', function () {
    
    //Obtenemos el campo dónde se escriben las categorías y queremos que se autocompleten
    const linkcategory = document.getElementById('linkcategory');


    //Se añade las categorías al array y se hace el autocomplete a el array de categorías
    linkcategory.onclick = function () {
        let categoriesArray = [];
        categoriesAPI.getAll()
            .then(categories => {
                categories.map(x => categoriesArray.push(x.name))
            })
            .catch(error => messageRenderer.showErrorMessage(error));

        //Simplemente hacemos un autocomplete. La dificultad aquí viene dada por el modal ya que boostrap daba 
        //problemas y mostraba el autocompletado detrás del modal entonces hace falta el appendTo
        
        //https://www.youtube.com/watch?v=83MrpW67iRU
        //https://stackoverflow.com/questions/22343508/auto-complete-appearing-behind-the-modal-popup/22343584
        $(function () {
            console.log(categoriesArray)
            $("#linkcategory").autocomplete({
                appendTo: "#modal-body",
                source: categoriesArray
            });
        });
    }


});