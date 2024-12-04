const express = require("express");
const routes = express.Router();

const veiculoController = require("../controllers/veiculoController");

routes.post("/veiculos", veiculoController.create);        // C
routes.get("/veiculos", veiculoController.read);           // R
routes.put("/veiculos/:id", veiculoController.update)      // U
routes.delete("/veiculos/:id", veiculoController.delete)   // D

module.exports = routes;
