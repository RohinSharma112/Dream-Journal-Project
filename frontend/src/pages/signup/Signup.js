import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Signup.module.css';
import { appUserSignup } from '../../services/dreams';

function Signup() {
    const navigate = useNavigate();

    const [uname, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);


    useEffect(() => {
        setErrorMessage(null);
    }, []);

    const handleSignup = async (e) => {
        if (password !== retypePassword) {
            setErrorMessage("Passwords do not match!");
            return;
        }

        const signup = {
            uname,
            username,
            email,
            password
        };

        const result = await appUserSignup(signup);
        console.log(result.success);

        if (result.success) {
            setName('');
            setUsername('');
            setEmail('');
            setPassword('');
            setRetypePassword('')
            navigate("/login", {
                state: { successMessage: "User registered successfully! You can now log in." }
            });
        } else {
            setErrorMessage(result.message);
        }
    };

    return (
        <div className={classes.container}>
            <div className={classes.signupBox}>
                <h2 className={classes.title}>Signup</h2>
                {errorMessage && <p className={classes.errorMsg}>{errorMessage}</p>}
                <input
                    type="text"
                    placeholder="Name"
                    className={classes.inputField}
                    value={uname}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Username"
                    className={classes.inputField}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    className={classes.inputField}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className={classes.inputField}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Retype Password"
                    className={classes.inputField}
                    value={retypePassword}
                    onChange={(e) => setRetypePassword(e.target.value)}
                />
                <button className={classes.signupButton} onClick={handleSignup}>Signup</button>
            </div>
        </div>
    );
}

export default Signup;

