/*const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true }
});

module.exports = mongoose.model('Product', productSchema);*/


/*const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true }, // Changed to Number for calculations
  image: { type: String, required: true },
  stock: { type: Number, default: 0 }, // Current stock level
  sales: { type: Number, default: 0 }, // Total sales count
  bufferStock: { type: Number, default: 0 } // Buffer stock level
});

module.exports = mongoose.model('Product', productSchema);*/



/*const mongoose = require('mongoose');
const cron = require('node-cron'); // Add this dependency for scheduling

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  stock: { type: Number, default: 0 },
  sales: { type: Number, default: 0 },
  bufferStock: { type: Number, default: 0 },
  category: { type: String, default: 'Fish' },
  lastBufferUpdate: { type: Date, default: Date.now }, // Track last update
});

const Product = mongoose.model('Product', productSchema);

// Function to calculate and update buffer stock for a single product
const updateBufferStock = async (product) => {
  const avgDailySales = (product.sales / 30) || 1; // Assume 30 days of sales
  const safetyStock = avgDailySales * 0.1; // 10% safety stock
  const leadTime = 1; // 1 day lead time
  const bufferStock = (avgDailySales * leadTime) + safetyStock;

  product.bufferStock = bufferStock.toFixed(2);
  product.lastBufferUpdate = new Date();
  await product.save();
  return { name: product.name, avgDailySales: avgDailySales.toFixed(2), bufferStock: product.bufferStock };
};

const calculateBufferStock = async (req, res) => {
  try {
    console.log('Fetching products for buffer calculation...');
    const products = await Product.find({ category: 'Fish' });
    console.log('Found products:', products.length);
    const bufferStocks = [];

    if (!products || products.length === 0) {
      throw new Error('No products found in the database.');
    }

    for (let product of products) {
      const updatedProduct = await updateBufferStock(product);
      bufferStocks.push(updatedProduct);
    }

    res.json(bufferStocks);
  } catch (err) {
    console.error('Error calculating buffer stock:', err.message);
    res.status(500).json({ message: 'Error calculating buffer stock: ' + err.message });
  }
};

// Check stock alerts and update buffer stock if stock is low
const checkStockAlerts = async (req, res) => {
  try {
    const products = await Product.find({ category: 'Fish' });
    const alerts = [];

    for (let product of products) {
      if (product.stock === 0) {
        alerts.push({ name: product.name, message: `Out of stock for ${product.name}. Alert for tomorrow!` });
        await updateBufferStock(product); // Update buffer stock if stock is 0
      } else if (product.stock < product.bufferStock) {
        alerts.push({ name: product.name, message: `Low stock for ${product.name}. Current: ${product.stock}kg, Buffer: ${product.bufferStock}kg` });
        await updateBufferStock(product); // Update buffer stock if stock is low
      }
    }

    res.json({ alerts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add product and calculate buffer stock for the new product
const addProduct = async (req, res) => {
  const { name, price, image, stock, bufferStock, category } = req.body;
  try {
    const product = new Product({
      name,
      price: parseFloat(price),
      image,
      stock: parseInt(stock) || 0,
      bufferStock: parseInt(bufferStock) || 0,
      category: category || 'Fish',
    });
    const savedProduct = await product.save();
    await updateBufferStock(savedProduct); // Calculate buffer stock for new product
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Generate synthetic sales and update buffer stock if sales change significantly
const generateSyntheticSales = async (req, res) => {
  try {
    const products = await Product.find();
    for (let product of products) {
      const previousSales = product.sales;
      const dailySales = Math.floor(Math.random() * 51);
      product.sales += dailySales;
      product.stock -= dailySales;
      if (product.stock < 0) product.stock = 0;
      await product.save();

      // If sales increased significantly (e.g., by more than 20%), update buffer stock
      if (product.sales > previousSales * 1.2) {
        await updateBufferStock(product);
      }
    }
    res.status(200).json({ message: 'Synthetic sales generated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const initializeProducts = async (req, res) => {
  const productsList = [
    { name: 'Tuna (Thalapath)', price: 2500, image: '/assets/tuna.jpg', stock: 1500, bufferStock: 1000 },
    { name: 'Prawns (Isso)', price: 3000, image: '/assets/prawns.jpg', stock: 2000, bufferStock: 2000 },
  ];

  try {
    await Product.deleteMany({});
    await Product.insertMany(productsList);
    console.log('Products initialized:', productsList.length);
    res.status(200).json({ message: 'Fish products initialized successfully', products: productsList });
  } catch (err) {
    console.error('Error initializing products:', err);
    res.status(500).json({ message: err.message });
  }
};



cron.schedule('0 0 * * 1', async () => { // Every Monday at midnight
  console.log('Running weekly buffer stock calculation...');
  try {
    const products = await Product.find({ category: 'Fish' });
    for (let product of products) {
      await updateBufferStock(product);
    }
    console.log('Weekly buffer stock calculation completed.');
  } catch (err) {
    console.error('Error in weekly buffer stock calculation:', err);
  }
});

module.exports = Product;
module.exports.routes = { calculateBufferStock, checkStockAlerts, addProduct, generateSyntheticSales,initializeProducts };*/







