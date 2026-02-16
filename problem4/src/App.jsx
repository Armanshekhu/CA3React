import React, { useState, useRef, useEffect } from 'react';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [focusCount, setFocusCount] = useState(0);

  const inputRef = useRef(null);
  
  const historyRef = useRef([]);

  useEffect(() => {
    
    console.log(`Side effect: Message history updated. Total messages: ${messages.length}`);
  }, [messages]);

  const handleSubmit = () => {
    const newMessage = inputRef.current.value;
    if (newMessage.trim() !== "") {
      
      historyRef.current.push(newMessage);
      
      
      setMessages([...historyRef.current]);
    
      inputRef.current.value = ""; 
    }
  };

  const handleFocusInput = () => {
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleFocus = () => {
   
    setFocusCount((prev) => prev + 1);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'serif' }}>
      <h2>Focus Tracker & Message History</h2>
      
      <div style={{ display: 'flex', gap: '5px', marginBottom: '15px' }}>
        <input
          type="text"
          placeholder="Type message..."
          ref={inputRef}
          onFocus={handleFocus}
          style={{ padding: '3px' }}
        />
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleFocusInput}>Focus Input</button>
      </div>

      <p style={{ fontSize: '14px', marginBottom: '15px' }}>
        Focus count: {focusCount}
      </p>

      <h4 style={{ margin: '0 0 10px 0' }}>Messages:</h4>
      
      <div style={{ fontSize: '14px', marginBottom: '15px' }}>
        {messages.map((msg, index) => (
          <p key={index} style={{ margin: '5px 0' }}>- {msg}</p>
        ))}
      </div>

      <p style={{ fontSize: '14px', margin: 0 }}>
        <b>History in Ref (no re-render):</b> {historyRef.current.join(', ')}
      </p>
    </div>
  );
}