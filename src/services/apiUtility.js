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

  console.log('Each url', url)
  fetch(url, requestOptions)
    .then(handleResponse)
    .catch(handleError);
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
  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.indexOf('application/json') !== -1;
  if (response.ok) {
    if (isJson) {
      return response.json();
    }
    return response.text();
  } else {
    if (isJson) {
      return response.json().then(error => {
        const errorMessage = error.message || error.description;

        return Promise.reject(Object.assign(errorMessage, {response}));
      });
    } else {
      throw new Error('Something went wrong');
    }
  }
};

const handleError = error => {
  console.log(String(error));
  throw String(error);
};
