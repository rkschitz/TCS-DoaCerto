import { useState } from "react";
import Select from "../Select/Select";
import { buscarTodos } from "../../api/grauParentesco";
import { useEffect } from "react";

export default function GrauParentescoSelect({ onChange, value }) {

    const [opcoes, setOpcoes] = useState([]);

    const buscarOpcoes = async () => {
        // const response = await buscarTodos();
        // if (response.status === 200) {
        //     setOpcoes(response.data.map(item => ({ value: item.idGrauParentesco, label: item.grauParentesco })));
        // } else {
        //     alert("Erro ao buscar opções de grau de parentesco.");
        // }

        setOpcoes([
            { value: 1, descricao: 'Pai' },
            { value: 2, descricao: 'Mãe' }
        ]);
    }

    useEffect(() => {
        buscarOpcoes();
    }, []);

    return (
        <Select
            options={opcoes}
            onChange={onChange}
            value={value}
            placeholder="Selecione o grau de parentesco"
        />
    )
}

