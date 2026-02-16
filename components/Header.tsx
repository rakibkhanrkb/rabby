
import React from 'react';
import { Link } from 'react-router-dom';
import { DOCTOR_INFO } from '../types';

const Header: React.FC = () => {
  const govtLogoUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Government_Seal_of_Bangladesh.svg/1024px-Government_Seal_of_Bangladesh.svg.png";
  const doctorImageUrl = "/pictures/rabbi.jpg";

  return (
    <header className="bg-blue-700 text-white shadow-lg no-print sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center">
        <Link to="/" className="flex items-center space-x-4 mb-4 md:mb-0 group">
          {/* Vertical Logo Group */}
          <div className="flex flex-col items-center justify-center space-y-1 flex-shrink-0">
            {/* Govt Logo (Top) */}
            <div className="h-6 w-6 rounded-full bg-white p-0.5 flex items-center justify-center shadow-sm z-10">
              <img 
                src={govtLogoUrl}
                alt="BD Govt Logo"
                className="h-full w-full object-contain"
              />
            </div>
            {/* Doctor Portrait (Bottom) */}
            <div className="h-12 w-12 md:h-14 md:w-14 rounded-full bg-blue-50 overflow-hidden border-2 border-white shadow-md transition-transform group-hover:scale-105">
              <img 
                src={doctorImageUrl}
                alt={DOCTOR_INFO.name}
                className="h-full w-full object-cover object-top"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://ui-avatars.com/api/?name=Dr+Rabbi&background=EBF4FF&color=1D4ED8`;
                }}
              />
            </div>
          </div>
          
          {/* Modern Info Block */}
          <div className="flex flex-col border-l-2 border-white/20 pl-4 space-y-0.5">
            <h1 className="text-xl md:text-2xl font-black tracking-tight leading-none text-white drop-shadow-sm">
              {DOCTOR_INFO.name}
            </h1>
            
            <div className="flex items-center space-x-2">
              <span className="bg-white/10 backdrop-blur-sm text-[10px] md:text-xs font-bold px-2 py-0.5 rounded border border-white/20 uppercase tracking-wide">
                {DOCTOR_INFO.title}
              </span>
              <div className="h-3 w-px bg-white/20 hidden md:block"></div>
              <span className="hidden md:flex items-center text-[10px] font-semibold text-blue-100 opacity-80">
                <i className="fa-solid fa-user-doctor mr-1"></i>
                বিশেষজ্ঞ চিকিৎসক
              </span>
            </div>

            <div className="flex items-center text-[10px] md:text-[11px] font-bold text-green-300 mt-1 uppercase tracking-wider">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <i className="fa-solid fa-hospital-user mr-1.5 opacity-70"></i>
              {DOCTOR_INFO.hospital}
            </div>
          </div>
        </Link>
        
        {/* Navigation Links */}
        <div className="flex items-center space-x-4 md:space-x-6 text-sm md:text-base font-medium">
          <Link to="/" className="hover:text-blue-200 transition-colors py-2">হোম</Link>
          <Link to="/find-slip" className="hover:text-blue-200 transition-colors py-2">স্লিপ</Link>
          <Link to="/book" className="bg-white text-blue-700 px-4 py-2 rounded-xl font-extrabold hover:bg-blue-50 transition-all shadow-md active:scale-95">
            সিরিয়াল নিন
          </Link>
          <Link to="/admin" className="bg-blue-800/50 p-2 rounded-lg hover:bg-blue-600 transition-all group" title="Admin Login">
            <i className="fa-solid fa-shield-halved group-hover:rotate-12 transition-transform"></i>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
