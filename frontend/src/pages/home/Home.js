import React from 'react';
import { useNavigate } from 'react-router-dom';  
import classes from './Home.module.css';

function Home() {
    const navigate = useNavigate(); 

    const navigateToLogin = () => {
        navigate("/login");  
    };

    return (
        <div className={classes.container}>
            <div className={classes.fairyTaleBox} onClick={() => console.log("Box clicked!")}>
                <h2 className={classes.title}>Night Saga - A Dream Journal</h2>
                <p className={classes.description}>
                    Dive into the sea of your dreams. Chronicle your night journeys and explore the wonders of your subconscious mind.
                </p>
                <button className={classes.loginButton} onClick={navigateToLogin}>Get Started</button>
            </div>
            <footer className={classes.footer}>2023@Night Saga</footer>
        </div>
    );
}

export default Home;
