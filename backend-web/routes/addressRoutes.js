const express = require('express');
const router = express.Router();
const Address = require('../models/Address');
const User = require('../models/User');

// POST /users/:userId/addresses
router.post("/", async (req, res) => {
  const { city,owner,avatar, district, ward, detail, phone,cityId,districtId,wardId } =
    req.body;
    const userId = req.userId;

  try {
    const newAddress = new Address({
      user: userId,
      owner,
      avatar,
      city,
      district,
      ward,
      detail,
      phone,
      districtId,
      wardId,
      cityId
    });

    await newAddress.save();
    console.log(newAddress);
    const newListAddress = await Address.find({ owner }).sort({
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

//
router.get("/:id", async (req, res) => {
 
    const userId = req.userId;
    try {
      const address = await Address.find({ user: userId }).sort({
        createdAt: -1,
      });
      // console.log(listAdress);
      res.status(200).json({
        success: true,
        data: address,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        message: "token not found",
      });
    }
  });


module.exports = router;
