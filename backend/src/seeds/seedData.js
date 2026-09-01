const { MASTER_ARTISANS } = require('../controllers/artisanController');

const SEED_PRODUCTS = [
  {
    _id: '65e000000000000000000101',
    id: '65e000000000000000000101',
    userId: '65e000000000000000000001',
    artisanId: '65e000000000000000000001',
    name: 'Jaipur Blue Pottery Royal Floral Vase',
    description: 'Traditional Jaipur Blue Pottery vase featuring classic Persian floral motifs. Hand-shaped from quartz stone, fuller\'s earth, and natural gum, fired at low heat with lead-free cobalt blue and turquoise glazes.',
    hindiDescription: 'पारंपरिक जयपुर ब्लू पॉटरी फूलदान, प्राकृतिक क्वार्ट्ज और सुरक्षित खनिज रंगों से हस्तनिर्मित। घर की सुंदरता और सांस्कृतिक उपहार के लिए सर्वोत्तम।',
    category: 'Pottery & Ceramics',
    material: 'Quartz Powder, Glass, Fuller’s Earth, Lead-Free Glaze',
    dimensions: '10 x 5 x 5 inches',
    weight: '750g',
    craftType: 'Jaipur Blue Pottery (GI Tagged)',
    location: 'Sanganer, Jaipur, Rajasthan',
    region: 'Rajasthan',
    price: 1850,
    imageUrl: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80',
    enhancedImageUrl: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1200&q=90&sat=20&con=15',
    status: 'active',
    artisanName: 'Radha Devi',
    aiCatalogData: {
      generatedTitle: 'Authentic Jaipur Blue Pottery Royal Floral Vase | Heritage Glazed Ceramic',
      generatedDescription: 'Exquisitely handcrafted by master potter Radha Devi in Jaipur, Rajasthan. Using an ancient technique combining quartz stone powder and botanical glazes, this vase reflects the timeless grandeur of Rajasthani craft.',
      englishDescription: 'Exquisitely handcrafted by master potter Radha Devi in Jaipur, Rajasthan. Using an ancient technique combining quartz stone powder and botanical glazes, this vase reflects the timeless grandeur of Rajasthani craft.',
      hindiDescription: 'पारंपरिक जयपुर ब्लू पॉटरी फूलदान, प्राकृतिक क्वार्ट्ज और सुरक्षित खनिज रंगों से हस्तनिर्मित। घर की सुंदरता और सांस्कृतिक उपहार के लिए सर्वोत्तम।',
      seoKeywords: ['jaipur blue pottery', 'handcrafted ceramic vase', 'rajasthan handicraft', 'blue pottery decor', 'fair trade pottery'],
      bulletPoints: [
        'GI Tagged Jaipur Blue Pottery authentic craftsmanship',
        '100% Lead-Free and eco-friendly natural mineral pigments',
        'Hand-painted floral motifs inspired by Mughal geometry',
        'Ideal centerpiece for living rooms and heritage collections'
      ],
      artisanStory: 'Radha Devi has practiced Blue Pottery for over 22 years, continuing a family lineage that supplied handcrafted ceramics to royal courts.',
      whatsappPitch: '✨ *Royal Jaipur Blue Pottery Vase* ✨\nHandmade by Radha Devi. Stunning cobalt-blue floral artwork for your living room! Direct artisan price: ₹1,850. DM to order!'
    },
    priceSuggestion: {
      minimumPrice: 1350,
      recommendedPrice: 1850,
      maximumPrice: 2450,
      rawMaterialCost: 400,
      productionCost: 550,
      explanation: 'Raw material quartz & glaze cost ₹400, plus 7 hours of intricate firing and painting at ₹550 fair wage. Recommended retail at ₹1,850 gives a sustainable 45% margin.'
    },
    createdAt: new Date('2026-08-15T10:30:00Z').toISOString()
  },
  {
    _id: '65e000000000000000000102',
    id: '65e000000000000000000102',
    userId: '65e000000000000000000003',
    artisanId: '65e000000000000000000003',
    name: 'Handwoven Kashmiri Pashmina Shawl with Sozni Needlework',
    description: 'Pure Grade-A Changthangi Cashmere Pashmina handspun on traditional Kashmiri Charkha and delicately embroidered with ultra-fine Sozni needlework depicting the iconic Chinar leaf motif.',
    hindiDescription: 'शुद्ध कश्मीरी पश्मीना शॉल, पारंपरिक सोज़नी सुई-कारीगरी और चिनार पत्ती डिज़ाइन के साथ हाथ से बुनी गई। अत्यंत कोमल, हल्की और गर्म।',
    category: 'Textiles & Handloom',
    material: '100% Pure Himalayan Pashmina Wool, Silk Thread',
    dimensions: '80 x 40 inches (Full Length)',
    weight: '210g',
    craftType: 'Kashmir Sozni Hand Embroidery (GI Tagged)',
    location: 'Srinagar, Jammu & Kashmir',
    region: 'Kashmir',
    price: 6400,
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    enhancedImageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=90&sat=15&con=10',
    status: 'active',
    artisanName: 'Bashir Ahmed',
    aiCatalogData: {
      generatedTitle: 'Pure Handwoven Kashmiri Pashmina Shawl with Fine Sozni Embroidery',
      generatedDescription: 'Experience royal warmth with this feather-light Kashmiri Pashmina shawl. Woven over 45 days in the Kashmir valley with gossamer-soft Changthangi mountain wool.',
      englishDescription: 'Experience royal warmth with this feather-light Kashmiri Pashmina shawl. Woven over 45 days in the Kashmir valley with gossamer-soft Changthangi mountain wool.',
      hindiDescription: 'शुद्ध कश्मीरी पश्मीना शॉल, पारंपरिक सोज़नी सुई-कारीगरी और चिनार पत्ती डिज़ाइन के साथ हाथ से बुनी गई।',
      seoKeywords: ['pure kashmiri pashmina', 'sozni embroidered shawl', 'handloom wool wrap', 'authentic kashmir craft', 'luxury artisanal gift'],
      bulletPoints: [
        'Certified 100% pure Himalayan Pashmina wool',
        'Over 120 hours of intricate hand needle embroidery',
        'Passes the legendary ring test for cashmere purity',
        'Heirloom quality piece with lifetime durability'
      ],
      artisanStory: 'Crafted by master weaver Bashir Ahmed, preserving the delicate centuries-old Sozni needlecraft of downtown Srinagar.',
      whatsappPitch: '🧣 *Authentic Kashmiri Pashmina Shawl* 🧣\nPure, handspun luxury wool with Sozni embroidery. Direct from Srinagar weaver: ₹6,400. Free shipping worldwide!'
    },
    priceSuggestion: {
      minimumPrice: 5200,
      recommendedPrice: 6400,
      maximumPrice: 8500,
      rawMaterialCost: 2200,
      productionCost: 2100,
      explanation: 'Raw Changthangi wool cost is ₹2,200, plus 45 days of artisan spinning and needlework. Suggested retail of ₹6,400 reflects fair artisan labor standards.'
    },
    createdAt: new Date('2026-08-18T14:20:00Z').toISOString()
  },
  {
    _id: '65e000000000000000000103',
    id: '65e000000000000000000103',
    userId: '65e000000000000000000004',
    artisanId: '65e000000000000000000004',
    name: 'Saharanpur Hand-Chiseled Sheesham Wood Elephant',
    description: 'Masterfully carved from solid seasoned Sheesham (Indian Rosewood) using traditional hand chisels. Features intricate lattice Jali undercut carving with a miniature baby elephant carved inside the belly.',
    hindiDescription: 'सहारनपुर के कुशल काष्ठ शिल्पियों द्वारा शीशम की ठोस लकड़ी से हाथ से तराशा गया जालीदार हाथी। अंदर एक छोटा बच्चा हाथी भी नक्काशीदार है।',
    category: 'Woodwork & Carvings',
    material: 'Seasoned Sheesham Wood, Natural Teak Polish',
    dimensions: '7 x 6 x 4 inches',
    weight: '620g',
    craftType: 'Saharanpur Undercut Jali Woodcraft',
    location: 'Saharanpur, Uttar Pradesh',
    region: 'Uttar Pradesh',
    price: 1450,
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    enhancedImageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=90',
    status: 'active',
    artisanName: 'Mohammad Rashid',
    aiCatalogData: {
      generatedTitle: 'Handcrafted Sheesham Wood Undercut Elephant with Inner Baby Figurine',
      generatedDescription: 'A marvel of traditional Indian woodwork from Saharanpur. Carved from a single block of dense Sheesham wood with open fretwork lattice that reveals an intricate inner sculpture.',
      englishDescription: 'A marvel of traditional Indian woodwork from Saharanpur. Carved from a single block of dense Sheesham wood with open fretwork lattice that reveals an intricate inner sculpture.',
      hindiDescription: 'सहारनपुर के कुशल काष्ठ शिल्पियों द्वारा शीशम की ठोस लकड़ी से हाथ से तराशा गया जालीदार हाथी।',
      seoKeywords: ['sheesham wood elephant', 'handcarved wooden handicraft', 'saharanpur undercut jali', 'indian rosewood decor', 'artisan wood carving'],
      bulletPoints: [
        'Single-piece solid Sheesham wood carving',
        'Features unique undercut mother-and-baby elephant design',
        'Treated with eco-friendly non-toxic natural wax polish',
        'Vastu & Feng Shui symbol of wisdom, strength, and prosperity'
      ],
      artisanStory: 'Rashid learned wood fretwork from his grandfather in Saharanpur, turning sustainable reclaimed wood into intricate cultural treasures.',
      whatsappPitch: '🐘 *Hand-Carved Wooden Elephant with Inner Baby* 🐘\nSolid Sheesham wood with intricate Jali lattice work. Bring auspicious artisan decor home for ₹1,450!'
    },
    priceSuggestion: {
      minimumPrice: 1100,
      recommendedPrice: 1450,
      maximumPrice: 1950,
      rawMaterialCost: 350,
      productionCost: 450,
      explanation: 'Seasoned Sheesham wood costs ₹350; 8 hours of undercut chisel work calculated at ₹450. Retail target ₹1,450 provides a healthy living wage.'
    },
    createdAt: new Date('2026-08-20T09:15:00Z').toISOString()
  },
  {
    _id: '65e000000000000000000104',
    id: '65e000000000000000000104',
    userId: '65e000000000000000000005',
    artisanId: '65e000000000000000000005',
    name: 'Madhubani Tree of Life Hand-Painted Tussar Silk Stole',
    description: 'Hand-painted in Mithila using bamboo nibs and natural plant dyes on pure organic Tussar silk. Depicts the sacred Kalpavriksha (Tree of Life) surrounded by joyful birds, fish, and auspicious nature symbols.',
    hindiDescription: 'प्राकृतिक रंगों और बांस की कलम से शुद्ध टसर सिल्क पर हाथ से चित्रित पारंपरिक मधुबनी "कल्पवृक्ष" दुपट्टा। मिथिला की प्राचीन लोककला।',
    category: 'Paintings & Folk Art',
    material: '100% Pure Organic Tussar Silk, Botanical Dyes',
    dimensions: '72 x 22 inches',
    weight: '160g',
    craftType: 'Mithila / Madhubani Folk Painting (GI Tagged)',
    location: 'Madhubani, Bihar',
    region: 'Bihar',
    price: 2200,
    imageUrl: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80',
    enhancedImageUrl: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1200&q=90',
    status: 'active',
    artisanName: 'Shanti Devi',
    aiCatalogData: {
      generatedTitle: 'Authentic Madhubani Hand-Painted Tussar Silk Stole | Tree of Life Motif',
      generatedDescription: 'Wear a living piece of ancient Bihar folklore. Hand-painted by rural women artisans in Madhubani using turmeric, indigo, and soot-derived natural pigments on raw golden Tussar silk.',
      englishDescription: 'Wear a living piece of ancient Bihar folklore. Hand-painted by rural women artisans in Madhubani using turmeric, indigo, and soot-derived natural pigments on raw golden Tussar silk.',
      hindiDescription: 'प्राकृतिक रंगों और बांस की कलम से शुद्ध टसर सिल्क पर हाथ से चित्रित पारंपरिक मधुबनी कल्पवृक्ष दुपट्टा।',
      seoKeywords: ['madhubani silk stole', 'hand painted tussar dupatta', 'mithila folk art', 'sustainable indian wearable art', 'fair trade women artisan'],
      bulletPoints: [
        '100% hand-painted by women artisan collectives in rural Bihar',
        'Pure indigenous Bhagalpuri Tussar silk base',
        'Colored with 100% natural botanical extracts',
        'Includes signed certificate of Madhubani authenticity'
      ],
      artisanStory: 'Shanti Devi leads a cooperative of 15 village women in Madhubani, empowering rural homemakers with financial independence through folk art.',
      whatsappPitch: '🎨 *Hand-Painted Madhubani Silk Stole* 🎨\nPure Tussar Silk with sacred Tree of Life painting. Support women artisans in Bihar directly: ₹2,200. DM to buy!'
    },
    priceSuggestion: {
      minimumPrice: 1750,
      recommendedPrice: 2200,
      maximumPrice: 2900,
      rawMaterialCost: 750,
      productionCost: 650,
      explanation: 'Raw Tussar silk costs ₹750, plus 12 hours of meticulous freehand painting. ₹2,200 allows fair wages directly to the women artisan collective.'
    },
    createdAt: new Date('2026-08-22T16:45:00Z').toISOString()
  },
  {
    _id: '65e000000000000000000105',
    id: '65e000000000000000000105',
    userId: '65e000000000000000000006',
    artisanId: '65e000000000000000000006',
    name: 'Bastar Dhokra Lost-Wax Cast Brass Tribal Musician',
    description: 'Cast by indigenous tribal artisans of Chhattisgarh using the 4,000-year-old non-ferrous Dhokra lost-wax casting technique. Depicts a traditional tribal dholak drummer with rustic wire-work contours.',
    hindiDescription: 'बस्तर छत्तीसगढ़ की ४००० वर्ष पुरानी ढोकरा ढलाई कला द्वारा हस्तनिर्मित पीतल का आदिवासी ढोलक वादक। दुर्लभ जनजातीय शिल्पकला।',
    category: 'Metalcraft & Brass',
    material: 'Recycled Brass Alloy, Beeswax, Clay Mold',
    dimensions: '8 x 4 x 3 inches',
    weight: '850g',
    craftType: 'Bastar Dhokra Lost-Wax Metal Art (GI Tagged)',
    location: 'Kondagaon, Bastar, Chhattisgarh',
    region: 'Chhattisgarh',
    price: 3200,
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    enhancedImageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=90',
    status: 'active',
    artisanName: 'Budhram Ghadwa',
    aiCatalogData: {
      generatedTitle: 'Bastar Dhokra Lost-Wax Handcast Brass Tribal Musician Figurine',
      generatedDescription: 'Handcast by indigenous Ghadwa tribal craftsmen in the dense forests of Bastar. Every statue requires a single-use clay mold, rendering each figurine truly unique in the world.',
      englishDescription: 'Handcast by indigenous Ghadwa tribal craftsmen in the dense forests of Bastar. Every statue requires a single-use clay mold, rendering each figurine truly unique in the world.',
      hindiDescription: 'बस्तर छत्तीसगढ़ की ४००० वर्ष पुरानी ढोकरा ढलाई कला द्वारा हस्तनिर्मित पीतल का आदिवासी ढोलक वादक।',
      seoKeywords: ['dhokra brass figurine', 'lost wax metal craft', 'bastar tribal art', 'indian antique brass sculpture', 'handcast brass decor'],
      bulletPoints: [
        'Crafted using Harappan-era 4,000-year-old lost-wax casting',
        'One-of-a-kind original piece - mold is broken to release the statue',
        'Made with high-purity recycled brass and forest beeswax',
        'Rustic antique patina adds timeless character to any shelf or mantel'
      ],
      artisanStory: 'Budhram is a fifth-generation Dhokra craftsman preserving tribal folklore and lost-wax smelting in rural Bastar.',
      whatsappPitch: '🎺 *Antique Bastar Dhokra Brass Musician* 🎺\n4000-year-old lost-wax metalcraft from Chhattisgarh! Direct artisan collectible: ₹3,200. Order yours today!'
    },
    priceSuggestion: {
      minimumPrice: 2400,
      recommendedPrice: 3200,
      maximumPrice: 4200,
      rawMaterialCost: 900,
      productionCost: 1100,
      explanation: 'Brass, pure beeswax, and furnace charcoal cost ₹900; 16 hours of smelting and wire detailing cost ₹1,100. ₹3,200 provides fair compensation for rare tribal mastery.'
    },
    createdAt: new Date('2026-08-25T11:00:00Z').toISOString()
  },
  {
    _id: '65e000000000000000000106',
    id: '65e000000000000000000106',
    userId: '65e000000000000000000001',
    artisanId: '65e000000000000000000001',
    name: 'Channapatna Eco-Friendly Lacquer Wooden Stacking Toy Set',
    description: 'Turned on traditional wood lathes from soft Wrightia tinctoria (Aale mara) wood and polished using non-toxic natural lacquer colored with vegetable and turmeric dyes. 100% baby-safe and splinter-free.',
    hindiDescription: 'चन्नपटना की पारंपरिक काष्ठ कला से निर्मित बच्चों का लकड़ी का रंगीन स्टैकिंग खिलौना। १००% सुरक्षित, प्राकृतिक हल्दी और वनस्पति रंगों से पॉलिश।',
    category: 'Woodwork & Carvings',
    material: 'Ivory Wood (Wrightia Tinctoria), Natural Lac Dye',
    dimensions: '9 x 4 x 4 inches',
    weight: '380g',
    craftType: 'Channapatna Lacquer Woodware (GI Tagged Toy-Town Craft)',
    location: 'Channapatna, Ramanagara, Karnataka',
    region: 'Karnataka',
    price: 950,
    imageUrl: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80',
    enhancedImageUrl: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=1200&q=90',
    status: 'sold',
    artisanName: 'Radha Devi',
    aiCatalogData: {
      generatedTitle: 'Channapatna Handcrafted Natural Lacquer Wooden Stacking Rings Toy',
      generatedDescription: 'Safe, sustainable, and heirloom-quality educational toy from India’s historic Toy Town of Channapatna. Polished with natural non-toxic lacquer extracted from tree resins and turmeric.',
      englishDescription: 'Safe, sustainable, and heirloom-quality educational toy from India’s historic Toy Town of Channapatna. Polished with natural non-toxic lacquer extracted from tree resins and turmeric.',
      hindiDescription: 'चन्नपटना की पारंपरिक काष्ठ कला से निर्मित बच्चों का लकड़ी का रंगीन स्टैकिंग खिलौना। १००% सुरक्षित, प्राकृतिक हल्दी और वनस्पति रंगों से पॉलिश।',
      seoKeywords: ['channapatna wooden toy', 'natural lacquer toy', 'non toxic montessori toy', 'karnataka artisan craft', 'eco friendly baby gift'],
      bulletPoints: [
        'Certified safe for toddlers - polished with organic plant dyes',
        'Hand-turned on precision wood lathes by master artisans',
        'Enhances fine motor coordination and spatial problem-solving',
        'Sustainably harvested light-weight ivory wood'
      ],
      artisanStory: 'Handcrafted toys keeping kids safe with organic wooden playware.',
      whatsappPitch: '🧸 *Eco-Safe Channapatna Wooden Toy Set* 🧸\n100% natural, non-toxic organic colors. Safe for babies & toddlers! Only ₹950.'
    },
    priceSuggestion: {
      minimumPrice: 750,
      recommendedPrice: 950,
      maximumPrice: 1250,
      rawMaterialCost: 220,
      productionCost: 280,
      explanation: 'Sustainably sourced soft wood and natural lac cost ₹220; lathe turning and polishing at ₹280. ₹950 is an attractive retail price point for conscious parents.'
    },
    createdAt: new Date('2026-08-27T08:30:00Z').toISOString()
  }
];

