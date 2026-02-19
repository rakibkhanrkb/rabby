
export interface Appointment {
  id: string;
  patientName: string;
  phone: string;
  age: string;
  serialNumber: number;
  date: string;
  location: 'Chamber' | 'Hospital';
  timestamp: any;
  status: 'pending' | 'completed';
}

// Fixed: Added missing 'title2' and 'chember' properties to the DoctorInfo interface 
// to align with the properties used in the DOCTOR_INFO object.
export interface DoctorInfo {
  name: string;
  title: string;
  title2: string;
  degrees: string;
  hospital: string;
  location: string;
  chember: string;
}

export const DOCTOR_INFO: DoctorInfo = {
  name: "ডাঃ মোঃ গোলাম রাব্বি খান",
  title: "সহকারী সার্জন",
  title2: "হাড়জোড়, ব্যাথা, ট্রমা,পঙ্গু ও জেনারেল সার্জারি বিশেষজ্ঞ",
  degrees: "এমবিবিএস (রামেক),বিসিএস (স্বাস্থ্য), এফসিপিএস-এফপি(অর্থোপেডিক সার্জারি), এমআরসিএস-বি(এডিনবার্গ-ইউকে)",
  hospital: "কাজিপুর উপজেলা স্বাস্থ্য কমপ্লেক্স,সিরাজগঞ্জ",
  location: "সিরাজগঞ্জ",
  chember: "দি লাইফ কেয়ার ডায়াগনস্টিক সেন্টার,বিসিক মোড়, শিয়ালকোল,সিরাজগঞ্জ (শহীদ এম মনসুর আলী মেডিকেল কলেজ হাসপাতালের বিপরীতে)  "
};

// Fixed: Removed invalid ambient module declarations for images (*.jpg, *.jpeg, *.png, *.webp) 
// that were causing TypeScript errors. Such declarations must be in a non-module environment 
// (e.g., a .d.ts file without exports).
