
import React, { useEffect, useState } from 'react';
import { dbService } from '../firebase';
import { Appointment, DOCTOR_INFO } from '../types';

const Admin: React.FC = () => {
  // Persistence: Initialize state from localStorage
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('isAdminLoggedIn') === 'true';
  });
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [filterDate, setFilterDate] = useState(new Date().toISOString().split('T')[0]);
  const govtLogoUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Government_Seal_of_Bangladesh.svg/1024px-Government_Seal_of_Bangladesh.svg.png";

  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'rabby89' && password === 'rabby89') {
      localStorage.setItem('isAdminLoggedIn', 'true');
      setIsLoggedIn(true);
    } else {
      alert("ভুল ইউজারনেম অথবা পাসওয়ার্ড!");
    }
  };

  const handleLogout = () => {
    if (window.confirm("আপনি কি নিশ্চিতভাবে লগআউট করতে চান?")) {
      localStorage.removeItem('isAdminLoggedIn');
      setIsLoggedIn(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    const data = await dbService.getAllAppointments();
    setAppointments(data);
    setLoading(false);
  };

  const handlePrint = () => {
    if (isPrinting) return;
    
    setIsPrinting(true);
    const originalTitle = document.title;
    document.title = `Patient_Report_${filterDate}`;
    
    setTimeout(() => {
      window.print();
      
      setTimeout(() => {
        document.title = originalTitle;
        setIsPrinting(false);
      }, 1000);
    }, 250);
  };

  // Get real appointments for the filtered date
  const realAppointments = appointments
    .filter(app => app.date === filterDate)
    .sort((a, b) => a.serialNumber - b.serialNumber);

  // Generate the display list including virtual "Reserved" entries for 01 and 02
  const displayAppointments = [
    { 
      id: 'reserved-01', 
      serialNumber: 1, 
      patientName: 'সংরক্ষিত (Reserved)', 
      phone: '----------', 
      age: '--', 
      date: filterDate, 
      timestamp: null, 
      status: 'completed' as const,
      isReserved: true 
    },
    { 
      id: 'reserved-02', 
      serialNumber: 2, 
      patientName: 'সংরক্ষিত (Reserved)', 
      phone: '----------', 
      age: '--', 
      date: filterDate, 
      timestamp: null, 
      status: 'completed' as const,
      isReserved: true 
    },
    ...realAppointments
  ];

  const todayCount = appointments.filter(app => app.date === new Date().toISOString().split('T')[0]).length;

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
        <div className="text-center mb-6">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 text-2xl">
            <i className="fa-solid fa-lock"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">অ্যাডমিন প্যানেল</h2>
          <p className="text-gray-500 text-sm">প্রবেশ করতে লগইন করুন</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold mb-1 text-sm">ইউজারনেম</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="rabby89"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-1 text-sm">পাসওয়ার্ড</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="••••••••"
              required
            />
          </div>
          <button className="w-full bg-blue-700 text-white py-4 rounded-xl font-bold hover:bg-blue-800 transition-all shadow-lg active:scale-95">
            লগইন করুন
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Top Header Controls - No Print */}
      <div className="flex justify-between items-center no-print bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-600 w-2 h-2 rounded-full animate-pulse"></div>
          <span className="text-sm font-bold text-gray-600 uppercase tracking-widest">Active Session</span>
        </div>
        <button 
          onClick={handleLogout}
          className="bg-red-50 text-red-600 px-4 py-2 rounded-xl font-bold text-sm hover:bg-red-600 hover:text-white transition-all flex items-center group shadow-sm border border-red-100"
        >
          <i className="fa-solid fa-power-off mr-2 group-hover:rotate-90 transition-transform"></i>
          লগআউট করুন
        </button>
      </div>

      {/* Stats Cards - No Print */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 no-print">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100 border-l-4 border-l-blue-600">
          <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">সর্বমোট রেজিস্ট্রেশন</p>
          <h3 className="text-4xl font-black text-blue-900 mt-2">{appointments.length} জন</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-green-100 border-l-4 border-l-green-600">
          <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">আজকের রেজিস্ট্রেশন</p>
          <h3 className="text-4xl font-black text-green-700 mt-2">{todayCount} জন</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-purple-100 border-l-4 border-l-purple-600">
          <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">রিপোর্ট জেনারেট</p>
          <button 
            onClick={handlePrint} 
            disabled={isPrinting}
            className={`mt-2 w-full text-white px-4 py-3 rounded-xl font-bold flex items-center justify-center transition-all shadow-md active:scale-95 ${isPrinting ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'}`}
          >
            <i className={`fa-solid ${isPrinting ? 'fa-circle-notch fa-spin' : 'fa-file-pdf'} mr-2`}></i> 
            {isPrinting ? 'প্রস্তুত হচ্ছে...' : 'PDF হিসেবে সেভ করুন'}
          </button>
        </div>
      </div>

      {/* Controls - No Print */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 bg-white p-6 rounded-2xl shadow-sm no-print border border-gray-100">
        <div className="w-full md:w-auto">
          <label className="block text-gray-700 font-bold mb-2 text-sm italic">তারিখ ভিত্তিক ফিল্টার</label>
          <input 
            type="date" 
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="w-full md:w-64 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div className="flex gap-2">
          <button 
            onClick={fetchData}
            className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors border border-gray-200"
          >
            <i className="fa-solid fa-rotate mr-2"></i> রিফ্রেশ লিস্ট
          </button>
        </div>
      </div>

      {/* Report View - Optimized for PDF */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 print:shadow-none print:border-none print:m-0">
        
        {/* PDF Header - Only visible during print */}
        <div className="hidden print:block p-8 border-b-4 border-blue-900 bg-blue-50/30">
          <div className="flex justify-between items-start">
            <div className="flex items-start space-x-6">
              <img src={govtLogoUrl} alt="Logo" className="h-20 w-20 object-contain" />
              <div>
                <h1 className="text-3xl font-black text-blue-900 leading-tight">{DOCTOR_INFO.name}</h1>
                <p className="text-xl font-bold text-blue-700 mt-1">{DOCTOR_INFO.title}</p>
                <p className="text-gray-700 font-medium">{DOCTOR_INFO.degrees}</p>
                <p className="text-gray-600 text-sm mt-1 font-bold">{DOCTOR_INFO.hospital}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-blue-900 text-white px-4 py-2 rounded-lg inline-block font-bold mb-2">
                রোগীর তালিকা রিপোর্ট
              </div>
              <p className="text-gray-800 font-bold text-lg">তারিখ: {new Date(filterDate).toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              <p className="text-gray-600 font-bold">মোট রোগী: {realAppointments.length} জন (+ ২ জন সংরক্ষিত)</p>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-10">
          <div className="flex justify-between items-center mb-6 no-print">
            <h4 className="text-xl font-bold text-gray-800 flex items-center tracking-tight">
              <i className="fa-solid fa-clipboard-list mr-3 text-blue-600"></i>
              {new Date(filterDate).toLocaleDateString('bn-BD')} তারিখের তালিকা (সিরিয়াল ০১-০২ সংরক্ষিত)
            </h4>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse print:text-[10pt]">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-gray-300 print:bg-gray-200">
                  <th className="px-6 py-4 font-black text-blue-900 border-r border-gray-200 w-20">ক্রমিক</th>
                  <th className="px-6 py-4 font-black text-blue-900 border-r border-gray-200">রোগীর নাম</th>
                  <th className="px-6 py-4 font-black text-blue-900 border-r border-gray-200">ফোন নম্বর</th>
                  <th className="px-6 py-4 font-black text-blue-900 border-r border-gray-200">স্থান</th>
                  <th className="px-6 py-4 font-black text-blue-900 border-r border-gray-200 text-center w-24">বয়স</th>
                  <th className="px-6 py-4 font-black text-blue-900 text-right w-40">রেজিস্ট্রেশন সময়</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {displayAppointments.map((app: any) => (
                  <tr key={app.id} className={`transition-colors print:hover:bg-white ${app.isReserved ? 'bg-orange-50/50 italic' : 'odd:bg-white even:bg-gray-50/30 hover:bg-blue-50'}`}>
                    <td className={`px-6 py-4 font-black border-r border-gray-200 ${app.isReserved ? 'text-orange-600' : 'text-blue-700'}`}>
                      {app.serialNumber < 10 ? `০${app.serialNumber}` : app.serialNumber}
                    </td>
                    <td className={`px-6 py-4 border-r border-gray-200 ${app.isReserved ? 'text-gray-400' : 'font-bold text-gray-800'}`}>
                      {app.patientName}
                    </td>
                    <td className={`px-6 py-4 border-r border-gray-200 font-mono font-medium ${app.isReserved ? 'text-gray-300' : 'text-gray-700'}`}>
                      {app.phone}
                    </td>
                    <td className={`px-6 py-4 border-r border-gray-200 text-sm ${app.isReserved ? 'text-gray-300' : 'font-bold text-blue-600'}`}>
                      {app.isReserved ? '--' : (app.location === 'Chamber' ? 'চেম্বার (দি লাইফ কেয়ার)' : 'হাসপাতাল (কাজিপুর স্বাস্থ্য কমপ্লেক্স)')}
                    </td>
                    <td className={`px-6 py-4 text-center border-r border-gray-200 ${app.isReserved ? 'text-gray-300' : 'text-gray-700'}`}>
                      {app.age} {app.age !== '--' ? 'বছর' : ''}
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs text-right font-medium">
                      {app.timestamp ? new Date(app.timestamp).toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }) : '--:--'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* PDF Footer - Only visible during print */}
        <div className="hidden print:block p-8 mt-4 bg-gray-50 border-t-2 border-gray-200">
          <div className="flex justify-between items-end">
            <div className="text-[10px] text-gray-400 max-w-xs">
              <p>এই রিপোর্টটি ডিজিটাল অ্যাপোয়েন্টমেন্ট সিস্টেম দ্বারা প্রস্তুতকৃত।</p>
              <p className="mt-1">জেনারেট সময়: {new Date().toLocaleString('bn-BD')}</p>
            </div>
            <div className="text-center border-t border-gray-400 pt-1 px-8 min-w-[150px]">
              <p className="font-bold text-gray-800 text-xs">কর্তৃপক্ষের স্বাক্ষর</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
