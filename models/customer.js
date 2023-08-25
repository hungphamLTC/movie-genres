const mongoose = require('mongoose')
const Joi = require('joi');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }, 

    isGold:{
        type: Boolean,
        default: false
    }, 

    phone:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}))

function validateCustomer(customer, res){
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean()
    })
    const validation = schema.validate(customer);

    if (validation.error){
        res.status(400).send(validation.error.details[0].message);
        return;
    }
}

exports.Customer = Customer;
exports.validate = validateCustomer;