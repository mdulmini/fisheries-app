/*const Product = require('../models/Product');

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getProducts };*/



/*const Product = require('../models/Product');

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ category: 'Fish' });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addProduct = async (req, res) => {
  const { name, price, image, stock, bufferStock, category } = req.body;
  try {
    const product = new Product({
      name,
      price: parseFloat(price),
      image,
      stock: parseInt(stock) || 0,
      bufferStock: parseInt(bufferStock) || 0,
      category: category || 'Fish'
    });
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const buyProduct = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }
    if (quantity > product.bufferStock) {
      return res.status(400).json({ message: `Cannot buy more than buffer stock (${product.bufferStock}kg)` });
    }
    product.stock -= quantity;
    product.sales += quantity;
    await product.save();
    res.status(200).json({ message: 'Purchase successful', product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const initializeProducts = async (req, res) => {
  const productsList = [
    { name: 'Tuna (Thalapath)', price: 2500, image: 'src/assets/tuna.jpg', category: 'Fish', description: 'Fresh Tuna from Negombo', stock: 1500, bufferStock: 1000 },
    { name: 'Prawns (Isso)', price: 3000, image: 'src/assets/prawns.jpg', category: 'Fish', description: 'King Prawns from Chilaw', stock: 2000, bufferStock: 2000 },
    { name: 'Salmon (Imported)', price: 3500, image: 'src/assets/salmon.jpg', category: 'Fish', description: 'Imported Fresh Salmon', stock: 1000, bufferStock: 500 },
    { name: 'Seer Fish (Paraw)', price: 2000, image: 'src/assets/seer.jpg', category: 'Fish', description: 'Seer Fish from Galle', stock: 1200, bufferStock: 800 },
    { name: 'Mullet (Gal Malu)', price: 1500, image: 'src/assets/mullet.jpg', category: 'Fish', description: 'Mullet from Trincomalee', stock: 1000, bufferStock: 600 },
    { name: 'Sardine (Hurulla)', price: 800, image: 'src/assets/sardine.jpg', category: 'Fish', description: 'Sardines from Matara', stock: 2000, bufferStock: 1000 },
    { name: 'Trevally (Parai)', price: 1800, image: 'src/assets/trevally.jpg', category: 'Fish', description: 'Trevally from Jaffna', stock: 1500, bufferStock: 700 },
    { name: 'Mackerel (Kumbalawa)', price: 1200, image: 'src/assets/mackerel.jpg', category: 'Fish', description: 'Mackerel from Kalutara', stock: 1800, bufferStock: 900 },
    { name: 'Tilapia', price: 900, image: 'src/assets/tilapia.jpg', category: 'Fish', description: 'Tilapia from local farms', stock: 2000, bufferStock: 1000 },
    { name: 'Cuttlefish (Della)', price: 1600, image: 'src/assets/cuttlefish.jpg', category: 'Fish', description: 'Cuttlefish from Mannar', stock: 1300, bufferStock: 600 },
    { name: 'Crab (Kakuluwo)', price: 2200, image: 'src/assets/crab.jpg', category: 'Fish', description: 'Fresh Crabs from Chilaw', stock: 1100, bufferStock: 500 },
    { name: 'Squid (Kooni)', price: 1400, image: 'src/assets/squid.jpg', category: 'Fish', description: 'Squid from Negombo', stock: 1600, bufferStock: 800 }
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

const generateSyntheticSales = async (req, res) => {
  try {
    const products = await Product.find();
    for (let product of products) {
      const dailySales = Math.floor(Math.random() * 51);
      product.sales += dailySales;
      product.stock -= dailySales;
      if (product.stock < 0) product.stock = 0;
      await product.save();
    }
    res.status(200).json({ message: 'Synthetic sales generated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMostSoldFish = async (req, res) => {
  try {
    const products = await Product.find({ category: 'Fish' }).sort({ sales: -1 }).limit(1);
    res.json(products[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const checkStockAlerts = async (req, res) => {
  try {
    const products = await Product.find({ category: 'Fish' });
    const alerts = [];
    for (let product of products) {
      if (product.stock === 0) {
        alerts.push({ name: product.name, message: `Out of stock for ${product.name}. Alert for tomorrow!` });
      } else if (product.stock < product.bufferStock) {
        alerts.push({ name: product.name, message: `Low stock for ${product.name}. Current: ${product.stock}kg, Buffer: ${product.bufferStock}kg` });
      }
    }
    res.json({ alerts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getProducts, addProduct, buyProduct, initializeProducts, generateSyntheticSales, getMostSoldFish, checkStockAlerts };*/



