
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
      <Card>
        <CardHeader>
          <CardTitle>Commission & Pricing</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="commissionPercentage">Commission Percentage Offered to Relai (%)</Label>
            <Input
              id="commissionPercentage"
              type="number"
              step="any"
              onWheel={(e) => e.currentTarget.blur()}
              placeholder="e.g., 2.5"
              value={data.commissionPercentage || ''}
              onChange={(e) => handleInputChange('commissionPercentage', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="builderPrice">What is their price (₹ per sqft)</Label>
            <Input
              id="builderPrice"
              type="number"
             step="any"
              onWheel={(e) => e.currentTarget.blur()}
              placeholder="e.g., 8000"
              value={data.builderPrice || ''}
              onChange={(e) => handleInputChange('builderPrice', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="relaiPrice">What is Relai price (₹ per sqft)</Label>
            <Input
              id="relaiPrice"
              type="number"
              step="any"
              onWheel={(e) => e.currentTarget.blur()}
              placeholder="e.g., 7500"
              value={data.relaiPrice || ''}
              onChange={(e) => handleInputChange('relaiPrice', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="payoutPeriod">After Agreement Of Sale, What is the Payout Time Period (days)</Label>
            <Input
              id="payoutPeriod"
              type="number"
              step="any"
              onWheel={(e) => e.currentTarget.blur()}
              placeholder="e.g., 30"
              value={data.payoutPeriod || ''}
              onChange={(e) => handleInputChange('payoutPeriod', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lead Registration Requirements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="leadRegistrationRequired">Is Lead Registration Required Before Site Visit?</Label>
            <Select onValueChange={(value) => handleInputChange('leadRegistrationRequired', value)}>
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
              <Input
                id="whatsappNumber"
                placeholder="e.g., +91 9876543210"
                value={data.whatsappNumber || ''}
                onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="emailAddress">Email Address for Lead Registration</Label>
              <Input
                id="emailAddress"
                type="email"
                placeholder="e.g., leads@builder.com"
                value={data.emailAddress || ''}
                onChange={(e) => handleInputChange('emailAddress', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="webFormLink">Web Form Link</Label>
              <Input
                id="webFormLink"
                type="url"
                placeholder="e.g., https://builder.com/register"
                value={data.webFormLink || ''}
                onChange={(e) => handleInputChange('webFormLink', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="crmAppLink">CRM/App Access Link</Label>
              <Input
                id="crmAppLink"
                type="url"
                placeholder="e.g., https://crm.builder.com"
                value={data.crmAppLink || ''}
                onChange={(e) => handleInputChange('crmAppLink', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="physicalRegister">Physical Register Details</Label>
              <Input
                id="physicalRegister"
                placeholder="Details about physical registration"
                value={data.physicalRegister || ''}
                onChange={(e) => handleInputChange('physicalRegister', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="otherModes">Other Lead Registration Modes</Label>
              <Input
                id="otherModes"
                placeholder="Any other registration methods"
                value={data.otherModes || ''}
                onChange={(e) => handleInputChange('otherModes', e.target.value)}
              />
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
            <Input
              id="acknowledgementTime"
              type="number"
              step="any"
              onWheel={(e) => e.currentTarget.blur()}
              placeholder="e.g., 30"
              value={data.acknowledgementTime || ''}
              onChange={(e) => handleInputChange('acknowledgementTime', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="leadValidity">Lead Validity Period (days)</Label>
            <Input
              id="leadValidity"
              type="number"
              step="any"
              onWheel={(e) => e.currentTarget.blur()}
              placeholder="e.g., 90"
              value={data.leadValidity || ''}
              onChange={(e) => handleInputChange('leadValidity', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmationPersonName">Person to Confirm Registration: Name</Label>
            <Input
              id="confirmationPersonName"
              placeholder="e.g., John Doe"
              value={data.confirmationPersonName || ''}
              onChange={(e) => handleInputChange('confirmationPersonName', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmationPersonContact">Person to Confirm Registration: Contact</Label>
            <Input
              id="confirmationPersonContact"
              placeholder="e.g., +91 9876543210"
              value={data.confirmationPersonContact || ''}
              onChange={(e) => handleInputChange('confirmationPersonContact', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Additional Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="workflowNotes">Notes/Comments on Lead Registration Workflow</Label>
            <Textarea
              id="workflowNotes"
              placeholder="Any additional notes or comments about the lead registration workflow..."
              value={data.workflowNotes || ''}
              onChange={(e) => handleInputChange('workflowNotes', e.target.value)}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>
      
    </div>
  );
};
