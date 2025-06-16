
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

interface ConstructionSpecsProps {
  data: any;
  onUpdate: (data: any) => void;
}

export const ConstructionSpecs: React.FC<ConstructionSpecsProps> = ({ data, onUpdate }) => {
  const handleInputChange = (field: string, value: string) => {
    onUpdate({ [field]: value });
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    const currentAmenities = data.amenities || [];
    let updatedAmenities;
    
    if (checked) {
      updatedAmenities = [...currentAmenities, amenity];
    } else {
      updatedAmenities = currentAmenities.filter((item: string) => item !== amenity);
    }
    
    onUpdate({ amenities: updatedAmenities });
  };

  const amenitiesList = [
    'Swimming Pool',
    'Gymnasium',
    'Clubhouse',
    'Children\'s Play Area',
    'Landscaped Gardens',
    'Jogging Track',
    'Tennis Court',
    'Basketball Court',
    'Security System',
    'Power Backup',
    'Rainwater Harvesting'
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Construction Details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="carpetAreaPercent">Carpet Area %</Label>
            <Input
              id="carpetAreaPercent"
              type="number"
              placeholder="e.g., 20"
              value={data.carpetAreaPercent || ''}
              onChange={(e) => handleInputChange('carpetAreaPercent', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ceilingHeight">Ceiling Height (ft)</Label>
            <Input
              id="ceilingHeight"
              type="number"
              placeholder="e.g., 10"
              value={data.ceilingHeight || ''}
              onChange={(e) => handleInputChange('ceilingHeight', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="pricePerSqft">Price/Sqft (₹)</Label>
            <Input
              id="pricePerSqft"
              type="number"
              placeholder="e.g., 7000"
              value={data.pricePerSqft || ''}
              onChange={(e) => handleInputChange('pricePerSqft', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="powerBackup">Power Backup</Label>
            <Select onValueChange={(value) => handleInputChange('powerBackup', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select power backup" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full">Full</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
                <SelectItem value="none">None</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="passengerLifts">Passenger Lifts</Label>
            <Input
              id="passengerLifts"
              type="number"
              placeholder="e.g., 4"
              value={data.passengerLifts || ''}
              onChange={(e) => handleInputChange('passengerLifts', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="serviceLifts">Service Lifts</Label>
            <Input
              id="serviceLifts"
              type="number"
              placeholder="e.g., 2"
              value={data.serviceLifts || ''}
              onChange={(e) => handleInputChange('serviceLifts', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Features & Amenities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="visitorParking">Visitor Parking</Label>
            <Select onValueChange={(value) => handleInputChange('visitorParking', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select visitor parking availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-3">
            <Label>Amenities</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {amenitiesList.map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox
                    id={amenity}
                    checked={data.amenities?.includes(amenity) || false}
                    onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                  />
                  <Label htmlFor={amenity} className="text-sm font-normal cursor-pointer">
                    {amenity}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="specifications">Construction Specifications</Label>
            <Textarea
              id="specifications"
              placeholder="Detailed construction specifications (Flooring, Kitchen, Bathroom fittings, etc.)"
              value={data.specifications || ''}
              onChange={(e) => handleInputChange('specifications', e.target.value)}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
