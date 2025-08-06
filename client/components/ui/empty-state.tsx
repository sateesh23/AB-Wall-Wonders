import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FolderOpen, Plus, Settings, User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  title?: string;
  description?: string;
  showAddButton?: boolean;
}

export function EmptyState({ 
  title = "No Projects Found",
  description = "Start by adding your first project through the admin panel.",
  showAddButton = true
}: EmptyStateProps) {
  return (
    <Card className="border-dashed border-2 border-gray-300">
      <CardContent className="flex flex-col items-center justify-center py-16 px-8 text-center">
        <div className="mb-6">
          <FolderOpen className="w-16 h-16 text-gray-400" />
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-8 max-w-sm">
          {description}
        </p>
        
        {showAddButton && (
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link to="/admin">
                <User className="w-4 h-4 mr-2" />
                Go to Admin Panel
              </Link>
            </Button>
          </div>
        )}
        
        <div className="mt-8 text-sm text-gray-500 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="font-medium mb-2 text-blue-800">🎯 How to Add Projects:</p>
          <ol className="text-left space-y-2 text-blue-700">
            <li className="flex items-start gap-2">
              <span className="font-bold">1.</span>
              <span>Click "Go to Admin Panel" button above</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">2.</span>
              <span>Login with admin password</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">3.</span>
              <span>Click "Projects" tab → "Add New Project"</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">4.</span>
              <span>Fill project details & upload images</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">5.</span>
              <span>Click "Create Project" - appears instantly! ✨</span>
            </li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
}
