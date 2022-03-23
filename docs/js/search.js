"use strict"
import { galleryRenderer } from "/js/renderers/gallery.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { photosAPI } from "./api/photo.js"
import { searchsAPI } from "./api/search.js"
// import { categoriesAPI } from "./api/categories.js";

//Obtenemos la query a buscar
let urlParams = new URLSearchParams(window.location.search);
let query = urlParams.get("query");

//Obtenemos el tipo de búsqueda, en mi caso he separado en 4 tipos de 0-3
//0: Buscar por todo, 1:Buscar por usuario, 2:Buscar por título de foto, 4: Buscar por Categoría
let urlParams2 = new URLSearchParams(window.location.search);
let typeOfSearch = urlParams2.get("typeOfSearch");

function main() {

    //Obtenemos el div que engloba todos el contenido
    let content = document.querySelector("div.container");

    //Obtenemos el botón de aplicar la búsqueda.
    let submit = document.getElementById("search-submit")
    
    //Si hay parámetros a buscar
    if (query !== null) {

        //Si el tipo de búsqueda es el 0 entonces mostramos todo (fotos, usuarios y categorías)
        if (typeOfSearch == 0) {
            searchsAPI.getByUser(`%${query}%`)
                .then(users => {
                    let gallery = galleryRenderer.asGalleryUser(users);
                    content.appendChild(gallery);
                })
                .catch(error => error);

            searchsAPI.getByPhotos(`%${query}%`)
                .then(photos => {
                    let gallery = galleryRenderer.asGalleryPhoto(photos);
                    content.appendChild(gallery);
                })
                .catch(error => error);
            
            //Categorías es el unico que buscamos si o sí por su nombre tal cual ya que no tendría
            //mucho sentido un "like as" en el endpoint porque saldrían categorías que no estás buscando.
            //Además si estás buscando una categoría concreta el autocompletado al buscar por categoría resuelve
            //este problema
            searchsAPI.getByCategories(query)
                .then(categories => {
                    let gallery = galleryRenderer.asGalleryPhoto(categories);
                    content.appendChild(gallery);
                })
                .catch(error => error);

        //En el caso de que la búsqueda sea por usuario
        } else if (typeOfSearch == 1) {

            //Mostramos todos los usuarios que tengan el nombre, el apellido o el username como el deseado
            searchsAPI.getByUser(query)
                .then(users => {
                    let gallery = galleryRenderer.asGalleryUser(users);
                    content.appendChild(gallery);
                })
                .catch(error => messageRenderer.showErrorMessage(error));

        //En el caso de buscar por foto
        } else if (typeOfSearch == 2) {
            
            //Mostramos todas las fotos cuyo título sea como el de la query
            searchsAPI.getByPhotos(query)
                .then(photos => {
                    let gallery = galleryRenderer.asGalleryPhoto(photos);
                    content.appendChild(gallery);
                })
                .catch(error => messageRenderer.showErrorMessage(error));

        //Por ultimo en caso de buscar por categorías
        } else if (typeOfSearch == 3) {

            //Tenemos la ayuda del autocompletado ubicado en ./utils/search.js y en este caso como he comentado antes
            //la categoría tiene que ser igual a la de la db, no un "as like"
            searchsAPI.getByCategories(query)
                .then(categories => {
                    let gallery = galleryRenderer.asGalleryPhoto(categories);
                    content.appendChild(gallery);
                })
                .catch(error => messageRenderer.showErrorMessage(error));
        }

        //Cuando cliquemos en el botón de buscar
        submit.onclick = function () {

            //Obtenemos el tipo de busqueda (Esto lo hacemos mediante los valores de los option en sql) (el desplegable)
            const form = document.getElementById('search-type-selected');
            
            //Obtenemos el campo donde se encuentra la búsqueda
            const searchInput = document.getElementById('search-input');

            //Obtenemos los valores del campo búsqueda
            let queryType = form.value;

            //Si el tipo de búsqueda = 0 -> Todo
            //Si el tipo de búsqueda = 1 -> Usuario
            //Si el tipo de búsqueda = 2 -> Fotos
            //Si el tipo de búsqueda = 3 -> Categorías

            //Esto se podría hacer con if(queryType == 0 || queryType == 3) y else if(queryType == 1 || queryType == 2)
            // pero quería que se vieran bien los casos
            if (queryType == 0) {
                window.location.href = `search.html?query=${searchInput.value}&typeOfSearch=${queryType}`;
            } else if (queryType == 1) {
                window.location.href = `search.html?query=%${searchInput.value}%&typeOfSearch=${queryType}`;
            } else if (queryType == 2) {
                window.location.href = `search.html?query=%${searchInput.value}%&typeOfSearch=${queryType}`;
            } else if (queryType == 3) {
                window.location.href = `search.html?query=${searchInput.value}&typeOfSearch=${queryType}`;
            }
        }
    
    //En el caso de que la query sea null
    } else {

        //Obtenemos todas las fotos
        photosAPI.getAll()
            .then(photos => {
                let gallery = galleryRenderer.asGalleryPhoto(photos);
                content.appendChild(gallery);
            })
            .catch(error => messageRenderer.showErrorMessage(error));
        
        //Y en en el caso de clicar hacemos igual que antes
        submit.onclick = function () {
            const form = document.getElementById('search-type-selected');
            const searchInput = document.getElementById('search-input');

            console.log(form.value)
            let queryType = form.value;
            if (queryType == 0) {
                window.location.href = `search.html?query=${searchInput.value}&typeOfSearch=${queryType}`;
            } else if (queryType == 1) {
                window.location.href = `search.html?query=%${searchInput.value}%&typeOfSearch=${queryType}`;
            } else if (queryType == 2) {
                window.location.href = `search.html?query=%${searchInput.value}%&typeOfSearch=${queryType}`;
            } else if (queryType == 3) {
                window.location.href = `search.html?query=${searchInput.value}&typeOfSearch=${queryType}`;
            }
        }
    }
}


// function handleSearchTypeSubmit() {
//     const form = document.getElementById('search-type-selected');
//     const searchInput = document.getElementById('search-input');

//     console.log(form.value)
//     let queryType = form.value;
//     if (queryType == 0) {
//         window.location.href = `search.html?query=${searchInput.value}&typeOfSearch=${queryType}`;
//     } else if (queryType == 1) {
//         window.location.href = `search.html?query=%${searchInput.value}%&typeOfSearch=${queryType}`;
//     } else if (queryType == 2) {
//         window.location.href = `search.html?query=%${searchInput.value}%&typeOfSearch=${queryType}`;
//     } else if (queryType == 3) {
//         window.location.href = `search.html?query=${searchInput.value}&typeOfSearch=${queryType}`;
//     }
// }

document.addEventListener("DOMContentLoaded", main)