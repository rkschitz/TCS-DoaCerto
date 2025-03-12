import { useEffect, useState } from "react";
import List from "../../components/List/List";
import { listPersons, updatePerson, insertPerson, deletePerson } from "../../api/person"; // Assumindo que addPerson e editPerson sejam funções da sua API.
import CustomModal from "../../components/Modal/Modal";
import { Form, FloatingLabel, Row, Col } from 'react-bootstrap';

export default function ListPersons() {
    const [persons, setPersons] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    
    async function list() {
        const response = await listPersons();
        setPersons(response.data);
    }
    
    useEffect(() => {
        list();
    }, []);

    const handleSubmit = async () => {
        if (!isEditMode) {
            await insertPerson(selectedPerson);
        } else {
            console.log(selectedPerson);
            await updatePerson(selectedPerson.idPerson, selectedPerson)
        }
        setOpenModal(false);
        setSelectedPerson(null);
        setIsEditMode(false);
        list();
    };

    const handleReset = () => {
        setOpenModal(false);
        setSelectedPerson(null);
        setIsEditMode(false);
    };

    const handleEdit = (person) => {
        setSelectedPerson(person);
        setIsEditMode(true);
        setOpenModal(true);
    };

    const handleAddNew = () => {
        setSelectedPerson({
            CPF: '',
            name: '',
            email: '',
            password: '',
            number: '',
            birthdate: ''
        });
        setIsEditMode(false);
        setOpenModal(true);
    };

    const handleDelete = async (idPerson) => {
        await deletePerson(idPerson);
        list();
    }

    return (
        <div>
            <button onClick={handleAddNew}>Adicionar nova pessoa</button>
            <List>
                {persons.map((person) => (
                    <li key={person.idPerson}>
                        <div>
                            <span>{person.name}</span>
                            <span>{person.email}</span>
                            <span>{person.role}</span>
                        </div>
                        <div className="buttons">
                            <button onClick={() => handleEdit(person)}>Editar</button>
                            <button onClick={() => handleDelete(person.idPerson)}>Excluir</button>
                        </div>
                    </li>
                ))}
            </List>
            <CustomModal
                title={isEditMode ? "Editar Pessoa" : "Cadastrar Pessoa"}
                submit={handleSubmit}
                reset={handleReset}
                submitText={isEditMode ? "Salvar Alterações" : "Cadastrar"}
                resetText="Cancelar"
                show={openModal}
                setShow={setOpenModal}
            >
                {selectedPerson && (
                    <Form>
                        <Row>
                        <Col md={6} className="mb-3">
                                <FloatingLabel controlId="floatingInput" label="Nome">
                                    <Form.Control
                                        type="text"
                                        placeholder="Nome"
                                        value={selectedPerson.name}
                                        onChange={(e) => setSelectedPerson({
                                            ...selectedPerson,
                                            name: e.target.value
                                        })}
                                    />
                                </FloatingLabel>
                            </Col>
                            <Col md={6} className="mb-3">
                                <FloatingLabel controlId="floatingInput" label="CPF">
                                    <Form.Control
                                        type="text"
                                        placeholder="CPF"
                                        value={selectedPerson.CPF}
                                        onChange={(e) => setSelectedPerson({
                                            ...selectedPerson,
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
                                        value={selectedPerson.email}
                                        onChange={(e) => setSelectedPerson({ ...selectedPerson, email: e.target.value })}
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
                                        value={selectedPerson.password}
                                        onChange={(e) => setSelectedPerson({ ...selectedPerson, password: e.target.value })}
                                    />
                                </FloatingLabel>
                            </Col>

                            <Col md={6} className="mb-3">
                                <FloatingLabel label="Data de nascimento">
                                    <Form.Control
                                        type="date"
                                        placeholder="Data de nascimento"
                                        value={selectedPerson.birthdate}
                                        onChange={(e) => setSelectedPerson({ ...selectedPerson, birthdate: e.target.value })}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>
                    </Form>
                )}
            </CustomModal>
        </div>
    );
}
