async function queryServers(serverName, q) {
  // Wrap each call in a function to preserve simulated timings
  const primary = async () => getJSON(`/${serverName}?q=${q}`);
  const backup = async () => getJSON(`/${serverName}_backup?q=${q}`);

  // Race the two promises
  return Promise.race([primary(), backup()]);
}


async function gougleSearch(q) {
  const servers = ['web', 'image', 'video'];

  const searchPromise = Promise.all(
    servers.map(async (server) => [server, await queryServers(server, q)])
  ).then((results) => Object.fromEntries(results));

  // Global timeout of 80ms
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('timeout')), 80)
  );

  return Promise.race([searchPromise, timeoutPromise]);
}
