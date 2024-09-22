import validator from "validator";

function validateUrl(url) {
  // Validates the input and filters Base64 URLs.
  return validator.isURL(url, {
      protocols: ['http', 'https'],
      require_protocol: true
  });
};

export default validateUrl;