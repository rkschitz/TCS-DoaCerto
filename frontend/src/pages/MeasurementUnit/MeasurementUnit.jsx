import { useState } from "react";
import { insertMeasurementUnit, updateMeasurementUnit } from '../../api/measurementUnit';

export default function MeasurementUnit() {
    const [measurementsUnits, setMeasurementsUnits] = useState([])
    const [selectMeasurementUnit, setSelectedMeasurementUnit] = useState()
    const [isEditMode, setIsEditMode] = useState(false);
    const [openModal, setOpenModal] = useState(false);

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
        setSelectedOrganization(null);
        setIsEditMode(false);
        list();
    };

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
                            <FloatingLabel controlId="floatingInput" label="Organização">
                                <Form.Control
                                    type="text"
                                    placeholder="Organização"
                                    value={selectMeasurementUnit.organization}
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