import React, { useState, useEffect } from 'react';

const useCharacterCounter = (limit = 50) => {
  const [text, setText] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [remainingCount, setRemainingCount] = useState(limit);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const currentLength = text.length;
    const remaining = limit - currentLength;
    
    setCharCount(currentLength);
    setRemainingCount(remaining);
    setShowWarning(remaining <= 10 && remaining >= 0);
  }, [text, limit]);

  return { text, setText, charCount, remainingCount, showWarning };
};

const CharacterDisplay = ({ text, onTextChange, charCount, remainingCount, showWarning }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' }}>
      <textarea
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        maxLength={50} 
        rows={4}
        style={{ resize: 'none', padding: '5px', fontFamily: 'monospace' }}
      />
      
      <div style={{ fontSize: '14px' }}>
        <p style={{ margin: '0 0 10px 0' }}>Characters: {charCount}</p>
        <p style={{ margin: '0' }}>Remaining: {remainingCount}</p>
      </div>

      {showWarning && (
        <p style={{ color: 'red', fontSize: '14px', margin: '10px 0 0 0' }}>
          ⚠ Only {remainingCount} characters left!
        </p>
      )}
    </div>
  );
};

export default function App() {
  const { text, setText, charCount, remainingCount, showWarning } = useCharacterCounter(50);

  return (
    <div style={{ padding: '20px', fontFamily: 'serif' }}>
      <h2>Live Character Counter</h2>
      
      <CharacterDisplay 
        text={text}
        onTextChange={setText}
        charCount={charCount}
        remainingCount={remainingCount}
        showWarning={showWarning}
      />
    </div>
  );
}