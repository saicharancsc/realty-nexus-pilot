
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProjectBasics } from '@/components/forms/ProjectBasics';
import { ConstructionSpecs } from '@/components/forms/ConstructionSpecs';
import { UnitConfigurations } from '@/components/forms/UnitConfigurations';
import { FinancialCompliance } from '@/components/forms/FinancialCompliance';

export const ProjectForm = () => {
  const [formData, setFormData] = useState({});

  const updateFormData = (section: string, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">New Project Registration</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basics" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basics">Project Basics</TabsTrigger>
            <TabsTrigger value="construction">Construction</TabsTrigger>
            <TabsTrigger value="units">Unit Config</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basics" className="mt-6">
            <ProjectBasics 
              data={formData.basics || {}} 
              onUpdate={(data) => updateFormData('basics', data)} 
            />
          </TabsContent>
          
          <TabsContent value="construction" className="mt-6">
            <ConstructionSpecs 
              data={formData.construction || {}} 
              onUpdate={(data) => updateFormData('construction', data)} 
            />
          </TabsContent>
          
          <TabsContent value="units" className="mt-6">
            <UnitConfigurations 
              data={formData.units || {}} 
              onUpdate={(data) => updateFormData('units', data)} 
            />
          </TabsContent>
          
          <TabsContent value="financial" className="mt-6">
            <FinancialCompliance 
              data={formData.financial || {}} 
              onUpdate={(data) => updateFormData('financial', data)} 
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
