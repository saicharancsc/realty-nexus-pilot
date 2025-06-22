import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Edit, LogOut, Search, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProjectForm } from '@/components/ProjectForm';
import relaiLogo from '@/assets/relaiLogo.png';

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
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [agentFilter, setAgentFilter] = useState('all');

  useEffect(() => {
    const allSubmissionsKey = 'allAgentSubmissions';
    const storedData = localStorage.getItem(allSubmissionsKey);
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        if (Array.isArray(parsedData)) {
          setSubmissions(parsedData);
        }
      } catch (error) {
        console.error("Failed to parse submissions from localStorage", error);
        setSubmissions([]);
      }
    }
  }, []);

  const updateAllSubmissions = (updatedSubmissions: Submission[]) => {
    setSubmissions(updatedSubmissions);
    localStorage.setItem('allAgentSubmissions', JSON.stringify(updatedSubmissions));
  };

  const handleUpdateSubmission = (updatedData: any) => {
    if (selectedSubmission) {
      // 1. Update the central list for the admin view
      const updatedAdminList = submissions.map(sub =>
        sub.id === selectedSubmission.id
          ? {
              ...sub,
              projectName: updatedData.basics?.projectName || sub.projectName,
              builderName: updatedData.basics?.builderName || sub.builderName,
              reraNumber: updatedData.basics?.reraNumber || sub.reraNumber,
              formData: updatedData,
            }
          : sub
      );
      updateAllSubmissions(updatedAdminList);

      // FIX: 2. Update the specific agent's report list to keep it in sync
      try {
        const agentName = selectedSubmission.agentName;
        const agentReportsKey = `agentSubmissions_${agentName}`;
        const existingAgentReports = JSON.parse(localStorage.getItem(agentReportsKey) || '[]');
        
        const updatedAgentReports = existingAgentReports.map((report: any) => {
            if (report.id === selectedSubmission.id) {
                // Update the report with the new data from the form
                return {
                    ...report,
                    projectName: updatedData.basics?.projectName || report.projectName,
                    builderName: updatedData.basics?.builderName || report.builderName,
                    details: updatedData, // The agent report uses `details` for the full data
                };
            }
            return report;
        });
        localStorage.setItem(agentReportsKey, JSON.stringify(updatedAgentReports));

      } catch (error) {
          console.error("Failed to sync update to agent's report:", error);
      }

      setIsEditModalOpen(false);
      setSelectedSubmission(null);
    }
  };

  const updateSubmissionStatus = (id: string, newStatus: 'pending' | 'approved' | 'rejected') => {
    const updatedList = submissions.map(sub =>
      sub.id === id ? { ...sub, status: newStatus } : sub
    );
    updateAllSubmissions(updatedList);
  };
  
  const handleEditSubmission = (submission: Submission) => {
    setSelectedSubmission(submission);
    setIsEditModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const agentNames = useMemo(() => {
    const names = submissions.map(s => s.agentName);
    return [...new Set(names)];
  }, [submissions]);

  const filteredSubmissions = submissions
    .filter(submission => {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      const searchMatch = searchTerm === '' ||
        (submission.projectName || '').toLowerCase().includes(lowercasedSearchTerm) ||
        (submission.agentName || '').toLowerCase().includes(lowercasedSearchTerm) ||
        (submission.builderName || '').toLowerCase().includes(lowercasedSearchTerm) ||
        (submission.reraNumber || '').toLowerCase().includes(lowercasedSearchTerm);
      
      const statusMatch = statusFilter === 'all' || submission.status === statusFilter;
      const agentMatch = agentFilter === 'all' || submission.agentName === agentFilter;

      return searchMatch && statusMatch && agentMatch;
    })
    .sort((a, b) => parseInt(b.id) - parseInt(a.id));

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setAgentFilter('all');
  };

  const isAnyFilterActive = searchTerm !== '' || statusFilter !== 'all' || agentFilter !== 'all';

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200 px-4 lg:px-6 py-3 lg:py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img src={relaiLogo} alt="Relai Logo" className="h-8 w-auto" />
            <h1 className="text-lg lg:text-xl font-semibold text-gray-800">Admin Dashboard</h1>
          </div>
          <Button onClick={onLogout} variant="outline" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="p-4 lg:p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card><CardContent className="p-4"><div className="text-center"><div className="text-2xl font-bold text-gray-900">{submissions.length}</div><div className="text-sm text-gray-500">Total Submissions</div></div></CardContent></Card>
            <Card><CardContent className="p-4"><div className="text-center"><div className="text-2xl font-bold text-gray-900">{submissions.filter(s => s.status === 'pending').length}</div><div className="text-sm text-gray-500">Pending Review</div></div></CardContent></Card>
            <Card><CardContent className="p-4"><div className="text-center"><div className="text-2xl font-bold text-gray-900">{submissions.filter(s => s.status === 'approved').length}</div><div className="text-sm text-gray-500">Approved</div></div></CardContent></Card>
            <Card><CardContent className="p-4"><div className="text-center"><div className="text-2xl font-bold text-gray-900">{submissions.filter(s => s.status === 'rejected').length}</div><div className="text-sm text-gray-500">Rejected</div></div></CardContent></Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Project Submissions</CardTitle>
              <div className="flex flex-wrap gap-4 items-center mt-4">
                <div className="relative flex-1 min-w-[250px]">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search project, agent, builder, RERA..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={agentFilter} onValueChange={setAgentFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by Agent" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Agents</SelectItem>
                    {agentNames.map(name => <SelectItem key={name} value={name}>{name}</SelectItem>)}
                  </SelectContent>
                </Select>
                {isAnyFilterActive && (
                    <Button variant="ghost" onClick={clearFilters} className="text-blue-600 hover:text-blue-800">
                        <X className="w-4 h-4 mr-2" />
                        Clear Filters
                    </Button>
                )}
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
                    {filteredSubmissions.length > 0 ? filteredSubmissions.map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell className="font-medium">{submission.projectName}</TableCell>
                        <TableCell>{submission.agentName}</TableCell>
                        <TableCell>{submission.builderName}</TableCell>
                        <TableCell>{submission.reraNumber}</TableCell>
                        <TableCell>{submission.submittedDate}</TableCell>
                        <TableCell>
                          <div className="flex gap-2 items-center">
                            <Badge className={getStatusColor(submission.status)}>{submission.status}</Badge>
                            <select value={submission.status} onChange={(e) => updateSubmissionStatus(submission.id, e.target.value as any)} className="text-xs border rounded px-1 py-0.5 bg-white">
                              <option value="pending">Pending</option>
                              <option value="approved">Approved</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline" onClick={() => handleEditSubmission(submission)}>
                            <Edit className="w-3 h-3" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    )) : (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center h-24">
                                No submissions match your criteria.
                            </TableCell>
                        </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
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

const AdminProjectForm: React.FC<{ initialData: any; onUpdate: (data: any) => void; onCancel: () => void; }> = ({ initialData, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState(initialData);
  const handleSave = () => onUpdate(formData);

  return (
    <div className="space-y-4">
      <ProjectForm initialData={formData} onUpdate={setFormData} isAdminMode={true} />
      <div className="flex gap-3 justify-end pt-4 border-t">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
      </div>
    </div>
  );
};

export default AdminDashboard;