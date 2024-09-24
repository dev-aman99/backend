const Contact = require("../models/contactModel");
  
const contatcForm = async (req, res) => {
  try { 
    const response  = req.body;
    await Contact.create(response);
    return res.status(200).json({message:"Submited"})

  } catch (error) {
    return res.status(500).json({message:"not submited"})
  }
};

 

module.exports = { contatcForm };
