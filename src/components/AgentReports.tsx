
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Calendar, Building2, FileText } from 'lucide-react';

interface AgentReportsProps {
  agentData: any;
}

export const AgentReports: React.FC<AgentReportsProps> = ({ agentData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');

  // Mock data for agent's submissions
  const agentSubmissions = [
    {
      id: 1,
      projectName: 'Cloud 9 Residency',
      builderName: 'Urban Rise',
      submissionType: 'Full Onboarding',
      status: 'submitted',
      date: '2024-06-15',
      time: '10:30 AM'
    },
    {
      id: 2,
      projectName: 'Green Valley Heights',
      builderName: 'Metro Builders',
      submissionType: 'Short-Form',
      status: 'draft',
      date: '2024-06-14',
      time: '3:45 PM'
    },
    {
      id: 3,
      projectName: 'Skyline Towers',
      builderName: 'Prime Construction',
      submissionType: 'Full Onboarding',
      status: 'submitted',
      date: '2024-06-13',
      time: '11:15 AM'
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
                    <Button variant="outline" size="sm">
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
