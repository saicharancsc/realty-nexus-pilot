
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Calendar, Building2, FileText, X, ArrowLeft } from 'lucide-react';

interface AgentReportsProps {
  agentData: any;
}

interface Submission {
  id: number;
  projectName: string;
  builderName: string;
  submissionType: string;
  status: string;
  date: string;
  time: string;
  details?: {
    reraNumber: string;
    projectType: string;
    floors: number;
    flatsPerFloor: number;
    possessionDate: string;
    openSpace: string;
    carpetArea: string;
    ceilingHeight: string;
    commission: string;
    pocName: string;
    pocNumber: string;
    pocRole: string;
  };
}

export const AgentReports: React.FC<AgentReportsProps> = ({ agentData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  // Mock data for agent's submissions with detailed information
  const agentSubmissions: Submission[] = [
    {
      id: 1,
      projectName: 'Cloud 9 Residency',
      builderName: 'Urban Rise',
      submissionType: 'Full Onboarding',
      status: 'submitted',
      date: '2024-06-15',
      time: '10:30 AM',
      details: {
        reraNumber: 'P024000001XX',
        projectType: 'Gated',
        floors: 30,
        flatsPerFloor: 10,
        possessionDate: 'July 2026',
        openSpace: '70%',
        carpetArea: '20%',
        ceilingHeight: '10ft',
        commission: '2.5%',
        pocName: 'John Doe',
        pocNumber: '+91 9876543210',
        pocRole: 'Project Manager'
      }
    },
    {
      id: 2,
      projectName: 'Green Valley Heights',
      builderName: 'Metro Builders',
      submissionType: 'Short-Form',
      status: 'draft',
      date: '2024-06-14',
      time: '3:45 PM',
      details: {
        reraNumber: 'P024000002XX',
        projectType: 'Semi-gated',
        floors: 25,
        flatsPerFloor: 8,
        possessionDate: 'December 2025',
        openSpace: '65%',
        carpetArea: '22%',
        ceilingHeight: '9.5ft',
        commission: '3%',
        pocName: 'Jane Smith',
        pocNumber: '+91 9876543211',
        pocRole: 'Sales Head'
      }
    },
    {
      id: 3,
      projectName: 'Skyline Towers',
      builderName: 'Prime Construction',
      submissionType: 'Full Onboarding',
      status: 'submitted',
      date: '2024-06-13',
      time: '11:15 AM',
      details: {
        reraNumber: 'P024000003XX',
        projectType: 'Stand-alone',
        floors: 40,
        flatsPerFloor: 12,
        possessionDate: 'March 2027',
        openSpace: '75%',
        carpetArea: '18%',
        ceilingHeight: '11ft',
        commission: '2%',
        pocName: 'Mike Johnson',
        pocNumber: '+91 9876543212',
        pocRole: 'Director'
      }
    }
  ];

  const filteredSubmissions = agentSubmissions.filter(submission => {
    const matchesSearch = submission.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.builderName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = !filterDate || submission.date === filterDate;
    return matchesSearch && matchesDate;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = {
    total: agentSubmissions.length,
    submitted: agentSubmissions.filter(s => s.status === 'submitted').length,
    drafts: agentSubmissions.filter(s => s.status === 'draft').length,
    thisWeek: agentSubmissions.filter(s => {
      const submissionDate = new Date(s.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return submissionDate >= weekAgo;
    }).length
  };

  const handleViewDetails = (submission: Submission) => {
    setSelectedSubmission(submission);
  };

  const handleBackToList = () => {
    setSelectedSubmission(null);
  };

  if (selectedSubmission) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={handleBackToList}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Reports
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Project Details</h2>
            <p className="text-gray-600">{selectedSubmission.projectName}</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-3">
                  {selectedSubmission.projectName}
                  <Badge className={getStatusColor(selectedSubmission.status)}>
                    {selectedSubmission.status}
                  </Badge>
                  <Badge variant="outline">
                    {selectedSubmission.submissionType}
                  </Badge>
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">Builder: {selectedSubmission.builderName}</p>
              </div>
              <div className="text-sm text-gray-500">
                Submitted on {selectedSubmission.date} at {selectedSubmission.time}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-gray-900">Project Information</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-600">RERA Number</label>
                    <p className="text-gray-900">{selectedSubmission.details?.reraNumber}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Project Type</label>
                    <p className="text-gray-900">{selectedSubmission.details?.projectType}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Number of Floors</label>
                    <p className="text-gray-900">{selectedSubmission.details?.floors}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Flats Per Floor</label>
                    <p className="text-gray-900">{selectedSubmission.details?.flatsPerFloor}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Possession Date</label>
                    <p className="text-gray-900">{selectedSubmission.details?.possessionDate}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-gray-900">Project Specifications</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Open Space</label>
                    <p className="text-gray-900">{selectedSubmission.details?.openSpace}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Carpet Area %</label>
                    <p className="text-gray-900">{selectedSubmission.details?.carpetArea}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Ceiling Height</label>
                    <p className="text-gray-900">{selectedSubmission.details?.ceilingHeight}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Commission</label>
                    <p className="text-gray-900">{selectedSubmission.details?.commission}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 md:col-span-2">
                <h3 className="font-semibold text-lg text-gray-900">Point of Contact</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">POC Name</label>
                    <p className="text-gray-900">{selectedSubmission.details?.pocName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">POC Number</label>
                    <p className="text-gray-900">{selectedSubmission.details?.pocNumber}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">POC Role</label>
                    <p className="text-gray-900">{selectedSubmission.details?.pocRole}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Reports</h2>
          <p className="text-gray-600">Track your project submissions and drafts</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Projects</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Building2 className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Submitted</p>
                <p className="text-2xl font-bold text-green-600">{stats.submitted}</p>
              </div>
              <FileText className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Drafts</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.drafts}</p>
              </div>
              <FileText className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-purple-600">{stats.thisWeek}</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search projects or builders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="md:w-auto"
        />
      </div>

      {/* Submissions List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredSubmissions.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No submissions found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredSubmissions.map((submission) => (
                <div
                  key={submission.id}
                  className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{submission.projectName}</h3>
                      <Badge className={getStatusColor(submission.status)}>
                        {submission.status}
                      </Badge>
                      <Badge variant="outline">
                        {submission.submissionType}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">Builder: {submission.builderName}</p>
                    <p className="text-sm text-gray-500">
                      {submission.date} at {submission.time}
                    </p>
                  </div>
                  <div className="mt-3 md:mt-0">
                    <Button variant="outline" size="sm" onClick={() => handleViewDetails(submission)}>
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
