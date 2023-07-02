const mongoose = require('mongoose');
const OrderSchema = mongoose.Schema({

  products: {
    type: Object
  },
  // product: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Product',
  //   required: true
  // },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ["ChoXacNhan",  "ChoLayHang", "HoanTat", "HuyDon"],
    default: 'ChoXacNhan'
  },
  total : {
    type: Number,
    default: 0
  },
  count: {
    type: Number,
    default: 0
  },
  date: {
    type: String,
    default: new Date().toISOString().split('T')[0]
  },
  username : { type: String, },
  phone: { type: Number,  },
  detail: { type: String, },
  ward: {type: String, },
  district: { type: String, required: true, },
  city: { type: String, required: true, },
  shippingAmount: { type: Number },

  cityId:{  type: String, },  //id tỉnh
  districtId: { type: String,  },//id quận
  wardId: {  type: String, },  //id phường

}, {minimize: false});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;