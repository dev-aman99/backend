const zode = require("zod");

const createOrderSchema = zode.object({
  product_name: zode
    .string({ required_error: "Product name is required" })
    .trim()
    .min(3, { message: "Product name must be atlest 3 char" })
    .max(255, { message: "Product name must not be more tahn 255 char" }),
  sku: zode
    .string({ required_error: "sku is required" })
    .trim() 
    .min(3, { message: "sku must be atlest 3 char" })
    .max(255, { message: "sku must not be more tahn 255 char" }),
  amount: zode
    .string({ required_error: "amount is required" }) 
    .trim() 
}); 

module.exports = {createOrderSchema};