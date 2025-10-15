import React from 'react';
import { Mail, Phone, MapPin, Info } from 'lucide-react';

export function EnquiryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium"
          >
            <span className="text-xl">←</span>
            Back to Home
          </a>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Get in Touch</h2>
            <p className="text-gray-600 mb-8">Have questions or want to learn more about our work? We'd love to hear from you.</p>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input type="text" placeholder="Enter your full name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input type="email" placeholder="Enter your email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"/>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number (Optional)</label>
                <input type="tel" placeholder="Enter your phone number" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                <input type="text" placeholder="What is this regarding?" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                <textarea placeholder="Tell us more about your enquiry..." className="w-full px-4 py-3 h-40 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
              </div>
              <button type="submit" className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600">Send Message</button>
            </form>
          </div>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-lg"><Mail className="w-6 h-6 text-orange-600"/></div>
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <p className="text-gray-700">grants@ngoindia.org</p>
                    <p className="text-sm text-gray-500">We'll respond within 24-48 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-lg"><Phone className="w-6 h-6 text-orange-600"/></div>
                  <div>
                    <p className="font-semibold text-gray-900">Phone</p>
                    <p className="text-gray-700">+91 8068447416</p>
                    <p className="text-sm text-gray-500">Monday - Friday, 9 AM - 6 PM IST</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-lg"><MapPin className="w-6 h-6 text-orange-600"/></div>
                  <div>
                    <p className="font-semibold text-gray-900">Address</p>
                    <p className="text-gray-700">Bengaluru, India</p>
                    <p className="text-sm text-gray-500">Our headquarters location</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Why Contact Us?</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex gap-2"><Info className="w-5 h-5 text-orange-600 mt-0.5"/>Learn about our programs and initiatives</li>
                <li className="flex gap-2"><Info className="w-5 h-5 text-orange-600 mt-0.5"/>Get information about volunteering opportunities</li>
                <li className="flex gap-2"><Info className="w-5 h-5 text-orange-600 mt-0.5"/>Discuss partnership and collaboration</li>
                <li className="flex gap-2"><Info className="w-5 h-5 text-orange-600 mt-0.5"/>Report issues or provide feedback</li>
                <li className="flex gap-2"><Info className="w-5 h-5 text-orange-600 mt-0.5"/>Request information about donations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnquiryPage;

