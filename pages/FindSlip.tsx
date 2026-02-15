
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { dbService } from '../firebase';
import { Appointment } from '../types';

const FindSlip: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Appointment[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length !== 11) {
      alert("১১ ডিজিটের সঠিক মোবাইল নম্বর দিন।");
      return;
    }

    setLoading(true);
    try {
      const appointments = await dbService.getAppointmentsByPhone(phone);
      setResults(appointments);
      setHasSearched(true);
    } catch (error) {
      console.error(error);
      alert("সার্চ করার সময় একটি ত্রুটি হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 11);
    setPhone(val);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-blue-50 text-center">
        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 text-2xl">
          <i className="fa-solid fa-file-invoice"></i>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">অ্যাপোয়েন্টমেন্ট স্লিপ ডাউনলোড</h2>
        <p className="text-gray-500 mb-6">নিবন্ধন করার সময় ব্যবহৃত মোবাইল নম্বরটি দিয়ে সার্চ করুন</p>

        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
          <div className="flex-grow relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <i className="fa-solid fa-phone"></i>
            </span>
            <input
              type="tel"
              value={phone}
              onChange={handleChange}
              placeholder="01XXXXXXXXX"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading || phone.length !== 11}
            className={`px-8 py-3 rounded-xl font-bold text-white transition-all shadow-md active:scale-95 ${
              loading || phone.length !== 11 ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-800'
            }`}
          >
            {loading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : 'সার্চ করুন'}
          </button>
        </form>
      </div>

      {hasSearched && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-700 flex items-center">
            <i className="fa-solid fa-magnifying-glass mr-2 text-blue-600"></i>
            অনুসন্ধানের ফলাফল ({results.length})
          </h3>

          {results.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl text-center border border-dashed border-gray-300">
              <p className="text-gray-400 italic">এই মোবাইল নম্বরে কোনো অ্যাপোয়েন্টমেন্ট পাওয়া যায়নি।</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {results.map((app) => (
                <div key={app.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center hover:shadow-md transition-shadow">
                  <div className="text-center md:text-left mb-4 md:mb-0">
                    <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">স্লিপ নং: {app.id.slice(-6).toUpperCase()}</div>
                    <h4 className="text-xl font-bold text-gray-800">{app.patientName}</h4>
                    <p className="text-gray-500 text-sm">
                      তারিখ: {new Date(app.date).toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-[10px] text-gray-400 uppercase font-bold">সিরিয়াল</p>
                      <p className="text-3xl font-black text-blue-700">
                        {app.serialNumber < 10 ? `০${app.serialNumber}` : app.serialNumber}
                      </p>
                    </div>
                    <Link
                      to={`/success/${app.id}`}
                      className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition-all shadow-sm flex items-center"
                    >
                      <i className="fa-solid fa-download mr-2"></i> ডাউনলোড
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FindSlip;
