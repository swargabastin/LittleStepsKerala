import React from 'react';
import { ShieldCheck, Video, HeartHandshake, Baby, Sparkles } from 'lucide-react';

export default function HeroBanner() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950 text-white p-6 sm:p-10 lg:p-12 shadow-2xl border border-slate-800">
      
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl space-y-4">
        
        {/* Top Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold tracking-wide">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated for Ernakulam Working Parents</span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15]">
          Find the Safest, Loving <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-orange-400">Daycares in Ernakulam</span>
        </h1>

        {/* Subtitle */}
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
          Compare verified daycares near <strong>Infopark Kakkanad</strong>, <strong>Panampilly Nagar</strong>, <strong>Edappally</strong>, and <strong>Kadavanthra</strong>. Filter by live CCTV parent feeds, pediatric nurse availability, and extended IT shift hours.
        </p>

        {/* Trust Stats Row */}
        <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 border-t border-slate-700/60 text-xs">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-white/10 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">100% Verified</div>
              <div className="text-slate-400 text-[11px]">Staff & safety check</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-white/10 text-amber-400">
              <Video className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">Live CCTV</div>
              <div className="text-slate-400 text-[11px]">Parent app stream</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-white/10 text-rose-400">
              <Baby className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">Infant Suites</div>
              <div className="text-slate-400 text-[11px]">From 3 months+</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-white/10 text-blue-400">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">Zero Fee</div>
              <div className="text-slate-400 text-[11px]">Direct center booking</div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
