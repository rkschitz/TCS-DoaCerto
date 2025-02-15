import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { createBreed } from '../../api/breed';
import { createUserBreed } from '../../api/userBreed';
import { updateBreed } from '../../api/breed';
import { AuthContext } from '../../auth/Context';
import { toast } from 'react-toastify';

function BreedModal({ show, handleClose, setIsUpdate, breed }) {
    const { id } = useContext(AuthContext);

    const [breedId, setBreedId] = useState('');
    const [name, setName] = useState('');
    const [weight, setWeight] = useState('');
    const [lifeSpan, setLifeSpan] = useState('');
    const [origin, setOrigin] = useState('');
    const [temperament, setTemperament] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        if (breed) {
            setBreedId(breed.breedId); // Preencher o ID (não será alterado)
            setName(breed.name);
            setWeight(breed.weight);
            setLifeSpan(breed.life_span);
            setOrigin(breed.origin);
            setTemperament(breed.temperament);
            setImage(breed.image);
        } else {
            resetForm(); // Resetar se for uma nova raça
        }
    }, [breed]);

    const resetForm = () => {
        setBreedId('');
        setName('');
        setWeight('');
        setLifeSpan('');
        setOrigin('');
        setTemperament('');
        setImage('');
    };

    const handleSubmit = async () => {
        const newBreed = {
            breedId,
            name,
            weight,
            life_span: lifeSpan,
            origin,
            temperament,
            image,
        };

        try {
            if (breed) {
                await updateBreed(breedId, newBreed);
                toast('Raça atualizada com sucesso!');
            } else {
                const response = await createBreed(newBreed);
                await createUserBreed(id, response.breedId);
                toast('Nova raça salva com sucesso!');
            }

            setIsUpdate(true);
            handleClose();
        } catch (error) {
            console.error('Erro ao salvar a raça:', error);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{breed ? 'Alterar Raça' : 'Adicionar Nova Raça'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">ID</label>
                            <input
                                type="text"
                                className="form-control"
                                value={breedId}
                                onChange={(e) => setBreedId(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Nome</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Peso</label>
                            <input
                                type="text"
                                className="form-control"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Esperança de Vida</label>
                            <input
                                type="text"
                                className="form-control"
                                value={lifeSpan}
                                onChange={(e) => setLifeSpan(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Origem</label>
                            <input
                                type="text"
                                className="form-control"
                                value={origin}
                                onChange={(e) => setOrigin(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Temperamento</label>
                            <input
                                type="text"
                                className="form-control"
                                value={temperament}
                                onChange={(e) => setTemperament(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Imagem URL</label>
                            <input
                                type="text"
                                className="form-control"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                required
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default BreedModal;
