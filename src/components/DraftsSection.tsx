import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, FileText, Calendar, Building2 } from 'lucide-react';

interface DraftData {
  id: string;
  projectName: string;
  builderName: string;
  createdDate: string;
  status: 'draft' | 'submitted';
  formData: any;
}

interface DraftsSectionProps {
  drafts: DraftData[];
  onEditDraft: (draft: DraftData) => void;
}

export const DraftsSection: React.FC<DraftsSectionProps > = ({ drafts, onEditDraft }) => {
  // Sort drafts to show the most recent first
  const sortedDrafts = [...drafts].sort((a, b) => parseInt(b.id) - parseInt(a.id));

  return (
    <div className="max-w-6xl mx-auto">
      {/* --- MODIFIED HEADER SECTION --- */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">My Drafts</h2>
          <p className="text-gray-600 max-w-2xl">
            Manage your saved project drafts. Edit any draft to complete the full onboarding process.
          </p>
        </div>
        <div className="flex-shrink-0">
          <Badge variant="outline" className="text-base py-2 px-4 border-blue-200 bg-blue-50">
            Total Drafts: 
            <span className="font-bold ml-2 text-blue-700">
              {sortedDrafts.length}
            </span>
          </Badge>
        </div>
      </div>

      {sortedDrafts.length === 0 ? (
        <div className="text-center py-12 border-t mt-6">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-600 mb-2">No Drafts Yet</h3>
          <p className="text-gray-500">
            Create a short-form onboarding to save your first draft.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedDrafts.map((draft) => (
            <Card key={draft.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    <Badge variant="secondary" className="text-xs">
                      Draft
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-lg line-clamp-2">
                  {draft.projectName}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Building2 className="w-4 h-4 mr-2" />
                    <span className="truncate">{draft.builderName}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Created: {draft.createdDate}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    onClick={() => onEditDraft(draft)}
                    className="w-full flex items-center justify-center gap-2"
                    variant="outline"
                  >
                    <Edit className="w-4 h-4" />
                    Edit & Complete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};