import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Edit, LogOut, Building2, BarChart3, Menu, X, Save } from 'lucide-react';
import { ProjectForm } from '@/components/ProjectForm';
import { ShortFormOnboarding } from '@/components/ShortFormOnboarding';
import { AgentReports } from '@/components/AgentReports';
import { DraftsSection } from '@/components/DraftsSection';

interface AgentDashboardProps {
  agentData: any;
  onLogout: () => void;
}

const AgentDashboard: React.FC<AgentDashboardProps> = ({ agentData, onLogout }) => {
  const [selectedOption, setSelectedOption] = useState<'selection' | 'full' | 'short' | 'reports' | 'drafts'>('selection');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [draftData, setDraftData] = useState<any>(null);

  const handleOptionSelect = (option: 'full' | 'short' | 'reports' | 'drafts') => {
    setSelectedOption(option);
    setSidebarOpen(false);
  };

  const handleBackToSelection = () => {
    setSelectedOption('selection');
    setSidebarOpen(false);
    setDraftData(null);
  };

  const handleDraftSaved = (data: any) => {
    // Store draft data and navigate to drafts section
    const draftEntry = {
      id: Date.now(),
      ...data,
      createdAt: new Date().toISOString(),
      status: 'draft'
    };
    
    // In a real app, this would be stored in a database or state management
    localStorage.setItem(`draft_${draftEntry.id}`, JSON.stringify(draftEntry));
    
    console.log('Draft saved:', draftEntry);
    setSelectedOption('drafts');
  };

  const handleEditDraft = (draft: any) => {
    setDraftData(draft);
    setSelectedOption('full');
  };

  const sidebarItems = [
    { id: 'selection', label: 'Dashboard', icon: Building2 },
    { id: 'drafts', label: 'Drafts', icon: Save },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
  ];

  const renderContent = () => {
    switch (selectedOption) {
      case 'full':
        return <ProjectForm initialData={draftData} />;
      case 'short':
        return <ShortFormOnboarding agentData={agentData} onDraftSaved={handleDraftSaved} />;
      case 'reports':
        return <AgentReports agentData={agentData} />;
      case 'drafts':
        return <DraftsSection agentData={agentData} onEditDraft={handleEditDraft} />;
      default:
        return (
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
        );
    }
  };

  const getPageTitle = () => {
    switch (selectedOption) {
      case 'full':
        return 'Full Onboarding Details';
      case 'short':
        return 'Short-Form Onboarding (Draft Only)';
      case 'reports':
        return 'My Reports';
      case 'drafts':
        return 'My Drafts';
      default:
        return 'Agent Dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 
        fixed lg:static 
        inset-y-0 left-0 
        w-64 
        bg-white shadow-lg border-r border-gray-200 
        flex flex-col 
        z-50 
        transition-transform duration-300 ease-in-out
      `}>
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Building2 className="w-8 h-8 text-green-600" />
              <div>
                <h2 className="text-lg font-bold text-gray-800">Agent Portal</h2>
                <p className="text-sm text-gray-600">{agentData.name}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
        
        <nav className="mt-6 flex-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = selectedOption === item.id || 
              (item.id === 'selection' && ['selection', 'full', 'short'].includes(selectedOption));
            
            return (
              <button
                key={item.id}
                onClick={() => item.id === 'selection' ? handleBackToSelection() : handleOptionSelect(item.id as any)}
                className={`w-full flex items-center px-6 py-3 text-left transition-colors ${
                  isActive
                    ? 'bg-green-50 text-green-600 border-r-2 border-green-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-6">
          <Button 
            onClick={onLogout} 
            variant="outline" 
            className="w-full flex items-center justify-center"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 lg:px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-gray-800">{getPageTitle()}</h1>
                <p className="text-sm text-gray-600">Agent: {agentData.name}</p>
              </div>
            </div>
            {(selectedOption === 'full' || selectedOption === 'short' || selectedOption === 'reports' || selectedOption === 'drafts') && (
              <Button onClick={handleBackToSelection} variant="outline" size="sm">
                Back to Dashboard
              </Button>
            )}
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AgentDashboard;
