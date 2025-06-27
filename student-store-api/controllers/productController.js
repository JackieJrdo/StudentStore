

// controller file to be able to call these in routes

const express = require("express"); // remove?
const prisma = require("../models/prismaClient")


// Get every product


exports.getAll = async (req, res) => {

    const {category, sort} = req.query;
    const where = {};
    const orderBy = [];

    // filter by category
    if (category){
        where.category = category;
    }

    // sorting 
    if (sort === "name" || sort === "price"){
        orderBy.push({ [sort]: "asc" }); // FIXME this can be desc??
    }
    
    const products = await prisma.product.findMany({
        where,
        orderBy: orderBy.length ? orderBy : undefined,
    });
    res.json(products)

}

// Get by ID

exports.getById = async (req, res) => {
    const id = Number(req.params.id);
    const product = await prisma.product.findUnique({where: {id}});
    if (!product){
        return res.status(404).json({error: "Not Found :( !"});
    }  else {
        res.json(product);
    }
};


// Post

exports.create =  async (req, res) => {
    const {name, description, image_url, price, category} = req.body;
    const newProduct = await prisma.product.create({ data: {
        name, 
        description,
        image_url,
        price,
        category
    }, 
    })
    res.status(201).json(newProduct);
};


// put or update

exports.update = async (req, res) => {
    const id = Number(req.params.id);
    const {name, description, image_url, price, category} = req.body;
    const updatedProduct = await prisma.product.update({
        where: { id },
        data: {name, description, image_url, price, category},
    });
    res.json(updatedProduct);
};


// delete or remove
exports.remove = async (req, res) => {
    const id = Number(req.params.id);
    await prisma.product.delete({
        where: {id}
    });
    res.status(204).end();
};