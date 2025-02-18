const alimentoModel = require("../model/alimento");

class AlimentoController {
    async CriarAlimento(alimento, idUnidadeMedida){
        try {
            const novoAlimento = await alimentoModel.create({
                alimento: alimento,
                idUnidadeMedida: idUnidadeMedida
            });
            return novoAlimento;
        } catch (error) {
            return error;
        }
    }

    async ListarAlimentos(){
        try {
            const alimentos = await alimentoModel.findAll({});
            return alimentos;
        } catch (error) {
            return error;
        }
    }
}

module.exports = new AlimentoController();