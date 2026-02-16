
import React from 'react';
import { Link } from 'react-router-dom';
import { DOCTOR_INFO } from '../types';

const Home: React.FC = () => {
  // Using the absolute path from the public folder
  const doctorImageUrl = "/pictures/rabbi2.jpg";

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-blue-50">
        <div className="md:w-2/5 relative bg-blue-50">
          <img
            src={doctorImageUrl}
            alt={DOCTOR_INFO.name}
            className="w-full h-full object-cover min-h-[450px] object-top scale-105 transition-transform duration-700 hover:scale-100"
            onError={(e) => {
              // Fallback image if the primary URL fails
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=1000";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6 text-white no-print">
            <div className="flex items-center space-x-2 bg-blue-600/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20">
              <i className="fa-solid fa-user-check text-green-400"></i>
              <span className="text-xs font-bold uppercase tracking-wider">BMDC Registered</span>
            </div>
          </div>
        </div>
        <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center bg-white">
          <div className="inline-block bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-bold mb-6">
             ডাক্তার
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4 leading-tight">
            {DOCTOR_INFO.name}
          </h1>
          <h2 className="text-xl font-semibold text-blue-700 mb-2">
            {DOCTOR_INFO.title2}
          </h2>
          <p className="text-gray-600 text-lg mb-6 italic">
            {DOCTOR_INFO.degrees}
          </p>
          <div className="space-y-4 mb-8">
            <div className="flex items-start space-x-3 text-gray-700 group">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <i className="fa-solid fa-hospital"></i>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">হাসপাতাল</p>
                <p className="font-medium">{DOCTOR_INFO.hospital}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 text-gray-700 group">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">চেম্বার</p>
                <p className="font-medium">{DOCTOR_INFO.chember}</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link 
              to="/book" 
              className="sm:col-span-2 bg-blue-700 text-white px-8 py-4 rounded-xl text-center font-bold text-lg hover:bg-blue-800 transition-all shadow-lg hover:scale-[1.01] active:scale-95 flex items-center justify-center mb-1"
            >
              <i className="fa-solid fa-calendar-check mr-2"></i> অ্যাপোয়েন্টমেন্ট নিন
            </Link>
            
            <a 
              href="tel:+8801725675580" 
              className="border-2 border-blue-700 text-blue-700 px-4 py-3 rounded-xl text-center font-bold text-base hover:bg-blue-50 transition-all flex items-center justify-center group"
            >
              <i className="fa-solid fa-phone-volume mr-2 group-hover:animate-bounce"></i> সরাসরি কল করুন
            </a>
            
            <a 
              href="https://wa.me/8801773293989" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-4 py-3 rounded-xl text-center font-bold text-base hover:bg-green-700 transition-all shadow-md flex items-center justify-center group"
            >
              <i className="fa-brands fa-whatsapp mr-2 text-xl group-hover:scale-110 transition-transform"></i> হোয়াটসঅ্যাপ মেসেজ
            </a>
          </div>
        </div>
      </section>

      {/* Services Section - 3 divs horizontal flex/grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all border-t-4 border-blue-500 group hover:-translate-y-1 flex flex-col h-full">
          <div className="bg-blue-50 w-14 h-14 rounded-xl flex items-center justify-center text-blue-600 text-2xl mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <i className="fa-solid fa-user-nurse"></i>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">অনলাইন চিকিৎসা পরামর্শ সেবা</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            ভিডিও কলে চিকিৎসা সেবা আপনাকে ঘরে বসেই সরাসরি চিকিৎসকের সাথে কথা বলার সুযোগ। মোবাইল বা কম্পিউটার ব্যবহার করে নিরাপদ ভিডিও কলে আপনি আপনার স্বাস্থ্য সমস্যার বিস্তারিত জানাতে পারবেন এবং তাৎক্ষণিক চিকিৎসা পরামর্শ গ্রহণ করতে পারবেন। রোগীর সমস্যা শুনে আধুনিক চিকিৎসা পদ্ধতি ও সঠিক গাইডেন্স প্রদান।
          </p>
        </div>

        {/* Card 2 - New Content with Bullet Points */}
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all border-t-4 border-blue-500 group hover:-translate-y-1 flex flex-col h-full">
          <div className="bg-blue-50 w-14 h-14 rounded-xl flex items-center justify-center text-blue-600 text-2xl mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <i className="fa-solid fa-kit-medical"></i>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">যা যা চিকিৎসা পাবেন</h3>
          <ul className="space-y-2 text-gray-600 text-[13px] leading-snug">
            <li className="flex items-start">
              <i className="fa-solid fa-circle-check text-blue-500 mt-1 mr-2 flex-shrink-0"></i>
              <span>হাড় ভাঙা, আর্থ্রাইটিস, হাড়ের বিকৃতি, জয়েন্ট, পেশি, লিগামেন্ট  সমস্যা।  ।</span>
            </li>
            <li className="flex items-start">
              <i className="fa-solid fa-circle-check text-blue-500 mt-1 mr-2 flex-shrink-0"></i>
              <span>দীর্ঘস্থায়ী বা তীব্র ব্যথা নিরাময়ে বিশেষজ্ঞ। যেমন: মেরুদণ্ডের ব্যথা, ন্যূরোপ্যাথিক ব্যথা, রিউমাটিক ব্যথা।</span>
            </li>
            <li className="flex items-start">
              <i className="fa-solid fa-circle-check text-blue-500 mt-1 mr-2 flex-shrink-0"></i>
              <span> গাড়ি দুর্ঘটনা, পড়া, ঘর্ষণে হাড় বা অঙ্গপ্রত্যঙ্গের আঘাত।</span>
            </li>
            <li className="flex items-start">
              <i className="fa-solid fa-circle-check text-blue-500 mt-1 mr-2 flex-shrink-0"></i>
              <span>অঙ্গপ্রত্যঙ্গ বা শারীরিক কার্যক্ষমতা হারানো রোগীর পুনর্বাসন।</span>
            </li>
            <li className="flex items-start">
              <i className="fa-solid fa-circle-check text-blue-500 mt-1 mr-2 flex-shrink-0"></i>
              <span>অভ্যন্তরীণ অঙ্গ-প্রত্যঙ্গ ও সাধারণ রোগের সার্জারি। যেমন: পিত্তথলি, appendix অপারেশন, hernia সার্জারি।</span>
            </li>
          </ul>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all border-t-4 border-blue-500 group hover:-translate-y-1 flex flex-col h-full">
          <div className="bg-blue-50 w-14 h-14 rounded-xl flex items-center justify-center text-blue-600 text-2xl mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <i className="fa-solid fa-truck-medical"></i>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">জরুরি সেবা [On-Demand Doctor at Home]</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            বয়স্ক ব্যক্তি, শিশু এবং যারা দীর্ঘমেয়াদী রোগে ভুগছেন, যেকোনো স্বাস্থ্যগত প্রয়োজনে দ্রুত জরুরি পরামর্শ দিতে নির্ধারিত সময়ে ডাক্তার আপনার বাসায় পৌঁছে যাবেন।
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
