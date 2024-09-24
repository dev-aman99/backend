const zode = require("zod");

const insertSchema = zode.object({
  name: zode
    .string({ required_error: "name is required" })
    .trim()
    .min(3, { message: "name must be atlest 3 char" })
    .max(255, { message: "name must not be more tahn 255 char" }),
  email: zode
    .string({ required_error: "email is required" })
    .trim()
    .email({ message: "Invalid Email address" })
    .min(3, { message: "email must be atlest 3 char" })
    .max(255, { message: "email must not be more tahn 255 char" }),
  mobile: zode
    .string({ required_error: "mobile is required" }) 
    .trim()
    .min(8, { message: "mobile must be atlest 8 char" })
    .max(10, { message: "mobile must not be more tahn 10 char" }),
}); 

module.exports = {insertSchema};