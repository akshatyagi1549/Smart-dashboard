import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Download, Search, Filter, Eye } from 'lucide-react';
import { PDFViewer } from '../PDFViewer';
import { PDFGenerator } from '../PDFGenerator';
import { createSamplePDF } from '../../utils/createSamplePDF';

export function Resources() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [viewingPDF, setViewingPDF] = useState<string | null>(null);
  const [pdfTitle, setPdfTitle] = useState<string>('');
  const [samplePDFUrl, setSamplePDFUrl] = useState<string>('');

  useEffect(() => {
    // Generate sample PDF URL on component mount
    const doc = createSamplePDF();
    const blob = doc.output('blob');
    const url = URL.createObjectURL(blob);
    setSamplePDFUrl(url);
    
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, []);

  const resources = [
    {
      id: '1',
      title: 'Grant Application Templates',
      type: 'Template',
      downloads: 245,
      rating: 4.8,
      sharedBy: 'Tata Trusts',
      date: '2025-01-10',
      description: 'Comprehensive templates for various grant applications including government and private foundation grants.',
      fileSize: '2.5 MB',
      pdfUrl: 'sample'
    },
    {
      id: '2',
      title: 'Impact Measurement Framework',
      type: 'Guide',
      downloads: 189,
      rating: 4.9,
      sharedBy: 'Ford Foundation',
      date: '2025-01-08',
      description: 'Step-by-step guide to measure and report the impact of your NGO programs effectively.',
      fileSize: '1.8 MB',
      pdfUrl: 'sample'
    },
    {
      id: '3',
      title: 'Volunteer Management System',
      type: 'Tool',
      downloads: 156,
      rating: 4.7,
      sharedBy: 'United Way',
      date: '2025-01-05',
      description: 'Complete toolkit for recruiting, training, and managing volunteers in your organization.',
      fileSize: '5.2 MB',
      pdfUrl: 'sample'
    },
    {
      id: '4',
      title: 'Fundraising Strategy Playbook',
      type: 'Guide',
      downloads: 312,
      rating: 4.9,
      sharedBy: 'Charity Navigator',
      date: '2025-01-03',
      description: 'Proven strategies and tactics for successful fundraising campaigns and donor engagement.',
      fileSize: '3.1 MB'
    },
    {
      id: '5',
      title: 'Financial Management Templates',
      type: 'Template',
      downloads: 198,
      rating: 4.6,
      sharedBy: 'GiveIndia',
      date: '2025-01-01',
      description: 'Excel templates for budgeting, expense tracking, and financial reporting for NGOs.',
      fileSize: '1.2 MB'
    },
    {
      id: '6',
      title: 'Social Media Marketing Kit',
      type: 'Tool',
      downloads: 267,
      rating: 4.8,
      sharedBy: 'Network for Good',
      date: '2024-12-28',
      description: 'Complete social media toolkit with templates, graphics, and best practices for NGO marketing.',
      fileSize: '8.7 MB'
    }
  ];

  const types = ['All', 'Template', 'Guide', 'Tool'];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || resource.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Template': return 'bg-blue-100 text-blue-800';
      case 'Guide': return 'bg-green-100 text-green-800';
      case 'Tool': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewPDF = (pdfUrl: string, title: string) => {
    const actualUrl = pdfUrl === 'sample' ? samplePDFUrl : pdfUrl;
    setViewingPDF(actualUrl);
    setPdfTitle(title);
  };

  const handleDownload = (pdfUrl: string, title: string) => {
    if (pdfUrl === 'sample') {
      const doc = createSamplePDF();
      doc.save(title + '.pdf');
    } else {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = title + '.pdf';
      link.click();
    }
  };

  if (viewingPDF) {
    return (
      <div className="p-8 min-h-screen bg-gradient-to-br from-orange-50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <button 
              onClick={() => setViewingPDF(null)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Viewing: {pdfTitle}</h1>
          </div>
          <PDFViewer pdfUrl={viewingPDF} title={pdfTitle} />
        </div>
      </div>
    );
  }

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
            <h1 className="text-3xl font-bold text-gray-900">Shared Resources</h1>
            <p className="text-gray-600">Tools, templates, and guides shared by the NGO community</p>
          </div>
        </div>

        {/* PDF Generator */}
        <div className="mb-8">
          <PDFGenerator />
        </div>

        {/* Search and Filter */}
        <div className="flex items-center gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            {types.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedType === type
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="space-y-6">
          {filteredResources.map((resource) => (
            <div key={resource.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-bold text-xl text-gray-900">{resource.title}</h3>
                    <span className={`px-3 py-1 text-sm rounded-full ${getTypeColor(resource.type)}`}>
                      {resource.type}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{resource.description}</p>
                  
                  <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      {resource.rating} rating
                    </div>
                    <div>{resource.downloads} downloads</div>
                    <div>{resource.fileSize}</div>
                    <div>Shared by {resource.sharedBy}</div>
                  </div>
                  
                  <div className="text-sm text-gray-500">Added on {resource.date}</div>
                </div>
                
                <div className="flex gap-2 ml-6">
                  <button 
                    onClick={() => handleViewPDF(resource.pdfUrl || 'sample', resource.title)}
                    className="bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                    disabled={!samplePDFUrl && resource.pdfUrl === 'sample'}
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button 
                    onClick={() => handleDownload(resource.pdfUrl || 'sample', resource.title)}
                    className="bg-orange-500 text-white px-4 py-3 rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No resources found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}