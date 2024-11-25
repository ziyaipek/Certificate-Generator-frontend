import React, { useState, useEffect } from 'react';

const CertificateViewer = ({ certificateId }) => {
  const [pdfUrl, setPdfUrl] = useState('');

  useEffect(() => {
    if (certificateId) {
      const fetchCertificate = async () => {
        try {
          const response = await fetch(`http://localhost:8000/certificate/${certificateId}`);
          if (response.ok) {
            // PDF dosyasını Blob olarak al
            const pdfBlob = await response.blob();
            const pdfUrl = URL.createObjectURL(pdfBlob); // PDF dosyasının URL'sini oluştur
            setPdfUrl(pdfUrl);
          } else {
            alert("Sertifika bulunamadı!");
          }
        } catch (error) {
          console.error('Error fetching certificate:', error);
          alert("Bir hata oluştu.");
        }
      };

      fetchCertificate();
    }
  }, [certificateId]); // certificateId değiştiğinde bu effect çalışacak

  return (
    <div className="mt-10 max-w-md mx-auto">
      <h2 className="text-white text-lg text-center font-bold mb-4">Your Generated Certificate</h2>
      {pdfUrl ? (
        <embed
          src={pdfUrl}
          type="application/pdf"
          width="100%"
          height="650px"
          className="border border-[#66FFCC] rounded-md mx-auto mt-4"
        />
      ) : (
        <p>PDF yükleniyor...</p>
      )}
    </div>
  );
};

export default CertificateViewer;
