export const apiCall = (
  requestType,
  url,
  customHeaders,
  requestBody,
  requestParams,
) => {
  let headers = {
    Accept: "application/json",
    'Content-type': 'application/json',
    ...customHeaders,
  };

  const requestOptions = {
    method: requestType,
    headers,
    body: requestBody ? JSON.stringify(requestBody) : undefined,
  };

  if (requestParams) {
    const urlParams = createUrlParams(requestParams);
    url = `${url}?${urlParams}`;
  }

  console.log('Total request', url, requestOptions)
  return Promise.race([
    fetch(url, requestOptions)
    .then(handleResponse)
    .catch(handleError),
    new Promise((_, reject) => setTimeout(() => reject(new Error('Request took too long. Please try again!')), 10000))
  ])
};

const createUrlParams = (params, encode) => {
  const esc = encodeURIComponent;
  const cleanParams = JSON.parse(JSON.stringify(params));
  const query = Object.keys(cleanParams)
    .map(k =>
      encode ? esc(k) + '=' + esc(params[k]) : esc(k) + '=' + params[k],
    )
    .join('&');

  return query;
};
const handleResponse = response => {
  console.log('handle', response)
  if (response.ok) {
    return response.json().then(responseData => {
      return responseData;
    })
  } else {
    return response.json().then(responseData => {
      const errorMessage = responseData.message || responseData.description;
      throw new Error(errorMessage);
      // return Promise.reject({...errorMessage, ...response});
    });
  }
};

const handleError = error => {
  console.log('error from handleError', error.message);
  const errorMessage = error.message || error.description;

  if(errorMessage === 'Network request failed') {
    throw new Error('Check your internet connection and reload page or try again.')
  } else {
    throw new Error(errorMessage);
  }
};
