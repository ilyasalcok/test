import React, { useState } from 'react';
import InputSection from './components/InputSection';
import ResultView from './components/ResultView';
import LoadingIndicator from './components/LoadingIndicator';
import { performAnalysis, generateFinalContent } from './services/geminiService';
import { AppStatus, AnalysisResult, ContentResult } from './types';
import { TrendingUp, LayoutTemplate } from 'lucide-react';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [topic, setTopic] = useState<string>("");
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [contentResult, setContentResult] = useState<ContentResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleAnalysis = async (searchTopic: string) => {
    setTopic(searchTopic);
    setStatus(AppStatus.ANALYZING);
    setErrorMsg(null);
    setAnalysisResult(null);
    setContentResult(null);

    try {
      const data = await performAnalysis(searchTopic);
      setAnalysisResult(data);
      setStatus(AppStatus.ANALYSIS_COMPLETED);
    } catch (err: any) {
      console.error(err);
      setStatus(AppStatus.ERROR);
      setErrorMsg(err.message || "Analiz sırasında beklenmedik bir hata oluştu.");
    }
  };

  const handleGenerateContent = async () => {
    if (!topic || !analysisResult) return;
    
    setStatus(AppStatus.WRITING);
    try {
      const content = await generateFinalContent(topic, analysisResult);
      setContentResult(content);
      setStatus(AppStatus.COMPLETED);
    } catch (err: any) {
      console.error(err);
      setStatus(AppStatus.ERROR);
      setErrorMsg("İçerik yazılırken hata oluştu: " + err.message);
    }
  };

  const resetSearch = () => {
    setStatus(AppStatus.IDLE);
    setAnalysisResult(null);
    setContentResult(null);
    setErrorMsg(null);
    setTopic("");
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-100 font-sans selection:bg-indigo-500/30 relative overflow-x-hidden">
      
      {/* Modern Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Dot Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#2d3748_1px,transparent_1px)] [background-size:20px_20px] opacity-20"></div>
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-900/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-900/10 blur-[120px] rounded-full"></div>
      </div>

      {/* Header */}
      <header className="border-b border-gray-800/60 bg-[#161b22]/70 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={resetSearch}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300 ring-1 ring-white/10">
              <LayoutTemplate className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                SEO Framework
              </span>
              <span className="text-[10px] text-gray-500 font-mono tracking-wider uppercase">v6.0 Intelligent Core</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="hidden md:flex items-center gap-2 text-xs font-mono text-gray-400 bg-gray-900/50 border border-gray-700/50 rounded-full px-3 py-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              System Active
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {status === AppStatus.IDLE && (
          <InputSection onSearch={handleAnalysis} disabled={false} />
        )}

        {status === AppStatus.ANALYZING && (
          <LoadingIndicator statusText="SERP & Gap Analizi Yapılıyor..." />
        )}

        {status === AppStatus.ERROR && (
          <div className="max-w-2xl mx-auto mt-12 p-8 bg-red-950/30 border border-red-900/50 backdrop-blur rounded-2xl text-center shadow-2xl">
            <h3 className="text-xl font-bold text-red-400 mb-2">Hata Oluştu</h3>
            <p className="text-gray-400">{errorMsg}</p>
            <button 
              onClick={resetSearch}
              className="mt-6 px-6 py-2.5 bg-red-900 hover:bg-red-800 text-white rounded-lg transition-colors font-medium border border-red-700/50"
            >
              Başa Dön
            </button>
          </div>
        )}

        {(status === AppStatus.ANALYSIS_COMPLETED || status === AppStatus.WRITING || status === AppStatus.COMPLETED) && analysisResult && (
          <div className="space-y-8 animate-fade-in-up">
            <div className="flex justify-between items-end mb-6 pb-4 border-b border-gray-800/50">
               <div>
                 <span className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-1 block">Analiz Raporu</span>
                 <h2 className="text-3xl font-bold text-white tracking-tight">
                    {topic}
                 </h2>
               </div>
               <button 
                  onClick={resetSearch}
                  className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-all text-sm font-medium flex items-center gap-2 border border-gray-700"
                >
                  <TrendingUp className="w-4 h-4" />
                  Yeni Analiz
                </button>
            </div>
            
            <ResultView 
              analysis={analysisResult} 
              content={contentResult}
              onGenerateContent={handleGenerateContent}
              isWriting={status === AppStatus.WRITING}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800/60 mt-20 py-10">
        <div className="max-w-7xl mx-auto text-center text-gray-600 text-sm">
          <p className="flex items-center justify-center gap-2">
            <span>Powered by</span>
            <span className="font-semibold text-gray-400">Gemini 2.5 Flash</span>
            <span>&</span>
            <span className="font-semibold text-gray-400">Content Framework v6.0</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;