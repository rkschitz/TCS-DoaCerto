import { useEffect, useState } from "react";
import OrganizacaoModal from "../../components/OrganizacaoModal/OrganizacaoModal";
import { buscarOrganizacoes } from "../../api/organizacao";
import styles from "./Organizacao.module.css";

export default function Organizacao() {
  const [organizacoes, setOrganizacoes] = useState([]);
  const [abrirModal, setAbrirModal] = useState(false);
  const [organizacaoSelecionada, setOrganizacaoSelecionada] = useState(null);

  const listarOrganizacoes = async () => {
    const response = await buscarOrganizacoes();
    setOrganizacoes(response.data);
  };

  useEffect(() => {
    listarOrganizacoes();
  }, []);

    return (
        <div className={styles.containerOrganizacao}>
            <div className={styles.header}>
                <button className={styles.addButton} onClick={() => {
                    setAbrirModal(true);
                    setOrganizacaoSelecionada(null);
                }}>
                    Adicionar organização
                </button>
            </div>

            <OrganizacaoModal
                show={abrirModal}
                organizacaoSelecionada={organizacaoSelecionada}
                setShow={setAbrirModal}
            />

            <div className={styles.cardsGrid}>
                {organizacoes.map((organizacao) => (
                    <div key={organizacao.idOrganizacao} className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h2 className={styles.nome}>{organizacao.organizacao}</h2>
                            <button className={styles.editarButton} onClick={() => {
                                setOrganizacaoSelecionada(organizacao);
                                setAbrirModal(true);
                            }}>
                                Editar
                            </button>
                        </div>

                        <div className={styles.info}>
                            <p>CNPJ: {organizacao.cnpj}</p>
                            <p>Telefone: {organizacao.telefone}</p>
                            <p>Email: {organizacao.email}</p>
                            <p>IE: {organizacao.ieSituacao}</p>
                            <p>Secretária: {organizacao.secretaria?.nome}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}