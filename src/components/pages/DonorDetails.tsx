import React from 'react';
import { ArrowLeft, Mail, Phone, Calendar, IndianRupee, Gift, MapPin } from 'lucide-react';
import { useDashboard } from '../../contexts/DashboardContext';

export function DonorDetails() {
  const { donations } = useDashboard();
  const donorId = new URLSearchParams(window.location.search).get('id');
  
  // Find all donations by this donor
  const donorDonations = donations.filter(d => d.id === donorId);
  const donation = donorDonations[0];
  
  if (!donation) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Donor Not Found</h1>
          <button onClick={() => window.location.href = '/'} className="text-orange-500 hover:text-orange-600">
            ← Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const totalDonated = donorDonations.reduce((sum, d) => sum + d.amount, 0);

  const sendThankYouEmail = () => {
    const donorEmail = `${donation.donor.toLowerCase().replace(' ', '.')}@email.com`;
    const subject = `Thank You for Your Generous Donation - ${donation.donor}`;
    const body = `Dear ${donation.donor},\n\nThank you so much for your generous donation of ₹${donation.amount.toLocaleString()} to our ${donation.project} project.\n\nYour support means the world to us and helps us continue our mission to make a positive impact in the community.\n\nTotal contributions from you: ₹${totalDonated.toLocaleString()}\nNumber of donations: ${donorDonations.length}\n\nWe are truly grateful for your continued support.\n\nWith heartfelt thanks,\nNGO Team\n\n---\nThis email was sent from our donor management system.`;
    
    const mailtoLink = `mailto:${donorEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, '_blank');
    
    alert(`Thank you email opened in your default email client!\nTo: ${donorEmail}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => {
              localStorage.setItem('activeModule', 'donors');
              window.location.href = '/';
            }} 
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Donor Details</h1>
            <p className="text-gray-600">Complete donor information and history</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Donor Profile */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-12 h-12 text-orange-500" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">{donation.donor}</h2>
                <span className={`px-3 py-1 text-sm rounded-full ${
                  donation.type === 'recurring' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                }`}>
                  {donation.type} Donor
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="w-5 h-5" />
                  <span>{donation.donor.toLowerCase().replace(' ', '.')}@email.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone className="w-5 h-5" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar className="w-5 h-5" />
                  <span>First Donation: {donation.date}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span>Mumbai, Maharashtra</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">₹{totalDonated.toLocaleString()}</div>
                  <p className="text-gray-600">Total Contributed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Donation History & Stats */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <IndianRupee className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{donorDonations.length}</h3>
                <p className="text-gray-600">Total Donations</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <Gift className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">₹{(totalDonated / donorDonations.length).toLocaleString()}</h3>
                <p className="text-gray-600">Average Donation</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <Calendar className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{donation.date}</h3>
                <p className="text-gray-600">Last Donation</p>
              </div>
            </div>

            {/* Donation History */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Donation History</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {donorDonations.map((donation) => (
                    <div key={donation.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                          <Gift className="w-6 h-6 text-orange-500" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">₹{donation.amount.toLocaleString()}</h3>
                          <p className="text-sm text-gray-600">{donation.project}</p>
                          <p className="text-xs text-gray-500">{donation.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          donation.status === 'completed' ? 'bg-green-100 text-green-800' : 
                          donation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {donation.status}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">{donation.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="flex gap-4">
                <button 
                  onClick={sendThankYouEmail}
                  className="flex-1 bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition"
                >
                  Send Thank You Email
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition">
                  Schedule Follow-up
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition">
                  Generate Receipt
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DonorDetails;