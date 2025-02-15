import './styles.css';

export default function Footer() {
  return (
    <footer>
        <p>&copy; {new Date().getFullYear()} Desenvolvido por Renan Dias e Ruhan Schitz.</p>
        <nav className='footer-nav'>
          <a>SENAC JOINVILLE</a>
        </nav>
    </footer>
  );
}
