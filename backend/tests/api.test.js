/**
 * KalaSetu End-to-End Backend API Test Suite
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
  console.log('🧪 Starting KalaSetu Backend API Tests...\n');
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
    assert(health.status === 200 && health.data?.status === 'healthy', 'GET /api/health returned healthy');

    // 2. Auth: Register
    console.log('\n2️⃣ Testing Authentication (Register & Login):');
    const uniqueEmail = `artisan_${Date.now()}@kalasetu.test`;
    const regRes = await request('/auth/register', 'POST', {
      name: 'Sunil Sharma',
      email: uniqueEmail,
      password: 'password123',
      craftSpecialty: 'Saharanpur Wood Carving',
      location: 'Saharanpur, UP'
    });
    assert(regRes.status === 201 && regRes.data?.success, 'POST /api/auth/register creates new artisan');
    const authToken = regRes.data?.token;

    // 3. Auth: Login
    const loginRes = await request('/auth/login', 'POST', {
      email: uniqueEmail,
      password: 'password123'
    });
    assert(loginRes.status === 200 && loginRes.data?.user?.name === 'Sunil Sharma', 'POST /api/auth/login succeeds');

    // 4. Products: List
    console.log('\n3️⃣ Testing Products API (CRUD):');
    const prodList = await request('/products');
    assert(prodList.status === 200 && Array.isArray(prodList.data?.data) && prodList.data.data.length >= 6, 'GET /api/products returns seed products');

    // 5. Products: Create
    const createRes = await request('/products', 'POST', {
      name: 'Handcrafted Sheesham Coaster Set',
      description: 'Set of 6 wooden tea coasters with brass inlay.',
      category: 'Woodwork & Carvings',
      material: 'Sheesham Wood, Brass',
      dimensions: '4 x 4 x 0.5 inches',
      weight: '300g',
      price: 650,
      imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
      location: 'Saharanpur, UP'
    }, authToken);
    assert(createRes.status === 201 && createRes.data?.data?.name.includes('Coaster'), 'POST /api/products creates new product');
    const newProductId = createRes.data?.data?._id || createRes.data?.data?.id;

    // 6. Products: Get by ID
    const getSingle = await request(`/products/${newProductId}`);
    assert(getSingle.status === 200 && getSingle.data?.data?.price === 650, `GET /api/products/:id fetches created product`);

    // 7. Products: Toggle Status
    const toggleRes = await request(`/products/${newProductId}/toggle-status`, 'PATCH', {}, authToken);
    assert(toggleRes.status === 200 && toggleRes.data?.data?.status === 'sold', 'PATCH /api/products/:id/toggle-status marks as sold');

    // 8. AI: Catalog Generator (Multilingual EN + HI)
    console.log('\n4️⃣ Testing AI Capabilities:');
    const catalogRes = await request('/ai/catalog', 'POST', {
      name: 'Jaipur Blue Pottery Ceramic Bowl',
      description: 'Hand-thrown quartz clay bowl with floral cobalt glaze.',
      category: 'Pottery & Ceramics',
      material: 'Quartz powder, natural glazes',
      craftType: 'Jaipur Blue Pottery',
      location: 'Jaipur, Rajasthan',
      artisanName: 'Radha Devi'
    }, authToken);
    assert(
      catalogRes.status === 200 &&
      catalogRes.data?.data?.englishDescription &&
      catalogRes.data?.data?.hindiDescription &&
      catalogRes.data?.data?.seoKeywords?.length > 0,
      'POST /api/ai/catalog generates English, Hindi, and SEO tags'
    );

    // 9. AI: Price Suggestion
    const priceRes = await request('/ai/price-suggestion', 'POST', {
      category: 'Woodwork & Carvings',
      material: 'Sheesham Wood',
      rawMaterialCost: 200,
      productionCost: 300,
      laborHours: 5,
      craftComplexity: 'intricate'
    }, authToken);
    assert(
      priceRes.status === 200 &&
      priceRes.data?.data?.minimumPrice > 200 &&
      priceRes.data?.data?.recommendedPrice > priceRes.data?.data?.minimumPrice &&
      priceRes.data?.data?.breakdown?.artisanNetProfit > 0,
      'POST /api/ai/price-suggestion calculates minimum, recommended, maximum prices with profit breakdown'
    );

    // 10. AI: Image Enhancement
    const enhanceRes = await request('/ai/enhance-image', 'POST', {
      imageUrl: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80',
      preset: 'studio-white'
    }, authToken);
    assert(
      enhanceRes.status === 200 &&
      enhanceRes.data?.data?.enhancedImageUrl &&
      enhanceRes.data?.data?.metrics?.ecommerceReadyScore,
      'POST /api/ai/enhance-image returns enhanced image and readiness metrics'
    );

    console.log(`\n========================================`);
    console.log(`📊 Test Summary: ${passed} passed, ${failed} failed.`);
    console.log(`========================================\n`);

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

// Start backend server in subprocess if needed or run directly
const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting KalaSetu backend instance for automated testing...');
const serverProcess = spawn('node', [path.join(__dirname, '../src/server.js')], {
  env: { ...process.env, PORT: '5000' }
});

serverProcess.stdout.on('data', (d) => {
  const str = d.toString();
  if (str.includes('KalaSetu Backend Server running')) {
    setTimeout(runTests, 500);
  }
});

serverProcess.stderr.on('data', (d) => console.error(d.toString()));

process.on('exit', () => {
  serverProcess.kill();
});
