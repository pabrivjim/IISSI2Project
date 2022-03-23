document.addEventListener('DOMContentLoaded', function () {


    //ESTE SCRIPT ACTUALMENTE NO SE USA. PERO LO HE DEJADO EN EL PROYECTO YA QUE PUEDE SERVIR REALMENTE EN UN
    //FUTURO EN EL CASO DE QUE SE QUIERA SUBIR UNA FOTO MEDIANTE EL CONTENIDO DEL ORDENADOR. BASICAMENTE
    //CUANDO SE CLICA EN EL AVATAR TE MUESTRA EL EXPLORADOR DE ARCHIVOS DEL ORDENADOR Y ACTUALIZA LA FOTO UNA
    //VEZ SELECCIONADA AUNQUE HAY VARIOS BUGS DE CSS QUE NECESITARÍAN ARREGLARSE


    window.onload = function uploadPic() {
        let fileupload = document.getElementById("FileUpload1");
        let filePath = document.getElementById("spnFilePath");
        let image = document.getElementById("imgFileUpload");
        let div = document.getElementById("logo-register");

        image.onclick = function () {
            fileupload.click();
        };
        fileupload.onchange = function (e) {
            console.log(filePath)
            console.log(image.src)
            filePath.removeChild;
            let reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            fileupload = e.target.files[0];
            reader.onload = function () {
                //image = document.createElement('img');
                let width2 = div.clientWidth;
                div.style.height = width2;
                console.log(width2)
                console.log(div.clientHeight)

                image.src = reader.result;
                console.log(image.src)
                console.log(image)
                // image.className ="profile-pic";
                image.className = "profile-pic";
                image.style.width = div.clientWidth;
                image.style.height = div.clientHeight;
                console.log(image.clientHeight)
                console.log(image.clientWidth)

            }
        };
    };
});

// /*UploadPhoto Calendar*/

//     $('.input-group.date').datepicker({format: "dd.mm.yyyy"}); 
