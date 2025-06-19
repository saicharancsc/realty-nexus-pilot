
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface UnitConfigurationsProps {
  data: any;
  onUpdate: (data: any) => void;
}

export const UnitConfigurations: React.FC<UnitConfigurationsProps> = ({ data, onUpdate }) => {
  const unitTypes = ['1BHK', '2BHK', '2.5BHK', '3BHK', '3.5BHK', '4BHK', '4.5BHK', '5BHK', 'Villa', 'Villa Duplex', 'Villa Triplex'];
  
  const handleUnitTypeToggle = (unitType: string, checked: boolean) => {
    const currentUnits = data.unitTypes || {};
    onUpdate({
      unitTypes: {
        ...currentUnits,
        [unitType]: {
          ...currentUnits[unitType],
          enabled: checked,
          sizes: currentUnits[unitType]?.sizes || ['', '', '', ''],
          parkingSlots: checked ? (currentUnits[unitType]?.parkingSlots || [{ slots: '' }]) : []
        }
      }
    });
  };

  const handleSizeChange = (unitType: string, index: number, value: string) => {
    const currentUnits = data.unitTypes || {};
    const currentUnit = currentUnits[unitType] || { enabled: false, sizes: ['', '', '', ''], parkingSlots: [] };
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

  const addParkingSlot = (unitType: string) => {
    const currentUnits = data.unitTypes || {};
    const currentUnit = currentUnits[unitType] || { enabled: false, sizes: ['', '', '', ''], parkingSlots: [] };
    
    onUpdate({
      unitTypes: {
        ...currentUnits,
        [unitType]: {
          ...currentUnit,
          parkingSlots: [...(currentUnit.parkingSlots || []), { slots: '' }]
        }
      }
    });
  };

  const removeParkingSlot = (unitType: string, index: number) => {
    const currentUnits = data.unitTypes || {};
    const currentUnit = currentUnits[unitType] || { enabled: false, sizes: ['', '', '', ''], parkingSlots: [] };
    
    onUpdate({
      unitTypes: {
        ...currentUnits,
        [unitType]: {
          ...currentUnit,
          parkingSlots: currentUnit.parkingSlots?.filter((_: any, i: number) => i !== index) || []
        }
      }
    });
  };

  const updateParkingSlot = (unitType: string, index: number, value: string) => {
    const currentUnits = data.unitTypes || {};
    const currentUnit = currentUnits[unitType] || { enabled: false, sizes: ['', '', '', ''], parkingSlots: [] };
    
    onUpdate({
      unitTypes: {
        ...currentUnits,
        [unitType]: {
          ...currentUnit,
          parkingSlots: currentUnit.parkingSlots?.map((slot: any, i: number) => 
            i === index ? { ...slot, slots: value } : slot
          ) || []
        }
      }
    });
  };

  return (
    <div className="space-y-6">
      {unitTypes.map((unitType) => {
        const unitData = data.unitTypes?.[unitType] || { enabled: false, sizes: ['', '', '', ''], parkingSlots: [] };
        
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
                    <h4 className="font-semibold mb-3 text-gray-700">Parking Slots Configuration</h4>
                    <div className="space-y-3">
                      {(unitData.parkingSlots || []).map((slot: any, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            type="number"
                            placeholder="Number of parking slots"
                            value={slot.slots}
                            onChange={(e) => updateParkingSlot(unitType, index, e.target.value)}
                            className="flex-1"
                          />
                          {(unitData.parkingSlots || []).length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() => removeParkingSlot(unitType, index)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addParkingSlot(unitType)}
                        className="flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add Parking Option
                      </Button>
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
