import { use, useEffect, useState } from "react"
import { criarDonatario, listarDonatariosAtivos } from '../../api/donatario'
import CustomModal from "../../components/Modal/Modal";
import { Form, FloatingLabel, Row, Col } from 'react-bootstrap'
import PessoaLocalizador from "../../components/PessoaLocalizador/PessoaLocalizador";
import SituacaoProfissionalSelect from "../../components/SituacaoProfissionalSelect/SituacaoProfissionalSelect";
import SexoSelect from "../../components/SexoSelect/SexoSelect";
import SituacaoHabitacionalSelect from "../../components/SituaçãoHabitacionalSelect/SituacaoHabitacionalSelect";
import RadioGroup from "../../components/RadioButton/RadioButton";
import calcularIdade from "../../utils/calcularIdade";
import GrauParentescoSelect from "../../components/GrauParentescoSelect/GrauParentescoSelect";
import formatarDataBR from "../../utils/formatarDataBR"

export default function Donatario() {

    const [donatarios, setDonatarios] = useState([])
    const [openModal, setOpenModal] = useState(false);
    const [openLocalizadorPessoa, setOpenLocalizadorPessoa] = useState(false)
    const [selectedDonatario, setSelectedDonatario] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [dependentes, setDependentes] = useState([]);
    const [localizadorPara, setLocalizadorPara] = useState('donatario'); // ou 'dependente'


    async function listar() {
        try {
            const response = await listarDonatariosAtivos();
            setDonatarios(response.data);
            console.log(response.data)
        } catch (error) {
            console.error("Erro ao buscar donatários:", error);
        }
    }
    useEffect(() => {
        listar();
    }, []);

    const adicionarDependenteAut = async () => {
        const novoDonatario = {
            idPessoa: 2,
            idSituacaoHabitacional: 1,
            tempoResidencia: "2 meses",
            rendaFamiliar: 2000,
            idSituacaoProfissional: 1,
            cadastroCras: false,
            outroLocal: null,
            enfermoNaCasa: false,
            situacaoEnfermo: null,
            idOrganizacao: 2,
            responsavelVisita: 1,
            observacao: "observações",
            dtEntregaCesta: "2023-10-01",
            nacionalidade: 'Brasileiro',
            dependentes: [
                {
                    idPessoa: 3,
                    idade: 10,
                    idGrauParentesco: 1
                },
                {
                    idPessoa: 4,
                    idade: 5,
                    idGrauParentesco: 2
                }
            ]
        }

        const response = await criarDonatario(novoDonatario);
        console.log(response)
    }

    const handleSubmit = async () => {
        const donatarioFinal = { ...selectedDonatario, dependentes };

        if (!isEditMode) {
            try {
                const response = await criarDonatario(donatarioFinal);
                if (response.status === 200) {
                    alert("Donatário cadastrado com sucesso!");
                } else {
                    alert("Erro ao cadastrar donatário.");
                }
            }
            catch (error) {
                console.error("Erro ao cadastrar donatário:", error);
                alert("Erro ao cadastrar donatário.");
            }
        } else {
            console.log('editando:', donatarioFinal);
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
            tempoResidencia: '',
            rendaFamiliar: '',
            idSituacaoProfissional: '',
            cadastroCras: false,
            outroLocal: '',
            enfermoNaCasa: false,
            situacaoEnfermo: '',
            responsavelVisita: 1,
            observacao: '',
            dtEntregaCesta: '',
            dependentes: [],
        });
        setIsEditMode(false);
        setOpenModal(true);
        setDependentes([]);
    };

    return (
        <div className="container-donatarios">
            <div className="titulo">Donatarios</div>
            <button onClick={handleAddNew}>Adicionar novo donatario</button>
            <button onClick={adicionarDependenteAut}>
                Adicionar aaaaaaa
            </button>
            <div className="conteudo">
                {donatarios.map((donatario, index) => (
                    <div className="donatario" key={index}>
                        <button onClick={() => { setOpenModal(true); setSelectedDonatario({...donatario, dtNascimento: formatarDataBR(donatario.pessoa?.dtNascimento)}); console.log(donatario); setIsEditMode(true) }}>Editar</button>
                        Nome:{donatario?.pessoa.nome}<br />
                        CPF:{donatario.pessoa.cpf} Data de nascimento:{formatarDataBR(donatario.pessoa.dtNascimento)}<br />
                        Cidade: Nacionalidade:{donatario.nacionalidade}<br />
                        Sexo:{donatario.pessoa.sexo === 'M' ? 'Masculino' : 'Feminino'}<br />
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
                                {donatario.dependentes.map((dependente, i) => (
                                    <tr key={i}>
                                        <td>{dependente?.pessoa?.nome}</td>
                                        <td>{dependente?.grauParentesco?.grauParentesco}</td>
                                        <td>{calcularIdade(dependente?.pessoa?.dtNascimento)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        Data do cadastro: {formatarDataBR(donatario.dataCadastro)} Secretária: {donatario?.organizacao?.secretaria?.nome}<br />
                        Responsável pela visita: {donatario?.responsavel?.nome} Situação: {donatario.situacaoCadastral}<br />
                        Observações da secretária e da ação social: {donatario?.observacao}<br />
                        Data da entrega da cesta: {donatario?.dtEntregaCesta}<br />
                    </div>
                ))}
                <PessoaLocalizador
                    onSelect={(pessoa) => {
                        if (localizadorPara === 'donatario') {
                            setSelectedDonatario({
                                ...selectedDonatario,
                                idPessoa: pessoa.idPessoa,
                                nome: pessoa.nome,
                                CPF: pessoa.cpf,
                                dtNascimento: pessoa.dtNascimento,
                                email: pessoa.email,
                                sexo: pessoa.sexo,
                                telefone: pessoa.telefone,
                            });
                        } else {
                            const novoDependente = {
                                idPessoa: pessoa.idPessoa,
                                nome: pessoa.nome,
                                idade: pessoa.idade,
                                grauParentesco: pessoa.grauParentesco || '',
                            };
                            setDependentes(prev => [...prev, novoDependente]);
                        }
                    }}
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
                                            value={selectedDonatario.nome || selectedDonatario.pessoa?.nome}
                                            onClick={() => {
                                                setLocalizadorPara('donatario');
                                                setOpenLocalizadorPessoa(true);
                                            }}
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
                                            value={selectedDonatario.CPF || selectedDonatario.pessoa?.cpf}
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
                                            type="text"
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
                                        value={selectedDonatario.sexo || selectedDonatario.pessoa?.sexo}
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
                                            value={selectedDonatario.endereco || selectedDonatario.pessoa?.endereco}
                                            onChange={(e) => setSelectedDonatario({ ...selectedDonatario, endereco: e.target.value })}
                                            disabled
                                        />
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6} className="mb-3">
                                    <SituacaoHabitacionalSelect onChange={(situacao) => setSelectedDonatario({
                                        ...selectedDonatario, idSituacaoHabitacional: situacao
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
                                            value={selectedDonatario.telefone || selectedDonatario.pessoa?.telefone}
                                            onChange={(e) => setSelectedDonatario({ ...selectedDonatario, telefone: e.target.value })}
                                            disabled={true}
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
                                        onChange={(e) => setSelectedDonatario({
                                            ...selectedDonatario, enfermoNaCasa: e.target.value,
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
                            <button
                                type="button"
                                className="btn btn-primary mb-3"
                                onClick={() => {
                                    setLocalizadorPara('dependente');
                                    setOpenLocalizadorPessoa(true);
                                }}
                            >
                                Adicionar Morador
                            </button>
                            {dependentes.map((dependente, index) => (
                                <div key={index}>
                                    Nome: {dependente?.nome} Idade: {dependente?.idade}
                                    {<GrauParentescoSelect
                                        onChange={(grauParentesco) => {
                                            const updatedDependentes = [...dependentes];
                                            updatedDependentes[index].grauParentesco = grauParentesco;
                                            setDependentes(updatedDependentes);
                                        }}
                                        value={dependente.grauParentesco}
                                        placeholder="Selecione o grau de parentesco"
                                    />}
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => {
                                            setDependentes(dependentes.filter((_, i) => i !== index));
                                        }}
                                    >
                                        Remover
                                    </button>
                                </div>
                            ))}
                        </Form>
                    )}
                </CustomModal>
            </div>
        </div >
    )
}