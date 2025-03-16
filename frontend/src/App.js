import React, { useState, useEffect } from 'react';


function App() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000')
            .then((response) => response.text())
            .then((data) => setMessage(data));
    }, []);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>React Frontend</h1>
            <p>{message}</p>
        </div>
    );
}

export default App;
