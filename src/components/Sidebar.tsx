
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
    <div className="w-full h-full bg-white shadow-lg border-r border-gray-200 flex flex-col">
      <div className="p-4 lg:p-6 border-b border-gray-200">
        <h2 className="text-lg lg:text-xl font-bold text-gray-800">Real Estate CRM</h2>
      </div>
      
      <nav className="mt-4 lg:mt-6 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center px-4 lg:px-6 py-4 lg:py-3 text-left transition-all duration-200 ${
                activeSection === item.id
                  ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
              <span className="text-sm lg:text-base font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 lg:p-6 border-t border-gray-200">
        <button className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-all duration-200">
          <LogOut className="w-5 h-5 mr-3 flex-shrink-0" />
          <span className="text-sm lg:text-base font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};
