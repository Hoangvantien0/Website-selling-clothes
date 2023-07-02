const mongoose = require("mongoose");

const AddressSchema = mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }, 
    avatar :{type: Array},
    city: { type: String, required: true, },
    district: { type: String, required: true, },
    ward: {type: String, },
    detail: { type: String, },
    phone: { type: Number,  },
    
    cityId:{  type: String, },  //id tỉnh
    districtId: { type: String,  },//id quận
    wardId: {  type: String, },  //id phường
    
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", AddressSchema);