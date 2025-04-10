import { useState } from "react";
export default function Pessoa() {
    const [pessoas, setPessoas] = useState([]);

    async function list(){
        
    }

    return (
        <div className="container">
            <h1>Pessoa</h1>
            <p>Essa é a página de Pessoa</p>
        </div>
    );
}