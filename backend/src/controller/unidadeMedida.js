const unidadeMedidaModel = require("../model/unidadeMedida")

class UnidadeMedidaController {
  async criar(dsUnidadeMedida) {
    try {
      const response = await unidadeMedidaModel.create({
        dsUnidadeMedida,
      });
      return response;
    } catch (e) {
      return { mensagem: e };
    }
  }
}

module.exports = new UnidadeMedidaController();