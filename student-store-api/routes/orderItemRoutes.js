//route set up, only reference to functions in controller file

const express = require("express");
const router = express.Router();
const controller = require("../controllers/orderItemController");

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);

module.exports = router;



