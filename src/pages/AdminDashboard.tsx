
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Edit, Eye, LogOut, Search, Shield } from 'lucide-react';
import { ProjectForm } from '@/components/ProjectForm';

interface Submission {
  id: string;
  projectName: string;
  agentName: string;
  builderName: string;
  reraNumber: string;
  submittedDate: string;
  status: 'pending' | 'approved' | 'rejected';
  formData: any;
}

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  // Mock data - in real app, this would come from a database
  const [submissions, setSubmissions] = useState<Submission[]>([
    {
      id: '1',
      projectName: 'Cloud 9 Residency',
      agentName: 'John Smith',
      builderName: 'Urban Rise Builders',
      reraNumber: 'P024000001XX',
      submittedDate: '2024-01-15',
      status: 'pending',
      formData: {
        basics: { projectName: 'Cloud 9 Residency', builderName: 'Urban Rise Builders' },
        construction: { pricePerSqft: 7000, ceilingHeight: 10 },
        units: {},
        financial: {}
      }
    },
    {
      id: '2',
      projectName: 'Skyline Heights',
      agentName: 'Sarah Johnson',
      builderName: 'Metro Developers',
      reraNumber: 'P024000002XX',
      submittedDate: '2024-01-14',
      status: 'approved',
      formData: {
        basics: { projectName: 'Skyline Heights', builderName: 'Metro Developers' },
        construction: { pricePerSqft: 8500, ceilingHeight: 11 },
        units: {},
        financial: {}
      }
    },
    {
      id: '3',
      projectName: 'Green Valley',
      agentName: 'Mike Wilson',
      builderName: 'Eco Homes',
      reraNumber: 'P024000003XX',
      submittedDate: '2024-01-13',
      status: 'rejected',
      formData: {
        basics: { projectName: 'Green Valley', builderName: 'Eco Homes' },
        construction: { pricePerSqft: 6500, ceilingHeight: 9 },
        units: {},
        financial: {}
      }
    }
  ]);

  const filteredSubmissions = submissions.filter(submission => 
    submission.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    submission.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    submission.builderName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const handleEditSubmission = (submission: Submission) => {
    setSelectedSubmission(submission);
    setIsEditModalOpen(true);
  };

  const handleUpdateSubmission = (updatedData: any) => {
    if (selectedSubmission) {
      setSubmissions(prev => prev.map(sub => 
        sub.id === selectedSubmission.id 
          ? { ...sub, formData: updatedData }
          : sub
      ));
      setIsEditModalOpen(false);
      setSelectedSubmission(null);
    }
  };

  const updateSubmissionStatus = (id: string, newStatus: 'pending' | 'approved' | 'rejected') => {
    setSubmissions(prev => prev.map(sub => 
      sub.id === id ? { ...sub, status: newStatus } : sub
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-4 lg:px-6 py-3 lg:py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-purple-600" />
            <h1 className="text-lg lg:text-xl font-semibold text-gray-800">Admin Dashboard</h1>
          </div>
          <Button onClick={onLogout} variant="outline" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 lg:p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{submissions.length}</div>
                  <div className="text-sm text-gray-500">Total Submissions</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {submissions.filter(s => s.status === 'pending').length}
                  </div>
                  <div className="text-sm text-gray-500">Pending Review</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {submissions.filter(s => s.status === 'approved').length}
                  </div>
                  <div className="text-sm text-gray-500">Approved</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {submissions.filter(s => s.status === 'rejected').length}
                  </div>
                  <div className="text-sm text-gray-500">Rejected</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Submissions Table */}
          <Card>
            <CardHeader>
              <CardTitle>Project Submissions</CardTitle>
              <div className="flex gap-4 items-center">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search projects, agents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project Name</TableHead>
                      <TableHead>Agent Name</TableHead>
                      <TableHead>Builder</TableHead>
                      <TableHead>RERA Number</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubmissions.map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell className="font-medium">{submission.projectName}</TableCell>
                        <TableCell>{submission.agentName}</TableCell>
                        <TableCell>{submission.builderName}</TableCell>
                        <TableCell>{submission.reraNumber}</TableCell>
                        <TableCell>{submission.submittedDate}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Badge className={getStatusColor(submission.status)}>
                              {submission.status}
                            </Badge>
                            <select 
                              value={submission.status}
                              onChange={(e) => updateSubmissionStatus(submission.id, e.target.value as any)}
                              className="text-xs border rounded px-1"
                            >
                              <option value="pending">Pending</option>
                              <option value="approved">Approved</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleEditSubmission(submission)}
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Edit Project Submission</DialogTitle>
          </DialogHeader>
          {selectedSubmission && (
            <div className="p-4">
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>Agent:</strong> {selectedSubmission.agentName} | 
                  <strong> Submitted:</strong> {selectedSubmission.submittedDate}
                </p>
              </div>
              <AdminProjectForm 
                initialData={selectedSubmission.formData}
                onUpdate={handleUpdateSubmission}
                onCancel={() => setIsEditModalOpen(false)}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Admin-specific project form component
const AdminProjectForm: React.FC<{
  initialData: any;
  onUpdate: (data: any) => void;
  onCancel: () => void;
}> = ({ initialData, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState(initialData);

  const updateFormData = (section: string, data: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const handleSave = () => {
    onUpdate(formData);
  };

  return (
    <div className="space-y-4">
      <ProjectForm />
      <div className="flex gap-3 justify-end pt-4 border-t">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default AdminDashboard;
