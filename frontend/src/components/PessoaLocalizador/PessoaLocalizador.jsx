import { Row, Form, FloatingLabel, Col } from "react-bootstrap";
import Localizador from "../Localizador/Localizador";
import { buscarPessoaPorNome } from "../../api/pessoa";
import { useState, useEffect } from "react";

export default function PessoaLocalizador({ onSelect, show, setShow }) {
    const [pessoas, setPessoas] = useState([]);
    const [cpf, setCpf] = useState('');
    const [nome, setNome] = useState('');

    const colunasLista = ["Id", "Nome", "CPF", "Data de nascimento", "Sexo"];

    async function buscarPessoa(e, nome, cpf) {
        e.preventDefault();
        const response = await buscarPessoaPorNome(nome, cpf);
        const responsePessoa = response.data.map((item) => {
            return {
                idPessoa: item.idPessoa,
                nome: item.nome,
                cpf: item.cpf,
                dataNascimento: item.dtNascimento,
                sexo: item.sexo
            }
        });
        setPessoas(responsePessoa);
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
            </Row>
            <Row>
                <button onClick={(e) => buscarPessoa(e, nome, cpf)}>Buscar pessoas</button>
            </Row>
        </Localizador>
    );
}
