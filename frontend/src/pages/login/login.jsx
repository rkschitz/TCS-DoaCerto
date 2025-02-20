import React from "react";
import styles from "./login.module.css";

const login = () => {
  return (
    <>
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
                    <input type="email" placeholder="Email"></input>
                  </div>
                  <div className={styles.formGroup}>
                    <label>Senha</label>
                    <input type="password" placeholder="Senha"></input>
                  </div>
                </div>
                <div className={styles.submitContainer}>
                  <button type="submit" className={styles.submitBtn}>
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
    </>
  );
};

export default login;
