import React, { useState, useEffect } from 'react';
import { useAuth } from '../app/providers/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserScreen: React.FC = () => {
  const { user, logout } = useAuth();
  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //implement updating
  };

  const handleLogout = async () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ width: '300px', margin: '50px auto' }}>
      {user ? (
        <form onSubmit={handleSubmit}>
          <h2>User Information</h2>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
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
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
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
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Leave empty to keep unchanged"
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
            Update Info
          </button>
          <button
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: 'red',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </form>
      ) : (
        <div>No user data available</div>
      )}
    </div>
  );
};

export default UserScreen;
