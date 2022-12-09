import { useEffect, useState } from "react";
import ScheduleFormModal from "./ScheduleFormModal";
import styles from "./DetailCard.module.css";
import { response } from "msw";
import {useThemeContext} from "../hooks/useTheme"

const DetailCard = (props) => {

  const [ dentista, setDentista ] = useState({});
  const { theme } = useThemeContext()
  
  let complemento = props.parametro;

  let url = `https://dhodonto.ctdprojetos.com.br/dentista?matricula=`+props.parametro.id;
    useEffect(() => {
    
    fetch(url).then(function(response){
      response.json().then(function(data) {
      const dentistaEscolhido = {
        nome: data.nome,
        sobrenome: data.sobrenome,
        usuario: data.usuario.username,
        matricula:data.matricula
      }
      setDentista(dentistaEscolhido)
      console.log(dentista)
    });  
  })
  }, []);

  return (

    <>
    
      <h1 className={`${theme}`}>Detail about Dentist {'Nome do Dentista'} </h1>
      <section className={`card col-sm-12 col-lg-6 container ${theme}`}>
        {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
        <div
          className={`card-body row ${theme}`}
        >
          <div className={`col-sm-12 col-lg-6 ${theme}`}>
            <img
              className="card-img-top"
              src="/images/doctor.jpg"
              alt="doctor placeholder"
            />
          </div>
          <div className={`col-sm-12 col-lg-6 ${theme}`}>
            <ul className="list-group">
              <li className={`list-group-item  ${theme}`}>Nome: {dentista.nome}</li> 
              <li className={`list-group-item  ${theme}`}> Sobrenome: {dentista.sobrenome}</li> 
              <li className={`list-group-item  ${theme}`}>Usuário: {dentista.usuario}</li>
              <li className={`list-group-item  ${theme}`}>Matrícula: {dentista.matricula}</li>
            </ul>
            <div className="text-center">
              {/* //Na linha seguinte deverá ser feito um teste se a aplicação
              // está em dark mode e deverá utilizado o css correto */}
              <button
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                className={`btn btn-light ${styles.button} ${theme}`}
              >
                Marcar consulta
              </button>
            </div>
          </div>
        </div>
      </section>
      <ScheduleFormModal />
    </>
  );
};

export default DetailCard;
