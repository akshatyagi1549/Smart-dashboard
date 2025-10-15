import React from 'react';
import { FileText, Download } from 'lucide-react';
import { createSamplePDF } from '../utils/createSamplePDF';

export function PDFGenerator() {
  const generateAndDownloadPDF = () => {
    const doc = createSamplePDF();
    doc.save('ngo-resource-guide.pdf');
  };

  const generatePDFBlob = () => {
    const doc = createSamplePDF();
    const blob = doc.output('blob');
    const url = URL.createObjectURL(blob);
    return url;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex items-center gap-3 mb-4">
        <FileText className="w-6 h-6 text-orange-500" />
        <h3 className="text-lg font-semibold">Generate Sample PDF</h3>
      </div>
      
      <p className="text-gray-600 mb-4">
        Create a sample PDF document with NGO resource content to test the PDF viewer functionality.
      </p>
      
      <button
        onClick={generateAndDownloadPDF}
        className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
      >
        <Download className="w-4 h-4" />
        Generate & Download PDF
      </button>
    </div>
  );
}