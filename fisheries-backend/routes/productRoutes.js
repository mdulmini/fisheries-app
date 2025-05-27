/*const express = require('express');
const router = express.Router();
const { getProducts } = require('../controllers/productController');

router.get('/products', getProducts);

module.exports = router;*/





// routes/productRoutes.js
/*const express = require('express');
const router = express.Router();
const { getProducts, addProduct, buyProduct, initializeProducts, generateSyntheticSales, getMostSoldFish, checkStockAlerts } = require('../controllers/productController');

router.get('/products', getProducts); // Matches /api/products
router.post('/products', addProduct); // Matches /api/products (POST for adding)
router.post('/buy', buyProduct); // Matches /api/buy
router.post('/initialize-products', initializeProducts); // Matches /api/initialize-products
router.post('/generate-sales', generateSyntheticSales); // Matches /api/generate-sales
router.get('/products/most-sold', getMostSoldFish); // Matches /api/products/most-sold
router.get('/products/alerts', checkStockAlerts); // Matches /api/products/alerts

module.exports = router;*/



const express = require('express');
const router = express.Router();
const { getProducts, addProduct, buyProduct, initializeProducts, generateSyntheticSales, getMostSoldFish, checkStockAlerts, calculateBufferStock } = require('../controllers/productController');



router.get('/products', getProducts);
router.post('/products', addProduct);
router.post('/buy', buyProduct);
router.post('/products/initialize', initializeProducts);
router.post('/generate-sales', generateSyntheticSales);
router.get('/products/most-sold', getMostSoldFish);
router.get('/products/alerts', checkStockAlerts);
router.get('/products/buffer', calculateBufferStock); // New endpoint for buffer stock calculation

module.exports = router;