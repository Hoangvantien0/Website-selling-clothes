const router = require('express').Router();
const User = require('../models/User');
const Product = require('../models/Product')
const Rate = require('../models/Rate')
const Order = require('../models/Order')

//get all rates
router.get('/', (req, res) => {
  Rate.find({})
    .populate('user', ['name']) 
    .populate('product',['name', 'pictures'])
    .exec((err, rates) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' });
        return;
      }

      res.json(rates);
    });
});

// get rate for product
router.get("/:productId", async (req, res) => {
  try {
    const rates = await Rate.find({ product: req.params.productId,status:"DaDuyet" })
      .populate("user") // Populate the "user" field with the username only
      .exec();
    res.json(rates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//update rate  
router.patch("/:id", async (req,res) => {
  const {id } = req.params;;
  const Status = ["ChuaDuyet", "DaDuyet"];
  let status = "";
  try{
    const rates = await Rate.findById(id);
    for (let i = 0; i < Status.length; i++) {
      if (rates.status === Status[i]) {
        status = Status[i + 1];
        break;
      }
    }
  await Rate.findByIdAndUpdate(id, {status});
  }catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Failed to update order",
    });
  }
});

// crate rate


router.post("/create", async (req, res) => {
  const userId = req.userId;
  const { product, content, score } = req.body;
  try {
   
      const newRate = new Rate({ user: userId, product, content, score });
      await newRate.save();
      const newlistRate = await Rate.find({ product })
        .populate("user")
        .sort({ createdAt: -1 });
      const totalRate = await Rate.find({ product }).count();
      res.status(200).json({
        success: true,
        data: newlistRate,
        total: totalRate,
      });
  
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "create rate failed",
    });
  }
});

// DELETE a rate by ID
// router.delete("/:id", async (req, res) => {
//   try {
//     const rate = await Rate.findById(req.params.id);
//     if (!rate) {
//       return res.status(404).json({ message: "Rate not found" });
//     }

//     await rate.remove();
//     res.json({ message: "Rate deleted" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });
module.exports = router;