import React, { useState } from 'react';
import { 
  Heart, Shield, Users, TrendingUp, Award, 
  ArrowRight, Play, CheckCircle, Star,
  Globe, Handshake, Target, BarChart3,
  Mail, Phone, MapPin, Facebook, Twitter, Instagram
} from 'lucide-react';
import { LoginModal } from './LoginModal';
import { SignUpModal } from './SignUpModal';
import { DonationPage } from './DonationPage';
import { motion } from 'framer-motion';

export function LandingPage() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showDonationPage, setShowDonationPage] = useState(false);

  const stats = [
    { value: '50,000+', label: 'Lives Impacted', icon: Heart },
    { value: '150+', label: 'Villages Reached', icon: MapPin },
    { value: '₹2.5Cr+', label: 'Funds Raised', icon: TrendingUp },
    { value: '25+', label: 'Active Projects', icon: Target }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Transparent Operations',
      description: 'Complete transparency in fund utilization and project progress with real-time tracking and detailed reporting.'
    },
    {
      icon: Users,
      title: 'Community Impact',
      description: 'Empowering communities through education, healthcare, and sustainable development initiatives across rural India.'
    },
    {
      icon: Handshake,
      title: 'Collaborative Network',
      description: 'Building partnerships with other NGOs, government bodies, and international organizations for greater impact.'
    },
    {
      icon: BarChart3,
      title: 'Data-Driven Approach',
      description: 'Using advanced analytics and monitoring systems to measure impact and optimize program effectiveness.'
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Meera Gupta',
      role: 'Village Health Officer',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      quote: 'The healthcare initiative has transformed our village. Children now have access to quality medical care and nutrition programs.'
    },
    {
      name: 'Ravi Kumar',
      role: 'School Principal',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      quote: 'The education program has increased enrollment by 300%. Our students now have access to digital learning tools and qualified teachers.'
    },
    {
      name: 'Sunita Devi',
      role: 'Women\'s Group Leader',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      quote: 'The livelihood program helped us start our own business. We now have financial independence and can support our families.'
    }
  ];

  const projects = [
    {
      title: 'Education for All',
      description: 'Providing quality education to underprivileged children across rural India',
      image: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1',
      progress: 75,
      beneficiaries: '5,000+ children',
      location: 'Rajasthan, UP, Bihar'
    },
    {
      title: 'Healthcare Initiative',
      description: 'Mobile healthcare units serving remote communities with essential medical services',
      image: 'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1',
      progress: 60,
      beneficiaries: '15,000+ people',
      location: 'Maharashtra, Karnataka'
    },
    {
      title: 'Women Empowerment',
      description: 'Skill development and microfinance programs for rural women entrepreneurs',
      image: 'https://images.pexels.com/photos/8926553/pexels-photo-8926553.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1',
      progress: 85,
      beneficiaries: '2,500+ women',
      location: 'Gujarat, Madhya Pradesh'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center md:justify-between h-auto md:h-16 py-2 md:py-0">
            <div className="flex items-start md:items-center md:justify-start gap-3 w-full md:w-auto mb-2 md:mb-0">
              <img src="/ngo india logo.png" alt="NGO INDIA Logo" className="w-40 h-28 rounded-lg" />
            </div>
            <nav className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-8 w-full md:w-auto justify-center md:justify-start mb-2 md:mb-0">
              <a href="#about-ngo" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">About</a>
              <a href="#projects" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Projects</a>
              <a href="#impact" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Impact</a>
              <a href="#contact" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Contact</a>
            </nav>
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 w-full md:w-auto justify-center md:justify-end">
              <motion.button 
                onClick={() => window.location.href = '/donate'}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium w-full md:w-auto flex items-center gap-2 relative overflow-visible"
                whileHover={{ scale: 1.08, boxShadow: '0 0 0 4px #fed7aa' }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <span className="relative flex items-center">
                  <Heart className="w-5 h-5 text-white z-10" />
                  {/* Sparkle effect */}
                  <motion.svg
                    className="absolute left-0 top-0 w-5 h-5 z-20 pointer-events-none"
                    initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0.5, 1.2, 0.5],
                      rotate: [0, 45, 0]
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      repeatDelay: 1.5,
                      ease: 'easeInOut'
                    }}
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <circle cx="10" cy="2" r="1.5" fill="#fffbe6" />
                    <circle cx="17" cy="10" r="1" fill="#fffbe6" />
                    <circle cx="3" cy="15" r="0.8" fill="#fffbe6" />
                  </motion.svg>
                </span>
                Donate Now
              </motion.button>
              <button 
                onClick={() => window.location.href = '/join'}
                className="border border-orange-500 text-orange-600 px-4 py-2 rounded-lg hover:bg-orange-50 transition-colors font-medium w-full md:w-auto"
              >
                Join Us
              </button>
              <button 
                onClick={() => setShowLoginModal(true)}
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium w-full md:w-auto"
              >
                Staff Login
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-50 via-white to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Transforming Lives Through
                <span className="text-orange-500"> Compassionate Action</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Join us in our mission to create lasting change in rural India through education, healthcare, 
                and sustainable development programs that empower communities and build brighter futures.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => window.location.href = '/join'}
                  className="bg-orange-500 text-white px-8 py-4 rounded-lg hover:bg-orange-600 transition-colors font-semibold flex items-center gap-2 justify-center"
                >
                  Get Involved
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors font-semibold flex items-center gap-2 justify-center">
                  <Play className="w-5 h-5" />
                  Watch Our Story
                </button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <img
                src="https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1"
                alt="Children in classroom"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">50,000+ Lives Impacted</p>
                    <p className="text-sm text-gray-600">Across 150+ villages</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } },
              hidden: {}
            }}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-orange-50 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose NGO INDIA</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe in transparency, accountability, and measurable impact. Our approach combines 
              traditional values with modern technology to create sustainable change.
            </p>
          </div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } },
              hidden: {}
            }}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-orange-50 p-3 rounded-lg w-fit mb-6">
                    <Icon className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* About NGO Section */}
      <section id="about-ngo" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About NGO INDIA</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              NGO INDIA is dedicated to transforming lives in rural India through education, healthcare, and sustainable development. Our mission is to empower communities, foster self-reliance, and create lasting change by combining traditional values with modern solutions. We believe in transparency, accountability, and measurable impact, ensuring every contribution makes a real difference.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-orange-50 p-8 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-semibold text-orange-600 mb-3">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                To create a just, equitable, and sustainable society where every individual has access to quality education, healthcare, and opportunities for growth.
              </p>
            </div>
            <div className="bg-orange-50 p-8 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-semibold text-orange-600 mb-3">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To empower marginalized communities by providing resources, building capacity, and fostering partnerships that drive holistic development and social change.
              </p>
            </div>
            <div className="bg-orange-50 p-8 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-semibold text-orange-600 mb-3">Our Values</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Transparency & Accountability</li>
                <li>Inclusivity & Respect</li>
                <li>Innovation & Collaboration</li>
                <li>Community Empowerment</li>
                <li>Sustainable Impact</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Active Projects</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how we're making a difference across various sectors and communities
            </p>
          </div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } },
              hidden: {}
            }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-semibold text-gray-900">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{project.beneficiaries}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{project.location}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="impact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Stories of Impact</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from the communities and individuals whose lives have been transformed through our programs
            </p>
          </div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } },
              hidden: {}
            }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm border border-gray-100"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Join thousands of supporters who are helping us create lasting change in communities across India
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button 
              onClick={() => window.location.href = '/donate'}
              className="bg-white text-orange-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Donate Now
            </motion.button>
            <motion.button 
              onClick={() => window.location.href = '/join'}
              className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-orange-600 transition-colors font-semibold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Become a Volunteer
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-3 mb-6">
                <img src="/ngo india logo.png" alt="NGO INDIA Logo" className="w-40 h-30 rounded-lg" />
                {/* Removed text logo, keep only image */}
              </div>
              <p className="text-gray-400 leading-relaxed">
                Dedicated to creating sustainable change through education, healthcare, and community development programs across rural India.
              </p>
            </div>
            
            <div className="flex flex-col items-start">
              <h4 className="font-semibold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#projects" className="text-gray-400 hover:text-white transition-colors">Our Projects</a></li>
                <li><a href="#impact" className="text-gray-400 hover:text-white transition-colors">Impact Stories</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Annual Reports</a></li>
              </ul>
            </div>
            
            <div className="flex flex-col items-start">
              <h4 className="font-semibold text-lg mb-6">Get Involved</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Donate</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Volunteer</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Partner with Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Corporate CSR</a></li>
              </ul>
            </div>
            
            <div className="flex flex-col items-start">
              <h4 className="font-semibold text-lg mb-6">Contact Info</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-orange-500" />
                  <span className="text-gray-400">grants@ngoindia.org</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-orange-500" />
                  <a href="/enquiry" className="text-gray-400 hover:text-white transition-colors">+91 8068447416</a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-orange-500" />
                  <span className="text-gray-400">Bengaluru, India</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 mt-6">
                <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 NGO INDIA. All rights reserved. | Privacy Policy | Terms of Service
            </p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}

      {/* Sign Up Modal */}
    </div>
  );
}