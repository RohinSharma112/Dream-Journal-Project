import React, { useState, useEffect } from 'react';
import classes from './DreamInfo.module.css';
import { useParams } from 'react-router-dom';
import { getDreamById, DesiredDateformat } from '../../services/dreams';

function DreamInfo() {
    const { id } = useParams();
    const [dreamData, setDreamData] = useState(null);

    useEffect(() => {
        const fetchDream = async () => {
        const DreamData = await getDreamById(id);
          if (DreamData) {
            setDreamData(DreamData.dream);
        } else {
            setDreamData(null);
        }
        }
    
        fetchDream();
      }, []);

    if (!dreamData) {
        return <div className={classes.loading}>Loading...</div>;
    }

    return (
        <div className={classes.container}>
            <div className={classes.dreamBox}>
                <h2 className={classes.dream_title}>{dreamData.dream_title}</h2>
                
                <div className={classes.dataContainer}>
                    <p><strong>Date:</strong> {DesiredDateformat(dreamData.dream_date)}</p>
                    <p className={classes.datatag}><strong>{dreamData.dream_tag}</strong> </p>
                </div>
                
                <p className={classes.description}>{dreamData.dream_description}</p>
            </div>
        </div>
    );
}

export default DreamInfo;
