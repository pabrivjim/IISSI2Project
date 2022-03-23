"use strict";
import { categoriesAPI } from "./api/categories.js";
import { inappropriatewordsAPI } from "./api/inappropriatewords.js";
import { photosAPI } from "./api/photo.js";
import { photosCategoriesAPI } from "./api/photosCategories.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { sessionManager } from "/js/utils/session.js";

//Obtiene si la foto esta siendo editada o es para subirla
let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");
let currentPhoto = null;

//Variable que usaremos para saber si tiene palabras inapropiadas o no
// let inApropiateWordDetected = false;

//Variable para ver las categorías que vamos añadiendo
let categoriesAdded = []

//Variable en caso de ser una foto a editar las variables que ya tenía por defecto
let categoriesAlreadyAdded = []

function main() {

    //Si hay photoId significa que se está editando una foto
    if (photoId !== null) {

        //Y en el caso de que el usuario no esté logeado entonces no mandamos de nuevo a la foto
        //para evitar que edite nada
        if (sessionManager.getLoggedUser() === null) {
            window.location.href = `/docs/photodetails.html?photoId=${photoId}`
        }

        //Si el usuario está logeado obtenemos su id
        let userId = sessionManager.getLoggedUser().userId;

        //Y si la foto que está editando es suya le cargamos los datos, si no, le mostramos un error
        //de que no puede editar fotos que no le pertenecen
        photosAPI.getById(photoId)
            .then(photos => {
                console.log()
                if (photos[0].userId === userId) {
                    loadCurrentPhoto();
                } else {
                    messageRenderer.showErrorMessage("No puedes editar fotos que no son tuyas")
                }
            })
            .catch(error => messageRenderer.showErrorMessage(error));
    }

    //Si el usuario no está logeado, entonces lo mandamos al index (podríamos mandarlo al login indistintamente)
    if (sessionManager.getLoggedUser() === null) {
        window.location.href = "/docs/index.html"
    }

    //Obtenemos el elemento que hace que la foto se publique y le asignamos la función de subir foto
    //que se activará cuando se envíe el formulario
    let uploadPhoto = document.getElementById("form-photo-upload");
    uploadPhoto.onsubmit = handleSubmitPhoto;

    //Obtenemos el elemento que crea una nueva categoría y le asignamos la función de Crear Categorías
    //que se activará al clicar en el elemento
    let buttoncreateCategory = document.getElementById("createCategory");
    buttoncreateCategory.onclick = handleCreateCategory;

    //Obtenemos el elemento que asgina una categoría a una foto y le asignamos la función de Asignar Categorías
    //que se activará al clicar en el elemento
    let buttonLinkCategory = document.getElementById("submitLinkCategory");
    buttonLinkCategory.onclick = handleLinkCategory;
}



//Función de de crear categorías
function handleCreateCategory() {

    //Obtenemos el campo donde se escribe la categoría
    let pageCategory = document.getElementById("category");
    let formData = new FormData();
    //let categoryName = pageCategory.value.replace(/\s+/g, ' ').trim();

    //Obtiene el valor del campo categoría (categoría a crear)
    let categoryName = pageCategory.value

    //Lo añade al form a enviar y lo pasa a lowerCase
    formData.append("name", categoryName.toLowerCase());

    //Finalmente lo creamos
    categoriesAPI.create(formData)
        .then(data => messageRenderer.showSuccessMessage("Creado"))
        .catch(error => messageRenderer.showErrorMessage(error));
}

