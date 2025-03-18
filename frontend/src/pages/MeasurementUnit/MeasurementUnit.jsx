import { useState, useEffect } from "react";
import { insertMeasurementUnit, listMeasurementUnits, updateMeasurementUnit, deleteMeasurementUnit } from '../../api/measurementUnit';
import List from "../../components/List/List";
import CustomModal from "../../components/Modal/Modal";
import { Form, FloatingLabel, Row, Col } from 'react-bootstrap';

export default function MeasurementUnit() {
    const [measurementsUnits, setMeasurementsUnits] = useState([])
    const [selectMeasurementUnit, setSelectedMeasurementUnit] = useState()
    const [isEditMode, setIsEditMode] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    async function list() {
        const response = await listMeasurementUnits();
        setMeasurementsUnits(response.data);
    }

    useEffect(() => {
        list();
    }, []);

    const handleAddNew = () => {
        setSelectedMeasurementUnit({
            measurementUnit: ''
        });
        setIsEditMode(false);
        setOpenModal(true);
    };

    const handleSubmit = async () => {
        if (!isEditMode) {
            await insertMeasurementUnit(selectMeasurementUnit);
        } else {
            await updateMeasurementUnit(selectMeasurementUnit.idMeasurementUnit, selectMeasurementUnit)
        }
        setOpenModal(false);
        setSelectedMeasurementUnit(null);
        setIsEditMode(false);
        list();
    };

    const handleMeasurementUnitSituation = async (measurementUnit) => {
        await updateMeasurementUnit(measurementUnit.idMeasurementUnit, { ieSituation: measurementUnit.ieSituation === 'A' ? 'I' : 'A' });
        list();
    }

    const handleEdit = async (measurementUnit) => {
        setSelectedMeasurementUnit(measurementUnit);
        setIsEditMode(true);
        setOpenModal(true);
    }

    const handleDelete = async (idMeasurementUnit) => {
        await deleteMeasurementUnit(idMeasurementUnit);
        list();
    }

    const handleReset = () => {
        setOpenModal(false);
        setSelectedMeasurementUnit(null);
        setIsEditMode(false);
    }

    return (
        <div>
            <button onClick={handleAddNew}>Adicionar nova unidade de medida</button>
            <List>
                {measurementsUnits.map((index) => (
                    <li key={index.idMeasurementUnit}>
                        <div>
                            <span>{index.measurementUnit}</span>
                        </div>
                        <div className="buttons">
                            <button onClick={() => handleMeasurementUnitSituation(index)}>Alterar</button>
                            <button onClick={() => handleEdit(index)}>Editar</button>
                            <button onClick={() => handleDelete(index.idMeasurementUnit)}>Excluir</button>
                        </div>
                    </li>
                ))}
            </List>
            <CustomModal
                title={isEditMode ? "Editar Unidade de Medida" : "Cadastrar Unidade de medida"}
                submit={handleSubmit}
                reset={handleReset}
                submitText={isEditMode ? "Salvar Alterações" : "Cadastrar"}
                resetText="Cancelar"
                show={openModal}
                setShow={setOpenModal}
            >
                {selectMeasurementUnit && (
                    <Form>
                        <Row>
                            <Col md={6} className="mb-3">
                                <FloatingLabel controlId="floatingInput" label="Unidade de medida">
                                    <Form.Control
                                        type="text"
                                        placeholder="Unidade de medida"
                                        value={selectMeasurementUnit.measurementUnit}
                                        onChange={(e) => setSelectedMeasurementUnit({
                                            ...selectMeasurementUnit,
                                            measurementUnit: e.target.value
                                        })}
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