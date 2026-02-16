import React, { useState, useEffect } from 'react';

const useTemperatureSync = () => {
  const [celsius, setCelsius] = useState('');
  const [fahrenheit, setFahrenheit] = useState('');
  const [lastEdited, setLastEdited] = useState(null);

  useEffect(() => {
    if (lastEdited === 'c') {
      if (celsius === '') {
        setFahrenheit('');
      } else {
        const parsedC = parseFloat(celsius);
        if (!isNaN(parsedC)) {
          setFahrenheit(((parsedC * 9 / 5) + 32).toFixed(2));
        }
      }
    } else if (lastEdited === 'f') {
      if (fahrenheit === '') {
        setCelsius('');
      } else {
        const parsedF = parseFloat(fahrenheit);
        if (!isNaN(parsedF)) {
          setCelsius(((parsedF - 32) * 5 / 9).toFixed(2));
        }
      }
    }
  }, [celsius, fahrenheit, lastEdited]);

  const onCelsiusChange = (value) => {
    setLastEdited('c');
    setCelsius(value);
  };

  const onFahrenheitChange = (value) => {
    setLastEdited('f');
    setFahrenheit(value);
  };

  return { celsius, fahrenheit, onCelsiusChange, onFahrenheitChange };
};

const TemperatureInputs = ({ celsius, fahrenheit, onCelsiusChange, onFahrenheitChange }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <div>
        <label style={{ display: 'inline-block', width: '80px' }}>Celsius:</label>
        <input
          type="number"
          value={celsius}
          onChange={(e) => onCelsiusChange(e.target.value)}
        />
      </div>
      <div>
        <label style={{ display: 'inline-block', width: '80px' }}>Fahrenheit:</label>
        <input
          type="number"
          value={fahrenheit}
          onChange={(e) => onFahrenheitChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default function App() {
  const { celsius, fahrenheit, onCelsiusChange, onFahrenheitChange } = useTemperatureSync();

  return (
    <div style={{ padding: '20px', fontFamily: 'serif' }}>
      <h2>Temperature Converter</h2>
      
      <TemperatureInputs
        celsius={celsius}
        fahrenheit={fahrenheit}
        onCelsiusChange={onCelsiusChange}
        onFahrenheitChange={onFahrenheitChange}
      />
    </div>
  );
}