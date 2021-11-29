require('dotenv').config()
exports.mode = process.env.MODE
exports.DATABASE_URI = process.env.DATABASE_URI;
exports.JWT_KEY = process.env.JWT_KEY