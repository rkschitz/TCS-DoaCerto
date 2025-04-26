import { useEffect, useState } from "react"
import { criarDonatario, editarDonatario, excluirDonatario, listarDonatariosAtivos } from '../../api/donatario'
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
import styles from "./donatario.module.css";

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
            try {
                const response = await editarDonatario(donatarioFinal);
                if (response.status === 200) {
                    alert("Donatário editado com sucesso!");
                }
                else {
                    alert("Erro ao editar donatário.");
                }
                console.log(response)
            } catch (e) {
                console.error("Erro ao editar donatário:", e);
                alert("Erro ao editar donatário.");
            }
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

    const handleDelete = async (idDonatario) => {
        if (window.confirm("Você tem certeza que deseja excluir esse donatário?")) {
            const response = await excluirDonatario(idDonatario);
            if (response.status === 200) {
                alert("Donatário excluído com sucesso!");
            } else {
                alert("Erro ao excluir donatário.");
            }
            listar();
        }
    }

    const handleEdit = (person) => {
        setSelectedDonatario(person)
        setDependentes(person.dependentes.map((dependente) => ({
            idDependente: dependente.idDependente,
            idPessoa: dependente.pessoa.idPessoa,
            nome: dependente.pessoa.nome,
            idGrauParentesco: dependente.grauParentesco.idGrauParentesco
        })));
        setIsEditMode(true);
        setOpenModal(true);
    };

    const limparFormulario = () => {
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
    }

    const handleAddNew = () => {
        limparFormulario();
        setIsEditMode(false);
        setOpenModal(true);
        setDependentes([]);
    };

    const cpfMask = (value) => {
        if (!value) return '';
        return value
          .replace(/\D/g, '')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d{1,2})/, '$1-$2')
          .replace(/(-\d{2})\d+?$/, '$1');
      };

    const foneMask = (value) => {
        if (!value) return '';
        return value
          .replace(/\D/g, '')
          .replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
          .replace(/(-\d{4})\d+?$/, '$1');
      };
    
    return (
        <div className={styles.containerDonatarios}>
            <div className={styles.titulo}>Donatarios</div>
            <button onClick={handleAddNew}>Adicionar novo donatario</button>
            <button onClick={adicionarDependenteAut}>
                Adicionar aaaaaaa
            </button>
            <div className={styles.conteudo}>
                {donatarios.map((donatario, index) => (
                    <div className={styles.cardDonatario}>
                    <div className={styles.cardHeader}>
                      <h2>{donatario?.pessoa.nome}</h2>
                      <div>
                        <button className={styles.actionExcluir} onClick={() => handleDelete(donatario.idDonatario)}>Excluir</button>
                        <button className={styles.actionEditar} onClick={() => handleEdit(donatario)}>Editar</button>
                      </div>
                    </div>
                  
                    <div className={styles.cardContent}>
                      <div className={styles.section}>
                        <h4>Informações Pessoais</h4>
                        <p><strong>CPF:</strong> {cpfMask(donatario.pessoa.cpf)}</p>
                        <p><strong>Data de nascimento:</strong> {formatarDataBR(donatario.pessoa.dtNascimento)}</p>
                        <p><strong>Sexo:</strong> {donatario.pessoa.sexo === 'M' ? 'Masculino' : 'Feminino'}</p>
                      </div>
                  
                      <div className={styles.section}>
                        <h4>Contato</h4>
                        <p><strong>Telefone:</strong> {foneMask(donatario.pessoa.telefone)}</p>
                        <p><strong>Endereço:</strong> {donatario.endereco}</p>
                      </div>
                  
                      <div className={styles.section}>
                        <h4>Condição Social</h4>
                        <p><strong>Renda Familiar:</strong> {donatario.rendaFamiliar}</p>
                        <p><strong>Cadastro no CRAS:</strong> {donatario.cadastroCras ? 'Sim' : 'Não'}</p>
                        <p><strong>Situação Profissional:</strong> {donatario.situacaoProfissional.situacaoProfissional}</p>
                      </div>
                  
                      <div className={styles.section}>
                        <h4>Moradores</h4>
                        <table className={styles.tableMoradores}>
                          <thead>
                            <tr>
                              <th>Nome</th>
                              <th>Idade</th>
                              <th>Grau de Parentesco</th>
                            </tr>
                          </thead>
                          <tbody>
                            {donatario.dependentes.map((dep, i) => (
                              <tr key={i}>
                                <td>{dep?.pessoa?.nome}</td>
                                <td>{calcularIdade(dep?.pessoa?.dtNascimento)}</td>
                                <td>{dep?.grauParentesco?.grauParentesco}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                  
                      <div className={styles.footerInfo}>
                        <p><strong>Data do Cadastro:</strong> {formatarDataBR(donatario.dataCadastro)}</p>
                        <p><strong>Secretária:</strong> {donatario?.organizacao?.secretaria?.nome}</p>
                        <p><strong>Responsável pela Visita:</strong> {donatario?.responsavel?.nome}</p>
                        <p><strong>Observações:</strong> {donatario?.observacao}</p>
                        <p><strong>Entrega da Cesta:</strong> {donatario?.dtEntregaCesta}</p>
                      </div>
                    </div>
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
                                            value={!isEditMode ? selectedDonatario.nome : selectedDonatario.pessoa?.nome}
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
                                    <strong>Nome:</strong> {dependente?.nome} <strong>Idade:</strong> {dependente?.idade}
                                    {<GrauParentescoSelect
                                        onChange={(grauParentesco) => {
                                            const updatedDependentes = [...dependentes];
                                            updatedDependentes[index].idGrauParentesco = grauParentesco;
                                            setDependentes(updatedDependentes);
                                        }}
                                        value={dependente.idGrauParentesco}
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