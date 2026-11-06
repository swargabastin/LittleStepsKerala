import React from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  Map, 
  LayoutGrid, 
  Check, 
  Video, 
  Baby, 
  Moon, 
  Utensils, 
  Star,
  X
} from 'lucide-react';
import { EKM_AREAS } from '../data/daycares';

export default function FilterBar({
  searchQuery,
  setSearchQuery,
  selectedArea,
  setSelectedArea,
  viewMode,
  setViewMode,
  filters,
  toggleFilter,
  totalResults
}) {
  return (
    <div className="space-y-4">
      
      {/* Top Search & View Switcher Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by center name, locality (e.g. Kakkanad, Panampilly Nagar)..."
            className="w-full pl-11 pr-10 py-3.5 bg-white rounded-2xl border border-slate-200 shadow-sm text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* View Switcher Pills */}
        <div className="flex items-center bg-white p-1 rounded-2xl border border-slate-200 shadow-sm shrink-0 self-end sm:self-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition ${
              viewMode === 'grid'
                ? 'bg-slate-900 text-white shadow'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Grid Cards</span>
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition ${
              viewMode === 'map'
                ? 'bg-slate-900 text-white shadow'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Map className="w-4 h-4" />
            <span>Map View</span>
          </button>
        </div>

      </div>

      {/* Area Horizontal Pill Slider */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {EKM_AREAS.map((area, idx) => {
          const isActive = selectedArea === area;
          return (
            <button
              key={idx}
              onClick={() => setSelectedArea(area)}
              className={`px-4 py-2 rounded-full text-xs font-semibold shrink-0 transition-all ${
                isActive
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              {area}
            </button>
          );
        })}
      </div>

      {/* Feature Filter Tags */}
      <div className="flex items-center justify-between flex-wrap gap-2 pt-1 border-t border-slate-200/60">
        <div className="flex items-center gap-1.5 flex-wrap">
          
          <button
            onClick={() => toggleFilter('cctv')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition border ${
              filters.cctv
                ? 'bg-amber-50 text-amber-900 border-amber-300 font-bold'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Video className="w-3.5 h-3.5 text-amber-600" />
            <span>Live CCTV</span>
            {filters.cctv && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </button>

          <button
            onClick={() => toggleFilter('infant')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition border ${
              filters.infant
                ? 'bg-amber-50 text-amber-900 border-amber-300 font-bold'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Baby className="w-3.5 h-3.5 text-amber-600" />
            <span>Infant Care (&lt; 1 yr)</span>
            {filters.infant && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </button>

          <button
            onClick={() => toggleFilter('extended')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition border ${
              filters.extended
                ? 'bg-amber-50 text-amber-900 border-amber-300 font-bold'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Moon className="w-3.5 h-3.5 text-amber-600" />
            <span>Extended Hours (Post 6:30 PM)</span>
            {filters.extended && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </button>

          <button
            onClick={() => toggleFilter('meals')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition border ${
              filters.meals
                ? 'bg-amber-50 text-amber-900 border-amber-300 font-bold'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Utensils className="w-3.5 h-3.5 text-amber-600" />
            <span>Meals Provided</span>
            {filters.meals && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </button>

          <button
            onClick={() => toggleFilter('rating')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition border ${
              filters.rating
                ? 'bg-amber-50 text-amber-900 border-amber-300 font-bold'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>4.8+ Rated</span>
            {filters.rating && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </button>

        </div>

        <div className="text-xs font-semibold text-slate-500">
          Showing <span className="text-slate-900 font-bold">{totalResults}</span> daycares in Ernakulam
        </div>
      </div>

    </div>
  );
}
