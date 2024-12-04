const express = require('express');
require('./config/dbConfig');
const userRoutes = require("./routes/userRoutes")
const veiculosRoutes = require("./routes/veiculosRoutes")

const app = express();
app.use(express.json());
app.use(userRoutes);
app.use(veiculosRoutes);


app.listen(3333);
