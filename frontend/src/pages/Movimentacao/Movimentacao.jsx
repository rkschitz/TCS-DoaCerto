import { useEffect, useState } from "react";
import { buscarMovimentacoes } from "../../api/movimentacao";
import formatarDataBRCHora from "../../utils/formatarDataBRCHora";
import { Button } from "react-bootstrap";

export default function Movimentacao() {
  const [movimentacoes, setMovimentacoes] = useState([]);

  async function listarMovimentacoes() {
    try {
      const response = await buscarMovimentacoes();
      console.log(response.data);
      setMovimentacoes(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    listarMovimentacoes();
  }, []);

  return (
    <div className="conteudo">
      <h3>Movimentações</h3>
      <Button variant="primary">
        Nova movimentação
      </Button>
      {movimentacoes.map((movimentacao, index) => (
        <div className="card-movimentacao" key={index}>
          {movimentacao.ieMovimentacao === 'E' ? 'Entrada' : 'Saida'}
          <p>Data da movimentação: {formatarDataBRCHora(movimentacao.createdAt)}</p>
          {movimentacao.movimentacao_alimento.map((alimento, i) => (
            <div key={i}>
              <p>Alimento: {alimento.alimento.alimento}</p>
              <p>Quantidade: {alimento.quantidade} {alimento.unidade_medida.dsUnidadeMedida}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );

}
