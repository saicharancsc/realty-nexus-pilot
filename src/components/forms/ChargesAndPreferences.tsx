import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface ChargesAndPreferencesProps {
  data: any;
  onUpdate: (data: any) => void;
}

export const ChargesAndPreferences: React.FC<ChargesAndPreferencesProps> = ({ data, onUpdate }) => {
  const handleInputChange = (field: string, value: string) => {
    onUpdate({ [field]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Charges & Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Floor Charger */}
        <div className="space-y-3">
          <Label>Floor Rise Charges</Label>
          <RadioGroup
            value={data.floorCharger || ''}
            onValueChange={(value) => handleInputChange('floorCharger', value)}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="fcYes" /><Label htmlFor="fcYes">Yes</Label></div>
            <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="fcNo" /><Label htmlFor="fcNo">No</Label></div>
          </RadioGroup>
          {data.floorCharger === 'yes' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 pl-2 border-l-2 border-gray-200">
              <div className="space-y-2"><Label htmlFor="floorChargerAmount">Amount per floor</Label><Input id="floorChargerAmount" type="number" step="any"
              onWheel={(e) => e.currentTarget.blur()} value={data.floorChargerAmount || ''} onChange={(e) => handleInputChange('floorChargerAmount', e.target.value.replace(/[^0-9]/g, ''))} placeholder="Amount"/></div>
              <div className="space-y-2"><Label htmlFor="floorChargerAbove">Applicable above floor</Label><Input id="floorChargerAbove" type="number" step="any"
              onWheel={(e) => e.currentTarget.blur()} value={data.floorChargerAbove || ''} onChange={(e) => handleInputChange('floorChargerAbove', e.target.value.replace(/[^0-9]/g, ''))} placeholder="Floor number"/></div>
            </div>
          )}
        </div>

        {/* Facing Charges */}
        <div className="space-y-3">
          <Label>Facing Charges</Label>
          <RadioGroup
            value={data.facingCharges || ''}
            onValueChange={(value) => handleInputChange('facingCharges', value)}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="faceYes" /><Label htmlFor="faceYes">Yes</Label></div>
            <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="faceNo" /><Label htmlFor="faceNo">No</Label></div>
          </RadioGroup>
          {data.facingCharges === 'yes' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 pl-2 border-l-2 border-gray-200">
              <div className="space-y-2"><Label htmlFor="facingChargesAmount">Amount </Label><Input id="facingChargesAmount" type="number"   step="any"
              onWheel={(e) => e.currentTarget.blur()}value={data.facingChargesAmount || ''} onChange={(e) => handleInputChange('facingChargesAmount', e.target.value.replace(/[^0-9]/g, ''))} placeholder="Amount"/></div>
              
            </div>
          )}
        </div>

        {/* PLC */}
        <div className="space-y-3">
          <Label>Preferential Location Charges (PLC)</Label>
          <RadioGroup
            value={data.plc || ''}
            onValueChange={(value) => handleInputChange('plc', value)}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="plcYes" /><Label htmlFor="plcYes">Yes</Label></div>
            <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="plcNo" /><Label htmlFor="plcNo">No</Label></div>
          </RadioGroup>
          {data.plc === 'yes' && (
            <div className="space-y-2 mt-3 pl-2 border-l-2 border-gray-200">
              <Label htmlFor="plcConditions">Specify Conditions</Label>
              <Input id="plcConditions" value={data.plcConditions || ''} onChange={(e) => handleInputChange('plcConditions', e.target.value)} placeholder="Describe conditions"/>
            </div>
          )}
        </div>
        
        {/* Ground Vehicle Movement */}
        <div className="space-y-3">
            <Label>Ground Vehicle Movement</Label>
            <RadioGroup
              value={data.groundVehicleMovement || ''}
              onValueChange={(value) => handleInputChange('groundVehicleMovement', value)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="gvmYes" /><Label htmlFor="gvmYes">Yes</Label></div>
              <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="gvmNo" /><Label htmlFor="gvmNo">No</Label></div>
              <div className="flex items-center space-x-2"><RadioGroupItem value="partial" id="gvmPartial" /><Label htmlFor="gvmPartial">Partial</Label></div>
            </RadioGroup>
        </div>

        <div className="space-y-2">
            <Label htmlFor="wowFactorAmenity">Wow Factor Amenity (Optional)</Label>
            <Input
              id="wowFactorAmenity"
              value={data.wowFactorAmenity || ''}
              onChange={(e) => handleInputChange('wowFactorAmenity', e.target.value)}
              placeholder="Describe special amenity"
            />
        </div>
      </CardContent>
    </Card>
  );
};