// node.js - backend connection with Prisma

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports = prisma;
