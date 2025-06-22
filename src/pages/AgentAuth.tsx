import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Mail, Lock, User } from 'lucide-react';
import relaiLogo from '@/assets/relaiLogo.png'; 

interface AgentAuthProps {
  onAuth: (agentData: any) => void;
}

const AgentAuth: React.FC<AgentAuthProps> = ({ onAuth }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      onAuth({
        name: formData.name,
        email: formData.email,
        id: Date.now().toString()
      });
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <img src={relaiLogo} alt="Relai Logo" className="w-32" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Agent Portal</h1>
          <p className="text-gray-600">Access your real estate project management</p>
        </div>
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-center">Agent Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="agentName">Agent Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input id="agentName" type="text" placeholder="Enter your name" className="pl-10" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="agentEmail">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input id="agentEmail" type="email" placeholder="Enter your email" className="pl-10" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="agentPassword">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input id="agentPassword" type="password" placeholder="Enter your password" className="pl-10" value={formData.password} onChange={(e) => handleInputChange('password', e.target.value)} required />
                </div>
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgentAuth;