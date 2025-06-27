// router set up for orders, referencing those in order controller file

const express = require("express");
const router = express.Router();
const controller = require("../controllers/orderController");

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

router.post("/:id/items", controller.createOrderItems);
router.get("/:id/total", controller.createOrderTotal);

module.exports = router;
