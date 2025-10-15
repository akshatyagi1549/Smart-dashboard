import { User, Mail, Phone } from "lucide-react";
import React from "react";

interface NGODetailsPageProps {
  id: string;
}

const ngos = [
  {
    id: 1,
    name: "Empower Women Initiative",
    city: "Bangalore",
    registeredOn: "2025-09-25",
    contact: "Priya Sharma",
    email: "contact@bhagyafoundation.org",
    phone: "+91 9876543210",
    focusAreas: ["Education", "Women Empowerment"],
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-DwzAfyiO74EpS2Xz32tB2iQORYIbGtUr-w&s"
  },
  {
    id: 2,
    name: "Green Future Trust",
    city: "Hyderabad",
    registeredOn: "2025-09-20",
    contact: "Ravi Kumar",
    email: "info@greenfuture.org",
    phone: "+91 9123456780",
    focusAreas: ["Environment", "Healthcare"],
    logo: "https://media.istockphoto.com/id/1022892932/photo/hand-holding-light-bulb-against-nature-on-green-leaf-with-icons-energy-sources-for-renewable.jpg?s=612x612&w=0&k=20&c=Z8Zwgtv5o2-umMAnMn_5H-ZE62GMSUzf7zG-gHE_3UM="
  },
  {
    id: 3,
    name: "Health Care NGO",
    city: "Chennai",
    registeredOn: "2025-08-15",
    contact: "Anita Rao",
    email: "healthfirst@ngo.org",
    phone: "+91 9988776655",
    focusAreas: ["Healthcare", "Child Welfare"],
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRi1SxsFonnzf1zi1MZQFoCGHCBkB-Ze3Saw&s"
  },
  { 
    id: 4, 
    name: "EduCare Society", 
    city: "Delhi", 
    registeredOn: "2025-07-10", 
    contact: "Rajiv Malhotra",
    email: "educare@ngo.org",
    phone: "+91 9876501234",
    focusAreas: ["Education", "Skill Development"],
    logo: "https://www.visiongroup.in/images/gallery/img-8.jpg" 
  },
];

export function NGODetailsPage({ id }: NGODetailsPageProps) {
  const ngo = ngos.find((n) => n.id === Number(id));

  if (!ngo) {
    return <p className="p-8 text-gray-600">NGO not found</p>;
  }

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-orange-50 to-white flex flex-col">
      {/* NGO Card */}
      <div className="bg-gradient-to-br from-white to-orange-50 shadow-lg rounded-2xl p-8 max-w-3xl mx-auto hover:shadow-2xl transition flex-1">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
          <img
            src={ngo.logo}
            alt={ngo.name}
            className="w-32 h-32 rounded-full border-2 border-orange-500 shadow-md"
          />
          <div>
            <h1 className="text-3xl font-bold text-orange-600">{ngo.name}</h1>
            <p className="text-gray-600 mt-1 flex items-center gap-2">📍 {ngo.city}</p>
            <p className="text-gray-600 flex items-center gap-2">🗓 Registered On: {ngo.registeredOn}</p>
          </div>
        </div>

        <hr className="border-gray-200 my-6" />

        {/* Contact Info */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-orange-600 mb-3">Contact Information</h2>
          <div className="flex flex-col gap-2">
            <p className="flex items-center gap-2 text-gray-700">
              <User className="w-5 h-5 text-orange-500" /> {ngo.contact}
            </p>
            <p className="flex items-center gap-2 text-gray-700">
              <Mail className="w-5 h-5 text-orange-500" /> {ngo.email}
            </p>
            <p className="flex items-center gap-2 text-gray-700">
              <Phone className="w-5 h-5 text-orange-500" /> {ngo.phone}
            </p>
          </div>
        </div>

        {/* Focus Areas */}
        <div>
          <h2 className="text-xl font-semibold text-orange-600 mb-3">Focus Areas</h2>
          <div className="flex flex-wrap gap-3">
            {ngo.focusAreas.map((area, index) => (
              <span
                key={index}
                className="px-4 py-1 bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 rounded-full text-sm font-medium shadow-sm transform transition hover:scale-110"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Back Button at Bottom */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => window.history.back()}
          className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition flex items-center gap-2"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}
