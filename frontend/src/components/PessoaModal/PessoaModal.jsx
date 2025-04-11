import { Row } from "react-bootstrap";
import CustomModal from "../Modal/Modal";
import { Form, FloatingLabel, Select, FormControl, InputLabel } from "react-bootstrap";
import { useState } from "react";
import { criar } from "../../api/pessoa";

export default function PessoaModal({ show, setShow, pessoaCriada }) {

    const [pessoa, setPessoa] = useState(null);

    const cadastrarPessoa = async () => {
        console.log(pessoa)
        const response = await criar(pessoa);
        if (response.status === 200) {
            pessoaCriada?.(response.data);
            setPessoa(null);
            setShow(false);
        } else {
            alert("Erro ao cadastrar pessoa.");
        }
    }

    return (
        <CustomModal
            show={show}
            setShow={setShow}
            submit={cadastrarPessoa}
            title="Cadastro de Pessoa"
            submitText="Cadastrar"
            resetText="Cancelar"
            submitDisable={!pessoa?.nome || !pessoa?.cpf || !pessoa?.dtNascimento || !pessoa?.sexo}
            reset={() => setPessoa(null)}
        >
            <Row className="mb-3">

                <FloatingLabel controlId="floatingInputNome" label="Nome" className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Nome"
                        value={pessoa?.nome}
                        onChange={(e) => setPessoa({ ...pessoa, nome: e.target.value })}
                    />
                </FloatingLabel>
            </Row>
            <Row>
                <FloatingLabel controlId="floatingInputCpf" label="CPF" className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="CPF"
                        value={pessoa?.cpf}
                        onChange={(e) => setPessoa({ ...pessoa, cpf: e.target.value })}
                    />
                </FloatingLabel>
            </Row>
            <Row>
                <FloatingLabel controlId="floatingInputTelefone" label="Telefone" className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Telefone"
                        value={pessoa?.telefone}
                        onChange={(e) => setPessoa({ ...pessoa, telefone: e.target.value })}
                    />
                </FloatingLabel>
            </Row>
            <Row>
                <FloatingLabel controlId="floatingInputEmail" label="Email" className="mb-3">
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        value={pessoa?.email}
                        onChange={(e) => setPessoa({ ...pessoa, email: e.target.value })}
                    />
                </FloatingLabel>
            </Row>
            <Row>
                <FloatingLabel controlId="floatingInputDataNascimento" label="Data de Nascimento" className="mb-3">
                    <Form.Control
                        type="date"
                        placeholder="Data de Nascimento"
                        value={pessoa?.dtNascimento}
                        onChange={(e) => setPessoa({ ...pessoa, dtNascimento: e.target.value })}
                    />
                </FloatingLabel>
            </Row>
            <Row className="mb-3">
                <FloatingLabel controlId="floatingSelect" label="Sexo">
                    <Form.Select aria-label="Floating label select example"
                        value={pessoa?.sexo}
                        onChange={(e) => setPessoa({ ...pessoa, sexo: e.target.value })}>
                        <option value="">Selecione</option>
                        <option value="M">Masculino</option>
                        <option value="F">Feminino</option>
                    </Form.Select>
                </FloatingLabel>
            </Row>
        </CustomModal>
    )
}