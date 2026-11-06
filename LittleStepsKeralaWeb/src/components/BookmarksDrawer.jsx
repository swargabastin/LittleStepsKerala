import React from 'react';
import { X, Heart, Star, MapPin, Trash2, ArrowRight } from 'lucide-react';

export default function BookmarksDrawer({ 
  isOpen, 
  onClose, 
  bookmarkedDaycares, 
  onRemoveBookmark, 
  onSelectDaycare 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm flex justify-end animate-in fade-in">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-rose-50 text-rose-600 rounded-xl">
              <Heart className="w-5 h-5 fill-rose-500" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Shortlisted Daycares</h3>
              <p className="text-xs text-slate-500">{bookmarkedDaycares.length} saved centers in Ernakulam</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of bookmarks */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {bookmarkedDaycares.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-800 text-sm">No saved daycares yet</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Tap the heart icon on any daycare card to save it here for comparison.
              </p>
            </div>
          ) : (
            bookmarkedDaycares.map((center) => (
              <div
                key={center.id}
                className="group p-3.5 rounded-2xl border border-slate-200/90 hover:border-amber-300 bg-white shadow-sm flex gap-3 transition"
              >
                <img
                  src={center.images[0]}
                  alt={center.name}
                  className="w-20 h-20 rounded-xl object-cover shrink-0 bg-slate-100"
                />

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[11px] font-bold text-amber-700">{center.area}</span>
                      <button
                        onClick={() => onRemoveBookmark(center.id)}
                        className="text-slate-300 hover:text-rose-600 transition"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <h5 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-1">{center.name}</h5>
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="font-semibold text-slate-800">{center.rating}</span>
                      <span>•</span>
                      <span>{center.monthlyFee.split('/')[0]}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onSelectDaycare(center);
                    }}
                    className="mt-2 text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 self-start"
                  >
                    <span>View Profile</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
