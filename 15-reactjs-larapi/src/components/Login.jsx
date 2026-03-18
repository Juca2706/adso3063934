// View: Login

import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();

        // Captura los datos del formulario de login
        const email = e.target.email.value;
        const password = e.target.password.value;

        // Enviamos los datos a App.jsx para que los procese usando una metologia de Props-Callback
        onLogin(email, password);
    };

    return (
        <main id="login">
            <header>
                <img src="/imgs/title-login.png" alt="Login" />
            </header>
            <form id="loginForm" onSubmit={handleSubmit}>
                <label htmlFor="email">
                    <span><i className="ph ph-envelope"></i> Email:</span>
                    <input type="email" id="email" name="email" placeholder="Example@gmail.com" required />
                </label>
                <label htmlFor="password">
                    <span><i className="ph ph-password"></i> Password:</span>
                    <input type="password" id="password" name="password" placeholder="**********" required />
                </label>
                <hr className="divisor" />
                <button type="submit" className="btn-login"><i className="ph ph-sign-in"></i> Login</button>
                <button type="button" className="btn-register" onClick={(console.log("Ir a Registro"))}><i className="ph ph-user-circle-plus"></i> Register</button>
                <a href="javascript:;">Have you forgotten your password?</a>
            </form>
        </main>
    );
};

export default Login;