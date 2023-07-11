const router = require('express').Router();
const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');
//

//creating an order
router.post('/', async (req, res) => {
  try {
    const io = req.app.get('socketio');
    const { userId, cart, username, phone, detail, ward, shippingAmount, district, city, cityId, districtId, wardId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const order = new Order({
      user: user._id,
      products: cart,
      username,
      phone,
      detail,
      ward,
      district,
      city,
      cityId,
      districtId,
      wardId,
      count: cart.count,
      total: cart.total + shippingAmount
    });

    await order.save();
  
    user.cart = { total: 0, count: 0 };
    user.orders.push(order);

    const notification = { status: 'HoanTat', message: `New order from ${user.name}`, time: new Date() };
    io.sockets.emit('new-order', notification);

    await user.save();

    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ error: 'Error creating order' });
  }
});
//create order card
router.post('/create', async (req, res) => {
  try {
    const io = req.app.get('socketio');
    const { userId, cart, username, phone, detail, ward, shippingAmount, district, city, cityId, districtId, wardId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const order = new Order({
      user: user._id,
      products: cart,
      username,
      phone,
      detail,
      ward,
      district,
      city,
      cityId,
      districtId,
      wardId,
      count: cart.count,
      total: cart.total + shippingAmount,
      status: 'ChoLayHang'
    });

    await order.save();

    user.cart = { total: 0, count: 0 };
    user.orders.push(order);

    const notification = { status: 'HoanTat', message: `New order from ${user.name}`, time: new Date() };
    io.sockets.emit('new-order', notification);

    await user.save();

    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ error: 'Error creating order' });
  }
});
//
router.patch('/update/:id', async (req, res) => {
  const { id } = req.params;
  const Status = ["ChoXacNhan", "ChoLayHang", "HoanTat"];
  let status = "";

  try {
    const order = await Order.findById(id);
    for (let i = 0; i < Status.length; i++) {
      if (order.status === Status[i]) {
        status = Status[i + 1];
        break;
      }
    }

    await Order.findByIdAndUpdate(id, { status });
   
    // Load lại danh sách đơn hàng sau khi cập nhật thành công
    const orders = await Order.find().populate('user', ['email', 'name']);
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



// router.put('/update/:id', async (req, res) => {
//   const { orderId } = req.params;
//   const { status } = req.body;

//   try {
//     // Tìm đơn hàng dựa trên ID
//     const order = await Order.findById(orderId);

//     if (!order) {
//       return res.status(404).json({ error: 'Không tìm thấy đơn hàng.' });
//     }

//     // Cập nhật trạng thái đơn hàng
//     order.status = status;

//     // Lưu thay đổi
//     await order.save();

//     res.json(order);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Đã xảy ra lỗi server.' });
//   }
// });


//delete product
router.delete('/:id', async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).send({ error: 'Order not found' });
    }

    // Lấy danh sách đơn hàng mới sau khi xóa thành công
    const updatedOrders = await Order.find();

    res.send({ message: 'Order deleted successfully', orders: updatedOrders });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Server error' });
  }
});


 
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('user', ['email', 'name'])      
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Failed to get the list of orders`,
    });
  }
});
//shipping order

router.patch('/:id/mark-shipped', async(req, res)=> {
  const io = req.app.get('socketio');
  const {userId} = req.body;
  const {id} = req.params;
  // const products = req.params;
  try {
    const user = await User.findById(userId);
    await Order.findByIdAndUpdate(id, {status: 'HoanTat'});
    const orders = await Order.find().populate('user', ['email', 'name']);
    const notification = {status: 'HoanTat', message: `đơn hàng ${id} đã được giao thành công`, time: new Date()};
    io.sockets.emit("notification", notification, userId);
    user.notifications.push(notification);
    await user.save();
    res.status(200).json(orders)
  } catch (e) {
    res.status(400).json(e.message);
  }
})
module.exports = router;