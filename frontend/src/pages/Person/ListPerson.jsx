import { useEffect, useState } from "react";
import List from "../../components/List/List";
import { listPersons } from "../../api/person";
import CustomModal from "../../components/Modal/Modal";
import { Form, FloatingLabel, Row, Col } from 'react-bootstrap';

export default function ListPersons() {
    const [persons, setPersons] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState(null);

    useEffect(() => {
        async function list() {
            const response = await listPersons();
            setPersons(response.data);
        }
        list();
    }, []);

    const handleSubmit = () => {
        setOpenModal(false);
    };

    const handleReset = () => {
        setOpenModal(false);
    };

    const handleEdit = (person) => {
        console.log(person)
        setSelectedPerson(person);
        setOpenModal(true);
    };

    return (
        <div>
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
                            <button>Excluir</button>
                        </div>
                    </li>
                ))}
            </List>
            <CustomModal
                title="Edit Person"
                submit={handleSubmit}
                reset={handleReset}
                submitText="Save Changes"
                resetText="Cancel"
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
                )
                }
            </CustomModal >
        </div >
    );
}
