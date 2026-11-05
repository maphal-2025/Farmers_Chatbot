import React, { useState } from 'react';
import { MapPin, Phone, Clock, Star, Navigation, Search, ExternalLink } from 'lucide-react';

interface Supplier {
  id: string;
  name: string;
  type: 'nursery' | 'agricultural_store' | 'cooperative' | 'online';
  address: string;
  city: string;
  province: string;
  phone: string;
  website?: string;
  distance: number;
  rating: number;
  reviewCount: number;
  specialties: string[];
  openHours: string;
  services: string[];
  priceRange: 'budget' | 'moderate' | 'premium';
}

const suppliers: Supplier[] = [
  {
    id: '1', name: 'Johannesburg Agricultural Supplies', type: 'agricultural_store',
    address: '123 Market Street, City Centre', city: 'Johannesburg', province: 'Gauteng',
    phone: '+27 11 123 4567', distance: 2.5, rating: 4.5, reviewCount: 128,
    specialties: ['Maize Seeds', 'Vegetable Seeds', 'Fertilizers', 'Farm Tools'],
    openHours: 'Mon–Fri 7:00–17:00 · Sat 8:00–13:00',
    services: ['Delivery', 'Bulk Orders', 'Soil Testing'], priceRange: 'moderate',
  },
  {
    id: '2', name: 'Green Thumb Nursery', type: 'nursery',
    address: '45 Garden Road, Sandton', city: 'Sandton', province: 'Gauteng',
    phone: '+27 11 234 5678', website: 'www.greenthumb.co.za', distance: 5.2, rating: 4.8, reviewCount: 214,
    specialties: ['Fruit Trees', 'Vegetable Seedlings', 'Herbs', 'Ornamentals'],
    openHours: 'Mon–Sun 8:00–17:00',
    services: ['Plant Care Advice', 'Delivery', 'Landscaping'], priceRange: 'premium',
  },
  {
    id: '3', name: 'Farmers Cooperative Centurion', type: 'cooperative',
    address: '78 Agricultural Avenue, Centurion', city: 'Centurion', province: 'Gauteng',
    phone: '+27 12 345 6789', distance: 8.1, rating: 4.3, reviewCount: 97,
    specialties: ['Bulk Seeds', 'Animal Feed', 'Fertilizers', 'Pesticides'],
    openHours: 'Mon–Fri 6:30–17:30 · Sat 7:00–14:00',
    services: ['Member Discounts', 'Credit', 'Training'], priceRange: 'budget',
  },
  {
    id: '4', name: 'Cape Town Seeds & Plants', type: 'agricultural_store',
    address: '156 Main Road, Observatory', city: 'Cape Town', province: 'Western Cape',
    phone: '+27 21 456 7890', website: 'www.capetownseeds.co.za', distance: 12.3, rating: 4.6, reviewCount: 163,
    specialties: ['Indigenous Plants', 'Vegetable Seeds', 'Succulents', 'Fruit Trees'],
    openHours: 'Mon–Fri 8:00–17:00 · Sat 8:00–15:00',
    services: ['Expert Advice', 'Delivery', 'Workshops'], priceRange: 'moderate',
  },
  {
    id: '5', name: 'Durban Agricultural Hub', type: 'agricultural_store',
    address: '89 Industrial Road, Pinetown', city: 'Durban', province: 'KwaZulu-Natal',
    phone: '+27 31 567 8901', distance: 15.7, rating: 4.4, reviewCount: 89,
    specialties: ['Tropical Seeds', 'Sugarcane', 'Citrus Trees', 'Irrigation'],
    openHours: 'Mon–Fri 7:00–17:00 · Sat 8:00–12:00',
    services: ['Irrigation Design', 'Bulk Discounts', 'Delivery'], priceRange: 'moderate',
  },
  {
    id: '6', name: 'AgriMart Online', type: 'online',
    address: 'Nationwide Delivery', city: 'Nationwide', province: 'All Provinces',
    phone: '+27 86 123 4567', website: 'www.agrimart.co.za', distance: 0, rating: 4.2, reviewCount: 342,
    specialties: ['All Seeds', 'Bulk Orders', 'Organic Seeds', 'Rare Varieties'],
    openHours: '24/7 Online',
    services: ['Nationwide Delivery', 'Returns Policy', 'Expert Hotline'], priceRange: 'moderate',
  },
  {
    id: '7', name: 'Bloemfontein Farm Supplies', type: 'agricultural_store',
    address: '67 Agricultural Street', city: 'Bloemfontein', province: 'Free State',
    phone: '+27 51 789 0123', distance: 22.5, rating: 4.1, reviewCount: 74,
    specialties: ['Grain Seeds', 'Pasture Seeds', 'Livestock Feed', 'Equipment'],
    openHours: 'Mon–Fri 7:00–17:00 · Sat 8:00–13:00',
    services: ['Soil Analysis', 'Credit Terms', 'Delivery'], priceRange: 'budget',
  },
];

const typeLabels: Record<string, string> = {
  nursery: 'Nursery',
  agricultural_store: 'Agricultural Store',
  cooperative: 'Cooperative',
  online: 'Online',
};

