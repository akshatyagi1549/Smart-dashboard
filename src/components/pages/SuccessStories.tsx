import React from 'react';
import { ArrowLeft, MapPin, Calendar, ExternalLink } from 'lucide-react';

export function SuccessStories() {
  const successStories = [
    {
      id: '1',
      title: 'Joint Clean Water Initiative',
      ngo: 'Water Aid India',
      impact: '15,000 people gained access to clean water',
      location: 'Rajasthan',
      date: '2024-12-15',
      image: 'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
      description: 'Through collaborative efforts with local communities and government agencies, we successfully implemented a comprehensive water management system that now serves over 15,000 people in rural Rajasthan.'
    },
    {
      id: '2',
      title: 'Education Technology Partnership',
      ngo: 'Teach for India',
      impact: '5,000 students received digital learning tools',
      location: 'Kerala',
      date: '2024-12-10',
      image: 'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
      description: 'Our partnership with Teach for India brought cutting-edge educational technology to underserved communities, transforming the learning experience for thousands of students.'
    },
    {
      id: '3',
      title: 'Healthcare Outreach Program',
      ngo: 'Doctors Without Borders',
      impact: '3,000 people received medical care',
      location: 'West Bengal',
      date: '2024-12-05',
      image: 'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
      description: 'Mobile healthcare units reached remote villages, providing essential medical services and health education to communities that previously had limited access to healthcare.'
    }
  ];

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => window.history.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Success Stories</h1>
            <p className="text-gray-600">Inspiring collaborations that made a difference</p>
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {successStories.map((story) => (
            <div key={story.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-bold text-xl text-gray-900 mb-3">{story.title}</h3>
                <p className="text-gray-600 mb-4">{story.description}</p>
                
                <div className="bg-orange-50 p-3 rounded-lg mb-4">
                  <p className="font-semibold text-orange-800">{story.impact}</p>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {story.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {story.date}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{story.ngo}</span>
                  <button className="text-orange-500 hover:text-orange-600 transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}