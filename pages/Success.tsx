
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { dbService } from '../firebase';
import { Appointment, DOCTOR_INFO } from '../types';

const Success: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    if (id) {
      dbService.getAppointmentById(id).then(data => {
        if (data) setAppointment(data);
      });
    }
  }, [id]);

  const handlePrint = () => {
    if (!appointment || isPrinting) return;
    
    setIsPrinting(true);
    const originalTitle = document.title;
    const fileName = `Appointment_Slip_${appointment.serialNumber}_${appointment.patientName.replace(/\s+/g, '_')}`;
    document.title = fileName;

    // Small delay to allow title change and UI update
    setTimeout(() => {
      window.print();
      
      // Restore state after print dialog is closed (or cancelled)
      setTimeout(() => {
        document.title = originalTitle;
        setIsPrinting(false);
      }, 1000);
    }, 250);
  };

  if (!appointment) {
    return (
      <div className="text-center py-20">
        <i className="fa-solid fa-circle-notch fa-spin text-4xl text-blue-600 mb-4"></i>
        <p className="text-xl">লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Non-print confirmation UI */}
      <div className="no-print bg-green-50 border border-green-200 p-6 rounded-2xl mb-8 flex items-center">
        <div className="bg-green-500 text-white p-4 rounded-full mr-4">
          <i className="fa-solid fa-check text-2xl"></i>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-green-800">সফলভাবে বুকিং হয়েছে!</h2>
          <p className="text-green-700">নিচের স্লিপটি PDF হিসেবে সেভ করুন অথবা স্ক্রিনশট নিন।</p>
        </div>
      </div>

      <div className="no-print mb-6 flex flex-col sm:flex-row justify-center gap-4">
        <button 
          onClick={handlePrint}
          disabled={isPrinting}
          className={`${isPrinting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-800'} text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center transition-all shadow-md active:scale-95`}
        >
          <i className={`fa-solid ${isPrinting ? 'fa-circle-notch fa-spin' : 'fa-file-pdf'} mr-2`}></i> 
          {isPrinting ? 'প্রস্তুত হচ্ছে...' : 'PDF ডাউনলোড / প্রিন্ট'}
        </button>
        <Link 
          to="/" 
          className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold flex items-center justify-center hover:bg-gray-300 transition-all"
        >
          হোমে ফিরে যান
        </Link>
      </div>

      {/* Appointment Slip (Optimized for Printing) */}
      <div id="printable-slip" className="bg-white border-2 border-dashed border-gray-300 p-8 rounded-lg shadow-sm print:border-solid print:shadow-none print:p-4">
        {/* Header (Doctor Info) */}
        <div className="text-center border-b pb-6 mb-6">
          <h3 className="text-2xl font-extrabold text-blue-900 mb-1">{DOCTOR_INFO.name}</h3>
          <p className="font-bold text-blue-700">{DOCTOR_INFO.title}</p>
          <p className="text-sm text-gray-600 mb-2">{DOCTOR_INFO.degrees}</p>
          <p className="text-xs text-gray-500">{DOCTOR_INFO.hospital}, {DOCTOR_INFO.location}</p>
        </div>

        {/* Big Serial Number */}
        <div className="text-center mb-8">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">আপনার সিরিয়াল নম্বর</p>
          <div className="text-7xl font-black text-blue-700">
            {appointment.serialNumber < 10 ? `০${appointment.serialNumber}` : appointment.serialNumber}
          </div>
        </div>

        {/* Patient Details */}
        <div className="space-y-4 bg-gray-50 p-6 rounded-xl border border-gray-100 print:bg-white print:border-gray-300">
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-gray-500">রোগীর নাম:</span>
            <span className="font-bold uppercase">{appointment.patientName}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-gray-500">মোবাইল:</span>
            <span className="font-bold">{appointment.phone}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-gray-500">বয়স:</span>
            <span className="font-bold">{appointment.age} বছর</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-gray-500">সাক্ষাতের তারিখ:</span>
            <span className="font-bold">{new Date(appointment.date).toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
        </div>

        <div className="mt-8 text-center text-[10px] text-gray-400">
          <p>স্লিপটি হাসপাতালে দেখান। সুস্থ থাকুন।</p>
          <p className="mt-1 italic">জেনারেট সময়: {appointment.timestamp ? new Date(appointment.timestamp).toLocaleString('bn-BD') : ''}</p>
        </div>
      </div>
    </div>
  );
};

export default Success;
