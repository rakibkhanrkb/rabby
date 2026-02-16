
import React from 'react';
import { Link } from 'react-router-dom';
import { DOCTOR_INFO } from '../types';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 no-print mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Doctor Branding Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-black text-white border-b-2 border-blue-500 pb-2 inline-block">
              {DOCTOR_INFO.name}
            </h3>
            <p className="text-sm font-medium leading-relaxed opacity-80">
              {DOCTOR_INFO.title2}
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="https://wa.me/8801773293989" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all">
                <i className="fa-brands fa-whatsapp"></i>
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white uppercase tracking-wider">দ্রুত লিঙ্ক</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors flex items-center">
                  <i className="fa-solid fa-chevron-right text-[10px] mr-2 text-blue-500"></i>
                  হোম
                </Link>
              </li>
              <li>
                <Link to="/book" className="hover:text-blue-400 transition-colors flex items-center">
                  <i className="fa-solid fa-chevron-right text-[10px] mr-2 text-blue-500"></i>
                  সিরিয়াল বুকিং
                </Link>
              </li>
              <li>
                <Link to="/find-slip" className="hover:text-blue-400 transition-colors flex items-center">
                  <i className="fa-solid fa-chevron-right text-[10px] mr-2 text-blue-500"></i>
                  স্লিপ ডাউনলোড
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-blue-400 transition-colors flex items-center">
                  <i className="fa-solid fa-chevron-right text-[10px] mr-2 text-blue-500"></i>
                  অ্যাডমিন লগইন
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white uppercase tracking-wider">যোগাযোগ</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <i className="fa-solid fa-location-dot mt-1 mr-3 text-blue-500"></i>
                <p className="text-sm leading-relaxed">
                  <span className="font-bold text-white block">চেম্বার:</span>
                  {DOCTOR_INFO.chember}
                </p>
              </div>
              <div className="flex items-center">
                <i className="fa-solid fa-phone mt-0.5 mr-3 text-blue-500"></i>
                <p className="text-sm">
                  <span className="font-bold text-white mr-1">কল করুন:</span> 
                  <a href="tel:01747207720" className="hover:text-white transition-colors">01747207720</a>
                </p>
              </div>
              <div className="flex items-center">
                <i className="fa-brands fa-whatsapp mt-0.5 mr-3 text-green-500"></i>
                <p className="text-sm">
                  <span className="font-bold text-white mr-1">হোয়াটসঅ্যাপ:</span> 
                  <a href="https://wa.me/8801773293989" className="hover:text-white transition-colors">01773293989</a>
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="border-t border-slate-800 pt-8 mt-4 flex flex-col md:flex-row justify-between items-center text-sm opacity-60">
          <p>© ২০২৬ ডাঃ মোঃ গোলাম রাব্বি খান। সকল অধিকার সংরক্ষিত।</p>
          <p className="mt-2 md:mt-0 flex items-center">
            Managed with <i className="fa-solid fa-heart text-red-500 mx-1"></i> For Patients Care
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
