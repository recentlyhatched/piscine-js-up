async function isWinner(countryName) {
  try {
    // Get country info
    const country = await db.getWinner(countryName);

    // Check continent
    if (country.continent !== 'Europe') {
      return `Country is not what we are looking for because of the continent`;
    }

    // Get all results for the country
    const wins = await db.getResults(country.id);

    // Check number of times champion
    if (wins.length < 3) {
      return `$Country is not what we are looking for because of the number of times it was champion`;
    }

    // Build years and results strings
    const years = wins.map((w) => w.year).join(', ');
    const scores = wins.map((w) => w.score).join(', ');

    return `Country won the FIFA World Cup in ${years} winning by ${scores}`;
  } catch (err) {
    // If country not found or results not found
    if (err.message === 'Country Not Found' || err.message === 'Results Not Found') {
      return `Country never was a winner`;
    }
    throw err; // unexpected errors
  }
}
