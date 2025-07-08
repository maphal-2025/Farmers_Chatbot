import React from 'react';
import { FileText, Calendar, MapPin, Phone, ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const GovernmentSchemes: React.FC = () => {
  const { t } = useLanguage();

  const schemes = [
    {
      title: 'Smallholder Agricultural Support Programme',
      description: 'Financial assistance for small-scale farmers to improve productivity and sustainability.',
      amount: 'Up to R50,000',
      deadline: '2024-03-31',
      eligibility: 'Small-scale farmers with less than 5 hectares',
      contact: '012 319 7000',
      category: 'Financial Support',
      status: 'Active',
    },
    {
      title: 'Agricultural Development Fund',
      description: 'Loans and grants for agricultural equipment, infrastructure, and technology adoption.',
      amount: 'R10,000 - R500,000',
      deadline: '2024-06-30',
      eligibility: 'Registered farmers with business plan',
      contact: '012 319 7100',
      category: 'Equipment & Infrastructure',
      status: 'Active',
    },
    {
      title: 'Youth in Agriculture Programme',
      description: 'Special support for young farmers aged 18-35 to start or expand agricultural businesses.',
      amount: 'Up to R100,000',
      deadline: '2024-05-15',
      eligibility: 'South African citizens aged 18-35',
      contact: '012 319 7200',
      category: 'Youth Development',
      status: 'Active',
    },
    {
      title: 'Climate Smart Agriculture Initiative',
      description: 'Support for farmers adopting climate-resilient and sustainable farming practices.',
      amount: 'Up to R75,000',
      deadline: '2024-08-31',
      eligibility: 'Farmers implementing climate-smart technologies',
      contact: '012 319 7300',
      category: 'Sustainability',
      status: 'Active',
    },
  ];

  const training = [
    {
      title: 'Crop Management Training',
      date: '2024-02-15',
      location: 'Johannesburg Agricultural Center',
      duration: '3 days',
      cost: 'Free',
    },
    {
      title: 'Livestock Health Workshop',
      date: '2024-02-22',
      location: 'Pretoria Extension Office',
      duration: '2 days',
      cost: 'Free',
    },
    {
      title: 'Financial Management for Farmers',
      date: '2024-03-05',
      location: 'Cape Town Agricultural Hub',
      duration: '1 day',
      cost: 'Free',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('govSchemes')} & Support</h2>
        
        {/* Active Schemes */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Available Funding Schemes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {schemes.map((scheme, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-gray-800 text-lg">{scheme.title}</h4>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    {scheme.status}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">{scheme.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <FileText size={16} className="text-gray-500" />
                    <span className="text-sm text-gray-700">Amount: <strong>{scheme.amount}</strong></span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} className="text-gray-500" />
                    <span className="text-sm text-gray-700">Deadline: <strong>{scheme.deadline}</strong></span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone size={16} className="text-gray-500" />
                    <span className="text-sm text-gray-700">Contact: <strong>{scheme.contact}</strong></span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Eligibility:</p>
                  <p className="text-sm text-gray-800">{scheme.eligibility}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    {scheme.category}
                  </span>
                  <button className="flex items-center space-x-1 text-green-600 hover:text-green-700 transition-colors">
                    <span className="text-sm font-medium">Apply Now</span>
                    <ExternalLink size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Training Programs */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Training Programs</h3>
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="space-y-4">
              {training.map((program, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-800">{program.title}</h4>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      {program.cost}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Calendar size={14} />
                      <span>{program.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin size={14} />
                      <span>{program.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>Duration: {program.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href="#" className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors">
              <ExternalLink size={16} />
              <span>Department of Agriculture</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors">
              <ExternalLink size={16} />
              <span>Agricultural Development Agency</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors">
              <ExternalLink size={16} />
              <span>Land Bank Application Portal</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};