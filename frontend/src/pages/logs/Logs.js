import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Logs.module.css';
import { getDreamLogs } from '../../services/dreams';

function Logs() {
    const navigate = useNavigate();
    const [logs, setLogs] = useState([]); 

    const goToDreamEntry = () => {
        navigate("/dreamentry");
    };

    useEffect(() => {
        const fetchLogs = async () => {
          const userId = sessionStorage.getItem('user_id');
          const Dreamlogs = await getDreamLogs(userId);
          if (Dreamlogs && Dreamlogs.dreams) {
            setLogs(Dreamlogs.dreams);
        } else {
            setLogs([]);
        }
        }
    
        fetchLogs();
      }, []);

    const handleRowClick = (logId) => {
        navigate(`/dream/${logId}`);
    };

    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/login");
    };

    return (
        <div className={classes.container}>
        <div className={classes.logsBox}>
            <button onClick={handleLogout} className={classes.logoutButton}>Logout</button>
            <h2 className={classes.title}>DREAM LOGS</h2>

            {logs.length > 0 ? (
                <table className={classes.logsTable}>
                    <thead>
                        <tr>
                            <th>Sr</th>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Tag</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map((log, index) => (
                            <tr key={log.dream_id} onClick={() => handleRowClick(log.dream_id)}>
                                <td>{index + 1}</td>
                                <td>{log.dream_title}</td>
                                <td>{log.dream_date}</td>
                                <td>{log.dream_tag}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className={classes.noLogsMsg}>No logs found.</p>
            )}

                <button className={classes.entryButton} onClick={goToDreamEntry}>Enter New Dream</button>
            </div>
        </div>
    );
}

export default Logs;
