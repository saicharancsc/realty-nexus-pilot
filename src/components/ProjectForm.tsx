import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ProjectBasics } from '@/components/forms/ProjectBasics';
import { ConstructionSpecs } from '@/components/forms/ConstructionSpecs';
import { UnitConfigurations } from '@/components/forms/UnitConfigurations';
import { FinancialCompliance } from '@/components/forms/FinancialCompliance';
import { SecondaryDetails } from '@/components/forms/SecondaryDetails';
import { ChargesAndPreferences } from './forms/ChargesAndPreferences';
import { CommissionAndPayout } from './forms/CommissionAndPayout';

interface FormData {
  basics?: any;
  construction?: any;
  units?: any;
  financial?: any;
  secondary?: any;
}

interface ProjectFormProps {
  initialData?: any;
  onSubmit?: (data: FormData) => void;
  agentId?: string;
  agentName?: string;
  isDraftMode?: boolean;
  isAdminMode?: boolean;
  onUpdate?: (data: FormData) => void;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({
  initialData,
  onSubmit,
  isDraftMode = false,
  agentId,
  agentName,
  isAdminMode = false,
  onUpdate,
}) => {
  const [formData, setFormData] = useState<FormData>(initialData || {});
  const navigate = useNavigate();

  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData]);

  const updateFormData = (section: keyof FormData, data: any) => {
    const newFormData = {
      ...formData,
      [section]: {
        ...(formData[section] || {}),
        ...data,
      },
    };
    setFormData(newFormData);
    if (onUpdate) {
      onUpdate(newFormData);
    }
  };

  const handleSubmit = () => {
    if (!agentId || !agentName) {
      alert('Error: Agent not identified. Cannot save submission.');
      return;
    }
    const requiredFields = ['projectName', 'builderName'];
    if (requiredFields.some(field => !formData.basics?.[field]?.trim())) {
      alert(`Please fill in required fields: Project Name, Builder Name`);
      return;
    }

    const submissionId = initialData?.id || Date.now().toString();
    const submissionDate = new Date().toISOString().split('T')[0];
    const submissionTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const adminSubmission = {
      id: submissionId,
      projectName: formData.basics?.projectName || 'N/A',
      builderName: formData.basics?.builderName || 'N/A',
      agentName: agentName,
      reraNumber: formData.basics?.reraNumber || 'N/A',
      submittedDate: submissionDate,
      status: 'pending',
      formData: { ...formData },
    };

    const agentReportSubmission = {
      id: submissionId,
      projectName: formData.basics?.projectName || 'N/A',
      builderName: formData.basics?.builderName || 'N/A',
      submissionType: 'Full Onboarding',
      status: 'submitted',
      date: submissionDate,
      time: submissionTime,
      details: { ...formData },
    };
    
    try {
      // Save to Admin's central list
      const adminKey = 'allAgentSubmissions';
      const existingAdminSubmissions = JSON.parse(localStorage.getItem(adminKey) || '[]');
      const updatedAdminSubmissions = [...existingAdminSubmissions, adminSubmission];
      localStorage.setItem(adminKey, JSON.stringify(updatedAdminSubmissions));

      // Save to the specific agent's report list
      const agentReportsKey = `agentSubmissions_${agentId}`;
      const existingAgentSubmissions = JSON.parse(localStorage.getItem(agentReportsKey) || '[]');
      const updatedAgentSubmissions = [...existingAgentSubmissions, agentReportSubmission];
      localStorage.setItem(agentReportsKey, JSON.stringify(updatedAgentSubmissions));

      // If this was a draft, remove it from the drafts list
      if (isDraftMode && initialData?.id) {
        const draftsKey = `agentDrafts_${agentId}`;
        const existingDrafts = JSON.parse(localStorage.getItem(draftsKey) || '[]');
        const updatedDrafts = existingDrafts.filter((draft: any) => draft.id !== initialData.id);
        localStorage.setItem(draftsKey, JSON.stringify(updatedDrafts));
      }

    } catch (error) {
      console.error('Failed to save submission:', error);
      alert('There was an error saving your submission.');
      return;
    }

    if (onSubmit) {
      onSubmit(formData);
    } 
    
    alert('Project submitted successfully!');
    setTimeout(() => navigate('/agent', { state: { defaultView: 'reports' } }), 0);
  };

  return (
    <Card className="w-full">
      <CardHeader className="px-4 py-3">
        <CardTitle className="text-xl font-bold text-gray-800">
          {isAdminMode ? 'Editing Project' : isDraftMode ? 'Complete & Submit Project' : 'New Project Registration'}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-2 sm:px-4">
        <Tabs defaultValue="basics" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto p-1">
            <TabsTrigger value="basics">Project Basics</TabsTrigger>
            <TabsTrigger value="construction">Construction</TabsTrigger>
            <TabsTrigger value="units">Unit Config</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="secondary">Secondary</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basics" className="mt-4">
            <ProjectBasics data={formData.basics || {}} onUpdate={(data) => updateFormData('basics', data)} />
          </TabsContent>
          <TabsContent value="construction" className="mt-4">
            <ConstructionSpecs data={formData.construction || {}} onUpdate={(data) => updateFormData('construction', data)} />
          </TabsContent>
          <TabsContent value="units" className="mt-4">
            <UnitConfigurations data={formData.units || {}} onUpdate={(data) => updateFormData('units', data)} />
          </TabsContent>
          <TabsContent value="financial" className="mt-4">
            <FinancialCompliance data={formData.financial || {}} onUpdate={(data) => updateFormData('financial', data)} />
          </TabsContent>
          <TabsContent value="secondary" className="mt-4 space-y-6">
            <CommissionAndPayout data={formData.secondary || {}} onUpdate={(data) => updateFormData('secondary', data)} />
            <SecondaryDetails data={formData.secondary || {}} onUpdate={(data) => updateFormData('secondary', data)} />
            <ChargesAndPreferences data={formData.secondary || {}} onUpdate={(data) => updateFormData('secondary', data)} />
          </TabsContent>
        </Tabs>
        
        {!isAdminMode && (
          <div className="flex justify-center mt-8 pt-4 border-t">
            <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg">
              {isDraftMode ? 'Complete & Submit Project' : 'Submit Project'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};