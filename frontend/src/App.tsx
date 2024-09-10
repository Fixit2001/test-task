import './App.css';
import AppRoutes from './app/routes';
import { AuthWrapper } from './app/providers/AuthContext';

function App() {
  return (
    <div className="App">
      <AuthWrapper>
        <AppRoutes />
      </AuthWrapper>
    </div>
  );
}

export default App;
