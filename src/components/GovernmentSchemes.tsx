import React from 'react';
import { FileText, Calendar, Phone, ExternalLink, MapPin, CheckCircle, BookOpen } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const GovernmentSchemes: React.FC = () => {
  const { t } = useLanguage();

  const schemes = [
    {
      title: 'Smallholder Agricultural Support Programme',
      description: 'Financial assistance for small-scale farmers to improve productivity and sustainability.',
      amount: 'Up to R50,000',
      deadline: '31 March 2024',
      eligibility: 'Small-scale farmers with less than 5 hectares',
      contact: '012 319 7000',
      category: 'Financial Support',
      color: 'green',
      emoji: '💰',
    },
    {
      title: 'Agricultural Development Fund',
      description: 'Loans and grants for agricultural equipment, infrastructure, and technology adoption.',
      amount: 'R10,000 – R500,000',
      deadline: '30 June 2024',
      eligibility: 'Registered farmers with a business plan',
      contact: '012 319 7100',
      category: 'Equipment & Infrastructure',
      color: 'blue',
      emoji: '🚜',
    },
    {
      title: 'Youth in Agriculture Programme',
      description: 'Special support for young farmers aged 18–35 to start or expand agricultural businesses.',
      amount: 'Up to R100,000',
      deadline: '15 May 2024',
      eligibility: 'South African citizens aged 18–35',
      contact: '012 319 7200',
      category: 'Youth Development',
      color: 'amber',
      emoji: '🌱',
    },
    {
      title: 'Climate Smart Agriculture Initiative',
      description: 'Support for farmers adopting climate-resilient and sustainable farming practices.',
      amount: 'Up to R75,000',
      deadline: '31 August 2024',
      eligibility: 'Farmers implementing climate-smart technologies',
      contact: '012 319 7300',
      category: 'Sustainability',
      color: 'teal',
      emoji: '♻️',
    },
  ];

  const training = [
    { title: 'Crop Management Training', date: '15 Feb 2024', location: 'Johannesburg Agricultural Center', duration: '3 days', cost: 'Free' },
    { title: 'Livestock Health Workshop', date: '22 Feb 2024', location: 'Pretoria Extension Office', duration: '2 days', cost: 'Free' },
    { title: 'Financial Management for Farmers', date: '5 Mar 2024', location: 'Cape Town Agricultural Hub', duration: '1 day', cost: 'Free' },
  ];

  const quickLinks = [
    { label: 'Department of Agriculture', sub: 'DALRRD official portal' },
    { label: 'Agricultural Development Agency', sub: 'AGSA resources' },
    { label: 'Land Bank Application Portal', sub: 'Online applications' },
  ];

  const colorMap: Record<string, string> = {
    green: 'bg-green-50 border-green-200',
    blue: 'bg-blue-50 border-blue-200',
    amber: 'bg-amber-50 border-amber-200',
    teal: 'bg-teal-50 border-teal-200',
  };

  const badgeMap: Record<string, string> = {
    green: 'bg-green-100 text-green-700',
    blue: 'bg-blue-100 text-blue-700',
    amber: 'bg-amber-100 text-amber-700',
    teal: 'bg-teal-100 text-teal-700',
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Schemes */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800">Government Schemes & Support</h2>
          <p className="text-sm text-gray-500 mt-1">Available funding, grants, and support programmes for South African farmers</p>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          {schemes.map((scheme, i) => (
            <div key={i} className={`rounded-xl border p-5 ${colorMap[scheme.color]} hover:shadow-md transition-shadow`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{scheme.emoji}</div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base leading-tight">{scheme.title}</h3>
                    <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${badgeMap[scheme.color]}`}>
                      {scheme.category}
                    </span>
                  </div>
                </div>
                <span className="flex-shrink-0 px-2.5 py-1 bg-green-500 text-white text-xs font-bold rounded-full">Active</span>
              </div>

              <p className="text-sm text-gray-600 mb-4">{scheme.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle size={14} className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700"><strong>Amount:</strong> {scheme.amount}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar size={14} className="text-gray-500 flex-shrink-0" />
                  <span className="text-gray-700"><strong>Deadline:</strong> {scheme.deadline}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone size={14} className="text-gray-500 flex-shrink-0" />
                  <span className="text-gray-700">{scheme.contact}</span>
                </div>
              </div>

              <div className="bg-white bg-opacity-60 rounded-lg p-3 mb-4">
                <p className="text-xs text-gray-500 font-medium mb-1">Eligibility</p>
                <p className="text-sm text-gray-700">{scheme.eligibility}</p>
              </div>

              <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors">
                Apply Now
                <ExternalLink size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Training */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <BookOpen size={20} className="text-blue-600" />
            Upcoming Training Programmes
          </h3>
        </div>
        <div className="divide-y divide-gray-100">
          {training.map((prog, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <BookOpen size={18} className="text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800">{prog.title}</p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Calendar size={11} />{prog.date}</span>
                  <span className="flex items-center gap-1"><MapPin size={11} />{prog.location}</span>
                  <span>{prog.duration}</span>
                </div>
              </div>
              <span className="flex-shrink-0 px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                {prog.cost}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-6 text-white shadow-xl">
        <h3 className="font-bold text-lg mb-4">Quick Links</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {quickLinks.map(({ label, sub }, i) => (
            <a
              key={i}
              href="#"
              className="flex items-center justify-between p-4 bg-white bg-opacity-15 hover:bg-opacity-25 rounded-xl transition-all group"
            >
              <div>
                <p className="font-semibold text-sm">{label}</p>
                <p className="text-green-200 text-xs mt-0.5">{sub}</p>
              </div>
              <ExternalLink size={16} className="text-green-200 group-hover:text-white transition-colors flex-shrink-0" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
