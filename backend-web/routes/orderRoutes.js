const router = require('express').Router();
const Order = require('../models/Order');
const User = require('../models/User');


//creating an order

router.post('/', async(req, res)=> {
  const io = req.app.get('socketio');
  const { userId, cart, username, phone,detail,ward,district,city,cityId,districtId, wardId  } = req.body;
  try {
  const user = await User.findById(userId);
  const order = await Order.create({owner: user._id,products: cart,username,phone,detail,ward,district, city,cityId,districtId,wardId});
    order.count = cart.count;
    order.total = cart.total;
    await order.save();
    user.cart =  {total: 0, count: 0};
    user.orders.push(order);
    const notification = {status: 'unread', message: `New order from ${user.name}`, time: new Date()};
    io.sockets.emit('new-order', notification);
    user.markModified('orders');
    await user.save();
    res.status(200).json(user)

  } catch (e) {
    res.status(400).json(e.message)
  }
})

// update order
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const Status = ["ChoXacNhan", "ChoLayHang", "HoanTat"];
  let status = "";

  try {
    const curOrder = await Order.findById(id);
    for (let i = 0; i < Status.length; i++) {
      if (curOrder.status === Status[i]) {
        status = Status[i + 1];
        break;
      }
    }

    await Order.findByIdAndUpdate(id, { status });

    // Load lại danh sách đơn hàng sau khi cập nhật thành công
    const orders = await Order.find().populate('owner', ['email', 'name']);
    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      data: orders,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Failed to update order",
    });
  }
});




router.delete('/:id', async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).send({ error: 'Order not found' });
    }
    res.send({ message: 'Order deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Server error' });
  }
});

// getting all orders;
// router.get('/', async(req, res)=> {
//   try {
//     const orders = await Order.find().populate('owner', ['email', 'name']);
//     res.status(200).json(orders);
//   } catch (e) {
//     res.status(400).json(e.message)
//   }
// })

router.get('/', async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('owner', ['email', 'name'])
      // .populate('product'); // Populate the 'products' field and retrieve only the 'name' property
      
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Failed to get the list of orders`,
    });
  }
});
// router.get('/', async(req, res)=> {
// try {
//   const orders = await Order.find({})
//     .populate('owner', ['email', 'name'])
    
//   res.status(200).json(
//     orders
//   );
// } catch (error) {
//   res.status(400).json({
//     success: false,
//     message: `fail to get list order`,
//   });
// }
// });

//shipping order

router.patch('/:id/mark-shipped', async(req, res)=> {
  const io = req.app.get('socketio');
  const {ownerId} = req.body;
  const {id} = req.params;
  // const products = req.params;
  try {
    const user = await User.findById(ownerId);
    await Order.findByIdAndUpdate(id, {status: 'ChoLayHang'});
    const orders = await Order.find().populate('owner', ['email', 'name']);
    const notification = {status: 'HoanTat', message: `đơn hàng ${id} đã được giao thành công`, time: new Date()};
    io.sockets.emit("notification", notification, ownerId);
    user.notifications.push(notification);
    await user.save();
    res.status(200).json(orders)
  } catch (e) {
    res.status(400).json(e.message);
  }
})
module.exports = router;