/**
 * KalaSetu Marketplace End-to-End API Test Suite
 */
const http = require('http');

const PORT = 5000;
const BASE_URL = `http://localhost:${PORT}/api`;

const request = (path, method = 'GET', body = null, token = null) => {
  return new Promise((resolve, reject) => {
    const url = new URL(BASE_URL + path);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });

    req.on('error', (err) => reject(err));

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
};

async function runTests() {
  console.log('🧪 Starting KalaSetu Two-Sided Marketplace API Tests...\n');
  let passed = 0;
  let failed = 0;

  function assert(condition, testName) {
    if (condition) {
      console.log(`  ✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${testName}`);
      failed++;
    }
  }

  try {
    // 1. Health check
    console.log('1️⃣ Testing Health Check Endpoint:');
    const health = await request('/health');
    assert(health.status === 200 && health.data?.version === '2.0.0', 'GET /api/health returned healthy 2.0.0');

    // 2. Auth: Register Buyer
    console.log('\n2️⃣ Testing Two-Sided Auth (Artisan & Buyer):');
    const buyerEmail = `buyer_${Date.now()}@kalasetu.test`;
    const regBuyerRes = await request('/auth/register', 'POST', {
      name: 'Ananya Roy',
      email: buyerEmail,
      password: 'password123',
      role: 'buyer',
      location: 'Kolkata, WB',
      shippingAddress: {
        fullName: 'Ananya Roy',
        phone: '+91 98300 11223',
        street: 'Salt Lake Sector 5',
        city: 'Kolkata',
        state: 'West Bengal',
        postalCode: '700091'
      }
    });
    assert(regBuyerRes.status === 201 && regBuyerRes.data?.user?.role === 'buyer', 'POST /api/auth/register creates buyer account');
    const buyerToken = regBuyerRes.data?.token;

    // 3. Demo Logins
    const demoArtisanRes = await request('/auth/demo', 'POST', { role: 'artisan' });
    assert(demoArtisanRes.status === 200 && demoArtisanRes.data?.user?.name === 'Radha Devi', 'POST /api/auth/demo logs in as Radha Devi (Artisan)');
    const artisanToken = demoArtisanRes.data?.token;

    const demoBuyerRes = await request('/auth/demo', 'POST', { role: 'buyer' });
    assert(demoBuyerRes.status === 200 && demoBuyerRes.data?.user?.name === 'Priya Sharma', 'POST /api/auth/demo logs in as Priya Sharma (Buyer)');

    // 4. Artisans API
    console.log('\n3️⃣ Testing Artisans Directory:');
    const artisansRes = await request('/artisans');
    assert(artisansRes.status === 200 && artisansRes.data?.data?.length >= 5, 'GET /api/artisans returns featured master artisans');

    const singleArtisanRes = await request('/artisans/65e000000000000000000001');
    assert(singleArtisanRes.status === 200 && singleArtisanRes.data?.data?.name === 'Radha Devi', 'GET /api/artisans/:id returns artisan with catalog');

    // 5. Products & Regional Filtering
    console.log('\n4️⃣ Testing Marketplace Products & Filters:');
    const allProducts = await request('/products');
    assert(allProducts.status === 200 && allProducts.data?.data?.length >= 6, 'GET /api/products returns all products');

    const filteredRegion = await request('/products?region=Rajasthan');
    assert(filteredRegion.status === 200 && filteredRegion.data?.data?.length > 0, 'GET /api/products?region=Rajasthan filters correctly');

    const categoryParam = encodeURIComponent('Textiles & Handloom');
    const filteredCategory = await request(`/products?category=${categoryParam}`);
    assert(filteredCategory.status === 200 && filteredCategory.data?.data?.length > 0, 'GET /api/products?category=... filters correctly');

    // 6. Cart Management
    console.log('\n5️⃣ Testing Shopping Cart APIs:');
    const addToCartRes = await request('/cart', 'POST', {
      productId: '65e000000000000000000101',
      name: 'Jaipur Blue Pottery Royal Floral Vase',
      price: 1850,
      quantity: 2,
      imageUrl: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80',
      artisanName: 'Radha Devi'
    }, buyerToken);
    assert(addToCartRes.status === 200 && addToCartRes.data?.data?.length > 0, 'POST /api/cart adds items with quantity');

    const getCartRes = await request('/cart', 'GET', null, buyerToken);
    assert(getCartRes.status === 200 && getCartRes.data?.data?.length > 0, 'GET /api/cart returns user cart items');

    // 7. Favourites / Wishlist
    console.log('\n6️⃣ Testing Favourites / Wishlist:');
    const favToggleRes = await request('/favourites/65e000000000000000000102', 'POST', null, buyerToken);
    assert(favToggleRes.status === 200 && favToggleRes.data?.isFavourite === true, 'POST /api/favourites/:id saves item to wishlist');

    const getFavsRes = await request('/favourites', 'GET', null, buyerToken);
    assert(getFavsRes.status === 200 && getFavsRes.data?.productIds?.includes('65e000000000000000000102'), 'GET /api/favourites lists saved items');

    // 8. Orders Creation & Tracking
    console.log('\n7️⃣ Testing Orders & Purchase Requests:');
    const orderCreateRes = await request('/orders', 'POST', {
      items: [
        {
          productId: '65e000000000000000000101',
          name: 'Jaipur Blue Pottery Royal Floral Vase',
          price: 1850,
          quantity: 1,
          artisanId: '65e000000000000000000001',
          artisanName: 'Radha Devi'
        }
      ],
      shippingAddress: {
        fullName: 'Ananya Roy',
        phone: '+91 98300 11223',
        street: 'Salt Lake Sector 5',
        city: 'Kolkata',
        state: 'West Bengal',
        postalCode: '700091'
      },
      paymentMethod: 'upi',
      notes: 'Gift wrap please'
    }, buyerToken);
    assert(orderCreateRes.status === 201 && orderCreateRes.data?.data?.orderNumber?.startsWith('KS-'), 'POST /api/orders places new order with order number');
    const createdOrderId = orderCreateRes.data?.data?.id || orderCreateRes.data?.data?._id;

    // Buyer view orders
    const buyerOrdersRes = await request('/orders/buyer', 'GET', null, buyerToken);
    assert(buyerOrdersRes.status === 200 && buyerOrdersRes.data?.data?.length > 0, 'GET /api/orders/buyer returns buyer order history');

    // Artisan view incoming orders
    const artisanOrdersRes = await request('/orders/artisan', 'GET', null, artisanToken);
    assert(artisanOrdersRes.status === 200 && artisanOrdersRes.data?.data?.length > 0, 'GET /api/orders/artisan returns incoming orders for artisan');

    // Update order status
    const updateStatusRes = await request(`/orders/${createdOrderId}/status`, 'PATCH', {
      orderStatus: 'in_crafting'
    }, artisanToken);
    assert(updateStatusRes.status === 200 && updateStatusRes.data?.data?.orderStatus === 'in_crafting', 'PATCH /api/orders/:id/status updates order status');

    console.log(`\n======================================================`);
    console.log(`📊 Two-Sided Marketplace Test Summary: ${passed} passed, ${failed} failed.`);
    console.log(`======================================================\n`);

    if (failed > 0) {
      process.exit(1);
    } else {
      process.exit(0);
    }
  } catch (error) {
    console.error('Test execution failed with error:', error.message);
    process.exit(1);
  }
}

// Start backend server in subprocess and run tests
const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting KalaSetu 2.0 backend instance for automated testing...');
const serverProcess = spawn('node', [path.join(__dirname, '../src/server.js')], {
  env: { ...process.env, PORT: '5000' }
});

serverProcess.stdout.on('data', (d) => {
  const str = d.toString();
  if (str.includes('KalaSetu 2.0 Backend Server running')) {
    setTimeout(runTests, 500);
  }
});

serverProcess.stderr.on('data', (d) => console.error(d.toString()));

process.on('exit', () => {
  serverProcess.kill();
});
