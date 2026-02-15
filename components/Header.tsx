
import React from 'react';
import { Link } from 'react-router-dom';
import { DOCTOR_INFO } from '../types';

const Header: React.FC = () => {
  const doctorImageUrl = "https://raw.githubusercontent.com/mdgolamrabbi/doctor-app/main/doctor.jpg";

  return (
    <header className="bg-blue-700 text-white shadow-lg no-print">
      <nav className="container mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center">
        <Link to="/" className="flex items-center space-x-3 mb-4 md:mb-0 group">
          <div className="relative">
            <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-white shadow-inner bg-white flex items-center justify-center transition-transform group-hover:scale-105">
              <img 
                src={doctorImageUrl}
                alt={DOCTOR_INFO.name}
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.target as any).style.display = 'none';
                  (e.target as any).nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden h-full w-full items-center justify-center text-blue-700">
                <i className="fa-solid fa-user-doctor text-xl"></i>
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-blue-700 shadow-sm"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight leading-none">{DOCTOR_INFO.name}</span>
            <span className="text-[10px] uppercase tracking-widest opacity-80 font-medium mt-1">Specialist Consultant</span>
          </div>
        </Link>
        <div className="flex items-center space-x-6 text-sm md:text-base font-medium">
          <Link to="/" className="hover:text-blue-200 transition-colors">হোম</Link>
          <Link to="/find-slip" className="hover:text-blue-200 transition-colors">স্লিপ খুঁজুন</Link>
          <Link to="/book" className="hover:text-blue-200 transition-colors font-bold">সিরিয়াল নিন</Link>
          <Link to="/admin" className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500 transition-all text-xs font-bold uppercase tracking-wider flex items-center">
            <i className="fa-solid fa-lock mr-2"></i>অ্যাডমিন
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
