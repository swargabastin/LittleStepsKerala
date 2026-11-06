import { INITIAL_DAYCARES } from '../data/daycares';

const STORAGE_KEYS = {
  DAYCARES: 'littlesteps_daycares_v1',
  BOOKMARKS: 'littlesteps_bookmarks_v1',
  ENQUIRIES: 'littlesteps_enquiries_v1'
};

// Initialize Daycare List
export const getDaycares = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.DAYCARES);
    if (!stored) {
      localStorage.setItem(STORAGE_KEYS.DAYCARES, JSON.stringify(INITIAL_DAYCARES));
      return INITIAL_DAYCARES;
    }
    return JSON.parse(stored);
  } catch (e) {
    console.error('Failed to read daycares from storage:', e);
    return INITIAL_DAYCARES;
  }
};

// Add New Daycare (Owner Listing)
export const saveDaycare = (newDaycare) => {
  const current = getDaycares();
  const created = {
    ...newDaycare,
    id: Date.now(),
    rating: 5.0,
    reviewsCount: 1,
    isVerified: false,
    images: newDaycare.images?.length > 0 ? newDaycare.images : [
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80"
    ]
  };
  const updated = [created, ...current];
  localStorage.setItem(STORAGE_KEYS.DAYCARES, JSON.stringify(updated));
  return created;
};

// Bookmarks
export const getBookmarks = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const toggleBookmark = (id) => {
  const current = getBookmarks();
  let updated;
  if (current.includes(id)) {
    updated = current.filter(item => item !== id);
  } else {
    updated = [...current, id];
  }
  localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(updated));
  return updated;
};

// Enquiries / Visit Bookings (Works completely offline!)
export const saveEnquiry = async (enquiryData) => {
  const enquiry = {
    ...enquiryData,
    id: Date.now(),
    createdAt: new Date().toISOString(),
    status: 'Pending'
  };

  // 1. Always save locally first (ensures offline reliability)
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEYS.ENQUIRIES) || '[]');
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify([enquiry, ...existing]));
  } catch (err) {
    console.warn('LocalStorage save error:', err);
  }

  // 2. Try pushing to ASP.NET Core API if reachable
  try {
    if (navigator.onLine) {
      await fetch('http://localhost:5000/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          centerId: enquiryData.centerId,
          parentName: enquiryData.parentName,
          phone: enquiryData.phone,
          email: enquiryData.email || '',
          childAge: enquiryData.childAge,
          message: enquiryData.message,
          status: 'New'
        })
      });
    }
  } catch (apiErr) {
    console.log('Backend API currently unreachable, saved to offline storage cleanly.');
  }

  return enquiry;
};

export const getEnquiries = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.ENQUIRIES) || '[]');
  } catch {
    return [];
  }
};
