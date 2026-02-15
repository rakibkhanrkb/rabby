
export interface Appointment {
  id: string;
  patientName: string;
  phone: string;
  age: string;
  serialNumber: number;
  date: string;
  timestamp: any;
  status: 'pending' | 'completed';
}

export interface DoctorInfo {
  name: string;
  title: string;
  degrees: string;
  hospital: string;
  location: string;
}

export const DOCTOR_INFO: DoctorInfo = {
  name: "ডাঃ মোঃ গোলাম রাব্বি খান",
  title: "সহকারী সার্জন",
  degrees: "এমবিবিএস, এফসিপিএস (part-1), এমআরসিএস (part A)",
  hospital: "কাজিপুর উপজেলা স্বাস্থ্য কমপ্লেক্স",
  location: "সিরাজগঞ্জ"
};

// Fixed: Removed invalid ambient module declarations for images (*.jpg, *.jpeg, *.png, *.webp) 
// that were causing TypeScript errors. Such declarations must be in a non-module environment 
// (e.g., a .d.ts file without exports).
