import React from 'react';
import { Search } from 'lucide-react';

interface InputGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hasSearchIcon?: boolean;
  readOnlyBg?: boolean;
}

export const InputGroup: React.FC<InputGroupProps> = ({ 
  label, 
  hasSearchIcon, 
  readOnlyBg, 
  className = '', 
  ...props 
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <label className="text-xs text-gray-600 mb-1 font-medium">{label}</label>
      <div className="relative">
        <input
          className={`w-full border border-gray-300 rounded-sm px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors ${
            readOnlyBg ? 'bg-gray-100 text-gray-500' : 'bg-white text-gray-800'
          }`}
          {...props}
        />
        {hasSearchIcon && (
          <div className="absolute right-0 top-0 h-full px-2 flex items-center justify-center text-orange-400 cursor-pointer border-l border-gray-300 hover:bg-gray-50">
            <Search size={16} />
          </div>
        )}
      </div>
    </div>
  );
};