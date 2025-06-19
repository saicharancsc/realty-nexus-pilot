

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ProjectBasics } from '@/components/forms/ProjectBasics';
import { ConstructionSpecs } from '@/components/forms/ConstructionSpecs';
import { UnitConfigurations } from '@/components/forms/UnitConfigurations';
import { FinancialCompliance } from '@/components/forms/FinancialCompliance';
import { SecondaryDetails } from '@/components/forms/SecondaryDetails';

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
  isDraftMode?: boolean;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({
  initialData,
  onSubmit,
  isDraftMode = false,
}) => {
  const [formData, setFormData] = useState<FormData>(initialData || {});
  const navigate = useNavigate(); // 2. Initialize the navigate function

  const updateFormData = (section: keyof FormData, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data,
      },
    }));
  };

  const handleSubmit = () => {
    // Basic validation remains
    const requiredFields = ['projectName', 'builderName'];
    const missingFields = requiredFields.filter(
      (field) => !formData.basics?.[field]?.trim()
    );

    if (missingFields.length > 0) {
      alert(
        `Please fill in the following required fields: ${missingFields.join(
          ', '
        )}`
      );
      return;
    }
    
    // 3. Create a new submission object from the form data
    const newSubmission = {
      id: Date.now(), // Use a timestamp for a unique ID
      projectName: formData.basics?.projectName || 'N/A',
      builderName: formData.basics?.builderName || 'N/A',
      submissionType: 'Full Onboarding',
      status: 'submitted',
      date: new Date().toISOString().split('T')[0], // Format as YYYY-MM-DD
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      details: {
        reraNumber: formData.financial?.reraNumber || '',
        projectType: formData.basics?.projectType || '',
        floors: formData.construction?.floors || 0,
        flatsPerFloor: formData.units?.flatsPerFloor || 0,
        possessionDate: formData.basics?.possessionDate || '',
        openSpace: formData.construction?.openSpace || '',
        carpetArea: formData.construction?.carpetArea || '',
        ceilingHeight: formData.construction?.ceilingHeight || '',
        commission: formData.financial?.commission || '',
        pocName: formData.secondary?.pocName || '',
        pocNumber: formData.secondary?.pocNumber || '',
        pocRole: formData.secondary?.pocRole || '',
      },
    };

    // 4. Save the new submission to localStorage
    try {
      const existingSubmissions = JSON.parse(localStorage.getItem('agentSubmissions') || '[]');
      const updatedSubmissions = [...existingSubmissions, newSubmission];
      localStorage.setItem('agentSubmissions', JSON.stringify(updatedSubmissions));
    } catch (error) {
      console.error('Failed to save submission:', error);
      alert('There was an error saving your submission.');
      return;
    }

    if (onSubmit) {
      onSubmit(formData);
    } 
    
    alert('Project submitted successfully!');

    // 5. Navigate to the agent reports page
    // The URL '/agent' is based on your screenshot showing the reports page at that path.
    navigate('/agent');
  };

  return (
    <Card className="w-full">
      <CardHeader className="px-4 py-3">
        <CardTitle className="text-xl font-bold text-gray-800">
          {isDraftMode
            ? 'Complete Project Registration (From Draft)'
            : 'New Project Registration'}
        </CardTitle>
        {isDraftMode && (
          <p className="text-sm text-gray-600">
            This form has been pre-filled with data from your draft. Complete the
            remaining fields and submit.
          </p>
        )}
      </CardHeader>

      <CardContent className="px-2 sm:px-4">
        <Tabs defaultValue="basics" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto p-1">
            <TabsTrigger value="basics" className="text-xs sm:text-sm py-2">
              Project Basics
            </TabsTrigger>
            <TabsTrigger value="construction" className="text-xs sm:text-sm py-2">
              Construction
            </TabsTrigger>
            <TabsTrigger value="units" className="text-xs sm:text-sm py-2">
              Unit Config
            </TabsTrigger>
            <TabsTrigger value="financial" className="text-xs sm:text-sm py-2">
              Financial
            </TabsTrigger>
            <TabsTrigger value="secondary" className="text-xs sm:text-sm py-2">
              Secondary Details
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basics" className="mt-4">
            <ProjectBasics
              data={formData.basics || {}}
              onUpdate={(data) => updateFormData('basics', data)}
            />
          </TabsContent>

          <TabsContent value="construction" className="mt-4">
            <ConstructionSpecs
              data={formData.construction || {}}
              onUpdate={(data) => updateFormData('construction', data)}
            />
          </TabsContent>

          <TabsContent value="units" className="mt-4">
            <UnitConfigurations
              data={formData.units || {}}
              onUpdate={(data) => updateFormData('units', data)}
            />
          </TabsContent>

          <TabsContent value="financial" className="mt-4">
            <FinancialCompliance
              data={formData.financial || {}}
              onUpdate={(data) => updateFormData('financial', data)}
            />
          </TabsContent>

          <TabsContent value="secondary" className="mt-4">
            <SecondaryDetails
              data={formData.secondary || {}}
              onUpdate={(data) => updateFormData('secondary', data)}
            />
          </TabsContent>
        </Tabs>

        {/* Submit Button */}
        <div className="flex justify-center mt-8 pt-4 border-t">
          <Button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
          >
            {isDraftMode ? 'Complete & Submit Project' : 'Submit Project'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};