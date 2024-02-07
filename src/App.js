import './App.css';
import React, { useState } from 'react';
import InputComponent from './components/InputComponent';
function App() {
  const [message, setMessage] = useState('');

  const sendMessageToServer = async (message) => {
    try {
      const response = await fetch('/api/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message })
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log(data.reply); // Use the response data
    } catch (error) {
      console.error('Error:', error);
    }
  };

  
  const fetchGPTResponse = async (prompt) => {
    try {
      const response = await fetch('/api/gpt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    return data;
    } catch(e) {
      console.error(e);
    }
    
  }

  const l = fetchGPTResponse("testing");
  console.log(l);

  sendMessageToServer('Hello, Server!');
  return (
    <div className="App">
      <header className="App-header">

        <div>
          Hello
          <InputComponent />  
          <p>{message}</p>
        </div>
       
      </header>
    </div>
  );
}

export default App;
