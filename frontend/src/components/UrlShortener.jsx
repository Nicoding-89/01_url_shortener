import React, { useState } from 'react';
import '../styles/UrlShortener.css';
import UrlFormHandler from './UrlFormHandler';
import '../styles/UrlShortener.css';

const Urlshortener = () => {
  const [urlInfo, seturlInfo] = useState([]);

  const getShortUrl = (url) => {
    seturlInfo([...urlInfo, url]);
  };

  return (
    <section className='container url_shortener'>
      <h2 className='shorten_title'>Shorten Your URL</h2>
      <p>
        Paste your lengthy URL into the field below and click "Generate" to receive a concise, easy-to-share link. You can also get a QR code for your new URL, making it even easier to share and access.
      </p>
      <p className='url_format'>
        Please note that URLs in base 64 format are not supported. Follow the example below for proper formatting.
      </p>
      <UrlFormHandler getShortUrl={getShortUrl} />
    </section>
  );
};

export default Urlshortener;
