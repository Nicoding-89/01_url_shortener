import React from 'react';
import PropTypes from 'prop-types';
import '../styles/UrlForm.css'
import ErrorAlert from './ErrorAlert';

const UrlForm = ({ formState, errorState, handleOnChange, handleOnSubmit, loading }) => {
  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <div className="input-group url-input">
          <input
            type="text"
            className="form-control"
            placeholder="e.g., https://www.example.com/very-long-url"
            value={formState}
            onChange={handleOnChange}
          />
          <button
            className="btn btn-primary generate-btn"
            type="submit"
            id="button-addon2"
            disabled={loading}
          >
            Generate
          </button>
        </div>
        {errorState && <ErrorAlert error={errorState} />}
        {loading &&
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>}
      </form>
    </>
  );
};

UrlForm.propTypes = {
  formState: PropTypes.string.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  handleOnSubmit: PropTypes.func.isRequired,
  errorState: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default UrlForm;