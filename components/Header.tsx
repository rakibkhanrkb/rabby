
import React from 'react';
import { Link } from 'react-router-dom';
import { DOCTOR_INFO } from '../types';

const Header: React.FC = () => {
  const govtLogoUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Government_Seal_of_Bangladesh.svg/1024px-Government_Seal_of_Bangladesh.svg.png";

  return (
    <header className="bg-blue-700 text-white shadow-lg no-print">
      <nav className="container mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center">
        <Link to="/" className="flex items-center space-x-4 mb-4 md:mb-0 group">
          <div className="relative">
            <div className="h-14 w-14 rounded-full bg-white p-1 flex items-center justify-center shadow-md transition-transform group-hover:scale-105">
              <img 
                src={govtLogoUrl}
                alt="Bangladesh Govt Logo"
                className="h-full w-full object-contain"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight leading-none">{DOCTOR_INFO.name}</span>
            <span className="text-[10px] uppercase tracking-widest opacity-90 font-bold mt-1.5 flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              {DOCTOR_INFO.hospital}
            </span>
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
