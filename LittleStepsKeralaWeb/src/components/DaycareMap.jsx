import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { ShieldCheck, Phone, Clock, ArrowRight, Star } from 'lucide-react';

// Custom luxurious HTML Pin Marker
const createCustomIcon = (isSelected, isFeatured) => {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        width: ${isSelected ? '38px' : '32px'};
        height: ${isSelected ? '38px' : '32px'};
        background: ${isSelected ? '#D97706' : (isFeatured ? '#0F172A' : '#1E293B')};
        color: white;
        border-radius: 9999px;
        box-shadow: 0 4px 14px rgba(0,0,0,0.35);
        border: 2px solid white;
        transition: transform 0.2s ease;
        transform: scale(${isSelected ? 1.15 : 1});
      ">
        <span style="font-size: 14px;">👶</span>
      </div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -18]
  });
};

// Component to dynamically re-center map when active daycare changes
function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, zoom, { animate: true });
    }
  }, [center, zoom, map]);
  return null;
}

export default function DaycareMap({ daycares, selectedDaycare, onSelectDaycare }) {
  // Default centered in Ernakulam (Kochi)
  const defaultCenter = [9.9816, 76.3200];
  const activeCenter = selectedDaycare ? selectedDaycare.coordinates : defaultCenter;
  const zoomLevel = selectedDaycare ? 14 : 12;

  return (
    <div className="relative w-full h-[360px] md:h-[540px] rounded-2xl overflow-hidden shadow-sm border border-slate-200/80 bg-slate-100">
      <MapContainer
        center={activeCenter}
        zoom={zoomLevel}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <ChangeView center={activeCenter} zoom={zoomLevel} />
        
        {/* OpenStreetMap Tile Layer - works online, caches locally for offline */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {daycares.map((center) => (
          <Marker
            key={center.id}
            position={center.coordinates}
            icon={createCustomIcon(selectedDaycare?.id === center.id, center.isFeatured)}
            eventHandlers={{
              click: () => onSelectDaycare(center)
            }}
          >
            <Popup className="custom-map-popup">
              <div className="p-3 w-64 bg-white text-left">
                <div className="relative h-28 -mx-3 -mt-3 mb-2 overflow-hidden bg-slate-100">
                  <img
                    src={center.images[0]}
                    alt={center.name}
                    className="w-full h-full object-cover"
                  />
                  {center.isVerified && (
                    <span className="absolute top-2 left-2 bg-emerald-600/95 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
                      <ShieldCheck className="w-3 h-3" /> Verified
                    </span>
                  )}
                  <span className="absolute bottom-2 right-2 bg-slate-900/80 text-amber-400 text-xs font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-amber-400" /> {center.rating}
                  </span>
                </div>

                <p className="text-xs font-medium text-amber-700 tracking-wide">{center.area}</p>
                <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{center.name}</h4>
                
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{center.timings}</span>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2">
                  <span className="text-xs font-semibold text-slate-900">{center.monthlyFee.split('/')[0]}</span>
                  <button
                    onClick={() => onSelectDaycare(center)}
                    className="text-xs font-medium text-amber-700 hover:text-amber-800 flex items-center gap-1 group"
                  >
                    View Details <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Floating map hint */}
      <div className="absolute bottom-3 left-3 z-[400] bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md border border-slate-200 text-xs font-medium text-slate-700 flex items-center gap-1.5 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>Showing {daycares.length} Ernakulam Daycares</span>
      </div>
    </div>
  );
}
