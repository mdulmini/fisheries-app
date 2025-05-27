/*const mongoose = require('mongoose');
const Product = require('../models/Product');
const Sale = require('../models/Sale');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB for sales generation'))
  .catch((err) => console.error('MongoDB connection error:', err));

const generateSales = async () => {
  try {
    // Check products
    const products = await Product.find();
    console.log('Products found:', products.length);
    if (products.length === 0) {
      throw new Error('No products found in the database');
    }

    const tuna = products.find(p => p.name === 'Tuna (Thalapath)');
    const prawns = products.find(p => p.name === 'Prawns (Isso)');
    const otherProducts = products.filter(p => p.name !== 'Tuna (Thalapath)' && p.name !== 'Prawns (Isso)');

    console.log('Tuna:', tuna ? tuna.name : 'Not found');
    console.log('Prawns:', prawns ? prawns.name : 'Not found');
    console.log('Other products:', otherProducts.length);

    // Generate sales for one day (50 sales)
    const salesPerDay = 50;
    const sales = [];

    // Tuna: 40% of sales (20 sales)
    for (let i = 0; i < 20; i++) {
      if (tuna && tuna.stock >= 10) {
        sales.push({
          productId: tuna._id,
          quantity: 10,
          totalPrice: tuna.price * 10,
          saleDate: new Date('2025-05-24')
        });
        tuna.stock -= 10;
      } else {
        console.log(`Tuna stock insufficient or not found: ${tuna ? tuna.stock : 'No tuna'}`);
      }
    }

    // Prawns: 30% of sales (15 sales)
    for (let i = 0; i < 15; i++) {
      if (prawns && prawns.stock >= 10) {
        sales.push({
          productId: prawns._id,
          quantity: 10,
          totalPrice: prawns.price * 10,
          saleDate: new Date('2025-05-24')
        });
        prawns.stock -= 10;
      } else {
        console.log(`Prawns stock insufficient or not found: ${prawns ? prawns.stock : 'No prawns'}`);
      }
    }

    // Others: 30% of sales (15 sales, distributed randomly)
    for (let i = 0; i < 15; i++) {
      const randomProduct = otherProducts[Math.floor(Math.random() * otherProducts.length)];
      if (randomProduct && randomProduct.stock >= 10) {
        sales.push({
          productId: randomProduct._id,
          quantity: 10,
          totalPrice: randomProduct.price * 10,
          saleDate: new Date('2025-05-24')
        });
        randomProduct.stock -= 10;
      } else {
        console.log(`Random product stock insufficient or not found: ${randomProduct ? randomProduct.name : 'No product'}`);
      }
    }

    console.log('Sales to insert:', sales.length);
    if (sales.length > 0) {
      await Sale.insertMany(sales);
      console.log('Sales inserted successfully');
    } else {
      console.log('No sales generated');
    }

    // Update product stocks
    await Product.bulkWrite(products.map(product => ({
      updateOne: {
        filter: { _id: product._id },
        update: { stock: product.stock }
      }
    })));

    console.log('Synthetic sales generated successfully');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error generating sales:', err);
    mongoose.connection.close();
  }
};

generateSales();*/






const mongoose = require('mongoose');
const Product = require('../models/Product'); // Fixed from USDProduct to Product
const Sale = require('../models/Sale');
const dotenv = require('dotenv');

// Explicitly specify the path to .env file
dotenv.config({ path: '/Users/maneeshadulmini/Desktop/fisheries-app/fisheries-backend/.env' });

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB for sales generation'))
  .catch((err) => console.error('MongoDB connection error:', err));

const generateSales = async () => {
  try {
    // Check products
    const products = await Product.find();
    console.log('Products found:', products.length);
    if (products.length === 0) {
      throw new Error('No products found in the database');
    }

    const tuna = products.find(p => p.name === 'Tuna (Thalapath)');
    const prawns = products.find(p => p.name === 'Prawns (Isso)');
    const otherProducts = products.filter(p => p.name !== 'Tuna (Thalapath)' && p.name !== 'Prawns (Isso)');

    console.log('Tuna:', tuna ? tuna.name : 'Not found');
    console.log('Prawns:', prawns ? prawns.name : 'Not found');
    console.log('Other products:', otherProducts.length);

    // Generate sales for one day (50 sales)
    const salesPerDay = 50;
    const sales = [];

    // Tuna: 40% of sales (20 sales)
    for (let i = 0; i < 20; i++) {
      if (tuna && tuna.stock >= 10) {
        sales.push({
          productId: tuna._id,
          quantity: 10,
          totalPrice: tuna.price * 10,
          saleDate: new Date('2025-05-24')
        });
        tuna.stock -= 10;
        tuna.sales += 10;
      } else {
        console.log(`Tuna stock insufficient or not found: ${tuna ? tuna.stock : 'No tuna'}`);
      }
    }

    // Prawns: 30% of sales (15 sales)
    for (let i = 0; i < 15; i++) {
      if (prawns && prawns.stock >= 10) {
        sales.push({
          productId: prawns._id,
          quantity: 10,
          totalPrice: prawns.price * 10,
          saleDate: new Date('2025-05-24')
        });
        prawns.stock -= 10;
        prawns.sales += 10;
      } else {
        console.log(`Prawns stock insufficient or not found: ${prawns ? prawns.stock : 'No prawns'}`);
      }
    }

    // Others: 30% of sales (15 sales, distributed randomly)
    for (let i = 0; i < 15; i++) {
      const randomProduct = otherProducts[Math.floor(Math.random() * otherProducts.length)];
      if (randomProduct && randomProduct.stock >= 10) {
        sales.push({
          productId: randomProduct._id,
          quantity: 10,
          totalPrice: randomProduct.price * 10,
          saleDate: new Date('2025-05-24')
        });
        randomProduct.stock -= 10;
        randomProduct.sales += 10;
      } else {
        console.log(`Random product stock insufficient or not found: ${randomProduct ? randomProduct.name : 'No product'}`);
      }
    }

    console.log('Sales to insert:', sales.length);
    if (sales.length > 0) {
      await Sale.insertMany(sales);
      console.log('Sales inserted successfully');
    } else {
      console.log('No sales generated');
    }

    // Update product stocks and sales
    await Product.bulkWrite(products.map(product => ({
      updateOne: {
        filter: { _id: product._id },
        update: { stock: product.stock, sales: product.sales }
      }
    })));

    console.log('Synthetic sales generated successfully');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error generating sales:', err);
    mongoose.connection.close();
  }
};

generateSales();