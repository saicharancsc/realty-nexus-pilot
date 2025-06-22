
import React from 'react';
import { Building2, FileText, Settings, LogOut } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const menuItems = [
    { id: 'projects', label: 'Projects', icon: Building2 },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-full h-full bg-background shadow-lg border-r border-border flex flex-col">
      <div className="p-4 lg:p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <img 
            src="/lovable-uploads/95d8528a-6c65-46f3-ad47-07945b76d0be.png" 
            alt="Relai Logo" 
            className="h-8 w-auto"
          />
          <h2 className="text-lg lg:text-xl font-bold text-foreground">Real Estate CRM</h2>
        </div>
      </div>
      
      <nav className="mt-4 lg:mt-6 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center px-4 lg:px-6 py-4 lg:py-3 text-left transition-colors ${
                activeSection === item.id
                  ? 'bg-accent text-accent-foreground border-r-2 border-primary'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              <span className="text-sm lg:text-base">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 lg:p-6">
        <button className="w-full flex items-center px-4 py-3 text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors">
          <LogOut className="w-5 h-5 mr-3" />
          <span className="text-sm lg:text-base">Logout</span>
        </button>
      </div>
    </div>
  );
};
