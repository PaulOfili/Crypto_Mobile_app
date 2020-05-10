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

  const abortController = new AbortController();
  const { signal } = abortController;

  const requestOptions = {
    method: requestType,
    headers,
    body: requestBody ? JSON.stringify(requestBody) : undefined,
    signal
  };

  if (requestParams) {
    const urlParams = createUrlParams(requestParams);
    url = `${url}?${urlParams}`;
  }

  setTimeout(() => abortController.abort(), 45000)

  console.log('Total request', url, requestOptions)
  return fetch(url, requestOptions)
    .then(handleResponse)
    .catch(handleError);
}

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
  console.log('response from handleResponse', response)
  if (response.ok) {
    return response.json().then(responseData => {
      return responseData;
    })
  } else {
    return response.json().then(responseData => {
      console.log('from handleresponse then error', responseData)
      const errorMessage = responseData.message || responseData.description || responseData.responseMessage;
      throw new Error(errorMessage);
    });
  }
};

const handleError = error => {
  console.log('error from handleError', error.message);
  const errorMessage = error.message || error.description;

  if (error.name === 'AbortError') {
    throw new Error('Recent request took too long. Check your internet connection and try again')
  } else if(errorMessage === 'Network request failed') {
    throw new Error('Check your internet connection and reload page or try again.')
  } else {
    throw new Error(errorMessage);
  }
};
