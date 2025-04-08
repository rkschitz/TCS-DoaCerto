import { useEffect, useState } from "react"
import { listarDonatariosAtivos } from '../../api/donatario'

export default function Donatario() {

    const [donatarios, setDonatarios] = useState([])

    async function listar() {
        try {
            const response = await listarDonatariosAtivos();
            console.log(response.data);
            setDonatarios(response.data);
        } catch (error) {
            console.error("Erro ao buscar donatários:", error);
        }
    }
    useEffect(() => {
        listar();
    }, []);

    return (
        <div className="container-donatarios">
            <div className="titulo">Donatarios</div>
            <div className="conteudo">
                {donatarios.map((donatario, index) => (
                    <div className="donatario" key={index}>
                        Nome:{donatario.pessoa.nome}<br/>
                        Data de nascimento:{donatario.pessoa.dtNascimento} CPF:{donatario.pessoa.cpf}<br/>
                        
                    </div>
                ))}
            </div>
        </div>
    )
}