//Función para asignar la categoría
function handleLinkCategory() {

    //Obtiene el elemento con id LinkCategory que es dondé pondremos la categoría a asociar. Además
    //este campo se complemente automaticamente gracias a al codigo de ./utils/categories.js
    let pageLinkedCategory = document.getElementById("linkcategory");
    if (pageLinkedCategory.value.length > 0) {

        //Obtenemos La categoría por nombre ya que es un campo único
        categoriesAPI.get_By_Name(pageLinkedCategory.value)
            .then(categories => {

                //Obtenemos el Div donde va a estar la lista de categorías que tiene la foto asociada
                let categoryList = document.getElementById("categoryList");

                //Creamos un nuevo div que va a tener el nombre de la categoría y un pequeño botón
                //Usando el fontawesome para ponerle cubo de basura para borrar la categoría
                let divCategory = document.createElement('div');
                divCategory.style = "flex"

                //Botón que va a ser el nombre de la categoría y va a tener como id categoryX donde X es la id
                //De la categoría ya que no se pueden repetir ids y así podemos identificarlo facilmente
                //Además le ponemos las clases necesarias
                let categoryButton = document.createElement('button');
                categoryButton.id = `category${categories[0].categoryId}`;
                categoryButton.className = ("btn-outline-dark btn btn-sm col-md-3 align-items-center mt-3 mb-2 mr-2")
                categoryButton.textContent = categories[0].name

                //Botón borrado que va a tener como id trashButtonX donde al igual que antes X es el id de la categoría
                let trashButton = document.createElement('button');
                trashButton.id = `trashButton${categories[0].categoryId}`
                trashButton.className = ("btn btn-danger btn-sm col-md-1 align-items-center mt-3 mb-2")

                //Además dentro de él creamos el "i" que va a ser el que de la forma de cubo de basura.
                //Podriamos llamor "Logo" por así decirlo
                let trashLogo = document.createElement('i');
                trashLogo.className = ("fas fa-trash align-items-center");


                //Una vez definidos, vemos si la lista no contiene la lista de categorías no tiene el nuevo
                //Elemento para que así no se repitan elementos. Si esto ocurre entonces
                //añadimos al div el botón de la categoría el botón de borrar y a el botón de borrar
                //El logo. luego todo esto lo añadimos a la lista. Por ultimo agregamos el id de la categoría
                //a la lista. Inciso=> Es mejor usar el id que el nombre por el modo en el que definimos las id
                //de los elementos
                if (!categoriesAdded.includes(categories[0].categoryId)) {
                    divCategory.appendChild(categoryButton)
                    divCategory.appendChild(trashButton)
                    trashButton.appendChild(trashLogo)
                    categoryList.appendChild(divCategory)
                    categoriesAdded.push(categories[0].categoryId)
                }

                //Cuando el botón de basura sea puslado, entonces tenemos que obtener la id del botón
                //que será también la id de la categoryId y que será la id del botón del nombre
                //Y una vez obtenido (simplemente quitamos la primera parte y nos quedamos con el número,
                //es mucho mas fácil que hacer substr etc.) borramos la categoría del div y el propio botón
                //de borrar. Finalmente quitamos el elemento de la lista de categorías para que se pueda añadir
                //de nuevo si así se quisiera
                trashButton.onclick = function () {
                    let removesId = trashButton.id.replace("trashButton", "")
                    document.getElementById(`trashButton${removesId}`).remove();
                    document.getElementById(`category${removesId}`).remove();
                    //https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array                    
                    categoriesAdded = categoriesAdded.filter(function(item) {
                        return item != removesId
                    })
                }
            })
            .catch(error => {
                if (error = "Not found") {
                    messageRenderer.showErrorMessage("Categoría no existente")
                } else {
                    messageRenderer.showErrorMessage(error)
                }
            });
    }
}

