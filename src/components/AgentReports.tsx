import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Calendar, Building2, FileText, ArrowLeft } from 'lucide-react';

// --- Interfaces to handle multiple data structures ---
interface FlatDetails {
  reraNumber?: string;
  projectType?: string;
  floors?: number | string;
  flatsPerFloor?: number | string;
  possessionDate?: string;
  openSpace?: string;
  carpetArea?: string;
  ceilingHeight?: string;
  commission?: string;
  pocName?: string;
  pocNumber?: string;
  pocRole?: string;
}

interface NestedDetails {
  basics?: {
    reraNumber?: string;
    projectType?: string;
    numberOfFloors?: string;
    flatsPerFloor?: string;
    possessionDate?: string;
    openSpace?: string;
  };
  construction?: {
    carpetAreaPercent?: string;
    ceilingHeight?: string;
  };
  secondary?: {
    commissionPercentage?: string;
    confirmationPersonName?: string;
    confirmationPersonContact?: string;
    confirmationPersonRole?: string;
  };
}

interface Submission {
  id: number;
  projectName: string;
  builderName: string;
  submissionType: string;
  status: string;
  date?: string; 
  time?: string; 
  details?: FlatDetails & NestedDetails; // Combined type
}

/**
 * Corrects and formats a date/time to Indian Standard Time (IST).
 * This function includes a heuristic to fix dates that were saved in UTC
 * for early morning submissions in IST.
 */
const formatToIST = (dateStr?: string, timeStr?: string): string => {
    if (!dateStr || !timeStr) return "Invalid Date";
    
    // 1. Create a preliminary date object from the stored strings.
    let date = new Date(`${dateStr} ${timeStr}`);
    if (isNaN(date.getTime())) return "Invalid Date";
    
    // 2. Apply a correction for timezone differences.
    // getTimezoneOffset() for IST (UTC+5:30) is -330.
    const timezoneOffsetInHours = new Date().getTimezoneOffset() / -60; // For IST, this is 5.5

    // If the local timezone is ahead of UTC and the time is in the early morning,
    // it's highly likely the stored UTC date is one day behind the actual local date.
    if (timezoneOffsetInHours > 0 && date.getHours() < timezoneOffsetInHours) {
        // Correct the date by adding one day.
        date.setDate(date.getDate() + 1);
    }
    
    // 3. Format the (now corrected) date object to display in IST.
    const dateOptions: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone: 'Asia/Kolkata',
    };
    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata',
    };
    
    const formattedDate = new Intl.DateTimeFormat('en-CA', dateOptions).format(date);
    const formattedTime = new Intl.DateTimeFormat('en-US', timeOptions).format(date);

    return `${formattedDate} at ${formattedTime}`;
};


