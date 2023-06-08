const router = require('express').Router();
const User = require('../models/User');
const Address = require('../models/Address')
const Order = require('../models/Order')

//get rates
// router.post("/", async (req, res) => {
//     {
//         const { username,city,cityId, district, ward, detail, phone, districtId, wardId } =
//           req.body;
//         const userId = req.userId;
      
//         try {
//           const newAddress = new Address({
//             user: userId,
//             username,
//             city,
//             cityId,
//             district,
//             districtId,
//             ward,
//             wardId,
//             detail,
//             phone,
//           });
      
//           await newAddress.save();
//           console.log(newAddress);
//           const newListAddress = await Address.find({ user: userId }).sort({
//             createdAt: -1,
//           });
      
//           res.status(200).json({
//             success: true,
//             message: "add address success",
//             data: newListAddress,
//           });
//         } catch (error) {
//           console.log(error);
//           res.status(400).json({
//             success: false,
//             message: "add address failed",
//           });
//         }
//       };
//     })
// 
// exports.Address = async (req, res, next) => {
  router.post("/", async (req, res) => {
  const { username,city,cityId, district, ward, detail, phone, districtId, wardId} =
    req.body;
  const userId = req.userId;

  try {
    const newAddress = new Address({
      user: userId,
            username,
            city,
            cityId,
            district,
            districtId,
            ward,
            wardId,
            detail,
            phone,
    });

    await newAddress.save();
    console.log(newAddress);
    const newListAddress = await Address.find({ user: userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      message: "add address success",
      data: newListAddress,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "add address failed",
    });
  }
});

// crate rate
exports.getUserAddress = async (req, res) => {
  const userId = req.userId;
  try {
    const listAdress = await Address.find({ user: userId }).sort({
      createdAt: -1,
    });
    // console.log(listAdress);
    res.status(200).json({
      success: true,
      data: listAdress,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "token not found",
    });
  }
};
// router.get("", async (req, res) => {
 
//     const userId = req.userId;
//     try {
//       const listAdress = await Address.find({ user: userId }).sort({
//         createdAt: -1,
//       });
//       // console.log(listAdress);
//       res.status(200).json({
//         success: true,
//         data: listAdress,
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(400).json({
//         success: false,
//         message: "token not found",
//       });
//     }
//   });

// DELETE a rate by ID


  module.exports = router;  