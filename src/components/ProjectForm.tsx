
import React, { useState } from 'react';
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
  onSubmit?: () => void;
  isDraftMode?: boolean;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({ 
  initialData, 
  onSubmit, 
  isDraftMode = false 
}) => {
  const [formData, setFormData] = useState<FormData>(initialData || {});

  const updateFormData = (section: string, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section as keyof FormData], ...data }
    }));
  };

  const handleSubmit = () => {
    // Validate required fields
    const requiredFields = ['projectName', 'builderName'];
    const missingFields = requiredFields.filter(field => 
      !formData.basics?.[field]?.trim()
    );

    if (missingFields.length > 0) {
      alert(`Please fill in the following required fields: ${missingFields.join(', ')}`);
      return;
    }

    console.log('Submitting form data:', formData);
    
    if (onSubmit) {
      onSubmit();
    } else {
      alert('Project submitted successfully!');
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="px-4 py-3">
        <CardTitle className="text-xl font-bold text-gray-800">
          {isDraftMode ? 'Complete Project Registration (From Draft)' : 'New Project Registration'}
        </CardTitle>
        {isDraftMode && (
          <p className="text-sm text-gray-600">
            This form has been pre-filled with data from your draft. Complete the remaining fields and submit.
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
