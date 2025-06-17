
import React, { useState } from 'react';
import AdminAuth from './AdminAuth';
import AdminDashboard from './AdminDashboard';

const AdminIndex = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuth = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen">
      {isAuthenticated ? (
        <AdminDashboard onLogout={handleLogout} />
      ) : (
        <AdminAuth onAuth={handleAuth} />
      )}
    </div>
  );
};

export default AdminIndex;
