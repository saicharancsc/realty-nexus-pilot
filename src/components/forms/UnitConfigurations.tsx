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
  
  const updateUnitData = (unitType: string, newUnitData: any) => {
    onUpdate({
      unitTypes: {
        ...(data.unitTypes || {}),
        [unitType]: newUnitData,
      },
    });
  };

  const handleUnitTypeToggle = (unitType: string, checked: boolean) => {
    const currentUnit = data.unitTypes?.[unitType] || {};
    updateUnitData(unitType, {
      ...currentUnit,
      enabled: checked,
      // Initialize with one empty variant row if enabled for the first time
      variants: checked ? (currentUnit.variants || [{ size: '', parkingSlots: '' }]) : [],
    });
  };

  const addVariant = (unitType: string) => {
    const currentUnit = data.unitTypes?.[unitType] || { variants: [] };
    updateUnitData(unitType, {
      ...currentUnit,
      variants: [...(currentUnit.variants || []), { size: '', parkingSlots: '' }],
    });
  };

  const removeVariant = (unitType: string, index: number) => {
    const currentUnit = data.unitTypes?.[unitType] || { variants: [] };
    updateUnitData(unitType, {
      ...currentUnit,
      variants: currentUnit.variants?.filter((_: any, i: number) => i !== index) || [],
    });
  };

  const updateVariant = (unitType: string, index: number, field: 'size' | 'parkingSlots', value: string) => {
    const currentUnit = data.unitTypes?.[unitType] || { variants: [] };
    const intValue = value.replace(/[^0-9]/g, ''); // Ensure only numbers are stored
    
    const updatedVariants = currentUnit.variants?.map((variant: any, i: number) =>
      i === index ? { ...variant, [field]: intValue } : variant
    ) || [];

    updateUnitData(unitType, { ...currentUnit, variants: updatedVariants });
  };

  return (
    <div className="space-y-6">
      {unitTypes.map((unitType) => {
        const unitData = data.unitTypes?.[unitType] || { enabled: false, variants: [] };
        
        return (
          <Card key={unitType}>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`unit-${unitType}`}
                  checked={unitData.enabled}
                  onCheckedChange={(checked) => handleUnitTypeToggle(unitType, checked as boolean)}
                />
                <Label htmlFor={`unit-${unitType}`} className="text-lg font-medium cursor-pointer">{unitType} Configuration</Label>
              </div>
            </CardHeader>
            
            {unitData.enabled && (
              <CardContent>
                {/* Column Headers */}
                <div className="grid grid-cols-[1fr_1fr_auto] gap-4 mb-2">
                  <Label className="font-semibold text-gray-700">Size Variants (sqft)</Label>
                  <Label className="font-semibold text-gray-700">Parking Slots</Label>
                  {/* Empty div for alignment with delete button column */}
                  <div></div>
                </div>

                {/* Dynamic Variant Rows */}
                <div className="space-y-3">
                  {(unitData.variants || []).map((variant: any, index: number) => (
                    <div key={index} className="grid grid-cols-[1fr_1fr_auto] gap-4 items-center">
                      {/* Column 1: Size Input */}
                      <Input
                        type="text"
                        inputMode="numeric"
                        placeholder="e.g., 1500"
                        value={variant.size || ''}
                        onChange={(e) => updateVariant(unitType, index, 'size', e.target.value)}
                      />
                      
                      {/* Column 2: Parking Input */}
                      <Input
                        type="text"
                        inputMode="numeric"
                        placeholder="e.g., 1"
                        value={variant.parkingSlots || ''}
                        onChange={(e) => updateVariant(unitType, index, 'parkingSlots', e.target.value)}
                      />
                      
                      {/* Column 3: Delete Button */}
                      {(unitData.variants || []).length > 1 ? (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeVariant(unitType, index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      ) : (
                        // Add an empty div as a spacer to prevent layout shift when there's only one row
                        <div className="w-10 h-10"></div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Single Add Button */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addVariant(unitType)}
                  className="w-full mt-4 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </Button>
              </CardContent>
            )}
          </Card>
        );
      })}
    </div>
  );
};