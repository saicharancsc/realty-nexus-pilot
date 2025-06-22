import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface CommissionAndPayoutProps {
  data: any;
  onUpdate: (data: any) => void;
}

export const CommissionAndPayout: React.FC<CommissionAndPayoutProps> = ({ data, onUpdate }) => {
  const handleInputChange = (field: string, value: string) => {
    // Only allow numbers and a single decimal point for percentage
    if (field === 'commissionPercentage') {
        if (/^\d*\.?\d*$/.test(value)) {
            onUpdate({ [field]: value });
        }
    } else {
         // Only allow integers for other fields
        onUpdate({ [field]: value.replace(/[^0-9]/g, '') });
    }
  };

  const handleRadioChange = (field: string, value: string) => {
    onUpdate({ [field]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Commission & Payout</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <RadioGroup
          value={data.commissionType}
          onValueChange={(value) => handleRadioChange('commissionType', value)}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="commission" id="commType" />
            <Label htmlFor="commType">Commission</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="cutoff" id="cutType" />
            <Label htmlFor="cutType">Cut-off</Label>
          </div>
        </RadioGroup>

        {data.commissionType === 'commission' && (
          <div className="space-y-2">
            <Label htmlFor="commissionPercentage">Commission Percentage Offered (%)</Label>
            <Input
              id="commissionPercentage"
              type="text"
              value={data.commissionPercentage || ''}
              onChange={(e) => handleInputChange('commissionPercentage', e.target.value)}
              placeholder="e.g., 2.5"
            />
          </div>
        )}

        {data.commissionType === 'cutoff' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="builderPrice">What is their price (₹)</Label>
              <Input
                id="builderPrice"
                type="text"
                value={data.builderPrice || ''}
                onChange={(e) => handleInputChange('builderPrice', e.target.value)}
                placeholder="e.g., 5000000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="relaiPrice">What is Relai's price (₹)</Label>
              <Input
                id="relaiPrice"
                type="text"
                value={data.relaiPrice || ''}
                onChange={(e) => handleInputChange('relaiPrice', e.target.value)}
                placeholder="e.g., 4800000"
              />
            </div>
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="payoutPeriod">Payout Time Period (days)</Label>
          <Input
            id="payoutPeriod"
            type="text"
            value={data.payoutPeriod || ''}
            onChange={(e) => handleInputChange('payoutPeriod', e.target.value)}
            placeholder="e.g., 30"
          />
        </div>
      </CardContent>
    </Card>
  );
};