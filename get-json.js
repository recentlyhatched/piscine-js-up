async function getJSON(path, params = {}) {
  // Build query string, encoding spaces as '+'
  const queryString = Object.entries(params)
    .map(([k, v]) =>
      `${encodeURIComponent(k)}=${encodeURIComponent(v).replace(/%20/g, '+')}`
    )
    .join('&');

  const url = queryString ? `${path}?${queryString}` : path;

  const response = await fetch(url);

  const json = await response.json();

  // First, throw if JSON contains 'error'
  if ('error' in json) {
    throw new Error(json.error);
  }

  // Then, throw if HTTP status is not OK
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  // Return data if present
  if ('data' in json) {
    return json.data;
  }

  throw new Error('Invalid response format');
}
