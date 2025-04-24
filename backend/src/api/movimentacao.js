const MovimentacaoController = require("../controller/movimentacao")

class MovimentacaoApi{
    async listarMovimentacoes(req,res){
        try{
            const response = await MovimentacaoController.listarMovimentacoes();
            return res.status(200).send(response);
        }catch(e){
            return res.status(400).send({error: e.mensagem})
        }
    }
}

module.exports = new MovimentacaoApi();