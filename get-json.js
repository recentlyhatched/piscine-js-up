async function getJSON(path, params = {}) {
  // Construct URL with optional query parameters
  const url = new URL(path, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
  
  // Append query params if provided
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  // Fetch the URL
  const response = await fetch(url.toString());

  // Throw if response status is not OK
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  // Parse JSON
  const json = await response.json();

  // Return data or throw error from JSON body
  if ('data' in json) {
    return json.data;
  } else if ('error' in json) {
    throw new Error(json.error);
  } else {
    throw new Error('Invalid response format');
  }
}
