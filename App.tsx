
import React, { useState, useEffect, useCallback } from 'react';
import { generateBookSummary } from './geminiService';
import { BookSummary } from './types';
import TrendChart from './components/TrendChart';

const INITIAL_THESIS = "The future of search lies in deep integration with professional software rather than a standalone search bar.";

const App: React.FC = () => {
  const [thesis, setThesis] = useState(INITIAL_THESIS);
  const [summary, setSummary] = useState<BookSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeChapter, setActiveChapter] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  const fetchSummary = useCallback(async (text: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await generateBookSummary(text);
      setSummary(data);
      setActiveChapter(1);
    } catch (err) {
      setError("Failed to generate the intelligence report. Please check your API configuration.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSummary(INITIAL_THESIS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (thesis.trim()) {
      fetchSummary(thesis);
    }
  };

  return (
    <div className="min-h-screen text-slate-200 flex flex-col">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 glass-panel border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <i className="fas fa-brain text-white"></i>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Search Insight Engine</h1>
            <p className="text-xs text-slate-400 font-medium">Professional Intelligence Matrix</p>
          </div>
        </div>
        
        <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-12 hidden md:block">
          <div className="relative group">
            <input 
              type="text" 
              value={thesis}
              onChange={(e) => setThesis(e.target.value)}
              placeholder="Enter a thesis or topic to explore..."
              className="w-full bg-slate-900/50 border border-slate-700 rounded-full py-2.5 px-6 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all text-sm"
            />
            <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors"></i>
          </div>
        </form>

        <div className="flex items-center space-x-4">
          <button className="text-slate-400 hover:text-white transition-colors">
            <i className="fas fa-cog"></i>
          </button>
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-bold border border-white/10">
            SR
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar - Navigation & Analytics */}
        <aside className="lg:w-80 flex-shrink-0 space-y-6">
          <div className="glass-panel rounded-2xl p-5 space-y-4">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider px-2">Knowledge Structure</h2>
            {loading ? (
              <div className="space-y-2 px-2">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="h-10 bg-slate-800 animate-pulse rounded-lg"></div>
                ))}
              </div>
            ) : summary ? (
              <nav className="space-y-1">
                {summary.chapters.map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => setActiveChapter(ch.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center space-x-3 group ${
                      activeChapter === ch.id 
                        ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' 
                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <span className={`text-xs font-mono ${activeChapter === ch.id ? 'text-blue-400' : 'text-slate-600'}`}>
                      0{ch.id}
                    </span>
                    <span className="text-sm font-medium truncate">{ch.title}</span>
                  </button>
                ))}
              </nav>
            ) : (
              <p className="text-xs text-slate-500 px-2 italic text-center py-4">Awaiting data synthesis...</p>
            )}
          </div>

          <div className="glass-panel rounded-2xl p-5">
            <TrendChart />
          </div>

          <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900/40 border border-slate-700/50 rounded-2xl p-5">
            <h3 className="text-sm font-semibold mb-2">Thesis Context</h3>
            <p className="text-xs text-slate-400 leading-relaxed italic">
              "The shift from discovery to intent-based execution within native environments."
            </p>
          </div>
        </aside>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          {error && (
            <div className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-xl text-red-200 text-sm flex items-center space-x-3">
              <i className="fas fa-exclamation-triangle"></i>
              <span>{error}</span>
            </div>
          )}

          {loading ? (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="glass-panel rounded-3xl p-8 space-y-4">
                <div className="h-8 bg-slate-800 w-2/3 rounded-lg animate-pulse"></div>
                <div className="h-4 bg-slate-800 w-1/4 rounded-lg animate-pulse"></div>
                <div className="space-y-2 mt-6">
                  <div className="h-4 bg-slate-800 w-full rounded-lg animate-pulse"></div>
                  <div className="h-4 bg-slate-800 w-5/6 rounded-lg animate-pulse"></div>
                  <div className="h-4 bg-slate-800 w-4/6 rounded-lg animate-pulse"></div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-64 bg-slate-800/50 rounded-3xl animate-pulse"></div>
                <div className="h-64 bg-slate-800/50 rounded-3xl animate-pulse"></div>
              </div>
            </div>
          ) : summary ? (
            <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
              {/* Executive Summary Section */}
              <section className="glass-panel rounded-3xl p-8 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                  <i className="fas fa-quote-right text-9xl"></i>
                </div>
                <div className="max-w-3xl">
                  <div className="inline-flex items-center space-x-2 bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 border border-blue-500/20">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    <span>Executive Summary</span>
                  </div>
                  <h2 className="text-3xl font-extrabold text-white mb-4 leading-tight">
                    {summary.title}
                  </h2>
                  <p className="text-slate-400 leading-relaxed text-lg">
                    {summary.executiveSummary}
                  </p>
                  <div className="mt-6 flex items-center space-x-4 text-sm font-medium text-slate-500">
                    <span className="flex items-center space-x-2">
                      <i className="fas fa-user-edit"></i>
                      <span>Authored by {summary.authorAlias}</span>
                    </span>
                    <span className="flex items-center space-x-2">
                      <i className="fas fa-calendar-alt"></i>
                      <span>Q3 2024 Intelligence Report</span>
                    </span>
                  </div>
                </div>
              </section>

              {/* Active Chapter Detail */}
              <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-12 glass-panel rounded-3xl p-8 border-l-4 border-blue-500">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                      <h3 className="text-slate-500 font-mono text-xs mb-2">CHAPTER 0{activeChapter} OF 0{summary.chapters.length}</h3>
                      <h4 className="text-2xl font-bold text-white">
                        {summary.chapters.find(c => c.id === activeChapter)?.title}
                      </h4>
                    </div>
                    <div className="flex space-x-2">
                       <button 
                        onClick={() => setActiveChapter(Math.max(1, activeChapter - 1))}
                        disabled={activeChapter === 1}
                        className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 disabled:opacity-30 transition-all border border-slate-700"
                       >
                         <i className="fas fa-chevron-left"></i>
                       </button>
                       <button 
                        onClick={() => setActiveChapter(Math.min(summary.chapters.length, activeChapter + 1))}
                        disabled={activeChapter === summary.chapters.length}
                        className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 disabled:opacity-30 transition-all border border-slate-700"
                       >
                         <i className="fas fa-chevron-right"></i>
                       </button>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800">
                      <p className="text-slate-300 leading-relaxed italic">
                        {summary.chapters.find(c => c.id === activeChapter)?.summary}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                      {summary.chapters.find(c => c.id === activeChapter)?.keyPoints.map((point, idx) => (
                        <div key={idx} className="flex space-x-4 items-start group">
                          <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0 group-hover:scale-150 transition-transform"></div>
                          <p className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors leading-relaxed">
                            {point}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Conclusion Section */}
              <section className="glass-panel rounded-3xl p-8 bg-gradient-to-br from-blue-900/20 to-slate-900/20">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="h-1 w-12 bg-blue-500 rounded-full"></div>
                  <h3 className="text-lg font-bold">The Strategic Outlook</h3>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  {summary.conclusion}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {["#IntelligentSearch", "#SaaSIntegration", "#API-First", "#SemanticWeb", "#ContextAware"].map(tag => (
                    <span key={tag} className="text-[10px] font-mono font-bold text-slate-500 border border-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-800 cursor-default transition-all">
                      {tag}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-50">
              <i className="fas fa-dna text-6xl text-blue-500/50"></i>
              <p className="text-lg">Initiate system to synthesize knowledge</p>
            </div>
          )}
        </div>
      </main>

      <footer className="glass-panel border-t border-slate-800 p-6 text-center text-slate-500 text-xs">
        <p>&copy; 2024 Search Insight Engine. Advanced Analytics for Digital Paradigms.</p>
      </footer>
    </div>
  );
};

export default App;
