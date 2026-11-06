import React, { useState, useEffect } from 'react';
import { 
  Baby, 
  MapPin, 
  Wifi, 
  WifiOff, 
  Heart, 
  PlusCircle, 
  Download, 
  ChevronDown, 
  Sparkles,
  PhoneCall
} from 'lucide-react';

export default function Navbar({ 
  onOpenRegister, 
  onOpenBookmarks, 
  bookmarksCount, 
  installPrompt, 
  onInstallApp 
}) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showDistrictMenu, setShowDistrictMenu] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-amber-500/20">
              <Baby className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900">
                  Little<span className="text-amber-600">Steps</span>
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-amber-50 text-amber-800 rounded-full border border-amber-200">
                  Kerala
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block font-medium">
                Premium Childcare & Daycare Directory
              </p>
            </div>
          </div>

          {/* District Selector & Offline Badge */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* District dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowDistrictMenu(!showDistrictMenu)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-100 hover:bg-slate-200/80 text-slate-800 transition border border-slate-200"
              >
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                <span>Ernakulam (EKM)</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showDistrictMenu && (
                <div 
                  className="absolute left-0 mt-2 w-56 rounded-2xl bg-white shadow-xl border border-slate-200 py-2 z-50 text-xs animate-in fade-in slide-in-from-top-2"
                  onMouseLeave={() => setShowDistrictMenu(false)}
                >
                  <div className="px-3 py-1.5 font-bold text-slate-400 uppercase text-[10px] tracking-wider">
                    Select Kerala District
                  </div>
                  <button className="w-full text-left px-3 py-2 bg-amber-50/70 text-amber-900 font-bold flex items-center justify-between">
                    <span>Ernakulam (Active Hub)</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </button>
                  <button disabled className="w-full text-left px-3 py-2 text-slate-400 hover:bg-slate-50 flex items-center justify-between cursor-not-allowed">
                    <span>Thrissur</span>
                    <span className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">Soon</span>
                  </button>
                  <button disabled className="w-full text-left px-3 py-2 text-slate-400 hover:bg-slate-50 flex items-center justify-between cursor-not-allowed">
                    <span>Thiruvananthapuram</span>
                    <span className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">Soon</span>
                  </button>
                  <button disabled className="w-full text-left px-3 py-2 text-slate-400 hover:bg-slate-50 flex items-center justify-between cursor-not-allowed">
                    <span>Kozhikode</span>
                    <span className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">Soon</span>
                  </button>
                </div>
              )}
            </div>

            {/* Offline/Online Pill */}
            <div 
              className={`hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                isOnline 
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                  : 'bg-amber-50 text-amber-800 border border-amber-300'
              }`}
              title={isOnline ? "Connected & Synchronized" : "Working in Offline Mode. Full catalog available."}
            >
              {isOnline ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Online</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-600" />
                  <span>Works Offline (No Wi-Fi)</span>
                </>
              )}
            </div>

            {/* PWA Install Button (if available) */}
            {installPrompt && (
              <button
                onClick={onInstallApp}
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition shadow-sm"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Install App</span>
              </button>
            )}

            {/* Bookmarks */}
            <button
              onClick={onOpenBookmarks}
              className="relative p-2 rounded-xl text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition"
              title="Saved Daycares"
            >
              <Heart className={`w-5 h-5 ${bookmarksCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {bookmarksCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {bookmarksCount}
                </span>
              )}
            </button>

            {/* List Your Daycare CTA */}
            <button
              onClick={onOpenRegister}
              className="flex items-center gap-1.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold shadow-sm hover:shadow transition transform active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">List Your Daycare</span>
              <span className="sm:hidden">Add</span>
            </button>

          </div>
        </div>
      </div>
    </header>
  );
}
