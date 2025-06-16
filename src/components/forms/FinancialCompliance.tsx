
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Financial Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="carParkingCost">Car Parking Cost (₹)</Label>
            <Input
              id="carParkingCost"
              type="number"
              placeholder="e.g., 200000"
              value={data.carParkingCost || ''}
              onChange={(e) => handleInputChange('carParkingCost', e.target.value)}
            />
            <p className="text-sm text-gray-500">Additional cost for car parking space</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Home Loan Partners</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {banks.map((bank) => (
              <div key={bank} className="flex items-center space-x-2">
                <Checkbox
                  id={`bank-${bank}`}
                  checked={(data.homeLoanBanks || []).includes(bank)}
                  onCheckedChange={(checked) => handleBankToggle(bank, checked as boolean)}
                />
                <Label htmlFor={`bank-${bank}`} className="text-sm font-normal">
                  {bank}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Construction Material</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="constructionMaterial">Primary Construction Material</Label>
            <Select onValueChange={(value) => handleInputChange('constructionMaterial', value)}>
              <SelectTrigger>
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

      <div className="flex justify-end space-x-4 pt-6">
        <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
          Save as Draft
        </button>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Submit Project
        </button>
      </div>
    </div>
  );
};
