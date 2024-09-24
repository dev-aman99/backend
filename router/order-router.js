const express = require("express");
const router = express.Router(); 
const Validate = require('../middlewares/validate');
const {createOrderSchema} = require('../validators/orders-validators');
const  OrderController  = require('../controllers/orders-controllers');

router.route("/create").post(Validate(createOrderSchema),OrderController.store);
router.route("/").get(OrderController.orderData);
router.route("/view/:id").get(OrderController.OneOrder);
router.route("/edit/:id").get(OrderController.OneOrder);
router.route("/update").post(OrderController.update);
router.route("/delete/:id").delete(OrderController.deleteOne);
router.route("/delete-multiple").post(OrderController.deleteMultipleOrders);

module.exports = router;
