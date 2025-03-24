import { useState, useEffect } from 'react';
import { listAliments } from '../../api/aliment';

export default function Aliment() {
    const [aliments, setAliments] = useState([])
    const [selectAliment, setSelectedAliment] = useState()
    const [isEditMode, setIsEditMode] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    async function list() {
        const response = await listAliments();
        setAliments(response.data);
    }

    useEffect(() => {
        list();
    }, []);

    return (
        aliments.map((aliment) => (
            <div key={aliment.idAliment}>
                <p>{aliment.aliment}</p>
            </div>
        ))
    );
}