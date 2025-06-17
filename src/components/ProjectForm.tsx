
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

export const ProjectForm = () => {
  const [formData, setFormData] = useState<FormData>({});

  const updateFormData = (section: string, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section as keyof FormData], ...data }
    }));
  };

  return (
    <Card className="w-full">
      <CardHeader className="px-4 py-3">
        <CardTitle className="text-xl font-bold text-gray-800">New Project Registration</CardTitle>
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
      </CardContent>
    </Card>
  );
};
