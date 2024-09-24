const {Schema, model} = require("mongoose"); 

const orderSchema = new Schema({
  product_name: {
    type: String,
    required: true,
  },
  sku: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  currency: {
    type: Schema.Types.ObjectId,
    ref: 'currencies',
    default: "6694fbab9d99defa19031f70"
  },
}); 

const Order = model("order", orderSchema);

module.exports = Order;
