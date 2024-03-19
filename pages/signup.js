import { useState } from "react";
import { supabase } from "../utils/supabase";
import styles from "../styles/Signup.module.css";

const Signup = () => {
  const initialState = {
    email: "",
    password: "",
    tipo:"usuario",
  };

  const [form, setForm] = useState(initialState);

  const { email, password, tipo } = form;

  const handleChange = (e) => {
    if (e.target.name === "tipo") {
      setForm({ ...form, tipo: e.target.value });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className={styles.container}>
      <h1>Cadastre-se</h1>
      <div className={styles.formContainer}>
        <input
          type="text"
          value={email}
          name="email"
          onChange={handleChange}
          className={styles.input}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          name="password"
          onChange={handleChange}
          className={styles.input}
          placeholder="Password"
        />
        <div className={styles.radioContainer}>
          <label className={styles.radio}>
            <input
            type="radio"
            value="usuario"
            name="tipo"
            checked={tipo === 'usuario'}
            onChange={handleChange}></input>
              <span>Usuário</span>
          </label>
          <label className={styles.radio}>
            <input
            type="radio"
            value="admin"
            name="tipo"
            checked={tipo === 'admin'}
            onChange={handleChange}></input>
              <span>Administrador</span>
          </label>
        </div>
        <button
         className={styles.button}
        onClick={async () => {
          const { user, error } = await supabase.auth.signUp({
            email,
            password,
          });

          if (error) {
            alert(error.message);
          } else if (user === null) {
            alert("User is null. Signup failed.");
          } else {
            const userId = user.id;
            const { data, error: dbError } = await supabase
              .from("users")
              .insert([{ email, tipo, user_id: userId }]);

            if (dbError) {
              alert(dbError.message);
            } else {
              alert('Verifique seu e-mail para obter o link de login!');
              setForm(initialState);
            }
          }
        }}
      >
        Enviar
      </button>
      </div>
    </div>
  );
};

export default Signup;
