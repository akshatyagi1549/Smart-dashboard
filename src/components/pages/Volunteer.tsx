// components/pages/VolunteerPage.tsx
import React from 'react';

const volunteers = [
  { id: 1, name: "John Smith", email: "john@example.com", phone: "+91 9876543210", joinedOn: "2025-09-20" },
  { id: 2, name: "Anita Rao", email: "anita@example.com", phone: "+91 9123456780", joinedOn: "2025-09-22" },
  { id: 3, name: "Ravi Kumar", email: "ravi@example.com", phone: "+91 9988776655", joinedOn: "2025-09-25" },
];

export function VolunteerPage() {
  const goBack = () => {
    localStorage.setItem('activeModule', 'RegisterNGO');
    window.location.href = "/";
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-orange-50 to-white flex flex-col">
      <h1 className="text-3xl font-bold text-orange-600 mb-8 text-center">
        Registered Volunteers
      </h1>

      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden flex-grow">
        {volunteers.length === 0 ? (
          <p className="text-gray-600 text-center py-6">
            No volunteers registered yet.
          </p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-orange-400 to-orange-500 text-white">
                <th className="px-6 py-3 text-left">#</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Phone</th>
                <th className="px-6 py-3 text-left">Joined On</th>
              </tr>
            </thead>
            <tbody>
              {volunteers.map((vol, idx) => (
                <tr
                  key={vol.id}
                  className="border-b hover:bg-orange-50 transition"
                >
                  <td className="px-6 py-3 font-medium text-gray-700">
                    {idx + 1}
                  </td>
                  <td className="px-6 py-3 text-gray-800 font-semibold">
                    {vol.name}
                  </td>
                  <td className="px-6 py-3 text-gray-600">{vol.email}</td>
                  <td className="px-6 py-3 text-gray-600">{vol.phone}</td>
                  <td className="px-6 py-3 text-orange-600 font-medium">
                    {vol.joinedOn}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Back button at bottom */}
      <div className="mt-8 text-center">
        <button
          onClick={goBack}
          className="px-6 py-3 bg-orange-500 text-white text-lg font-semibold rounded-xl shadow-md hover:bg-orange-600 transition"
        >
          ← Back to Registered NGOs
        </button>
      </div>
    </div>
  );
}
