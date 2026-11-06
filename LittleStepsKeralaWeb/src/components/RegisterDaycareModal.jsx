import React, { useState } from 'react';
import { X, Building2, Check, Sparkles } from 'lucide-react';
import { EKM_AREAS } from '../data/daycares';
import { saveDaycare } from '../services/storage';

export default function RegisterDaycareModal({ onClose, onCreated }) {
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    area: 'Kakkanad (Infopark)',
    city: 'Ernakulam',
    address: '',
    phone: '',
    whatsapp: '',
    email: '',
    timings: '07:30 AM – 07:00 PM',
    monthlyFee: '₹6,500 – ₹9,000 / mo',
    ageRange: '6 months – 5 years',
    staffRatio: '1:4',
    description: '',
    amenitiesList: 'Live CCTV Mobile Streaming, 100% Air Conditioned, In-House Warm Meals, Doctor on Call'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) return;

    const amenitiesArray = formData.amenitiesList
      .split(',')
      .map(item => item.trim())
      .filter(Boolean);

    // Approximate coordinates for areas
    const areaCoords = {
      "Kakkanad (Infopark)": [10.0159, 76.3630],
      "Panampilly Nagar": [9.9602, 76.2980],
      "Edappally": [10.0261, 76.3082],
      "Palarivattom": [10.0063, 76.3065],
      "Kadavanthra": [9.9674, 76.3045],
      "Vyttila": [9.9686, 76.3195],
      "Kaloor": [9.9937, 76.2938],
      "Tripunithura": [9.9497, 76.3458],
      "Aluva": [10.1076, 76.3516]
    };

    const newCenter = {
      ...formData,
      amenities: amenitiesArray,
      coordinates: areaCoords[formData.area] || [9.9816, 76.3200],
      safety: [
        "100% Background Checked Staff",
        "First-Aid Kit & Fire Extinguisher Equipped",
        "Gated Secure Compound"
      ]
    };

    const created = saveDaycare(newCenter);
    onCreated(created);
    setSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-in fade-in">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-100 text-amber-800 rounded-xl">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">List Your Daycare in Ernakulam</h3>
              <p className="text-[11px] text-slate-500">Reach thousands of working parents across EKM</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {success ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Daycare Listed Successfully!</h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Your daycare center has been added to the directory and is now visible on both your mobile device and desktop dashboard.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition"
              >
                Back to Directory
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Daycare Center Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Tiny Wonders Early Care & Montessori"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Short Tagline</label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="e.g. Loving infant care and joyful preschool activities near Infopark"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Ernakulam Locality *</label>
                  <select
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  >
                    {EKM_AREAS.filter(a => a !== "All Areas").map((area, idx) => (
                      <option key={idx} value={area}>{area}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value, whatsapp: e.target.value.replace(/[^0-9]/g, '') })}
                    placeholder="e.g. +91 98470 12345"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Street Address *</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="e.g. Pipeline Road, Near Federal Bank, Kakkanad, Kochi 682030"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Operating Hours</label>
                  <input
                    type="text"
                    value={formData.timings}
                    onChange={(e) => setFormData({ ...formData, timings: e.target.value })}
                    placeholder="07:30 AM – 07:00 PM"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Monthly Fee Range</label>
                  <input
                    type="text"
                    value={formData.monthlyFee}
                    onChange={(e) => setFormData({ ...formData, monthlyFee: e.target.value })}
                    placeholder="₹6,000 – ₹9,000 / mo"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Accepted Ages</label>
                  <input
                    type="text"
                    value={formData.ageRange}
                    onChange={(e) => setFormData({ ...formData, ageRange: e.target.value })}
                    placeholder="6 months – 5 years"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Key Amenities (separated by commas)
                </label>
                <input
                  type="text"
                  value={formData.amenitiesList}
                  onChange={(e) => setFormData({ ...formData, amenitiesList: e.target.value })}
                  placeholder="Live CCTV, AC, Healthy Meals, Doctor on Call, Transport"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description & Philosophy</label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Tell parents what makes your center special, child-to-carer ratio, organic meal policy, etc."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-sm rounded-xl shadow-md transition transform active:scale-[0.99]"
                >
                  Publish Daycare to Ernakulam Directory
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
