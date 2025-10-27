import React, { useState, useEffect } from 'react';
import { 
  Users, Plus, Search, Filter, Mail, Calendar, IndianRupee, 
  TrendingUp, Heart, Award, Gift, Target 
} from 'lucide-react';
import { useDashboard } from '../../contexts/DashboardContext';

export function DonorManagement() {
  const { donations } = useDashboard();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  useEffect(() => {
    // Example: load user-selected features from localStorage or API
    const userAnswers = localStorage.getItem('userAnswers');
    if (userAnswers) {
      const parsed = JSON.parse(userAnswers);
      setSelectedFeatures(parsed.donorManagementFeatures || []);
    }
  }, []);

  const donors = [
    { id: '1', name: 'Tata Foundation', type: 'Corporate', totalDonated: 5000000, avatar: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=1' },
    { id: '2', name: 'Infosys Foundation', type: 'Corporate', totalDonated: 3500000, avatar: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=1' },
    { id: '3', name: 'Azim Premji Foundation', type: 'Foundation', totalDonated: 7500000, avatar: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=1' }
  ];

  const stats = [
    { label: 'Total Donations', value: donations.length.toString(), change: '+12%', icon: Gift, color: 'text-blue-600' },
    { label: 'Completed', value: donations.filter(d => d.status === 'completed').length.toString(), change: '+8%', icon: Heart, color: 'text-green-600' },
    { label: 'Total Amount', value: `₹${(donations.reduce((sum, d) => sum + d.amount, 0) / 100000).toFixed(1)}L`, change: '+15%', icon: IndianRupee, color: 'text-orange-600' },
    { label: 'Avg. Donation', value: `₹${donations.length>0?(donations.reduce((sum,d)=>sum+d.amount,0)/donations.length).toLocaleString():'0'}`, change: '+3%', icon: TrendingUp, color: 'text-purple-600' }
  ];

  const getStatusColor = (status: string) => {
    switch(status){
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const donorSuggestions = [...new Set(donations.map(d => d.donor))]
    .filter(d => d.toLowerCase().includes(searchTerm.toLowerCase()) && searchTerm.length>0)
    .slice(0,5);

  return (
    <div className="p-8 max-w-7xl mx-auto">

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Donor Management</h1>
          <p className="text-gray-600">Manage relationships with your supporters</p>
        </div>
        {selectedFeatures.includes('Add Donor') && (
          <button 
            onClick={() => window.location.href='/add-donation'}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5"/> Add Donor
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}><Icon className="w-6 h-6" /></div>
                <span className="text-sm text-green-600 font-medium">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8 p-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"/>
          <input
            type="text"
            placeholder="Search donors..."
            value={searchTerm}
            onChange={e=>setSearchTerm(e.target.value)}
            onFocus={()=>setShowSuggestions(searchTerm.length>0)}
            onBlur={()=>setTimeout(()=>setShowSuggestions(false),200)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          {showSuggestions && donorSuggestions.length>0 && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-10 mt-1">
              {donorSuggestions.map((donor,i)=>(
                <button key={i} onClick={()=>{setSearchTerm(donor); setShowSuggestions(false);}} className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0">
                  {donor}
                </button>
              ))}
            </div>
          )}
        </div>
        <select value={selectedCategory} onChange={e=>setSelectedCategory(e.target.value)} className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
          <option value="all">All Types</option>
          <option value="one-time">One-time</option>
          <option value="recurring">Recurring</option>
        </select>
        <button className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <Filter className="w-5 h-5"/> More Filters
        </button>
      </div>

      {/* Conditional Sections */}
      {selectedFeatures.includes('Recent Donations') && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Donations</h2>
          <div className="space-y-4">
            {donations.map(d=>(
              <div key={d.id} className="flex items-center gap-6 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
                  <Gift className="w-8 h-8 text-orange-500"/>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{d.donor}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${d.type==='recurring'?'bg-blue-100 text-blue-800':'bg-green-100 text-green-800'}`}>{d.type}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(d.status)}`}>{d.status}</span>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-1"><Calendar className="w-4 h-4"/> Date: {d.date}</div>
                    <div className="flex items-center gap-1"><Target className="w-4 h-4"/> Project: {d.project}</div>
                    <div className="flex items-center gap-1">Amount: ₹{d.amount.toLocaleString()}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="p-2 text-gray-400 hover:text-gray-600"><Mail className="w-5 h-5"/></button>
                  <button onClick={()=>window.location.href=`/donor-details?id=${d.id}`} className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedFeatures.includes('Top Donors') && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Top Donors</h2>
          <div className="space-y-4">
            {donors.slice(0,3).map((donor, i)=>(
              <div key={donor.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white font-bold">{i+1}</div>
                <img src={donor.avatar} alt={donor.name} className="w-10 h-10 rounded-full object-cover"/>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{donor.name}</h3>
                  <p className="text-sm text-gray-600">₹{(donor.totalDonated/100000).toFixed(1)}L donated</p>
                </div>
                <Award className="w-5 h-5 text-yellow-500"/>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedFeatures.includes('Donation Trends') && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Donation Trends</h2>
          <div className="space-y-4">
            <div className="text-center text-3xl font-bold text-gray-900 mb-2">₹{(donors.reduce((sum,d)=>sum+d.totalDonated,0)/100000).toFixed(1)}L</div>
            <p className="text-gray-600 text-center">Total Donations This Year</p>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Corporate Donors</span>
                <span className="font-semibold">60%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{width:'60%'}}/>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Foundation Donors</span>
                <span className="font-semibold">40%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{width:'40%'}}/>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
