import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Login.module.css';
import { useLocation } from 'react-router-dom';
import { appUserLogin } from '../../services/dreams';

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const location = useLocation();
    const successMessage = location.state?.successMessage;

    const handleLogin = async (e) => {
        console.log("Logging in with:", username, password);
        const login = {
            username,
            password
        };

        const result = await appUserLogin(login);

        if (result.success) {
            setUsername('');
            setPassword('');
            sessionStorage.setItem('user_id', result.user_id);
            navigate("/dreamlogs");
        } else {
            setErrorMessage(result.message);
        }
    };

    const handleSignup = () => {
        navigate("/signup");
    };

    const handleLoginBoxClick = () => {
        if (successMessage) {
            navigate("/login", { state: { successMessage: null } });
        }
    };

    return (
        <div className={classes.container}>
            <div className={classes.loginBox} onClick={handleLoginBoxClick}>
            {successMessage && (<p className={classes.successMessage}>{successMessage}</p>)}
                <h2 className={classes.title}>Login</h2>
                {errorMessage && <p className={classes.errorMsg}>{errorMessage}</p>}
                <input
                    type="text"
                    placeholder="Username"
                    className={classes.inputField}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className={classes.inputField}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className={classes.buttons}>
                    <button className={classes.loginButton} onClick={handleLogin}>Login</button>
                    <button className={classes.signupButton} onClick={handleSignup}>Signup</button>
                </div>
            </div>
        </div>
    );
}

export default Login;
