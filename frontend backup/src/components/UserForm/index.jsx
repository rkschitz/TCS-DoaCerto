import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createUser, updateUser } from '../../api/user';
import { AuthContext } from '../../auth/Context';
import { toast } from 'react-toastify';

function UserModal({ show, handleClose, setIsUpdate, user }) {
    const { id, role } = useContext(AuthContext);

    const [userId, setUserId] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [userRole, setUserRole] = useState('viewer');

    useEffect(() => {
        if (user) {
            setUserId(user.id);
            setNome(user.nome);
            setEmail(user.email);
            setUserRole(user.role);
        } else {
            resetForm();
        }
    }, [user]);

    const resetForm = () => {
        setUserId('');
        setNome('');
        setEmail('');
        setSenha('');
        setUserRole('viewer');
    };

    const handleSubmit = async () => {
        const newUser = {
            nome,
            email,
            senha,
            userRole,
        };

        try {
            if (user) {
                await updateUser(userId, newUser);
                toast('Usuário atualizado com sucesso!');
            } else {
                await createUser(newUser);
                toast('Novo usuário criado com sucesso!');
            }

            setIsUpdate(true);
            handleClose();
        } catch (error) {
            console.error('Erro ao salvar o usuário:', error);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{user ? 'Alterar Usuário' : 'Adicionar Novo Usuário'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Nome</label>
                            <input
                                type="text"
                                className="form-control"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Senha</label>
                            <input
                                type="password"
                                className="form-control"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                            />
                        </div>
                        {role === 'admin' && (
                        <div className="mb-3">
                            <label className="form-label">Role</label>
                            <select
                                className="form-control"
                                value={userRole}
                                onChange={(e) => setUserRole(e.target.value)}
                                required
                            >
                                <option value="viewer">Viewer</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>)}
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

export default UserModal;