const priceLabel: Record<string, string> = {
  budget: 'Budget',
  moderate: 'Moderate',
  premium: 'Premium',
};

const priceColor: Record<string, string> = {
  budget: 'text-green-700 bg-green-100',
  moderate: 'text-blue-700 bg-blue-100',
  premium: 'text-amber-700 bg-amber-100',
};

function renderStars(rating: number) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={12}
          className={s <= Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-200'}
        />
      ))}
    </div>
  );
}

export const SeedSuppliers: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState<'distance' | 'rating'>('distance');

  const filtered = suppliers
    .filter((s) => {
      if (selectedType !== 'all' && s.type !== selectedType) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          s.name.toLowerCase().includes(q) ||
          s.city.toLowerCase().includes(q) ||
          s.province.toLowerCase().includes(q) ||
          s.specialties.some((sp) => sp.toLowerCase().includes(q))
        );
      }
      return true;
    })
    .sort((a, b) => sortBy === 'rating' ? b.rating - a.rating : a.distance - b.distance);

  const openMap = (s: Supplier) => {
    if (s.type === 'online') {
      if (s.website) window.open(`https://${s.website}`, '_blank');
      return;
    }
    const q = encodeURIComponent(`${s.address}, ${s.city}, ${s.province}, South Africa`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${q}`, '_blank');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-5">
      {/* Page header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Seed & Plant Suppliers</h2>
            <p className="text-sm text-gray-500 mt-0.5">Find trusted agricultural suppliers across South Africa</p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-gray-600 font-medium">{filtered.length} suppliers found</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, city, or specialty..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
          >
            <option value="all">All types</option>
            <option value="nursery">Nurseries</option>
            <option value="agricultural_store">Agri Stores</option>
            <option value="cooperative">Cooperatives</option>
            <option value="online">Online</option>
          </select>
          <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setSortBy('distance')}
              className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${sortBy === 'distance' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500'}`}
            >
              Nearest
            </button>
            <button
              onClick={() => setSortBy('rating')}
              className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${sortBy === 'rating' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500'}`}
            >
              Top Rated
            </button>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((s) => (
          <div key={s.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
            {/* Top row */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0 pr-3">
                <h3 className="font-bold text-gray-900 text-base truncate">{s.name}</h3>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{typeLabels[s.type]}</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${priceColor[s.priceRange]}`}>{priceLabel[s.priceRange]}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <div className="flex items-center gap-1">
                  {renderStars(s.rating)}
                  <span className="text-xs font-bold text-gray-700">{s.rating}</span>
                </div>
                <span className="text-xs text-gray-400">{s.reviewCount} reviews</span>
              </div>
            </div>

            {/* Info rows */}
            <div className="space-y-1.5 mb-3 text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <MapPin size={13} className="text-gray-400 mt-0.5 flex-shrink-0" />
                <span>{s.city !== 'Nationwide' ? `${s.address}, ${s.city}, ${s.province}` : 'Nationwide Delivery'}</span>
              </div>
              {s.distance > 0 && (
                <div className="flex items-center gap-2">
                  <Navigation size={13} className="text-green-500 flex-shrink-0" />
                  <span className="text-green-700 font-medium">{s.distance} km away</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Clock size={13} className="text-gray-400 flex-shrink-0" />
                <span>{s.openHours}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={13} className="text-gray-400 flex-shrink-0" />
                <a href={`tel:${s.phone}`} className="hover:text-green-600 transition-colors">{s.phone}</a>
              </div>
            </div>

            {/* Specialties */}
            <div className="flex flex-wrap gap-1 mb-3">
              {s.specialties.slice(0, 3).map((sp, i) => (
                <span key={i} className="px-2 py-0.5 bg-green-50 text-green-700 border border-green-200 rounded-full text-xs">{sp}</span>
              ))}
              {s.specialties.length > 3 && (
                <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full text-xs">+{s.specialties.length - 3}</span>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-3 border-t border-gray-100">
              <button
                onClick={() => openMap(s)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-green-600 text-white text-sm font-semibold rounded-xl hover:bg-green-700 transition-colors"
              >
                {s.type === 'online' ? <ExternalLink size={14} /> : <Navigation size={14} />}
                {s.type === 'online' ? 'Visit Website' : 'Directions'}
              </button>
              <a
                href={`tel:${s.phone}`}
                className="flex items-center justify-center gap-1.5 px-4 py-2 border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors"
              >
                <Phone size={14} />
                Call
              </a>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center">
          <Search size={32} className="text-gray-300 mx-auto mb-3" />
          <p className="font-semibold text-gray-600">No suppliers match your search</p>
          <p className="text-sm text-gray-400 mt-1">Try a different city, province, or specialty</p>
        </div>
      )}

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
        <h4 className="font-bold text-blue-800 mb-3">Tips for buying seeds & plants</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-blue-700">
          {[
            'Check seed expiry dates and germination rates',
            'Buy from certified suppliers for quality assurance',
            'Ask about disease-resistant varieties',
            'Compare bulk prices across suppliers',
            'Inquire about technical support offered',
            'Join cooperatives for better pricing and training',
          ].map((tip, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-blue-400 font-bold mt-0.5">•</span>
              {tip}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
