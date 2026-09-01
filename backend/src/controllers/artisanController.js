const User = require('../models/User');
const Product = require('../models/Product');
const { isConnectedToMongo, memoryStore } = require('../config/db');

// List of Master Artisans for instant showcase
const MASTER_ARTISANS = [
  {
    id: '65e000000000000000000001',
    _id: '65e000000000000000000001',
    name: 'Radha Devi',
    craftSpecialty: 'Jaipur Traditional Blue Pottery',
    craftLineage: '3rd-generation heritage potter of Sanganer',
    experienceYears: 22,
    location: 'Sanganer, Jaipur, Rajasthan',
    region: 'Rajasthan',
    bio: 'Specializing in GI-tagged quartz pottery, Persian turquoise glazes, and eco-friendly lead-free botanical colors. Mentoring 12 village women in ceramic craft.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    awards: 'National Handicrafts Merit Certificate (2018), State Master Artisan Honor'
  },
  {
    id: '65e000000000000000000003',
    _id: '65e000000000000000000003',
    name: 'Bashir Ahmed',
    craftSpecialty: 'Kashmiri Handspun Pashmina & Sozni Needlework',
    craftLineage: 'Downtown Srinagar handloom weavers cooperative',
    experienceYears: 34,
    location: 'Downtown, Srinagar, Jammu & Kashmir',
    region: 'Kashmir',
    bio: 'Weaving certified Changthangi cashmere on heritage pit-looms with microscopic single-needle Sozni botanical embroidery.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    awards: 'Kashmir Handloom Guild Master Weaver Award'
  },
  {
    id: '65e000000000000000000004',
    _id: '65e000000000000000000004',
    name: 'Mohammad Rashid',
    craftSpecialty: 'Saharanpur Solid Sheesham Jali Woodcraft',
    craftLineage: 'Saharanpur Wood Carvers Guild',
    experienceYears: 19,
    location: 'Saharanpur, Uttar Pradesh',
    region: 'Uttar Pradesh',
    bio: 'Specialist in single-block undercut lattice fretwork (Jali) creating mother-and-baby elephant sculptures from sustainably seasoned wood.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    awards: 'All-India Wood Carving Excellence Award'
  },
  {
    id: '65e000000000000000000005',
    _id: '65e000000000000000000005',
    name: 'Shanti Devi',
    craftSpecialty: 'Mithila / Madhubani Folk Art on Silk',
    craftLineage: 'Madhubani Rural Women Collective',
    experienceYears: 27,
    location: 'Madhubani, Bihar',
    region: 'Bihar',
    bio: 'Painting sacred Kalpavriksha (Tree of Life) narratives on Bhagalpuri Tussar silk using bamboo pens and botanical plant dyes.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    awards: 'State Shilpi Award, Women Entrepreneurship in Arts'
  },
  {
    id: '65e000000000000000000006',
    _id: '65e000000000000000000006',
    name: 'Budhram Ghadwa',
    craftSpecialty: 'Bastar Lost-Wax Cast Dhokra Metalcraft',
    craftLineage: 'Ancient Ghadwa tribal lost-wax metallurgy',
    experienceYears: 30,
    location: 'Kondagaon, Bastar, Chhattisgarh',
    region: 'Chhattisgarh',
    bio: 'Practicing 4,000-year-old Harappan-era lost-wax brass casting where each single-use beeswax mold yields a truly unique antique sculpture.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    awards: 'Tribal Cultural Heritage Master Artist'
  }
];

/**
 * @route GET /api/artisans
 * @desc Get list of all featured master artisans with their product counts
 */
const getArtisans = async (req, res) => {
  try {
    const products = isConnectedToMongo() ? await Product.find() : memoryStore.products;

    const artisansList = MASTER_ARTISANS.map(artisan => {
      const artisanProducts = products.filter(p =>
        p.userId === artisan.id || p.userId === artisan._id ||
        (p.artisanName && p.artisanName.toLowerCase().includes(artisan.name.toLowerCase()))
      );

      return {
        ...artisan,
        productCount: artisanProducts.length,
        featuredProducts: artisanProducts.slice(0, 3)
      };
    });

    return res.json({
      success: true,
      count: artisansList.length,
      data: artisansList
    });
  } catch (error) {
    console.error('Get Artisans Error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch artisans list' });
  }
};

/**
 * @route GET /api/artisans/:id
 * @desc Get single artisan profile and all their craft products
 */
const getArtisanById = async (req, res) => {
  try {
    const { id } = req.params;

    let artisan = MASTER_ARTISANS.find(a => a.id === id || a._id === id || a.name.toLowerCase().includes(id.toLowerCase()));

    if (!artisan && isConnectedToMongo()) {
      artisan = await User.findById(id);
    }

    if (!artisan) {
      artisan = MASTER_ARTISANS[0];
    }

    const products = isConnectedToMongo() ? await Product.find() : memoryStore.products;
    const artisanProducts = products.filter(p =>
      p.userId === artisan.id || p.userId === artisan._id ||
      (p.artisanName && p.artisanName.toLowerCase().includes(artisan.name.toLowerCase()))
    );

    return res.json({
      success: true,
      data: {
        ...artisan,
        products: artisanProducts
      }
    });
  } catch (error) {
    console.error('Get Artisan By ID Error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch artisan profile' });
  }
};

module.exports = {
  getArtisans,
  getArtisanById,
  MASTER_ARTISANS
};
