import { useEffect, useState } from "react";
import { buscarMovimentacoes } from "../../api/movimentacao";

export default function Movimentacao() {
  const [movimentacoes, setMovimentacoes] = useState([]);

  async function listarMovimentacoes() {
    try {
      const response = await buscarMovimentacoes();
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
      {movimentacoes.map((movimentacao) => {
          <p>AAA{movimentacao}</p>
      })}
    </div>
  );
}
