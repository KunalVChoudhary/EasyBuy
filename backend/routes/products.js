const {Router}=require('express');
const { Product } = require('../models/product');

const route=Router()

//category,min/maxprice,rating,sort
route.get('/products', async (req, res) => {
  try {

    const search = req.query.search || '';
    const category = req.query.category;
    const minPrice = parseFloat(req.query.minPrice);
    const maxPrice = parseFloat(req.query.maxPrice);
    const sortBy = req.query.sortBy || 'createdAt'; // price, name
    const order = req.query.order === 'desc' ? -1 : 1; 

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let filter = {};

    if (search) {
      filter.title = { $regex: search, $options: 'i' }; 
    }

    if (category) {
      filter.category = category;
    }

    if (!isNaN(minPrice) && !isNaN(maxPrice)) {
      filter.price = { $gte: minPrice, $lte: maxPrice };
    }

    const products = await Product.find(filter)
      .sort({ [sortBy]: order }) 
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments(filter);

    res.status(200).json({
      products,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalProducts: total,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});


route.get('/product/:productId',async (req,res)=>{ 
     try
        {const productId=req.params.productId; //_id of product object in mongodb
            const product =await Product.findById({_id:productId});
            res.status(200).json({product})
        }
    catch(err){
        console.log(err);
        res.status(400).json({err})
    }

})

module.exports=route