const userData = require("../models/userData");

module.exports = {

  // C
  async create(req, res) {
    const { nome, telefone, email, senha } = req.body;

    if (!nome || !telefone || !email || !senha) {
      return res.status(400).json({
        error: "Todos os dados são obrigatórios",
      });
    }

    try {
      const user = await userData.create({
        nome: nome,
        telefone: telefone,
        email: email,
        senha: senha,
      });

      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  // R
  async read(req, res) {
    return res.json(await userData.find());
  },

  async getByEmail(req, res) {
    const { email } = req.body;

    if (!email || email.trim() === "") {
      return res.status(400).json({
        error: "Email é obrigatório e não pode estar vazio.",
      });
    }

    const user = await userData.findOne({ email: email.trim() });
    if (!user) {
      return res.status(404).json({
        error: "Usuário não encontrado.",
      });
    }

    const userRetorno = {
      nome: user.nome,
      telefone: user.telefone,
      email: user.email,
      veiculos: user.veiculos,
    };

    return res.status(200).json({
      user: userRetorno,
    });
  },

  // U
  async update(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        error: "ID é obrigatório.",
      });
    }

    const user = await userData.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({
        error: "Usuário não encontrado.",
      });
    }

    const { nome, telefone, email, senha } = req.body;

    if (!nome || !telefone || !email || !senha) {
      return res.status(400).json({
        error: "Todos os dados são obrigatórios",
      });
    }

    try {
      user.nome = nome;
      user.telefone = telefone;
      user.email = email;
      user.senha = senha;

      await user.save();
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({
        error: "Erro ao atualizar o usuário.",
      });
    }
  },

  // D
  async delete(req, res) {
    const { id } = req.params;

    if (!id || id === undefined) {
      return res.status(400).json({
        error: "ID é obrigatório.",
      });
    }

    const userDeletado = await userData.findOneAndDelete({ _id: id });

    if (userDeletado) {
      return res.json({
        "message": "Usuario deletado com sucesso",
        "user": userDeletado
      })
    }

    return res.status(404).json({
      error: "Usuário não encontrado.",
    });
  },
};
