import React from 'react';
import { ArrowLeft, Download, Eye, Calendar, Users, FileText, Share2, Bookmark } from 'lucide-react';

interface DocumentViewerProps {
  documentId: string;
  onBack: () => void;
}

export function DocumentViewer({ documentId, onBack }: DocumentViewerProps): JSX.Element {
  const getDocumentById = (id: string) => {
    const documents = {
      '1': {
        id: '1',
        title: 'Annual Report 2023-24 — Akshaya Patra',
        ngoName: 'Akshaya Patra Foundation',
        category: 'Education & Nutrition',
        type: 'Annual Report',
        size: '7.9 MB',
        pages: 120,
        uploadDate: '2024-12-15',
        downloads: 2187,
        views: 5620,
        image: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=1200&auto=format&fit=crop',
        description: 'Comprehensive annual review of the world\'s largest NGO-run mid-day meals program, including governance, reach, and audited financials for FY 2024.',
        tags: ['Financial', 'Impact', 'Annual', 'Mid-Day Meals'],
        content: 'Executive Summary: The Akshaya Patra Foundation continues to be the world\'s largest NGO-run mid-day meal program, serving over 2 million children across 12 states in India. This annual report presents our achievements, challenges, and financial overview for the fiscal year 2023-24.'
      },
      '2': {
        id: '2',
        title: 'Teach For India — Impact Overview 2024',
        ngoName: 'Teach For India',
        category: 'Education',
        type: 'Impact Report',
        size: '3.8 MB',
        pages: 44,
        uploadDate: '2024-11-20',
        downloads: 1092,
        views: 2765,
        image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=1200&auto=format&fit=crop',
        description: 'Evidence of student learning outcomes, leadership pipeline growth, and community impact across major cities, aligned with TFI\'s 2032 strategy.',
        tags: ['Education', 'Assessment', 'Performance', 'Leadership'],
        content: 'Program Overview: Teach For India works to eliminate educational inequity by developing leaders who ensure that all children attain an excellent education. This impact report covers our achievements and learnings from 2024.'
      },
      '3': {
        id: '3',
        title: 'Disaster Relief & Dignity — Goonj 2024',
        ngoName: 'Goonj',
        category: 'Rural Development',
        type: 'Project Report',
        size: '5.2 MB',
        pages: 68,
        uploadDate: '2024-10-05',
        downloads: 1734,
        views: 3894,
        image: 'https://images.unsplash.com/photo-1520975922284-9e0ce9c4d77e?q=80&w=1200&auto=format&fit=crop',
        description: 'Field documentation of relief responses and community-led rebuilding through materials as a resource, including "Cloth for Work."',
        tags: ['Disaster', 'Relief', 'Community', 'Rural'],
        content: 'Project Overview: Goonj works on disaster relief and dignity through community-led rebuilding initiatives. This report documents our relief responses and the innovative "Cloth for Work" program that transforms urban waste into rural development resources.'
      },
      '4': {
        id: '4',
        title: 'Smile Foundation — Health Progress Q3 FY24',
        ngoName: 'Smile Foundation',
        category: 'Healthcare',
        type: 'Progress Report',
        size: '2.3 MB',
        pages: 42,
        uploadDate: '2024-09-12',
        downloads: 865,
        views: 2120,
        image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1200&auto=format&fit=crop',
        description: 'Quarterly outcomes from mobile health units, community screenings, and program coverage across multiple states.',
        tags: ['Healthcare', 'Progress', 'Community Health'],
        content: 'Health Progress Report: Our mobile health units have reached over 50,000 beneficiaries this quarter. Community screenings have identified and treated various health conditions, with special focus on maternal and child health in underserved areas.'
      },
      '5': {
        id: '5',
        title: 'CRY — Child Rights Program 2024',
        ngoName: 'CRY - Child Rights and You',
        category: 'Child Welfare',
        type: 'Program Report',
        size: '3.4 MB',
        pages: 56,
        uploadDate: '2024-08-28',
        downloads: 1290,
        views: 2952,
        image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop',
        description: 'Protection, education, and health interventions for children, with program snapshots, case studies, and reach metrics.',
        tags: ['Child Rights', 'Protection', 'Advocacy'],
        content: 'Child Rights Program: CRY continues to work towards ensuring every child has access to education, healthcare, and protection from exploitation. This report highlights our interventions across 19 states, reaching over 750,000 children directly.'
      },
      '6': {
        id: '6',
        title: 'Pratham — Literacy Program Analysis 2024',
        ngoName: 'Pratham',
        category: 'Education',
        type: 'Research Paper',
        size: '4.6 MB',
        pages: 72,
        uploadDate: '2024-07-15',
        downloads: 744,
        views: 1627,
        image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1200&auto=format&fit=crop',
        description: 'Methodologies and outcomes from foundational literacy programs, with longitudinal insights and rural-urban comparisons.',
        tags: ['Literacy', 'Research', 'Education'],
        content: 'Literacy Research: This comprehensive analysis examines the effectiveness of our foundational literacy programs across rural and urban settings. Our research shows significant improvement in reading levels among children aged 6-14 years.'
      },
      '7': {
        id: '7',
        title: 'Women Empowerment Initiative 2024',
        ngoName: 'Smile Foundation',
        category: 'Healthcare',
        type: 'Initiative Report',
        size: '2.0 MB',
        pages: 38,
        uploadDate: '2024-06-22',
        downloads: 712,
        views: 1704,
        image: 'https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?q=80&w=1200&auto=format&fit=crop',
        description: 'Skill development and community health empowerment initiatives focusing on women\'s livelihoods and agency.',
        tags: ['Women', 'Empowerment', 'Skills'],
        content: 'Women Empowerment: Our initiative focuses on skill development and community health empowerment for women. Through vocational training and health awareness programs, we have empowered over 15,000 women across 8 states.'
      },
      '8': {
        id: '8',
        title: 'Rural Development Strategy — Goonj',
        ngoName: 'Goonj',
        category: 'Rural Development',
        type: 'Strategy Document',
        size: '3.1 MB',
        pages: 51,
        uploadDate: '2024-05-30',
        downloads: 903,
        views: 2011,
        image: 'https://images.unsplash.com/photo-1509098681029-b45e9c845022?q=80&w=1200&auto=format&fit=crop',
        description: 'Strategic framework for community-led rural development and dignity-centric material mobilization.',
        tags: ['Rural', 'Strategy', 'Development'],
        content: 'Rural Development Strategy: This document outlines our strategic framework for community-led rural development. Our approach focuses on dignity-centric material mobilization, where urban waste is converted into rural development resources through community participation.'
      }
    };
    
    return documents[id as keyof typeof documents] || null;
  };

  const doc = getDocumentById(documentId);

  if (!doc) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Document not found</h3>
          <p className="text-gray-600 mb-4">The requested document could not be found.</p>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleDownload = () => {
    const fileName = doc.title.replace(/[^a-zA-Z0-9]/g, '_') + '.pdf';
    const pdfContent = 'Mock PDF content for ' + doc.title;
    
    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: doc.title,
        text: doc.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Document link copied to clipboard!');
    }
  };

  const handleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedDocuments') || '[]');
    const isBookmarked = bookmarks.includes(doc.id);
    
    if (isBookmarked) {
      const updated = bookmarks.filter((id: string) => id !== doc.id);
      localStorage.setItem('bookmarkedDocuments', JSON.stringify(updated));
      alert('Document removed from bookmarks!');
    } else {
      bookmarks.push(doc.id);
      localStorage.setItem('bookmarkedDocuments', JSON.stringify(bookmarks));
      alert('Document bookmarked!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors flex items-center gap-2 text-gray-600"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Library
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{doc.title}</h1>
                <p className="text-gray-600">{doc.ngoName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={handleShare}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                title="Share document"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button 
                onClick={handleBookmark}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                title="Bookmark document"
              >
                <Bookmark className="w-5 h-5" />
              </button>
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-6">
              <img
                src={doc.image}
                alt={doc.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Document Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium">{doc.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pages:</span>
                      <span className="font-medium">{doc.pages}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Size:</span>
                      <span className="font-medium">{doc.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Published:</span>
                      <span className="font-medium">{new Date(doc.uploadDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Engagement</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-gray-400" />
                      <span>{doc.views.toLocaleString()} views</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Download className="w-4 h-4 text-gray-400" />
                      <span>{doc.downloads.toLocaleString()} downloads</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {doc.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <div className="prose max-w-none">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">About this Document</h2>
                  <p className="text-gray-600">{doc.description}</p>
                </div>
                
                <div className="document-content">
                  <p>{doc.content}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}