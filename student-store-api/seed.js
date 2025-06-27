const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const fs = require('fs')
const path = require('path')

async function seed() {
  try {
    console.log('🌱 Seeding database...\n')

    // Clear existing data (in order due to relations)
    await prisma.orderItem.deleteMany()
    await prisma.order.deleteMany()
    await prisma.product.deleteMany()

    // Load JSON data
    const productsData = JSON.parse(
      fs.readFileSync(path.join(__dirname, './data/products.json'), 'utf8')
    )

    const ordersData = JSON.parse(
      fs.readFileSync(path.join(__dirname, './data/orders.json'), 'utf8')
    )

    // Seed products
    for (const product of productsData.products) {
      await prisma.product.create({
        data: {
          name: product.name,
          description: product.description,
          price: product.price,
          image_url: product.image_url,
          category: product.category,
        },
      })
    }

////////////////////////////////////////////////////////

    // Seed orders and items
    // for (const order of ordersData.orders) {
    //   const createdOrder = await prisma.order.create({
    //     data: {
    //       customer: order.customer_id,
    //       totalPrice: order.total_price,
    //       status: order.status,
    //       createdAt: new Date(order.created_at),
    //       orderItems: {
    //         create: order.items.map((item) => ({
    //           productId: item.product_id,
    //           quantity: item.quantity,
    //           price: item.price,
    //         })),
    //       },
    //     },
    //   })

    //   console.log(`✅ Created order #${createdOrder.id}`)
    // }

    ////////////////////////////////////////////////////////

    // run node seed.js

    console.log('\n🎉 Seeding complete!')
  } catch (err) {
    console.error('❌ Error seeding:', err)
  } finally {
    await prisma.$disconnect()
  }
}

seed()
