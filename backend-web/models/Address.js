const mongoose = require("mongoose");

const AddressSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    username : { type: String, },
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