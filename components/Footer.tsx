
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 border-t py-8 no-print">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-600 mb-2">© ২০২৬ ডাঃ মোঃ গোলাম রাব্বি খান। সকল অধিকার সংরক্ষিত।</p>
        <div className="flex justify-center space-x-4">
          <a href="#" className="text-gray-400 hover:text-blue-600"><i className="fa-brands fa-facebook"></i></a>
          <a href="#" className="text-gray-400 hover:text-blue-600"><i className="fa-brands fa-whatsapp"></i></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
