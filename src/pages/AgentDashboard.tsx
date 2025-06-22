import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Edit, LogOut, Building2, BarChart3, Menu, X, FilePlus } from 'lucide-react';
import { ProjectForm } from '@/components/ProjectForm';
import { ShortFormOnboarding } from '@/components/ShortFormOnboarding';
import { AgentReports } from '@/components/AgentReports';
import { DraftsSection } from '@/components/DraftsSection';
import relaiLogo from '@/assets/relaiLogo.png'; 

interface AgentDashboardProps {
  agentData: any;
  onLogout: () => void;
}

interface DraftData {
  id: string;
  projectName: string;
  builderName: string;
  createdDate: string;
  status: 'draft' | 'submitted';
  formData: any;
}

const AgentDashboard: React.FC<AgentDashboardProps> = ({ agentData, onLogout }) => {
  const location = useLocation();
  const [selectedOption, setSelectedOption] = useState<'selection' | 'full' | 'short' | 'reports' | 'drafts'>(
    location.state?.defaultView || 'selection'
  );
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [drafts, setDrafts] = useState<DraftData[]>([]);
  const [editingDraft, setEditingDraft] = useState<DraftData | null>(null);

  const agentId = agentData?.name;

  useEffect(() => {
    if (!agentId) return;
    const draftsKey = `agentDrafts_${agentId}`;
    const savedDrafts = localStorage.getItem(draftsKey);
    if (savedDrafts) {
      try {
        const parsedDrafts = JSON.parse(savedDrafts);
        if (Array.isArray(parsedDrafts)) setDrafts(parsedDrafts);
      } catch (error) {
        console.error("Failed to parse drafts from localStorage", error);
        setDrafts([]);
      }
    }
  }, [agentId]);

  useEffect(() => {
    if (!agentId) return;
    const draftsKey = `agentDrafts_${agentId}`;
    localStorage.setItem(draftsKey, JSON.stringify(drafts));
  }, [drafts, agentId]);


  const handleOptionSelect = (option: 'full' | 'short' | 'reports' | 'drafts') => {
    setSelectedOption(option);
    setSidebarOpen(false);
    setEditingDraft(null);
  };

  const handleBackToSelection = () => {
    setSelectedOption('selection');
    setSidebarOpen(false);
    setEditingDraft(null);
  };

  const handleToggleForms = () => {
    setSelectedOption(prev => prev === 'full' ? 'short' : 'full');
  };

  const handleDraftSaved = (draftFormData: any) => {
    const newDraft: DraftData = {
      id: Date.now().toString(),
      projectName: draftFormData.basics?.projectName || 'Untitled Project',
      builderName: draftFormData.basics?.builderName || 'Unknown Builder',
      createdDate: new Date().toLocaleDateString(),
      status: 'draft',
      formData: draftFormData
    };
    setDrafts(prev => [...prev, newDraft]);
    alert('Draft saved successfully! You can now view it in the Drafts section.');
    setSelectedOption('drafts');
  };

  const handleEditDraft = (draft: DraftData) => {
    setEditingDraft(draft);
    setSelectedOption('full');
  };

  const handleDraftSubmission = (draftId: string) => {
    setDrafts(prev => prev.filter(draft => draft.id !== draftId));
    setEditingDraft(null);
    setSelectedOption('reports');
  };

  const sidebarItems = [
    { 
      id: 'selection', 
      label: (
        <>
          <span className="lg:hidden">Home</span>
          <span className="hidden lg:inline">Dashboard</span>
        </>
      ), 
      icon: Building2 
    },
    { id: 'drafts', label: 'Drafts', icon: FilePlus },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
  ];

  const renderContent = () => {
    switch (selectedOption) {
      case 'full':
        return (
          <div>
            <div className="mb-4 flex justify-between items-center">
              <Button onClick={handleToggleForms} variant="outline" size="sm" className="flex items-center gap-2">
                <Edit className="w-4 h-4" />
                Switch to Short-Form
              </Button>
            </div>
            {/* FIX: Corrected component call */}
            <ProjectForm 
              agentId={agentId}
              agentName={agentData.name}
              initialData={editingDraft?.formData} 
              onSubmit={editingDraft ? () => handleDraftSubmission(editingDraft.id) : undefined}
              isDraftMode={!!editingDraft}
            />
          </div>
        );
      case 'short':
        return (
          <div>
            <div className="mb-4 flex justify-between items-center">
              <Button onClick={handleToggleForms} variant="outline" size="sm" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Switch to Full-Form
              </Button>
            </div>
            <ShortFormOnboarding 
              agentData={agentData} 
              agentId={agentId}
              onDraftSaved={handleDraftSaved}
            />
          </div>
        );
      case 'reports':
        return <AgentReports agentId={agentId} />;
      case 'drafts':
        return (
          <DraftsSection 
            drafts={drafts}
            onEditDraft={handleEditDraft}
          />
        );
      default:
        return (
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Choose Onboarding Type</h2>
              <p className="text-gray-600 text-sm lg:text-base">Select the type of project onboarding you want to complete</p>
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
                  <p className="text-gray-600 mb-6">Complete comprehensive onboarding with all project details, validations, and submission capabilities.</p>
                  <ul className="text-sm text-gray-500 text-left space-y-2 mb-6">
                    <li>• All primary and secondary details</li>
                    <li>• Complete validation and submission</li>
                    <li>• Full admin workflow status</li>
                    <li>• Comprehensive project documentation</li>
                  </ul>
                  <Button onClick={() => handleOptionSelect('full')} className="w-full bg-blue-600 hover:bg-blue-700">Start Full Onboarding</Button>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                    <Edit className="w-8 h-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">Onboarding Details (Short-Form)</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-6">Quick onboarding with essential fields only. Save as draft for admin review and completion.</p>
                  <ul className="text-sm text-gray-500 text-left space-y-2 mb-6">
                    <li>• Essential fields only</li>
                    <li>• Draft-only submission</li>
                    <li>• Quick entry process</li>
                    <li>• Admin can later update status</li>
                  </ul>
                  <Button onClick={() => handleOptionSelect('short')} className="w-full bg-blue-600 hover:bg-blue-700">Start Short-Form</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };
  
  const getPageTitle = () => {
    switch (selectedOption) {
      case 'full': return editingDraft ? 'Edit Draft - Full Onboarding' : 'Full Onboarding Details';
      case 'short': return 'Short-Form Onboarding (Draft Only)';
      case 'reports': return 'My Reports';
      case 'drafts': return 'My Drafts';
      default: return 'Agent Dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className={` ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}  lg:translate-x-0  fixed lg:static  inset-y-0 left-0  w-64  bg-white shadow-lg border-r border-gray-200  flex flex-col  z-50  transition-transform duration-300 ease-in-out `}>
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-16 flex items-center justify-center overflow-hidden">
                <img src={relaiLogo} alt="Relai Logo" className="h-full w-auto max-w-none transform scale-150" />
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-800">Agent Portal</h2>
                <p className="text-sm text-gray-600">{agentData.name}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(false)}> <X className="w-5 h-5" /> </Button>
          </div>
        </div>
        <nav className="mt-6 flex-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = selectedOption === item.id || (item.id === 'selection' && ['selection', 'full', 'short'].includes(selectedOption));
            return (
              <button
                key={item.id}
                onClick={() => item.id === 'selection' ? handleBackToSelection() : handleOptionSelect(item.id as any)}
                className={`w-full flex items-center px-6 py-3 text-left transition-colors ${ isActive ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-600 hover:bg-gray-50' }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
                {item.id === 'drafts' && drafts.length > 0 && (
                  <span className="ml-auto bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
                    {drafts.length}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
        <div className="p-6">
          <Button onClick={onLogout} variant="outline" className="w-full flex items-center justify-center"> <LogOut className="w-4 h-4 mr-2" /> Logout </Button>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 lg:px-6 py-4 flex-shrink-0 sticky top-0 z-40">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}> <Menu className="w-5 h-5" /> </Button>
              <div>
                <h1 className="text-xl font-semibold text-gray-800">{getPageTitle()}</h1>
                <p className="text-sm text-gray-600">Agent: {agentData.name}</p>
              </div>
            </div>
            {['full', 'short', 'reports', 'drafts'].includes(selectedOption) && (
              <Button onClick={handleBackToSelection} variant="outline" size="sm">
                <span className="lg:hidden">Back to Home</span>
                <span className="hidden lg:inline">Back to Dashboard</span>
              </Button>
            )}
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AgentDashboard;