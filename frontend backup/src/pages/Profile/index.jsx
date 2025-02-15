import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../auth/Context";
import { getAllUsers, deleteUser, getContext } from "../../api/user";
import UserModal from "../../components/UserForm/index";
import './styles.css';

export default function Profile() {
    const { role, id } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (role === 'admin') {
                await fetchUsers();
            } else {
                const response = await getContext();
                setUsers([response]);
            }
        };

        fetchData();
    }, [role, isUpdate]);

    const fetchUsers = async () => {
        try {
            const response = await getAllUsers();
            setUsers(response.data);
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await deleteUser(userId);
            setUsers((prevUsers) => prevUsers.filter(user => user.id !== userId));
        } catch (error) {
            console.error("Erro ao excluir usuário:", error);
        }
    };

    const handleCreateUser = () => {
        setSelectedUser(null);
        setIsCreating(true);
        setShowModal(true);
    };

    return (
        <div className="profile">
            <h1>Profile</h1>
            {role === 'admin' ? (
                <>
                    <h2>Lista de Usuários</h2>

                    <ul>
                        {users.map(user => (
                            <li key={user.id}>
                                <span>{user.nome} ({user.email}) ({user.role})</span>
                                <button onClick={() => {
                                    setSelectedUser(user);
                                    setIsCreating(false);
                                    setShowModal(true);
                                }}>
                                    Alterar
                                </button>
                                <button className="botao-excluir" onClick={() => handleDeleteUser(user.id)}>Excluir</button>
                            </li>

                        ))}
                        <button onClick={handleCreateUser}>Adicionar Usuário</button>
                    </ul>
                </>
            ) : (
                <div>
                    <h2>Seus Dados</h2>
                    {users.map(user => (
                        <div key={user.id}>
                            <span>{user.nome} ({user.email}) ({user.role})</span>
                            <button onClick={() => {
                                setSelectedUser(user);
                                setIsCreating(false);
                                setShowModal(true);
                            }}>
                                Alterar
                            </button>
                        </div>
                    ))}

                    <button onClick={() => handleDeleteUser(id)}>Excluir Conta</button>
                </div>

            )}
            <UserModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                setIsUpdate={setIsUpdate}
                user={selectedUser}
                isCreating={isCreating}
            />
        </div>
    );
}
