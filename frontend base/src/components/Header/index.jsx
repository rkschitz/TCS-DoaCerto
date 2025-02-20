import { Link } from 'react-router-dom';
import './styles.css';
// import logo from "../../assets/images/logo.png";
// import LogoutButton from '../Logout';
import { useContext } from 'react';
import { AuthContext } from '../../auth/Context';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default function Header() {

    const { token, role } = useContext(AuthContext);

    return (
        <Navbar >
            <Container>
                <Navbar.Brand href="/">
                    {/* <img src={logo} alt="Logo" /> */}
                </Navbar.Brand>
                <Nav >
                    <Nav.Link href="/" className='text-dark'>Home</Nav.Link>
                    <Nav.Link href="/favorites" className='text-dark'>Favorites</Nav.Link>
                    <Nav.Link href="/feed" className='text-dark'>Feed</Nav.Link>
                    {token && <Nav.Link href="/profile" className='text-dark'>Profile</Nav.Link>}
                    {/* {token && <LogoutButton />} */}
                </Nav>
            </Container>
        </Navbar>
    );
}
