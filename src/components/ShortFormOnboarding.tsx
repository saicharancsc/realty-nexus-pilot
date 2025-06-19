
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2 } from 'lucide-react';

interface ShortFormOnboardingProps {
  agentData: any;
  onDraftSaved?: (draftData: any) => void;
}

export const ShortFormOnboarding: React.FC<ShortFormOnboardingProps> = ({ agentData, onDraftSaved }) => {
  const [formData, setFormData] = useState<any>({
    projectName: '',
    builderName: '',
    reraNumber: '',
    projectType: '',
    numberOfFloors: '',
    flatsPerFloor: '',
    possessionDate: '',
    openSpace: '',
    carpetAreaPercent: '',
    ceilingHeight: '',
    floorCharger: '',
    floorChargerAmount: '',
    floorChargerAbove: '',
    facingCharges: '',
    plc: '',
    plcConditions: '',
    powerBackup: '',
    groundVehicleMovement: '',
    wowFactorAmenity: '',
    commissionType: 'commission',
    commissionPercent: '',
    cutoffTheirPrice: '',
    cutoffRelaiPrice: '',
    payoutTimePeriod: '',
    pocName: '',
    pocNumber: '',
    pocRole: '',
    unitConfigurations: {}
  });

  const unitTypes = ['1BHK', '2BHK', '3BHK', '4BHK', '5BHK', 'Villa Duplex', 'Villa Triplex'];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleUnitConfigToggle = (unitType: string, enabled: boolean) => {
    setFormData((prev: any) => ({
      ...prev,
      unitConfigurations: {
        ...prev.unitConfigurations,
        [unitType]: {
          ...prev.unitConfigurations[unitType],
          enabled,
          parkingSlots: enabled ? (prev.unitConfigurations[unitType]?.parkingSlots || [{ slots: '' }]) : []
        }
      }
    }));
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
    setFormData((prev: any) => ({
      ...prev,
      unitConfigurations: {
        ...prev.unitConfigurations,
        [unitType]: {
          ...prev.unitConfigurations[unitType],
          parkingSlots: prev.unitConfigurations[unitType]?.parkingSlots.map((slot: any, i: number) => 
            i === index ? { ...slot, slots: value } : slot
          ) || []
        }
      }
    }));
  };

  const convertToFullFormData = (shortFormData: any) => {
    // Convert short-form data to full-form structure
    return {
      basics: {
        projectName: shortFormData.projectName,
        builderName: shortFormData.builderName,
        reraNumber: shortFormData.reraNumber,
        projectType: shortFormData.projectType,
        numberOfFloors: shortFormData.numberOfFloors,
        flatsPerFloor: shortFormData.flatsPerFloor,
        possessionDate: shortFormData.possessionDate,
        openSpace: shortFormData.openSpace,
        carpetAreaPercent: shortFormData.carpetAreaPercent,
        ceilingHeight: shortFormData.ceilingHeight,
        // Leave other basic fields empty for full form
        projectAddress: '',
        landmark: '',
        pincode: '',
        city: '',
        state: '',
        totalUnits: '',
        totalTowers: '',
        clubhouse: '',
        commercialSpace: '',
      },
      construction: {
        // Leave construction fields empty for full form
        structureType: '',
        constructionQuality: '',
        floorPlan: '',
        elevatorBrand: '',
        elevatorCount: '',
        staircase: '',
        corridor: '',
        commonArea: '',
      },
      units: {
        unitConfigurations: shortFormData.unitConfigurations,
        // Leave other unit fields empty
      },
      financial: {
        commissionType: shortFormData.commissionType,
        commissionPercent: shortFormData.commissionPercent,
        cutoffTheirPrice: shortFormData.cutoffTheirPrice,
        cutoffRelaiPrice: shortFormData.cutoffRelaiPrice,
        payoutTimePeriod: shortFormData.payoutTimePeriod,
        // Leave other financial fields empty
        basePrice: '',
        totalPrice: '',
        registrationCharges: '',
        maintenanceCharges: '',
        otherCharges: '',
      },
      secondary: {
        floorCharger: shortFormData.floorCharger,
        floorChargerAmount: shortFormData.floorChargerAmount,
        floorChargerAbove: shortFormData.floorChargerAbove,
        facingCharges: shortFormData.facingCharges,
        plc: shortFormData.plc,
        plcConditions: shortFormData.plcConditions,
        powerBackup: shortFormData.powerBackup,
        groundVehicleMovement: shortFormData.groundVehicleMovement,
        wowFactorAmenity: shortFormData.wowFactorAmenity,
        pocName: shortFormData.pocName,
        pocNumber: shortFormData.pocNumber,
        pocRole: shortFormData.pocRole,
        // Leave other secondary fields empty
        amenities: [],
        specifications: '',
        approvals: '',
        bankApprovals: [],
      }
    };
  };

  const handleSaveDraft = () => {
    if (!formData.projectName.trim()) {
      alert('Please enter a project name before saving as draft.');
      return;
    }

    const fullFormData = convertToFullFormData(formData);
    
    const draftData = {
      ...fullFormData,
      agentName: agentData.name,
      agentEmail: agentData.email,
      submittedDate: new Date().toISOString().split('T')[0],
      status: 'draft',
      formType: 'converted-from-short-form',
      originalShortFormData: formData // Keep original data for reference
    };

    console.log('Saving draft:', draftData);
    
    if (onDraftSaved) {
      onDraftSaved(draftData);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Project Information */}
      <Card>
        <CardHeader>
          <CardTitle>Project Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="projectName">Project Name *</Label>
            <Input
              id="projectName"
              value={formData.projectName}
              onChange={(e) => handleInputChange('projectName', e.target.value)}
              placeholder="e.g., Cloud 9"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="builderName">Builder Name</Label>
            <Input
              id="builderName"
              value={formData.builderName}
              onChange={(e) => handleInputChange('builderName', e.target.value)}
              placeholder="e.g., Urban Rise"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reraNumber">RERA Number</Label>
            <Input
              id="reraNumber"
              value={formData.reraNumber}
              onChange={(e) => handleInputChange('reraNumber', e.target.value)}
              placeholder="e.g., P024000000XX"
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
          <div className="space-y-2">
            <Label htmlFor="numberOfFloors">Number of Floors</Label>
            <Input
              id="numberOfFloors"
              type="number"
              value={formData.numberOfFloors}
              onChange={(e) => handleInputChange('numberOfFloors', e.target.value)}
              placeholder="e.g., 30"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="flatsPerFloor">Flats Per Floor</Label>
            <Input
              id="flatsPerFloor"
              type="number"
              value={formData.flatsPerFloor}
              onChange={(e) => handleInputChange('flatsPerFloor', e.target.value)}
              placeholder="e.g., 10"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="possessionDate">Possession Date</Label>
            <Input
              id="possessionDate"
              type="month"
              value={formData.possessionDate}
              onChange={(e) => handleInputChange('possessionDate', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="openSpace">Open Space (%)</Label>
            <Input
              id="openSpace"
              type="number"
              value={formData.openSpace}
              onChange={(e) => handleInputChange('openSpace', e.target.value)}
              placeholder="e.g., 70"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="carpetAreaPercent">Carpet Area %</Label>
            <Input
              id="carpetAreaPercent"
              type="number"
              value={formData.carpetAreaPercent}
              onChange={(e) => handleInputChange('carpetAreaPercent', e.target.value)}
              placeholder="e.g., 20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ceilingHeight">Ceiling Height (ft)</Label>
            <Input
              id="ceilingHeight"
              type="number"
              value={formData.ceilingHeight}
              onChange={(e) => handleInputChange('ceilingHeight', e.target.value)}
              placeholder="e.g., 10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Charges & Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Charges & Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label>Floor Charger</Label>
            <RadioGroup
              value={formData.floorCharger}
              onValueChange={(value) => handleInputChange('floorCharger', value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="floorChargerYes" />
                <Label htmlFor="floorChargerYes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="floorChargerNo" />
                <Label htmlFor="floorChargerNo">No</Label>
              </div>
            </RadioGroup>
            {formData.floorCharger === 'yes' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <div className="space-y-2">
                  <Label htmlFor="floorChargerAmount">Amount per floor</Label>
                  <Input
                    id="floorChargerAmount"
                    type="number"
                    value={formData.floorChargerAmount}
                    onChange={(e) => handleInputChange('floorChargerAmount', e.target.value)}
                    placeholder="Amount"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="floorChargerAbove">Applicable above floor number</Label>
                  <Input
                    id="floorChargerAbove"
                    type="number"
                    value={formData.floorChargerAbove}
                    onChange={(e) => handleInputChange('floorChargerAbove', e.target.value)}
                    placeholder="Floor number"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <Label>Facing Charges</Label>
            <RadioGroup
              value={formData.facingCharges}
              onValueChange={(value) => handleInputChange('facingCharges', value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="facingChargesYes" />
                <Label htmlFor="facingChargesYes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="facingChargesNo" />
                <Label htmlFor="facingChargesNo">No</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label>Preferential Location Charges (PLC)</Label>
            <RadioGroup
              value={formData.plc}
              onValueChange={(value) => handleInputChange('plc', value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="plcYes" />
                <Label htmlFor="plcYes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="plcNo" />
                <Label htmlFor="plcNo">No</Label>
              </div>
            </RadioGroup>
            {formData.plc === 'yes' && (
              <div className="space-y-2">
                <Label htmlFor="plcConditions">Specify applicable units/conditions</Label>
                <Input
                  id="plcConditions"
                  value={formData.plcConditions}
                  onChange={(e) => handleInputChange('plcConditions', e.target.value)}
                  placeholder="Describe conditions"
                />
              </div>
            )}
          </div>

          <div className="space-y-3">
            <Label>Power Backup</Label>
            <RadioGroup
              value={formData.powerBackup}
              onValueChange={(value) => handleInputChange('powerBackup', value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="full" id="powerBackupFull" />
                <Label htmlFor="powerBackupFull">Full</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="partial" id="powerBackupPartial" />
                <Label htmlFor="powerBackupPartial">Partial</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="none" id="powerBackupNone" />
                <Label htmlFor="powerBackupNone">None</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label>Ground Vehicle Movement</Label>
            <RadioGroup
              value={formData.groundVehicleMovement}
              onValueChange={(value) => handleInputChange('groundVehicleMovement', value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="groundVehicleYes" />
                <Label htmlFor="groundVehicleYes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="groundVehicleNo" />
                <Label htmlFor="groundVehicleNo">No</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="partial" id="groundVehiclePartial" />
                <Label htmlFor="groundVehiclePartial">Partial</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="wowFactorAmenity">Wow Factor Amenity (Optional)</Label>
            <Input
              id="wowFactorAmenity"
              value={formData.wowFactorAmenity}
              onChange={(e) => handleInputChange('wowFactorAmenity', e.target.value)}
              placeholder="Describe special amenity"
            />
          </div>
        </CardContent>
      </Card>

      {/* Unit Configurations */}
      <Card>
        <CardHeader>
          <CardTitle>Unit Configurations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {unitTypes.map((unitType) => {
            const isEnabled = formData.unitConfigurations[unitType]?.enabled || false;
            const parkingSlots = formData.unitConfigurations[unitType]?.parkingSlots || [];

            return (
              <div key={unitType} className="border rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Checkbox
                    id={`unit-${unitType}`}
                    checked={isEnabled}
                    onCheckedChange={(checked) => handleUnitConfigToggle(unitType, checked as boolean)}
                  />
                  <Label htmlFor={`unit-${unitType}`} className="font-medium">
                    {unitType}
                  </Label>
                </div>

                {isEnabled && (
                  <div className="space-y-3">
                    <Label>Parking Slots Configuration</Label>
                    {parkingSlots.map((slot: any, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          type="number"
                          placeholder="Number of parking slots"
                          value={slot.slots}
                          onChange={(e) => updateParkingSlot(unitType, index, e.target.value)}
                          className="flex-1"
                        />
                        {parkingSlots.length > 1 && (
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
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Commission/Cut-off Logic */}
      <Card>
        <CardHeader>
          <CardTitle>Commission/Cut-off Logic</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup
            value={formData.commissionType}
            onValueChange={(value) => handleInputChange('commissionType', value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="commission" id="commissionType" />
              <Label htmlFor="commissionType">Commission</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cutoff" id="cutoffType" />
              <Label htmlFor="cutoffType">Cut-off</Label>
            </div>
          </RadioGroup>

          {formData.commissionType === 'commission' && (
            <div className="space-y-2">
              <Label htmlFor="commissionPercent">Commission % offered to Relai</Label>
              <Input
                id="commissionPercent"
                type="number"
                value={formData.commissionPercent}
                onChange={(e) => handleInputChange('commissionPercent', e.target.value)}
                placeholder="e.g., 2.5"
              />
            </div>
          )}

          {formData.commissionType === 'cutoff' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cutoffTheirPrice">What is their price</Label>
                <Input
                  id="cutoffTheirPrice"
                  type="number"
                  value={formData.cutoffTheirPrice}
                  onChange={(e) => handleInputChange('cutoffTheirPrice', e.target.value)}
                  placeholder="Their price"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cutoffRelaiPrice">What is Relai's price</Label>
                <Input
                  id="cutoffRelaiPrice"
                  type="number"
                  value={formData.cutoffRelaiPrice}
                  onChange={(e) => handleInputChange('cutoffRelaiPrice', e.target.value)}
                  placeholder="Relai's price"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payout and Contact</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="payoutTimePeriod">After Agreement of Sale, What is payout time period (days)</Label>
            <Input
              id="payoutTimePeriod"
              type="number"
              value={formData.payoutTimePeriod}
              onChange={(e) => handleInputChange('payoutTimePeriod', e.target.value)}
              placeholder="e.g., 30"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pocName">Person of Contact (POC) Name</Label>
            <Input
              id="pocName"
              value={formData.pocName}
              onChange={(e) => handleInputChange('pocName', e.target.value)}
              placeholder="POC Name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pocNumber">POC Number</Label>
            <Input
              id="pocNumber"
              type="tel"
              value={formData.pocNumber}
              onChange={(e) => handleInputChange('pocNumber', e.target.value)}
              placeholder="POC Phone Number"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pocRole">POC Role Name</Label>
            <Input
              id="pocRole"
              value={formData.pocRole}
              onChange={(e) => handleInputChange('pocRole', e.target.value)}
              placeholder="POC Role"
            />
          </div>
        </CardContent>
      </Card>

      {/* Action Button */}
      <div className="flex justify-center pt-6">
        <Button 
          onClick={handleSaveDraft}
          className="bg-orange-600 hover:bg-orange-700 px-8 py-3 text-lg"
        >
          Save as Draft
        </Button>
      </div>
    </div>
  );
};