//Función que carga los datos de la foto en caso de editar
function loadCurrentPhoto() {

    //Obtenemos los distintos campos mediante ID
    let pageTitle = document.getElementById("Upload/Edit-Tittle");
    let urlInput = document.getElementById("url");
    let titleInput = document.getElementById("title");
    let descriptionInput = document.getElementById("agregar-descripcion");
    let visibilityInput = document.getElementById("input-visibility");
    let submitChangesButton = document.getElementById("Publicar/Editar-foto");
    let divButton = document.getElementById("submit-buttons");
    let deleteButton = document.createElement("button");

    //Agregamos el botón de borrar a la pagina
    deleteButton.className = "btn btn-danger mt-3 mb-3";
    deleteButton.textContent = "Borrar Foto";

    //Importante darle el tipo botón si no puede tomarlo com submit y no queremos eso
    deleteButton.type = "button"
    divButton.appendChild(deleteButton)

    //En caso de clicarlo, llamaremos a la función handleDelete
    deleteButton.onclick = handleDelete;

    //Como estamos editando cambiamos el título a "Editar foto"
    pageTitle.textContent = "Editar Foto";

    //También cambiamos el botón a "Editar Foto"
    submitChangesButton.textContent = "Editar Foto";

    //Así como finalmente cambiamos el titulo del html a "Editar foto"
    document.title = "Editar Foto";

    //Obtenemos todos los datos de la photoId y rellenamos los campos con los valores por defecto de la DB
    photosAPI.getById(photoId)
        .then(photos => {
            currentPhoto = photos[0];
            urlInput.value = currentPhoto.url;
            titleInput.value = currentPhoto.title;
            descriptionInput.value = currentPhoto.description;
            visibilityInput.value = currentPhoto.visibility;

            //Además para obtener las categorías tenemos que hacer otra llamada a la api de photoCategories asociada
            //a la foto en cuestión
            photosCategoriesAPI.getById(photoId)
                .then(categories => {

                    //Recorremos el object de una de las muchas formas que hay
                    Object.entries(categories).forEach(([key, value]) => {

                        //Lo primero que hacemos el agregar a la lista de categoriesAlreadyAdded (Que no es la 
                        //misma usada anteriormente) los valores por defecto. Esto nos permitirá ver cuales valores
                        //han sido quitados de la foto y cuales han sido añadidos al final
                        categoriesAlreadyAdded.push(value.categoryId)

                        //Hacemos exactamente lo mismo que antes. No he hecho una función por falta de tiempo y ya
                        //que me estaba dando algunos errores
                        let categoryList = document.getElementById("categoryList");

                        let divCategory = document.createElement('div');
                        divCategory.style = "flex"

                        let categoryButton = document.createElement('button');
                        categoryButton.id = `category${value.categoryId}`;
                        categoryButton.className = ("btn-outline-dark btn btn-sm col-md-3 align-items-center mt-3 mb-2 mr-2")
                        categoryButton.textContent = value.name

                        let trashButton = document.createElement('button');
                        trashButton.id = `trashButton${value.categoryId}`
                        trashButton.className = ("btn btn-danger btn-sm col-md-1 align-items-center mt-3 mb-2")

                        let trashLogo = document.createElement('i');
                        trashLogo.className = ("fas fa-trash align-items-center");
                        if (!categoriesAdded.includes(value.categoryId)) {
                            divCategory.appendChild(categoryButton)
                            divCategory.appendChild(trashButton)
                            trashButton.appendChild(trashLogo)
                            categoryList.appendChild(divCategory)
                            categoriesAdded.push(value.categoryId)
                        }
                        trashButton.onclick = function () {
                            let removesId = trashButton.id.replace("trashButton", "")
                            document.getElementById(`trashButton${removesId}`).remove();
                            document.getElementById(`category${removesId}`).remove();
                            // let index = categoriesAdded.indexOf(removesId);
                            // console.log(index)
                            // console.log(removesId)
                            //https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array
                            categoriesAdded = categoriesAdded.filter(function(item) {
                                console.log(item)
                                return item != removesId
                            })
                            // console.log(categoriesAdded)
                        }
                    });
                })
                .catch(error => {/*No mostramos error ya que es por no tener categorias asociadas*/ });
        })
        .catch(error => messageRenderer.showErrorMessage(error));
}


//Función para borrar la foto
function handleDelete() {

    //Pedimos una confimación y en caso afirmativo borramos la foto
    let answer = confirm("¿Estás seguro de borrar la foto?");
    if (answer) {
        photosAPI.delete(photoId)
            .then(data => window.location.href = "index.html")
            .catch(error => messageRenderer.showErrorMessage(error));
    }
}


//https://www.geeksforgeeks.org/find-elements-present-first-array-not-second/ Adaptado, basicamente
//devuelve los valores de a que no están en b
function findMissing(a, b, n, m) {
    let res = []
    for (let i = 0; i < n; i++) {
        let j;
        for (j = 0; j < m; j++)
            if (a[i] == b[j])
                break;
        if (j == m)
            res.push(a[i])
    }
    return res;
}


