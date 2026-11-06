import React from 'react';
import { 
  ShieldCheck, 
  Star, 
  MapPin, 
  Clock, 
  Phone, 
  MessageCircle, 
  Heart, 
  ArrowRight,
  Sparkles,
  Users
} from 'lucide-react';

export default function DaycareCard({ 
  center, 
  isBookmarked, 
  onToggleBookmark, 
  onSelect, 
  onWhatsApp 
}) {
  return (
    <div className="group bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-amber-200/80 transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Image & Quick Badges */}
      <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-100">
        <img
          src={center.images[0]}
          alt={center.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {center.isVerified && (
              <span className="bg-emerald-600/95 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified
              </span>
            )}
            {center.isFeatured && (
              <span className="bg-amber-500/95 backdrop-blur-md text-slate-950 text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" /> Top Pick
              </span>
            )}
          </div>

          {/* Bookmark Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(center.id);
            }}
            className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-slate-700 hover:text-rose-600 flex items-center justify-center transition shadow-md active:scale-90"
            title={isBookmarked ? "Remove from saved" : "Save daycare"}
          >
            <Heart className={`w-4 h-4 ${isBookmarked ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>

        {/* Bottom Image Overlay: Area & Rating */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
          <div className="flex items-center gap-1 text-xs font-semibold drop-shadow">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>{center.area}</span>
          </div>

          <div className="bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded-lg flex items-center gap-1 text-xs font-bold text-amber-400 shadow">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{center.rating}</span>
            <span className="text-slate-400 font-normal text-[10px]">({center.reviewsCount})</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 
            onClick={() => onSelect(center)}
            className="font-bold text-lg text-slate-900 hover:text-amber-700 transition cursor-pointer line-clamp-1"
          >
            {center.name}
          </h3>
          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {center.tagline}
          </p>

          {/* Timing & Ratio Indicators */}
          <div className="mt-3.5 grid grid-cols-2 gap-2 text-xs py-2.5 px-3 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-1.5 text-slate-600">
              <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="truncate">{center.timings}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600">
              <Users className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="truncate">{center.staffRatio.split('|')[0]}</span>
            </div>
          </div>

          {/* Amenities Pills (Top 3) */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {center.amenities.slice(0, 3).map((amenity, idx) => (
              <span 
                key={idx}
                className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-amber-50/60 text-amber-900 border border-amber-200/50"
              >
                {amenity}
              </span>
            ))}
            {center.amenities.length > 3 && (
              <span className="text-[11px] font-medium px-1.5 py-0.5 text-slate-400">
                +{center.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Estimated</div>
            <div className="text-sm font-extrabold text-slate-900">{center.monthlyFee.split('/')[0]}</div>
          </div>

          <div className="flex items-center gap-1.5">
            <a
              href={`https://wa.me/${center.whatsapp}?text=${encodeURIComponent(`Hi ${center.name}, I found your daycare on LittleSteps Kerala and would like to know more about admissions.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition border border-emerald-200/60"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            <a
              href={`tel:${center.phone.replace(/[^0-9+]/g, '')}`}
              className="p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
              title="Direct Call"
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              onClick={() => onSelect(center)}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-amber-600 text-white text-xs font-bold transition flex items-center gap-1 group/btn shadow-sm"
            >
              <span>Explore</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
