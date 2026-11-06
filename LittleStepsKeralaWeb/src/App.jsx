import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import FilterBar from './components/FilterBar';
import DaycareCard from './components/DaycareCard';
import DaycareMap from './components/DaycareMap';
import DaycareDetailModal from './components/DaycareDetailModal';
import RegisterDaycareModal from './components/RegisterDaycareModal';
import BookmarksDrawer from './components/BookmarksDrawer';
import { getDaycares, getBookmarks, toggleBookmark } from './services/storage';
import { 
  Baby, 
  MapPin, 
  Sparkles, 
  ShieldCheck, 
  Heart, 
  Phone, 
  MessageCircle,
  Building2,
  HelpCircle,
  Compass
} from 'lucide-react';

export default function App() {
  const [daycares, setDaycares] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('All Areas');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'map'
  const [selectedDaycare, setSelectedDaycare] = useState(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [installPrompt, setInstallPrompt] = useState(null);

  // Active filters
  const [filters, setFilters] = useState({
    cctv: false,
    infant: false,
    extended: false,
    meals: false,
    rating: false
  });

  // Load daycares and bookmarks on start
  useEffect(() => {
    setDaycares(getDaycares());
    setBookmarks(getBookmarks());

    // Listen for PWA Install Prompt
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallApp = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      setInstallPrompt(null);
    }
  };

  const handleToggleBookmark = (id) => {
    const updated = toggleBookmark(id);
    setBookmarks(updated);
  };

  const toggleFilter = (key) => {
    setFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDaycareCreated = (newCenter) => {
    setDaycares(prev => [newCenter, ...prev]);
  };

  // Filtered daycares
  const filteredDaycares = useMemo(() => {
    return daycares.filter(center => {
      // Area match
      if (selectedArea !== 'All Areas' && !center.area.toLowerCase().includes(selectedArea.toLowerCase())) {
        return false;
      }

      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = center.name.toLowerCase().includes(q);
        const matchesArea = center.area.toLowerCase().includes(q);
        const matchesTagline = center.tagline?.toLowerCase().includes(q);
        const matchesAddress = center.address.toLowerCase().includes(q);
        if (!matchesName && !matchesArea && !matchesTagline && !matchesAddress) {
          return false;
        }
      }

      // Feature toggles
      if (filters.cctv) {
        const hasCctv = center.amenities.some(a => a.toLowerCase().includes('cctv'));
        if (!hasCctv) return false;
      }

      if (filters.infant) {
        const hasInfant = center.ageRange.toLowerCase().includes('month') || 
                          center.tagline.toLowerCase().includes('infant') || 
                          center.amenities.some(a => a.toLowerCase().includes('infant'));
        if (!hasInfant) return false;
      }

      if (filters.extended) {
        const isExtended = center.timings.includes('07:30 PM') || center.timings.includes('07:00 PM');
        if (!isExtended) return false;
      }

      if (filters.meals) {
        const hasMeals = center.amenities.some(a => a.toLowerCase().includes('meal') || a.toLowerCase().includes('snack'));
        if (!hasMeals) return false;
      }

      if (filters.rating && center.rating < 4.8) {
        return false;
      }

      return true;
    });
  }, [daycares, searchQuery, selectedArea, filters]);

  const bookmarkedDaycaresList = useMemo(() => {
    return daycares.filter(d => bookmarks.includes(d.id));
  }, [daycares, bookmarks]);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-800 flex flex-col selection:bg-amber-100 selection:text-amber-900">
      
      {/* Top Navigation */}
      <Navbar
        onOpenRegister={() => setIsRegisterOpen(true)}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        bookmarksCount={bookmarks.length}
        installPrompt={installPrompt}
        onInstallApp={handleInstallApp}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        
        {/* Luxury Hero Banner */}
        <HeroBanner />

        {/* Filter & Search Bar */}
        <FilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedArea={selectedArea}
          setSelectedArea={setSelectedArea}
          viewMode={viewMode}
          setViewMode={setViewMode}
          filters={filters}
          toggleFilter={toggleFilter}
          totalResults={filteredDaycares.length}
        />

        {/* Dynamic View: Map vs. Grid */}
        {viewMode === 'map' ? (
          <div className="space-y-6">
            <DaycareMap
              daycares={filteredDaycares}
              selectedDaycare={selectedDaycare}
              onSelectDaycare={(c) => setSelectedDaycare(c)}
            />

            {/* Accompanying cards below map */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDaycares.map((center) => (
                <DaycareCard
                  key={center.id}
                  center={center}
                  isBookmarked={bookmarks.includes(center.id)}
                  onToggleBookmark={handleToggleBookmark}
                  onSelect={(c) => setSelectedDaycare(c)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div>
            {filteredDaycares.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-sm max-w-lg mx-auto space-y-4 my-8">
                <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
                  <Compass className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">No daycares found matching criteria</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Try clearing some filter tags or selecting "All Areas" to see all available centers in Ernakulam.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedArea('All Areas');
                    setFilters({ cctv: false, infant: false, extended: false, meals: false, rating: false });
                  }}
                  className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition shadow-sm"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDaycares.map((center) => (
                  <DaycareCard
                    key={center.id}
                    center={center}
                    isBookmarked={bookmarks.includes(center.id)}
                    onToggleBookmark={handleToggleBookmark}
                    onSelect={(c) => setSelectedDaycare(c)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="mt-16 bg-slate-900 text-white border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-800 text-xs sm:text-sm">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-xl bg-amber-600 flex items-center justify-center text-white font-bold">
                  <Baby className="w-5 h-5" />
                </div>
                <span className="text-lg font-bold">LittleSteps Kerala</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
                Empowering Kerala parents with trustworthy, verified childcare listings, authentic parent reviews, and direct tour scheduling.
              </p>
            </div>

            <div>
              <h5 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Ernakulam Key Localities</h5>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
                <span className="hover:text-amber-400 cursor-pointer" onClick={() => setSelectedArea('Kakkanad (Infopark)')}>Kakkanad / Infopark</span>
                <span className="hover:text-amber-400 cursor-pointer" onClick={() => setSelectedArea('Panampilly Nagar')}>Panampilly Nagar</span>
                <span className="hover:text-amber-400 cursor-pointer" onClick={() => setSelectedArea('Edappally')}>Edappally (LuLu Hub)</span>
                <span className="hover:text-amber-400 cursor-pointer" onClick={() => setSelectedArea('Palarivattom')}>Palarivattom</span>
                <span className="hover:text-amber-400 cursor-pointer" onClick={() => setSelectedArea('Kadavanthra')}>Kadavanthra / Girinagar</span>
                <span className="hover:text-amber-400 cursor-pointer" onClick={() => setSelectedArea('Tripunithura')}>Tripunithura</span>
              </div>
            </div>

            <div>
              <h5 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Offline & Mobile Ready</h5>
              <p className="text-xs text-slate-400 leading-relaxed">
                This website is powered by a Progressive Web App (PWA) engine. It works smoothly on your phone and laptop even when offline or disconnected from Wi-Fi.
              </p>
              <div className="mt-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="text-emerald-400 text-xs font-semibold">Ernakulam Hub Active</span>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
            <div>© {new Date().getFullYear()} LittleSteps Kerala. All rights reserved.</div>
            <div>Built for Ernakulam Parents & Childcare Providers</div>
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      {selectedDaycare && (
        <DaycareDetailModal
          center={selectedDaycare}
          onClose={() => setSelectedDaycare(null)}
          isBookmarked={bookmarks.includes(selectedDaycare.id)}
          onToggleBookmark={handleToggleBookmark}
        />
      )}

      {isRegisterOpen && (
        <RegisterDaycareModal
          onClose={() => setIsRegisterOpen(false)}
          onCreated={handleDaycareCreated}
        />
      )}

      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarkedDaycares={bookmarkedDaycaresList}
        onRemoveBookmark={handleToggleBookmark}
        onSelectDaycare={(c) => setSelectedDaycare(c)}
      />

    </div>
  );
}
