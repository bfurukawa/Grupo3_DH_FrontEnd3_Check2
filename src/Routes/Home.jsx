import { useEffect, useState } from "react";
import Card from "../Components/Card";

const Home = () => {

  const [listaDentistas, setListaDentistas] = useState([])
  const [cards, setCards] = useState('')

  var cardsTela = ''

  async function buscarDentistas() {
    var url = 'https://dhodonto.ctdprojetos.com.br/dentista';

    setListaDentistas(await fetch(url).then(((response)=>{return response.json()})))
  }

  useEffect(() => {
    //Nesse useEffect, deverá ser obtido todos os dentistas da API
    //Armazena-los em um estado para posteriormente fazer um map
    //Usando o componente <Card />
    buscarDentistas()
  }, []);

  useEffect(()=>setCards(listaDentistas.map((dentista)=><Card nome={dentista.nome} sobrenome={dentista.sobrenome} matricula={dentista.matricula} usuario={dentista.usuario.username}></Card>)),[listaDentistas])

  return (
    <>
      <h1>Home</h1>
      <div className="card-grid container">
        {cards}
      </div>
    </>
  );
};

export default Home;
