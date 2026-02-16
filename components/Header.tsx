
import React from 'react';
import { Link } from 'react-router-dom';
import { DOCTOR_INFO } from '../types';

const Header: React.FC = () => {
  const govtLogoUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Government_Seal_of_Bangladesh.svg/1024px-Government_Seal_of_Bangladesh.svg.png";
  const doctorImageUrl = "/pictures/rabbi.jpg";

  return (
    <header className="bg-blue-700 text-white shadow-lg no-print">
      <nav className="container mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center">
        <Link to="/" className="flex items-center space-x-4 mb-4 md:mb-0 group">
          {/* Logo Group */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            {/* Govt Logo */}
            <div className="h-10 w-10 rounded-full bg-white p-1 flex items-center justify-center shadow-md border border-blue-600">
              <img 
                src={govtLogoUrl}
                alt="BD Govt Logo"
                className="h-full w-full object-contain"
              />
            </div>
            
          </div>
          
          <div className="flex flex-col border-l border-white/20 pl-4">
            <span className="text-xl font-bold tracking-tight leading-tight">{DOCTOR_INFO.name}</span>
            <span className="text-[10px] uppercase tracking-widest opacity-90 font-bold flex items-center mt-0.5">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5 animate-pulse"></span>
              {DOCTOR_INFO.hospital}
            </span>
          </div>
        </Link>
        
        <div className="flex items-center space-x-5 text-sm md:text-base font-medium">
          <Link to="/" className="hover:text-blue-200 transition-colors">হোম</Link>
          <Link to="/find-slip" className="hover:text-blue-200 transition-colors">স্লিপ খুঁজুন</Link>
          <Link to="/book" className="hover:text-blue-200 transition-colors font-bold bg-white/10 px-4 py-2 rounded-lg">সিরিয়াল নিন</Link>
          <Link to="/admin" className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500 transition-all text-xs font-bold uppercase tracking-wider flex items-center">
            <i className="fa-solid fa-lock mr-2"></i>অ্যাডমিন
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
