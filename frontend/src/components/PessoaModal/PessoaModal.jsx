import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import CustomModal from "../Modal/Modal";
import { criar, editarPessoa } from "../../api/pessoa";
import { Form, FloatingLabel} from "react-bootstrap";

export default function PessoaModal({
  show,
  setShow,
  pessoaSelecionada,
  onPessoaCriada,
  onPessoaAtualizada,
  onCancel
}) {
  const [pessoa, setPessoa] = useState({
    nome: "",
    cpf: "",
    telefone: "",
    email: "",
    dtNascimento: "",
    sexo: ""
  });

  useEffect(() => {
    if (pessoaSelecionada) {
      setPessoa({
        nome: pessoaSelecionada.nome || "",
        cpf: pessoaSelecionada.cpf || "",
        telefone: pessoaSelecionada.telefone || "",
        email: pessoaSelecionada.email || "",
        dtNascimento: pessoaSelecionada.dtNascimento || "",
        sexo: pessoaSelecionada.sexo || "",
        idPessoa: pessoaSelecionada.idPessoa
      });
    } else {
      setPessoa({
        nome: "",
        cpf: "",
        telefone: "",
        email: "",
        dtNascimento: "",
        sexo: ""
      });
    }
  }, [pessoaSelecionada, show]);

  const salvar = async () => {
    try {
      let response;
      if (pessoaSelecionada) {
        response = await editarPessoa(pessoa);
        if (response.status === 200) {
          onPessoaAtualizada?.(response.data);
        }
      } else {
        response = await criar(pessoa);
        if (response.status === 200) {
          onPessoaCriada?.(response.data);
        }
      }
      setShow(false);
      setPessoa({
        nome: "",
        cpf: "",
        telefone: "",
        email: "",
        dtNascimento: "",
        sexo: ""
      });
    } catch (err) {
      console.error(err);
      alert(
        pessoaSelecionada
          ? "Erro ao atualizar pessoa."
          : "Erro ao cadastrar pessoa."
      );
    }
  };

  const title = pessoaSelecionada ? "Edição de Pessoa" : "Cadastro de Pessoa";
  const submitText = pessoaSelecionada ? "Salvar" : "Cadastrar";

  const isSubmitDisabled =
    !pessoa.nome || !pessoa.cpf || !pessoa.dtNascimento || !pessoa.sexo;

  const handleCancel = () => {
    onCancel?.();
    setShow(false);
  };

  return (
    <CustomModal
      show={show}
      setShow={setShow}
      title={title}
      submit={salvar}
      submitText={submitText}
      resetText="Cancelar"
      submitDisable={isSubmitDisabled}
      reset={handleCancel}
    >
      <Row className="mb-3">
        <FloatingLabel controlId="floatingInputNome" label="Nome" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Nome"
            value={pessoa.nome}
            onChange={(e) => setPessoa({ ...pessoa, nome: e.target.value })}
          />
        </FloatingLabel>
      </Row>
      <Row>
        <FloatingLabel controlId="floatingInputCpf" label="CPF" className="mb-3">
          <Form.Control
            type="text"
            placeholder="CPF"
            value={pessoa.cpf}
            onChange={(e) => setPessoa({ ...pessoa, cpf: e.target.value })}
          />
        </FloatingLabel>
      </Row>
      <Row>
        <FloatingLabel controlId="floatingInputTelefone" label="Telefone" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Telefone"
            value={pessoa.telefone}
            onChange={(e) => setPessoa({ ...pessoa, telefone: e.target.value })}
          />
        </FloatingLabel>
      </Row>
      <Row>
        <FloatingLabel controlId="floatingInputEmail" label="Email" className="mb-3">
          <Form.Control
            type="email"
            placeholder="Email"
            value={pessoa.email}
            onChange={(e) => setPessoa({ ...pessoa, email: e.target.value })}
          />
        </FloatingLabel>
      </Row>
      <Row>
        <FloatingLabel controlId="floatingInputDataNascimento" label="Data de Nascimento" className="mb-3">
          <Form.Control
            type="date"
            placeholder="Data de Nascimento"
            value={pessoa.dtNascimento}
            onChange={(e) => setPessoa({ ...pessoa, dtNascimento: e.target.value })}
          />
        </FloatingLabel>
      </Row>
      <Row className="mb-3">
        <FloatingLabel controlId="floatingSelectSexo" label="Sexo">
          <Form.Select
            aria-label="Floating label select example"
            value={pessoa.sexo}
            onChange={(e) => setPessoa({ ...pessoa, sexo: e.target.value })}
          >
            <option value="">Selecione</option>
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
          </Form.Select>
        </FloatingLabel>
      </Row>
    </CustomModal>
  );
}
