import { useState } from "react";
import Select from "../Select/Select";
import { buscarTodos } from "../../api/grauParentesco";

export default function GrauParentescoSelect({ }) {

    const [opcoes, setOpcoes] = useState([]);

    const buscarOpcoes = async () => {
        const response = await buscarTodos();
        if (response.status === 200) {
            setOpcoes(response.data.map(item => ({ value: item.idGrauParentesco, label: item.grauParentesco })));
        } else {
            alert("Erro ao buscar opções de grau de parentesco.");
        }
    }

    useEffect(() => {
        buscarOpcoes();
    }, []);

    return (
        <Select 
            options={opcoes}
            placeholder="Selecione o grau de parentesco"
        />
    )
}

