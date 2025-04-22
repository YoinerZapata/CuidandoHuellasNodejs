const mongoose = require('mongoose');
require('dotenv').config();

const URI = `mongodb+srv://${process.env.USUARIOBD}:${process.env.PASSBD}@adso2846458.b305v.mongodb.net/${process.env.BD}`

mongoose.connect(URI)

module.exports = mongoose;