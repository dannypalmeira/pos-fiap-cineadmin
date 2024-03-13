import React from 'react';
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";
import FilmeCard from "../components/FilmeCard";

export default function Filmes ({session}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFilmes();
  }, []);

  const fetchFilmes = async () => {
    const user = supabase.auth.user();
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("filmes")
        .select("*")

      if (error) throw error;
      setData(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Carregando Filmes...</div>;
  }

  const handleDelete = async (id) => {
    try {
      const user = supabase.auth.user();
      const { data, error } = await supabase
        .from("filmes")
        .delete()
        .eq("id", id)
      fetchFilmes();
      if (error) throw error;
      alert("Filme cancelado");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className={styles.container}>
     <Layout title={"Filmes"}>
            <h1>Catálogo de Filmes</h1>

      <div className={styles.home}>
           <div className="col-sm-6 col-md-4"> 
            <p className={styles.filmesHeading}>
              Olá <span className={styles.email}>{session}</span>
            </p>
            <div>
                <p className={styles.filmesHeading}>Aqui estão os filmes disponíveis</p>
                <FilmeCard data={data} handleDelete={handleDelete} />
              </div>
          </div>
      </div>
      </Layout>
    </div>
  );
}

