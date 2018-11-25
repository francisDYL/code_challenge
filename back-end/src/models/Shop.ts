import mongoose from "mongoose"


  const ShopSchema  = new mongoose.Schema({
    name : {
      type : String,
      required : true,
    },
    address: {
        type: String,
        required:true
    },
    userId: {
        type: String,
        required: true
    }
  },{ timestamps: true });
ShopSchema.set('autoIndex', false);
const Shop = mongoose.model('shop',ShopSchema);

export default Shop;