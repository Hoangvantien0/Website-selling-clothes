const router = require('express').Router();
const User = require('../models/User');
const Product = require('../models/Product')
const Rate = require('../models/Rate')
const Order = require('../models/Order')

//get rates
router.get("/:productId", async (req, res) => {
  try {
    const rates = await Rate.find({ product: req.params.productId })
      .populate("user") // Populate the "user" field with the username only
      .exec();
    res.json(rates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// 


// crate rate

router.post("/:productId", async (req, res) => {
 
  const rate = new Rate({
    product: req.params.productId,
    user: req.body.user,
    score: req.body.score,
    content: req.body.content,
  });

  try {
    const newRate = await rate.save();
    res.status(201).json(newRate);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a rate by ID
router.delete("/:id", async (req, res) => {
  try {
    const rate = await Rate.findById(req.params.id);
    if (!rate) {
      return res.status(404).json({ message: "Rate not found" });
    }

    await rate.remove();
    res.json({ message: "Rate deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

  module.exports = router;  