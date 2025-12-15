import React, { useState, useCallback } from 'react';
import { Search, Zap, Globe, BarChart2, FileText, Sparkles, ArrowRight } from 'lucide-react';

interface InputSectionProps {
  onSearch: (term: string) => void;
  disabled: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ onSearch, disabled }) => {
  const [topic, setTopic] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim() && !disabled) {
      onSearch(topic);
    }
  }, [topic, disabled, onSearch]);

  return (
    <div className="w-full flex flex-col items-center justify-center pt-8 pb-12 font-sans">
      
      {/* Badge */}
      <div className="animate-fade-in-down mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(99,102,241,0.2)] backdrop-blur-sm">
          <Zap className="w-3.5 h-3.5 fill-indigo-500" />
          <span>Next-Gen SEO Engine</span>
        </div>
      </div>

      {/* Hero Title */}
      <h1 className="text-center max-w-4xl mx-auto text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 drop-shadow-2xl">
        İçerik Stratejinizi <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-emerald-400 relative">
          Yapay Zeka İle Dönüştürün
          <Sparkles className="absolute -top-6 -right-8 text-yellow-400 w-8 h-8 opacity-50 animate-pulse hidden md:block" />
        </span>
      </h1>

      <p className="text-center text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
        Google'da ilk sayfa analizi, içerik boşlukları ve 20 yıllık SEO deneyimi simülasyonu ile <span className="text-gray-200 font-medium">tek tıkla otoriter içerik üretin.</span>
      </p>
      
      {/* Modern Input Field */}
      <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto relative group z-20">
        <div className={`absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 rounded-2xl blur opacity-25 group-hover:opacity-60 transition duration-500 ${isFocused ? 'opacity-70 blur-md' : ''}`}></div>
        
        <div className={`relative flex items-center bg-[#0d1117]/80 backdrop-blur-xl rounded-2xl border transition-all duration-300 shadow-2xl ${isFocused ? 'border-indigo-500/50 ring-1 ring-indigo-500/20' : 'border-white/10'}`}>
          <div className="pl-6 text-gray-400 group-hover:text-indigo-400 transition-colors">
            <Search className="w-6 h-6" />
          </div>
          
          <input
            type="text"
            className="w-full bg-transparent text-white px-4 py-6 outline-none text-lg md:text-xl placeholder-gray-600 font-medium"
            placeholder="Anahtar kelime girin (Örn: Sürdürülebilir Mimari)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
          />
          
          <div className="pr-3">
            <button
              type="submit"
              disabled={disabled || !topic.trim()}
              className={`h-12 px-6 rounded-xl font-bold text-white shadow-lg flex items-center gap-2 transition-all transform active:scale-95
                ${disabled || !topic.trim() 
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700' 
                  : 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 hover:shadow-indigo-500/25 border border-indigo-500/50'
                }`}
            >
              <span>Başlat</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl w-full">
        <FeatureCard 
          icon={<Globe className="w-6 h-6 text-blue-400" />}
          title="Google Search Analizi"
          desc="Gerçek zamanlı SERP verileri, PAA soruları ve arama niyeti tespiti."
          color="blue"
        />
        <FeatureCard 
          icon={<BarChart2 className="w-6 h-6 text-emerald-400" />}
          title="Rakip & Gap Analizi"
          desc="İlk sayfadaki rakiplerin eksik bıraktığı içerik fırsatlarını (Gaps) bulur."
          color="emerald"
        />
        <FeatureCard 
          icon={<FileText className="w-6 h-6 text-purple-400" />}
          title="Framework v6.0"
          desc="E-E-A-T uyumlu, semantik ve yapılandırılmış makale üretimi."
          color="purple"
        />
      </div>
    </div>
  );
};

// Alt Bileşen: Özellik Kartı
const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, desc: string, color: 'blue' | 'emerald' | 'purple' }> = ({ icon, title, desc, color }) => {
  const colorStyles = {
    blue: 'border-blue-500/20 hover:border-blue-500/40 bg-blue-500/5',
    emerald: 'border-emerald-500/20 hover:border-emerald-500/40 bg-emerald-500/5',
    purple: 'border-purple-500/20 hover:border-purple-500/40 bg-purple-500/5'
  };

  return (
    <div className={`p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 ${colorStyles[color]} group`}>
      <div className="w-12 h-12 rounded-xl bg-[#0d1117] border border-gray-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-gray-200 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
};

export default InputSection;