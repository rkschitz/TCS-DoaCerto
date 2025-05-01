import React from "react";
import styles from "./Home.module.css";
import img from "../../img/imgHome.png";

export default function Home() {
    return (
      <section className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>SALVE VIDAS</h1>
          <h1 className={styles.title2}>DOE COMIDA</h1>
          <p className={styles.text}>
            O "Doe Certo" é um site voltado para a doação de alimentos não
            perecíveis, com o objetivo de conectar pessoas e empresas dispostas a
            doar com aqueles que mais precisam. A plataforma permite que
            mercados, estabelecimentos comerciais e indivíduos possam cadastrar
            suas doações, enquanto entidades beneficentes, como igrejas e ONGs,
            fazem a gestão e distribuição dos alimentos para comunidades carentes.
          </p>
          <button className={styles.button}>Doe Agora!</button>
        </div>
      </section>
    );
}
