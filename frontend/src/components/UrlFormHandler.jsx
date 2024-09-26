import React, { useState } from 'react';
import fetchData from '../helpers/fetchData.js';
import UrlForm from './UrlForm';
import validateUrl from '../helpers/urlValidation.js';

const UrlFormHandler = ({ getShortUrl }) => {
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

    const result = await fetchData(POSTURLENDPOINT, 'POST', { longUrl: state.formState })
    if (result.success) {
      getShortUrl(result.data);
      setState({ formState: '', errorState: null, loading: false });
    } else {
      setState({ formState: '', errorState: result.message, loading: false });
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