const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateAddItemInput(data,file) {
    let errors = {};
    console.log(data,file)
    data.name = !isEmpty(data.name) ? data.name : "";
    data.description = !isEmpty(data.description) ? data.description : "";
    data.price = !isEmpty(data.price) ? data.price : ""; 
    data.qty = !isEmpty(data.qty) ? data.qty : ""; 

    if (Validator.isEmpty(data.name)) {
        errors.name = "Item Name field is required";
    }

    if (Validator.isEmpty(data.description)) {
        errors.description = "Description field is required";
    }

    if (Validator.isEmpty(data.price)) {
        errors.price = "Price field is required";
    } else if (isNaN(data.price)) {
        errors.price = "Price is invalid";
    }

    if (Validator.isEmpty(file?.path ?? "")) {
        errors.imageData = "Image is required";
    } 

    if (Validator.isEmpty(data.qty)) {
        errors.qty = "Quentity field is required";
    } else if (!Validator.isInt(data.qty)) {
        errors.qty = "Quentity is invalid";
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    };
};