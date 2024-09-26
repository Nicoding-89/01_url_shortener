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
    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        data,
      };
    } else {
      return {
        success: false,
        message: data.message || 'An error ocurred. Please try again.'
      };
    };
  } catch (error) {
    return {
      success: false,
      message: 'Network error.'
    };
  };
};

export default fetchData;