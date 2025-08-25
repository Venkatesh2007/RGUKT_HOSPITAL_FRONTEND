const MainPageHeaderContent = [
  {
    title: "Login",
    link: "/login",
  },
];

const DoctorsHeaderContent = [
  { title: "Home", link: "/doctor" },
  { title: "Others", link: "/doctor/others" },
  { title: "Profile", link: "/doctor/profile" },
  { title: "Logout", link: "/logout" },
];

const PharmacistsHeaderContent = [
  { title: "Home", link: "/pharmacist" },
  { title: "View-Medicines", link: "/pharmacist/view-medicines" },
  { title: "Add Medicine", link: "/pharmacist/add-medicines" },
  { title: "Profile", link: "/pharmacist/profile" },
  { title: "Logout", link: "/logout" },
];

const NursingHeaderContent = [
  { title: "Home", link: "/nurse" },
  { title: "Patient Details", link: "/nurse/patient-details" },
  { title: "Profile", link: "/nurse/profile" },
  { title: "Logout", link: "/logout" },
];

const AdminHeaderContent = [{ title: "Logout", link: "/logout" }];

const reasons = [
  "Fever",
  "Cold",
  "Cough",
  "Headache",
  "Stomach Ache",
  "Allergy",
  "Skin Rash",
  "Sore Throat",
  "Body Pain",
  "Ear Pain",
  "Toothache",
  "Back Pain",
  "Nausea",
  "Vomiting",
  "Diarrhea",
  "Constipation",
  "Indigestion",
  "Dizziness",
  "Fatigue",
  "Insomnia",
  "Anxiety",
  "Depression",
  "Joint Pain",
  "Muscle Cramps",
  "Sinusitis",
  "Conjunctivitis",
  "Asthma",
  "Bronchitis",
  "Chest Pain",
  "Palpitations",
  "Urinary Tract Infection",
  "Menstrual Cramps",
  "Acne",
  "Eczema",
  "Psoriasis",
  "Hay Fever",
  "Anemia",
  "Hypertension",
  "Hyperthyroidism",
  "Hypothyroidism",
  "Diabetes",
  "Migraine",
  "Irritable Bowel Syndrome",
  "Gout",
  "Arthritis",
  "Influenza",
  "Pneumonia",
  "Chickenpox",
  "Measles",
  "Mumps",
  "Hepatitis",
  "Tuberculosis",
  "Others",
];

export {
  DoctorsHeaderContent,
  PharmacistsHeaderContent,
  MainPageHeaderContent,
  AdminHeaderContent,
  NursingHeaderContent,
  reasons,
};
