
import React, { useState } from 'react';
import { ProjectForm } from '@/components/ProjectForm';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { Reports } from '@/components/Reports';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('projects');

  const renderContent = () => {
    switch (activeSection) {
      case 'projects':
        return (
          <div className="max-w-full">
            <div className="mb-4 lg:mb-6">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Project Management</h1>
              <p className="text-gray-600 text-sm lg:text-base">Create and manage real estate project details</p>
            </div>
            <ProjectForm />
          </div>
        );
      case 'reports':
        return <Reports />;
      case 'settings':
        return (
          <div className="max-w-full">
            <div className="mb-4 lg:mb-6">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Settings</h1>
              <p className="text-gray-600 text-sm lg:text-base">Configure your application settings</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <p className="text-gray-600">Settings panel coming soon...</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="max-w-full">
            <div className="mb-4 lg:mb-6">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Project Management</h1>
              <p className="text-gray-600 text-sm lg:text-base">Create and manage real estate project details</p>
            </div>
            <ProjectForm />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Header with Left-aligned Menu */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40">
        <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
            </SheetContent>
          </Sheet>
          <h1 className="text-lg font-semibold text-gray-800">Real Estate CRM</h1>
          <div className="w-8"></div> {/* Spacer for centering */}
        </div>
      </div>

      {/* Desktop Sidebar - Fixed to Left */}
      <div className="hidden lg:block lg:fixed lg:left-0 lg:top-0 lg:h-full lg:w-64 lg:z-30">
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      </div>

      {/* Main Content - Adjusted for fixed sidebar */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Mobile top padding */}
        <div className="lg:hidden h-16"></div>
        
        {/* Desktop Header */}
        <div className="hidden lg:block">
          <Header />
        </div>
        
        <main className="flex-1 p-3 sm:p-4 lg:p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
