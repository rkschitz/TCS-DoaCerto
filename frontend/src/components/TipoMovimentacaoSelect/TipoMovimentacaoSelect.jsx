import React, { useEffect, useState } from "react";
import Select from "../Select/Select";
// import { buscarTodos } from "../../api/situacaoProfissional";

export default function TipoMovimentacaoSelect({ onChange, value }) {
    const [opcoes, setOpcoes] = useState([]);

        setOpcoes([
            { value: 'E', descricao: 'Entrada' },
            { value: 'S', descricao: 'Saida' }
        ]);

    return (
        <Select
            options={opcoes}
            onChange={onChange}
            value={value}
            label="Tipo da movimentação"
        />
    )
}