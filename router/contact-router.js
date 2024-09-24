const express = require("express");
const router = express.Router(); 
const Validate = require('../middlewares/validate');
const {insertSchema} = require('../validators/contact-validators');
const { contatcForm } = require('../controllers/contact-controllers');

router.route("/form").post(Validate(insertSchema),contatcForm);

module.exports = router;
