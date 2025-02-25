import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./header.module.css";
import Logo from "../../img/logo-doa-certo.png";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className={styles.header}>
      <img src={Logo} alt="Logo" className={styles.logo} />
      <nav className={styles.navLinks}>
        <a
          onClick={() => navigate("/")}
          className={location.pathname === "/" ? styles.activeLink : ""}
        >
          Home
        </a>
        <a
          onClick={() => navigate("/campanhas")}
          className={
            location.pathname === "/campanhas" ? styles.activeLink : ""
          }
        >
          Campanhas
        </a>
        <a
          onClick={() => navigate("/sobre")}
          className={location.pathname === "/sobre" ? styles.activeLink : ""}
        >
          Sobre
        </a>
      </nav>
      <div className={styles.authButtons}>
        <div className={styles.dropdown}>
          <button className={styles.loginBtn}>Registrar-se</button>
          <div className={styles.dropdownOptions}>
            <button
              className={styles.btnAuth}
              onClick={() => navigate("/registerDoador")}
            >
              Doador
            </button>
            <button
              className={styles.btnAuth}
              onClick={() => navigate("/registerPerson")}
            >
              Organização
            </button>
          </div>
        </div>
        <button className={styles.loginBtn} onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
    </header>
  );
};

export default Header;
