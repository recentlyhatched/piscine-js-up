async function getJSON(path, params = {}) {
  // Build query string, encoding spaces as '+'
  const queryString = Object.entries(params)
    .map(([k, v]) =>
      `${encodeURIComponent(k)}=${encodeURIComponent(v).replace(/%20/g, '+')}`
    )
    .join('&');

  const url = queryString ? `${path}?${queryString}` : path;

  // Fetch
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const json = await response.json();

  if ('data' in json) {
    return json.data;
  } else if ('error' in json) {
    throw new Error(json.error);
  } else {
    throw new Error('Invalid response format');
  }
}
