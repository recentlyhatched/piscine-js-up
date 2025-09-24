// get all URLs
function getURL(dataSet) {
  const urlRegex = /\bhttps?:\/\/[^\s]+/g; // global search for https or http
  const matches = dataSet.match(urlRegex);
  return matches || [];
}

// urls with at least 3 query parameters
function greedyQuery(dataSet) {
  return getURL(dataSet).filter(url => {
    const query = url.split('?')[1];
    if (!query) return false;
    const params = query.split('&');
    return params.length >= 3;
  });
}

// urls with 2 or 3 query parameters
function notSoGreedy(dataSet) {
  return getURL(dataSet).filter(url => {
    const query = url.split('?')[1];
    if (!query) return false;
    const params = query.split('&');
    return params.length >= 2 && params.length <= 3;
  });
}