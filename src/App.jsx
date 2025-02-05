import { useState } from 'react';
import Form from './components/Form';
import './App.css';
import Button from './components/Button';
import QRCode from './components/QRCode';
import { useEffect } from 'react';

const initialQrCode = {
  url: '',
  data: '',
  bgColor: 'fff',
  dimension: 400,
  loaded: false
}

function App() {
  const [qrCode, setQrCode] = useState(initialQrCode);

  const generateQr = (e) => {
    const { data, dimension, bgColor } = qrCode;
    e.preventDefault();
    setQrCode(prevQrCode => ({
      ...prevQrCode,
      url: `http://api.qrserver.com/v1/create-qr-code/?data=${data}&size=${dimension}x${dimension}&bgcolor=${bgColor}`
    }));
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'bgColor') {
      setQrCode(prevQrCode => ({
        ...prevQrCode,
        bgColor: value.substring(1)
      }));

    } else {
      setQrCode(prevQrCode => ({
        ...prevQrCode,
        [name]: value
      }));
    }
  }

  const handleQrOnLoad = () => {
    setQrCode(prevQrCode => ({
      ...prevQrCode,
      loaded: true
    }));
  };

  const handleDownload = async () => {
    try {
      const { data, dimension, bgColor } = qrCode;
      const url = `https://api.qrserver.com/v1/create-qr-code/?data=${data}&size=${dimension}x${dimension}&bgcolor=${bgColor}`;
      const response = await fetch(url);
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = `QrCode-${dimension}.png`;
      document.body.appendChild(link);

      link.click();
      link.remove();
      URL.revokeObjectURL(imageUrl);
    } catch (error) {
      console.error("Error downloading the QrCode:", error);
    }
  }

  useEffect(() => {
    if (qrCode.loaded) {
      setQrCode(prevQrCode => ({
        ...prevQrCode,
        url: `https://api.qrserver.com/v1/create-qr-code/?data=${qrCode.data}&size=${qrCode.dimension}x${qrCode.dimension}&bgcolor=${qrCode.bgColor}`
      }));
    }
  }, [qrCode.loaded, qrCode.bgColor, qrCode.dimension]);

  return (
    <>
      <h1 className="text-4xl font-bold mb-10">QRCode Generator</h1>
      <Form
        onGenerateQr={generateQr}
        onChange={handleChange}
      />
      <div className="flex flex-col items-center gap-y-5">
        <QRCode url={qrCode.url} onQrLoad={handleQrOnLoad} />
        {qrCode.loaded && (
          <Button onDownload={handleDownload}>Download</Button>
        )}
      </div>
    </>
  );
}

export default App;
