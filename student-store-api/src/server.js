
require("dotenv").config(); 
const express = require('express');
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const productRoutes = require("../routes/productRoutes")
const orderRoutes = require("../routes/orderRoutes")
const orderItemRoutes = require("../routes/orderItemRoutes")


// const corsOption = {
//     origin: "https://localhost:5173",
// // change this link to the front end link
// }
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/product", productRoutes)
app.use("/order", orderRoutes)
app.use("/orderItem", orderItemRoutes)


const PORT = process.env.PORT || 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})