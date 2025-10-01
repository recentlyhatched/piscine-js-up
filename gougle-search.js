async function queryServers(serverName, q) {
  const primary = getJSON(`/${serverName}?q=${q}`);
  const backup = getJSON(`/${serverName}_backup?q=${q}`);
  return Promise.race([primary, backup]);
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
