import React, { useState } from 'react';
import fetchData from '../helpers/fetchData.js';
import UrlForm from './UrlForm';
import validateUrl from '../helpers/urlValidation.js';
import { useNavigate } from 'react-router-dom';

const UrlFormHandler = ({ getShortUrl }) => {
  const navigate = useNavigate();
  const POSTURLENDPOINT = import.meta.env.VITE_API_URL;

  const [state, setState] = useState({ formState: '', errorState: null, loading: false });

  const handleOnChange = (e) => {
    setState({ ...state, formState: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, loading: true });

    if (!validateUrl(state.formState)) {
      setState({ ...state, errorState: 'Please enter a valid URL.', loading: false });
      return;
    };
    
    try {
      const result = await fetchData(POSTURLENDPOINT, 'POST', { longUrl: state.formState });

      if (result.success) {
        getShortUrl(result.data);
        setState({ formState: '', errorState: null, loading: false });
      } else {
        navigate('/error', { state: result.errorData });
      };
    } catch (error) {
      const err = {
        status: 500,
        error: 'Internal server error.',
        message: 'An unexpected error occurred. Please try again later.'
      };
      navigate('/error', { state: error.errorData || err });
    };
  };

  return (
    <UrlForm
      formState={state.formState}
      errorState={state.errorState}
      handleOnChange={handleOnChange}
      handleOnSubmit={handleOnSubmit}
      loading={state.loading}
    />
  );
};

export default UrlFormHandler;