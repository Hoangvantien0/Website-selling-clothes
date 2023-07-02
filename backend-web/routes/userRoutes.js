const router = require('express').Router();
const User = require('../models/User');
const Order = require('../models/Order');
// signup

// router.post('/signup', async(req, res)=> {
//   const {name, email, password} = req.body;

//   try {
//     const user = await User.create({name, email, password});
//     res.json(user);
//   } catch (e) {
//     if(e.code === 11000) return res.status(400).send('Email đã tồn tại');
//     res.status(400).send(e.message)
//   }
// })

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Create a new user instance
    const user = new User({
      name,
      email,
      password
    
    });

    // Save the user to the database
    await user.save();

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// create user
router.post('/create', async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;

    // Create a new user instance
    const user = new User({
      name,
      email,
      password,
      isAdmin
    });

    // Save the user to the database
    await user.save();

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// login

router.post('/login', async(req, res) => {
  const {email, password} = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    res.json(user)
  } catch (e) {
    res.status(400).send(e.message)
  }
})
// update user
router.patch('/:id', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;
    // user.isAdmin = isAdmin || user.isAdmin
    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
 
// router.patch('/:id', async (req, res) => {
    
//   const user = await User.findById(req.params.id)

//   if(user){
//       user.name = req.body.name || user.name
//       user.email = req.body.email || user.email
//       if(req.body.password){
//           user.password = req.body.password || user.password
//       }

//       const updatedUser = await user.save()
//           res.json({
          
//            name: updatedUser.name,
//            email: updatedUser.email,
//            isAdmin: updatedUser.isAdmin
           
//       })

//   }else{
//       res.status(404)
//       throw new Error('User not found')
//   }
  
  
// })

// delete user
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully', user: deletedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong while deleting the user' });
  }
});

// get users;

router.get('/', async(req, res)=> {
  try {
    const users = await User.find({ isAdmin: false }).populate('orders');
    res.json(users);
  } catch (e) {
    res.status(400).send(e.message);
  }
})

router.get('/:id', async(req, res)=> {
  try {
    const users = await User.find({ isAdmin: false }).populate('orders');
    res.json(users);
  } catch (e) {
    res.status(400).send(e.message);
  }
})



// get user orders

router.get('/:id/orders', async (req, res)=> {
  const {id} = req.params;
  try {
    const user = await User.findById(id).populate('orders');
    res.json(user.orders);
  } catch (e) {
    res.status(400).send(e.message);
  }
})
//get address
router.get('/:id/address', async (req, res)=> {
  const {id} = req.params;
  try {
    const user = await User.findById(id).populate('address');
    res.json(user.address);
  } catch (e) {
    res.status(400).send(e.message);
  }
})
// update user notifcations
router.post('/:id/updateNotifications', async(req, res)=> {
  const {id} = req.params;
  try {
    const user = await User.findById(id);
    user.notifications.forEach((notif) => {
      notif.status = "read"
    });
    user.markModified('notifications');
    await user.save();
    res.status(200).send();
  } catch (e) {
    res.status(400).send(e.message)
  }
})

module.exports = router;