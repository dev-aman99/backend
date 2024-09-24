const {Schema, model} = require("mongoose"); 

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  message: {
    type: String, 
  },
}); 

const Contact = model("Contact", contactSchema);

module.exports = Contact;
