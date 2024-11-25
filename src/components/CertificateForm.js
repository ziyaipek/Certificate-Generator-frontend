import React, { useState } from "react";
import CertificateViewer from './CertificateViewer';

const CertificateForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    training_name: "",
    training_duration: "",
    training_date: "",
  });

  const [certificateId, setCertificateId] = useState(null); // Sertifika ID'sini tutacak state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Sayfanın yenilenmesini engelle
    try {
      const response = await fetch("http://127.0.0.1:8000/generate_certificate/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // JSON formatına çevir
      });

      if (response.ok) {
        const data = await response.json();
        alert("Sertifika başarıyla oluşturuldu!");

        // Backend'den dönen certificate_id'yi al
        setCertificateId(data.certificate_id);  // Sertifika ID'sini state'e kaydet
        console.log(data); // Sertifika bilgilerini konsola yazdır
      } else {
        alert("Bir hata oluştu!");
      }
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  return (
    <div>
      <form 
        onSubmit={handleSubmit}
        className="border border-[#66FFCC] shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 max-w-md mx-auto mt-20"
      >
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="shadow appearance-none border border-[#66FFCC] rounded-md w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-[#111111]"
          />
        </div>

        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="training_name">
            Training
          </label>
          <input
            type="text"
            name="training_name"
            placeholder="Training Name"
            value={formData.training_name}
            onChange={handleChange}
            required
            className="shadow appearance-none border border-[#66FFCC] rounded-md w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-[#111111]"
          />
        </div>

        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="training_duration">
            Duration
          </label>
          <input
            type="text"
            name="training_duration"
            placeholder="Training Duration"
            value={formData.training_duration}
            onChange={handleChange}
            required
            className="shadow appearance-none border border-[#66FFCC] rounded-md w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-[#111111]"
          />
        </div>

        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="training_date">
            Date
          </label>
          <input
            type="date"
            name="training_date"
            value={formData.training_date}
            onChange={handleChange}
            required
            className="shadow appearance-none border border-[#66FFCC] rounded-md w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-[#111111]"
          />
        </div>

        <div className="flex items-center justify-between">
          <button 
            type="submit"
            className="w-full p-3 bg-[#51d6aa] text-[#111111] font-bold rounded-md hover:bg-[#4CB794] focus:outline-none focus:shadow-outline"
          >
            Generate Certificate
          </button>
        </div>
        <style jsx="true">{`
          input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(1);
          }
          `}</style>
      </form>

      {/* Sertifika ID'si varsa, CertificateViewer component'ini render et */}
      {certificateId && <CertificateViewer certificateId={certificateId} />}
    </div>
  );
};

export default CertificateForm;