/*const mongoose = require('mongoose');
const cron = require('node-cron'); // Add this dependency for scheduling
const Sale = require('./Sale'); // Import Sale model

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  stock: { type: Number, default: 0 },
  sales: { type: Number, default: 0 }, // This can be removed if using Sale collection
  bufferStock: { type: Number, default: 0 },
  category: { type: String, default: 'Fish' },
  lastBufferUpdate: { type: Date, default: Date.now },
});

const Product = mongoose.model('Product', productSchema);

// Function to calculate and update buffer stock for a single product
const updateBufferStock = async (product) => {
  try {
    // Fetch sales data for the product from Sale collection
    const salesData = await Sale.find({ productId: product._id });
    const totalSales = salesData.reduce((sum, sale) => sum + sale.quantity, 0);
    const avgDailySales = totalSales > 0 ? totalSales / 30 : 1; // 30 days average
    const safetyStock = avgDailySales * 0.1; // 10% safety stock
    const leadTime = 1; // 1 day lead time
    const bufferStock = (avgDailySales * leadTime) + safetyStock;

    product.bufferStock = bufferStock.toFixed(2);
    product.lastBufferUpdate = new Date();
    await product.save();
    return { 
      name: product.name, 
      avgDailySales: avgDailySales.toFixed(2), 
      bufferStock: product.bufferStock 
    };
  } catch (err) {
    console.error(`Error updating buffer stock for ${product.name}:`, err);
    return { name: product.name, avgDailySales: 0, bufferStock: 0 };
  }
};

const calculateBufferStock = async (req, res) => {
  try {
    console.log('Fetching products for buffer calculation...');
    const products = await Product.find({ category: 'Fish' });
    console.log('Found products:', products.length);
    const bufferStocks = [];

    if (!products || products.length === 0) {
      throw new Error('No products found in the database.');
    }

    for (let product of products) {
      const updatedProduct = await updateBufferStock(product);
      bufferStocks.push(updatedProduct);
    }

    res.json(bufferStocks);
  } catch (err) {
    console.error('Error calculating buffer stock:', err.message);
    res.status(500).json({ message: 'Error calculating buffer stock: ' + err.message });
  }
};

// Check stock alerts and update buffer stock if stock is low
const checkStockAlerts = async (req, res) => {
  try {
    const products = await Product.find({ category: 'Fish' });
    const alerts = [];

    for (let product of products) {
      if (product.stock === 0) {
        alerts.push({ name: product.name, message: `Out of stock for ${product.name}. Alert for tomorrow!` });
        await updateBufferStock(product);
      } else if (product.stock < product.bufferStock) {
        alerts.push({ name: product.name, message: `Low stock for ${product.name}. Current: ${product.stock}kg, Buffer: ${product.bufferStock}kg` });
        await updateBufferStock(product);
      }
    }

    res.json({ alerts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add product and calculate buffer stock for the new product
const addProduct = async (req, res) => {
  const { name, price, image, stock, bufferStock, category } = req.body;
  try {
    const product = new Product({
      name,
      price: parseFloat(price),
      image,
      stock: parseInt(stock) || 0,
      bufferStock: parseInt(bufferStock) || 0,
      category: category || 'Fish',
    });
    const savedProduct = await product.save();
    await updateBufferStock(savedProduct);
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Generate synthetic sales and update buffer stock if sales change significantly
const generateSyntheticSales = async (req, res) => {
  try {
    const products = await Product.find();
    for (let product of products) {
      const previousSales = product.sales;
      const dailySales = Math.floor(Math.random() * 51);
      product.sales += dailySales;
      product.stock -= dailySales;
      if (product.stock < 0) product.stock = 0;
      await product.save();

      if (product.sales > previousSales * 1.2) {
        await updateBufferStock(product);
      }
    }
    res.status(200).json({ message: 'Synthetic sales generated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const initializeProducts = async (req, res) => {
  const productsList = [
    { name: 'Tuna (Thalapath)', price: 2500, image: '/assets/tuna.jpg', stock: 1500, bufferStock: 1000 },
    { name: 'Prawns (Isso)', price: 3000, image: '/assets/prawns.jpg', stock: 2000, bufferStock: 2000 },
  ];

  try {
    await Product.deleteMany({});
    await Product.insertMany(productsList);
    console.log('Products initialized:', productsList.length);
    res.status(200).json({ message: 'Fish products initialized successfully', products: productsList });
  } catch (err) {
    console.error('Error initializing products:', err);
    res.status(500).json({ message: err.message });
  }
};

cron.schedule('0 0 * * 1', async () => {
  console.log('Running weekly buffer stock calculation...');
  try {
    const products = await Product.find({ category: 'Fish' });
    for (let product of products) {
      await updateBufferStock(product);
    }
    console.log('Weekly buffer stock calculation completed.');
  } catch (err) {
    console.error('Error in weekly buffer stock calculation:', err);
  }
});

module.exports = Product;
module.exports.routes = { calculateBufferStock, checkStockAlerts, addProduct, generateSyntheticSales, initializeProducts };*/




