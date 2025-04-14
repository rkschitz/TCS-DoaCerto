import { use, useEffect, useState } from "react"
import { listarDonatariosAtivos } from '../../api/donatario'
import CustomModal from "../../components/Modal/Modal";
import { Form, FloatingLabel, Row, Col } from 'react-bootstrap'
import PessoaLocalizador from "../../components/PessoaLocalizador/PessoaLocalizador";
import SituacaoProfissionalSelect from "../../components/SituacaoProfissionalSelect/SituacaoProfissionalSelect";
import SexoSelect from "../../components/SexoSelect/SexoSelect";
import SituacaoHabitacionalSelect from "../../components/SituaçãoHabitacionalSelect/SituacaoHabitacionalSelect";
import RadioGroup from "../../components/RadioButton/RadioButton";

export default function Donatario() {

    const [donatarios, setDonatarios] = useState([])
    const [openModal, setOpenModal] = useState(false);
    const [openLocalizadorPessoa, setOpenLocalizadorPessoa] = useState(false)
    const [selectedDonatario, setSelectedDonatario] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [dependentes, setDependentes] = useState([]);

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
        setDependentes([]);
        listar();
    }

    const handleReset = () => {
        setOpenModal(false);
        setSelectedDonatario(null);
        setIsEditMode(false);
        setDependentes([]);
    };

    const handleEdit = (person) => {
        setSelectedDonatario(person);
        setIsEditMode(true);
        setOpenModal(true);
    };

    const handleAddNew = () => {
        setSelectedDonatario({
            idPessoa: '',
            nome: '',
            CPF: '',
            dtNascimento: '',
            idSituacaoHabitacional: '',
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
                        nome: pessoa.nome,
                        CPF: pessoa.cpf,
                        dtNascimento: pessoa.dtNascimento,
                        email: pessoa.email,
                        sexo: pessoa.sexo,
                        telefone: pessoa.telefone,
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
                            </Row>
                            <Row>
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
                                            disabled
                                        />
                                    </FloatingLabel>
                                </Col>

                                <Col md={6} className="mb-3">
                                    <FloatingLabel controlId="floatingInput" label="Data de nascimento">
                                        <Form.Control
                                            type="date"
                                            placeholder="dd/mm/aaaa"
                                            value={selectedDonatario.dtNascimento}
                                            onChange={(e) => setSelectedDonatario({ ...selectedDonatario, dtNascimento: e.target.value })}
                                            disabled
                                        />
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6} className="mb-3">
                                    <FloatingLabel controlId="floatingInput" label="Cidade">
                                        <Form.Control
                                            type="text"
                                            placeholder="Cidade"
                                            value={selectedDonatario.cidade}
                                            onChange={(e) => setSelectedDonatario({ ...selectedDonatario, cidade: e.target.value })}
                                            disabled
                                        />
                                    </FloatingLabel>
                                </Col>
                                <Col md={6} className="mb-3">
                                    <FloatingLabel controlId="floatingInput" label="Nacionalidade">
                                        <Form.Control
                                            type="text"
                                            placeholder="Nacionalidade"
                                            value={selectedDonatario.nacionalidade}
                                            onChange={(e) => setSelectedDonatario({ ...selectedDonatario, nacionalidade: e.target.value })}

                                        />
                                    </FloatingLabel>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6} className="mb-3">
                                    <SexoSelect
                                        onChange={(sexo) => setSelectedDonatario({ ...selectedDonatario, sexo })}
                                        value={selectedDonatario.sexo}
                                        disabled={true}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6} className="mb-3">
                                    <FloatingLabel label="Endereço">
                                        <Form.Control
                                            type="text"
                                            placeholder="Endereço"
                                            value={selectedDonatario.endereco}
                                            onChange={(e) => setSelectedDonatario({ ...selectedDonatario, endereco: e.target.value })}
                                            disabled
                                        />
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6} className="mb-3">
                                    <SituacaoHabitacionalSelect onChange={(situacao) => setSelectedDonatario({
                                        ...selectedDonatario, idSituacaoProfissional: situacao
                                    })}
                                        value={selectedDonatario.idSituacaoHabitacional} />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={8} className="mb-3">
                                    <FloatingLabel controlId="floatingInput" label="Há quanto tempo reside no local?">
                                        <Form.Control
                                            type="text"
                                            placeholder="Há quanto tempo reside no local?"
                                            value={selectedDonatario.tempoResidencia}
                                            onChange={(e) => setSelectedDonatario({ ...selectedDonatario, tempoResidencia: e.target.value })}
                                        />
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={8} className="mb-3">
                                    <FloatingLabel controlId="floatingInput" label="Telefone">
                                        <Form.Control
                                            type="text"
                                            placeholder="Telefone"
                                            value={selectedDonatario.telefone}
                                            onChange={(e) => setSelectedDonatario({ ...selectedDonatario, telefone: e.target.value })}
                                        />
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={8} className="mb-3">
                                    <FloatingLabel controlId="floatingInput" label="Renda familíar">
                                        <Form.Control
                                            type="text"
                                            placeholder="Renda familíar"
                                            value={selectedDonatario.rendaFamiliar}
                                            onChange={(e) => setSelectedDonatario({ ...selectedDonatario, rendaFamiliar: e.target.value })}
                                        />
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={8} className="mb-3">
                                    <SituacaoProfissionalSelect onChange={(situacao) => setSelectedDonatario({ ...selectedDonatario, idSituacaoProfissional: situacao })}
                                        value={selectedDonatario.idSituacaoProfissional} />
                                </Col>
                            </Row>
                            {/* <Row>
                                <Col md={8} className="mb-3">
                                    <FloatingLabel controlId="floatingInput" label="Possui cadastro no Cras ou outro local?">
                                        <Form.Control
                                            type="text"
                                            placeholder="Possui cadastro no Cras ou outro local?"
                                            value={selectedDonatario.rendaFamiliar}
                                            onChange={(e) => setSelectedDonatario({ ...selectedDonatario, rendaFamiliar: e.target.value })}
                                        />
                                    </FloatingLabel>
                                </Col>
                            </Row> */}
                            <Row>
                                <Col md={14} className="mb-3">
                                    <RadioGroup
                                        title='Alguém com doença grave ou que esteja acamado reside na mesma casa?'
                                        options={[
                                            { label: 'Sim', value: '1' },
                                            { label: 'Não', value: '0' },
                                        ]}
                                        selectedValue={selectedDonatario.enfermoNaCasa}
                                        onChange={(e) => setSelectedDonatario({ ...selectedDonatario, enfermoNaCasa: e.target.value,
                                            situacaoEnfermo: e.target.value === '1' ? selectedDonatario.situacaoEnfermo : ''
                                         })}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={14} className="mb-3">
                                    <FloatingLabel controlId="floatingInput" label="Situação do enfermo">
                                        <Form.Control
                                            type="text"
                                            placeholder="Situação do enfermo"
                                            value={selectedDonatario.situacaoEnfermo}
                                            onChange={(e) => setSelectedDonatario({ ...selectedDonatario, situacaoEnfermo: e.target.value })}
                                            disabled={selectedDonatario.enfermoNaCasa === '0' || !selectedDonatario.enfermoNaCasa ? true : false}
                                        />
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <h5>Moradores na casa</h5>
                            
                        </Form>
                    )}
                </CustomModal>
            </div>
        </div >
    )
}