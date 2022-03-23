"use strict"
import { messageRenderer } from "/js/renderers/messages.js";
import { categoriesAPI } from "../api/categories.js";


document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('search-type-selected');
    const searchType = document.getElementById('search-type-buttom');
    const dropdown = document.getElementById('dropdown-search-type');
    const dropdowDiv = document.getElementById('dropdown-hide-show');

    //Para que se oculte automáticamente al clicar y no se quede el bloque desplegado y viceversa
    //Si no se quedaría en uno de los estados siempre
    dropdown.onclick = function() {
        if (dropdowDiv.style.display == "block") {
            dropdowDiv.style.display = "none";
        } else {
            dropdowDiv.style.display = "block";
        }
    }

    //Una vez clicamos en "aplicar" el dropdown se encoje
    searchType.onclick = function () {
        dropdowDiv.style.display = "none";
        
        //usamos form.options[form.selectedIndex].text para que nos de el valor y no solo el valor (from.value) ya que sería 0-3        // console.log(form.options[form.selectedIndex].text);
        dropdown.textContent = form.options[form.selectedIndex].text
        // console.log(form.options[form.selectedIndex].value)

        //En el caso de que el valor sea 3 significa que estamos buscando por categoría entonces es cuando realizamos
        //el autocomplementado
        if (form.options[form.selectedIndex].value == 3) {
            
            //Se añade las categorías al array y se hace el autocomplete a el array de categorías
            let categoriesArray = [];
            
            //https://www.youtube.com/watch?v=83MrpW67iRU
            categoriesAPI.getAll()
                .then(categories => {
                    categories.map(x => categoriesArray.push(x.name))
                })
                .catch(error => messageRenderer.showErrorMessage(error));
            $(function () {
                // console.log(categoriesArray)
                $("#search-input").autocomplete({ source: categoriesArray });
            });
        }
    }

});