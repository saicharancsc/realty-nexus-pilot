import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AgentAuth from './pages/AgentAuth';
import AgentDashboard from './pages/AgentDashboard';
import AdminIndex from './pages/AdminIndex';

function App() {
  // Initialize state by reading from localStorage to make the session persistent.
  const [agentData, setAgentData] = useState(() => {
    const savedAgent = localStorage.getItem('agentData');
    return savedAgent ? JSON.parse(savedAgent) : null;
  });

  const handleAuth = (data: any) => {
    // Save the logged-in user's data to localStorage.
    localStorage.setItem('agentData', JSON.stringify(data));
    setAgentData(data);
  };

  const handleLogout = () => {
    // Remove the user's data from localStorage on logout.
    localStorage.removeItem('agentData');
    setAgentData(null);
  };

  return (
    <Router>
      <Routes>
        {/* Default path redirects to login */}
        <Route 
          path="/" 
          element={<Navigate to="/login" />} 
        />
        
        {/* Login Route */}
        <Route 
          path="/login" 
          element={!agentData ? <AgentAuth onAuth={handleAuth} /> : <Navigate to="/agent" />} 
        />
        
        {/* Agent Dashboard Route (Protected) */}
        <Route 
          path="/agent" 
          element={agentData ? <AgentDashboard agentData={agentData} onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        
        {/* Admin Route */}
        <Route path="/admin" element={<AdminIndex />} />

      </Routes>
    </Router>
  );
}

export default App;