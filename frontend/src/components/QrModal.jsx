import React, { useEffect, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react'; 
import '../styles/QrModal.css'

const QrModal = ({ qrValue, onClose }) => {
  const [canvasUrl, setCanvasUrl] = useState(null);
  
  useEffect(() => {
    const getCanvasUrl = () => {
      const canvas = document.querySelector('canvas');
      if (canvas) {
        const image = canvas.toDataURL('image/png');
        setCanvasUrl(image);
      };
    };

    getCanvasUrl();
  }, [qrValue]);

  const handleSave = () => {
    if (canvasUrl) {
      const link = document.createElement('a');
      link.href = canvasUrl;
      link.download = 'qr-code.png'; 
      link.click(); 
    };
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Your QR Code</h5>
            <button type="button" className="btn-close" onClick={() => onClose(null)} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div id="qrcode-container" className='text-center pt-3 pb-3'>
              <QRCodeCanvas
                value={qrValue}
                size={256}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => onClose(null)}>Close</button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrModal;