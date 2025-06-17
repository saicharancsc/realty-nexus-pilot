
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, FileText, User, Building2, Filter, Download } from 'lucide-react';

// Mock data for demonstration
const mockAgentData = [
  {
    id: 1,
    agentName: 'John Smith',
    projectName: 'Skyline Towers',
    submissionDate: '2024-06-15',
    status: 'Approved',
    type: 'Project Registration'
  },
  {
    id: 2,
    agentName: 'Sarah Johnson',
    projectName: 'Green Valley Homes',
    submissionDate: '2024-06-14',
    status: 'Pending Review',
    type: 'Project Update'
  },
  {
    id: 3,
    agentName: 'John Smith',
    projectName: 'Urban Heights',
    submissionDate: '2024-06-13',
    status: 'Approved',
    type: 'Project Registration'
  },
  {
    id: 4,
    agentName: 'Mike Wilson',
    projectName: 'Lakeside Residency',
    submissionDate: '2024-06-12',
    status: 'Rejected',
    type: 'Document Submission'
  }
];

export const Reports = () => {
  const [selectedAgent, setSelectedAgent] = useState('all');
  const [dateFilter, setDateFilter] = useState('week');
  const [searchTerm, setSearchTerm] = useState('');

  // Get unique agents for filter
  const agents = Array.from(new Set(mockAgentData.map(item => item.agentName)));

  // Filter data based on selected filters
  const filteredData = mockAgentData.filter(item => {
    const matchesAgent = selectedAgent === 'all' || item.agentName === selectedAgent;
    const matchesSearch = item.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.agentName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesAgent && matchesSearch;
  });

  // Calculate statistics
  const totalSubmissions = filteredData.length;
  const approvedSubmissions = filteredData.filter(item => item.status === 'Approved').length;
  const pendingSubmissions = filteredData.filter(item => item.status === 'Pending Review').length;
  const rejectedSubmissions = filteredData.filter(item => item.status === 'Rejected').length;

  // Group by date for day-wise view
  const groupedByDate = filteredData.reduce((acc, item) => {
    const date = item.submissionDate;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {} as Record<string, typeof filteredData>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Agent Reports</h2>
          <p className="text-gray-600">Track agent submissions and performance</p>
        </div>
        <Button className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Report
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Agent</label>
              <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                <SelectTrigger>
                  <SelectValue placeholder="Select agent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Agents</SelectItem>
                  {agents.map(agent => (
                    <SelectItem key={agent} value={agent}>{agent}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Time Period</label>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Search</label>
              <Input
                placeholder="Search projects or agents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Submissions</p>
                <p className="text-2xl font-bold">{totalSubmissions}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Building2 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">{approvedSubmissions}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Calendar className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingSubmissions}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <User className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{rejectedSubmissions}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Day-wise Submissions */}
      <Card>
        <CardHeader>
          <CardTitle>Day-wise Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(groupedByDate)
              .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
              .map(([date, submissions]) => (
                <div key={date} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-lg">
                      {new Date(date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </h4>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {submissions.length} submission{submissions.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {submissions.map(submission => (
                      <div key={submission.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{submission.projectName}</p>
                          <p className="text-sm text-gray-600">by {submission.agentName} • {submission.type}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          submission.status === 'Approved' ? 'bg-green-100 text-green-800' :
                          submission.status === 'Pending Review' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {submission.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
