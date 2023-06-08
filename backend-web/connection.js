require('dotenv').config();

const mongoose = require('mongoose') ;

const connectionStr =`mongodb+srv://qlshop:jHhuhG6vCzlx8xtC@cluster0.y4issvr.mongodb.net/qlshop?retryWrites=true&w=majority`;
// const connectionStr =`mongodb+srv://shopp:A1yR2JflWkJu3JCP@cluster0.y4issvr.mongodb.net/shopp?retryWrites=true&w=majority`;

mongoose.connect(connectionStr, {useNewUrlParser: true})
.then(() => console.log('connected to mongodb'))
.catch(err => console.log(err))

mongoose.connection.on('error', err => {
  console.log(err)
})

// jHhuhG6vCzlx8xtC