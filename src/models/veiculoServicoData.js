const mongoose = require("mongoose");

const veiculoServico = new mongoose.Schema({
    valor: {
        type: Number,
        required: true,
        min: 0,
    },
    data_init: {
        type: Date,
        required: true,
        default: Date.now,
    },
    data_end: {
        type: Date,
        required: true,
        default: Date.now,
    },
    avaliacao: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comentario: {
        type: String,
        required: true,
        maxlength: 255,
    },
    veiculo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "veiculos",
        required: true,
    },
    servico: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "servicos",
        required: true,
    },
    
});


veiculoServico.pre('save', function(next) {
    this.valor = parseFloat(this.valor.toFixed(2));

    if (this.data_init > this.data_end) {
        return next(new Error("Data de início do serviço não pode ser posterior à data de término."));
    }
    if (this.data_init < new Date()) {
        return next(new Error("Data de início do serviço não pode ser anterior ao dia de hoje."));
    }
    if (this.data_end < new Date()) {
        return next(new Error("Data de término do serviço não pode ser anterior ao dia de hoje."));
    }
    // this.data_init = this.data_init;
    // this.data_end = this.data_end;
    
    this.comentario = this.comentario.trim().toLowerCase();

    next();

});

module.exports = mongoose.model("veiculo_servico", veiculoServico);