export const AgentReports: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [agentSubmissions, setAgentSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem('agentSubmissions');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        if (Array.isArray(parsedData)) {
          setAgentSubmissions(parsedData);
        } else {
          console.warn('agentSubmissions in localStorage was not an array. Resetting.');
          setAgentSubmissions([]);
        }
      }
    } catch (error) {
      console.error('Failed to parse agentSubmissions from localStorage:', error);
      setAgentSubmissions([]);
    }
  }, []);

  const filteredSubmissions = agentSubmissions
    .filter(submission => {
      const projectName = submission.projectName || '';
      const builderName = submission.builderName || '';
      
      const matchesSearch = projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           builderName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDate = !filterDate || submission.date === filterDate;
      return matchesSearch && matchesDate;
    })
    .sort((a, b) => {
      // Sort by ID descending. This is the most reliable way to get "latest first".
      return b.id - a.id;
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = {
    total: agentSubmissions.length,
    submitted: agentSubmissions.filter(s => s.status === 'submitted').length,
    drafts: agentSubmissions.filter(s => s.status === 'draft').length,
    thisWeek: agentSubmissions.filter(s => {
      if (!s.date || isNaN(new Date(s.date).getTime())) return false;
      const submissionDate = new Date(s.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return submissionDate >= weekAgo;
    }).length
  };
  
  const getNormalizedDetails = (details: any) => {
    if (!details) return {};
    // Handles new nested format
    if (details.basics || details.construction || details.secondary) {
        const basics = details.basics || {};
        const construction = details.construction || {};
        const secondary = details.secondary || {};
        return {
            reraNumber: basics.reraNumber,
            projectType: basics.projectType,
            floors: basics.numberOfFloors,
            flatsPerFloor: basics.flatsPerFloor,
            possessionDate: basics.possessionDate,
            openSpace: basics.openSpace,
            carpetArea: construction.carpetAreaPercent,
            ceilingHeight: construction.ceilingHeight,
            commission: secondary.commissionPercentage,
            pocName: secondary.confirmationPersonName,
            pocNumber: secondary.confirmationPersonContact,
            pocRole: secondary.confirmationPersonRole,
        };
    }
    // Handles old flat format
    return details;
  };

  const handleViewDetails = (submission: Submission) => setSelectedSubmission(submission);
  const handleBackToList = () => setSelectedSubmission(null);

  if (selectedSubmission) {
    const details = getNormalizedDetails(selectedSubmission.details);
    const displayDateTime = formatToIST(selectedSubmission.date, selectedSubmission.time);

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={handleBackToList}><ArrowLeft className="w-4 h-4 mr-2" />Back to Reports</Button>
          <div><h2 className="text-2xl font-bold text-gray-900">Project Details</h2><p className="text-gray-600">{selectedSubmission.projectName}</p></div>
        </div>
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-3">{selectedSubmission.projectName} <Badge className={getStatusColor(selectedSubmission.status)}>{selectedSubmission.status}</Badge> <Badge variant="outline">{selectedSubmission.submissionType}</Badge></CardTitle>
                <p className="text-sm text-gray-600 mt-1">Builder: {selectedSubmission.builderName}</p>
              </div>
              <div className="text-sm text-gray-500">Submitted on {displayDateTime}</div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-gray-900">Project Information</h3>
                <div className="space-y-3">
                  <div><label className="text-sm font-medium text-gray-600">RERA Number</label><p className="text-gray-900">{details.reraNumber || 'N/A'}</p></div>
                  <div><label className="text-sm font-medium text-gray-600">Project Type</label><p className="text-gray-900 capitalize">{details.projectType || 'N/A'}</p></div>
                  <div><label className="text-sm font-medium text-gray-600">Number of Floors</label><p className="text-gray-900">{details.floors || 'N/A'}</p></div>
                  <div><label className="text-sm font-medium text-gray-600">Flats Per Floor</label><p className="text-gray-900">{details.flatsPerFloor || 'N/A'}</p></div>
                  <div><label className="text-sm font-medium text-gray-600">Possession Date</label><p className="text-gray-900">{details.possessionDate || 'N/A'}</p></div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-gray-900">Project Specifications</h3>
                <div className="space-y-3">
                  <div><label className="text-sm font-medium text-gray-600">Open Space</label><p className="text-gray-900">{details.openSpace ? `${details.openSpace}%` : 'N/A'}</p></div>
                  <div><label className="text-sm font-medium text-gray-600">Carpet Area %</label><p className="text-gray-900">{details.carpetArea ? `${details.carpetArea}%` : 'N/A'}</p></div>
                  <div><label className="text-sm font-medium text-gray-600">Ceiling Height</label><p className="text-gray-900">{details.ceilingHeight ? `${details.ceilingHeight} ft` : 'N/A'}</p></div>
                  <div><label className="text-sm font-medium text-gray-600">Commission</label><p className="text-gray-900">{details.commission ? `${details.commission}%` : 'N/A'}</p></div>
                </div>
              </div>
              <div className="space-y-4 md:col-span-2">
                <h3 className="font-semibold text-lg text-gray-900">Point of Contact</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div><label className="text-sm font-medium text-gray-600">POC Name</label><p className="text-gray-900">{details.pocName || 'N/A'}</p></div>
                  <div><label className="text-sm font-medium text-gray-600">POC Number</label><p className="text-gray-900">{details.pocNumber || 'N/A'}</p></div>
                  <div><label className="text-sm font-medium text-gray-600">POC Role</label><p className="text-gray-900">{details.pocRole || 'N/A'}</p></div>
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
      <div><h2 className="text-2xl font-bold text-gray-900">My Reports</h2><p className="text-gray-600">Track your project submissions and drafts</p></div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-600">Total Projects</p><p className="text-2xl font-bold text-gray-900">{stats.total}</p></div><Building2 className="w-8 h-8 text-blue-600" /></div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-600">Submitted</p><p className="text-2xl font-bold text-green-600">{stats.submitted}</p></div><FileText className="w-8 h-8 text-green-600" /></div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-600">Drafts</p><p className="text-2xl font-bold text-yellow-600">{stats.drafts}</p></div><FileText className="w-8 h-8 text-yellow-600" /></div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-600">This Week</p><p className="text-2xl font-bold text-purple-600">{stats.thisWeek}</p></div><Calendar className="w-8 h-8 text-purple-600" /></div></CardContent></Card>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1"><Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" /><Input placeholder="Search projects or builders..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" /></div>
        <Input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} className="md:w-auto" />
      </div>
      <Card>
        <CardHeader><CardTitle>Your Submissions</CardTitle></CardHeader>
        <CardContent>
          {filteredSubmissions.length === 0 ? (
            <div className="text-center py-8"><FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" /><p className="text-gray-500">No submissions found</p></div>
          ) : (
            <div className="space-y-4">
              {filteredSubmissions.map((submission) => {
                const displayDateTime = formatToIST(submission.date, submission.time);
                return (
                  <div key={submission.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2"><h3 className="font-semibold text-gray-900">{submission.projectName}</h3><Badge className={getStatusColor(submission.status)}>{submission.status}</Badge><Badge variant="outline">{submission.submissionType}</Badge></div>
                      <p className="text-sm text-gray-600 mb-1">Builder: {submission.builderName}</p>
                      <p className="text-sm text-gray-500">{displayDateTime}</p>
                    </div>
                    <div className="mt-3 md:mt-0"><Button variant="outline" size="sm" onClick={() => handleViewDetails(submission)}>View Details</Button></div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};