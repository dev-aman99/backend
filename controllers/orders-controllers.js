const Order = require("../models/orderModel");
  
const store = async (req, res) => {
  try { 
    const response  = req.body; 
    await Order.create(response);
    return res.status(200).json({message:"Submited"})
  } catch (error) {
    return res.status(500).json({message:"not submited"})
  }
};

const orderData = async (req, res) => {
  try {
    const orders = await Order.find(); 
    return res.status(200).json({orders: orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ message: "Internal error" });
  }
};

const OneOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId); 
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json({ order });
  } catch (error) {
    console.error("Error fetching order:", error);
    return res.status(500).json({ message: "Internal error" });
  }
};

const update = async (req, res) => {
  try {
    const { order_id, product_name, sku, amount } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(order_id, {product_name,sku,amount}, { new: true });  
    return res.status(200).json({ message: "Order updated successfully", order: updatedOrder });
  } catch (error) {
    console.error("Error updating order:", error);
    return res.status(500).json({ message: "Internal error" });
  }
};

const deleteOne = async (req, res) => {
  try {
    const orderId = req.params.id; 
    const order = await Order.findOneAndDelete({ _id: orderId }); 
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    } 
    return res.status(200).json({ message: "Order deleted successfully", order: order });
  } catch (error) {
    console.error("Error deleting order:", error);
    return res.status(500).json({ message: "Internal error" });
  }
};

const deleteMultipleOrders = async (req, res) => {
  const { ids } = req.body

  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ message: 'Invalid request, no IDs provided' })
  }

  try {
    const result = await Order.deleteMany({ _id: { $in: ids } })
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No orders found to delete' })
    }
    res.status(200).json({ message: 'Orders successfully deleted', deletedCount: result.deletedCount })
  } catch (error) {
    console.error('Error deleting orders:', error)
    res.status(500).json({ message: 'Server error', extraDetails: error.message })
  }
}
 
module.exports = { store,orderData,OneOrder,update,deleteOne,deleteMultipleOrders};
