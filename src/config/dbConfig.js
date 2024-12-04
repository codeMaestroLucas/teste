const mongoose = require('mongoose');

const stringCon = 'mongodb+srv://lucasamuel:projeto@projetointegrador.jpfaj.mongodb.net/';

const connection = mongoose.connect(stringCon);

module.exports = connection;
