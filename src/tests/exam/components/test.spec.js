import { render, screen, renderWithRouter } from "../../test-utils"
import Login from '../../../Routes/Login';
import DetailCard from '../../../Components/DetailCard'
import Home from '../../../Routes/Home'
import App from '../../../App'
import Detail from '../../../Routes/Detail'

test('should show login form', () => {
  render(<Login />)
  expect(screen.getByText('Login')).toBeInTheDocument();
});

test('should show login form', () => {
  render(<Login />)
  expect(screen.getByText('Send')).toBeInTheDocument();
});

test('Teste pagina HOME - testando se foram gerados todos os cards', () => {
  var url = 'https://dhodonto.ctdprojetos.com.br/dentista';
  var listaDentistas = fetch(url).then(((response)=>{return response.json()}))
  render(<Home />)
  for (dentista in listaDentistas){
    expect(screen.getByText(dentista.nome)).toBeInTheDocument()
  };
 });

 test('Teste pagina detalhes', () => {
  //renderWithRouter(<Home />,{ route:'', path:'/home' })
  //renderWithRouter(<Detail />,{route:"dentist/:id",path:"/dentist/c3e6cf30-dccc-4e21-935a-8efe9344677e"})
  //expect(screen.getByText('test')).toBeInTheDocument();
  renderWithRouter(<App />,{route:'',path:'/dentist/c3e6cf30-dccc-4e21-935a-8efe9344677e'});
  expect(screen.getByText('Detalhes do Dentista Admin')).toBeInTheDocument();
});