const SEED_SAMPLE_ORDERS = [
  {
    _id: 'ord_seed_101',
    id: 'ord_seed_101',
    orderNumber: 'KS-2026-8492',
    buyerId: '65e000000000000000000002',
    buyerName: 'Priya Sharma',
    buyerEmail: 'priya.sharma@buyer.com',
    buyerPhone: '+91 98111 22334',
    items: [
      {
        productId: '65e000000000000000000101',
        name: 'Jaipur Blue Pottery Royal Floral Vase',
        price: 1850,
        quantity: 1,
        imageUrl: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80',
        category: 'Pottery & Ceramics',
        artisanId: '65e000000000000000000001',
        artisanName: 'Radha Devi'
      }
    ],
    totalAmount: 1850,
    directArtisanShare: 1572,
    shippingAddress: {
      fullName: 'Priya Sharma',
      phone: '+91 98111 22334',
      street: 'Flat 402, Sea Breeze Apts, Perry Cross Road, Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      postalCode: '400050',
      country: 'India'
    },
    paymentMethod: 'upi',
    paymentStatus: 'completed',
    orderStatus: 'in_crafting',
    notes: 'Please pack with extra cushioning for fragile ceramic gift.',
    createdAt: new Date('2026-08-29T11:20:00Z').toISOString()
  },
  {
    _id: 'ord_seed_102',
    id: 'ord_seed_102',
    orderNumber: 'KS-2026-9214',
    buyerId: '65e000000000000000000002',
    buyerName: 'Priya Sharma',
    buyerEmail: 'priya.sharma@buyer.com',
    buyerPhone: '+91 98111 22334',
    items: [
      {
        productId: '65e000000000000000000103',
        name: 'Saharanpur Hand-Chiseled Sheesham Wood Elephant',
        price: 1450,
        quantity: 1,
        imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
        category: 'Woodwork & Carvings',
        artisanId: '65e000000000000000000004',
        artisanName: 'Mohammad Rashid'
      }
    ],
    totalAmount: 1450,
    directArtisanShare: 1232,
    shippingAddress: {
      fullName: 'Priya Sharma',
      phone: '+91 98111 22334',
      street: 'Flat 402, Sea Breeze Apts, Perry Cross Road, Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      postalCode: '400050',
      country: 'India'
    },
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    orderStatus: 'dispatched',
    notes: '',
    createdAt: new Date('2026-08-26T15:00:00Z').toISOString()
  }
];

const seedInitialData = async (Product, memoryStore, isConnected) => {
  try {
    if (isConnected) {
      const count = await Product.countDocuments();
      if (count === 0) {
        await Product.insertMany(SEED_PRODUCTS);
        console.log(`🌿 Seeded ${SEED_PRODUCTS.length} authentic Indian artisan products to MongoDB.`);
      }
    } else {
      // In-Memory store
      if (memoryStore.products.length === 0) {
        memoryStore.products = [...SEED_PRODUCTS];
        console.log(`🌿 Seeded ${SEED_PRODUCTS.length} authentic Indian artisan products to In-Memory store.`);
      }
      if (memoryStore.orders.length === 0) {
        memoryStore.orders = [...SEED_SAMPLE_ORDERS];
        console.log(`📦 Seeded ${SEED_SAMPLE_ORDERS.length} sample marketplace orders.`);
      }
    }
  } catch (error) {
    console.error('Error seeding product data:', error.message);
  }
};

module.exports = {
  SEED_PRODUCTS,
  SEED_SAMPLE_ORDERS,
  seedInitialData
};
