import { useEffect, useState } from "react"
import { listarDonatariosAtivos } from '../../api/donatario'

export default function Donatario() {

    const [donatarios, setDonatarios] = useState([])

    async function listar() {
        const response = await listarDonatariosAtivos();
        setDonatarios(response.data)
    }

    useEffect(() => {
        listar();
    }, []);

    return (
        <div className="container-donatarios">
            <div className="titulo">Donatarios</div>
            <div className="conteudo">
                {donatarios.map((donatario, index) => (
                    <a key={index}>{donatario.idDonatario}</a>
                ))}
            </div>
        </div>
    )
}