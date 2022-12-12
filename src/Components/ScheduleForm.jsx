import { useContext, useEffect, useState } from "react";
import styles from "./ScheduleForm.module.css";
import {useThemeContext} from "../hooks/useTheme"
import {useAuthentication} from "../hooks/useAuthentication"


const ScheduleForm = () => {
  const { theme } = useThemeContext()
  const { token } = useAuthentication()
  const [listaDentistas, setListaDentistas] = useState([]);
  const [listaPacientes, setListaPacientes] = useState([]);
  const [listaPacienteModal, setListaPacienteModal] = useState('');
  const [msgErro, setMsgErro] = useState();

  async function buscarDentistas() {
    var urlDentistas = 'https://dhodonto.ctdprojetos.com.br/dentista';

    setListaDentistas(await fetch(urlDentistas).then(((response)=>{return response.json()})))
  }

  async function buscarPacientes() {
    var urlPacientes = 'https://dhodonto.ctdprojetos.com.br/paciente';

    setListaPacientes(await fetch(urlPacientes).then(((response)=>{return response.json()})))
    
  }

  useEffect(() => {
    //Nesse useEffect, você vai fazer um fetch na api buscando TODOS os dentistas
    //e pacientes e carregar os dados em 2 estados diferentes
    buscarDentistas();
    buscarPacientes();
  }, []);

  async function popularListaPacienteModal() {
    
    setListaPacienteModal(listaPacientes.body.map((item, index) => (
      <option key={index} value={item.matricula}>
        {item.nome} {item.sobrenome}
      </option> )))
  }

  useEffect(() => {
    popularListaPacienteModal()
   
  }, [listaPacientes]);

  const handleSubmit = async (event) => {
    //Nesse handlesubmit você deverá usar o preventDefault,
    //obter os dados do formulário e enviá-los no corpo da requisição 
    //para a rota da api que marca a consulta
    //lembre-se que essa rota precisa de um Bearer Token para funcionar.
    //Lembre-se de usar um alerta para dizer se foi bem sucedido ou ocorreu um erro
    event.preventDefault();
    var url = 'http://dhodonto.ctdprojetos.com.br/consulta'
    var dentista = listaDentistas[event.target.dentist.selectedIndex]
    var paciente = listaPacientes.body[event.target.patient.selectedIndex]
    var data = event.target.appointmentDate.value

    //console.log(dentista)
    //console.log(paciente)
    //console.log(data)

    var body = {
      "paciente": {
        "nome": paciente.nome,
        "sobrenome": paciente.sobrenome,
        "matricula": paciente.matricula,
        "usuario": {
          "username": paciente.usuario.username
        },
        "endereco": {
          "id": paciente.endereco.id,
          "logradouro": paciente.endereco.logradouro,
          "numero": paciente.endereco.numero,
          "complemento": paciente.endereco.complemento,
          "bairro": paciente.endereco.bairro,
          "municipio": paciente.endereco.municipio,
          "estado": paciente.endereco.estado,
          "cep": paciente.endereco.cep,
          "pais": paciente.endereco.pais
        },
        "dataDeCadastro": paciente.endereco.dataDeCadastro
      },
      "dentista": {
        "nome": dentista.nome,
        "sobrenome": dentista.sobrenome,
        "matricula": dentista.matricula,
        "usuario": {
          "username": dentista.usuario.username
        }
      },
      "dataHoraAgendamento": data
    }
    
    console.log(body)
    var response = await fetch(url,{
      method:'POST',
      headers:{
        'Content-Type': "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    })

    if(response.status!=200){
      setMsgErro(<p className={styles.msgErro}> Houve um erro para marcar a consulta</p>)
    }else{
      setMsgErro()
    }
  };

  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div
        className={`text-center container ${theme}`}
      >
        <form onSubmit={handleSubmit}>
          <div className={`row ${styles.rowSpacing} `}>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="dentist" className="form-label">
                Dentista
              </label>
              <select className="form-select" name="dentist" id="dentist">
                {listaDentistas.map((item, index) => (
                <option key={index} value={item.matricula}>
                  {item.nome} {item.sobrenome}
                </option> ))}
              </select>
            </div>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="patient" className="form-label">
                Patiente
              </label>
              <select className="form-select" name="patient" id="patient">
              {/* {console.log(JSON.stringify(listaPacientes.body))} */}
             {listaPacienteModal}
              </select>
            </div>
          </div>
          <div className={`row ${styles.rowSpacing}`}>
            <div className="col-12">
              <label htmlFor="appointmentDate" className="form-label">
                Data
              </label>
              <input
                className="form-control"
                id="appointmentDate"
                name="appointmentDate"
                type="datetime-local"
              />
            </div>
          </div>
          <div className={`row ${styles.rowSpacing}`}>
            {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
        {msgErro}
            <button
              className={`btn btn-light ${styles.button
                }`}
              type="submit"
            >
              Schedule
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ScheduleForm;
