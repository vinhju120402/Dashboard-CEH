import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectGroupProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  placeholder?: string;
}

export const SelectGroup: React.FC<SelectGroupProps> = ({ label, placeholder, children, ...props }) => {
  return (
    <div className="flex flex-col">
      <label className="text-xs text-gray-600 mb-1 font-medium">{label}</label>
      <div className="relative">
        <select
          className="w-full border border-gray-300 rounded-sm px-3 py-1.5 text-sm appearance-none bg-white text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pr-8"
          {...props}
        >
          {placeholder && <option value="" disabled selected>{placeholder}</option>}
          {children}
        </select>
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
          <ChevronDown size={14} />
        </div>
      </div>
    </div>
  );
};