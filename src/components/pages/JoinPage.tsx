import React, { useState } from 'react';
import { 
  Heart, User, Mail, Lock, Phone, MapPin, 
  Shield, Users, Briefcase, ArrowLeft, 
  CheckCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export function JoinPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [selectedRole, setSelectedRole] = useState<'staff' | 'leadership' | 'employee'>('staff');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    organization: '',
    experience: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if ((selectedRole === 'leadership' || selectedRole === 'employee') && !formData.organization.trim()) {
      newErrors.organization = 'Organization is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password,
      role: selectedRole,
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      organization: selectedRole !== 'staff' ? formData.organization.trim() : '',
      experience: formData.experience.trim() || ''
    };

    try {
      const success = await register(payload);

      if (!success) {
        setErrors({ submit: 'Registration failed. Please try again.' });
        setIsLoading(false);
        return;
      }

      // Fetch NGO answers from localStorage
      const ngoAnswersRaw = localStorage.getItem('ngoanswers');
      const ngoAnswers = ngoAnswersRaw ? JSON.parse(ngoAnswersRaw) : {};

      let directorUsername = '';
      let ngoName = '';

      if (selectedRole === 'staff') {
        // Director: dashboard/username_ngoname
        ngoName = formData.organization.trim();
        directorUsername = formData.email.split('@')[0];
        navigate(`/dashboard/${directorUsername}_${ngoName}`);
      } else {
        // Executive or Employee: check if NGO exists
        const ngoEntry = Object.values(ngoAnswers).find(
          (ngo: any) => ngo.ngoName.toLowerCase() === formData.organization.trim().toLowerCase()
        );

        if (!ngoEntry) {
          setErrors({ submit: `NGO "${formData.organization}" does not exist. Please ask the Director to create it first.` });
          setIsLoading(false);
          return;
        }

        ngoName = ngoEntry.ngoName;
        directorUsername = Object.keys(ngoAnswers).find(
          (key) => ngoAnswers[key].ngoName.toLowerCase() === ngoName.toLowerCase()
        )!.split('@')[0];

        const userUsername = formData.email.split('@')[0];
        navigate(`/dashboard/${directorUsername}_${ngoName}/${userUsername}`);
      }

    } catch (error: any) {
      console.error(error);
      setErrors({ submit: error.message || 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const roleOptions = [
    {
      id: 'staff',
      title: 'Director',
      description: 'Lead programs, track donations, and monitor projects',
      icon: Users,
      color: 'text-blue-600',
      benefits: ['Access to donor management', 'Financial tracking tools', 'Project monitoring dashboard']
    },
    {
      id: 'leadership',
      title: 'Executive Director',
      description: 'Executive oversight, strategic planning, and organizational management',
      icon: Shield,
      color: 'text-purple-600',
      benefits: ['Full administrative access', 'Strategic analytics', 'HR management tools']
    },
    {
      id: 'employee',
      title: 'Employee',
      description: 'Operations, task management, and community engagement',
      icon: Briefcase,
      color: 'text-green-600',
      benefits: ['Task management system', 'Training modules', 'Performance tracking']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-start gap-3">
              <img src="/ngo india logo.png" alt="NGO INDIA Logo" className="w-10 h-10 rounded-lg" />
            </div>
            <button
              onClick={() => window.location.href = '/'}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="bg-orange-100 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <Heart className="w-10 h-10 text-orange-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Join Our Mission</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Become part of a community dedicated to creating positive change across India. 
            Choose your role and start making a difference today.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
          {/* Role Selection */}
          <div className="p-8 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Choose Your Role</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {roleOptions.map((role) => {
                const Icon = role.icon;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id as any)}
                    className={`p-6 rounded-xl border-2 transition-all text-left ${
                      selectedRole === role.id
                        ? 'border-orange-500 bg-orange-50 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }`}
                  >
                    <div className={`p-3 rounded-lg w-fit mb-4 ${
                      selectedRole === role.id ? 'bg-orange-100' : 'bg-gray-100'
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        selectedRole === role.id ? 'text-orange-600' : role.color
                      }`} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{role.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{role.description}</p>
                    <div className="space-y-2">
                      {role.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-xs text-gray-600">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Registration Form */}
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Create Your Account</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.name ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'
                    } focus:ring-2 focus:border-transparent`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'
                    } focus:ring-2 focus:border-transparent`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Password & Confirm Password */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Lock className="w-4 h-4 inline mr-2" />
                    Password *
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.password ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'
                    } focus:ring-2 focus:border-transparent`}
                    placeholder="Create a password"
                  />
                  {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Lock className="w-4 h-4 inline mr-2" />
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.confirmPassword ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'
                    } focus:ring-2 focus:border-transparent`}
                    placeholder="Confirm your password"
                  />
                  {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>

              {/* Phone & Organization */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.phone ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'
                    } focus:ring-2 focus:border-transparent`}
                    placeholder="+91 98765 43210"
                  />
                  {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                </div>
                {(selectedRole === 'leadership' || selectedRole === 'employee') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Briefcase className="w-4 h-4 inline mr-2" />
                      Organization *
                    </label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => handleInputChange('organization', e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.organization ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'
                      } focus:ring-2 focus:border-transparent`}
                      placeholder="Your organization name"
                    />
                    {errors.organization && <p className="text-red-600 text-sm mt-1">{errors.organization}</p>}
                  </div>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Address *
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  rows={3}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.address ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'
                  } focus:ring-2 focus:border-transparent`}
                  placeholder="Enter your complete address"
                />
                {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Briefcase className="w-4 h-4 inline mr-2" />
                  Experience (Optional)
                </label>
                <input
                  type="text"
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="E.g., 3 years in nonprofit management"
                />
              </div>

              {/* Submit Error */}
              {errors.submit && <p className="text-red-600 text-sm text-center">{errors.submit}</p>}

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow hover:bg-orange-600 transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} NGO INDIA. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
