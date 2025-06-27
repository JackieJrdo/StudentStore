//route set up, only reference to functions in controller file

const express = require("express");
const router = express.Router();
const controller = require("../controllers/productController");

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

module.exports = router;



