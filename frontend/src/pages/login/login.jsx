import React, { useState, useContext } from "react";
import styles from "./login.module.css";
import { AuthContext } from "../../auth/Context.jsx";
import { loginPessoa } from "../../api/pessoa.jsx";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const submitLogin = async (e) => {
    e.preventDefault();

    if (!email || !senha) {
      return alert('Informe o e-mail e a senha para continuar!');
    }

    try {
      const response = await loginPessoa(email, senha);
      console.log(response);

      // if (response.data.token) {
      //   login(response.data.token);
      //   return navigate('/');
      // }
    } catch (error) {
      console.log(error);
      // if (error.response.status === 403) {
      //   return alert("Sem permissão.");
      // }
      // if (error.response.status === 401 || error.response.status === 404) {
      //   return alert('Email ou senha inválido, tente novamente!');
      // }
      // return alert('Erro inesperado, tente novamente mais tarde!');
    }
  }

  return (
    <div>
      <title>DoaCerto - Login</title>
      <div className={styles.pageCentral}>
        <div className={styles.backgroundHeader}>
          <h1>
            <b>Login</b>
          </h1>
        </div>
        <div className={styles.form}>
          <div className={styles.formContainer}>
            <form>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Email</label>
                  <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div className={styles.formGroup}>
                  <label>Senha</label>
                  <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)}></input>
                </div>
              </div>
              <div className={styles.submitContainer}>
                <button type="submit" className={styles.submitBtn} onClick={submitLogin}>
                  Login
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
