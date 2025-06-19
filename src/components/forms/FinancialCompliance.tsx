
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

interface FinancialComplianceProps {
  data: any;
  onUpdate: (data: any) => void;
}

export const FinancialCompliance: React.FC<FinancialComplianceProps> = ({ data, onUpdate }) => {
  const banks = ['ICICI Bank', 'Axis Bank', 'SBI', 'UBI', 'HDFC Bank', 'Kotak Mahindra Bank'];
  
  const handleInputChange = (field: string, value: string) => {
    onUpdate({ [field]: value });
  };

  const handleBankToggle = (bank: string, checked: boolean) => {
    const currentBanks = data.homeLoanBanks || [];
    if (checked) {
      onUpdate({ homeLoanBanks: [...currentBanks, bank] });
    } else {
      onUpdate({ homeLoanBanks: currentBanks.filter((b: string) => b !== bank) });
    }
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg lg:text-xl">Financial Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="carParkingCost" className="text-sm font-medium">Car Parking Cost (₹)</Label>
            <Input
              id="carParkingCost"
              type="number"
              step="any"
              onWheel={(e) => e.currentTarget.blur()}
              placeholder="e.g., 200000"
              value={data.carParkingCost || ''}
              onChange={(e) => handleInputChange('carParkingCost', e.target.value)}
              className="text-base"
            />
            <p className="text-xs lg:text-sm text-gray-500">Additional cost for car parking space</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg lg:text-xl">Home Loan Partners</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {banks.map((bank) => (
              <div key={bank} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50">
                <Checkbox
                  id={`bank-${bank}`}
                  checked={(data.homeLoanBanks || []).includes(bank)}
                  onCheckedChange={(checked) => handleBankToggle(bank, checked as boolean)}
                />
                <Label htmlFor={`bank-${bank}`} className="text-sm font-normal cursor-pointer flex-1">
                  {bank}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg lg:text-xl">Construction Material</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="constructionMaterial" className="text-sm font-medium">Primary Construction Material</Label>
            <Select onValueChange={(value) => handleInputChange('constructionMaterial', value)}>
              <SelectTrigger className="text-base">
                <SelectValue placeholder="Select construction material" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="concrete">Concrete</SelectItem>
                <SelectItem value="red-bricks">Red Bricks</SelectItem>
                <SelectItem value="aac-blocks">AAC Blocks</SelectItem>
                <SelectItem value="steel-frame">Steel Frame</SelectItem>
                <SelectItem value="hybrid">Hybrid Construction</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      
    </div>
  );
};
