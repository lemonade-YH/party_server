const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/party_server',{ useNewUrlParser: true });
const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error;'));
db.once('open',function () {
  console.log('连接成功！')
})
module.exports = db