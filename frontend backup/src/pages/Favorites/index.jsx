import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getUserBreeds } from "../../api/user";
import BreedModal from '../../components/BreedForm/index';
import { AuthContext } from '../../auth/Context';
import Button from 'react-bootstrap/Button';
import { getAllUserBreeds, unfavoriteBreed } from '../../api/userBreed';
import './styles.css'

export default function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const { id, role } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [currentBreed, setCurrentBreed] = useState(null); // Para armazenar a raça atual ao alterar

    const getFavorites = async (userId) => {
        try {
            const response = await getUserBreeds(userId);
            return response.data;
        } catch (error) {
            toast(error);
        }
    };

    const unfavorite = (id) => async () => {
        try {
            await unfavoriteBreed(id);
            const newFavorites = favorites.filter((favorite) => favorite.id !== id);
            setFavorites(newFavorites);
        } catch (error) {
            handleErrors(error);
        }
    }

    const handleEdit = (breed) => {
        setCurrentBreed(breed);
        setIsUpdate(true);
        setShowModal(true);
    }

    useEffect(() => {
        const fetchData = async () => {
            if (role === 'admin') {
                const data = await getAllUserBreeds();
                setFavorites(data);
            } else {
                const data = await getFavorites(id);
                setFavorites(data);
            }
        };
        fetchData();
        setIsUpdate(false);
    }, [role, id, isUpdate]);

    return (
        <div className="favorites">
            <h1>Favoritos</h1>
            {/* <Button variant="primary" onClick={() => { setCurrentBreed(null); setIsUpdate(false); setShowModal(true); }}>
                Adicionar Nova Raça
            </Button> */}
            
            {favorites.length > 0 ? (
                favorites.map((favorite) => (
                    <div key={favorite.breedId} className="breed-list"> {/* Nova div envolvendo */}
                        <div className="breed"> {/* Sua div original com a class "breed" */}
                            {id === favorite.userId && <p className="favorite-button">Minha</p>}
                            <p>ID: {favorite.breedId}</p>
                            <button className="unfavorite-button" onClick={unfavorite(favorite.id)}>
                                {favorite.isCreated === true ? 'Excluir' : 'Desfavoritar 💔'}
                            </button>
                            {favorite.isCreated === true && <button className="favorite-button" onClick={() => handleEdit(favorite)}>Alterar</button>}
                            <img src={favorite.image} alt={`Imagem da raça ${favorite.breedId}`} className="breed-image" />
                        </div>
                    </div>
                ))
            ) : (
                <p>Nenhum favorito encontrado.</p>
            )}
            
            <BreedModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                setIsUpdate={setIsUpdate}
                breed={currentBreed}
            />
        </div>
    );
}
