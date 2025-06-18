
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Calendar, Building2, FileText } from 'lucide-react';

interface DraftsSectionProps {
  agentData: any;
  onEditDraft: (draft: any) => void;
}

export const DraftsSection: React.FC<DraftsSectionProps> = ({ agentData, onEditDraft }) => {
  const [drafts, setDrafts] = useState<any[]>([]);

  // Hardcoded example drafts
  const exampleDrafts = [
    {
      id: 'example-1',
      projectName: 'Skyline Towers',
      builderName: 'Urban Developers Ltd',
      reraNumber: 'P02400000123',
      projectType: 'residential',
      pocName: 'Rajesh Kumar',
      pocNumber: '+91 98765 43210',
      createdAt: '2024-01-15T10:30:00.000Z',
      status: 'draft',
      formType: 'short-form'
    },
    {
      id: 'example-2',
      projectName: 'Green Valley Apartments',
      builderName: 'Eco Constructions',
      reraNumber: 'P02400000456',
      projectType: 'commercial',
      pocName: 'Priya Sharma',
      pocNumber: '+91 87654 32109',
      createdAt: '2024-01-14T15:45:00.000Z',
      status: 'draft',
      formType: 'short-form'
    },
    {
      id: 'example-3',
      projectName: 'Metro Business Park',
      builderName: 'Prime Builders',
      reraNumber: 'P02400000789',
      projectType: 'mixed',
      pocName: 'Amit Patel',
      pocNumber: '+91 76543 21098',
      createdAt: '2024-01-13T09:15:00.000Z',
      status: 'draft',
      formType: 'short-form'
    }
  ];

  useEffect(() => {
    // Load drafts from localStorage
    const loadDrafts = () => {
      const allDrafts = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('draft_')) {
          try {
            const draftData = JSON.parse(localStorage.getItem(key) || '');
            allDrafts.push(draftData);
          } catch (error) {
            console.error('Error parsing draft data:', error);
          }
        }
      }
      
      // If no real drafts exist, use example drafts
      if (allDrafts.length === 0) {
        setDrafts(exampleDrafts);
      } else {
        // Sort by creation date (newest first)
        allDrafts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setDrafts(allDrafts);
      }
    };

    loadDrafts();
  }, []);

  const handleEditDraft = (draft: any) => {
    onEditDraft(draft);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (drafts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Drafts Yet</h3>
          <p className="text-gray-500">
            Start with a short-form onboarding to create your first draft.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Drafts</h2>
          <p className="text-gray-600">Continue working on your saved drafts</p>
        </div>
        <Badge variant="secondary" className="text-lg px-3 py-1">
          {drafts.length} Draft{drafts.length !== 1 ? 's' : ''}
        </Badge>
      </div>

      <div className="grid gap-6">
        {drafts.map((draft) => (
          <Card key={draft.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    {draft.projectName || 'Untitled Project'}
                  </CardTitle>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(draft.createdAt)}
                    </div>
                    <Badge variant="outline" className="text-orange-600 border-orange-200">
                      Draft
                    </Badge>
                    {draft.id.startsWith('example-') && (
                      <Badge variant="outline" className="text-blue-600 border-blue-200">
                        Example
                      </Badge>
                    )}
                  </div>
                </div>
                <Button 
                  onClick={() => handleEditDraft(draft)}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Continue Editing
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Builder:</span>
                  <p className="text-gray-600">{draft.builderName || 'Not specified'}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">RERA Number:</span>
                  <p className="text-gray-600">{draft.reraNumber || 'Not specified'}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Project Type:</span>
                  <p className="text-gray-600 capitalize">{draft.projectType || 'Not specified'}</p>
                </div>
              </div>
              
              {draft.pocName && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">POC:</span>
                      <span className="ml-2 text-gray-600">{draft.pocName}</span>
                    </div>
                    {draft.pocNumber && (
                      <div>
                        <span className="font-medium text-gray-700">Contact:</span>
                        <span className="ml-2 text-gray-600">{draft.pocNumber}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
