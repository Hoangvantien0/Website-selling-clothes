const router = require('express').Router();
const Product = require('../models/Product');
const User = require('../models/User');

//get products;
router.get('/', async(req, res)=> {
  try {
    const sort = {'_id': -1}
    const products = await Product.find({status : true}).sort(sort);
    res.status(200).json(products);
  } catch (e) {
    res.status(400).send(e.message);
  }
})


//create product
router.post('/', async(req, res)=> {
  try {
    const {name, desc, price, category, size , color , images: pictures,quatity } = req.body;
    const product = await Product.create({name, desc, price, category, size, color, pictures,quatity});
    const products = await Product.find();
    res.status(201).json(products);
  } catch (e) {
    res.status(400).send(e.message);
  }
})


// update product

router.patch('/:id', async(req, res)=> {
  const {id} = req.params;
  try {
    const {name, desc, price, category, size , color , images: pictures,quatity} = req.body;
    const product = await Product.findByIdAndUpdate(id, {name, desc, price, category, size , color , pictures,quatity});
    const products = await Product.find();
    res.status(200).json(products);
  } catch (e) {
    res.status(400).send(e.message);
  }
})
// del

router.delete('/:id', async(req, res)=> {
  const {id} = req.params;
  const {user_id} = req.body;
  try {
    const user = await User.findById(user_id);
    if(!user.isAdmin) return res.status(401).json("You don't have permission");
    await Product.findByIdAndUpdate(id,{ status: false }, { new: true });
    const products = await Product.find({status:true}).sort({ createdAt: -1 });;
    res.status(200).json(products);
  } catch (e) {
    res.status(400).send(e.message);
  }
})

//get id product  
router.get('/:id', async(req, res)=> {
  const {id} = req.params;
  try {
    const product = await Product.findById(id);
    const similar = await Product.find({category: product.category,status:true}).limit(5);
    res.status(200).json({product, similar})
  } catch (e) {
    res.status(400).send(e.message);
  }
});


router.get('/category/:category', async(req,res)=> {
  const {category} = req.params;
  try {
    let products;
    const sort = {'_id': -1}
    if(category == "all"){
      products = await Product.find({status: true}).sort(sort);
    } else {
      products = await Product.find({category ,status:true}).sort(sort)
    }
    res.status(200).json(products)
  } catch (e) {
    res.status(400).send(e.message);
  }
})
// search 
router.get('/search', async(req,res)=> {
    const { keyWord } = req.body;
    try {
      const searchResult = await Product.find({
        name: { $regex: new RegExp(keyWord, "i") },
        status: true,
      }).sort({ createdAt: -1 });
      console.log(searchResult);
      if (searchResult.length == 0) {
        return res.status(200).json({
          success: false,
          message: `cannot find product with keyword ${keyWord}`,
        });
      }
      res.status(200).json({
        success: true,
        data: searchResult,
      });
    } catch (error) {
      console.log(error);
      return res.status(404).json({
        success: false,
        message: "erorr",
      });
    }
});


// add to cart routes

router.post('/add-to-cart', async(req, res)=> {
  const {userId, productId, price} = req.body;

  try {
    const user = await User.findById(userId);
    const userCart = user.cart;
    if(user.cart[productId]){
      userCart[productId] += 1;
    } else {
      userCart[productId] = 1;
    }
    userCart.count += 1;
    userCart.total = Number(userCart.total) + Number(price);
    user.cart = userCart;
    user.markModified('cart');
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
})
//
router.post('/increase-cart', async(req, res)=> {
  const {userId, productId, price} = req.body;
  try {
    const user = await User.findById(userId);
    const userCart = user.cart;
    userCart.total += Number(price);
    userCart.count += 1;
    userCart[productId] += 1;
    user.cart = userCart;
    user.markModified('cart');
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});
//
router.post('/decrease-cart', async(req, res)=> {
  const {userId, productId, price} = req.body;
  try {
    const user = await User.findById(userId);
    const userCart = user.cart;
    userCart.total -= Number(price);
    userCart.count -= 1;
    userCart[productId] -= 1;
    user.cart = userCart;
    user.markModified('cart');
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
})
//xoá
router.post('/remove-from-cart', async(req, res)=> {
  const {userId, productId, price} = req.body;
  try {
    const user = await User.findById(userId);
    const userCart = user.cart;
    userCart.total -= Number(userCart[productId]) * Number(price);
    userCart.count -= userCart[productId];
    delete userCart[productId];
    user.cart = userCart;
    user.markModified('cart');
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
})




  module.exports = router;