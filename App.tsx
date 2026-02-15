
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Admin from './pages/Admin';
import Success from './pages/Success';
import FindSlip from './pages/FindSlip';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/find-slip" element={<FindSlip />} />
            <Route path="/book" element={<Booking />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/success/:id" element={<Success />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
