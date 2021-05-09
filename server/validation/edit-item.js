const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateUpdateItemInput(data) {
    let errors = {}; 
    data.name = !isEmpty(data.name) ? data.name : "";
    data.description = !isEmpty(data.description) ? data.description : "";
    data.price = !isEmpty(data.price) ? data.price : ""; 

    if (Validator.isEmpty(data.name)) {
        errors.name = "Item Name field is required";
    }

    if (Validator.isEmpty(data.description)) {
        errors.description = "Description field is required";
    }

    if (Validator.isEmpty(data.price)) {
        errors.price = "Price field is required";
    } else if (!Validator.isInt(data.price)) {
        errors.price = "Price is invalid";
    } 
    
    return {
        errors,
        isValid: isEmpty(errors)
    };
};