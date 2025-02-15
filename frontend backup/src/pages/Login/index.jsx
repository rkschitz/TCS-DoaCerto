import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../auth/Context'
import { loginUser } from '../../api/user'
import './styles.css'
import InputFloatingLabel from '../../components/FloatLabel'
import { toast } from 'react-toastify'

export default function Login() {

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !senha) {
            return toast('Informe o e-mail e a senha para continuar!');
        }

        try {
            const response = await loginUser(email, senha);
            if (response.data.token) {
                login(response.data.token);
                return navigate('/');
            }
        } catch (error) {
            if (error.response.status === 403) {
                return toast("Sem permissão.");
            }
            if (error.response.status === 401 || error.response.status === 404) {
                return toast('Email ou senha inválido, tente novamente!');
            }
            return toast('Erro inesperado, tente novamente mais tarde!');
        }
    };

    return (
        <div className="container-login">
            <form>
                <div className="title">
                    <h1>LOGIN</h1>
                </div>
                <div className='div-input'>
                    <InputFloatingLabel type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        label="Email" />
                </div>
                <div className='div-input'>
                    <InputFloatingLabel type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        label="Senha" />
                </div>
                <span>Não tem cadastro? <Link to='/register'>Cadastre-se aqui</Link></span>
                <button type='submit' onClick={handleSubmit}>Entrar</button>
            </form>
        </div>
    )
}