const mongoose = require('mongoose');
const cron = require('node-cron');

// Import Sale model (if it exists)
let Sale;
try {
  Sale = require('./Sale'); // Ensure Sale.js exists and is correctly imported
} catch (err) {
  console.warn('Sale model not found, using fallback logic:', err.message);
  Sale = null; // Fallback if Sale model fails to import
}

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  stock: { type: Number, default: 0 },
  sales: { type: Number, default: 0 },
  bufferStock: { type: Number, default: 0 },
  category: { type: String, default: 'Fish' },
  lastBufferUpdate: { type: Date, default: Date.now },
});

const Product = mongoose.model('Product', productSchema);

// Function to calculate and update buffer stock for a single product
const updateBufferStock = async (product) => {
  try {
    let totalSales = 0;
    if (Sale) {
      try {
        const salesData = await Sale.find({ productId: product._id }).exec();
        totalSales = salesData.reduce((sum, sale) => sum + (sale.quantity || 0), 0); // Handle undefined quantity
      } catch (salesErr) {
        console.warn(`No sales data found for ${product.name}, using default value. Error: ${salesErr.message}`);
        totalSales = 0; // Default to 0 if sales data fetch fails
      }
    } else {
      console.warn(`Sale model not available, using fallback sales calculation for ${product.name}`);
      totalSales = product.sales || 0; // Fallback to product.sales field if Sale model is unavailable
    }

    const avgDailySales = totalSales > 0 ? totalSales / 30 : 1; // 30 days average, minimum 1
    const safetyStock = avgDailySales * 0.1; // 10% safety stock
    const leadTime = 1; // 1 day lead time
    const bufferStock = (avgDailySales * leadTime) + safetyStock;

    product.bufferStock = Math.round(bufferStock);
    product.lastBufferUpdate = new Date();
    await product.save();
    return { 
      name: product.name, 
      avgDailySales: avgDailySales.toFixed(2), 
      bufferStock: product.bufferStock 
    };
  } catch (err) {
    console.error(`Error updating buffer stock for ${product.name}:`, err.message);
    return { name: product.name, avgDailySales: 0, bufferStock: 0 };
  }
};

