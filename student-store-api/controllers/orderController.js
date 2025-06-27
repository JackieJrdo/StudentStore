
const prisma = require("../models/prismaClient")

exports.getAll = async (req, res) => {
    const orders = await prisma.order.findMany({
        include: {
            orderItem: true,
        }
    });
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

    try {

        let orderTotal = 0;

        const order = await prisma.orderItem.findMany({ 
            where: { id: id }, // get the order id for the order
            },
        )

        // do functionality of calculating total for each item and adding it up then return
        for (const orderItem of order){
            console.log(order);
            orderTotal += orderItem.price * orderItem.quantity;
            // orderTotal += orderItem.price;
        }

        // Update the order total 
        const updatedTotal = await prisma.order.update({
            where: { id: id },
            data: { total: orderTotal },
            });

        console.log("Updates total", updatedTotal)
        res.status(201).json(updatedTotal);

    } catch (error) {
        res.status(500).json({error: "order Total couldnt be calculated"})
    }

}


// post
exports.create =  async (req, res) => {
    const { customer, total, status, orderItem } = req.body;
    const newOrder = await prisma.order.create({ data: {
        customer,
        total,
        status,
        orderItem: {
            create: orderItem.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price
            })) 
        }
    }, 
    include: {
        orderItem: true,
    }
    })
    res.status(201).json(newOrder);
};


// put or update
exports.update = async (req, res) => {
    const id = Number(req.params.id);
    const { customer, total, status, orderItem} = req.body;

    const updatedOrder = await prisma.order.update({
        where: { id },
        data: {customer, total, status,
            orderItem: {
                create: orderItem.map(item => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.price
                })) 
            }
        },
        // include: {
        //     orderItem: true,
        // }
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