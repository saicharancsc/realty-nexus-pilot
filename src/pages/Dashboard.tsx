
import React, { useState } from 'react';
import { ProjectForm } from '@/components/ProjectForm';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('projects');

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          {activeSection === 'projects' && (
            <div className="max-w-7xl mx-auto">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Project Management</h1>
                <p className="text-gray-600">Create and manage real estate project details</p>
              </div>
              <ProjectForm />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
