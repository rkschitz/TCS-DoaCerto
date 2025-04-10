import { use, useEffect, useState } from "react"
import { listarDonatariosAtivos } from '../../api/donatario'
import CustomModal from "../../components/Modal/Modal";
import { Form, FloatingLabel, Row, Col } from 'react-bootstrap'
import PessoaLocalizador from "../../components/PessoaLocalizador/PessoaLocalizador";

export default function Donatario() {

    const [donatarios, setDonatarios] = useState([])
    const [openModal, setOpenModal] = useState(false);
    const [openLocalizadorPessoa, setOpenLocalizadorPessoa] = useState(false)
    const [selectedDonatario, setSelectedDonatario] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    async function listar() {
        try {
            const response = await listarDonatariosAtivos();
            setDonatarios(response.data);
        } catch (error) {
            console.error("Erro ao buscar donatários:", error);
        }
    }
    useEffect(() => {
        listar();
    }, []);

    const handleSubmit = async () => {
        if (!isEditMode) {
            console.log('inserindo:', selectedDonatario);
        } else {
            console.log('editando:', selectedDonatario);
        }
        setOpenModal(false);
        setSelectedDonatario(null);
        setIsEditMode(false);
        listar();
    }

    const handleReset = () => {
        setOpenModal(false);
        setSelectedDonatario(null);
        setIsEditMode(false);
    };

    const handleEdit = (person) => {
        setSelectedDonatario(person);
        setIsEditMode(true);
        setOpenModal(true);
    };

    const handleAddNew = () => {
        setSelectedDonatario({
            idPessoa: '',
            CPF: '',
            nome: '',
        });
        setIsEditMode(false);
        setOpenModal(true);
    };

    return (
        <div className="container-donatarios">
            <div className="titulo">Donatarios</div>
            <button onClick={handleAddNew}>Adicionar novo donatario</button>
            <div className="conteudo">
                {donatarios.map((donatario, index) => (
                    <div className="donatario" key={index}>
                        Nome:{donatario.pessoa.nome}<br />
                        CPF:{donatario.pessoa.cpf} Data de nascimento:{donatario.pessoa.dtNascimento}<br />
                        Cidade: Nacionalidade:<br />
                        Sexo:{donatario.pessoa.sexo}<br />
                        Endereço:<br />
                        Situação habitacional:{donatario.situacaoHabitacional.situacaoHabitacional}<br />
                        Há quanto tempo reside no local:{donatario.tempoResidencia}<br />
                        Telefone:{donatario.pessoa.telefone}<br />
                        Renda familiar:{donatario.rendaFamiliar}<br />
                        Situação (empregado, desempregado, aposentado, etc.):{donatario.situacaoProfissional.situacaoProfissional}<br />
                        Possui cadastro no CRAS?{donatario.cadastroCras ? donatario.cadastroCras : donatario.outroLocal}<br />
                        Alguém com doença grave ou que esteja acamado reside na mesma casa:{donatario.enfermoNaCasa}<br />
                        Situação do enfermo:{donatario.situacaoEnfermo}<br />
                        Moradores na casa<br />
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">Nome</th>
                                    <th scope="col">Idade</th>
                                    <th scope="col">Grau de parentesco</th>
                                </tr>
                            </thead>
                            <tbody key={index}>
                                {donatario.dependentes.map((dependente, index) => (
                                    <tr>
                                        <td>{dependente.pessoa.nome}</td>
                                        <td>{dependente.idade}</td>
                                        <td>{dependente.grauParentesco.grauParentesco}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        Data do cadastro: {donatario.dataCadastro} Secretária: {donatario.organizacao.secretaria.nome}<br />
                        Responsável pela visita: {donatario.responsavel.nome} Situação: {donatario.situacaoCadastral}<br />
                        Observações da secretária e da ação social: {donatario.observacao}<br />
                        Data da entrega da cesta: {donatario.dtEntregaCesta}<br />
                    </div>
                ))}
                <PessoaLocalizador
                    onSelect={(pessoa) => setSelectedDonatario({
                        ...selectedDonatario,
                        idPessoa: pessoa.idPessoa,
                        nome: pessoa.nome
                    })}
                    show={openLocalizadorPessoa}
                    setShow={setOpenLocalizadorPessoa}
                />
                <CustomModal
                    title={isEditMode ? "Editar Pessoa" : "Cadastrar Pessoa"}
                    submit={handleSubmit}
                    reset={handleReset}
                    submitText={isEditMode ? "Salvar Alterações" : "Cadastrar"}
                    resetText="Cancelar"
                    show={openModal}
                    setShow={setOpenModal}
                >
                    {selectedDonatario && (
                        <Form>
                            <Row>
                                <Col md={6} className="mb-3">
                                    <FloatingLabel controlId="floatingInput" label="Nome">
                                        <Form.Control
                                            type="text"
                                            placeholder="Nome"
                                            value={selectedDonatario.nome}
                                            onClick={(e) => setOpenLocalizadorPessoa(true)}
                                        />
                                    </FloatingLabel>
                                </Col>
                                <Col md={6} className="mb-3">
                                    <FloatingLabel controlId="floatingInput" label="CPF">
                                        <Form.Control
                                            type="text"
                                            placeholder="CPF"
                                            value={selectedDonatario.CPF}
                                            onChange={(e) => setSelectedDonatario({
                                                ...selectedDonatario,
                                                CPF: e.target.value
                                            })}
                                        />
                                    </FloatingLabel>
                                </Col>

                                <Col md={6} className="mb-3">
                                    <FloatingLabel controlId="floatingInput" label="Email address">
                                        <Form.Control
                                            type="email"
                                            placeholder="name@example.com"
                                            value={selectedDonatario.email}
                                            onChange={(e) => setSelectedDonatario({ ...selectedDonatario, email: e.target.value })}
                                        />
                                    </FloatingLabel>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6} className="mb-3">
                                    <FloatingLabel controlId="floatingPassword" label="Password">
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            value={selectedDonatario.password}
                                            onChange={(e) => setSelectedDonatario({ ...selectedDonatario, password: e.target.value })}
                                        />
                                    </FloatingLabel>
                                </Col>

                                <Col md={6} className="mb-3">
                                    <FloatingLabel label="Data de nascimento">
                                        <Form.Control
                                            type="date"
                                            placeholder="Data de nascimento"
                                            value={selectedDonatario.birthdate}
                                            onChange={(e) => setSelectedDonatario({ ...selectedDonatario, birthdate: e.target.value })}
                                        />
                                    </FloatingLabel>
                                </Col>
                            </Row>
                        </Form>
                    )}
                </CustomModal>
            </div>
        </div >
    )
}