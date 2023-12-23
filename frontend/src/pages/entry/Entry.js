import React, { useState } from 'react';
import classes from './Entry.module.css';
import { useNavigate } from 'react-router-dom';
import { createEntry } from '../../services/dreams';
import { getText } from '../../services/dreams';

function Entry() {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [tag, setTag] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const navigate = useNavigate();

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        
        if (file) {
            const reader = new FileReader();
            
            reader.onload = async function(loadEvent) {
                const base64Image = loadEvent.target.result.split(',')[1];
                const result = await getText(base64Image);
    
                if (result && result.text) {
                    setDescription(result.text);
                }
            };
            
            reader.readAsDataURL(file);
        }
    };


    const handleTitleClick = () => {
            setSuccessMessage(null);
            setSuccessMessage(null);
            navigate("/dreamentry");
    };

    const handleBackClick = () => {
        navigate("/dreamlogs");
      };

    const handleEntry = async (e) => {

        const user_id = sessionStorage.getItem('user_id');
        const dreamData = {
            user_id,
            title,
            date,
            description,
            tag
        };

        const result = await createEntry(dreamData);

        if (result.success) {
            setTitle('');
            setDate('');
            setDescription('');
            setTag('');
            setSuccessMessage(result.message);
        } else {
            setErrorMessage(result.message);
        }
    };

    return (
        <div className={classes.container}>
            <div className={classes.entryBox}>
                {errorMessage && <p className={classes.errorMsg}>{errorMessage}</p>}
                {successMessage && (<p className={classes.successMessage}>{successMessage}</p>)}
                <button className={classes.backButton} onClick={handleBackClick}>Back</button>
                <h2 className={classes.title} onClick={handleTitleClick}>Dream Entry</h2>
                <input 
                    type="text" 
                    placeholder="Dream Title" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={classes.inputField}
                />
                <input 
                    type="date" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={classes.inputField}
                />
                <textarea 
                    placeholder="Dream Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={classes.textarea}
                />
                <input 
                    type="file" 
                    onChange={handleImageUpload}
                    className={classes.fileInput}
                />
                <select 
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    className={classes.dropdown}
                >
                    <option className={`${classes.disabled} ${classes.selected}`}> -- select an option -- </option>
                    <option value="Nightmare">Nightmare</option>
                    <option value="Sweet Dream">Sweet Dream</option>
                    <option value="Neutral">Neutral</option>
                </select>
                
                <button className={classes.submitButton} onClick={handleEntry}>Submit</button>
            </div>
        </div>
    );
}

export default Entry;
