import React from 'react';
import { Loader2, Globe, BarChart2, FileEdit } from 'lucide-react';

interface LoadingIndicatorProps {
  statusText?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ statusText = "İşlem Yapılıyor..." }) => {
  return (
    <div className="flex flex-col items-center justify-center my-20 animate-fade-in">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-indigo-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
        <div className="bg-gray-800 p-4 rounded-2xl border border-gray-700 shadow-2xl relative z-10">
            <Loader2 className="w-12 h-12 text-blue-400 animate-spin" />
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-white mb-6">{statusText}</h3>
      
      <div className="w-full max-w-md space-y-4">
        <div className="flex items-center gap-4 text-gray-400 animate-pulse">
            <Globe className="w-5 h-5 text-blue-500" />
            <span className="text-sm">Google Search verileri taranıyor...</span>
        </div>
        <div className="flex items-center gap-4 text-gray-400 animate-pulse" style={{ animationDelay: '0.5s' }}>
            <BarChart2 className="w-5 h-5 text-emerald-500" />
            <span className="text-sm">Rakip analizi ve fırsatlar belirleniyor...</span>
        </div>
        <div className="flex items-center gap-4 text-gray-400 animate-pulse" style={{ animationDelay: '1s' }}>
            <FileEdit className="w-5 h-5 text-purple-500" />
            <span className="text-sm">Content Framework v6.0 uygulanıyor...</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
