import styles from "./Form.module.css";
import {useAuthentication} from "../hooks/useAuthentication"
import { useNavigate } from "react-router-dom";

const LoginForm = () => {

  const {storeToken} = useAuthentication()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    //Nesse handlesubmit você deverá usar o preventDefault,
    //enviar os dados do formulário e enviá-los no corpo da requisição 
    //para a rota da api que faz o login /auth
    //lembre-se que essa rota vai retornar um Bearer Token e o mesmo deve ser salvo
    //no localstorage para ser usado em chamadas futuras
    //Com tudo ocorrendo corretamente, o usuário deve ser redirecionado a página principal,com react-router
    //Lembre-se de usar um alerta para dizer se foi bem sucedido ou ocorreu um erro
    e.preventDefault();
    var url = 'https://dhodonto.ctdprojetos.com.br/auth';
    var login = e.target.login.value;
    var passwd = e.target.password.value;
    var body = JSON.stringify({"username": login,"password": passwd})

    var response = await fetch(url,{
      method:'POST',
      headers:{
        'Content-Type': "application/json"
      },
      body: body
    })

    //console.log(`request.status = ${response.status}`)
    if(response.status=="200"){
      //Colocação provisoria do token no session storage
      var token = await response.json()
      storeToken(token.token)
      navigate('/home',{replace:true})
      //sessionStorage.setItem("token",token.token)
    }

  };

  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div
        className={`text-center card container ${styles.card}`}
      >
        <div className={`card-body ${styles.CardBody}`}>
          <form onSubmit={handleSubmit}>
            <input
              className={`form-control ${styles.inputSpacing}`}
              placeholder="Login"
              name="login"
              required
            />
            <input
              className={`form-control ${styles.inputSpacing}`}
              placeholder="Password"
              name="password"
              type="password"
              required
            />
            <button className="btn btn-primary" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
