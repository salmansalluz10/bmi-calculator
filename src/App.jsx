import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';

function App() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [message, setMessage] = useState('');

  const calculateBMI = (e) => {
    e.preventDefault();
    if (height === '' || weight === '') {
      alert('Please enter your height and weight.');
      return;
    }

    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    setBmi(bmiValue);

    if (bmiValue < 18.5) {
      setMessage('You are underweight.');
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      setMessage('You have a normal weight.');
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      setMessage('You are overweight.');
    } else {
      setMessage('You are obese.');
    }
  };

  const clearForm = () => {
    setHeight('');    
    setWeight('');  
    setBmi(null);     
    setMessage('');   
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">BMI - Calculator</h1>
      <Form onSubmit={calculateBMI}>
        <Form.Group controlId="formHeight">
          <Form.Label style={{color:'white'}}>Height (cm)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter your height in cm"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formWeight" className="mt-3">
          <Form.Label style={{color:'white'}}>Weight (kg)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter your weight in kg"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </Form.Group>

        <div className="d-flex flex-column me-5 mt-3">
          <Button variant="primary" type="submit" className="me-5 fw-bold">
            Calculate BMI
          </Button>

          <Button variant="secondary" type="button" onClick={clearForm} className='d-block mt-3 me-5 fw-bold' style={{marginLeft:'100px',backgroundColor:'red'}}>
            Clear
          </Button>
        </div>
      </Form>

      {bmi && (
        <Alert variant="info" className="mt-4">
          <strong>Your BMI is: {bmi}</strong>
        </Alert>
      )}

      {message && (
        <Alert variant="warning" className="mt-2">
          {message}
        </Alert>
      )}
    </Container>
  );
}

export default App;
