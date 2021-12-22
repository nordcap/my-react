import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import MyButton from '../components/UI/button/MyButton'
import MyInput from '../components/UI/input/MyInput'
import { AuthContext } from '../context';

const Login = () => {
	const { isAuth, setIsAuth } = useContext(AuthContext);
	let navigate = useNavigate();

	const login = event => {
		event.preventDefault();
		setIsAuth(true);
		localStorage.setItem('auth', 'true');
		navigate('/posts');
	}

	return (
		<div>
			<h1>Страница для логина</h1>
			<form onSubmit={login}>
				<MyInput type="text" placeholder='Введите логин' />
				<MyInput type="password" placeholder='Введите пароль' />
				<MyButton>Войти</MyButton>
			</form>
		</div>
	)
}

export default Login