const calculateBufferStock = async (req, res) => {
  try {
    console.log('Checking MongoDB connection...');
    const dbState = mongoose.connection.readyState;
    if (dbState !== 1) {
      throw new Error(`MongoDB connection error: state ${dbState} (1 = connected, 0 = disconnected)`);
    }
    console.log('MongoDB connection is active.');

    console.log('Fetching products for buffer calculation...');
    const products = await Product.find({ category: 'Fish' }).exec();
    console.log('Found products:', products.length);
    const bufferStocks = [];

    if (!products || products.length === 0) {
      throw new Error('No products found in the database.');
    }

    for (let product of products) {
      const updatedProduct = await updateBufferStock(product);
      bufferStocks.push(updatedProduct);
    }

    res.json(bufferStocks);
  } catch (err) {
    console.error('Error calculating buffer stock:', err.message);
    res.status(500).json({ message: 'Error calculating buffer stock: ' + err.message });
  }
};


// Check stock alerts and update buffer stock if stock is low
const checkStockAlerts = async (req, res) => {
  try {
    const products = await Product.find({ category: 'Fish' }).exec();
    const alerts = [];

    for (let product of products) {
      if (product.stock === 0) {
        alerts.push({ name: product.name, message: `Out of stock for ${product.name}. Alert for tomorrow!` });
        await updateBufferStock(product);
      } else if (product.stock < product.bufferStock) {
        alerts.push({ name: product.name, message: `Low stock for ${product.name}. Current: ${product.stock}kg, Buffer: ${product.bufferStock}kg` });
        await updateBufferStock(product);
      }
    }

    res.json({ alerts });
  } catch (err) {
    console.error('Error checking stock alerts:', err.message);
    res.status(500).json({ message: err.message });
  }
};

// Add product and calculate buffer stock for the new product
const addProduct = async (req, res) => {
  const { name, price, image, stock, bufferStock, category } = req.body;
  try {
    const product = new Product({
      name,
      price: parseFloat(price) || 0,
      image,
      stock: parseInt(stock) || 0,
      bufferStock: parseInt(bufferStock) || 0,
      category: category || 'Fish',
    });
    const savedProduct = await product.save();
    await updateBufferStock(savedProduct);
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error('Error adding product:', err.message);
    res.status(400).json({ message: err.message });
  }
};

// Generate synthetic sales and update buffer stock if sales change significantly
const generateSyntheticSales = async (req, res) => {
  try {
    const products = await Product.find().exec();
    for (let product of products) {
      const previousSales = product.sales;
      const dailySales = Math.floor(Math.random() * 51);
      product.sales += dailySales;
      product.stock -= dailySales;
      if (product.stock < 0) product.stock = 0;
      await product.save();

      if (product.sales > previousSales * 1.2) {
        await updateBufferStock(product);
      }
    }
    res.status(200).json({ message: 'Synthetic sales generated' });
  } catch (err) {
    console.error('Error generating synthetic sales:', err.message);
    res.status(500).json({ message: err.message });
  }
};

