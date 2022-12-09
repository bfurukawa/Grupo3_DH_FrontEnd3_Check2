import { useEffect, useState } from "react";
import ScheduleFormModal from "./ScheduleFormModal";
import styles from "./DetailCard.module.css";
import { response } from "msw";

const DetailCard = (props) => {

  const [ dentista, setDentista ] = useState({});
  
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
    
      <h1>Detail about Dentist {'Nome do Dentista'} </h1>
      <section className="card col-sm-12 col-lg-6 container">
        {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
        <div
          className={`card-body row`}
        >
          <div className="col-sm-12 col-lg-6">
            <img
              className="card-img-top"
              src="/images/doctor.jpg"
              alt="doctor placeholder"
            />
          </div>
          <div className="col-sm-12 col-lg-6">
            <ul className="list-group">
              <li className="list-group-item">Nome: {dentista.nome}</li> 
              <li className="list-group-item"> Sobrenome: {dentista.sobrenome}</li> 
              <li className="list-group-item">Usuário: {dentista.usuario}</li>
              <li className="list-group-item">Matrícula: {dentista.matricula}</li>
            </ul>
            <div className="text-center">
              {/* //Na linha seguinte deverá ser feito um teste se a aplicação
              // está em dark mode e deverá utilizado o css correto */}
              <button
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                className={`btn btn-light ${styles.button
                  }`}
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
