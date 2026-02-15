
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dbService } from '../firebase';

const Booking: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState('');
  const [ageError, setAgeError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    age: '',
    date: new Date().toISOString().split('T')[0]
  });
  const navigate = useNavigate();

  // Validate Name: Only English letters, Bengali characters and spaces allowed
  const validateName = (name: string) => {
    const regex = /^[a-zA-Z\s\u0980-\u09FF]+$/;
    if (name === '') return true;
    return regex.test(name);
  };

  // Validate Age: Only numbers 1 to 100
  const validateAge = (age: string) => {
    if (age === '') return true;
    const ageNum = parseInt(age);
    return !isNaN(ageNum) && ageNum >= 1 && ageNum <= 100;
  };

  // Validate Phone: Exactly 11 digits
  const validatePhone = (phone: string) => {
    if (phone === '') return true;
    return phone.length === 11 && /^\d+$/.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Final validations before submission
    if (!validateName(formData.patientName)) {
      setNameError('নামে শুধুমাত্র অক্ষর (বাংলা বা ইংরেজি) ব্যবহার করুন। সংখ্যা অনুমোদিত নয়।');
      return;
    }

    if (!validateAge(formData.age)) {
      setAgeError('বয়স ১ থেকে ১০০ এর মধ্যে হতে হবে।');
      return;
    }

    if (formData.phone.length !== 11) {
      setPhoneError('মোবাইল নম্বর অবশ্যই ১১ ডিজিটের হতে হবে।');
      return;
    }

    if (!formData.patientName || !formData.phone || !formData.age) {
      alert("দয়া করে সব তথ্য পূরণ করুন।");
      return;
    }

    setLoading(true);
    try {
      const result = await dbService.addAppointment(formData);
      navigate(`/success/${result.id}`);
    } catch (error) {
      console.error(error);
      alert("দুঃখিত, কোনো ত্রুটি হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'patientName') {
      if (validateName(value)) {
        setNameError('');
      } else {
        setNameError('নামে সংখ্যা ব্যবহার করা যাবে না।');
      }
      setFormData({ ...formData, [name]: value });
    }

    else if (name === 'age') {
      const sanitizedValue = value.replace(/\D/g, '');
      if (sanitizedValue !== '' && (parseInt(sanitizedValue) < 1 || parseInt(sanitizedValue) > 100)) {
        setAgeError('বয়স ১ থেকে ১০০ এর মধ্যে হতে হবে।');
      } else {
        setAgeError('');
      }
      setFormData({ ...formData, [name]: sanitizedValue });
    }

    else if (name === 'phone') {
      const sanitizedValue = value.replace(/\D/g, '');
      // Limit to 11 characters
      const truncatedValue = sanitizedValue.slice(0, 11);
      
      if (truncatedValue.length > 0 && truncatedValue.length < 11) {
        setPhoneError('মোবাইল নম্বর ১১ ডিজিটের হতে হবে।');
      } else {
        setPhoneError('');
      }
      setFormData({ ...formData, [name]: truncatedValue });
    }

    else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
      <div className="bg-blue-700 p-8 text-white text-center">
        <h2 className="text-3xl font-bold mb-2">অ্যাপোয়েন্টমেন্ট ফর্ম</h2>
        <p className="opacity-90">সঠিক তথ্য দিয়ে নিচের ফরমটি পূরণ করুন</p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="patientName">রোগীর নাম</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <i className="fa-solid fa-user"></i>
            </span>
            <input
              type="text"
              name="patientName"
              id="patientName"
              value={formData.patientName}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-3 rounded-xl border ${nameError ? 'border-red-500 ring-1 ring-red-200' : 'border-gray-300 focus:ring-2 focus:ring-blue-500'} focus:border-blue-500 outline-none transition-all`}
              placeholder="আপনার পূর্ণ নাম লিখুন (যেমন: মোঃ করিম)"
              required
            />
          </div>
          {nameError && <p className="text-red-500 text-xs mt-1 font-medium">{nameError}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">মোবাইল নম্বর (১১ ডিজিট)</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <i className="fa-solid fa-phone"></i>
              </span>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                maxLength={11}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border ${phoneError ? 'border-red-500 ring-1 ring-red-200' : 'border-gray-300 focus:ring-2 focus:ring-blue-500'} focus:border-blue-500 outline-none transition-all`}
                placeholder="01XXXXXXXXX"
                required
              />
            </div>
            {phoneError && <p className="text-red-500 text-xs mt-1 font-medium">{phoneError}</p>}
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="age">বয়স (১-১০০)</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <i className="fa-solid fa-calendar-check"></i>
              </span>
              <input
                type="text"
                inputMode="numeric"
                name="age"
                id="age"
                value={formData.age}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border ${ageError ? 'border-red-500 ring-1 ring-red-200' : 'border-gray-300 focus:ring-2 focus:ring-blue-500'} focus:border-blue-500 outline-none transition-all`}
                placeholder="বয়স দিন"
                required
              />
            </div>
            {ageError && <p className="text-red-500 text-xs mt-1 font-medium">{ageError}</p>}
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="date">সাক্ষাতের তারিখ</label>
          <input
            type="date"
            name="date"
            id="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading || !!nameError || !!ageError || (formData.phone.length !== 11 && formData.phone.length > 0)}
          className={`w-full py-4 rounded-xl text-white font-bold text-lg transition-all shadow-lg ${
            (loading || !!nameError || !!ageError || (formData.phone.length !== 11 && formData.phone.length > 0)) ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-800 hover:scale-[1.02] active:scale-95'
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <i className="fa-solid fa-circle-notch fa-spin mr-2"></i>প্রসেসিং হচ্ছে...
            </span>
          ) : (
            'রেজিস্ট্রেশন সম্পন্ন করুন'
          )}
        </button>
      </form>
    </div>
  );
};

export default Booking;
