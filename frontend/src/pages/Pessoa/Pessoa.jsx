import { useEffect, useState } from "react";
import { buscarTodasPessoas, criar, deletarPessoa } from "../../api/pessoa";
import formatarDataBR from "../../utils/formatarDataBR";
import PessoaModal from "../../components/PessoaModal/PessoaModal";

export default function Pessoa() {
  const [pessoas, setPessoas] = useState([]);
  const [abrirModalPessoa, setAbrirModalPessoa] = useState(false);
  const [pessoaSelecionada, setPessoaSelecionada] = useState(null);

  const listarPessoas = async () => {
    try {
      const response = await buscarTodasPessoas();
      const lista = response.data ?? response;
      setPessoas(Array.isArray(lista) ? lista : []);
    } catch (err) {
      console.error("Erro ao buscar pessoas:", err);
    }
  };

  const handleDelete = async (idPessoa) => {
    try {
      const response = await deletarPessoa(idPessoa);
      if (response.status === 200) {
        setPessoas(pessoas.filter((pessoa) => pessoa.idPessoa !== idPessoa));
        alert("Pessoa excluída com sucesso");
      } else {
        throw new Error(response.data.mensagem);
      }
    } catch (err) {
      console.error("Erro ao excluir pessoa:", err);
    }
  }

  useEffect(() => {
    listarPessoas();
  }, []);

  return (
    <div className="container">
      <button onClick={() => setAbrirModalPessoa(true)}>Adicionar pessoa</button>
      {pessoas.map((pessoa) => (
        <div key={pessoa.idPessoa} className="card">
          <h2>{pessoa.nome}</h2>
          <button onClick={() => handleDelete(pessoa.idPessoa)}>Excluir</button>
          <button onClick={() => {setPessoaSelecionada(pessoa);setAbrirModalPessoa(true)}}>Editar</button>
          <p>CPF: {pessoa.cpf}</p>
          <p>Telefone: {pessoa.telefone}</p>
          <p>Email: {pessoa.email}</p>
          <p>
            Data de Nascimento:{formatarDataBR(pessoa.dtNascimento)}
          </p>
          <p>Sexo: {pessoa.sexo === 'M' ? 'Masculino' : 'Feminino'}</p>
        </div>
  ))
}
<PessoaModal
  show={abrirModalPessoa}
  setShow={setAbrirModalPessoa}
  pessoaSelecionada={pessoaSelecionada}
  onPessoaCriada={listarPessoas}
  onPessoaAtualizada={listarPessoas}
/>
    </div >
  );
}
