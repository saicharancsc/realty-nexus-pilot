
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Edit, LogOut, Building2 } from 'lucide-react';
import { ProjectForm } from '@/components/ProjectForm';
import { ShortFormOnboarding } from '@/components/ShortFormOnboarding';

interface AgentDashboardProps {
  agentData: any;
  onLogout: () => void;
}

const AgentDashboard: React.FC<AgentDashboardProps> = ({ agentData, onLogout }) => {
  const [selectedOption, setSelectedOption] = useState<'selection' | 'full' | 'short'>('selection');

  const handleOptionSelect = (option: 'full' | 'short') => {
    setSelectedOption(option);
  };

  const handleBackToSelection = () => {
    setSelectedOption('selection');
  };

  if (selectedOption === 'full') {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 lg:px-6 py-3 lg:py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Building2 className="w-6 h-6 text-green-600" />
              <div>
                <h1 className="text-lg lg:text-xl font-semibold text-gray-800">
                  Full Onboarding Details
                </h1>
                <p className="text-sm text-gray-600">Agent: {agentData.name}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={handleBackToSelection} variant="outline" size="sm">
                Back to Options
              </Button>
              <Button onClick={onLogout} variant="outline" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </header>
        <main className="p-4 lg:p-6">
          <ProjectForm />
        </main>
      </div>
    );
  }

  if (selectedOption === 'short') {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 lg:px-6 py-3 lg:py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Building2 className="w-6 h-6 text-green-600" />
              <div>
                <h1 className="text-lg lg:text-xl font-semibold text-gray-800">
                  Short-Form Onboarding (Draft Only)
                </h1>
                <p className="text-sm text-gray-600">Agent: {agentData.name}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={handleBackToSelection} variant="outline" size="sm">
                Back to Options
              </Button>
              <Button onClick={onLogout} variant="outline" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </header>
        <main className="p-4 lg:p-6">
          <ShortFormOnboarding agentData={agentData} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200 px-4 lg:px-6 py-3 lg:py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Building2 className="w-6 h-6 text-green-600" />
            <div>
              <h1 className="text-lg lg:text-xl font-semibold text-gray-800">Agent Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome, {agentData.name}</p>
            </div>
          </div>
          <Button onClick={onLogout} variant="outline" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="p-4 lg:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Choose Onboarding Type
            </h2>
            <p className="text-gray-600 text-sm lg:text-base">
              Select the type of project onboarding you want to complete
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Onboarding Details (Full)</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-6">
                  Complete comprehensive onboarding with all project details, validations, and submission capabilities.
                </p>
                <ul className="text-sm text-gray-500 text-left space-y-2 mb-6">
                  <li>• All primary and secondary details</li>
                  <li>• Complete validation and submission</li>
                  <li>• Full admin workflow status</li>
                  <li>• Comprehensive project documentation</li>
                </ul>
                <Button 
                  onClick={() => handleOptionSelect('full')}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Start Full Onboarding
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <Edit className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Onboarding Details (Short-Form)</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-6">
                  Quick onboarding with essential fields only. Save as draft for admin review and completion.
                </p>
                <ul className="text-sm text-gray-500 text-left space-y-2 mb-6">
                  <li>• Essential fields only</li>
                  <li>• Draft-only submission</li>
                  <li>• Quick entry process</li>
                  <li>• Admin can later update status</li>
                </ul>
                <Button 
                  onClick={() => handleOptionSelect('short')}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Start Short-Form
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AgentDashboard;
