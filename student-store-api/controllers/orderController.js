
const prisma = require("../models/prismaClient")

exports.getAll = async (req, res) => {
    const orders = await prisma.order.findMany();
    console.log(orders)
    res.json(orders)
}

// get by ID
exports.getById = async (req, res) => {
    const id = Number(req.params.id);
    const order = await prisma.order.findUnique({where: {id}, include: {orderItem: true}});
    if (!order){
        return res.status(404).json({error: "Not Found :( !"});
    }  else {
        res.json(order);
    }
};

exports.createOrderItems = async(req, res) => {
    const id = Number(req.params.id);
    const { productId, quantity, price  } = req.body;
    console.log(req.body)

    if(!productId || !quantity|| !price){
        return res.status(400).json({ error: "product id, quantity, and price are needed"})
    }
    
    try {
        const orderItem = await prisma.orderItem.create({ data: {
            orderId: id,
            productId: parseInt(productId),
            quantity,
            price

        }})
        console.log(orderItem)
        res.status(201).json(orderItem);

    } catch (error) {
        res.status(500).json({error: "orderItem not created"})
    }

}

exports.createOrderTotal = async(req, res) => {
    const id = Number(req.params.id);
    const { productId, quantity, price  } = req.body;
    console.log(req.body)

    if(!productId || !quantity|| !price){
        return res.status(400).json({ error: "product id, quantity, and price are needed"})
    }
    
    try {
        const orderItem = await prisma.orderItem.create({ data: {
            orderId: id,
            productId: parseInt(productId),
            quantity,
            price

        }})
        console.log(orderItem)
        res.status(201).json(orderItem);

    } catch (error) {
        res.status(500).json({error: "orderItem not created"})
    }

}


// post
exports.create =  async (req, res) => {
    const { customer, total, status, createdAt } = req.body;
    const newOrder = await prisma.order.create({ data: {
        customer,
        total,
        status,
        createdAt
    }, 
    })
    res.status(201).json(newOrder);
};


// put or update
exports.update = async (req, res) => {
    const id = Number(req.params.id);
    const { customer, total, status, createdAt } = req.body;
    const updatedOrder = await prisma.order.update({
        where: { id },
        data:{
            customer,
            total,
            status,
            createdAt 
        }
    });
    res.json(updatedOrder);
};

// delete or remove
exports.remove = async (req, res) => {
    const id = Number(req.params.id);
    await prisma.order.delete({
        where: {id}
    });
    res.status(204).end();
};