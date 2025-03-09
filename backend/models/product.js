const {Schema,model} = require('mongoose')
//const {reviewSchema}=require('./review.js')

const productSchema = new Schema({
    productId: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    discountPercentage: { type: Number, default: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    stock: { type: Number, required: true },
    tags: { type: [String], default: [] },
    brand: { type: String },
    sku: { type: String, required: true, unique: true },
    weight: { type: Number, required: true },
    dimensions: {
      width: { type: Number, required: true },
      height: { type: Number, required: true },
      depth: { type: Number, required: true }
    },
    warrantyInformation: { type: String },
    shippingInformation: { type: String },
    availabilityStatus: { type: String, enum: ["In Stock", "Low Stock", "Out of Stock"], required: true },
    reviews:[ {  rating: { type: Number, required: true, min: 1, max: 5 },
                comment: { type: String, required: true },
                date: { type: Date, default: Date.now },
                reviewerName: { type: String, required: true },
                reviewerEmail: { type: String, required: true } }],
    returnPolicy: { type: String },
    minimumOrderQuantity: { type: Number, required: true },
    meta: {
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
      barcode: { type: String },
      qrCode: { type: String }
    },
    images: { type: [String], default: [] },
    thumbnail: { type: String, required: true },
  });

  const Product=model('product',productSchema)

  module.exports={Product}