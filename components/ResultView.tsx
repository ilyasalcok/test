import React, { useState } from 'react';
import { Download, Copy, Target, Users, Search, BarChart2, Layers, Zap, CheckCircle2, Code, Eye, Globe, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { AnalysisResult, ContentResult } from '../types';

interface ResultViewProps {
  analysis: AnalysisResult;
  content: ContentResult | null;
  onGenerateContent: () => void;
  isWriting: boolean;
}

const ResultView: React.FC<ResultViewProps> = ({ analysis, content, onGenerateContent, isWriting }) => {
  const [viewMode, setViewMode] = useState<'markdown' | 'preview'>('markdown');

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Kopyalandı!");
  };

  const handleDownload = () => {
    if (!content) return;
    const blob = new Blob([content.markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `seo-icerik-v6.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 pb-20 animate-fade-in-up font-sans">
      
      {/* ÜST SATIR: Strateji ve Rakip Analizi (Yan Yana) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* BÖLÜM 1: Strateji & Özet */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg flex flex-col h-full">
          <div className="p-4 bg-gradient-to-r from-blue-900/50 to-indigo-900/50 border-b border-gray-700 flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-gray-100">1. Strateji & PAA</h3>
          </div>
          <div className="p-5 space-y-4 text-sm text-gray-300 flex-1">
            <div>
              <span className="text-blue-400 font-semibold block mb-1">Arama Niyeti (Intent):</span>
              <p className="bg-gray-900/50 p-2 rounded border border-gray-700/50">{analysis.strategy.intent}</p>
            </div>
            <div>
              <span className="text-blue-400 font-semibold block mb-1">PAA (Kullanıcılar Sordu):</span>
              <ul className="list-disc pl-4 space-y-1 bg-gray-900/50 p-2 rounded border border-gray-700/50">
                {analysis.strategy.paa.map((q, i) => <li key={i}>{q}</li>)}
              </ul>
            </div>
            <div>
              <span className="text-blue-400 font-semibold block mb-1 flex items-center gap-1">
                <Users className="w-3 h-3" /> Demografi:
              </span>
              <p>{analysis.strategy.demographics}</p>
            </div>
            <div className="bg-gray-700/30 p-3 rounded border border-gray-600">
              <span className="text-yellow-400 font-semibold block mb-1">Özet:</span>
              <p className="italic">{analysis.strategy.summary}</p>
            </div>
          </div>
        </div>

        {/* BÖLÜM 2: Rakip & Gap Analizi */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg flex flex-col h-full">
          <div className="p-4 bg-gradient-to-r from-emerald-900/50 to-teal-900/50 border-b border-gray-700 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-gray-100">2. Rakip & GAP Analizi</h3>
          </div>
          <div className="p-5 space-y-4 text-sm text-gray-300 flex-1">
             <div>
              <span className="text-emerald-400 font-semibold block mb-1">Rakip Durumu:</span>
              <p className="bg-gray-900/50 p-2 rounded border border-gray-700/50">{analysis.gapAnalysis.competitorAnalysis}</p>
            </div>
             <div>
              <span className="text-emerald-400 font-semibold block mb-1">Eksik Konular (GAPS):</span>
              <ul className="list-disc pl-4 space-y-1 text-red-300 bg-gray-900/50 p-2 rounded border border-gray-700/50">
                {analysis.gapAnalysis.gaps.map((g, i) => <li key={i}>{g}</li>)}
              </ul>
            </div>
             <div className="bg-gray-700/30 p-3 rounded border border-gray-600">
              <span className="text-emerald-400 font-semibold block mb-1">Fırsatlar:</span>
              <p>{analysis.gapAnalysis.opportunities}</p>
            </div>
          </div>
        </div>

      </div>

      {/* REFERANSLAR (Google Search Grounding) */}
      {analysis.sources && analysis.sources.length > 0 && (
        <div className="w-full bg-[#0d1117] rounded-xl border border-gray-700/60 p-5 shadow-lg relative overflow-hidden group">
           <div className="absolute inset-0 bg-blue-900/5 group-hover:bg-blue-900/10 transition-colors"></div>
           <div className="relative z-10">
             <h4 className="text-blue-300 text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
               <Globe className="w-4 h-4" /> 
               Google Search Kaynakları (Grounding)
             </h4>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
               {analysis.sources.map((source, idx) => (
                 <a 
                   key={idx} 
                   href={source.url} 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="flex items-center gap-2 p-3 bg-gray-800/80 hover:bg-gray-700 border border-gray-700 rounded-lg transition-all group/link"
                 >
                    <div className="bg-gray-900 p-1.5 rounded-md text-gray-400 group-hover/link:text-white transition-colors">
                      <ExternalLink className="w-3 h-3" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-300 group-hover/link:text-blue-300 truncate transition-colors">{source.title}</p>
                      <p className="text-[10px] text-gray-500 truncate">{source.url}</p>
                    </div>
                 </a>
               ))}
             </div>
           </div>
        </div>
      )}

      {/* ORTA SATIR: Outline & Aksiyon (Tam Genişlik) */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg flex flex-col w-full">
        <div className="p-4 bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-b border-gray-700 flex items-center gap-2">
          <Layers className="w-5 h-5 text-purple-400" />
          <h3 className="font-bold text-gray-100">3. İçerik Taslağı (Outline)</h3>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col space-y-8">
            {/* 1. Heading Yapısı */}
            <div className="w-full">
              <span className="text-purple-400 font-semibold block mb-2 text-lg">Heading Hiyerarşisi:</span>
              <div className="whitespace-pre-wrap font-mono text-sm bg-gray-900 p-6 rounded-lg border border-gray-700 h-[350px] overflow-y-auto custom-scrollbar shadow-inner">
                {analysis.outline.headingHierarchy}
              </div>
            </div>

            {/* 2. FAQ Konuları */}
            <div className="w-full">
              <span className="text-purple-400 font-semibold block mb-2 text-lg">FAQ Konuları:</span>
              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {analysis.outline.faqTopics.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-300">
                      <span className="text-purple-500 mt-1.5">•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 3. CTA Önerisi */}
            <div className="w-full">
              <span className="text-purple-400 font-semibold block mb-2 text-lg">CTA Önerisi:</span>
              <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 p-4 rounded-lg border border-purple-800/30 text-gray-300 italic border-l-4 border-l-purple-500">
                "{analysis.outline.ctaSuggestion}"
              </div>
            </div>

            {/* Aksiyon Alanı */}
            <div className="pt-4 border-t border-gray-700">
              <div className="bg-gray-900 p-6 rounded-xl border border-blue-900/30 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h4 className="text-blue-200 font-bold text-lg mb-1">Taslak Onayı</h4>
                  <p className="text-sm text-gray-400">
                    Yukarıdaki taslak ve analizlere dayanarak makaleyi oluşturmak için aşağıdaki butona tıklayın.
                    <br />
                    <span className="text-xs text-gray-500">*Kapsamlı İçerik Çerçevesi (v6.0) kuralları uygulanacaktır.</span>
                  </p>
                </div>
                
                <button
                  onClick={onGenerateContent}
                  disabled={isWriting || !!content}
                  className={`min-w-[250px] py-4 px-6 rounded-lg font-bold text-white shadow-xl flex items-center justify-center gap-3 transition-all transform
                    ${content 
                      ? 'bg-green-600 cursor-default' 
                      : isWriting 
                        ? 'bg-gray-600 cursor-wait' 
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 hover:scale-[1.02] hover:shadow-blue-500/30'
                    }`}
                >
                  {content ? (
                    <>
                      <CheckCircle2 className="w-6 h-6" />
                      İçerik Tamamlandı
                    </>
                  ) : isWriting ? (
                    <>
                      <Zap className="w-6 h-6 animate-spin" />
                      Yazılıyor...
                    </>
                  ) : (
                    <>
                      <Zap className="w-6 h-6" />
                      Framework v6.0 İle Yaz
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ALT SATIR: NİHAİ İÇERİK ALANI */}
      {content && (
        <div className="animate-fade-in pt-4">
          <div className="flex justify-between items-center mb-0 p-4 bg-gray-800 rounded-t-xl border-b border-gray-700">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle2 className="w-6 h-6" />
                <span className="font-bold text-lg">SEO Uyumlu Makale (v6.0)</span>
              </div>
              
              {/* VIEW MODE TABS */}
              <div className="flex bg-gray-900 rounded-lg p-1 ml-4 border border-gray-700">
                <button
                  onClick={() => setViewMode('markdown')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'markdown' ? 'bg-gray-700 text-white shadow' : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <Code className="w-4 h-4" />
                  Markdown
                </button>
                <button
                  onClick={() => setViewMode('preview')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'preview' ? 'bg-gray-700 text-white shadow' : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  Önizleme
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => handleCopy(content.markdown)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-700 hover:bg-gray-600 rounded-md text-gray-200 transition-colors border border-gray-600"
              >
                <Copy className="w-4 h-4" />
                Kopyala
              </button>
              <button 
                onClick={handleDownload}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-500 rounded-md text-white transition-colors shadow-lg shadow-blue-900/20"
              >
                <Download className="w-4 h-4" />
                .md İndir
              </button>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-b-xl border border-gray-700 overflow-hidden min-h-[500px]">
            
            {viewMode === 'markdown' ? (
              // RAW MARKDOWN VIEW
              <div className="w-full h-full p-0">
                <textarea 
                  className="w-full h-[800px] bg-[#0d1117] text-gray-300 font-mono text-sm p-6 resize-none outline-none"
                  value={content.markdown}
                  readOnly
                />
              </div>
            ) : (
              // PREVIEW VIEW
              <div className="p-8 md:p-12">
                <article className="prose prose-invert prose-lg max-w-none 
                  prose-headings:text-blue-100 prose-headings:font-bold 
                  prose-h1:text-3xl prose-h1:mb-6 prose-h1:border-b prose-h1:border-gray-700 prose-h1:pb-4
                  prose-h2:text-2xl prose-h2:text-blue-300 prose-h2:mt-8
                  prose-p:text-gray-300 prose-p:leading-relaxed
                  prose-li:text-gray-300
                  prose-strong:text-white
                  prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                  prose-table:border prose-table:border-gray-700 prose-table:mt-6 prose-table:mb-6
                  prose-th:bg-gray-900 prose-th:p-3 prose-th:border prose-th:border-gray-700
                  prose-td:p-3 prose-td:border prose-td:border-gray-700
                  ">
                  <ReactMarkdown>{content.markdown}</ReactMarkdown>
                </article>
              </div>
            )}
            
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultView;