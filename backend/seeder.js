import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

// this seeder is a complete separate runtime, need to re-connect to DB
dotenv.config()

connectDB()

const importData = async () => {
  try {
    // clear db before importing anything
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    // persist users to db
    const createdUsers = await User.insertMany(users)

    // User.insertMany(users) will return an array of users
    const adminUser = createdUsers[0]._id

    // add admin user to the "user" field of all products
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })

    // persist products to db
    await Product.insertMany(sampleProducts)

    console.log('Data Imported'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

// add command line args (-d)
if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
