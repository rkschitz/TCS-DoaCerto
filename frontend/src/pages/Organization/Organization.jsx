import { useEffect, useState } from "react";
import List from "../../components/List/List";
import { updateOrganization, insertOrganization, deleteOrganization, listOrganizations } from "../../api/organization";
import CustomModal from "../../components/Modal/Modal";
import { Form, FloatingLabel, Row, Col }  from 'react-bootstrap';
import { Select, MenuItem } from '@material-ui/core';

export default function Organization() {
    const [organizations, setOrganizations] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectOrganization, setSelectedOrganization] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    async function list() {
        const response = await listOrganizations();
        console.log(response)
        setOrganizations(response.data);
    }

    useEffect(() => {
        list();
    }, []);

    const handleSubmit = async () => {
        if (!isEditMode) {
            await insertOrganization(selectOrganization);
        } else {
            await updateOrganization(selectOrganization.idOrganization, selectOrganization)
        }
        setOpenModal(false);
        setSelectedOrganization(null);
        setIsEditMode(false);
        list();
    };

    const handleReset = () => {
        setOpenModal(false);
        setSelectedOrganization(null);
        setIsEditMode(false);
    };

    const handleEdit = (organization) => {
        setSelectedOrganization(organization);
        setIsEditMode(true);
        setOpenModal(true);
    };

    const handleOrganizationSituation = async (organization) => {
        await updateOrganization(organization.idOrganization, { ieSituation: organization.ieSituation === 'A' ? 'I' : 'A' });
        list();
    }

    const handleAddNew = () => {
        setSelectedOrganization({
            organization: '',
            idPerson: ''
        });
        setIsEditMode(false);
        setOpenModal(true);
    };

    const handleDelete = async (idOrganization) => {
        await deleteOrganization(idOrganization);
        list();
    }

    return (
        <div>
            <button onClick={handleAddNew}>Adicionar nova organização</button>
            <List>
                {organizations.map((index) => (
                    <li key={index.idOrganization}>
                        <div>
                            <span>{index.organization}</span>
                            <span>{index.idPerson}</span>
                            <span>{index.ieSituation}</span>
                        </div>
                        <div className="buttons">
                            <button onClick={() => handleOrganizationSituation(index)}>Alterar</button>
                            <button onClick={() => handleEdit(index)}>Editar</button>
                            <button onClick={() => handleDelete(index.idOrganization)}>Excluir</button>
                        </div>
                    </li>
                ))}
            </List>
            <CustomModal
                title={isEditMode ? "Editar Organização" : "Cadastrar Organização"}
                submit={handleSubmit}
                reset={handleReset}
                submitText={isEditMode ? "Salvar Alterações" : "Cadastrar"}
                resetText="Cancelar"
                show={openModal}
                setShow={setOpenModal}
            >
                {selectOrganization && (
                    <Form>
                        <Row>
                            <Col md={6} className="mb-3">
                                <FloatingLabel controlId="floatingInput" label="Organização">
                                    <Form.Control
                                        type="text"
                                        placeholder="Organização"
                                        value={selectOrganization.organization}
                                        onChange={(e) => setSelectedOrganization({
                                            ...selectOrganization,
                                            organization: e.target.value
                                        })}
                                    />
                                </FloatingLabel>
                            </Col>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Age"
                                onChange={handleChange}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                            <Col md={6} className="mb-3">
                                <FloatingLabel controlId="floatingInput" label="Pessoa">
                                    <Form.Control
                                        type="text"
                                        placeholder="Pessoa"
                                        value={selectOrganization.idPerson}
                                        onChange={(e) => setSelectedOrganization({
                                            ...selectOrganization,
                                            idPerson: e.target.value
                                        })}
                                    />
                                </FloatingLabel>
                            </Col>

                            {/* <Col md={6} className="mb-3">
                                <FloatingLabel controlId="floatingInput" label="Email address">
                                    <Form.Control
                                        type="email"
                                        placeholder="organization@example.com"
                                        value={selectOrganization.email}
                                        onChange={(e) => setSelectedOrganization({ ...selectOrganization, email: e.target.value })}
                                    />
                                </FloatingLabel>
                            </Col> */}
                        </Row>

                        {/* <Row>
                            <Col md={6} className="mb-3">
                                <FloatingLabel controlId="floatingPassword" label="Password">
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={selectOrganization.password}
                                        onChange={(e) => setSelectedOrganization({ ...selectOrganization, password: e.target.value })}
                                    />
                                </FloatingLabel>
                            </Col>

                            <Col md={6} className="mb-3">
                                <FloatingLabel label="Data de nascimento">
                                    <Form.Control
                                        type="date"
                                        placeholder="Data de nascimento"
                                        value={selectOrganization.birthdate}
                                        onChange={(e) => setSelectedOrganization({ ...selectOrganization, birthdate: e.target.value })}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row> */}
                    </Form>
                )}
            </CustomModal>
        </div>
    );
}
