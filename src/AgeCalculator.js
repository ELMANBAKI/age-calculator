import React, { useState } from 'react';
import './AgeCalculator.css';

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState({ year: '', month: '', day: '' });
  const [age, setAge] = useState(null);
  const [error, setError] = useState('');

  const calculateAge = () => {
    const today = new Date();
    const birth = new Date(birthDate.year, birthDate.month - 1, birthDate.day);

    if (birth > today) {
      setError('Birthdate cannot be in the future');
      setAge(null);
      return;
    }

    setError('');
    
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      days += 30;
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    setAge({ years, months, days });
  };

  const handleChange = (e) => {
    setBirthDate({
      ...birthDate,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="age-calculator">
      <h1>Age Calculator</h1>
      <div className="input-group">
        <input
          type="number"
          name="year"
          placeholder="Year"
          value={birthDate.year}
          onChange={handleChange}
          className="input-field"
          required
        />
        <input
          type="number"
          name="month"
          placeholder="Month"
          value={birthDate.month}
          onChange={handleChange}
          className="input-field"
          required
        />
        <input
          type="number"
          name="day"
          placeholder="Day"
          value={birthDate.day}
          onChange={handleChange}
          className="input-field"
          required
        />
        <button onClick={calculateAge} className="calculate-button">Calculate Age</button>
      </div>
      {error && <p className="error">{error}</p>}
      {age && (
        <div className="result">
          <h2>Your Age</h2>
          <p>{age.years} years, {age.months} months, and {age.days} days old.</p>
        </div>
      )}
    </div>
  );
};

export default AgeCalculator;
