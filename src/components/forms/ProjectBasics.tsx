
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProjectBasicsProps {
  data: any;
  onUpdate: (data: any) => void;
}

export const ProjectBasics: React.FC<ProjectBasicsProps> = ({ data, onUpdate }) => {
  const handleInputChange = (field: string, value: string) => {
    onUpdate({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="projectName">Project Name</Label>
            <Input
              id="projectName"
              placeholder="e.g., Cloud 9"
              value={data.projectName || ''}
              onChange={(e) => handleInputChange('projectName', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="builderName">Builder Name</Label>
            <Input
              id="builderName"
              placeholder="e.g., Urban Rise"
              value={data.builderName || ''}
              onChange={(e) => handleInputChange('builderName', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="reraNumber">RERA Number</Label>
            <Input
              id="reraNumber"
              placeholder="e.g., P024000000XX"
              value={data.reraNumber || ''}
              onChange={(e) => handleInputChange('reraNumber', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="projectType">Project Type</Label>
            <Select onValueChange={(value) => handleInputChange('projectType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select project type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gated">Gated</SelectItem>
                <SelectItem value="semi-gated">Semi-gated</SelectItem>
                <SelectItem value="stand-alone">Stand-alone</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Project Scale</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="totalLandArea">Total Land Area (acres)</Label>
            <Input
              id="totalLandArea"
              type="number"
              placeholder="e.g., 10"
              value={data.totalLandArea || ''}
              onChange={(e) => handleInputChange('totalLandArea', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="numberOfTowers">Number of Towers</Label>
            <Input
              id="numberOfTowers"
              type="number"
              placeholder="e.g., 7"
              value={data.numberOfTowers || ''}
              onChange={(e) => handleInputChange('numberOfTowers', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="numberOfFloors">Number of Floors</Label>
            <Input
              id="numberOfFloors"
              type="number"
              placeholder="e.g., 30"
              value={data.numberOfFloors || ''}
              onChange={(e) => handleInputChange('numberOfFloors', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="flatsPerFloor">Flats Per Floor</Label>
            <Input
              id="flatsPerFloor"
              type="number"
              placeholder="e.g., 10"
              value={data.flatsPerFloor || ''}
              onChange={(e) => handleInputChange('flatsPerFloor', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="totalUnits">Total Units</Label>
            <Input
              id="totalUnits"
              type="number"
              placeholder="e.g., 2100"
              value={data.totalUnits || ''}
              onChange={(e) => handleInputChange('totalUnits', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="openSpace">Open Space (%)</Label>
            <Input
              id="openSpace"
              type="number"
              placeholder="e.g., 70"
              value={data.openSpace || ''}
              onChange={(e) => handleInputChange('openSpace', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Timeline</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="launchDate">Launch Date</Label>
            <Input
              id="launchDate"
              type="date"
              value={data.launchDate || ''}
              onChange={(e) => handleInputChange('launchDate', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="possessionDate">Possession Date</Label>
            <Input
              id="possessionDate"
              type="date"
              value={data.possessionDate || ''}
              onChange={(e) => handleInputChange('possessionDate', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="constructionStatus">Construction Status</Label>
            <Select onValueChange={(value) => handleInputChange('constructionStatus', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ready-to-move">Ready To Move</SelectItem>
                <SelectItem value="on-going">On-going</SelectItem>
                <SelectItem value="under-construction">Under Construction</SelectItem>
                <SelectItem value="launched">Launched</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
