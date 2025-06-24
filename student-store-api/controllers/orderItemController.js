

const prisma = require("../models/prismaClient")

exports.getAll = async (req, res) => {
    const orderItems = await prisma.orderItem.findMany();
    console.log(orderItems)
    res.json(orderItems)
}

exports.getById = async (req, res) => {
    const id = Number(res.params.id);
    const orderItem = await prisma.orderItem.findUnique({where: {id}});
    if (!orderItem){
        return res.status(404).json({error: "No order item exists at this id :( !"});
    }  else {
        res.json(orderItem);
    }
};



exports.create =  async (req, res) => {
    const { orderId, productId, quantity, price } = req.body;
    const newOrderItem = await prisma.orderItem.create({ data: {
        orderId,
        productId,
        quantity,
        price
    }, 
    })
    res.status(201).json(newOrderItem);
};