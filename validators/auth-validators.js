const zode = require("zod");

const singUpSchema = zode.object({
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
  password: zode
    .string({ required_error: "password is required" }) 
    .min(8, { message: "password must be atlest 8 char" })
    .max(255, { message: "password must not be more tahn 255 char" }),
});

const loginSchema = zode.object({ 
  email: zode
    .string({ required_error: "email is required" })
    .trim()
    .email({ message: "Invalid Email address" })
    .min(3, { message: "email must be atlest 3 char" })
    .max(255, { message: "email must not be more tahn 255 char" }),
  password: zode
    .string({ required_error: "password is required" }) 
    .min(8, { message: "password must be atlest 8 char" })
    .max(255, { message: "password must not be more tahn 255 char" }),
});

module.exports = {singUpSchema,loginSchema};