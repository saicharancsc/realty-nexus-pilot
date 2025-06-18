
import React, { useState } from 'react';
import AgentAuth from './AgentAuth';
import AgentDashboard from './AgentDashboard';

const AgentIndex = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [agentData, setAgentData] = useState(null);

  const handleAuth = (data: any) => {
    setAgentData(data);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAgentData(null);
  };

  return (
    <div className="min-h-screen">
      {isAuthenticated ? (
        <AgentDashboard agentData={agentData} onLogout={handleLogout} />
      ) : (
        <AgentAuth onAuth={handleAuth} />
      )}
    </div>
  );
};

export default AgentIndex;