/*const Product = require('../models/Product');

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ category: 'Fish' });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addProduct = async (req, res) => {
  const { name, price, image, stock, bufferStock, category } = req.body;
  try {
    const product = new Product({
      name,
      price: parseFloat(price),
      image,
      stock: parseInt(stock) || 0,
      bufferStock: parseInt(bufferStock) || 0,
      category: category || 'Fish'
    });
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const buyProduct = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }
    if (quantity > product.bufferStock) {
      return res.status(400).json({ message: `Cannot buy more than buffer stock (${product.bufferStock}kg)` });
    }
    product.stock -= quantity;
    product.sales += quantity;
    await product.save();
    res.status(200).json({ message: 'Purchase successful', product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const initializeProducts = async (req, res) => {
  const productsList = [
    { name: 'Tuna (Thalapath)', price: 2500, image: 'src/assets/tuna.jpg', category: 'Fish', description: 'Fresh Tuna from Negombo', stock: 1500, bufferStock: 1000 },
    { name: 'Prawns (Isso)', price: 3000, image: 'src/assets/prawns.jpg', category: 'Fish', description: 'King Prawns from Chilaw', stock: 2000, bufferStock: 2000 },
    { name: 'Salmon (Imported)', price: 3500, image: 'src/assets/salmon.jpg', category: 'Fish', description: 'Imported Fresh Salmon', stock: 1000, bufferStock: 500 },
    { name: 'Seer Fish (Paraw)', price: 2000, image: 'src/assets/seer.jpg', category: 'Fish', description: 'Seer Fish from Galle', stock: 1200, bufferStock: 800 },
    { name: 'Mullet (Gal Malu)', price: 1500, image: 'src/assets/mullet.jpg', category: 'Fish', description: 'Mullet from Trincomalee', stock: 1000, bufferStock: 600 },
    { name: 'Sardine (Hurulla)', price: 800, image: 'src/assets/sardine.jpg', category: 'Fish', description: 'Sardines from Matara', stock: 2000, bufferStock: 1000 },
    { name: 'Trevally (Parai)', price: 1800, image: 'src/assets/trevally.jpg', category: 'Fish', description: 'Trevally from Jaffna', stock: 1500, bufferStock: 700 },
    { name: 'Mackerel (Kumbalawa)', price: 1200, image: 'src/assets/mackerel.jpg', category: 'Fish', description: 'Mackerel from Kalutara', stock: 1800, bufferStock: 900 },
    { name: 'Tilapia', price: 900, image: 'src/assets/tilapia.jpg', category: 'Fish', description: 'Tilapia from local farms', stock: 2000, bufferStock: 1000 },
    { name: 'Cuttlefish (Della)', price: 1600, image: 'src/assets/cuttlefish.jpg', category: 'Fish', description: 'Cuttlefish from Mannar', stock: 1300, bufferStock: 600 },
    { name: 'Crab (Kakuluwo)', price: 2200, image: 'src/assets/crab.jpg', category: 'Fish', description: 'Fresh Crabs from Chilaw', stock: 1100, bufferStock: 500 },
    { name: 'Squid (Kooni)', price: 1400, image: 'src/assets/squid.jpg', category: 'Fish', description: 'Squid from Negombo', stock: 1600, bufferStock: 800 }
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

const generateSyntheticSales = async (req, res) => {
  try {
    const products = await Product.find();
    for (let product of products) {
      const dailySales = Math.floor(Math.random() * 51);
      product.sales += dailySales;
      product.stock -= dailySales;
      if (product.stock < 0) product.stock = 0;
      await product.save();
    }
    res.status(200).json({ message: 'Synthetic sales generated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMostSoldFish = async (req, res) => {
  try {
    const products = await Product.find({ category: 'Fish' }).sort({ sales: -1 }).limit(1);
    res.json(products[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const checkStockAlerts = async (req, res) => {
  try {
    const products = await Product.find({ category: 'Fish' });
    const alerts = [];
    for (let product of products) {
      if (product.stock === 0) {
        alerts.push({ name: product.name, message: `Out of stock for ${product.name}. Alert for tomorrow!` });
      } else if (product.stock < product.bufferStock) {
        alerts.push({ name: product.name, message: `Low stock for ${product.name}. Current: ${product.stock}kg, Buffer: ${product.bufferStock}kg` });
      }
    }
    res.json({ alerts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getProducts, addProduct, buyProduct, initializeProducts, generateSyntheticSales, getMostSoldFish, checkStockAlerts };*/









