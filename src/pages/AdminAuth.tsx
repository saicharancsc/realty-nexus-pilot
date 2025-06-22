
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Shield, Lock, User } from 'lucide-react';
import relaiLogo from '@/assets/relaiLogo.png';

interface AdminAuthProps {
  onAuth: () => void;
}

const AdminAuth: React.FC<AdminAuthProps> = ({ onAuth }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate admin authentication - in real app, this would be a secure API call
    setTimeout(() => {
      if (credentials.username === 'admin' && credentials.password === 'admin123') {
        setIsLoading(false);
        onAuth();
      } else {
        setIsLoading(false);
        alert('Invalid credentials. Use admin/admin123');
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-[#1752ff] rounded-full flex items-center justify-center">
              <img src={relaiLogo} alt="Relai Logo" className="w-32" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-[#1752ff] mb-2">Admin Portal</h1>
          <p className="text-gray-600">Manage project submissions</p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-center">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter admin username"
                    className="pl-10"
                    value={credentials.username}
                    onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter admin password"
                    className="pl-10"
                    value={credentials.password}
                    onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-[#1752ff] hover:bg-[#0f3dcc]" 
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Admin Login'}
              </Button>
            </form>
            
            <div className="mt-4 text-center text-sm text-gray-500">
              Demo credentials: admin / admin123
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAuth;
