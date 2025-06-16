
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

interface UnitConfigurationsProps {
  data: any;
  onUpdate: (data: any) => void;
}

export const UnitConfigurations: React.FC<UnitConfigurationsProps> = ({ data, onUpdate }) => {
  const unitTypes = ['1BHK', '2BHK', '3BHK', '4BHK', '5BHK', 'Villa Duplex', 'Villa Triplex'];
  
  const handleUnitTypeToggle = (unitType: string, checked: boolean) => {
    const currentUnits = data.unitTypes || {};
    onUpdate({
      unitTypes: {
        ...currentUnits,
        [unitType]: {
          ...currentUnits[unitType],
          enabled: checked,
          sizes: currentUnits[unitType]?.sizes || ['', '', '', ''],
          parking: currentUnits[unitType]?.parking || ['', '', '', '']
        }
      }
    });
  };

  const handleSizeChange = (unitType: string, index: number, value: string) => {
    const currentUnits = data.unitTypes || {};
    const currentUnit = currentUnits[unitType] || { enabled: false, sizes: ['', '', '', ''], parking: ['', '', '', ''] };
    const newSizes = [...currentUnit.sizes];
    newSizes[index] = value;
    
    onUpdate({
      unitTypes: {
        ...currentUnits,
        [unitType]: {
          ...currentUnit,
          sizes: newSizes
        }
      }
    });
  };

  const handleParkingChange = (unitType: string, index: number, value: string) => {
    const currentUnits = data.unitTypes || {};
    const currentUnit = currentUnits[unitType] || { enabled: false, sizes: ['', '', '', ''], parking: ['', '', '', ''] };
    const newParking = [...currentUnit.parking];
    newParking[index] = value;
    
    onUpdate({
      unitTypes: {
        ...currentUnits,
        [unitType]: {
          ...currentUnit,
          parking: newParking
        }
      }
    });
  };

  return (
    <div className="space-y-6">
      {unitTypes.map((unitType) => {
        const unitData = data.unitTypes?.[unitType] || { enabled: false, sizes: ['', '', '', ''], parking: ['', '', '', ''] };
        
        return (
          <Card key={unitType}>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`unit-${unitType}`}
                  checked={unitData.enabled}
                  onCheckedChange={(checked) => handleUnitTypeToggle(unitType, checked as boolean)}
                />
                <CardTitle className="text-lg">{unitType} Configuration</CardTitle>
              </div>
            </CardHeader>
            
            {unitData.enabled && (
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-gray-700">Size Variants (sqft)</h4>
                    <div className="space-y-3">
                      {[1, 2, 3, 4].map((sizeIndex) => (
                        <div key={sizeIndex} className="space-y-2">
                          <Label htmlFor={`${unitType}-size-${sizeIndex}`}>
                            Size {sizeIndex}
                          </Label>
                          <Input
                            id={`${unitType}-size-${sizeIndex}`}
                            type="number"
                            placeholder={`e.g., ${sizeIndex === 1 ? '1500' : sizeIndex === 2 ? '1650' : sizeIndex === 3 ? '1800' : '2000'}`}
                            value={unitData.sizes[sizeIndex - 1]}
                            onChange={(e) => handleSizeChange(unitType, sizeIndex - 1, e.target.value)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 text-gray-700">Car Parking Slots</h4>
                    <div className="space-y-3">
                      {[1, 2, 3, 4].map((parkingIndex) => (
                        <div key={parkingIndex} className="space-y-2">
                          <Label htmlFor={`${unitType}-parking-${parkingIndex}`}>
                            Parking for Size {parkingIndex}
                          </Label>
                          <Input
                            id={`${unitType}-parking-${parkingIndex}`}
                            type="number"
                            placeholder="Number of parking slots"
                            value={unitData.parking[parkingIndex - 1]}
                            onChange={(e) => handleParkingChange(unitType, parkingIndex - 1, e.target.value)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        );
      })}
    </div>
  );
};
