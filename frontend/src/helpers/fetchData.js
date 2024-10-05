const fetchData = async (endpoint, method, body = null) => {

  let option = {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
  };
  if (body) {
    option.body = JSON.stringify(body)
  };

  try {
    const response = await fetch(endpoint, option);
    if (response.status === 204) {
      return null;
    };
    
    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        data,
      };
    } else {
      return {
        success: false,
        errorData: data
      };
    };
  } catch (error) {
    throw {
      success: false,
      errorData: {
        status: 500,
        error: 'Network error.',
        message: 'An unexpected error occurred. Please try again later.'
      }
    };
  };
};

export default fetchData;