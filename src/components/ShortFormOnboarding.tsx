import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2 } from 'lucide-react';
import { CommissionAndPayout } from './forms/CommissionAndPayout';
import { ChargesAndPreferences } from './forms/ChargesAndPreferences';

interface ShortFormOnboardingProps {
  agentData: any;
  agentId: string; // This line makes the prop required
  onDraftSaved?: (draftData: any) => void;
}

export const ShortFormOnboarding: React.FC<ShortFormOnboardingProps> = ({
  agentData,
  onDraftSaved,
  agentId,
}) => {
  const [formData, setFormData] = useState<any>({
    projectName: '', builderName: '', reraNumber: '', projectType: '', numberOfFloors: '', flatsPerFloor: '', possessionDate: '', openSpace: '', carpetAreaPercent: '', ceilingHeight: '', floorCharger: '', floorChargerAmount: '', floorChargerAbove: '', facingCharges: '', facingChargesAmount: '', plc: '', plcConditions: '', powerBackup: '', carParkingCost: '', groundVehicleMovement: '', wowFactorAmenity: '', commissionType: 'commission', commissionPercentage: '', builderPrice: '', relaiPrice: '', payoutPeriod: '', pocName: '', pocNumber: '', pocRole: '', unitConfigurations: {}
  });

  const unitTypes = ['1BHK', '2BHK', '2.5BHK', '3BHK', '3.5BHK', '4BHK', '4.5BHK', '5BHK', 'Villa', 'Villa Duplex', 'Villa Triplex'];

  const handleDeepChange = (update: any) => {
    setFormData((prev: any) => ({ ...prev, ...update }));
  };

  const handleUnitConfigToggle = (unitType: string, enabled: boolean) => {
    setFormData((prev: any) => {
      const newConfigs = { ...prev.unitConfigurations };
      if (enabled) {
        // If enabling, ensure there's at least one parking slot entry
        newConfigs[unitType] = {
          enabled: true,
          parkingSlots: newConfigs[unitType]?.parkingSlots || [{ slots: '' }],
        };
      } else {
        // If disabling, remove the configuration
        delete newConfigs[unitType];
      }
      return { ...prev, unitConfigurations: newConfigs };
    });
  };
  
  const addParkingSlot = (unitType: string) => {
    setFormData((prev: any) => ({
      ...prev,
      unitConfigurations: {
        ...prev.unitConfigurations,
        [unitType]: {
          ...prev.unitConfigurations[unitType],
          parkingSlots: [...(prev.unitConfigurations[unitType]?.parkingSlots || []), { slots: '' }]
        }
      }
    }));
  };

  const removeParkingSlot = (unitType: string, index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      unitConfigurations: {
        ...prev.unitConfigurations,
        [unitType]: {
          ...prev.unitConfigurations[unitType],
          parkingSlots: prev.unitConfigurations[unitType]?.parkingSlots.filter((_: any, i: number) => i !== index) || []
        }
      }
    }));
  };
  
  const updateParkingSlot = (unitType: string, index: number, value: string) => {
    const sanitizedValue = value.replace(/[^0-9]/g, '');
    setFormData((prev: any) => ({
      ...prev,
      unitConfigurations: {
        ...prev.unitConfigurations,
        [unitType]: {
          ...prev.unitConfigurations[unitType],
          parkingSlots: prev.unitConfigurations[unitType]?.parkingSlots.map((s: any, i: number) => 
            i === index ? { ...s, slots: sanitizedValue } : s
          ) || []
        }
      }
    }));
  };

  const convertToFullFormData = (shortFormData: any) => {
    const fullUnitConfigurations: { [key: string]: any } = {};
    const shortUnitConfigs = shortFormData.unitConfigurations || {};

    // Map the short form's `parkingSlots` array to the full form's `variants` structure
    for (const unitType in shortUnitConfigs) {
      if (shortUnitConfigs[unitType]?.enabled) {
        const parkingSlots = shortUnitConfigs[unitType].parkingSlots || [];
        fullUnitConfigurations[unitType] = {
          enabled: true,
          variants: parkingSlots.map((p: any) => ({
            size: '', // Size is empty when coming from the short form
            parkingSlots: p.slots || '',
          })).filter(v => v.parkingSlots !== ''), // Only include variants with parking slots
        };
         // If after filtering no variants are left, don't add the unit type
        if (fullUnitConfigurations[unitType].variants.length === 0) {
            delete fullUnitConfigurations[unitType];
        }
      }
    }

    return {
      basics: {
        projectName: shortFormData.projectName || '', builderName: shortFormData.builderName || '', reraNumber: shortFormData.reraNumber || '', projectType: shortFormData.projectType || '', numberOfFloors: shortFormData.numberOfFloors || '', flatsPerFloor: shortFormData.flatsPerFloor || '', openSpace: shortFormData.openSpace || '', possessionDate: shortFormData.possessionDate || '', totalLandArea: '', numberOfTowers: '', totalUnits: '', launchDate: '', constructionStatus: '',
      },
      construction: {
        carpetAreaPercent: shortFormData.carpetAreaPercent || '', ceilingHeight: shortFormData.ceilingHeight || '', powerBackup: shortFormData.powerBackup || '', pricePerSqft: '', passengerLifts: '', serviceLifts: '', visitorParking: '', amenities: [], specifications: '',
      },
      units: {
        unitTypes: fullUnitConfigurations,
      },
      financial: {
        carParkingCost: shortFormData.carParkingCost || '', homeLoanBanks: [], constructionMaterial: '',
      },
      secondary: {
        commissionType: shortFormData.commissionType || '', commissionPercentage: shortFormData.commissionPercentage || '', builderPrice: shortFormData.builderPrice || '', relaiPrice: shortFormData.relaiPrice || '', payoutPeriod: shortFormData.payoutPeriod || '', confirmationPersonName: shortFormData.pocName || '', confirmationPersonContact: shortFormData.pocNumber || '', confirmationPersonRole: shortFormData.pocRole || '', floorCharger: shortFormData.floorCharger || '', floorChargerAmount: shortFormData.floorChargerAmount || '', floorChargerAbove: shortFormData.floorChargerAbove || '', facingCharges: shortFormData.facingCharges || '', facingChargesAmount: shortFormData.facingChargesAmount || '', plc: shortFormData.plc || '', plcConditions: shortFormData.plcConditions || '', groundVehicleMovement: shortFormData.groundVehicleMovement || '', wowFactorAmenity: shortFormData.wowFactorAmenity || '',
      }
    };
  };

  const handleSaveDraft = () => {
    if (!formData.projectName.trim()) { alert('Please enter a project name before saving as draft.'); return; }
    const fullFormData = convertToFullFormData(formData);
    if (onDraftSaved) { onDraftSaved(fullFormData); }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader><CardTitle>Project Information</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2"><Label htmlFor="sf-projectName">Project Name *</Label><Input id="sf-projectName" value={formData.projectName} onChange={(e) => handleDeepChange({ projectName: e.target.value })} placeholder="e.g., Cloud 9" required /></div>
          <div className="space-y-2"><Label htmlFor="sf-builderName">Builder Name</Label><Input id="sf-builderName" value={formData.builderName} onChange={(e) => handleDeepChange({ builderName: e.target.value })} placeholder="e.g., Urban Rise" /></div>
          <div className="space-y-2"><Label htmlFor="sf-reraNumber">RERA Number</Label><Input id="sf-reraNumber" value={formData.reraNumber} onChange={(e) => handleDeepChange({ reraNumber: e.target.value })} placeholder="e.g., P024000000XX" /></div>
          <div className="space-y-2"><Label htmlFor="sf-projectType">Project Type</Label><Select onValueChange={(v) => handleDeepChange({ projectType: v })} value={formData.projectType}><SelectTrigger><SelectValue placeholder="Select project type" /></SelectTrigger><SelectContent><SelectItem value="gated">Gated</SelectItem><SelectItem value="semi-gated">Semi-gated</SelectItem><SelectItem value="stand-alone">Stand-alone</SelectItem></SelectContent></Select></div>
          <div className="space-y-2"><Label htmlFor="sf-numberOfFloors">Number of Floors</Label><Input id="sf-numberOfFloors" type="text" inputMode="numeric" value={formData.numberOfFloors} onChange={(e) => handleDeepChange({ numberOfFloors: e.target.value.replace(/[^0-9]/g, '') })} placeholder="e.g., 30" /></div>
          <div className="space-y-2"><Label htmlFor="sf-flatsPerFloor">Flats Per Floor</Label><Input id="sf-flatsPerFloor" type="text" inputMode="numeric" value={formData.flatsPerFloor} onChange={(e) => handleDeepChange({ flatsPerFloor: e.target.value.replace(/[^0-9]/g, '') })} placeholder="e.g., 10" /></div>
          <div className="space-y-2"><Label htmlFor="sf-possessionDate">Possession Date</Label><Input id="sf-possessionDate" type="date" value={formData.possessionDate} onChange={(e) => handleDeepChange({ possessionDate: e.target.value })} /></div>
          <div className="space-y-2"><Label htmlFor="sf-openSpace">Open Space (%)</Label><Input id="sf-openSpace" type="text" inputMode="numeric" value={formData.openSpace} onChange={(e) => handleDeepChange({ openSpace: e.target.value.replace(/[^0-9]/g, '') })} placeholder="e.g., 70" /></div>
          <div className="space-y-2"><Label htmlFor="sf-carpetAreaPercent">Carpet Area %</Label><Input id="sf-carpetAreaPercent" type="text" inputMode="numeric" value={formData.carpetAreaPercent} onChange={(e) => handleDeepChange({ carpetAreaPercent: e.target.value.replace(/[^0-9]/g, '') })} placeholder="e.g., 20" /></div>
          <div className="space-y-2"><Label htmlFor="sf-ceilingHeight">Ceiling Height (ft)</Label><Input id="sf-ceilingHeight" type="text" inputMode="numeric" value={formData.ceilingHeight} onChange={(e) => handleDeepChange({ ceilingHeight: e.target.value.replace(/[^0-9]/g, '') })} placeholder="e.g., 10" /></div>
        </CardContent>
      </Card>
      
      <ChargesAndPreferences data={formData} onUpdate={handleDeepChange} />

      <Card>
        <CardHeader><CardTitle>Key Financials & Power</CardTitle></CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="sf-carParkingCost">Amount for Extra Car Parking (₹)</Label>
                <Input id="sf-carParkingCost" type="text" inputMode="numeric" value={formData.carParkingCost} onChange={(e) => handleDeepChange({ carParkingCost: e.target.value.replace(/[^0-9]/g, '') })} placeholder="e.g., 250000" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="sf-powerBackup">Power Backup</Label>
                <Select onValueChange={(v) => handleDeepChange({ powerBackup: v })} value={formData.powerBackup}>
                    <SelectTrigger id="sf-powerBackup">
                        <SelectValue placeholder="Select power backup type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="full">Full</SelectItem>
                        <SelectItem value="partial">Partial</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </CardContent>
      </Card>

      <CommissionAndPayout data={formData} onUpdate={handleDeepChange} />

      <Card>
        <CardHeader><CardTitle>Unit Configurations</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {unitTypes.map((unitType) => (<div key={unitType} className="border rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-4">
              <Checkbox id={`unit-${unitType}`} checked={formData.unitConfigurations[unitType]?.enabled || false} onCheckedChange={(c) => handleUnitConfigToggle(unitType, c as boolean)} />
              <Label htmlFor={`unit-${unitType}`} className="font-medium">{unitType}</Label>
            </div>
            {formData.unitConfigurations[unitType]?.enabled && (
            <div>
              <Label className="font-semibold">Parking Slots</Label>
              <div className="space-y-3 mt-3">
                {(formData.unitConfigurations[unitType]?.parkingSlots || []).map((p: any, i: number) => (
                  <div key={i} className="flex items-center gap-2">
                    <Input 
                      type="text" 
                      inputMode="numeric" 
                      value={p.slots} 
                      placeholder="e.g., 1" 
                      onChange={(e) => updateParkingSlot(unitType, i, e.target.value)} 
                    />
                    {(formData.unitConfigurations[unitType]?.parkingSlots.length || 0) > 1 && 
                      <Button type="button" variant="outline" size="icon" onClick={() => removeParkingSlot(unitType, i)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    }
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={() => addParkingSlot(unitType)} className="w-full flex items-center gap-2">
                  <Plus className="w-4 h-4" />Add
                </Button>
              </div>
            </div>
            )}
          </div>))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Point of Contact</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2"><Label htmlFor="sf-pocName">POC Name</Label><Input id="sf-pocName" value={formData.pocName} onChange={(e) => handleDeepChange({ pocName: e.target.value })} placeholder="e.g., John Doe"/></div>
          <div className="space-y-2"><Label htmlFor="sf-pocNumber">POC Number</Label><Input id="sf-pocNumber" type="tel" value={formData.pocNumber} onChange={(e) => handleDeepChange({ pocNumber: e.target.value })} placeholder="e.g., 9876543210"/></div>
          <div className="space-y-2"><Label htmlFor="sf-pocRole">POC Role</Label><Input id="sf-pocRole" value={formData.pocRole} onChange={(e) => handleDeepChange({ pocRole: e.target.value })} placeholder="e.g., Sales Manager"/></div>
        </CardContent>
      </Card>

      <div className="flex justify-center pt-6">
        <Button onClick={handleSaveDraft} className="bg-orange-600 hover:bg-orange-700 px-8 py-3 text-lg">Save as Draft</Button>
      </div>
    </div>
  );
};