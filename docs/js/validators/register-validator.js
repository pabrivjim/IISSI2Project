"use strict";
const userValidator = {
    validateRegister: function (formData) {
        let errors = [];
        let firstName = formData.get("firstName");
        let lastName = formData.get("lastName");
        let userName = formData.get("userName");
        let password = formData.get("password");
        let password2 = formData.get("password2");
        if (firstName.length < 3 || lastName.length < 3) {
            errors.push("El nombre y apellido tienen que tener 3 o más carácteres");
        }
        if (password !== password2 ) {
            errors.push("Las contraseñas no coinciden");
        }else if(password.length<8){
            errors.push("La contraseña debe tener mas de 8 caractéres");
        }
        if(userName.length < 5 ){
            errors.push("El usuario ha de tener 5 o más carácteres")
        }
        return errors;
    }
};
export { userValidator };