//Función para sburir la foto
function handleSubmitPhoto(event) {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);

    //Obtenemos el título y la descripción
    let titleValue = document.getElementById("title").value;
    let descriptionValue = document.getElementById("agregar-descripcion").value;

    /*
        \s: matches any whitespace symbol: spaces, tabs, and line breaks
        +: match one or more of the preceding tokens (referencing \s)
        g: the g at the end indicates iterative searching throughout the full string
    */

    //Basicamente lo que hacemos con esto es reemplazar todos los espacios por uno solo y hacemos split
    //Para que no salgan elementos vacíos etc
    let titleContent = titleValue.replace(/\s+/g, ' ').trim().split(" ")
    let descriptionContent = descriptionValue.replace(/\s+/g, ' ').trim().split(" ")


    //Luego obtenemos todas las palabras inapropiadas
    inappropriatewordsAPI.getAll()
        .then(words => {

            //Mix de diferentes fuentes para poder crear la sentencia que considero aceptable para lo que necesito
            //https://stackoverflow.com/questions/16312528/check-if-an-array-contains-any-element-of-another-array-in-javascript
            //https://stackoverflow.com/questions/52410662/why-is-this-returning-the-error-contains-is-not-a-function
            //https://stackoverflow.com/questions/50371188/javascripts-includes-function-not-working-correctly-with-array-of-objects

            //console.log(words.some(({word}) => (titleContent.some(r => r.toLowerCase().includes(word)))))
            //console.log(words.some(({ word }) => (titleContent.some(r => r.toLowerCase().includes(word)))))

            //Basicamente para cada entrada si ni el titulo ni la descripción contienen alguno de los valores 
            //word de la entrada (El valor word es el valor de la palabra inapropiada en la DB) entonces
            //podemos proceder a seguir el post de la foto. En cualquier otro caso es un error ya que
            //contiene una palabra inapropiada. (Lo paso a lowCase para que no haya problemas de MatchCase)
            if (!words.some(({ word }) => (titleContent.some(r => r.toLowerCase().includes(word))))
                && !words.some(({ word }) => (descriptionContent.some(r => r.toLowerCase().includes(word))))) {

                //Si la foto es nula entonces
                if (currentPhoto === null) {

                    //Añadimos al form el usuario que está logado y evidentemente es el que va a subir la foto
                    let userId = sessionManager.getLoggedUser().userId;
                    formData.append("userId", userId);

                    //Entonces creamos el foto
                    photosAPI.create(formData)
                        .then(data => {

                            //Si se crea correctamente entonces si el tamaño de la lista de categorías
                            //añadidas es mayor que 0 significa que se quieren asociar categorías
                            if (categoriesAdded.length > 0) {

                                //Entonces para cada categoryId de la lista lo asociamos a la foto y creamos
                                //en la base de datos una nueva entrada en esa tabla
                                for (let categoryId of categoriesAdded) {
                                    // console.log(categoryId)
                                    let formData2 = new FormData();
                                    formData2.append("categoryId", categoryId)
                                    formData2.append("photoId", data.lastId)
                                    photosCategoriesAPI.create(formData2)
                                        .then(data => { })
                                        .catch(error => messageRenderer.showErrorMessage(error));
                                }
                            }

                            //Esperamos 1 segundo ya que normalmente es tiempo de sobra para que se haya completado la
                            //promesa anterior (evidentemente hay formas MUCHISIMO mejor de hacerlo pero es la que menos)
                            //complejidad tenía y más se adaptaba al nivel de JS dado en la asignatura
                            const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
                            wait(1000).then(() => {
                                window.location.href = "index.html"
                            })
                        })
                        .catch(error => messageRenderer.showErrorMessage(error));
                } else {

                    //Si la foto está siendo editada entonces añadimos el userId y la fecha (para no cambiarla)
                    formData.append("userId", currentPhoto.userId);
                    formData.append("date", currentPhoto.date);

                    //Entonces actualizamos los valores en la DB
                    photosAPI.update(photoId, formData)
                        .then(data => {

                            //Una vez hecho usamos el algoritmo de antes para ver que valores estan en la lista de
                            //categorías que estaban por defecto y ahora no están y esos serán los candidatos a
                            //ser eliminados
                            let toDelete = findMissing(categoriesAlreadyAdded, categoriesAdded, categoriesAlreadyAdded.length, categoriesAdded.length)
                            for (let e of toDelete) {
                                photosCategoriesAPI.delete(photoId, e)
                                    .then(data => { })
                                    .catch(error => messageRenderer.showErrorMessage(error));
                            }

                            //También hacemos el caso contrario que serán los candidatos a ser añadidos
                            let toAdd = findMissing(categoriesAdded, categoriesAlreadyAdded, categoriesAdded.length, categoriesAlreadyAdded.length)
                            for (let e of toAdd) {
                                let formData2 = new FormData();
                                formData2.append("categoryId", e)
                                formData2.append("photoId", photoId)
                                photosCategoriesAPI.create(formData2)
                                    .then(data => { })
                                    .catch(error => messageRenderer.showErrorMessage(error));
                            }

                            //Esperamos 1 segundo ya que normalmente es tiempo de sobra para que se haya completado la
                            //promesa anterior (evidentemente hay formas MUCHISIMO mejor de hacerlo pero es la que menos)
                            //complejidad tenía y más se adaptaba al nivel de JS dado en la asignatura
                            const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
                            wait(1000).then(() => {
                                window.location.href = "index.html"
                            })

                        })
                        .catch(error => messageRenderer.showErrorMessage(error));
                }
            } else {
                messageRenderer.showErrorMessage("No puedes hacer uso de palabras inapropiadas")
            }
        })
        .catch(error => messageRenderer.showErrorMessage(error));
}

document.addEventListener("DOMContentLoaded", main);