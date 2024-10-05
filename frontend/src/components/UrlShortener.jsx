import React, { useState } from 'react';
import '../styles/UrlShortener.css';
import UrlFormHandler from './UrlFormHandler';
import fetchData from '../helpers/fetchData.js';
import QrModal from './QrModal';
import UrlCard from './UrlCard';
import ErrorAlert from './ErrorAlert.jsx';

const Urlshortener = () => {
  const [urlInfo, seturlInfo] = useState([]);
  const [selectedUrl, setSelectedUrl] = useState(null);
  const [errorState, setErrorState] = useState(null);
  
  const getShortUrl = (url) => {
    seturlInfo([...urlInfo, url]);
  };

  const handleOnDelete = async (id) => {
    const DELETEURLENDPOINT = `${import.meta.env.VITE_API_URL}/${id}`;

    try {
      const response = await fetchData(DELETEURLENDPOINT, 'DELETE');
      if (!response) {
        const urlsResult = urlInfo.filter(url => url.id !== id);
        seturlInfo(urlsResult);
      };
      setErrorState(null);

    } catch (error) {
      setErrorState('Error deleting the new URL.');
      throw {
        status: 500,
        message: 'Error deleting the new URL.'
      };
    }
  };

  const handleQr = (url) => {
    setSelectedUrl(url);
  };

  return (
    <section className='container url_shortener'>
      <h2 className='shorten_title'>SHORTEN YOUR URL</h2>
      <p>
        Paste your lengthy URL into the field below and click "Generate" to receive a concise, easy-to-share link. You can also get a QR code for your new URL, making it even easier to share and access.
      </p>
      <p className='url_format'>
        Please note that URLs in base 64 format are not supported. Follow the example below for proper formatting.
      </p>
      <UrlFormHandler getShortUrl={getShortUrl} />
      {errorState && <ErrorAlert error={errorState} />}
      {urlInfo.length > 0 &&
        urlInfo.map(elem => (
          <UrlCard
            key={elem.id}
            url={elem}
            onDelete={handleOnDelete}
            onQr={handleQr}
          />
        ))
      }
      {selectedUrl && <QrModal qrValue={selectedUrl} onClose={handleQr} />}
    </section>
  );
};

export default Urlshortener;
