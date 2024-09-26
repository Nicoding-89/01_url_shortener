import React from 'react';
import CopyButton from './CopyButton';
import '../styles/UrlCard.css'

const Card = ({ url, onDelete, onQr }) => {
  const handleDelete = () => onDelete(url.id);
  const handleQr = () => onQr(url.short_url);

  return (
    <div className="card shadow bg-body-tertiary rounded col-xxl-11 col-xl-11 col-lg-11 mx-auto">
      <div className="card-body">
        <div className='upper_body d-flex flex-row justify-content-between align-items-center flex-wrap pb-2'>
          <div className='mb-1 url-text'>
            <a
              className="card-text"
              href={url.short_url}
              target='_blank'
              rel='nofollow noopener noreferrer'
            >
              {url.short_url}
            </a>
          </div>
          <div className='d-flex flex-row column-gap-1 row-gap-1 flex-wrap'>
            <CopyButton infoToCopy={url.short_url}/>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              Delete <i className="fa-solid fa-trash-can"></i>
            </button>
            <button
              type='button'
              className='btn btn-success'
              onClick={handleQr}
            >
              QR <i className="fa fa-qrcode" aria-hidden="true"></i>
            </button>
          </div>
        </div>
        <div className='lower_body pb-2 pt-3'>
          <a
            className="card-text"
            href={url.long_url}
            target='_blank'
            rel='nofollow noopener noreferrer'
          >
            {url.long_url}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;