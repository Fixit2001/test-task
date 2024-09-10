import React, { useState } from 'react';
import { useAuth } from '../app/providers/AuthContext';
import { useNavigate } from 'react-router-dom';

enum LoginPageMode {
  Register,
  Login,
}

const Login: React.FC = () => {
  const [loginPageMode, setLoginPageMode] = useState(LoginPageMode.Login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const { login, register } = useAuth();

  const toggleLoginRegister = () => {
    setLoginPageMode(
      loginPageMode === LoginPageMode.Login
        ? LoginPageMode.Register
        : LoginPageMode.Login,
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loginPageMode === LoginPageMode.Login) {
      await login(email, password);
      navigate('/user');
    } else {
      await register(email, password, name, phone);
      setPassword('');
      setLoginPageMode(LoginPageMode.Login);
    }
  };

  return (
    <div style={{ width: '300px', margin: '50px auto' }}>
      <form onSubmit={handleSubmit}>
        <h2>
          {loginPageMode === LoginPageMode.Login ? 'Login' : 'Register'} page
        </h2>
        {loginPageMode === LoginPageMode.Register && (
          <>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="email">Name:</label>
              <input
                type="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '8px',
                  marginTop: '5px',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="phone">Phone:</label>
              <input
                type="phone"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '8px',
                  marginTop: '5px',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </>
        )}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '5px',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '5px',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: 'blue',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            marginBottom: '20px',
          }}
        >
          Submit
        </button>
      </form>
      <button onClick={toggleLoginRegister}>Toggle Login/Register</button>
    </div>
  );
};

export default Login;
