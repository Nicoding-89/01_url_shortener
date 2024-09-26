import React, { useState, useEffect } from 'react'

const CopyButton = ({ infoToCopy }) => {
  const [copyState, setCopyState] = useState('Copy');

  useEffect(() => {
    let timer;
    if (copyState === 'Copied' || copyState === 'Error') {
      timer = setTimeout(() => setCopyState('Copy'), 3000); 
    }
    return () => clearTimeout(timer); // Clean up timer on component unmount or state change
  }, [copyState]); 

  const handleOnCopy = async () => {
    try {
      await navigator.clipboard.writeText(infoToCopy);
      setCopyState('Copied');
    } catch (error) {
      console.error(error);
      setCopyState('Error');
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleOnCopy}
        aria-label={copyState === 'Copy' ? 'Copy to clipboard' : (copyState === 'Copied' ? 'Copied to clipboard' : 'Error copying to clipboard')}
      >{copyState} <i className="fa-solid fa-copy"></i>
      </button>
    </>
  )
}

export default CopyButton