"use strict";

const editPhotoValidator = {
    validateEditPhoto: function (formData) {
        let errors = [];
        let title = formData.get("titulo");
        let category = formData.get("categoria");
        let visibility = formData.get("visibilidad");
        let calendar = formData.get("calendar");
        let textarea = formData.get("text");
        console.log(calendar)
        if (title.length < 3) {
            errors.push("El título ha de tener mas de 3 carácteres");
        }
        if (visibility!=="Pública" ||visibility!=="Privada") {
            errors.push("La visibilidad debe ser Pública o Privada");
        }
        if(calendar.length===0){
            console.log(calendar);
            errors.push("Por favor seleccione una fecha válida")
        }
        return errors;
    }
};
export { editPhotoValidator };