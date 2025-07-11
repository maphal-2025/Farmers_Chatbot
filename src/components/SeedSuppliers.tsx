import React, { useState } from 'react';
import { MapPin, Phone, Clock, Star, Navigation, Search, Filter } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Supplier {
  id: string;
  name: string;
  type: 'nursery' | 'agricultural_store' | 'cooperative' | 'online';
  address: string;
  city: string;
  province: string;
  phone: string;
  email?: string;
  website?: string;
  distance: number; // in km
  rating: number;
  specialties: string[];
  openHours: string;
  services: string[];
  priceRange: 'budget' | 'moderate' | 'premium';
  coordinates: {
    lat: number;
    lng: number;
  };
}

export const SeedSuppliers: React.FC = () => {
  const { t } = useLanguage();
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'distance' | 'rating' | 'price'>('distance');

  // Mock data for South African seed and plant suppliers
  const suppliers: Supplier[] = [
    {
      id: '1',
      name: 'Johannesburg Agricultural Supplies',
      type: 'agricultural_store',
      address: '123 Market Street, City Centre',
      city: 'Johannesburg',
      province: 'Gauteng',
      phone: '+27 11 123 4567',
      email: 'info@joburgsupplies.co.za',
      website: 'www.joburgsupplies.co.za',
      distance: 2.5,
      rating: 4.5,
      specialties: ['Vegetable Seeds', 'Maize Seeds', 'Fertilizers', 'Farm Tools'],
      openHours: 'Mon-Fri: 7:00-17:00, Sat: 8:00-13:00',
      services: ['Delivery', 'Bulk Orders', 'Technical Advice', 'Soil Testing'],
      priceRange: 'moderate',
      coordinates: { lat: -26.2041, lng: 28.0473 }
    },
    {
      id: '2',
      name: 'Green Thumb Nursery',
      type: 'nursery',
      address: '45 Garden Road, Sandton',
      city: 'Sandton',
      province: 'Gauteng',
      phone: '+27 11 234 5678',
      email: 'sales@greenthumb.co.za',
      distance: 5.2,
      rating: 4.8,
      specialties: ['Fruit Trees', 'Vegetable Seedlings', 'Herbs', 'Ornamental Plants'],
      openHours: 'Mon-Sun: 8:00-17:00',
      services: ['Plant Care Advice', 'Landscaping', 'Delivery', 'Plant Health Diagnosis'],
      priceRange: 'premium',
      coordinates: { lat: -26.1076, lng: 28.0567 }
    },
    {
      id: '3',
      name: 'Farmers Cooperative Centurion',
      type: 'cooperative',
      address: '78 Agricultural Avenue, Centurion',
      city: 'Centurion',
      province: 'Gauteng',
      phone: '+27 12 345 6789',
      email: 'centurion@farmcoop.co.za',
      distance: 8.1,
      rating: 4.3,
      specialties: ['Bulk Seeds', 'Animal Feed', 'Fertilizers', 'Pesticides'],
      openHours: 'Mon-Fri: 6:30-17:30, Sat: 7:00-14:00',
      services: ['Member Discounts', 'Credit Facilities', 'Technical Support', 'Training'],
      priceRange: 'budget',
      coordinates: { lat: -25.8601, lng: 28.1881 }
    },
    {
      id: '4',
      name: 'Cape Town Seeds & Plants',
      type: 'agricultural_store',
      address: '156 Main Road, Observatory',
      city: 'Cape Town',
      province: 'Western Cape',
      phone: '+27 21 456 7890',
      email: 'info@ctseeds.co.za',
      website: 'www.capetownseeds.co.za',
      distance: 12.3,
      rating: 4.6,
      specialties: ['Indigenous Plants', 'Vegetable Seeds', 'Fruit Trees', 'Succulents'],
      openHours: 'Mon-Fri: 8:00-17:00, Sat: 8:00-15:00',
      services: ['Expert Advice', 'Delivery', 'Plant Guarantee', 'Workshops'],
      priceRange: 'moderate',
      coordinates: { lat: -33.9249, lng: 18.4241 }
    },
    {
      id: '5',
      name: 'Durban Agricultural Hub',
      type: 'agricultural_store',
      address: '89 Industrial Road, Pinetown',
      city: 'Durban',
      province: 'KwaZulu-Natal',
      phone: '+27 31 567 8901',
      email: 'sales@durbanhub.co.za',
      distance: 15.7,
      rating: 4.4,
      specialties: ['Tropical Seeds', 'Sugarcane', 'Citrus Trees', 'Irrigation Supplies'],
      openHours: 'Mon-Fri: 7:00-17:00, Sat: 8:00-12:00',
      services: ['Irrigation Design', 'Bulk Discounts', 'Delivery', 'After-sales Support'],
      priceRange: 'moderate',
      coordinates: { lat: -29.8587, lng: 31.0218 }
    },
    {
      id: '6',
      name: 'Pretoria Plant Paradise',
      type: 'nursery',
      address: '234 Botanical Drive, Brooklyn',
      city: 'Pretoria',
      province: 'Gauteng',
      phone: '+27 12 678 9012',
      email: 'info@plantparadise.co.za',
      website: 'www.plantparadise.co.za',
      distance: 18.2,
      rating: 4.7,
      specialties: ['Rare Plants', 'Bonsai', 'Medicinal Plants', 'Seedlings'],
      openHours: 'Mon-Sun: 8:00-18:00',
      services: ['Plant Consultation', 'Custom Orders', 'Plant Care Classes', 'Delivery'],
      priceRange: 'premium',
      coordinates: { lat: -25.7479, lng: 28.2293 }
    },
    {
      id: '7',
      name: 'AgriMart Online',
      type: 'online',
      address: 'Online Store - Nationwide Delivery',
      city: 'Nationwide',
      province: 'All Provinces',
      phone: '+27 86 123 4567',
      email: 'orders@agrimart.co.za',
      website: 'www.agrimart.co.za',
      distance: 0,
      rating: 4.2,
      specialties: ['All Seeds', 'Bulk Orders', 'Rare Varieties', 'Organic Seeds'],
      openHours: '24/7 Online Ordering',
      services: ['Nationwide Delivery', 'Bulk Discounts', 'Expert Hotline', 'Return Policy'],
      priceRange: 'moderate',
      coordinates: { lat: 0, lng: 0 }
    },
    {
      id: '8',
      name: 'Bloemfontein Farm Supplies',
      type: 'agricultural_store',
      address: '67 Agricultural Street, Bloemfontein',
      city: 'Bloemfontein',
      province: 'Free State',
      phone: '+27 51 789 0123',
      email: 'info@bloemfarms.co.za',
      distance: 22.5,
      rating: 4.1,
      specialties: ['Grain Seeds', 'Pasture Seeds', 'Livestock Feed', 'Farm Equipment'],
      openHours: 'Mon-Fri: 7:00-17:00, Sat: 8:00-13:00',
      services: ['Technical Advice', 'Soil Analysis', 'Credit Terms', 'Delivery'],
      priceRange: 'budget',
      coordinates: { lat: -29.0852, lng: 26.1596 }
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'nursery':
        return '🌱';
      case 'agricultural_store':
        return '🏪';
      case 'cooperative':
        return '🤝';
      case 'online':
        return '💻';
      default:
        return '📍';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'nursery':
        return 'Plant Nursery';
      case 'agricultural_store':
        return 'Agricultural Store';
      case 'cooperative':
        return 'Farmers Cooperative';
      case 'online':
        return 'Online Store';
      default:
        return type;
    }
  };

  const getPriceRangeColor = (priceRange: string) => {
    switch (priceRange) {
      case 'budget':
        return 'text-green-600 bg-green-100';
      case 'moderate':
        return 'text-blue-600 bg-blue-100';
      case 'premium':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredSuppliers = suppliers
    .filter(supplier => {
      if (selectedType !== 'all' && supplier.type !== selectedType) return false;
      if (selectedSpecialty !== 'all' && !supplier.specialties.some(s => 
        s.toLowerCase().includes(selectedSpecialty.toLowerCase())
      )) return false;
      if (searchLocation && !supplier.city.toLowerCase().includes(searchLocation.toLowerCase()) &&
          !supplier.province.toLowerCase().includes(searchLocation.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'distance':
          return a.distance - b.distance;
        case 'rating':
          return b.rating - a.rating;
        case 'price':
          const priceOrder = { budget: 1, moderate: 2, premium: 3 };
          return priceOrder[a.priceRange] - priceOrder[b.priceRange];
        default:
          return 0;
      }
    });

  const openDirections = (supplier: Supplier) => {
    if (supplier.type === 'online') {
      window.open(supplier.website || `mailto:${supplier.email}`, '_blank');
    } else {
      const address = encodeURIComponent(`${supplier.address}, ${supplier.city}, ${supplier.province}`);
      window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
    }
  };

  const callSupplier = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-green-100 p-4 rounded-full">
              <MapPin size={32} className="text-green-600" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Seed & Plant Suppliers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find the nearest suppliers for seeds, seedlings, and plants in South Africa. 
            Get quality agricultural inputs from trusted local suppliers.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by city or province..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Types</option>
              <option value="nursery">Plant Nurseries</option>
              <option value="agricultural_store">Agricultural Stores</option>
              <option value="cooperative">Cooperatives</option>
              <option value="online">Online Stores</option>
            </select>

            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Specialties</option>
              <option value="vegetable">Vegetable Seeds</option>
              <option value="fruit">Fruit Trees</option>
              <option value="maize">Maize Seeds</option>
              <option value="grain">Grain Seeds</option>
              <option value="herbs">Herbs</option>
              <option value="indigenous">Indigenous Plants</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'distance' | 'rating' | 'price')}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="distance">Sort by Distance</option>
              <option value="rating">Sort by Rating</option>
              <option value="price">Sort by Price</option>
            </select>
          </div>
        </div>

        {/* Suppliers List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-800">
              Found {filteredSuppliers.length} suppliers
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Filter size={16} />
              <span>Filtered results</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSuppliers.map((supplier) => (
              <div key={supplier.id} className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{getTypeIcon(supplier.type)}</div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-lg">{supplier.name}</h4>
                      <p className="text-sm text-gray-600">{getTypeLabel(supplier.type)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Star size={16} className="text-yellow-500 fill-current" />
                      <span className="text-sm font-medium text-gray-700">{supplier.rating}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriceRangeColor(supplier.priceRange)}`}>
                      {supplier.priceRange}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-start space-x-2">
                    <MapPin size={16} className="text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-700">{supplier.address}</p>
                      <p className="text-sm text-gray-600">{supplier.city}, {supplier.province}</p>
                      {supplier.distance > 0 && (
                        <p className="text-xs text-green-600 font-medium">{supplier.distance} km away</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Clock size={16} className="text-gray-500" />
                    <span className="text-sm text-gray-700">{supplier.openHours}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Phone size={16} className="text-gray-500" />
                    <span className="text-sm text-gray-700">{supplier.phone}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Specialties:</p>
                  <div className="flex flex-wrap gap-1">
                    {supplier.specialties.slice(0, 4).map((specialty, index) => (
                      <span key={index} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                        {specialty}
                      </span>
                    ))}
                    {supplier.specialties.length > 4 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        +{supplier.specialties.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Services:</p>
                  <div className="flex flex-wrap gap-1">
                    {supplier.services.slice(0, 3).map((service, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                        {service}
                      </span>
                    ))}
                    {supplier.services.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        +{supplier.services.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => openDirections(supplier)}
                    className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Navigation size={16} />
                    <span>{supplier.type === 'online' ? 'Visit Website' : 'Get Directions'}</span>
                  </button>
                  <button
                    onClick={() => callSupplier(supplier.phone)}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
                  >
                    <Phone size={16} />
                    <span>Call</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">💡 Tips for Buying Seeds & Plants</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
            <ul className="space-y-2">
              <li>• Check seed expiry dates and germination rates</li>
              <li>• Buy from certified suppliers for quality assurance</li>
              <li>• Consider local climate and soil conditions</li>
              <li>• Ask about disease-resistant varieties</li>
            </ul>
            <ul className="space-y-2">
              <li>• Compare prices for bulk purchases</li>
              <li>• Inquire about technical support and advice</li>
              <li>• Check return policies for defective products</li>
              <li>• Join cooperatives for better pricing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};