const initializeProducts = async (req, res) => {
  const productsList = [
    { name: 'Tuna (Thalapath)', price: 2500, image: '/assets/tuna.jpg', stock: 1500, bufferStock: 1000 },
    { name: 'Prawns (Isso)', price: 3000, image: '/assets/prawns.jpg', stock: 2000, bufferStock: 2000 },
    { name: 'Salmon (Imported)', price: 3500, image: '/assets/salmon.jpg', stock: 990, bufferStock: 1000 },
    { name: 'Seer Fish (Paraw)', price: 2800, image: '/assets/seer.jpg', stock: 1200, bufferStock: 800 },
    { name: 'Mullet (Gal Malu)', price: 1500, image: '/assets/mullet.jpg', stock: 990, bufferStock: 600 },
    { name: 'Sardine (Hurulla)', price: 1800, image: '/assets/sardine.jpg', stock: 2000, bufferStock: 700 },
    { name: 'Trevally (Parai)', price: 1900, image: '/assets/trevally.jpg', stock: 1450, bufferStock: 500 },
    { name: 'Mackerel (Kumbala)', price: 1200, image: '/assets/mackerel.jpg', stock: 1790, bufferStock: 400 },
    { name: 'Tilapia', price: 900, image: '/assets/tilapia.jpg', stock: 1900, bufferStock: 300 },
    { name: 'Cuttlefish (Della)', price: 1600, image: '/assets/cuttlefish.jpg', stock: 1290, bufferStock: 700 },
    { name: 'Crab (Kakuluwa)', price: 2200, image: '/assets/crab.jpg', stock: 1100, bufferStock: 600 },
    { name: 'Squid (Kooni)', price: 1400, image: '/assets/squid.jpg', stock: 1600, bufferStock: 500 },
    { name: 'Shark (Mora)', price: 2800, image: '/assets/shark.jpg', stock: 780, bufferStock: 400 },
    { name: 'Red Snapper (Rathu Paraw)', price: 2200, image: '/assets/redsnapper.jpg', stock: 880, bufferStock: 300 },
    { name: 'Barracuda (Jeela)', price: 1900, image: '/assets/barracuda.jpg', stock: 1000, bufferStock: 200 },
    { name: 'Herring (Salaya)', price: 780, image: '/assets/herring.jpg', stock: 2200, bufferStock: 100 },
    { name: 'Anchovy (Halmessa)', price: 600, image: '/assets/anchovy.jpg', stock: 2480, bufferStock: 50 },
    { name: 'Pomfret (Sudda)', price: 2300, image: '/assets/pomfret.jpg', stock: 1100, bufferStock: 200 },
    { name: 'Milkfish (Valalii)', price: 1300, image: '/assets/milkfish.jpg', stock: 1400, bufferStock: 300 },
    { name: 'Yellowfin Tuna (Kelawalla)', price: 2400, image: '/assets/yellowfintuna.jpg', stock: 1290, bufferStock: 400 },
    { name: 'Grouper (Gal Balu)', price: 2600, image: '/assets/grouper.jpg', stock: 900, bufferStock: 500 },
  ];

  try {
    await Product.deleteMany({});
    console.log('Cleared existing products.');

    const validatedProducts = [];
    for (const productData of productsList) {
      const product = new Product(productData);
      try {
        await product.validate();
        validatedProducts.push(productData);
      } catch (validationErr) {
        console.error(`Validation failed for product ${productData.name}:`, validationErr.message);
        throw new Error(`Validation failed for product ${productData.name}: ${validationErr.message}`);
      }
    }

    const result = await Product.insertMany(validatedProducts, { validateBeforeSave: true });
    console.log('Products initialized:', result.length, 'documents inserted');
    res.status(200).json({ message: 'Fish products initialized successfully', products: result });
  } catch (err) {
    console.error('Error initializing products:', err.message);
    res.status(500).json({ message: err.message, errorDetails: err.errors });
  }
};

cron.schedule('0 0 * * 1', async () => {
  console.log('Running weekly buffer stock calculation...');
  try {
    const products = await Product.find({ category: 'Fish' }).exec();
    for (let product of products) {
      await updateBufferStock(product);
    }
    console.log('Weekly buffer stock calculation completed.');
  } catch (err) {
    console.error('Error in weekly buffer stock calculation:', err.message);
  }
});

module.exports = Product;
module.exports.routes = { calculateBufferStock, checkStockAlerts, addProduct, generateSyntheticSales, initializeProducts };