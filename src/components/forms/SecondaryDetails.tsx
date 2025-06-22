import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SecondaryDetailsProps {
  data: any;
  onUpdate: (data: any) => void;
}

export const SecondaryDetails: React.FC<SecondaryDetailsProps> = ({ data, onUpdate }) => {
  const handleInputChange = (field: string, value: string) => {
    onUpdate({ [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* The Commission & Pricing Card has been removed from here */}

      <Card>
        <CardHeader>
          <CardTitle>Lead Registration Requirements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="leadRegistrationRequired">Is Lead Registration Required Before Site Visit?</Label>
            <Select onValueChange={(value) => handleInputChange('leadRegistrationRequired', value)} value={data.leadRegistrationRequired || ''}>
              <SelectTrigger>
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="whatsappNumber">WhatsApp Number for Lead Registration</Label>
              <Input id="whatsappNumber" placeholder="e.g., +91 9876543210" value={data.whatsappNumber || ''} onChange={(e) => handleInputChange('whatsappNumber', e.target.value)} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="emailAddress">Email Address for Lead Registration</Label>
              <Input id="emailAddress" type="email" placeholder="e.g., leads@builder.com" value={data.emailAddress || ''} onChange={(e) => handleInputChange('emailAddress', e.target.value)} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lead Management</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="acknowledgementTime">Turnaround Time for Lead Acknowledgement (minutes)</Label>
            <Input id="acknowledgementTime" type="number" step="any"
              onWheel={(e) => e.currentTarget.blur()} placeholder="e.g., 30" value={data.acknowledgementTime || ''} onChange={(e) => handleInputChange('acknowledgementTime', e.target.value.replace(/[^0-9]/g, ''))} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="leadValidity">Lead Validity Period (days)</Label>
            <Input id="leadValidity" type="number" step="any"
              onWheel={(e) => e.currentTarget.blur()} placeholder="e.g., 90" value={data.leadValidity || ''} onChange={(e) => handleInputChange('leadValidity', e.target.value.replace(/[^0-9]/g, ''))} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmationPersonName">Person to Confirm Registration: Name</Label>
            <Input id="confirmationPersonName" placeholder="e.g., John Doe" value={data.confirmationPersonName || ''} onChange={(e) => handleInputChange('confirmationPersonName', e.target.value)} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmationPersonContact">Person to Confirm Registration: Contact</Label>
            <Input id="confirmationPersonContact" placeholder="e.g., +91 9876543210" value={data.confirmationPersonContact || ''} onChange={(e) => handleInputChange('confirmationPersonContact', e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmationPersonRole">Person to Confirm Registration: Role</Label>
            <Input id="confirmationPersonRole" placeholder="e.g., Sales Manager" value={data.confirmationPersonRole || ''} onChange={(e) => handleInputChange('confirmationPersonRole', e.target.value)} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};