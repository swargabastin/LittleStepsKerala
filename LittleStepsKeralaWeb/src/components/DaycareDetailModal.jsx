import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Star, 
  MapPin, 
  Clock, 
  Phone, 
  MessageCircle, 
  Mail, 
  Globe, 
  CheckCircle2, 
  Users, 
  Calendar, 
  Check, 
  Heart,
  Baby
} from 'lucide-react';
import { saveEnquiry } from '../services/storage';

export default function DaycareDetailModal({ 
  center, 
  onClose, 
  isBookmarked, 
  onToggleBookmark 
}) {
  const [activePhoto, setActivePhoto] = useState(0);
  const [enquirySent, setEnquirySent] = useState(false);
  const [formData, setFormData] = useState({
    parentName: '',
    phone: '',
    email: '',
    childAge: '1 - 2 Years',
    message: 'Hello, I would like to schedule a guided tour for my child next week.'
  });

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    if (!formData.parentName || !formData.phone) return;

    await saveEnquiry({
      centerId: center.id,
      centerName: center.name,
      ...formData
    });

    setEnquirySent(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-in fade-in">
      <div className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200">
        
        {/* Sticky Close Header */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              {center.area}
            </span>
            {center.isVerified && (
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1 border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(center.id)}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition"
              title="Save"
            >
              <Heart className={`w-5 h-5 ${isBookmarked ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Header Title */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              {center.name}
            </h2>
            <p className="text-slate-600 mt-2 text-sm sm:text-base leading-relaxed">
              {center.tagline}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500">
              <div className="flex items-center gap-1 text-amber-600 font-bold">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>{center.rating}</span>
                <span className="text-slate-400">({center.reviewsCount} Google & Parent reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{center.address}</span>
              </div>
            </div>
          </div>

          {/* Photo Showcase */}
          <div className="space-y-3">
            <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={center.images[activePhoto] || center.images[0]}
                alt={center.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
            </div>

            {/* Thumbnail row */}
            {center.images.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {center.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePhoto(idx)}
                    className={`relative w-20 h-16 sm:w-24 sm:h-20 rounded-xl overflow-hidden shrink-0 border-2 transition ${
                      activePhoto === idx ? 'border-amber-600 ring-2 ring-amber-500/30' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Key Quick Facts Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Accepted Ages</div>
              <div className="text-sm font-bold text-slate-900 mt-0.5">{center.ageRange}</div>
            </div>
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Timings</div>
              <div className="text-sm font-bold text-slate-900 mt-0.5">{center.timings}</div>
            </div>
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Care Ratio</div>
              <div className="text-sm font-bold text-slate-900 mt-0.5">{center.staffRatio.split('|')[0]}</div>
            </div>
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Approx. Fee</div>
              <div className="text-sm font-bold text-slate-900 mt-0.5">{center.monthlyFee}</div>
            </div>
          </div>

          {/* Detailed Description */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">About the Center</h4>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed bg-amber-50/30 p-4 rounded-2xl border border-amber-100">
              {center.description}
            </p>
          </div>

          {/* Amenities & Facility Checklist */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">Amenities & Infrastructure</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {center.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-800 bg-white p-3 rounded-xl border border-slate-200/90 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-medium">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Safety Protocols */}
          {center.safety && (
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">Safety & Hygiene Standards</h4>
              <div className="space-y-2">
                {center.safety.map((rule, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                    <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Direct Contact Bar */}
          <div className="bg-slate-900 text-white p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
            <div>
              <h4 className="font-bold text-base sm:text-lg">Need Immediate Information?</h4>
              <p className="text-xs text-slate-300 mt-0.5">Direct line to center supervisor for fees, seat availability & admissions.</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
              <a
                href={`https://wa.me/${center.whatsapp}?text=${encodeURIComponent(`Hello, I found ${center.name} on LittleSteps Kerala and want to check admission for my child.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs sm:text-sm font-bold transition shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`tel:${center.phone.replace(/[^0-9+]/g, '')}`}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs sm:text-sm font-bold transition border border-white/20"
              >
                <Phone className="w-4 h-4" />
                <span>Call Center</span>
              </a>
            </div>
          </div>

          {/* Tour Booking & Enquiry Form */}
          <div className="bg-gradient-to-br from-amber-50/60 to-orange-50/60 p-6 sm:p-8 rounded-3xl border border-amber-200">
            <div className="max-w-xl mx-auto">
              <div className="text-center mb-6">
                <span className="inline-flex p-2 rounded-2xl bg-amber-600 text-white mb-2 shadow-sm">
                  <Calendar className="w-5 h-5" />
                </span>
                <h3 className="text-xl font-bold text-slate-900">Schedule a Campus Visit</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Experience the classrooms, meet the caregivers, and inspect security firsthand.
                </p>
              </div>

              {enquirySent ? (
                <div className="bg-emerald-500 text-white p-6 rounded-2xl text-center space-y-2 shadow-lg animate-in zoom-in-95">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <h4 className="text-lg font-bold">Visit Request Received!</h4>
                  <p className="text-xs text-emerald-50 leading-relaxed max-w-sm mx-auto">
                    The admissions team at <strong>{center.name}</strong> has received your contact. They will reach out to you within 24 working hours.
                  </p>
                  <button
                    onClick={() => setEnquirySent(false)}
                    className="mt-3 px-4 py-1.5 bg-white text-emerald-800 rounded-xl text-xs font-bold hover:bg-emerald-50 transition"
                  >
                    Send Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-4 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Parent's Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.parentName}
                        onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                        placeholder="e.g. Anjali Nair"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number (WhatsApp) *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 98470 12345"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. anjali@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Child's Current Age</label>
                      <select
                        value={formData.childAge}
                        onChange={(e) => setFormData({ ...formData, childAge: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                      >
                        <option>3 - 6 Months (Infant)</option>
                        <option>6 - 12 Months (Infant)</option>
                        <option>1 - 2 Years (Toddler)</option>
                        <option>2 - 4 Years (Preschool)</option>
                        <option>4 - 8 Years (After-school Care)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Notes / Preferred Day of Visit</label>
                    <textarea
                      rows="2"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-sm rounded-xl shadow-md transition transform active:scale-[0.99]"
                  >
                    Confirm & Schedule Campus Tour
                  </button>
                  <p className="text-[11px] text-slate-500 text-center">
                    ⚡ Works offline. Your request is preserved on device and synchronizes instantly.
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
