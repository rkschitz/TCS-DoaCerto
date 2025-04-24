const movimentacaoModel = require("../model/movimentacao");
const movimentacaoAlimentoModel = require("../model/movimentacaoAlimento");
const alimentoModel = require('../model/alimento')
const unidadeMedidaModel = require('../model/unidadeMedida')

class MovimentacaoController {
  async criar(
    ieMovimentacao,
    idOrganizacao,
    idDoador,
    idDonatario,
    alimentos = []
  ) {
    try {
      const response = await movimentacaoModel.create({
        ieMovimentacao,
        idOrganizacao,
        idDoador,
        idDonatario,
      });

      if (response.dataValues) {
        for (const alimento of alimentos) {
          const alimentos = await movimentacaoAlimentoModel.create({
            idMovimentacao: response.dataValues.idMovimentacao,
            idAlimento: alimento.idAlimento,
            idUnidadeMedida: alimento.idUnidadeMedida,
            quantidade: alimento.quantidade,
          });
          return alimentos;
        }
      }
      return response;
    } catch (e) {
      return { mensagem: e };
    }
  }

  async listarMovimentacoes() {
    const response = await movimentacaoModel.findAll({
      include: [
        {
          model: movimentacaoAlimentoModel,
          as: "movimentacao_alimento",
          attributes: ["quantidade"],
          include:[{
            model: alimentoModel,
            as: "alimento",
            attributes:['alimento']
          },{
            model: unidadeMedidaModel,
            as: "unidade_medida",
            attributes:['dsUnidadeMedida']
          }]
        },
      ],
    });
    return response;
  }
}

module.exports = new MovimentacaoController();