const Product = require('../models/Product');

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ category: 'Fish' });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addProduct = async (req, res) => {
  const { name, price, image, stock, bufferStock, category } = req.body;
  try {
    const product = new Product({
      name,
      price: parseFloat(price),
      image,
      stock: parseInt(stock) || 0,
      bufferStock: parseInt(bufferStock) || 0,
      category: category || 'Fish'
    });
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const buyProduct = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }
    if (quantity > product.bufferStock) {
      return res.status(400).json({ message: `Cannot buy more than buffer stock (${product.bufferStock}kg)` });
    }
    product.stock -= quantity;
    product.sales += quantity;
    await product.save();
    res.status(200).json({ message: 'Purchase successful', product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const initializeProducts = async (req, res) => {
  const productsList = [
    { name: 'Tuna (Thalapath)', price: 2500, image: 'src/assets/tuna.jpg', category: 'Fish', description: 'Fresh Tuna from Negombo', stock: 1500, bufferStock: 1000 },
    { name: 'Prawns (Isso)', price: 3000, image: 'src/assets/prawns.jpg', category: 'Fish', description: 'King Prawns from Chilaw', stock: 2000, bufferStock: 2000 },
    { name: 'Salmon (Imported)', price: 3500, image: 'src/assets/salmon.jpg', category: 'Fish', description: 'Imported Fresh Salmon', stock: 1000, bufferStock: 500 },
    { name: 'Seer Fish (Paraw)', price: 2000, image: 'src/assets/seer.jpg', category: 'Fish', description: 'Seer Fish from Galle', stock: 1200, bufferStock: 800 },
    { name: 'Mullet (Gal Malu)', price: 1500, image: 'src/assets/mullet.jpg', category: 'Fish', description: 'Mullet from Trincomalee', stock: 1000, bufferStock: 600 },
    { name: 'Sardine (Hurulla)', price: 800, image: 'src/assets/sardine.jpg', category: 'Fish', description: 'Sardines from Matara', stock: 2000, bufferStock: 1000 },
    { name: 'Trevally (Parai)', price: 1800, image: 'src/assets/trevally.jpg', category: 'Fish', description: 'Trevally from Jaffna', stock: 1500, bufferStock: 700 },
    { name: 'Mackerel (Kumbalawa)', price: 1200, image: 'src/assets/mackerel.jpg', category: 'Fish', description: 'Mackerel from Kalutara', stock: 1800, bufferStock: 900 },
    { name: 'Tilapia', price: 900, image: 'src/assets/tilapia.jpg', category: 'Fish', description: 'Tilapia from local farms', stock: 2000, bufferStock: 1000 },
    { name: 'Cuttlefish (Della)', price: 1600, image: 'src/assets/cuttlefish.jpg', category: 'Fish', description: 'Cuttlefish from Mannar', stock: 1300, bufferStock: 600 },
    { name: 'Crab (Kakuluwo)', price: 2200, image: 'src/assets/crab.jpg', category: 'Fish', description: 'Fresh Crabs from Chilaw', stock: 1100, bufferStock: 500 },
    { name: 'Squid (Kooni)', price: 1400, image: 'src/assets/squid.jpg', category: 'Fish', description: 'Squid from Negombo', stock: 1600, bufferStock: 800 },
    { name: 'Shark (Mora)', price: 2800, image: 'src/assets/shark.jpg', category: 'Fish', description: 'Shark from deep sea', stock: 800, bufferStock: 400 },
    { name: 'Red Snapper (Rathu Paraw)', price: 2200, image: 'src/assets/redsnapper.jpg', category: 'Fish', description: 'Red Snapper from Galle', stock: 900, bufferStock: 500 },
    { name: 'Barracuda (Jeela)', price: 1900, image: 'src/assets/barracuda.jpg', category: 'Fish', description: 'Barracuda from Jaffna', stock: 1000, bufferStock: 600 },
    { name: 'Herring (Salaya)', price: 700, image: 'src/assets/herring.jpg', category: 'Fish', description: 'Herring from Matara', stock: 2200, bufferStock: 1000 },
    { name: 'Anchovy (Halmessa)', price: 600, image: 'src/assets/anchovy.jpg', category: 'Fish', description: 'Anchovy from Negombo', stock: 2500, bufferStock: 1200 },
    { name: 'Pomfret (Sudda)', price: 2300, image: 'src/assets/pomfret.jpg', category: 'Fish', description: 'Pomfret from Chilaw', stock: 1100, bufferStock: 700 },
    { name: 'Milkfish (Valavalli)', price: 1300, image: 'src/assets/milkfish.jpg', category: 'Fish', description: 'Milkfish from Puttalam', stock: 1400, bufferStock: 800 },
    { name: 'Yellowfin Tuna (Kelawalla)', price: 2400, image: 'src/assets/yellowfintuna.jpg', category: 'Fish', description: 'Yellowfin Tuna from Mirissa', stock: 1300, bufferStock: 700 },
    { name: 'Grouper (Gal Balla)', price: 2600, image: 'src/assets/grouper.jpg', category: 'Fish', description: 'Grouper from Trincomalee', stock: 900, bufferStock: 500 },
    { name: 'Swordfish (Sappara)', price: 2700, image: 'src/assets/swordfish.jpg', category: 'Fish', description: 'Swordfish from deep sea', stock: 800, bufferStock: 400 },
    { name: 'Catfish (Weli Kossa)', price: 1100, image: 'src/assets/catfish.jpg', category: 'Fish', description: 'Catfish from inland waters', stock: 1500, bufferStock: 800 },
    { name: 'Threadfin (Rawan)', price: 2000, image: 'src/assets/threadfin.jpg', category: 'Fish', description: 'Threadfin from Colombo', stock: 1200, bufferStock: 600 },
    { name: 'Lobster (Pithu Isso)', price: 3500, image: 'src/assets/lobster.jpg', category: 'Fish', description: 'Lobster from Batticaloa', stock: 700, bufferStock: 300 }
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

const generateSyntheticSales = async (req, res) => {
  try {
    const products = await Product.find();
    for (let product of products) {
      const dailySales = Math.floor(Math.random() * 51);
      product.sales += dailySales;
      product.stock -= dailySales;
      if (product.stock < 0) product.stock = 0;
      await product.save();
    }
    res.status(200).json({ message: 'Synthetic sales generated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMostSoldFish = async (req, res) => {
  try {
    const products = await Product.find({ category: 'Fish' }).sort({ sales: -1 }).limit(1);
    res.json(products[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const checkStockAlerts = async (req, res) => {
  try {
    const products = await Product.find({ category: 'Fish' });
    const alerts = [];
    for (let product of products) {
      if (product.stock === 0) {
        alerts.push({ name: product.name, message: `Out of stock for ${product.name}. Alert for tomorrow!` });
      } else if (product.stock < product.bufferStock) {
        alerts.push({ name: product.name, message: `Low stock for ${product.name}. Current: ${product.stock}kg, Buffer: ${product.bufferStock}kg` });
      }
    }
    res.json({ alerts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const calculateBufferStock = async (req, res) => {
  try {
    const products = await Product.find({ category: 'Fish' });
    const sales = await Sale.find();

    const bufferStocks = [];
    for (let product of products) {
      const productSales = sales.filter(sale => sale.productId.toString() === product._id.toString());
      const totalSales = productSales.reduce((sum, sale) => sum + sale.quantity, 0);
      const days = [...new Set(productSales.map(sale => new Date(sale.saleDate).toDateString()))].length || 1;
      const avgDailySales = totalSales / days;
      const safetyStock = avgDailySales * 0.1; // 10% safety stock
      const leadTime = 1; // 1 day lead time
      const bufferStock = (avgDailySales * leadTime) + safetyStock;

      bufferStocks.push({
        name: product.name,
        avgDailySales: avgDailySales.toFixed(2),
        bufferStock: bufferStock.toFixed(2)
      });
    }

    res.json(bufferStocks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Export the new function
module.exports = { getProducts, addProduct, buyProduct, initializeProducts, generateSyntheticSales, getMostSoldFish, checkStockAlerts, calculateBufferStock };







