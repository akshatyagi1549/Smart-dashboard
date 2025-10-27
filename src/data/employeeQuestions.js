export const questions = [
  { id: "ngoName", text: "What is the name of your pello?", type: "text" },

  {
    id: "area",
    text: "Which area do you mainly work in?",
    type: "selectWithOther",
    multiSelect: true,
    options: ["Education", "Health", "Women Empowerment", "Environment", "Others"],
  },
  {
    id: "scale",
    text: "What is the scale of your work?",
    type: "select",
    multiSelect: true,
    options: ["Local", "Regional", "National", "International"],
  },
  {
    id: "size",
    text: "What is your NGO size?",
    type: "select",
    multiSelect: true,
    options: ["Small < ₹50 L", "Medium ₹50 L–₹5 Cr", "Large > ₹5 Cr budget"],
  },

  // Modules selection question (Q5)
  {
    id: "modules",
    text: "What are the Modules you want?",
    type: "select",
    multiSelect: true,
    options: [
      "Donor Management",
      "Financial Tracking",
      "Project Monitoring",
      "NGO Collaboration Hub",
      "Reports & Analytics",
    ],
  },

  // ✅ New Questions after Q5
  {
    id: "donorManagementFeatures",
    text: "What do you want in Donor Management page?",
    type: "select",
    multiSelect: true,
    options: ["Add Donor", "Recent Donations", "Top Donors", "Donation Trends"],
  },
  {
    id: "financialTrackingFeatures",
    text: "What do you want in Financial Tracking page?",
    type: "select",
    multiSelect: true,
    options: ["Add Expense", "Recent Transactions", "Expense Categories", "Financial Health"],
  },
  {
    id: "projectMonitoringFeatures",
    text: "What do you want in Project Monitoring page?",
    type: "select",
    multiSelect: true,
    options: ["Knowledge Hub", "Active Projects", "Project Health", "Impact Metrics"],
  },
];
