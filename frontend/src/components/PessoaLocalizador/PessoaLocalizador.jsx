import { Row, Form, FloatingLabel, Col, Button } from "react-bootstrap";
import Localizador from "../Localizador/Localizador";
import { buscarPessoaPorNome } from "../../api/pessoa";
import { useState, useEffect } from "react";
import PessoaModal from "../PessoaModal/PessoaModal";

export default function PessoaLocalizador({ onSelect, show, setShow }) {
    const [pessoas, setPessoas] = useState([]);
    const [cpf, setCpf] = useState('');
    const [nome, setNome] = useState('');
    const [abrirModalPessoa, setAbrirModalPessoa] = useState(false);

    const colunasLista = ["Id", "Nome", "CPF", "Data de nascimento", "Sexo"];

    async function atualizarLista(nome, cpf) {
        const response = await buscarPessoaPorNome(nome, cpf);
        const responsePessoa = response.data.map((item) => ({
            idPessoa: item.idPessoa,
            nome: item.nome,
            cpf: item.cpf,
            dtNascimento: item.dtNascimento,
            sexo: item.sexo,
            email: item.email
        }));
        setPessoas(responsePessoa);
    }

    async function buscarPessoa(e) {
        e.preventDefault();
        await atualizarLista(nome, cpf);
    }

    useEffect(() => {
        if (!show) {
            setNome('');
            setCpf('');
            setPessoas([]);
        }
    }, [show]);

    return (
        <Localizador
            colunasLista={colunasLista}
            conteudoLista={pessoas}
            show={show}
            setShow={setShow}
            onSelectItem={(pessoa) => {
                onSelect?.(pessoa);
            }}
        >
            <Form>
                <Row className="mb-3">
                    <Col md={4}>
                        <FloatingLabel controlId="floatingInputCpf" label="CPF" className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="CPF"
                                value={cpf}
                                onChange={(e) => setCpf(e.target.value)}
                            />
                        </FloatingLabel>
                    </Col>
                    <Col md={8}>
                        <FloatingLabel controlId="floatingInputNome" label="Nome" className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </FloatingLabel>
                    </Col>
                    <Col md={4}>
                        <Button variant="secondary" onClick={() => setAbrirModalPessoa(true)}>
                            Nova pessoa
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={(e)=>buscarPessoa(e)}variant="primary">Buscar pessoas</Button>
                    </Col>
                </Row>
            </Form>

            <PessoaModal
                show={abrirModalPessoa}
                setShow={setAbrirModalPessoa}
                pessoaCriada={(pessoa) => atualizarLista(pessoa.nome, pessoa.cpf)}
            />
        </Localizador>
    );
}
