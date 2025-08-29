import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard/Dashboard';
import OrganizationDashboard from './components/Dashboard/OrganizationDashboard';
import ProjectList from './components/Projects/Projects';
import TestConnection from './components/TestConnection';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<TestConnection />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/org-dashboard" element={<OrganizationDashboard />} />
            <Route path="/projects" element={<ProjectList />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
