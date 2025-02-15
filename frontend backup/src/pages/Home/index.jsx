import './styles.css'

export default function Home() {
  return (
    <div className='home'>
      <h1>Bem-vindo à Nossa Aplicação!</h1>
      <p>Essa aplicação foi desenvolvida para a matéria de FullStack do professor Renan.</p>
      <p>
        O intuito dessa aplicação é fazer o consumo de uma API.
      </p>
      <p>
        API utilizada: <a href='https://thecatapi.com/'>The Cat API</a>
      </p>
      <p>
        Explore as funcionalidades e veja como o React transforma a experiência de desenvolvimento web!
      </p> 
    </div>
  );
}
